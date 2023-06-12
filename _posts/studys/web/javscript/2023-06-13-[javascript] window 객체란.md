---
layout: blog
study: orange
background: transparent
category: study
categories: web/javascript
title: "[javascript] window 객체란"
date: 2023-06-13 08:30:00
tags:
- web
- javascript
- window
---

많은 시간에 걸쳐 진화를 거듭하면서 다양한 사용처와 플랫폼을 지원하게 된 자바스크립트는 본래 웹 브라우저에서 사용하려고 만든 언어이다. 그래서 사실 '웹'이라는 분야에서 자바스크립트는 거의 독보적인 존재라고 할 수 있는데 자바스크립트로 웹 브라우저를 자유롭게 다루려면 DOM, BOM, 그리고 window 객체와 document 객체를 이해해야 한다.



그중에서 이번 포스팅에서는 window 객체에 대해서 좀 살펴보자.



Window 객체란?
window 객체는 두 가지 역할을 하는데,



1. 브라우저 안의 모든 요소들이 소속된 객체로, 최상위에 있기 때문에 어디서든 접근이 가능하다고 해서 '전역 객체'라고도 부른다.

2. 일반적으로 우리가 열고 있는 브라우저의 창(browser window)을 의미하고, 이 창을 제어하는 다양한 메서드를 제공한다.



먼저, 위의 두 가지 역할 중 1번 역할에 대해서 살펴보자.



1. 전역객체로써 window

window객체는 문자 그대로 window라는 이름으로 접근할 수 있다.

```
window
```

브라우저 콘솔에서 그냥 window를 찍어보면,  
`> Window {parent: Window, opener: global, top: Window, length: 3, frames: Window, …}`  이런 값을 얻을 수 있고, 펼쳐보면 생각보다 뜸을 들이면서 펼쳐지는데 이 속에 무수하게 많은 프로퍼티들이 존재하는 것을 확인할 수 있다.



사실 이 안에 모든 프로퍼티들을 다 외울 필요도 없고 이해할 필요도 없지만, 한 가지 재미있는 사실로 우리가 작성하는 코드들은 대부분 다 이 window 객체의 프로퍼티가 된다는 사실을 기억해두자.



무슨 말이냐면,

```
var myName = 'Bigtop';

function getMyName() {
return myName;
}

console.log(window.myName); // Bigtop
console.log(window.getMyName()); // Bigtop
```

이렇게, 우리가 var 키워드로 변수를 선언하거나 함수를 선언하면, 다 이 window객체의 프로퍼티가 된다.

그럼에도 불구하고 우리는 그냥 변수와 함수를 선언하고서 앞에 window를 붙이지 않는데, 말 그대로 window는 전역 객체로 페이지 내에 있는 모든 객체를 다 포함하고 있기 때문에 window는 그냥 생략이 가능한 특징이 있다.



그래서 특별한 경우를 제외하면 사실상 window 객체를 직접적인 사용할 일은 드물다고 볼 수 있다.



하지만, 여기서 알아두면 쓸데없는 깨알 상식을 다루자면, let과 const 키워드로 선언한 변수는 블록 스코프이기 때문에 window 객체 내부의 블록에서 선언된 것으로 평가되어 전역 객체의 프로퍼티로 활용되기는 어렵다. 이 부분은 scope의 개념을 잘 이해하고 있다면 충분히 이해할 수 있는 부분이다.

```
let myName = 'Bigtop';

console.log(window.myName); // undefined
```

2. 브라우저의 창으로써 window

window 객체는 브라우저의 창을 대변하고, 다양한 메서드를 통해 이 창을 제어할 수 있다.



window.close(), window.open() 메서드를 활용하면, 창을 열거나 닫을 수 있고,

window.innerWidth, window.innerHeight 같은 프로퍼티에 접근하면 창의 너비와 높이 등을 확인할 수도 있다.





마무리
간단하게 window 객체에 대해서 알아봤는데 덤으로 전역 객체에 대한 개념도 살펴보게 되었다.

자바스크립트로 웹을 다루기 위해서는 기본적으로 알고 있어야 하는 부분이기 때문에 가볍게라도 정리해보았다.  



___
참고  
[1] https://bigtop.tistory.com/48

