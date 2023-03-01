---
layout: blog
study: true
background: purple
category: study
categories: python/dataframe
title: "[Dataframe] read csv and merge"
date: 2023-02-28 14:20:00
tags:
- python
- dataframe
---

# 코드

```python
    import pandas as pd
    import glob
    import os

    # https://www.delftstack.com/ko/howto/python/merge-csv-files-python/
    # merging the files
    files_joined = os.path.join('./_result', "df*.csv")

    # Return a list of all joined files
    list_files = glob.glob(files_joined)
    print(list_files)
    print("** Merging multiple csv files into a single pandas dataframe **")
    # Merge files by joining all files
    dataframe = pd.concat(map(pd.read_csv, list_files), ignore_index=True).drop(['Unnamed: 0'], axis=1)
    print(dataframe)
```