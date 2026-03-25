/* ======================================================
   DCS Pilot PWA — app.js
   ====================================================== */

'use strict';

/* ── Default Checklists ──────────────────────────────── */
const DEFAULT_CHECKLISTS_VERSION = 5;

const DEFAULT_CHECKLISTS = [
  {
    id: 'fa18-engine-start',
    aircraft: 'F/A-18C Hornet',
    phase: 'Engine Start',
    items: [
      { label: 'EXT & INTR LT knobs', action: 'SET' },
      { label: 'EXT LTS master switch', action: 'OFF / FIELD: ON' },
      { label: 'Parking brake handle', action: 'SET', warning: true },
      { label: 'BATT switch', action: 'ON', warning: true },
      { label: 'Fire warning tests A & B', action: 'PERFORM', warning: true },
      { label: 'APU switch', action: 'ON — wait for READY light', warning: true },
      { label: 'ENG CRANK switch', action: 'R' },
      { label: 'Right throttle', action: 'IDLE at 15% RPM minimum', warning: true },
      { label: 'Displays / HUD / HMD', action: 'ON / as desired' },
      { label: 'Bleed air knob', action: 'CYCLE OFF to NORM after fire test' },
      { label: 'ENG CRANK switch', action: 'L' },
      { label: 'Left throttle', action: 'IDLE at 15% RPM minimum', warning: true },
    ],
  },
  {
    id: 'fa18-before-taxi-field',
    aircraft: 'F/A-18C Hornet',
    phase: 'Before Taxi (Field)',
    items: [
      { label: 'HSI / DATA', action: 'CHECK waypoint zero and MAGVAR' },
      { label: 'INS knob', action: 'GND' },
      { label: 'RADAR knob', action: 'OPR' },
      { label: 'WING FOLD', action: 'SPREAD & LOCK', warning: true },
      { label: 'FCS RESET button', action: 'PUSH' },
      { label: 'FLAP switch', action: 'HALF', warning: true },
      { label: 'FCS BIT test', action: 'PERFORM', warning: true },
      { label: 'HOOK BYPASS switch', action: 'FIELD' },
      { label: 'ANTI SKID switch', action: 'ON', warning: true },
      { label: 'T/O TRIM button', action: 'PUSH' },
      { label: 'TRIM', action: 'SET for takeoff' },
      { label: 'Refueling probe / speedbrake / launch bar / hook / pitot heat', action: 'CYCLE' },
      { label: 'Fuel', action: 'SET BINGO' },
      { label: 'Standby altimeter', action: 'SET' },
      { label: 'SARI', action: 'UNCAGE' },
      { label: 'ALT switch (HUD)', action: 'RDR' },
      { label: 'Ground combat checks', action: 'AS REQUIRED' },
    ],
  },
  {
    id: 'fa18-before-taxi-carrier',
    aircraft: 'F/A-18C Hornet',
    phase: 'Before Taxi (Carrier)',
    items: [
      { label: 'HSI / DATA', action: 'CHECK waypoint zero and MAGVAR' },
      { label: 'INS knob', action: 'CV' },
      { label: 'RADAR knob', action: 'OPR' },
      { label: 'WING FOLD', action: 'SPREAD & LOCK', warning: true },
      { label: 'FCS RESET button', action: 'PUSH' },
      { label: 'FLAP switch', action: 'HALF', warning: true },
      { label: 'FCS BIT test', action: 'PERFORM', warning: true },
      { label: 'HOOK BYPASS switch', action: 'CARRIER' },
      { label: 'ANTI SKID switch', action: 'OFF' },
      { label: 'T/O TRIM button', action: 'PUSH' },
      { label: 'TRIM', action: 'SET for takeoff' },
      { label: 'Refueling probe / speedbrake / launch bar / hook / pitot heat', action: 'CYCLE' },
      { label: 'Fuel', action: 'SET BINGO' },
      { label: 'Standby altimeter', action: 'SET' },
      { label: 'SARI', action: 'UNCAGE' },
      { label: 'ALT switch (HUD)', action: 'RDR' },
      { label: 'Ground combat checks', action: 'AS REQUIRED' },
    ],
  },
  {
    id: 'fa18-before-taxi-field-continued',
    aircraft: 'F/A-18C Hornet',
    phase: 'Before Taxi (Field Continued)',
    items: [
      { label: 'IFF, D/L', action: 'SET' },
      { label: 'ICLS, MODE II', action: 'AS REQUIRED' },
      { label: 'TACAN', action: 'ON - set to runway heading' },
      { label: 'Radar altimeter bug', action: '200' },
      { label: 'HMD', action: 'ALIGN with canopy down and locked' },
      { label: 'INS knob', action: 'IFA / GPS restricted: NAV', warning: true },
      { label: 'OBOGS switch / OXY flow knob', action: 'ON' },
      { label: 'Chocks / Parking brake', action: 'REMOVED / OFF', warning: true },
      { label: 'NWS', action: 'ON' },
      { label: 'Checklist cross-check', action: 'HSI to FCS — check brakes' },
    ],
  },
  {
    id: 'fa18-before-taxi-carrier-continued',
    aircraft: 'F/A-18C Hornet',
    phase: 'Before Taxi (Carrier Continued)',
    items: [
      { label: 'IFF, D/L', action: 'SET' },
      { label: 'ICLS, MODE II', action: 'CHECK / as required' },
      { label: 'TACAN', action: 'ON - set to BRC' },
      { label: 'Radar altimeter bug', action: '40' },
      { label: 'HMD', action: 'ALIGN with canopy down and locked' },
      { label: 'INS knob', action: 'IFA / GPS restricted: NAV', warning: true },
      { label: 'OBOGS switch / OXY flow knob', action: 'ON' },
      { label: 'Chocks / Parking brake', action: 'REMOVED / OFF', warning: true },
      { label: 'NWS', action: 'ON' },
      { label: 'Checklist cross-check', action: 'HSI to FCS - check brakes' },
    ],
  },
  {
    id: 'fa18-before-takeoff-field',
    aircraft: 'F/A-18C Hornet',
    phase: 'Before Takeoff (Field)',
    items: [
      { label: 'Canopy / Seat', action: 'CLOSED / ARMED', warning: true },
      { label: 'T/O checklist', action: 'COMPLETE' },
      { label: 'HUD to HSI to FCS', action: 'CONTROL WIPEOUT cross-check' },
      { label: 'Takeoff power', action: 'SET per runway and gross weight', warning: true },
      { label: 'Field flared landing max weight', action: '39,000 lb', warning: true },
    ],
  },
  {
    id: 'fa18-before-takeoff-carrier',
    aircraft: 'F/A-18C Hornet',
    phase: 'Before Takeoff / Cat Hook-Up (Carrier)',
    items: [
      { label: 'Canopy / Seat', action: 'CLOSED / ARMED', warning: true },
      { label: 'WING FOLD', action: 'SPREAD AND LOCK', warning: true },
      { label: 'T/O checklist', action: 'COMPLETE' },
      { label: 'HUD to HSI to FCS', action: 'CONTROL WIPEOUT cross-check' },
      { label: 'CV launch / field takeoff max gross weight', action: '51,900 lb', warning: true },
      { label: 'CV recovery unrestricted / FLCP max weight', action: '33,000 lb', warning: true },
      { label: 'CV recovery restricted max weight', action: '34,000 lb', warning: true },
    ],
  },
  {
    id: 'fa18-ground-checks',
    aircraft: 'F/A-18C Hornet',
    phase: 'Ground Checks',
    items: [
      { label: 'Waypoints / SEQ / A-A waypoint', action: 'SET' },
      { label: 'Radar attack / AZ-EL', action: 'SETUP' },
      { label: 'Stores / smart weapons', action: 'CHECK' },
      { label: 'Time / RALT / BALT', action: 'SET' },
      { label: 'FLIR', action: 'STBY' },
    ],
  },
  {
    id: 'fa18-airborne-checks',
    aircraft: 'F/A-18C Hornet',
    phase: 'Airborne',
    items: [
      { label: 'ALR / ALQ', action: 'BIT complete, ready' },
      { label: 'FLIR', action: 'ON' },
      { label: 'Bingo bug', action: 'SET' },
    ],
  },
  {
    id: 'fa18-fence-in',
    aircraft: 'F/A-18C Hornet',
    phase: 'Fence In',
    items: [
      { label: 'Radar', action: 'OPR or as required' },
      { label: 'A-A TACAN / MIDS / RALT / SEL JETT', action: 'SET' },
      { label: 'Contrails / environment / G-warm', action: 'CHECK' },
      { label: 'ALE', action: 'SETUP expendables' },
      { label: 'Dispenser', action: 'ON / BYPASS' },
      { label: 'Alpha check', action: 'CONFIRM' },
      { label: 'Stores / smart weapons', action: 'CHECK' },
    ],
  },
  {
    id: 'fa18-commit-ingress',
    aircraft: 'F/A-18C Hornet',
    phase: 'Commit / Ingress',
    items: [
      { label: 'MASTER ARM', action: 'ARM', warning: true },
      { label: 'Master mode / sensor panel / LTD/R', action: 'SET' },
      { label: 'IFF', action: 'CONFIRM' },
      { label: 'ALQ', action: 'REC / XMIT' },
      { label: 'External lights', action: 'SET' },
      { label: 'VTR', action: 'AS REQUIRED' },
    ],
  },
  {
    id: 'fa18-return-to-force',
    aircraft: 'F/A-18C Hornet',
    phase: 'Return To Force',
    items: [
      { label: 'External lights', action: 'SET' },
      { label: 'IFF', action: 'SET' },
      { label: 'Fuel', action: 'CHECK and reset bingo bug' },
      { label: 'MASTER ARM', action: 'SAFE', warning: true },
      { label: 'SEL JETT', action: 'CHECK' },
      { label: 'Dispenser', action: 'SET' },
      { label: 'Battle damage', action: 'CHECK' },
      { label: 'ALQ / ALR / FLIR', action: 'OFF as appropriate' },
    ],
  },
  {
    id: 'fa18-descent-penetration',
    aircraft: 'F/A-18C Hornet',
    phase: 'Descent / Penetration',
    items: [
      { label: 'Engine anti-ice / windshield', action: 'AS DESIRED' },
      { label: 'Defog handle', action: 'HIGH' },
      { label: 'Anti-skid', action: 'ON', warning: true },
      { label: 'Radar and standby altimeters', action: '450 / SET' },
      { label: 'Navaids / IFF / lights', action: 'AS REQUIRED' },
    ],
  },
  {
    id: 'fa18-hail-r-checks',
    aircraft: 'F/A-18C Hornet',
    phase: 'HAIL-R Checks (Carrier Inbound)',
    items: [
      { label: 'HOOK / HEATS', action: 'SET for carrier inbound', warning: true },
      { label: 'ACL / ANTI-SKID', action: 'OFF if required' },
      { label: 'Instruments / ICLS', action: 'CHECK' },
      { label: 'Lights / landing weight', action: 'CHECK' },
      { label: 'Radar altimeter', action: 'SET by recovery case' },
      { label: 'CV recovery unrestricted / FLCP max weight', action: '33,000 lb', warning: true },
      { label: 'CV recovery restricted max weight', action: '34,000 lb', warning: true },
      { label: 'HUD / HSI / FCS', action: 'AS NEEDED' },
    ],
  },
  {
    id: 'fa18-approach',
    aircraft: 'F/A-18C Hornet',
    phase: 'Approach (Field)',
    items: [
      { label: 'Landing checklist', action: 'COMPLETE', warning: true },
      { label: 'Field flared landing max weight', action: '39,000 lb', warning: true },
      { label: 'Ground idle note', action: 'USE weight-on-wheels before touchdown idle' },
    ],
  },
  {
    id: 'fa18-clearing-runway',
    aircraft: 'F/A-18C Hornet',
    phase: 'Clearing Runway (Field)',
    items: [
      { label: 'Seat', action: 'ARMED / FIELD: SAFE' },
      { label: 'FLAP switch', action: 'AUTO' },
      { label: 'WING FOLD', action: 'AS REQUIRED' },
      { label: 'T/O trim knob', action: 'PUSH' },
    ],
  },
  {
    id: 'fa18-before-engine-shutdown',
    aircraft: 'F/A-18C Hornet',
    phase: 'Before Engine Shutdown',
    items: [
      { label: 'Parking brake / chocks', action: 'SET / REQUEST', warning: true },
      { label: 'INS knob', action: 'OFF after delay before throttles off' },
      { label: 'SARI', action: 'CAGE' },
      { label: 'Radar / sensors / avionics / comms', action: 'OFF' },
      { label: 'EXT & INTR LT knobs', action: 'OFF' },
      { label: 'OBOGS switch / OXY flow knob', action: 'OFF' },
      { label: 'Seat / canopy', action: 'SAFE / OPEN', warning: true },
    ],
  },
  {
    id: 'fa18-engine-shutdown',
    aircraft: 'F/A-18C Hornet',
    phase: 'Engine Shutdown',
    items: [
      { label: 'Nosewheel steering', action: 'DISENGAGE' },
      { label: 'FLAP switch', action: 'FULL' },
      { label: 'Throttle', action: 'OFF alternate sides' },
      { label: 'Displays / HUD / HMD', action: 'OFF' },
      { label: 'Throttle', action: 'OFF remaining side' },
      { label: 'Battery switch', action: 'OFF', warning: true },
    ],
  },
  {
    id: 'a10c-int-check',
    aircraft: 'A-10C II',
    phase: 'INT Check / Prior To Engine Start',
    items: [
      { label: 'UHF radio ARC-164', action: 'BOTH — set as required' },
      { label: 'PINKY switch', action: 'AFT — exterior lights manual' },
      { label: 'Accelerometer', action: 'RESET' },
      { label: 'Exterior / interior lights', action: 'SET' },
      { label: 'Battery / Inverter', action: 'PWR / STBY', warning: true },
      { label: 'Flap lever', action: 'SET to indicated flap position' },
      { label: 'Fire detect / signal / OXY / fuel tests', action: 'PERFORM', warning: true },
      { label: 'Fuel display selector', action: 'SET as required' },
      { label: 'APU switch', action: 'START — READY within 30 sec', warning: true },
      { label: 'APU GEN switch', action: 'PWR' },
      { label: '(AAP) CDU / EGI', action: 'ON' },
    ],
  },
  {
    id: 'a10c-starting-engines',
    aircraft: 'A-10C II',
    phase: 'Starting Engines',
    items: [
      { label: 'Left throttle', action: 'IDLE', warning: true },
      { label: 'Engine start cycle light', action: 'VERIFY OFF before next engine', warning: true },
      { label: 'Right throttle', action: 'IDLE', warning: true },
      { label: 'Emergency brake handle', action: 'PULL if starting right engine first', warning: true },
    ],
  },
  {
    id: 'a10c-before-taxi',
    aircraft: 'A-10C II',
    phase: 'Before Taxiing',
    items: [
      { label: 'VHF radios ARC-186', action: 'TR — set' },
      { label: 'VHF/UHF radio ARC-210', action: 'TR — set' },
      { label: 'IFF', action: 'SET — MASTER STBY' },
      { label: 'Emergency brake handle', action: 'FULL FORWARD', warning: true },
      { label: 'CMSP', action: 'SET — MODE STBY' },
      { label: 'TACAN / ILS', action: 'T/R — set / PWR' },
      { label: 'Takeoff trim button', action: 'HOLD 2 sec' },
      { label: 'CDU', action: 'VERIFY ALIGN and LSK NAV' },
      { label: 'NMSP', action: 'EGI ON — STR PT / ANCHR / TCN as required' },
    ],
  },
  {
    id: 'a10c-before-taxi-continued',
    aircraft: 'A-10C II',
    phase: 'Before Taxiing (Cont\'d)',
    items: [
      { label: 'IFFCC switch', action: 'TEST — UFC ENT to start test', warning: true },
      { label: 'JTRS switch', action: 'ON' },
      { label: 'CICU switch', action: 'ON' },
      { label: 'MFCD L/R', action: 'AS REQUIRED' },
      { label: 'MFCD DTS UPLOAD page', action: 'LOAD ALL' },
      { label: 'TGP switch', action: 'AS REQUIRED' },
      { label: 'SAI knob', action: 'UNCAGE' },
      { label: 'SAS', action: 'ENGAGE' },
      { label: 'IFFCC switch', action: 'VERIFY TEST COMPLETE — ON', warning: true },
      { label: 'Altimeter', action: 'SET' },
      { label: 'APU GEN', action: 'OFF prior to APU shutdown' },
      { label: 'APU switch', action: 'OFF' },
      { label: 'Ladder / Chocks', action: 'STOWED / REMOVED', warning: true },
      { label: 'EAC switch', action: 'ARM', warning: true },
      { label: 'HMCS power switch', action: 'ON' },
      { label: 'Nosewheel steering', action: 'ENGAGE' },
    ],
  },
  {
    id: 'a10c-before-takeoff',
    aircraft: 'A-10C II',
    phase: 'Before Takeoff',
    items: [
      { label: 'Flaps', action: 'SET for takeoff (7° MVR)' },
      { label: 'Speed brakes', action: 'CLOSED' },
      { label: 'IFF', action: 'AS REQUIRED' },
      { label: 'Oxygen / defog / deice', action: 'AS REQUIRED' },
      { label: 'Canopy / Seat', action: 'CLOSED, LOCKED / ARMED', warning: true },
      { label: 'Exterior lights', action: 'AS REQUIRED' },
    ],
  },
  {
    id: 'a10c-lineup-check',
    aircraft: 'A-10C II',
    phase: 'Lineup Check',
    items: [
      { label: 'Anti-skid switch', action: 'ANTI-SKID', warning: true },
      { label: 'Pitot heat switch', action: 'PITOT HEAT' },
    ],
  },
  {
    id: 'f16-before-start',
    aircraft: 'F-16C Viper',
    phase: 'Before Start',
    items: [
      { label: 'Parking brake', action: 'SET', warning: true },
      { label: 'Throttle', action: 'OFF' },
      { label: 'MAIN PWR switch', action: 'BATT' },
      { label: 'MFDs / UFC / DED', action: 'CHECK power-up' },
      { label: 'Oxygen', action: 'CHECK / ON as required' },
      { label: 'Avionics / lighting', action: 'SET as required' },
    ],
  },
  {
    id: 'f16-engine-start',
    aircraft: 'F-16C Viper',
    phase: 'Engine Start',
    items: [
      { label: 'JFS switch', action: 'START 2', warning: true },
      { label: 'Throttle', action: 'IDLE at 20% RPM', warning: true },
      { label: 'Engine instruments', action: 'MONITOR for normal start', warning: true },
      { label: 'JFS', action: 'VERIFY disengaged after spool-up' },
      { label: 'Generators / cautions', action: 'CHECK normal' },
      { label: 'EPU switch', action: 'NORM', warning: true },
    ],
  },
  {
    id: 'f16-after-start',
    aircraft: 'F-16C Viper',
    phase: 'After Start / Alignment',
    items: [
      { label: 'MAIN PWR switch', action: 'MAIN PWR' },
      { label: 'INS knob', action: 'NORM' },
      { label: 'MMC / ST STA / MFD power', action: 'ON' },
      { label: 'UFC / COMM 1 / COMM 2', action: 'SET' },
      { label: 'IFF / LIST / DATALINK', action: 'AS REQUIRED' },
      { label: 'FUEL quantity / balance', action: 'CHECK', warning: true },
      { label: 'SMS / stores page', action: 'CHECK loadout' },
      { label: 'HMCS / RWR / CMDS', action: 'SET as required' },
    ],
  },
  {
    id: 'f16-before-taxi',
    aircraft: 'F-16C Viper',
    phase: 'Before Taxi',
    items: [
      { label: 'FLCS test', action: 'COMPLETE', warning: true },
      { label: 'Trim', action: 'SET T/O' },
      { label: 'Flight controls', action: 'CHECK full movement', warning: true },
      { label: 'Canopy', action: 'CLOSE / LOCK', warning: true },
      { label: 'Seat', action: 'ARMED', warning: true },
      { label: 'Anti-skid', action: 'ON' },
      { label: 'NWS', action: 'ENGAGE' },
      { label: 'Altimeter / RALT', action: 'SET' },
    ],
  },
  {
    id: 'f16-before-takeoff',
    aircraft: 'F-16C Viper',
    phase: 'Before Takeoff',
    items: [
      { label: 'Flight controls', action: 'FINAL CHECK', warning: true },
      { label: 'Trim', action: 'VERIFY T/O' },
      { label: 'Stores config', action: 'CHECK' },
      { label: 'Master Arm', action: 'SAFE', warning: true },
      { label: 'Lights', action: 'AS REQUIRED' },
      { label: 'Takeoff data', action: 'CONFIRM runway / wind / gross weight', warning: true },
    ],
  },
  {
    id: 'f16-fence-in',
    aircraft: 'F-16C Viper',
    phase: 'Fence In',
    items: [
      { label: 'Master Arm', action: 'ARM', warning: true },
      { label: 'A-A / A-G master mode', action: 'SELECT' },
      { label: 'Radar / TGP / HARM / HTS', action: 'SET as required' },
      { label: 'Countermeasures', action: 'PROGRAM / ARM' },
      { label: 'Laser', action: 'ARM if required' },
      { label: 'Fuel / bingo', action: 'CHECK' },
    ],
  },
  {
    id: 'f16-recovery',
    aircraft: 'F-16C Viper',
    phase: 'Recovery / Landing',
    items: [
      { label: 'Master Arm', action: 'SAFE', warning: true },
      { label: 'Stores', action: 'CHECK safe / jettison as required' },
      { label: 'Fuel', action: 'CHECK landing fuel', warning: true },
      { label: 'Speed brakes', action: 'AS REQUIRED' },
      { label: 'Hook', action: 'AS REQUIRED' },
      { label: 'Gear / flaps', action: 'CHECK for landing', warning: true },
    ],
  },
  {
    id: 'f16-shutdown',
    aircraft: 'F-16C Viper',
    phase: 'Shutdown',
    items: [
      { label: 'Parking brake', action: 'SET', warning: true },
      { label: 'Master Arm', action: 'SAFE' },
      { label: 'Avionics / radar / CMDS', action: 'OFF' },
      { label: 'Throttle', action: 'OFF', warning: true },
      { label: 'JFS', action: 'OFF' },
      { label: 'MAIN PWR switch', action: 'OFF', warning: true },
    ],
  },

  /* ══ C-130J Hercules ════════════════════════════════════════ */
  {
    id: 'c130j-power-up',
    aircraft: 'C-130J',
    phase: 'Power Up',
    items: [
      { label: 'CONTROL BOOST switches', action: 'ON / guarded' },
      { label: 'OIL COOLER FLAPS switches', action: 'AUTOMATIC' },
      { label: 'GENERATOR switches', action: 'ON' },
      { label: 'Battery switch', action: 'OFF' },
      { label: 'EXT PWR/OFF/APU switch', action: 'OFF' },
      { label: 'PROPELLERS switches', action: 'OFF' },
      { label: 'ENG switch', action: 'OFF' },
      { label: 'WING/EMP switch', action: 'OFF' },
      { label: 'ANTI-ICE/DE-ICE switch', action: 'DE-ICE' },
      { label: 'PITOT switches', action: 'OFF' },
      { label: 'NESA HEAT switches', action: 'OFF' },
      { label: 'L ISO, R ISO & DIVIDER VALVE switches', action: 'AUTO' },
      { label: 'Nacelle shutoff valve switches', action: 'AUTO' },
      { label: 'AUTO RATE switch', action: 'NORM' },
      { label: 'EMER DEPRESS switch', action: 'NORM / guarded' },
      { label: 'Mode select switch', action: 'AUTO' },
      { label: 'L DUMP & R DUMP switches', action: 'CLOSED / guarded' },
      { label: 'TANK SELECT switch', action: 'OFF' },
      { label: 'All exterior light switches', action: 'OFF' },
      { label: 'FADEC switches', action: 'NORM' },
      { label: 'PROPELLER CONTROL switches', action: 'NORMAL' },
      { label: 'ATCS switch', action: 'ON / guarded' },
      { label: 'PROP SYNC switch', action: 'ON' },
      { label: 'Fire handles', action: 'IN', warning: true },
      { label: 'ENGINE START switches', action: 'STOP' },
      { label: 'APU fire handle', action: 'IN', warning: true },
      { label: 'APU control switch', action: 'STOP' },
      { label: 'ELT switch', action: 'ARM, pinned' },
      { label: 'WIPERS switch', action: 'OFF' },
      { label: 'UNDERFLOOR switch', action: 'OFF' },
      { label: 'Landing gear lever', action: 'DOWN', warning: true },
      { label: 'LANDING LIGHTS panel switches', action: 'OFF' },
      { label: 'ANTI-SKID switch', action: 'ON' },
      { label: 'AUX PUMP switch', action: 'OFF' },
      { label: 'RADAR MASTER', action: 'OFF' },
      { label: 'RAMP/DOOR switch', action: 'OFF' },
      { label: 'AIR DEFLECTOR switch', action: 'CLOSE' },
      { label: 'DEFENSIVE SYSTEMS MASTER', action: 'STBY' },
      { label: 'TACDS JETTISON switch', action: 'OFF, guarded', warning: true },
      { label: 'Battery test', action: 'COMPLETE — AV & UTIL ≥ 24 VDC', warning: true },
      { label: 'EXT PWR/OFF/APU switch', action: 'EXT PWR (if available)' },
      { label: 'AMU PREFLIGHT page', action: 'SELECTED' },
      { label: 'FIRE DETECTION TEST', action: 'COMPLETE — handles & MASTER WARNING illuminate', warning: true },
      { label: 'APU', action: 'START if required — ALARM ON', warning: true },
      { label: 'Smoke detectors test', action: 'COMPLETE', warning: true },
      { label: 'ACAWS messages', action: 'CHECKED' },
      { label: 'ECBs', action: 'CHECKED, reset all faults' },
      { label: 'Lighting lamp & display test', action: 'COMPLETE' },
      { label: 'APU bleed air switch', action: 'OPEN (if APU running)' },
      { label: 'Bleed air pressure indicator', action: 'CHECKED' },
      { label: 'AIR COND — CROSS FLOW VALVE', action: 'AUTO' },
      { label: 'Temperature controls', action: 'AUTO, temperature set' },
      { label: 'FLT STA & CARGO COMPT POWER switches', action: 'ON' },
      { label: 'Fuel quantity and distribution', action: 'CHECKED, balanced' },
      { label: 'Trim tab indicators', action: 'CHECKED' },
      { label: 'ELEV TAB power switch', action: 'EMER then NORM' },
      { label: 'FLAPS lever', action: 'MATCH FLAP DIAL & AMU PREFLIGHT' },
      { label: 'CNI-MU', action: 'INITIALIZED — database checked, AUTONAV selected' },
      { label: 'GPS TOD transfer to VHF/UHF radios', action: 'COMPLETE' },
    ],
  },
  {
    id: 'c130j-before-starting-engines',
    aircraft: 'C-130J',
    phase: 'Before Starting Engines',
    items: [
      { label: 'Power up checklist', action: 'COMPLETE' },
      { label: 'Oxygen', action: 'SET — diluter 100% O₂, supply ON, emergency NORMAL', warning: true },
      { label: 'APU alarm', action: 'OFF' },
      { label: 'APU (if not running)', action: 'START — control switch START, RUN', warning: true },
      { label: 'EXT PWR/OFF/APU switch', action: 'APU' },
      { label: 'CNI equipment', action: 'CHECKED — data transfer complete' },
      { label: 'Flight plan', action: 'CHECKED' },
      { label: 'IFF/TCAS', action: 'SET — Mode 3/C ON, TCAS TA/RA' },
      { label: 'Performance / TOLD data', action: 'AS REQUIRED' },
      { label: 'Inertial alignment', action: 'CHECKED' },
      { label: 'Communication / navigation radios', action: 'ON, set, frequencies checked' },
      { label: 'Auxiliary comm — V/UHF radio check', action: 'COMPLETE' },
      { label: 'RWR', action: 'ON, set' },
      { label: 'MWS', action: 'ON' },
      { label: 'TACDS', action: 'ON, set' },
      { label: 'HDDs / HUD', action: 'SET — PFD, engine display, system status' },
      { label: 'ACAWS', action: 'CHECKED' },
      { label: 'APU bleed air switch', action: 'OPEN' },
      { label: 'BLEED AIR PRESS', action: 'CHECKED (after 1 min)' },
      { label: 'Pressurization — AUTO RATE', action: 'NORM' },
      { label: 'EMER DEPRESS switch', action: 'NORM / guarded' },
      { label: 'Mode select switch', action: 'AUTO' },
      { label: 'LDG/CONST ALT', action: 'SET — departure elevation + 500 ft' },
      { label: 'AIR COND panel', action: 'SET — AUTO, temperature set, CROSS FLOW AUTO' },
      { label: 'Fuel quantity and distribution', action: 'CHECKED' },
      { label: 'Flight instruments', action: 'CHECKED — radar alt between +1 and −3 ft' },
      { label: 'NAV SELECT / heading / course', action: 'SET for departure' },
      { label: 'Flight director modes', action: 'SELECTED' },
      { label: 'ANTI-SKID switch', action: 'ON' },
      { label: 'EMER BRAKE SEL', action: 'EMER' },
      { label: 'AUX PUMP', action: 'ON — pressure checked' },
      { label: 'ENGINE PUMPS switches', action: 'ON' },
      { label: 'SUCTION BOOST PUMPS switches', action: 'ON' },
      { label: 'Parking brake', action: 'SET — pedals depressed, no pressure drop', warning: true },
      { label: 'NLG pin and chocks', action: 'REMOVED', warning: true },
    ],
  },
  {
    id: 'c130j-starting-engines',
    aircraft: 'C-130J',
    phase: 'Starting Engines',
    items: [
      { label: 'FADEC switches', action: 'RESET' },
      { label: 'NIUs', action: 'RESET — AMU ENGINE DIAGNOSTICS page' },
      { label: 'Power levers', action: 'GND IDLE' },
      { label: 'Low speed ground idle buttons', action: 'LOW' },
      { label: 'NAVIGATION LIGHTS', action: 'STEADY' },
      { label: 'STROBE lights', action: 'ON (as required)' },
      { label: 'AIR COND — CARGO COMPT PWR', action: 'OFF' },
      { label: 'APU bleed air switch', action: 'OPEN' },
      { label: 'Clear No. 3 engine', action: '3 CLEAR', warning: true },
      { label: 'ENGINE START 3 switch', action: 'START, RUN — monitor instruments', warning: true },
      { label: 'Remaining engines', action: 'START in sequence — clear each engine first', warning: true },
      { label: 'External equipment', action: 'REMOVED', warning: true },
      { label: 'Engines & system status pages', action: 'CHECKED' },
      { label: 'APU bleed air switch', action: 'CLOSED' },
      { label: 'FLT STA & CARGO COMPT POWER', action: 'ON' },
      { label: 'UNDERFLOOR switch', action: 'HEAT/FAN' },
    ],
  },
  {
    id: 'c130j-before-taxi',
    aircraft: 'C-130J',
    phase: 'Before Taxi',
    items: [
      { label: 'Standby attitude indicator', action: 'UNCAGED' },
      { label: 'Engine anti-ice', action: 'CHECKED — switch AUTO' },
      { label: 'APU bleed air switch', action: 'CLOSED' },
      { label: 'Wing / empennage boot ice protection', action: 'TEST — ACAWS check', warning: true },
      { label: 'PROPELLERS 1, 2, 3, 4 switches', action: 'AUTO' },
      { label: 'Low speed ground idle', action: 'SET (as required)' },
      { label: 'Stall warning / stick pusher', action: 'CHECKED — power levers GND IDL, PUSHER TEST' },
      { label: 'Automatic flight control system', action: 'CHECKED' },
      { label: 'Radar', action: 'ON' },
      { label: 'ICE PROTECTION PROPELLERS switches', action: 'AUTO' },
    ],
  },
  {
    id: 'c130j-taxi',
    aircraft: 'C-130J',
    phase: 'Taxi',
    items: [
      { label: 'Taxi & wingtip taxi lights', action: 'ON' },
      { label: 'Brakes', action: 'CHECKED — emergency and normal', warning: true },
      { label: 'Instruments', action: 'CHECKED' },
      { label: 'Altimeters', action: 'SET' },
      { label: 'FLAPS', action: '50%' },
      { label: 'Aileron & rudder trim', action: 'ZERO' },
      { label: 'Elevator trim', action: 'SET — T/O value per chart', warning: true },
      { label: 'Elevator trim tab switch', action: 'NORM' },
      { label: 'Flight controls', action: 'CHECKED — full travel' },
      { label: 'Crew briefing', action: 'COMPLETE' },
      { label: 'NAV aids & REF/MODE', action: 'SET for departure' },
      { label: 'HP', action: 'SET — T/O value − 200' },
      { label: 'RAD ALT / FPA / MINS', action: 'SET (as required)' },
      { label: 'ALT SEL', action: 'SET — level-off altitude' },
      { label: 'Flight director mode', action: 'SET (as required)' },
      { label: 'Propeller overspeed governor test', action: 'COMPLETE — all 4 engines', warning: true },
      { label: 'APU', action: 'OFF / STOP (as required)' },
      { label: 'Radar', action: 'SET' },
    ],
  },
  {
    id: 'c130j-before-takeoff',
    aircraft: 'C-130J',
    phase: 'Before Takeoff',
    items: [
      { label: 'Seat belt & shoulder harness', action: 'FASTENED, unlocked' },
      { label: 'PITOT / NESA HEAT switches', action: 'ON' },
      { label: 'IFF', action: 'SET — transmitting, CNBP CHECK' },
      { label: 'TACDS master switch', action: 'SET (as required)' },
      { label: 'Exterior lights', action: 'SET — landing & strobe as required' },
      { label: 'All TRANSFER switches', action: 'OFF' },
      { label: 'All CROSS FEED switches', action: 'CLSD' },
      { label: 'ACAWS', action: 'CHECKED', warning: true },
    ],
  },
  {
    id: 'c130j-after-takeoff',
    aircraft: 'C-130J',
    phase: 'After Takeoff',
    items: [
      { label: 'GEAR', action: 'UP — gear & handle lights OUT', warning: true },
      { label: 'FLAPS', action: 'UP' },
      { label: 'Landing lights', action: 'AS REQUIRED' },
      { label: 'Taxi lights', action: 'OFF' },
      { label: 'APU (below 180 kts)', action: 'STOP — EXT PWR/OFF/APU switch OFF' },
      { label: 'AUX PUMP', action: 'OFF' },
      { label: 'Pressurization', action: 'CHECKED' },
    ],
  },
  {
    id: 'c130j-descend',
    aircraft: 'C-130J',
    phase: 'Descend',
    items: [
      { label: 'Altimeters', action: 'SET' },
      { label: 'Pressurization', action: 'SET' },
      { label: 'ACAWS', action: 'CHECKED' },
      { label: 'Landing data', action: 'COMPUTED / reviewed' },
      { label: 'Crew briefing', action: 'COMPLETE' },
      { label: 'HF radios', action: 'OFF' },
      { label: 'NAV aids & REF/MODE', action: 'SET' },
      { label: 'Radar altimeter', action: 'SET' },
      { label: 'Approach minimums', action: 'SET' },
      { label: 'Flight path angle', action: 'SET (as required)' },
      { label: 'Defensive systems', action: 'SET (as required)' },
      { label: 'GCAS / TCAS', action: 'SET, checked' },
      { label: 'Landing & taxi lights', action: 'AS REQUIRED' },
      { label: 'CROSS-SHIP switch', action: 'CLSD' },
      { label: 'TANK SELECT switch', action: 'OFF' },
      { label: 'Fuel quantity & distribution', action: 'CHECKED' },
      { label: 'CROSS FEED switches', action: 'CLSD' },
    ],
  },
  {
    id: 'c130j-before-landing',
    aircraft: 'C-130J',
    phase: 'Before Landing',
    items: [
      { label: 'WING/EMP ice protection', action: 'ON — ANTI-ICE (as required)' },
      { label: 'Altimeters', action: 'SET' },
      { label: 'Radar altimeters', action: 'SET' },
      { label: 'Cabin differential pressure', action: 'CHECKED' },
      { label: 'FLAPS', action: 'AS REQUIRED' },
      { label: 'GEAR', action: 'DOWN, checked — 3 green', warning: true },
      { label: 'SPR drain', action: 'ON (as required)' },
      { label: 'Landing lights', action: 'AS REQUIRED' },
      { label: 'Taxi lights', action: 'ON' },
      { label: 'EMER BRAKE SEL', action: 'AS REQUIRED' },
      { label: 'AUX PUMP switch', action: 'ON' },
      { label: 'Seat belt & shoulder harness', action: 'FASTENED, unlocked' },
    ],
  },
  {
    id: 'c130j-after-landing',
    aircraft: 'C-130J',
    phase: 'After Landing',
    items: [
      { label: 'APU', action: 'START if required', warning: true },
      { label: 'NESA HEAT / PITOT heat switches', action: 'OFF' },
      { label: 'PROPELLERS switches', action: 'OFF' },
      { label: 'ENG anti-ice switch', action: 'AUTO' },
      { label: 'WING/EMP switch', action: 'AUTO, DE-ICE' },
      { label: 'Exterior lighting', action: 'AS REQUIRED' },
      { label: 'Strobe lights', action: 'OFF' },
      { label: 'FLAPS', action: 'AS REQUIRED' },
      { label: 'IFF/TCAS / Radar', action: 'AS REQUIRED' },
      { label: 'DEFENSIVE SYSTEMS MASTER', action: 'STBY' },
      { label: 'Pressurization', action: 'DEPRESSURIZED' },
      { label: 'TACDS system', action: 'DEACTIVATED — MASTER STBY, FLARE SAFE, PWR OFF' },
      { label: 'Parking brake', action: 'SET' },
      { label: 'Power levers', action: 'GND IDLE' },
      { label: 'LOW SPD GND IDLE switches', action: 'LOW' },
    ],
  },
  {
    id: 'c130j-engine-shutdown',
    aircraft: 'C-130J',
    phase: 'Engine Shutdown',
    items: [
      { label: 'Nose wheel centered & parking brake', action: 'SET', warning: true },
      { label: 'ICE PROTECTION PROPELLERS switches', action: 'OFF' },
      { label: 'DITU ECBs 441 & 890', action: 'PULL' },
      { label: 'Power levers', action: 'GND IDLE' },
      { label: 'LOW SPD GND IDLE switches', action: 'LOW' },
      { label: 'ENGINE START switches', action: 'STOP', warning: true },
      { label: 'Landing / taxi lights', action: 'OFF' },
      { label: 'PROPELLER CONTROL switches', action: 'FEATHER' },
      { label: 'CROSS FEED switches', action: 'CLSD' },
      { label: 'Transfer TO/FROM switches', action: 'CLSD / OFF' },
      { label: 'CROSS-SHIP switch', action: 'CLSD' },
      { label: 'TANK SELECT switch', action: 'OFF' },
      { label: 'UNDERFLOOR switch', action: 'OFF' },
      { label: 'OIL COOLER FLAPS switches', action: 'OPEN, fixed' },
      { label: 'Standby attitude indicator', action: 'CAGED' },
      { label: 'Oxygen', action: 'OFF — diluter 100% O₂, supply lever OFF' },
      { label: 'Chocks', action: 'IN PLACE, exits clear', warning: true },
      { label: 'Parking brake', action: 'RELEASED (after chocks in)' },
      { label: 'SUCTION BOOST PUMPS switches', action: 'OFF' },
      { label: 'AUX PUMP switch', action: 'OFF' },
      { label: 'PROPELLER AUX PUMP ECBs', action: 'PULLED' },
    ],
  },
  {
    id: 'c130j-before-leaving',
    aircraft: 'C-130J',
    phase: 'Before Leaving',
    items: [
      { label: 'MASTER EGI power', action: 'OFF — AMU NAV-SELECT → EGI POWER → CONFIRM' },
      { label: 'DSDTU and EMMU RMMs', action: 'REMOVED (as required)' },
      { label: 'AIR COND POWER switches', action: 'OFF' },
      { label: 'HUD', action: 'STOWED and covered' },
      { label: 'PROPELLER CONTROL switches', action: 'NORMAL' },
      { label: 'BLEED AIR APU switch', action: 'CLOSED' },
      { label: 'EXT PWR/OFF/APU switch', action: 'OFF' },
      { label: 'APU', action: 'STOP' },
      { label: 'Exterior lights', action: 'OFF' },
      { label: 'Interior lights', action: 'OFF' },
      { label: 'Battery', action: 'OFF', warning: true },
      { label: 'Emergency exit lights', action: 'EXTINGUISHED', warning: true },
      { label: 'Flight station', action: 'CLEANED' },
    ],
  },
  {
    id: 'c130j-ramp-procedure',
    aircraft: 'C-130J',
    phase: 'Ramp Procedure',
    items: [
      { label: 'Parking brake', action: 'SET', warning: true },
      { label: 'Power levers', action: 'GND IDLE' },
      { label: 'LOW SPD GND IDLE switches', action: 'LOW' },
      { label: 'No. 2 & No. 3 engines', action: 'SHUT DOWN — ENGINE START switches STOP', warning: true },
      { label: 'Crew entry door', action: 'CLEAR' },
      { label: 'Ramp', action: 'LOWER' },
      { label: 'TACDS dispensers', action: 'CHECKED (as required)' },
      { label: 'Crew entry door', action: 'CLOSED' },
      { label: 'Ramp', action: 'CLOSED' },
      { label: 'No. 2 & No. 3 engines', action: 'STARTED if required — clear engines', warning: true },
    ],
  },
];

