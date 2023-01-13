---
layout: blog
study: true
background: yellow
category: study
categories: data-engineer/apache
title: "[DE] Fluentd 란?"
date: 2023-01-12 08:40:00
tags:
- de
- apache
- data-engineer
---

# Fluentd 란?
- 통합된 로그 수집 프레임워크를 제공하며, 데이터 포맷은 Json 기반으로 다양한 로그 유형의 통합이 가능합니다.  
- 대부분의 기능을 plugin 형태로 구성할 수 있습니다.
- C + Ruby 기반의 엔진으로 초 당 1.3만 데이터 처리에 약 3~40mb정도의 메모리 소모만으로 가능합니다.
- 각 서버에 Fluentd가 1개의 Fluentd로 모여서 관리하기가 쉽다.

# 아키텍처
- 모든 메시지는 tag,시간, 레코드로 이루어져있다.

## 이벤트 구조
### Time
- Nano-second unit
- from logs(event-time)
    - 이 시간을 기준으로 파티셔닝, 그룹지어서 저장, 버퍼링을 할 수 있다.
    - 이 데이터 없으면 수신데이터 시간 기준
### Tag
- for event routig
- 카테고리 저장 용도로 활용 가능
### Record
- Json foramt
{
    "str_filed" : "hello",
}