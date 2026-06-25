import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SparkleBackground from '../components/SparkleBackground';

const CSS = `
.formcheck-container {
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
.formcheck-container.dark-mode {
  --bg-card: rgba(27, 31, 23, 0.45);
  --bg-card-hover: rgba(35, 41, 30, 0.65);
  --text-main: #F7F4EC;
  --text-muted: #A0A596;
  --border-card: rgba(255, 92, 53, 0.15);
  --border-card-hover: rgba(255, 92, 53, 0.45);
  --orange: #FF5C35;
  --orange-light: #FF8566;
  --orange-pale: rgba(255, 92, 53, 0.15);
  --shadow-card: 0 24px 80px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.03);
  --shadow-hover: 0 32px 96px rgba(255, 92, 53, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  --box-working-bg: rgba(34, 197, 94, 0.08);
  --box-working-border: rgba(34, 197, 94, 0.25);
  --box-working-title: #22C55E;
  --box-work-bg: rgba(240, 105, 34, 0.08);
  --box-work-border: rgba(240, 105, 34, 0.2);
  --box-work-title: #F06922;
  --btn-secondary-bg: rgba(255, 255, 255, 0.03);
  --btn-secondary-border: rgba(255, 255, 255, 0.08);
  --btn-secondary-hover-bg: rgba(255, 255, 255, 0.07);
}

/* Light Mode Variable overrides */
.formcheck-container.light-mode {
  --bg-card: rgba(255, 255, 255, 0.75);
  --bg-card-hover: rgba(255, 255, 255, 0.95);
  --text-main: #11140F;
  --text-muted: #75786C;
  --border-card: rgba(255, 92, 53, 0.12);
  --border-card-hover: rgba(255, 92, 53, 0.35);
  --orange: #FF5C35;
  --orange-light: #FF8566;
  --orange-pale: rgba(255, 92, 53, 0.08);
  --shadow-card: 0 24px 80px rgba(240, 105, 34, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  --shadow-hover: 0 32px 96px rgba(240, 105, 34, 0.12), inset 0 1px 0 rgba(255, 255, 255, 1);
  --box-working-bg: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
  --box-working-border: rgba(34, 197, 94, 0.15);
  --box-working-title: #065F46;
  --box-work-bg: linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%);
  --box-work-border: rgba(240, 105, 34, 0.12);
  --box-work-title: #9A3412;
  --btn-secondary-bg: rgba(255, 255, 255, 0.9);
  --btn-secondary-border: rgba(0, 0, 0, 0.06);
  --btn-secondary-hover-bg: #FFFFFF;
}

.formcheck-card {
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

.formcheck-card:hover {
  border-color: var(--border-card-hover);
  box-shadow: var(--shadow-hover);
}

.formcheck-hero-badge {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%);
  border-radius: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: var(--orange);
  border: 2px solid var(--orange-pale);
  box-shadow: 0 12px 30px var(--orange-pale);
  animation: bounceIn 0.7s ease;
}

.formcheck-h1 {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 8px;
}

.formcheck-sub {
  font-size: 15px;
  color: var(--text-muted);
  margin-bottom: 6px;
}

.formcheck-avg-highlight {
  color: var(--orange);
  font-size: 18px;
  font-weight: 800;
}

.formcheck-motivate-text {
  font-size: 14px;
  color: #22C55E;
  font-weight: 700;
  margin-bottom: 28px;
}

.formcheck-box-working {
  background: var(--box-working-bg);
  border: 1px solid var(--box-working-border);
  border-radius: 20px;
  padding: 22px 24px;
  margin-bottom: 16px;
  text-align: left;
  box-shadow: 0 4px 20px rgba(34, 197, 94, 0.04);
}

.formcheck-box-title-green {
  font-size: 13.5px;
  font-weight: 800;
  color: var(--box-working-title);
  margin-top: 0;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.formcheck-box-needswork {
  background: var(--box-work-bg);
  border: 1px solid var(--box-work-border);
  border-radius: 20px;
  padding: 22px 24px;
  margin-bottom: 32px;
  text-align: left;
  box-shadow: 0 4px 20px rgba(240, 105, 34, 0.04);
}

.formcheck-box-title-orange {
  font-size: 13.5px;
  font-weight: 800;
  color: var(--box-work-title);
  margin-top: 0;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.formcheck-item {
  margin-bottom: 14px;
}
.formcheck-item:last-child {
  margin-bottom: 0;
}

.formcheck-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.formcheck-item-label {
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
}
.formcheck-box-working .formcheck-item-label {
  color: var(--box-working-title);
}
.formcheck-box-needswork .formcheck-item-label {
  color: var(--box-work-title);
}

.formcheck-item-value {
  font-size: 12px;
  font-weight: 600;
}
.formcheck-box-working .formcheck-item-value {
  color: #047857;
}
.formcheck-box-needswork .formcheck-item-value {
  color: #B45309;
}

.formcheck-warning-text {
  font-size: 12.5px;
  color: #B45309;
  margin-top: 10px;
  line-height: 1.5;
  font-weight: 500;
}
.formcheck-container.dark-mode .formcheck-warning-text {
  color: var(--orange-light);
}

/* Action Buttons */
.formcheck-buttons {
  display: grid;
  gap: 12px;
}

.formcheck-btn-primary {
  width: 100%;
  border: none;
  border-radius: 18px;
  padding: 18px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
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
  gap: 8px;
}
.formcheck-btn-primary::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
  pointer-events: none;
}
.formcheck-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 40px rgba(255, 92, 53, 0.45);
}
.formcheck-btn-primary:active {
  transform: scale(0.98);
}

.formcheck-btn-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.formcheck-btn-secondary {
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
.formcheck-btn-secondary:hover {
  background: var(--btn-secondary-hover-bg);
  border-color: var(--border-card-hover);
  color: var(--text-main);
  transform: translateY(-1px);
}

@media (max-width: 600px) {
  .formcheck-card {
    padding: 36px 24px;
  }
}

@media (max-width: 480px) {
  .formcheck-container {
    padding: 20px 12px;
  }
  .formcheck-card {
    padding: 24px 16px;
    border-radius: 24px;
  }
  .formcheck-hero-badge {
    width: 64px;
    height: 64px;
    border-radius: 18px;
    margin-bottom: 18px;
  }
  .formcheck-hero-badge svg {
    width: 28px;
    height: 28px;
  }
  .formcheck-h1 {
    font-size: 22px;
  }
  .formcheck-sub {
    font-size: 13.5px;
  }
  .formcheck-avg-highlight {
    font-size: 16px;
  }
  .formcheck-motivate-text {
    font-size: 12.5px;
    margin-bottom: 20px;
  }
  .formcheck-box-working,
  .formcheck-box-needswork {
    padding: 16px;
    border-radius: 16px;
    margin-bottom: 14px;
  }
  .formcheck-box-title-green,
  .formcheck-box-title-orange {
    font-size: 12px;
    margin-bottom: 12px;
  }
  .formcheck-item-label {
    font-size: 12px;
  }
  .formcheck-item-label svg {
    width: 12px;
    height: 12px;
    margin-right: 4px;
  }
  .formcheck-item-value {
    font-size: 11px;
  }
  .formcheck-warning-text {
    font-size: 11.5px;
  }
  .formcheck-buttons {
    gap: 10px;
  }
  .formcheck-btn-primary {
    padding: 14px;
    font-size: 15px;
    border-radius: 12px;
  }
  .formcheck-btn-secondary {
    padding: 12px;
    font-size: 13px;
    border-radius: 12px;
  }
  .formcheck-btn-split {
    gap: 10px;
  }
}

@keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
@keyframes bounceIn { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
@keyframes btnShimmer { 0% { left: -100%; } 100% { left: 200%; } }
@keyframes barShimmer { 0% { left: -100%; } 100% { left: 200%; } }
`;

