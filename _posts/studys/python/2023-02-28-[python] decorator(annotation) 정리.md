---
layout: blog
study: true
background: purple
category: study
categories: python
title: "[python] decorator(annotation) 정리"
date: 2023-02-28 10:40:00
tags:
  - python
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

- 자식 클래스에서 call가능
- 클래스 변수에 접근 가능
- 인스턴스 메소드 변수에 접근 불가능

```python
class Parent:
    class_val = 'class variable'

    def __init__(self):
        self.name = "hi"

    @staticmethod
    def check_static():
        print(self.name)

class Child(Parent):
    pass


child = Child()
child.check_static()

# NameError: name 'self' is not defined 
```

```python
class Parent:
    class_val = 'class variable'

    def __init__(self):
        self.name = "hi"

    @staticmethod
    def check_static():
        print("static call")

    @classmethod
    def check_class(cls):
        print(cls)
        print("class call")

class Child(Parent):
    pass


Child.check_static()
Child.check_class()

# static call
# <class '__main__.Child'>
# class call
```

### staticmethod vs classmethod

- staticmethod는 부모클래스에서 호출하던 자식 클래스에서 호출 하던 클래스 변수를 모두 바꿀 수 있다.
- classmethod에서는 부모 클래스 객체에서 선언해야만 자식 클래스의 클래스 변수까지 모두 바꿀 수 있다.

참고  
[1] https://frenchkebab.tistory.com/56  
[2] https://techblog-history-younghunjo1.tistory.com/217