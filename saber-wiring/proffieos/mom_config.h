// MoM (Magic of Myth) Luke ROTJ saber - Proffieboard V3.9, ProffieOS 8.10.
//
// Started from Fredrik Hubbe's Proffieboard V3 configurator output
// (Illuminated PCB blade, neopixel crystal chamber, 2 buttons, FSC-BT909),
// then extended with the control box's two lights. Wiring is in
// ../README.md and ../out/mom/proffie-pads.png.
//
// Data1 runs through the joint at the top of the crystal chamber (NPXL #2's
// centre pin to the BLADE board), then into NPXL #1 at the blade end, which
// is chained (Shtok's Option 3: data into D2, J bridged). So the Data1 strip
// is RING_LEDS connector pixels first, then the 130 blade pixels.
//
// Blades, in the order every preset lists its styles:
//   1. Main blade: 130 pixels on Data1 after the ring, negative on LED2 + LED3
//   2. NPXL #1 ring at the blade end (plus the BLADE board's LEDs if they
//      turn out to be in the chain), the first RING_LEDS pixels on Data1
//   3. NPXL #2 ring at the top of the crystal chamber, first half (Data2)
//   4. NPXL #2 ring, second half (same strip, interleaved)
//   5. Crystal chamber: 10 pixels on Data3, carried to the hilt on 4-pin
//      connector pin 2 (330 ohm at the crystal end). Its + and - are tapped
//      from the blade's + and - lines in the hilt, so it shares LED2 + LED3.
//   6. Control box green light, on LED5
//   7. Control box red light, on LED6
//
// Font folders: the first preset expects your Luke font in a folder named
// LukeROTJ on the SD card. The others use the free fonts and tracks from
// Hubbe's ProffieOS SD card download.

#ifdef CONFIG_TOP
#include "proffieboard_v3_config.h"
#define NUM_BLADES 7
#define NUM_BUTTONS 2
#define VOLUME 1000
// Pixels ahead of the blade on Data1: 16 for NPXL #1's ring, or 21 if the
// BLADE board's 5 LEDs are in the chain too. With the old firmware, the
// number of dark LEDs at the blade tip tells you which.
#define RING_LEDS 16
const unsigned int maxLedsPerStrip = RING_LEDS + 130;
#define CLASH_THRESHOLD_G 1.0
#define ENABLE_AUDIO
#define ENABLE_MOTION
#define ENABLE_WS2811
#define ENABLE_SD
// The main blade, both connector rings and the crystal share the LED2/LED3
// power pins.
#define SHARED_POWER_PINS
// FSC-BT909 Bluetooth on the RX/TX pads.
#define ENABLE_SERIAL
// Remember the last preset, volume and colour change.
#define SAVE_STATE
#endif

#ifdef CONFIG_PRESETS
Preset presets[] = {
  { "LukeROTJ", "tracks/mars.wav",
    StyleNormalPtr<AudioFlicker<GREEN, Rgb<0,160,0>>, WHITE, 300, 800>(),
    StyleNormalPtr<AudioFlicker<GREEN, Rgb<0,160,0>>, WHITE, 300, 800>(),
    StyleNormalPtr<AudioFlicker<GREEN, Rgb<0,160,0>>, WHITE, 300, 800>(),
    StyleNormalPtr<AudioFlicker<GREEN, Rgb<0,160,0>>, WHITE, 300, 800>(),
    StyleNormalPtr<Pulsing<GREEN, Rgb<0,40,0>, 1500>, WHITE, 300, 800>(),
    StyleNormalPtr<GREEN, WHITE, 300, 800>(),
    StyleNormalPtr<RED, WHITE, 300, 800>(),
    "luke rotj"},
  { "SmthJedi", "tracks/venus.wav",
    StyleNormalPtr<AudioFlicker<GREEN, Rgb<0,160,0>>, WHITE, 300, 800>(),
    StyleNormalPtr<AudioFlicker<GREEN, Rgb<0,160,0>>, WHITE, 300, 800>(),
    StyleNormalPtr<AudioFlicker<GREEN, Rgb<0,160,0>>, WHITE, 300, 800>(),
    StyleNormalPtr<AudioFlicker<GREEN, Rgb<0,160,0>>, WHITE, 300, 800>(),
    StyleNormalPtr<Pulsing<GREEN, Rgb<0,40,0>, 1500>, WHITE, 300, 800>(),
    StyleNormalPtr<GREEN, WHITE, 300, 800>(),
    StyleNormalPtr<RED, WHITE, 300, 800>(),
    "jedi green"},
  { "SmthGrey", "tracks/mercury.wav",
    StyleNormalPtr<AudioFlicker<BLUE, Rgb<0,0,160>>, WHITE, 300, 800>(),
    StyleNormalPtr<AudioFlicker<BLUE, Rgb<0,0,160>>, WHITE, 300, 800>(),
    StyleNormalPtr<AudioFlicker<BLUE, Rgb<0,0,160>>, WHITE, 300, 800>(),
    StyleNormalPtr<AudioFlicker<BLUE, Rgb<0,0,160>>, WHITE, 300, 800>(),
    StyleNormalPtr<Pulsing<BLUE, Rgb<0,0,40>, 1500>, WHITE, 300, 800>(),
    StyleNormalPtr<GREEN, WHITE, 300, 800>(),
    StyleNormalPtr<RED, WHITE, 300, 800>(),
    "jedi blue"},
  { "TeensySF", "tracks/uranus.wav",
    &style_charging,
    StyleNormalPtr<BLACK, BLACK, 300, 800>(),
    StyleNormalPtr<BLACK, BLACK, 300, 800>(),
    StyleNormalPtr<BLACK, BLACK, 300, 800>(),
    StyleNormalPtr<BLACK, BLACK, 300, 800>(),
    StyleNormalPtr<BLACK, BLACK, 300, 800>(),
    StyleNormalPtr<BLACK, BLACK, 300, 800>(),
    "battery\nlevel"},
};

BladeConfig blades[] = {
 { 0,
    SubBlade(RING_LEDS, RING_LEDS + 129, WS281XBladePtr<RING_LEDS + 130, bladePin, Color8::GRB, PowerPINS<bladePowerPin2, bladePowerPin3> >()),
    SubBlade(0, RING_LEDS - 1, NULL),
    SubBladeWithStride(0, 15, 2, WS281XBladePtr<16, blade2Pin, Color8::GRB, PowerPINS<bladePowerPin2, bladePowerPin3> >()),
    SubBladeWithStride(1, 15, 2, NULL),
    WS281XBladePtr<10, blade3Pin, Color8::GRB, PowerPINS<bladePowerPin2, bladePowerPin3> >(),
    SimpleBladePtr<CH2LED, NoLED, NoLED, NoLED, bladePowerPin5, -1, -1, -1>(),
    SimpleBladePtr<CH1LED, NoLED, NoLED, NoLED, bladePowerPin6, -1, -1, -1>(),
    CONFIGARRAY(presets) },
};
#endif

#ifdef CONFIG_BUTTONS
Button PowerButton(BUTTON_POWER, powerButtonPin, "pow");
Button AuxButton(BUTTON_AUX, auxPin, "aux");
#endif
