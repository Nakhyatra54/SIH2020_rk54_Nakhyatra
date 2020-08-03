import 'package:campus/firestoreservices.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
//import 'package:photo_view/photo_view.dart';

import 'dart:math' as math;
import 'package:cloud_firestore/cloud_firestore.dart';


void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(debugShowCheckedModeBanner: false,
      title: 'Campus Security',
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  firestoreServices fireobj=new firestoreServices();
// getStreams() async{
//  await for (var snapshots in _firestore.collection('intruder').snapshots()) {
//    var arr=List();
//    for (var status in snapshots.documents) {
//
////      print(status.data);
////      print(status.data['cam1']);
//
//      arr[0]=status.data['cam1'];
//      arr[1]=status.data['cam2'];
//      arr[2]=status.data['cam3'];
//
//      print(arr[0]);
//      print(arr[1]);
//      print(arr[2]);
//    }
//    return arr;
//  }
//
//}
  Stream fire;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    fireobj.getData().then((results){
      setState(() {
        fire=results;
      });
    });
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text('JATAYU'),
        centerTitle: true,
        backgroundColor: Color.fromRGBO(0, 105, 217, 1),

      ),
      body: Padding(
        padding: const EdgeInsets.only(top: 35.0,left: 4,right: 4,bottom: 10),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[





            StreamBuilder(
              stream:fire,
              builder: (context, snapshot) {
                if (!snapshot.hasData) {
                  return  Center(
                    child: CircularProgressIndicator(backgroundColor: Colors.blue[200],),

                  );
                }
                final messages = snapshot.data.documents;
                List<MessageBubble2> messageWidgets = [];
                for (var meassage in messages) {
                  final messagetext1 = meassage.data['cam3'];



                  final messageWidget = MessageBubble2(cam3: messagetext1,);
                  messageWidgets.add(messageWidget);
                }
                return Row(
                  children: messageWidgets,

                );
              },
            ),
            Padding(
              padding: EdgeInsets.only(top: 20,bottom: 15),
              child: FittedBox(
                child: Image.asset('images/foto1.jpg'),
                fit: BoxFit.fill,
              ),
            ),
            StreamBuilder(
              stream:fire,
              builder: (context, snapshot) {
                if (!snapshot.hasData) {
                  return  Center(
                    child: CircularProgressIndicator(backgroundColor: Colors.blue[200],),

                  );
                }
                final messages = snapshot.data.documents;
                List<MessageBubble1> messageWidgets = [];
                for (var meassage in messages) {
                  final messagetext = meassage.data['cam1'];
                  final messageSender = meassage.data['cam2'];


                  final messageWidget = MessageBubble1(cam1: messagetext,cam2: messageSender);
                  messageWidgets.add(messageWidget);
                }
                return Row(
                  children: messageWidgets,
                );

              },
            ),
SizedBox(height: 35,),
            Padding(
              padding: const EdgeInsets.only(left:12.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[ Transform.rotate(
                  angle: 90 * math.pi / 4,
                  child: ClipOval(
                    child: Material(
                      color: Colors.red[300], // button color

                      child: InkWell(
                        splashColor: Colors.red[500], // inkwell color

                        child: SizedBox(
                          width: 54,
                          height: 54,
                          child: Icon(Icons.not_interested),
                        ),

                        onTap: () {
//                          fireobj.deleteData(snapshot.data.documents[0].documentID);

                        },
                      ),
                    ),
                  ),
                ),

                  SizedBox(width: 16),
                  Transform.rotate(
                    angle: 90 * math.pi / 4,
                    child: ClipOval(
                      child: Material(
                        color: Colors.green[500], // button color
                        child: InkWell(
                          splashColor: Colors.green, // inkwell color
                          child: SizedBox(
                            width: 54,
                            height: 54,
                            child: Icon(Icons.people),
                          ),
                          onTap: () {},
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}






class MessageBubble1 extends StatelessWidget {
  MessageBubble1({this.cam1, this.cam2});

  final bool cam1;
  final bool cam2;


  @override
  Widget build(BuildContext context) {
    return Material(
      child: Row(children: <Widget>[

        Transform.rotate(
          angle: 90 * math.pi / 180,
          child: CircleAvatar(
            radius: 16.4,
            backgroundColor: Color.fromRGBO(253, 0, 2,0),
            child: Icon(
              Icons.videocam,
              color: Colors.greenAccent,
            ),
          ),
        ),
        SizedBox(
          width: 134,
        ),
        Transform.rotate(
          angle: 90* math.pi / 180,
          child: CircleAvatar(
            radius: 16.4,
            backgroundColor:cam2? Color.fromRGBO(253, 0, 2,0.1):Color.fromRGBO(253, 0, 2,0),
            child: Icon(
              Icons.videocam,
              color: cam2?Colors.redAccent:Colors.greenAccent,
            ),
          ),
        ),
        SizedBox(
          width: 116,
        ),
        Transform.rotate(
          angle: 90 * math.pi / 180,
          child: CircleAvatar(
            radius: 16.4,
            backgroundColor: cam1?Color.fromRGBO(253, 0, 2,0.1):Color.fromRGBO(253, 0, 2,0),
            child: Icon(
              Icons.videocam,
              color: cam1?Colors.redAccent:Colors.greenAccent,
            ),

          ),
        ),
      ],),
    );
    ;
  }
}

class MessageBubble2 extends StatelessWidget {
  MessageBubble2({this.cam3});

  final bool cam3;



  @override
  Widget build(BuildContext context) {
    return Material(
      child: Row(children: <Widget>[

      Transform.rotate(
        angle: 90* math.pi / 180,
        child: CircleAvatar(
          radius: 16.4,
          backgroundColor: Color.fromRGBO(253, 0, 2,0),
          child: Icon(
            Icons.videocam,
            color: Colors.greenAccent,
          ),
        ),
      ),
      SizedBox(
        width: 134,
      ),
      Transform.rotate(
        angle: 90 * math.pi / 180,
        child: CircleAvatar(
          radius: 16.4,
          backgroundColor: cam3?Color.fromRGBO(253, 0, 2,0.1):Color.fromRGBO(253, 0, 2,0),
          child: Icon(
            Icons.videocam,
            color: cam3?Colors.redAccent:Colors.greenAccent,
          ),
        ),
      ),
      SizedBox(
        width: 116,
      ),
      Transform.rotate(
        angle: 90 * math.pi / 180,
        child: CircleAvatar(
          radius: 16.4,
          backgroundColor: Color.fromRGBO(253, 0, 2,0),
          child: Icon(
            Icons.videocam,
            color: Colors.greenAccent,
          ),
        ),
      ),
    ],),);
    ;
  }
}
