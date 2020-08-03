import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'package:image_cropper/image_cropper.dart';
import 'package:flutter/widgets.dart';

import 'package:firebase_storage/firebase_storage.dart';
import 'result_page.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
        home: Scaffold(
            appBar: AppBar(
              title: Text('Jatayu Vision'),
              centerTitle: true,
              backgroundColor: Color(0xFF0069D9),
            ),
            body: Center(child: MyImagePicker())));
  }
}

class MyImagePicker extends StatefulWidget {
  @override
  MyImagePickerState createState() => MyImagePickerState();
}

class MyImagePickerState extends State with SingleTickerProviderStateMixin{

  AnimationController controller;
  Animation animation;
  @override
  void initState() {
    super.initState();
    controller=AnimationController(duration: Duration(seconds: 35), vsync: this);
    animation=CurvedAnimation(parent: controller,curve: Curves.elasticIn);
    controller.forward();

    controller.addListener(() {setState(() {    });});
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  // Holds Image Path
  File imageFile;

  Future pickImage(ImageSource source) async {
    //Opens Android/iOS camera and waits for user to take a picture.
    File image = await ImagePicker.pickImage(source: source);

    setState(() {
      imageFile = image;
    });
  }

  Future getImageFromGallery() async {
    //Opens Android/iOS Photo Gallery and waits for user to select an image
    var image = await ImagePicker.pickImage(source: ImageSource.gallery);

    setState(() {
      imageFile = image;
    });
  }

  Future<void> imageCropper() async {
    File cropped = await ImageCropper.cropImage(
      sourcePath: imageFile.path,
    );

    setState(() {
      imageFile = cropped ?? imageFile;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(

        bottomNavigationBar: BottomAppBar(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              IconButton(
                icon: Icon(Icons.photo_camera),
                onPressed: () => pickImage(ImageSource.camera),
              ),
              IconButton(
                icon: Icon(Icons.photo_library),
                onPressed: () => pickImage(ImageSource.gallery),
              ),
              SizedBox(width: 155,),
              FadeTransition(
                opacity: animation,
                child: FadeTransition(
                  opacity: animation,
                  child: FlatButton(
                    color: Colors.white70,
                    textColor: Colors.blueAccent,
                    padding: EdgeInsets.only(left:16.0),
                    onPressed:   () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => StreamBuilderFireStore()),
                      );
                    },
                    child: Text(
                      "Result".toUpperCase(),
                      style: TextStyle(
                        fontSize: 14.0,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        body: ListView(
          children: <Widget>[
            if (imageFile != null) ...[
              Image.file(imageFile),
              Row(

                children: <Widget>[
                  FlatButton(
                    child: Icon(Icons.crop,color: Colors.pinkAccent,),
                    onPressed: imageCropper,
                  ),
                ],
              ),
              Uploader(file: imageFile),
            ]
          ],
        ));
  }
}

class Uploader extends StatefulWidget {
  final File file;
  Uploader({Key key, this.file}) : super(key: key);
  createState() => _UploaderState();
}

class _UploaderState extends State<Uploader> {
  final FirebaseStorage _storage =
      FirebaseStorage(storageBucket: 'gs://cameravision-b89d7.appspot.com/');



  StorageUploadTask _uploadTask;

  void _startUpload() {
    String filePath = 'images/img.png';
    setState(() {
      _uploadTask = _storage.ref().child(filePath).putFile(widget.file);
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_uploadTask != null) {
      return StreamBuilder<StorageTaskEvent>(
        stream: _uploadTask.events,
        builder: (context, snapshot) {
          var event = snapshot?.data?.snapshot;
          double progressPercent =
              event != null ? event.bytesTransferred / event.totalByteCount : 0;
          return Column(
            children: <Widget>[
              if (_uploadTask.isComplete) Text('DONE',style: TextStyle(color: Colors.green[400]),),
              if (_uploadTask.isPaused)
                FlatButton(
                  child: Icon(Icons.play_circle_outline,color: Colors.green[400],),
                  onPressed: _uploadTask.resume,
                ),
              if (_uploadTask.isInProgress)
                FlatButton(
                  child: Icon(Icons.pause,color: Colors.red,),
                  onPressed: _uploadTask.pause,
                ),
              Padding(
                padding: const EdgeInsets.only(left:12.0,right: 12.0),
                child: LinearProgressIndicator(
                  value: progressPercent,
                  backgroundColor: Colors.greenAccent,
                ),
              ),
              Text(
                '${(progressPercent * 100).toStringAsFixed(2)}%',
              )
            ],
          );
        },
      );
    } else {
      return Column(
        children: <Widget>[
      FlatButton(
      shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(18.0),
    side: BorderSide(color: Colors.blueAccent)),
    color:Colors.white,
    textColor: Colors.white,
    padding: EdgeInsets.all(10.0),
    onPressed:  _startUpload,
    child: Text(
    "Upload to Database".toUpperCase(),
    style: TextStyle(
      color: Color(0xFF0069D9),
    fontSize: 14.0,
    ),
    ),
    ),
          SizedBox(height: 20,),

        ],
      );
    }
  }
}
