import 'package:flutter/material.dart';
import 'package:chatify/screens/welcome_screen.dart';
import 'package:chatify/screens/login_screen.dart';
import 'package:chatify/screens/registration_screen.dart';
import 'package:chatify/screens/chat_screen.dart';
import 'package:chatify/screens/new.dart';

void main() => runApp(FlashChat());

class FlashChat extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark().copyWith(
        textTheme: TextTheme(
          body1: TextStyle(color: Colors.black54),
        ),
      ),
      debugShowCheckedModeBanner: false,

      initialRoute: WelcomeScreen.id,
      routes: {
        WelcomeScreen.id:(context)=>WelcomeScreen(),
        LoginScreen.id:(context)=>LoginScreen(),
        RegistrationScreen.id:(context)=>RegistrationScreen(),
        ChatScreen.id:(context)=>ChatScreen(),
      },
    );
  }
}