// #include <FirebaseArduino.h>

// Constants
#define FIREBASE_HOST "test-50531.firebaseio.com"
#define FIREBASE_AUTH "m74FpxeBCMqS8RoJe4ypglib1rjiQ60B2pg8TVzJ"


void setupFirebase() {
  Firebase.begin(FIREBASE_HOST);
  Serial.println();
  Serial.println("Firebase host: ");
  Serial.println(FIREBASE_HOST);
}


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
