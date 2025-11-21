---
layout: blog
study: true
background: yellow
category: study
categories: data-engineer/apache
title: "[DE] hdfs cli 명령어 수행 안될 때"
date: 2025-11-21 19:40:00
tags:
  - de
  - apache
  - data-engineer
---

# hdfs 명령어

- hdfs 명령어가 잘 작동하는지 확인하려면 아래와같은 명령어를 수행한다.

```bash
hdfs getconf -confKey fs.defaultFS
```

이때 출력이 file:/// 이런 식으로 나오면 지금 hdfs dfs가 로컬 파일시스템을 보고 있는 상태이다.  
이를 해결하기 위해 hdfs가 보고있는 configuration이 정상 심볼릭링크를 통해 바라보고있는지 확인해야한다.

```
ls -ld /etc/alternatives/hadoop-conf
# /etc/hadoop/conf -> /etc/alternatives/hadoop-conf
ls -ld /etc/alternatives/hadoop-conf
# /etc/alternatives/hadoop-conf -> /etc/hadoop/conf.cloudera.hdfs

# 한 번에 확인하기
sudo alternatives --display hadoop-conf  2>/dev/null || sudo update-alternatives --display hadoop-conf
``` 

보통 이렇게 되어있다. 하지만 나의 경우엔 아래와 같이 되어있었다.
`/etc/hadoop/conf -> /etc/alternatives/hadoop-conf -> /etc/hadoop/conf.cloudera.core_settings`

이것을 원래대로 맞추기 위해 정상 동작하는 서버에서 명령어로 확인 후에

```
sudo alternatives --display hadoop-conf  2>/dev/null || sudo update-alternatives --display hadoop-conf

```

이 명령어를 통해 정상적으로 링크를 구성한다.

```
sudo alternatives --config hadoop-conf  2>/dev/null || sudo update-alternatives --config hadoop-conf

```

기존에 나는 `conf.cloudera.core_settings/core-site.xml` 의 설정을 읽고있었지만 이 설정에는 fs.defaultFS 가 없었다.  
하지만 제대로 경로를 설정해주어 이후 `/etc/hadoop/conf.cloudera.hdfs 의 core-site.xml + hdfs-site.xml` 의 설정을 보고
이 후 명령어 부턴 HDFS의 네임노드와 통신 할 수 있었다.