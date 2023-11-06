---
layout: blog
study: true
background-image: ../../../assets/images/study/ai/ml/boosting_vs_bagging.png
category: study
background: transparent
categories: [ ai/ml ]
title: "[ML] 배깅, 부스팅, 스태킹 (bagging, boosting, stacking)"
date: 2022-12-18 01:22
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
- 대표적인 배깅 모델로는 'Random Forest' 가 있다.

### 페이스팅

- 중복을 허용하지 않고 샘플링 하는 방식

## 부스팅

- 약한 학습기를 여러개 연결하여 강한 학습기를 만드는 앙상블 방법
- 하나의 모델을 가지고 모델을 보완해나가면서 sqeunce한 모델을 학습시키는 방법
- 수학 문제를 푸는데 10번 문제가 엄청 어려워서 계속 틀렸다고 가정해보면, Boosting 방식은 10번 문제에 가중치를 부여해서 10번 문제를 잘 맞춘 모델을 최종 모델로 선정합니다.
- A 분류기를 만든 후, 그 정보를 바탕으로 B 분류기를 만들고, 다시 그 정보를 바탕으로 C 분류기를 만듭니다.
- 대표적인 배깅 모델로는 'XGBoost, LightGBM'이 있다.

## GBM

- Gradient Boosting Machine(GBM)은 틀린부분에 가중치를 더하면서 진행하는 알고리즘
- 이전 트리의 예측 오차를 기반으로 새로운 트리를 훈련한다.

### 진행 방법

회기 모형에 대한 부스팅 기법 (Adaptive Boosting, AdaBoost)의 방법을 살펴보면

1) 분석표본에 모형을 적합시켜 예측치와 오차를 산출
2) 오차가 큰 개체에 대해서는 큰 가중치를, 오차가 작은 개체에는 작은 가중치를 부여
3) 변경된 가중치로 모형을 재적합하고 1) 단계부터 다시 실행 (일정 횟수 반복)
4) 최종적으로 이제까지 도출된 모형을 총합.

## 부스팅, 배깅 요약

![](../../../assets/images/study/ai/ml/boosting_vs_bagging.png){: width="90%" height="50%"}

## 스태킹

- 예측을 취합하는 간단한 함수(보팅, 평균)를 사용하는 대신 취합하는 모델을 훈련시키는 방법
- 여러개의 모델을 1층에 쌓고 맨 위에 간단한 모델을 통해 최종 예측값을 출력한다.

참고  
[1] 핸즈온 머신러닝  
[2] https://dacon.io/codeshare/1827  
[3] https://ybeaning.tistory.com/17  
[4] https://swalloow.github.io/bagging-boosting/  
[5] XGBoost와 사이킷런을 활용한 그레이디언트 부스팅