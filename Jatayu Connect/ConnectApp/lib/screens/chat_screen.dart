import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:chatify/constants.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:animated_text_kit/animated_text_kit.dart';
FirebaseUser loggedinUser;
class ChatScreen extends StatefulWidget {
  static String id = 'chat_screen';
  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _auth = FirebaseAuth.instance;
  final _firestore = Firestore.instance;

  String messagetext;
  final messageTextController=TextEditingController();

  void getcurrentUser() async {
    try {
      final user = await _auth.currentUser();

      if (user != null) {
        loggedinUser = user;
      }
    } catch (e) {
      print(e);
    }
  }

  void getmessages() async {
    await for (var snapshots in _firestore.collection('messages').snapshots()) {
      for (var message in snapshots.documents) {
        print(message.data);
      }
    }
  }

  @override
  void initState() {

    super.initState();
    getcurrentUser();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: null,
        actions: <Widget>[
          IconButton(
              icon: Icon(Icons.close),
              onPressed: () {
                _auth.signOut();
                Navigator.pop(context);
              }),
        ],
        title: Text ( "Jatayu Connect "),

        backgroundColor: Color.fromRGBO(112, 140, 249, .9),
      ),
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            StreamBuilder<QuerySnapshot>(
              stream: _firestore.collection('messages').orderBy('date').snapshots(),
              builder: (context, snapshot) {
                if (!snapshot.hasData) {
                  return Center(
                    child: CircularProgressIndicator(backgroundColor: Colors.blue[200],),

                  );
                }
                final messages = snapshot.data.documents.reversed;
                List<MessageBubble> messageWidgets = [];
                for (var meassage in messages) {
                  final messagetext = meassage.data['text'];
                  final messageSender = meassage.data['sender'];
                  final currentUser=loggedinUser.email;
                  if (currentUser==messageSender){}
                  final messageWidget = MessageBubble(text: messagetext, sender: messageSender,isMe: currentUser==messageSender,);
                  messageWidgets.add(messageWidget);
                }
                return Expanded(
                  child: ListView(
                    reverse: true,
                    padding: EdgeInsets.symmetric(vertical: 20, horizontal: 6),
                    children: messageWidgets,
                  ),
                );
              },
            ),
            Container(
              decoration: BoxDecoration(
                border: Border(
                  top: BorderSide(color: Colors.white, width: 3.0),
                ),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Expanded(
                    child: TextField(
                      controller: messageTextController,
                      onChanged: (value) {
                        messagetext = value;
                      },
                      decoration: kMessageTextFieldDecoration,
                    ),
                  ),

                  FlatButton(
                    onPressed: () {
                      messageTextController.clear();
                      _firestore.collection('messages').add({

                        'sender': loggedinUser.email,
                        'text': messagetext,
                        'date': DateTime.now().toIso8601String().toString(),
                      });
                    },
                    child: Padding(
                      padding: const EdgeInsets.only(left:55.0),
                      child: Icon(Icons.send,color: Color.fromRGBO(112, 140, 249, 1),size: 31,),
                    )
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

class MessageBubble extends StatelessWidget {
  MessageBubble({this.sender, this.text,this.isMe});

  final String sender;
  final String text;
  final bool isMe;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(10),
      child: Column(
        crossAxisAlignment:isMe? CrossAxisAlignment.end: CrossAxisAlignment.start,
        children: <Widget>[
          Text(sender,style: isMe? TextStyle(fontSize: 11,color:Colors.white70): TextStyle(fontSize: 11,color:Color.fromRGBO(112, 140, 249, .6))),
          SizedBox(height: 1,),
          Material(
            color:isMe? Colors.white:Color.fromRGBO(112, 140, 249, .9),
            borderRadius: isMe ? BorderRadius.only(topLeft: Radius.circular(30),bottomLeft: Radius.circular(30),bottomRight: Radius.circular(30)): BorderRadius.only(topRight: Radius.circular(30),bottomLeft: Radius.circular(30),bottomRight: Radius.circular(30)),
            elevation: 8,
            child: Padding(
              padding: EdgeInsets.symmetric(vertical: 10,horizontal: 20),
              child: Text(
                text ,
                style: isMe?TextStyle(fontSize: 15, color: Color.fromRGBO(112, 140, 249, 1)):TextStyle(fontSize: 15, color: Colors.white),
              ),
            ),
          ),],
      ),
    );
    ;
  }
}