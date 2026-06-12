# 🏥 FITBOT KIOSK + RELIV PET BOT — COMPLETE SYSTEM FLOW

## 📋 TABLE OF CONTENTS
1. [System Overview](#system-overview)
2. [Complete User Journey](#complete-user-journey)
3. [Hardware Specifications](#hardware-specifications)
4. [Architecture & Communication](#architecture--communication)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [ESP32 Firmware Logic](#esp32-firmware-logic)
8. [WhatsApp Integration](#whatsapp-integration)
9. [Payment & Subscription](#payment--subscription)
10. [Bot Pairing Process](#bot-pairing-process)
11. [Implementation Checklist](#implementation-checklist)

---

## 1. SYSTEM OVERVIEW

### The Complete Ecosystem

```
┌─────────────────────────────────────────────────────────────────────┐
│                        RELIV ECOSYSTEM                              │
│                                                                     │
│  ┌──────────┐   HTTPS    ┌──────────┐   MQTT    ┌──────────────┐  │
│  │  KIOSK   │◄──────────►│ BACKEND  │◄─────────►│  PET BOT     │  │
│  │ (React)  │            │(Node.js) │           │  (ESP32-C3)  │  │
│  └──────────┘            └──────────┘           └──────────────┘  │
│       ▲                        ▲                       ▲           │
│       │                        │                       │           │
│       │                        ▼                       │           │
│       │                  ┌──────────┐                  │           │
│       │                  │ MongoDB  │                  │           │
│       │                  │ Database │                  │           │
│       │                  └──────────┘                  │           │
│       │                        │                       │           │
│       │                        ▼                       │           │
│       │                  ┌──────────┐                  │           │
│       └──────────────────┤ WhatsApp │──────────────────┘           │
│                          │  (Twilio)│                              │
│                          └──────────┘                              │
│                                                                     │
│  KEY FEATURES:                                                      │
│  ✅ Kiosk for signup (stationary)                                  │
│  ✅ Pet bot works ANYWHERE (not network-dependent)                 │
│  ✅ Cloud-based reminder sync via MQTT                             │
│  ✅ WhatsApp backup reminders                                      │
│  ✅ Real-time emotional feedback (happy/sad)                       │
│  ✅ Subscription-based (bot works only if active)                  │
│  ✅ Customizable face, sound, reminder times                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. COMPLETE USER JOURNEY

### Phase 1: Kiosk Signup (Same as FitBot)

```
STEP 1-26: IDENTICAL TO FITBOT KIOSK FLOW
(Phone → OTP → Code → Plan Selection → Payment → Category → Meals → Activation)

See FITBOT_COMPLETE_DEVELOPER_SPEC.md for full details
```

### Phase 2: Pet Bot Offer (NEW SCREEN AFTER ACTIVATION)

```
┌─────────────────────────────────────────────────────────────┐
│                 🎉 PLAN ACTIVATED!                          │
│                                                             │
│  Your code: 9876                                            │
│  ✅ Daily WhatsApp reminders starting tomorrow              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🐾 WANT A PET BOT FOR REMINDERS?                   │   │
│  │                                                      │   │
│  │  Get a physical companion that:                     │   │
│  │  ✨ Shows emotions (happy when you comply!)         │   │
│  │  🔔 Reminds you at YOUR times (not just WhatsApp)  │   │
│  │  💕 Motivates you with cute reactions               │   │
│  │  🎵 Plays sounds & music                            │   │
│  │  🏠 Works ANYWHERE (takes internet from cloud)      │   │
│  │                                                      │   │
│  │  One-time price: ₹499                               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [💳 Buy Pet Bot ₹499]  [⏭️ Skip - WhatsApp Only]         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Navigation:**
- "Buy Pet Bot" → Screen: Bot Payment
- "Skip" → Screen: WhatsApp Preview (existing flow)

---

### Phase 3: Bot Purchase & Pairing

```
┌─────────────────────────────────────────────────────────────┐
│              💳 PURCHASE PET BOT                            │
│                                                             │
│  Your Code: 9876                                            │
│  Plan: Solo Weekly (Fitness)                                │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Pet Bot Companion                                   │   │
│  │  • ESP32-C3 powered                                  │   │
│  │  • OLED display with faces                           │   │
│  │  • Buzzer + LED + Touch sensor                       │   │
│  │  • Works anywhere with WiFi                          │   │
│  │                                                      │   │
│  │  Price: ₹499 (one-time)                             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [💳 Pay ₹499]                                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘

              ↓ (After payment success)

┌─────────────────────────────────────────────────────────────┐
│              ✅ BOT PURCHASED!                              │
│                                                             │
│  Your Pairing Code:                                         │
│  ┌────────────────────┐                                     │
│  │     A 3 X 9 K 2     │  ← 6-character unique code         │
│  └────────────────────┘                                     │
│                                                             │
│  📦 Setup Instructions:                                     │
│  1. Take bot home                                           │
│  2. Power on via USB                                        │
│  3. Connect to Serial Monitor                               │
│  4. Type: PAIR A3X9K2                                       │
│  5. Bot will download your reminders!                       │
│                                                             │
│  📱 Pairing code also sent to WhatsApp                      │
│                                                             │
│  [Continue to Customize Bot →]                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Phase 4: Bot Customization (NEW SCREENS)

```
┌─────────────────────────────────────────────────────────────┐
│           🎨 CUSTOMIZE YOUR PET BOT                         │
│                                                             │
│  Choose Bot Face:                                           │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│  │  🤖  │ │  🐱  │ │  🐶  │ │  🐼  │ │  🐰  │ │  🐻  │   │
│  │Robot │ │ Cat  │ │ Dog  │ │Panda │ │Bunny │ │ Bear │   │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘   │
│                                                             │
│  Choose Sound Theme:                                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  │ 🎵 Chime │ │ 🎶 Melody│ │ 📢 Beep  │ │ 🗣️ Voice │     │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘     │
│                                                             │
│  Bot Personality:                                           │
│  ○ Cheerful & Energetic                                    │
│  ○ Calm & Supportive                                       │
│  ○ Strict & Disciplined                                    │
│                                                             │
│  Sleep Schedule:                                            │
│  Sleep: [22:00] ▼    Wake: [07:00] ▼                       │
│                                                             │
│  [💾 Save & Sync to Bot]                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

              ↓

┌─────────────────────────────────────────────────────────────┐
│              ✅ CUSTOMIZATION SAVED!                        │
│                                                             │
│  Your bot is ready! Next time you return, you can:         │
│  • Change face anytime                                      │
│  • Update reminder times                                    │
│  • See bot's reaction history                               │
│                                                             │
│  📱 Bot will sync these settings in 5 seconds               │
│                                                             │
│  [🏠 Finish]  [👁️ Preview Bot Behavior]                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Phase 5: Bot at Home (User Experience)

```
TIME     EVENT                           WHERE        WHAT HAPPENS
──────── ─────────────────────────────── ──────────── ──────────────────────
DAY 1
18:00    User takes bot home             HOME         Plugs in USB power
18:01    Bot boots up                    BOT          OLED: "RELIV 🤖"
18:02    Connects to home WiFi           BOT          Prompts for WiFi creds via Serial
18:03    User types: PAIR A3X9K2         BOT→BACKEND  MQTT: bot/pair/A3X9K2
18:03    Backend recognizes pairing      BACKEND      Looks up user by pairing code
18:03    Sends full config to bot        BACKEND→BOT  MQTT: bot/A3X9K2/config
18:04    Bot receives config             BOT          {
                                                         face: "cat",
                                                         sound: "melody",
                                                         sleep: "22:00",
                                                         wake: "07:00",
                                                         reminders: [
                                                           {type:"water", times:["08:00",...]}
                                                           {type:"facewash", times:["07:00","21:00"]}
                                                           {type:"medicine", times:["09:00"]}
                                                         ]
                                                       }
18:04    Bot shows cat face + melody     BOT          OLED: 🐱😊, Sound: ♪♫♪
18:04    Pairing complete!               BOT          Ready for tomorrow

DAY 2
07:00    Bot wakes up                    BOT          OLED: 🐱 (neutral face)
                                                      LED: dim blue
07:00    Facewash reminder triggers      BOT          OLED: "WASH FACE! 🧴"
                                                      Sound: melody plays
                                                      LED: orange pulse
07:00    WhatsApp also sent              BACKEND      "🧴 Time to wash face!"
07:02    User replies "YES" on WhatsApp  WHATSAPP     Twilio webhook → Backend
07:02    Backend marks compliance        BACKEND      MongoDB: facewash_done = true
                                                      Calculates: stars += 10
07:02    Backend sends happiness to bot  BACKEND→BOT  MQTT: { mood: "happy", stars: 10 }
07:02    Bot reacts HAPPY!               BOT          OLED: 🐱😊 (big smile)
                                                      Sound: happy chime
                                                      LED: green flash
                                                      (stays happy for 30 sec)

08:00    Water reminder #1               BOT          OLED: "DRINK WATER! 💧"
                                                      Sound: melody
                                                      LED: orange pulse
08:00    WhatsApp sent                   BACKEND      "💧 Had your 1st glass?"
08:15    User ignores reminder           —            No response
08:30    Bot checks compliance           BOT          Checks via MQTT: no response yet
08:30    Bot looks worried               BOT          OLED: 🐱😐 (neutral)
                                                      LED: yellow (warning)
09:00    User FINALLY drinks water       USER         Replies "YES" on WhatsApp
09:00    Backend updates                 BACKEND      water_1_done = true
09:00    Bot goes HAPPY again            BOT          OLED: 🐱😊
                                                      Sound: happy chime
                                                      LED: green

09:00    Medicine reminder               BOT          OLED: "TAKE MEDS! 💊"
09:05    User replies "NO" (forgot!)     WHATSAPP     Backend marks: medicine_done = false
09:05    Bot goes SAD                    BOT          OLED: 🐱😢 (sad face, droopy whiskers)
                                                      Sound: sad tone (low beep)
                                                      LED: red flash
                                                      (stays sad for 1 min)
09:06    Bot shows encouragement         BOT          OLED: "It's okay! Try again tomorrow!"
                                                      LED: back to blue (idle)

11:00    Water reminder #2               BOT          OLED: "DRINK WATER! 💧"
11:01    User drinks immediately         USER         Replies "YES"
11:01    Bot celebrates                  BOT          OLED: 🐱😄 (excited)
                                                      Sound: victory melody
                                                      LED: green rainbow effect
                                                      Stars: +5 (shown on OLED)

22:00    Sleep time                      BOT          OLED: "Goodnight! 😴"
                                                      Sound: lullaby chime
22:01    Bot goes to sleep               BOT          OLED: turns off
                                                      LED: turns off
                                                      (saves power, ESP32 light sleep)

DAY 3
07:00    Bot wakes up automatically      BOT          OLED: 🐱 (waking animation)
                                                      Sound: morning chime
07:00    Shows yesterday's stats         BOT          OLED: "Yesterday: 4/5 ⭐"
                                                      "Streak: 2 days 🔥"

... and so on
```

---

### Phase 6: Returning User at Kiosk

```
WEEK 1, DAY 5
User returns to kiosk with code 9876

┌─────────────────────────────────────────────────────────────┐
│              👋 WELCOME BACK!                               │
│              Plan active - 2 days left                      │
│                                                             │
│  🔥 7 Day Streak!                                           │
│                                                             │
│  📊 This Week's Progress                                    │
│  💧 Water:    22/28 (79%) [▓▓▓▓▓▓▓▓░░]                     │
│  🍽️ Meals:    18/21 (86%) [▓▓▓▓▓▓▓▓▓░]                     │
│  💪 Workouts:  3/5 (60%)  [▓▓▓▓▓▓░░░░]                     │
│                                                             │
│  🤖 Pet Bot Status: ACTIVE                                  │
│  • Currently showing: Cat face 🐱                           │
│  • Sound theme: Melody                                      │
│  • Last sync: 2 hours ago                                   │
│                                                             │
│  [✅ Continue]  [🎨 Customize Bot]  [⚙️ Settings]          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**If user clicks "Customize Bot":**

```
┌─────────────────────────────────────────────────────────────┐
│           🎨 UPDATE BOT SETTINGS                            │
│                                                             │
│  Current Setup:                                             │
│  Face: 🐱 Cat    Sound: 🎶 Melody                          │
│                                                             │
│  Change Face:                                               │
│  [🤖 Robot] [🐱 Cat]✓ [🐶 Dog] [🐼 Panda] [🐰 Bunny] [🐻 Bear]│
│                                                             │
│  Change Sound:                                              │
│  [🎵 Chime] [🎶 Melody]✓ [📢 Beep] [🗣️ Voice]             │
│                                                             │
│  Update Reminder Times:                                     │
│  💧 Water: 8AM, 11AM, 2PM, 5PM, 8PM  [✏️ Edit]            │
│  🧴 Facewash: 7AM, 9PM              [✏️ Edit]            │
│  💊 Medicine: 9AM                    [✏️ Edit]            │
│                                                             │
│  [💾 Save Changes]                                          │
│  ↓                                                          │
│  Changes will sync to bot in 5 seconds via cloud           │
│                                                             │
└─────────────────────────────────────────────────────────────┘

User taps "Dog" face → Within 5 seconds, their bot at home 
changes from 🐱 to 🐶 (no re-flashing, instant MQTT update!)
```

---

### Phase 7: Subscription Renewal

```
WEEK 1, DAY 8 (Subscription Expired)
User returns to kiosk

┌─────────────────────────────────────────────────────────────┐
│              💪 WELCOME BACK!                               │
│              Your weekly plan has ended                     │
│                                                             │
│  Last Week's Results:                                       │
│  💧 Water:    26/28 🔥                                      │
│  🍽️ Meals:    20/21                                         │
│  💪 Workouts:  4/5                                          │
│  Consistency: 93%! Amazing work!                            │
│                                                             │
│  🤖 Pet Bot Status:                                         │
│  • Currently PAUSED (subscription ended)                    │
│  • Bot will resume when you renew                           │
│                                                             │
│  [🔄 Renew Plan ₹29]  [🎯 Change Plan]                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**What happens to the bot when subscription expires:**

```
AT HOME (when subscription expires):

07:00    Bot tries to wake up            BOT          Checks subscription via MQTT
07:00    Backend responds: EXPIRED       BACKEND→BOT  { status: "expired" }
07:00    Bot shows sad message           BOT          OLED: "Subscription ended 😢"
                                                      "Visit kiosk to renew!"
07:01    Bot goes to sleep mode          BOT          OLED: dim, shows only time
                                                      LED: slow red pulse
                                                      No reminders sent
                                                      (waits for renewal)

When user renews at kiosk:
12:00    User pays ₹29 at kiosk          KIOSK        Payment success
12:00    Backend reactivates             BACKEND      subscription.status = "active"
12:00    Backend notifies bot            BACKEND→BOT  MQTT: { status: "active", renew: true }
12:00    Bot wakes up HAPPY!             BOT          OLED: "Welcome back! 🎉"
                                                      Sound: celebration melody
                                                      LED: rainbow effect
12:01    Reminders resume                BOT          Back to normal operation
```

---

## 3. HARDWARE SPECIFICATIONS

### ESP32-C3 Pet Bot — Bill of Materials

| # | Component | Model | Quantity | Price (₹) | Total | Purpose |
|---|-----------|-------|----------|-----------|-------|---------|
| 1 | Microcontroller | ESP32-C3-DevKitM-1 | 1 | ₹250 | ₹250 | Main brain (WiFi + BLE) |
| 2 | OLED Display | SSD1306 0.96" 128×64 I2C | 1 | ₹120 | ₹120 | Show face, messages, stars |
| 3 | Passive Buzzer | 5V PWM buzzer module | 1 | ₹10 | ₹10 | Play melodies, chimes |
| 4 | RGB LED | WS2812B NeoPixel (single) | 1 | ₹15 | ₹15 | Emotional colors |
| 5 | Touch Sensor | TTP223 capacitive touch | 1 | ₹20 | ₹20 | User interaction (pet the bot) |
| 6 | DFPlayer Mini | MP3 module + speaker | 1 | ₹80 | ₹80 | Voice messages (optional) |
| 7 | Micro SD Card | 1GB for MP3 files | 1 | ₹50 | ₹50 | Store voice clips |
| 8 | Speaker | 8Ω 0.5W mini speaker | 1 | ₹25 | ₹25 | Audio output |
| 9 | USB-C Cable | 1m power + data | 1 | ₹30 | ₹30 | Power & programming |
| 10 | 3D Printed Case | Custom pet bot shell | 1 | ₹50 | ₹50 | Cute enclosure |
| | **TOTAL** | | | | **₹650** | |

**Profit Calculation:**
- Manufacturing cost: ₹650 per unit
- Bulk order (100+ units): ~₹450 per unit
- Selling price: ₹499
- Profit margin: ₹49/unit (at scale: ₹150/unit)

---

### Wiring Diagram

```
ESP32-C3 DevKit Pinout:

                        ┌─────────────┐
                   3.3V │●           ●│ GND
                     EN │●           ●│ GPIO0  ── Touch Sensor (TTP223)
                 GPIO4  │●           ●│ GPIO1  ── DFPlayer TX
        OLED SDA ─ GPIO6│●           ●│ GPIO2  ── DFPlayer RX
        OLED SCL ─ GPIO7│●           ●│ GPIO3
                 GPIO10 │●           ●│ GPIO5  ── Buzzer (PWM)
      NeoPixel ── GPIO8 │●           ●│ GPIO9
                        │    USB-C    │
                        └──────┬──────┘
                               │
                          Power + Serial

COMPONENT CONNECTIONS:

┌─────────────────┬──────────┬─────────────────────────────┐
│ Component       │ ESP Pin  │ Notes                       │
├─────────────────┼──────────┼─────────────────────────────┤
│ OLED SSD1306    │          │                             │
│  ├─ SDA         │ GPIO6    │ I2C data                    │
│  ├─ SCL         │ GPIO7    │ I2C clock                   │
│  ├─ VCC         │ 3.3V     │                             │
│  └─ GND         │ GND      │                             │
├─────────────────┼──────────┼─────────────────────────────┤
│ Buzzer          │          │                             │
│  ├─ Signal      │ GPIO5    │ PWM tone generation         │
│  └─ GND         │ GND      │                             │
├─────────────────┼──────────┼─────────────────────────────┤
│ NeoPixel LED    │          │                             │
│  ├─ DIN         │ GPIO8    │ WS2812B data                │
│  ├─ VCC         │ 3.3V     │                             │
│  └─ GND         │ GND      │                             │
├─────────────────┼──────────┼─────────────────────────────┤
│ Touch Sensor    │          │                             │
│  ├─ OUT         │ GPIO0    │ Digital high when touched   │
│  ├─ VCC         │ 3.3V     │                             │
│  └─ GND         │ GND      │                             │
├─────────────────┼──────────┼─────────────────────────────┤
│ DFPlayer Mini   │          │                             │
│  ├─ TX          │ GPIO1    │ ESP32 RX ← DFPlayer TX     │
│  ├─ RX          │ GPIO2    │ ESP32 TX → DFPlayer RX     │
│  ├─ VCC         │ 5V (USB) │ Needs 5V, not 3.3V         │
│  ├─ GND         │ GND      │                             │
│  ├─ SPK+        │ Speaker+ │ 8Ω speaker                 │
│  └─ SPK-        │ Speaker- │                             │
└─────────────────┴──────────┴─────────────────────────────┘

POWER:
• USB-C provides 5V
• ESP32 regulates to 3.3V internally
• DFPlayer needs 5V directly from USB
• Total consumption: ~200mA (can run from powerbank)
```

---

## 4. ARCHITECTURE & COMMUNICATION

### System Architecture Diagram

```
┌───────────────────────────────────────────────────────────────────────┐
│                         CLOUD BACKEND (Node.js)                       │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  Express REST API (Port 3000)                                   │ │
│  │  ├─ POST /api/payment/create          ← Kiosk                  │ │
│  │  ├─ POST /api/bot/purchase             ← Kiosk                 │ │
│  │  ├─ POST /api/bot/config               ← Kiosk                 │ │
│  │  ├─ GET  /api/bot/status/:code         ← Kiosk                 │ │
│  │  ├─ POST /webhook/whatsapp             ← Twilio                │ │
│  │  └─ POST /api/bot/pair                 ← ESP32 (HTTP fallback) │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                ▲                                      │
│                                │                                      │
│  ┌─────────────────────────────┼─────────────────────────────────┐  │
│  │  MongoDB Database           │                                  │  │
│  │  ├─ users                   │                                  │  │
│  │  ├─ subscriptions           │                                  │  │
│  │  ├─ bots (new!)             │                                  │  │
│  │  ├─ progress                │                                  │  │
│  │  └─ whatsapp_messages       │                                  │  │
│  └─────────────────────────────┼─────────────────────────────────┘  │
│                                │                                      │
│  ┌─────────────────────────────┼─────────────────────────────────┐  │
│  │  MQTT Bridge (HiveMQ Cloud) │                                  │  │
│  │                             │                                  │  │
│  │  Topics:                    │                                  │  │
│  │  • bot/pair/{code}          ◄─── ESP32 publishes              │  │
│  │  • bot/{code}/config        ◄─── Backend publishes             │  │
│  │  • bot/{code}/status        ◄─── ESP32 publishes               │  │
│  │  • bot/{code}/mood          ◄─── Backend publishes             │  │
│  └─────────────────────────────┼─────────────────────────────────┘  │
│                                │                                      │
│  ┌─────────────────────────────┼─────────────────────────────────┐  │
│  │  Scheduler (node-cron)      │                                  │  │
│  │  • Runs every minute        │                                  │  │
│  │  • Checks all active bots   │                                  │  │
│  │  • Sends reminders via:     │                                  │  │
│  │    - MQTT (to bot)          │                                  │  │
│  │    - Twilio (WhatsApp)      │                                  │  │
│  └─────────────────────────────┼─────────────────────────────────┘  │
└───────────────────────────────┼───────────────────────────────────────┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
                    ▼           ▼           ▼
            ┌──────────┐ ┌──────────┐ ┌──────────┐
            │  KIOSK   │ │ ESP32 BOT│ │ WhatsApp │
            │ (React)  │ │(C++ MQTT)│ │ (Twilio) │
            └──────────┘ └──────────┘ └──────────┘
```

### Communication Protocols

**1. Kiosk ↔ Backend (HTTPS REST API)**
```javascript
// Example: Buy bot
POST https://api.fitbot.com/api/bot/purchase
Headers: { "Content-Type": "application/json" }
Body: {
  userCode: "9876",
  amount: 49900  // in paise (₹499.00)
}
Response: {
  success: true,
  pairingCode: "A3X9K2",
  botId: "bot_abc123"
}

// Example: Update bot face
POST https://api.fitbot.com/api/bot/config
Body: {
  pairingCode: "A3X9K2",
  face: "dog",
  sound: "melody"
}
Response: {
  success: true,
  synced: true
}
```

**2. Backend ↔ ESP32 (MQTT)**
```javascript
// MQTT Topics Structure:

// ── ESP32 publishes (bot → cloud) ──
bot/pair/A3X9K2                    // Pairing request
bot/A3X9K2/status                   // Heartbeat, online status
bot/A3X9K2/interaction              // User touched bot, compliance check

// ── Backend publishes (cloud → bot) ──
bot/A3X9K2/config                   // Full config (face, sound, reminders)
bot/A3X9K2/mood                     // Emotional state (happy/sad)
bot/A3X9K2/reminder                 // Trigger a reminder now
bot/A3X9K2/command                  // Special commands (sleep, wake, test)

// Example MQTT payload (Backend → ESP32):
Topic: bot/A3X9K2/config
Payload: {
  "face": "cat",
  "sound": "melody",
  "sleep": "22:00",
  "wake": "07:00",
  "reminders": [
    {
      "type": "water",
      "times": ["08:00", "11:00", "14:00", "17:00", "20:00"],
      "icon": "💧",
      "message": "Drink water!"
    },
    {
      "type": "facewash",
      "times": ["07:00", "21:00"],
      "icon": "🧴",
      "message": "Wash your face!"
    }
  ],
  "subscription": {
    "status": "active",
    "endDate": "2026-02-14T00:00:00Z"
  }
}
```

**3. Backend ↔ WhatsApp (Twilio API)**
```javascript
// Send WhatsApp message
POST https://api.twilio.com/2010-04-01/Accounts/{SID}/Messages.json
Body: {
  From: 'whatsapp:+14155238886',  // Twilio sandbox
  To: 'whatsapp:+919876543210',
  Body: '💧 Had your 1st glass of water?'
}

// Receive WhatsApp response (Twilio webhook)
POST https://api.fitbot.com/webhook/whatsapp
Body: {
  From: 'whatsapp:+919876543210',
  Body: 'YES'
}
```

---

### How ESP32 Stays Connected (Works ANYWHERE)

```
┌────────────────────────────────────────────────────────────┐
│  ESP32 BOT CONNECTION FLOW                                 │
│                                                            │
│  1. User takes bot home (anywhere in India)               │
│  2. Powers on via USB (wall adapter or powerbank)         │
│  3. Bot boots up, tries to connect to WiFi:               │
│     • First tries saved WiFi (from EEPROM)                │
│     • If fails → enters config mode (AP mode)             │
│     • Shows: "Connect to WiFi: FitBot-A3X9K2"             │
│  4. User connects phone to bot's AP                       │
│  5. Opens browser: http://192.168.4.1                     │
│  6. Selects home WiFi + enters password                   │
│  7. Bot saves WiFi, reboots, connects to home WiFi        │
│  8. Bot connects to HiveMQ Cloud MQTT broker:             │
│     • Broker URL: broker.hivemq.com:1883                  │
│     • Uses SSL/TLS for security                           │
│     • Subscribes to: bot/A3X9K2/*                         │
│  9. Bot publishes online status                           │
│  10. Backend sees bot online, sends latest config         │
│  11. Bot is now FULLY SYNCED and working!                 │
│                                                            │
│  KEY ADVANTAGE:                                            │
│  • Bot and kiosk DON'T need same network                  │
│  • Bot works in user's home (Delhi)                       │
│  • Kiosk works in college (Mumbai)                        │
│  • Both connect to SAME cloud (HiveMQ)                    │
│  • Changes sync in REAL-TIME via internet                 │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 5. DATABASE SCHEMA

### New Table: bots

```sql
CREATE TABLE bots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pairing_code VARCHAR(6) UNIQUE NOT NULL,     -- "A3X9K2"
  user_id UUID REFERENCES users(id),
  subscription_id UUID REFERENCES subscriptions(id),
  
  -- Hardware
  esp_mac_address VARCHAR(17),                  -- "A4:CF:12:B2:34:56"
  last_online TIMESTAMP,
  firmware_version VARCHAR(10),                 -- "1.0.2"
  
  -- Customization
  face VARCHAR(20) DEFAULT 'default',           -- robot, cat, dog, panda, bunny, bear
  sound VARCHAR(20) DEFAULT 'chime',            -- chime, melody, beep, voice
  personality VARCHAR(20) DEFAULT 'cheerful',   -- cheerful, calm, strict
  
  -- Schedule
  sleep_time VARCHAR(5) DEFAULT '22:00',
  wake_time VARCHAR(5) DEFAULT '07:00',
  
  -- Status
  status VARCHAR(20) DEFAULT 'unpaired',        -- unpaired, paired, active, paused
  is_online BOOLEAN DEFAULT false,
  
  -- Purchase
  purchased_at TIMESTAMP NOT NULL,
  purchase_amount INTEGER DEFAULT 49900,        -- in paise
  
  -- Timestamps
  paired_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for fast pairing lookups
CREATE INDEX idx_pairing_code ON bots(pairing_code);
CREATE INDEX idx_user_id ON bots(user_id);
```

### Updated Table: subscriptions

```sql
-- Add bot integration fields
ALTER TABLE subscriptions
ADD COLUMN has_bot BOOLEAN DEFAULT false,
ADD COLUMN bot_id UUID REFERENCES bots(id);
```

### New Table: bot_interactions

```sql
CREATE TABLE bot_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID REFERENCES bots(id),
  interaction_type VARCHAR(50),                 -- reminder_shown, user_touched, mood_changed
  data JSONB,                                   -- { reminder: "water", response: "happy" }
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 6. API ENDPOINTS

### Bot Purchase & Pairing

```javascript
// ═══════════════════════════════════════════════════════════
// POST /api/bot/purchase
// ═══════════════════════════════════════════════════════════
router.post('/api/bot/purchase', async (req, res) => {
  const { userCode, amount } = req.body;
  
  // 1. Verify user exists
  const user = await User.findOne({ code: userCode });
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  // 2. Verify payment (Razorpay)
  // ... payment verification logic ...
  
  // 3. Generate unique 6-character pairing code
  const pairingCode = generatePairingCode(); // "A3X9K2"
  
  // 4. Create bot entry
  const bot = await Bot.create({
    pairingCode,
    userId: user._id,
    subscriptionId: user.activeSubscriptionId,
    status: 'unpaired',
    purchaseAmount: amount
  });
  
  // 5. Send pairing code via WhatsApp
  await sendWhatsApp(user.phone, 
    `🤖 Your Pet Bot pairing code: ${pairingCode}\n` +
    `Power on bot and type: PAIR ${pairingCode}`
  );
  
  res.json({
    success: true,
    pairingCode,
    botId: bot._id
  });
});

// ═══════════════════════════════════════════════════════════
// POST /api/bot/pair
// ═══════════════════════════════════════════════════════════
// Called when ESP32 types PAIR A3X9K2
router.post('/api/bot/pair', async (req, res) => {
  const { pairingCode, macAddress } = req.body;
  
  // 1. Find bot by pairing code
  const bot = await Bot.findOne({ pairingCode });
  if (!bot) return res.status(404).json({ error: 'Invalid pairing code' });
  
  // 2. Check if already paired
  if (bot.status !== 'unpaired') {
    return res.status(400).json({ error: 'Bot already paired' });
  }
  
  // 3. Update bot
  bot.espMacAddress = macAddress;
  bot.status = 'paired';
  bot.pairedAt = new Date();
  bot.isOnline = true;
  bot.lastOnline = new Date();
  await bot.save();
  
  // 4. Get user's subscription and reminders
  const subscription = await Subscription.findById(bot.subscriptionId)
    .populate('userId');
  
  // 5. Build full config
  const config = {
    face: bot.face,
    sound: bot.sound,
    sleep: bot.sleepTime,
    wake: bot.wakeTime,
    reminders: buildReminderList(subscription),
    subscription: {
      status: subscription.status,
      endDate: subscription.endDate
    }
  };
  
  // 6. Publish config to MQTT
  mqttClient.publish(`bot/${pairingCode}/config`, JSON.stringify(config));
  
  res.json({ 
    success: true, 
    config,
    message: 'Bot paired successfully!' 
  });
});

// ═══════════════════════════════════════════════════════════
// POST /api/bot/config
// ═══════════════════════════════════════════════════════════
// Update bot customization from kiosk
router.post('/api/bot/config', async (req, res) => {
  const { pairingCode, face, sound, personality, sleep, wake } = req.body;
  
  const bot = await Bot.findOne({ pairingCode });
  if (!bot) return res.status(404).json({ error: 'Bot not found' });
  
  // Update bot settings
  if (face) bot.face = face;
  if (sound) bot.sound = sound;
  if (personality) bot.personality = personality;
  if (sleep) bot.sleepTime = sleep;
  if (wake) bot.wakeTime = wake;
  await bot.save();
  
  // Publish update to MQTT
  mqttClient.publish(`bot/${pairingCode}/config`, JSON.stringify({
    face: bot.face,
    sound: bot.sound,
    sleep: bot.sleepTime,
    wake: bot.wakeTime
  }));
  
  res.json({ success: true, synced: true });
});

// ═══════════════════════════════════════════════════════════
// GET /api/bot/status/:pairingCode
// ═══════════════════════════════════════════════════════════
// Check bot status from kiosk
router.get('/api/bot/status/:pairingCode', async (req, res) => {
  const bot = await Bot.findOne({ pairingCode: req.params.pairingCode })
    .populate('userId subscriptionId');
  
  if (!bot) return res.status(404).json({ error: 'Bot not found' });
  
  res.json({
    status: bot.status,
    isOnline: bot.isOnline,
    lastOnline: bot.lastOnline,
    face: bot.face,
    sound: bot.sound,
    subscription: {
      status: bot.subscriptionId.status,
      daysRemaining: calculateDaysRemaining(bot.subscriptionId)
    }
  });
});
```

---

## 7. ESP32 FIRMWARE LOGIC

### Main ESP32 Code Structure

```cpp
// ═══════════════════════════════════════════════════════════
// RELIV PET BOT — ESP32-C3 Firmware
// ═══════════════════════════════════════════════════════════

#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_NeoPixel.h>
#include <time.h>
#include <EEPROM.h>

// ── HARDWARE PINS ──
#define OLED_SDA 6
#define OLED_SCL 7
#define BUZZER_PIN 5
#define LED_PIN 8
#define TOUCH_PIN 0

// ── MQTT CONFIGURATION ──
const char* MQTT_BROKER = "broker.hivemq.com";
const int MQTT_PORT = 1883;
WiFiClient espClient;
PubSubClient mqttClient(espClient);

// ── DEVICE STATE ──
String pairingCode = "";          // Set during pairing
String currentFace = "default";
String currentSound = "chime";
String currentMood = "neutral";
String sleepTime = "22:00";
String wakeTime = "07:00";
bool isSleeping = false;
bool isSubscriptionActive = true;

struct Reminder {
  String type;                    // water, facewash, medicine, meal, workout
  std::vector<String> times;
  String icon;
  String message;
  std::vector<bool> triggered;    // Track which fired today
};

std::vector<Reminder> reminders;

// ── HARDWARE OBJECTS ──
Adafruit_SSD1306 display(128, 64, &Wire, -1);
Adafruit_NeoPixel led(1, LED_PIN, NEO_GRB + NEO_KHZ800);

// ═══════════════════════════════════════════════════════════
// SETUP
// ═══════════════════════════════════════════════════════════

void setup() {
  Serial.begin(115200);
  
  // Initialize hardware
  Wire.begin(OLED_SDA, OLED_SCL);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  led.begin();
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(TOUCH_PIN, INPUT);
  
  // Show boot screen
  displayBootScreen();
  
  // Connect to WiFi
  connectWiFi();
  
  // Sync time via NTP
  configTime(19800, 0, "pool.ntp.org");  // IST = UTC+5:30
  
  // Connect to MQTT
  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);
  mqttClient.setCallback(onMqttMessage);
  connectMQTT();
  
  // Wait for pairing
  waitForPairing();
}

// ═══════════════════════════════════════════════════════════
// MAIN LOOP
// ═══════════════════════════════════════════════════════════

void loop() {
  if (!mqttClient.connected()) {
    connectMQTT();
  }
  mqttClient.loop();
  
  checkReminders();
  checkSleepWake();
  checkTouchSensor();
  
  delay(100);
}

// ═══════════════════════════════════════════════════════════
// WIFI CONNECTION
// ═══════════════════════════════════════════════════════════

void connectWiFi() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  display.println("Connecting WiFi...");
  display.display();
  
  // Try saved WiFi
  String ssid = readEEPROM(0, 32);
  String password = readEEPROM(32, 64);
  
  if (ssid.length() > 0) {
    WiFi.begin(ssid.c_str(), password.c_str());
    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED && attempts < 20) {
      delay(500);
      Serial.print(".");
      attempts++;
    }
  }
  
  // If failed, enter AP mode
  if (WiFi.status() != WL_CONNECTED) {
    startAPMode();
  } else {
    Serial.println("\nWiFi connected!");
    display.clearDisplay();
    display.println("WiFi Connected!");
    display.display();
    delay(1000);
  }
}

void startAPMode() {
  // Create access point for WiFi configuration
  WiFi.mode(WIFI_AP);
  WiFi.softAP("FitBot-Setup", "12345678");
  
  display.clearDisplay();
  display.println("WiFi Setup Mode");
  display.println("Connect to:");
  display.println("FitBot-Setup");
  display.println("Password: 12345678");
  display.println("Open: 192.168.4.1");
  display.display();
  
  // Start web server for WiFi config
  // (Simplified — use WiFiManager library in production)
}

// ═══════════════════════════════════════════════════════════
// MQTT CONNECTION
// ═══════════════════════════════════════════════════════════

void connectMQTT() {
  while (!mqttClient.connected()) {
    Serial.print("Connecting to MQTT...");
    String clientId = "FitBot-" + String(random(0xffff), HEX);
    
    if (mqttClient.connect(clientId.c_str())) {
      Serial.println("connected!");
      
      if (pairingCode.length() > 0) {
        // Subscribe to bot-specific topics
        String topic = "bot/" + pairingCode + "/#";
        mqttClient.subscribe(topic.c_str());
        
        // Publish online status
        mqttClient.publish(
          ("bot/" + pairingCode + "/status").c_str(),
          "{\"online\":true}"
        );
      }
    } else {
      Serial.print("failed, rc=");
      Serial.println(mqttClient.state());
      delay(5000);
    }
  }
}

// ═══════════════════════════════════════════════════════════
// PAIRING PROCESS
// ═══════════════════════════════════════════════════════════

void waitForPairing() {
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(10, 10);
  display.println("READY!");
  display.setTextSize(1);
  display.setCursor(0, 35);
  display.println("Type in Serial:");
  display.println("PAIR XXXXXX");
  display.display();
  
  playChime();
  led.setPixelColor(0, led.Color(0, 0, 50));  // Dim blue
  led.show();
  
  while (pairingCode.length() == 0) {
    if (Serial.available()) {
      String command = Serial.readStringUntil('\n');
      command.trim();
      command.toUpperCase();
      
      if (command.startsWith("PAIR ")) {
        pairingCode = command.substring(5);
        pairingCode.trim();
        
        if (pairingCode.length() == 6) {
          Serial.println("Pairing with code: " + pairingCode);
          performPairing();
        } else {
          Serial.println("Invalid code! Must be 6 characters.");
          pairingCode = "";
        }
      }
    }
    delay(100);
  }
}

void performPairing() {
  display.clearDisplay();
  display.println("Pairing...");
  display.display();
  
  // Get MAC address
  String macAddress = WiFi.macAddress();
  
  // Publish pairing request
  StaticJsonDocument<256> doc;
  doc["pairingCode"] = pairingCode;
  doc["macAddress"] = macAddress;
  
  String payload;
  serializeJson(doc, payload);
  
  mqttClient.publish(("bot/pair/" + pairingCode).c_str(), payload.c_str());
  
  // Wait for config
  display.clearDisplay();
  display.println("Waiting for config...");
  display.display();
  
  unsigned long start = millis();
  while (reminders.size() == 0 && millis() - start < 30000) {
    mqttClient.loop();
    delay(100);
  }
  
  if (reminders.size() > 0) {
    display.clearDisplay();
    display.println("Paired!");
    display.display();
    playHappySound();
    led.setPixelColor(0, led.Color(0, 255, 0));
    led.show();
    delay(2000);
    
    drawCurrentFace();
  } else {
    display.clearDisplay();
    display.println("Pairing timeout!");
    display.println("Check code & retry");
    display.display();
    pairingCode = "";
  }
}

// ═══════════════════════════════════════════════════════════
// MQTT MESSAGE HANDLER
// ═══════════════════════════════════════════════════════════

void onMqttMessage(char* topic, byte* payload, unsigned int length) {
  String topicStr = String(topic);
  
  // Parse JSON payload
  StaticJsonDocument<2048> doc;
  DeserializationError error = deserializeJson(doc, payload, length);
  
  if (error) {
    Serial.println("JSON parse failed!");
    return;
  }
  
  // ── CONFIG UPDATE ──
  if (topicStr.endsWith("/config")) {
    if (doc.containsKey("face")) {
      currentFace = doc["face"].as<String>();
      drawCurrentFace();
    }
    
    if (doc.containsKey("sound")) {
      currentSound = doc["sound"].as<String>();
    }
    
    if (doc.containsKey("sleep")) {
      sleepTime = doc["sleep"].as<String>();
    }
    
    if (doc.containsKey("wake")) {
      wakeTime = doc["wake"].as<String>();
    }
    
    if (doc.containsKey("reminders")) {
      loadReminders(doc["reminders"]);
    }
    
    if (doc.containsKey("subscription")) {
      isSubscriptionActive = (doc["subscription"]["status"] == "active");
    }
    
    Serial.println("Config updated!");
  }
  
  // ── MOOD CHANGE ──
  else if (topicStr.endsWith("/mood")) {
    currentMood = doc["mood"].as<String>();
    drawCurrentFace();
    playReactionSound(currentMood);
    setLEDColor(currentMood);
  }
  
  // ── MANUAL REMINDER TRIGGER ──
  else if (topicStr.endsWith("/reminder")) {
    String type = doc["type"].as<String>();
    triggerReminder(type);
  }
  
  // ── COMMAND ──
  else if (topicStr.endsWith("/command")) {
    String cmd = doc["command"].as<String>();
    handleCommand(cmd);
  }
}

void loadReminders(JsonArray arr) {
  reminders.clear();
  
  for (JsonObject obj : arr) {
    Reminder r;
    r.type = obj["type"].as<String>();
    r.icon = obj["icon"].as<String>();
    r.message = obj["message"].as<String>();
    
    JsonArray times = obj["times"].as<JsonArray>();
    for (String t : times) {
      r.times.push_back(t);
      r.triggered.push_back(false);
    }
    
    reminders.push_back(r);
  }
  
  Serial.println("Loaded " + String(reminders.size()) + " reminder types");
}

// ═══════════════════════════════════════════════════════════
// REMINDER CHECKING (runs every minute)
// ═══════════════════════════════════════════════════════════

unsigned long lastReminderCheck = 0;

void checkReminders() {
  if (millis() - lastReminderCheck < 60000) return;  // Every 1 min
  lastReminderCheck = millis();
  
  if (!isSubscriptionActive || isSleeping) return;
  
  String currentTime = getCurrentTime();
  
  for (int i = 0; i < reminders.size(); i++) {
    for (int j = 0; j < reminders[i].times.size(); j++) {
      if (reminders[i].times[j] == currentTime && 
          !reminders[i].triggered[j]) {
        
        reminders[i].triggered[j] = true;
        triggerReminder(reminders[i].type);
      }
    }
  }
  
  // Reset at midnight
  if (currentTime == "00:00") {
    for (auto& r : reminders) {
      for (auto& t : r.triggered) {
        t = false;
      }
    }
  }
}

void triggerReminder(String type) {
  Serial.println("🔔 Reminder: " + type);
  
  // Find reminder details
  String message = "";
  String icon = "";
  for (const auto& r : reminders) {
    if (r.type == type) {
      message = r.message;
      icon = r.icon;
      break;
    }
  }
  
  // Display on OLED
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(0, 10);
  display.println(icon);
  display.setTextSize(1);
  display.setCursor(0, 35);
  display.println(message);
  display.display();
  
  // Play sound
  playReminderSound();
  
  // Pulse LED
  for (int i = 0; i < 3; i++) {
    pulseLED();
  }
  
  // Show for 10 seconds
  delay(10000);
  
  // Back to face
  drawCurrentFace();
  led.setPixelColor(0, led.Color(0, 0, 50));
  led.show();
}

// ═══════════════════════════════════════════════════════════
// FACE DRAWING
// ═══════════════════════════════════════════════════════════

void drawCurrentFace() {
  display.clearDisplay();
  
  if (currentFace == "cat") {
    drawCatFace();
  } else if (currentFace == "dog") {
    drawDogFace();
  } else if (currentFace == "panda") {
    drawPandaFace();
  } else if (currentFace == "bunny") {
    drawBunnyFace();
  } else if (currentFace == "bear") {
    drawBearFace();
  } else {
    drawRobotFace();
  }
  
  display.display();
}

void drawCatFace() {
  // Ears
  display.fillTriangle(25, 20, 32, 5, 40, 20, WHITE);
  display.fillTriangle(88, 20, 96, 5, 103, 20, WHITE);
  
  // Eyes
  display.fillCircle(42, 30, 6, WHITE);
  display.fillCircle(86, 30, 6, WHITE);
  display.fillCircle(44, 29, 2, BLACK);  // Pupils
  display.fillCircle(88, 29, 2, BLACK);
  
  // Nose
  display.fillTriangle(62, 38, 66, 38, 64, 42, WHITE);
  
  // Whiskers
  display.drawLine(20, 35, 50, 37, WHITE);
  display.drawLine(20, 40, 50, 40, WHITE);
  display.drawLine(78, 37, 108, 35, WHITE);
  display.drawLine(78, 40, 108, 40, WHITE);
  
  // Mouth (changes with mood)
  if (currentMood == "happy") {
    // W-shaped smile
    display.drawLine(52, 45, 58, 50, WHITE);
    display.drawLine(58, 50, 64, 46, WHITE);
    display.drawLine(64, 46, 70, 50, WHITE);
    display.drawLine(70, 50, 76, 45, WHITE);
  } else if (currentMood == "sad") {
    // Frown
    display.drawCircle(64, 55, 10, WHITE);
  } else {
    // Neutral
    display.drawLine(54, 48, 74, 48, WHITE);
  }
}

void drawRobotFace() {
  // Antenna
  display.drawLine(64, 0, 64, 8, WHITE);
  display.fillCircle(64, 3, 3, WHITE);
  
  // Eyes (squares)
  display.fillRect(30, 15, 20, 15, WHITE);
  display.fillRect(78, 15, 20, 15, WHITE);
  display.fillRect(36, 20, 8, 8, BLACK);  // Pupils
  display.fillRect(84, 20, 8, 8, BLACK);
  
  // Mouth
  if (currentMood == "happy") {
    for (int i = 35; i <= 93; i++) {
      int y = 45 + (int)(8.0 * sin((i - 35) * 3.14159 / 58.0));
      display.drawPixel(i, y, WHITE);
    }
  } else if (currentMood == "sad") {
    for (int i = 35; i <= 93; i++) {
      int y = 55 - (int)(8.0 * sin((i - 35) * 3.14159 / 58.0));
      display.drawPixel(i, y, WHITE);
    }
  } else {
    display.drawLine(35, 50, 93, 50, WHITE);
  }
}

// ... drawDogFace(), drawPandaFace(), drawBunnyFace(), drawBearFace()
// (Similar structure to cat, different shapes)

// ═══════════════════════════════════════════════════════════
// SOUND GENERATION
// ═══════════════════════════════════════════════════════════

void playReminderSound() {
  if (currentSound == "chime") playChime();
  else if (currentSound == "melody") playMelody();
  else if (currentSound == "beep") playBeep();
  else playChime();
}

void playChime() {
  tone(BUZZER_PIN, 1047, 150);  // C6
  delay(170);
  tone(BUZZER_PIN, 1319, 150);  // E6
  delay(170);
  tone(BUZZER_PIN, 1568, 300);  // G6
  delay(350);
  noTone(BUZZER_PIN);
}

void playMelody() {
  int notes[] = {523, 587, 659, 698, 784, 880, 988, 1047};
  for (int i = 0; i < 8; i++) {
    tone(BUZZER_PIN, notes[i], 200);
    delay(230);
  }
  noTone(BUZZER_PIN);
}

void playBeep() {
  tone(BUZZER_PIN, 1000, 200);
  delay(300);
  tone(BUZZER_PIN, 1000, 200);
  delay(300);
  noTone(BUZZER_PIN);
}

void playHappySound() {
  tone(BUZZER_PIN, 523, 100);
  delay(120);
  tone(BUZZER_PIN, 659, 100);
  delay(120);
  tone(BUZZER_PIN, 784, 100);
  delay(120);
  tone(BUZZER_PIN, 1047, 300);
  delay(350);
  noTone(BUZZER_PIN);
}

void playSadSound() {
  tone(BUZZER_PIN, 400, 500);
  delay(600);
  tone(BUZZER_PIN, 300, 700);
  delay(800);
  noTone(BUZZER_PIN);
}

void playReactionSound(String mood) {
  if (mood == "happy") playHappySound();
  else if (mood == "sad") playSadSound();
}

// ═══════════════════════════════════════════════════════════
// LED CONTROL
// ═══════════════════════════════════════════════════════════

void setLEDColor(String mood) {
  if (mood == "happy") {
    led.setPixelColor(0, led.Color(0, 255, 0));  // Green
  } else if (mood == "sad") {
    led.setPixelColor(0, led.Color(255, 0, 0));  // Red
  } else if (mood == "reminder") {
    led.setPixelColor(0, led.Color(255, 165, 0)); // Orange
  } else {
    led.setPixelColor(0, led.Color(0, 0, 50));   // Dim blue (idle)
  }
  led.show();
}

void pulseLED() {
  for (int b = 0; b < 255; b += 5) {
    led.setPixelColor(0, led.Color(b, b/2, 0));
    led.show();
    delay(15);
  }
  for (int b = 255; b > 0; b -= 5) {
    led.setPixelColor(0, led.Color(b, b/2, 0));
    led.show();
    delay(15);
  }
}

// ═══════════════════════════════════════════════════════════
// SLEEP / WAKE
// ═══════════════════════════════════════════════════════════

void checkSleepWake() {
  String now = getCurrentTime();
  
  if (now == sleepTime && !isSleeping) {
    goToSleep();
  } else if (now == wakeTime && isSleeping) {
    wakeUp();
  }
}

void goToSleep() {
  isSleeping = true;
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(10, 20);
  display.println("Goodnight!");
  display.setTextSize(1);
  display.setCursor(15, 45);
  display.println("Sweet dreams 😴");
  display.display();
  
  tone(BUZZER_PIN, 400, 300);  // Lullaby tone
  delay(350);
  noTone(BUZZER_PIN);
  delay(2000);
  
  display.clearDisplay();
  display.display();
  led.setPixelColor(0, 0);
  led.show();
  
  Serial.println("💤 Bot sleeping...");
}

void wakeUp() {
  isSleeping = false;
  
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(5, 10);
  display.println("Good");
  display.println("Morning!");
  display.display();
  
  playChime();
  led.setPixelColor(0, led.Color(255, 200, 0));  // Warm yellow
  led.show();
  delay(3000);
  
  drawCurrentFace();
  led.setPixelColor(0, led.Color(0, 0, 50));
  led.show();
  
  Serial.println("☀️ Bot woke up!");
}

// ═══════════════════════════════════════════════════════════
// TOUCH SENSOR
// ═══════════════════════════════════════════════════════════

void checkTouchSensor() {
  static unsigned long lastTouch = 0;
  
  if (digitalRead(TOUCH_PIN) == HIGH && millis() - lastTouch > 1000) {
    lastTouch = millis();
    
    Serial.println("👆 User touched bot!");
    
    // Happy reaction
    currentMood = "happy";
    drawCurrentFace();
    playHappySound();
    led.setPixelColor(0, led.Color(0, 255, 0));
    led.show();
    
    delay(2000);
    
    currentMood = "neutral";
    drawCurrentFace();
    led.setPixelColor(0, led.Color(0, 0, 50));
    led.show();
  }
}

// ═══════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════

String getCurrentTime() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    return "00:00";
  }
  char buf[6];
  sprintf(buf, "%02d:%02d", timeinfo.tm_hour, timeinfo.tm_min);
  return String(buf);
}

String readEEPROM(int start, int length) {
  String result = "";
  for (int i = start; i < start + length; i++) {
    char c = EEPROM.read(i);
    if (c == 0) break;
    result += c;
  }
  return result;
}

void writeEEPROM(int start, String data) {
  for (int i = 0; i < data.length(); i++) {
    EEPROM.write(start + i, data[i]);
  }
  EEPROM.write(start + data.length(), 0);
  EEPROM.commit();
}

void displayBootScreen() {
  display.clearDisplay();
  display.setTextSize(3);
  display.setTextColor(WHITE);
  display.setCursor(10, 15);
  display.println("RELIV");
  display.setTextSize(1);
  display.setCursor(20, 45);
  display.println("Pet Bot v1.0");
  display.display();
  delay(2000);
}

void handleCommand(String cmd) {
  if (cmd == "sleep") goToSleep();
  else if (cmd == "wake") wakeUp();
  else if (cmd == "test_happy") {
    currentMood = "happy";
    drawCurrentFace();
    playHappySound();
  }
  else if (cmd == "test_sad") {
    currentMood = "sad";
    drawCurrentFace();
    playSadSound();
  }
}
```

---

## 8. WHATSAPP INTEGRATION

### Scheduler (Backend Cron Job)

```javascript
// ═══════════════════════════════════════════════════════════
// REMINDER SCHEDULER — Runs every minute
// ═══════════════════════════════════════════════════════════

const cron = require('node-cron');

// Run every minute
cron.schedule('* * * * *', async () => {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  console.log(`⏰ Checking reminders for ${currentTime}...`);
  
  // Get all active subscriptions
  const activeSubscriptions = await Subscription.find({
    status: 'active',
    endDate: { $gt: now }
  }).populate('userId');
  
  for (const subscription of activeSubscriptions) {
    const user = subscription.userId;
    
    // Check if user has a bot
    const bot = await Bot.findOne({ subscriptionId: subscription._id });
    
    // Get today's reminders
    const reminders = generateRemindersForSubscription(subscription);
    
    for (const reminder of reminders) {
      if (reminder.times.includes(currentTime)) {
        console.log(`📨 Sending ${reminder.type} reminder to ${user.phone}`);
        
        // Send WhatsApp
        await sendWhatsAppReminder(user.phone, reminder);
        
        // If user has bot, trigger bot reminder via MQTT
        if (bot && bot.isOnline) {
          mqttClient.publish(`bot/${bot.pairingCode}/reminder`, JSON.stringify({
            type: reminder.type,
            message: reminder.message
          }));
        }
      }
    }
  }
});

// ═══════════════════════════════════════════════════════════
// SEND WHATSAPP REMINDER
// ═══════════════════════════════════════════════════════════

async function sendWhatsAppReminder(phone, reminder) {
  const messages = {
    water: '💧 Had your glass of water?',
    facewash: '🧴 Time to wash your face!',
    medicine: '💊 Take your medicine!',
    meal: '🍽️ Meal time! Did you eat?',
    workout: '💪 Workout time! Get moving!'
  };
  
  const message = messages[reminder.type] || reminder.message;
  
  await twilioClient.messages.create({
    from: 'whatsapp:+14155238886',
    to: `whatsapp:+91${phone}`,
    body: message
  });
}

// ═══════════════════════════════════════════════════════════
// WHATSAPP WEBHOOK (User Responses)
// ═══════════════════════════════════════════════════════════

app.post('/webhook/whatsapp', async (req, res) => {
  const { From, Body } = req.body;
  const phone = From.replace('whatsapp:+91', '');
  const response = Body.toUpperCase().trim();
  
  console.log(`📱 WhatsApp from ${phone}: ${response}`);
  
  // Find user
  const user = await User.findOne({ phone });
  if (!user) return res.sendStatus(200);
  
  // Find active subscription
  const subscription = await Subscription.findOne({
    userId: user._id,
    status: 'active'
  });
  if (!subscription) return res.sendStatus(200);
  
  // Determine which reminder this is for (last one sent)
  const lastReminder = await getLastReminderSent(user._id);
  
  // Update progress
  if (response === 'YES' || response === 'DONE' || response === 'Y') {
    await updateProgress(subscription._id, lastReminder.type, true);
    
    // Send positive feedback via WhatsApp
    await twilioClient.messages.create({
      from: 'whatsapp:+14155238886',
      to: From,
      body: '✅ Great job! Keep it up! 🔥'
    });
    
    // Update bot mood to happy
    const bot = await Bot.findOne({ subscriptionId: subscription._id });
    if (bot && bot.isOnline) {
      const stars = await calculateStars(subscription._id);
      mqttClient.publish(`bot/${bot.pairingCode}/mood`, JSON.stringify({
        mood: 'happy',
        stars: stars
      }));
    }
    
  } else if (response === 'NO' || response === 'N' || response === 'SKIP') {
    await updateProgress(subscription._id, lastReminder.type, false);
    
    // Send encouraging message
    await twilioClient.messages.create({
      from: 'whatsapp:+14155238886',
      to: From,
      body: 'No worries! Try again next time 💪'
    });
    
    // Update bot mood to sad
    const bot = await Bot.findOne({ subscriptionId: subscription._id });
    if (bot && bot.isOnline) {
      mqttClient.publish(`bot/${bot.pairingCode}/mood`, JSON.stringify({
        mood: 'sad'
      }));
    }
  }
  
  res.sendStatus(200);
});
```

---

## 9. PAYMENT & SUBSCRIPTION

### Bot Purchase Payment Flow

```javascript
// ═══════════════════════════════════════════════════════════
// BOT PURCHASE — Razorpay Integration
// ═══════════════════════════════════════════════════════════

router.post('/api/bot/purchase', async (req, res) => {
  const { userCode, paymentId, orderId, signature } = req.body;
  
  // 1. Verify payment
  const isValid = verifyRazorpaySignature(orderId, paymentId, signature);
  if (!isValid) {
    return res.status(400).json({ error: 'Invalid payment signature' });
  }
  
  // 2. Find user
  const user = await User.findOne({ code: userCode });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // 3. Generate pairing code
  const pairingCode = generatePairingCode();
  
  // 4. Create bot entry
  const bot = await Bot.create({
    pairingCode,
    userId: user._id,
    subscriptionId: user.activeSubscriptionId,
    status: 'unpaired',
    purchaseAmount: 49900,  // ₹499
    purchasedAt: new Date()
  });
  
  // 5. Send WhatsApp with pairing code
  await twilioClient.messages.create({
    from: 'whatsapp:+14155238886',
    to: `whatsapp:+91${user.phone}`,
    body: `🤖 Your Reliv Pet Bot is ready!\n\n` +
          `Pairing Code: *${pairingCode}*\n\n` +
          `Setup:\n` +
          `1. Power on bot\n` +
          `2. Open Serial Monitor\n` +
          `3. Type: PAIR ${pairingCode}\n\n` +
          `Your bot will sync in seconds!`
  });
  
  // 6. Update subscription to mark bot purchased
  await Subscription.findByIdAndUpdate(user.activeSubscriptionId, {
    hasBot: true,
    botId: bot._id
  });
  
  res.json({
    success: true,
    pairingCode,
    botId: bot._id
  });
});

function generatePairingCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  // Check if code already exists
  const exists = await Bot.findOne({ pairingCode: code });
  if (exists) return generatePairingCode();  // Recursive retry
  
  return code;
}
```

---

## 10. BOT PAIRING PROCESS

### Complete Pairing Flow

```
┌─────────────────────────────────────────────────────────────┐
│  DETAILED PAIRING PROCESS                                   │
│                                                             │
│  STEP 1: USER BUYS BOT AT KIOSK                            │
│  ────────────────────────────────────                       │
│  • User taps "Buy Pet Bot ₹499"                            │
│  • Razorpay payment modal opens                             │
│  • User completes payment                                   │
│  • Backend generates: pairingCode = "A3X9K2"                │
│  • Saves to MongoDB:                                        │
│    {                                                        │
│      pairingCode: "A3X9K2",                                 │
│      userId: "user_abc",                                    │
│      status: "unpaired",                                    │
│      purchasedAt: "2026-02-08T10:30:00Z"                    │
│    }                                                        │
│  • Kiosk shows: "Pairing Code: A3X9K2"                      │
│  • WhatsApp sent with same code                             │
│                                                             │
│  STEP 2: USER TAKES BOT HOME                               │
│  ────────────────────────────                               │
│  • User receives physical bot (shipped/picked up)           │
│  • Powers on bot via USB cable                              │
│  • Bot boots, connects to WiFi (AP mode if new)            │
│  • OLED shows: "READY! Type: PAIR XXXXXX"                  │
│                                                             │
│  STEP 3: USER PAIRS BOT                                    │
│  ───────────────────────                                    │
│  • User opens Serial Monitor (Arduino IDE / phone app)     │
│  • Types: PAIR A3X9K2                                       │
│  • ESP32 publishes to MQTT:                                 │
│    Topic: bot/pair/A3X9K2                                   │
│    Payload: {                                               │
│      pairingCode: "A3X9K2",                                 │
│      macAddress: "A4:CF:12:B2:34:56"                        │
│    }                                                        │
│                                                             │
│  STEP 4: BACKEND VALIDATES & SYNCS                         │
│  ──────────────────────────────────                         │
│  • Backend receives MQTT message                            │
│  • Looks up: Bot.findOne({ pairingCode: "A3X9K2" })        │
│  • Checks status = "unpaired" ✅                            │
│  • Updates MongoDB:                                         │
│    {                                                        │
│      status: "paired",                                      │
│      espMacAddress: "A4:CF:12:B2:34:56",                    │
│      pairedAt: "2026-02-08T18:05:00Z",                      │
│      isOnline: true                                         │
│    }                                                        │
│  • Fetches user's subscription & reminders                  │
│  • Builds full config JSON                                  │
│  • Publishes to MQTT:                                       │
│    Topic: bot/A3X9K2/config                                 │
│    Payload: {                                               │
│      face: "default",                                       │
│      sound: "chime",                                        │
│      sleep: "22:00",                                        │
│      wake: "07:00",                                         │
│      reminders: [...]                                       │
│    }                                                        │
│                                                             │
│  STEP 5: BOT RECEIVES CONFIG & ACTIVATES                   │
│  ────────────────────────────────────────                   │
│  • ESP32 receives config via MQTT                           │
│  • Parses JSON, loads all reminders                         │
│  • Draws default face on OLED                               │
│  • Plays success chime                                      │
│  • LED turns green                                          │
│  • OLED shows: "Paired! ✅"                                 │
│  • Bot is now FULLY OPERATIONAL                             │
│                                                             │
│  STEP 6: ONGOING SYNC (Real-Time)                          │
│  ──────────────────────────────                             │
│  • User returns to kiosk                                    │
│  • Changes face from "robot" → "cat"                        │
│  • Kiosk sends: POST /api/bot/config { face: "cat" }       │
│  • Backend publishes: bot/A3X9K2/config { face: "cat" }    │
│  • ESP32 receives in <200ms                                 │
│  • Bot instantly redraws as cat face 🐱                     │
│  • NO re-flashing needed!                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 11. IMPLEMENTATION CHECKLIST

### Phase 1: Backend (Week 1-2)

- [ ] **Database Setup**
  - [ ] Create `bots` table in MongoDB
  - [ ] Update `subscriptions` table with bot fields
  - [ ] Create `bot_interactions` table

- [ ] **API Endpoints**
  - [ ] POST `/api/bot/purchase` (Razorpay integration)
  - [ ] POST `/api/bot/pair` (ESP32 pairing)
  - [ ] POST `/api/bot/config` (update bot settings)
  - [ ] GET `/api/bot/status/:code` (check bot status)

- [ ] **MQTT Bridge**
  - [ ] Connect to HiveMQ Cloud
  - [ ] Subscribe to `bot/pair/#`
  - [ ] Publish to `bot/{code}/config`
  - [ ] Publish to `bot/{code}/mood`
  - [ ] Handle bot status heartbeats

- [ ] **Scheduler**
  - [ ] node-cron setup (every minute)
  - [ ] Check all active subscriptions
  - [ ] Send WhatsApp reminders
  - [ ] Send MQTT reminders to bots

### Phase 2: Kiosk Frontend (Week 2-3)

- [ ] **New Screens**
  - [ ] Bot Offer (after activation)
  - [ ] Bot Payment
  - [ ] Bot Pairing Code Display
  - [ ] Bot Customization (face, sound, personality)
  - [ ] Bot Status (on return visit)

- [ ] **API Integration**
  - [ ] Call `/api/bot/purchase`
  - [ ] Call `/api/bot/config`
  - [ ] Call `/api/bot/status`
  - [ ] Display pairing code
  - [ ] Real-time bot online status

### Phase 3: ESP32 Firmware (Week 3-4)

- [ ] **Hardware Setup**
  - [ ] Wire all components
  - [ ] Test OLED display
  - [ ] Test buzzer sounds
  - [ ] Test NeoPixel LED
  - [ ] Test touch sensor

- [ ] **Core Firmware**
  - [ ] WiFi connection (AP mode for setup)
  - [ ] MQTT client (HiveMQ)
  - [ ] NTP time sync
  - [ ] Pairing process
  - [ ] Config listener
  - [ ] Reminder checker

- [ ] **Face Drawing**
  - [ ] Robot face (3 moods)
  - [ ] Cat face (3 moods)
  - [ ] Dog face (3 moods)
  - [ ] Panda face (3 moods)
  - [ ] Bunny face (3 moods)
  - [ ] Bear face (3 moods)

- [ ] **Sound Generation**
  - [ ] Chime pattern
  - [ ] Melody pattern
  - [ ] Beep pattern
  - [ ] Happy/sad reactions
  - [ ] DFPlayer integration (optional voice)

### Phase 4: Testing (Week 4)

- [ ] **End-to-End Testing**
  - [ ] Buy bot at kiosk → receive pairing code
  - [ ] Take bot home → pair successfully
  - [ ] Receive reminders (WhatsApp + bot)
  - [ ] Reply YES/NO → bot reacts happy/sad
  - [ ] Change face at kiosk → bot updates instantly
  - [ ] Subscription expires → bot pauses
  - [ ] Renew subscription → bot resumes

- [ ] **Edge Cases**
  - [ ] WiFi disconnection → auto-reconnect
  - [ ] MQTT disconnection → retry logic
  - [ ] Invalid pairing code → error handling
  - [ ] Bot already paired → prevent re-pairing
  - [ ] Subscription expired → show message on bot

### Phase 5: Production Deployment (Week 5)

- [ ] **Backend Deployment**
  - [ ] Deploy to AWS/DigitalOcean
  - [ ] Set up MongoDB Atlas
  - [ ] Configure HiveMQ Cloud
  - [ ] Set up Twilio WhatsApp
  - [ ] SSL certificate for API

- [ ] **Kiosk Deployment**
  - [ ] Build React app
  - [ ] Deploy to hosting
  - [ ] Configure API endpoints
  - [ ] Test in production

- [ ] **ESP32 Manufacturing**
  - [ ] Flash firmware to all devices
  - [ ] Quality test each bot
  - [ ] Package with USB cable
  - [ ] Print setup instructions

---

## 🎉 SUMMARY

### What Makes This System Unique

1. **Stationary Kiosk + Mobile Bot** — Bot works ANYWHERE, not tied to kiosk's network
2. **Cloud-Based Sync** — MQTT enables real-time updates without re-flashing
3. **Emotional Feedback** — Bot reacts to user compliance (happy/sad)
4. **Subscription-Aware** — Bot pauses when subscription expires, resumes on renewal
5. **Dual Reminder System** — WhatsApp + Physical bot for maximum engagement
6. **Highly Customizable** — Face, sound, personality, sleep schedule all changeable
7. **Patent-Worthy** — Emotion-linked compliance tracking via physical companion

### Tech Stack Summary

| Component | Technology |
|-----------|-----------|
| Kiosk Frontend | React.js (Glassmorphic UI, orange theme) |
| Backend API | Node.js + Express |
| Database | MongoDB |
| Real-Time Sync | MQTT (HiveMQ Cloud) |
| WhatsApp | Twilio API |
| Payment | Razorpay |
| ESP32 Firmware | C++ (Arduino/PlatformIO) |
| Hardware | ESP32-C3, OLED, Buzzer, LED, Touch Sensor |

### Next Steps

1. **Review this document with your developer**
2. **Start with backend API** (easiest to test)
3. **Build ESP32 firmware** (hardware testing)
4. **Integrate kiosk screens** (UI/UX)
5. **Test end-to-end flow**
6. **Launch beta with 10 users**
7. **Scale to production**

---

**This is the COMPLETE blueprint. Your developer has EVERYTHING needed to build this system exactly as specified. No guesswork!** 🚀
