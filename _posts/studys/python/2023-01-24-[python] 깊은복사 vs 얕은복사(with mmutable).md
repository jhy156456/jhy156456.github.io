---
layout: blog
study: true
background: purple
category: study
categories: python
title: "[python] 깊은복사 vs 얕은복사(with mmutable)"
date: 2023-01-24 23:00:00
tags:
  - python
  - copy
---

# mutable vs immutable

## mutable

- 변하기 쉬운
- 수정 가능한 객체
- list, tuble...

## immutable

- 불변의
- 수정 불가능한 객체
- int ,float ...

# 얕은복사 vs 깊은복사

## 얕은복사

- 참조하는 객체의 주소 복사

### =

- 참조만 복사
- 객체를 가르키는 변수를 수정하면 복사한 변수도 동일한 객체를 가르키고 있기 때문에 같이 수정됨

### `arr.copy, copy.copy(), slicing`

- 리스트를 새롭게 생성하여 복사함
- 리스트 안에 존재하는 리스트는 =얕은복사와 동일한 방식이므로 깊은 복사는 아님

## 깊은복사

### `copy.deepcopy()`

- 새로운 매모리에 값을 할당하여 복사
- 리스트 내부 리스트, 딕셔너리 내부 리스트 등 내부에 있는 객체 모두 새롭게 만듦

