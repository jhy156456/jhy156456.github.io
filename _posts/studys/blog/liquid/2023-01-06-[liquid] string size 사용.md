---
layout: blog
study: true
background: purple
category: study
categories: blog/liquid
title: "[liquid] string size 사용"
date: 2023-01-06 11:16:42
tags:
- liquid
- gitblog
---
# [liquid] string size 사용
 

## 변수에 대한 사용
{% raw %}
```
{{ pre_url | size }}
```
{% endraw %}

## size 변수 할당
{% raw %}
```
{% assign var1 = pre_url | size  %}
```
{% endraw %}

문제점 : size변수는 string이어서 int를 사용하는 slice함수에 적용할 수 없다. 해결법은 다음 포스팅에서...
