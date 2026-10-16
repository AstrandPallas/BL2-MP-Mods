# Same as above, plus kill switch and FSC-BT909 Bluetooth module

Generated from https://fredrik.hubbe.net/lightsaber/v6/configurator.html

Form settings:

- `blade1`: `ws2811`
- `blade1_ws2811_leds`: `130`
- `blade1_ws2811_rgbw`: `false`
- `blade1_ws2811_zz`: `false`
- `button1`: `click`
- `display`: `none`
- `rcp`: `true`
- `blade2`: `none`
- `button2`: `click`
- `ble`: `bt909`
- `kill_switch`: `true`
- `blade3`: `none`
- `button3`: `none`
- `ir`: `false`
- `reverse_orientation`: `false`


| From | To |
| --- | --- |
| LED2 pad (bladePowerPin2) | LED3 pad (bladePowerPin3) |
| Main blade (neopixel) - | LED2 pad (bladePowerPin2) |
| Main blade (neopixel) - | LED3 pad (bladePowerPin3) |
| Speaker + | SPKR+ pad |
| Speaker - | SPKR- pad |
| Kill switch 1 | Battery + |
| Kill switch 2 | BATT+ pad (battery positive in) |
| Charge port - | BATT- pad (battery negative in) |
| Battery - | BATT- pad (battery negative in) |
| Charge port BATT+ | BATT+ pad (battery positive in) |
| Main blade (neopixel) + | BATT+ pad (battery positive in) |
| Main blade (neopixel) data | Data1 pad (bladePin) |
| Power button 1 | Button1 pad (powerButtonPin) |
| Power button 2 | BATT- pad (battery negative in) |
| Aux button 1 | Button2 pad (auxPin) |
| Aux button 2 | BATT- pad (battery negative in) |
| Bluetooth module GND | BATT- pad (battery negative in) |
| Bluetooth module TX | RX pad (blade8Pin) |
| Bluetooth module RX | TX pad (blade9Pin) |
| Bluetooth module + | SDVDD pad (switched 3.3V) |
