---
layout: blog
study: true
background-image : ../../../assets/images/study/web/superset/ScreenShot 2023-01-11 3.47.01.png
background: transparent
category: study
categories: web/superset
title: "[superset] superset sql query table chart hyperlink"
date: 2023-01-11 15:30:00
tags:
- web
- superset
- bi
---

superset table chart에 링크 넣는 방법이 잘 정리되어 있는게 없어서 정리합니다.

## 준비물  
1. 원하는 테이블 로우에 들어갈 URL 컬럼

## 절차

### Edit datasoruce 버튼 클릭
![](../../../assets/images/study/web/superset/ScreenShot 2023-01-11 3.45.56.png)

### SQL EXPRESSION
![](../../../assets/images/study/web/superset/ScreenShot 2023-01-11 3.46.21.png)
caculated columns 탭 클릭 후 합쳐질 새로운 컬럼명을 셋팅 하고 SQL EXPRESSION 적용
```sql
CONCAT('<a href="', URL이 들어있는 컬럼, '">', platform, '</a>')
```
또는 새롭게 넣을 URL
```sql
CONCAT('<a href="', 'https://www.google.com', '">', platform, '</a>')
```

### 기존 컬럼 화면
![](../../../assets/images/study/web/superset/ScreenShot 2023-01-11 3.47.01.png)

### 추가된 컬럼이 생긴 화면
![](../../../assets/images/study/web/superset/ScreenShot 2023-01-11 3.55.42.png)

### 새로 추가한 컬럼을 COLUMNS에 추가한 화면
![](../../../assets/images/study/web/superset/ScreenShot 2023-01-11 3.47.34.png)
위 화면의 hello컬럼을 보면 하이퍼링크가 생긴것을 확인할 수 있다.







참고  
[1] https://www.youtube.com/watch?v=KhQfnADr-4I&ab_channel=PresetUser%27sCorner


