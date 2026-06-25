import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SparkleBackground from '../components/SparkleBackground';

const CSS = `
.botstatus-container {
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
.botstatus-container.dark-mode {
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
.botstatus-container.light-mode {
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

.botstatus-wrap {
  position: relative;
  z-index: 1;
  max-width: 540px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.botstatus-btn-back {
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
.botstatus-btn-back:hover {
  border-color: var(--border-card-hover);
  color: var(--text-main);
  transform: translateX(-2px);
}

.botstatus-card {
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
.botstatus-card:hover {
  border-color: var(--border-card-hover);
  box-shadow: var(--shadow-hover);
}

.botstatus-avatar-wrapper {
  position: relative;
  width: 110px;
  height: 110px;
  margin: 0 auto 20px;
}

.botstatus-avatar-ring {
  position: absolute;
  inset: -6px;
  border: 2px solid rgba(240, 105, 34, 0.08);
  border-radius: 50%;
  animation: spin 20s linear infinite;
  pointer-events: none;
}

.botstatus-avatar-box {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #F06922 0%, #FF8A4C 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  box-shadow: 0 12px 30px rgba(240, 105, 34, 0.25);
  animation: botFloat 3s ease-in-out infinite;
}

.botstatus-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--item-bg);
  border: 1px solid var(--item-border);
  padding: 8px 20px;
  border-radius: 20px;
  margin-bottom: 8px;
}

.botstatus-status-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--text-muted);
  animation: offlinePulse 2s infinite;
}

.botstatus-badge-text {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-muted);
}

.botstatus-last-seen {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
  margin-bottom: 24px;
}

.botstatus-divider {
  height: 1px;
  background: var(--border-card);
  margin-bottom: 24px;
}

.botstatus-section-title {
  font-size: 11px;
  font-weight: 800;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 14px;
  text-align: center;
}

.botstatus-code-grid {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 24px;
}

.botstatus-code-char {
  width: 42px;
  height: 50px;
  background: rgba(240, 105, 34, 0.06);
  border: 1.5px solid rgba(240, 105, 34, 0.2);
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 900;
  color: #F06922;
  font-family: 'Outfit', monospace;
  box-shadow: 0 4px 16px rgba(240, 105, 34, 0.06);
}

.botstatus-settings-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.botstatus-setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--item-bg);
  border: 1px solid var(--item-border);
  border-radius: 12px;
  transition: all 0.2s ease;
}
.botstatus-setting-item:hover {
  transform: translateY(-1px);
  background: var(--bg-card-hover);
  border-color: var(--border-card-hover);
}

.botstatus-setting-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.botstatus-setting-icon-wrapper {
  color: var(--text-muted);
  display: flex;
  align-items: center;
}

.botstatus-setting-label {
  font-size: 13.5px;
  color: var(--text-muted);
  font-weight: 600;
}

.botstatus-setting-value {
  font-size: 13.5px;
  font-weight: 700;
}

.botstatus-btn-edit {
  width: 100%;
  background: var(--item-bg);
  border: 1px solid var(--item-border);
  border-radius: 14px;
  padding: 14px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.25s ease;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.botstatus-btn-edit:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-card-hover);
  color: var(--text-main);
  transform: translateY(-1px);
}

.botstatus-warning-banner {
  background: rgba(251, 191, 36, 0.05);
  border: 1px solid rgba(251, 191, 36, 0.15);
  border-radius: 16px;
  padding: 14px 18px;
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
}

.botstatus-warning-icon {
  color: #FBBF24;
  flex-shrink: 0;
}

.botstatus-warning-text {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
  font-weight: 500;
}

.botstatus-buttons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.botstatus-btn-wa {
  border: none;
  border-radius: 16px;
  padding: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #FFF;
  cursor: pointer;
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.25);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.botstatus-btn-wa:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(37, 211, 102, 0.35);
}

.botstatus-btn-home {
  background: var(--item-bg);
  border: 1px solid var(--item-border);
  border-radius: 16px;
  padding: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.25s ease;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.botstatus-btn-home:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-card-hover);
  color: var(--text-main);
  transform: translateY(-2px);
}

@media (max-width: 480px) {
  .botstatus-card {
    padding: 24px 20px;
    border-radius: 24px;
  }
  .botstatus-avatar-wrapper {
    width: 90px;
    height: 90px;
  }
  .botstatus-avatar-box svg {
    width: 36px;
    height: 36px;
  }
  .botstatus-badge {
    padding: 6px 14px;
  }
  .botstatus-badge-text {
    font-size: 12px;
  }
  .botstatus-last-seen {
    font-size: 11.5px;
    margin-bottom: 20px;
  }
  .botstatus-code-grid {
    gap: 4px;
    margin-bottom: 20px;
  }
  .botstatus-code-char {
    width: 36px;
    height: 44px;
    font-size: 17px;
    border-radius: 8px;
  }
  .botstatus-setting-item {
    padding: 10px 14px;
    border-radius: 10px;
  }
  .botstatus-setting-label {
    font-size: 12.5px;
  }
  .botstatus-setting-value {
    font-size: 12.5px;
  }
  .botstatus-warning-banner {
    padding: 12px 14px;
    margin-bottom: 20px;
  }
  .botstatus-warning-text {
    font-size: 11px;
  }
  .botstatus-buttons-grid {
    gap: 10px;
  }
  .botstatus-btn-wa, .botstatus-btn-home {
    padding: 14px;
    font-size: 13.5px;
    border-radius: 12px;
  }
}

@keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
@keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px,-20px); } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes botFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes offlinePulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
`;

