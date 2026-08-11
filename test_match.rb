require "./_plugins/first-author-citations.rb"
require "yaml"

site_mock = Struct.new(:source, :config).new(".", {"first_name" => "Xiaofeng", "last_name" => "Tan"})
tag = Jekyll::FirstAuthorCitationsTag.new("first_author_citations", "C2F5mtgAAAAJ", nil)
puts "Total calculated: #{tag.render(Struct.new(:registers, :[]).new({site: site_mock}, nil))}"
