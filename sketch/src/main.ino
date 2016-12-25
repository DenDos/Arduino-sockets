/*
 Chat Server

 A simple server that distributes any incoming messages to all
 connected clients.  To use, telnet to your device's IP address and type.
 You can see the client's input in the serial monitor as well.
 Using an Arduino Wiznet Ethernet shield.

 Circuit:
 * Ethernet shield attached to pins 10, 11, 12, 13

 created 18 Dec 2009
 by David A. Mellis
 modified 9 Apr 2012
 by Tom Igoe

 */

#include <SPI.h>
#include <Ethernet.h>

// Enter a MAC address and IP address for your controller below.
// The IP address will be dependent on your local network.
// gateway and subnet are optional:
byte mac[] = {
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};
IPAddress ip(192, 168, 0, 107);
IPAddress myDns(192,168,0, 1);
IPAddress gateway(192, 168, 0, 1);
IPAddress subnet(255, 255, 254, 0);

#define pot A0
int prev = 0;
int current = 0;
String string;
char cstr[16];
String str;


// telnet defaults to port 23
EthernetServer server(1337);
boolean alreadyConnected = false; // whether or not the client was connected previously
void setup() {

  pinMode(pot, INPUT);
  // initialize the ethernet device
  Ethernet.begin(mac, ip, myDns, gateway, subnet);
  // start listening for clients
  server.begin();
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }


  Serial.print("Chat server address:");
  Serial.println(Ethernet.localIP());
}

void loop() {
  current = map(analogRead(pot), 0, 1024, 0, 100);

  // wait for a new client:
  EthernetClient client = server.available();

  if (alreadyConnected) {
    if (current != prev) {
      prev = current;
      server.print(current);
      // Serial.println(current);
    }
  }

  // when the client sends the first byte, say hello:
  if (client) {
    if (!alreadyConnected) {
      // clear out the input buffer:
      client.flush();
      Serial.println("We have a new client");
      client.println("Hello, client!");
      alreadyConnected = true;
    }

    if (client.available() > 0) {
      // read the bytes incoming from the client:
      char thisChar = client.read();
      // echo the bytes back to the client:
      // server.write("MESSAGE||");
      // echo the bytes to the server as well:
      // Serial.write(thisChar);
    }
  }
}
