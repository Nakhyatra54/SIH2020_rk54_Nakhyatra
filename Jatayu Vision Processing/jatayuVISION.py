# -*- coding: utf-8 -*-
"""
Created on Fri Jul 24 19:50:06 2020

@author: Asus
"""

import tensorflow as tf
from keras.models import load_model 
import cv2
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pyrebase
import numpy as np
import os
import torch
import RRDBNet_arch as arch

cred = credentials.Certificate('JATAYUvision.json')

firebase_admin.initialize_app(cred)
db=firestore.client()

config = {
  "apiKey": "AIzaSyCStm__oUJ3Z9fE3ctKSgGwrVWDKbZHNJU",
  "authDomain": "cameravision-b89d7.firebaseapp.com",
  "databaseURL": "https://cameravision-b89d7.firebaseio.com",
  "storageBucket":"cameravision-b89d7.appspot.com",
  "serviceAccount":"D:/project/sih/JATAYUsVision/JATAYUvision.json"

}


newmdl = tf.keras.models.load_model('faceDetector.h5')


'''
##enhancer module
model_path = 'models/RRDB_PSNR_x4.pth'  # models/RRDB_ESRGAN_x4.pth OR models/RRDB_PSNR_x4.pth
device = torch.device('cuda')
model = arch.RRDBNet(3, 3, 64, 23, gc=32)
model.load_state_dict(torch.load(model_path), strict=True)
model.eval()
model = model.to(device)


def GAN(img):
    img = img * 1.0 / 255
    img = torch.from_numpy(np.transpose(img[:, :, [2, 1, 0]], (2, 0, 1))).float()
    img_LR = img.unsqueeze(0)
    img_LR = img_LR.to(device)
    with torch.no_grad():
        output = model(img_LR).data.squeeze().float().cpu().clamp_(0, 1).numpy()
    output = np.transpose(output[[2, 1, 0], :, :], (1, 2, 0))
    output = (output * 255.0).round()
    return output

'''

database = {
            0:'SUBRAT KISHORE DUTTA',
            1:'AGNIDEEP SENGUPTA',
            2:'ZAFER SADIQUE SHAH',
            3:'CIVILIAN'
            }




def database_search(path):
  import cv2
  import numpy as np
  import matplotlib.pyplot as plt
  #img=GAN(path) ##enhancing which is currently not used since module work well even without it.
  img=path
  img=cv2.resize(img,(128,128))
  img=img.reshape(-1,128,128,3)
  prediction=newmdl.predict([img],verbose=1)
  val = np.argmax(prediction)
  return val


firebase = pyrebase.initialize_app(config)

storage = firebase.storage()


doc_ref=db.collection('IDENTITY').document('NAME')

#storage.child("images/img.png").put("img.jpeg")
while True:
    while True:
        try:
            storage.child("images/img.png").download('fetch_image/img.png')
            break
        except:
            print("download fail")
    
    img=cv2.imread('D:/project/sih/JATAYUsVision/fetch_image/img.png')
    if type(img) is np.ndarray:
        storage.delete("images/img.png")
        val=database_search(img)
        res={'CRIMINAL ID':str(val),
             'NAME':database[val]}
        doc_ref.set(res)
    else:
        print("not fetched yet!")
    os.remove('D:/project/sih/JATAYUsVision/fetch_image/img.png')





















