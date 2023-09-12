---
layout: blog
study: true
background: yellow
category: study
categories: web/javascript
title: "[javascript] label태그가 감싸진 태그들의 label text 값만 변경하기"
date: 2023-09-12 14:30:00
tags:

- web
- javascript
- radio

---

# 적용된 코드

```html
<label for="radio-display01" class="radio-item" id="phone">표시
  <input type="radio" id="radio-display01" name="radio-display" checked="" value="1" />
  <span class="radio-button"></span>
</label>
```

# 문제점

`<label>` 태그가 `<input>`태그와 `<span>`태그를 감싸고 있는 상태에서 label의 text값만 바꾸고자 할때  
`document.getElementById("phone").innerHTML = "value"` 로 값을 변경하게 되면  
안에 `<input>`태그와 `<span>` 가 사라지게 된다.

# 해결

```javascript
document.getElementById("phone").childNodes[0].nodeValue = 'value';
```

첫번째 노드를 가져와서 값을 수정해준다.

---
참고  
[1] https://stackoverflow.com/questions/68069617/how-do-i-change-the-innertext-of-outer-tag-in-a-nested-tag-line