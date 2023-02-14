---
layout: blog
study: true
background: purple
category: study
categories: python/dataframe
title: "[Dataframe] dataframe row 반복(with count), check dataframe last"
date: 2023-02-09 13:20:00
tags:
- python
- dataframe
---

# 코드

```python
for i, (idx, row) in enumerate(test_df.iterrows()):
    print(i)
```