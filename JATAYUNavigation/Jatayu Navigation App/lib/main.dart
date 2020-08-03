import 'package:flutter/material.dart';
import 'dart:async';

import 'destiny.dart';


import 'location_service.dart';

import 'package:cloud_firestore/cloud_firestore.dart';



import 'package:flutter_mapbox_navigation/library.dart';



import 'package:flutter/services.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';



CameraPosition _initialLocation = CameraPosition(target:LatLng(26.2006, 92.9376));
locationServices location =locationServices();

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {

  CameraPosition _initialLocation = CameraPosition(target: LatLng(0.0, 0.0));
  destinyServices destinyobj=new destinyServices();
  String _platformVersion = 'Unknown';
  List<Marker> allMarkers = [];
  Map markers = {};

  BitmapDescriptor myIcon;


  QuerySnapshot place;

  final Geolocator _geolocator = Geolocator();
  final _firestore = Firestore.instance;
  GoogleMapController mapController;
  Position _currentPosition;



  MapboxNavigation _directions;
  bool _arrived = false;
  double _distanceRemaining, _durationRemaining;

  @override
  void initState() {
    super.initState();
    initPlatformState();
    _getCurrentLocation();
    destinyobj.getData().then((results){
      setState(() {
        place=results;
      });
    });

    BitmapDescriptor.fromAssetImage(
        ImageConfiguration(size: Size(48, 48)), 'assets/my_icon.png')
        .then((onValue) {
      myIcon = onValue;
    });
  }


// Method for retrieving the current location
  _getCurrentLocation() async {
    await _geolocator
        .getCurrentPosition(desiredAccuracy:LocationAccuracy.high)
        .then((Position position) async {
      setState(() {
        // Store the position in the variable
        _currentPosition = position;

        print('CURRENT POS: $_currentPosition');

        // For moving the camera to current location
        mapController.animateCamera(
          CameraUpdate.newCameraPosition(
            CameraPosition(
              target: LatLng(position.latitude, position.longitude),
              zoom: 20.0,
            ),
          ),
        );
      });
    }).catchError((e) {
      print(e);
    });
  }
  Future<void> initPlatformState() async {

    if (!mounted) return;

    _directions = MapboxNavigation(onRouteProgress: (arrived) async {
      _distanceRemaining = await _directions.distanceRemaining;
      _durationRemaining = await _directions.durationRemaining;

      setState(() {
        _arrived = arrived;
      });
      if (arrived)
      {
        await Future.delayed(Duration(seconds: 3));
        await _directions.finishNavigation();
      }
    });

    String platformVersion;
    // Platform messages may fail, so we use a try/catch PlatformException.
    try {
      platformVersion = await _directions.platformVersion;
    } on PlatformException {
      platformVersion = 'Failed to get platform version.';
    }

    setState(() {
      _platformVersion = platformVersion;
    });
  }

  @override
  Widget build(BuildContext context) {

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          title: Text('Jatayu Navigation',style: TextStyle(color:Colors.white),),
          centerTitle: true,
          backgroundColor: Color.fromRGBO( 	0, 105, 217,1),
        ),
        body: Stack(
          children: <Widget>[

            FutureBuilder(
              future: Future.wait([locationServices().getLat(),locationServices().getLong()]),
              builder: (context,snapshot) {
                if (snapshot.data == null) {
                  return Container(
                      child: Center(child: CircularProgressIndicator()));
                } else {
                  return Stack(
                    children :<Widget>[ SizedBox(
                      height: 700,
                      width: 365,
                      child: Center(
                        child: GoogleMap(
                          initialCameraPosition: CameraPosition(
                              target: LatLng(snapshot.data[0], snapshot.data[1]), zoom: 15),


                          zoomControlsEnabled: true,
                          myLocationEnabled: true,
                          trafficEnabled: true,
                          myLocationButtonEnabled: true,
                          markers: Set.from(allMarkers),


                        ),
                      ),
                    ),







                    ],
                  );

                };
              },),


            Align(
              alignment: Alignment.centerRight,
              child: Padding(
                padding: const EdgeInsets.only(right:8.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    SizedBox(height: 200,),

                    ClipOval(
                      child: Material(
                        color: Colors.pinkAccent, // button color
                        child: InkWell(
                          splashColor: Colors.pink, // inkwell color
                          child: SizedBox(
                            width: 50,
                            height: 50,
                            child: Icon(Icons.location_searching,color: Colors.white,),
                          ),
                          onTap: () {
                            setState(() {
                              allMarkers = [];
                              allMarkers.add(Marker(
                                  markerId: MarkerId('myMarker'),
                                  infoWindow: InfoWindow(
                                    title: place.documents[0].data['time'],
                                  ),

                                  position: LatLng(place.documents[0].data['lat'],  place.documents[0].data['long'])));

                            });
                          },
                        ),

                      ),
                    ),
                    SizedBox(height: 13,),
                    ClipOval(
                      child: Material(
                        color: Color.fromRGBO(145, 134, 252,0.8), // button color
                        child: InkWell(
                          splashColor: Color.fromRGBO(145, 134, 252,0.4), // inkwell color
                          child: SizedBox(
                            width: 50,
                            height: 50,
                            child: Icon(Icons.refresh,color: Colors.white,),
                          ),
                          onTap: () {
                            destinyobj.getData().then((results){
                              setState(() {
                                place=results;
                              });
                            });
                          },
                        ),

                      ),
                    ),
                    SizedBox(height: 13,),
                    ClipOval(
                      child: Material(
                        color: Colors.blueAccent, // button color
                        child: InkWell(
                          splashColor: Colors.blue[900], // inkwell color
                          child: SizedBox(
                            width: 50,
                            height: 50,
                            child: Icon(Icons.directions,color: Colors.white,),
                          ),
                          onTap: () async {
                            await _directions.startNavigation(
                                origin: WayPoint(name:"My Location",latitude:_currentPosition.latitude, longitude: _currentPosition.longitude),
                                destination: WayPoint(name:"Security Breach",latitude:place.documents[0].data['lat'], longitude: place.documents[0].data['long']),


                                mode: MapBoxNavigationMode.drivingWithTraffic,
                                simulateRoute: true, language: "en", units: VoiceUnits.metric);
                          },
                        ),

                      ),
                    ),
                    SizedBox(height: 13,),
                    ClipOval(
                      child: Material(
                        color: Colors.green[400], // button color
                        child: InkWell(
                          splashColor: Colors.greenAccent, // inkwell color
                          child: SizedBox(
                            width: 50,
                            height: 50,
                            child: Icon(Icons.people,color: Colors.white,),

                          ),
                          onTap: () {

                          },
                        ),

                      ),
                    ),

                  ],
                ),
              ),
            ),

          ],
        ),
      ),


    );
  }
}
