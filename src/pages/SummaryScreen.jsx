import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SparkleBackground from '../components/SparkleBackground';

const CSS = `
.summary-container {
  min-height: 100vh;
  position: relative;
  transition: background 0.4s ease, color 0.4s ease;
}

/* Dark Mode Variable overrides */
.summary-container.dark-mode {
  --bg-main: #11140F;
  --bg-card: rgba(27, 31, 23, 0.45);
  --bg-card-hover: rgba(35, 41, 30, 0.65);
  --text-main: #F7F4EC;
  --text-muted: #A0A596;
  --text-muted-faint: #4E5446;
  --border-card: rgba(255, 92, 53, 0.15);
  --border-card-hover: rgba(255, 92, 53, 0.45);
  --orange: #FF5C35;
  --orange-light: #FF8566;
  --orange-pale: rgba(255, 92, 53, 0.15);
  --shadow-card: 0 12px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03);
  --shadow-hover: 0 24px 64px rgba(255, 92, 53, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  --item-bg: rgba(255, 255, 255, 0.03);
  --item-border: rgba(255, 255, 255, 0.06);
}

/* Light Mode Variable overrides */
.summary-container.light-mode {
  --bg-main: #F9F6F0;
  --bg-card: rgba(255, 255, 255, 0.65);
  --bg-card-hover: rgba(255, 255, 255, 0.85);
  --text-main: #11140F;
  --text-muted: #75786C;
  --text-muted-faint: #B8BBAE;
  --border-card: rgba(255, 92, 53, 0.12);
  --border-card-hover: rgba(255, 92, 53, 0.35);
  --orange: #FF5C35;
  --orange-light: #FF8566;
  --orange-pale: rgba(255, 92, 53, 0.08);
  --shadow-card: 0 12px 40px rgba(255, 92, 53, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  --shadow-hover: 0 24px 64px rgba(255, 92, 53, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  --item-bg: rgba(0, 0, 0, 0.02);
  --item-border: rgba(0, 0, 0, 0.04);
}

.summary-wrap {
  max-width: 540px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.summary-card {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 28px;
  border: 1px solid var(--border-card);
  padding: 40px 32px;
  box-shadow: var(--shadow-card);
  margin-bottom: 28px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}
.summary-card:hover {
  border-color: var(--border-card-hover);
  box-shadow: var(--shadow-hover);
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--item-border);
  transition: all 0.4s ease;
}

.summary-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #FFF;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.summary-plan-title {
  font-family: 'Fraunces', serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 4px;
}

.summary-plan-sub {
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 500;
}

.summary-plan-price-box {
  text-align: right;
  flex-shrink: 0;
}

.summary-plan-price {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  font-weight: 800;
}

.summary-plan-price-period {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.summary-details-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 28px;
}

.summary-details-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: var(--item-bg);
  border: 1.5px solid var(--item-border);
  border-radius: 16px;
  transition: all 0.25s ease;
}
.summary-details-item:hover {
  transform: translateY(-2px);
  border-color: var(--border-card);
  background: var(--bg-card-hover);
}

.summary-details-label {
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 600;
}

.summary-details-value {
  font-size: 15px;
  color: var(--text-main);
  font-weight: 700;
}

/* What's Included Banner */
.included-banner {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.03) 100%);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 18px;
  padding: 22px 26px;
  margin-bottom: 28px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}
.summary-container.light-mode .included-banner {
  background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
  border: 1px solid #A7F3D0;
}

.included-title {
  font-size: 14.5px;
  font-weight: 700;
  color: #10B981;
  margin-bottom: 14px;
}
.summary-container.light-mode .included-title {
  color: #059669;
}

.included-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.included-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.included-check {
  color: #10B981;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
}
.summary-container.light-mode .included-check {
  color: #059669;
}

.included-text {
  font-size: 13.5px;
  color: var(--text-main);
  font-weight: 600;
  opacity: 0.9;
}
.summary-container.dark-mode .included-text {
  color: #D1FAE5;
}

/* Activate Button */
.activate-btn {
  width: 100%;
  border: none;
  border-radius: 16px;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #FFF;
  cursor: pointer;
  background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.35);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
}
.activate-btn::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
  pointer-events: none;
}
.activate-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 45px rgba(34, 197, 94, 0.5);
}
.activate-btn:active {
  transform: scale(0.98);
}
.activate-btn:disabled {
  cursor: not-allowed;
  opacity: 0.85;
}

.loader-ring {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: #FFF;
  border-radius: 50%;
  animation: spin-loader 0.8s linear infinite;
  flex-shrink: 0;
}
@keyframes spin-loader {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Trust list */
.trust-badges {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 8px;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  color: var(--text-muted);
  font-weight: 600;
}

@media(max-width:600px){
  .summary-card{padding: 32px 20px;}
  .included-grid{grid-template-columns: 1fr;}
  .trust-badges{gap: 14px;}
}

@media (max-width: 480px) {
  .summary-card {
    padding: 20px 16px;
    border-radius: 20px;
  }
  .summary-header {
    gap: 12px;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
  .summary-icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    font-size: 22px;
  }
  .summary-plan-title {
    font-size: 18px;
  }
  .summary-plan-sub {
    font-size: 12px;
  }
  .summary-plan-price {
    font-size: 22px;
  }
  .summary-plan-price-period {
    font-size: 11px;
  }
  .summary-details-list {
    gap: 8px;
    margin-bottom: 20px;
  }
  .summary-details-item {
    padding: 10px 14px;
    border-radius: 12px;
  }
  .summary-details-label {
    font-size: 12.5px;
  }
  .summary-details-value {
    font-size: 13px;
  }
  .included-banner {
    padding: 14px 16px;
    border-radius: 14px;
    margin-bottom: 20px;
  }
  .included-title {
    font-size: 13.5px;
    margin-bottom: 10px;
  }
  .included-text {
    font-size: 12px;
  }
  .included-check {
    font-size: 12px;
  }
  .included-grid {
    gap: 8px;
  }
  .activate-btn {
    padding: 14px;
    font-size: 15px;
    border-radius: 12px;
  }
  .trust-badges {
    gap: 10px 16px;
    margin-top: 4px;
  }
  .trust-item {
    font-size: 11px;
    gap: 4px;
  }
}
`;

