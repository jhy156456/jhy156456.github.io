---
layout: blog
study: true
background: purple
category: study
categories: python/dataframe
title: "[Dataframe] dataframe multiple column to one column"
date: 2023-02-17 08:20
tags:
- python
- dataframe
---

# 코드

```
    column1  column2  column3
0          0         0         0
1          1         1         1
2          2         2         2
```

```python
df.values.ravel('F')
```

```
    column1  
0          0 
1          1 
2          2 
3          0
4          1
5          2
6          0
7          1
8          2
```

