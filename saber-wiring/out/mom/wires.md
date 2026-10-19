# MoM saber - Proffieboard V3.9, NPXL V4 lit connector, 130 LED blade, 16 LED crystal chamber, 2 buttons, BT909

Generated from https://fredrik.hubbe.net/lightsaber/v6/configurator.html

Form settings:

- `blade1`: `lit_pogo`
- `blade1_lit_pogo_leds`: `130`
- `blade1_lit_pogo_rgbw`: `false`
- `blade1_lit_pogo_zz`: `false`
- `blade1_lit_pogo_bd`: `false`
- `button1`: `click`
- `display`: `none`
- `rcp`: `false`
- `blade2`: `none`
- `button2`: `click`
- `ble`: `bt909`
- `kill_switch`: `false`
- `blade3`: `ws2811`
- `blade3_ws2811_leds`: `16`
- `blade3_ws2811_rgbw`: `false`
- `button3`: `none`
- `ir`: `false`
- `reverse_orientation`: `false`


| From | To |
| --- | --- |
| LED2 pad (bladePowerPin2) | LED3 pad (bladePowerPin3) |
| Main blade connector - | LED2 pad (bladePowerPin2) |
| Main blade connector - | LED3 pad (bladePowerPin3) |
| Speaker + | SPKR+ pad |
| Speaker - | SPKR- pad |
| Battery + | BATT+ pad (battery positive in) |
| Battery - | BATT- pad (battery negative in) |
| Main blade connector + | BATT+ pad (battery positive in) |
| Main blade connector data | Data1 pad (bladePin) |
| Main blade connector d2 | Data2 pad (blade2Pin) |
| Crystal chamber (neopixel) + | BATT+ pad (battery positive in) |
| Crystal chamber (neopixel) data | Data3 pad (blade3Pin) |
| Crystal chamber (neopixel) - | LED1 pad (bladePowerPin1) |
| Power button 1 | Button1 pad (powerButtonPin) |
| Power button 2 | BATT- pad (battery negative in) |
| Aux button 1 | Button2 pad (auxPin) |
| Aux button 2 | BATT- pad (battery negative in) |
| Bluetooth module GND | BATT- pad (battery negative in) |
| Bluetooth module TX | RX pad (blade8Pin) |
| Bluetooth module RX | TX pad (blade9Pin) |
| Bluetooth module + | SDVDD pad (switched 3.3V) |
