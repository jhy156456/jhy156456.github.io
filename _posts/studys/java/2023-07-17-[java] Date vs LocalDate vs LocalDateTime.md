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

# LocalDate, LocalTime
- 현재 소속된 로컬의 날짜정보를 다루는 클래스

```java
// 정적팩토리 메서드 of로 인스턴스를 만든다.
LocalDate date = LocalDate.of(2017, 9, 21); // 2017-09-21


// 각 항목들을 가져올 수 있다. 
int year = date.getYear(); //2017
Month month = date.getMonth(); // SEPTEMBER
int dayOfMonth = date.getDayOfMonth();// 21

DayOfWeek dayOfWeek = date.getDayOfWeek(); //THURSDAY
int len = date.lengthOfMonth(); // 30 (9월의 일 수)
boolean leapYear = date.isLeapYear(); // false (윤년 이냐?)

LocalTime time = LocalTime.of(14,23,30);
int hour = time.getHour();
int minute = time.getMinute();
int second = time.getSecond();
```

# LocalDateTime
- 현재 소속된 로컬의 날짜 + 시간정보를 다루는 클래스

```java
LocalDateTime dt1 = LocalDateTime.of(2019, Month.SEPTEMBER,21, 13, 45, 20);
LocalDateTime dt2 = LocalDateTime.of(2019, 9 ,21, 13, 45, 20);
LocalDateTime dt3 = LocalDateTime.of(date, time);
LocalDateTime dt4 = date.atTime(13,45,20);
LocalDateTime dt5 = date.atTime(time);
LocalDateTime dt6 = time.atDate(date);
```

```java
String strDate1 = "202307061515";
DateTimeFormatter format1 = DateTimeFormatter.ofPattern("yyyyMMddHHmm");
LocalDateTime strToLocalDateTime1 = LocalDateTime.parse(strDate1, format1);
System.out.println("string to LocalDateTime : " + strToLocalDateTime1);
//string to LocalDateTime : 2023-07-06T15:15
```

```java
LocalDateTime formatLocalDateTimeNow =
        LocalDateTime.parse("2023-07-05 12:12:12", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
System.out.println("String to LocalDatetime : " + formatLocalDateTimeNow);
//String to LocalDatetime : 2023-07-05T12:12:12
```

등 여러가지 방법이 있다.

---
참고  
[1] https://sowon-dev.github.io/2020/08/05/200806javai/  
[2] https://d2.naver.com/helloworld/645609  
[3] https://jeong-pro.tistory.com/163  
[4] https://umanking.github.io/2020/05/09/java-date-time/