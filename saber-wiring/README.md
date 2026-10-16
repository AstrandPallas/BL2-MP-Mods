# Mom's saber wiring (MoM hilt, Proffieboard V3.9)

The diagram below comes from [Fredrik Hubbe's Proffieboard V3 configurator](https://fredrik.hubbe.net/lightsaber/v6/configurator.html). That page builds its diagram in JavaScript after you choose options, so `generate.js` loads it in headless Chromium, sets the form from `variants.json`, and saves what it draws. The pad tables are read from the configurator's own routing data, so they match the picture.

The configurator doesn't know about the Shtok rotary connector or the MoM helper board, so those sections come from Shtok's manuals, linked below.

## Parts for Mom's saber

| Part | What it does in this build |
| --- | --- |
| MoM hilt | The hilt |
| BRrogers crystal chamber | Lit by 2–4 LEDs cut from the WS2812 mini strip |
| MoM FX helper board V2 | Sits in the control box. Carries the two buttons (side-push switches pressed by the box buttons) and two small LEDs. See "MoM FX helper board V2" below |
| Proffieboard V3.9 + SD card | Sound board. The diagram photo is a V3.7; the configurator covers the V3 family |
| FSC-BT909 Bluetooth module | Bluetooth, on the board's RX/TX pads |
| 28 mm 4 Ω 3 W bass speaker | SPKR+ / SPKR− |
| 18650 3120 mAh protected cell (1 of the 2) | Battery. Protected cells are a few mm longer than unprotected ones, so check it fits between the spring contacts |
| Spring battery contacts | Hold the battery; it comes out to charge |
| 2 A charger | External, shared. There's no charge port or kill switch in this build |
| Shtok Rotary NeoPixel & 2 Button PCB connector set (1 set) | Joins the removable chassis to the hilt. Carries power, blade data, connector-LED data and both buttons |
| Shtok NPXL V4 hilt-side connector + 1" holder | Where the blade plugs in. Has 16 LEDs of its own that light the hero blade plug |
| 330 Ω resistor | In series on the **crystal chamber** data wire |
| WS2812 mini strip (cut 2–4 LEDs off) | Crystal chamber light |
| 4-pin SMT pogo connector | Not placed yet (see "Still to confirm") |
| Saberbay 1" thin-walled 36" neopixel blade | Main blade, 130 LEDs (Saberbay's formula: 36 ÷ 40 × 144 ≈ 130) |
| Aluminum hero NeoPixel blade plug + 4× 2 mm magnets | Goes in the blade holder when the blade is out. Lit by the NPXL's 16 LEDs |
| 2 small tactile switches (in the parts photo) | Probably spares, since the helper board has its own two switches. If you use them, wire two **diagonally opposite** legs; legs on the same side can be joined inside |
| 3-pin slide switch (in the parts photo) | Not in the wiring yet. Could be a kill switch (see "Still to confirm") |
| Small round board marked BLADE, with 5 LEDs (in the parts photo) | Shtok NPXL blade-side connector board, LED version (5 built-in SK6812 pixels). Most likely the light inside the hero blade plug. It touches the NPXL pins and runs off blade data, so it doesn't need any wires |
| 4 loose gold pins (in the parts photo) | Pogo pins, probably the rest of the rotary set's 12 pins for the CHC_M board |
| Silicone wire assortment (in the parts photo) | Shtok's diagrams use 24 AWG (or thicker, 20–22 AWG) for + and − to the blade, and 28–34 AWG for data and button wires |

## Configurator settings

| Configurator field | Setting |
| --- | --- |
| Blade 1 | **Illuminated PCB**, 130 LEDs, RGBW off, ZigZag off, Blade Detect **off** |
| Button 1 / Button 2 / Button 3 | Momentary / Momentary / None |
| Display | None |
| Charge Port | **off** |
| Blade 2 | None |
| Bluetooth | FSC-BT909 |
| Kill switch | off |
| Blade 3 | Neopixel crystal chamber, 4 LEDs |
| IR receiver, Reverse orientation | off |

"Illuminated PCB" is the configurator's option for a lit pogo connector like the NPXL V4. The board it draws has the same + / − / D1 / D2 / BD pads.

## Wiring diagram

![Mom's wiring diagram](out/mom/diagram.png)

## Wire list: Proffieboard pads

| Proffieboard pad | Goes to | Notes |
| --- | --- | --- |
| **BATT+** | Battery +, NPXL **+**, crystal chamber **+** | Thick wire for the battery and blade |
| **BATT−** | Battery −, one leg of **both** buttons, BT909 **GND** | Buttons switch to ground |
| **LED2 + LED3** (bridged together) | NPXL **−** | Blade and connector-LED negative. Thick wire |
| **LED1** | Crystal chamber **−** | |
| **Data1** | NPXL **D1** (blade data) | Data1 has a 470 Ω resistor built in, so no extra resistor |
| **Data2** | NPXL **D2** (the connector's 16 LEDs) | The NPXL has its own 330 Ω (R2) on D2 |
| **Data3** | **330 Ω resistor** → crystal chamber **data in** | Data2–4 have no built-in resistor. The configurator labels it 470 Ω; your 330 Ω does the same job |
| **BT1** (Button1) | Power button, other leg | |
| **BT2** (Button2) | Aux button, other leg | |
| **RX** | BT909 **TX** | TX and RX cross over |
| **TX** | BT909 **RX** | |
| **SDVDD** | BT909 **+ / VCC** | Switched 3.3 V |
| **SPKR+ / SPKR−** | Speaker | |

On the crystal strip, use the end whose arrows point away from the wire (DIN), and connect the strip's 5V/+, DIN and GND/− pads.

## Shtok NPXL V4 hilt-side connector

From Shtok's [NPXL V4 manual](https://drive.google.com/file/d/1S0gRH6mnw8OvC6XNEBnWZGeY1ES1nhG6/view), the hilt-side board has these pads:

| NPXL pad | Wire to |
| --- | --- |
| **+** (positive pads) | BATT+ |
| **−** (negative pads) | LED2 + LED3 |
| **D1** | Data1 (blade) |
| **D2** | Data2 (the 16 on-board LEDs) |
| **BD** | Not used. Blade detect is off (see below) |

This is the manual's **Option 4**: blade and connector LEDs on separate data wires, which is also what the configurator draws. **Option 4 needs resistor R1 removed.** R1 is the tiny resistor next to D2, labeled R1 in the diagram. If R1 is still fitted, D1 and D2 are tied together through it, and two data outputs end up fighting each other. Leave R2 in place.

## Shtok rotary connector (Rotary NeoPixel & 2 Button set)

This is a pass-through. Every ring on the female board (CHC_F) touches the same-named pins on the male board (CHC_M), in any rotation. Following Shtok's [Proffieboard diagram](https://cdn.shopify.com/s/files/1/0262/5368/8868/products/image_90123a68-bfdd-4d91-a77c-03377dd314f2.png), the **pogo-pin board (CHC_M)** goes on the chassis side with the Proffieboard. The **ring board (CHC_F)** goes on the side with the buttons and the NPXL connector.

| Pad (same on both boards) | Chassis side: from the Proffieboard | Hilt side: to |
| --- | --- | --- |
| **+** | BATT+ | NPXL + |
| **−** | LED2 + LED3 | NPXL − |
| **Data** | Data1 | NPXL D1 |
| **ID** | Data2 | NPXL D2 (repurposed; see below) |
| **B1** | BT1 | Power button |
| **B2** | BT2 | Aux button |
| **GND** | BATT− | Other leg of both buttons |

This set has one data contact plus an **ID** contact. The blade and the connector LEDs need two data wires, so this wiring carries the connector-LED data (D2) on ID. That leaves no contact for the NPXL's blade-detect (BD) pin, which is why Blade Detect is off.

If the buttons don't actually pass through the rotary connector in the MoM hilt, B1 and B2 are free. You could then turn Blade Detect on and run BD to the Free1 pad.

## MoM FX helper board V2

The helper board sits in the control box behind the decorative reveal card. The control-box buttons press its two side-mounted switches, per BRrogers's [assembly thread](https://www.therpf.com/forums/threads/fx-reveal-board-assembly-for-fx-mom-cave-hero.339167). I couldn't find a wiring guide for it, so this mapping comes from its printed labels. Run the checks below before soldering.

| Helper board pad | Proffieboard pad | How sure |
| --- | --- | --- |
| **SW1+** | BT1 (power button) | Likely. Signal side of switch SW1 |
| **SW2+** | BT2 (aux button) | Likely |
| **GND** | BATT− | Likely. Common for both switches |
| **BATT+** | Battery + | Likely |
| **BRD+** | BATT+ | Run check 2 |
| **LED1−** | LED4 | Run check 3. Negative of the board's LED1 |
| **LED2−** | LED5 | Run check 3 |
| **DATA1 / DATA2** | A free data pad (Data4 or Free1–3) | Run check 4 |

If the helper board is on the far side of the rotary connector, SW1+, SW2+ and GND go through its B1, B2 and GND rings.

Checks, using a multimeter in continuity (beep) mode with nothing connected:

1. **Buttons:** hold the top switch. **SW1+ ↔ GND** should beep only while it's pressed. Do the same with the second switch and **SW2+**.
2. **Power:** test **BATT+ ↔ BRD+**.
   - If it beeps, they're joined, probably through F1 as a fuse. Run battery + to BATT+, and BRD+ to the Proffieboard's BATT+.
   - If it doesn't beep, see whether BATT+ and BRD+ each beep to one of the three big **U$2** pads. If they do, U$2 is probably where the 3-pin slide switch (kill switch) goes.
3. **LEDs:** **LED1−** should beep to a pad of the white part marked LED1. **LED2−** should do the same with LED2.
4. **Data:** test **DATA1** and **DATA2** against the LED1 and LED2 parts, either directly or through R1 and R2. If they connect, the two LEDs are addressable side-view pixels and each needs a data wire. The small capacitors beside each LED suggest that's the case.

Once the checks are done, LED1 and LED2 get added to the config as two more blades. That means two more styles in every preset.

## Still to confirm

- **Helper board V2:** the four checks above.
- **Bluetooth board:** your BT909 is on a breakout with all its pins at one end, so it won't look like the bare module in the diagram. Match by the printed labels: GND → BATT−, VCC/3V3 → SDVDD, TX → RX, RX → TX. Leave any extra pins (STATE, EN, KEY) unconnected. If the power pin says **5V or VIN** instead of 3.3 V, check before wiring it.
- **Slide switch:** if it's going in as a kill switch, the configurator wires battery + to an end pin and the middle pin to BATT+, leaving the third pin unused. Wired that way, the whole blade current goes through the switch, and a full-white blade can draw more than a small slide switch is rated for. Hubbe's [V3 page](https://fredrik.hubbe.net/lightsaber/v6/) shows a low-current alternative: cut the BATT−/GND bridge and switch only the board.
- **4-pin SMT pogo connector:** if this makes the crystal chamber removable, three of its pins would carry crystal +, − and data, with one spare. Tell me where it goes and I'll add it.

## Config (`out/mom/config.h`)

```cpp
#define NUM_BLADES 4
#define NUM_BUTTONS 2
#define SHARED_POWER_PINS
#define ENABLE_SERIAL      // Bluetooth
...
WS281XBladePtr<130, bladePin, Color8::GRB, PowerPINS<bladePowerPin2, bladePowerPin3> >(),                                   // main blade
SubBladeWithStride(0, 15, 2, WS281XBladePtr<16, blade2Pin, Color8::GRB, PowerPINS<bladePowerPin2, bladePowerPin3> >()),  // NPXL LEDs, half 1
SubBladeWithStride(1, 15, 2, NULL),                                                                                         // NPXL LEDs, half 2
WS281XBladePtr<4, blade3Pin, Color8::GRB, PowerPINS<bladePowerPin1> >()                                                     // crystal chamber
```

- Change the `4` in the crystal chamber line to the number of LEDs you actually cut (2, 3 or 4).
- The presets use the configurator's example font folders (`TeensySF`, `SmthJedi`, …). Replace them with the font folders on the SD card.

## Regenerating

Edit `variants.json`. The `form` keys are the configurator's form field ids. Then run:

```sh
npm i playwright && npx playwright install chromium   # once
node generate.js                                        # writes out/<variant>/
```

Each `out/<variant>/` folder contains `diagram.png`, `config.h`, `wires.md` (readable wire list) and `wires.json`.
