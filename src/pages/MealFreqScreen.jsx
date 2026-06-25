import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SparkleBackground from '../components/SparkleBackground';
import { C } from '../utils/constants';

const CSS = `
.mealfreq-container {
  min-height: 100vh;
  position: relative;
  transition: background 0.4s ease, color 0.4s ease;
}

/* Dark Mode Variable overrides */
.mealfreq-container.dark-mode {
  --bg-main: #11140F;
  --bg-card: rgba(27, 31, 23, 0.45);
  --bg-card-hover: rgba(35, 41, 30, 0.65);
  --text-main: #F7F4EC;
  --text-muted: #A0A596;
  --border-card: rgba(255, 92, 53, 0.15);
  --border-card-hover: rgba(255, 92, 53, 0.45);
  --orange: #FF5C35;
  --orange-light: #FF8566;
  --orange-pale: rgba(255, 92, 53, 0.15);
  --shadow-card: 0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03);
  --shadow-hover: 0 20px 50px rgba(255, 92, 53, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  --btn-cta-shadow: 0 10px 40px rgba(255, 92, 53, 0.35);
  --btn-cta-hover-shadow: 0 16px 56px rgba(255, 92, 53, 0.5);
  --pill-bg: rgba(255, 255, 255, 0.04);
  --pill-border: rgba(255, 255, 255, 0.08);
  --pill-text: #A0A596;
}

/* Light Mode Variable overrides */
.mealfreq-container.light-mode {
  --bg-main: #F9F6F0;
  --bg-card: rgba(255, 255, 255, 0.65);
  --bg-card-hover: rgba(255, 255, 255, 0.85);
  --text-main: #11140F;
  --text-muted: #75786C;
  --border-card: rgba(255, 92, 53, 0.12);
  --border-card-hover: rgba(255, 92, 53, 0.35);
  --orange: #FF5C35;
  --orange-light: #FF8566;
  --orange-pale: rgba(255, 92, 53, 0.08);
  --shadow-card: 0 10px 30px rgba(255, 92, 53, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  --shadow-hover: 0 20px 50px rgba(255, 92, 53, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  --btn-cta-shadow: 0 10px 40px rgba(255, 92, 53, 0.2);
  --btn-cta-hover-shadow: 0 16px 56px rgba(255, 92, 53, 0.35);
  --pill-bg: rgba(0, 0, 0, 0.03);
  --pill-border: rgba(0, 0, 0, 0.05);
  --pill-text: #75786C;
}

.mealfreq-wrap {
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.mealfreq-grid {
  display: grid;
  gap: 16px;
  margin-bottom: 32px;
}

.mealfreq-card {
  background: var(--bg-card);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 20px;
  border: 1.5px solid var(--border-card);
  padding: 24px;
  cursor: pointer;
  text-align: left;
  box-shadow: var(--shadow-card);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  width: 100%;
  outline: none;
}

.mealfreq-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-card-hover);
  background: var(--bg-card-hover);
  box-shadow: var(--shadow-hover);
}

.mealfreq-card.active {
  background: var(--bg-card-hover);
  border-color: var(--orange);
  box-shadow: var(--shadow-hover);
}

/* Shine Sweep Effect */
.mealfreq-card::after {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: linear-gradient(
    45deg,
    transparent 45%,
    rgba(255, 255, 255, 0.04) 48%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.04) 52%,
    transparent 55%
  );
  transform: rotate(-45deg) translate(-70%, -70%);
  transition: transform 0.6s ease;
  pointer-events: none;
}
.mealfreq-container.light-mode .mealfreq-card::after {
  background: linear-gradient(
    45deg,
    transparent 45%,
    rgba(255, 255, 255, 0.12) 48%,
    rgba(255, 255, 255, 0.32) 50%,
    rgba(255, 255, 255, 0.12) 52%,
    transparent 55%
  );
}
.mealfreq-card:hover::after {
  transform: rotate(-45deg) translate(70%, 70%);
}

.mealfreq-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.mealfreq-title {
  font-family: 'Fraunces', serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 3px;
}

.mealfreq-desc {
  font-size: 13.5px;
  color: var(--text-muted);
}

.mealfreq-checkbox {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2.5px solid var(--border-card);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  flex-shrink: 0;
}
.mealfreq-card.active .mealfreq-checkbox {
  border-color: var(--orange);
  background: var(--orange);
  box-shadow: 0 0 12px var(--orange-pale);
  transform: scale(1.06);
}

.mealfreq-badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  position: relative;
  z-index: 3;
}

.mealfreq-badge {
  font-size: 11.5px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 10px;
  border: 1px solid var(--pill-border);
  background: var(--pill-bg);
  color: var(--pill-text);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
}

.mealfreq-badge svg {
  margin-right: 6px;
  flex-shrink: 0;
  opacity: 0.8;
}

.mealfreq-card.active .mealfreq-badge {
  background: var(--orange-pale);
  border-color: rgba(255, 92, 53, 0.25);
  color: var(--orange);
}

/* Info Banner */
.whatsapp-banner {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.03) 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.03);
}
.mealfreq-container.light-mode .whatsapp-banner {
  background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
  border: 1px solid #A7F3D0;
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.05);
}
.whatsapp-banner-icon {
  font-size: 22px;
  animation: floatIcon 2.5s infinite ease-in-out;
  flex-shrink: 0;
}
@keyframes floatIcon {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
.whatsapp-banner-text {
  font-size: 13.5px;
  font-weight: 600;
  color: #10B981;
  line-height: 1.4;
}
.mealfreq-container.light-mode .whatsapp-banner-text {
  color: #059669;
}

/* Continue Button */
.mealfreq-btn {
  width: 100%;
  border: none;
  border-radius: 16px;
  padding: 18px;
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  font-weight: 700;
  cursor: not-allowed;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}
.mealfreq-container.light-mode .mealfreq-btn {
  background: #E5E7EB;
  border: none;
  color: #9CA3AF;
}

.mealfreq-btn.enabled {
  background: linear-gradient(135deg, var(--orange) 0%, var(--orange-light) 100%);
  border: none;
  color: #FFF;
  cursor: pointer;
  box-shadow: var(--btn-cta-shadow);
}
.mealfreq-btn.enabled::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
  pointer-events: none;
}
.mealfreq-btn.enabled:hover {
  transform: translateY(-3px);
  box-shadow: var(--btn-cta-hover-shadow);
}
.mealfreq-btn.enabled:active {
  transform: scale(0.98);
}
`;

