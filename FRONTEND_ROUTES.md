#    Frontend Routes Documentation

This document provides a comprehensive list of all frontend routes defined in the application, mapping each path to its corresponding React component. These routes are configured in `src/App.jsx`.

## Entry & Fallback

| Path  | Component           | Description                        |
| ----- | ------------------- | ---------------------------------- |
| `/` | `WelcomeScreen`   | Initial landing/welcome screen     |
| `*` | `Navigate to="/"` | Fallback route for undefined paths |

## Authentication Flow

### New Users

| Path                | Component               | Description                           |
| ------------------- | ----------------------- | ------------------------------------- |
| `/phone`          | `PhoneEntryScreen`    | Enter phone number for signup/login   |
| `/otp`            | `OTPScreen`           | Enter OTP for verification            |
| `/otp-fail`       | `OTPFailScreen`       | OTP verification failure              |
| `/code-generated` | `CodeGeneratedScreen` | Success screen when code is generated |
| `/returning-pay`  | `ReturningPayScreen`  | Payment screen for returning users    |

### Returning Users

| Path           | Component           | Description                      |
| -------------- | ------------------- | -------------------------------- |
| `/code`      | `CodeEntryScreen` | Enter existing access code       |
| `/code-fail` | `CodeFailScreen`  | Access code verification failure |

## Group Type & Plan Selection

| Path            | Component           | Description                             |
| --------------- | ------------------- | --------------------------------------- |
| `/group-type` | `GroupTypeScreen` | Select between solo, couple, or friends |

### Weekly — Solo

| Path                 | Component               | Description                         |
| -------------------- | ----------------------- | ----------------------------------- |
| `/weekly-solo-pay` | `WeeklySoloPayScreen` | Payment screen for weekly solo plan |
| `/solo-questions`  | `SoloQuestionsScreen` | Setup questions for solo users      |

### Weekly — Couple

| Path                   | Component                 | Description                           |
| ---------------------- | ------------------------- | ------------------------------------- |
| `/couple-phone`      | `CouplePhoneScreen`     | Enter partner's phone number          |
| `/couple-questions`  | `CoupleQuestionsScreen` | Setup questions for couples           |
| `/weekly-couple-pay` | `WeeklyCouplePayScreen` | Payment screen for weekly couple plan |

### Weekly — Friends

| Path                    | Component                  | Description                            |
| ----------------------- | -------------------------- | -------------------------------------- |
| `/friend-size`        | `FriendSizeScreen`       | Select group size                      |
| `/friend-add`         | `FriendAddScreen`        | Add friends to group                   |
| `/friend-questions`   | `FriendQuestionsScreen`  | Setup questions for friend groups      |
| `/weekly-friends-pay` | `WeeklyFriendsPayScreen` | Payment screen for weekly friends plan |

## Daily — Fan Quiz

| Path                        | Component                      | Description                                 |
| --------------------------- | ------------------------------ | ------------------------------------------- |
| `/fan-quiz-type`          | `FanQuizTypeScreen`          | Select quiz category                        |
| `/fan-cricket`            | `FanCricketScreen`           | Cricket quiz entry                          |
| `/fan-football`           | `FanCricketScreen`           | Football quiz entry                         |
| `/fan-singer`             | `FanCricketScreen`           | Singer/Music quiz entry                     |
| `/fan-bollywood`          | `FanCricketScreen`           | Bollywood quiz entry                        |
| `/fan-quiz`               | `FanQuizScreen`              | Active quiz interface                       |
| `/fan-quiz-result`        | `FanQuizResultScreen`        | Quiz results and score                      |
| `/fan-quiz-mode`          | `FanQuizModeScreen`          | Select quiz difficulty or mode              |
| `/fan-quiz-details`       | `FanQuizDetailsScreen`       | Additional quiz information                 |
| `/daily-pay`              | `DailyPayScreen`             | Daily plan payment                          |
| `/daily-friends-pay`      | `DailyFriendsPayScreen`      | Daily friends plan payment                  |
| `/daily-partner-pay`      | `DailyPartnerPayScreen`      | Daily partner plan payment                  |
| `/daily-whatsapp-preview` | `DailyWhatsAppPreviewScreen` | Preview WhatsApp integration for daily plan |

## Goal & Meal Setup

