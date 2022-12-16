---
layout: blog
study: true
background-image: http://ot1cc1u9t.bkt.clouddn.com/17-7-16/91630214.jpg
category: study
background: green
categories: [ai/ml]
title: "[ml] Precision, Recall"
date:   2022-12-09 10:06:42
tags:
- ai
- presicion
- recall
---


# [ml] Precision, Recall

## Recall
- Recall은 실제로 True인 데이터를 모델이 True라고 인식한 데이터의 수입니다. 
- 모델이 True라고 예측한 갯수 / 실제로 True인 갯수

## Precision
- Precision은 모델이 True로 예측한 데이터 중 실제로 True인 데이터의 수입니다. 
- 실제로 True인 갯수 / 모델이 True라고 예측한 갯수

## TP,TN, FP, FN
True Postive: 문제가 있는(positive) 제품을 문제가 있다고(positive) 잘(true) 판별한 것.

True Negative: 문제가 없는(negative) 제품을 문제가 없다고(negative) 잘(true) 판별한 것.

False Positive: 문제가 없는(negative) 제품을 문제가 있다고(positive) 잘못(false) 판단한 것.

False Negative: 문제가 있는(positive) 제품을 문제가 없다고(negative) 잘못(false) 판단한 것.