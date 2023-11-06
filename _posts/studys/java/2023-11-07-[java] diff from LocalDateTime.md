---
layout: blog
study: true
background: blue
category: study
categories: java
title: "[java] LocalDateTime으로 차이 달 및 차이 시간 구하기"
date: 2023-11-07 08:40:00
tags:
  - java
---

# 1

구하고자 하는 날짜 시간으로 변경

```java
public static final String DEFAULT_PATTERN = "yyyyMMddHHmmss";
public static final String[] DEFAULT_PATTERN2 = { "yyyyMMddHHmmss" };
LocalDateTime startLDT = DateUtil.parseDate("202301" + "01", new String[] { "yyyyMMdd" });
LocalDateTime nextLDT = DateUtil.parseDate("202305" + "01", new String[] { "yyyyMMdd" });
```

# 2

차이 시간 및 차이 달을 함수로 만든다.

```java
	/**
	 * 차이 시간 구하기
	 * 
	 * @param fromDate 이전 시간
	 * @param toDate   이후 시간
	 * @return long 차이 시간 (시간 단위)
	 */
	public static long hoursBetween(LocalDateTime fromDate, LocalDateTime toDate) {
		Long fromDateMilli = fromDate.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
		Long toDateMilli = toDate.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
		long term = toDateMilli - fromDateMilli;
		return term / AVERAGE_MILLIS_PER_HOUR;
	}
```

```java
	/**
	 * 차이 달 구하기
	 * 
	 * @param fromDate 이전 시간
	 * @param toDate   이후 시간
	 * @return int 차이 달 (달 단위) 같으면 0, 202304, 202305 -> 1 202306, 202305 -> -1
	 */
	public static int monthsBetween(LocalDateTime fromDate, LocalDateTime toDate) {
		YearMonth fromYearMonth = YearMonth.from(fromDate);
		YearMonth toYearMonth = YearMonth.from(toDate);
		
		return ((Long)ChronoUnit.MONTHS.between(fromYearMonth, toYearMonth)).intValue();
	}
```

---