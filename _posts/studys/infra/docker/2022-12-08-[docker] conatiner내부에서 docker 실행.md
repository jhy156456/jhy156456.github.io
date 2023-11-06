---
layout: blog
study: true
background: orange
category: study
categories: infra/docker
title: "[docker] conatiner내부에서 docker 실행"
date: 2022-12-08 09:42:42
tags:
  - infra
  - docker
---

# [docker] conatiner내부에서 docker 실행

Data Engineer 과정중 shell에 접속하여 이것저것 해볼 수 있는 환경이 있었다..
당연히 여기서 docker 설치 및 sqoop 테스트, docker run 테스트를 진행하려고 처음부터

1. docker 설치
2. docker-compose 설치
3. git clone
4. docker 실행
5. 과정진행
   순서대로 하려고 하는데 4번에서 systemctl 명령어 입력하면

```shell
System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down
```

이나오고

```
service docker start
service start docker
```

를 입력하면

```shell
start: unrecognized service
```

가 나오고

```
dockerd
```

를 입력하면

```
iptables v1.8.4 (legacy): can't initialize iptables table `nat': Permission denied (you must be root)
Perhaps iptables or your kernel needs to be upgraded.
```

```
iptables -L 
```

을 입력하면

```
iptables v1.8.4 (legacy): can't initialize iptables table `filter': Permission denied (you must be root)
Perhaps iptables or your kernel needs to be upgraded.
```

가 나오고

커널 업데이트(apt-get dist-upgrade) , iptables 업데이트 다 해봤는데 안됐다

## 원인

아마 원인은 접속한 shell이 컨테이너 위에있는 docker내부라고 생각된다. 이 docker가 실행될 때 권한이 없고, iptables에 접근할 수 없으므로 업데이트도 안되는것이다.

## 의존성 업데이트

### sudo apt-get update

업데이트할 패키지들의 목록을 최신으로 갱신한다. 실제로 패키지를 업그레이드 하는게 아니다.

### sudo apt-get upgrade

update 로 갱신된 최신 패키지들을 실제로 업그레이드 한다.

### sudo apt-get dist-upgrade

upgrade 는 의존성 체크를 하지 않고 업그레이드하지만, dist-upgrade는 의존성 체크를 하면서 위의 upgrade에서 수행되지 못한 dependency 까지 설치해준다.

## 해결

해결 방법은 이 docker가 실행될 때 권한을 부여하는법이 있을텐데,, 이건 제공해주는 shell을 이용하기때문에 안될 것 같다 ㅠㅠ