| Path              | Component             | Description                  |
| ----------------- | --------------------- | ---------------------------- |
| `/goal`         | `GoalScreen`        | Set health/fitness goals     |
| `/category`     | `CategoryScreen`    | Select meal/workout category |
| `/hero-routine` | `HeroRoutineScreen` | Setup main routine           |
| `/meal-freq`    | `MealFreqScreen`    | Select meal frequency        |
| `/meal-time`    | `MealTimeScreen`    | Set single meal time         |
| `/meal-times`   | `MealTimesScreen`   | Set multiple meal times      |
| `/summary`      | `SummaryScreen`     | Plan summary overview        |

## Acne / Skin Flow

| Path                | Component                   | Description                 |
| ------------------- | --------------------------- | --------------------------- |
| `/acne-photo-qr`  | `AcnePhotoQRScreen`       | Scan QR to upload photo     |
| `/acne-timeout`   | `AcneTimeoutScreen`       | Timeout during photo upload |
| `/acne-manual`    | `AcneManualSelectScreen`  | Manual condition selection  |
| `/acne-uploaded`  | `AcnePhotoUploadedScreen` | Photo upload success        |
| `/acne-treatment` | `AcneTreatmentScreen`     | Recommended treatment plan  |

## Activation

| Path            | Component            | Description                     |
| --------------- | -------------------- | ------------------------------- |
| `/activation` | `ActivationScreen` | Account/Plan activation success |

## Bot Flow

| Path               | Component              | Description                 |
| ------------------ | ---------------------- | --------------------------- |
| `/bot-offer`     | `BotOfferScreen`     | Promotional offer for bot   |
| `/bot-purchase`  | `BotPurchaseScreen`  | Bot purchase checkout       |
| `/bot-pairing`   | `BotPairingScreen`   | Pair bot with account       |
| `/bot-customize` | `BotCustomizeScreen` | Customize bot settings      |
| `/bot-status`    | `BotStatusScreen`    | Check bot connection status |

## Public Board & WhatsApp Flows

| Path                      | Component                 | Description                    |
| ------------------------- | ------------------------- | ------------------------------ |
| `/ProductShowcaseBoard` | `ProductShowcaseBoard`  | Showcase public products       |
| `/create-shoutout`      | `CreateShoutoutScreen`  | Create public shoutout         |
| `/wa-preview`           | `WAPreviewScreen`       | WhatsApp layout preview        |
| `/whatsapp-preview`     | `WhatsAppPreviewScreen` | Detailed WhatsApp preview      |
| `/wa-meal-flow`         | `WAMealFlowScreen`      | WhatsApp meal tracking flow    |
| `/wa-workout-flow`      | `WAWorkoutFlowScreen`   | WhatsApp workout tracking flow |
| `/wa-day-flow`          | `WADayFlowScreen`       | WhatsApp daily summary flow    |

## Return User Flows

| Path                    | Component                  | Description                            |
| ----------------------- | -------------------------- | -------------------------------------- |
| `/return-active`      | `ReturnActiveScreen`     | Returning user with active plan        |
| `/return-today`       | `ReturnTodayScreen`      | Returning user viewing today's status  |
| `/return-expired`     | `ReturnExpiredScreen`    | Returning user with expired plan       |
| `/return-daily-again` | `ReturnDailyAgainScreen` | Returning user starting new daily plan |

## Compliance & Education

| Path              | Component             | Description                           |
| ----------------- | --------------------- | ------------------------------------- |
| `/todays-plan`  | `TodaysPlanScreen`  | Overview of today's schedule          |
| `/form-check`   | `FormCheckScreen`   | Verification for workouts/meals       |
| `/make-easier`  | `MakeEasierScreen`  | Suggestions to simplify plan          |
| `/why-tracking` | `WhyTrackingScreen` | Educational info on tracking benefits |

## Plan Management

| Path                 | Component                | Description                    |
| -------------------- | ------------------------ | ------------------------------ |
| `/renew-plan`      | `RenewPlanScreen`      | Renew existing or expired plan |
| `/change-plan`     | `ChangePlanScreen`     | Switch to a different plan     |
| `/update-settings` | `UpdateSettingsScreen` | Manage account settings        |

## Errors & Edge Cases

| Path                | Component               | Description                             |
| ------------------- | ----------------------- | --------------------------------------- |
| `/offline`        | `KioskOfflineScreen`  | Displayed when kiosk loses connection   |
| `/plan-conflict`  | `PlanConflictScreen`  | Displayed when plans overlap/conflict   |
| `/payment-failed` | `PaymentFailedScreen` | Payment processing error                |
| `/trial-used`     | `TrialUsedScreen`     | Displayed if free trial is already used |
