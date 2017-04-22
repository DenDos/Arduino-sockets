#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>


//int greenPin = 4;
//int redPin = 5;
//int bluePin = 16;

// void connectWifi() {

//   WiFi.begin(WIFI_SSID, WIFI_PASS);
//   Serial.println("Connecting...");

//   while (WiFi.status() != WL_CONNECTED) {
//     Serial.println(".");
//     delay(500);
//   }

//   Serial.println();
//   Serial.println("IP address: ");
//   Serial.println(WiFi.localIP());
// }
// void setupFirebase() {
//   Firebase.begin(FIREBASE_HOST);
//   Serial.println();
//   Serial.println("Firebase host: ");
//   Serial.println(FIREBASE_HOST);
// }


void setup() {
    Serial.begin(9600);
    connectWifi();
    setupFirebase();
    //
    // pinMode(redPin, OUTPUT);
    // pinMode(greenPin, OUTPUT);
    // pinMode(bluePin, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);

  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}


// void getFirebaseLedInfo() {
//   String path = "colors";
//
//   FirebaseObject object = Firebase.get(path);
//
//   bool showLed = object.getBool("led");
//    // handle error
//   if (object.failed()) {
//      Serial.print("getting led failed:");
//      Serial.println(object.error());
//      return;
//    }
//
//   if (!showLed) {
//     ledOn();
//   } else {
//     ledOff();
//   }
// }


void ledOn() {
  digitalWrite(LED_BUILTIN, HIGH);
//  delay(1000);
}

void ledOff() {
  digitalWrite(LED_BUILTIN, LOW);
//  delay(1000);
}

// void getDataFirebanse(){
//   String path = "led";
//
//   FirebaseObject object = Firebase.get(path);
//
//   int red = object.getInt("red");
//   int green = object.getInt("green");
//   int blue = object.getInt("blue");
//   setColor(red,green,blue);
// }
//
// void setColor(int red, int green, int blue)
// {
//     #ifdef COMMON_ANODE
//     red = 255 - red;
//     green = 255 - green;
//     blue = 255 - blue;
//     #endif
//
//     analogWrite(redPin, red);
//     analogWrite(greenPin, green);
//     analogWrite(bluePin, blue);
// }
