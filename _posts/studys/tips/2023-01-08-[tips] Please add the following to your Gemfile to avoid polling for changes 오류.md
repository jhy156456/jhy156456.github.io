---
layout: blog
study: true
background: blue
category: study
categories: tips
title: "[tips] Please add the following to your Gemfile to avoid polling for changes 오류"
date: 2022-12-21 13:00
tags:
- tips
- jekyll
- bundle
- error
---

# [tips] Please add the following to your Gemfile to avoid polling for changes 오류

## 문제 발생
```ruby
bundle exec jekyll serve
```
빌드 명령어 실행시
```
Please add the following to your Gemfile to avoid polling for changes:
    gem 'wdm', '>= 0.1.0' if Gem.win_platform?
 Auto-regeneration: enabled for
 ```
 위 에러 발생

 ## 해결 
```ruby
gem install webrick
jekyll build
bundle add webrick
bundle exec jekyll serve
```

위 명령어로 해결!


참조 
[1] https://velog.io/@minji-o-j/jekyll-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0