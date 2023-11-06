---
layout: blog
study: true
background: purple
category: study
categories: python
title: "[python] __name__, __init__, __call__, self, etc"
date: 2023-01-05 08:37:00
tags:
  - phyton
  - os
---

# __name__

 ```python
if __name__ == "__main__":
# 코드    
 ```

- 위 명령어는 파이썬 파일이 임포트된 경우가 아니라 인터프리터(IDE)나 cmd 에서 `python ~~.py`로 직접 실행된 경우에만, if문 이하의 코드를 실행하는 명령입니다.
- 현재 모듈의 이름을 담고있는 변수
- 이 변수는 직접 실행된 모듈의 경우 __main__ 값을 가지게 되며, 직접 실행되지 않은 import된 모듈은 모듈의 이름(파일명)
- 인터프리터(IDE)가 실행 전에 작성 한 글로벌 변수입니다.

# __init__

- 생성자 초기화를 위한 함수(메소드)
- 인스턴스(객체)화를 실시할 때 호출되는 함수
- 오브젝트 생성(인스턴스를 생성)과 관련하여 데이터의 초기를 실시하는 함수

# __call__

- 인스턴스가 호출됐을 때 실행

```python
class A:
    def __init__(self):
        print('init')
    def __call__(self):
        print('call')
    def myfunc(self):
        print('my')

a = A()
a()
a.myfunc()

"""
init
call
my
"""
```

# super

- 자식클래스가 부모클래스 상속할 떄 사용

## 사용방법

- `super().__init__()` → python 3 에서만 작동
- `super(클래스,self).__init__()` → python 2,3 모두 작동
- `class A <- class B(A)`

# self

- self는 클래스 인스턴스
- 클래스 내부에 정의된 함수를 만들 때 메서드의 첫번째 인자는 반드시 self여야 한다.
- 호출할 때 self를 인자로 넘기는것은 아님

```python
class Foo:
    def func1():
        print("function 1")

    def func2(self):
        print("function 2")

f = Foo()
f.func2()
# function 2
f.func1()
# TypeError: func1() takes 0 positional arguments but 1 was given
```

## func1

- "func1()은 인자가 없지만 인자 하나를 받았다"라는 에러를 발생

## func2

- func2함수의 첫 번째 인자인 self에 대한 값은 파이썬이 자동으로 넘겨준다

참고  
[1] https://m.blog.naver.com/gmlehde/221893793424  
[2] https://velog.io/@magnoliarfsit/RePython-1.-self-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0