export default function FormCheckScreen() {
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

  const progress = {
    water: { done: 22, target: 28, percent: 79 },
    meals: { done: 18, target: 21, percent: 86 },
    workouts: { done: 3, target: 5, percent: 60 },
  };
  const avgCompliance = Math.round((progress.water.percent + progress.meals.percent + progress.workouts.percent) / 3);

  useEffect(() => {
    setTimeout(() => setShow(true), 120);
    setTimeout(() => setAnimate(true), 500);
  }, []);

  const AnimatedBar = ({ percent, color, delay = 0 }) => (
    <div style={{ width: '100%', height: 10, background: 'rgba(0,0,0,0.04)', borderRadius: 5, overflow: 'hidden' }}>
      <div style={{
        width: animate ? `${percent}%` : '0%', height: '100%',
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
    <div className={`formcheck-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <style>{CSS}</style>
      <SparkleBackground isDark={isDark} />

      <div style={{ position: 'absolute', top: -100, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,105,34,0.06) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />

      <div className="formcheck-card" style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(20px)',
      }}>
        {/* Icon */}
        <div className="formcheck-hero-badge">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.4 14.4l5.6-5.6A2.83 2.83 0 0 0 16 4.8l-5.6 5.6M8.5 8.5L3.5 13.5M15.5 15.5l5 5M4.8 16a2.83 2.83 0 0 0 4 4l5.6-5.6-9.6-9.6z" />
          </svg>
        </div>

        <h1 className="formcheck-h1">Good Start! Keep Pushing!</h1>
        <p className="formcheck-sub">
          Average compliance: <strong className="formcheck-avg-highlight">{avgCompliance}%</strong>
        </p>
        <p className="formcheck-motivate-text">You're SO close to 80%! 🔥</p>

        {/* What's Working */}
        <div className="formcheck-box-working">
          <h3 className="formcheck-box-title-green">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 2 }}>
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            What's Working
          </h3>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <div className="formcheck-item-header">
                <span className="formcheck-item-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                    <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
                  </svg>
                  Meals — {progress.meals.percent}%
                </span>
                <span className="formcheck-item-value">{progress.meals.done}/{progress.meals.target}</span>
              </div>
              <AnimatedBar percent={progress.meals.percent} color="#22C55E" delay={0.1} />
            </div>
            <div>
              <div className="formcheck-item-header">
                <span className="formcheck-item-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                  </svg>
                  Water — {progress.water.percent}%
                </span>
                <span className="formcheck-item-value">{progress.water.done}/{progress.water.target}</span>
              </div>
              <AnimatedBar percent={progress.water.percent} color="#22C55E" delay={0.2} />
            </div>
          </div>
        </div>

        {/* What Needs Work */}
        <div className="formcheck-box-needswork">
          <h3 className="formcheck-box-title-orange">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 2 }}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            What Needs Work
          </h3>
          <div>
            <div className="formcheck-item-header">
              <span className="formcheck-item-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v8H2zM6 8v8M14 8v8"/>
                </svg>
                Workouts — {progress.workouts.percent}%
              </span>
              <span className="formcheck-item-value">{progress.workouts.done}/{progress.workouts.target}</span>
            </div>
            <AnimatedBar percent={progress.workouts.percent} color="#F06922" delay={0.3} />
            <p className="formcheck-warning-text">
              Missing {progress.workouts.target - progress.workouts.done} workouts this week. Just {Math.ceil((0.8 * (progress.water.target + progress.meals.target + progress.workouts.target) - progress.water.done - progress.meals.done - progress.workouts.done))} more actions = 80%!
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="formcheck-buttons">
          <button onClick={() => navigate('/todays-plan')} className="formcheck-btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.4 14.4l5.6-5.6A2.83 2.83 0 0 0 16 4.8l-5.6 5.6M8.5 8.5L3.5 13.5M15.5 15.5l5 5M4.8 16a2.83 2.83 0 0 0 4 4l5.6-5.6-9.6-9.6z" />
            </svg>
            I'll Push Harder
          </button>
          <div className="formcheck-btn-split">
            <button onClick={() => navigate('/make-easier')} className="formcheck-btn-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
              Make Easier
            </button>
            <button onClick={() => navigate('/todays-plan')} className="formcheck-btn-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              Today's Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
