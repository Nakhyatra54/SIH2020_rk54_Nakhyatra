

import 'package:flutter/material.dart';
import 'login_screen.dart';
import 'registration_screen.dart';
import 'package:animated_text_kit/animated_text_kit.dart';
//this is the Welcome screen for the user
class WelcomeScreen extends StatefulWidget {
  static String id ='welcome';
  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> with SingleTickerProviderStateMixin {
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
  @override
  Widget build(BuildContext context) {
    return Scaffold(
//

      body: Container(

          decoration: BoxDecoration(
              gradient: LinearGradient(
                  begin: Alignment.topRight,
                  end: Alignment.bottomLeft,
                  colors: [ Color.fromRGBO(112, 140, 249, .9),Colors.black])),
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 15),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
              Row(
                  children: <Widget>[
                    SizedBox(
                      height: 20,
                    ),
                    Hero(
                      tag: 'logo',
                      child: Container(

                        child: Image.asset('images/img1.png'),
                        height: 80,
                      ),
                    ),


                      SizedBox(width: 20,),

                     Flexible(
                       child: TyperAnimatedTextKit(
                          text: ["Jatayu Connect"],
                          textStyle: TextStyle(
                            fontWeight: FontWeight.w800,
                              fontSize: 40, color: Colors.white, fontFamily: "Cardo"),
                          textAlign: TextAlign.start,
                          alignment: AlignmentDirectional.topCenter // or Alignment.topLeft
                    ),
                     ),


                  ],
                ),
                SizedBox(
                  height: 48.0,
                ),
                Padding(
                  padding: EdgeInsets.symmetric(vertical: 16.0),
                  child: Material(
                    elevation: 5.0,
                    color: Colors.blueAccent[200],
                    borderRadius: BorderRadius.circular(30.0),
                    child: MaterialButton(
                      onPressed: () {
                        Navigator.pushNamed(context, LoginScreen.id);
                      },
                      minWidth: 200.0,
                      height: 42.0,
                      child: Text(
                        'Log In',
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.symmetric(vertical: 16.0),
                  child: Material(
                    color: Colors.green[400],
                    borderRadius: BorderRadius.circular(30.0),
                    elevation: 5.0,
                    child: MaterialButton(
                      onPressed: () {
                       Navigator.pushNamed(context, RegistrationScreen.id);
                      },
                      minWidth: 200.0,
                      height: 42.0,
                      child: Text(
                        'Register',
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      );


  }
}