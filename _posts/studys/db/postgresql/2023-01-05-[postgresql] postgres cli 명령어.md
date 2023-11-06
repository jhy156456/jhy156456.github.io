---
layout: blog
study: true
background-image: http://ot1cc1u9t.bkt.clouddn.com/17-8-1/24280498.jpg
background: yellow
category: study
categories: db/postgresql
title: "[postgresql] postgres cli 명령어"
date: 2022-12-05 10:16:42
tags:
  - db
  - postgresql
---

# [postgresql] postgres cli 명령어

## postgres 접속 명령어

```sql
# localhost의 5432 port로 Postgresql 접속을 시도. Target DB는 현재 사용자 이름과 동일한 'jhy156456'
[jhy156456@localhost ~]$ psql

# localhost의 5432 port로 Postgresql 접속을 시도. 접속 User는 'postgres'이며 Target DB는 접속 User와 동일한 'postgres'
[jhy156456@localhost ~]$ psql -U postgres

# 10.52.0.1의 5432 port로 Postgresql 접속을 시도. 접속 User는 'jhy156456'이며 Target DB는 현재 사용자 이름과 동일한 'jhy156456'
[jhy156456@localhost ~]$ psql -h 10.52.0.1 

# 10.52.0.1의 5432 port로 Postgresql 접속을 시도. 접속 User는 'posgres'이며 Target DB는 접속 User와 동일한 'jhy156456'
[jhy156456@localhost ~]$ psql -h 10.52.0.1 -U posgres

# 10.52.0.1의 5432 port로 Postgresql 접속을 시도. 접속 User는 'jhy156456'이며 Target DB는 'galaxy'
[jhy156456@localhost ~]$ psql -h 10.52.0.1 -U jhy156456 galaxy
[jhy156456@localhost ~]$ psql -h 10.52.0.1 -U jhy156456 -d galaxy

# 10.52.0.1의 9000 port로 Postgresql 접속을 시도. 접속 User는 'jhy156456'이며 Target DB는 'galaxy'
[jhy156456@localhost ~]$ psql -h 10.52.0.1 -p 9000 -U jhy156456 galaxy
[jhy156456@localhost ~]$ psql -h 10.52.0.1 -p 9000 -U jhy156456 -d galaxy
```

참고  
[1] https://jhy156456.tistory.com/51