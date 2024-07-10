---
layout: blog
study: true
background: purple
category: study
categories: python
title: "[python] reduce"
date: 2024-07-10 09:44:42
tags:

- phyton
- reduce

---

# reduce
Python의 reduce 함수는 functools 모듈에 포함된 고차 함수로, 주어진 이터러블(iterable) 객체에 지정된 이진 함수(binary function)를 누적하여 하나의 값으로 줄이는 역할을 한다.   
reduce 함수는 리스트나 튜플과 같은 시퀀스 자료형을 처리할 때 유용하게 사용할 수 있다.

## 예제코드
- 리스트의 모든 요소를 더하여 하나의 값으로 줄이는 예제
```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# 두 수를 더하는 함수 정의
def add(x, y):
    return x + y

# reduce 함수를 사용하여 리스트 요소의 합 계산
result = reduce(add, numbers)
print(result)  # 출력: 15
```

- reduce 함수에 초기값을 지정하여 첫 번째 인수로 초기값이 사용
```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# 두 수를 더하는 함수 정의
def add(x, y):
    return x + y

# 초기값을 10으로 지정하여 리스트 요소의 합 계산
result = reduce(add, numbers, 10)
print(result)  # 출력: 25
```

