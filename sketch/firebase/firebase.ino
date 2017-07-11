
#include "Arduino.h"
#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>

// #include <Firebase.h>
// #include <FirebaseCloudMessaging.h>
// #include <FirebaseError.h>
// #include <FirebaseHttpClient.h>
// #include <FirebaseObject.h>
#include <FirebaseArduino.h>

#define FIREBASE_HOST "test-50531.firebaseio.com"

#define WIFI_SSID "Komandir"
#define WIFI_PASS "151151488"

void connectWifi() {

  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.println("Connecting...");

  while (WiFi.status() != WL_CONNECTED) {
    Serial.println(".");
    delay(500);
  }

  Serial.println();
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void setupFirebase() {
  Firebase.begin(FIREBASE_HOST);
  if (Firebase.failed()) {
      Serial.print("Filed To connect to FireBASE");
      Serial.println(Firebase.error());
      return;
  }
  Serial.println();
  Serial.println("Firebase host: ");
  Serial.println(FIREBASE_HOST);
}



void setup() {
    Serial.begin(9600);
    pinMode(LED_BUILTIN, OUTPUT);
    connectWifi();
    setupFirebase();
    //
    // pinMode(redPin, OUTPUT);
    // pinMode(greenPin, OUTPUT);
    // pinMode(bluePin, OUTPUT);
}

void getDataFirebanse(){
  String path = "colors";
  FirebaseObject object = Firebase.get(path);
  // Firebase.setInt("colors/red", 99999);
  if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.error());
      return;
  }

  int red = object.getInt("red");
  int green = object.getInt("green");
  int blue = object.getInt("blue");

  if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.error());
      return;
  }
  // object.setBool("connected", true);
  //
  //
  Serial.println("red: ");
  Serial.println(red);

  Serial.println("green: ");
  Serial.println(green);

  Serial.println("blue: ");
  Serial.println(blue);

  // setColor(red,green,blue);
}
void loop() {
  getDataFirebanse();
  delay(500);
}







// // #include <Firebase.h>
// // #include <FirebaseArduino.h>
// // #include <FirebaseCloudMessaging.h>
// // #include <FirebaseError.h>
// // #include <FirebaseHttpClient.h>
// // #include <FirebaseObject.h>
// // #include <SerialTransceiver.h>
// // #include <Thing.h>
//
//
// #include <ESP8266WiFi.h>
// #include <FirebaseArduino.h>
//
//
// #define FIREBASE_HOST "test-50531.firebaseio.com"
// #define FIREBASE_AUTH "m74FpxeBCMqS8RoJe4ypglib1rjiQ60B2pg8TVzJ"
//
//
// void setupFirebase() {
//   Firebase.begin(FIREBASE_HOST);
//   // Serial.println();
//   // Serial.println("Firebase host: ");
//   // Serial.println(FIREBASE_HOST);
// }
//
//
//
//
//
//
//
//
//
// //int greenPin = 4;
// //int redPin = 5;
// //int bluePin = 16;
//
//
//
// // void connectWifi() {
//
// //   WiFi.begin(WIFI_SSID, WIFI_PASS);
// //   Serial.println("Connecting...");
//
//
//
// //   while (WiFi.status() != WL_CONNECTED) {
// //     Serial.println(".");
// //     delay(500);
// //   }
//
//
//
// //   Serial.println();
// //   Serial.println("IP address: ");
// //   Serial.println(WiFi.localIP());
// // }
//
//
//
//
//
//
// void setup() {
//     Serial.begin(9600);
//     // connectWifi();
//     setupFirebase();
//     //
//     // pinMode(redPin, OUTPUT);
//     // pinMode(greenPin, OUTPUT);
//     // pinMode(bluePin, OUTPUT);
// }
//
// void loop() {
//   digitalWrite(LED_BUILTIN, HIGH);
//   delay(1000);
//
//   digitalWrite(LED_BUILTIN, LOW);
//   delay(1000);
// }
//
//
// // void getFirebaseLedInfo() {
// //   String path = "colors";
// //
// //   FirebaseObject object = Firebase.get(path);
// //
// //   bool showLed = object.getBool("led");
// //    // handle error
// //   if (object.failed()) {
// //      Serial.print("getting led failed:");
// //      Serial.println(object.error());
// //      return;
// //    }
// //
// //   if (!showLed) {
// //     ledOn();
// //   } else {
// //     ledOff();
// //   }
// // }
//
//
// void ledOn() {
//   digitalWrite(LED_BUILTIN, HIGH);
// //  delay(1000);
// }
//
// void ledOff() {
//   digitalWrite(LED_BUILTIN, LOW);
// //  delay(1000);
// }
//
// // void getDataFirebanse(){
// //   String path = "led";
// //
// //   FirebaseObject object = Firebase.get(path);
// //
// //   int red = object.getInt("red");
// //   int green = object.getInt("green");
// //   int blue = object.getInt("blue");
// //   setColor(red,green,blue);
// // }
// //
// // void setColor(int red, int green, int blue)
// // {
// //     #ifdef COMMON_ANODE
// //     red = 255 - red;
// //     green = 255 - green;
// //     blue = 255 - blue;
// //     #endif
// //
// //     analogWrite(redPin, red);
// //     analogWrite(greenPin, green);
// //     analogWrite(bluePin, blue);
// // }
