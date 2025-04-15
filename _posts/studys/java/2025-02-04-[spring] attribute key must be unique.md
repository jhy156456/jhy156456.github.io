---
layout: blog
study: true
background: blue
category: study
categories: java
title: "[spring] attribute key must be unique"
date: 2025-04-04 13:16:42
tags:
  - db
  - oracle
---

# 문제

spring에서 jdbc와 dao-hqml로 연결된 oracle 쿼리에서 `attribute key must be unique`가 발생했다.  
오류가 발생한 쿼리를 DBeaver에서 실행해 본 결과 정상적으로 실행되었다.

# 원인

쿼리에 중복 컬럼이 존재했다. 중복컬럼이 존재할 경우 스프링에서 로우별로 map에 저장할 때 동일한 이름의 key가 존재하여 발생한 오류였다.  
쿼리에 NAME컬럼이 2개가 있었는데, 1개의 NAME 컬럼은 다른 테이블에서 가져온 후 AS NAME으로 이름을 설정해 주었기 때문에 실행시엔 컬럼명이 동일해도 오류가 발생하지 않았다.

```sql
SELECT NO,
       (SELECT Decode('ko_Kr', 'ko_Kr', NAME,
                               ENG_NAME)
        FROM   ITEM
        WHERE  1 = 1
               AND CD = CD) AS NAME,
       NAME
FROM   STAT A       
```

# 해결

사용하지않는 NAME 컬럼을 삭제

