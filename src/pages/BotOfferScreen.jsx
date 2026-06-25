import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SparkleBackground from '../components/SparkleBackground';

const CSS = `
.botoffer-container {
  min-height: 100vh;
  background: transparent;
  font-family: 'Inter', 'Outfit', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
  transition: background 0.4s ease, color 0.4s ease;
}

/* Dark Mode Variable overrides */
.botoffer-container.dark-mode {
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
.botoffer-container.light-mode {
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

.botoffer-wrap {
  position: relative;
  z-index: 1;
  max-width: 560px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.botoffer-btn-back {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  padding: 10px 18px;
  color: var(--text-muted);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.25s ease;
  outline: none;
}
.botoffer-btn-back:hover {
  border-color: var(--border-card-hover);
  color: var(--text-main);
  transform: translateX(-2px);
}

.botoffer-card {
  width: 100%;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 28px;
  padding: 40px 32px;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.botoffer-card:hover {
  border-color: var(--border-card-hover);
  box-shadow: var(--shadow-hover);
}

.botoffer-avatar-wrapper {
  position: relative;
  width: 130px;
  height: 130px;
  margin: 0 auto 24px;
}

.botoffer-ring-outer {
  position: absolute;
  inset: -8px;
  border: 2px solid transparent;
  border-top-color: #F06922;
  border-right-color: rgba(240, 105, 34, 0.3);
  border-radius: 50%;
  animation: spin 3s linear infinite;
}

.botoffer-ring-inner {
  position: absolute;
  inset: -4px;
  border: 2px solid transparent;
  border-bottom-color: #22C55E;
  border-left-color: rgba(34, 197, 94, 0.3);
  border-radius: 50%;
  animation: spinReverse 4s linear infinite;
}

.botoffer-avatar-box {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #F06922 0%, #FF8A4C 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  box-shadow: 0 16px 40px rgba(240, 105, 34, 0.3);
  animation: botFloat 4s ease-in-out infinite;
}

.botoffer-status-dot {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background: #22C55E;
  border-radius: 50%;
  border: 3px solid var(--white);
  animation: onlinePulse 2s ease-in-out infinite;
}

.botoffer-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(240, 105, 34, 0.12);
  border: 1px solid rgba(240, 105, 34, 0.25);
  border-radius: 20px;
  padding: 6px 14px;
  margin-bottom: 16px;
}

.botoffer-badge-text {
  font-size: 11px;
  font-weight: 700;
  color: #FF8A4C;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.botoffer-h1 {
  font-family: 'Fraunces', serif;
  font-size: 32px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 12px;
  line-height: 1.15;
  letter-spacing: -0.5px;
}

.botoffer-sub {
  font-size: 14.5px;
  color: var(--text-muted);
  line-height: 1.6;
  max-width: 420px;
  margin: 0 auto;
}

.botoffer-section-title {
  font-size: 12px;
  font-weight: 800;
  color: var(--text-main);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.botoffer-feature-preview {
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 16px;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  gap: 16px;
}

.botoffer-feature-icon-box {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.botoffer-feature-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 3px;
}

.botoffer-feature-desc {
  font-size: 12.5px;
  color: var(--text-muted);
  line-height: 1.45;
}

.botoffer-feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.botoffer-feature-btn {
  background: var(--item-bg);
  border: 1px solid var(--item-border);
  border-radius: 14px;
  padding: 12px 6px;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.botoffer-feature-btn:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-card-hover);
}

.botoffer-feature-btn.active {
  background: var(--bg-card-hover);
  border-color: var(--border-card-hover);
  box-shadow: var(--shadow-card);
}

.botoffer-feature-btn-icon {
  transition: transform 0.2s ease;
}
.botoffer-feature-btn:hover .botoffer-feature-btn-icon {
  transform: scale(1.1);
}

.botoffer-feature-btn-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--text-muted);
}
.botoffer-feature-btn.active .botoffer-feature-btn-label {
  color: var(--text-main);
}

.botoffer-price-banner {
  background: linear-gradient(135deg, rgba(240,105,34,0.08) 0%, rgba(240,105,34,0.02) 100%);
  border: 1px solid rgba(240,105,34,0.25);
  box-shadow: 0 8px 30px rgba(240,105,34,0.05);
}

.botoffer-price-title {
  font-size: 11px;
  font-weight: 800;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 6px;
}

.botoffer-price-value {
  font-family: 'Fraunces', serif;
  font-size: 48px;
  font-weight: 800;
  color: var(--text-main);
  line-height: 1;
  margin-bottom: 4px;
}

.botoffer-price-currency {
  font-size: 26px;
  font-weight: 700;
  vertical-align: top;
  margin-right: 2px;
}

.botoffer-price-subtitle {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
}

.botoffer-btn-primary {
  width: 100%;
  background: linear-gradient(135deg, #F06922 0%, #E85C25 100%);
  border: none;
  border-radius: 18px;
  padding: 18px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #FFF;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(240, 105, 34, 0.3);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.botoffer-btn-primary::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
  pointer-events: none;
}
.botoffer-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 40px rgba(240, 105, 34, 0.45);
}
.botoffer-btn-primary:active {
  transform: scale(0.98);
}

.botoffer-btn-secondary {
  width: 100%;
  background: var(--item-bg);
  border: 1px solid var(--item-border);
  border-radius: 16px;
  padding: 15px;
  font-family: 'Inter', sans-serif;
  font-size: 14.5px;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.25s ease;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.botoffer-btn-secondary:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-card-hover);
  color: var(--text-main);
}

@media (max-width: 480px) {
  .botoffer-wrap {
    gap: 16px;
  }
  .botoffer-card {
    padding: 28px 20px;
    border-radius: 24px;
  }
  .botoffer-avatar-wrapper {
    width: 110px;
    height: 110px;
    margin-bottom: 20px;
  }
  .botoffer-h1 {
    font-size: 24px;
  }
  .botoffer-sub {
    font-size: 13.5px;
  }
  .botoffer-feature-preview {
    padding: 16px;
    margin-bottom: 12px;
    gap: 12px;
  }
  .botoffer-feature-icon-box {
    width: 44px;
    height: 44px;
    border-radius: 10px;
  }
  .botoffer-feature-icon-box svg {
    width: 22px;
    height: 22px;
  }
  .botoffer-feature-title {
    font-size: 14px;
  }
  .botoffer-feature-desc {
    font-size: 12px;
  }
  .botoffer-feature-grid {
    gap: 6px;
  }
  .botoffer-feature-btn {
    padding: 10px 4px;
    border-radius: 12px;
  }
  .botoffer-feature-btn svg {
    width: 20px;
    height: 20px;
  }
  .botoffer-price-banner {
    padding: 24px 20px;
  }
  .botoffer-price-value {
    font-size: 40px;
  }
  .botoffer-btn-primary {
    padding: 14px;
    font-size: 14.5px;
    border-radius: 12px;
  }
  .botoffer-btn-secondary {
    padding: 12px;
    font-size: 13.5px;
    border-radius: 12px;
  }
}

@keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
@keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px,-20px); } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes spinReverse { to { transform: rotate(-360deg); } }
@keyframes botFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes onlinePulse { 0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); } 50% { box-shadow: 0 0 0 6px rgba(34,197,94,0); } }
`;

