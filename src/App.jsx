import ProductShowcaseBoard from './pages/ProductShowcaseBoard.jsx';
import CreateShoutoutScreen from './pages/CreateShoutoutScreen.jsx';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// ═══ ENTRY & AUTH ═══
import WelcomeScreen from './pages/WelcomeScreen.jsx';
import PhoneEntryScreen from './pages/PhoneEntryScreen.jsx';
import OTPScreen from './pages/OTPScreen.jsx';
import OTPFailScreen from './pages/OTPFailScreen.jsx';
import CodeGeneratedScreen from './pages/CodeGeneratedScreen.jsx';
import ReturningPayScreen from './pages/ReturningPayScreen.jsx';
import CodeEntryScreen from './pages/CodeEntryScreen.jsx';
import CodeFailScreen from './pages/CodeFailScreen.jsx';

// ═══ PLAN SELECTION ═══
import GroupTypeScreen from './pages/GroupTypeScreen.jsx';
import WeeklySoloPayScreen from './pages/WeeklySoloPayScreen.jsx';
import SoloQuestionsScreen from './pages/SoloQuestionsScreen.jsx';
import CouplePhoneScreen from './pages/CouplePhoneScreen.jsx';
import CoupleQuestionsScreen from './pages/CoupleQuestionsScreen.jsx';
import WeeklyCouplePayScreen from './pages/WeeklyCouplePayScreen.jsx';
import FriendSizeScreen from './pages/FriendSizeScreen.jsx';
import FriendAddScreen from './pages/FriendAddScreen.jsx';
import FriendQuestionsScreen from './pages/FriendQuestionsScreen.jsx';
import WeeklyFriendsPayScreen from './pages/WeeklyFriendsPayScreen.jsx';

// ═══ DAILY / FAN QUIZ ═══
import FanQuizTypeScreen from './pages/FanQuizTypeScreen.jsx';
import FanCricketScreen from './pages/FanCricketScreen.jsx';
import FanQuizScreen from './pages/FanQuizScreen.jsx';
import FanQuizResultScreen from './pages/FanQuizResultScreen.jsx';
import FanQuizModeScreen from './pages/FanQuizModeScreen.jsx';
import FanQuizDetailsScreen from './pages/FanQuizDetailsScreen.jsx';
import DailyPayScreen from './pages/DailyPayScreen.jsx';
import DailyFriendsPayScreen from './pages/DailyFriendsPayScreen.jsx';
import DailyPartnerPayScreen from './pages/DailyPartnerPayScreen.jsx';
import DailyWhatsAppPreviewScreen from './pages/DailyWhatsAppPreviewScreen.jsx';

// ═══ GOAL & MEAL SETUP ═══
import GoalScreen from './pages/GoalScreen.jsx';
import HeroRoutineScreen from './pages/HeroRoutineScreen.jsx';
import CategoryScreen from './pages/CategoryScreen.jsx';
import MealFreqScreen from './pages/MealFreqScreen.jsx';
import MealTimeScreen from './pages/MealTimeScreen.jsx';
import MealTimesScreen from './pages/MealTimesScreen.jsx';
import SummaryScreen from './pages/SummaryScreen.jsx';
import ActivationScreen from './pages/ActivationScreen.jsx';

// ═══ ACNE FLOW ═══
import AcnePhotoQRScreen from './pages/AcnePhotoQRScreen.jsx';
import AcneTimeoutScreen from './pages/AcneTimeoutScreen.jsx';
import AcneManualSelectScreen from './pages/AcneManualSelectScreen.jsx';
import AcnePhotoUploadedScreen from './pages/AcnePhotoUploadedScreen.jsx';
import AcneTreatmentScreen from './pages/AcneTreatmentScreen.jsx';

// ═══ BOT FLOW ═══
import BotOfferScreen from './pages/BotOfferScreen.jsx';
import BotPurchaseScreen from './pages/BotPurchaseScreen.jsx';
import BotPairingScreen from './pages/BotPairingScreen.jsx';
import BotCustomizeScreen from './pages/BotCustomizeScreen.jsx';
import BotStatusScreen from './pages/BotStatusScreen.jsx';

