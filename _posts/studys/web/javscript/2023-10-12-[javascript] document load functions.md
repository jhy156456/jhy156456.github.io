---
layout: blog
study: true
background: yellow
category: study
categories: web/javascript
title: "[javascript] 문서 로드 함수들(DOM, DOMContentLoaded, load, beforeunload, unload, onload등)"
date: 2023-10-12 10:12:00
tags:
  - DOM
  - web
  - javascript
---

# DOM(Document Object Model)

- XML 및 HTML 문서를 응용프로그램에서 사용하기 위한 API 규격
- 문서 객체란 <html>이나 <body> 같은 html문서의 태그들을 JavaScript가 이용할 수 있는 객체(object)로 만들면 그것을 문서 객체라고 한다
- DOM은 넓은 의미로 웹 브라우저가 HTML 페이지를 인식하는 방식을 의미, 조금 좁은 의미로는 document 객체와 관련된 객체의 집합

## DOMContentLoaded

- 브라우저가 HTML을 전부 읽고 DOM 트리를 완성하는 즉시 발생한다. 이미지 파일(<img>)이나 스타일시트 등의 기타 자원은 기다리지 않는다.

### load(onload) 이벤트와의 차이점은?

- load는 돔트리 이후 모든 리소스까지 완벽히 끝난 후 발생하는 이벤트
- DOMContentLoaded는 돔트리까지만 형성되면 발생하는 이벤트
- 즉 DOMContentLoaded 이벤트가 load이벤트보다 앞서 발생

## load(onload)

- HTML로 DOM 트리를 만드는 게 완성되었을 뿐만 아니라 이미지, 스타일시트 같은 외부 자원도 모두 불러오는 것이 끝났을 때 발생한다.

## beforeunload/unload

- 사용자가 페이지를 떠날 때 발생한다.

---
참고  
[1] https://mine-it-record.tistory.com/577  
[2] https://velog.io/@hoon_dev/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-DOMContentLoaded-%EC%9D%B4%EB%B2%A4%ED%8A%B8  
[3] https://na27.tistory.com/228
