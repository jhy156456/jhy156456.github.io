---
layout: blog
study: true
background: yellow
category: study
categories: web/javascript
title: "[javascript] 라디오 버튼 값 가져오기"
date: 2023-08-22 14:30:00
tags:

- web
- javascript
- radio

---

# 코드

```js
if (document.querySelector('input[name="radio-display"]:checked').value == "on") {
  requestMap.set('GBN', "1");
} else {
  requestMap.set('GBN', "2");
}
```