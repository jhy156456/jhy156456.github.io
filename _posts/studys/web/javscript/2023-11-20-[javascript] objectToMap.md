---
layout: blog
study: true
background: yellow
category: study
categories: web/javascript
title: "[javascript] object안에있는 object및 Array 및 Array안에있는 object들 모두를 map으로 recursive하게 변환하기"
date: 2023-11-09 10:12:00
tags:
  - object
  - Type
  - Map
  - javascript

---

# Object To MAp

## 질문

javascript 에서 object 타입을 map타입으로 변환할 때 배열 안에 있는 object들도 map으로 변환시킬 수 있게 reucrsive형태로 짜줘

## 답변

```javascript
function objectToMap(obj) {
  // 만약 obj가 객체가 아니라면 그냥 반환
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // 만약 obj가 배열이라면 배열의 각 요소에 대해 재귀적으로 objectToMap 호출
  if (Array.isArray(obj)) {
    return obj.map(item => objectToMap(item));
  }

  // 만약 obj가 객체라면 각 속성을 맵으로 변환
  const mapObj = new Map();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      mapObj.set(key, objectToMap(obj[key]));
    }
  }

  return mapObj;
}

// 예제 사용
const originalObject = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    country: 'USA'
  },
  hobbies: ['reading', 'traveling']
};

const resultMap = objectToMap(originalObject);
console.log(resultMap);
/**
 Map(4) {
 'name' => 'John',
 'age' => 30,
 'address' => Map(2) { 'city' => 'New York', 'country' => 'USA' },
 'hobbies' => [ 'reading', 'traveling' ]
 }
 */

```

# Map To Object

## 질문

javascript 에서 Map타입을 Object타입으로 변환할 때 배열 안에 있는 Map들도 전부 Object로 변환시킬 수 있게 reucrsive형태로 짜줘

## 답변

```javascript
function mapToObject(map) {
  if (!(map instanceof Map)) {
    return map;
  }

  const obj = {};
  map.forEach((value, key) => {
    if (Array.isArray(value)) {
      obj[key] = value.map(item => mapToObject(item));
    } else if (value instanceof Map) {
      obj[key] = mapToObject(value);
    } else {
      obj[key] = value;
    }
  });

  return obj;
}

// 예제 사용
const originalMap = new Map([
  ['name', 'John'],
  ['age', 30],
  ['address', new Map([
    ['city', 'New York'],
    ['country', 'USA']
  ])],
  ['hobbies', [
    new Map([
      ['type', 'reading'],
      ['level', 'high']
    ]),
    new Map([
      ['type', 'traveling'],
      ['level', 'medium']
    ])
  ]]
]);

const resultObject = mapToObject(originalMap);
console.log(resultObject);
/**
 {
 name: 'John',
 age: 30,
 address: { city: 'New York', country: 'USA' },
 hobbies: [
 { type: 'reading', level: 'high' },
 { type: 'traveling', level: 'medium' }
 ]
 }
 */
```

---
참고  
[1] chatGPT