import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SparkleBackground from '../components/SparkleBackground';

const CSS = `
.botcustomize-container {
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
.botcustomize-container.dark-mode {
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
  --input-bg: rgba(255, 255, 255, 0.04);
  --input-border: rgba(255, 255, 255, 0.1);
  --input-color: #F06922;
}

/* Light Mode Variable overrides */
.botcustomize-container.light-mode {
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
  --input-bg: rgba(255, 255, 255, 0.85);
  --input-border: rgba(0, 0, 0, 0.08);
  --input-color: #D45513;
}

.botcustomize-wrap {
  position: relative;
  z-index: 1;
  max-width: 580px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.botcustomize-header-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 8px;
}

.botcustomize-btn-back {
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
  transition: all 0.25s ease;
  outline: none;
}
.botcustomize-btn-back:hover {
  border-color: var(--border-card-hover);
  color: var(--text-main);
  transform: translateX(-2px);
}

.botcustomize-title {
  font-family: 'Fraunces', serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 2px;
}

.botcustomize-subtitle {
  font-size: 12.5px;
  color: var(--text-muted);
  font-weight: 500;
}

.botcustomize-card {
  width: 100%;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 28px 24px;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
}
.botcustomize-card:hover {
  border-color: var(--border-card-hover);
  box-shadow: var(--shadow-hover);
}

.botcustomize-section-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--text-main);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.botcustomize-faces-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.botcustomize-face-btn {
  background: var(--item-bg);
  border: 2px solid var(--item-border);
  border-radius: 16px;
  padding: 16px 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.botcustomize-face-btn:hover:not(:disabled) {
  background: var(--bg-card-hover);
  border-color: var(--border-card-hover);
}
.botcustomize-face-btn.active {
  background: var(--bg-card-hover);
  border-color: #F06922;
}
.botcustomize-face-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.botcustomize-face-icon-wrapper {
  color: var(--text-main);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}
.botcustomize-face-btn.active .botcustomize-face-icon-wrapper {
  color: #F06922;
}

.botcustomize-face-label {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text-main);
}
.botcustomize-face-btn.active .botcustomize-face-label {
  color: #F06922;
}

.botcustomize-face-stars {
  font-size: 9px;
  color: var(--text-muted);
  font-weight: 600;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 2px;
}

.botcustomize-checkmark-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 16px;
  height: 16px;
  background: #F06922;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
}

.botcustomize-sounds-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.botcustomize-sound-btn {
  background: var(--item-bg);
  border: 2px solid var(--item-border);
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
.botcustomize-sound-btn:hover:not(:disabled) {
  background: var(--bg-card-hover);
  border-color: var(--border-card-hover);
}
.botcustomize-sound-btn.active {
  background: var(--bg-card-hover);
  border-color: #F06922;
}
.botcustomize-sound-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.botcustomize-sound-icon-wrapper {
  color: var(--text-main);
  display: flex;
  align-items: center;
}
.botcustomize-sound-btn.active .botcustomize-sound-icon-wrapper {
  color: #F06922;
}

.botcustomize-sound-label {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--text-muted);
}
.botcustomize-sound-btn.active .botcustomize-sound-label {
  color: #F06922;
}

.botcustomize-sound-soon {
  font-size: 8px;
  color: var(--text-muted);
  font-weight: 700;
  text-transform: uppercase;
}

.botcustomize-personalities-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.botcustomize-personality-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  width: 100%;
  text-align: left;
  background: var(--item-bg);
  border: 2px solid var(--item-border);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.25s ease;
  outline: none;
}
.botcustomize-personality-btn:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-card-hover);
}

.botcustomize-personality-icon-wrapper {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.botcustomize-personality-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 2px;
}

.botcustomize-personality-desc {
  font-size: 11.5px;
  color: var(--text-muted);
  font-weight: 500;
}

.botcustomize-times-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.botcustomize-time-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  display: block;
  margin-bottom: 8px;
}

.botcustomize-time-input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--input-border);
  font-size: 14.5px;
  font-weight: 700;
  color: var(--input-color);
  background: var(--input-bg);
  outline: none;
  transition: all 0.2s ease;
}
.botcustomize-time-input:focus {
  border-color: #F06922;
  box-shadow: 0 0 0 2px rgba(240, 105, 34, 0.15);
}

.botcustomize-features-card {
  background: linear-gradient(135deg, rgba(240,105,34,0.08) 0%, rgba(240,105,34,0.02) 100%);
  border: 1px solid rgba(240,105,34,0.2);
}

.botcustomize-features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.botcustomize-feature-item {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 550;
  display: flex;
  align-items: center;
  gap: 8px;
}

.botcustomize-feature-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #F06922;
  flex-shrink: 0;
}

.botcustomize-btn-primary {
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
.botcustomize-btn-primary::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
  pointer-events: none;
}
.botcustomize-btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(240, 105, 34, 0.35);
}
.botcustomize-btn-primary:active:not(:disabled) {
  transform: scale(0.98);
}
.botcustomize-btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .botcustomize-card {
    padding: 20px 16px;
    border-radius: 20px;
  }
  .botcustomize-faces-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .botcustomize-face-btn {
    padding: 12px 6px;
    border-radius: 12px;
  }
  .botcustomize-face-icon-wrapper svg {
    width: 22px;
    height: 22px;
  }
  .botcustomize-face-label {
    font-size: 11px;
  }
  .botcustomize-sounds-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  .botcustomize-sound-btn {
    padding: 10px 4px;
    border-radius: 10px;
  }
  .botcustomize-sound-label {
    font-size: 11px;
  }
  .botcustomize-personality-btn {
    padding: 12px 14px;
    border-radius: 12px;
  }
  .botcustomize-personality-icon-wrapper svg {
    width: 22px;
    height: 22px;
  }
  .botcustomize-personality-title {
    font-size: 13px;
  }
  .botcustomize-personality-desc {
    font-size: 11px;
  }
  .botcustomize-features-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .botcustomize-btn-primary {
    padding: 14px;
    font-size: 14.5px;
    border-radius: 12px;
  }
}

@keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
@keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px,-20px); } }
`;

