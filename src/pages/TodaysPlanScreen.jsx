import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SparkleBackground from '../components/SparkleBackground';

const CSS = `
.todaysplan-container {
  min-height: 100vh;
  background: transparent;
  font-family: 'Inter', 'Outfit', sans-serif;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  transition: background 0.4s ease, color 0.4s ease;
}

/* Dark Mode Variable overrides */
.todaysplan-container.dark-mode {
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
  --box-working-bg: rgba(34, 197, 94, 0.08);
  --box-working-border: rgba(34, 197, 94, 0.25);
  --box-working-title: #22C55E;
  --btn-secondary-bg: rgba(255, 255, 255, 0.03);
  --btn-secondary-border: rgba(255, 255, 255, 0.08);
  --btn-secondary-hover-bg: rgba(255, 255, 255, 0.07);
}

/* Light Mode Variable overrides */
.todaysplan-container.light-mode {
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
  --box-working-bg: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
  --box-working-border: rgba(34, 197, 94, 0.15);
  --box-working-title: #065F46;
  --btn-secondary-bg: rgba(255, 255, 255, 0.9);
  --btn-secondary-border: rgba(0, 0, 0, 0.06);
  --btn-secondary-hover-bg: #FFFFFF;
}

.todaysplan-wrap {
  position: relative;
  z-index: 1;
  max-width: 540px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.todaysplan-card {
  width: 100%;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 28px;
  padding: 32px 28px;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
}
.todaysplan-card:hover {
  border-color: var(--border-card-hover);
  box-shadow: var(--shadow-hover);
}

.todaysplan-header {
  text-align: center;
  padding-bottom: 20px;
}

.todaysplan-divider {
  height: 1px;
  background: var(--border-card);
  margin-bottom: 20px;
}

.todaysplan-hero-badge {
  width: 76px;
  height: 76px;
  background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: #FFF;
  box-shadow: 0 10px 24px rgba(34, 197, 94, 0.25);
  animation: bounceIn 0.7s ease;
}

.todaysplan-h1 {
  font-family: 'Fraunces', serif;
  font-size: 26px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 6px;
}

.todaysplan-sub {
  font-size: 14.5px;
  color: var(--text-muted);
  line-height: 1.5;
}

.todaysplan-title-row {
  font-size: 13px;
  font-weight: 800;
  color: var(--text-main);
  margin-top: 0;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.todaysplan-grid {
  display: grid;
  gap: 12px;
}

.todaysplan-item {
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 18px;
  padding: 12px 18px;
  border: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.todaysplan-item:hover {
  transform: translateY(-2px);
  background: var(--bg-card-hover) !important;
  border-color: var(--border-card-hover) !important;
  box-shadow: var(--shadow-hover);
}

.todaysplan-item-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.todaysplan-item-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 2px 0;
}

.todaysplan-item-sub {
  font-size: 12px;
  color: var(--text-muted);
  margin: 0;
}

.todaysplan-item-badge {
  border-radius: 10px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 700;
  transition: all 0.2s ease;
}

/* Next Reminder */
.todaysplan-reminder-banner {
  margin-top: 20px;
  background: var(--box-working-bg);
  border: 1px solid var(--box-working-border);
  border-radius: 20px;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 6px 24px rgba(34, 197, 94, 0.05);
  transition: all 0.3s ease;
}

.todaysplan-reminder-banner:hover {
  transform: translateY(-2px);
  border-color: var(--border-card-hover);
}

.todaysplan-reminder-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(34, 197, 94, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #16A34A;
  flex-shrink: 0;
}

.todaysplan-reminder-title {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--box-working-title);
  margin: 0 0 2px 0;
}

.todaysplan-reminder-sub {
  font-size: 12px;
  color: var(--text-muted);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.todaysplan-reminder-sub svg {
  width: 14px;
  height: 14px;
}

/* Action Buttons */
.todaysplan-buttons {
  margin-top: 20px;
  width: 100%;
  display: grid;
  gap: 12px;
}

.todaysplan-btn-primary {
  width: 100%;
  border: none;
  border-radius: 16px;
  padding: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #FFF;
  cursor: pointer;
  background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
  box-shadow: 0 8px 24px rgba(34, 197, 94, 0.25);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.todaysplan-btn-primary::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
  pointer-events: none;
}
.todaysplan-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(34, 197, 94, 0.35);
}
.todaysplan-btn-primary:active {
  transform: scale(0.98);
}

.todaysplan-btn-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.todaysplan-btn-secondary {
  background: var(--btn-secondary-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--btn-secondary-border);
  border-radius: 14px;
  padding: 14px;
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
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
.todaysplan-btn-secondary:hover {
  background: var(--btn-secondary-hover-bg);
  border-color: var(--border-card-hover);
  color: var(--text-main);
  transform: translateY(-1px);
}

@media (max-width: 600px) {
  .todaysplan-card {
    padding: 32px 24px;
  }
}

@media (max-width: 480px) {
  .todaysplan-container {
    padding: 20px 12px;
  }
  .todaysplan-card {
    padding: 20px 16px;
    border-radius: 24px;
  }
  .todaysplan-hero-badge {
    width: 64px;
    height: 64px;
    border-radius: 18px;
    margin-bottom: 16px;
  }
  .todaysplan-hero-badge svg {
    width: 28px;
    height: 28px;
  }
  .todaysplan-h1 {
    font-size: 22px;
  }
  .todaysplan-sub {
    font-size: 13.5px;
  }
  .todaysplan-title-row {
    font-size: 12px;
    margin-bottom: 12px;
  }
  .todaysplan-title-row svg {
    width: 14px;
    height: 14px;
  }
  .todaysplan-grid {
    gap: 10px;
  }
  .todaysplan-item {
    padding: 12px 16px;
    border-radius: 14px;
    gap: 12px;
  }
  .todaysplan-item-icon-box {
    width: 36px;
    height: 36px;
    border-radius: 12px;
  }
  .todaysplan-item-icon-box svg {
    width: 18px;
    height: 18px;
  }
  .todaysplan-item-title {
    font-size: 14px;
  }
  .todaysplan-item-sub {
    font-size: 11px;
  }
  .todaysplan-item-badge {
    padding: 5px 10px;
    font-size: 11px;
    border-radius: 8px;
  }
  .todaysplan-reminder-banner {
    margin-top: 20px;
    padding: 14px 16px;
    border-radius: 16px;
    gap: 12px;
  }
  .todaysplan-reminder-icon-box {
    width: 36px;
    height: 36px;
    border-radius: 10px;
  }
  .todaysplan-reminder-icon-box svg {
    width: 18px;
    height: 18px;
  }
  .todaysplan-reminder-title {
    font-size: 13px;
  }
  .todaysplan-reminder-sub {
    font-size: 11px;
  }
  .todaysplan-buttons {
    margin-top: 20px;
    gap: 10px;
  }
  .todaysplan-btn-primary {
    padding: 14px;
    font-size: 14px;
    border-radius: 12px;
  }
  .todaysplan-btn-secondary {
    padding: 12px;
    font-size: 13px;
    border-radius: 12px;
  }
  .todaysplan-btn-split {
    gap: 10px;
  }
}

@keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
@keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px,-20px); } }
@keyframes bounceIn { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
@keyframes slideIn { 0% { opacity: 0; transform: translateX(-12px); } 100% { opacity: 1; transform: translateX(0); } }
`;

