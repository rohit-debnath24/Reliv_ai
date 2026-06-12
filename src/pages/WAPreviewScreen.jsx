import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { C } from '../utils/constants';

export default function WAPreviewScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('water');
  
  const tabs = [
    { id: 'water', icon: '💧', label: 'Water', color: '#3B82F6' },
    { id: 'meal', icon: '🍽️', label: 'Meals', color: '#F59E0B' },
    { id: 'workout', icon: '💪', label: 'Workout', color: '#EC4899' }
  ];
  
  const conversations = {
    water: [
      { type: 'bot', text: '💧 Good Morning! Time for your 1st glass of water. Ready?' },
      { type: 'user', text: 'YES' },
      { type: 'bot', text: '✅ Great start! 1/4 glasses done.\n\n⏰ Next reminder: 10:00 AM 💧' },
      { type: 'divider', text: '── 10:00 AM ──' },
      { type: 'bot', text: '💧 2nd glass time! Staying hydrated?' },
      { type: 'user', text: 'NO' },
      { type: 'bot', text: '👍 No worries! I\'ll remind you again in 30 minutes 🔔' },
    ],
    meal: [
      { type: 'bot', text: '🍳 Good morning! Breakfast time!\n\nYour meal: Eggs (2) + Parathas (2) + Milk\n📊 ~650 calories\n\nHad this?' },
      { type: 'user', text: 'YES' },
      { type: 'bot', text: '✅ Logged! You\'re on track! 🔥\n\n⏰ Next: Lunch at 1:00 PM 🍲' },
      { type: 'divider', text: '── 1:00 PM ──' },
      { type: 'bot', text: '🍲 Lunch time!\n\nYour meal: Rice + Dal + Sabzi\n📊 ~750 calories\n\nDid you eat this?' },
    ],
    workout: [
      { type: 'bot', text: '💪 Workout Time!\n\nToday\'s exercise: 10 Pushups\n⏱️ Takes just 5 minutes!\n\nDone / Not done?' },
      { type: 'user', text: 'Done' },
      { type: 'bot', text: '🔥 Amazing! Streak: 3 days! 💪\n\nNext: 10 Squats. Ready?' },
      { type: 'user', text: 'Done' },
      { type: 'bot', text: '🏆 CRUSHED IT! Both exercises done!\n\nYou\'re 15% stronger than yesterday! 💪' },
    ]
  };

  return (
    <Layout title="WhatsApp Preview" subtitle="Here's how Reliv AI will chat with you" showBack onBack={() => navigate(-1)}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {tabs.map(t => (
            <button 
              key={t.id} 
              onClick={() => setTab(t.id)} 
              style={{ 
                flex: 1, 
                background: tab === t.id ? `${t.color}12` : '#FFFFFF', 
                border: `2px solid ${tab === t.id ? t.color : '#E5E7EB'}`, 
                borderRadius: 12, 
                padding: '14px', 
                fontSize: 14, 
                fontWeight: 600, 
                color: tab === t.id ? t.color : C.textMid, 
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* WhatsApp Chat Preview */}
        <div style={{ 
          background: '#0B141A', 
          borderRadius: 20, 
          overflow: 'hidden',
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
        }}>
          {/* WhatsApp Header */}
          <div style={{ 
            background: '#1F2C33', 
            padding: '14px 18px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12,
            borderBottom: '1px solid #2A3942'
          }}>
            <img src="/relivlogo.jpeg" alt="Reliv AI" style={{ width: 40, height: 40, borderRadius: '50%' }} />
            <div>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#FFFFFF' }}>Reliv AI</p>
              <p style={{ fontSize: 12, color: '#8696A0' }}>online</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div style={{ 
            padding: '16px', 
            minHeight: 320,
            background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%231a2e35\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") #0B141A'
          }}>
            {conversations[tab].map((msg, i) => {
              if (msg.type === 'divider') {
                return (
                  <div key={i} style={{ textAlign: 'center', margin: '16px 0' }}>
                    <span style={{ fontSize: 11, color: '#8696A0', background: '#1F2C33', padding: '4px 12px', borderRadius: 6 }}>{msg.text}</span>
                  </div>
                );
              }
              return (
                <div 
                  key={i} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                    marginBottom: 8
                  }}
                >
                  <div style={{ 
                    background: msg.type === 'user' ? '#005C4B' : '#1F2C33', 
                    borderRadius: msg.type === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px', 
                    padding: '10px 14px', 
                    maxWidth: '85%',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                  }}>
                    <p style={{ 
                      fontSize: 14, 
                      color: '#E9EDEF', 
                      whiteSpace: 'pre-line', 
                      lineHeight: 1.5,
                      fontWeight: msg.type === 'user' ? 600 : 400
                    }}>
                      {msg.type === 'bot' && <span style={{ marginRight: 6 }}>🤖</span>}
                      {msg.type === 'user' && <span style={{ marginRight: 6 }}>👤</span>}
                      {msg.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Card */}
        <div style={{ 
          background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)', 
          border: '1px solid #A7F3D0', 
          borderRadius: 14, 
          padding: '16px 20px', 
          marginTop: 20,
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 14
        }}>
          <span style={{ fontSize: 28 }}>✨</span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#059669' }}>Personalized just for you!</p>
            <p style={{ fontSize: 12, color: '#10B981' }}>All messages based on YOUR meals, goals & schedule</p>
          </div>
        </div>

        {/* Done Button */}
        <button 
          onClick={() => navigate('/')} 
          style={{ 
            width: '100%', 
            background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)', 
            border: 'none', 
            borderRadius: 14, 
            padding: '18px', 
            fontSize: 17, 
            fontWeight: 700, 
            color: '#FFFFFF', 
            cursor: 'pointer',
            boxShadow: '0 6px 25px rgba(240, 105, 34, 0.35)'
          }}
        >
          Got It! Start My Journey →
        </button>
      </div>
    </Layout>
  );
}
