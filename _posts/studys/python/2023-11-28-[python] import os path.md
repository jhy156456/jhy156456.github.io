---
layout: blog
study: true
background: purple
category: study
categories: python
title: "[python] 현재 path 구하기"
date: 2023-11-28 08:49:42
tags:

- phyton
- os

---

# 코드가 들어있는 파일까지의 경로

- 실행 경로가 `~/main/run.py`
- 코드가 들어있는 경로는 `~main/src/utils/logger.py` 일때

```python
import os
print(__file__)
print(os.path.realpath(__file__))
print(os.path.abspath(__file__))

~main/src/utils/logger.py
~main/src/utils/logger.py
~main/src/utils/logger.py
```

# 실행시킨 파일기준

- 실행 경로가 `~/main/run.py`
- 코드가 들어있는 경로는 `~main/src/utils/logger.py` 일때

```python
print(os.getcwd())
print(os.path.dirname(os.path.realpath(__file__)))

main
main/src/utils
```
