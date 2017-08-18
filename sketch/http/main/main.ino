#include <ESP8266WiFi.h>
#include "http.h"
#include <string>

#define PONT    A0        // Led in NodeMCU at pin GPIO16 (D0).

const char* ssid     = "mesto5";
const char* password = "mediumwell";
char* host = "192.168.254.192";

Http http(host);

void setup() {
  Serial.begin(9600);
  wifi_connect();
  
  pinMode(PONT, INPUT);
}

void loop() {
  handle_pot();
}