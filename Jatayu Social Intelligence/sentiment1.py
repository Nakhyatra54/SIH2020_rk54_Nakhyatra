# -*- coding: utf-8 -*-
"""
Created on Mon Aug  3 13:14:34 2020

@author: SUDARSHAN
"""

import pandas as pd
df = pd.read_csv('Test.csv')#####training file path....
df.head()


from io import StringIO
col = ['label', 'text']
df = df[col]
df = df[pd.notnull(df['text'])]
df.columns = ['label', 'text']
df['category_id'] = df['label'].factorize()[0]
category_id_df = df[['label', 'category_id']].drop_duplicates().sort_values('category_id')
category_to_id = dict(category_id_df.values)
id_to_category = dict(category_id_df[['category_id', 'label']].values)
df.head()


from sklearn.feature_extraction.text import TfidfVectorizer
tfidf = TfidfVectorizer(sublinear_tf=True, min_df=5, norm='l2', encoding='latin-1', ngram_range=(1, 2), stop_words='english')
features = tfidf.fit_transform(df.text).toarray()
labels = df.label
features.shape



from sklearn.feature_selection import chi2
import numpy as np
N = 2
for Product, category_id in sorted(category_to_id.items()):
  features_chi2 = chi2(features, labels == category_id)
  indices = np.argsort(features_chi2[0])
  feature_names = np.array(tfidf.get_feature_names())[indices]
  unigrams = [v for v in feature_names if len(v.split(' ')) == 1]
  bigrams = [v for v in feature_names if len(v.split(' ')) == 2]
  print("# '{}':".format(Product))
  print("  . Most correlated unigrams:\n. {}".format('\n. '.join(unigrams[-N:])))
  print("  . Most correlated bigrams:\n. {}".format('\n. '.join(bigrams[-N:])))
  
  
  
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
X_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'],test_size=0.3, random_state = 0)
count_vect = CountVectorizer()
X_train_counts = count_vect.fit_transform(X_train)
tfidf_transformer = TfidfTransformer()
X_train_tfidf = tfidf_transformer.fit_transform(X_train_counts)
clf = MultinomialNB().fit(X_train_tfidf, y_train)




print(clf.predict(count_vect.transform(["my honest review is the movie is excellent"])))


prediction= clf.predict(count_vect.transform(X_test))
from sklearn.metrics import classification_report
classification_report(y_test,prediction)
from sklearn.metrics import accuracy_score
accuracy_score(y_test,prediction)



df2 = pd.read_csv('POSTs.csv')######## put the path for POST.CSV
df3=df2['Post'].iloc[:55]
y_hats = clf.predict(count_vect.transform(df3)) 
df2=df2.iloc[:55]
df4 = df2.assign(preds = y_hats)
a=df4['preds']


import matplotlib.pyplot as plt

plt.plot(y_hats)
plt.show()