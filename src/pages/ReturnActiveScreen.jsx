import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SparkleBackground from '../components/SparkleBackground';

const CSS = `
.returnactive-container {
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
.returnactive-container.dark-mode {
  --bg-card: rgba(27, 31, 23, 0.45);
  --bg-card-hover: rgba(35, 41, 30, 0.65);
  --text-main: #F7F4EC;
  --text-muted: #A0A596;
  --border-card: rgba(34, 197, 94, 0.15);
  --border-card-hover: rgba(34, 197, 94, 0.4);
  --orange: #FF5C35;
  --orange-light: #FF8566;
  --orange-pale: rgba(255, 92, 53, 0.15);
  --shadow-card: 0 24px 80px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.03);
  --shadow-hover: 0 32px 96px rgba(34, 197, 94, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  --stat-green-bg: rgba(34, 197, 94, 0.08);
  --stat-orange-bg: rgba(240, 105, 34, 0.08);
  --progress-bg: rgba(255, 255, 255, 0.03);
  --progress-border: rgba(255, 255, 255, 0.06);
  --btn-secondary-bg: rgba(255, 255, 255, 0.03);
  --btn-secondary-border: rgba(255, 255, 255, 0.08);
  --btn-secondary-hover-bg: rgba(255, 255, 255, 0.07);
}

/* Light Mode Variable overrides */
.returnactive-container.light-mode {
  --bg-card: rgba(255, 255, 255, 0.75);
  --bg-card-hover: rgba(255, 255, 255, 0.95);
  --text-main: #11140F;
  --text-muted: #75786C;
  --border-card: rgba(34, 197, 94, 0.12);
  --border-card-hover: rgba(34, 197, 94, 0.35);
  --orange: #FF5C35;
  --orange-light: #FF8566;
  --orange-pale: rgba(255, 92, 53, 0.08);
  --shadow-card: 0 24px 80px rgba(34, 197, 94, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  --shadow-hover: 0 32px 96px rgba(34, 197, 94, 0.12), inset 0 1px 0 rgba(255, 255, 255, 1);
  --stat-green-bg: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
  --stat-orange-bg: linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%);
  --progress-bg: rgba(0, 0, 0, 0.02);
  --progress-border: rgba(0, 0, 0, 0.04);
  --btn-secondary-bg: rgba(255, 255, 255, 0.9);
  --btn-secondary-border: rgba(0, 0, 0, 0.06);
  --btn-secondary-hover-bg: #FFFFFF;
}

.returnactive-card {
  max-width: 540px;
  width: 100%;
  position: relative;
  z-index: 1;
  background: var(--bg-card);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: 32px;
  padding: 48px 40px;
  box-shadow: var(--shadow-card);
  border: 1px solid var(--border-card);
  text-align: center;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.returnactive-card:hover {
  border-color: var(--border-card-hover);
  box-shadow: var(--shadow-hover);
}

.returnactive-hero-badge {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
  border-radius: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: #FFF;
  box-shadow: 0 12px 30px rgba(34, 197, 94, 0.3);
  animation: bounceIn 0.7s ease;
}

.returnactive-h1 {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 6px;
}

.returnactive-sub {
  font-size: 15px;
  color: var(--text-muted);
  margin-bottom: 24px;
  line-height: 1.6;
}

.returnactive-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.returnactive-stat-card {
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.returnactive-stat-card.green {
  background: var(--stat-green-bg);
  border: 1px solid rgba(34, 197, 94, 0.15);
}
.returnactive-stat-card.green .returnactive-stat-number {
  color: #22C55E;
}
.returnactive-stat-card.green .returnactive-stat-label {
  color: #065F46;
}

.returnactive-stat-card.orange {
  background: var(--stat-orange-bg);
  border: 1px solid rgba(240, 105, 34, 0.15);
}
.returnactive-stat-card.orange .returnactive-stat-number {
  color: #F06922;
}
.returnactive-stat-card.orange .returnactive-stat-label {
  color: #9A3412;
}

.returnactive-stat-number {
  font-size: 34px;
  font-weight: 800;
  margin-bottom: 4px;
  line-height: 1;
}

.returnactive-stat-label {
  font-size: 11.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.returnactive-progress-box {
  background: var(--progress-bg);
  border: 1px solid var(--progress-border);
  border-radius: 22px;
  padding: 22px 24px;
  margin-bottom: 20px;
  text-align: left;
}

.returnactive-progress-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--text-main);
  margin-top: 0;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.returnactive-progress-item {
  margin-bottom: 14px;
}
.returnactive-progress-item:last-child {
  margin-bottom: 0;
}

.returnactive-progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.returnactive-progress-label {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 600;
  display: flex;
  align-items: center;
}

.returnactive-progress-value {
  font-size: 12.5px;
  font-weight: 700;
}

.returnactive-avg-box {
  margin-top: 16px;
  padding: 10px 14px;
  background: var(--bg-card);
  border: 1px solid var(--progress-border);
  border-radius: 12px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.returnactive-avg-label {
  font-size: 12.5px;
  color: var(--text-muted);
  font-weight: 600;
}

.returnactive-avg-value {
  font-size: 15px;
  font-weight: 800;
}

/* Bot status container */
.returnactive-bot-banner {
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(99, 102, 241, 0.03) 100%);
  border: 1px solid rgba(79, 70, 229, 0.2);
  border-radius: 16px;
  padding: 14px 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.04);
}
.returnactive-container.light-mode .returnactive-bot-banner {
  background: linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%);
}

.returnactive-bot-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: #4F46E5;
}

.returnactive-bot-btn {
  background: rgba(79, 70, 229, 0.1);
  border: 1px solid rgba(79, 70, 229, 0.2);
  border-radius: 10px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 700;
  color: #4F46E5;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}
.returnactive-bot-btn:hover {
  background: rgba(79, 70, 229, 0.18);
  transform: translateY(-1px);
}

/* Access Code card */
.returnactive-code-box {
  background: var(--progress-bg);
  border: 1px solid var(--progress-border);
  border-radius: 16px;
  padding: 14px 24px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.returnactive-code-label {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 600;
}

.returnactive-code-value {
  font-size: 20px;
  font-weight: 800;
  color: var(--orange);
  letter-spacing: 2px;
}

/* Buttons group */
.returnactive-buttons {
  display: grid;
  gap: 14px;
}

.returnactive-btn-primary {
  width: 100%;
  border: none;
  border-radius: 18px;
  padding: 18px;
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: #FFF;
  cursor: pointer;
  background: linear-gradient(135deg, var(--orange) 0%, var(--orange-light) 100%);
  box-shadow: 0 10px 30px rgba(255, 92, 53, 0.3);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.returnactive-btn-primary::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
  pointer-events: none;
}
.returnactive-btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 40px rgba(255, 92, 53, 0.45);
}
.returnactive-btn-primary:active {
  transform: scale(0.98);
}

.returnactive-btn-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.returnactive-btn-secondary {
  background: var(--btn-secondary-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--btn-secondary-border);
  border-radius: 16px;
  padding: 14px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
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
.returnactive-btn-secondary:hover {
  background: var(--btn-secondary-hover-bg);
  border-color: var(--border-card-hover);
  color: var(--text-main);
  transform: translateY(-1px);
}

@media (max-width: 600px) {
  .returnactive-card {
    padding: 36px 24px;
  }
}

@media (max-width: 480px) {
  .returnactive-container {
    padding: 20px 12px;
  }
  .returnactive-card {
    padding: 24px 16px;
    border-radius: 24px;
  }
  .returnactive-hero-badge {
    width: 60px;
    height: 60px;
    border-radius: 18px;
    margin-bottom: 16px;
  }
  .returnactive-hero-badge svg {
    width: 28px;
    height: 28px;
  }
  .returnactive-h1 {
    font-size: 22px;
  }
  .returnactive-sub {
    font-size: 13px;
    margin-bottom: 20px;
    line-height: 1.5;
  }
  .returnactive-stats-grid {
    gap: 10px;
    margin-bottom: 20px;
  }
  .returnactive-stat-card {
    padding: 12px 14px;
    border-radius: 16px;
  }
  .returnactive-stat-number {
    font-size: 24px;
    margin-bottom: 2px;
  }
  .returnactive-stat-label {
    font-size: 10px;
  }
  .returnactive-progress-box {
    padding: 16px;
    border-radius: 18px;
    margin-bottom: 16px;
  }
  .returnactive-progress-title {
    font-size: 12px;
    margin-bottom: 12px;
  }
  .returnactive-progress-label {
    font-size: 12px;
  }
  .returnactive-progress-label svg {
    width: 12px;
    height: 12px;
    margin-right: 4px;
  }
  .returnactive-progress-value {
    font-size: 11.5px;
  }
  .returnactive-avg-box {
    margin-top: 12px;
    padding: 8px 10px;
  }
  .returnactive-avg-label {
    font-size: 11.5px;
  }
  .returnactive-avg-value {
    font-size: 13.5px;
  }
  .returnactive-bot-banner {
    padding: 12px 16px;
    margin-bottom: 16px;
    border-radius: 12px;
  }
  .returnactive-bot-badge {
    font-size: 12px;
  }
  .returnactive-bot-btn {
    padding: 5px 10px;
    font-size: 11px;
  }
  .returnactive-code-box {
    padding: 10px 16px;
    margin-bottom: 20px;
  }
  .returnactive-code-label {
    font-size: 12px;
  }
  .returnactive-code-value {
    font-size: 17px;
  }
  .returnactive-buttons {
    gap: 10px;
  }
  .returnactive-btn-primary {
    padding: 14px;
    font-size: 15px;
    border-radius: 12px;
  }
  .returnactive-btn-secondary {
    padding: 12px;
    font-size: 13px;
    border-radius: 12px;
  }
  .returnactive-btn-split {
    gap: 10px;
  }
}

@keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
@keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px,-20px); } }
@keyframes bounceIn { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
@keyframes btnShimmer { 0% { left: -100%; } 100% { left: 200%; } }
@keyframes barShimmer { 0% { left: -100%; } 100% { left: 200%; } }
`;

