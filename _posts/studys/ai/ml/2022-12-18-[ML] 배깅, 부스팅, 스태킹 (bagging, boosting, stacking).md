---
layout: blog
study: true
# background-image: http://ot1cc1u9t.bkt.clouddn.com/17-7-16/91630214.jpg
category: study
background: green
categories: [ai/ml]
title: "[ML] 배깅, 부스팅, 스태킹 (bagging, boosting, stacking)"
date:   2022-12-18 01:22
tags:
- ai
- ml
- bagging
- boosting
- stacking
---


# [ML] 배깅, 부스팅, 스태킹 (bagging, boosting, stacking)

모델을 모아서 예측을 수집하기 위한 앙상블 기법들에 대해 정리
## 배깅
- bootstrap aggregating
- 중복을 허용하여 샘플링 하여, 크기가 동일한 n개의 샘플 데이터를 생성
- 어떤 샘플은 여러번 샘플링되고 어떤 것은 전혀 선택되지 않을 수 있다.
- 대표적인 배깅 모델로는 'Random Forest'
### 페이스팅
- 중복을 허용하지 않고 샘플링 하는 방식  
## 부스팅
- 약한 학습기를 여러개 연결하여 강한 학습기를 만드는 앙상블 방법
- 하나의 모델을 가지고 모델을 보완해나가면서 sqeunce한 모델을 학습시키는 방법

  
## 스태킹
- 예측을 취합하는 간단한 함수(보팅, 평균)를 사용하는 대신 취합하는 모델을 훈련시키는 방법
- 여러개의 모델을 1층에 쌓고 맨 위에 간단한 모델을 통해 최종 예측값을 출력한다. 






  
  
참고  
[1] 핸즈온 머신러닝