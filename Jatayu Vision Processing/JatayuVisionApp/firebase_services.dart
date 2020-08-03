import 'package:cloud_firestore/cloud_firestore.dart';
import'dart:async';



//for fetching data from the database

class firebaseServices {


  getData() async{
    return await Firestore.instance.collection('IDENTITY').snapshots();
  }

  deleteData(docID){
    Firestore.instance.collection('IDENTITY').document(docID).delete().catchError((e){
      print(e);
    });
  }
}
