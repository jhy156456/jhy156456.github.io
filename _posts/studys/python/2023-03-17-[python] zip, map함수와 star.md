---
layout: blog
study: true
background: purple
category: study
categories: python
title: "[python] zip, map함수와 star(*)"
date: 2023-03-17 10:40:00
tags:
- python
- zip
---


# zip메서드
같은 인덱스에 위치한 값들을 튜플로 묶는다
```python
a = [0,1,2,3,4]
b = [0,1,2,3]
c = [2,4,6]

print(zip(a,b,c))
print(list(zip(a,b,c)))

# <zip object at 0x1278dad40>
# [(0, 0, 2), (1, 1, 4), (2, 2, 6)]
```
- 가장 작은 리스트 사이즈 크기를 갖도록 list가 만들어진다.

## zip을 통한 dict 변환
zip() 함수를 통해 두 개의 리스트나 튜플울 dict로 변환 가능하다.  
리스트를 zip() 함수에 넘긴 후, 그 결과를 다시 dict() 함수에 넘기면 됩니다.

```python
>>> keys = [1, 2, 3]
>>> values = ["A", "B", "C"]
>>> dict(zip(keys, values))
{1: 'A', 2: 'B', 3: 'C'}
```

# unzip
- zip() 함수로 엮어 놓은 데이터를 다시 해체(unzip)하고 싶을 때도 zip() 함수를 사용할 수 있습니다.
- `튜플 리스트의 튜플 아이템의 같은 위치의 값끼리 묶고자 할 때` 사용합니다.

먼저 zip() 함수로 2개의 튜플의 데이터를 엮은 후 리스트로 변환해보겠습니다.

