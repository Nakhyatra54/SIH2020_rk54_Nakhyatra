# -*- coding: utf-8 -*-
"""
Created on Thu Jul 23 22:10:15 2020

@author: Asus
"""

import tensorflow as tf
from keras.models import load_model 
import cv2
newmdl = tf.keras.models.load_model('D:/project/sih/NAKHYATRAtracks/faceDetector.h5')
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('NAKHYATRAtracks.json')

firebase_admin.initialize_app(cred)
db=firestore.client()

def face_frame(img):    
    img=cv2.resize(img,(128,128))
    req = img.copy()
    bnw =  cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(bnw,1.3,5)
    if faces!=():
        for (x,y,w,h) in faces:
            finalimg = req[x:x+w,y:y+w]
        return finalimg    
    elif faces == ():
        return "NF"

def database_search(path):
  import cv2
  import numpy as np
  import matplotlib.pyplot as plt
  img=path
  img=cv2.resize(img,(128,128))
  img=img.reshape(-1,128,128,3)
  prediction=newmdl.predict([img],verbose=1)
  val = np.argmax(prediction)
  return val

#NOTES: for tracking we are considering the fact that we already have the vdo footage


def confirm(vd0='',vd1='',vd2=''):
    who=int(input('CRIMINALID:'))
    doc_ref1=db.collection('Nakhyatra').document('CAM1')
    doc_ref2=db.collection('Nakhyatra').document('CAM2')
    doc_ref3=db.collection('Nakhyatra').document('CAM3')
    import json
    import cv2
    import pandas as pd
    cam1 = cv2.VideoCapture(vd0)
    cam2 = cv2.VideoCapture(vd1)
    cam3 = cv2.VideoCapture(vd2)
    csv1 = pd.read_csv('timestamp.csv')
    csv2 = pd.read_csv('timestamp1.csv')
    csv3 = pd.read_csv('timestamp2.csv')
    cam1dict={'state':False,
              '_latitude':27.4706,
              '_longitude':94.9104,
              'timestamp':'00'}
    cam2dict={'state':False,
              '_latitude':27.4495,
              '_longitude':94.8979,
              'timestamp':'00'}
    cam3dict={'state':False,
              '_latitude':27.4476,
              '_longitude':94.9401,
              'timestamp':'00'}
    
    i=0
    while i!=40:##checks for 5 seconds
        F1=[]
        F2=[]
        F3=[]
        if vd0!='':
            _,frame1 = cam1.read()
            frame1=cv2.resize(frame1,(500,500))
            face1 = face_frame(frame1)
            cv2.imshow("cam1",frame1)
            if face1 !='NF':
                val=database_search(face1)
                if val==who:
                    F1.append(val)
            if F1!=[]:
                cam1dict['state'] = True
                cam1dict['timestamp'] = csv1['timestamp'][i]
            
        if vd1!='':
            _,frame2 = cam2.read()
            frame2=cv2.resize(frame2,(500,500))
            face2 = face_frame(frame2)
            cv2.imshow("cam2",frame2)
            if face2 !='NF':
                val=database_search(face2)
                if val==who:
                    F2.append(val)  
            if F2 !=[]:
                cam2dict['state'] = True
                cam2dict['timestamp'] = csv2['timestamp'][i]
        
        if vd2!='':
            _,frame3 = cam3.read()
            frame3=cv2.resize(frame3,(500,500))
            face3 = face_frame(frame3)
            cv2.imshow("cam3",frame3)
            if face3!='NF':
                val=database_search(frame3)
                if val==who:
                    F3.append(val)
            if F3 !=[]:
                cam3dict['state'] = True
                cam3dict['timestamp'] = csv3['timestamp'][i]
                
        i+=1
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break
        
    doc_ref1.set(cam1dict)
    doc_ref2.set(cam2dict)
    doc_ref3.set(cam3dict)
    cam1.release()    
    cam2.release() 
    cam3.release()
    cv2.destroyAllWindows()
    #app_json = json.dumps(res, sort_keys=True) 



cam1=str(input('footage 1:'))
cam2=str(input('footage 2:'))
cam3=str(input('footage 3:'))

confirm('vdo1.mp4','vdo2.mp4','vdo.mp4')







































