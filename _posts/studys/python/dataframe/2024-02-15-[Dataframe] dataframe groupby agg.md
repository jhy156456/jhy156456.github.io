---
layout: blog
study: true
background: purple
category: study
categories: python/dataframe
title: "[Dataframe] dataframe groupby, agg"
date: 2024-04-25 14:20:00
tags:
  - python
  - groupby
  - agg
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

# groupby

- 그룹객체를 만들어주는 함수로 Dataframe객체.groupby(기준이 되는 열이름)로 사용

```python
grouped = data.groupby('date')
print(grouped)
for key, group in grouped:
    print("* key", key)
    print("* count", len(group))
    print(group.head())
    print('\n')
    
```

```python
# <pandas.core.groupby.groupby.DataFrameGroupBy object at 0x0000021974982A90>
* key 20221201
* count 1
       date  col1  col2
0  20221201    10   100


* key 20221202
* count 3
       date  col1  col2
1  20221202    20   200
2  20221202    20   500
3  20221202    30   300


* key 20230102
* count 1
       date  col1  col2
4  20230102    40   400
```

# agg

- 여러개의 함수를 여러 열에 적용
- 한번에 여러 컬럼을 다르게 연산할 수 있다.
- 문자열 같은 경우 join, 중복제거(set)등 으로 만들 수 있다.

## groupby 후 agg

### 1 col1만 agg(set)

```python
print(data.groupby('date')['col1'].agg(set))
print(type(data.groupby('date')['col1'].agg(set)))

date
20221201        {10}
20221202    {20, 30}
20230102        {40}
Name: col1, dtype: object
<class 'pandas.core.series.Series'>
```

### 2 전체 컬럼 agg

```python
print(data.groupby('date').agg(set))
print(type(data.groupby('date').agg(set)))

              col1             col2
date                               
20221201      {10}            {100}
20221202  {20, 30}  {200, 500, 300}
20230102      {40}            {400}
<class 'pandas.core.frame.DataFrame'>

```

### 3 groupby 후 agg로 특정 컬럼 sum하여 series반환하기

```python
print(data.groupby('date').agg({'col1': 'sum'}))
print(type(data.groupby('date').agg({'col1': 'sum'})))

          col1
date          
20221201    10
20221202    70
20230102    40
<class 'pandas.core.frame.DataFrame'>

```

### 4 groupby 후 agg함수 적용 후 reset_index하여 값 열 변경
- Series의 인덱스를 리셋하는 reset_index() 사용 후 매게변수로 name을 사용하면 값(value) 열의 이름을 지정하는 데 사용됩니다. [2]

```python
print(data.groupby('date')['col1'].agg(set))
#                   unit_list(value)
#  MATL_CD          
#        A       {Pump, Valve}
#        B       {Pump, Valve}
#        C              {Pump}

print(data.groupby('date')['col1'].agg(set).reset_index(name='hi'))

#      date                 hi
# 0       A       {Pump, Valve}
# 1       B       {Pump, Valve}
# 2       C              {Pump}
```

---
참고  
[1] https://yganalyst.github.io/data_handling/Pd_13/  
[2] https://pandas.pydata.org/docs/reference/api/pandas.Series.reset_index.html
