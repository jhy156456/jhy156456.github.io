---
layout: blog
study: true
background: blue
category: study
categories: java
title: "[java] string yyyyMM to LocalDate"
date: 2023-07-17 16:00:00
tags:
- java
---

# 1

```java
        DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                .appendPattern("yyyyMM")
                .parseDefaulting(ChronoField.DAY_OF_MONTH, 1)
                .toFormatter();
        LocalDate localDate = LocalDate.parse("202305", formatter);
        System.out.println(localDate);
        // 2023-05-01
```

# 2
```java
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMM");
        LocalDate localDate = YearMonth.parse("202206", formatter).atDay(1);
        System.out.println(localDate);
        // 2022-06-01
```