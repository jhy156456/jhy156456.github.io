---
layout: blog
study: true
background: yellow
category: study
categories: web/javascript
title: "[nexacro] dataset functions"
date: 2023-06-16 08:30:00
tags:
  - web
  - javascript
  - nexacro
---

# 복합조건

- findRowExpr : 조건표현식을 만족하는 첫 번째 row의 인덱스 반환; findRowExpr(EXPR);

```
ex) dataset1.findRowExpr("DEP == 'K10' && SAL <= 500")
```

- extractRow : 범위에서 조건표현식을 만족하는 row의 인덱스 배열 반환; extractRows(EXPR);

```
ex) dataset1.extractRows("DEP=='K10'");
```

- getCaseAvg : 조건을 만족하는 값, 또는 계산값의 평균값 반환;

```  
getCaseAvg(EXPR,VAL,START_IDX, END_IDX, EXCLUDENAN);
ex) dataset.getCaseAvg("GENDER=='M'", "SAL"); // gender이 M인 row들의 sal 값 평균
dataset.getCaseAvg("GENDER=='W'", "SAL", 0, -1, false); // 0번째부터 마지막 row까지, NULL 제외하고 검색
```

## 필터된 데이터 복사

```
this.dataset2.copyData(this.dataset1, true);
```

## 입력된 텍스트로 필터링 처리

```
this.Button01_onclick = function(obj:nexacro.Button,e:nexacro.ClickEventInfo)
{
    this.Dataset00.filter();
    var sFilter = "Column1.toString().indexOf('" + this.Edit00.value + "') >= 0";
    this.Dataset00.filter(sFilter);
};
```

## 특정로우에 특정 컬럼 값 가져오기

```
dsDistinct.getColumn(rowIndex, "컬럼명")
```

---
참고  
[1] http://docs.tobesoft.com/developer_guide_nexacro_n_ko/64c0742dcaac374b