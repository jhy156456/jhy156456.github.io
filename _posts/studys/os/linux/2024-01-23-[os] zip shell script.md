---
layout: blog
study: true
use_math: true
background: transparent
background-image: ../../../assets/images/study/os/shell_image.jpg
category: study
categories: os/linux
title: '[os] shell script로 특정 폴더, 파일을 제외하고 zip파일 만들기'
date: 2024-01-23 08:00:00
tags:
  - os
  - shell
  - divergence
---

# shell 코드

```shell
#!/bin/bash
# 압축 파일의 이름
zip_file="htomss_mobile_web.zip"

destination_folder="D:\dev-htomss\workspace\htomss-mobile-app\app\src\main\res\raw"
# 제외할 폴더를 제외한 모든 파일 및 폴더를 압축
zip -r "$destination_folder/$zip_file" . -x ./node_modules**\* ./.idea**\* ./htomss_mobile_web**\* ./makeZip**\*
echo "zip complete. zip name: $zip_file"
```

# shell파일에 주석달기

```shell
:<<"START"

START
```

# 참고

window는 zip명령어를 사용하기 위해

1. gitbash 설치
2. 아래 참고[1]을 참고하여 zip.exe, bzip2.dll다운
3. 다운받은 파일 2개를 C:\Program Files\Git\usr\bin 경로로 이동

---
참고  
[1] https://velog.io/@proshy/git-bash-zip%EB%AA%85%EB%A0%B9%EB%AC%B8%EC%9D%B4-%EC%9E%91%EB%8F%99%ED%95%98%EC%A7%80-%EC%95%8A%EC%9D%84-%EB%95%8C
