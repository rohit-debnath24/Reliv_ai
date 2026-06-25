import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SparkleBackground from '../components/SparkleBackground';
import { C } from '../utils/constants';

const CSS = `
.mealtimes-container {
  min-height: 100vh;
  position: relative;
  transition: background 0.4s ease, color 0.4s ease;
}

/* Dark Mode Variable overrides */
.mealtimes-container.dark-mode {
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
  --shadow-card: 0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03);
  --shadow-hover: 0 20px 50px rgba(255, 92, 53, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  --btn-green: linear-gradient(135deg, #10B981 0%, #059669 100%);
  --btn-green-hover: linear-gradient(135deg, #34D399 0%, #10B981 100%);
  --btn-green-shadow: 0 8px 30px rgba(16, 185, 129, 0.35);
  --btn-green-hover-shadow: 0 14px 40px rgba(16, 185, 129, 0.5);
  --input-bg: rgba(0, 0, 0, 0.3);
  --input-border: rgba(255, 255, 255, 0.15);
}

/* Light Mode Variable overrides */
.mealtimes-container.light-mode {
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
  --shadow-card: 0 10px 30px rgba(255, 92, 53, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  --shadow-hover: 0 20px 50px rgba(255, 92, 53, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  --btn-green: linear-gradient(135deg, #10B981 0%, #059669 100%);
  --btn-green-hover: linear-gradient(135deg, #34D399 0%, #10B981 100%);
  --btn-green-shadow: 0 8px 30px rgba(16, 185, 129, 0.2);
  --btn-green-hover-shadow: 0 14px 40px rgba(16, 185, 129, 0.35);
  --input-bg: #FFFFFF;
  --input-border: #E5E7EB;
}

.mealtimes-wrap {
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.mealtimes-grid {
  display: grid;
  gap: 16px;
  margin-bottom: 32px;
}

.mealtimes-card {
  background: var(--bg-card);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 20px;
  border: 1.5px solid var(--border-card);
  padding: 18px 24px;
  box-shadow: var(--shadow-card);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.mealtimes-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-card-hover);
  background: var(--bg-card-hover);
  box-shadow: var(--shadow-hover);
}

.mealtimes-card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mealtimes-card-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.mealtimes-icon-box {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

/* Category specific outline glows */
.mealtimes-icon-box.breakfast {
  background: linear-gradient(135deg, rgba(255, 92, 53, 0.12) 0%, rgba(255, 92, 53, 0.03) 100%);
  border: 1px solid rgba(255, 92, 53, 0.25);
  color: #FF5C35;
}
.mealtimes-card:hover .mealtimes-icon-box.breakfast {
  border-color: #FF5C35;
  box-shadow: 0 0 15px rgba(255, 92, 53, 0.25);
  transform: scale(1.05);
}

.mealtimes-icon-box.snack {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.12) 0%, rgba(236, 72, 153, 0.03) 100%);
  border: 1px solid rgba(236, 72, 153, 0.25);
  color: #EC4899;
}
.mealtimes-card:hover .mealtimes-icon-box.snack {
  border-color: #EC4899;
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.25);
  transform: scale(1.05);
}

.mealtimes-icon-box.lunch {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.03) 100%);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #10B981;
}
.mealtimes-card:hover .mealtimes-icon-box.lunch {
  border-color: #10B981;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.25);
  transform: scale(1.05);
}

.mealtimes-icon-box.dinner {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0.03) 100%);
  border: 1px solid rgba(59, 130, 246, 0.25);
  color: #3B82F6;
}
.mealtimes-card:hover .mealtimes-icon-box.dinner {
  border-color: #3B82F6;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.25);
  transform: scale(1.05);
}

.mealtimes-card-label {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 3px;
  font-family: 'Fraunces', serif;
}

.mealtimes-card-sub {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
}

.mealtimes-input {
  background: var(--input-bg);
  border: 1.5px solid var(--input-border);
  border-radius: 12px;
  padding: 12px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
  outline: none;
  width: 120px;
  text-align: center;
  transition: all 0.25s ease;
  cursor: pointer;
}
.mealtimes-input:focus {
  border-color: var(--orange);
  box-shadow: 0 0 0 4px var(--orange-pale);
  background: var(--bg-card);
}

/* Water Info Banner */
.water-banner {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(37, 99, 235, 0.03) 100%);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 18px;
  padding: 18px 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.03);
}
.mealtimes-container.light-mode .water-banner {
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  border: 1px solid #93C5FD;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.05);
}

.water-banner-icon {
  font-size: 28px;
  animation: floatWater 3s infinite ease-in-out;
  flex-shrink: 0;
}
@keyframes floatWater {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.water-banner-title {
  font-size: 15px;
  font-weight: 700;
  color: #3B82F6;
  margin-bottom: 2px;
}
.mealtimes-container.light-mode .water-banner-title {
  color: #1D4ED8;
}

.water-banner-sub {
  font-size: 12.5px;
  color: var(--text-muted);
  font-weight: 500;
}

/* Confirm Button */
.confirm-btn {
  width: 100%;
  border: none;
  border-radius: 16px;
  padding: 18px;
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  background: var(--btn-green);
  color: #FFF;
  box-shadow: var(--btn-green-shadow);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}
.confirm-btn::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
  pointer-events: none;
}
.confirm-btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--btn-green-hover-shadow);
}
.confirm-btn:active {
  transform: scale(0.98);
}

@media (max-width: 480px) {
  .mealtimes-card {
    padding: 12px 14px;
    border-radius: 16px;
  }
  .mealtimes-card-left {
    gap: 12px;
  }
  .mealtimes-icon-box {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  .mealtimes-icon-box svg {
    width: 20px;
    height: 20px;
  }
  .mealtimes-card-label {
    font-size: 14px;
  }
  .mealtimes-card-sub {
    font-size: 11.5px;
  }
  .mealtimes-input {
    width: 96px;
    padding: 8px 10px;
    font-size: 14px;
    border-radius: 10px;
  }
  .water-banner {
    padding: 12px 16px;
    gap: 12px;
    margin-bottom: 20px;
    border-radius: 14px;
  }
  .water-banner-icon {
    font-size: 22px;
  }
  .water-banner-title {
    font-size: 13.5px;
  }
  .water-banner-sub {
    font-size: 12px;
  }
  .confirm-btn {
    padding: 14px;
    font-size: 15px;
    border-radius: 12px;
  }
}
`;

