---
layout: blog
study: true
background: purple
category: study
categories: python
title: "[python] decorator(annotation) 정리"
date: 2023-02-28 10:40:00
tags:
- phyton
- global
---


# 메서드

## @classmethod
```python
    @classmethod
    def get_network(cls):
```
- 객체 인스턴스를 의미하는 self 대신 cls 라는 클래스를 의미하는 파라미터 사용
- cls 파라미터를 통해 클래스 변수 등을 엑세스할 수 있다.
- 클래스 변수를 엑세스할 필요가 있을 때는 클래스 메서드를, 이를 엑세스할 필요가 없을 때는 정적 메서드를

### 클래스 변수(Static variable = Class variable)

```python
class MyClass:
    count = 0  # 클래스 변수
```
- 해당 클래스를 사용하는 모두에게 공용으로 사용되는 변수
- MyClass.count로 접근 가능

## @instancemethod

### 인스턴스 변수
- 인스턴스를 생성해서 사용할 수 있는 변수

## @staticmethod




참고  
[1] https://frenchkebab.tistory.com/56