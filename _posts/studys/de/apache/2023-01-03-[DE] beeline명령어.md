---
layout: blog
study: true
background-image: http://ot1cc1u9t.bkt.clouddn.com/17-8-1/24280498.jpg
background: yellow
category: study
categories: data-engineer/apache
title: "[DE] beeline 명령어"
date: 2022-12-14 14:25:00
tags:
- de
- data engineer
---

# [DE] beeline 명령어

## database 생성

```sql
create database if not exists testdb comment 'test database';
```
  
## imdb_movies table 생성
```sql
drop table if exists imdb_movies;
create table imdb_movies (
  rank int
  , title string
  , genre string
  , description string
  , director string
  , actors string
  , year string
  , runtime int
  , rating string
  , votes int
  , revenue string
  , metascore int
) row format delimited fields terminated by '\t';
```

## 컬럼 형변환

### 그냥 변경
```sql
ALTER TABLE imdb_movies CHANGE revenue revenue float;
```
### 새로운 컬럼 생성하고, 데이터 이동 및 변경(동일 컬럼은 타입 수정이 안된다고 함)
```sql
ALTER TABLE sales_staging CHANGE sale_date sale_date_new DATE;
```

### postgresql - string format to date
```sql
ALTER TABLE "MLT_MREP_REQ" ALTER COLUMN "REQ_YMD" TYPE DATE 
using to_date("REQ_YMD", 'YYYY-MM-DD');
```

참고   
[1] 모두의 연구소   
[2] https://stackoverflow.com/questions/18480503/sql-alter-column-datatype-from-nvarchar-to-int  
[3] https://stackoverflow.com/questions/17497560/is-there-a-way-to-alter-column-type-in-hive-table  
[4] https://stackoverflow.com/questions/37501437/alter-column-data-type-in-hive