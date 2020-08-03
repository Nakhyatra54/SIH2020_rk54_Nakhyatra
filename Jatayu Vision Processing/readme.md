# Jatayu Vision processing end.


##introduction

the jatayuVISION.py script is the core script that runs continuously at the backend.
FIREBASE is used as a database.
The script fetches the photo that was uploaded by the application and feeds it back to the database

  
## other files
jatayuVISION.py : main script which runs continuously.
faceDetector.h5 : weights of the CNN architecture we trained for recogniser
JATAYUvision.json : configuration file for the database
RRDBNet_arch.py : supporting script for the GAN model for enhancing the image.

#few notes:

1. so that the jatayuVISION.py gets the location of the face detector the paths may need to be adjusted
2. to store the image after downloading an empty file named fetch_image needs to be provided along the same folder in which the jatayuVISION.py is.
 