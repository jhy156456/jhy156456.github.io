---
layout: blog
study: true
background: yellow
category: study
categories: web/javascript
title: "[javascript] await, async, promise, then"
date: 2023-08-17 08:30:00
tags:
- web
- javascript
- async
- await
- promise
- then
---


# promise, then
- 비동기 처리를 효율적으로 수행시켜줌
- 비동기 처리시 콜백함수를 연달아 적용하여 콜백지옥을 해결해줌
- `new Promise` 수행 순간 코드가 실행되기 때문에 함수안에 넣어줌

## 콜백지옥 예시

```js
loadScript('1.js', function(error, script) {

    if (error) {
      handleError(error);
    } else {
      // ...
      loadScript('2.js', function(error, script) {
        if (error) {
          handleError(error);
        } else {
          // ...
          loadScript('3.js', function(error, script) {
            if (error) {
              handleError(error);
            } else {
              // 모든 스크립트가 로딩된 후, 실행 흐름이 이어집니다. (*)
            }
          });
  
        }
      })
    }
  });
```

## 정리 후

```js
loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("/article/promise-chaining/two.js"))
  .then(script => loadScript("/article/promise-chaining/three.js"))
  .then(script => {
    // 스크립트를 정상적으로 불러왔기 때문에 스크립트 내의 함수를 호출할 수 있습니다.
    one();
    two();
    three();
  });
```

## promise 사용법

```js
new Promise((resolve, reject) => {
  // doing some heavy work (network, read files)
  console.log('doing something...');
  setTimeout(() => {
    // resolve('ellie');
    console.log("hihi")
    // reject(new Error('no network'));
  }, 2000);
});
// doing something...
// 2초후
// hihi
```

```js
// 4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐓'), 1000);
  });
const getEgg = hen =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`error! ${hen} => 🥚`)), 1000);
  });
const cook = egg =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000);
  });

getHen() //
  .then(getEgg)
  .then(egg => cook(egg))
  .then(console.log)
  .catch(console.log);
```


# async, await
- 비동기 호출을 수행하는 promise코드를 동기 호출하는 것 처럼 보이게 하는 기법
- await은 `asnyc function` 내부에서만 사용 할 수 있고 async function의 return은 `new Promise`임
- async & await는 Promise 객체를 반환하며 ⇒ then을 사용할 수 있다.

## async

```js
// 1. async
async function fetchUser() {
  // do network reqeust in 10 secs....
  return 'ellie';
}

const user = fetchUser();
user.then(console.log); // ellie
console.log(user); // Promise {}
```

## await

```js

```

---
참고  
[1] https://www.youtube.com/watch?v=JB_yU6Oe2eE&t=1330s  
[2] https://dewworld27.tistory.com/entry/promise%EB%A1%9C-%EC%BD%9C%EB%B0%B1%EC%A7%80%EC%98%A5callback-hell-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0