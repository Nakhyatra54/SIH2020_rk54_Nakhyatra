# Jatayu CAMPUS protect processing

campus_camera.py : this script does real time processing of the feed provided by the CCTV camera. here we have used vdo.mp4,vdo1.mp4,vdo2.mp4 for the demo purpose the results are then uploaded to the database from where the handheld device fetches it and notify the patrolling party members. this script is loaded already and the confirm functions runs automatically when the first layer is breached.

##introduction

this system involves total solution for any campus security system. it consist of the following layer of security

1. laser layer : breaching which automatically start the confirmation layer

2. confirmation layer : which ensures that the tresspasser is a human being.

3. handheld device : this is a handheld device which is worn by the patrolling party. it gates notify about exactly where the tresspassing is taking place

4. alarm layer : if the patrolling party needs backup they can set the alarm on using their handheld device 
  
## other files
campus_camera.py: main processing file
NAKHYATRAcampus.json : configuration file for database
haarcascade_frontalface_default.xml,haarcascade_fullbody : supporting file
vdo.mp4, vdo1.mp4, vdo2.mp4 : demo videos.
