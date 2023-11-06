---
layout: blog
study: true
background: red
category: study
categories: web
title: '[web] unable to resolve dependency tree error'
date: 2023-03-14 10:20:00
tags:
  - web
  - javascript
  - eslint
  - prettier
---

# 원인

- 2021년 2월 출시된 npm 7버전부터 추가된 peerDependencies를 자동으로 설치하는 기능

## npm의 의존성 관리

npm은 아래 5가지 종류의 의존성을 제공하고 있다.

### dependencies

프로젝트에서 실제로 의존하고 호출하는 의존성들

### devDependencies

개발할 때만 의존하는 의존성들(예를 들면 코드 포맷팅을 예쁘게 해주는 라이브러리)

### peerDependencies

내 패키지가 다른 패키지로부터 직접 불려지는(require) 것은 아니지만 특정 버전의 패키지와 호환된다는 것을 명시
즉, 내가 다른 패키지의 특정 버전과 호환된다는 것을 뜻한다

### optionalDependencies

선택적인 의존성으로 없거나 설치에 실패해도 npm 패키지 설치 과정이 중단되지 않아 다른 라이브러리 설치에 영향을 주지 않는 의존성들

### bundledDependencies

내 패키지와 함께 제공되는 일련의 패키지들. 타사 라이브러리가 NPM에 없거나 일부 프로젝트를 모듈에 포함하려는 경우 사용할 수 있다.

# 해결

npm install 모듈명 명령어 뒤에 --legacy-peer-deps 또는 --force를 추가해주면 된다.

## --legacy-peer-deps

npm 4 ~ 6버전 때처럼 peerDependencies를 자동으로 설치하지 않도록 설정하는 것이고,

## --force

충돌이 일어난 peerDependecies를 강제로 설치하도록 설정하는 것

___
참고  
[1] https://tesseractjh.tistory.com/234
[2] https://www.korecmblog.com/ERESOLVE-unable-to-resolve-dependency-tree/