require "active_support/all"
require "json"
require "net/http"
require "nokogiri"
require "open-uri"
require "uri"

module Helpers
  extend ActiveSupport::NumberHelper unless respond_to?(:number_to_human)
end

# Shared logic behind the "primary author citations" figure: which papers count,
# how the total is cached, and the two ways of reading Google Scholar.
#
# Scholar has no API and actively blocks automated access, so the published
# figure is always a cached value refreshed out of band, never a live one:
#   - fetch_via_serpapi is used by the scheduled refresh workflow, where a
#     direct scrape would be rejected as datacenter traffic.
#   - fetch_via_scrape is used by local builds, whose residential IP Scholar
#     still serves.
# Both read the same profile page, so both see the same author lists and
# produce the same total.
module ScholarCitations
  # Dotfile, so Jekyll neither publishes it nor watches it for rebuilds.
  CACHE_FILE = ".scholar-citations.json".freeze

  PAGE_SIZE = 100

  module_function

  def cache_key(scholar_id, first, last)
    "PRIMARY_#{scholar_id}_#{first}_#{last}"
  end

  def cache_path(root)
    File.join(root, CACHE_FILE)
  end

  def read_cache(root, key)
    path = cache_path(root)
    return nil unless File.exist?(path)

    JSON.parse(File.read(path))[key]
  rescue StandardError => e
    puts "Could not read #{CACHE_FILE}: #{e.class} - #{e.message}"
    nil
  end

  # Returns true when the stored value changed, so callers can skip an empty
  # commit.
  def write_cache(root, key, total)
    path = cache_path(root)
    stored = File.exist?(path) ? JSON.parse(File.read(path)) : {}
    return false if stored[key] == total

    stored[key] = total
    File.write(path, JSON.pretty_generate(stored) + "\n")
    true
  rescue StandardError => e
    puts "Could not write #{CACHE_FILE}: #{e.class} - #{e.message}"
    false
  end

  # A zero total where we previously had citations means the profile page or the
  # API response changed shape, not that the citations vanished.
  def plausible?(root, key, total)
    return true unless total.to_i.zero?

    read_cache(root, key).to_i.zero?
  end

  def humanize(total)
    Helpers.number_to_human(
      total.to_i,
      format: "%n%u",
      precision: 2,
      units: { thousand: "K", million: "M", billion: "B" }
    )
  end

  # Scrapes the profile page directly. Raises when Scholar refuses to serve it.
  def fetch_via_scrape(scholar_id, first, last)
    total = 0
    cstart = 0
    loop do
      url = "https://scholar.google.com/citations?hl=en&user=#{scholar_id}&cstart=#{cstart}&pagesize=#{PAGE_SIZE}&sortby=pubdate"
      sleep(rand(1.5..3.0))
      doc = Nokogiri::HTML(URI.open(url, "User-Agent" => "Ruby/#{RUBY_VERSION}"))
      rows = doc.css("tr.gsc_a_tr")
      break if rows.empty?

      rows.each do |row|
        authors_text = row.at_css(".gs_gray")&.text&.strip || ""
        count_text = row.at_css("a.gsc_a_ac")&.text&.strip || ""
        count = count_text.empty? ? 0 : count_text.gsub(",", "").to_i

        total += count if primary_author?(authors_text, first, last)
      end

      break if rows.length < PAGE_SIZE
      cstart += rows.length
    end

    total
  end

  # Reads the same profile through SerpAPI, which absorbs the blocking on our
  # behalf. Raises on transport or quota errors.
  def fetch_via_serpapi(scholar_id, first, last, api_key)
    total = 0
    seen = {}
    start = 0

    loop do
      payload = serpapi_page(scholar_id, api_key, start)
      articles = payload["articles"] || []

      # Guard against `start` being ignored, which would otherwise re-count the
      # first page forever.
      fresh = articles.reject { |article| seen[article_id(article)] }
      break if fresh.empty?

      fresh.each do |article|
        seen[article_id(article)] = true
        next unless primary_author?(article["authors"].to_s, first, last)

        total += article.dig("cited_by", "value").to_i
      end

      break if articles.length < PAGE_SIZE
      start += articles.length
    end

    total
  end

  def serpapi_page(scholar_id, api_key, start)
    uri = URI("https://serpapi.com/search.json")
    uri.query = URI.encode_www_form(
      engine: "google_scholar_author",
      author_id: scholar_id,
      api_key: api_key,
      hl: "en",
      num: PAGE_SIZE,
      start: start
    )

    response = Net::HTTP.get_response(uri)
    payload = begin
      JSON.parse(response.body.to_s)
    rescue JSON::ParserError
      {}
    end

    # SerpAPI reports quota and lookup problems in the body, so prefer its
    # message over the bare status code.
    raise "SerpAPI error: #{payload["error"]}" if payload["error"]
    unless response.is_a?(Net::HTTPSuccess)
      raise "SerpAPI returned HTTP #{response.code}: #{response.body.to_s[0, 200]}"
    end

    payload
  end

  def article_id(article)
    article["citation_id"] || article["title"]
  end

  # The owner counts as a primary author when listed in the first two slots, or
  # when carrying a co-first asterisk (e.g., `X Tan*`) anywhere in the list.
  def primary_author?(authors_text, first, last)
    # Scholar authors are usually comma-separated, e.g., "X Tan, W Weng, H Wang"
    # or "W Weng*, X Tan*, X Shu"
    list = authors_text.split(",").map(&:strip)
    return false if list.empty?

    first_norm = first.to_s.downcase
    last_norm = last.to_s.downcase

    return true if list.first(2).any? { |entry| same_person?(entry, first_norm, last_norm) }

    list.select { |entry| entry.include?("*") }
        .any? { |entry| same_person?(entry, first_norm, last_norm) }
  end

  def same_person?(author_entry, first_norm, last_norm)
    cleaned = author_entry.gsub("*", "").gsub(/\([^)]*\)/, "").strip.downcase
    # Scholar format is usually "FirstInitial LastName" (e.g., "X Tan")
    # or "FirstName LastName" (e.g., "Xiaofeng Tan")
    tokens = cleaned.split(/\s+/)
    last_part = tokens.last.to_s
    first_part = tokens[0..-2].join(" ")

    return false if last_part != last_norm
    return true if first_part == first_norm

    # Match by first-name initial
    !first_part.empty? && first_part[0] == first_norm[0]
  end
end