/* ── State ───────────────────────────────────────────── */
let state = {
  checklists: [],    // array of checklist objects
  checked: {},       // { checklistId: Set<itemIndex> }
  activeChecklist: null,
  expandedAircraft: null,  // track which aircraft group is expanded
  checklistFilters: {
    type: 'all',
    aircraft: 'all',
  },
  charts: [],        // { id, name, type, dataUrl }
  activeChart: null,
  chartZoom: 1.0,
  manuals: [],       // { id, name, type, dataUrl }
  activeManual: null,
  manualZoom: 1.0,
  scratchPad: '',
  casForms: {},
  activeCasForm: 'cas-9line',
  activeCasEntryIndexByForm: {},
  casReference: {
    page: 1,
  },
  wab: {
    emptyWeight: 75562,
    emptyArm:    524.6,
    fuelWeight:  20000,
    fuelArm:     516.0,
    cargo:       [],
  },
};

/* ── Persistence ─────────────────────────────────────── */
function saveState() {
  const serializable = {
    defaultsVersion: DEFAULT_CHECKLISTS_VERSION,
    checklists: state.checklists,
    checked: Object.fromEntries(
      Object.entries(state.checked).map(([k, v]) => [k, [...v]])
    ),
    expandedAircraft: state.expandedAircraft,
    checklistFilters: state.checklistFilters,
    charts: state.charts,
    manuals: state.manuals,
    scratchPad: state.scratchPad,
    casForms: state.casForms,
    activeCasForm: state.activeCasForm,
    activeCasEntryIndexByForm: state.activeCasEntryIndexByForm,
    casReference: state.casReference,
    wab:    state.wab,
  };
  localStorage.setItem('dcs-pilot-state', JSON.stringify(serializable));
}

