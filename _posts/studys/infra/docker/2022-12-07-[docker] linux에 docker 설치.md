---
layout: blog
study: true
background: orange
category: study
categories: infra/docker
title: "[docker] linux에 docker 설치"
date: 2022-12-07 10:42:42
tags:
- infra
- docker
---

# [docker] linux에 docker 설치

```shell
apt-get update
apt install -y docker.io
```

```shell
apt install docker-compose
```

```shell
docker info
```

# 한 번에 설치
```shell
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```
참고 : https://docs.docker.com/engine/install/ubuntu/

## 버전 문제 때문에 docker-compose pull 명령어가 안될때

```shell
apt install curl
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```
명령어로 최신버전을 설치한다.