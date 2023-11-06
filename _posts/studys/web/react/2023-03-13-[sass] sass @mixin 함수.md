---
layout: blog
study: true
background: red
category: study
categories: web/react
title: '[sass] sass @mixin 함수'
date: 2023-03-13 10:20:00
tags:
  - web
  - javascript
  - eslint
  - prettier
---

# @mixin

- 반복적으로 재사용할 CSS 스타일 그룹 선언을 정의하는 기능
- 테마 값, ltr, rtl 등을 변수로 넘겨서 공통으로 사용할 수 있다.

## 함수 선언

```css
@mixin 믹스인 이름 {
    CSS 스타일
} 
```

## 함수 호출

```css
@include 믹스인 이름
```

## 사용법

### 1

```css
/
/
@mixin - 스타일 정의
@mixin 믹스인 이름 {
//CSS 스타일 내용
}

/
/
@include - 믹스인 호출
@include 믹스인 이름
```

## 파라미터 넘기기

```css
/
/
정의하기

@mixin 믹스인 이름($매개변수) {
//CSS 스타일 내용
}

/
/
호출하기

@include 믹스인 이름(인수);
```

## 사용법

- 디폴트 값 사용 x

```css
@mixin border-line($width, $style) {
    border: $ width $ style #000;
}

.border-box1 {
    @include border-line(2px, solid);
}
```

-> css 변환 코드

```css
.border-box1 {
    border: 2px solid #000;
}
```

## 기본값 설정 한 경우

- 디폴트 값 사용

```css
@mixin border-line($width: 2px, $style: dotted) {
    border: $ width $ style #000;
}

.border-box1 {
    @include border-line;
}
```

-> css 변환 코드

```css
.border-box1 {
    border: 2px dotted #000;
}
```

참고  
[1] https://www.biew.co.kr/entry/Sass%E3%86%8DSCSS-SASS-%EB%AC%B8%EB%B2%95-5%ED%8E%B8-mixin-extend-import