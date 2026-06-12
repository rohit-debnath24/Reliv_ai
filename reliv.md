# FITBOT KIOSK - COMPLETE DEVELOPER SPECIFICATION
## Production-Ready Implementation Guide

**Version:** 1.0  
**Last Updated:** February 7, 2026  
**Author:** Product Team

---

## TABLE OF CONTENTS

1. [System Overview](#system-overview)
2. [Complete Screen Map (45+ Screens)](#complete-screen-map)
3. [User Flows](#user-flows)
4. [Navigation Rules](#navigation-rules)
5. [Error Handling](#error-handling)
6. [Backend Requirements](#backend-requirements)
7. [UI/UX Specifications](#uiux-specifications)
8. [WhatsApp Integration](#whatsapp-integration)
9. [Payment Integration](#payment-integration)
10. [Data Models](#data-models)

---

## SYSTEM OVERVIEW

### What is FitBot Kiosk?
A stationary health kiosk system that allows students to create personalized health plans (fitness, diet, acne, etc.) and track progress via WhatsApp messaging.

### Key Features
- ✅ Weekly plans (₹29-140/week) and Daily plans (₹7-13/day)
- ✅ Solo, Couple, and Friends (2-5 people) options
- ✅ WhatsApp-only tracking (no mobile web login)
- ✅ Return visit intelligence (active/expired detection)
- ✅ Referral system (max ₹10 discount, weekly only)
- ✅ Acne photo analysis with QR code upload
- ✅ Progress dashboard with compliance tracking
- ✅ Smart plan adjustments (form check, make easier)

### Tech Stack Recommendation
- **Frontend:** React.js (touch-optimized for kiosk)
- **Backend:** Node.js + Express (or Python Flask)
- **Database:** PostgreSQL (user data, subscriptions, progress)
- **WhatsApp:** Twilio API or WhatsApp Business API
- **Payment:** Razorpay/Stripe
- **Photo Upload:** AWS S3 or Cloudinary
- **AI Analysis:** OpenAI GPT-4 Vision (acne detection)

---

## COMPLETE SCREEN MAP

### Screen ID Reference
Each screen has a unique ID for navigation logic.

| Screen ID | Screen Name | Purpose | Can Go Back? |
|-----------|-------------|---------|--------------|
| `S01` | Welcome | Entry point, leaderboard | ❌ No |
| `S02` | Phone Entry | Collect phone + referral code | ✅ Yes |
| `S03` | OTP Verification | Verify phone number | ✅ Yes |
| `S04` | OTP Failed | Cooldown after 3 attempts | ❌ No |
| `S05` | Code Generated | Show 4-digit access code | ❌ No |
| `S06` | Code Entry | Returning user login | ✅ Yes |
| `S07` | Code Not Found | Invalid code error | ❌ No |
| `S08` | Return Active | Active subscription dashboard | ❌ No |
| `S09` | Return Weekly Expired | Weekly plan ended | ❌ No |
| `S10` | Return Daily Expired | Daily plan ended | ❌ No |
| `S11` | Group Type | Choose plan type | ✅ Yes |
| `S12` | Solo Weekly Pay | Pay for solo plan | ✅ Yes |
| `S13` | Couple Add Partner | Enter partner phone | ✅ Yes |
| `S14` | Couple Waiting OTP | Wait for partner verification | ❌ No |
| `S15` | Couple Questions | 4 bonding questions | ✅ Yes |
| `S16` | Couple Weekly Pay | Pay for couple plan | ✅ Yes |
| `S17` | Friends Size | Select group size (2-5) | ✅ Yes |
| `S18` | Friends Add Members | Enter all phone numbers | ✅ Yes |
| `S19` | Friends Questions | 3 squad questions | ✅ Yes |
| `S20` | Friends Weekly Pay | Pay for friends plan | ✅ Yes |
| `S21` | Fan Quiz Type | Choose category (daily only) | ✅ Yes |
| `S22` | Fan Cricket | Select cricket celebrity | ✅ Yes |
| `S23` | Fan Football | Select football celebrity | ✅ Yes |
| `S24` | Fan Singer | Select singer celebrity | ✅ Yes |
| `S25` | Fan Bollywood | Select Bollywood celebrity | ✅ Yes |
| `S26` | Category | Choose goal (fitness/acne/diet) | ✅ Yes* |
| `S27` | Meal Frequency | Choose 3 or 4 meals/day | ✅ Yes |
| `S28` | Meal Times | Set meal reminder times | ✅ Yes |
| `S29` | Summary Daily | Review daily plan before pay | ✅ Yes |
| `S30` | Summary Weekly | Review weekly plan (already paid) | ❌ No |
| `S31` | Activation | Plan activated successfully | ❌ No |
| `S32` | Acne Photo QR | QR code for photo upload | ✅ Yes |
| `S33` | Acne Photo Timeout | 2-minute wait exceeded | ❌ No |
| `S34` | Acne Manual Select | Manual acne type selection | ✅ Yes |
| `S35` | Acne Photo Uploaded | AI analysis result | ❌ No |
| `S36` | Acne Treatment | Personalized acne plan | ❌ No |
| `S37` | WhatsApp Preview | Demo WhatsApp messages | ✅ Yes |
| `S38` | Today's Plan | Current day's schedule | ❌ No |
| `S39` | Form Check | Check technique (60-80% compliance) | ✅ Yes |
| `S40` | Make Easier | Reduce targets (<60% compliance) | ✅ Yes |
| `S41` | Why Tracking | Education screen (0% progress) | ✅ Yes |
| `S42` | Renew Plan | Renew expired weekly plan | ✅ Yes |
| `S43` | Change Plan | Switch plan type | ✅ Yes |
| `S44` | Update Settings | Modify meal/workout times | ✅ Yes |
| `S45` | Payment Failed | Retry payment | ❌ No |
| `E01` | Trial Used Error | Phone already used trial | ❌ No |
| `E02` | Invalid Referral | Referral code doesn't exist | ✅ Yes |
| `E03` | Kiosk Offline | Connection lost | ❌ No |
| `E04` | Plan Conflict | Already in another group | ✅ Yes |

**Note:** "Can Go Back?" = Shows back button (← arrow) in top-left corner  
*Category screen: Can go back ONLY if daily plan (weekly already paid)

---

## USER FLOWS

### FLOW 1: NEW USER - SOLO WEEKLY PLAN

```
S01 (Welcome)
  ↓ [Tap "New User"]
S02 (Phone Entry)
  ↓ [Enter +91-9876543210, optional referral code ABCD]
S03 (OTP Verification)
  ↓ [Enter 1234]
  ↓ [Backend: Generate code 9876, check referral → ₹5 credit]
S05 (Code Generated)
  ↓ [Show code 9876, show "₹5 Bonus Unlocked!" if referral valid]
  ↓ [Tap "Continue"]
S11 (Group Type)
  ↓ [Tap "Solo Weekly - ₹29/week"]
S12 (Solo Weekly Pay)
  ↓ [Show ₹29, apply referral credit → ₹24]
  ↓ [Tap "Pay ₹24"]
  ↓ [Backend: Process payment → success]
S26 (Category)
  ↓ [Tap "Build Muscle / Get Abs"]
S27 (Meal Frequency)
  ↓ [Tap "3 Meals"]
S28 (Meal Times)
  ↓ [Set times: 8AM, 1PM, 8PM]
  ↓ [Tap "Continue"]
S30 (Summary Weekly)
  ↓ [Review plan, shows "Already Paid!"]
  ↓ [Tap "Activate Plan"]
S31 (Activation)
  ↓ [Show confetti, code 9876, "Plan is LIVE!"]
  ↓ [Tap "Preview WhatsApp Messages"]
S37 (WhatsApp Preview)
  ↓ [Show demo messages: Water, Meals, Workout]
  ↓ [Tap "Got It!"]
S01 (Welcome)
  ↓ [User leaves kiosk]
```

**Backend Actions:**
1. Store user: `{ phone: '9876543210', code: '9876', referralCode: 'ABCD' }`
2. Apply credit: `referralCredits = 5` (if valid)
3. Create subscription: `{ type: 'solo_weekly', startDate: today, endDate: today+7, status: 'active' }`
4. Generate WhatsApp plan: `{ water: 4/day, meals: 3/day, workouts: 1/day }`
5. Activate WhatsApp bot: Send first message at 8AM tomorrow

---

### FLOW 2: NEW USER - COUPLE WEEKLY PLAN

```
S01 (Welcome)
  ↓ [Tap "New User"]
S02 (Phone Entry)
  ↓ [Enter +91-9876543210, no referral]
S03 (OTP Verification)
  ↓ [Verify]
S05 (Code Generated)
  ↓ [Code 9876]
S11 (Group Type)
  ↓ [Tap "Couple - ₹54/week"]
S13 (Couple Add Partner)
  ↓ [Enter partner phone +91-8765432109]
  ↓ [Backend: Check if same number → ERROR]
  ↓ [Backend: Check if already in couple → ERROR]
  ↓ [Backend: Send OTP to 8765432109]
S14 (Couple Waiting OTP)
  ↓ [Show "Waiting for partner..."]
  ↓ [Timer: 0s, 10s, 20s...]
  ↓ OPTIONS:
     - [Partner verifies] → Continue
     - [Tap "Resend OTP"] → Send again (max 3 times)
     - [Tap "Try Another Number"] → Back to S13
     - [Tap "Skip & Go Solo"] → Navigate to S12
  ↓ [Partner verified]
S15 (Couple Questions)
  ↓ [Q1: "How long together?" → Tap "1-2 years"]
  ↓ [Show reaction: "True partners push each other!"]
  ↓ [Tap "Continue (3 more questions)"]
  ↓ [Q2: "Eat together?" → Tap "Sometimes"]
  ↓ [Q3: "Workout together?" → Tap "Never"]
  ↓ [Q4: "Who's more motivated?" → Tap "Equal"]
S16 (Couple Weekly Pay)
  ↓ [Show ₹54, shared code 9876]
  ↓ [Tap "Pay ₹54"]
  ↓ [Backend: Charge ₹54 → success]
S26 (Category)
  ↓ [Tap "Lose Weight / Diet Plan"]
S27 (Meal Frequency)
  ↓ [Tap "4 Meals"]
S28 (Meal Times)
  ↓ [Set times: 8AM, 11AM, 2PM, 8PM]
S30 (Summary Weekly)
  ↓ [Review]
S31 (Activation)
  ↓ [Confetti]
  ↓ [Tap "Done"]
S01 (Welcome)
```

**Backend Actions:**
1. Store user1: `{ phone: '9876543210', code: '9876', planType: 'couple_weekly' }`
2. Store user2: `{ phone: '8765432109', code: '9876', planType: 'couple_weekly' }`
3. Link both: `{ coupleId: 'unique-id', members: [user1, user2] }`
4. Create subscription: `{ coupleId, startDate, endDate, status: 'active' }`
5. Generate 2 separate WhatsApp plans (same schedule but different messages)

---

### FLOW 3: NEW USER - FRIENDS WEEKLY PLAN (5 PEOPLE)

```
S01 (Welcome)
  ↓ [Tap "New User"]
S02 (Phone Entry)
  ↓ [Enter +91-9876543210]
S03 (OTP)
S05 (Code Generated)
  ↓ [Code 9876]
S11 (Group Type)
  ↓ [Tap "Friends - From ₹49/week"]
S17 (Friends Size)
  ↓ [Tap "Crew - 5 people - ₹140"]
S18 (Friends Add Members)
  ↓ [Member 1: +91-9876543210 (You) ✓]
  ↓ [Member 2: Enter +91-8765432109]
  ↓ [Member 3: Enter +91-7654321098]
  ↓ [Member 4: Enter +91-6543210987]
  ↓ [Member 5: Enter +91-5432109876]
  ↓ [Backend: Validate no duplicates]
  ↓ [Backend: Send OTPs to all 4 members]
  ↓ [Tap "Send OTPs"]
  ↓ [Wait for all verifications... or timeout after 5min → show skip option]
S19 (Friends Questions)
  ↓ [Q1: "How long friends?" → Tap "Best friends (3+ years)"]
  ↓ [Q2: "Group dynamic?" → Tap "Very competitive"]
  ↓ [Q3: "Activity level?" → Tap "Super active"]
S20 (Friends Weekly Pay)
  ↓ [Show ₹140, shared code 9876]
  ↓ [Tap "Pay ₹140"]
S26 (Category)
  ↓ [Tap "General Health Tips"]
S27 → S28 → S30 → S31
S01 (Welcome)
```

**Backend Actions:**
1. Store all 5 users with same code '9876'
2. Link group: `{ groupId: 'unique-id', members: [5 users], size: 5 }`
3. Create subscription: `{ groupId, amount: 140, status: 'active' }`
4. Generate 5 separate WhatsApp plans

---

### FLOW 4: NEW USER - DAILY PLAN (CELEBRITY THEME)

```
S01 (Welcome)
  ↓ [Tap "New User"]
S02 (Phone Entry)
  ↓ [Enter +91-9876543210]
S03 (OTP)
S05 (Code Generated)
  ↓ [Code 9876]
S11 (Group Type)
  ↓ [Tap "Just for Today - ₹7-13/day"]
S21 (Fan Quiz Type)
  ↓ [Tap "🎤 Singer"]
S24 (Fan Singer)
  ↓ [Tap "Taylor Swift - Lucky 13 - ₹13"]
  ↓ [Backend: Set dailyPrice = 13]
S26 (Category)
  ↓ [Tap "Clear Acne / Skin Care"]
  ↓ [Backend: category = 'acne']
S27 (Meal Frequency)
  ↓ [Tap "3 Meals"]
S28 (Meal Times)
  ↓ [Set times]
S29 (Summary Daily)
  ↓ [Review: Celebrity = Taylor Swift, Goal = Acne, Meals = 3]
  ↓ [Show "Amount to Pay: ₹13"]
  ↓ [Tap "Pay ₹13 & Activate"]
  ↓ [Backend: Process payment → success]
S31 (Activation)
  ↓ [Confetti, code 9876]
  ↓ [Show "Upload Photo for AI Analysis" button]
  ↓ [Tap "Upload Photo"]
S32 (Acne Photo QR)
  ↓ [Show QR code: https://upload.fitbot.com/9876]
  ↓ [User scans with phone → Camera opens → Takes photo → Uploads]
  ↓ [Timer: 0s, 30s, 60s, 90s, 120s...]
  ↓ IF photo uploaded within 2min → Navigate to S35
  ↓ IF 2min timeout → Navigate to S33
```

**SCENARIO A: Photo Uploaded**
```
S35 (Acne Photo Uploaded)
  ↓ [Show AI analyzing...]
  ↓ [Backend: GPT-4 Vision API → "Active Acne, Moderate severity"]
  ↓ [Show diagnosis]
  ↓ [Options: "Keep Photo" or "Delete After Analysis"]
  ↓ [User taps "Keep Photo"]
  ↓ [Backend: Store photo URL in database]
S36 (Acne Treatment)
  ↓ [Show personalized plan: Morning cleanser, Night treatment, Diet tips]
  ↓ [Tap "Continue"]
S37 (WhatsApp Preview)
S01 (Welcome)
```

**SCENARIO B: Photo Timeout**
```
S33 (Acne Photo Timeout)
  ↓ [Show "Still waiting... 2:15 elapsed"]
  ↓ [Tap "Skip Photo Analysis"]
S34 (Acne Manual Select)
  ↓ [Show 5 options with images:]
     - Active Acne 🔴
     - Blackheads ⚫
     - Whiteheads ⚪
     - Acne Scars 🟤
     - Mixed Types 🎨
  ↓ [Tap "Active Acne"]
  ↓ [Backend: acneType = 'active']
S36 (Acne Treatment)
  ↓ [Same as above, but no photo stored]
S37 → S01
```

**Backend Actions:**
1. Create subscription: `{ type: 'daily', validUntil: today 11:59PM, celebrity: 'taylor', price: 13 }`
2. If acne photo uploaded: `{ photoUrl: 's3://...', aiDiagnosis: 'active', keepPhoto: true }`
3. Generate WhatsApp plan (acne-specific: cleanser reminders, diet tracking)

---

### FLOW 5: RETURNING USER - ACTIVE WEEKLY PLAN (HIGH COMPLIANCE)

```
S01 (Welcome)
  ↓ [Tap "Returning User"]
S06 (Code Entry)
  ↓ [Enter code 9876]
  ↓ [Backend: Check subscription status]
     → subscription = { status: 'active', type: 'solo_weekly', daysLeft: 4 }
     → progress = { water: 22/28, meals: 18/21, workouts: 4/5 }
     → avgCompliance = 86%
S08 (Return Active)
  ↓ [Show "Welcome Back! Plan active - 4 days left"]
  ↓ [Show streak: "🔥 7 Day Streak!"]
  ↓ [Show progress bars:]
     - Water: 22/28 (79%)
     - Meals: 18/21 (86%)
     - Workouts: 4/5 (80%)
  ↓ [Backend: avgCompliance = 86% ≥ 80%]
  ↓ [Show button: "✅ Doing Great! Continue →"]
  ↓ [Tap button]
S38 (Today's Plan)
  ↓ [Show today's schedule:]
     - 💧 Water: 4 glasses at 9AM, 12PM, 3PM, 6PM
     - 🍽️ Meals: Breakfast 8AM, Lunch 1PM, Dinner 8PM
     - 💪 Workout: 10 pushups + 10 squats at 5PM
  ↓ [Tap "Got It!"]
S01 (Welcome)
```

**Backend Actions:**
1. Fetch user data by code
2. Calculate compliance percentages
3. Return current day's plan from WhatsApp schedule

---

### FLOW 6: RETURNING USER - ACTIVE WEEKLY PLAN (MEDIUM COMPLIANCE)

```
S06 (Code Entry)
  ↓ [Enter 9876]
  ↓ [Backend: compliance = 68% (between 60-80%)]
S08 (Return Active)
  ↓ [Show progress: Water 15/28 (54%), Meals 20/21 (95%), Workouts 2/5 (40%)]
  ↓ [Show button: "📈 Check Progress & Form →"]
  ↓ [Tap button]
S39 (Form Check)
  ↓ [Show "You've Been Consistent! Let's check technique"]
  ↓ [Q1: "🏋️ Pushups - straight back?" → Tap "✓ Yes" / "? Not sure"]
  ↓ [Q2: "🍛 Rice - only 1 cup?" → Tap "✓ Yes"]
  ↓ [Q3: "🧴 Washing face before bed?" → Tap "✗ No"]
  ↓ [Backend: Save responses → facewash = false]
  ↓ [Show tip: "Remember: Wash face 2x daily for best results!"]
  ↓ [Tap "Continue"]
S38 (Today's Plan)
  ↓ [Updated plan includes: "🧴 Face wash at 10PM"]
S01 (Welcome)
```

**Backend Actions:**
1. Detect medium compliance
2. Show form check questions
3. Update plan based on answers (add missing steps)

---

### FLOW 7: RETURNING USER - ACTIVE WEEKLY PLAN (LOW COMPLIANCE)

```
S06 (Code Entry)
  ↓ [Enter 9876]
  ↓ [Backend: compliance = 45% (<60%)]
S08 (Return Active)
  ↓ [Show progress: Water 8/28 (29%), Meals 10/21 (48%), Workouts 1/5 (20%)]
  ↓ [Show button: "📉 Let's Make It Easier →"]
  ↓ [Tap button]
S40 (Make Easier)
  ↓ [Show "Recent Skips:"]
     - ❌ 2 workout days
     - ❌ 4 lunches
     - ❌ Water on 3 days
  ↓ [Show "Your New Easier Plan:"]
     - 💪 5 pushups (not 10) - Just 2 minutes
     - 💧 1 glass every 2 hours
     - 🍽️ Simpler meals - Less ingredients
  ↓ [Tap "Sounds Good!"]
  ↓ [Backend: Update plan targets → workouts = 5 pushups, water = 3 glasses]
S38 (Today's Plan)
  ↓ [Show REDUCED targets]
S01 (Welcome)
```

**Backend Actions:**
1. Detect low compliance
2. Reduce targets by 50%
3. Update WhatsApp reminders with new goals

---

### FLOW 8: RETURNING USER - EXPIRED WEEKLY PLAN

```
S06 (Code Entry)
  ↓ [Enter 9876]
  ↓ [Backend: subscription = { status: 'expired', type: 'solo_weekly', endDate: 2 days ago }]
S09 (Return Weekly Expired)
  ↓ [Show "Welcome Back! Your weekly plan has ended"]
  ↓ [Show "Last Week's Results:"]
     - Water: 26/28 🔥
     - Meals: 20/21
     - Workouts: 4/5
     - Overall: 93% Consistency!
  ↓ [Show buttons:]
     - "Renew Plan →" (primary)
     - "Change Plan Type" (secondary)
  ↓ [Tap "Renew Plan"]
S42 (Renew Plan)
  ↓ [Show "Same Plan as Last Week"]
  ↓ [Show details: Solo Weekly, ₹29, 7 days]
  ↓ [Tap "Pay ₹29 & Renew"]
  ↓ [Backend: Create new subscription → startDate = today, endDate = today+7]
S26 (Category)
  ↓ [Continue normal flow...]
```

**Alternative: Change Plan**
```
S09 (Return Weekly Expired)
  ↓ [Tap "Change Plan Type"]
S43 (Change Plan)
  ↓ [Show "Your progress is saved! You can switch plans anytime."]
  ↓ [Tap "Pick New Plan"]
S11 (Group Type)
  ↓ [User picks different plan type...]
```

**Backend Actions:**
1. Archive old subscription
2. Create new subscription with fresh dates
3. Preserve progress history for comparison

---

### FLOW 9: RETURNING USER - EXPIRED DAILY PLAN

```
S06 (Code Entry)
  ↓ [Enter 9876]
  ↓ [Backend: subscription = { status: 'expired', type: 'daily', validUntil: yesterday }]
S10 (Return Daily Expired)
  ↓ [Show "Back Again? Yesterday's plan completed"]
  ↓ [Show "Yesterday's Achievement:"]
     - Meals: 3/4 ✅
     - Water: 3/4
     - Workout: Done ✅
     - Overall: 75% Completion!
  ↓ [Show "Today is a fresh day. Pick your plan:"]
  ↓ [Tap "Pick Today's Plan"]
S11 (Group Type)
  ↓ [Tap "Just for Today"]
S21 (Fan Quiz Type)
  ↓ [Continue normal daily flow...]
```

**Backend Actions:**
1. Archive yesterday's subscription
2. Create fresh daily subscription
3. User pays again (daily is NOT auto-renewal)

---

### FLOW 10: RETURNING USER - UPDATE SETTINGS (MID-WEEK)

```
S06 → S08 (Return Active)
  ↓ [Tap "⚙️ Update Meal/Workout Times"]
S44 (Update Settings)
  ↓ [Show "Current Settings:"]
     - Meals/day: 3 meals
     - Breakfast: 8:00 AM
     - Lunch: 1:00 PM
     - Dinner: 8:00 PM
     - Workout: 5:00 PM
  ↓ [Update Times:]
     - Breakfast: Change to 9:00 AM
     - Workout: Change to 6:00 PM
  ↓ [Tap "Save Changes"]
  ↓ [Backend: Update WhatsApp schedule immediately]
S08 (Return Active)
  ↓ [Show confirmation: "✅ Times updated! New reminders start tomorrow."]
S38 (Today's Plan)
```

**Backend Actions:**
1. Update meal/workout times in database
2. Regenerate WhatsApp reminder schedule
3. Cancel old reminders, schedule new ones

---

### FLOW 11: RETURNING USER - NO WHATSAPP DATA (0% PROGRESS)

```
S06 → S08 (Return Active)
  ↓ [Backend: progress = { water: 0/28, meals: 0/21, workouts: 0/5 }]
  ↓ [Show progress: All 0%]
  ↓ [Show button: "Why Tracking Matters →"]
  ↓ [Tap button]
S41 (Why Tracking)
  ↓ [Show education screen:]
     - "The 80/20 Rule"
     - Comparison: No Tracking (15% success) vs Daily Tracking (72% success)
     - "How It Works" steps
  ↓ [Tap "Got It! Show Today's Plan"]
S38 (Today's Plan)
```

**Backend Actions:**
1. Detect 0% compliance
2. Show education instead of negative feedback
3. Re-engage user with explanation

---

## NAVIGATION RULES

### Back Button Logic

```javascript
const canGoBack = (screenId) => {
  // Security screens: NEVER go back
  if (['S05', 'S31'].includes(screenId)) return false;
  
  // After payment: NEVER go back
  if (['S30', 'S31', 'S32', 'S35', 'S36', 'S37', 'S38'].includes(screenId)) return false;
  
  // Return visit screens: NEVER go back (user must re-enter code)
  if (['S08', 'S09', 'S10'].includes(screenId)) return false;
  
  // Error screens: NEVER go back (show specific actions only)
  if (['S04', 'S07', 'S14', 'S33', 'S45', 'E01', 'E03', 'E04'].includes(screenId)) return false;
  
  // Category screen: Can go back ONLY if daily plan
  if (screenId === 'S26') {
    return userData.planType === 'daily'; // Weekly already paid
  }
  
  // All other screens: CAN go back
  return true;
};
```

### Screen Routing Logic

```javascript
const navigateFromCodeEntry = (code) => {
  const subscription = getSubscriptionStatus(code); // Backend API call
  
  if (!subscription) {
    return 'S07'; // Code Not Found
  }
  
  if (subscription.status === 'active') {
    if (subscription.type.includes('weekly')) {
      return 'S08'; // Return Active (weekly)
    }
    // Daily plans are never "active" after today
    return 'S10'; // Return Daily Expired
  }
  
  if (subscription.status === 'expired') {
    if (subscription.type.includes('weekly')) {
      return 'S09'; // Return Weekly Expired
    } else {
      return 'S10'; // Return Daily Expired
    }
  }
};
```

### Compliance-Based Routing

```javascript
const routeFromReturnActive = (compliance) => {
  if (compliance >= 80) {
    return 'S38'; // Today's Plan (doing great!)
  } else if (compliance >= 60) {
    return 'S39'; // Form Check (technique issues?)
  } else if (compliance === 0) {
    return 'S41'; // Why Tracking (education)
  } else {
    return 'S40'; // Make Easier (reduce targets)
  }
};
```

---

## ERROR HANDLING

### Error 1: OTP Failed (3 Attempts)

**Trigger:** User enters wrong OTP 3 times  
**Screen:** S04 (OTP Failed)  
**Actions:**
- Show 10-minute cooldown timer
- Disable all buttons except "Try Different Number"
- Backend: Lock phone number for 10 minutes
- Frontend: Show countdown timer (10:00, 9:59, 9:58...)

**Recovery:**
- After 10 minutes → Navigate to S02 (Phone Entry)
- OR → User taps "Try Different Number" → S02

---

### Error 2: Code Not Found

**Trigger:** User enters invalid 4-digit code  
**Screen:** S07 (Code Not Found)  
**Actions:**
- Show "Code doesn't match our records"
- Backend: Log failed attempt for fraud detection
- Options: "Try Again" → S06 | "New User" → S02

**Edge Case:** 
- If user tries 5+ wrong codes in a row → E03 (Kiosk Offline / Fraud Detection)

---

### Error 3: Trial Already Used

**Trigger:** Phone number already used free trial  
**Screen:** E01 (Trial Used Error)  
**Actions:**
- Show "One Free Trial Per Person"
- Explain fairness policy
- Options: "Try Different Number" → S02 | "Back to Home" → S01

**Backend Check:**
```javascript
const checkTrialUsed = (phone) => {
  const user = getUserByPhone(phone);
  if (user && user.trialUsed === true) {
    return true; // Show E01
  }
  return false; // Allow signup
};
```

---

### Error 4: Invalid Referral Code

**Trigger:** User enters referral code that doesn't exist  
**Screen:** E02 (Invalid Referral)  
**Actions:**
- Show "Code Not Found"
- Options: "Continue Without Code" → S03 | "Try Different Code" → S02

**Backend Check:**
```javascript
const validateReferralCode = (code) => {
  const referrer = getUserByCode(code);
  if (!referrer) {
    return { valid: false, message: 'Code not found' };
  }
  return { valid: true, credit: 5 };
};
```

---

### Error 5: Payment Failed

**Trigger:** Payment gateway returns error  
**Screen:** S45 (Payment Failed)  
**Actions:**
- Show "Payment Failed - Something went wrong"
- Options: "Retry Payment" → Retry | "Choose Different Plan" → S11

**Common Reasons:**
- Insufficient balance
- Network timeout
- Invalid card details
- Bank declined

**Backend:**
```javascript
const handlePaymentFailure = (error) => {
  logError('payment_failed', { error, userId, amount });
  
  // Show specific error if known
  if (error.code === 'insufficient_balance') {
    return { message: 'Insufficient balance. Try different payment method.' };
  }
  
  // Generic error
  return { message: 'Payment failed. Please try again.' };
};
```

---

### Error 6: Kiosk Offline

**Trigger:** Network/database connection lost  
**Screen:** E03 (Kiosk Offline)  
**Actions:**
- Show "Connection Lost - Reconnecting..."
- Auto-retry every 5 seconds
- Show loading spinner
- No user action needed (auto-recovery)

**Backend:**
```javascript
const handleOffline = () => {
  let retries = 0;
  const maxRetries = 12; // 1 minute (5s × 12)
  
  const retry = setInterval(() => {
    if (checkConnection()) {
      clearInterval(retry);
      navigate('S01'); // Back to welcome
    }
    retries++;
    if (retries >= maxRetries) {
      clearInterval(retry);
      showMessage('Please contact admin. Kiosk ID: 12345');
    }
  }, 5000);
};
```

---

### Error 7: Plan Conflict (Already in Group)

**Trigger:** User tries to join Couple plan but already in Friends plan  
**Screen:** E04 (Plan Conflict)  
**Actions:**
- Show "Already in a Group"
- Explain: "Leave your current Friends plan first"
- Options: "Pick Different Plan" → S11 | "Back to Home" → S01

**Backend Check:**
```javascript
const checkPlanConflict = (userId, newPlanType) => {
  const activePlans = getActivePlans(userId);
  
  if (newPlanType === 'couple_weekly' && activePlans.includes('friends_weekly')) {
    return { conflict: true, message: 'Already in a Friends plan' };
  }
  
  if (newPlanType === 'friends_weekly' && activePlans.includes('couple_weekly')) {
    return { conflict: true, message: 'Already in a Couple plan' };
  }
  
  return { conflict: false };
};
```

---

### Error 8: Partner OTP Timeout

**Trigger:** Partner doesn't verify OTP within 5 minutes  
**Screen:** S14 (Couple Waiting OTP)  
**Actions:**
- After 5 minutes, show "Still waiting... [Skip & Go Solo]" button
- Options:
  - Continue waiting (no timeout limit, but show skip option)
  - Resend OTP (max 3 times)
  - Try another number → S13
  - Skip & Go Solo → S12

**Frontend Timer:**
```javascript
useEffect(() => {
  let timer = 0;
  const interval = setInterval(() => {
    timer++;
    setPartnerWaitTime(timer);
    
    if (timer === 300) { // 5 minutes
      showSkipOption(true);
    }
  }, 1000);
  
  return () => clearInterval(interval);
}, []);
```

---

### Error 9: Photo Upload Timeout

**Trigger:** Acne photo not uploaded within 2 minutes  
**Screen:** S33 (Acne Photo Timeout)  
**Actions:**
- Show "Still waiting... 2:15 elapsed"
- Options:
  - "Skip Photo Analysis" → S34 (Manual Selection)
  - "Continue Waiting" → Stay on S32

**Frontend:**
```javascript
useEffect(() => {
  const timeout = setTimeout(() => {
    if (!photoUploaded) {
      navigate('S33'); // Timeout screen
    }
  }, 120000); // 2 minutes
  
  return () => clearTimeout(timeout);
}, [photoUploaded]);
```

---

### Error 10: Duplicate Phone Number (Couple/Friends)

**Trigger:** User enters same phone number twice  
**Screen:** Alert on S13 or S18  
**Actions:**
- Show alert: "Cannot use the same number twice!"
- Clear input field
- Allow retry

**Frontend Validation:**
```javascript
const validatePhoneUnique = (newPhone, existingPhones) => {
  if (existingPhones.includes(newPhone)) {
    alert('Cannot use the same number twice!');
    return false;
  }
  return true;
};
```

---

## BACKEND REQUIREMENTS

### Database Schema

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(15) UNIQUE NOT NULL,
  code VARCHAR(4) UNIQUE NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  trial_used BOOLEAN DEFAULT FALSE,
  referral_code VARCHAR(4),
  referral_credits INTEGER DEFAULT 0,
  max_referrals INTEGER DEFAULT 2,
  used_referrals INTEGER DEFAULT 0
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  type VARCHAR(50), -- 'solo_weekly', 'couple_weekly', 'friends_weekly', 'daily'
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20), -- 'active', 'expired', 'cancelled'
  amount_paid DECIMAL(10, 2),
  celebrity VARCHAR(50), -- For daily plans
  category VARCHAR(50), -- 'fitness', 'acne', 'diet', etc.
  meal_freq INTEGER,
  meal_times JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Groups table (for couple/friends)
CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20), -- 'couple', 'friends'
  code VARCHAR(4) NOT NULL,
  size INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Group members table
CREATE TABLE group_members (
  id SERIAL PRIMARY KEY,
  group_id INTEGER REFERENCES groups(id),
  user_id INTEGER REFERENCES users(id),
  joined_at TIMESTAMP DEFAULT NOW()
);

-- Progress tracking table
CREATE TABLE progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  date DATE NOT NULL,
  water_done INTEGER DEFAULT 0,
  water_target INTEGER,
  meals_done INTEGER DEFAULT 0,
  meals_target INTEGER,
  workouts_done INTEGER DEFAULT 0,
  workouts_target INTEGER,
  compliance_percent DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Acne photos table
CREATE TABLE acne_photos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  photo_url TEXT,
  ai_diagnosis TEXT,
  acne_type VARCHAR(50),
  keep_photo BOOLEAN DEFAULT TRUE,
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Referrals table
CREATE TABLE referrals (
  id SERIAL PRIMARY KEY,
  referrer_id INTEGER REFERENCES users(id),
  referee_id INTEGER REFERENCES users(id),
  referral_code VARCHAR(4),
  status VARCHAR(20), -- 'pending', 'credited', 'used'
  credit_amount DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  subscription_id INTEGER REFERENCES subscriptions(id),
  amount DECIMAL(10, 2),
  status VARCHAR(20), -- 'success', 'failed', 'pending'
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- WhatsApp messages log
CREATE TABLE whatsapp_messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  message_type VARCHAR(50), -- 'water', 'meal', 'workout'
  message_text TEXT,
  sent_at TIMESTAMP,
  response VARCHAR(10), -- 'YES', 'NO', NULL
  responded_at TIMESTAMP
);
```

---

### API Endpoints

```
POST /api/auth/send-otp
  Body: { phone: "9876543210" }
  Response: { success: true, message: "OTP sent" }

POST /api/auth/verify-otp
  Body: { phone: "9876543210", otp: "1234" }
  Response: { success: true, code: "9876", referralCredits: 5 }

GET /api/subscription/status/:code
  Response: {
    status: "active",
    type: "solo_weekly",
    daysLeft: 4,
    progress: { water: { done: 22, target: 28 }, ... },
    streak: 7
  }

POST /api/subscription/create
  Body: {
    userId: 123,
    type: "solo_weekly",
    category: "fitness",
    mealFreq: 3,
    mealTimes: { breakfast: "08:00", lunch: "13:00", dinner: "20:00" }
  }
  Response: { subscriptionId: 456, status: "active" }

POST /api/payment/process
  Body: {
    userId: 123,
    amount: 24,
    paymentMethod: "razorpay",
    referralCredits: 5
  }
  Response: { success: true, transactionId: "txn_abc123" }

POST /api/group/create
  Body: {
    type: "couple",
    members: [{ phone: "9876543210" }, { phone: "8765432109" }],
    code: "9876"
  }
  Response: { groupId: 789, code: "9876" }

POST /api/acne/upload-photo
  Body: FormData with photo file + userId
  Response: { photoUrl: "s3://...", aiDiagnosis: "active_acne" }

GET /api/progress/:userId/:date
  Response: {
    water: { done: 3, target: 4 },
    meals: { done: 2, target: 3 },
    workouts: { done: 1, target: 1 }
  }

POST /api/whatsapp/update-response
  Body: { userId: 123, messageType: "water", response: "YES" }
  Response: { success: true }

POST /api/referral/validate
  Body: { code: "ABCD" }
  Response: { valid: true, credit: 5 }
```

---

## UI/UX SPECIFICATIONS

### Design System

**Color Palette:**
```css
:root {
  --primary: #F97316;        /* Orange */
  --primary-dark: #EA580C;
  --primary-light: #FB923C;
  --bg: #FFFBF5;            /* Warm cream */
  --card: #FFFFFF;
  --success: #22C55E;
  --warning: #FACC15;
  --danger: #EF4444;
  --text: #1F2937;
  --text-light: #6B7280;
  --text-dim: #9CA3AF;
  --border: #E5E7EB;
  --pink: #EC4899;
  --blue: #3B82F6;
  --purple: #A855F7;
}
```

**Typography:**
```css
/* Headings */
h1 { font-size: 48px; font-weight: 900; letter-spacing: -0.02em; }
h2 { font-size: 36px; font-weight: 800; }
h3 { font-size: 24px; font-weight: 700; }

/* Body */
body { font-size: 18px; line-height: 1.6; }
.subtitle { font-size: 16px; color: var(--text-light); }

/* Buttons */
.btn-large { font-size: 20px; padding: 20px; font-weight: 700; }
.btn-regular { font-size: 18px; padding: 12px 24px; font-weight: 600; }
```

**Spacing:**
```css
/* Container padding */
.screen-container { padding: 48px 32px; max-width: 768px; margin: 0 auto; }

/* Component gaps */
.gap-small: 12px;
.gap-medium: 24px;
.gap-large: 48px;
```

**Border Radius:**
```css
.rounded-sm: 8px;   /* Inputs */
.rounded-md: 12px;  /* Cards */
.rounded-lg: 16px;  /* Buttons */
.rounded-xl: 24px;  /* Major containers */
```

---

### Touch Optimization

**Button Sizes:**
- Minimum touch target: 56px × 56px
- Primary buttons: Full-width, 64px height
- Icon buttons: 56px × 56px
- Text buttons: 48px height minimum

**Input Fields:**
- Height: 56px
- Font size: 20px (prevent zoom on iOS)
- Number inputs: 64px height for single digits

**Spacing:**
- Minimum gap between tappable elements: 16px
- Safe area from screen edges: 24px

---

### Animations

```css
/* Page transitions */
.screen-enter {
  animation: slideInRight 0.3s ease-out;
}

.screen-exit {
  animation: slideOutLeft 0.3s ease-out;
}

@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Success states */
.confetti {
  animation: confettiFall 1s ease-out;
}

/* Loading states */
.loading-spinner {
  animation: spin 1s linear infinite;
}

/* Progress bars */
.progress-fill {
  transition: width 0.5s ease-out;
}

/* Hover states (touch feedback) */
.btn:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}
```

---

### Accessibility

**Screen Reader Support:**
```jsx
<button aria-label="Continue to payment" onClick={handlePay}>
  Pay ₹24 →
</button>

<input 
  type="tel"
  aria-label="Phone number"
  placeholder="9876543210"
  maxLength="10"
/>
```

**Focus Management:**
```javascript
// Auto-focus first input on screen load
useEffect(() => {
  inputRef.current?.focus();
}, []);

// Tab order follows visual flow
<input tabIndex={1} />
<input tabIndex={2} />
<button tabIndex={3} />
```

**Error Announcements:**
```jsx
<div role="alert" aria-live="assertive">
  Payment failed. Please try again.
</div>
```

---

## WHATSAPP INTEGRATION

### Message Templates

**Water Reminder:**
```
☀️ Good morning!

💧 Time for your 1st glass of water (9:00 AM)

Did you drink it?
Reply: YES or NO
```

**Water Response (YES):**
```
✅ Great! Water logged.

💧 Next glass at 12:00 PM
See you then! 🙌
```

**Water Response (NO):**
```
No worries! Try to drink it soon.

⏰ I'll remind you in 30 minutes.
Hydration = health! 💪
```

**Meal Reminder:**
```
🍳 Breakfast time! (8:00 AM)

Today's meal:
• 4 eggs (boiled/scrambled)
• 2 parathas
• 1 glass milk

Had breakfast?
Reply: YES or NO
```

**Workout Reminder:**
```
💪 Workout time! (5:00 PM)

Today's plan:
• 10 pushups
• 10 squats
• 1 min plank

Done?
Reply: YES or NO
```

**Missed Workout:**
```
⚠️ You haven't worked out in 2 days.

Remember: Consistency > Intensity

Want me to make it easier?
Reply: EASIER or SKIP
```

**Acne Reminder (Morning):**
```
🌅 Morning skincare time!

1️⃣ Gentle cleanser
2️⃣ Pat dry (don't rub!)
3️⃣ Moisturizer

Done?
Reply: YES or NO
```

**Acne Reminder (Night):**
```
🌙 Night skincare routine!

1️⃣ Salicylic acid wash
2️⃣ Spot treatment on acne
3️⃣ Night cream

Done?
Reply: YES or NO
```

---

### WhatsApp Bot Logic

```javascript
const handleWhatsAppResponse = async (userId, messageType, response) => {
  const today = new Date().toISOString().split('T')[0];
  
  // Get current progress
  const progress = await getProgress(userId, today);
  
  if (response === 'YES') {
    // Increment done count
    progress[`${messageType}_done`]++;
    
    // Send confirmation
    await sendMessage(userId, getConfirmationMessage(messageType));
    
    // Send next reminder preview
    const nextReminder = getNextReminder(userId, messageType);
    await sendMessage(userId, `💚 Next: ${nextReminder.time}`);
    
  } else if (response === 'NO') {
    // Send encouraging message
    await sendMessage(userId, getEncouragementMessage(messageType));
    
    // Schedule follow-up reminder (30 min later)
    scheduleReminder(userId, messageType, 30);
  }
  
  // Update database
  await updateProgress(userId, today, progress);
  
  // Calculate compliance
  const compliance = calculateCompliance(progress);
  
  // Trigger intervention if needed
  if (compliance < 40 && progress.total_days >= 3) {
    await sendMessage(userId, 
      "📊 I noticed you're skipping a lot. Want to make the plan easier? Reply EASIER"
    );
  }
};
```

---

### Message Scheduling

```javascript
const generateWhatsAppSchedule = (subscription) => {
  const schedule = [];
  const { mealTimes, mealFreq, category } = subscription;
  
  // Water reminders (4x daily)
  const waterTimes = ['09:00', '12:00', '15:00', '18:00'];
  waterTimes.forEach(time => {
    schedule.push({
      time,
      type: 'water',
      message: getWaterMessage(time)
    });
  });
  
  // Meal reminders
  Object.entries(mealTimes).forEach(([meal, time]) => {
    schedule.push({
      time,
      type: 'meal',
      meal,
      message: getMealMessage(meal, category)
    });
  });
  
  // Workout reminder (5 PM default)
  schedule.push({
    time: '17:00',
    type: 'workout',
    message: getWorkoutMessage(category)
  });
  
  // Acne-specific reminders
  if (category === 'acne') {
    schedule.push({
      time: '08:00',
      type: 'skincare_morning',
      message: getSkincareMessage('morning')
    });
    schedule.push({
      time: '22:00',
      type: 'skincare_night',
      message: getSkincareMessage('night')
    });
  }
  
  return schedule;
};
```

---

## PAYMENT INTEGRATION

### Razorpay Integration

```javascript
const processPayment = async (userId, amount, referralCredits) => {
  // Apply referral credit (max ₹10)
  const discount = Math.min(referralCredits, 10);
  const finalAmount = amount - discount;
  
  // Create Razorpay order
  const order = await razorpay.orders.create({
    amount: finalAmount * 100, // Paise
    currency: 'INR',
    receipt: `receipt_${userId}_${Date.now()}`,
    notes: {
      userId,
      originalAmount: amount,
      discount,
      finalAmount
    }
  });
  
  // Return order details to frontend
  return {
    orderId: order.id,
    amount: finalAmount,
    key: process.env.RAZORPAY_KEY_ID
  };
};
```

**Frontend Payment Handler:**
```javascript
const initiatePayment = (orderId, amount) => {
  const options = {
    key: razorpayKeyId,
    amount: amount * 100,
    currency: 'INR',
    name: 'FitBot Kiosk',
    description: 'Weekly Health Plan',
    order_id: orderId,
    handler: async (response) => {
      // Payment success
      await verifyPayment(response);
      navigate('S31'); // Activation
    },
    modal: {
      ondismiss: () => {
        // Payment cancelled
        navigate('S45'); // Payment Failed
      }
    },
    theme: {
      color: '#F97316' // Orange
    }
  };
  
  const rzp = new Razorpay(options);
  rzp.open();
};
```

---

### Payment Verification

```javascript
const verifyPayment = async (response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
  
  // Verify signature
  const isValid = verifyRazorpaySignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  );
  
  if (isValid) {
    // Update payment record
    await updatePayment(razorpay_order_id, {
      status: 'success',
      transactionId: razorpay_payment_id
    });
    
    // Activate subscription
    await activateSubscription(userId);
    
    // Send WhatsApp confirmation
    await sendMessage(userId, 
      `✅ Payment successful! Your plan is now active. Code: ${userCode}`
    );
    
    return { success: true };
  } else {
    // Invalid signature
    await updatePayment(razorpay_order_id, { status: 'failed' });
    return { success: false, error: 'Invalid signature' };
  }
};
```

---

## DATA MODELS

### User Model

```typescript
interface User {
  id: number;
  phone: string;
  code: string;
  email?: string;
  createdAt: Date;
  trialUsed: boolean;
  referralCode?: string;
  referralCredits: number;
  maxReferrals: number;
  usedReferrals: number;
}
```

### Subscription Model

```typescript
interface Subscription {
  id: number;
  userId: number;
  type: 'solo_weekly' | 'couple_weekly' | 'friends_weekly' | 'daily';
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expired' | 'cancelled';
  amountPaid: number;
  celebrity?: string; // For daily plans
  category: 'fitness' | 'acne' | 'diet' | 'firstaid' | 'health';
  mealFreq: 3 | 4;
  mealTimes: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snack?: string;
  };
  createdAt: Date;
}
```

### Progress Model

```typescript
interface Progress {
  id: number;
  userId: number;
  date: Date;
  water: {
    done: number;
    target: number;
  };
  meals: {
    done: number;
    target: number;
  };
  workouts: {
    done: number;
    target: number;
  };
  compliancePercent: number;
  createdAt: Date;
}
```

### Group Model

```typescript
interface Group {
  id: number;
  type: 'couple' | 'friends';
  code: string;
  size: number;
  members: number[]; // User IDs
  createdAt: Date;
}
```

---

## DEPLOYMENT CHECKLIST

### Frontend Deployment

- [ ] Build React app for production
- [ ] Optimize images (compress to WebP)
- [ ] Enable touch gestures (react-swipeable)
- [ ] Set up kiosk mode (disable right-click, F11 fullscreen)
- [ ] Configure auto-reload on crash
- [ ] Set up analytics (screen views, button clicks)

### Backend Deployment

- [ ] Set up PostgreSQL database
- [ ] Configure environment variables (API keys, secrets)
- [ ] Set up Redis for session management
- [ ] Configure Twilio/WhatsApp API
- [ ] Set up Razorpay payment gateway
- [ ] Configure S3/Cloudinary for photo uploads
- [ ] Set up cron jobs for WhatsApp reminders
- [ ] Enable error logging (Sentry)

### Testing Checklist

- [ ] Test all 45+ screens individually
- [ ] Test all user flows (10 flows listed above)
- [ ] Test error scenarios (10 errors listed above)
- [ ] Test payment integration (success + failure)
- [ ] Test WhatsApp bot responses
- [ ] Test photo upload (QR code + timeout)
- [ ] Test referral system
- [ ] Test return visit routing
- [ ] Test compliance calculations
- [ ] Load test (100+ concurrent users)

---

## SUMMARY

This specification covers:

✅ **45+ Screens** - Every screen documented with ID, purpose, navigation rules  
✅ **10 Complete User Flows** - New user, returning user, daily, weekly, couple, friends  
✅ **10 Error Scenarios** - OTP fail, payment fail, offline, conflicts, etc.  
✅ **Backend Requirements** - Database schema, API endpoints, business logic  
✅ **WhatsApp Integration** - Message templates, bot logic, scheduling  
✅ **Payment Integration** - Razorpay setup, verification, error handling  
✅ **UI/UX Specifications** - Design system, animations, accessibility  
✅ **Data Models** - TypeScript interfaces for all entities  

**Next Steps for Developer:**
1. Set up React project with routing
2. Implement all 45 screens following screen map
3. Build backend API with PostgreSQL
4. Integrate WhatsApp bot with Twilio
5. Connect Razorpay payment gateway
6. Test all flows thoroughly
7. Deploy to kiosk hardware

**Estimated Development Time:**
- Frontend: 3-4 weeks
- Backend: 2-3 weeks
- WhatsApp Integration: 1 week
- Testing & Deployment: 1 week
- **Total: 7-9 weeks**

---

**END OF SPECIFICATION**