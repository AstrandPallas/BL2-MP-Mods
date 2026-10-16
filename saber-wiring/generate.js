#!/usr/bin/env node
// Runs Fredrik Hubbe's Proffieboard V3 configurator in headless Chromium for
// each entry in variants.json and saves, per variant:
//   diagram.png                - the wiring diagram the page draws
//   config.h                   - the ProffieOS config the page generates
//   wires.md / wires.json      - every wire, part terminal -> board pad
//
// Usage: node generate.js [variants.json] [out-dir]
// Needs playwright (npm i playwright, or NODE_PATH pointing at a global copy).

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const CONFIGURATOR = 'https://fredrik.hubbe.net/lightsaber/v6/configurator.html';

// Part prefixes used by configurator.js terminals ("PART:pin").
const PARTS = {
  BATT: 'Battery',
  JACK: 'Charge port',
  SW: 'Kill switch',
  SPKR: 'Speaker',
  BT1: 'Power button',
  BT2: 'Aux button',
  BT3: 'Aux2 button',
  WS1: 'Main blade (neopixel)',
  WS2: 'Second blade / accent (neopixel)',
  WS3: 'Crossguard blade 2 (neopixel)',
  WS4: 'Crystal chamber (neopixel)',
  RGB1: 'LED star',
  RGB2: 'Second LED star',
  RGB3: 'Crossguard LED star',
  RGB4: 'RGB crystal chamber',
  LED4: 'Crystal chamber LED',
  CONN: 'Blade connector',
  SEG: 'Segmented blade',
  FET: 'Flash FET',
  BLE: 'Bluetooth module',
  PLI: 'OLED display',
  DISPLAY: 'SPI display',
  IR: 'IR receiver',
};

// Board pads and the ProffieOS name each one goes by in the config.
const PADS = {
  'BATT+': 'BATT+ pad (battery positive in)',
  'BATT-': 'BATT- pad (battery negative in)',
  GND: 'GND pad',
  '5V': '5V pad',
  '3.3V': '3.3V pad',
  SDVDD: 'SDVDD pad (switched 3.3V)',
  'SPKR+': 'SPKR+ pad',
  'SPKR-': 'SPKR- pad',
  SDA: 'SDA pad',
  SCL: 'SCL pad',
  LED1: 'LED1 pad (bladePowerPin1)',
  LED2: 'LED2 pad (bladePowerPin2)',
  LED3: 'LED3 pad (bladePowerPin3)',
  LED4: 'LED4 pad (bladePowerPin4)',
  LED5: 'LED5 pad (bladePowerPin5)',
  LED6: 'LED6 pad (bladePowerPin6)',
  Data1: 'Data1 pad (bladePin)',
  Data2: 'Data2 pad (blade2Pin)',
  Data3: 'Data3 pad (blade3Pin)',
  Data4: 'Data4 pad (blade4Pin)',
  FR1: 'Free1 pad (blade5Pin)',
  FR2: 'Free2 pad (blade6Pin)',
  FR3: 'Free3 pad (blade7Pin)',
  RX: 'RX pad (blade8Pin)',
  TX: 'TX pad (blade9Pin)',
  BT1: 'Button1 pad (powerButtonPin)',
  BT2: 'Button2 pad (auxPin)',
  BT3: 'Button3 pad (aux2Pin)',
};

function describeTerminal(t) {
  const [part, pin] = t.split(':');
  if (pin === undefined) return PADS[t] || t;
  return `${PARTS[part] || part} ${pin}`;
}

function describeNet(n) {
  if (PADS[n]) return PADS[n];
  if (n.includes(':')) return describeTerminal(n);
  return n.split('|').map((p) => PADS[p] || p).join(' or ');
}

async function runVariant(browser, variant, outDir) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 2 });
  // The page pulls in an ad script that never matters for the diagram.
  await page.route(/googlesyndication|doubleclick|adservice/, (r) => r.abort());
  await page.goto(CONFIGURATOR, { waitUntil: 'load', timeout: 60000 });

  const result = await page.evaluate((form) => {
    for (const [id, v] of Object.entries(form)) {
      const el = document.getElementById(id);
      if (!el) throw new Error('No form field ' + id);
      if (el.type === 'checkbox') {
        el.checked = !!v;
      } else {
        el.value = String(v);
        if (el.value !== String(v)) throw new Error(`Invalid value ${v} for ${id}`);
      }
    }
    conf();
    const visible = (n) => layers[n] && layers[n].style.display === 'inline';
    // Targets like "GND|BATT-" mean "whichever is nearer"; the routed grid
    // cell under the terminal holds the net the wire actually reached.
    const connections = {};
    for (const [terminal, nets] of Object.entries(grid.connections)) {
      connections[terminal] = nets.map((net) => {
        if (!net.includes('|')) return net;
        const [x, y] = grid.terminals[terminal];
        return grid.getH(x, y) || grid.getV(x, y) || net;
      });
    }
    return {
      config: document.getElementById('configuration').value,
      error: visible('Error'),
      layers: Object.keys(layers).filter(visible),
      connections,
    };
  }, variant.form);

  fs.mkdirSync(outDir, { recursive: true });
  await page.locator('#diagram').screenshot({ path: path.join(outDir, 'diagram.png') });
  fs.writeFileSync(path.join(outDir, 'config.h'), result.config);

  const wires = [];
  for (const [terminal, nets] of Object.entries(result.connections)) {
    for (const net of nets) wires.push({ from: terminal, to: net });
  }
  fs.writeFileSync(path.join(outDir, 'wires.json'), JSON.stringify(wires, null, 2) + '\n');

  const md = [
    `# ${variant.title}`,
    '',
    `Generated from ${CONFIGURATOR}`,
    '',
    'Form settings:',
    '',
    ...Object.entries(variant.form).map(([k, v]) => `- \`${k}\`: \`${v}\``),
    '',
    result.error ? '**The configurator reported a routing error for this variant.**\n' : '',
    '| From | To |',
    '| --- | --- |',
    ...wires.map((w) => `| ${describeTerminal(w.from)} | ${describeNet(w.to)} |`),
    '',
  ].join('\n');
  fs.writeFileSync(path.join(outDir, 'wires.md'), md);

  await page.close();
  return { wires, error: result.error, layers: result.layers };
}

async function main() {
  const variantsFile = process.argv[2] || path.join(__dirname, 'variants.json');
  const outRoot = process.argv[3] || path.join(__dirname, 'out');
  const variants = JSON.parse(fs.readFileSync(variantsFile, 'utf8'));

  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
  const browser = await chromium.launch({ proxy });
  try {
    for (const v of variants) {
      const res = await runVariant(browser, v, path.join(outRoot, v.name));
      console.log(`${v.name}: ${res.wires.length} wires, layers: ${res.layers.join(', ')}${res.error ? ' (ROUTING ERROR)' : ''}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
