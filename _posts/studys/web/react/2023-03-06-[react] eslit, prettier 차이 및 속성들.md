---
layout: blog
study: true
background: red
category: study
categories: web/react
title: "[react] eslit, prettier 차이 및 속성들"
date: 2023-03-06 10:20:00
tags:
- web
- javascript
- eslint
- prettier
---

# eslint란

```js
// 함수형 키워드 사용
function foo() {
 ...
}

// 화살표 사용
const foo = () => {
 ...
}
```

위 코드 처럼 javascript 문법의 코드 스타일을 일관성있게 통일시켜 주기 위해서 사용한다.

# prettier란
```js
const foo = () => {
      const a = [4, 5, 6]; // 들여쓰기 2회 이상 불가  
}
   // <= empty line이 한 줄 이상 되면 안됨.
foo();
```
위 코드 처럼 IDE에서 공백, 들여쓰기, 줄바꿈 등의 외향적인 코드 스타일을 통일시켜 주기 위해서 사용한다.

## 셋팅방법
1. IDE내에서 프로젝트 전체적으로 적용될 수 있도록 extension 설치
2. 프로젝트 내에서만 적용될 수 있도록 eslintrc에 셋팅 및 prettierrc.json 파일 적용
```js
# eslintrc 파일에
{
  "extends": ["plugin:prettier/recommended"]
}
```
코드를 추가하여  root 디렉토리의 .prettierrc 파일이 있는지를 찾고, 해당 파일의 rule을 이용하게 된다.


참고  
[1] https://helloinyong.tistory.com/325
