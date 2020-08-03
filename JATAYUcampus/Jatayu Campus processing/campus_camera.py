# -*- coding: utf-8 -*-
"""
Created on Tue Jul 21 12:59:25 2020

@author: Asus
"""

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
cred = credentials.Certificate('NAKHYATRAcampus.json')

firebase_admin.initialize_app(cred)


db=firestore.client()

doc_ref=db.collection('intruder').document('LOGS')







def confirm(vd0='',vd1='',vd2=''):
    import json
    import cv2
    body_cascade = cv2.CascadeClassifier('haarcascade_fullbody.xml')
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    
    cam1 = cv2.VideoCapture(vd0)
    cam2 = cv2.VideoCapture(vd1)
    cam3 = cv2.VideoCapture(vd2)
    
    i=0
    F1=[]
    F2=[]
    F3=[]
    res={
         'cam1': False,
         'cam2': False,
         'cam3': False
         }
    
    while i!=50:##checks for 5 seconds
        if vd0!='':
            _,frame1 = cam1.read()
            frame1=cv2.resize(frame1,(500,500))
            bnw1 =  cv2.cvtColor(frame1,cv2.COLOR_BGR2GRAY)
            face1 = face_cascade.detectMultiScale(bnw1,1.1,4)
            if face1!=():
               F1.append(face1)
            for (x,y,w,h) in face1:    
                cv2.rectangle(frame1,(x,y),(x+w,y+h),(255,0,0),4)
            cv2.imshow("cam1",frame1)
            
        if vd1!='':
            _,frame2 = cam2.read()
            frame2=cv2.resize(frame2,(500,500))
            bnw2 =  cv2.cvtColor(frame2,cv2.COLOR_BGR2GRAY)
            face2 = face_cascade.detectMultiScale(bnw2,1.1,4)
            if face2!=():
                F2.append(face2)
            for (x,y,w,h) in face2:
                cv2.rectangle(frame2,(x,y),(x+w,y+h),(255,0,0),4)
            cv2.imshow("cam2",frame2)    
                
            
        
    
        if vd2!='':
            _,frame3 = cam3.read()
            frame3=cv2.resize(frame3,(500,500))
            bnw3 =  cv2.cvtColor(frame3,cv2.COLOR_BGR2GRAY)
            face3 = face_cascade.detectMultiScale(bnw3,1.1,4)
            if face3!=():
                F3.append(face3)
            for (x,y,w,h) in face3:
                cv2.rectangle(frame3,(x,y),(x+w,y+h),(255,0,0),4)
            cv2.imshow("cam3",frame3)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
        i+=1
    
    cam1.release()    
    cam2.release() 
    cam3.release()
    cv2.destroyAllWindows()
    
    if F1!=[]:
        res['cam1'] = True
    if F2 !=[]:
        res['cam2'] = True
    if F3 !=[]:
        res['cam3'] = True
    doc_ref.set(res)
    print(res)    
    #app_json = json.dumps(res, sort_keys=True) 
    ##dictionary,json
    
confirm('vdo.mp4','vdo2.mp4','vdo1.mp4')

    
    
    
    
    
    
    
    
    