#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>

#define FIREBASE_HOST "test-50531.firebaseio.com"
#define FIREBASE_AUTH "m74FpxeBCMqS8RoJe4ypglib1rjiQ60B2pg8TVzJ"

#define WIFI_SSID "AndroidAp"
#define WIFI_PASS "12345678"


int greenPin = 4;
int redPin = 5;
int bluePin = 16;

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


void setup() {
    Serial.begin(9600);

    connectWifi();
    // setupFirebase();
    //
    // pinMode(redPin, OUTPUT);
    // pinMode(greenPin, OUTPUT);
    // pinMode(bluePin, OUTPUT);
}

void loop() {
    getDataFirebanse();
}


void getDataFirebanse(){
  String path = "led";

  FirebaseObject object = Firebase.get(path);

  int red = object.getInt("red");
  int green = object.getInt("green");
  int blue = object.getInt("blue");
  setColor(red,green,blue);
}

void setColor(int red, int green, int blue)
{
    #ifdef COMMON_ANODE
    red = 255 - red;
    green = 255 - green;
    blue = 255 - blue;
    #endif

    analogWrite(redPin, red);
    analogWrite(greenPin, green);
    analogWrite(bluePin, blue);
}



/*
  Blink
  Turns on an LED on for one second, then off for one second, repeatedly.

  Most Arduinos have an on-board LED you can control. On the UNO, MEGA and ZERO
  it is attached to digital pin 13, on MKR1000 on pin 6. LED_BUILTIN is set to
  the correct LED pin independent of which board is used.
  If you want to know what pin the on-board LED is connected to on your Arduino model, check
  the Technical Specs of your board  at https://www.arduino.cc/en/Main/Products

  This example code is in the public domain.

  modified 8 May 2014
  by Scott Fitzgerald

  modified 2 Sep 2016
  by Arturo Guadalupi

  modified 8 Sep 2016
  by Colby Newman¨¨
*/


// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);                       // wait for a second
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);                       // wait for a second
}