const BIG_FACE_ICONS = {
  robot: (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
      <circle cx="12" cy="5" r="2"/>
      <path d="M12 7v4M8 15h.01M16 15h.01"/>
    </svg>
  ),
  cat: (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
      <path d="M4 10l-2-4 5 1M20 10l2-4-5 1" />
    </svg>
  ),
  dog: (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
      <path d="M5 8l-3 4 1 5M19 8l3 4-1 5" />
    </svg>
  ),
  panda: (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
      <circle cx="16" cy="8" r="1.5" fill="currentColor"/>
    </svg>
  ),
  bunny: (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="14" r="7"/>
      <path d="M9 7c0-3 1-5 3-5s3 2 3 5M9 7v-1c0-2.5.5-4 1.5-4M15 7v-1c0-2.5-.5-4-1.5-4"/>
    </svg>
  ),
  bear: (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13" r="8"/>
      <circle cx="6" cy="6" r="2.5"/>
      <circle cx="18" cy="6" r="2.5"/>
    </svg>
  ),
};

export default function BotStatusScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const pairingCode = localStorage.getItem('botPairingCode') || 'A3X9K2';
  const config = JSON.parse(localStorage.getItem('botConfig') || '{}');

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

  const faceMap = { robot: 'Robot', cat: 'Cat', dog: 'Dog', panda: 'Panda', bunny: 'Bunny', bear: 'Bear' };
  const soundMap = { chime: 'Chime', melody: 'Melody', beep: 'Beep', voice: 'Voice' };
  const personalityMap = { cheerful: 'Cheerful', calm: 'Calm', strict: 'Strict' };

  const settings = [
    {
      label: 'Face Display',
      value: faceMap[config.face] || 'Robot',
      color: '#F06922',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
      )
    },
    {
      label: 'Sound Theme',
      value: soundMap[config.sound] || 'Chime',
      color: '#3B82F6',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      )
    },
    {
      label: 'Personality Mode',
      value: personalityMap[config.personality] || 'Cheerful',
      color: '#8B5CF6',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      )
    },
    {
      label: 'Sleep Dimming',
      value: `${config.sleepTime || '22:00'} → ${config.wakeTime || '07:00'}`,
      color: '#EC4899',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      )
    },
  ];

  return (
    <div className={`botstatus-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <style>{CSS}</style>
      <SparkleBackground isDark={isDark} />

      <div style={{ position: 'absolute', top: -100, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,105,34,0.06) 0%, transparent 70%)', animation: 'floatOrb2 10s ease-in-out infinite', pointerEvents: 'none' }} />

      <div className="botstatus-wrap" style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Back */}
        <button onClick={() => navigate(-1)} className="botstatus-btn-back">
          ← Back
        </button>

        {/* Status Main Card */}
        <div className="botstatus-card">
          {/* Status Face Display */}
          <div className="botstatus-avatar-wrapper">
            <div className="botstatus-avatar-ring" />
            <div className="botstatus-avatar-box">
              {BIG_FACE_ICONS[config.face] || BIG_FACE_ICONS.robot}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div className="botstatus-badge">
              <span className="botstatus-status-dot" />
              <span className="botstatus-badge-text">Offline — Unpaired</span>
            </div>
            <p className="botstatus-last-seen">Last online: Never connected</p>
          </div>

          <div className="botstatus-divider" />

          {/* Pairing Code Section */}
          <div className="botstatus-code-section">
            <div className="botstatus-section-title">Your Pairing Code</div>
            <div className="botstatus-code-grid">
              {pairingCode.split('').map((char, i) => (
                <span key={i} className="botstatus-code-char">
                  {char}
                </span>
              ))}
            </div>
          </div>

          <div className="botstatus-divider" />

          {/* Current Settings List */}
          <div style={{ marginBottom: 20 }}>
            <div className="botstatus-section-title" style={{ textAlign: 'left' }}>Current Configuration</div>
            <div className="botstatus-settings-list">
              {settings.map((s, i) => (
                <div key={i} className="botstatus-setting-item">
                  <div className="botstatus-setting-left">
                    <span className="botstatus-setting-icon-wrapper">
                      {s.icon}
                    </span>
                    <span className="botstatus-setting-label">{s.label}</span>
                  </div>
                  <span className="botstatus-setting-value" style={{ color: s.color }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/bot-customize')} className="botstatus-btn-edit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              Edit Preferences
            </button>
          </div>

          {/* Pairing warning banner */}
          <div className="botstatus-warning-banner">
            <div className="botstatus-warning-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <p className="botstatus-warning-text">
              The pet companion bot will connect and show "Online" once it is powered on at home and paired with the kiosk code.
            </p>
          </div>

          {/* Home and WhatsApp actions */}
          <div className="botstatus-buttons-grid">
            <button onClick={() => navigate('/wa-preview')} className="botstatus-btn-wa">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12" y2="18" />
              </svg>
              WhatsApp Preview
            </button>
            <button onClick={() => navigate('/')} className="botstatus-btn-home">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
