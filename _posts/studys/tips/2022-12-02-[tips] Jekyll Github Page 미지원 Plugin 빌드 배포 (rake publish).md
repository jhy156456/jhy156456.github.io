---
layout: blog
study: true
background: blue
category: study
categories: tips
title: "[tips] Jekyll Github Page 미지원 Plugin 빌드 배포 (rake publish)"
date: 2022-12-02 15:06:42
tags:
- tips
- html
---
# [tips] Jekyll Github Page 미지원 Plugin 빌드 배포 (rake publish)



## 문제

``jekyll-paginate-v2`` 를 추가했더니 로컬에서는 정상 작동했는데 push 후 git 홈페이지에서는 정상 작동하지 않았음



## 해결

최상위 폴더에 rakefile을 만들고

```ruby
require "rubygems"
require "tmpdir"

require "bundler/setup"
require "jekyll"

# Change your GitHub reponame
# 자신의 GitName/GitHub Project 명
GITHUB_REPONAME = #"jr-developers/jr-developers.github.io"

desc "Generate blog files"
task :generate do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "_site"
  })).process
end

desc "Generate and publish blog to gh-pages"
task :publish => [:generate] do
  Dir.mktmpdir do |tmp|
    cp_r "_site/.", tmp

    pwd = Dir.pwd
    Dir.chdir tmp

    system "cd .."
    system "git init"
    system "git add ."
    #system "git config --global user.email you@example.com"
    #system "git config --global user.name Your Name"
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m #{message.inspect}"
    system "git remote add origin https://github.com/#{GITHUB_REPONAME}.git"
    system "git push origin master --force"

    Dir.chdir pwd
  end
end
```



작성 후 ``rake publish`` 명령어로 배포한다.

참고로 위 코드에서 GITHUB_REPONAME 를 수정해야한다





참고

[1] [Jekyll Github Page 미지원 Plugin 빌드 배포 (jr-developers.github.io)](https://jr-developers.github.io/blog/2020/12/08/blog1.html)


