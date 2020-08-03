# -*- coding: utf-8 -*-
"""
Created on Thu Jul 23 00:02:02 2020

@author: Asus
"""


import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('firebaseSDKNAV.json')

firebase_admin.initialize_app(cred)


criminal_ID = input('enter the criminal ID:') #0 for subrat
                                             #1 for agni
                                             #2 for zafer
                                             #3 for non##by default


db=firestore.client()

doc_ref=db.collection('coords').document('LASTloc')




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







def confirm(vd0='',vd1='',vd2=''):
    who=int(criminal_ID)
    import json
    import cv2
    from datetime import datetime 
    cam1 = cv2.VideoCapture(vd0)
    cam2 = cv2.VideoCapture(vd1)
    cam3 = cv2.VideoCapture(vd2)
    
    res={}
    timestamp=''
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
                val=database_search(frame1)
                if val==who:
                    F1.append(val)
                    timestamp = str(datetime.now())
            if F1!=[]:
                res['lat'] = 27.4706
                res['long'] = 94.9104
                res['time'] = timestamp
                doc_ref.set(res)
                print(res)
            
        if vd1!='':
            _,frame2 = cam2.read()
            frame2=cv2.resize(frame2,(500,500))
            face2 = face_frame(frame2)
            cv2.imshow("cam2",frame2)
            if face2 !='NF':
                val=database_search(frame2)
                if val==who:
                    F2.append(val)  
                    timestamp = str(datetime.now())
            if F2 !=[]:
                res['lat'] = 27.4495
                res['long'] = 94.8979
                res['time'] = timestamp
                doc_ref.set(res)
                print(res)
        
        if vd2!='':
            _,frame3 = cam3.read()
            frame3=cv2.resize(frame3,(500,500))
            face3 = face_frame(frame3)
            cv2.imshow("cam3",frame3)
            if face3!='NF':
                val=database_search(frame3)
                if val==who:
                    F3.append(val)
                    timestamp = str(datetime.now())
            if F3 !=[]:
                res['lat'] = 27.4876
                res['long'] = 94.9401
                res['time'] = timestamp
                doc_ref.set(res)
                print(res)
        
        if cv2.waitKey(20) & 0xFF == ord('q'):
            break
        i+=1
    
    cam1.release()    
    cam2.release() 
    cam3.release()
    cv2.destroyAllWindows()
    #app_json = json.dumps(res, sort_keys=True) 
##dictionary,json
  
confirm('vdo2.mp4','vdo1.mp4')


















