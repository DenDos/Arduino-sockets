// #include <ESP8266WiFi.h>


// #include "CayenneWiFiClient.h"
#include <CayenneMQTTESP8266.h>
// #include <CayenneWiFi.h>

#define CAYENE_DEBUG
#define CAYENE_PRINT Serial

char ssid[] = "mesto5";
char password[] = "mediumwell";

char username[] = "0dc15960-34f0-11e7-8bd2-af7268e693eb";
char mqtt_pass[] = "909f31f3020866622d2c6d39e01ea2175c4f610e";
char client_id[] = "7188de00-34f0-11e7-954c-2d919f264eb4";
long previousMillis = 0;
long interval = 1000;
#define LED     D0        // Led in NodeMCU at pin GPIO16 (D0).
#define PONT    A0        // Led in NodeMCU at pin GPIO16 (D0).

char token[] = "74ytaov8jz";
// Your network name and password.
// char ssid[] = "NetworkSSID";
// char password[] = "NetworkPassword";

// void setup()
// {
// 	// Serial.begin(9600);
// 	// Cayenne.begin(token, ssid, password);

// 	Serial.begin(9600);
// 	Cayenne.begin(username, mqtt_pass, client_id, ssid, password);
// 	// Cayenne.begin(token, ssid, password);
//   // Cayenne.begin(username, mqtt_pass, client_id, ssid, password);
//   pinMode(LED, OUTPUT);
//   pinMode(PONT, INPUT);
// }

// void loop()
// {
// 	// Cayenne.run();
// 	Cayenne.loop();
// }

void setup() {
  Serial.begin(9600);
  Cayenne.begin(username, mqtt_pass, client_id, ssid, password);
  pinMode(LED, OUTPUT);
  pinMode(PONT, INPUT);
}

void loop() {
  int x;
  x = analogRead(PONT) / 4;
  

  Cayenne.loop();
  // if (millis() - previousMillis > interval) {
    Serial.println("PONT: ");
    Serial.println(x);
    Cayenne.virtualWrite(1, x, TYPE_TEMPERATURE, UNIT_FAHRENHEIT);
  // }
  // digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  // delay(1000);                       // wait for a second
  // digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  // delay(1000);                       // wait for a second
}

CAYENNE_IN(0) {
  digitalWrite(LED, !getValue.asInt());
}