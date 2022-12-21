---
layout: blog
study: true
background: blue
category: study
categories: tips
title: "[tips] m1 macbook tensorflow gpu 설치"
date: 2022-12-21 13:00
tags:
- tips
- mac
- m1
- tensorflow
- gpu
---

# [tips] m1 macbook tensorflow gpu 설치

```shell
 conda install -c apple tensorflow-deps
 python -m pip install tensorflow-macos
 python -m pip install tensorflow-metal
```

```python
import tensorflow as tf
tf.__version__
tf.config.list_physical_devices()

"""
[PhysicalDevice(name='/physical_device:CPU:0', device_type='CPU'),
 PhysicalDevice(name='/physical_device:GPU:0', device_type='GPU')]
"""
```

## graph error 발생시
```shell
python -m pip install tensorflow-macos==2.9
python -m pip install tensorflow-metal==0.5.0
```
참고  
[1] https://developer.apple.com/forums/thread/721619
