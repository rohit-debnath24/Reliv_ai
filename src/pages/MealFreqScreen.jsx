import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { C } from '../utils/constants';

export default function MealFreqScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  
  const mealOptions = [
    { id: 3, label: '3 Meals', desc: 'Standard meal plan', meals: ['🍳 Breakfast', '🍲 Lunch', '🍛 Dinner'] },
    { id: 4, label: '4 Meals', desc: 'With afternoon snack', meals: ['🍳 Breakfast', '🥜 Snack', '🍲 Lunch', '🍛 Dinner'] },
    { id: 5, label: '5 Meals', desc: 'For muscle building', meals: ['🍳 Breakfast', '🥤 Snack', '🍲 Lunch', '🍌 Snack', '🍛 Dinner'] }
  ];

  return (
    <Layout title="How many meals per day?" subtitle="We'll remind you for each meal at your preferred times" showBack onBack={() => navigate(-1)}>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <div style={{ display: 'grid', gap: 14, marginBottom: 28 }}>
          {mealOptions.map(m => (
            <button 
              key={m.id} 
              onClick={() => setSelected(m.id)} 
              style={{ 
                background: selected === m.id ? '#FFF5F0' : '#FFFFFF', 
                border: `2px solid ${selected === m.id ? '#F06922' : '#E5E7EB'}`, 
                borderRadius: 16, 
                padding: '20px 24px', 
                cursor: 'pointer', 
                textAlign: 'left',
                boxShadow: selected === m.id ? '0 4px 20px rgba(240, 105, 34, 0.15)' : '0 2px 10px rgba(0,0,0,0.04)',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{m.label}</h3>
                  <p style={{ fontSize: 13, color: C.textMid }}>{m.desc}</p>
                </div>
                <div style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: '50%', 
                  border: `2px solid ${selected === m.id ? '#F06922' : '#E5E7EB'}`,
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
                    color: selected === m.id ? '#F06922' : C.textMid, 
                    background: selected === m.id ? '#F0692212' : '#F3F4F6', 
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
          background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)', 
          border: '1px solid #A7F3D0', 
          borderRadius: 14, 
          padding: '14px 18px', 
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <span style={{ fontSize: 20 }}>💡</span>
          <p style={{ fontSize: 13, color: '#059669' }}>WhatsApp will remind you 15 min before each meal!</p>
        </div>

        {/* Continue Button */}
        <button 
          onClick={() => { localStorage.setItem('mealFreq', selected); navigate('/meal-times'); }} 
          disabled={!selected} 
          style={{ 
            width: '100%', 
            background: selected ? 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)' : '#E5E7EB', 
            border: 'none', 
            borderRadius: 14, 
            padding: '18px', 
            fontSize: 17, 
            fontWeight: 700, 
            color: selected ? '#FFFFFF' : '#9CA3AF', 
            cursor: selected ? 'pointer' : 'not-allowed',
            boxShadow: selected ? '0 6px 25px rgba(240, 105, 34, 0.35)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          Set Meal Times →
        </button>
      </div>
    </Layout>
  );
}