export default function ReturnActiveScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

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

  const accessCode = localStorage.getItem('accessCode') || '6241';
  const daysLeft = 5;
  const hasBot = !!localStorage.getItem('botPairingCode');

  const progress = {
    water: { done: 22, target: 28 },
    meals: { done: 18, target: 21 },
    workouts: { done: 3, target: 5 },
  };
  const waterPct = Math.round((progress.water.done / progress.water.target) * 100);
  const mealsPct = Math.round((progress.meals.done / progress.meals.target) * 100);
  const workoutsPct = Math.round((progress.workouts.done / progress.workouts.target) * 100);
  const avgCompliance = Math.round((waterPct + mealsPct + workoutsPct) / 3);

  useEffect(() => {
    setTimeout(() => setShow(true), 120);
    setTimeout(() => setAnimate(true), 500);
  }, []);

  const handleContinue = () => {
    if (avgCompliance >= 80) navigate('/todays-plan');
    else if (avgCompliance >= 60) navigate('/form-check');
    else if (avgCompliance > 0) navigate('/make-easier');
    else navigate('/why-tracking');
  };

  const AnimatedBar = ({ percent, color, delay = 0 }) => (
    <div style={{ width: '100%', height: 10, background: 'rgba(0,0,0,0.04)', borderRadius: 5, overflow: 'hidden' }}>
      <div style={{
        width: animate ? `${Math.min(percent, 100)}%` : '0%', height: '100%',
        background: `linear-gradient(90deg, ${color}, ${color}CC)`,
        borderRadius: 5, transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          animation: 'barShimmer 2s infinite 1.5s',
        }} />
      </div>
    </div>
  );

  return (
    <div className={`returnactive-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <style>{CSS}</style>
      <SparkleBackground isDark={isDark} />

      <div style={{ position: 'absolute', top: -100, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', animation: 'floatOrb2 10s ease-in-out infinite', pointerEvents: 'none' }} />

      <div className="returnactive-card" style={{
        opacity: show ? 1 : 0,
        transform: show ? 'scale(1)' : 'scale(0.95)',
      }}>
        {/* Hero */}
        <div className="returnactive-hero-badge">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="returnactive-h1">Welcome Back</h1>
        <p className="returnactive-sub">Your plan is still active. Keep going!</p>

        {/* Stats Cards */}
        <div className="returnactive-stats-grid">
          <div className="returnactive-stat-card green">
            <p className="returnactive-stat-number">{daysLeft}</p>
            <p className="returnactive-stat-label">Days Left</p>
          </div>
          <div className="returnactive-stat-card orange">
            <p className="returnactive-stat-number">7</p>
            <p className="returnactive-stat-label">Day Streak</p>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="returnactive-progress-box">
          <h3 className="returnactive-progress-title">📊 This Week's Progress</h3>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { 
                label: 'Water', 
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                  </svg>
                ),
                pct: waterPct, 
                data: progress.water, 
                color: '#3B82F6', 
                delay: 0.1 
              },
              { 
                label: 'Meals', 
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                    <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
                  </svg>
                ),
                pct: mealsPct, 
                data: progress.meals, 
                color: '#22C55E', 
                delay: 0.2 
              },
              { 
                label: 'Workouts', 
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v8H2zM6 8v8M14 8v8"/>
                  </svg>
                ),
                pct: workoutsPct, 
                data: progress.workouts, 
                color: '#F06922', 
                delay: 0.3 
              },
            ].map((item, i) => (
              <div key={i} className="returnactive-progress-item">
                <div className="returnactive-progress-header">
                  <span className="returnactive-progress-label">
                    {item.icon}
                    {item.label}
                  </span>
                  <span className="returnactive-progress-value" style={{ color: item.color }}>{item.data.done}/{item.data.target} ({item.pct}%)</span>
                </div>
                <AnimatedBar percent={item.pct} color={item.color} delay={item.delay} />
              </div>
            ))}
          </div>
          <div className="returnactive-avg-box">
            <span className="returnactive-avg-label">Average Compliance: </span>
            <span className="returnactive-avg-value" style={{
              color: avgCompliance >= 80 ? '#22C55E' : avgCompliance >= 60 ? '#F59E0B' : '#EF4444',
            }}>{avgCompliance}%</span>
          </div>
        </div>

        {/* Bot Status */}
        {hasBot && (
          <div className="returnactive-bot-banner">
            <div className="returnactive-bot-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2"/>
                <circle cx="12" cy="5" r="2"/>
                <path d="M12 7v4M8 15h.01M16 15h.01"/>
              </svg>
              <span>Bot: Online 🟢</span>
            </div>
            <button onClick={() => navigate('/bot-status')} className="returnactive-bot-btn">View →</button>
          </div>
        )}

        {/* Access Code */}
        <div className="returnactive-code-box">
          <span className="returnactive-code-label">🔑 Your Code</span>
          <span className="returnactive-code-value">{accessCode}</span>
        </div>

        {/* Buttons */}
        <div className="returnactive-buttons">
          <button onClick={handleContinue} className="returnactive-btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            View Today's Plan
          </button>
          <div className="returnactive-btn-split">
            <button onClick={() => navigate('/update-settings')} className="returnactive-btn-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              Settings
            </button>
            <button onClick={() => navigate('/')} className="returnactive-btn-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
