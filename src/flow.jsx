import { useState } from "react";

/* ─── COLORS ─── */
const C = {
  bg:"#0F1117", card:"#1A1D27", accent:"#F97316",
  green:"#22C55E", blue:"#38BDF8", pink:"#EC4899",
  purple:"#A78BFA", yellow:"#FACC15", red:"#EF4444",
  text:"#F1F5F9", textMid:"#94A3B8", textDim:"#64748B",
  border:"#2E3240", wa:"#0EA567",
};

/* ─── PHASES ─── */
const PHASES = {
  entry:    {label:"Entry",        color:C.accent},
  auth:     {label:"Auth",         color:C.blue},
  setup:    {label:"Group Setup",  color:C.purple},
  daily:    {label:"Daily Plan",   color:C.pink},
  goal:     {label:"Goal",         color:"#FB923C"},
  meal:     {label:"Meals",        color:C.yellow},
  pay:      {label:"Pay",          color:C.green},
  success:  {label:"Live! 🎉",    color:C.green},
  whatsapp: {label:"WhatsApp",     color:C.wa},
  return:   {label:"Return Visit", color:C.blue},
  special:  {label:"Acne Flow",    color:C.pink},
};

/* ═══════════════════════════════════════════════
   WORKFLOW — every screen, every branch
   ═══════════════════════════════════════════════ */
