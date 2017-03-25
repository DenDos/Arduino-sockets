#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define OLED_RESET 4
Adafruit_SSD1306 display(OLED_RESET);
э
#define NUMFLAKES 10
#define XPOS 0
#define YPOS 1
#define DELTAY 2


#define LOGO16_GLCD_HEIGHT 16
#define LOGO16_GLCD_WIDTH  16

void setup()   {
  Serial.begin(9600);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);  // initialize with the I2C addr 0x3C (for the 128x32)
  delay(2000);
  display.clearDisplay();
  getFBItopSecretMessage();
  delay(2000);

}

void loop() {

}

void getFBItopSecretMessage() {
  display.setTextSize(2);
  display.setTextColor(WHITE);
  display.setCursor(50,0);
  display.println("FBI");
  display.setTextSize(1);
  display.setCursor(35,20);
  display.println("Top Secret!");
  display.display();
}
