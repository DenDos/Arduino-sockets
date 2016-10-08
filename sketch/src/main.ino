#include <Servo.h>
#include <Arduino.h>

// My files
#include "defines.h"
// #include "myFunc.h"

Servo myservo;
int pos = 0;
int incomingByte = 1000;

void setup() {
 pinMode(LED_PIN, OUTPUT);
 pinMode(POT_PIN, INPUT);
 myservo.attach(SERVO_PIN);
 Serial.begin(9600);
}

void loop() {
 int y=0;
 Serial.print("POT VALUE : ");
 y = map(analogRead(POT_PIN), 713, 1023, 0, 180);

 Serial.println(y, DEC);
 myservo.write(y);
 delay(15);

 // if (Serial.available() > 0) { //если есть доступные данные
 // // считываем байт
 // incomingByte = Serial.parseInt();
 // // отсылаем то, что получили
 // Serial.print("Set servo on : ");
 // Serial.println(incomingByte, DEC);
 // myservo.writeMicroseconds(incomingByte);
 // }

 // digitalWrite(13, HIGH); // turn the LED on (HIGH is the voltage level)
 // delay(1000); // wait for a second
 // digitalWrite(13, LOW); // turn the LED off by making the voltage LOW
 // delay(1000);

 // for(pos = 1000; pos < 2000; pos += 100) // от 0 до 180 градусов
 // { // с шагом в 1 градус
 // myservo.writeMicroseconds(pos); //
 // delay(500); // ждём 15ms пока серва займёт новое положение
 // }
 // for(pos = 2000; pos>=1000; pos-=100) // от 180 до 0 градусов
 // {
 // myservo.writeMicroseconds(pos);
 // delay(500);
 // }
}
