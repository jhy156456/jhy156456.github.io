---
layout: blog
study: true
background: transparent
background-image : ../../../assets/images/study/web/webpack-bundling.e79747a1.png
category: study
categories: web/react
title: '[web] webpack 정리'
date: 2023-03-14 10:20:00
tags:
- web
- javascript
- eslint
- prettier
---

# 웹펙이란
- 모듈 번들러
- 웹앱의 구성 요소 (HTML, CSS, Javascript 등)을 각각의 모듈로 보고 이를 조합하여 병합된 하나의 결과물로 만드는 도구

## 모듈
- 특정 기능을 갖는 작은 코드 단위
- 함수의 모음 및 함수
- 상수의 모음 및 상수
- 등등..

![](../../../assets/images/study/web/webpack-bundling.e79747a1.png){: width="100%" height="100%"}


## 장점(webpack-dev-server)
- 웹팩은 기본적으로 필요한 자원은 미리 로딩하는게 아니라 그 때 그 때 요청하자는 철학
- 디스크에 저장되지 않는 메모리 컴파일을 사용하기 때문에 컴파일 속도가 빨라짐

## webpack-dev-server의 동작원리
- 서버 실행 시 소스 파일들을 번들링하여 메모리에 저장소스 파일을 감시 
- 소스 파일이 변경되면 변경된 모듈만 새로 번들링 
- 변경된 모듈 정보를 브라우저에 전송 
- 브라우저는 변경을 인지하고 새로고침되어 변경사항이 반영된 페이지를 로드

## 속성값

속성명	description	CLI 사용
host	사용될 호스트 지정	webpack-dev-server –host 127.0.0.1
contentBase	콘텐츠를 제공할 경로지정 (정적파일을 제공하려는 경우에만 필요)	webpack-dev-server –content-base /path/to/content/dir
compress	모든 항목에 대해 gzip압축 사용	webpack-dev-server –compress
hot	webpack의 HMR 기능 활성화	-
inline	inline 모드 활성화	webpack-dev-server –inline=true
port	접속 포트 설정	webpack-dev-server –port 9000
open	dev server 구동 후 브라우저 열기	webpack-dev-server –open


# 웹팩을 왜 쓰는가
- 자바스크립트 변수 유효 범위
  - 변수 유효 범위는 이전에 모듈 시스템을 정리하면서 알아봤다. 두 개의 서로 다른 JS 파일을 로드하더라도 같은 스코프를 공유한다. 때문에 첫 번째 로드한 파일에서 변수 A를 10으로 대입했더라도 마지막 로드한 파일에서 변수 A에 'HELLO'를 대입하면 최종적으로 'HELLO'가 저장되어 오류를 발생시킬 수도 있다. 이 같은 문제는 ES6의 Modules 문법과 웹팩의 모듈 번들링을 통해 해결할 수 있다.
- 브라우저별 HTTP 요청 숫자의 제약
  - TCP는 한 번에 너무 많은 요청을 서버가 받아서 다운되거나 오류가 발생할 것을 대비하여 브라우저에서 한 번에 서버로 보낼 수 있는 HTTP 요청 횟수에 제한하고 있다. 대표적으로 크롬, 사파리, 파이어폭스 등은 6회, 익스플로러 11은 13회로 제한을 두고 있다. 
  - 따라서 특정 페이지로 이동했을 때 페이지를 보여주기 위해 필요한 파일들이 여러 개이고 이들이 각각 다른 위치에 있다면 각각의 파일에 대한 요청을 보내야 한다. 이처럼 페이지 로딩에 필요한 파일이 여러 개라면 로딩 시간이 느려질 수 있다. 하지만 Webpack은 여러 개의 파일을 하나로 합쳐서 요청을 최소화하고 최적화가 가능해지도록 한다.
- 사용하지 않는 코드의 관리
- Dynamic Loading & Lazy Loading 미지원
  - 동적으로 원하는 순간에 모듈을 로딩 
- 하나의 파일로 js 파일을 번들할 수 있습니다.
  - js 파일 번들 - 자바스크립트를 모듈로 작성할 수 있습니다, 그래서 각각의 파일에 대해서 script 태그를 별도로 작성할 필요가 없습니다. (상황에 따라서 둘 이상의 js 파일이 필요한 경우 구성 가능함)
- 프론트엔드 코드에 npm 패키지를 사용할 수 있습니다.
  - npm 패키지 사용 - npm은 인터넷상에서 오픈소스 코드의 커다란 생태계입니다. npm 코드를 저장할 기회가 주어지며, 원하는 프론트엔드 패키지를 가져다 쓸 수 있습니다.
- ES6/ES7 자바스크립트 코드를 작성할 수 있습니다. (Babel을 이용하여)
  - ES6/ES7 - 많은 기능을 추가되어 더 강력하고 더 쉽게 자바스크립트를 작성할 수 있습니다.
- 코드를 압축 또는 최적화할 수 있습니다. LESS/SCSS를 CSS로 돌릴 수 있습니다.
  - 코드 압축/최적화 - 배포되는 파일의 크기를 줄입니다. 페이지 로딩이 빨라지는 등의 장점을 포함합니다.
  - LESS/SCSS를 CSS로 돌리기 - CSS를 작성하는 더 좋은 방법입니다.
- HMR(Hot Module Replacement)을 사용할 수 있습니다.
  - HMR 사용 - 생산성이 향상됩니다. 코드를 저장할 때 마다 페이지의 리프레시가 자동으로 이루어집니다. 코드를 작성하는 동안 페이지의 상태를 최신으로 유지해야 하는 경우 정말 편리합니다. 자바스크립트로 모든 유형의 파일을 포함 - 추가적인 빌드 도구의 수를 줄일 수 있고, 프로그램적으로 파일을 사용 및 수정할 수 있습니다.
- 자바스크립트로 모든 유형의 파일을 포함할 수 있습니다.
  

# cli 명령어

## serve
```shell
webpack serve
```
- webpack-dev-server 실행





 




참고  
[1] https://joshua1988.github.io/webpack-guide/webpack/what-is-webpack.html  
[2] https://velog.io/@adam2/webpack-dev-server-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0%EC%82%BD%EC%A7%88%ED%9B%84%EA%B8%B0  
[3] https://yamoo9.gitbook.io/webpack/react/create-your-own-react-app/webpack-initialization  
[4] https://kimmeh1.tistory.com/504