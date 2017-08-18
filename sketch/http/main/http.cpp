#include "Arduino.h"
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include "Http.h"


HTTPClient client;    //Declare object of class HTTPClient
String _port = "3000";

Http::Http(char* host)
{
  _host = host;
}

String Http::get_link(String path) {
  String host(_host);
  return "http://" + host + ":" + _port + path;
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

  String link = get_link(path);
  
  client.begin(link);      //Specify request destination
  client.addHeader("Content-Type", "application/json");  //Specify content-type header

  int httpCode = client.POST(data);   //Send the request
  String payload = client.getString();                  //Get the response payload

  Serial.println(httpCode);   //Print HTTP return code
  Serial.println(payload);    //Print request response payload

  client.end();  //Close connection





  // Serial.print("connecting to ");
  // Serial.println(_host);

  // // // Use WiFiClient class to create TCP connections
  // WiFiClient client;
  // const int httpPort = 3000;
  // if (!client.connect(_host, httpPort)) {
  //   Serial.println("connection failed");
  //   return;
  // }

  // String pubStringLength = String(data.length(), DEC);
  // // We now create a URI for the request
  // Serial.print("Requesting POST: ");
  // // // Send request to the server:
  
  // client.print("POST ");
  // client.print(path);
  // client.print(" HTTP/1.1");
  // client.println();

  // client.print("Host: ");
  // client.print(_host);
  // client.println();

  // client.println("Content-Type: application/json");
  // client.println("Connection: close");
  // client.print("Content-Length: ");
  // client.println(pubStringLength);
  // client.println();
  // client.print(data);
  // client.println();
  delay(500); // Can be changed
  
  // // Read all the lines of the reply from server and print them to Serial
  // while (client.available()) {
  //   String line = client.readStringUntil('\r');
  //   if (line == "\r") Serial.print('empty line');
  // }
}