export default function TodaysPlanScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

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

  const category = localStorage.getItem('category') || 'fitness';

  const tasks = [
    { 
      label: 'Water', 
      done: 0, 
      target: 5, 
      unit: 'glasses', 
      nextTime: '11:00 AM', 
      color: '#3B82F6', 
      bg: '#EFF6FF',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        </svg>
      )
    },
    { 
      label: 'Meals', 
      done: 0, 
      target: 3, 
      unit: 'meals', 
      nextTime: '1:00 PM', 
      color: '#22C55E', 
      bg: '#F0FDF4',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
        </svg>
      )
    },
    { 
      label: 'Workout', 
      done: 0, 
      target: 1, 
      unit: 'session', 
      nextTime: '6:00 PM', 
      color: '#F06922', 
      bg: '#FFF7ED',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v8H2zM6 8v8M14 8v8"/>
        </svg>
      )
    },
  ];

  if (category === 'acne') {
    tasks.push({ 
      label: 'Facewash', 
      done: 0, 
      target: 2, 
      unit: 'times', 
      nextTime: '7:00 AM', 
      color: '#8B5CF6', 
      bg: '#F5F3FF',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )
    });
  }

  const nextReminder = tasks.reduce((earliest, t) => (!earliest ? t : t.nextTime < earliest.nextTime ? t : earliest), null);

  useEffect(() => {
    setTimeout(() => setShow(true), 120);
  }, []);

  return (
    <div className={`todaysplan-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <style>{CSS}</style>
      <SparkleBackground isDark={isDark} />

      <div style={{ position: 'absolute', top: -100, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,105,34,0.06) 0%, transparent 70%)', animation: 'floatOrb2 10s ease-in-out infinite', pointerEvents: 'none' }} />

      <div className="todaysplan-wrap" style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(24px)',
      }}>
        <div className="todaysplan-card">
          {/* Header */}
          <div className="todaysplan-header">
            <div className="todaysplan-hero-badge">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h1 className="todaysplan-h1">Doing Great</h1>
            <p className="todaysplan-sub">Your compliance is above 80%. Keep it up!</p>
          </div>

          <div className="todaysplan-divider" />

          {/* Today's Tasks */}
          <h3 className="todaysplan-title-row">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            Today's Tasks
          </h3>

          <div className="todaysplan-grid">
            {tasks.map((task, i) => {
              const taskBg = isDark ? 'rgba(255, 255, 255, 0.03)' : task.bg;
              const taskBorder = isDark ? 'rgba(255, 255, 255, 0.06)' : `${task.color}15`;

              return (
                <div key={i} className="todaysplan-item" style={{
                  background: taskBg,
                  border: `1px solid ${taskBorder}`,
                  boxShadow: isDark ? 'none' : `0 4px 16px ${task.color}08`,
                  animation: `slideIn 0.4s ease ${i * 0.08}s both`,
                }}>
                  <div className="todaysplan-item-icon-box" style={{
                    background: `${task.color}15`,
                    color: task.color,
                  }}>
                    {task.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className="todaysplan-item-title">{task.label}</p>
                    <p className="todaysplan-item-sub">{task.done}/{task.target} {task.unit} today</p>
                  </div>
                  <div className="todaysplan-item-badge" style={{
                    background: task.done >= task.target ? 'rgba(34, 197, 94, 0.1)' : `${task.color}12`,
                    color: task.done >= task.target ? '#16A34A' : task.color,
                    border: `1px solid ${task.done >= task.target ? '#22C55E' : task.color}20`,
                  }}>
                    {task.done >= task.target ? '✓ Done' : `${task.done}/${task.target}`}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next Reminder */}
          {nextReminder && (
            <div className="todaysplan-reminder-banner">
              <div className="todaysplan-reminder-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <p className="todaysplan-reminder-title">Next: {nextReminder.nextTime}</p>
                <div className="todaysplan-reminder-sub">
                  <span style={{ display: 'inline-flex', alignItems: 'center', color: nextReminder.color }}>
                    {nextReminder.icon}
                  </span>
                  <span>{nextReminder.label}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="todaysplan-buttons">
            <button onClick={() => navigate('/wa-preview')} className="todaysplan-btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Continue Current Plan
            </button>

            <div className="todaysplan-btn-split">
              <button onClick={() => navigate('/update-settings')} className="todaysplan-btn-secondary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
                Settings
              </button>
              <button onClick={() => navigate('/bot-status')} className="todaysplan-btn-secondary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2"/>
                  <circle cx="12" cy="5" r="2"/>
                  <path d="M12 7v4M8 15h.01M16 15h.01"/>
                </svg>
                Bot Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