export default function MealFreqScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  
  const mealOptions = [
    { 
      id: 3, 
      label: '3 Meals', 
      desc: 'Standard meal plan', 
      meals: [
        { type: 'breakfast', name: 'Breakfast' }, 
        { type: 'lunch', name: 'Lunch' }, 
        { type: 'dinner', name: 'Dinner' }
      ] 
    },
    { 
      id: 4, 
      label: '4 Meals', 
      desc: 'With afternoon snack', 
      meals: [
        { type: 'breakfast', name: 'Breakfast' }, 
        { type: 'snack', name: 'Snack' }, 
        { type: 'lunch', name: 'Lunch' }, 
        { type: 'dinner', name: 'Dinner' }
      ] 
    },
    { 
      id: 5, 
      label: '5 Meals', 
      desc: 'For muscle building', 
      meals: [
        { type: 'breakfast', name: 'Breakfast' }, 
        { type: 'snack', name: 'Snack' }, 
        { type: 'lunch', name: 'Lunch' }, 
        { type: 'snack', name: 'Snack' }, 
        { type: 'dinner', name: 'Dinner' }
      ] 
    }
  ];

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

  const renderMealIcon = (type) => {
    switch (type) {
      case 'breakfast':
        return (
          <svg className="meal-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8zM6 2v2M10 2v2M14 2v2"/>
          </svg>
        );
      case 'snack':
        return (
          <svg className="meal-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8L21 10h-9L13 2z"/>
          </svg>
        );
      case 'lunch':
        return (
          <svg className="meal-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        );
      case 'dinner':
        return (
          <svg className="meal-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`mealfreq-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <style>{CSS}</style>
      <SparkleBackground isDark={isDark} />
      <Layout title="How many meals per day?" subtitle="We'll remind you for each meal at your preferred times" showBack onBack={() => navigate(-1)}>
        <div className="mealfreq-wrap">
          <div className="mealfreq-grid">
            {mealOptions.map(m => (
              <button 
                key={m.id} 
                onClick={() => setSelected(m.id)} 
                className={`mealfreq-card ${selected === m.id ? 'active' : ''}`}
                type="button"
              >
                <div className="mealfreq-card-header">
                  <div>
                    <h3 className="mealfreq-title">{m.label}</h3>
                    <p className="mealfreq-desc">{m.desc}</p>
                  </div>
                  <div className="mealfreq-checkbox">
                    {selected === m.id && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                </div>
                <div className="mealfreq-badge-row">
                  {m.meals.map((meal, i) => (
                    <span key={i} className="mealfreq-badge">
                      {renderMealIcon(meal.type)}
                      {meal.name}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Info Banner */}
          <div className="whatsapp-banner">
            <span className="whatsapp-banner-icon">💡</span>
            <p className="whatsapp-banner-text">WhatsApp will remind you 15 min before each meal!</p>
          </div>

          {/* Continue Button */}
          <button 
            onClick={() => { localStorage.setItem('mealFreq', selected); navigate('/meal-times'); }} 
            disabled={!selected} 
            className={`mealfreq-btn ${selected ? 'enabled' : ''}`}
            type="button"
          >
            Set Meal Times →
          </button>
        </div>
      </Layout>
    </div>
  );
}
