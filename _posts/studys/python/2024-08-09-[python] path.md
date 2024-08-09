---
layout: blog
study: true
background: purple
category: study
categories: python
title: "[python] path"
date: 2024-08-09 13:27:00
tags:

  - python
  - path

---

# logger.py

```python
from pathlib import Path
Path().cwd() / 'logs'
```

``Path().cwd()`` : Return a new path pointing to the current working directory

## 문제

위와 같은 코드로 로그파일을 만들고 있었다. 이 때 메인경로에 있는 파일을 실행 시키는 것이 아닌  
src/script 폴더 안에서 파일을 실행시켰을 때 경로를 못찾아서 오류가 발생하는 문제가 있었다.

## 해결

src/script 폴더 안에서 파일을 실행시키면 ``Path().cwd()``함수는 실행시킨 파일을 메인 경로로 인식하여  
여기에 뒷경로를 붙이면 처음 설정해놓은 기댓값인 메인경로/logs가 아닌 메인경로/src/script/logs로 인식하여  
FileNotFoundError가 발생하게 된다. 따라서 특정 폴더 안에서 실행시킬 일이 있으면 경로를 수정해주어야 한다.