function isChecklistFullyDone(checklist, checkedMap) {
  const checked = checkedMap[checklist.id] || new Set();
  return checklist.items.length > 0 && checked.size === checklist.items.length;
}

function buildMergedChecklist(id, aircraft, phase, sourceChecklists, checkedMap, includeFn) {
  const items = [];
  const checked = new Set();
  let mergedIdx = 0;

  sourceChecklists.forEach(cl => {
    if (!includeFn(cl)) return;
    const clChecked = checkedMap[cl.id] || new Set();

    cl.items.forEach((item, itemIdx) => {
      items.push({
        label: item.label,
        action: item.action,
        warning: !!item.warning,
      });
      if (clChecked.has(itemIdx)) checked.add(mergedIdx);
      mergedIdx += 1;
    });
  });

  return {
    checklist: { id, aircraft, phase, items },
    checked,
  };
}

function ensureChecklistHasItems(entry, fallbackItems) {
  if (entry.checklist.items.length > 0) return entry;
  return {
    checklist: {
      ...entry.checklist,
      items: fallbackItems.map(item => ({ ...item })),
    },
    checked: new Set(),
  };
}

function classifyFa18Phase(phase) {
  const p = String(phase || '').toLowerCase();
  if (p.includes('field')) return 'field';
  if (p.includes('carrier') || p.includes('cat hook-up') || p.includes('hail-r')) return 'carrier';
  return 'common';
}

function isLandingPhase(phase) {
  const p = String(phase || '').toLowerCase();
  return p.includes('landing')
    || p.includes('approach')
    || p.includes('recovery')
    || p.includes('runway')
    || p.includes('hail-r');
}

function classifyFa18LandingPhase(phase) {
  if (!isLandingPhase(phase)) return 'none';
  const kind = classifyFa18Phase(phase);
  if (kind === 'carrier') return 'carrier';
  return 'field';
}

function normalizeAircraftChecklistGroups() {
  const targets = {
    'F/A-18C Hornet': {
      ids: new Set(['fa18-field-ops', 'fa18-carrier-ops', 'fa18-field-landing', 'fa18-carrier-landing']),
      legacyIds: new Set(['fa18-field-ops', 'fa18-carrier-ops']),
      build(source, checkedMap) {
        const field = buildMergedChecklist(
          'fa18-field-ops',
          'F/A-18C Hornet',
          'Field Ops',
          source,
          checkedMap,
          cl => {
            const kind = classifyFa18Phase(cl.phase);
            return (kind === 'field' || kind === 'common') && !isLandingPhase(cl.phase);
          }
        );
        const carrier = buildMergedChecklist(
          'fa18-carrier-ops',
          'F/A-18C Hornet',
          'Carrier Ops',
          source,
          checkedMap,
          cl => {
            const kind = classifyFa18Phase(cl.phase);
            return (kind === 'carrier' || kind === 'common') && !isLandingPhase(cl.phase);
          }
        );
        const fieldLanding = buildMergedChecklist(
          'fa18-field-landing',
          'F/A-18C Hornet',
          'Field Landing',
          source,
          checkedMap,
          cl => classifyFa18LandingPhase(cl.phase) === 'field'
        );
        const carrierLanding = buildMergedChecklist(
          'fa18-carrier-landing',
          'F/A-18C Hornet',
          'Carrier Landing',
          source,
          checkedMap,
          cl => classifyFa18LandingPhase(cl.phase) === 'carrier'
        );
        return [field, fieldLanding, carrier, carrierLanding].filter(entry => entry.checklist.items.length > 0);
      },
      activeMap(oldChecklist) {
        if (oldChecklist.id === 'fa18-field-landing' || oldChecklist.id === 'fa18-carrier-landing') {
          return oldChecklist.id;
        }
        if (isLandingPhase(oldChecklist.phase)) {
          return classifyFa18LandingPhase(oldChecklist.phase) === 'carrier'
            ? 'fa18-carrier-landing'
            : 'fa18-field-landing';
        }
        const kind = classifyFa18Phase(oldChecklist.phase);
        return kind === 'carrier' ? 'fa18-carrier-ops' : 'fa18-field-ops';
      },
    },
    'A-10C II': {
      ids: new Set(['a10c-all-ops', 'a10c-landing']),
      legacyIds: new Set(['a10c-all-ops']),
      build(source, checkedMap) {
        const allOps = buildMergedChecklist(
          'a10c-all-ops',
          'A-10C II',
          'Takeoff',
          source,
          checkedMap,
          cl => !isLandingPhase(cl.phase)
        );
        const landing = buildMergedChecklist(
          'a10c-landing',
          'A-10C II',
          'Landing',
          source,
          checkedMap,
          cl => isLandingPhase(cl.phase)
        );
        const landingWithFallback = ensureChecklistHasItems(landing, [
          { label: 'Landing Data', action: 'COMPUTE / REVIEW', warning: true },
          { label: 'Approach Setup', action: 'SET altimeter, anti-skid, lights' },
          { label: 'Gear / Flaps / Brakes', action: 'CHECK before touchdown', warning: true },
          { label: 'After Landing', action: 'MASTER ARM SAFE, clear runway', warning: true },
        ]);
        return [
          allOps,
          landingWithFallback,
        ].filter(entry => entry.checklist.items.length > 0);
      },
      activeMap(oldChecklist) {
        if (oldChecklist.id === 'a10c-landing') return 'a10c-landing';
        return isLandingPhase(oldChecklist.phase) ? 'a10c-landing' : 'a10c-all-ops';
      },
    },
    'F-16C Viper': {
      ids: new Set(['f16-all-ops', 'f16-landing']),
      legacyIds: new Set(['f16-all-ops']),
      build(source, checkedMap) {
        const allOps = buildMergedChecklist(
          'f16-all-ops',
          'F-16C Viper',
          'Takeoff',
          source,
          checkedMap,
          cl => !isLandingPhase(cl.phase)
        );
        const landing = buildMergedChecklist(
          'f16-landing',
          'F-16C Viper',
          'Landing',
          source,
          checkedMap,
          cl => isLandingPhase(cl.phase)
        );
        const landingWithFallback = ensureChecklistHasItems(landing, [
          { label: 'Recovery Setup', action: 'MASTER ARM SAFE, fuel check', warning: true },
          { label: 'Approach', action: 'Speed brakes / hook as required' },
          { label: 'Final', action: 'GEAR / FLAPS checked for landing', warning: true },
          { label: 'After Landing', action: 'CLEAR runway and safe aircraft' },
        ]);
        return [
          allOps,
          landingWithFallback,
        ].filter(entry => entry.checklist.items.length > 0);
      },
      activeMap(oldChecklist) {
        if (oldChecklist.id === 'f16-landing') return 'f16-landing';
        return isLandingPhase(oldChecklist.phase) ? 'f16-landing' : 'f16-all-ops';
      },
    },
  };

  const source = state.checklists || [];
  const checkedMap = state.checked || {};
  const grouped = {};
  Object.keys(targets).forEach(name => {
    grouped[name] = source.filter(cl => cl.aircraft === name);
  });

  const inserted = {};
  const rebuilt = [];
  const newChecked = {};
  let changed = false;

  source.forEach(cl => {
    const target = targets[cl.aircraft];
    if (!target) {
      rebuilt.push(cl);
      newChecked[cl.id] = checkedMap[cl.id] || new Set();
      return;
    }

    if (inserted[cl.aircraft]) {
      changed = true;
      return;
    }
    inserted[cl.aircraft] = true;

    const sourceForAircraft = grouped[cl.aircraft];
    const onlyAlreadyMerged = sourceForAircraft.length === target.ids.size
      && sourceForAircraft.every(item => target.ids.has(item.id));

    if (onlyAlreadyMerged) {
      sourceForAircraft.forEach(item => {
        rebuilt.push(item);
        newChecked[item.id] = checkedMap[item.id] || new Set();
      });
      return;
    }

    const shouldUseDefaults = sourceForAircraft.some(item => target.legacyIds && target.legacyIds.has(item.id));
    const sourceForMerge = shouldUseDefaults
      ? DEFAULT_CHECKLISTS.filter(item => item.aircraft === cl.aircraft)
      : sourceForAircraft;

    const mergedEntries = target.build(sourceForMerge, checkedMap);
    mergedEntries.forEach(entry => {
      rebuilt.push(entry.checklist);
      newChecked[entry.checklist.id] = entry.checked;
    });
    changed = true;
  });

  if (!changed) return false;

  const active = state.activeChecklist;
  if (active) {
    const activeChecklist = source.find(cl => cl.id === active);
    if (activeChecklist && targets[activeChecklist.aircraft]) {
      const target = targets[activeChecklist.aircraft];
      state.activeChecklist = target.activeMap(activeChecklist);
    }
  }

  state.checklists = rebuilt;
  state.checked = newChecked;
  return true;
}

