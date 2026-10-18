require "active_support/all"
require 'nokogiri'
require 'open-uri'

module Helpers
  extend ActiveSupport::NumberHelper
end

module Jekyll
  class GoogleScholarCitationsTag < Liquid::Tag
    Citations = { }

    def initialize(tag_name, params, tokens)
      super
      splitted = params.split(" ").map(&:strip)
      @scholar_id = splitted[0]
      @article_id = splitted[1]
    end

    def render(context)
      scholar_id = context[@scholar_id.strip] || @scholar_id

      begin
        if @article_id.nil? || @article_id.empty?
          cache_key = "TOTAL_#{scholar_id}"
          if GoogleScholarCitationsTag::Citations[cache_key]
            return GoogleScholarCitationsTag::Citations[cache_key]
          end

          sleep(rand(1.5..3.5))

          profile_url = "https://scholar.google.com/citations?hl=en&user=#{scholar_id}"
          doc = Nokogiri::HTML(URI.open(profile_url, "User-Agent" => "Ruby/#{RUBY_VERSION}"))

          citation_count = 0

          total_cell = doc.at_css('#gsc_rsb_st tbody tr:first-child td.gsc_rsb_std') || doc.at_css('#gsc_rsb_st tr:nth-child(1) td:nth-child(2)')
          if total_cell
            citation_count = total_cell.text.gsub(",", "").strip.to_i
          else
            description_meta = doc.css('meta[name="description"]')
            if !description_meta.empty?
              desc_text = description_meta[0]['content']
              matches = desc_text.match(/Citations\s*(\d+[,\d]*)/i)
              citation_count = matches[1].gsub(",", "").to_i if matches
            end
          end

          citation_count = Helpers.number_to_human(citation_count, :format => '%n%u', :precision => 2, :units => { :thousand => 'K', :million => 'M', :billion => 'B' })
          GoogleScholarCitationsTag::Citations[cache_key] = citation_count
          return "#{citation_count}"
        end

        article_id = context[@article_id.strip] || @article_id
        article_url = "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=#{scholar_id}&citation_for_view=#{scholar_id}:#{article_id}"

        if GoogleScholarCitationsTag::Citations[article_id]
          return GoogleScholarCitationsTag::Citations[article_id]
        end

        sleep(rand(1.5..3.5))

        doc = Nokogiri::HTML(URI.open(article_url, "User-Agent" => "Ruby/#{RUBY_VERSION}"))

        citation_count = 0

        description_meta = doc.css('meta[name="description"]')
        og_description_meta = doc.css('meta[property="og:description"]')

        if !description_meta.empty?
          cited_by_text = description_meta[0]['content']
          matches = cited_by_text.match(/Cited by (\d+[,\d]*)/)

          if matches
            citation_count = matches[1].sub(",", "").to_i
          end

        elsif !og_description_meta.empty?
          cited_by_text = og_description_meta[0]['content']
          matches = cited_by_text.match(/Cited by (\d+[,\d]*)/)

          if matches
            citation_count = matches[1].sub(",", "").to_i
          end
        end

        citation_count = Helpers.number_to_human(citation_count, :format => '%n%u', :precision => 2, :units => { :thousand => 'K', :million => 'M', :billion => 'B' })

      rescue Exception => e
        citation_count = "N/A"
        puts "Error fetching citation count: #{e.class} - #{e.message}"
      end

      if @article_id.nil? || @article_id.empty?
        GoogleScholarCitationsTag::Citations["TOTAL_#{scholar_id}"] = citation_count
      else
        article_id = context[@article_id.strip] || @article_id
        GoogleScholarCitationsTag::Citations[article_id] = citation_count
      end
      return "#{citation_count}"
    end
  end
end

Liquid::Template.register_tag('google_scholar_citations', Jekyll::GoogleScholarCitationsTag)
