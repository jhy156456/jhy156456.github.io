---
layout: blog
study: true
background: purple
category: study
categories: python
title: "[python] create_engine schema setting"
date: 2023-01-05 13:00:00
tags:
  - db
  - python
---

# [python] create_engine schema setting

## postgres 접속 명령어

```python
db_connection_str = 'postgresql://postgres:asdfqwer@127.0.0.1:5432/db_name'
db_connection = create_engine(db_connection_str, connect_args={'options': '-csearch_path={}'.format('db_schema')})
conn = db_connection.connect()
```