// ═══ WHATSAPP FLOWS ═══
import WAPreviewScreen from './pages/WAPreviewScreen.jsx';
import WAMealFlowScreen from './pages/WAMealFlowScreen.jsx';
import WAWorkoutFlowScreen from './pages/WAWorkoutFlowScreen.jsx';
import WADayFlowScreen from './pages/WADayFlowScreen.jsx';
import WhatsAppPreviewScreen from './pages/WhatsAppPreviewScreen.jsx';

// ═══ RETURN USER FLOWS ═══
import ReturnActiveScreen from './pages/ReturnActiveScreen.jsx';
import ReturnTodayScreen from './pages/ReturnTodayScreen.jsx';
import ReturnExpiredScreen from './pages/ReturnExpiredScreen.jsx';
import ReturnDailyAgainScreen from './pages/ReturnDailyAgainScreen.jsx';

// ═══ COMPLIANCE-BASED SCREENS ═══
import TodaysPlanScreen from './pages/TodaysPlanScreen.jsx';
import FormCheckScreen from './pages/FormCheckScreen.jsx';
import MakeEasierScreen from './pages/MakeEasierScreen.jsx';
import WhyTrackingScreen from './pages/WhyTrackingScreen.jsx';

// ═══ PLAN MANAGEMENT ═══
import RenewPlanScreen from './pages/RenewPlanScreen.jsx';
import ChangePlanScreen from './pages/ChangePlanScreen.jsx';
import UpdateSettingsScreen from './pages/UpdateSettingsScreen.jsx';