function loadState() {
  const raw = localStorage.getItem('dcs-pilot-state');
  const defaultIds = new Set(DEFAULT_CHECKLISTS.map(checklist => checklist.id));

  if (raw) {
    const saved = JSON.parse(raw);
    const savedChecklists = saved.checklists || [];

    if (saved.defaultsVersion === DEFAULT_CHECKLISTS_VERSION) {
      state.checklists = savedChecklists;
    } else {
      const customChecklists = savedChecklists.filter(checklist => !defaultIds.has(checklist.id));
      state.checklists = JSON.parse(JSON.stringify([...DEFAULT_CHECKLISTS, ...customChecklists]));
    }

    state.checked = Object.fromEntries(
      Object.entries(saved.checked || {}).map(([k, v]) => [k, new Set(v)])
    );
    state.expandedAircraft = saved.expandedAircraft || null;
    state.checklistFilters = {
      type: (saved.checklistFilters && saved.checklistFilters.type) || 'all',
      aircraft: (saved.checklistFilters && saved.checklistFilters.aircraft) || 'all',
    };
    state.charts = saved.charts || [];
    state.manuals = saved.manuals || [];
    state.scratchPad = typeof saved.scratchPad === 'string' ? saved.scratchPad : '';
    const legacyCasForm = saved.casForm && typeof saved.casForm === 'object' ? saved.casForm : null;
    state.casForms = saved.casForms && typeof saved.casForms === 'object'
      ? saved.casForms
      : (legacyCasForm ? { 'cas-9line': legacyCasForm } : {});
    state.activeCasEntryIndexByForm = saved.activeCasEntryIndexByForm && typeof saved.activeCasEntryIndexByForm === 'object'
      ? saved.activeCasEntryIndexByForm
      : {};
    state.activeCasForm = saved.activeCasForm || 'cas-9line';
    normalizeCasFormsState();
    state.casReference = {
      page: Math.max(1, Number(saved.casReference && saved.casReference.page) || 1),
    };
    state.wab    = saved.wab    || { emptyWeight: 75562, emptyArm: 524.6, fuelWeight: 20000, fuelArm: 516.0, cargo: [] };
    state.wab.emptyWeight = WAB_EMPTY_WEIGHT_FIXED;
    const normalized = normalizeAircraftChecklistGroups();
    return saved.defaultsVersion !== DEFAULT_CHECKLISTS_VERSION || normalized;
  } else {
    state.checklists = JSON.parse(JSON.stringify(DEFAULT_CHECKLISTS));
    state.checked = {};
    state.expandedAircraft = null;
    state.checklistFilters = { type: 'all', aircraft: 'all' };
    state.scratchPad = '';
    state.casForms = {};
    state.activeCasForm = 'cas-9line';
    state.activeCasEntryIndexByForm = {};
    state.casReference = { page: 1 };
    state.wab     = { emptyWeight: 75562, emptyArm: 524.6, fuelWeight: 20000, fuelArm: 516.0, cargo: [] };
    state.wab.emptyWeight = WAB_EMPTY_WEIGHT_FIXED;
    normalizeAircraftChecklistGroups();
    return true;
  }
}

function getAircraftType(aircraftName) {
  const rotarySet = new Set(['AH-64D', 'UH-1H', 'Mi-8MTV2', 'Ka-50', 'OH-58D']);
  if (rotarySet.has(aircraftName)) return 'rotary';
  return 'fixed-wing';
}

function refreshChecklistAircraftFilterOptions() {
  const aircraftFilter = document.getElementById('checklist-aircraft-filter');
  const typeFilter = document.getElementById('checklist-type-filter');
  if (!aircraftFilter || !typeFilter) return;

  const selectedType = state.checklistFilters.type || 'all';
  const aircraftNames = Array.from(new Set(
    state.checklists
      .map(cl => cl.aircraft)
      .filter(name => selectedType === 'all' || getAircraftType(name) === selectedType)
  )).sort((a, b) => a.localeCompare(b));

  const currentAircraft = state.checklistFilters.aircraft || 'all';
  const aircraftOptions = ['<option value="all">All Aircraft</option>']
    .concat(aircraftNames.map(name => `<option value="${escHtml(name)}">${escHtml(name)}</option>`));
  aircraftFilter.innerHTML = aircraftOptions.join('');

  if (currentAircraft !== 'all' && aircraftNames.includes(currentAircraft)) {
    aircraftFilter.value = currentAircraft;
  } else {
    state.checklistFilters.aircraft = 'all';
    aircraftFilter.value = 'all';
  }

  typeFilter.value = selectedType;
}

function initChecklistFilters() {
  const typeFilter = document.getElementById('checklist-type-filter');
  const aircraftFilter = document.getElementById('checklist-aircraft-filter');
  if (!typeFilter || !aircraftFilter) return;

  refreshChecklistAircraftFilterOptions();

  typeFilter.addEventListener('change', () => {
    state.checklistFilters.type = typeFilter.value;
    state.checklistFilters.aircraft = 'all';
    refreshChecklistAircraftFilterOptions();
    saveState();
    renderSidebar();
    renderChecklistMain();
  });

  aircraftFilter.addEventListener('change', () => {
    state.checklistFilters.aircraft = aircraftFilter.value;
    saveState();
    renderSidebar();
    renderChecklistMain();
  });
}

/* ── Tab Switching ───────────────────────────────────── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`tab-${tab}`).classList.add('active');
  });
});

/* ══════════════════════════════════════════════════════
   CHECKLISTS
   ══════════════════════════════════════════════════════ */

function getChecked(id) {
  if (!state.checked[id]) state.checked[id] = new Set();
  return state.checked[id];
}

function renderSidebar() {
  const container = document.getElementById('aircraft-groups');
  refreshChecklistAircraftFilterOptions();

  const selectedType = state.checklistFilters.type || 'all';
  const selectedAircraft = state.checklistFilters.aircraft || 'all';

  const visibleChecklists = state.checklists.filter(cl => {
    if (selectedType !== 'all' && getAircraftType(cl.aircraft) !== selectedType) return false;
    if (selectedAircraft !== 'all' && cl.aircraft !== selectedAircraft) return false;
    return true;
  });

  // Prevent showing a checklist in the main panel when it is hidden by filters.
  if (state.activeChecklist && !visibleChecklists.some(cl => cl.id === state.activeChecklist)) {
    state.activeChecklist = null;
  }

  // Group by aircraft
  const groups = {};
  visibleChecklists.forEach(cl => {
    if (!groups[cl.aircraft]) groups[cl.aircraft] = [];
    groups[cl.aircraft].push(cl);
  });

  container.innerHTML = '';
  Object.entries(groups).forEach(([aircraft, checklists]) => {
    const group = document.createElement('div');
    // Only add 'open' class if this is the currently expanded aircraft
    group.className = 'aircraft-group' + (state.expandedAircraft === aircraft ? ' open' : '');

    const label = document.createElement('div');
    label.className = 'aircraft-label';
    label.innerHTML = `<span class="chevron">▶</span>${escHtml(aircraft)}`;
    label.addEventListener('click', () => {
      // Toggle: if already expanded, close it; otherwise expand it
      if (state.expandedAircraft === aircraft) {
        state.expandedAircraft = null;
      } else {
        state.expandedAircraft = aircraft;
      }
      saveState();
      renderSidebar();
    });

    const phaseList = document.createElement('div');
    phaseList.className = 'phase-list';

    checklists.forEach(cl => {
      const checked = getChecked(cl.id);
      const total = cl.items.length;
      const done = checked.size;
      const isComplete = total > 0 && done === total;

      const item = document.createElement('div');
      item.className = 'phase-item' +
        (state.activeChecklist === cl.id ? ' active' : '') +
        (isComplete ? ' completed' : '');
      item.dataset.id = cl.id;

      const dot = document.createElement('span');
      dot.className = 'phase-progress-dot' + (done === 0 ? '' : done === total ? ' done' : ' partial');

      item.innerHTML = `<span>${escHtml(cl.phase)}</span>`;
      item.appendChild(dot);
      item.addEventListener('click', () => {
        state.activeChecklist = cl.id;
        renderSidebar();
        renderChecklistMain();
      });
      phaseList.appendChild(item);
    });

    group.appendChild(label);
    group.appendChild(phaseList);
    container.appendChild(group);
  });
}

function renderChecklistMain() {
  const id = state.activeChecklist;
  const titleEl   = document.getElementById('active-checklist-title');
  const itemsEl   = document.getElementById('checklist-items');
  const progressEl = document.getElementById('checklist-progress');

  if (!id) {
    titleEl.textContent = 'Select a checklist';
    itemsEl.innerHTML = '<div class="empty-state"><p>Select a checklist from the left panel,<br/>or create a new one with ＋</p></div>';
    progressEl.style.display = 'none';
    return;
  }

  const cl = state.checklists.find(c => c.id === id);
  if (!cl) return;

  const checked = getChecked(id);
  titleEl.textContent = `${cl.aircraft} — ${cl.phase}`;

  itemsEl.innerHTML = '';
  cl.items.forEach((item, idx) => {
    const isChecked  = checked.has(idx);
    const isWarning  = item.warning;

    const el = document.createElement('div');
    el.className = 'checklist-item' +
      (isChecked ? ' checked' : '') +
      (isWarning ? ' warning' : '');

    el.innerHTML = `
      <span class="item-label">${escHtml(item.label)}</span>
      <span class="item-action">${escHtml(item.action)}</span>
    `;

    el.addEventListener('click', () => {
      if (checked.has(idx)) {
        checked.delete(idx);
      } else {
        checked.add(idx);
      }
      saveState();
      renderSidebar();
      renderChecklistMain();
    });

    itemsEl.appendChild(el);
  });

  progressEl.style.display = 'none';
}

/* Reset */
document.getElementById('reset-checklist-btn').addEventListener('click', () => {
  if (!state.activeChecklist) return;
  if (!confirm('Reset all checks for this checklist?')) return;
  state.checked[state.activeChecklist] = new Set();
  saveState();
  renderSidebar();
  renderChecklistMain();
});

/* Delete checklist */
document.getElementById('delete-checklist-btn').addEventListener('click', () => {
  if (!state.activeChecklist) return;
  const cl = state.checklists.find(c => c.id === state.activeChecklist);
  if (!cl) return;
  if (!confirm(`Delete "${cl.aircraft} — ${cl.phase}"?`)) return;
  state.checklists = state.checklists.filter(c => c.id !== state.activeChecklist);
  delete state.checked[state.activeChecklist];
  state.activeChecklist = null;
  saveState();
  renderSidebar();
  renderChecklistMain();
});

/* ── Add/Edit Checklist Modal ────────────────────────── */
const modal       = document.getElementById('checklist-modal');
const modalTitle  = document.getElementById('modal-title');
const modalAircraftType = document.getElementById('modal-aircraft-type');
const modalAircraftSelect = document.getElementById('modal-aircraft-select');
const modalAircraftCustomWrap = document.getElementById('modal-aircraft-custom-wrap');
const modalAircraftCustom = document.getElementById('modal-aircraft-custom');
const modalPhase  = document.getElementById('modal-phase');
const modalItems  = document.getElementById('modal-items');

const AIRCRAFT_BY_TYPE = {
  'fixed-wing': ['F/A-18C Hornet', 'F-16C Viper', 'A-10C II', 'C-130J', 'Custom...'],
  rotary: ['AH-64D', 'UH-1H', 'Mi-8MTV2', 'Ka-50', 'OH-58D', 'Custom...'],
};

function populateModalAircraftOptions(selectedAircraft = '') {
  const type = modalAircraftType.value || 'fixed-wing';
  const list = AIRCRAFT_BY_TYPE[type] || AIRCRAFT_BY_TYPE['fixed-wing'];
  modalAircraftSelect.innerHTML = list
    .map(name => `<option value="${escHtml(name)}">${escHtml(name)}</option>`)
    .join('');

  if (selectedAircraft && list.includes(selectedAircraft)) {
    modalAircraftSelect.value = selectedAircraft;
  } else if (selectedAircraft) {
    modalAircraftSelect.value = 'Custom...';
    modalAircraftCustom.value = selectedAircraft;
  } else {
    modalAircraftSelect.value = list[0];
    modalAircraftCustom.value = '';
  }

  const isCustom = modalAircraftSelect.value === 'Custom...';
  modalAircraftCustomWrap.style.display = isCustom ? 'flex' : 'none';
}

if (modalAircraftType && modalAircraftSelect) {
  modalAircraftType.addEventListener('change', () => populateModalAircraftOptions(''));
  modalAircraftSelect.addEventListener('change', () => {
    const isCustom = modalAircraftSelect.value === 'Custom...';
    modalAircraftCustomWrap.style.display = isCustom ? 'flex' : 'none';
    if (isCustom) {
      modalAircraftCustom.focus();
    }
  });
}

document.getElementById('add-checklist-btn').addEventListener('click', () => {
  modalTitle.textContent = 'New Checklist';
  modalAircraftType.value = 'fixed-wing';
  populateModalAircraftOptions('');
  modalPhase.value = '';
  modalItems.value = '';
  modal.style.display = 'flex';
  modalPhase.focus();
});

document.getElementById('modal-cancel').addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});

document.getElementById('modal-save').addEventListener('click', () => {
  const selectedAircraft = modalAircraftSelect.value;
  const aircraft = selectedAircraft === 'Custom...'
    ? modalAircraftCustom.value.trim()
    : selectedAircraft.trim();
  const phase    = modalPhase.value.trim();
  const rawItems = modalItems.value.trim();

  if (!aircraft || !phase) {
    alert('Aircraft and Phase are required.');
    return;
  }
  if (!rawItems) {
    alert('Add at least one checklist item.');
    return;
  }

  const items = rawItems.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => {
      const isWarning = line.startsWith('*');
      const clean     = isWarning ? line.slice(1).trim() : line;
      // split on ' — ' or ' - ' or last '...'
      const sep = clean.includes('—') ? '—' : clean.includes(' - ') ? '-' : null;
      if (sep) {
        const idx = clean.indexOf(sep);
        return {
          label: clean.slice(0, idx).trim(),
          action: clean.slice(idx + sep.length).trim(),
          warning: isWarning,
        };
      }
      return { label: clean, action: '', warning: isWarning };
    });

  const id = `custom-${Date.now()}`;
  state.checklists.push({ id, aircraft, phase, items });
  state.activeChecklist = id;
  saveState();
  renderSidebar();
  renderChecklistMain();
  modal.style.display = 'none';
});

/* ══════════════════════════════════════════════════════
   CHARTS
   ══════════════════════════════════════════════════════ */

function renderChartsList() {
  const list = document.getElementById('charts-list');
  list.innerHTML = '';

  if (state.charts.length === 0) {
    list.innerHTML = '<div style="padding:16px;font-size:0.85rem;color:var(--text-muted);text-align:center;">No charts yet</div>';
    return;
  }

  state.charts.forEach(chart => {
    const item = document.createElement('div');
    item.className = 'chart-item' + (state.activeChart === chart.id ? ' active' : '');
    item.innerHTML = `
      <span class="chart-icon">${chart.type === 'pdf' ? '📄' : '🗺️'}</span>
      <span class="chart-name">${escHtml(chart.name)}</span>
    `;
    item.addEventListener('click', () => {
      state.activeChart = chart.id;
      state.chartZoom = 1.0;
      renderChartsList();
      renderChartViewer();
    });
    list.appendChild(item);
  });
}

function renderChartViewer() {
  const viewer   = document.getElementById('chart-viewer');
  const titleEl  = document.getElementById('active-chart-title');

  if (!state.activeChart) {
    viewer.innerHTML = '<div class="empty-state"><p>Tap ＋ to add airport charts<br/>(images or PDFs)</p></div>';
    titleEl.textContent = 'Select a chart';
    return;
  }

  const chart = state.charts.find(c => c.id === state.activeChart);
  if (!chart) return;

  titleEl.textContent = chart.name;
  viewer.innerHTML = '';

  if (chart.type === 'pdf') {
    // On iPad Safari, PDFs render natively in an iframe
    const iframe = document.createElement('iframe');
    iframe.src = chart.dataUrl;
    iframe.title = chart.name;
    viewer.appendChild(iframe);
  } else {
    const img = document.createElement('img');
    img.src = chart.dataUrl;
    img.alt = chart.name;
    img.style.transform = `scale(${state.chartZoom})`;
    img.draggable = false;
    viewer.appendChild(img);
  }
}

function applyZoom(delta) {
  state.chartZoom = Math.min(6, Math.max(0.3, state.chartZoom + delta));
  const img = document.querySelector('#chart-viewer img');
  if (img) img.style.transform = `scale(${state.chartZoom})`;
}

document.getElementById('zoom-in-btn').addEventListener('click',    () => applyZoom(0.25));
document.getElementById('zoom-out-btn').addEventListener('click',   () => applyZoom(-0.25));
document.getElementById('zoom-reset-btn').addEventListener('click', () => { state.chartZoom = 1.0; applyZoom(0); });

document.getElementById('delete-chart-btn').addEventListener('click', () => {
  if (!state.activeChart) return;
  const chart = state.charts.find(c => c.id === state.activeChart);
  if (!confirm(`Delete chart "${chart.name}"?`)) return;
  state.charts = state.charts.filter(c => c.id !== state.activeChart);
  state.activeChart = null;
  saveState();
  renderChartsList();
  renderChartViewer();
});

