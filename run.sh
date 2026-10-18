#!/bin/bash
export PATH="$HOME/Library/Python/3.9/bin:/opt/homebrew/opt/ruby/bin:/opt/homebrew/lib/ruby/gems/4.0.0/bin:$PATH"
bundle install && bundle exec jekyll serve
