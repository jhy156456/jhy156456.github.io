---
layout: blog
study: true
background: yellow
category: study
categories: db/oracle
title: "[oracle] delete from table 했을 때 복구방법"
date: 2025-11-12 09:58:42
tags:
  - db
  - oracle
---

# 문제발생

테이블 명을 비슷하게 지어서 Table_a를 delete all 할 것을 Table_b를 해버림..

# 해결

디비 설정에 따라 다르겠지만 내가 사용하는 오라클 DB는 스냅샷이 저장되고 있었다.

```
SELECT * FROM Table_b AS OF timestamp to_timestamp('2025-11-01 16:23:00', 'YYYY-MM-DD HH24:MI:SS')
```

위 쿼리를 시간을 뒤로 돌리면서 수행하다 보면 저장되어있는 테이블의 스냅샷 데이터를 확인할 수 있다.
이 결과를 다시 insert하여 복구한다.

```