// #include <ESP8266WiFi.h>
// #include <FirebaseArduino.h>

#define WIFI_SSID "mesto5"
#define WIFI_PASS "mediumwell"

//#include "string"
//#include "FirebaseArduino.h"
////#include "ESP8266WiFi.h"
//// Constants
#define FIREBASE_HOST "test-50531.firebaseio.com"
#define FIREBASE_AUTH "m74FpxeBCMqS8RoJe4ypglib1rjiQ60B2pg8TVzJ"
//
//
// void setupFirebase() {
//  Firebase.begin(FIREBASE_HOST);
//   Serial.println();
//   Serial.println("Firebase host: ");
//  Serial.println(FIREBASE_HOST);
// }

void getFirebaseLedInfo() {
 String path = "colors";

 FirebaseObject object = Firebase.get(path);

 bool showLed = object.getBool("led");
  // handle error
 if (object.failed()) {
    Serial.print("getting led failed:");
    Serial.println(object.error());
    return;
  }

 if (!showLed) {
   ledOn();
 } else {
   ledOff();
 }
}


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
  Serial.println();
  Serial.println("Firebase host: ");
  Serial.println(FIREBASE_HOST);
}
