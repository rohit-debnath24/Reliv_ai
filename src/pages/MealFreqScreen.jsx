import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SparkleBackground from '../components/SparkleBackground';
import { C } from '../utils/constants';

export default function MealFreqScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  
  const mealOptions = [
    { id: 3, label: '3 Meals', desc: 'Standard meal plan', meals: ['🍳 Breakfast', '🍲 Lunch', '🍛 Dinner'] },
    { id: 4, label: '4 Meals', desc: 'With afternoon snack', meals: ['🍳 Breakfast', '🥜 Snack', '🍲 Lunch', '🍛 Dinner'] },
    { id: 5, label: '5 Meals', desc: 'For muscle building', meals: ['🍳 Breakfast', '🥤 Snack', '🍲 Lunch', '🍌 Snack', '🍛 Dinner'] }
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

  return (
    <>
      <SparkleBackground isDark={isDark} />
      <Layout title="How many meals per day?" subtitle="We'll remind you for each meal at your preferred times" showBack onBack={() => navigate(-1)}>
        <div style={{ maxWidth: 500, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gap: 14, marginBottom: 28 }}>
          {mealOptions.map(m => (
            <button 
              key={m.id} 
              onClick={() => setSelected(m.id)} 
              style={{ 
                background: selected === m.id 
                  ? (isDark ? 'rgba(240, 105, 34, 0.15)' : '#FFF5F0') 
                  : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFF'), 
                border: `2px solid ${selected === m.id ? '#F06922' : (isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB')}`, 
                borderRadius: 16, 
                padding: '20px 24px', 
                cursor: 'pointer', 
                textAlign: 'left',
                boxShadow: selected === m.id 
                  ? (isDark ? '0 8px 30px rgba(240, 105, 34, 0.2)' : '0 4px 20px rgba(240, 105, 34, 0.15)') 
                  : 'none',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: isDark ? '#FFF' : '#111' }}>{m.label}</h3>
                  <p style={{ fontSize: 13, color: isDark ? 'rgba(255,255,255,0.6)' : '#666' }}>{m.desc}</p>
                </div>
                <div style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: '50%', 
                  border: `2px solid ${selected === m.id ? '#F06922' : (isDark ? 'rgba(255,255,255,0.2)' : '#E5E7EB')}`,
                  background: selected === m.id ? '#F06922' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {selected === m.id && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {m.meals.map((meal, i) => (
                  <span key={i} style={{ 
                    fontSize: 12, 
                    color: selected === m.id ? '#F06922' : (isDark ? 'rgba(255,255,255,0.7)' : '#666'), 
                    background: selected === m.id ? (isDark ? 'rgba(240, 105, 34, 0.2)' : '#F0692212') : (isDark ? 'rgba(255,255,255,0.1)' : '#F3F4F6'), 
                    padding: '6px 12px', 
                    borderRadius: 8,
                    fontWeight: 500
                  }}>{meal}</span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Info */}
        <div style={{ 
          background: isDark ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%)' : 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)', 
          border: isDark ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid #A7F3D0', 
          borderRadius: 14, 
          padding: '14px 18px', 
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <span style={{ fontSize: 20 }}>💡</span>
          <p style={{ fontSize: 13, color: isDark ? '#34D399' : '#059669', fontWeight: 500 }}>WhatsApp will remind you 15 min before each meal!</p>
        </div>

        {/* Continue Button */}
        <button 
          onClick={() => { localStorage.setItem('mealFreq', selected); navigate('/meal-times'); }} 
          disabled={!selected} 
          style={{ 
            width: '100%', 
            background: selected 
              ? 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)' 
              : (isDark ? 'rgba(255,255,255,0.05)' : '#E5E7EB'), 
            border: selected ? 'none' : (isDark ? '1px solid rgba(255,255,255,0.1)' : 'none'), 
            borderRadius: 14, 
            padding: '18px', 
            fontSize: 17, 
            fontWeight: 700, 
            color: selected ? '#FFF' : (isDark ? 'rgba(255,255,255,0.3)' : '#9CA3AF'), 
            cursor: selected ? 'pointer' : 'not-allowed',
            boxShadow: selected 
              ? (isDark ? '0 8px 30px rgba(240, 105, 34, 0.4)' : '0 6px 25px rgba(240, 105, 34, 0.35)') 
              : 'none',
            transition: 'all 0.3s ease'
          }}
        >
          Set Meal Times →
        </button>
      </div>
    </Layout>
    </>
  );
}