export default function SummaryScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showItems, setShowItems] = useState(false);

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const saved = localStorage.getItem("theme");
      setIsDark(saved ? saved === "dark" : true);
    };
    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const planType = localStorage.getItem('planType') || 'solo';
  const category = localStorage.getItem('category') || 'weight-loss';
  const mealTimes = JSON.parse(localStorage.getItem('mealTimes') || '{"breakfast":"08:00","lunch":"13:00","dinner":"20:00"}');

  const planInfo = {
    solo: { name: 'Solo Plan', price: '₹29', icon: '👤', color: '#F06922' },
    couple: { name: 'Couple Plan', price: '₹54', icon: '💑', color: '#EC4899' },
    friends: { name: 'Friends Plan', price: '₹84', icon: '👥', color: '#8B5CF6' },
    daily: { name: 'Daily Plan', price: '₹15', icon: '⚡', color: '#F59E0B' },
  };

  const categoryNames = {
    'muscle': '💪 Build Muscle / Abs',
    'weight-loss': '🥗 Lose Weight / Diet',
    'acne': '🧴 Clear Acne / Skin',
    'first-aid': '🩹 First Aid / Quick Help',
    'general': '💊 General Health',
  };

  const plan = planInfo[planType] || planInfo.solo;

  useEffect(() => {
    setTimeout(() => setShowItems(true), 100);
  }, []);

  const handleActivate = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/activation');
    }, 1500);
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  return (
    <div className={`summary-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <style>{CSS}</style>
      <SparkleBackground isDark={isDark} />
      <Layout
        title="Plan Summary"
        subtitle="Review your personalized health plan"
        showBack
        onBack={() => navigate(-1)}
      >
        <div className="summary-wrap">
          {/* Main Card */}
          <div className="summary-card">
            {/* Plan Header */}
            <div className="summary-header" style={{
              opacity: showItems ? 1 : 0,
              transform: showItems ? 'translateY(0)' : 'translateY(10px)',
            }}>
              <div className="summary-icon-wrapper" style={{
                background: isDark ? `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}80 100%)` : `linear-gradient(135deg, ${plan.color}15 0%, ${plan.color}25 100%)`,
              }}>
                {plan.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h2 className="summary-plan-title">
                  {plan.name}
                </h2>
                <p className="summary-plan-sub">7 days • Starting today</p>
              </div>
              <div className="summary-plan-price-box">
                <p className="summary-plan-price" style={{ color: plan.color }}>{plan.price}</p>
                <p className="summary-plan-price-period">per week</p>
              </div>
            </div>

            {/* Details List */}
            <div className="summary-details-list">
              {[
                { label: 'Focus Area', value: categoryNames[category] || category, delay: 0.1 },
                { label: 'Breakfast Reminder', value: formatTime(mealTimes.breakfast), delay: 0.15 },
                { label: 'Lunch Reminder', value: formatTime(mealTimes.lunch), delay: 0.2 },
                { label: 'Dinner Reminder', value: formatTime(mealTimes.dinner), delay: 0.25 },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="summary-details-item"
                  style={{
                    opacity: showItems ? 1 : 0,
                    transform: showItems ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${item.delay}s`,
                  }}
                >
                  <span className="summary-details-label">{item.label}</span>
                  <span className="summary-details-value">{item.value}</span>
                </div>
              ))}
            </div>

            {/* What's Included */}
            <div className="included-banner" style={{
              opacity: showItems ? 1 : 0,
              transform: showItems ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.4s ease 0.3s',
            }}>
              <h3 className="included-title">
                ✓ What's Included
              </h3>
              <div className="included-grid">
                {['Daily meal plans', 'WhatsApp reminders', 'Progress tracking', 'AI coaching'].map((item, i) => (
                  <div key={i} className="included-item">
                    <span className="included-check">✓</span>
                    <span className="included-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activate Button */}
            <button
              onClick={handleActivate}
              disabled={loading}
              className="activate-btn"
              type="button"
            >
              {loading ? (
                <>
                  <span className="loader-ring" />
                  Activating Your Plan...
                </>
              ) : (
                <>
                  ✨ Activate My Plan
                </>
              )}
            </button>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges" style={{
            opacity: showItems ? 1 : 0,
            transform: showItems ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.4s ease 0.4s',
          }}>
            {[
              { icon: '🔒', text: 'Secure' },
              { icon: '📱', text: 'WhatsApp' },
              { icon: '❤️', text: '50K+ Users' },
            ].map((badge, i) => (
              <div key={i} className="trust-item">
                <span>{badge.icon}</span>
                {badge.text}
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}
