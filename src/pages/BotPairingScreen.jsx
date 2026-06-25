import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SparkleBackground from '../components/SparkleBackground';

const CSS = `
.botpairing-container {
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
.botpairing-container.dark-mode {
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
.botpairing-container.light-mode {
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

.botpairing-wrap {
  position: relative;
  z-index: 1;
  max-width: 540px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.botpairing-btn-back {
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
.botpairing-btn-back:hover {
  border-color: var(--border-card-hover);
  color: var(--text-main);
  transform: translateX(-2px);
}

.botpairing-card {
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
.botpairing-card:hover {
  border-color: var(--border-card-hover);
  box-shadow: var(--shadow-hover);
}

.botpairing-success-icon-box {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%);
  border: 2px solid rgba(34, 197, 94, 0.3);
  border-radius: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: #22C55E;
  box-shadow: 0 12px 30px rgba(34, 197, 94, 0.15);
  animation: bounceIn 0.7s ease;
}

.botpairing-h1 {
  font-family: 'Fraunces', serif;
  font-size: 26px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 6px;
}

.botpairing-sub {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 24px;
}

.botpairing-code-section {
  text-align: center;
  margin-bottom: 28px;
}

.botpairing-code-title {
  font-size: 11px;
  font-weight: 800;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

.botpairing-code-grid {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.botpairing-code-char {
  width: 48px;
  height: 58px;
  background: rgba(240, 105, 34, 0.08);
  border: 1.5px solid rgba(240, 105, 34, 0.25);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  color: #F06922;
  font-family: 'Outfit', monospace;
  box-shadow: 0 4px 16px rgba(240, 105, 34, 0.08);
}

.botpairing-code-whatsapp-tip {
  margin-top: 12px;
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 500;
}

.botpairing-divider {
  height: 1px;
  background: var(--item-border);
  margin-bottom: 24px;
}

.botpairing-section-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--text-main);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.botpairing-steps {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 28px;
}

.botpairing-step-item {
  display: flex;
  align-items: center;
  gap: 14px;
  transition: all 0.3s ease;
}

.botpairing-step-icon-wrapper {
  width: 38px;
  height: 38px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.botpairing-step-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.botpairing-step-text {
  font-size: 13.5px;
  color: var(--text-main);
  font-weight: 600;
}

.botpairing-tip-banner {
  background: rgba(34, 197, 94, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.15);
  border-radius: 16px;
  padding: 14px 18px;
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 28px;
}

.botpairing-tip-icon {
  color: #22C55E;
  flex-shrink: 0;
}

.botpairing-tip-text {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
  font-weight: 500;
}

.botpairing-btn-primary {
  width: 100%;
  background: linear-gradient(135deg, #F06922 0%, #E85C25 100%);
  border: none;
  border-radius: 16px;
  padding: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #FFF;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(240, 105, 34, 0.25);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.botpairing-btn-primary::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
  pointer-events: none;
}
.botpairing-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(240, 105, 34, 0.35);
}
.botpairing-btn-primary:active {
  transform: scale(0.98);
}

@media (max-width: 480px) {
  .botpairing-card {
    padding: 24px 20px;
    border-radius: 24px;
  }
  .botpairing-success-icon-box {
    width: 64px;
    height: 64px;
    border-radius: 18px;
  }
  .botpairing-success-icon-box svg {
    width: 32px;
    height: 32px;
  }
  .botpairing-h1 {
    font-size: 22px;
  }
  .botpairing-sub {
    font-size: 13px;
    margin-bottom: 20px;
  }
  .botpairing-code-section {
    margin-bottom: 20px;
  }
  .botpairing-code-char {
    width: 40px;
    height: 48px;
    font-size: 20px;
    border-radius: 10px;
  }
  .botpairing-code-whatsapp-tip {
    font-size: 11px;
  }
  .botpairing-steps {
    gap: 12px;
    margin-bottom: 20px;
  }
  .botpairing-step-item {
    gap: 12px;
  }
  .botpairing-step-icon-wrapper {
    width: 32px;
    height: 32px;
    border-radius: 9px;
  }
  .botpairing-step-icon-wrapper svg {
    width: 16px;
    height: 16px;
  }
  .botpairing-step-text {
    font-size: 12.5px;
  }
  .botpairing-tip-banner {
    padding: 12px 14px;
    margin-bottom: 20px;
    gap: 10px;
  }
  .botpairing-tip-text {
    font-size: 11px;
  }
  .botpairing-btn-primary {
    padding: 14px;
    font-size: 14px;
    border-radius: 12px;
  }
}

@keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
@keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px,-20px); } }
@keyframes bounceIn { 0% { transform: scale(0.3); opacity: 0; } 50% { transform: scale(1.15); opacity: 0.9; } 100% { transform: scale(1); opacity: 1; } }
@keyframes popIn { 0% { transform: scale(0) rotate(-10deg); opacity: 0; } 100% { transform: scale(1) rotate(0); opacity: 1; } }
`;