// ═══ ERROR SCREENS ═══
import KioskOfflineScreen from './pages/KioskOfflineScreen.jsx';
import PlanConflictScreen from './pages/PlanConflictScreen.jsx';
import PaymentFailedScreen from './pages/PaymentFailedScreen.jsx';
import TrialUsedScreen from './pages/TrialUsedScreen.jsx';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* ═══ ENTRY ═══ */}
				<Route path="/" element={<WelcomeScreen />} />
				
				{/* ═══ AUTH — New Users ═══ */}
				<Route path="/phone" element={<PhoneEntryScreen />} />
				<Route path="/otp" element={<OTPScreen />} />
				<Route path="/otp-fail" element={<OTPFailScreen />} />
				<Route path="/code-generated" element={<CodeGeneratedScreen />} />
				<Route path="/returning-pay" element={<ReturningPayScreen />} />
				
				{/* ═══ AUTH — Returning Users ═══ */}
				<Route path="/code" element={<CodeEntryScreen />} />
				<Route path="/code-fail" element={<CodeFailScreen />} />
				
				{/* ═══ GROUP TYPE SELECTION ═══ */}
				<Route path="/group-type" element={<GroupTypeScreen />} />
				
				{/* ═══ WEEKLY — Solo ═══ */}
				<Route path="/weekly-solo-pay" element={<WeeklySoloPayScreen />} />
				<Route path="/solo-questions" element={<SoloQuestionsScreen />} />
				
				{/* ═══ WEEKLY — Couple ═══ */}
				<Route path="/couple-phone" element={<CouplePhoneScreen />} />
				<Route path="/couple-questions" element={<CoupleQuestionsScreen />} />
				<Route path="/weekly-couple-pay" element={<WeeklyCouplePayScreen />} />
				
				{/* ═══ WEEKLY — Friends ═══ */}
				<Route path="/friend-size" element={<FriendSizeScreen />} />
				<Route path="/friend-add" element={<FriendAddScreen />} />
				<Route path="/friend-questions" element={<FriendQuestionsScreen />} />
				<Route path="/weekly-friends-pay" element={<WeeklyFriendsPayScreen />} />
				
				{/* ═══ DAILY — Fan Quiz ═══ */}
				<Route path="/fan-quiz-type" element={<FanQuizTypeScreen />} />
				<Route path="/fan-cricket" element={<FanCricketScreen />} />
				<Route path="/fan-football" element={<FanCricketScreen />} />
				<Route path="/fan-singer" element={<FanCricketScreen />} />
				<Route path="/fan-bollywood" element={<FanCricketScreen />} />
				<Route path="/fan-quiz" element={<FanQuizScreen />} />
				<Route path="/fan-quiz-result" element={<FanQuizResultScreen />} />
				<Route path="/fan-quiz-mode" element={<FanQuizModeScreen />} />
				<Route path="/fan-quiz-details" element={<FanQuizDetailsScreen />} />
				<Route path="/daily-pay" element={<DailyPayScreen />} />
				<Route path="/daily-friends-pay" element={<DailyFriendsPayScreen />} />
				<Route path="/daily-partner-pay" element={<DailyPartnerPayScreen />} />
				<Route path="/daily-whatsapp-preview" element={<DailyWhatsAppPreviewScreen />} />
				
				{/* ═══ GOAL & MEAL SETUP ═══ */}
				<Route path="/goal" element={<GoalScreen />} />
				<Route path="/category" element={<CategoryScreen />} />
				<Route path="/hero-routine" element={<HeroRoutineScreen />} />
				<Route path="/meal-freq" element={<MealFreqScreen />} />
				<Route path="/meal-time" element={<MealTimeScreen />} />
				<Route path="/meal-times" element={<MealTimesScreen />} />
				<Route path="/summary" element={<SummaryScreen />} />
				
				{/* ═══ ACNE / SKIN FLOW ═══ */}
				<Route path="/acne-photo-qr" element={<AcnePhotoQRScreen />} />
				<Route path="/acne-timeout" element={<AcneTimeoutScreen />} />
				<Route path="/acne-manual" element={<AcneManualSelectScreen />} />
				<Route path="/acne-uploaded" element={<AcnePhotoUploadedScreen />} />
				<Route path="/acne-treatment" element={<AcneTreatmentScreen />} />
				
				{/* ═══ ACTIVATION & SUCCESS ═══ */}
				<Route path="/activation" element={<ActivationScreen />} />
				
				   {/* ═══ BOT FLOW ═══ */}
				   <Route path="/bot-offer" element={<BotOfferScreen />} />
				   <Route path="/bot-purchase" element={<BotPurchaseScreen />} />
				   <Route path="/bot-pairing" element={<BotPairingScreen />} />
				   <Route path="/bot-customize" element={<BotCustomizeScreen />} />
				   <Route path="/bot-status" element={<BotStatusScreen />} />

				   {/* ═══ PUBLIC BOARD ═══ */}
				   <Route path="/ProductShowcaseBoard" element={<ProductShowcaseBoard />} />
				<Route path="/create-shoutout" element={<CreateShoutoutScreen />} />
				<Route path="/wa-preview" element={<WAPreviewScreen />} />
				<Route path="/whatsapp-preview" element={<WhatsAppPreviewScreen />} />
				<Route path="/wa-meal-flow" element={<WAMealFlowScreen />} />
				<Route path="/wa-workout-flow" element={<WAWorkoutFlowScreen />} />
				<Route path="/wa-day-flow" element={<WADayFlowScreen />} />
				
				{/* ═══ RETURN USER FLOWS ═══ */}
				<Route path="/return-active" element={<ReturnActiveScreen />} />
				<Route path="/return-today" element={<ReturnTodayScreen />} />
				<Route path="/return-expired" element={<ReturnExpiredScreen />} />
				<Route path="/return-daily-again" element={<ReturnDailyAgainScreen />} />
				
				{/* ═══ COMPLIANCE-BASED SCREENS ═══ */}
				<Route path="/todays-plan" element={<TodaysPlanScreen />} />
				<Route path="/form-check" element={<FormCheckScreen />} />
				<Route path="/make-easier" element={<MakeEasierScreen />} />
				<Route path="/why-tracking" element={<WhyTrackingScreen />} />
				
				{/* ═══ PLAN MANAGEMENT ═══ */}
				<Route path="/renew-plan" element={<RenewPlanScreen />} />
				<Route path="/change-plan" element={<ChangePlanScreen />} />
				<Route path="/update-settings" element={<UpdateSettingsScreen />} />
				
				{/* ═══ ERROR SCREENS ═══ */}
				<Route path="/offline" element={<KioskOfflineScreen />} />
				<Route path="/plan-conflict" element={<PlanConflictScreen />} />
				<Route path="/payment-failed" element={<PaymentFailedScreen />} />
				<Route path="/trial-used" element={<TrialUsedScreen />} />
				
				{/* ═══ FALLBACK ═══ */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}
