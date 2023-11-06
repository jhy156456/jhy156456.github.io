---
layout: blog
study: true
background: purple
category: study
categories: python
title: "[python] 전역변수(global) 사용법"
date: 2023-02-14 10:40:00
tags:
  - python
  - global
  - os
---

# 변수의 유효 범위(variable scope)

변수가 선언된 위치에 따라 해당 변수가 영향을 미치는 범위

# 전역변수

- 함수 밖에서 변수 선언 후에 함수 내부 등에서 지역적이 아닌 전역으로 사용할 수 있는 변수

## 지역변수란?

- 지역변수는 함수가 호출되면 만들어져서, 함수의 실행이 끝날 때 함께 없어지는 변수

```python
hi = 1

def test():
    hi = 2

test()
print(hi)
# 1
```

```python
def test():
    test_val = 2

test()
print(test_val)
# NameError: name 'test_val' is not defined
```

# 전역변수 예시

```python
global hi
hi = 1

def test():
    global hi
    hi = 2

test()
print(hi)
# 2
```

```python
def test():
    global hi
    hi = 2

test()
print(hi)
# 2
```

```python
global_test_val = 1
def test():
    global global_test_val
    global_test_val = 2

test()
print(global_test_val)
```

참고  
[1] http://www.tcpschool.com/python2018/python_function_scope