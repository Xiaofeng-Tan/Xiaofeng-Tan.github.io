require "active_support/all"
require "nokogiri"
require "open-uri"

module Helpers
  extend ActiveSupport::NumberHelper unless respond_to?(:number_to_human)
end

module Jekyll
  # Liquid tag: {% first_author_citations site.scholar_userid %}
  #
  # Sums Google Scholar citations for papers where the site owner is a
  # "primary author". The judgement is made directly from the Scholar profile:
  #   - the owner appears within the first two authors, OR
  #   - the owner's name carries a co-first asterisk (e.g., `X Tan*`).
  class FirstAuthorCitationsTag < Liquid::Tag
    Cache = {}

    def initialize(tag_name, params, tokens)
      super
      @scholar_id_expr = params.strip
    end

    def render(context)
      scholar_id = resolve(context, @scholar_id_expr)
      site = context.registers[:site]
      owner_first = site.config["first_name"].to_s
      owner_last  = site.config["last_name"].to_s

      cache_key = "PRIMARY_#{scholar_id}_#{owner_first}_#{owner_last}"
      return Cache[cache_key] if Cache[cache_key]

      total_str = "N/A"
      begin
        total = 0
        cstart = 0
        page_size = 100
        loop do
          url = "https://scholar.google.com/citations?hl=en&user=#{scholar_id}&cstart=#{cstart}&pagesize=#{page_size}&sortby=pubdate"
          sleep(rand(1.5..3.0))
          doc = Nokogiri::HTML(URI.open(url, "User-Agent" => "Ruby/#{RUBY_VERSION}"))
          rows = doc.css("tr.gsc_a_tr")
          break if rows.empty?

          rows.each do |row|
            authors_text = row.at_css(".gs_gray")&.text&.strip || ""
            count_text = row.at_css("a.gsc_a_ac")&.text&.strip || ""
            count = count_text.empty? ? 0 : count_text.gsub(",", "").to_i

            if primary_author_on_scholar?(authors_text, owner_first, owner_last)
              total += count
            end
          end

          break if rows.length < page_size
          cstart += rows.length
        end

        total_str = Helpers.number_to_human(
          total,
          format: "%n%u",
          precision: 2,
          units: { thousand: "K", million: "M", billion: "B" }
        )
      rescue Exception => e
        puts "Error computing first-author citations: #{e.class} - #{e.message}"
        total_str = "N/A"
      end

      Cache[cache_key] = total_str
      total_str
    end

    private

    def resolve(context, expr)
      return nil if expr.nil? || expr.empty?
      if (expr.start_with?('"') && expr.end_with?('"')) ||
         (expr.start_with?("'") && expr.end_with?("'"))
        return expr[1..-2]
      end
      value = context[expr]
      value.nil? ? expr : value.to_s
    end

    def primary_author_on_scholar?(authors_text, first, last)
      # Scholar authors are usually comma-separated, e.g., "X Tan, W Weng, H Wang"
      # or "W Weng*, X Tan*, X Shu"
      list = authors_text.split(",").map(&:strip)
      return false if list.empty?

      first_norm = first.to_s.downcase
      last_norm  = last.to_s.downcase

      # 1. Check if owner is in the first two authors
      top_slots = list.first(2)
      return true if top_slots.any? { |e| same_person?(e, first_norm, last_norm) }

      # 2. Check if owner has a star (co-first) anywhere in the list
      starred = list.select { |n| n.include?("*") }
      return true if starred.any? { |n| same_person?(n, first_norm, last_norm) }

      false
    end

    def same_person?(author_entry, first_norm, last_norm)
      cleaned = author_entry.gsub("*", "").gsub(/\([^)]*\)/, "").strip.downcase
      # Scholar format is usually "FirstInitial LastName" (e.g., "X Tan")
      # or "FirstName LastName" (e.g., "Xiaofeng Tan")
      tokens = cleaned.split(/\s+/)
      last_part  = tokens.last.to_s
      first_part = tokens[0..-2].join(" ")
      
      return false if last_part != last_norm
      return true if first_part == first_norm
      # Match by first-name initial
      return true if !first_part.empty? && first_part[0] == first_norm[0]
      
      false
    end
  end
end

Liquid::Template.register_tag("first_author_citations", Jekyll::FirstAuthorCitationsTag)
