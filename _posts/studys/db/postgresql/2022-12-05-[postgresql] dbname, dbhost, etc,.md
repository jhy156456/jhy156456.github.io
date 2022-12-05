---
layout: blog
study: true
background-image: http://ot1cc1u9t.bkt.clouddn.com/17-8-1/24280498.jpg
background: yellow
category: study
categories: db/postgres
title: "[postgresql] dbname, dbhost, etc, permission denied to create database"
date: 2022-12-05 10:16:42
tags:
- db
- postgres
---

# [postgresql] dbname, dbhost, etc, permission denied to create database


## database

- `\list` 명령어로 List of databases 조회

- db 생성
  
  ```sql
  psql -U postgres 로 포스트그레 접속
  create database dbname
  ```

### permission denied to create database 문제발생

![](../../../assets/images/study/db/postgresql/스크린샷%202022-12-05%20오전%2010.06.50.png)

위 표를 보면 현재 postgres로 접속했는데 postgres user는 권한이 없기때문에 발생 한 현상임.

따라서 권한을 주어야함.

```sql
psql -U[대괄호빼고 위에 모든 역할을 갖고있는아이디 입력] postgres
```

위 명령어로 psql 접속

```shell
postgres=# ALTER user postgres createdb;
ALTER ROLE
```

![](../../../assets/images/study/db/postgresql/스크린샷%202022-12-05%20오전%2010.13.06.png)

DB 권한 부여 확인 및 create database 진행 성공!

## Username

- `\du` 명령어로 List of rolse Attributes조회

- Role name 에 username이 없을 떄

![](../../../assets/images/study/db/postgresql/스크린샷%202022-12-05%20오전%209.16.02.png)

이 셋팅으로는 연결이 되지 않음

- `create role username with login password 'asdfqwer';`  명령어로 username을 갖는 role 생성시 연결 성공

![](../../../assets/images/study/db/postgresql/스크린샷%202022-12-05%20오전%209.23.59.png)

## Password
