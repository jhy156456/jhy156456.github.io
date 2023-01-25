---
layout: blog
study: true
background: purple
category: study
categories: python
title: "[python] __name__, __init__, __self__, etc"
date: 2023-01-05 08:37:00
tags:
- phyton
- os
---
# [python] __name__, __init__, __self__, etc
 
 ## __name__

 ```python
if __name__ == "__main__":
# 코드    
 ```

- 위 명령어는 파이썬 파일이 임포트된 경우가 아니라 인터프리터(IDE)에서 직접 실행된 경우에만, if문 이하의 코드를 실행하는 명령입니다. 
- 현재 모듈의 이름을 담고있는 변수
- 이 변수는 직접 실행된 모듈의 경우 __main__ 값을 가지게 되며, 직접 실행되지 않은 import된 모듈은 모듈의 이름(파일명)
- 인터프리터(IDE)가 실행 전에 작성 한 글로벌 변수입니다.

## __init__

- 생성자 초기화를 위한 함수(메소드)
- 인스턴스(객체)화를 실시할 때 호출되는 함수
- 오브젝트 생성(인스턴스를 생성)과 관련하여 데이터의 초기를 실시하는 함수

## __call__
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




참고  
[1] https://m.blog.naver.com/gmlehde/221893793424
