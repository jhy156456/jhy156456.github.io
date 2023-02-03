---
layout: blog
study: true
background: yellow
category: study
categories: aws
title: "[aws] jump server, jump box 란"
date: 2023-02-03 10:16:42
tags:
- aws
---

# jumpbox
- 점프 서버, 점프 호스트 또는 점프 박스는 별도의 보안 영역에 있는 장치에 액세스하고 관리하는 데 사용되는 네트워크의 시스템
- 두 개의 서로 다른 보안 영역에 걸쳐 있고 이들 사이에 제어된 액세스 수단을 제공하는 강화되고 모니터링되는 장치
- 모든 관리자가 관리 작업을 시작하기 전에 먼저 연결하거나 다른 서버 또는 신뢰할 수 없는 환경에 연결하기 위한 시작점으로 사용하는 보안 컴퓨터


public network 에서 private network 와 소통할 때의 게이트웨이가 필요한데 이것을 EC2 서버에서 처리하려고 할 때 사용 한다.

참고  
[1] https://dictionary.tn/what-is-a-jumpbox/  
[2] https://velog.io/@hkjs96/%EC%A0%90%ED%94%84-%EB%B0%95%EC%8A%A4%EB%A5%BC-%ED%86%B5%ED%95%9C-SSH-AWS  
[3] https://medium.com/@yagizcemberci/ssh-through-jump-box-on-aws-7839c28fb8c6