/* File input */
document.getElementById('add-chart-input').addEventListener('change', async function () {
  const files = Array.from(this.files);
  for (const file of files) {
    const dataUrl = await readFileAsDataUrl(file);
    const type    = file.type === 'application/pdf' ? 'pdf' : 'image';
    state.charts.push({
      id: `chart-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: file.name.replace(/\.[^.]+$/, ''),
      type,
      dataUrl,
    });
  }
  this.value = ''; // allow re-selecting same file
  saveState();
  renderChartsList();
  if (!state.activeChart && state.charts.length > 0) {
    state.activeChart = state.charts[state.charts.length - 1].id;
    renderChartsList();
    renderChartViewer();
  }
});

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ── Pinch-to-zoom on chart image ────────────────────── */
(function setupPinch() {
  let lastDist = null;

  document.getElementById('chart-viewer').addEventListener('touchstart', e => {
    if (e.touches.length === 2) lastDist = pinchDist(e);
  }, { passive: true });

  document.getElementById('chart-viewer').addEventListener('touchmove', e => {
    if (e.touches.length === 2 && lastDist !== null) {
      const d = pinchDist(e);
      const delta = (d - lastDist) / 200;
      applyZoom(delta);
      lastDist = d;
    }
  }, { passive: true });

  document.getElementById('chart-viewer').addEventListener('touchend', () => {
    lastDist = null;
  }, { passive: true });

  function pinchDist(e) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }
})();

/* ══════════════════════════════════════════════════════
   MANUALS
   ══════════════════════════════════════════════════════ */

function renderManualsList() {
  const list = document.getElementById('manuals-list');
  list.innerHTML = '';

  if (state.manuals.length === 0) {
    list.innerHTML = '<div style="padding:16px;font-size:0.85rem;color:var(--text-muted);text-align:center;">No manuals yet</div>';
    return;
  }

  state.manuals.forEach(manual => {
    const item = document.createElement('div');
    item.className = 'chart-item' + (state.activeManual === manual.id ? ' active' : '');
    item.innerHTML = `
      <span class="chart-icon">${manual.type === 'pdf' ? '📄' : '🖼️'}</span>
      <span class="chart-name">${escHtml(manual.name)}</span>
    `;
    item.addEventListener('click', () => {
      state.activeManual = manual.id;
      state.manualZoom = 1.0;
      renderManualsList();
      renderManualViewer();
    });
    list.appendChild(item);
  });
}

function renderManualViewer() {
  const viewer  = document.getElementById('manual-viewer');
  const titleEl = document.getElementById('active-manual-title');

  if (!state.activeManual) {
    viewer.innerHTML = '<div class="empty-state"><p>Tap ＋ to add aircraft manuals<br/>(images or PDFs)</p></div>';
    titleEl.textContent = 'Select a manual';
    return;
  }

  const manual = state.manuals.find(m => m.id === state.activeManual);
  if (!manual) return;

  titleEl.textContent = manual.name;
  viewer.innerHTML = '';

  if (manual.type === 'pdf') {
    const iframe = document.createElement('iframe');
    iframe.src = manual.dataUrl;
    iframe.title = manual.name;
    viewer.appendChild(iframe);
  } else {
    const img = document.createElement('img');
    img.src = manual.dataUrl;
    img.alt = manual.name;
    img.style.transform = `scale(${state.manualZoom})`;
    img.draggable = false;
    viewer.appendChild(img);
  }
}

function applyManualZoom(delta) {
  state.manualZoom = Math.min(6, Math.max(0.3, state.manualZoom + delta));
  const img = document.querySelector('#manual-viewer img');
  if (img) img.style.transform = `scale(${state.manualZoom})`;
}

document.getElementById('manual-zoom-in-btn').addEventListener('click',    () => applyManualZoom(0.25));
document.getElementById('manual-zoom-out-btn').addEventListener('click',   () => applyManualZoom(-0.25));
document.getElementById('manual-zoom-reset-btn').addEventListener('click', () => { state.manualZoom = 1.0; applyManualZoom(0); });

document.getElementById('delete-manual-btn').addEventListener('click', () => {
  if (!state.activeManual) return;
  const manual = state.manuals.find(m => m.id === state.activeManual);
  if (!confirm(`Delete manual "${manual.name}"?`)) return;
  state.manuals = state.manuals.filter(m => m.id !== state.activeManual);
  state.activeManual = null;
  saveState();
  renderManualsList();
  renderManualViewer();
});

document.getElementById('add-manual-input').addEventListener('change', async function () {
  const files = Array.from(this.files);
  for (const file of files) {
    const dataUrl = await readFileAsDataUrl(file);
    const type    = file.type === 'application/pdf' ? 'pdf' : 'image';
    state.manuals.push({
      id: `manual-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: file.name.replace(/\.[^.]+$/, ''),
      type,
      dataUrl,
    });
  }
  this.value = '';
  saveState();
  renderManualsList();
  if (!state.activeManual && state.manuals.length > 0) {
    state.activeManual = state.manuals[state.manuals.length - 1].id;
    renderManualsList();
    renderManualViewer();
  }
});

/* ── Pinch-to-zoom on manual image ───────────────────── */
(function setupManualPinch() {
  let lastDist = null;

  document.getElementById('manual-viewer').addEventListener('touchstart', e => {
    if (e.touches.length === 2) lastDist = pinchDist(e);
  }, { passive: true });

  document.getElementById('manual-viewer').addEventListener('touchmove', e => {
    if (e.touches.length === 2 && lastDist !== null) {
      const d = pinchDist(e);
      const delta = (d - lastDist) / 200;
      applyManualZoom(delta);
      lastDist = d;
    }
  }, { passive: true });

  document.getElementById('manual-viewer').addEventListener('touchend', () => {
    lastDist = null;
  }, { passive: true });

  function pinchDist(e) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }
})();

/* ══════════════════════════════════════════════════════
   WEIGHT & BALANCE  (C-130J)
   ══════════════════════════════════════════════════════ */

const C130_MAC   = 164.5;   // Mean Aerodynamic Chord, inches
const C130_LEMAC = 507.5;   // Leading Edge of MAC, fuselage station
const WAB_EMPTY_WEIGHT_FIXED = 75562;
const WAB_FS_MIN = 335;
const WAB_FS_MAX = 1141;

const WAB_CARGO_TYPES = [
  // footprintIn uses [widthAcrossAircraft, lengthAlongAircraft] in inches
  { id: '463-pallet', name: '463 Pallet', image: 'assets/cargo-icons/463-PALLET-LbhAiKId.png', baseWeight: 10000, defaultWeight: 10000, footprintIn: [88, 108] },
  { id: 'ammo', name: 'Ammo', image: 'assets/cargo-icons/AMMO-Ji1Z0Sit.png', baseWeight: 4409, defaultWeight: 4409, footprintIn: [48, 48] },
  { id: 'barrel', name: 'Barrel', image: 'assets/cargo-icons/barrel-DwRCgZx4.png', baseWeight: 600, defaultWeight: 600, footprintIn: [24, 36] },
  { id: 'cds-barrels', name: 'CDS Barrels', image: 'assets/cargo-icons/CDS-BARRELS-BajLz1cm.png', baseWeight: 882, defaultWeight: 882, footprintIn: [48, 48] },
  { id: 'cds-crate', name: 'CDS Crate', image: 'assets/cargo-icons/CDS-CRATE-BQ-OS4b6.png', baseWeight: 882, defaultWeight: 882, footprintIn: [48, 48] },
  { id: 'container', name: 'Container', image: 'assets/cargo-icons/container-DBp3sN8E.png', baseWeight: 8818, defaultWeight: 8818, footprintIn: [96, 120] },
  { id: 'drop-vehicle', name: 'Drop Vehicle', image: 'assets/cargo-icons/drop_vehicle-DuvBo0nU.png', baseWeight: 12000, defaultWeight: 12000, footprintIn: [96, 180] },
  { id: 'f-shape-barrier', name: 'F-Shape Barrier', image: 'assets/cargo-icons/F-SHAPE-BARRIER-D7KDea8W.png', baseWeight: 3500, defaultWeight: 3500, footprintIn: [96, 72] },
  { id: 'gbu-43', name: 'GBU-43 Full', image: 'assets/cargo-icons/GBU-43-FULL-Db23YvA8.png', baseWeight: 21600, defaultWeight: 21600, footprintIn: [40, 280] },
  { id: 'iso-container', name: 'ISO Container', image: 'assets/cargo-icons/ISO-CONTAINER-DbMWZLr1.png', baseWeight: 22046, defaultWeight: 22046, footprintIn: [96, 240] },
  { id: 'iso-container-small', name: 'ISO Container Small', image: 'assets/cargo-icons/ISO-CONTAINER-SMALL-BNHF-FLo.png', baseWeight: 22046, defaultWeight: 22046, footprintIn: [96, 120] },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

const LOAD_SHEET_VIEWBOX = {
  width: 470.6323,
  height: 1081,
  centerX: 227.182,
  leftLaneX: 137.4839,
  rightLaneX: 316.9516,
  stationTopY: 150,
  stationBottomY: 750,
};

function getLoadSheetViewport(containerEl) {
  const cw = Math.max(1, containerEl.clientWidth || 0);
  const ch = Math.max(1, containerEl.clientHeight || 0);
  const imageRatio = LOAD_SHEET_VIEWBOX.width / LOAD_SHEET_VIEWBOX.height;
  const containerRatio = cw / ch;

  let renderWidth;
  let renderHeight;
  let offsetX;
  let offsetY;

  if (containerRatio > imageRatio) {
    renderHeight = ch;
    renderWidth = ch * imageRatio;
    offsetX = (cw - renderWidth) / 2;
    offsetY = 0;
  } else {
    renderWidth = cw;
    renderHeight = cw / imageRatio;
    offsetX = 0;
    offsetY = (ch - renderHeight) / 2;
  }

  const centerX = offsetX + (LOAD_SHEET_VIEWBOX.centerX / LOAD_SHEET_VIEWBOX.width) * renderWidth;
  const laneMinX = offsetX + (LOAD_SHEET_VIEWBOX.leftLaneX / LOAD_SHEET_VIEWBOX.width) * renderWidth;
  const laneMaxX = offsetX + (LOAD_SHEET_VIEWBOX.rightLaneX / LOAD_SHEET_VIEWBOX.width) * renderWidth;
  const stationTopY = offsetY + (LOAD_SHEET_VIEWBOX.stationTopY / LOAD_SHEET_VIEWBOX.height) * renderHeight;
  const stationBottomY = offsetY + (LOAD_SHEET_VIEWBOX.stationBottomY / LOAD_SHEET_VIEWBOX.height) * renderHeight;

  return {
    centerX,
    laneMinX,
    laneMaxX,
    stationTopY,
    stationBottomY,
    usableWidth: renderWidth,
    usableHeight: Math.max(1, stationBottomY - stationTopY),
  };
}

function getCargoPixelSize(type, viewport) {
  // Use the ARM station scale (left ruler) as the inches-to-pixels reference.
  const footprint = (type && type.footprintIn) ? type.footprintIn : [88, 108];
  const stationSpanIn = Math.max(1, WAB_FS_MAX - WAB_FS_MIN);
  const sizeScale = 2.025;
  const pxPerIn = (viewport.usableHeight / stationSpanIn) * sizeScale;
  const laneWidthPx = Math.max(1, viewport.laneMaxX - viewport.laneMinX);

  const widthPx = clamp(
    Math.round(footprint[0] * pxPerIn),
    20,
    Math.round(laneWidthPx * 1.00)
  );
  const heightPx = clamp(
    Math.round(footprint[1] * pxPerIn),
    20,
    Math.round(viewport.usableHeight * 1.00)
  );
  return { widthPx, heightPx };
}

function getCargoTypeById(typeId) {
  return WAB_CARGO_TYPES.find(type => type.id === typeId) || null;
}

function getCargoBaseWeight(type) {
  if (!type) return 0;
  return Math.max(0, Number(type.baseWeight ?? type.defaultWeight ?? 0));
}

function getCargoPayloadWeight(item, type) {
  const totalWeight = Math.max(0, Number(item && item.weight) || 0);
  return Math.max(0, totalWeight - getCargoBaseWeight(type));
}

function inferCargoType(name) {
  const text = String(name || '').toLowerCase();
  if (text.includes('463')) return getCargoTypeById('463-pallet');
  if (text.includes('ammo')) return getCargoTypeById('ammo');
  if (text.includes('barrel')) return getCargoTypeById('barrel');
  if (text.includes('cds') && text.includes('crate')) return getCargoTypeById('cds-crate');
  if (text.includes('cds') && text.includes('barrel')) return getCargoTypeById('cds-barrels');
  if (text.includes('vehicle')) return getCargoTypeById('drop-vehicle');
  if (text.includes('barrier')) return getCargoTypeById('f-shape-barrier');
  if (text.includes('gbu')) return getCargoTypeById('gbu-43');
  if (text.includes('iso') && text.includes('small')) return getCargoTypeById('iso-container-small');
  if (text.includes('iso') || text.includes('container')) return getCargoTypeById('iso-container');
  return WAB_CARGO_TYPES[0];
}

function normalizeCargoItem(item) {
  const type = getCargoTypeById(item.typeId) || inferCargoType(item.name);
  const baseWeight = getCargoBaseWeight(type);
  const parsedWeight = Number(item.weight);
  return {
    id: item.id || `cargo-${Date.now()}`,
    typeId: type ? type.id : '463-pallet',
    name: type ? type.name : (item.name || 'Cargo'),
    icon: type ? type.image : '',
    weight: Math.max(0, Number.isFinite(parsedWeight) ? parsedWeight : baseWeight),
    arm: clamp(Number(item.arm) || 515, WAB_FS_MIN, WAB_FS_MAX),
    lateral: clamp(Number(item.lateral) || 0, -1, 1),
  };
}

function fsToCgPct(fs) { return (fs - C130_LEMAC) / C130_MAC * 100; }

function getAftCgLimit(gw) {
  // Aft CG limit in % MAC — decreases linearly 34→32% between 130k and 155k lbs
  if (gw <= 130000) return 34;
  if (gw >= 155000) return 32;
  return 34 + (gw - 130000) / (155000 - 130000) * (32 - 34);
}

function getProjectedCgByWeight(gw) {
  const aftLimit = getAftCgLimit(gw);
  const projectedPct = (16 + aftLimit) / 2;
  const projectedFs = C130_LEMAC + (projectedPct / 100) * C130_MAC;
  return { projectedPct, projectedFs };
}

function calcWab() {
  const w = state.wab;
  let totalWeight = w.emptyWeight + w.fuelWeight;
  let totalMoment = w.emptyWeight * w.emptyArm + w.fuelWeight * w.fuelArm;
  w.cargo.forEach(item => {
    totalWeight += item.weight;
    totalMoment += item.weight * item.arm;
  });
  const cg_fs  = totalWeight > 0 ? totalMoment / totalWeight : C130_LEMAC;
  const cg_pct = fsToCgPct(cg_fs);
  return { totalWeight, totalMoment, cg_fs, cg_pct };
}

function isWithinWabLimits(gw, cgPct) {
  return cgPct >= 16 && cgPct <= getAftCgLimit(gw);
}

function renderWabSummary() {
  const { totalWeight, cg_fs, cg_pct } = calcWab();
  document.getElementById('wab-gw').textContent     = totalWeight.toLocaleString() + ' lbs';
  document.getElementById('wab-cg-pct').textContent = cg_pct.toFixed(1) + '%';
  document.getElementById('wab-cg-fs').textContent  = cg_fs.toFixed(1) + ' in';
  const projected = getProjectedCgByWeight(totalWeight);
  const projectedEl = document.getElementById('wab-projected-cg');
  if (projectedEl) {
    projectedEl.textContent = `${projected.projectedPct.toFixed(1)}% MAC (FS ${projected.projectedFs.toFixed(1)} in)`;
  }
  const statusEl = document.getElementById('wab-status');
  const within   = isWithinWabLimits(totalWeight, cg_pct);
  statusEl.className   = 'wab-status ' + (within ? 'ok' : 'out');
  statusEl.textContent = within ? '✓ WITHIN LIMITS' : '⚠ OUT OF LIMITS';
  updateWabStatus(totalWeight, cg_pct);
}

function renderCargoList() {
  const list = document.getElementById('wab-cargo-list');
  list.innerHTML = '';

  if (state.wab.cargo.length === 0) {
    list.innerHTML = '<div class="wab-empty">No cargo items. Select a cargo type and add one.</div>';
    renderCargoBay();
    return;
  }

  const header = document.createElement('div');
  header.className = 'wab-cargo-header';
  header.innerHTML = '<span>Type</span><span>Payload (lbs)</span><span>FS (in)</span><span>Mmt</span><span></span>';
  list.appendChild(header);

  state.wab.cargo.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = 'wab-cargo-row';
    const type = getCargoTypeById(item.typeId) || inferCargoType(item.name);
    const typeName = type ? type.name : item.name;
    const baseWeight = getCargoBaseWeight(type);
    const payloadWeight = getCargoPayloadWeight(item, type);
    const typeDisplay = payloadWeight > 0
      ? `${typeName} (+${payloadWeight.toLocaleString()} payload)`
      : `${typeName} (base ${baseWeight.toLocaleString()})`;
    row.innerHTML = `
      <span class="wab-cargo-type" title="Base ${baseWeight.toLocaleString()} lbs | Payload ${payloadWeight.toLocaleString()} lbs">${escHtml(typeDisplay)}</span>
      <input class="wab-cargo-num" type="number" value="${payloadWeight}" min="0" data-idx="${idx}" data-field="weight" title="Payload only (total = base + payload)" />
      <input class="wab-cargo-num" type="number" value="${item.arm.toFixed(1)}" step="0.1" min="0" data-idx="${idx}" data-field="arm" />
      <span class="wab-cargo-moment">${(item.weight * item.arm / 1000).toFixed(0)}k</span>
      <button class="wab-delete-btn" data-idx="${idx}" title="Remove">✕</button>
    `;
    list.appendChild(row);
  });

  renderCargoBay();
}

