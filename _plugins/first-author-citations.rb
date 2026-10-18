require_relative "scholar_citations"

module Jekyll
  # Liquid tag: {% first_author_citations site.scholar_userid %}
  #
  # Renders the total Google Scholar citations of the owner's primary-author
  # papers. The figure comes from ScholarCitations::CACHE_FILE, which is tracked
  # in git and refreshed either by a local build or by the scheduled
  # update-scholar-citations workflow.
  #
  # Builds never hit Scholar on CI: runners are blocked as datacenter traffic,
  # and a failed scrape here used to surface as "N/A" on the live site.
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
      owner_last = site.config["last_name"].to_s

      key = ScholarCitations.cache_key(scholar_id, owner_first, owner_last)
      return Cache[key] if Cache[key]

      total = fetch(site, scholar_id, owner_first, owner_last)
      if total && !ScholarCitations.plausible?(site.source, key, total)
        puts "Ignoring an implausible zero citation count; keeping the cached value."
        total = nil
      end
      ScholarCitations.write_cache(site.source, key, total) if total

      total ||= ScholarCitations.read_cache(site.source, key)
      total ||= site.config["first_author_citations_fallback"]

      Cache[key] = total ? ScholarCitations.humanize(total) : "N/A"
    end

    private

    def fetch(site, scholar_id, owner_first, owner_last)
      if ENV["CI"].to_s.downcase == "true"
        puts "Skipping Google Scholar fetch on CI; using cached citation count."
        return nil
      end

      ScholarCitations.fetch_via_scrape(scholar_id, owner_first, owner_last)
    rescue Exception => e
      puts "Could not fetch primary-author citations: #{e.class} - #{e.message}"
      puts "Falling back to the cached count."
      nil
    end

    def resolve(context, expr)
      return nil if expr.nil? || expr.empty?
      if (expr.start_with?('"') && expr.end_with?('"')) ||
         (expr.start_with?("'") && expr.end_with?("'"))
        return expr[1..-2]
      end

      value = context[expr]
      value.nil? ? expr : value.to_s
    end
  end
end

Liquid::Template.register_tag("first_author_citations", Jekyll::FirstAuthorCitationsTag)