const W = {

/* ═══ ENTRY ═══ */
welcome: {
  id:"welcome", phase:"entry", title:"Welcome Screen", icon:"🏥", color:C.accent,
  desc:"Kiosk idles. Leaderboard, wins ticker, daily stats scroll. Tap anywhere to start.",
  screen:[
    "🏆 Today's Champions",
    "  Rahul — 23 days 🔥  |  Priya — 19 days  |  Amit — 15 days",
    "📊 47 students used this today",
    "✨ 'Lost 5kg!' – Sameer  |  'Acne cleared!' – Riya",
    "──",
    "[👤 New User — FREE]      [🔄 Returning — Code]",
  ],
  paths:[
    {label:"👤 New User", next:"phone_entry", color:C.green},
    {label:"🔄 Returning User — enter code", next:"code_entry", color:C.blue},
  ],
},

/* ═══ AUTH ═══ */
phone_entry: {
  id:"phone_entry", phase:"auth", title:"Enter Phone Number", icon:"📱", color:C.blue,
  desc:"10-digit number. OTP goes to WhatsApp. Phone = identity forever. Same phone = same code = same history across all visits.",
  screen:[
    "+91  [ __________ ]",
    "🎁  Have a friend's referral code?  → [ ____ ]",
    "[Send OTP →]",
  ],
  note:{title:"🛡️ Anti-Fraud (silent)", color:C.yellow, items:[
    "Already used free trial? → goes to pay gate",
    "Max 50 free trials per kiosk per day",
    ">3 signups in 1 hour = flagged",
    "Form done in <20 sec = bot, blocked",
  ]},
  paths:[
    {label:"✅ OTP sent → enter OTP", next:"otp_verify", color:C.green},
    {label:"❌ Phone already used trial", next:"returning_pay", color:C.red},
  ],
},

otp_verify: {
  id:"otp_verify", phase:"auth", title:"Enter OTP", icon:"🔢", color:C.blue,
  desc:"4-digit OTP on WhatsApp. Success → access code auto-generated from phone hash. Same phone always = same code.",
  screen:[
    "OTP sent to +91XXXXXXXXXX",
    "[ _ ] [ _ ] [ _ ] [ _ ]",
    "✅ Correct → Code created: 9876",
  ],
  paths:[
    {label:"✅ OTP correct → Who are you here with?", next:"group_type", color:C.green},
    {label:"❌ 3 wrong tries → cooldown", next:"otp_fail", color:C.red},
  ],
},

otp_fail: {
  id:"otp_fail", phase:"auth", title:"OTP Failed", icon:"⚠️", color:C.red,
  desc:"3 wrong attempts. Soft block — never a dead end.",
  screen:["'OTP didn't match 3 times'","'Try again in 10 minutes'","'Or try a different number'"],
  paths:[{label:"🔄 Retry after 10 min", next:"phone_entry", color:C.accent}],
},

returning_pay: {
  id:"returning_pay", phase:"auth", title:"Free Trial Already Used", icon:"💰", color:C.yellow,
  desc:"Phone already used the free trial. Friendly. Shows the same 'Who are you here with?' choices — weekly or daily.",
  screen:[
    "'Welcome back! 👋  Last visit: Jan 28'",
    "'Free trial already used. Pick how you want to continue:'",
    "──",
    "📅  Weekly plans  →  Solo / Couple / Friends",
    "⚡  Just for Today  →  pay per day",
    "🔑  Or enter a referral code → free access",
  ],
  paths:[
    {label:"📅 Weekly or ⚡ Daily → group type screen", next:"group_type", color:C.green},
    {label:"🔑 Referral code → free access", next:"group_type", color:C.purple},
  ],
},

/* ═══ RETURNING USERS ═══ */
code_entry: {
  id:"code_entry", phase:"auth", title:"Returning User — Enter Code", icon:"🔑", color:C.blue,
  desc:"4-digit code. System checks: weekly plan still active? Weekly expired? Or was last plan a daily (always expired by next day)?",
  screen:[
    "🔑  Enter Your Access Code",
    "[ _ ] [ _ ] [ _ ] [ _ ]",
    "(Demo: 9876  or  6241)",
  ],
  paths:[
    {label:"✅ Weekly plan ACTIVE → welcome back (no pay)", next:"return_active", color:C.green},
    {label:"✅ Weekly plan EXPIRED → pay for new week", next:"return_expired", color:C.yellow},
    {label:"✅ Last plan was Daily → back to start", next:"return_daily_again", color:C.pink},
    {label:"❌ Code not found", next:"code_fail", color:C.red},
  ],
},

code_fail: {
  id:"code_fail", phase:"auth", title:"Code Not Found", icon:"❓", color:C.red,
  desc:"Typo or wrong code. No dead end.",
  screen:["'Code not found. Typo?'","[🔄 Try again]   [📱 New number]"],
  paths:[
    {label:"🔄 Retry", next:"code_entry", color:C.accent},
    {label:"📱 Start fresh", next:"phone_entry", color:C.blue},
  ],
},

/* ═══ RETURN — WEEKLY ACTIVE ═══ */
return_active: {
  id:"return_active", phase:"return", title:"Welcome Back — Plan Active", icon:"👋", color:C.blue,
  desc:"Weekly plan still paid. NO payment. Kiosk pulls full YES/NO history. Shows how they did. System decides: adjust or continue.",
  screen:[
    "'Welcome back Faizan! 👋'",
    "📅  Plan active till: Feb 10  —  no payment needed",
    "──",
    "📊  This week so far:",
    "  💧 Water:     22 / 28 glasses  (79%)",
    "  🍽️  Meals:     18 / 21 tracked  (86%)",
    "  💪 Workouts:  3 / 5 done       (60%)",
    "──",
    "System reads this → decides what's next",
  ],
  paths:[
    {label:"📈 Doing it but no results → check form", next:"return_form_check", color:C.pink},
    {label:"📉 Skipped too much → easier plan", next:"return_easier", color:C.yellow},
    {label:"✅ On track → today's plan", next:"return_today", color:C.green},
  ],
},

return_form_check: {
  id:"return_form_check", phase:"return", title:"Consistent But Slow Results", icon:"🔍", color:C.pink,
  desc:"High YES% but results aren't coming. Problem = technique, not effort. Kiosk asks form questions. Sends tutorial links via WhatsApp.",
  screen:[
    "'You've been consistent! 🎉'",
    "'But results are a bit slow. Let's check:'",
    "──",
    "🏋️  'Pushups — straight back?'  → [Yes] [Not sure]",
    "     📹 'Watch: Correct Form' (60 sec)",
    "🍛  'Rice — only 1 cup?'        → [Yes] [Not sure]",
    "     📸 'What 1 cup looks like'",
    "🧴  'Washing face before bed?'  → [Yes] [No]",
    "──",
    "'Updated plan sent to WhatsApp ✅'",
  ],
  paths:[{label:"✅ Corrections noted → today's plan", next:"return_today", color:C.green}],
},

return_easier: {
  id:"return_easier", phase:"return", title:"Making It Easier", icon:"📉", color:C.yellow,
  desc:"Too many skips. Don't shame — reduce targets. Show what was skipped, offer gentler version.",
  screen:[
    "'No pressure. Let's make it doable 💪'",
    "──",
    "❌  Skipped: 2 workout days, 4 lunches, water on 3 days",
    "──",
    "'New plan:'",
    "  💪  5 pushups (not 10) — 2 min",
    "  💧  1 glass every 2 hours",
    "  🍽️  Simpler meals coming",
    "  'Small wins first!'",
    "[Sounds good →]",
  ],
  paths:[{label:"✅ Easier plan set → today's plan", next:"return_today", color:C.green}],
},

return_today: {
  id:"return_today", phase:"return", title:"Today's Plan", icon:"📋", color:C.green,
  desc:"No payment needed — weekly is active. Shows today's adjusted plan. User leaves, WhatsApp handles the day.",
  screen:[
    "📋  Today's Plan:",
    "──",
    "💧  Water: 4 glasses — 9AM, 12PM, 3PM, 6PM",
    "🍽️  Breakfast: 2 eggs + parathas + milk",
    "🍽️  Lunch:     rice (1 cup) + dal + sabzi",
    "🍽️  Dinner:    chicken + roti + salad",
    "💪  Workout: 8 pushups + 10 squats  (7 min)",
    "──",
    "📱  Reminders coming all day. Go! 🔥",
    "[Done — exit]",
  ],
  paths:[{label:"✅ User leaves — WhatsApp runs the day", next:"wa_day_flow", color:C.wa}],
},

/* ═══ RETURN — WEEKLY EXPIRED ═══ */
return_expired: {
  id:"return_expired", phase:"return", title:"Last Week Done — New Week?", icon:"💰", color:C.yellow,
  desc:"Weekly plan ended. Show last week summary warmly, then offer to pay for week 2. Same group type screen again.",
  screen:[
    "'Welcome back Faizan! 👋'",
    "📅  Last plan ended: Feb 3",
    "📊  Last week:",
    "    💧 Water: 26/28  |  🍽️ Meals: 20/21  |  💪 Workouts: 4/5 🔥",
    "──",
    "'Ready for Week 2?'",
    "[Pick a plan again →]",
  ],
  paths:[{label:"📋 Pick again → Who are you here with?", next:"group_type", color:C.green}],
},

/* ═══ RETURN — DAILY USER COMES BACK ═══ */
return_daily_again: {
  id:"return_daily_again", phase:"return", title:"Back Again? Pick for Today", icon:"⚡", color:C.pink,
  desc:"Last plan was a daily plan — it expired at end of that day. Today is a fresh start. Show yesterday's quick stats, then route back to the main screen. They pick 'Just for Today' again and pay again.",
  screen:[
    "'Welcome back! 👋'",
    "📅  Yesterday's plan: done ✅",
    "📊  Yesterday: 3/4 meals ✅  |  💧 3/4 water  |  💪 workout done",
    "──",
    "'Today is a fresh day. Pick how you want to go:'",
    "[👤 Solo weekly] [💑 Couple] [👭 Friends] [⚡ Just for Today]",
  ],
  paths:[
    {label:"📋 Pick again → Who are you here with?", next:"group_type", color:C.green},
  ],
},

/* ═══════════════════════════════════════════════
   ★ THE BIG SCREEN — WHO ARE YOU HERE WITH? ★
   4 options. Weekly trio + Daily single.
   ═══════════════════════════════════════════════ */
group_type: {
  id:"group_type", phase:"setup", title:"Who Are You Here With?", icon:"🎯", color:C.accent,
  desc:"The main decision point. Three weekly plans (pay once, 7 days). One daily plan (pay each day you use it). Weekly and Daily are completely separate paths.",
  screen:[
    "── 📅 WEEKLY PLANS (pay once, valid 7 days) ──",
    "👤  Solo            →  ₹29 / week",
    "💑  Me + Partner   →  ₹54 / week  (both covered)",
    "👭  Me + Friends   →  from ₹49 / week  (group)",
    "──",
    "── ⚡ DAILY PLAN ──",
    "⚡  Just for Today  →  pick a plan, pay per day",
  ],
  paths:[
    {label:"👤 Solo (weekly ₹29)", next:"weekly_solo_pay", color:C.green},
    {label:"💑 Couple (weekly ₹54)", next:"couple_phone", color:C.pink},
    {label:"👭 Friends (weekly ₹49–140)", next:"friend_size", color:C.purple},
    {label:"⚡ Just for Today → fun quiz starts!", next:"fan_quiz_type", color:C.pink},
  ],
},

/* ═══ WEEKLY — SOLO ═══ */
weekly_solo_pay: {
  id:"weekly_solo_pay", phase:"pay", title:"Solo Plan — Pay ₹29", icon:"💰", color:C.green,
  desc:"Solo weekly. Pay ₹29 once. Valid for 7 days. After this, no more payment until it expires. Next step: what are you here for?",
  screen:[
    "👤  Solo Weekly Plan",
    "──",
    "💰  ₹29 / week  —  pay once, valid 7 days",
    "📱  WhatsApp reminders every day",
    "📊  Come back anytime — we track your progress",
    "──",
    "[💳 Pay ₹29 →]",
  ],
  paths:[
    {label:"💳 Pay ₹29 → What are you here for?", next:"category", color:C.green},
  ],
},

/* ═══ WEEKLY — COUPLE ═══ */
couple_phone: {
  id:"couple_phone", phase:"setup", title:"Couple: Add Your Partner", icon:"💑", color:C.pink,
  desc:"You're verified. Enter Partner 2's phone → OTP sent. Both share one code. Messages go individually to each phone.",
  screen:[
    "✅  You:       +91XXXXXXXXXX  (verified)",
    "Partner 2:  +91 [ __________ ]",
    "──",
    "💰  ₹54/week covers both — pay once",
    "📱  Each person gets their OWN messages",
  ],
  paths:[
    {label:"✅ Partner verified → couple Qs", next:"couple_questions", color:C.green},
    {label:"⬅️ Back", next:"group_type", color:C.textDim},
  ],
},

couple_questions: {
  id:"couple_questions", phase:"setup", title:"Couple Questions ×4", icon:"💕", color:C.pink,
  desc:"4 fun questions. Each tap → emoji reaction. Personalization data collected naturally.",
  screen:[
    "Q1: How long together?",
    "    🌱 Just started | 💕 Serious | 💪 Committed | 🔥 Long-term | 🏆 Forever",
    "Q2: Eat together often?",
    "    🍽️ Every meal | 🌙 Dinner | 📅 Weekends | ⏰ Rarely",
    "Q3: Work out together?",
    "    🏋️ Always | 🤷 Sometimes | 🔀 Separately | 🌱 One doesn't yet",
    "Q4: What motivates you?",
    "    ⚔️ Rivalry | 🤝 Support | 🎉 Celebrate | 💪 Push each other",
    "→ Each tap: emoji + reaction + [Continue →]",
  ],
  paths:[{label:"✅ All 4 done → pay ₹54", next:"weekly_couple_pay", color:C.green}],
},

weekly_couple_pay: {
  id:"weekly_couple_pay", phase:"pay", title:"Couple Plan — Pay ₹54", icon:"💰", color:C.green,
  desc:"Pay ₹54 once for both. Valid 7 days. No more charges until it expires.",
  screen:[
    "💑  Couple Weekly Plan",
    "──",
    "💰  ₹54 / week  —  covers both partners",
    "📱  Each person gets individual reminders",
    "📊  Both tracked separately",
    "──",
    "[💳 Pay ₹54 →]",
  ],
  paths:[{label:"💳 Pay ₹54 → What are you here for?", next:"category", color:C.green}],
},

/* ═══ WEEKLY — FRIENDS ═══ */
friend_size: {
  id:"friend_size", phase:"setup", title:"How Big Is Your Squad?", icon:"👭", color:C.purple,
  desc:"2 to 5 people. Per-person cost shown.",
  screen:[
    "2 — DUO    →  ₹49/week   (₹25/person)",
    "3 — TRIO   →  ₹84/week   (₹28/person)",
    "4 — SQUAD  →  ₹112/week  (₹28/person)",
    "5 — CREW   →  ₹140/week  (₹28/person)",
  ],
  paths:[
    {label:"👥 Size picked → add phones", next:"friend_add", color:C.green},
    {label:"⬅️ Back", next:"group_type", color:C.textDim},
  ],
},

friend_add: {
  id:"friend_add", phase:"setup", title:"Add Friend Phones", icon:"📱", color:C.purple,
  desc:"You're Member 1. Type each friend's number. OTPs go out. Everyone gets individual messages.",
  screen:[
    "✅  Member 1 (You):  +91XXXXXXXXXX",
    "Member 2:  +91 [ __________ ]",
    "Member 3:  +91 [ __________ ]",
    "──",
    "💰  Total: ₹84/week  (₹28/person)",
    "[Send Invites & Continue →]",
  ],
  paths:[
    {label:"✅ All added → squad Qs", next:"friend_questions", color:C.green},
    {label:"⬅️ Change size", next:"friend_size", color:C.textDim},
  ],
},

friend_questions: {
  id:"friend_questions", phase:"setup", title:"Squad Questions ×3", icon:"🤝", color:C.purple,
  desc:"3 group questions. Emoji-reaction mechanic. Builds squad identity.",
  screen:[
    "Q1: How long friends?",
    "    🌱 New | 🤝 A while | 💪 Years | 🔥 Forever | 🏆 Squad goals",
    "Q2: Squad vibe?",
    "    ⚔️ Competitive | 🤝 Supportive | 📋 Accountability | 😄 Fun",
    "Q3: How active?",
    "    🏋️ Very active | 💬 Talk more | 🔀 Mixed | 🌱 Fresh start",
    "→ Each tap: emoji + reaction + [Continue →]",
  ],
  paths:[{label:"✅ All 3 done → pay", next:"weekly_friends_pay", color:C.green}],
},

weekly_friends_pay: {
  id:"weekly_friends_pay", phase:"pay", title:"Friends Plan — Pay", icon:"💰", color:C.green,
  desc:"Pay once for the group. Amount depends on squad size. Valid 7 days. No charges until it expires.",
  screen:[
    "👭  Friends Weekly Plan",
    "──",
    "💰  ₹84 / week  —  covers all 3 members",
    "    (₹28 per person)",
    "📱  Each member gets their OWN reminders",
    "📊  Everyone tracked individually",
    "──",
    "[💳 Pay ₹84 →]",
  ],
  paths:[{label:"💳 Pay ₹84 → What are you here for?", next:"category", color:C.green}],
},

/* ═══════════════════════════════════════════════
   ⚡ DAILY PATH — Fan Quiz starts here
   Only daily users see this. Weekly users never see it.
   ═══════════════════════════════════════════════ */
fan_quiz_type: {
  id:"fan_quiz_type", phase:"daily", title:"Quick — Who's Your Fav?", icon:"🤙", color:C.pink,
  desc:"Daily plan users only. One fun question. Your answer picks the plan theme AND the price. No relation to weekly plans. Pay happens AFTER you pick your goal.",
  screen:[
    "⚡  Just for Today",
    "──",
    "🤙  Quick question — who are you a fan of?",
    "──",
    "⚽  Cricket",
    "⚽  Football",
    "🎤  Singer",
    "🎬  Bollywood",
  ],
  paths:[
    {label:"⚽ Cricket → pick cricketer", next:"fan_cricket", color:"#22C55E"},
    {label:"⚽ Football → pick footballer", next:"fan_football", color:"#3B82F6"},
    {label:"🎤 Singer → pick singer", next:"fan_singer", color:C.pink},
    {label:"🎬 Bollywood → pick star", next:"fan_bollywood", color:"#F59E0B"},
  ],
},

fan_cricket: {
  id:"fan_cricket", phase:"daily", title:"Pick Your Cricketer", icon:"🏏", color:"#22C55E",
  desc:"Three legends. Each = a plan theme + price. Prices TBD (empty). After picking → What are you here for?",
  screen:[
    "🏏  MS Dhoni          →  'Captain Cool'    ₹ TBD",
    "🏏  Sachin Tendulkar  →  'God of Cricket'  ₹ TBD",
    "🏏  Virat Kohli       →  'King Kohli'      ₹ TBD",
    "── prices to be filled ──",
  ],
  paths:[{label:"✅ Picked → What are you here for?", next:"category", color:C.green}],
},

fan_football: {
  id:"fan_football", phase:"daily", title:"Pick Your Footballer", icon:"⚽", color:"#3B82F6",
  desc:"Three icons. Prices are set. After picking → What are you here for?",
  screen:[
    "⚽  Lionel Messi   →  'GOAT Mode'      ₹10",
    "⚽  CR7 Ronaldo    →  'CR7 Grind'      ₹7",
    "⚽  Neymar Jr      →  'Joga Bonito'    ₹9",
  ],
  paths:[{label:"✅ Picked → What are you here for?", next:"category", color:C.green}],
},

fan_singer: {
  id:"fan_singer", phase:"daily", title:"Pick Your Singer", icon:"🎤", color:C.pink,
  desc:"Pop icons. Some prices set, some TBD. After picking → What are you here for?",
  screen:[
    "🎤  Taylor Swift     →  'Shake It Off'   ₹13",
    "🎤  Ariana Grande   →  'Thank U Next'   ₹7",
    "🎤  Justin Bieber   →  'Baby Steps'     ₹ TBD",
    "🎤  Zayn            →  'Pillowtalk'     ₹ TBD",
    "🎤  The Weeknd      →  'Starboy'        ₹ TBD",
    "── some prices TBD ──",
  ],
  paths:[{label:"✅ Picked → What are you here for?", next:"category", color:C.green}],
},

fan_bollywood: {
  id:"fan_bollywood", phase:"daily", title:"Pick Your Star", icon:"🎬", color:"#F59E0B",
  desc:"Bollywood legends. Some set, some TBD. After picking → What are you here for?",
  screen:[
    "🎬  Shah Rukh Khan          →  'King Khan'     ₹7",
    "🎬  Salman Khan             →  'Dabangg'       ₹ TBD",
    "🎬  Sushant Singh Rajput   →  'Dil Bachcha'   ₹11",
    "🎬  Alia Bhatt              →  'Alia Glow'     ₹9",
    "🎬  Shraddha Kapoor         →  'Shraddha Fit'  ₹13",
    "── some prices TBD ──",
  ],
  paths:[{label:"✅ Picked → What are you here for?", next:"category", color:C.green}],
},

/* ═══ GOAL — shared by weekly AND daily ═══ */
category: {
  id:"category", phase:"goal", title:"What Are You Here For?", icon:"🏹", color:"#FB923C",
  desc:"Both weekly and daily users land here. This picks the health content: meals, workouts, skincare. Acne = photo flow fires after activation. No relation to which plan/celebrity was picked.",
  screen:[
    "💪  BUILD MUSCLE / ABS        →  workouts + protein meals",
    "🥗  LOSE WEIGHT / DIET       →  calorie-controlled meals",
    "🧴  CLEAR ACNE / SKIN         →  skincare routine + diet",
    "🩹  FIRST AID / QUICK HELP   →  immediate help",
    "💊  GENERAL HEALTH            →  immunity, sleep, wellness",
  ],
  paths:[
    {label:"💪 Fitness / Diet / Health / First Aid → meals", next:"meal_freq", color:C.green},
    {label:"🧴 Acne → meals (photo upload after activation)", next:"meal_freq", color:C.pink},
  ],
},

/* ═══ MEAL SETUP — shared ═══ */
meal_freq: {
  id:"meal_freq", phase:"meal", title:"How Many Meals Per Day?", icon:"🍽️", color:C.yellow,
  desc:"Controls daily WhatsApp reminder count. 3 = 3 messages. 4 = 4 messages.",
  screen:[
    "📱  3 meals  =  3 WhatsApp reminders / day",
    "📱  4 meals  =  4 WhatsApp reminders / day",
    "──",
    "3:  🍳 Breakfast  |  🍲 Lunch  |  🍛 Dinner",
    "4:  🍳 Breakfast  |  🥜 Snack  |  🍲 Lunch  |  🍛 Dinner",
  ],
  paths:[
    {label:"3 or 4 chosen → set times", next:"meal_times", color:C.green},
    {label:"⬅️ Back to goal", next:"category", color:C.textDim},
  ],
},

meal_times: {
  id:"meal_times", phase:"meal", title:"Set Meal Times", icon:"⏰", color:C.yellow,
  desc:"Tap each meal → 30-min time slots. Reminder 15 min before. Groups: all members get it individually.",
  screen:[
    "🍳  Breakfast  →  [tap]  6:00 – 9:00 AM",
    "🥜  Snack      →  [tap]  10:00 – 12:00 PM",
    "🍲  Lunch      →  [tap]  12:00 – 2:00 PM",
    "🍛  Dinner     →  [tap]  6:00 – 10:00 PM",
    "──",
    "📱  15 min early reminder",
    "📱  Solo: you | Couple: both | Friends: all",
  ],
  paths:[
    {label:"✅ Times set → review & pay", next:"summary_daily", color:C.green},
  ],
},

/* ═══ SUMMARY + PAY — DAILY users pay HERE ═══ */
summary_daily: {
  id:"summary_daily", phase:"pay", title:"Review & Pay", icon:"📋", color:C.green,
  desc:"DAILY users: this is where they pay. The price shown = exactly what the fan quiz set (₹7, ₹9, ₹10 etc). Weekly users already paid before this point — they skip this and go straight to activation.",
  screen:[
    "📋  Your plan for today:",
    "──",
    "⚽  Plan: CR7 Grind (Ronaldo)",
    "🏹  Goal: Build Muscle / Abs",
    "⏰  Reminders: 8:00 AM | 12:30 PM | 8:00 PM",
    "──",
    "💰  DAILY users: Pay ₹7 for today",
    "    (Weekly users: already paid — skip to activate)",
    "──",
    "[💳 Pay ₹7 & Activate →]   ← daily",
    "[✅ Activate →]              ← weekly (already paid)",
  ],
  paths:[
    {label:"💳 Daily: Pay ₹7 → activated!", next:"activation", color:C.green},
    {label:"✅ Weekly: Already paid → activated!", next:"activation", color:C.blue},
  ],
},

/* ═══ SUCCESS ═══ */
activation: {
  id:"activation", phase:"success", title:"🎉 ACTIVATED!", icon:"🎊", color:C.green,
  desc:"Confetti. Plan is live. Bot generates the plan (meals, water, workouts). WhatsApp messages built FROM that. Code shown. Daily = active today only. Weekly = active 7 days.",
  screen:[
    "🎉  Plan is LIVE!",
    "──",
    "📅  Weekly users: active till Feb 10  (7 days)",
    "📅  Daily users:  active till end of today",
    "──",
    "What happens now:",
    "1️⃣  Bot generates YOUR plan (meals + water + workout)",
    "2️⃣  WhatsApp reminders built FROM that plan",
    "3️⃣  Reply YES / NO → we track everything",
    "4️⃣  Come back → we know your progress",
    "──",
    "🔑  Your Code: 9  8  7  6",
  ],
  paths:[
    {label:"👁️ Preview WhatsApp messages", next:"wa_preview", color:C.wa},
    {label:"🧴 Acne users → photo upload", next:"acne_photo", color:C.pink},
    {label:"🏠 Done — exit", next:"welcome", color:C.textDim},
  ],
},

/* ═══ WHATSAPP FLOWS ═══ */
wa_preview: {
  id:"wa_preview", phase:"whatsapp", title:"WhatsApp Preview", icon:"💬", color:C.wa,
  desc:"Exact preview of what their phone gets. Every message is derived from the bot's generated plan. Water, meals, workout — each tracked via YES/NO.",
  screen:[
    "Tabs: [💧 Water] [🍽️ Meal] [💪 Workout]",
    "── 💧 Water (plan: 4 glasses/day) ──",
    "🤖 '💧 Morning! Had your 1st glass of water?'",
    "👤 'YES'",
    "🤖 '✅ Nice! 2nd glass reminder at 10AM 💧'",
    "── What if NO ──",
    "🤖 '💧 Had your 1st glass?'",
    "👤 'NO'",
    "🤖 '💧 Please have it now. Be honest for real results 💪'",
    "🤖 '💧 1st glass still pending ⏰'   ← repeats",
  ],
  paths:[
    {label:"🍽️ See Meal flow", next:"wa_meal_flow", color:C.wa},
    {label:"💪 See Workout flow", next:"wa_workout_flow", color:C.wa},
    {label:"⬅️ Back", next:"activation", color:C.textDim},
  ],
},

wa_meal_flow: {
  id:"wa_meal_flow", phase:"whatsapp", title:"WhatsApp — Meals", icon:"🍽️", color:C.wa,
  desc:"Bot generated specific foods. WhatsApp asks about THOSE exact foods. NO = reminded again in 30 min. Repeats until done or day ends.",
  screen:[
    "── Plan said: Lunch = rice + dal + sabzi ──",
    "🤖 '🍲 Lunch! Had your rice + dal + sabzi?'",
    "👤 'YES'",
    "🤖 '✅ Logged! Dinner at 8PM 🍛'",
    "── If NO ──",
    "🤖 '🍲 Had your rice + dal?'",
    "👤 'NO'",
    "🤖 '🍲 Haven't had lunch yet. Reminder in 30 min 🔔'",
    "🤖 '🍲 Rice bowl time! 🍛'   ← 30 min later",
    "── every meal, every day ──",
  ],
  paths:[
    {label:"💪 See Workout flow", next:"wa_workout_flow", color:C.wa},
    {label:"💧 See Water flow", next:"wa_preview", color:C.wa},
    {label:"⬅️ Back", next:"activation", color:C.textDim},
  ],
},

wa_workout_flow: {
  id:"wa_workout_flow", phase:"whatsapp", title:"WhatsApp — Workout", icon:"💪", color:C.wa,
  desc:"If goal = fitness. Not done = reminded AGAIN same day. Streak tracked. All stored for next kiosk visit.",
  screen:[
    "── Plan: 10 pushups + 10 squats ──",
    "🤖 '💪 10 pushups! Takes 5 min. Done / Not done?'",
    "👤 'Done'",
    "🤖 '🔥 Streak: 3 days! 💪'",
    "🤖 '💪 Now 10 squats. Done / Not done?'",
    "👤 'Done'",
    "🤖 '🏆 Both done! Crushed it!'",
    "── If Not Done ──",
    "🤖 '💪 10 pushups. Done / Not done?'",
    "👤 'Not done'",
    "🤖 '👍 Try again at 6PM — 10 pushups 🙌'",
    "🤖 '💪 6PM: pushups still pending 🏋️'   ← later",
  ],
  paths:[
    {label:"🍽️ See Meal flow", next:"wa_meal_flow", color:C.wa},
    {label:"💧 See Water flow", next:"wa_preview", color:C.wa},
    {label:"⬅️ Back", next:"activation", color:C.textDim},
  ],
},

wa_day_flow: {
  id:"wa_day_flow", phase:"whatsapp", title:"A Full Day — The Loop", icon:"📅", color:C.wa,
  desc:"The complete brain: bot generates plan → messages through the day → YES/NO tracked → stored → kiosk reads next visit → adjusts. This is how it all connects.",
  screen:[
    "── 1. BOT GENERATES PLAN ──",
    "  Meals (specific foods), Water (4 glasses), Workout (pushups)",
    "── 2. WHATSAPP FIRES ALL DAY ──",
    "  8AM   → '1st glass?' → YES/NO",
    "  8:30  → 'Breakfast: eggs + parathas?' → YES/NO",
    "  10AM  → '2nd glass?' → YES/NO",
    "  12:30 → 'Lunch: rice + dal?' → YES/NO",
    "  3PM   → '3rd glass?' → YES/NO",
    "  5PM   → '10 pushups?' → Done/Not done",
    "  6PM   → '4th glass?' → YES/NO",
    "  8PM   → 'Dinner: chicken + roti?' → YES/NO",
    "── 3. NO / NOT DONE → reminded again same day ──",
    "── 4. ALL STORED → kiosk reads on next visit ──",
  ],
  paths:[
    {label:"🔄 Next visit: what kiosk sees", next:"return_active", color:C.blue},
    {label:"🏠 Back to welcome", next:"welcome", color:C.accent},
  ],
},

/* ═══ ACNE SPECIAL ═══ */
acne_photo: {
  id:"acne_photo", phase:"special", title:"Acne: Send a Photo", icon:"🧴", color:C.pink,
  desc:"Acne goal only. Pick reference type on kiosk. Bot asks for 1 selfie on WhatsApp. AI analyzes → updates plan → DELETES photo. Skippable.",
  screen:[
    "🧴  Pick acne type (reference images):",
    "    Blackheads | Whiteheads | Papules | Pustules | Cystic | Not sure",
    "── Then on WhatsApp ──",
    "🤖 '🧴 Send 1 clear photo of your face'",
    "👤 [sends photo]",
    "🤖 '🔄 Analyzing… 30 sec…'",
    "🤖 '✅ Acne Vulgaris — Moderate (6/10)'",
    "🤖 '📋 Plan: cleanser → toner → moisturizer + diet'",
    "🤖 '🔒 Photo deleted. Privacy safe ✅'",
    "── Acne tracking via WhatsApp ──",
    "🤖 '🧴 Washed face with cleanser?'",
    "👤 'YES'",
    "🤖 '✅ Now toner. Done? Yes/No'",
  ],
  paths:[
    {label:"✅ Photo analyzed → plan updated", next:"activation", color:C.green},
    {label:"⏭️ Skip photo", next:"activation", color:C.textDim},
  ],
},

}; /* end W */

