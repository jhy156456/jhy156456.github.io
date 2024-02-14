---
layout: blog
study: true
background: purple
category: study
categories: python/dataframe
title: "[Dataframe] dataframe에서 중복 컬럼 가져오기"
date: 2024-02-14 14:20:00
tags:
  - python
  - dataframe
---

# Dataframe 생성

```python
raw_data = {'date': ["20221201", "20221202", "20221202", "20221202", "20230102"],
            'col1': [10, 20, 20, 30, 40],
            'col2': [100, 200, 500, 300, 400]}

data = DataFrame(raw_data)
print(data)

       date  col1  col2
0  20221201    10   100
1  20221202    20   200
2  20221202    20   500
3  20221202    30   300
4  20230102    40   400
```

# duplicated 함수 실행

- date컬럼으로 중복 검사
- 여러개 컬럼으로 가능

## 중복되는 행들에서 첫번째 행만 False

- keep : {'first', 'last', False}, default 'first'
- keep='first'와 같다.

```python
print(data.duplicated(subset=['date']))

0    False
1    False
2     True
3     True
4    False
dtype: bool

```

## 중복되는 행들에서 마지막 행만 False

```python
print(data.duplicated(subset=['date'], keep='last'))

0    False
1     True
2     True
3    False
4    False
dtype: bool

```

## 중복되는 행들에서 모든 행 True

```python
print(data.duplicated(subset=['date'], keep=False))

0    False
1     True
2     True
3     True
4    False
dtype: bool

```

# 사용예

## 중복된 값 제거 후 1가지 값(첫번째 행)만 가져오기

```python
print(data[~data.duplicated(subset=['date'])])

       date  col1  col2
0  20221201    10   100
1  20221202    20   200
4  20230102    40   400

```
