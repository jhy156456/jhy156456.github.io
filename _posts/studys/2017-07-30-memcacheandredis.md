---
layout: blog
study : true
banana: true
category: 负载均衡
title:  [python] DatetimeIndex 값 추가하기 및 date관련 함수
date:   2017-07-30 10:06:42
background-image: http://ot1cc1u9t.bkt.clouddn.com/17-8-1/24280498.jpg
tags:
- python
- dataframe
---

# [python] DatetimeIndex 값 추가하기 및 date관련 함수

| **라이브러리** | **날짜, 시간 클래스** | **타임델타 클래스** |
| --- | --- | --- |
| 1. **datetime** | **datetime, date, time** | **timedelta** |
| 2. **numpy** | **datetime64** | **timedelta64** |
| 3. **pandas** | **Timestamp** | **Timedelta** |

## numpy

### 범위생성

#### np.arange()

```python
from datetime import datetime, timedelta

t = np.arange(datetime(2015,6,1), datetime(2015,7,1), timedelta(days=1))

type(t)
# numpy.ndarray
type(t[0])
# numpy.datetime64
```

## datetime

## pandas

### Datetimeindex

```python
test_data['date'] = pd.to_datetime(test_data['date'])
test_data = test_data.set_index(keys="date")
test_data = test_data.resample(rule="1Q").sum()[["수량"]]
```

1. 위와 같이 실행하면 test_data.index는 DatetimeIndex이고 test_date.index[0] 의 값은 timestamp이다.

### DatetimeIndex에 값 추가하기

```python
import datetime as dt
quarter_date
"""
DatetimeIndex(['2019-12-31', '2020-03-31', '2020-06-30', '2020-09-30',
               '2020-12-31', '2021-03-31', '2021-06-30', '2021-09-30',
               '2021-12-31', '2022-03-31'],
              dtype='datetime64[ns]', name='date', freq='Q-DEC')

"""
quarter_date.union(quarter_date + dt.timedelta(days=365))
"""
DatetimeIndex(['2019-12-31', '2020-03-31', '2020-06-30', '2020-09-30',
               '2020-12-30', '2020-12-31', '2021-03-31', '2021-06-30',
               '2021-09-30', '2021-12-31', '2022-03-31', '2022-06-30',
               '2022-09-30', '2022-12-31', '2023-03-31'],
              dtype='datetime64[ns]', name='date', freq=None)
"""

quarter_date.union(pd.date_range("2022-12-31","2024-12-31",freq="1Q"))
"""

"""
```

