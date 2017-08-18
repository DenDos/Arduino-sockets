
int current_pot = 0;
int prev_pot = 0;
int pot_range = 2;

bool need_updatePot() {
  return (current_pot > prev_pot + pot_range || current_pot < prev_pot - pot_range) && current_pot != prev_pot;
}

void send_pot_to_server(int pot) {
  String pot_string = String(pot);
  String responseBodyString = "{"
        "\"pot\":\"" + pot_string + "\","
        "\"timeEpoch\":1480823123"
       "}";
	http.post("/api/test1", responseBodyString);
}

void handle_pot() {
  current_pot = analogRead(PONT) / 4;
  if  (need_updatePot()) {
    send_pot_to_server(current_pot);
    prev_pot = current_pot; 
  }
  delay(10);
}