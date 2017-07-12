#include "Arduino.h"
#include <ESP8266WiFi.h>
#include "Http.h"

Http::Http(char* host)
{
  _host = host;
}

void Http::get(String path)
{
  WiFiClient client;
  int state_pos;
  const int httpPort = 3000;
  if (!client.connect(_host, httpPort)) {
    Serial.println("connection failed");
    return;
  }
  Serial.print("Requesting GET: ");

  client.print("GET ");
  client.print(path);
  client.print(" HTTP/1.1");
  client.println();

  client.print("Host: ");
  client.print(_host);
  client.println();

  client.print("X-ApiKey: YOURAPIKEY\r\n");
  client.println("Connection: close");
  client.println();
  delay(500);
  while (client.available()) {
    String line = client.readStringUntil('\r');
    state_pos = line.indexOf("state");
  }
  Serial.println();
  Serial.println("closing connection");
}


void Http::post(String path, String data)
{
  Serial.print("connecting to ");
  Serial.println(_host);

  // // Use WiFiClient class to create TCP connections
  WiFiClient client;
  const int httpPort = 3000;
  if (!client.connect(_host, httpPort)) {
    Serial.println("connection failed");
    return;
  }

  String pubStringLength = String(data.length(), DEC);
  // We now create a URI for the request
  Serial.print("Requesting POST: ");
  // // Send request to the server:
  
  client.print("POST ");
  client.print(path);
  client.print(" HTTP/1.1");
  client.println();

  client.print("Host: ");
  client.print(_host);
  client.println();

  client.println("Content-Type: application/json");
  client.println("Connection: close");
  client.print("Content-Length: ");
  client.println(pubStringLength);
  client.println();
  client.print(data);
  client.println();
  delay(500); // Can be changed
  
  // // Read all the lines of the reply from server and print them to Serial
  while (client.available()) {
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }
}