참조 : [python - How to concatenate DatetimeIndex objects in pandas? - Stack Overflow](https://stackoverflow.com/questions/55695924/how-to-concatenate-datetimeindex-objects-in-pandas)

### datetimeindex split

```python
df[df.index<datetime.datetime(2020, 1, 1)]
```

- 명시한 날짜는 포함하지않음 (<)

### DatetimeIndex 값 밀기

```python
(date_df.index + dt.timedelta(days=240)).asfreq("Q")
```

### 범위생성

#### pd.date_range(W)

```python
pd.date_range("2018-1-1", "2018-12-31", freq="W")
```

```python
DatetimeIndex(['2018-01-07', '2018-01-14', '2018-01-21', '2018-01-28',
               '2018-02-04', '2018-02-11', '2018-02-18', '2018-02-25',
               '2018-03-04', '2018-03-11', '2018-03-18', '2018-03-25',
               '2018-04-01', '2018-04-08', '2018-04-15', '2018-04-22',
               '2018-04-29', '2018-05-06', '2018-05-13', '2018-05-20',
               '2018-05-27', '2018-06-03', '2018-06-10', '2018-06-17',
               '2018-06-24', '2018-07-01', '2018-07-08', '2018-07-15',
               '2018-07-22', '2018-07-29', '2018-08-05', '2018-08-12',
               '2018-08-19', '2018-08-26', '2018-09-02', '2018-09-09',
               '2018-09-16', '2018-09-23', '2018-09-30', '2018-10-07',
               '2018-10-14', '2018-10-21', '2018-10-28', '2018-11-04',
               '2018-11-11', '2018-11-18', '2018-11-25', '2018-12-02',
               '2018-12-09', '2018-12-16', '2018-12-23', '2018-12-30'],
              dtype='datetime64[ns]', freq='W-SUN')
```

#### pd.date_range(5T)

```python
pd.date_range('2019-01-01 00:00:00', '2019-01-01 05:00:00', freq='5T')
```

```python
DatetimeIndex(['2019-01-01 00:00:00', '2019-01-01 00:05:00',
               '2019-01-01 00:10:00', '2019-01-01 00:15:00',
               '2019-01-01 00:20:00', '2019-01-01 00:25:00',
               '2019-01-01 00:30:00', '2019-01-01 00:35:00',
               '2019-01-01 00:40:00', '2019-01-01 00:45:00',
               '2019-01-01 00:50:00', '2019-01-01 00:55:00',
               '2019-01-01 01:00:00'],
              dtype='datetime64[ns]', freq='5T')
```

### resample

- 시작년도를 포함(14-10-07,14-10-24..)하여 반년(14-12-30,15-06-30..)씩 묶고싶을떄

```python
train_data.resample(rule="2Q").agg({'수량': sum, '번호': '|'.join})
날짜,수량,번호
2014-12-31,7,141007|141007|141017|141203
2015-06-30,9,150223|150227|150626
```

#### resample했을 때 원하는 날짜까지 데이터가 없을 경우

```python
2017-03-31,3
2017-06-30,1
2017-09-30,1
2017-12-31,0
2018-03-31,0
2018-06-30,1
2018-09-30,1
2018-12-31,0
2019-03-31,0
2019-06-30,1
2019-09-30,3
```

이런 데이터 상황에서 끝에 2019-12-31이 포함되지 않아서 문제가 됐었는데

```python
t_index = pd.DatetimeIndex(pd.date_range(start=train_df.index[0], end='2019-12-31', freq="1Q"))

DatetimeIndex(['2015-06-30', '2015-09-30', '2015-12-31', '2016-03-31',
               '2016-06-30', '2016-09-30', '2016-12-31', '2017-03-31',
               '2017-06-30', '2017-09-30', '2017-12-31', '2018-03-31',
               '2018-06-30', '2018-09-30', '2018-12-31', '2019-03-31',
               '2019-06-30', '2019-09-30', '2019-12-31'],
              dtype='datetime64[ns]', freq='Q-DEC')
```

함수를 통해

```python
train_df.reindex(t_index).fillna(0)
2016-03-31,1.0
2016-06-30,1.0
2016-09-30,2.0
2016-12-31,0.0
2017-03-31,3.0
2017-06-30,1.0
2017-09-30,1.0
2017-12-31,0.0
2018-03-31,0.0
2018-06-30,1.0
2018-09-30,1.0
2018-12-31,0.0
2019-03-31,0.0
2019-06-30,1.0
2019-09-30,3.0
2019-12-31,NaN
```

결과를 만들어낼 수 있다.

참조 :

[python - pandas- changing the start and end date of resampled timeseries - Stack Overflow](https://stackoverflow.com/questions/45908146/pandas-changing-the-start-and-end-date-of-resampled-timeseries)## pandas 주기 및 오프셋

### 주기

pandas 주기 코드

| 코드  | 설명  | 코드  | 설명  |
| --- | --- | --- | --- |
| D   | 달력상 일 | B   | 영업일 |
| W   | 주   |     |     |
| M   | 월말  | BM  | 영업일 기준 월말 |
| Q   | 분기말 | BQ  | 영업일 기준 분기말 |
| A   | 연말  | BA  | 영업일 기준 연말 |
| H   | 시간  | BH  | 영업 시간 |
| T   | 분   |     |     |
| S   | 초   |     |     |
| L   | 밀리초 |     |     |
| U   | 마이크로초 |     |     |
| N   | 나노초 |     |     |

참조

[1] [python, numpy, pandas 날짜 타입 비교 및 정리](https://ellun.tistory.com/320)

[2] [4.8 시계열 자료 다루기 &#8212; 데이터 사이언스 스쿨](https://datascienceschool.net/01%20python/04.08%20%EC%8B%9C%EA%B3%84%EC%97%B4%20%EC%9E%90%EB%A3%8C%20%EB%8B%A4%EB%A3%A8%EA%B8%B0.html)

[3] [python - How to concatenate DatetimeIndex objects in pandas? - Stack Overflow](https://stackoverflow.com/questions/55695924/how-to-concatenate-datetimeindex-objects-in-pandas)