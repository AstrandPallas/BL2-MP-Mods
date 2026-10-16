# Proffieboard V3 - 130 LED Neopixel blade (Shtok connector), 2 momentary buttons, charge port

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
- `ble`: `none`
- `kill_switch`: `false`
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
| Battery + | BATT+ pad (battery positive in) |
| Charge port - | Battery - |
| Charge port BATT- | BATT- pad (battery negative in) |
| Charge port BATT+ | BATT+ pad (battery positive in) |
| Main blade (neopixel) + | BATT+ pad (battery positive in) |
| Main blade (neopixel) data | Data1 pad (bladePin) |
| Power button 1 | Button1 pad (powerButtonPin) |
| Power button 2 | BATT- pad (battery negative in) |
| Aux button 1 | Button2 pad (auxPin) |
| Aux button 2 | BATT- pad (battery negative in) |
