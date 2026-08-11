require "nokogiri"
require "open-uri"

scholar_id = "C2F5mtgAAAAJ"
url = "https://scholar.google.com/citations?hl=en&user=#{scholar_id}&cstart=0&pagesize=100&sortby=pubdate"
doc = Nokogiri::HTML(URI.open(url, "User-Agent" => "Ruby"))
rows = doc.css("tr.gsc_a_tr")
puts "Scholar Titles:"
rows.each do |row|
  title = row.at_css(".gsc_a_at")&.text&.strip
  count = row.at_css("a.gsc_a_ac")&.text&.strip
  puts "- #{title} (Citations: #{count})"
end
