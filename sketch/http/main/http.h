/*
  Http.h - Library for flashing Http code.
  Created by David A. Mellis, November 2, 2007.
  Released into the public domain.
*/
#ifndef Http_h
#define Http_h

#include "Arduino.h"

class Http
{
  public:
    Http(char* host);
    void post(String path, String data);
    void get(String path, String data);
    String get_link(String path);
  private:
    char* _host;
};

#endif