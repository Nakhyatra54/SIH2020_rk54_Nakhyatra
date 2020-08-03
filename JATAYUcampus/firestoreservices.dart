import 'package:cloud_firestore/cloud_firestore.dart';

class firestoreServices {




  getData() async{
    return await Firestore.instance.collection('intruder').snapshots();
  }
  deleteData(docID) {
    Firestore.instance
        .collection('intruder')
        .document(docID)
        .delete()
        .catchError((e) {
      print(e);
    });
  }
}