export default function BotPairingScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const pairingCode = localStorage.getItem('botPairingCode') || 'A3X9K2';

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

  // Stagger step reveals
  useEffect(() => {
    if (!show) return;
    const timers = steps.map((_, i) => setTimeout(() => setActiveStep(i), 500 + i * 180));
    return () => timers.forEach(clearTimeout);
  }, [show]);

  const steps = [
    {
      num: 1,
      text: 'Take bot home (pick up at counter)',
      color: '#F06922',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="21 8 21 21 3 21 3 8" />
          <rect x="1" y="3" width="22" height="5" />
          <line x1="10" y1="12" x2="14" y2="12" />
        </svg>
      )
    },
    {
      num: 2,
      text: 'Power on with USB cable',
      color: '#3B82F6',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-4a2 2 0 0 0-2 2v8a2 2 0 0 1-2 2H6M6 4v4M10 4v4M12 4h-8v4a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V4z"/>
        </svg>
      )
    },
    {
      num: 3,
      text: 'Wait for "READY!" on OLED screen',
      color: '#8B5CF6',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <line x1="6" y1="21" x2="18" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      )
    },
    {
      num: 4,
      text: 'Open Serial Monitor (115200 baud)',
      color: '#EC4899',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      )
    },
    {
      num: 5,
      text: `Type command: PAIR ${pairingCode}`,
      color: '#10B981',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
          <line x1="6" y1="8" x2="6" y2="8"/>
          <line x1="10" y1="8" x2="10" y2="8"/>
          <line x1="14" y1="8" x2="14" y2="8"/>
          <line x1="18" y1="8" x2="18" y2="8"/>
          <line x1="6" y1="12" x2="6" y2="12"/>
          <line x1="10" y1="12" x2="10" y2="12"/>
          <line x1="14" y1="12" x2="14" y2="12"/>
          <line x1="18" y1="12" x2="18" y2="12"/>
          <line x1="7" y1="16" x2="17" y2="16"/>
        </svg>
      )
    },
    {
      num: 6,
      text: 'Bot syncs in seconds — done!',
      color: '#F59E0B',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l1.5 6 6 1.5-6 1.5-1.5 6-1.5-6-6-1.5 6-1.5z" />
        </svg>
      )
    },
  ];

  return (
    <div className={`botpairing-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <style>{CSS}</style>
      <SparkleBackground isDark={isDark} />

      <div style={{ position: 'absolute', top: -100, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,105,34,0.06) 0%, transparent 70%)', animation: 'floatOrb2 10s ease-in-out infinite', pointerEvents: 'none' }} />

      <div className="botpairing-wrap" style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Back */}
        <button onClick={() => navigate(-1)} className="botpairing-btn-back">
          ← Back
        </button>

        {/* Pairing Main Card */}
        <div className="botpairing-card">
          {/* Success Badge */}
          <div className="botpairing-success-icon-box">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
              <path d="M12 2a5 5 0 0 0-5 5v5a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" />
            </svg>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h1 className="botpairing-h1">Bot Purchased!</h1>
            <p className="botpairing-sub">Use this code to pair your companion bot at home</p>
          </div>

          <div className="botpairing-divider" />

          {/* Pairing Code Section */}
          <div className="botpairing-code-section">
            <div className="botpairing-code-title">Your Pairing Code</div>
            <div className="botpairing-code-grid">
              {pairingCode.split('').map((char, i) => (
                <div key={i} className="botpairing-code-char" style={{
                  animation: `popIn 0.35s ease ${i * 0.08}s both`,
                }}>
                  {char}
                </div>
              ))}
            </div>
            <div className="botpairing-code-whatsapp-tip">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12" y2="18" />
              </svg>
              Pairing code also sent to your WhatsApp
            </div>
          </div>

          <div className="botpairing-divider" />

          {/* Setup steps list */}
          <div>
            <h3 className="botpairing-section-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              6-Step Setup Guide
            </h3>
            <div className="botpairing-steps">
              {steps.map((s, i) => (
                <div key={s.num} className="botpairing-step-item" style={{
                  opacity: i <= activeStep ? 1 : 0.3,
                  transform: i <= activeStep ? 'translateX(0)' : 'translateX(-8px)',
                }}>
                  <div className="botpairing-step-icon-wrapper" style={{
                    background: `${s.color}15`,
                    color: s.color,
                    border: `1px solid ${s.color}25`,
                  }}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="botpairing-step-label" style={{ color: s.color }}>Step {s.num}</p>
                    <p className="botpairing-step-text">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connection tip banner */}
          <div className="botpairing-tip-banner">
            <div className="botpairing-tip-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <line x1="9" y1="18" x2="15" y2="18" />
                <line x1="10" y1="22" x2="14" y2="22" />
              </svg>
            </div>
            <p className="botpairing-tip-text">
              <strong>Quick WiFi Tip:</strong> Bot auto-connects. If not, type{' '}
              <code style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: 4, color: '#F06922', fontSize: '11px', fontWeight: '700' }}>WIFI yourSSID yourPassword</code> in Serial Monitor.
            </p>
          </div>

          {/* Continue primary button */}
          <button onClick={() => navigate('/bot-customize')} className="botpairing-btn-primary">
            Continue to Customize
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
