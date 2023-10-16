---
layout: blog
study: true
background: yellow
category: study
categories: web/javascript
title: "[javascript] ? 연산자와 ?? 연산자"
date: 2023-10-16 10:12:00
tags:
  - question
  - operator
  - web
  - javascript
---

# ?? 연산자

- `a ?? b` 의 결과는 a가 null 또는 undefined가 아니면 a이고 그 외에는 b이다.

# 옵셔널 체이닝 `?.`

## 특징

- 프로퍼티가 없는 중첩 객체에 에러 없이 접근하기 위해 생긴 문법
- 이전까지는 &&연산자를 사용해서 없으면 undefined를 반환하도록 했었다.
- 옵셔널 체이닝은 obj?.prop 뿐만아니라 obj?.[prop] , obj?.method() 와 같은 형태로도 사용할 수 있으며, 각각 obj.prop, obj[prop], obj.method()를 반환 또는
  호출하고, 그렇지 않으면 undefined를 반환

## 사용법

```js
let user = {};

alert(user && user.number && user.number.phone); // undefined
```

```js
let user = {};

alert(user?.number?.phone); // undefined
```

---
참고  
[1] https://haesoo9410.tistory.com/156