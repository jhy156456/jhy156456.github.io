---
layout: blog
study: true
background: purple
category: study
categories: python
title: "[python] torch.vmap, np.vectorize(with axis,dim)"
date: 2023-03-20 10:40:00
tags:
- python
- torch
- vectorize
---

# torch.vmap
- 1차원 행렬, 1차원 행렬만 할 수 있는 `torch.dot` 함수를 `broadcasting`을 통해 한 번에 실행시킬 수 있는 함수

## 사용법

```python
def my_dot(a, b):
    return torch.dot(a, b)


a = torch.tensor([[1,2,3],[4,5,6],[7,8,9]])
b = torch.tensor([1,2,3])
vfunc = torch.vmap(my_dot, in_dims=(0, None), out_dims=0)
print(vfunc(a, b))
# tensor([14, 32, 50])

vfunc = torch.vmap(my_dot, in_dims=(1, None), out_dims=0)
print(vfunc(a, b))
# tensor([30, 36, 42])
```

in_dims 는 np와 dataframe의 axis와 같다고 볼 수 있다.  
다음과 같이 행렬 a와,

| ---- | ---- | ---- |
| 1     | 2    | 3    |
| 4     | 5    | 6    |
| 7     | 8    | 9    |

행렬 b가 주어졌을 때

| ---- | ---- | ---- |
| 1    | 2    | 3    |


 
### `in_dims = (1, None)`
- a의 dim이 0이면 행으로 계산한다
- [1,2,3]과 [1,2,3]dot product
- [4,5,6]과 [1,2,3]dot product

### `in_dims = (1, None)` 
- a의 dim이 1이면 열로 계산한다.
- [1,4,7]과 [1,2,3]dot product
- [2,5,8]과 [1,2,3]dot product