export default function BotCustomizeScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [face, setFace] = useState('robot');
  const [sound, setSound] = useState('chime');
  const [personality, setPersonality] = useState('cheerful');
  const [sleepTime, setSleepTime] = useState('22:00');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [saving, setSaving] = useState(false);

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

  const faces = [
    {
      id: 'robot',
      label: 'Robot',
      stars: 0,
      unlocked: true,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
          <circle cx="12" cy="5" r="2"/>
          <path d="M12 7v4M8 15h.01M16 15h.01"/>
        </svg>
      )
    },
    {
      id: 'cat',
      label: 'Cat',
      stars: 20,
      unlocked: false,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
          <path d="M4 10l-2-4 5 1M20 10l2-4-5 1" />
        </svg>
      )
    },
    {
      id: 'dog',
      label: 'Dog',
      stars: 40,
      unlocked: false,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
          <path d="M5 8l-3 4 1 5M19 8l3 4-1 5" />
        </svg>
      )
    },
    {
      id: 'panda',
      label: 'Panda',
      stars: 60,
      unlocked: false,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
          <circle cx="16" cy="8" r="1.5" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 'bunny',
      label: 'Bunny',
      stars: 80,
      unlocked: false,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="14" r="7"/>
          <path d="M9 7c0-3 1-5 3-5s3 2 3 5M9 7v-1c0-2.5.5-4 1.5-4M15 7v-1c0-2.5-.5-4-1.5-4"/>
        </svg>
      )
    },
    {
      id: 'bear',
      label: 'Bear',
      stars: 100,
      unlocked: false,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="13" r="8"/>
          <circle cx="6" cy="6" r="2.5"/>
          <circle cx="18" cy="6" r="2.5"/>
        </svg>
      )
    },
  ];

  const sounds = [
    {
      id: 'chime',
      label: 'Chime',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      )
    },
    {
      id: 'melody',
      label: 'Melody',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      )
    },
    {
      id: 'beep',
      label: 'Beep',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="6" y1="21" x2="18" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      )
    },
    {
      id: 'voice',
      label: 'Voice',
      soon: true,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" />
        </svg>
      )
    },
  ];

  const personalities = [
    {
      id: 'cheerful',
      label: 'Cheerful Mode',
      desc: 'Enthusiastic, extremely positive motivational push messages',
      color: '#F59E0B',
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
      id: 'calm',
      label: 'Calm Mode',
      desc: 'Gentle, therapeutic, and soothing reminders',
      color: '#3B82F6',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 15h8"/>
          <line x1="9" y1="9" x2="10" y2="10"/>
          <line x1="15" y1="9" x2="14" y2="10"/>
        </svg>
      )
    },
    {
      id: 'strict',
      label: 'Strict Mode',
      desc: 'Firm, highly direct, no-nonsense pushes to keep you on track',
      color: '#EF4444',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
          <line x1="9" y1="10" x2="9.01" y2="10"/>
          <line x1="15" y1="10" x2="15.01" y2="10"/>
        </svg>
      )
    },
  ];

  const builtInFeatures = [
    '3 Mini Games (Snake, Memory)',
    '18 Dynamic Face Animations',
    'Interactive Health Quizzes',
    'Streak Tracker Multipliers',
    'Custom Sleep Timer Dims',
    '12+ Smooth RGB LED Patches',
  ];

  const handleSave = () => {
    setSaving(true);
    const config = { face, sound, personality, sleepTime, wakeTime };
    localStorage.setItem('botConfig', JSON.stringify(config));
    setTimeout(() => {
      setSaving(false);
      navigate('/bot-status');
    }, 1500);
  };

  return (
    <div className={`botcustomize-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <style>{CSS}</style>
      <SparkleBackground isDark={isDark} />

      <div style={{ position: 'absolute', top: -100, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)', animation: 'floatOrb2 10s ease-in-out infinite', pointerEvents: 'none' }} />

      <div className="botcustomize-wrap" style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Header */}
        <div className="botcustomize-header-row">
          <button onClick={() => navigate(-1)} className="botcustomize-btn-back">
            ← Back
          </button>
          <div>
            <h1 className="botcustomize-title">Customize Companion</h1>
            <p className="botcustomize-subtitle">Configure your physical companion bot preferences</p>
          </div>
        </div>

        {/* Face Type Selection */}
        <div className="botcustomize-card">
          <h3 className="botcustomize-section-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
              <line x1="9" y1="9" x2="9.01" y2="9"/>
              <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
            Face Display Theme
          </h3>
          <div className="botcustomize-faces-grid">
            {faces.map((f) => (
              <button
                key={f.id}
                onClick={() => f.unlocked && setFace(f.id)}
                disabled={!f.unlocked}
                className={`botcustomize-face-btn ${face === f.id ? 'active' : ''}`}
              >
                <span className="botcustomize-face-icon-wrapper">
                  {f.icon}
                </span>
                <span className="botcustomize-face-label">{f.label}</span>
                {!f.unlocked && (
                  <span className="botcustomize-face-stars">
                    🔒 {f.stars}⭐
                  </span>
                )}
                {face === f.id && (
                  <div className="botcustomize-checkmark-badge">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sound Theme Selection */}
        <div className="botcustomize-card">
          <h3 className="botcustomize-section-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            Passive Buzzer Sounds
          </h3>
          <div className="botcustomize-sounds-grid">
            {sounds.map((s) => (
              <button
                key={s.id}
                onClick={() => !s.soon && setSound(s.id)}
                disabled={s.soon}
                className={`botcustomize-sound-btn ${sound === s.id ? 'active' : ''}`}
              >
                <span className="botcustomize-sound-icon-wrapper">
                  {s.icon}
                </span>
                <span className="botcustomize-sound-label">{s.label}</span>
                {s.soon && <span className="botcustomize-sound-soon">Soon</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Personality Mode */}
        <div className="botcustomize-card">
          <h3 className="botcustomize-section-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Companion Personality
          </h3>
          <div className="botcustomize-personalities-list">
            {personalities.map((p) => (
              <button
                key={p.id}
                onClick={() => setPersonality(p.id)}
                className="botcustomize-personality-btn"
                style={{
                  borderColor: personality === p.id ? p.color : '',
                  background: personality === p.id ? `${p.color}08` : '',
                }}
              >
                <span className="botcustomize-personality-icon-wrapper" style={{
                  color: personality === p.id ? p.color : 'var(--text-muted)',
                }}>
                  {p.icon}
                </span>
                <div>
                  <h4 className="botcustomize-personality-title" style={{
                    color: personality === p.id ? p.color : 'var(--text-main)',
                  }}>
                    {p.label}
                  </h4>
                  <p className="botcustomize-personality-desc">{p.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sleep and Wake Schedule */}
        <div className="botcustomize-card">
          <h3 className="botcustomize-section-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
            </svg>
            Sleep Schedule (Dim Period)
          </h3>
          <div className="botcustomize-times-grid">
            <div>
              <label className="botcustomize-time-label">Sleeps At</label>
              <input
                type="time"
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
                className="botcustomize-time-input"
              />
            </div>
            <div>
              <label className="botcustomize-time-label">Wakes At</label>
              <input
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="botcustomize-time-input"
              />
            </div>
          </div>
        </div>

        {/* Features box */}
        <div className="botcustomize-card botcustomize-features-card">
          <h3 className="botcustomize-section-title" style={{ color: '#F06922' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="2"/>
              <path d="M6 12h4M8 10v4M15 11h.01M18 13h.01"/>
            </svg>
            Firmware Built-in Features
          </h3>
          <div className="botcustomize-features-grid">
            {builtInFeatures.map((f, i) => (
              <div key={i} className="botcustomize-feature-item">
                <div className="botcustomize-feature-dot" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Save and sync buttons */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="botcustomize-btn-primary"
        >
          {saving ? (
            <>
              <span style={{
                width: 20,
                height: 20,
                border: '2.5px solid rgba(255,255,255,0.3)',
                borderTopColor: '#FFF',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              Syncing configuration to Kiosk...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
              </svg>
              Save & Sync Preferences
            </>
          )}
        </button>
      </div>
    </div>
  );
}
