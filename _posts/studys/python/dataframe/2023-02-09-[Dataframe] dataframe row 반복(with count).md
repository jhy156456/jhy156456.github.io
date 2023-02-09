---
layout: blog
study: true
background: purple
category: study
categories: python/dataframe
title: "[Dataframe] dataframe row 반복(with count)"
date: 2021-11-30 10:06:42
tags:
- python
- dataframe
---

# 코드

```python
for i, (idx, row) in enumerate(test_df.iterrows()):
    print(i)
```