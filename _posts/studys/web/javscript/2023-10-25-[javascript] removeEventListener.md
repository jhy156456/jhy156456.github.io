~~---
layout: blog
study: true
background: yellow
category: study
categories: web/javascript
title: "[javascript] evenetlistener 삭제 방법"
date: 2023-10-25 10:12:00
tags:

- remove
- click
- web
- javascript

---

# 문제 발생

특정 상황에 따라 eventListener 함수를 변경해야 한다.  
웹 검색 결과 eventListener 들을 전체 삭제하는 방법이 몇가지 있었다.

```js
box.replaceWith(box.cloneNode(true));
```

위 함수와

```js
box.outerHTML = box.outerHTML
```

하지만 위 방법 다 작동하지 않았다.

# 해결

방법은 익명함수를 사용하지않고 함수를 선언한 후에 세번째 인자를 true로 주어 remove를 적용하는 방법이다.

```js
function foo(event) {
  app.addSpot(event.clientX, event.clientY);
  app.addFlag = 1;
}

area.addEventListener('click', foo, true);
area.removeEventListener('click', foo, true);
```

이때 유의 할 점은 세번째인자를 꼭 true로 줘야한다.  
세번째 인자는  https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener 사이트에 의하면,

---
**`options`** Optional
An object that specifies characteristics about the event listener. The available options are:

`capture` Optional
A boolean value indicating that events of this type will be dispatched to the registered listener before being
dispatched to any EventTarget beneath it in the DOM tree. If not specified, defaults to false.

`once` Optional
A boolean value indicating that the listener should be invoked at most once after being added. If true, the listener
would be automatically removed when invoked. If not specified, defaults to false.

`passive` Optional
A boolean value that, if true, indicates that the function specified by listener will never call preventDefault(). If a
passive listener does call preventDefault(), the user agent will do nothing other than generate a console warning.

If this option is not specified it defaults to false – except that in browsers other than Safari, it defaults to true
for wheel, mousewheel, touchstart and touchmove events. See Using passive listeners to learn more.

`signal` Optional
An AbortSignal. The listener will be removed when the given AbortSignal object's abort() method is called. If not
specified, no AbortSignal is associated with the listener.
---

랍니다^^

## 자주 사용하는 이벤트의 종류

- **click** – 마우스버튼을 클릭하고 버튼에서 손가락을 떼면 발생한다.
- **mouseover** – 마우스를 HTML요소 위에 올리면 발생한다.
- **mouseout** – 마우스가 HTML요소 밖으로 벗어날 때 발생한다.
- **mousedown** – 클릭을 하기 위해 마우스버튼을 누르고 아직 떼기 전인 그 순간, HTML요소를 드래그할 때 사용할 수 있다.
- **mouseup** – 마우스버튼을 떼는 그 순간, 드래그한 HTML요소를 어딘가에 놓을 때 사용할 수 있다.
- **mousemove** – 마우스가 움직일때마다 발생한다. 마우스커서의 현재 위치를 계속 기록하는 것에 사용할 수 있다.
- **focus** – HTML요소에 포커스가 갔을때 발생한다.
- **blur** – HTML요소가 포커스에서 벗어났을때 발생한다.
- **keypress** – 키를 누르는 순간에 발생하고 키를 누르고 있는 동안 계속해서 발생한다.
- **keydown** – 키를 누를 때 발생한다.
- **keyup** – 키를 눌렀다가 떼는 순간에 발생한다.
- **load** – 웹페이지에서 사용할 모든 파일의 다운로드가 완료되었을때 발생한다.
- **resize** – 브라우저 창의 크기를 조절할때 발생한다.
- **scroll** – 스크롤바를 드래그하거나 키보드(up, down)를 사용하거나 마우스 휠을 사용해서 웹페이지를 스크롤할 때 발생한다. 페이지에 스크롤바가 없다면 이벤트는 발생하지 않다.
- **unload** – 링크를 클릭해서 다른 페이지로 이동하거나 브라우저 탭을 닫을 때 혹은 브라우저 창을 닫을 때 이벤트가 발생한다.
- **change** – 폼 필드의 상태가 변경되었을 때 발생한다. 라디오 버튼을 클릭하거나 셀렉트 박스에서 값을 선택하는 경우를 예로 들수 있다.

---
참고  
[1] https://stackoverflow.com/questions/10444077/javascript-removeeventlistener-not-working  
[2] https://kyounghwan01.github.io/blog/JS/JSbasic/addEventListener/~~