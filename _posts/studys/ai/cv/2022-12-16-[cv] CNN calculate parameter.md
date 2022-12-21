---
layout: blog
study: true
background-image: http://ot1cc1u9t.bkt.clouddn.com/17-7-16/91630214.jpg
category: study
background: green
categories: [ai/cv]
title: "[CV] CNN calculate parameter"
date:   2022-12-16 08:58
tags:
- ai
- cnn
- cv
---

# [CV] CNN calculate parameter

## model.summary()

Model: "sequential"
_________________________________________________________________  
 Layer (type)                Output Shape              Param #  
=================================================================  
 conv2d (Conv2D)             (None, 28, 28, 32)        320  
                                                                 
 max_pooling2d (MaxPooling2D)  (None, 14, 14, 32)       0  
                                                                 
 conv2d_1 (Conv2D)           (None, 14, 14, 64)        18496  
                                                                 
 max_pooling2d_1 (MaxPooling2D)  (None, 7, 7, 64)         0
                                                                 
 flatten (Flatten)           (None, 3136)              0
                                                                 
 dense (Dense)               (None, 100)               313700  
                                                                
 dropout (Dropout)           (None, 100)               0  
                                                                 
 dense_1 (Dense)             (None, 10)                1010  
    
=================================================================  
Total params: 333,526  
Trainable params: 333,526  
Non-trainable params: 0  
_________________________________________________________________

## code

```python
model.add(keras.layers.Conv2D(32,
                              kernel_size=3,
                              activation='relu', padding='same',
                              input_shape=(28, 28, 1)))
model.add(keras.layers.MaxPooling2D(2))
model.add(keras.layers.Conv2D(64, kernel_size=(3,3), activation='relu', padding='same'))
model.add(keras.layers.MaxPooling2D(2))
model.add(keras.layers.Flatten())
model.add(keras.layers.Dense(100, activation='relu'))
model.add(keras.layers.Dropout(0.4))
model.add(keras.layers.Dense(10, activation='softmax'))
```

## conv2d (Conv2D)  (None, 28, 28, 32)  320  분석
- 처음 input_shape에 이미지 사이즈 (28, 28, 1)가 들어갑니다.
    - width, height가 28,28 , 채널이 1입니다.
- 이 이미지에 필터의 갯수 32개, kernel_size는 (3,3) 입니다.
    - summary의 max_pooling2d (MaxPooling2D  (None, 14, 14, 32)       0 )  이부분을 보면 filter의 갯수만큼 채널이 추가 됩니다.  
- 따라서  (32(출력 채널) x 3 x 3(필터 크기) x 1 (입력 채널(RGB))  + 32(출력 채널 bias)  = 320개의 파라미터입니다.
- 필터의 채널은 입력 채널과 동일해야 하므로 x 1 (입력 채널(RGB)) 가 들어갑니다.

## conv2d_1 (Conv2D)  (None, 14, 14, 32)  18496  분석
- input_shape에 위 계층(MaxPooling2D)에서 출력된  (None, 14, 14, 32) 가 들어갑니다.
    - width, height가 14,14 , 채널이 32입니다.
``model.add(keras.layers.Conv2D(64, kernel_size=(3,3), activation='relu', padding='same'))``
- 이 이미지에 필터의 갯수 64개, kernel_size는 (3,3) 입니다.
- 따라서  (64(출력 채널-필터의갯수) x 3 x 3(필터 크기) x 32 (입력 채널(RGB))  + 64(출력 채널 bias)  = 18496의 파라미터입니다.
- 필터의 채널은 입력 채널과 동일해야 하므로 x 32 (입력 채널(RGB)) 가 들어갑니다.


![](../../../assets/images/study/ai/cv/ScreenShot 2022-12-16 9.10.26.png)