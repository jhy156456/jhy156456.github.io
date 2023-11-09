---
layout: blog
study: true
background: yellow
category: study
categories: web/javascript
title: "[javascript] ==연산자와 ==="
date: 2023-11-09 10:12:00
tags:

  - ==
  - ===
  - javascript

---

# ==연산자와 ===

- '=='는 비교하는 두 개의 값(피연산자)을 강제로 같은 형으로 변환한 후, 비교를 수행합니다.즉, 두 값의 타입이 다르더라도, 형 변환된 값이 같다면 true를 리턴합니다.
- '==='는 비교하는 두 개의 값(피연산자)의 타입과 값이 모두 같을 경우에만, true를 리턴합니다.

```javascript
String.prototype.equals = function(a) {
  return this == a
};


let a = "a"

console.log(a.equals("a")) //true
```

```javascript
String.prototype.equals = function(a) {
  console.log(typeof this)
  return this === a
};


let a = "a"

console.log(a.equals("a")) 
//object
//false
```

위 코드에서 this는 객체이기때문에 값이 같더라도 타입이 다르므로 false로 리턴된다.

---
참고  
[1] https://hianna.tistory.com/375