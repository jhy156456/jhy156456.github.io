---
layout: blog
study: true
background: yellow
category: study
categories: data-engineer/spark
title: "[spark] pyspark import TypeError: an integer is required (got type bytes) "
date: 2023-01-16 14:00:00
tags:
- de
- spark
- data-engineer
---

# 문제 발생
`conda install pyspark` 로 스파크 라이브러리 설치 후  
`import pyspark` 를 수행하면 pyspark import TypeError: an integer is required (got type bytes)  에러 발생

# 원인
python version이 3.8이고 pyspark가 2.4.4버전으로 설치 되었기 때문에 버전 호환성이 안맞아서 발생하는 문제.

# 해결
1. python version을 3.7로 내리는 방법
2. `pip install --upgrade pyspark` 명령어를 통해 pyspark라이브러리 버전을 업데이트 하는 방법  

나는 2번으로 해결했다.



참고  
[1] https://stackoverflow.com/questions/58700384/how-to-fix-typeerror-an-integer-is-required-got-type-bytes-error-when-tryin