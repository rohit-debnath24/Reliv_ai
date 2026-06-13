import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { C } from '../utils/constants';

export default function MealTimesScreen() {
  const navigate = useNavigate();
  const mealFreq = parseInt(localStorage.getItem('mealFreq')) || 3;
  
  const getMealConfig = () => {
    if (mealFreq === 5) {
      return [
        { id: 'breakfast', icon: '🍳', label: 'Breakfast', default: '08:00' },
        { id: 'snack1', icon: '🥤', label: 'Morning Snack', default: '10:30' },
        { id: 'lunch', icon: '🍲', label: 'Lunch', default: '13:00' },
        { id: 'snack2', icon: '🍌', label: 'Evening Snack', default: '16:30' },
        { id: 'dinner', icon: '🍛', label: 'Dinner', default: '20:00' }
      ];
    } else if (mealFreq === 4) {
      return [
        { id: 'breakfast', icon: '🍳', label: 'Breakfast', default: '08:00' },
        { id: 'snack', icon: '🥜', label: 'Snack', default: '11:00' },
        { id: 'lunch', icon: '🍲', label: 'Lunch', default: '13:00' },
        { id: 'dinner', icon: '🍛', label: 'Dinner', default: '20:00' }
      ];
    }
    return [
      { id: 'breakfast', icon: '🍳', label: 'Breakfast', default: '08:00' },
      { id: 'lunch', icon: '🍲', label: 'Lunch', default: '13:00' },
      { id: 'dinner', icon: '🍛', label: 'Dinner', default: '20:00' }
    ];
  };
  
  const mealConfig = getMealConfig();
  const [times, setTimes] = useState(() => {
    const obj = {};
    mealConfig.forEach(m => { obj[m.id] = m.default; });
    return obj;
  });

  return (
    <Layout title="Set Your Meal Times" subtitle="WhatsApp will remind you 15 minutes before each meal" showBack onBack={() => navigate(-1)}>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        {/* Meal Time Cards */}
        <div style={{ display: 'grid', gap: 14, marginBottom: 28 }}>
          {mealConfig.map(meal => (
            <div 
              key={meal.id} 
              style={{ 
                background: 'var(--white)', 
                borderRadius: 16, 
                padding: '18px 20px', 
                border: '1px solid #FFD296',
                boxShadow: '0 2px 10px rgba(240, 105, 34, 0.06)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: 12, 
                    background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEE5 100%)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: 24
                  }}>{meal.icon}</div>
                  <div>
                    <label style={{ display: 'block', fontSize: 15, fontWeight: 600, color: C.text }}>{meal.label}</label>
                    <p style={{ fontSize: 12, color: C.textDim }}>Reminder: {formatTime(times[meal.id], -15)}</p>
                  </div>
                </div>
                <input 
                  type="time" 
                  value={times[meal.id]} 
                  onChange={(e) => setTimes({ ...times, [meal.id]: e.target.value })} 
                  style={{ 
                    background: '#F9FAFB', 
                    border: '2px solid #E5E7EB', 
                    borderRadius: 10, 
                    padding: '12px 14px', 
                    fontSize: 16, 
                    color: C.text, 
                    outline: 'none',
                    fontWeight: 600,
                    width: 110,
                    textAlign: 'center'
                  }} 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Water Reminder Info */}
        <div style={{ 
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)', 
          border: '1px solid #93C5FD', 
          borderRadius: 14, 
          padding: '16px 20px', 
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 14
        }}>
          <span style={{ fontSize: 28 }}>💧</span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#1D4ED8' }}>Water reminders included!</p>
            <p style={{ fontSize: 12, color: '#3B82F6' }}>4 glasses spread throughout your day</p>
          </div>
        </div>

        {/* Continue Button */}
        <button 
          onClick={() => { localStorage.setItem('mealTimes', JSON.stringify(times)); navigate('/summary'); }} 
          style={{ 
            width: '100%', 
            background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', 
            border: 'none', 
            borderRadius: 14, 
            padding: '18px', 
            fontSize: 17, 
            fontWeight: 700, 
            color: 'var(--white)', 
            cursor: 'pointer',
            boxShadow: '0 6px 25px rgba(34, 197, 94, 0.35)',
            transition: 'all 0.2s'
          }}
        >
          ✓ Confirm Times
        </button>
      </div>
    </Layout>
  );
}

function formatTime(time, offsetMin) {
  const [h, m] = time.split(':').map(Number);
  const date = new Date(2000, 0, 1, h, m + offsetMin);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}
