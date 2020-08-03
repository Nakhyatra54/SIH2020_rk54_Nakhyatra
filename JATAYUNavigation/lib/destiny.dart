
import 'package:cloud_firestore/cloud_firestore.dart';
import'dart:async';

//get Coordinates from Database



class destinyServices {


 getData() async{
   return await Firestore.instance.collection('coords').getDocuments();
 }
}