function addCargoItem(arm, cargoType, weight) {
  const type = cargoType || WAB_CARGO_TYPES[0];
  const baseWeight = getCargoBaseWeight(type);
  const parsedWeight = Number(weight);
  const finalWeight = Number.isFinite(parsedWeight)
    ? Math.max(baseWeight, parsedWeight)
    : baseWeight;
  state.wab.cargo.push({
    id: `cargo-${Date.now()}`,
    typeId: type.id,
    name: type.name,
    icon: type.image,
    weight: finalWeight,
    arm: arm || 515,
    lateral: 0,
  });
  saveState();
  renderCargoList();
  renderWabSummary();
  renderCargoBay();
}

function drawWabChart() {
  renderCargoBay();
}

function renderCargoBay() {
  const container = document.getElementById('wab-cargobay');
  if (!container) return;

  const itemsContainer = document.getElementById('wab-cargo-items');
  if (!itemsContainer) return;

  const viewport = getLoadSheetViewport(container);

  /* Map ARM (fuselage station) to pixel position */
  /* Load-sheet stations displayed from FS 357 (fwd) to FS 1141 (aft). */
  const FS_MIN = 357, FS_MAX = 1141;
  const armToY = (arm) => {
    const ratio = clamp((arm - FS_MIN) / (FS_MAX - FS_MIN), 0, 1);
    return viewport.stationTopY + ratio * viewport.usableHeight;
  };

  /* Update cargo items */
  itemsContainer.innerHTML = '';
  const { totalWeight, cg_fs, cg_pct } = calcWab();

  state.wab.cargo.forEach((item, idx) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'wab-cargo-item';
    itemEl.dataset.idx = idx;
    itemEl.dataset.arm = item.arm;
    const type = getCargoTypeById(item.typeId) || inferCargoType(item.name);
    const iconSrc = item.icon || (type ? type.image : '');
    const typeName = type ? type.name : item.name;
    const baseWeight = getCargoBaseWeight(type);
    const payloadWeight = getCargoPayloadWeight(item, type);
    const tileSize = getCargoPixelSize(type, viewport);

    const y = armToY(item.arm);
    const currentLateral = clamp(Number(item.lateral) || 0, -1, 1);
    const xPadding = tileSize.widthPx / 2 + 2;
    const minX = viewport.laneMinX + xPadding;
    const maxX = viewport.laneMaxX - xPadding;
    const xRange = Math.max(1, maxX - minX);
    const x = minX + ((currentLateral + 1) / 2) * xRange;
    itemEl.style.left = x + 'px';
    itemEl.style.top = y + 'px';
    itemEl.style.width = tileSize.widthPx + 'px';
    itemEl.style.height = tileSize.heightPx + 'px';
    itemEl.style.transform = 'translate(-50%, -50%)';
    itemEl.title = `${typeName} - Total ${item.weight.toLocaleString()} lbs | Base ${baseWeight.toLocaleString()} lbs | Payload ${payloadWeight.toLocaleString()} lbs @ FS${item.arm.toFixed(0)}`;

    itemEl.innerHTML = `
      ${iconSrc ? `<img class="wab-cargo-item-icon" src="${escHtml(iconSrc)}" alt="${escHtml(typeName)}" />` : ''}
      <span class="wab-cargo-item-label">${escHtml(typeName)}</span>
      <span class="wab-cargo-item-weight">${item.weight} lbs @ FS${item.arm.toFixed(0)}</span>
    `;

    itemEl.addEventListener('pointerdown', (e) => startDrag(e, idx, FS_MIN, FS_MAX));
    itemsContainer.appendChild(itemEl);
  });

  /* Update CG indicator */
  if (totalWeight > 0) {
    const cgIndicator = document.getElementById('wab-cg-indicator');
    const cgY = armToY(cg_fs);
    cgIndicator.style.left = viewport.centerX + 'px';
    cgIndicator.style.top = cgY + 'px';

    const within = isWithinWabLimits(totalWeight, cg_pct);
    cgIndicator.className = 'wab-cg-indicator' + (within ? '' : ' out-of-limits');

    const label = cgIndicator.querySelector('.wab-cg-label');
    if (label) {
      label.textContent = `CG: ${cg_pct.toFixed(1)}% / ${(totalWeight / 1000).toFixed(0)}k`;
    }
  }

  /* Update status line */
  updateWabStatus(totalWeight, cg_pct);
}

function updateWabStatus(totalWeight, cg_pct) {
  const statusEl = document.getElementById('wab-cg-status');
  if (!statusEl) return;
  const { cg_fs } = calcWab();
  statusEl.textContent = `Gross Weight: ${totalWeight.toLocaleString()} lbs | CG: ${cg_pct.toFixed(1)}% MAC | FS: ${cg_fs.toFixed(1)} in`;
}

let draggedItem = null;
let dragPointerOffsetX = 0;
let dragPointerOffsetY = 0;

function startDrag(e, idx, FS_MIN, FS_MAX) {
  if (e.button !== 0) return; /* left-click only */
  draggedItem = idx;

  const itemEl = e.target.closest('.wab-cargo-item');
  itemEl.classList.add('dragging');

  const itemRect = itemEl.getBoundingClientRect();
  const itemCenterX = itemRect.left + itemRect.width / 2;
  const itemCenterY = itemRect.top + itemRect.height / 2;
  dragPointerOffsetX = e.clientX - itemCenterX;
  dragPointerOffsetY = e.clientY - itemCenterY;

  function onMove(moveE) {
    if (draggedItem === null) return;
    const container = document.getElementById('wab-cargobay');
    const containerRect = container.getBoundingClientRect();
    const viewport = getLoadSheetViewport(container);

    /* Recalculate bounds in case of resize during drag */
    const item = state.wab.cargo[idx];
    const type = getCargoTypeById(item.typeId) || inferCargoType(item.name);
    const tileSize = getCargoPixelSize(type, viewport);
    const minX = viewport.laneMinX + tileSize.widthPx / 2 + 2;
    const maxX = viewport.laneMaxX - tileSize.widthPx / 2 - 2;
    const xRange = Math.max(1, maxX - minX);

    const stationTop = viewport.stationTopY;
    const stationBottom = viewport.stationBottomY;
    const stationHeight = Math.max(1, stationBottom - stationTop);
    let newX = moveE.clientX - containerRect.left - dragPointerOffsetX;
    let newY = moveE.clientY - containerRect.top - dragPointerOffsetY;

    /* Clamp to lane bounds */
    newX = Math.max(minX, Math.min(newX, maxX));

    /* Clamp to station bounds */
    newY = Math.max(stationTop, Math.min(newY, stationBottom));

    /* Convert horizontal position back to lateral offset (-1 left, +1 right) */
    const xRatio = (newX - minX) / xRange;
    state.wab.cargo[idx].lateral = clamp(xRatio * 2 - 1, -1, 1);

    /* Convert vertical pixel position back to ARM */
    const ratio = (newY - stationTop) / stationHeight;
    const newArm = FS_MIN + ratio * (FS_MAX - FS_MIN);
    state.wab.cargo[idx].arm = Math.max(FS_MIN, Math.min(FS_MAX, newArm));

    saveState();
    renderCargoBay();
  }

  function onEnd() {
    if (draggedItem !== null) {
      const item = document.querySelector(`.wab-cargo-item[data-idx="${draggedItem}"]`);
      if (item) item.classList.remove('dragging');
      draggedItem = null;
    }
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup', onEnd);
  }

  document.addEventListener('pointermove', onMove);
  document.addEventListener('pointerup', onEnd);
}

function initWab() {
  const w = state.wab;
  state.wab.emptyWeight = WAB_EMPTY_WEIGHT_FIXED;
  state.wab.cargo = (state.wab.cargo || []).map(normalizeCargoItem);
  document.getElementById('wab-empty-weight').value = WAB_EMPTY_WEIGHT_FIXED;
  document.getElementById('wab-empty-weight').readOnly = true;
  document.getElementById('wab-empty-arm').value    = w.emptyArm;
  document.getElementById('wab-fuel-weight').value  = w.fuelWeight;
  document.getElementById('wab-fuel-arm').value     = w.fuelArm;

  /* aircraft & fuel inputs */
  ['wab-empty-arm','wab-fuel-weight','wab-fuel-arm'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
      state.wab.emptyWeight = WAB_EMPTY_WEIGHT_FIXED;
      state.wab.emptyArm    = parseFloat(document.getElementById('wab-empty-arm').value)    || 0;
      state.wab.fuelWeight  = parseFloat(document.getElementById('wab-fuel-weight').value)  || 0;
      state.wab.fuelArm     = parseFloat(document.getElementById('wab-fuel-arm').value)     || 0;
      saveState(); renderWabSummary(); drawWabChart();
    });
  });

  const typeSelect = document.getElementById('wab-cargo-type-select');
  const weightInput = document.getElementById('wab-cargo-weight-input');
  if (typeSelect) {
    typeSelect.innerHTML = '<option value="">-- Select Cargo Type --</option>';
    WAB_CARGO_TYPES.forEach(type => {
      const option = document.createElement('option');
      option.value = type.id;
      option.textContent = type.name;
      typeSelect.appendChild(option);
    });
    typeSelect.addEventListener('change', () => {
      const selected = getCargoTypeById(typeSelect.value);
      if (selected && weightInput) {
        weightInput.value = '0';
      }
    });
  }
  if (weightInput) {
    weightInput.placeholder = 'Payload (lbs)';
  }

  /* add cargo from selected type */
  document.getElementById('wab-add-cargo-btn').addEventListener('click', () => {
    const selectedType = getCargoTypeById(typeSelect ? typeSelect.value : '');
    if (!selectedType) {
      alert('Please select a cargo type');
      return;
    }
    const baseWeight = getCargoBaseWeight(selectedType);
    const parsedPayload = parseFloat(weightInput.value);
    const payloadWeight = Number.isFinite(parsedPayload)
      ? Math.max(0, parsedPayload)
      : 0;
    const totalWeight = baseWeight + payloadWeight;
    addCargoItem(515, selectedType, totalWeight);
    if (typeSelect) typeSelect.value = '';
    if (weightInput) weightInput.value = '';
  });

  /* cargo list — event delegation (set up once; persists through innerHTML resets) */
  const cargoList = document.getElementById('wab-cargo-list');

  cargoList.addEventListener('input', e => {
    const input = e.target.closest('input[data-idx]');
    if (!input) return;
    const idx = parseInt(input.dataset.idx, 10);
    if (isNaN(idx) || !state.wab.cargo[idx]) return;
    const field = input.dataset.field;
    if (field === 'weight') {
      const type = getCargoTypeById(state.wab.cargo[idx].typeId) || inferCargoType(state.wab.cargo[idx].name);
      const baseWeight = getCargoBaseWeight(type);
      const payloadWeight = Math.max(0, parseFloat(input.value) || 0);
      state.wab.cargo[idx].weight = baseWeight + payloadWeight;
    }
    if (field === 'arm')    state.wab.cargo[idx].arm    = clamp(parseFloat(input.value) || 0, WAB_FS_MIN, WAB_FS_MAX);
    /* update moment display inline */
    const row = input.closest('.wab-cargo-row');
    if (row) {
      const momentEl = row.querySelector('.wab-cargo-moment');
      if (momentEl) {
        const item = state.wab.cargo[idx];
        momentEl.textContent = (item.weight * item.arm / 1000).toFixed(0) + 'k';
      }
    }
    saveState(); renderWabSummary(); drawWabChart();
  });

  cargoList.addEventListener('click', e => {
    const btn = e.target.closest('.wab-delete-btn');
    if (!btn) return;
    const idx = parseInt(btn.dataset.idx, 10);
    if (isNaN(idx)) return;
    state.wab.cargo.splice(idx, 1);
    saveState(); renderCargoList(); renderWabSummary(); drawWabChart();
  });

  /* redraw chart each time W&B tab becomes visible */
  document.querySelector('[data-tab="wab"]').addEventListener('click', () => {
    requestAnimationFrame(() => {
      renderCargoBay();
      renderWabSummary();
    });
  });

  /* redraw on window resize while W&B tab is active */
  window.addEventListener('resize', () => {
    if (document.getElementById('tab-wab').classList.contains('active'))
      requestAnimationFrame(renderCargoBay);
  });

  renderCargoList();
  renderWabSummary();
  renderCargoBay();
}

function initScratchPad() {
  const textEl = document.getElementById('scratchpad-text');
  const clearBtn = document.getElementById('scratchpad-clear-btn');
  if (!textEl || !clearBtn) return;

  textEl.value = state.scratchPad || '';

  let saveTimer = null;
  textEl.addEventListener('input', () => {
    state.scratchPad = textEl.value;
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveState();
      saveTimer = null;
    }, 200);
  });

  clearBtn.addEventListener('click', () => {
    if (!state.scratchPad.trim()) return;
    if (!confirm('Clear scratch pad notes?')) return;
    state.scratchPad = '';
    textEl.value = '';
    saveState();
  });
}

