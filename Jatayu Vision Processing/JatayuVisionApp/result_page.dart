import 'package:flutter/material.dart';


import 'dart:io';

import 'package:flutter/widgets.dart';

import 'dart:async';


import 'firebase_services.dart';

//This class uses the fetched data to display it on the screen
class StreamBuilderFireStore extends StatefulWidget {




  @override
  _StreamBuilderFireStoreState createState() => _StreamBuilderFireStoreState();
}

class _StreamBuilderFireStoreState extends State<StreamBuilderFireStore> {
  firebaseServices fireObj=new firebaseServices();



  var identity;

  @override
  void initState() {
    super.initState();
    fireObj.getData().then((results){
      setState(() {
        identity=results;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Jatayu Vision'),
        centerTitle: true,
        backgroundColor: Color(0xFF0069D9),
      ),
      body: Column(
        children: <Widget>[
          StreamBuilder(
            stream: identity,
            builder: (context, snapshot) {
              if (!snapshot.hasData) {
                return  Center(
                  child: CircularProgressIndicator(backgroundColor: Colors.blue[200],),

                );
              }
              final getdocs = snapshot.data.documents;
              List<MessageBubble> messageWidgets = [];
              for (var meassage in getdocs) {
                final messageID = meassage.data['CRIMINAL ID'];
                final messagename = meassage.data['NAME'];


                final messageWidget = MessageBubble(id: messageID,name: messagename);
                messageWidgets.add(messageWidget);
              }
              return Expanded(
                child: ListView(

                  padding: EdgeInsets.symmetric(vertical: 20, horizontal: 10),
                  children: messageWidgets,
                ),
              );
            },

          ),

          Container(
            decoration: BoxDecoration(
              border: Border(
                top: BorderSide(color: Colors.pinkAccent, width: 4.0),
              ),
            ),
            child:   FlatButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text(
                'GO BACK',
                style: TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.w900,
                  fontSize: 18.0,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class MessageBubble extends StatelessWidget {
  MessageBubble({this.id, this.name});

  final String id;
  final String name;




  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(top: 45,left: 10,right: 10,bottom: 1),
      child: Material(
        color: Color(0xFF0069D9),
        borderRadius:   BorderRadius.circular(18),
        elevation: 12,
        child: Padding(
          padding: EdgeInsets.symmetric(vertical: 10,horizontal: 5),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                'CRIMINAL ID: $id ' ,
                style: TextStyle(fontSize: 19, color: Colors.white),
              ),
              SizedBox(height: 20,),
              Text(
                'NAME: $name' ,
                style: TextStyle(fontSize: 21, color: Colors.white),
              ),
              SizedBox(height: 20,),

            ],
          ),
        ),
      ),

    );
    ;
  }
}