export default function BotOfferScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

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

  useEffect(() => {
    setTimeout(() => setShow(true), 120);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(p => (p + 1) % 8);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      id: 'oled',
      title: 'OLED Face Display',
      desc: '6 cute face types × 3 mood states = 18 unique live expressions',
      color: '#F06922',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
          <line x1="9" y1="9" x2="9.01" y2="9"/>
          <line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
      )
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Sync',
      desc: 'Real-time synchronization with your personalized daily goals & plan schedule',
      color: '#10B981',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12" y2="18" />
        </svg>
      )
    },
    {
      id: 'reminders',
      title: 'Smart Reminders',
      desc: 'Clear passive sounds and custom RGB LED patterns wake up when it\'s time to act',
      color: '#3B82F6',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      )
    },
    {
      id: 'games',
      title: 'Mini Games',
      desc: 'Fun games like Snake, Memory quiz, and Reaction tests built-in',
      color: '#8B5CF6',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2"/>
          <path d="M6 12h4M8 10v4M15 11h.01M18 13h.01"/>
        </svg>
      )
    },
    {
      id: 'sensor',
      title: 'Touch Sensor',
      desc: 'Pet your companion on the top plate! It responds with animation & feedback',
      color: '#EC4899',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 11V6a2 2 0 0 1 4 0v7a2 2 0 0 1-2 2h-2c-1.1 0-2.07-.4-2.83-1.05L6 11.5l1.5-1.5 2.5 1.5V11a1 1 0 0 1 2 0z"/>
        </svg>
      )
    },
    {
      id: 'sleep',
      title: 'Smart Sleep',
      desc: 'Auto dims display at night to preserve battery, and wakes up naturally with you',
      color: '#6366F1',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      )
    },
    {
      id: 'progress',
      title: 'Progress System',
      desc: 'Earn stars, level up, track streak multipliers, and unlock premium face skins',
      color: '#F59E0B',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      )
    },
    {
      id: 'quiz',
      title: 'Health Quizzes',
      desc: 'Interactive micro-quizzes check your wellness knowledge throughout the day',
      color: '#14B8A6',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z"/>
        </svg>
      )
    },
  ];

  return (
    <div className={`botoffer-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <style>{CSS}</style>
      <SparkleBackground isDark={isDark} />

      <div style={{ position: 'absolute', top: -100, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,105,34,0.08) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', animation: 'floatOrb2 10s ease-in-out infinite', pointerEvents: 'none' }} />

      <div className="botoffer-wrap" style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Back */}
        <button onClick={() => navigate(-1)} className="botoffer-btn-back">
          ← Back
        </button>

        {/* Hero Card */}
        <div className="botoffer-card">
          <div className="botoffer-avatar-wrapper">
            <div className="botoffer-ring-outer" />
            <div className="botoffer-ring-inner" />
            <div className="botoffer-avatar-box">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
                <circle cx="12" cy="5" r="2"/>
                <path d="M12 7v4M8 15h.01M16 15h.01"/>
              </svg>
            </div>
            <div className="botoffer-status-dot" style={{ borderColor: isDark ? '#1F2C33' : '#FFF' }} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div className="botoffer-badge">
              <span style={{ fontSize: 11 }}>⚡</span>
              <span className="botoffer-badge-text">New Companion</span>
            </div>
            <h1 className="botoffer-h1">
              Meet Your Personal<br />
              <span style={{ background: 'linear-gradient(135deg, #F06922, #FF8A4C, #FFB380)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Health Companion</span>
            </h1>
            <p className="botoffer-sub">
              A cute physical companion bot that syncs with your WhatsApp to remind you to drink water, eat meals, and stay active.
            </p>
          </div>
        </div>

        {/* Features Card */}
        <div className="botoffer-card">
          <h3 className="botoffer-section-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            What's Inside the Box
          </h3>

          <div className="botoffer-feature-preview" style={{
            background: `${features[activeFeature].color}12`,
            border: `1.5px solid ${features[activeFeature].color}25`,
          }}>
            <div className="botoffer-feature-icon-box" style={{
              background: `${features[activeFeature].color}20`,
              color: features[activeFeature].color,
            }}>
              {features[activeFeature].icon}
            </div>
            <div style={{ flex: 1 }}>
              <p className="botoffer-feature-title">{features[activeFeature].title}</p>
              <p className="botoffer-feature-desc">{features[activeFeature].desc}</p>
            </div>
          </div>

          <div className="botoffer-feature-grid">
            {features.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setActiveFeature(i)}
                className={`botoffer-feature-btn ${i === activeFeature ? 'active' : ''}`}
                style={{
                  borderWidth: i === activeFeature ? '1.5px' : '1px',
                  borderColor: i === activeFeature ? f.color : '',
                }}
              >
                <span className="botoffer-feature-btn-icon" style={{
                  color: i === activeFeature ? f.color : 'var(--text-muted)',
                }}>
                  {f.icon}
                </span>
                <span className="botoffer-feature-btn-label">
                  {f.title.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Pricing & CTA Card */}
        <div className="botoffer-card botoffer-price-banner">
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div className="botoffer-price-title">One-time purchase</div>
            <div className="botoffer-price-value">
              <span className="botoffer-price-currency">₹</span>499
            </div>
            <p className="botoffer-price-subtitle">Free lifetime sync • No subscription ever</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button onClick={() => navigate('/bot-purchase')} className="botoffer-btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
                <circle cx="12" cy="5" r="2"/>
                <path d="M12 7v4M8 15h.01M16 15h.01"/>
              </svg>
              Get Pet Bot — ₹499
            </button>
            <button onClick={() => navigate('/wa-preview')} className="botoffer-btn-secondary">
              Skip for Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
