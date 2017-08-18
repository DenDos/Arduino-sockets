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
  Serial.print("connecting to ");
  Serial.println(_host);

  String link = get_link(path);

  client.begin(link);      //Specify request destination
  client.addHeader("Content-Type", "application/json");  //Specify content-type header

  int httpCode = client.GET(data);   //Send the request
  String payload = client.getString();                  //Get the response payload

  Serial.println(httpCode);   //Print HTTP return code
  Serial.println(payload);    //Print request response payload

  client.end();  //Close connection
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

  client.end();  //Close connection
  
}