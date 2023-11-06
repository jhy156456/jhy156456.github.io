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

# change listener

```html
<input type="radio" name="myRadios" value="1" />
<input type="radio" name="myRadios" value="2" />
```

```js

function setListener() {
  var rad = [document.getElementById("radio-display01"), document.getElementById("radio-display02")];
  var prev = null;
  for (var i = 0; i < rad.length; i++) {
    rad[i].addEventListener('change', function() {
      (prev) ? console.log(prev.value) : null;
      if (this !== prev) {
        prev = this;
      }
      selectDpProgressList(this.value)
    });
  }
}
```

# 값 가져오기

```js
if (document.querySelector('input[name="radio-display"]:checked').value == "on") {
  requestMap.set('GBN', "1");
} else {
  requestMap.set('GBN', "2");
}
```

---
참고  
[1] https://stackoverflow.com/questions/8838648/onchange-event-handler-for-radio-button-input-type-radio-doesnt-work-as-one