---
layout: blog
study: true
background-image: http://ot1cc1u9t.bkt.clouddn.com/17-7-16/91630214.jpg
category: study
background: green
categories: [ai/ml]
title: "[ML] 헷갈리는 머신러닝 알고리즘 (cross_validate, kfold, StratifiedKFold, KNeighborsClassifier, KMeans, GridSearchCV, RandomizedSearchCV..)"
date:   2022-12-17 17:28
tags:
- ai
- ml
- cross_validate
---


# [ML] 헷갈리는 머신러닝 알고리즘 (cross_validate, kfold, StratifiedKFold, KNeighborsClassifier, KMeans GridSearchCV, RandomizedSearchCV..)

## cross_validate
- 기본적으로 모델과, 모델의 데이터들을 5개로 나눠서 4개로 훈련하고 1개로 평가하는 알고리즘

```python
print(train_input.shape)
print(train_target.shape)
print(type(train_input))

(5197, 3)
(5197,)
<class 'numpy.ndarray'>
```

```python
scores = cross_validate(dt, train_input, train_target)
"""
{'fit_time': array([0.00855589, 0.00593686, 0.00772381, 0.00911927, 0.00702643]), 
'score_time': array([0.00063658, 0.000494  , 0.00085974, 0.00076413, 0.00073743]), 
'test_score': array([0.86923077, 0.84615385, 0.87680462, 0.84889317, 0.83541867])}
"""
print(np.mean(scores['test_score']))

# 0.855300214703487
```

## StratifiedKFold
- 옵션 없이 cross_validate할 때 각 fold에 정답class의 비율을 맞춰서 넣어준다.

```python
scores = cross_validate(dt, train_input, train_target, cv=StratifiedKFold())
print(np.mean(scores['test_score']))
0.855300214703487
```
- 결과를 보면 위에 StratifiedKFold값을 주지 않은것과 값이 동일한데 cross_validate에 default값으로 StratifiedKFold가 들어간다.

### StratifiedKFold를 5개 말고 10개로 하고싶으면

```python
splitter = StratifiedKFold(n_splits=10, shuffle=True, random_state=42)
scores = cross_validate(dt, train_input, train_target, cv=splitter)
print(np.mean(scores['test_score']))
0.8574181117533719
```

## Kfold
학습셋을 K번마다 K개의 셋으로 나눠서 train 및 validation과정을 거치는 것을 KFold 교차검증이다.  
하지만, 이 때 훈련, 검증 셋을 나누는 과정이 랜덤하게 나눠지므로  
데이터가 imbalance한 경우에는 train, validation셋의 label의 비율이 어긋나게된다.
참고로 일반적으로 회귀에는 기본 k-겹 교차검증을 사용하고, 분류에는 StratifiedKFold를 사용한다.


## KNeighborsClassifier
- 주변 k개의 데이터를 보고 과반수 넘어가는 나의 class가 어디인지 확인후 해당 class로 분류하는 방법
- k를 어떻게 정하느냐가 제일 중요하다
- default값은 5
- lazy maethod
- 모든 데이터의 거리를 구하여 분류하면 시간이 오래걸리므로 n차원 공간을 격자로 만들어서 인덱싱시켜놓는다.


## KMeans
- 클러스터링 알고리즘
- 클러스터링을 몇개로 할 것인지?(k)가 중요하다.
- Expecation Maxmization 알고리즘
    - 랜덤하게 k개(centroid)를 선택한 후, 나머지 선택되지 않은 점들에 대해 가장 가까운 k에 클러스터링(membership)을 시도한다.
    - k를 움직인 후 다시 가까운것들끼리 클러스터링(membership)을 시도한다
    - 클러스터링이 변하지않으면 종료한다.

## GridSearchCV
- 하이퍼 파라미터 튜닝을 위해 사용
- 내가 바꿀 수 있는 하이퍼 파라미터를 여러가지 경우의수를 가지고 모두 실험하는것(optuna같은것)
- grid search하면서 cross_validate도 같이 하는것

```python
from sklearn.model_selection import GridSearchCV

params = {'min_impurity_decrease': [0.0001, 0.0002, 0.0003, 0.0004, 0.0005]}
gs = GridSearchCV(DecisionTreeClassifier(random_state=42), params, n_jobs=-1)
gs.fit(train_input, train_target)
dt = gs.best_estimator_
print(dt.score(train_input, train_target))
```
- 옵션을 주지 않았기 떄문에 각 5번 검사, parameter 수 만큼 5개 만듦 =  총 25개의 트리를 만든다 

### 추가 파라미터
```python
params = {'min_impurity_decrease': uniform(0.0001, 0.001),
          'max_depth': randint(20, 50),
          'min_samples_split': randint(2, 25),
          'min_samples_leaf': randint(1, 25),
          }
```

## RandomizedSearchCV
- 랜덤 한 값으로 하이퍼 파라미터 튜닝을 위해 사용
- 랜덤하게 파라미터 선택하여 n번 반복

```python
from scipy.stats import uniform, randint
from sklearn.model_selection import RandomizedSearchCV

params = {'min_impurity_decrease': uniform(0.0001, 0.001),
          'max_depth': randint(20, 50),
          'min_samples_split': randint(2, 25),
          'min_samples_leaf': randint(1, 25),
          }


gs = RandomizedSearchCV(DecisionTreeClassifier(random_state=42), params, 
                        n_iter=100, n_jobs=-1, random_state=42)
gs.fit(train_input, train_target)
print(gs.best_params_)

"""
print(np.max(gs.cv_results_['mean_test_score']))
"""
```

파라미터값을 고정시키면?
```python
params = {'min_impurity_decrease': 0.001,
          'max_depth': 30,
          'min_samples_split': 3,
          'min_samples_leaf': 3,
          }

TypeError: Parameter value is not iterable or distribution (key='min_impurity_decrease', value=0.001)          
```
에러 발생


참고  
[1] 대학원 수업  
[2] https://towardsdatascience.com/the-5-clustering-algorithms-data-scientists-need-to-know-a36d136ef68  
[3] https://www.youtube.com/watch?v=dxOldlIBx0Q&ab_channel=%EA%B3%A0%EB%A0%A4%EB%8C%80%ED%95%99%EA%B5%90%EC%82%B0%EC%97%85%EA%B2%BD%EC%98%81%EA%B3%B5%ED%95%99%EB%B6%80DSBA%EC%97%B0%EA%B5%AC%EC%8B%A4