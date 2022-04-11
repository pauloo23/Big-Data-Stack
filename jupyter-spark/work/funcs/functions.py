# -*- coding: utf-8 -*-
"""
Created on Tue Nov 23 10:22:53 2021

@author: jazevedo
"""
import pandas as pd
from pandas.api.types import is_string_dtype, is_numeric_dtype
from typing import List
from statsmodels.stats.outliers_influence import variance_inflation_factor
import cane

def toInt(x):
    return int(x)

def calc_vif(X):
    # Calculating VIF
    vif = pd.DataFrame()
    vif["variables"] = X.columns
    vif["VIF"] = [variance_inflation_factor(X.values, i) for i in range(X.shape[1])]
    vif = vif.sort_values(["VIF"], ascending=False)
    return(vif)

def tratamento(dataframe: pd.DataFrame)-> pd.DataFrame: 

    for i in dataframe:
        if is_string_dtype(dataframe[i]):
            dataframe[i].fillna('Desconhecido', inplace=True)
        elif is_numeric_dtype(dataframe[i]): 
            dataframe[i].fillna(0, inplace=True)
        else: print(i)
    return dataframe

def object(dataframe: pd.DataFrame) -> List:

    col_obj = []
    for i in dataframe:
        if is_string_dtype(dataframe[i]):
            col_obj.append(i)
        else: print(i)
    return col_obj


def not_object(dataframe: pd.DataFrame) -> List:

    col_not_obj = []
    for i in dataframe:
        if is_string_dtype(dataframe[i]):
            print(i)
        else: col_not_obj.append(i)
    return col_not_obj

def idf_encode(train: pd.DataFrame, test: pd.DataFrame, list: List, target):

    _train = train.copy()
    _test = test.copy()

    dataIDF = cane.idf_multicolumn(_train, columns_use = list)  # aplication of specific multicolumn setting IDF

    idfDicionary = cane.idfDictionary(Original = _train, Transformed = dataIDF, columns_use = list
                                , targetColumn=target) #following the example above of the 2 columns
    for col in list:
        _test[col] = (
        _test[col]
        .map(idfDicionary[col])
        .fillna(max(idfDicionary[col].values()))
    )
        _train[col] = (
        _train[col]
        .map(idfDicionary[col])
        .fillna(max(idfDicionary[col].values()))
    )
    
    return _train, _test, idfDicionary

def NMAE(mae, y):
    ymax = y.max()
    ymin = y.min()
    dif = ymax-ymin
    nmae = mae/dif
    return nmae

