# 🔄 FITBOT KIOSK — COMPLETE USER FLOW
## All 51 Screens Connected with Navigation Logic

**Version:** 2.0  
**Last Updated:** March 2026

---

## 📋 TABLE OF CONTENTS

1. [Flow Overview](#flow-overview)
2. [New User Journey](#new-user-journey)
3. [Returning User Journey](#returning-user-journey)
4. [All Screen Connections](#all-screen-connections)
5. [Conditional Navigation Logic](#conditional-navigation-logic)
6. [Screen State Management](#screen-state-management)

---

## FLOW OVERVIEW

### Main Entry Points

```
┌──────────────────────────────────────────────────────────────┐
│                      SCREEN 1: WELCOME                        │
│                                                              │
│                     [New User]  [Returning User]             │
│                         │              │                     │
│                         ▼              ▼                     │
│              NEW USER JOURNEY    RETURNING USER JOURNEY      │
└──────────────────────────────────────────────────────────────┘
```

### Complete Flow Map

```
WELCOME (1)
├─── NEW USER PATH
│    ├─ Phone Entry (2)
│    │  └─ OTP Verify (3)
│    │     ├─ [FAIL 3x] → OTP Fail (4)
│    │     └─ [SUCCESS] → Code Generated (5)
│    │                    └─ Group Type (12)
│    │                       ├─ Solo (13) → [PAY] → Category (26)
│    │                       ├─ Couple (14) → Add Partner (15) → [PAY] → Category (26)
│    │                       ├─ Friends (18) → Size (19) → Members (20) → [PAY] → Category (26)
│    │                       └─ Daily (22) → Fan Quiz (23) → [PAY AFTER] → Category (26)
│    │
│    └─ Category (26)
│       ├─ Acne → Photo QR (27) → [TIMEOUT] → Photo Timeout (29)
│       │                      → [SUCCESS] → Photo Uploaded (30) → Treatment (32)
│       ├─ Fitness → Meal Freq (33)
│       ├─ Diet → Meal Freq (33)
│       ├─ First Aid → Meal Freq (33)
│       └─ General → Meal Freq (33)
│
├─── RETURNING USER PATH
│    └─ Code Entry (6)
│       ├─ [NOT FOUND] → Code Not Found (7)
│       └─ [FOUND] → Check Subscription Status
│          ├─ ACTIVE → Return Active (9)
│          │           ├─ [≥80%] → Today's Plan (39)
│          │           ├─ [60-79%] → Form Check (41)
│          │           ├─ [<60%] → Make Easier (42)
│          │           └─ [0%] → Why Tracking (43)
│          │
│          ├─ EXPIRED (Weekly) → Return Expired (10)
│          │                    └─ Renew Plan (44)
│          │
│          ├─ EXPIRED (Daily) → Return Daily Expired (11)
│          │                   └─ Choose Plan (12)
│          │
│          └─ NO SUBSCRIPTION → Group Type (12)
│
└─── COMMON PATHS
     ├─ Meal Settings (33-34) → Summary (35/36) → Activation (37)
     ├─ Bot Flow (Offer → Payment → Pairing → Customize → Status)
     ├─ Update Settings (46)
     ├─ Change Plan (45)
     └─ Errors (47-51)
```

---

## NEW USER JOURNEY

### Path 1: New User → Solo Weekly → Acne → Bot

```
SCREEN 1: WELCOME
│
├─ User taps: "New User — FREE Trial"
│
▼

SCREEN 2: PHONE ENTRY
│
├─ User enters: Phone number (9876543210)
├─ User enters: Referral code (optional: ABCD)
├─ User taps: "Send OTP"
│
├─ Backend: POST /api/send-otp
├─ Backend validates: Phone not used before
├─ Backend sends: WhatsApp + SMS with 4-digit OTP
│
▼

SCREEN 3: OTP VERIFY
│
├─ User enters: 4-digit OTP (1234)
├─ Auto-submit when 4th digit entered
│
├─ Backend: POST /api/verify-otp
├─ Backend validates: OTP matches and not expired
├─ Backend generates: 4-digit access code (9876)
├─ Backend sends: WhatsApp with code
│
├─ [IF SUCCESS] ────────────────────────────────────┐
│                                                    ▼
│                                          SCREEN 5: CODE GENERATED
│                                          │
│                                          ├─ Shows: "Your code: 9876"
│                                          ├─ Shows: "₹5 Bonus!" (if referral valid)
│                                          ├─ User taps: "Continue"
│                                          │
│                                          ▼
│
├─ [IF FAIL (3 attempts)] ──────────────────────────┐
│                                                    ▼
└───────────────────────────────────────── SCREEN 4: OTP FAIL
                                           │
                                           ├─ Shows: 10-minute countdown
                                           ├─ Auto-redirect after timeout
                                           │
                                           └─ Returns to: SCREEN 2

FROM SCREEN 5 (Code Generated):
│
▼

SCREEN 12: GROUP TYPE SELECTION
│
├─ Shows 4 options:
│  • Solo Weekly (₹29)
│  • Couple Weekly (₹54)
│  • Friends Weekly (₹49+)
│  • Daily (₹7-13/day)
│
├─ User taps: "Solo"
│
▼

SCREEN 13: SOLO WEEKLY PAY
│
├─ Shows: ₹29 per week
├─ Shows: Referral credit applied (-₹5)
├─ Shows: Final amount: ₹24
├─ User taps: "Pay ₹24"
│
├─ Frontend: Opens Razorpay modal
├─ User completes: Payment
│
├─ Backend: POST /api/payment/verify
├─ Backend creates: Subscription (active, 7 days)
├─ Backend sends: WhatsApp confirmation
│
▼

SCREEN 26: CATEGORY SELECTION
│
├─ Shows 5 options:
│  • Build Muscle / Get Abs 💪
│  • Lose Weight / Diet Plan 🥗
│  • Clear Acne / Skin Care 🧴
│  • First Aid / Quick Help 🩹
│  • General Health Tips 💊
│
├─ User taps: "Clear Acne"
│
▼

SCREEN 27: ACNE PHOTO QR UPLOAD
│
├─ Shows: QR code (256x256)
├─ Shows: Instructions (Scan → Camera → Upload)
├─ Shows: Status: "⏳ Waiting for photo..."
├─ Shows: Timer: 2:00 countdown
│
├─ User: Scans QR with phone
│
├─ [PHONE] Opens: https://api.fitbot.com/upload/upload_9876_1709876543210
├─ [PHONE] Shows: Mobile upload page
├─ [PHONE] User taps: "📷 Open Camera"
├─ [PHONE] Camera opens (environment mode)
├─ [PHONE] User takes: Photo of face
├─ [PHONE] Shows: Preview
├─ [PHONE] User taps: "✓ Upload Photo"
│
├─ [PHONE] Uploads: FormData with photo + sessionId
├─ Backend: POST /api/upload-acne-photo
├─ Backend saves: Photo to disk
├─ Backend creates: AcnePhoto document (analyzed: false)
├─ Backend triggers: ML analysis (async)
│
├─ [PHONE] Shows: "✅ Photo uploaded! Return to kiosk."
│
├─ [KIOSK] Polling: GET /api/check-acne-upload/:sessionId (every 2 sec)
├─ [KIOSK] Status updates: "📤 Photo uploading..."
├─ [KIOSK] Status updates: "🔬 Analyzing with AI..."
│
├─ [ML SERVICE] POST /ml/analyze
├─ [ML SERVICE] Preprocesses: Image (224x224)
├─ [ML SERVICE] Runs: TensorFlow model
├─ [ML SERVICE] Detects: Regions with OpenCV
├─ [ML SERVICE] Determines: Type, severity, location
├─ [ML SERVICE] Generates: Recommendations (8-12 tips)
├─ [ML SERVICE] Returns: Analysis results
│
├─ Backend updates: AcnePhoto (analyzed: true)
│
├─ [KIOSK] Polling receives: Analysis data
├─ [KIOSK] Status updates: "✅ Analysis complete!"
│
├─ [IF TIMEOUT (2 min)] ────────────────────────────┐
│                                                    ▼
│                                          SCREEN 29: ACNE PHOTO TIMEOUT
│                                          │
│                                          ├─ Shows: "Time's up!"
│                                          ├─ Options: "Try Again" or "Skip"
│                                          │
│                                          ├─ [Try Again] → Back to SCREEN 27
│                                          └─ [Skip] → SCREEN 33 (Meal Freq)
│
├─ [IF SUCCESS] ────────────────────────────────────┐
│                                                    ▼
└───────────────────────────────────────── SCREEN 30: ACNE PHOTO UPLOADED
                                           │
                                           ├─ Shows: AI Diagnosis
                                           │  • Type: Active Acne
                                           │  • Severity: Moderate
                                           │  • Location: Cheeks, Forehead
                                           │  • Confidence: 87%
                                           │  • Lesions: 28
                                           │
                                           ├─ Shows: Treatment Recommendations (list)
                                           │
                                           ├─ Shows: Privacy Options
                                           │  ○ Keep Photo (track progress)
                                           │  ○ Delete After Analysis
                                           │
                                           ├─ User selects: Privacy choice
                                           ├─ User taps: "Continue to Treatment Plan"
                                           │
                                           ├─ Backend: PUT /api/acne-photo/:id/privacy
                                           │
                                           ▼

SCREEN 32: ACNE TREATMENT PLAN
│
├─ Shows: Your Diagnosis summary
├─ Shows: Morning Routine (4 steps, 10 min)
│  1. Wash face with salicylic acid cleanser
│  2. Apply vitamin C serum
│  3. Moisturize
│  4. Apply SPF 50+
│
├─ Shows: Night Routine (4 steps, 12 min)
│  1. Remove makeup/sunscreen
│  2. Wash face
│  3. Apply benzoyl peroxide
│  4. Moisturize
│
├─ Shows: Pro Tips (4 tips)
├─ Shows: "🤖 Bot will remind you at 7 AM and 9 PM"
│
├─ User taps: "Continue to Meal Settings"
│
▼

SCREEN 33: MEAL FREQUENCY
│
├─ Shows: "How many meals per day?"
├─ Options:
│  • 3 Meals (Breakfast, Lunch, Dinner)
│  • 4 Meals (+ Afternoon Snack)
│
├─ User selects: 3 Meals
│
▼

SCREEN 34: MEAL TIMES
│
├─ Shows: "Set your meal times"
├─ Time pickers:
│  • Breakfast: 08:00
│  • Lunch: 13:00
│  • Dinner: 20:00
│
├─ User sets: Times
├─ User taps: "Continue"
│
▼

SCREEN 36: SUMMARY WEEKLY
│
├─ Shows: Plan Summary
│  • Type: Solo Weekly
│  • Duration: 7 days
│  • Amount Paid: ₹24
│  • Category: Clear Acne
│  • Meal Times: 8AM, 1PM, 8PM
│  • Facewash: 7AM, 9PM
│  • Water: 5x daily
│
├─ User taps: "Activate My Plan"
│
├─ Backend: Finalizes subscription
├─ Backend saves: Treatment plan
├─ Backend saves: Meal times
├─ Backend sends: WhatsApp confirmation
│
▼

SCREEN 37: ACTIVATION SUCCESS
│
├─ Shows: "✅ Plan Activated!"
├─ Shows: "Your code: 9876"
├─ Shows: "Valid until: Feb 15, 2026"
│
├─ Shows: Quick Start Guide:
│  1. WhatsApp reminders start today
│  2. Reply YES/NO to track progress
│  3. Check back anytime with code 9876
│
├─ Auto-navigates (3 sec) or taps: "Continue"
│
▼

SCREEN: BOT OFFER (NEW SCREEN)
│
├─ Shows: "🤖 Want Your Personal Health Companion?"
├─ Shows: Reliv Pet Bot image
├─ Shows: Features list:
│  • Cute OLED face (6 faces, 3 moods)
│  • Real-time sync with WhatsApp
│  • Sound + LED reminders
│  • Mini games (Snake, Memory, Reaction)
│  • Touch sensor interactions
│  • Sleep mode (auto off at night)
│
├─ Shows: "One-time: ₹499"
├─ Options:
│  • [Buy Pet Bot ₹499]
│  • [Skip for Now]
│
├─ [IF SKIP] ───────────────────────────────────────┐
│                                                    ▼
│                                          SCREEN 38: WHATSAPP PREVIEW
│                                          │
│                                          ├─ Shows: How reminders work
│                                          ├─ Shows: Example messages
│                                          ├─ Shows: "Reply YES or NO"
│                                          │
│                                          └─ Exit to home screen
│
├─ [IF BUY] ────────────────────────────────────────┐
│                                                    ▼
└───────────────────────────────────────── SCREEN: BOT PAYMENT
                                           │
                                           ├─ Shows: Product card
                                           ├─ Shows: What's included
                                           ├─ Shows: Hardcoded features info
                                           │
                                           ├─ User taps: "Pay ₹499"
                                           │
                                           ├─ Razorpay modal opens
                                           ├─ User completes: Payment
                                           │
                                           ├─ Backend: POST /api/bot/purchase
                                           ├─ Backend generates: Pairing code (A3X9K2)
                                           ├─ Backend creates: Bot document
                                           ├─ Backend sends: WhatsApp with code
                                           │
                                           ▼

SCREEN: BOT PAIRING CODE DISPLAY
│
├─ Shows: "✅ Bot Purchased!"
├─ Shows: Large pairing code: "A3X9K2"
├─ Shows: 6-step setup guide:
│  1. Take bot home
│  2. Power on (USB cable)
│  3. Wait for "READY!" on screen
│  4. Open Serial Monitor
│  5. Type: PAIR A3X9K2
│  6. Bot will sync in seconds!
│
├─ Shows: "📱 Code sent to WhatsApp too"
│
├─ User taps: "Continue to Customize"
│
▼

SCREEN: BOT CUSTOMIZATION
│
├─ Shows: "Customize Your Bot"
│
├─ Section 1: Face Type
│  • Robot (default, unlocked) ✅
│  • Cat (unlocked with 20 stars) 🔒
│  • Dog (unlocked with 40 stars) 🔒
│  • Panda (unlocked with 60 stars) 🔒
│  • Bunny (unlocked with 80 stars) 🔒
│  • Bear (unlocked with 100 stars) 🔒
│
├─ Section 2: Sound Theme
│  • Chime (default)
│  • Melody
│  • Beep
│  • Voice (coming soon)
│
├─ Section 3: Personality Mode
│  • Cheerful (enthusiastic messages)
│  • Calm (gentle reminders)
│  • Strict (firm push)
│
├─ Section 4: Sleep Schedule
│  • Sleep time: 22:00 (10 PM)
│  • Wake time: 07:00 (7 AM)
│
├─ Shows: "🔧 Hardcoded Features (Built-in)"
│  • 3 Mini Games (Snake, Memory, Reaction)
│  • 18 Face Expressions (6 faces × 3 moods)
│  • 12+ Animations (happy, sad, thinking, etc.)
│  • Health Quiz (15 questions)
│  • 50+ Motivational Messages
│  • Progress Bars (water, meals, workouts)
│  • Streak Tracker (daily counter)
│  • Birthday Celebrations (cake, fireworks)
│  • 4 Sound Patterns
│  • RGB LED Patterns
│
├─ User selects: Cat face (if unlocked), Melody sound, Cheerful mode
├─ User taps: "Save & Sync Bot"
│
├─ Backend: POST /api/bot/config
├─ Backend publishes: MQTT bot/{A3X9K2}/config
│
├─ [IF BOT ONLINE] → Bot receives config instantly
├─ [IF BOT OFFLINE] → Config saved, will sync on next connect
│
▼

SCREEN: BOT STATUS (Bot not paired yet)
│
├─ Shows: "Bot Status: Unpaired"
├─ Shows: Online indicator: ⚪ Offline
├─ Shows: Last online: Never
│
├─ Shows: Current Settings:
│  • Face: Cat
│  • Sound: Melody
│  • Personality: Cheerful
│  • Sleep: 22:00 → 07:00
│
├─ Shows: Pairing Instructions (repeat)
│
├─ Shows: "⚠️ Bot will appear online once paired"
│
├─ User taps: "Done, I'll Pair Later"
│
▼

SCREEN 38: WHATSAPP PREVIEW
│
├─ Shows: "How Reminders Work"
│
├─ Shows: Example Message Flow:
│  ┌────────────────────────────────────┐
│  │ 08:00 AM — FitBot                 │
│  │ 💧 Time for water! Reply YES/NO   │
│  └────────────────────────────────────┘
│  
│  ┌────────────────────────────────────┐
│  │ You: YES                          │
│  └────────────────────────────────────┘
│  
│  ┌────────────────────────────────────┐
│  │ 08:00 AM — FitBot                 │
│  │ ✅ Awesome! Keep going! 💪        │
│  │ Your bot is celebrating! 🎉        │
│  └────────────────────────────────────┘
│
├─ Shows: "🤖 Your Bot Reacts Instantly!"
│  • Reply YES → Bot shows happy face 😊
│  • Reply NO → Bot shows sad face 😢
│  • Sync happens in <500ms
│
├─ User taps: "Got It!"
│
└─ Exit kiosk (returns to SCREEN 1 after 30 sec timeout)
```

---

## RETURNING USER JOURNEY

### Path 2: Returning User → Active Subscription → Bot Status

```
SCREEN 1: WELCOME
│
├─ User taps: "Returning User"
│
▼

SCREEN 6: CODE ENTRY
│
├─ Shows: "Enter your 4-digit code"
├─ Shows: 4 input boxes (auto-focus, auto-advance)
│
├─ User enters: 9876
│
├─ Backend: POST /api/check-code
├─ Backend finds: User with code 9876
├─ Backend checks: Subscription status
│
├─ [IF NOT FOUND] ──────────────────────────────────┐
│                                                    ▼
│                                          SCREEN 7: CODE NOT FOUND
│                                          │
│                                          ├─ Shows: "Code doesn't match"
│                                          ├─ Options:
│                                          │  • Try Again
│                                          │  • New User
│                                          │
│                                          └─ [Try Again] → SCREEN 6
│                                             [New User] → SCREEN 2
│
├─ [IF FOUND + ACTIVE SUBSCRIPTION] ────────────────┐
│                                                    ▼
└───────────────────────────────────────── SCREEN 9: RETURN ACTIVE
                                           │
                                           ├─ Shows: "👋 Welcome Back!"
                                           ├─ Shows: Plan info
                                           │  • Type: Solo Weekly
                                           │  • Days remaining: 3
                                           │  • End date: Feb 12
                                           │
                                           ├─ Shows: Streak: 🔥 7 days
                                           │
                                           ├─ Shows: This Week's Progress:
                                           │  • Water: 22/28 (79%) [▓▓▓▓▓▓▓▓░░]
                                           │  • Meals: 18/21 (86%) [▓▓▓▓▓▓▓▓▓░]
                                           │  • Workouts: 3/5 (60%) [▓▓▓▓▓▓░░░]
                                           │
                                           ├─ Calculates: Average compliance
                                           │  → (79% + 86% + 60%) / 3 = 75%
                                           │
                                           ├─ Shows: Bot Status
                                           │  • Online: 🟢 Active
                                           │  • Face: Cat 🐱
                                           │  • Last sync: 2 hours ago
                                           │
                                           ├─ Routes based on compliance:
                                           │
                                           ├─ [IF ≥80%] ──────────────────────┐
                                           │                                   ▼
                                           │                         SCREEN 39: TODAY'S PLAN
                                           │                         │
                                           │                         ├─ Shows: "✅ Doing Great!"
                                           │                         ├─ Shows: Today's tasks:
                                           │                         │  ☐ Water (0/5 today)
                                           │                         │  ☐ Meals (0/3 today)
                                           │                         │  ☐ Workout (0/1 today)
                                           │                         │
                                           │                         ├─ Shows: Next reminder: 11:00 AM (Water)
                                           │                         │
                                           │                         ├─ Options:
                                           │                         │  • Continue Current Plan
                                           │                         │  • Update Settings
                                           │                         │  • View Bot Status
                                           │                         │
                                           │                         └─ Exit or navigate
                                           │
                                           ├─ [IF 60-79%] ────────────────────┐
                                           │                                   ▼
                                           │                         SCREEN 41: FORM CHECK
                                           │                         │
                                           │                         ├─ Shows: "Good start! Keep pushing!"
                                           │                         ├─ Shows: What's working:
                                           │                         │  ✓ Meals: 86% (great!)
                                           │                         │  ✓ Water: 79% (solid!)
                                           │                         │
                                           │                         ├─ Shows: What needs work:
                                           │                         │  ⚠️ Workouts: 60% (3/5)
                                           │                         │  Missing 2 workouts this week
                                           │                         │
                                           │                         ├─ Shows: Encouragement:
                                           │                         │  "You're SO close to 80%!"
                                           │                         │  "Just 2 more workouts = 80% target"
                                           │                         │
                                           │                         ├─ Options:
                                           │                         │  • I'll Push Harder
                                           │                         │  • Make Plan Easier
                                           │                         │  • View Today's Plan
                                           │                         │
                                           │                         └─ Navigate based on choice
                                           │
                                           ├─ [IF <60%] ──────────────────────┐
                                           │                                   ▼
                                           │                         SCREEN 42: MAKE EASIER
                                           │                         │
                                           │                         ├─ Shows: "Let's adjust your plan"
                                           │                         ├─ Shows: Current compliance: 47%
                                           │                         │  • Water: 15/28 (54%)
                                           │                         │  • Meals: 12/21 (57%)
                                           │                         │  • Workouts: 2/5 (40%)
                                           │                         │
                                           │                         ├─ Shows: Suggested changes:
                                           │                         │  • Water: 5/day → 3/day
                                           │                         │  • Meals: 3/day → Track 2/day
                                           │                         │  • Workouts: 5/week → 3/week
                                           │                         │
                                           │                         ├─ Shows: "Small wins build habits"
                                           │                         │
                                           │                         ├─ Options:
                                           │                         │  • Accept Easier Plan
                                           │                         │  • Keep Current Plan
                                           │                         │
                                           │                         ├─ [Accept] → Update subscription
                                           │                         └─ [Keep] → Return to home
                                           │
                                           └─ [IF 0% (no data)] ──────────────┐
                                                                               ▼
                                                                     SCREEN 43: WHY TRACKING
                                                                     │
                                                                     ├─ Shows: "We noticed you haven't replied"
                                                                     ├─ Shows: WhatsApp explanation
                                                                     │  "Reply YES/NO to our messages"
                                                                     │  "This helps us track your progress"
                                                                     │
                                                                     ├─ Shows: Benefits:
                                                                     │  • See your improvement
                                                                     │  • Bot reacts to your replies
                                                                     │  • Earn stars & unlock faces
                                                                     │  • Build streaks
                                                                     │
                                                                     ├─ Shows: "Try it today!"
                                                                     │
                                                                     └─ Return to home

FROM SCREEN 9 (Return Active):
│
├─ User taps: "⚙️ Update Settings"
│
▼

SCREEN 46: UPDATE SETTINGS
│
├─ Shows: Current Settings
│
├─ Section 1: Meal Times
│  • Breakfast: 08:00 [Edit]
│  • Lunch: 13:00 [Edit]
│  • Dinner: 20:00 [Edit]
│
├─ Section 2: Workout Times
│  • Preferred time: 18:00 [Edit]
│
├─ Section 3: Reminders
│  • Water: 5x daily ✅
│  • Meals: Enabled ✅
│  • Workouts: Enabled ✅
│  • Facewash: Enabled ✅ (if acne plan)
│
├─ Section 4: Bot Settings (if has bot)
│  • Face: Cat [Change]
│  • Sound: Melody [Change]
│  • Personality: Cheerful [Change]
│  • Sleep: 22:00 - 07:00 [Edit]
│
├─ User makes: Changes
├─ User taps: "Save Changes"
│
├─ Backend: POST /api/subscription/update
├─ Backend publishes: MQTT config update (if bot settings changed)
│
├─ Shows: "✅ Settings Updated!"
│
└─ Return to SCREEN 9

FROM SCREEN 9 (Return Active):
│
├─ User taps: "View Bot Status"
│
▼

SCREEN: BOT STATUS (Active)
│
├─ Shows: "🤖 Bot Status"
│
├─ Shows: Online Status:
│  • 🟢 Online (last seen: 2 min ago)
│  OR
│  • ⚪ Offline (last seen: 3 hours ago)
│
├─ Shows: Current Settings:
│  • Face: Cat 🐱
│  • Mood: Happy 😊
│  • Sound: Melody 🎵
│  • Personality: Cheerful
│  • Sleep: 22:00 - 07:00
│
├─ Shows: Stats:
│  • Stars earned: 145 ⭐
│  • Level: 3
│  • Streak: 7 days 🔥
│  • Games played: 23
│
├─ Shows: Unlocked Features:
│  • Faces: Robot ✅, Cat ✅, Dog 🔒 (need 5 more stars)
│  • Games: Snake ✅, Memory ✅, Reaction 🔒 (need 10 more stars)
│
├─ Shows: Subscription:
│  • Status: Active ✅
│  • Valid until: Feb 12, 2026
│  • Reminders: Enabled
│
├─ Options:
│  • [Customize Bot]
│  • [View Games]
│  • [Test Bot] (send test mood)
│
├─ User taps: "Test Bot"
│
├─ Backend: Publishes MQTT test command
├─ Bot receives: Shows test animation + sound
│
└─ Return to home
```

### Path 3: Returning User → Expired Subscription

```
SCREEN 6: CODE ENTRY
│
├─ User enters: 9876
│
├─ Backend: POST /api/check-code
├─ Backend finds: Subscription status = "expired"
├─ Backend checks: Subscription type = "solo_weekly"
│
▼

SCREEN 10: RETURN WEEKLY EXPIRED
│
├─ Shows: "Your Plan Ended"
├─ Shows: Last active: Feb 7, 2026
├─ Shows: Plan was: Solo Weekly
│
├─ Shows: Your Final Stats:
│  • Streak reached: 7 days 🔥
│  • Total stars: 145 ⭐
│  • Compliance: 75%
│  • Water: 98/140 (70%)
│  • Meals: 18/21 (86%)
│  • Workouts: 4/7 (57%)
│
├─ Shows: "Great progress! Keep the momentum!"
│
├─ Options:
│  • [Renew Same Plan] ₹29
│  • [Change Plan]
│  • [View Bot Status] (if has bot)
│
├─ [IF Renew Same Plan] ────────────────────────────┐
│                                                    ▼
│                                          SCREEN 44: RENEW PLAN
│                                          │
│                                          ├─ Shows: "Renew Solo Weekly"
│                                          ├─ Shows: ₹29 for 7 days
│                                          ├─ Shows: Previous settings:
│                                          │  • Category: Clear Acne
│                                          │  • Meals: 3x (8AM, 1PM, 8PM)
│                                          │  • Facewash: 2x (7AM, 9PM)
│                                          │
│                                          ├─ Option: "Use same settings ✅"
│                                          ├─ Option: "Change settings"
│                                          │
│                                          ├─ User taps: "Pay ₹29"
│                                          │
│                                          ├─ Razorpay modal
│                                          ├─ Payment completes
│                                          │
│                                          ├─ Backend: Updates subscription
│                                          │  • Status: active
│                                          │  • Start: Today
│                                          │  • End: Today + 7 days
│                                          │
│                                          ├─ Backend publishes: MQTT reactivation
│                                          │  bot/{code}/subscription { status: "active" }
│                                          │
│                                          ├─ Bot receives: "🎉 Welcome Back!"
│                                          │  • Celebration animation
│                                          │  • Rainbow LED
│                                          │  • Happy melody
│                                          │  • Shows: "Active until Feb 15"
│                                          │
│                                          ├─ Shows: "✅ Plan Renewed!"
│                                          │
│                                          └─ Navigate to SCREEN 39 (Today's Plan)
│
├─ [IF Change Plan] ────────────────────────────────┐
│                                                    ▼
│                                          SCREEN 45: CHANGE PLAN
│                                          │
│                                          ├─ Shows: "Choose New Plan"
│                                          ├─ Shows: All plan options
│                                          │  • Solo (₹29)
│                                          │  • Couple (₹54)
│                                          │  • Friends (₹49+)
│                                          │  • Daily (₹7-13)
│                                          │
│                                          ├─ User selects: Plan
│                                          │
│                                          └─ Navigate to appropriate payment screen
│
└─ [IF View Bot Status] ────────────────────────────┐
                                                     ▼
                                           SCREEN: BOT STATUS (Expired Sub)
                                           │
                                           ├─ Shows: "🤖 Bot Status"
                                           │
                                           ├─ Shows: "⚠️ Subscription Expired"
                                           │  • Your bot is paused
                                           │  • Reminders stopped
                                           │  • Bot shows: "Renew at kiosk"
                                           │
                                           ├─ Shows: Last Stats (before expiry):
                                           │  • Stars: 145 ⭐
                                           │  • Level: 3
                                           │  • Streak: 7 days 🔥
                                           │
                                           ├─ Shows: "Renew to reactivate bot"
                                           │
                                           └─ Options: [Renew Plan] or [Back]
```

---

## ALL SCREEN CONNECTIONS

### Complete Screen Matrix

| # | Screen Name | Routes From | Routes To (Success) | Routes To (Failure/Alt) |
|---|-------------|-------------|---------------------|-------------------------|
| **1** | Welcome | — | 2 (New), 6 (Return) | — |
| **2** | Phone Entry | 1, 4, 7 | 3 | 48 (Trial used) |
| **3** | OTP Verify | 2 | 5 | 4 (3 fails) |
| **4** | OTP Fail | 3 | 2 (after 10min) | — |
| **5** | Code Generated | 3 | 12 | — |
| **6** | Code Entry | 1 | 9/10/11/12 (based on status) | 7 |
| **7** | Code Not Found | 6 | 6 (retry), 2 (new) | — |
| **9** | Return Active | 6 | 39/41/42/43 (based on %) | 46 (settings) |
| **10** | Return Expired (Weekly) | 6 | 44 (renew), 45 (change) | — |
| **11** | Return Daily Expired | 6 | 12 | — |
| **12** | Group Type | 5, 11 | 13/14/18/22 | — |
| **13** | Solo Pay | 12 | 26 | 47 (payment fail) |
| **14** | Couple Add Partner | 12 | 15 | — |
| **15** | Couple Partner Details | 14 | 16 | — |
| **16** | Couple Pay | 15 | 26 | 47 |
| **18** | Friends Size | 12 | 19 | — |
| **19** | Friends Select Size | 18 | 20 | — |
| **20** | Friends Add Members | 19 | 21 | — |
| **21** | Friends Pay | 20 | 26 | 47 |
| **22** | Daily Fan Quiz Type | 12 | 23 | — |
| **23** | Daily Fan Quiz Questions | 22 | 24 | — |
| **24** | Daily Celebrity Result | 23 | 25 | — |
| **25** | Daily Plan Summary | 24 | 26 | — |
| **26** | Category Selection | 13/16/21/25 | 27 (acne), 33 (other) | — |
| **27** | Acne Photo QR | 26 | 30 | 29 (timeout) |
| **29** | Acne Photo Timeout | 27 | 27 (retry), 33 (skip) | — |
| **30** | Acne Photo Uploaded | 27 | 32 | — |
| **32** | Acne Treatment | 30 | 33 | — |
| **33** | Meal Frequency | 26/29/32 | 34 | — |
| **34** | Meal Times | 33 | 35/36 | — |
| **35** | Summary Daily | 34 | 37 | — |
| **36** | Summary Weekly | 34 | 37 | — |
| **37** | Activation Success | 35/36 | Bot Offer | — |
| **38** | WhatsApp Preview | Bot Flow | 1 (exit) | — |
| **39** | Today's Plan | 9 | 1 (exit), 46 (settings) | — |
| **40** | Progress Dashboard | 39 | 1 (exit) | — |
| **41** | Form Check | 9 | 39, 42 | — |
| **42** | Make Easier | 9, 41 | 39 | — |
| **43** | Why Tracking | 9 | 39 | — |
| **44** | Renew Plan | 10 | 39 | 47 |
| **45** | Change Plan | 10 | 13/14/18/22 | — |
| **46** | Update Settings | 9, 39 | 9 | — |
| **47** | Payment Failed | 13/16/21/44 | 13/16/21/44 (retry) | — |
| **48** | Trial Used | 2 | 1 | — |
| **49** | Invalid Referral | 2 | 2 | — |
| **50** | Kiosk Offline | Any | 1 (reconnect) | — |
| **51** | Plan Conflict | 20 | 12 | — |

### Bot Flow Screens (Additional)

| Screen | Routes From | Routes To |
|--------|-------------|-----------|
| Bot Offer | 37 | Bot Payment, 38 |
| Bot Payment | Bot Offer | Bot Pairing Code |
| Bot Pairing Code | Bot Payment | Bot Customize |
| Bot Customize | Bot Pairing Code | Bot Status |
| Bot Status | Bot Customize, 9, 46 | 1 (exit) |
| Bot Games Menu | Bot Status | Individual games |

---

## CONDITIONAL NAVIGATION LOGIC

### Decision Tree: After Code Entry (Screen 6)

```javascript
// Backend returns user data
const userData = {
  code: "9876",
  subscription: {
    status: "active" | "expired" | null,
    type: "solo_weekly" | "couple_weekly" | "daily",
    endDate: Date,
    daysRemaining: Number
  },
  progress: {
    water: { done: 22, target: 28 },
    meals: { done: 18, target: 21 },
    workouts: { done: 3, target: 5 }
  },
  hasBot: true | false,
  botPairingCode: "A3X9K2" | null
};

// Navigation logic
function routeAfterCodeEntry(userData) {
  // No subscription found
  if (!userData.subscription || userData.subscription.status === null) {
    return navigate('group_type'); // Screen 12
  }
  
  // Expired subscription
  if (userData.subscription.status === 'expired') {
    if (userData.subscription.type === 'daily') {
      return navigate('return_daily_expired'); // Screen 11
    } else {
      return navigate('return_weekly_expired'); // Screen 10
    }
  }
  
  // Active subscription - calculate compliance
  if (userData.subscription.status === 'active') {
    const compliance = calculateCompliance(userData.progress);
    
    if (compliance >= 80) {
      return navigate('today_plan'); // Screen 39
    } else if (compliance >= 60) {
      return navigate('form_check'); // Screen 41
    } else if (compliance > 0) {
      return navigate('make_easier'); // Screen 42
    } else {
      return navigate('why_tracking'); // Screen 43
    }
  }
}

function calculateCompliance(progress) {
  const waterPercent = progress.water.done / progress.water.target;
  const mealsPercent = progress.meals.done / progress.meals.target;
  const workoutsPercent = progress.workouts.done / progress.workouts.target;
  
  const avg = (waterPercent + mealsPercent + workoutsPercent) / 3;
  return Math.round(avg * 100);
}
```

### Decision Tree: After Category Selection (Screen 26)

```javascript
function routeAfterCategory(category) {
  if (category === 'acne') {
    return navigate('acne_photo_qr'); // Screen 27
  } else {
    return navigate('meal_frequency'); // Screen 33
  }
}
```

### Decision Tree: After Plan Activation (Screen 37)

```javascript
function routeAfterActivation(userData) {
  if (!userData.hasBot) {
    // Show bot offer
    return navigate('bot_offer');
  } else {
    // Skip to WhatsApp preview
    return navigate('whatsapp_preview'); // Screen 38
  }
}
```

---

## SCREEN STATE MANAGEMENT

### Global State Object

```javascript
const userData = {
  // Auth
  phone: "9876543210",
  code: "9876",
  userId: "user_abc123",
  
  // Referral
  referralCode: "ABCD",
  referralCredits: 5,
  
  // Subscription
  planType: "solo_weekly",
  subscriptionId: "sub_def456",
  startDate: Date,
  endDate: Date,
  amountPaid: 2400, // in paise
  
  // Category & Settings
  category: "acne",
  mealFrequency: 3,
  mealTimes: {
    breakfast: "08:00",
    lunch: "13:00",
    dinner: "20:00"
  },
  
  // Acne Flow
  acnePhotoId: "photo_xyz789",
  acneAnalysis: {
    type: "active_acne",
    severity: "moderate",
    location: ["cheeks", "forehead"],
    confidence: 0.87,
    lesionCount: 28,
    recommendations: [...]
  },
  acnePhotoPrivacy: "keep", // or "delete"
  treatmentPlan: {
    morningRoutine: [...],
    nightRoutine: [...],
    facewashTimes: ["07:00", "21:00"]
  },
  
  // Bot
  hasBot: true,
  botId: "bot_ghi012",
  botPairingCode: "A3X9K2",
  botConfig: {
    face: "cat",
    sound: "melody",
    personality: "cheerful",
    sleepTime: "22:00",
    wakeTime: "07:00"
  },
  botIsOnline: false,
  
  // Progress
  progress: {
    water: { done: 22, target: 28 },
    meals: { done: 18, target: 21 },
    workouts: { done: 3, target: 5 }
  },
  streak: 7,
  stars: 145
};
```

### State Update Functions

```javascript
// Update user data (called after API responses)
function updateData(newData) {
  userData = { ...userData, ...newData };
  localStorage.setItem('fitbot_user', JSON.stringify(userData));
}

// Load user data (on app start)
function loadData() {
  const saved = localStorage.getItem('fitbot_user');
  if (saved) {
    userData = JSON.parse(saved);
  }
}

// Clear user data (on logout)
function clearData() {
  userData = {};
  localStorage.removeItem('fitbot_user');
}
```

---

## NAVIGATION EXAMPLES

### Example 1: New User Complete Flow

```
Start → 1 → 2 → 3 → 5 → 12 → 13 → 26 → 27 → 30 → 32 → 33 → 34 → 36 → 37 → Bot Offer → Bot Payment → Bot Pairing → Bot Customize → Bot Status → 38 → Exit
```

### Example 2: Returning User (High Compliance)

```
Start → 1 → 6 → 9 → 39 → Exit
```

### Example 3: Returning User (Expired)

```
Start → 1 → 6 → 10 → 44 → 39 → Exit
```

### Example 4: Returning User (Low Compliance)

```
Start → 1 → 6 → 9 → 42 → 39 → Exit
```

---

## ERROR SCREENS

### Screen 47: Payment Failed
- **Trigger:** Razorpay payment failure
- **Routes to:** Retry payment or go back
- **Backend:** No changes, payment not processed

### Screen 48: Trial Used
- **Trigger:** Phone already used free trial
- **Routes to:** Welcome screen
- **Message:** "One trial per phone. Fair for everyone!"

### Screen 49: Invalid Referral
- **Trigger:** Referral code not found (optional, inline error)
- **Routes to:** Continue without referral
- **Message:** "Invalid code. Continue without bonus."

### Screen 50: Kiosk Offline
- **Trigger:** Backend unreachable
- **Routes to:** Retry connection
- **Message:** "Connection lost. Check network."

### Screen 51: Plan Conflict
- **Trigger:** User already in another group
- **Routes to:** Group selection
- **Message:** "You're already in a plan. Choose new one."

---

## TIMING & TRANSITIONS

### Auto-Navigation Timers

| Screen | Auto-Navigate After | Goes To |
|--------|---------------------|---------|
| 5 (Code Generated) | 5 seconds | 12 (Group Type) |
| 37 (Activation) | 3 seconds | Bot Offer |
| Bot Pairing Code | Never (user driven) | — |
| 38 (WhatsApp Preview) | 30 seconds | 1 (Welcome) |
| 50 (Offline) | Reconnect success | Previous screen |

### Loading States

| Action | Loading Message | Duration |
|--------|----------------|----------|
| Send OTP | "Sending..." | 2-3 sec |
| Verify OTP | "Verifying..." | 1-2 sec |
| Payment | "Processing..." | 3-5 sec |
| Photo upload | "Uploading..." | 3-7 sec |
| ML analysis | "Analyzing..." | 5-10 sec |
| MQTT sync | "Syncing bot..." | 1-2 sec |

---

## COMPLETE USER FLOW SUMMARY

**Total Screens:** 51 + 5 bot-specific = 56 screens
**Average Time:** 8-12 minutes (new user with bot)
**Shortest Path:** 3 screens (return user, high compliance)
**Longest Path:** 20+ screens (new user, acne + bot + games)

---

**Document Version:** 2.0  
**Status:** Complete ✅  
**Last Updated:** March 2, 2026