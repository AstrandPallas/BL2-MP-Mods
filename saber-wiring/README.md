# MoM saber wiring (Proffieboard V3.9)

The diagram below comes from [Fredrik Hubbe's Proffieboard V3 configurator](https://fredrik.hubbe.net/lightsaber/v6/configurator.html). That page builds its diagram in JavaScript after you choose options, so `generate.js` loads it in headless Chromium, sets the form from `variants.json`, and saves what it draws. The pad tables are read from the configurator's own routing data, so they match the picture.

The configurator doesn't know about the Shtok rotary connector or the MoM helper board, so those sections come from Shtok's manuals, linked below.

## Parts for the MoM saber

| Part | What it does in this build |
| --- | --- |
| MoM hilt | The hilt |
| BRrogers crystal chamber | Lit by 2–4 LEDs cut from the WS2812 mini strip |
| MoM FX helper board (Veracity calls it v4.1) | Sits in the control box behind the green reveal board. Carries the two buttons (side-push switches pressed by the box buttons) and two plain LEDs. See "MoM FX helper board" below |
| Proffieboard V3.9 + SD card | Sound board. Yours is made by Tritium Sabers and printed "PB V3.9"; Hubbe's [V3 page](https://fredrik.hubbe.net/lightsaber/v6/) lists Tritium as a V3.9 maker. The diagram photo is a V3.7, and the configurator covers the whole V3 family (`proffieboard_v3_config.h`) |
| FSC-BT909 Bluetooth module (KR Sabers carrier board) | Bluetooth: 4 thin wires to SDVDD, GND, TX and RX. See "Bluetooth board" below |
| 28 mm 4 Ω 3 W bass speaker | SPKR+ / SPKR− |
| 18650 3120 mAh protected cell (1 of the 2) | Battery. Protected cells are a few mm longer than unprotected ones, so check it fits between the spring contacts |
| Spring battery contacts | Hold the battery; it comes out to charge |
| 2 A charger | External, shared with the Obi-Wan. There's no charge port in this build |
| Shtok Rotary NeoPixel & 2 Button PCB connector set (1 set) | Joins the removable chassis to the hilt. Carries power, blade data, connector-LED data and both buttons |
| Shtok NPXL V4 hilt-side connector + 1" holder | Where the blade plugs in. Has 16 LEDs of its own |
| 330 Ω 0603 resistor (surface-mount chip marked "331", on a paper strip; 0603 is 1.6 × 0.8 mm) | In series on the **crystal chamber** data wire (Data3). Tin both ends, solder the Data3 wire to one end and the crystal's DIN wire to the other, then cover it with heat shrink |
| WS2812 mini strip (cut 2–4 LEDs off) | Crystal chamber light |
| 4-pin SMT pogo connector | Not placed yet (see "Still to confirm") |
| Saberbay 1" thin-walled 36" neopixel blade | Main blade, 130 LEDs (Saberbay's formula: 36 ÷ 40 × 144 ≈ 130) |
| 1" aluminum hero NeoPixel blade plug + 4× 2 mm magnets | Goes in the blade holder when the blade is out. Saberbay's NeoPixel plugs come with their own blade-side LED board; that's the ring of gold contacts on top of yours. Lit by that board and the NPXL's 16 LEDs |
| Still needed | M3 × 8 mm countersunk screw, PTFE wire (stranded; see "Wiring the Proffieboard"), and the printed chassis (LEDO 6060 resin, from Jawa's Depot) |

## Order split: MoM vs Obi-Wan (Roman Elite Inception)

The Saber Armory order covers both sabers.

| Ordered | MoM | Obi-Wan | Shared or spare |
| --- | --- | --- | --- |
| Proffieboard v3.9 ×2 | 1 | 1 | |
| FSC-BT909 Bluetooth PCB Unit ×2 | 1 | 1 | |
| 28 mm 4 Ω 3 W speaker ×2 | 1 | 1 | |
| Rotary NeoPixel & 2 Button connector set ×2 | 1 | Not on the Obi-Wan list | The second set: the Obi-Wan's if its chassis comes apart, otherwise spare |
| Keeppower 18650 3120 mAh dual pack | 1 cell | | 1 spare cell |
| Keeppower 21700 5000 mAh | | 1 | |
| Spring Battery Contacts Set | ✓ | | |
| Battery Contacts Set (Keystone) | | ✓ | |
| NPXL V4 hilt side, short pins, assembled ×3 (17.5 mm) | 1 | 2 | |
| NPXL V3/V4 hilt-side holder 1" | ✓ | | |
| NPXL blade-side LED board (the round "BLADE" board with 5 LEDs) | | ✓ | Spare if the Obi-Wan's blade arrives with its board installed |
| 330 Ω 0603 SMD resistor ×2 | 1 | 1 | |
| WS2812 2020 mini strip, 10 LEDs | 2–4 LEDs | | The rest |
| KR 128x32 OLED, white | | ✓ | |
| High Amp Kill Switch (silver C&K slide switch, marked 3A 120VAC) | See "Still to confirm" | ✓ | |
| Battery and Speaker PCB Connector Set (20.00 mm per the listing) | | ✓ | |
| Low Profile Red Tactile Switch ×2 | | ✓ | |
| Replacement Pogo Pins, short ×4 (the 4 loose pins) | | | Shared spares. They fit the rotary, battery/speaker and short-pin NPXL boards |
| 2 A charger | | | Shared |

The battery and speaker set you ordered is the one The Saber Armory lists at **20.00 mm** for both boards. The 17.5 mm version is a separately named listing, and **20.5 mm** is the rotary set's size. Measure it to be sure.

Not from this order:
- **MoM:** hilt, crystal chamber, helper board, reveal board, Saberbay blade, hero plug and magnets, 4-pin pogo connector.
- **Obi-Wan:** the Roman Elite Inception hilt (static and vented pommels, blade plug) and its Saberbay blade.
- **Not on either list:** the mini black 3-pin slide switch. It's low-current only and must never go in a blade's power line.

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

![MoM wiring diagram](out/mom/diagram.png)

## Wiring the Proffieboard: thick or thin

![Proffieboard pads marked on the actual board](out/mom/proffie-pads.png)

Use **thick** wire only where the blade's current flows: the battery in and out, and the blade's + and −. Everything else gets **thin** wire. Hubbe's [V3 page](https://fredrik.hubbe.net/lightsaber/v6/) says most pads carry almost no current and can use 30 AWG, but the battery wires carry the combined current of every LED. Shtok's NPXL manual asks for 20–22 AWG on the blade's + and −.

| Proffieboard pad | Wire | Runs to | Notes |
| --- | --- | --- | --- |
| **BATT+** | **Thick** (thin would also do) | Kill-switch return: 4-pin pogo → helper **BRD+** | Only the board's own current flows here (about 1 A at most, at full volume), because the blade takes its + straight from the battery. At the pogo end, lay the wire alongside the pin's leg and solder it there, then heat-shrink it |
| **BATT−** | **Thick** | Battery − | Every LED's current comes back through here |
| **LED2 + LED3** | **Thick** | Blade −: rotary **−** → NPXL **−** | The two pads are next to each other. Strip enough wire to lay across both and solder them together |
| **GND** | Thin | Shared leg of both buttons: rotary **GND** → helper **GND** | GND and BATT− are joined on the board, so any GND or BATT− pad works |
| **GND** | Thin | BT909 **GND** | |
| **Data1** | Thin | Rotary **Data** → NPXL **D1** (blade) | Data1 has a 470 Ω resistor built in, so no extra resistor |
| **Data2** | Thin | Rotary **ID** → NPXL **D2** (connector's 16 LEDs) | The NPXL has its own 330 Ω (R2) on D2 |
| **Data3** | Thin | **330 Ω resistor** → crystal **DIN** | Data2–4 have no built-in resistor. Slide heat shrink over the resistor |
| **LED1** | Thin | Crystal chamber **−** | |
| **BT1** | Thin | Rotary **B1** → helper **SW1+** (power) | |
| **BT2** | Thin | Rotary **B2** → helper **SW2+** (aux) | |
| **RX** | Thin | BT909 **TX** | TX and RX cross over |
| **TX** | Thin | BT909 **RX** | |
| **SDVDD** | Thin | BT909 **+ / VCC** | Switched 3.3 V |
| **SPKR+ / SPKR−** | Thin | Speaker | Under 1 A even at full volume (3 W into 4 Ω) |
| **LED5 / LED6** | Thin | 4-pin pogo → helper **LED1− / LED2−** | The control box's green ▲ and red ▼ lights, per the Jawa's Depot build video |

Three + wires don't go on the Proffieboard at all. Solder them at the **battery's + contact**:

- **Blade +** (thick), to rotary **+** → NPXL **+**. Shtok's rotary diagram feeds the blade + straight from the battery the same way.
- **Crystal +** (thin).
- **Kill-switch feed** (thin), through the 4-pin pogo to the helper's **BATT+**. The switch on the helper then sends it back as BRD+ to the Proffieboard's BATT+ pad.

Keep blade + on the battery side, before the kill switch. Small slide switches like the ones in this order are rated around 3 A or less, and the blade can draw more than that. Wired this way, the switch only carries the board's own current. The blade still goes dark when the switch is off: blade − runs through the board's LED2/LED3 switches, and Hubbe's V3 page notes those have pull-down resistors that turn them off when the board has no power.

**Use stranded wire for the final install, not solid core.** Solid wire is stiff. It pries at the pads, and wires that bend repeatedly (removable chassis, battery swaps, clashes) tend to crack next to the solder joint. Silicone or PTFE stranded wire is the usual choice; Shtok pre-wires its NPXL connectors with PTFE, 22 AWG for + and −. The 22 AWG solid-core box is fine for a bench test. For the four thick wires in the saber, get about 1 m (3 ft) each of red and black 22 AWG stranded.

Colour plan for black, red, white, green, yellow and blue. Each group of wires that ends at the same part has no repeated colour, except the thick and thin black at the rotary connector, which you can tell apart by size. Flag each wire's far end with masking tape anyway.

| Ends at | Wires (Proffieboard pad → colour) |
| --- | --- |
| Rotary connector (chassis side) | blade + **red thick** (from the battery + contact), LED2+LED3 **black thick**, GND (pad 5) black thin, Data1 white, Data2 yellow, BT1 green, BT2 blue |
| 4-pin pogo connector (chassis side) | BATT+ red (kill-switch return), kill-switch feed white (from the battery + contact), LED5 green (green light), LED6 yellow (red light) |
| Battery contacts | + : blade + **red thick**, crystal + red, kill-switch feed white. − : BATT− **black thick** |
| Bluetooth board | SDVDD red, GND black, TX yellow, RX blue |
| Crystal chamber | crystal + red (from the battery + contact), LED1 black, Data3 white (through the 330 Ω) |
| Speaker | SPKR+ and SPKR− both green. Polarity doesn't matter with one speaker |

Tips for long wires you'll trim later:

- **Length:** the chassis-side wires only need to reach the end of the chassis, where the rotary ring board (CHC_F) and the 4-pin pogo sit, not the emitter. The hilt side gets its own short wires from the pin board (CHC_M) and the other pogo half. Cut each wire to reach the far end of the chassis plus about 5 cm (2"). If you can't measure yet, 20 cm (8") each is plenty.
- **Bench test first:** with the wires long, you can hook up the battery, speaker, buttons and blade connector on the bench, flash the config and test everything before trimming anything.
- Use red and black for the thick + and − wires.
- Give each thin wire a different colour and write down which colour is on which pad. Once the wires are trimmed and bundled, that list is the only way to tell them apart.
- Tin the pads and the wire ends before you join them.

On the crystal strip, use the end whose arrows point away from the wire (DIN), and connect the strip's 5V/+, DIN and GND/− pads.

## Bluetooth board (KR Sabers BT909 module PCB)

The BT909 is mounted on a KR Sabers carrier board, sold by The Saber Armory as the [FSC-BT909 Bluetooth PCB Unit](https://thesaberarmory.com/products/shtokcustomworx-fsc-bt909-bluetooth-pcb-unit). The pads are labeled on the back. The listing's [wiring image](https://cdn.shopify.com/s/files/1/0262/5368/8868/products/SCW-BT909-3.jpg) marks RX "to TX" and TX "to RX", so the data wires cross over, the same as the configurator draws.

| BT909 board pad | Proffieboard pad | Wire |
| --- | --- | --- |
| **+3.3V** | SDVDD | Thin |
| **GND** (the one next to +3.3V) | GND | Thin |
| **RX** | **TX** | Thin |
| **TX** | **RX** | Thin |
| Second **GND**, **LED 1**, **LED 2** | Leave empty | Only for optional external status LEDs. The board already has its own two |

SDVDD is a 3.3 V supply the Proffieboard can switch off in low-power mode, which is why the configurator uses it for Bluetooth.

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

This is a pass-through. Every ring on the female board (CHC_F) touches the same-named pins on the male board (CHC_M), in any rotation. Shtok's [Proffieboard diagram](https://cdn.shopify.com/s/files/1/0262/5368/8868/products/image_90123a68-bfdd-4d91-a77c-03377dd314f2.png) puts the pin board (CHC_M) on the Proffieboard side. The Jawa's Depot MoM build video has it the other way round: the **ring board (CHC_F)** on the end of the chassis, next to the 4-pin pogo, and the **pin board (CHC_M)** in the hilt. Electrically it's the same either way, so follow the chassis.

| Pad (same on both boards) | Chassis side: from the Proffieboard | Hilt side: to |
| --- | --- | --- |
| **+** | Battery + contact (thick) | NPXL + |
| **−** | LED2 + LED3 | NPXL − |
| **Data** | Data1 | NPXL D1 |
| **ID** | Data2 | NPXL D2 (repurposed; see below) |
| **B1** | BT1 | Helper **SW1+** (power button) |
| **B2** | BT2 | Helper **SW2+** (aux button) |
| **GND** | GND (pad 5) | Helper **GND** (shared leg of both buttons) |

This set has one data contact plus an **ID** contact. The blade and the connector LEDs need two data wires, so this wiring carries the connector-LED data (D2) on ID. That leaves no contact for the NPXL's blade-detect (BD) pin, which is why Blade Detect is off.

In the MoM the buttons do use B1, B2 and GND, because the 4-pin pogo is taken up by the kill switch and the control-box lights. On the hilt side, three short wires run from the pin board (CHC_M) to the helper board.

## MoM FX helper board

Veracity calls this board **v4.1**. The "V1" and "V2" on the chassis page are the chassis designer's labels, and I found nothing that connects them to Veracity's version numbers. The designer describes V2 as having plain LEDs, which matches this board, but that doesn't confirm v4.1 is V2.

The board sits in the control box behind the green reveal board. The control-box buttons press its two side-mounted switches, per BRrogers's [assembly thread](https://www.therpf.com/forums/threads/fx-reveal-board-assembly-for-fx-mom-cave-hero.339167). I couldn't find a wiring guide for it, so this mapping comes from its printed labels. Run the checks below before soldering.

| Helper board pad | Proffieboard pad | How sure |
| --- | --- | --- |
| **SW1+** | BT1, through rotary B1 | Likely. Signal side of switch SW1 |
| **SW2+** | BT2, through rotary B2 | Likely |
| **GND** | GND (pad 5), through rotary GND | Likely. Common for both switches |
| **BATT+** | Battery + contact, through the 4-pin pogo | Per the build video ("battery positive to the board") |
| **BRD+** | BATT+ pad, through the 4-pin pogo | Same. Run check 2 |
| **LED1−** | LED5, through the 4-pin pogo | Per the build video ("LED 5 and 6, green and…"). Run check 3 |
| **LED2−** | LED6, through the 4-pin pogo | Same |
| **DATA1 / DATA2** | Leave unconnected for now | Run check 4. Plain LEDs don't take data, so these do something else |

For the MoM, the Jawa's Depot build video shows what crosses where:

- **4-pin pogo connector** (on the chassis end, next to the rotary ring board): the kill-switch loop (battery + out to the helper's BATT+, and BRD+ back to the Proffieboard) and the two control-box lights (LED5 and LED6).
- **Rotary connector:** blade +, blade −, Data1, Data2 (on ID), and the buttons on B1, B2 and GND.

You solder both halves of the 4-pin pogo yourself, so the pin order is your choice. What matters is that each chassis-side pin touches the hilt-side pin carrying the same signal. The two halves face each other, so left and right are mirrored. Mark pin 1 on both halves before soldering.

Checks, using a multimeter in continuity (beep) mode with nothing connected:

1. **Buttons:** hold the top switch. **SW1+ ↔ GND** should beep only while it's pressed. Do the same with the second switch and **SW2+**.
2. **Power:** test **BATT+ ↔ BRD+**.
   - If it beeps, they're joined, probably through F1 as a fuse. Run battery + to BATT+, and BRD+ to the Proffieboard's BATT+.
   - If it doesn't beep, see whether BATT+ and BRD+ each beep to one of the three big **U$2** pads. If they do, U$2 is probably where the 3-pin slide switch (kill switch) goes.
3. **LEDs:** **LED1−** should beep to a pad of the white part marked LED1. **LED2−** should do the same with LED2.
4. **Data:** find out where **DATA1** and **DATA2** go. Test each one against the three **U$2** pads and the other parts on the board. They may just pass through to something else. Nothing in this build needs them: the blade, connector LEDs and crystal all have their own data wires.

Once the checks are done, LED1 and LED2 go into the config as two plain LEDs on LED5 and LED6. That adds two more blades, so every preset needs two more styles.

## Still to confirm

- **Helper board:** the four checks above, and whether Veracity's v4.1 is the chassis designer's V2.
- **Kill switch for the MoM:** the one High Amp Kill Switch in the order is counted for the Obi-Wan. The MoM's switch sits on the helper board, between its BATT+ and BRD+ (check 2 should show the U$2 pads there). Because blade + comes straight from the battery, this switch only carries the board's own current, about 1 A at most. Check the mini black slide switch's rating, or ask the kit maker which switch U$2 is meant for.
- **4-pin pogo part:** the connector you have doesn't match the one in the Jawa's Depot video. The video shows teal surface-mount pogo strips (single- and double-ended) and a black pair: spring pins plus a flat-contact target strip. The designer says the part numbers are findable on Mouser. Get them from the video description, a pinned comment or Jawa's Depot directly, because the printed chassis pocket is sized for one specific part. Leave the four pogo wires (BATT+, LED5, LED6, kill-switch feed) long until it arrives. **Ordered:** Treedix 4-pin male spring pogo strip, through-hole, 7.5 mm pins. That's the spring half, for the chassis end; the video shows round spring tips there. **Hilt side:** your existing 4-pin pogo strip, flipped. Solder the hilt-side wires to its spring tips (they'll likely seize, which is fine on this half), and use its flat back pads as the target for the Treedix pins. Keep the back pads free of solder and flux, heat-shrink each joint, and check that all four Treedix tips land squarely on a pad before gluing it in. Pairing: BATT+ return ↔ helper BRD+, kill-switch feed ↔ helper BATT+, LED5 ↔ helper LED1− (green), LED6 ↔ helper LED2− (red). The halves face each other, so hold them together as they mate and mark pin 1 on both before soldering. When the chassis arrives, check the pin spacing (likely 2.54 mm, about 7.6 mm between the outer pins) and that the springs sit partly compressed with the chassis seated. The wires can be soldered straight to the through-hole legs, with heat shrink on each leg.
- **4-pin pogo signals:** the reading above comes from two lines of the video's subtitles. If the video goes on to name each pin, note which is which. Either way, mark matching pins on both halves.
- **Second rotary connector set:** not on either saber's list. It's the Obi-Wan's if its chassis comes apart, otherwise a spare.

## ProffieOS config to flash: `proffieos/mom_config.h`

[`proffieos/mom_config.h`](proffieos/mom_config.h) is the config to flash. It starts from the configurator's output (`out/mom/config.h`) and adds the control box's two lights, Bluetooth and save-state. It compiles cleanly against **ProffieOS 8.10** for Proffieboard V3: the firmware uses about 189 KB of 512 KB of flash and about 31 KB of RAM.

| Blade (in preset order) | Hardware | Pins |
| --- | --- | --- |
| 1 | Main blade, 130 pixels | Data1, LED2 + LED3 |
| 2–3 | NPXL V4 connector's 16 pixels, as two interleaved halves (how the configurator handles an Illuminated PCB) | Data2, LED2 + LED3 |
| 4 | Crystal chamber, 4 pixels | Data3 (through 330 Ω), LED1 |
| 5 | Control box green light | LED5 |
| 6 | Control box red light | LED6 |

| Preset | Font folder | Look |
| --- | --- | --- |
| luke rotj | `LukeROTJ` (your Luke font) | Green with audio flicker, crystal pulsing green |
| jedi green | `SmthJedi` (free) | Same, with Hubbe's free Smooth Jedi font |
| jedi blue | `SmthGrey` (free) | Blue |
| battery level | `TeensySF` (free) | Blade shows the battery charge |

Before flashing:
- Change the `4` in the crystal line (`WS281XBladePtr<4, blade3Pin, ...>`) to the number of LEDs you actually cut.
- `VOLUME 1000` is moderate. Hubbe's default V3 config uses 2200, so raise it if the speaker is too quiet.
- `CLASH_THRESHOLD_G 1.0` is the configurator's default. If swings set off clashes, raise it to 2–3.

### After soldering the Proffieboard

1. **Short check, before any power.** Look for solder bridging two pads; pad 9 (LED2 + LED3) is the only pair that should be joined. With a multimeter on beep, BATT+ (pad 4) to BATT− (pad 6) must not beep, and nor must BATT+ to GND.
2. **Flash over USB** (steps below). USB powers the board, so no battery is needed. Open the Serial Monitor and type `help` to check it's alive.
3. **Prepare the SD card** (below) and insert it.
4. **Bench test on USB:**
   - Connect the speaker: you should hear the boot sound.
   - Briefly touch the BT1 (green) wire to a GND (black) wire. That's a power-button press, so you should hear ignition.
   - Connect the Bluetooth board and look for it on your phone.
5. **Bench test on the battery:**
   - Board power goes out through the kill switch on the helper board and back, so until the hilt is wired, temporarily twist the white kill-switch feed to the red BATT+ wire.
   - Use 6–8 leftover LEDs from the mini strip as a test blade: + to the blade + wire, − to pad 9's thick wire, DIN to Data1.
   - Always connect the battery the right way round. Neopixels can fry if it's reversed.
6. **Then the connectors and far ends:**
   - Chassis side: the rotary ring board, the pogo strip, the battery contacts, the crystal (with the 330 Ω), the speaker and the Bluetooth board.
   - Remove R1 from the NPXL before wiring D2.
   - Run the helper board checks and fit its kill switch.
   - Hilt side: the rotary pin board, the short wires to the helper and the NPXL, and the flipped pogo strip.

### Flashing

1. Install the [Arduino IDE](https://www.arduino.cc/en/software). In **File → Preferences → Additional boards manager URLs**, add `https://profezzorn.github.io/arduino-proffieboard/package_proffieboard_index.json`, then install **Proffieboard** from the Boards Manager.
2. Download [ProffieOS 8.10](https://fredrik.hubbe.net/lightsaber/ProffieOS-v8.10.zip) from Hubbe's site and unzip it. The folder must stay named `ProffieOS`.
3. Copy `mom_config.h` into `ProffieOS/config/`.
4. Open `ProffieOS/ProffieOS.ino`. Remove the `// ` from the `CONFIG_FILE` line and change it to `#define CONFIG_FILE "config/mom_config.h"`.
5. In **Tools**, set:
   - **Board:** Proffieboard V3
   - **USB Type:** Serial + WebUSB + Mass Storage
   - **DOSFS:** SDIO (High Speed). ProffieOS refuses to compile otherwise.
6. Plug the board in with a data USB cable, pick its port and click **Upload**.

### SD card

1. Copy the contents of Hubbe's free [ProffieOS SD card download](https://fredrik.hubbe.net/lightsaber/sound/) to the root of the SD card. It contains the `SmthJedi`, `SmthGrey` and `TeensySF` fonts and the `tracks` folder the presets use.
2. Put your Luke font on the card in a folder named **`LukeROTJ`**, or change `"LukeROTJ"` in the config to match the folder's name.

### Luke sound fonts

Most Luke fonts are paid. These are made for Proffie or are well known:

| Font | Price | Notes |
| --- | --- | --- |
| [Father and Son (Luke ROTJ) for Proffie](https://saberfont.com/Father-and-Son-for-Proffie_p_816.html), by Juansith on Saberfont.com | $12 | Proffie version. Comes in **Normal** and **Cave Scene** versions, which suits a cave-build hilt. Also has 52 clashes, a quotes pack and two tracks. Needs a Saberfont account; check it's in stock |
| [Luke EP6](https://www.bksabersounds.com/products/luke-ep6-saber-sound-font), BK Saber Sounds | $10 | "A faithful reimagination" of the ROTJ saber. Check the download includes a Proffie version |
| Kyberphonic "The Return" V1/V2 | – | A known Luke ROTJ font ([demo](https://www.youtube.com/watch?v=BhgDvPhueDc)), but Kyberphonic's website currently shows a parked page |
| Smooth Jedi (`SmthJedi`) | Free | Not Luke-specific. Included in Hubbe's SD card download, and already the config's second preset |

## Regenerating

Edit `variants.json`. The `form` keys are the configurator's form field ids. Then run:

```sh
npm i playwright && npx playwright install chromium   # once
node generate.js                                        # writes out/<variant>/
```

Each `out/<variant>/` folder contains `diagram.png`, `config.h`, `wires.md` (readable wire list) and `wires.json`.
