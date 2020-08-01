import 'package:cloud_firestore/cloud_firestore.dart';
import'dart:async';





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
