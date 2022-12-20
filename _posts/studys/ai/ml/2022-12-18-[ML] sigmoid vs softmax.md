---
layout: blog
study: true
# background-image: http://ot1cc1u9t.bkt.clouddn.com/17-7-16/91630214.jpg
category: study
background: green
categories: [ai/ml]
title: "[ML] sigmoid vs softmax"
date:   2022-12-18 15:10
tags:
- ai
- ml
- sigmoid
- softmax
---


# [ML] sigmoid vs softmax


## sigmoid
- Logistic Regression
- binary classification (0,1)
- cost function은 binary cross entropy(logistic cost)
- 확률의 총합은 1이 아님
- 큰 출력값이 해당 클래스를 가질 가능성이 높다는 것이지만 실제 확률은 아님

## softmax 
- multi classification
- cost function은 cross entropy
- 확률의 총합은 1
- 각 클래스의 출력값은 확률을 나타낸다.

  
  
참고  
[1] https://velog.io/@ann9902/Sigmoid-vs-Softmax