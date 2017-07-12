#include <ESP8266WiFi.h>
#include "http.h"
#include <string>
const char* ssid     = "Komandir";
const char* password = "151151488";
char* host = "192.168.0.101";

Http http(host);

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

void setup() {

  Serial.begin(9600);
	wifi_connect();

	// String valueStart = "{\"value\": ";
  // String data = "123123123";
  // String value = "}";
  // String test = valueStart + data + value;
  int a = 123;
  String status = String(a);
  String responseBodyString = "{"
        "\"status\":\"" + status + "\","
        "\"version\":\"1.0\","
        "\"timeEpoch\":1480823123"
       "}";
	http.post("/api/test1", responseBodyString);
}



void loop()
{
}