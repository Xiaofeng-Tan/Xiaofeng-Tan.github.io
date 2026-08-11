require "nokogiri"
require "open-uri"

scholar_id = "C2F5mtgAAAAJ"
url = "https://scholar.google.com/citations?hl=en&user=#{scholar_id}&cstart=0&pagesize=100&sortby=pubdate"
doc = Nokogiri::HTML(URI.open(url, "User-Agent" => "Ruby"))
rows = doc.css("tr.gsc_a_tr")

rows.each do |row|
  s_title = row.at_css(".gsc_a_at")&.text&.strip
  authors = row.at_css(".gs_gray")&.text&.strip
  puts "- #{s_title}"
  puts "  Authors: #{authors}"
end
