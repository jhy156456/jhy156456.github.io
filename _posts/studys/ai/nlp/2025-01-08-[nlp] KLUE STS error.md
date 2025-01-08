---
layout: blog
study: true
category: study
background: green
categories: [ ai/nlp ]
title: "[nlp] KLUE STS 데이터셋 다운로드 오류"
date: 2025-01-08 12:38
tags:
  - ai
  - nlp
  - rag
  - llm
---

# [nlp] KLUE STS 데이터셋 다운로드 오류

## 오류 발생

아래 코드로 데이터 다운로드 시 오류가 발생했다.

```python
from datasets import load_dataset

load_dataset('klue', 'ynat', split='train')

# ValueError: Couldn't find cache for klue for config 'ynat'
# Available configs in the cache: ['mrc']
# Using the latest cached version of the dataset since klue couldn't be found on the Hugging Face Hub
```

## 원인

`load_dataset` 함수를 제공하고 있는 `dataset` 라이브러리와 `huggingface_hub` 라이브러리의 버전이 안맞아서 생기는 오류였다.  
`dataset` 라이브러리 내에서 `huggingface_hub` 라이브러리의 함수를 호출하는데 이때 발생하였다.
오류가 발생한 버전은 아래와 같다.

```python
!pip install sentence-transformers==2.7.0 datasets==2.19.0 huggingface_hub==0.23.0 faiss-cpu==1.8.0 -qqq
```

## 해결

`huggingface_hub`의 버전만 업데이트 할 경우 `load_dataset` 함수 실행은 되지만  
`transformer_model = models.Transformer('klue/roberta-base')` 함수로 모델을 불러올 때 다시 오류가 발생한다.  
따라서 모든 라이브러리를 업데이트 해주자.

```python
!pip install --upgrade huggingface_hub transformers datasets
```

---