function initCasSectionTabs() {
  const buttons = Array.from(document.querySelectorAll('[data-cas-section-tab]'));
  const panes = Array.from(document.querySelectorAll('[data-cas-section]'));
  if (!buttons.length || !panes.length) return;

  function showSection(section) {
    buttons.forEach(btn => {
      const active = btn.dataset.casSectionTab === section;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    panes.forEach(pane => {
      const active = pane.dataset.casSection === section;
      pane.classList.toggle('active', active);
      pane.hidden = !active;
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      showSection(btn.dataset.casSectionTab);
    });
  });

  showSection('forms');
}

const CAS_FORM_TEMPLATES = [
  {
    id: 'cas-checkin',
    name: 'Check-In',
    rows: [
      { line: 'C/S', fields: [{ key: 'check_in_line', label: 'Check-In Line', placeholder: 'Aircraft ____, this is ____ (e.g. "Heartless 52, this is Rumble 31")' }] },
      { line: '1', fields: [{ key: 'mission_number', label: 'Mission Number', placeholder: 'ATO assigned mission number' }] },
      { line: '2', fields: [{ key: 'number_type_aircraft', label: 'Number and Type of Aircraft', placeholder: 'e.g. 2 by F/A-18C' }] },
      { line: '3', fields: [{ key: 'position_altitude', label: 'Position and Altitude', placeholder: 'e.g. 20 nm north, block 20-21' }] },
      { line: '4', fields: [{ key: 'ordnance', label: 'Ordnance', placeholder: 'Rounds, bombs, rockets, fuzing' }] },
      { line: '5', fields: [{ key: 'playtime_time_on_station', label: 'Playtime or Time on Station', placeholder: 'e.g. 25 minutes on station' }] },
      { line: '6', fields: [{ key: 'capabilities', type: 'textarea', rows: 4, label: 'Capabilities', placeholder: 'FAC(A), sensors, Link-16, VDL, SITREP, UAS lost-link route' }] },
      { line: '7', fields: [{ key: 'abort_code', label: 'Abort Code', placeholder: 'e.g. Abort code none' }] },
    ],
  },
  {
    id: 'cas-callforfire',
    name: 'Call for Fire',
    rows: [
      { line: '1', fields: [{ key: 'observer_id', label: 'Observer / Warning Order', placeholder: 'Observer ID + warning order' }] },
      { line: '2', fields: [{ key: 'target_location', label: 'Target Location', placeholder: 'Grid / polar / shift' }] },
      { line: '3', fields: [{ key: 'target_description', label: 'Target Description', placeholder: 'Target description' }] },
      { line: '4', fields: [{ key: 'method_of_engagement', label: 'Method of Engagement', placeholder: 'Ammo / trajectory / control' }] },
      { line: '5', fields: [{ key: 'method_of_fire_control', label: 'Method of Fire and Control', placeholder: 'At my command / TOT / etc.' }] },
      { line: 'R', fields: [{ key: 'remarks', type: 'textarea', rows: 4, label: 'Remarks', placeholder: 'Additional instructions' }] },
    ],
  },
  {
    id: 'cas-5line',
    name: '5-Line',
    rows: [
      { line: '1', fields: [{ key: 'friendly_location', label: 'Friendly Location / Mark', placeholder: 'Location and mark' }] },
      { line: '2', fields: [{ key: 'target_location', label: 'Target Location', placeholder: 'Grid / coordinates' }] },
      { line: '3', fields: [{ key: 'target_description', label: 'Target Description', placeholder: 'Target description / activity' }] },
      { line: '4', fields: [{ key: 'final_attack_heading', label: 'Final Attack Heading', placeholder: 'Attack heading restrictions' }] },
      { line: '5', readback: true, fields: [{ key: 'remarks', type: 'textarea', rows: 4, label: 'Remarks / Restrictions', placeholder: 'Egress, friendlies, restrictions' }] },
    ],
  },
  {
    id: 'cas-9line',
    name: '9-Line',
    rows: [
      { line: '1', fields: [{ key: 'line1_ipbp', label: 'IP / BP', placeholder: 'Enter IP/BP' }] },
      { line: '2', fields: [
        { key: 'line2_heading', label: 'Heading', placeholder: 'Heading' },
        { key: 'line2_offset', label: 'Offset', placeholder: 'Offset' },
        { key: 'line2_direction', label: 'Direction', placeholder: 'L / R' },
      ] },
      { line: '3', fields: [{ key: 'line3_distance', label: 'Distance', placeholder: 'Distance' }] },
      { line: '4', readback: true, fields: [{ key: 'line4_target_elevation', label: 'Target Elevation', placeholder: 'Target elevation' }] },
      { line: '5', fields: [{ key: 'line5_target_description', label: 'Target Description', placeholder: 'Target description' }] },
      { line: '6', readback: true, fields: [{ key: 'line6_target_location', label: 'Target Location', placeholder: 'Grid / coordinates' }] },
      { line: '7', fields: [
        { key: 'line7_mark_type', label: 'Mark Type', placeholder: 'Laser / smoke / none' },
        { key: 'line7_mark_code', label: 'Code / Remark', placeholder: '1688 / details' },
      ] },
      { line: '8', fields: [{ key: 'line8_friendlies', label: 'Friendlies', placeholder: 'Friendlies' }] },
      { line: '9', fields: [{ key: 'line9_egress', label: 'Egress', placeholder: 'Egress' }] },
      { line: 'R', readback: true, fields: [{ key: 'remarks', type: 'textarea', rows: 4, label: 'Remarks / Restrictions', placeholder: 'Type remarks or restrictions' }] },
    ],
  },
  {
    id: 'cas-medevac-9line',
    name: 'MEDEVAC 9-Line',
    rows: [
      { line: '1', fields: [{ key: 'medevac_line1_location', label: 'Location of Pickup Site', placeholder: 'Grid or coordinate' }] },
      { line: '2', fields: [{ key: 'medevac_line2_callsign_freq', label: 'Radio Freq, Call Sign, Suffix', placeholder: 'Primary contact details' }] },
      { line: '3', fields: [{ key: 'medevac_line3_precedence', label: 'Number of Patients by Precedence', placeholder: 'Urgent / Priority / Routine' }] },
      { line: '4', fields: [{ key: 'medevac_line4_equipment', label: 'Special Equipment Required', placeholder: 'None / Hoist / Extraction / Ventilator' }] },
      { line: '5', fields: [{ key: 'medevac_line5_type', label: 'Number of Patients by Type', placeholder: 'Litter / Ambulatory' }] },
      { line: '6', fields: [{ key: 'medevac_line6_security', label: 'Security of Pickup Site', placeholder: 'No enemy / Possible enemy / Enemy in area' }] },
      { line: '7', fields: [{ key: 'medevac_line7_marking', label: 'Method of Marking Pickup Site', placeholder: 'Panel / Smoke / IR / Strobe' }] },
      { line: '8', fields: [{ key: 'medevac_line8_nationality', label: 'Patient Nationality and Status', placeholder: 'US Military / Civilian / EPW' }] },
      { line: '9', fields: [{ key: 'medevac_line9_terrain_nbc', label: 'NBC / Terrain Description', placeholder: 'NBC contamination or terrain hazards' }] },
    ],
  },
];

const CAS_REMARKS_RESTRICTIONS = {
  'cas-checkin': [
    { title: 'Airspace', text: 'Stack, altitude blocks, and deconfliction method.' },
    { title: 'Sensor Plan', text: 'Primary sensor, mark type, and talk-on method.' },
    { title: 'Comms', text: 'Primary and alternate frequencies and authentication.' },
    { title: 'Threats', text: 'Known AAA/SAM threats and no-fly sectors.' },
  ],
  'cas-callforfire': [
    { title: 'Observer Control', text: 'At my command / TOT / TTB control method.' },
    { title: 'Fire Support Coordination', text: 'CFL, RFL, and restricted-fire areas in effect.' },
    { title: 'Friendly Safety', text: 'Danger-close status and required clearance initials.' },
    { title: 'Shift/Polar Data', text: 'Direction, distance, and observer corrections.' },
  ],
  'cas-5line': [
    { title: 'Readback *', text: 'Restrictions on line 5 are mandatory readback per the reference card.', readback: true },
    { title: 'Final Attack Heading', text: 'State left/right limits or cardinal sector.' },
    { title: 'Friendly Location', text: 'Nearest friendlies with cardinal and distance.' },
    { title: 'Mark / Correlation', text: 'How target is marked and who sees the mark.' },
    { title: 'Egress', text: 'Egress heading/point and rejoin instructions.' },
  ],
  'cas-9line': [
    { title: 'Readback *', text: 'Lines 4 and 6, plus any restrictions, are mandatory readbacks per the reference card.', readback: true },
    { title: 'Restrictions', text: 'Final attack heading, altitude block, and no-fire sectors.', readback: true },
    { title: 'Danger Close', text: 'Include danger-close call and required initials if applicable.' },
    { title: 'Type Control', text: 'Type 1/2/3 control and clearance format.' },
    { title: 'Mark', text: 'Laser code, mark type, and correlation requirements.' },
    { title: 'Abort', text: 'Abort code words and termination criteria.' },
    { title: 'Egress', text: 'Egress direction, altitude, and re-attack instructions.' },
  ],
  'cas-medevac-9line': [
    { title: 'Line 1', text: 'Give accurate pickup site location and confirm format.' },
    { title: 'Line 3', text: 'State patient precedence clearly for triage priority.' },
    { title: 'Line 5', text: 'Break out litter and ambulatory totals.' },
    { title: 'Line 6-9', text: 'Pass security, marking, nationality, and hazards concisely.' },
  ],
};

function getCasTemplate(formId) {
  return CAS_FORM_TEMPLATES.find(t => t.id === formId) || CAS_FORM_TEMPLATES[0];
}

function normalizeCasFormsState() {
  if (!state.casForms || typeof state.casForms !== 'object') {
    state.casForms = {};
  }
  if (!state.activeCasEntryIndexByForm || typeof state.activeCasEntryIndexByForm !== 'object') {
    state.activeCasEntryIndexByForm = {};
  }

  CAS_FORM_TEMPLATES.forEach(template => {
    const existing = state.casForms[template.id];
    if (Array.isArray(existing)) {
      state.casForms[template.id] = existing.length ? existing : [{}];
    } else if (existing && typeof existing === 'object') {
      state.casForms[template.id] = [existing];
    } else {
      state.casForms[template.id] = [{}];
    }

    const entries = state.casForms[template.id];
    const rawIdx = Number(state.activeCasEntryIndexByForm[template.id]);
    const idx = Number.isInteger(rawIdx) ? rawIdx : 0;
    state.activeCasEntryIndexByForm[template.id] = Math.max(0, Math.min(idx, entries.length - 1));
  });
}

function ensureActiveCasFormState() {
  const template = getCasTemplate(state.activeCasForm);
  normalizeCasFormsState();
  const entries = state.casForms[template.id];
  let entryIndex = Number(state.activeCasEntryIndexByForm[template.id]);
  if (!Number.isInteger(entryIndex) || entryIndex < 0 || entryIndex >= entries.length) {
    entryIndex = 0;
    state.activeCasEntryIndexByForm[template.id] = 0;
  }
  return { template, entries, entryIndex, values: entries[entryIndex] };
}

function renderCasFormHtml(template, values) {
  return template.rows.map(row => {
    let rowClass = 'cas-line';
    if (row.fields.length === 2) rowClass += ' cas-line-grid-2';
    if (row.fields.length === 3) rowClass += ' cas-line-grid-3';
    if (row.readback) rowClass += ' cas-line-readback';

    const fieldsHtml = row.fields.map(field => {
      const value = values[field.key] || '';
      const labelText = `${field.label}${row.readback ? ' *' : ''}`;
      if (field.type === 'textarea') {
        return `<label>${escHtml(labelText)}<textarea data-cas-field="${escHtml(field.key)}" rows="${field.rows || 4}" placeholder="${escHtml(field.placeholder || '')}">${escHtml(value)}</textarea></label>`;
      }
      return `<label>${escHtml(labelText)}<input type="text" data-cas-field="${escHtml(field.key)}" value="${escHtml(value)}" placeholder="${escHtml(field.placeholder || '')}" /></label>`;
    }).join('');

    const lineNo = row.readback ? `${row.line} *` : row.line;
    return `<div class="${rowClass}"><span class="cas-line-no">${escHtml(lineNo)}</span>${fieldsHtml}</div>`;
  }).join('');
}

function renderCasRemarksRestrictions(formId) {
  const listEl = document.getElementById('cas-rr-list');
  if (!listEl) return;

  const items = CAS_REMARKS_RESTRICTIONS[formId] || CAS_REMARKS_RESTRICTIONS['cas-9line'];
  listEl.innerHTML = items.map(item => (
    `<div class="cas-rr-item${item.readback ? ' cas-rr-item-readback' : ''}"><div class="cas-rr-title">${escHtml(item.title)}</div><div class="cas-rr-text">${escHtml(item.text)}</div></div>`
  )).join('');
}

function initCasForm() {
  const form = document.getElementById('cas-form');
  const clearBtn = document.getElementById('cas-clear-btn');
  const formSelect = document.getElementById('cas-form-select');
  const entrySelect = document.getElementById('cas-entry-select');
  const addCallBtn = document.getElementById('cas-add-call-btn');
  const deleteCallBtn = document.getElementById('cas-delete-call-btn');
  if (!form || !clearBtn || !formSelect || !entrySelect || !addCallBtn || !deleteCallBtn) return;

  const casFormOrder = ['cas-9line', 'cas-medevac-9line', 'cas-checkin', 'cas-5line', 'cas-callforfire'];
  const sortedCasTemplates = [...CAS_FORM_TEMPLATES].sort((a, b) => {
    const ai = casFormOrder.indexOf(a.id);
    const bi = casFormOrder.indexOf(b.id);
    const av = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
    const bv = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;
    return av - bv;
  });

  formSelect.innerHTML = sortedCasTemplates
    .map(t => `<option value="${escHtml(t.id)}">${escHtml(t.name)}</option>`)
    .join('');

  if (!CAS_FORM_TEMPLATES.some(t => t.id === state.activeCasForm)) {
    state.activeCasForm = CAS_FORM_TEMPLATES[0].id;
  }

  function bindFieldListeners(values) {
    const fields = Array.from(form.querySelectorAll('[data-cas-field]'));
    fields.forEach(field => {
      const key = field.dataset.casField;
      field.addEventListener('input', () => {
        values[key] = field.value;
        saveState();
      });
    });
    return fields;
  }

  let currentFields = [];

  function renderActiveForm() {
    const { template, entries, entryIndex, values } = ensureActiveCasFormState();
    formSelect.value = template.id;
    entrySelect.innerHTML = entries
      .map((_, i) => `<option value="${i}">Call ${i + 1}</option>`)
      .join('');
    entrySelect.value = String(entryIndex);
    deleteCallBtn.disabled = entries.length <= 1;
    form.innerHTML = renderCasFormHtml(template, values);
    currentFields = bindFieldListeners(values);
    renderCasRemarksRestrictions(template.id);
    saveState();
  }

  formSelect.addEventListener('change', () => {
    state.activeCasForm = formSelect.value;
    renderActiveForm();
  });

  entrySelect.addEventListener('change', () => {
    const formId = state.activeCasForm;
    normalizeCasFormsState();
    const entries = state.casForms[formId] || [{}];
    const requested = Number(entrySelect.value);
    const next = Number.isInteger(requested) ? requested : 0;
    state.activeCasEntryIndexByForm[formId] = Math.max(0, Math.min(next, entries.length - 1));
    renderActiveForm();
  });

  addCallBtn.addEventListener('click', () => {
    const { template, entries } = ensureActiveCasFormState();
    entries.push({});
    state.activeCasEntryIndexByForm[template.id] = entries.length - 1;
    renderActiveForm();
  });

  deleteCallBtn.addEventListener('click', () => {
    const { template, entries, entryIndex } = ensureActiveCasFormState();
    if (entries.length <= 1) return;
    if (!confirm(`Delete Call ${entryIndex + 1}?`)) return;
    entries.splice(entryIndex, 1);
    state.casForms[template.id] = entries;
    state.activeCasEntryIndexByForm[template.id] = Math.max(0, Math.min(entryIndex, entries.length - 1));
    renderActiveForm();
  });

  clearBtn.addEventListener('click', () => {
    const hasValue = currentFields.some(field => String(field.value || '').trim().length > 0);
    if (!hasValue) return;
    if (!confirm('Clear current CAS call?')) return;
    const { template, entries, entryIndex } = ensureActiveCasFormState();
    entries[entryIndex] = {};
    state.casForms[template.id] = entries;
    renderActiveForm();
  });

  renderActiveForm();
}

const CAS_REFERENCE_PDF = 'assets/jPub reference cards printable.pdf';
const CAS_REFERENCE_SCAN_DIR = 'assets/cas_pdf_pages';
const CAS_REFERENCE_SCAN_MAX_PAGES = 30;
let casReferencePageCount = 1;
let casReferenceSource = 'pdf';
let casReferenceScanPages = [];

function setCasReferenceStatus(message, isError) {
  const statusEl = document.getElementById('cas-reference-status');
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.classList.toggle('error', !!isError);
}

async function detectCasReferencePageCount(url) {
  const response = await fetch(encodeURI(url), { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('CAS reference PDF not found.');
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  let text = '';
  for (let i = 0; i < bytes.length; i += 8192) {
    text += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + 8192, bytes.length)));
  }

  const matches = Array.from(text.matchAll(/\/Count\s+(\d+)/g));
  if (!matches.length) return 1;

  return matches.reduce((max, m) => {
    const n = Number(m[1]);
    return Number.isFinite(n) ? Math.max(max, n) : max;
  }, 1);
}

async function detectCasScannedPages() {
  const pages = [];

  for (let i = 1; i <= CAS_REFERENCE_SCAN_MAX_PAGES; i += 1) {
    const path = `${CAS_REFERENCE_SCAN_DIR}/page_${i}.png`;
    const exists = await new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = `${encodeURI(path)}?t=${Date.now()}`;
    });

    if (exists) {
      pages.push(path);
      continue;
    }

    // Stop on first missing page once at least one page was found.
    if (pages.length > 0) break;
  }

  return pages;
}

function renderCasReferencePdf(page) {
  const viewer = document.getElementById('cas-doc-viewer');
  if (!viewer) return;
  viewer.src = `${encodeURI(CAS_REFERENCE_PDF)}#page=${page}&view=FitH`;
}

function renderCasReferenceScannedPage(page) {
  const viewer = document.getElementById('cas-doc-viewer');
  if (!viewer) return;
  const src = casReferenceScanPages[page - 1];
  if (!src) return;
  viewer.src = encodeURI(src);
}

function openCasReferenceFallback() {
  const page = Math.max(1, Math.min(casReferencePageCount, Number(state.casReference.page) || 1));
  if (casReferenceSource === 'scan') {
    const src = casReferenceScanPages[page - 1];
    if (src) {
      window.open(encodeURI(src), '_blank', 'noopener');
    }
    return;
  }
  window.open(`${encodeURI(CAS_REFERENCE_PDF)}#page=${page}&view=FitH`, '_blank', 'noopener');
}

function toggleCasReferenceFullscreen() {
  const viewer = document.getElementById('cas-doc-viewer');
  if (!viewer) return;

  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
    return;
  }

  if (typeof viewer.requestFullscreen === 'function') {
    viewer.requestFullscreen().catch(() => {
      openCasReferenceFallback();
    });
    return;
  }

  openCasReferenceFallback();
}

function fillCasReferencePageOptions(pageSelect, pageCount, selectedPage) {
  const safePage = Math.max(1, Math.min(pageCount, selectedPage || 1));
  const options = [];
  for (let i = 1; i <= pageCount; i += 1) {
    options.push(`<option value="${i}">Page ${i}</option>`);
  }
  pageSelect.innerHTML = options.join('');
  pageSelect.value = String(safePage);
  return safePage;
}

async function initCasReferences() {
  const pageSelect = document.getElementById('cas-page-select');
  const viewer = document.getElementById('cas-doc-viewer');
  const fullscreenBtn = document.getElementById('cas-ref-fullscreen-btn');
  if (!pageSelect || !viewer) return;

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      toggleCasReferenceFullscreen();
    });
  }

  viewer.addEventListener('click', () => {
    toggleCasReferenceFullscreen();
  });

  setCasReferenceStatus('Loading reference card pages...', false);

  try {
    casReferenceScanPages = await detectCasScannedPages();

    if (casReferenceScanPages.length > 0) {
      casReferenceSource = 'scan';
      casReferencePageCount = casReferenceScanPages.length;
    } else {
      casReferenceSource = 'pdf';
      casReferencePageCount = await detectCasReferencePageCount(CAS_REFERENCE_PDF);
    }

    const page = fillCasReferencePageOptions(pageSelect, casReferencePageCount, state.casReference.page);
    state.casReference.page = page;

    if (casReferenceSource === 'scan') {
      renderCasReferenceScannedPage(page);
      setCasReferenceStatus(`Showing imported CAS scan pages (${casReferencePageCount} pages).`, false);
    } else {
      renderCasReferencePdf(page);
      setCasReferenceStatus(`Showing ${CAS_REFERENCE_PDF} (${casReferencePageCount} pages).`, false);
    }

    saveState();
  } catch (err) {
    pageSelect.innerHTML = '<option value="1">Page 1</option>';
    pageSelect.value = '1';
    viewer.removeAttribute('src');
    setCasReferenceStatus('Could not load CAS references. Add scan pages to assets/cas_pdf_pages or place "jPub reference cards printable.pdf" in the assets folder.', true);
    return;
  }

  pageSelect.addEventListener('change', () => {
    const page = Math.max(1, Math.min(casReferencePageCount, Number(pageSelect.value) || 1));
    state.casReference.page = page;

    if (casReferenceSource === 'scan') {
      renderCasReferenceScannedPage(page);
    } else {
      renderCasReferencePdf(page);
    }

    saveState();
  });
}

