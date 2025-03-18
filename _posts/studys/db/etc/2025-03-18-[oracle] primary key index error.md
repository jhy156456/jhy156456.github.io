---
layout: blog
study: true
background: yellow
category: study
categories: db/etc
title: "[oracle] primary key 수정 후 무결성 제약조건(ORA-00001) 사라지지 않음 현상"
date: 2025-03-18 09:58:42
tags:
  - db
  - oracle
---

# 문제발생

A_TABLE에 A,B,C 컬럼 외에 D 컬럼을 프라이머리키로 추가했다.

```sql
ALTER TABLE A_TABLE DROP CONSTRAINT SYS_0

ALTER TABLE A_TABLE ADD CONSTRAINT SYS_0 PRIMARY KEY (
A
, B
, C
, D
)

```

위 명령어로 추가 후 MERGE WHEN MATCHED THEN 명령어로 ON절에 A,B,C,D를 넣고 SQL을 실행했지만,  
D값의 PRIMARY KEY가 반영되지 않아, A,B,C 값 중복으로 인해 무결성 제약조건 오류가 발생했다.

# 원인

몇 시간 동안 GPT와 쿼리를 쳐다보다가 DDL을 확인해보니 SYS_0_PK라는 INDEX가 있었다

```sql
CREATE UNIQUE INDEX "OWNER"."A_TABLE_PK" ON "OWNER"."A_TABLE" ("A", "B", "C")
~~

```

PK에 대한 인덱스는 A,B,C이고 프라이머리키를 수정했지만 인덱스는 반영되지 않았다.

이렇게 생성된 원인은 정확히 모르겠지만, 인덱스 값 때문에 기존 인덱스를 그대로 재사용하여 수정 한 키값을 제대로 탐색하지 않았었다.

# 해결

1. 테이블 전체 삭제 후 다시 생성
2. INDEX값 확인 후 PRIMARY KEY와 INDEX값이 다르다면, 둘 다 삭제후 ALTER
   나의 경우는 2번으로 진행했다.

```sql
-- 1. 기존 제약조건 삭제
ALTER TABLE OWNER.A_TABLE
DROP CONSTRAINT SYS_0;

-- 2. 필요하다면 기존 인덱스도 삭제
DROP INDEX OWNER.A_TABLE_PK;

-- 3. 새로운 PRIMARY KEY 제약조건 추가 (원하는 컬럼으로)
ALTER TABLE OWNER.A_TABLE
ADD CONSTRAINT SYS_0 PRIMARY KEY (D);
```