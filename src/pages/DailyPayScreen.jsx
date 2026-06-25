import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SparkleBackground from '../components/SparkleBackground';

const CSS = `
.dailypay-container {
  min-height: 80vh;
  background: transparent;
  font-family: 'Inter', 'Outfit', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  position: relative;
  transition: background 0.4s ease, color 0.4s ease;
}

/* Dark Mode Variable overrides */
.dailypay-container.dark-mode {
  --bg-card: rgba(27, 31, 23, 0.45);
  --bg-card-hover: rgba(35, 41, 30, 0.65);
  --text-main: #F7F4EC;
  --text-muted: #A0A596;
  --border-card: rgba(255, 255, 255, 0.08);
  --border-card-hover: rgba(255, 255, 255, 0.2);
  --item-bg: rgba(255, 255, 255, 0.03);
  --item-border: rgba(255, 255, 255, 0.06);
  --shadow-card: 0 24px 80px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.03);
  --shadow-hover: 0 32px 96px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

/* Light Mode Variable overrides */
.dailypay-container.light-mode {
  --bg-card: rgba(255, 255, 255, 0.75);
  --bg-card-hover: rgba(255, 255, 255, 0.95);
  --text-main: #11140F;
  --text-muted: #75786C;
  --border-card: rgba(0, 0, 0, 0.08);
  --border-card-hover: rgba(0, 0, 0, 0.15);
  --item-bg: rgba(0, 0, 0, 0.02);
  --item-border: rgba(0, 0, 0, 0.04);
  --shadow-card: 0 24px 80px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  --shadow-hover: 0 32px 96px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 1);
}

.dailypay-card {
  width: 100%;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 28px;
  padding: 36px 32px;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.dailypay-card:hover {
  border-color: var(--border-card-hover);
  box-shadow: var(--shadow-hover);
}

.dailypay-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--item-border);
}

.dailypay-avatar-box {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.dailypay-title {
  font-family: 'Fraunces', serif;
  font-size: 24px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 4px;
}

.dailypay-subtitle {
  font-size: 13.5px;
  color: var(--text-muted);
  font-weight: 500;
}

.dailypay-section-title {
  font-size: 12px;
  font-weight: 800;
  color: var(--text-main);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dailypay-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.dailypay-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: var(--item-bg);
  border: 1px solid var(--item-border);
  border-radius: 14px;
  transition: all 0.25s ease;
}
.dailypay-item:hover {
  transform: translateY(-1px);
  background: var(--bg-card-hover);
  border-color: var(--border-card-hover);
}

.dailypay-item-icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--item-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  flex-shrink: 0;
}

.dailypay-item-time {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.dailypay-item-desc {
  font-size: 13.5px;
  color: var(--text-main);
  font-weight: 600;
}

.dailypay-price-banner {
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.dailypay-price-label {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 600;
  margin-bottom: 4px;
}

.dailypay-price-value {
  font-family: 'Fraunces', serif;
  font-size: 40px;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 4px;
}

.dailypay-price-period {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.dailypay-btn-primary {
  width: 100%;
  border: none;
  border-radius: 16px;
  padding: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #FFF;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.dailypay-btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
}
.dailypay-btn-primary:active:not(:disabled) {
  transform: scale(0.98);
}
.dailypay-btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.dailypay-trust-badge {
  text-align: center;
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 16px;
  font-weight: 500;
}

@media (max-width: 480px) {
  .dailypay-card {
    padding: 24px 20px;
    border-radius: 24px;
  }
  .dailypay-header {
    gap: 14px;
    margin-bottom: 20px;
    padding-bottom: 16px;
  }
  .dailypay-avatar-box {
    width: 56px;
    height: 56px;
    border-radius: 16px;
  }
  .dailypay-title {
    font-size: 20px;
  }
  .dailypay-subtitle {
    font-size: 12.5px;
  }
  .dailypay-item {
    padding: 12px 14px;
    border-radius: 12px;
    gap: 12px;
  }
  .dailypay-item-icon-wrapper {
    width: 32px;
    height: 32px;
    border-radius: 8px;
  }
  .dailypay-item-desc {
    font-size: 12.5px;
  }
  .dailypay-price-banner {
    padding: 16px;
    margin-bottom: 20px;
  }
  .dailypay-price-value {
    font-size: 34px;
  }
  .dailypay-btn-primary {
    padding: 14px;
    font-size: 14px;
    border-radius: 12px;
  }
  .dailypay-trust-badge {
    font-size: 11px;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

const CELEB_ICONS = {
  virat: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 3a2.45 2.45 0 0 0-3.5 0L3 14.5V18h3.5L18 6.5A2.45 2.45 0 0 0 18 3z" />
      <path d="M14 7l3 3" />
      <circle cx="19" cy="19" r="2" />
    </svg>
  ),
  alia: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v6m0 0l-4 4m4-4l4 4M4 10h16" />
    </svg>
  ),
  salman: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 5h12M6 19h12M12 5v14M3 9h3v6H3zm15 0h3v6h-3z" />
    </svg>
  ),
  deepika: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 6 6 1.5-6 1.5-1.5 6-1.5-6-6-1.5 6-1.5z" />
      <path d="M5 5l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5z" />
      <path d="M19 19l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5z" />
    </svg>
  ),
  hrithik: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  priyanka: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

export default function DailyPayScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Theme state listener
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

  const celebrity = localStorage.getItem('celebrity') || 'virat';

  const celebInfo = {
    virat: { name: 'Virat Kohli', price: 15, color: '#3B82F6', text: 'Athlete mindset & nutrition' },
    alia: { name: 'Alia Bhatt', price: 12, color: '#EC4899', text: 'Mindful meals & organic plan' },
    salman: { name: 'Salman Khan', price: 15, color: '#10B981', text: 'High protein fitness lifestyle' },
    deepika: { name: 'Deepika Padukone', price: 12, color: '#8B5CF6', text: 'Balanced holistic beauty program' },
    hrithik: { name: 'Hrithik Roshan', price: 15, color: '#EF4444', text: 'Rigorous muscle conditioning guide' },
    priyanka: { name: 'Priyanka Chopra', price: 12, color: '#F59E0B', text: 'Global lifestyle & glowing nutrition' },
  };

  const info = celebInfo[celebrity] || celebInfo.virat;

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('paymentComplete', 'true');
      navigate('/activation');
    }, 1200);
  };

  const schedule = [
    { 
      time: 'Morning', 
      text: 'Celebrity breakfast recipe', 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v2M4.22 4.22l1.42 1.42M1 12h2M21 12h2M18.36 5.64l1.42-1.42M22 22H2M16 22a4 4 0 0 0-8 0" />
        </svg>
      )
    },
    { 
      time: 'Midday', 
      text: 'Power lunch & nutrition targets', 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M9.78 18.36L8.36 19.78M18.36 5.64L19.78 4.22" />
        </svg>
      )
    },
    { 
      time: 'Evening', 
      text: 'Cozy dinner & workout tips', 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )
    },
  ];

  return (
    <Layout
      title="Daily Plan Payment"
      subtitle={`One day inspired by ${info.name}`}
      showBack
      onBack={() => navigate('/fan-quiz-type')}
    >
      <div className={`dailypay-container ${isDark ? 'dark-mode' : 'light-mode'}`} style={{ '--celeb-color': info.color }}>
        <style>{CSS}</style>
        <SparkleBackground isDark={isDark} />

        <div style={{ maxWidth: 520, width: '100%', margin: '0 auto', zIndex: 1 }}>
          {/* Main Card */}
          <div className="dailypay-card">
            {/* Header */}
            <div className="dailypay-header">
              <div className="dailypay-avatar-box" style={{
                background: `linear-gradient(135deg, ${info.color} 0%, ${info.color}88 100%)`,
              }}>
                {CELEB_ICONS[celebrity] || CELEB_ICONS.virat}
              </div>
              <div style={{ flex: 1 }}>
                <h2 className="dailypay-title">
                  {info.name} Style
                </h2>
                <p className="dailypay-subtitle">
                  {info.text}
                </p>
              </div>
            </div>

            {/* Today's Schedule */}
            <div style={{ marginBottom: 24 }}>
              <h3 className="dailypay-section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Today's Schedule
              </h3>
              <div className="dailypay-list">
                {schedule.map((item, i) => (
                  <div key={i} className="dailypay-item">
                    <div className="dailypay-item-icon-wrapper">
                      {item.icon}
                    </div>
                    <div>
                      <p className="dailypay-item-time">{item.time}</p>
                      <p className="dailypay-item-desc">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="dailypay-price-banner" style={{
              background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'}`,
            }}>
              <p className="dailypay-price-label">Today only</p>
              <p className="dailypay-price-value" style={{ color: info.color }}>
                ₹{info.price}
              </p>
              <p className="dailypay-price-period">Single pay • Lifetime access to day recipe</p>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={loading}
              className="dailypay-btn-primary"
              style={{
                background: `linear-gradient(135deg, ${info.color} 0%, ${info.color}cc 100%)`,
                boxShadow: `0 8px 24px ${info.color}40`,
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: 20,
                    height: 20,
                    border: '2.5px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#FFF',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                  Processing...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                  Pay ₹{info.price} & Start Today
                </>
              )}
            </button>

            {/* Trust badge */}
            <div className="dailypay-trust-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Secure Checkout • 24-hour Plan Access
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
