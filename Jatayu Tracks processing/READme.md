# JatayuNavigation processing end.


##introduction
tracker.py is the script which is used to process the recorded videos and find criminals based on their inserted criminal ID. this script will be fun by the control room operator and after the locations and thr recorded timestamps are detected the database is updated after which it is displayed in the UI

## other files

faceDetector.h5 : weights of the CNN architecture we trained for recogniser

NAKHYATRAtracks.json : configuration file for the database

haarcascade_frontalface_default.xml : supporting file vdo.mp4,vdo1.mp4,vdo2.mp4 :demo vdos

VDOcapture.py: it is the program that will work as the software for the CCTV in terms of recording of videos. it will create a file on real 
time which will record timestamp corresponding to each frame recorded.

timestamp.csv,timestamp1.csv,timestamp2.csv: timestamp files corresponding to vdo vdo.mp4,vdo1.mp4 and vdo2.mp4

