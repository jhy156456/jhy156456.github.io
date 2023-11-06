---
layout: blog
study: true
# background-image: http://ot1cc1u9t.bkt.clouddn.com/17-7-16/91630214.jpg
category: study
background: green
categories: [ ai/ml ]
title: "[ML] lightgbm 정리"
date: 2023-02-15 15:10
tags:
  - ai
  - ml
  - lgbm
  - softmax
---

# LGBM?

A Highly Efficient Gradient Boosting Decision Tree

# 작동원리

- 다양한 Boosting 알고리즘에서 sample weight는 데이터가 모델에 얼마나 중요한지 알려주는 지표가 됩니다. 하지만 negative sample weight는 따로 주어지지 않습니다.
- 어떤 데이터에 대한 gradient가 작으면 이 데이터에 대한 학습 오차는 작고, 일반적으로 잘 학습된 데이터로 간주할 수 있습니다. 따라서 가장 원초적인 방법은 작은 기울기를 갖는 데이터를 무시하는 것입니다.
- 하지만 이렇게 하면 데이터 분포가 바뀌기 때문에 모델의 정확도가 달라집니다.
- 저자들은 Gradient-based One-Side Sampling (GOSS)라는 방법을 고안했습니다.
- GOSS는 기울기가 큰 것은 유지하고 작은 것은 random sample을 합니다.

## GOSS 알고리즘

t=1,2,…,d에 대해서,

preds = model.predict(data)
g = loss(data, preds)
sorted = 기울기의 절대값이 큰 것들부터 순서대로 정렬한다.
topSet = sorted에서 상위 N개를 뽑는다.
randSet = sorted에서 나머지 개수 중 정해 놓은 개수를 뽑는다.
usedSet = topSet + randSet
newModel = weakLearner(sampledData, -g[usedSet])
models.append(newModel)

# 각종 파라미터

## eval_set

- 검증셋을 활용해서 검증셋에 대한 결과가 좋아지지 않을때까지 의사결정트리를 추가한다.

참고  
[1] 모두의 연구소
[2] https://dacon.io/codeshare/1827  
[3] https://neptune.ai/blog/lightgbm-parameters-guide  
[4] https://velog.io/@kkiyou/lgbm