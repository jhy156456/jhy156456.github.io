---
layout: blog
study: true
background: blue
category: study
categories: java
title: "[spring] 인덱스에서 누락된 IN 또는 OUT 매개변수::11 "
date: 2025-04-15 13:16:42
tags:
  - db
  - oracle
---

# 문제

spring에서 jdbc와 dao-hqml로 연결된 oracle 쿼리에서 `인덱스에서 누락된 IN 또는 OUT 매개변수::11 `가 발생했다.  
오류가 발생한 쿼리를 DBeaver에서 실행해 본 결과 정상적으로 실행되었다.

# 원인

쿼리를 dbeaver기본에서 제공하는 reformat메뉴로 줄정리를 실행했을때 문제가 발생했다.

#### 줄정리 수행항 쿼리

```sql
PIVOT (
        <#IF customWhere ??>
        ${customWhere}
        </#IF>
)    
```

#### 정상 쿼리

```sql
PIVOT (
        <#if customWhere??>
        ${customWhere}
        </#if>
) 
```

대문자 전환은 괜찮은데 ??가 띄어쓰기가 들어가면서 spring에서 정상 인식하지 않았다.

# 해결

??앞 띄어쓰기를 제거하여 해결했다. 줄정리 할 때 조심해야 함

