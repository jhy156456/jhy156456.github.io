---
layout: blog
study: true
background: blue
category: study
categories: java
title: "[java] Date vs LocalDate vs LocalDateTime"
date: 2023-07-17 15:00:00
tags:
- java
---

# Date
- Deprecated 된 함수들이 많고 아래의 문제점들이 존재한다.

## 불변 객체가 아니다.
- set으로 변경이 가능하여 날짜변경이 가능하다
- get/set 메서드에서 직접 Date클래스를 사용하는 것이 위험하다.

## 상수 필드 남용
- calendar.add(Calendar.SECOND, 2);

## 헷갈리는 월 지정
- 1월을 0으로 표현한다 
- Calendar.OCTOBER(10월)로 월을 지정해도 9

## Date와 Calendar 객체의 역할 분담
- 다소 치명적인데 년/월/일 계산은 Date 클래스만으로는 부족해서 왔다갔다 하는 문제가 있다. 
- 또한 Calendar객체를 생성하고 Date 객체를 생성하는 프로세스를 거치기 때문에 번거롭고 생성비용이 비싸다.

그렇기 때문에 날짜를 사용하려면 Java 8버전에서 추가된 LocalDateTime, LocalDate를 사용하자

# LocalDate
- 현재 소속된 로컬의 날짜정보를 다루는 클래스

# LocalDateTime
- 현재 소속된 로컬의 날짜 + 시간정보를 다루는 클래스


---
참고  
[1] https://sowon-dev.github.io/2020/08/05/200806javai/  
[2] https://d2.naver.com/helloworld/645609  
[3] https://jeong-pro.tistory.com/163