```python
>>> numbers = (1, 2, 3)
>>> letters = ("A", "B", "C")
>>> pairs = list(zip(numbers, letters))
>>> print(pairs)
[(1, 'A'), (2, 'B'), (3, 'C')]
```
이 리스트 앞에 풀기(unpacking- 연산자 붙여서 다시 zip() 함수에 넘기면 다시 원래의 2개의 튜플을 얻을 수 있습니다.

```python
>>> numbers, letters = zip(*pairs)
>>> numbers
(1, 2, 3)
>>> letters
('A', 'B', 'C')
```

## star 추가
- 외부에 감싼 타입을 unpack 해준다.
- 곱셈 및 거듭제곱 연산으로 사용할 때
- 리스트형 컨테이너 타입의 데이터를 반복 확장하고자 할 때
- 가변인자 (Variadic Arguments)를 사용하고자 할 때
- 컨테이너 타입의 데이터를 Unpacking 할 때

### 데이터 unpacking
list나 tuple 또는 dict 형태의 데이터를 가지고 있고 어떤 함수가 가변인자를 받는 경우에 사용할 수 있다.

```python
a = [0,1,2,3,4]
b = [0,1,2,3]
c = [2,4,6]
print(*list(zip(a,b,c)))

# (0, 0, 2) (1, 1, 4) (2, 2, 6)
```

또는 product 함수가 가변인자 파라미터를 받기 때문에 튜플 형태로 받는다.

```python
primes = [2, 3, 5, 7, 11, 13]
def product(*primes):
    print(primes)
product(*primes)
product(primes)

# (2, 3, 5, 7, 11, 13)
# ([2, 3, 5, 7, 11, 13],)
```

# map
`map(func, *iterables)`
첫번째 인자로 function  을 넣고, 두번째 인자에는 임의의 iterable

## 사용법1 - iterator 1개
```python
list_1 = [2,3,4]

def squre(x):
  return x**2

print(map(squre,list_1))
print(list(map(squre,list_1)))

# <map object at 0x1108a9be0>
# [4, 9, 16]
```

```python 
list(map(float,[1,2,3,4]))
# [1.0, 2.0, 3.0, 4.0]
```

## 사용법2 - iterator 2개

```python
list_1 = [2, 3, 4]
list_2 = [20, 30]
list_3 = [20, 30, 40]


def squre(x, y):
  return x * y


print(list(map(squre, list_1, list_2)))
print(list(map(squre, list_1, list_3)))
# [40, 90]
# [40, 90, 160]
```

## 사용법3 - lambda 함수사용
```python
list_1 = [2, 3, 4]
list_2 = [20, 30]
list_3 = [20, 30, 40]
print(list(map(lambda x, y : x * y, list_1, list_3)))
# [40, 90, 160]
```

# zip과 list comprehension
이제 zip 과 리스트를 사용해 보겠습니다.

```python
list_1 = [2, 3, 4]
list_2 = [20, 30, 40]
[x * y for x, y in zip(list_1, list_2)]
# [40, 90, 160]
```

# 실제 사용 코드
이제 실제 현업에서 사용되는 list, map, zip 함수를 하나하나 확인해보겠습니다.

```python
x_train, y_train = map(list, zip(*[(x, y) for x, y in zip(x_train, y_train) if y ==0 or y == 1]))
```

먼저 x_train, y_train의 shape를 알아보겠습니다.

```python
print(x_train.shape)
print(y_train.shape)
# (60000, 28, 28)
# (60000,)
```
위와같이 있을때 

```python
[(x, y) for x, y in zip(x_train, y_train) if y ==0 or y == 1]
```

이 표현식은

```python
data = []
for x ,y in zip(x_train,y_train):
    if y == 0 or y == 1:
        data.append((x,y))
```

이렇게 될 것입니다. 각각 size를 계산해보면

```python
print(len(data))
print(len(data[0]))
print(data[0][0].shape)
print(data[0][1])
"""
12665
2
(28, 28)
0
"""
```

12665개의 훈련데이터 리스트이고, 각 리스트에는 튜플형태의 원소들이 들어가있고  
각 튜플의 첫번째 값은 28,28 shape를 갖는 리스트, 두번째 값은 레이블입니다.  
마지막 `map(list, zip(*data))` 를 간소화 해보면 unzip을 하는것을 볼 수 있습니다.

```python
test = [([1, 2], 1), ([3, 4], 3), ([5, 6], 4)]
x, y = map(list, zip(*test))
print(x)
print(y)
# [[1, 2], [3, 4], [5, 6]]
# [1, 3, 4] 
```

위 코드처럼 *test를 통해 데이터 언패킹을 수행하고 각 튜플 (훈련데이터, 레이블)에 대해 훈련데이터와 레이블을 때내는 작업입니다.  
예제를 보시면

```python
test = [([1, 2], 1),
        ([3, 4], 3),
        ([5, 6], 4)]
list(map(lambda x: x, zip(*test)))
# [([1, 2], [3, 4], [5, 6]), (1, 3, 4)]
```

`map(lambda x: x, zip(*test)` 해당 함수를 적용하게 되면 () () 2개의 원소가 생성되는데 lambda 대신 list함수를 적용시키면
[],[] 2개의 원소가 생성되어 리스트 2개가 생성됨을 알 수 있습니다.


더 간단히 풀어보자면 map함수 없이 test의 0번째 인덱스를 list로 묶어서 구조 분해 할당을 통해 x,y에 할당하는 행위를 전체 데이터에 대해 반복한다고 보시면 됩니다.

```python
x,y = list(test[0])
print(x)
print(y)
# [1, 2]
# 1
```

추가적으로 map함수를 구조분해 할당 하지 않고 list로 한번 더 묶는다면

```python
list(map(list, zip(*test)))
# [[[1, 2], [3, 4], [5, 6]], [1, 3, 4]]
```

위 코드처럼 분리됩니다. 위 코드는 아래와 같습니다.

```python
unzipped_list = [[i for i, j in test],
				 [j for i, j in test]]
```


---
참고  
[1] https://yeko90.tistory.com/entry/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EC%A4%91%EA%B8%89-map-filter-zip-list-comprehension  
[2] https://www.daleseo.com/python-zip/