import 'package:geocoder/geocoder.dart';

import 'package:geolocator/geolocator.dart';
//get location services of the user via Geolocator

class locationServices {
  Future<String> getCoords() async {
    Position position = await Geolocator().getCurrentPosition(
        desiredAccuracy: LocationAccuracy.bestForNavigation);
    final coordinates = new Coordinates(position.latitude, position.longitude);

    var addresses = await Geocoder.local.findAddressesFromCoordinates(coordinates);
    var address=addresses.first;
    return address.addressLine.toString();
  }


  Future<double> getLat() async {
    Position position = await Geolocator().getCurrentPosition(
        desiredAccuracy: LocationAccuracy.bestForNavigation);
    final coordinates = position.latitude;


    return coordinates.toDouble();
  }

  Future<double> getLong() async {
    Position position = await Geolocator().getCurrentPosition(
        desiredAccuracy: LocationAccuracy.bestForNavigation);
    final coordinates =  position.longitude;


    return coordinates.toDouble();
  }
}