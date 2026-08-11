#!/usr/bin/env ruby
# frozen_string_literal: true

# Refreshes the primary-author citation total that the about page renders, i.e.
# ScholarCitations::CACHE_FILE. Run it locally, or let the
# update-scholar-citations workflow run it on a schedule.
#
# Reads through SerpAPI when SERPAPI_KEY is set, which is the only approach that
# works reliably from a CI runner, and scrapes Scholar directly otherwise.
#
#   bundle exec ruby bin/update_scholar_citations.rb
#
# Exits non-zero when the figure could not be refreshed, leaving the previous
# value in place.

require "date"
require "yaml"
require_relative "../_plugins/scholar_citations"

ROOT = File.expand_path("..", __dir__)

config = YAML.safe_load(
  File.read(File.join(ROOT, "_config.yml")),
  aliases: true,
  permitted_classes: [Date, Time]
)

scholar_id = ENV.fetch("SCHOLAR_USERID", nil) || config["scholar_userid"]
first_name = config["first_name"].to_s
last_name = config["last_name"].to_s

abort "No scholar_userid found in _config.yml." if scholar_id.to_s.empty?

api_key = ENV.fetch("SERPAPI_KEY", "").to_s
total =
  if api_key.empty?
    warn "SERPAPI_KEY is not set, scraping Google Scholar directly (expect this to fail on CI)."
    ScholarCitations.fetch_via_scrape(scholar_id, first_name, last_name)
  else
    ScholarCitations.fetch_via_serpapi(scholar_id, first_name, last_name, api_key)
  end

key = ScholarCitations.cache_key(scholar_id, first_name, last_name)
previous = ScholarCitations.read_cache(ROOT, key)

unless ScholarCitations.plausible?(ROOT, key, total)
  abort "Refusing to overwrite #{previous} citations with 0: the response likely changed shape."
end

changed = ScholarCitations.write_cache(ROOT, key, total)

puts "Primary-author citations: #{previous.inspect} -> #{total}"
puts changed ? "Wrote #{ScholarCitations::CACHE_FILE}." : "Already up to date, nothing to commit."

if (github_output = ENV.fetch("GITHUB_OUTPUT", nil))
  File.write(github_output, "changed=#{changed}\n", mode: "a")
end
