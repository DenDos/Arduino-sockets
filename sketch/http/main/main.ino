#include <ESP8266WiFi.h>
#include "http.h"
#include <string>

const char* ssid     = "mesto5";
const char* password = "mediumwell";
char* host = "192.168.254.192";

#define PONT    A0        // Led in NodeMCU at pin GPIO16 (D0).

int current_pot = 0;
int prev_pot = 0;
int pot_range = 2;

Http http(host);

bool need_updatePot() {
  return (current_pot > prev_pot + pot_range || current_pot < prev_pot - pot_range) && current_pot != prev_pot;
}

void wifi_connect() {
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP()); // This is your NodeMCU IP address. Could be handy for other projects
}

void send_pot_to_server(int pot) {
  String pot_string = String(pot);
  String responseBodyString = "{"
        "\"pot\":\"" + pot_string + "\","
        "\"timeEpoch\":1480823123"
       "}";
	http.post("/api/test1", responseBodyString);
}

void setup() {

  Serial.begin(9600);
	wifi_connect();
  pinMode(PONT, INPUT);
}

void loop() {
  current_pot = analogRead(PONT) / 4;
  if  (need_updatePot()) {
    send_pot_to_server(current_pot);
    prev_pot = current_pot; 
  }
  delay(10);
}