/* ══════════════════════════════════════════════════════
   CONVERSIONS
   ══════════════════════════════════════════════════════ */

const LAT_BANDS = 'CDEFGHJKLMNPQRSTUVWX';
const MGRS_EASTING_SETS = ['ABCDEFGH', 'JKLMNPQR', 'STUVWXYZ', 'ABCDEFGH', 'JKLMNPQR', 'STUVWXYZ'];
const MGRS_NORTHING_SETS = ['ABCDEFGHJKLMNPQRSTUV', 'FGHJKLMNPQRSTUVABCDE', 'ABCDEFGHJKLMNPQRSTUV', 'FGHJKLMNPQRSTUVABCDE', 'ABCDEFGHJKLMNPQRSTUV', 'FGHJKLMNPQRSTUVABCDE'];

function isFiniteNumber(value) {
  return Number.isFinite(Number(value));
}

function normalizeLongitude(lon) {
  let value = Number(lon);
  while (value > 180) value -= 360;
  while (value < -180) value += 360;
  return value;
}

function validateLatLon(lat, lon) {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    throw new Error('Latitude and longitude must be numeric values.');
  }
  if (lat < -80 || lat > 84) {
    throw new Error('Latitude must be between -80 and 84 degrees for MGRS conversion.');
  }
  if (lon < -180 || lon > 180) {
    throw new Error('Longitude must be between -180 and 180 degrees.');
  }
}

function decimalToDmsParts(value, isLat) {
  const abs = Math.abs(value);
  const deg = Math.floor(abs);
  const minFloat = (abs - deg) * 60;
  const min = Math.floor(minFloat);
  let sec = (minFloat - min) * 60;
  sec = Math.round(sec * 100) / 100;

  let outDeg = deg;
  let outMin = min;
  let outSec = sec;

  if (outSec >= 60) {
    outSec = 0;
    outMin += 1;
  }
  if (outMin >= 60) {
    outMin = 0;
    outDeg += 1;
  }

  const hem = isLat ? (value >= 0 ? 'N' : 'S') : (value >= 0 ? 'E' : 'W');
  return { hem, deg: outDeg, min: outMin, sec: outSec };
}

function decimalToDmmParts(value, isLat) {
  const abs = Math.abs(value);
  const deg = Math.floor(abs);
  let decMin = (abs - deg) * 60;
  decMin = Math.round(decMin * 1000) / 1000;

  let outDeg = deg;
  let outDecMin = decMin;
  if (outDecMin >= 60) {
    outDecMin = 0;
    outDeg += 1;
  }

  const hem = isLat ? (value >= 0 ? 'N' : 'S') : (value >= 0 ? 'E' : 'W');
  return { hem, deg: outDeg, decMin: outDecMin };
}

function dmsToDecimal(hem, deg, min, sec, isLat) {
  const d = Number(deg);
  const m = Number(min);
  const s = Number(sec);
  if (![d, m, s].every(Number.isFinite)) throw new Error('DMS values must be numeric.');
  if (m < 0 || m >= 60 || s < 0 || s >= 60) throw new Error('Minutes and seconds must be in the range 0-59.999.');
  const maxDeg = isLat ? 90 : 180;
  if (d < 0 || d > maxDeg) throw new Error(`Degrees out of range for ${isLat ? 'latitude' : 'longitude'}.`);

  const sign = (hem === 'S' || hem === 'W') ? -1 : 1;
  return sign * (d + m / 60 + s / 3600);
}

function dmmToDecimal(hem, deg, decMin, isLat) {
  const d = Number(deg);
  const m = Number(decMin);
  if (![d, m].every(Number.isFinite)) throw new Error('DMM values must be numeric.');
  if (m < 0 || m >= 60) throw new Error('Decimal minutes must be in the range 0-59.999.');
  const maxDeg = isLat ? 90 : 180;
  if (d < 0 || d > maxDeg) throw new Error(`Degrees out of range for ${isLat ? 'latitude' : 'longitude'}.`);

  const sign = (hem === 'S' || hem === 'W') ? -1 : 1;
  return sign * (d + m / 60);
}

function latToBand(lat) {
  if (lat >= 84) return 'X';
  if (lat < -80) return 'C';
  const idx = Math.floor((lat + 80) / 8);
  return LAT_BANDS[Math.max(0, Math.min(LAT_BANDS.length - 1, idx))];
}

function zoneToCentralLon(zone) {
  return (zone - 1) * 6 - 180 + 3;
}

function latLonToUtm(lat, lon) {
  validateLatLon(lat, lon);

  const a = 6378137.0;
  const eccSquared = 0.00669438;
  const k0 = 0.9996;

  let zoneNumber = Math.floor((lon + 180) / 6) + 1;

  if (lat >= 56.0 && lat < 64.0 && lon >= 3.0 && lon < 12.0) zoneNumber = 32;
  if (lat >= 72.0 && lat < 84.0) {
    if (lon >= 0.0 && lon < 9.0) zoneNumber = 31;
    else if (lon >= 9.0 && lon < 21.0) zoneNumber = 33;
    else if (lon >= 21.0 && lon < 33.0) zoneNumber = 35;
    else if (lon >= 33.0 && lon < 42.0) zoneNumber = 37;
  }

  const longOrigin = zoneToCentralLon(zoneNumber);
  const latRad = lat * (Math.PI / 180);
  const lonRad = lon * (Math.PI / 180);
  const longOriginRad = longOrigin * (Math.PI / 180);

  const eccPrimeSquared = eccSquared / (1 - eccSquared);

  const N = a / Math.sqrt(1 - eccSquared * Math.sin(latRad) * Math.sin(latRad));
  const T = Math.tan(latRad) * Math.tan(latRad);
  const C = eccPrimeSquared * Math.cos(latRad) * Math.cos(latRad);
  const A = Math.cos(latRad) * (lonRad - longOriginRad);

  const M = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * latRad
    - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * latRad)
    + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * latRad)
    - (35 * eccSquared * eccSquared * eccSquared / 3072) * Math.sin(6 * latRad));

  const easting = (k0 * N * (A + (1 - T + C) * A * A * A / 6
      + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A * A * A * A * A / 120)
      + 500000.0);

  let northing = (k0 * (M + N * Math.tan(latRad) * (A * A / 2
      + (5 - T + (9 * C) + (4 * C * C)) * A * A * A * A / 24
      + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A * A * A * A * A * A / 720)));

  if (lat < 0) northing += 10000000.0;

  return {
    zoneNumber,
    bandLetter: latToBand(lat),
    easting,
    northing,
    northernHemisphere: lat >= 0,
  };
}

function utmToLatLon(zoneNumber, easting, northing, northernHemisphere) {
  const a = 6378137.0;
  const eccSquared = 0.00669438;
  const k0 = 0.9996;

  const eccPrimeSquared = eccSquared / (1 - eccSquared);
  const e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));

  const x = easting - 500000.0;
  let y = northing;
  if (!northernHemisphere) y -= 10000000.0;

  const longOrigin = zoneToCentralLon(zoneNumber);
  const M = y / k0;
  const mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));

  const phi1Rad = mu
    + (3 * e1 / 2 - 27 * Math.pow(e1, 3) / 32) * Math.sin(2 * mu)
    + (21 * e1 * e1 / 16 - 55 * Math.pow(e1, 4) / 32) * Math.sin(4 * mu)
    + (151 * Math.pow(e1, 3) / 96) * Math.sin(6 * mu)
    + (1097 * Math.pow(e1, 4) / 512) * Math.sin(8 * mu);

  const N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
  const T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
  const C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
  const R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
  const D = x / (N1 * k0);

  const lat = (phi1Rad - (N1 * Math.tan(phi1Rad) / R1) * (D * D / 2
    - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * Math.pow(D, 4) / 24
    + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * Math.pow(D, 6) / 720)) * (180 / Math.PI);

  const lon = longOrigin + ((D
    - (1 + 2 * T1 + C1) * Math.pow(D, 3) / 6
    + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1) * Math.pow(D, 5) / 120) / Math.cos(phi1Rad)) * (180 / Math.PI);

  return { lat, lon: normalizeLongitude(lon) };
}

function latBandMinLat(band) {
  const idx = LAT_BANDS.indexOf(band);
  if (idx < 0) throw new Error('Invalid MGRS latitude band.');
  if (band === 'X') return 72;
  return -80 + idx * 8;
}

function latLonToMgrs(lat, lon, precision = 5) {
  const utm = latLonToUtm(lat, lon);
  const set = (utm.zoneNumber - 1) % 6;
  const eastingSet = MGRS_EASTING_SETS[set];
  const northingSet = MGRS_NORTHING_SETS[set];

  const easting100k = Math.floor(utm.easting / 100000);
  if (easting100k < 1 || easting100k > 8) throw new Error('Calculated MGRS easting is out of bounds.');
  const columnLetter = eastingSet[easting100k - 1];

  const northing100k = Math.floor(utm.northing / 100000) % 20;
  const rowLetter = northingSet[northing100k];

  const scale = Math.pow(10, 5 - precision);
  const eastingRemainder = Math.floor((utm.easting % 100000) / scale);
  const northingRemainder = Math.floor((utm.northing % 100000) / scale);

  const eStr = String(eastingRemainder).padStart(precision, '0');
  const nStr = String(northingRemainder).padStart(precision, '0');

  return `${utm.zoneNumber}${utm.bandLetter} ${columnLetter}${rowLetter} ${eStr} ${nStr}`;
}

function parseMgrs(mgrsText) {
  const cleaned = String(mgrsText || '').toUpperCase().replace(/\s+/g, '');
  const match = cleaned.match(/^(\d{1,2})([C-HJ-NP-X])([A-HJ-NP-Z])([A-HJ-NP-V])(\d*)$/);
  if (!match) throw new Error('Invalid MGRS format. Example: 11SLT1234567890');

  const zoneNumber = Number(match[1]);
  const bandLetter = match[2];
  const columnLetter = match[3];
  const rowLetter = match[4];
  const digits = match[5] || '';

  if (zoneNumber < 1 || zoneNumber > 60) throw new Error('MGRS zone must be between 1 and 60.');
  if (digits.length % 2 !== 0) throw new Error('MGRS numeric part must have an even number of digits.');
  if (digits.length > 10) throw new Error('MGRS numeric part supports up to 10 digits.');

  const set = (zoneNumber - 1) % 6;
  const eastingSet = MGRS_EASTING_SETS[set];
  const northingSet = MGRS_NORTHING_SETS[set];

  const colIdx = eastingSet.indexOf(columnLetter);
  const rowIdx = northingSet.indexOf(rowLetter);
  if (colIdx < 0 || rowIdx < 0) throw new Error('Invalid 100k grid letters for this MGRS zone.');

  const precision = digits.length / 2;
  const eDigits = digits.slice(0, precision);
  const nDigits = digits.slice(precision);
  const scale = Math.pow(10, 5 - precision);

  const eastingOffset = precision > 0 ? Number(eDigits) * scale : 50000;
  const northingOffset = precision > 0 ? Number(nDigits) * scale : 50000;

  const easting = (colIdx + 1) * 100000 + eastingOffset;
  let northing = rowIdx * 100000 + northingOffset;

  const minLat = latBandMinLat(bandLetter) + 0.01;
  const minLon = zoneToCentralLon(zoneNumber);
  const minBandNorthing = latLonToUtm(minLat, minLon).northing;
  while (northing < minBandNorthing) northing += 2000000;

  const northernHemisphere = bandLetter >= 'N';
  return utmToLatLon(zoneNumber, easting, northing, northernHemisphere);
}

function formatCoordinateOutputs(lat, lon) {
  const latDms = decimalToDmsParts(lat, true);
  const lonDms = decimalToDmsParts(lon, false);
  const latDmm = decimalToDmmParts(lat, true);
  const lonDmm = decimalToDmmParts(lon, false);

  return {
    ll: `${lat.toFixed(6)}, ${lon.toFixed(6)}`,
    dms: `${latDms.hem} ${latDms.deg}°${String(latDms.min).padStart(2, '0')}'${latDms.sec.toFixed(2)}\"  ${lonDms.hem} ${lonDms.deg}°${String(lonDms.min).padStart(2, '0')}'${lonDms.sec.toFixed(2)}\"`,
    dmm: `${latDmm.hem} ${latDmm.deg}°${latDmm.decMin.toFixed(3)}'  ${lonDmm.hem} ${lonDmm.deg}°${lonDmm.decMin.toFixed(3)}'`,
    mgrs: latLonToMgrs(lat, lon, 5),
  };
}

function readSourceLatLon(format) {
  if (format === 'll') {
    const lat = Number(document.getElementById('conv-ll-lat').value);
    const lon = Number(document.getElementById('conv-ll-lon').value);
    validateLatLon(lat, lon);
    return { lat, lon: normalizeLongitude(lon) };
  }

  if (format === 'dms') {
    const lat = dmsToDecimal(
      document.getElementById('conv-dms-lat-hem').value,
      document.getElementById('conv-dms-lat-deg').value,
      document.getElementById('conv-dms-lat-min').value,
      document.getElementById('conv-dms-lat-sec').value,
      true
    );
    const lon = dmsToDecimal(
      document.getElementById('conv-dms-lon-hem').value,
      document.getElementById('conv-dms-lon-deg').value,
      document.getElementById('conv-dms-lon-min').value,
      document.getElementById('conv-dms-lon-sec').value,
      false
    );
    validateLatLon(lat, lon);
    return { lat, lon: normalizeLongitude(lon) };
  }

  if (format === 'dmm') {
    const lat = dmmToDecimal(
      document.getElementById('conv-dmm-lat-hem').value,
      document.getElementById('conv-dmm-lat-deg').value,
      document.getElementById('conv-dmm-lat-min').value,
      true
    );
    const lon = dmmToDecimal(
      document.getElementById('conv-dmm-lon-hem').value,
      document.getElementById('conv-dmm-lon-deg').value,
      document.getElementById('conv-dmm-lon-min').value,
      false
    );
    validateLatLon(lat, lon);
    return { lat, lon: normalizeLongitude(lon) };
  }

  if (format === 'mgrs') {
    const mgrs = document.getElementById('conv-mgrs').value.trim();
    if (!mgrs) throw new Error('Enter an MGRS value to convert.');
    return parseMgrs(mgrs);
  }

  throw new Error('Unsupported conversion format.');
}

function setConversionStatus(message, type) {
  const statusEl = document.getElementById('conv-status');
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.classList.remove('error', 'ok');
  if (type) statusEl.classList.add(type);
}

function setConversionOutputs(values) {
  document.getElementById('conv-out-ll').textContent = values.ll;
  document.getElementById('conv-out-dms').textContent = values.dms;
  document.getElementById('conv-out-dmm').textContent = values.dmm;
  document.getElementById('conv-out-mgrs').textContent = values.mgrs;
}

function showConversionInputBlock(format) {
  document.querySelectorAll('.conv-input-block').forEach(block => block.classList.remove('active'));
  const target = document.getElementById(`conv-input-${format}`);
  if (target) target.classList.add('active');
}

function initConversions() {
  const sourceSelect = document.getElementById('conv-source-format');
  const convertBtn = document.getElementById('conv-convert-btn');
  if (!sourceSelect || !convertBtn) return;

  const runConvert = () => {
    try {
      const format = sourceSelect.value;
      const { lat, lon } = readSourceLatLon(format);
      const values = formatCoordinateOutputs(lat, lon);
      setConversionOutputs(values);
      setConversionStatus('Converted successfully.', 'ok');
    } catch (err) {
      setConversionStatus(err && err.message ? err.message : 'Conversion failed.', 'error');
    }
  };

  sourceSelect.addEventListener('change', () => {
    showConversionInputBlock(sourceSelect.value);
    setConversionStatus('Ready.', null);
  });

  convertBtn.addEventListener('click', runConvert);

  const inputIds = [
    'conv-ll-lat', 'conv-ll-lon',
    'conv-dms-lat-deg', 'conv-dms-lat-min', 'conv-dms-lat-sec',
    'conv-dms-lon-deg', 'conv-dms-lon-min', 'conv-dms-lon-sec',
    'conv-dmm-lat-deg', 'conv-dmm-lat-min',
    'conv-dmm-lon-deg', 'conv-dmm-lon-min',
    'conv-mgrs',
  ];

  inputIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        runConvert();
      }
    });
  });

  ['conv-dms-lat-hem', 'conv-dms-lon-hem', 'conv-dmm-lat-hem', 'conv-dmm-lon-hem']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', runConvert);
      }
    });

  showConversionInputBlock(sourceSelect.value);

  if (isFiniteNumber(document.getElementById('conv-ll-lat').value)
      && isFiniteNumber(document.getElementById('conv-ll-lon').value)) {
    runConvert();
  } else {
    setConversionStatus('Ready.', null);
  }
}

/* ── Utility ─────────────────────────────────────────── */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Init ────────────────────────────────────────────── */
const migratedDefaults = loadState();
initChecklistFilters();
renderSidebar();
renderChecklistMain();
renderChartsList();
renderChartViewer();
renderManualsList();
renderManualViewer();
initScratchPad();
initCasSectionTabs();
initCasForm();
initCasReferences();
initConversions();
initWab();

if (migratedDefaults) {
  saveState();
}

/* Register service worker */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
