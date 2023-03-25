---
layout: blog
study: true
background: purple
category: study
categories: python/dataframe
title: "[Dataframe] multiple list to dataframe"
date: 2023-02-17 10:40:10
tags:
- python
- dataframe
---

# 코드

```python
pd.DataFrame(list(zip(lst1, lst2, lst3)))
```

이렇게 하면 컬럼이 0,1,2 순으로 생성된다.  
컬럼과 함께 설정하고자 한다면

```python
pd.DataFrame(list(zip(lst1, lst2, lst3)),
              columns=['lst1_title','lst2_title', 'lst3_title'])
```
으로 설정한다.


참고  
[1] https://stackoverflow.com/questions/30522724/take-multiple-lists-into-dataframe
