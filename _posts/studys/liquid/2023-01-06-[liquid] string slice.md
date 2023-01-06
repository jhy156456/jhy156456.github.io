---
layout: blog
study: true
background: purple
category: study
categories: liquid
title: "[liquid] string slice"
date: 2023-01-06 11:16:42
tags:
- liquid
- gitblog
---
# [liquid] string slice
 
## 변수에 대한 사용
{% raw %}
```
{{ "abcdef" | slice:1, 3 }}
```
{% endraw %}
=> bcd

## size 변수 할당
{% raw %}
```
{% assign cate = pre_url | slice:1, 3 %}
```
{% endraw %}