/* ═══════════════════════════════════════════════
   REACT UI
   ═══════════════════════════════════════════════ */
function Badge({ phase }) {
  const p = PHASES[phase] || PHASES.entry;
  return <span style={{ background:p.color+"20", color:p.color, borderRadius:6, padding:"3px 11px", fontSize:11, fontWeight:700, letterSpacing:0.7, textTransform:"uppercase" }}>{p.label}</span>;
}

export default function App() {
  const [cur, setCur] = useState("welcome");
  const [hist, setHist] = useState(["welcome"]);
  const node = W[cur];

  const go = id => { setCur(id); setHist(h=>[...h,id]); };
  const back = () => { if(hist.length>1) setHist(h=>{ const n=h.slice(0,-1); setCur(n[n.length-1]); return n; }); };
  if(!node) return null;

  const crumb = hist.slice(-5);

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text, fontFamily:"'Outfit',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#0F1117}::-webkit-scrollbar-thumb{background:#2E3240;border-radius:3px}button{transition:all .14s}`}</style>

      {/* TOP BAR */}
      <div style={{ background:C.card, borderBottom:`1px solid ${C.border}`, padding:"11px 18px", position:"sticky", top:0, zIndex:10 }}>
        <div style={{ maxWidth:740, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:18 }}>🏥</span>
            <span style={{ fontSize:15, fontWeight:800, color:C.accent }}>FitBot</span>
            <span style={{ fontSize:11, color:C.textDim, marginLeft:2 }}>Workflow</span>
          </div>
          <div style={{ display:"flex", gap:5 }}>
            <button onClick={()=>{setCur("welcome");setHist(["welcome"])}} style={{ background:C.accent+"20", border:"none", color:C.accent, borderRadius:6, padding:"4px 11px", fontSize:11, fontWeight:700, cursor:"pointer" }}>↺ Reset</button>
            {hist.length>1 && <button onClick={back} style={{ background:C.border, border:"none", color:C.textMid, borderRadius:6, padding:"4px 11px", fontSize:11, fontWeight:600, cursor:"pointer" }}>← Back</button>}
          </div>
        </div>
      </div>

      {/* BREADCRUMB */}
      <div style={{ maxWidth:740, margin:"0 auto", padding:"9px 18px 0" }}>
        <div style={{ display:"flex", alignItems:"center", gap:3, flexWrap:"wrap" }}>
          {crumb.map((id,i)=>{
            const n=W[id]; if(!n) return null;
            const last=i===crumb.length-1;
            return <span key={i} style={{ display:"flex", alignItems:"center", gap:3 }}>
              {i>0&&<span style={{ color:C.textDim, fontSize:13 }}>›</span>}
              <span style={{ fontSize:11, color:last?C.accent:C.textDim, fontWeight:last?700:500, cursor:last?"default":"pointer" }}
                onClick={()=>{ if(!last){ const idx=hist.length-crumb.length+i; setCur(hist[idx]); setHist(h=>h.slice(0,idx+1)); }}}
              >{n.icon} {n.title.slice(0,22)}</span>
            </span>;
          })}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth:740, margin:"14px auto 0", padding:"0 18px 56px" }}>
        <Badge phase={node.phase} />

        {/* CARD */}
        <div style={{ background:C.card, borderRadius:16, border:`1px solid ${C.border}`, overflow:"hidden", boxShadow:"0 6px 30px rgba(0,0,0,.28)", marginTop:10 }}>
          <div style={{ height:4, background:`linear-gradient(90deg,${node.color},${node.color}44)` }}/>
          <div style={{ padding:22 }}>

            {/* Title */}
            <div style={{ display:"flex", alignItems:"flex-start", gap:15, marginBottom:18 }}>
              <div style={{ width:52, height:52, borderRadius:15, background:node.color+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{node.icon}</div>
              <div>
                <h2 style={{ fontSize:19, fontWeight:800, color:C.text, lineHeight:1.25 }}>{node.title}</h2>
                <p style={{ fontSize:13, color:C.textMid, marginTop:5, lineHeight:1.55 }}>{node.desc}</p>
              </div>
            </div>

            {/* SCREEN MOCKUP */}
            <div style={{ background:"#141720", borderRadius:13, border:`1px solid ${C.border}`, marginBottom:18, overflow:"hidden" }}>
              <div style={{ background:node.phase==="whatsapp"?"#064e3b":node.color+"14", padding:"8px 15px", display:"flex", alignItems:"center", gap:6, borderBottom:`1px solid ${C.border}` }}>
                <div style={{ display:"flex", gap:4 }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:"#EF4444" }}/>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:"#FACC15" }}/>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:"#22C55E" }}/>
                </div>
                <span style={{ fontSize:11, color:node.phase==="whatsapp"?"#fff":C.textMid, fontWeight:600, marginLeft:6 }}>
                  {node.phase==="whatsapp" ? "WhatsApp — FitBot" : `Kiosk — ${node.title}`}
                </span>
              </div>
              <div style={{ padding:"15px 18px" }}>
                {node.screen.map((line,i)=>{
                  if(line==="──") return <div key={i} style={{ borderTop:`1px solid ${C.border}`, margin:"8px 0" }}/>;
                  if(line.startsWith("── ")&&line.endsWith(" ──")) return <div key={i} style={{ borderTop:`1px solid ${C.border}`, margin:"10px 0 5px", paddingTop:5 }}><span style={{ fontSize:11, color:C.textDim, fontWeight:600 }}>{line.replace(/─/g,"").trim()}</span></div>;
                  if(line.startsWith("🤖")) return <div key={i} style={{ background:"#1C2030", borderRadius:"12px 12px 12px 4px", padding:"7px 12px", marginBottom:5, maxWidth:"92%", border:`1px solid ${C.border}` }}><span style={{ fontSize:13, color:C.text, lineHeight:1.55 }}>{line.slice(3)}</span></div>;
                  if(line.startsWith("👤")) return <div key={i} style={{ background:"#22C55E1a", borderRadius:"12px 12px 4px 12px", padding:"7px 12px", marginBottom:5, marginLeft:"auto", maxWidth:"48%", border:`1px solid #22C55E33` }}><span style={{ fontSize:13, color:C.green, fontWeight:600 }}>{line.slice(3)}</span></div>;
                  return <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 0" }}>
                    <div style={{ width:5, height:5, borderRadius:"50%", background:node.color, flexShrink:0 }}/>
                    <span style={{ fontSize:13, color:C.textMid, lineHeight:1.5 }}>{line}</span>
                  </div>;
                })}
              </div>
            </div>

            {/* NOTE */}
            {node.note && <div style={{ background:node.note.color+"18", borderRadius:10, border:`1px solid ${node.note.color}33`, padding:"11px 15px", marginBottom:18 }}>
              <p style={{ fontSize:12, color:node.note.color, fontWeight:700, marginBottom:4 }}>{node.note.title}</p>
              {node.note.items.map((it,i)=><p key={i} style={{ fontSize:11.5, color:C.textMid, lineHeight:1.75 }}>• {it}</p>)}
            </div>}

            {/* PATHS */}
            <p style={{ fontSize:11, color:C.textDim, fontWeight:700, textTransform:"uppercase", letterSpacing:0.9, marginBottom:9 }}>What happens next →</p>
            <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
              {node.paths.map((p,i)=>(
                <button key={i} onClick={()=>go(p.next)} style={{
                  background:p.color+"0e", border:`1px solid ${p.color}28`, borderRadius:12,
                  padding:"13px 17px", cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                }}
                onMouseEnter={e=>{e.currentTarget.style.background=p.color+"1f";e.currentTarget.style.borderColor=p.color+"4a"}}
                onMouseLeave={e=>{e.currentTarget.style.background=p.color+"0e";e.currentTarget.style.borderColor=p.color+"28"}}
                >
                  <span style={{ fontSize:14, fontWeight:600, color:C.text, textAlign:"left" }}>{p.label}</span>
                  <span style={{ fontSize:11, color:p.color, fontWeight:700, display:"flex", alignItems:"center", gap:5, flexShrink:0 }}>
                    {(W[p.next]?.title||"").slice(0,24)}
                    <svg width="15" height="15" viewBox="0 0 15 15"><path d="M3 7.5h7M8.5 5l2.5 2.5-2.5 2.5" stroke={p.color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* QUICK JUMP */}
        <div style={{ marginTop:20, background:C.card, borderRadius:12, border:`1px solid ${C.border}`, padding:"14px 18px" }}>
          <p style={{ fontSize:11, color:C.textDim, fontWeight:700, textTransform:"uppercase", letterSpacing:0.9, marginBottom:10 }}>Quick Jump</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
            {Object.entries(W).map(([k,n])=>{
              const active=cur===k;
              const pc=PHASES[n.phase]?.color||C.accent;
              return <button key={k} onClick={()=>go(k)} style={{
                background:active?pc+"22":"transparent",
                border:`1px solid ${active?pc+"50":C.border}`,
                borderRadius:7, padding:"4px 9px", cursor:"pointer",
                color:active?pc:C.textMid, fontSize:11.5, fontWeight:active?700:500,
              }}>{n.icon} {n.title.slice(0,24)}</button>;
            })}
          </div>
        </div>

        {/* LEGEND */}
        <div style={{ marginTop:10, background:C.card, borderRadius:12, border:`1px solid ${C.border}`, padding:"11px 18px" }}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"7px 20px" }}>
            {Object.entries(PHASES).map(([k,v])=>(
              <div key={k} style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ width:9, height:9, borderRadius:3, background:v.color }}/>
                <span style={{ fontSize:11.5, color:C.textMid }}>{v.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}