export default function MealTimesScreen() {
  const navigate = useNavigate();
  const mealFreq = parseInt(localStorage.getItem('mealFreq')) || 3;
  
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

  const getMealConfig = () => {
    if (mealFreq === 5) {
      return [
        { id: 'breakfast', type: 'breakfast', label: 'Breakfast', default: '08:00' },
        { id: 'snack1', type: 'snack', label: 'Morning Snack', default: '10:30' },
        { id: 'lunch', type: 'lunch', label: 'Lunch', default: '13:00' },
        { id: 'snack2', type: 'snack', label: 'Evening Snack', default: '16:30' },
        { id: 'dinner', type: 'dinner', label: 'Dinner', default: '20:00' }
      ];
    } else if (mealFreq === 4) {
      return [
        { id: 'breakfast', type: 'breakfast', label: 'Breakfast', default: '08:00' },
        { id: 'snack', type: 'snack', label: 'Snack', default: '11:00' },
        { id: 'lunch', type: 'lunch', label: 'Lunch', default: '13:00' },
        { id: 'dinner', type: 'dinner', label: 'Dinner', default: '20:00' }
      ];
    }
    return [
      { id: 'breakfast', type: 'breakfast', label: 'Breakfast', default: '08:00' },
      { id: 'lunch', type: 'lunch', label: 'Lunch', default: '13:00' },
      { id: 'dinner', type: 'dinner', label: 'Dinner', default: '20:00' }
    ];
  };
  
  const mealConfig = getMealConfig();
  const [times, setTimes] = useState(() => {
    const obj = {};
    mealConfig.forEach(m => { obj[m.id] = m.default; });
    return obj;
  });

  const renderLargeMealIcon = (type) => {
    switch (type) {
      case 'breakfast':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8zM6 2v2M10 2v2M14 2v2"/>
          </svg>
        );
      case 'snack':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8L21 10h-9L13 2z"/>
          </svg>
        );
      case 'lunch':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        );
      case 'dinner':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`mealtimes-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <style>{CSS}</style>
      <SparkleBackground isDark={isDark} />
      <Layout title="Set Your Meal Times" subtitle="WhatsApp will remind you 15 minutes before each meal" showBack onBack={() => navigate(-1)}>
        <div className="mealtimes-wrap">
          {/* Meal Time Cards */}
          <div className="mealtimes-grid">
            {mealConfig.map(meal => (
              <div key={meal.id} className="mealtimes-card">
                <div className="mealtimes-card-content">
                  <div className="mealtimes-card-left">
                    <div className={`mealtimes-icon-box ${meal.type}`}>{renderLargeMealIcon(meal.type)}</div>
                    <div>
                      <label className="mealtimes-card-label">{meal.label}</label>
                      <p className="mealtimes-card-sub">Reminder: {formatTime(times[meal.id] || meal.default, -15)}</p>
                    </div>
                  </div>
                  <input 
                    type="time" 
                    value={times[meal.id] || meal.default} 
                    onChange={(e) => setTimes({ ...times, [meal.id]: e.target.value })} 
                    className="mealtimes-input"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Water Reminder Info */}
          <div className="water-banner">
            <span className="water-banner-icon">💧</span>
            <div>
              <p className="water-banner-title">Water reminders included!</p>
              <p className="water-banner-sub">4 glasses spread throughout your day</p>
            </div>
          </div>

          {/* Continue Button */}
          <button 
            onClick={() => { localStorage.setItem('mealTimes', JSON.stringify(times)); navigate('/summary'); }} 
            className="confirm-btn"
            type="button"
          >
            ✓ Confirm Times
          </button>
        </div>
      </Layout>
    </div>
  );
}

function formatTime(time, offsetMin) {
  if (!time) return "";
  const [h, m] = time.split(':').map(Number);
  const date = new Date(2000, 0, 1, h, m + offsetMin);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}
