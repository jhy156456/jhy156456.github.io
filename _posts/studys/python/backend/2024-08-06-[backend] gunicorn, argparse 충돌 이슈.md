---
layout: blog
study: true
background: transparent
background-image: ../../../../assets/images/study/python/backend/fastapi.png
category: study
categories: python/backend
title: "[backend] gunicorn, argparse conflict issue"
date: 2024-08-06 17:20:00
tags:
  - python
  - fastapi
  - asgi
  - argparse
---

# 문제

위와 같이 arg_parse.py파일이 있을때 gunicorn으로 파이썬을 실행시켰을 때 해당 모듈의 get_args()함수를 실행시키는 코드가 있었다.   
이 때 gunicorn 실행 인자들을 argparse가 인식하여 실행 인자들이 충돌해 오류가 발생하는 문제가 있었음.

# argparse 사용

arg_parser.py

```python
import argparse

def get_args():
  parser = argparse.ArgumentParser(description="Example with required argument")
  parser.add_argument('--myarg', type=str, help="A required argument")
  parser.add_argument('--myarg2', type=str, required=True, help="A required argument")
  
  args = parser.parse_args()
  return args

```

# gunicorn 실행 명령어

``gunicorn main:app --log-level debug --access-logfile``

## 해결

``parse_args()``함수를 ``parse_known_args()`` 함수로 변경하여 알고있는 인자와 모르는 인자를 분리한다.

```python
  parser = argparse.ArgumentParser(description="Example with required argument")
  parser.add_argument('--myarg', type=str, help="A required argument")
  parser.add_argument('--myarg2', type=str, help="A required argument")
  
  args, unknown = parser.parse_known_args()
  print(args)
  # NameSpace(myarg=None)..
  print(unknown)
  # ['main:app', '--log-level', 'debug',..]
```