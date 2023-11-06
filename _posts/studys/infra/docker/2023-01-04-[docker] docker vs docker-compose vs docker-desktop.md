---
layout: blog
study: true
background: orange
category: study
categories: infra/docker
title: "[docker] docker vs docker-compose vs docker-desktop"
date: 2023-01-04 09:40:00
tags:
  - infra
  - docker
---

# [docker] docker vs docker-compose vs docker-desktop

## dockerfile

- 도커 이미지 생성을 위한 필요한 내용이 들어있는 파일

## docker-compose

- 도커 이미지 앱이 실행 되는 동안 컨테이너를 관리하기 위함

## docker-desktop

- Windows, Mac은 Docker Desktop 을 설치하면 Docker Compose사용 가능
- Linux는 Docker Compose을 따로 설치

```shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

참고할 글  
[1] https://medium.com/sjk5766/docker-compose-%EC%86%8C%EA%B0%9C-f84840ff7203