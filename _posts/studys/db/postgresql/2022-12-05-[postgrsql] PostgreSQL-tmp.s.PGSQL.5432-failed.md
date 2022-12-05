---
layout: blog
study: true
background-image: http://ot1cc1u9t.bkt.clouddn.com/17-8-1/24280498.jpg
background: yellow
category: study
categories: db/postgres
title: "[postgrsql] PostgreSQL-tmp.s.PGSQL.5432-failed"
date: 2022-12-05 10:16:42
tags:
- db
- postgres
---

# [postgrsql] PostgreSQL-tmp.s.PGSQL.5432-failed



## 문제발생

- ``brew services start postgresql``  로 서비스 실행시 `ps-ef | grep sql` 로 서비스 확인해보면 프로세스가 뜨지 않았다

- psql 명령어로 실행시 `PostgreSQL-tmp.s.PGSQL.5432-failed` 에러가 발생했다.



## 해결

- 서비스 종료 후 관련내용삭제

```shell
brew services stop postgresql
brew uninstall --force postgresql
rm -rf /usr/local/var/postgresql
rm -rf .psql_history .psqlrc .psql.local .pgpass .psqlrc.local
brew cleanup
```

- `brew install postgresql@13` 버전명을 붙여서 설치

- `brew link postgresql@13` brew링크

- 정상작동!

## 추가

- `psql` 명령어 실행 시  `database "jhy" does not exist` 에러 발생하면
  
  ```sql
  psql -d template1
  
  명령어를 실행하여 
  
  createdb
  
  ```



를 실행한다 
