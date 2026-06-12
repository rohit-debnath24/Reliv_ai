import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { C } from '../utils/constants';

export default function WAWorkoutFlowScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('done');
  
  const doneFlow = [
    { type: 'bot', text: "💪 Workout time! 10 pushups — takes just 5 min. Done / Not done?" },
    { type: 'user', text: "Done" },
    { type: 'bot', text: "🔥 Streak: 3 days! You're on fire! 💪" },
    { type: 'bot', text: "💪 Now 10 squats. Ready? Done / Not done?" },
    { type: 'user', text: "Done" },
    { type: 'bot', text: "🏆 Both exercises done! You crushed it today!" },
  ];
  
  const notDoneFlow = [
    { type: 'bot', text: "💪 Workout time! 10 pushups — takes just 5 min. Done / Not done?" },
    { type: 'user', text: "Not done" },
    { type: 'bot', text: "👍 No worries! Try again at 6PM — 10 pushups 🙌" },
    { type: 'divider', text: "At 6 PM" },
    { type: 'bot', text: "💪 6PM: pushups still pending! Just 5 min 🏋️" },
    { type: 'user', text: "Done" },
    { type: 'bot', text: "✅ Better late than never! Logged ✓" },
  ];
  
  const currentFlow = activeTab === 'done' ? doneFlow : notDoneFlow;

  return (
    <Layout title="WhatsApp — Workout" showBack onBack={() => navigate('/wa-preview')}>
      <div style={{ maxWidth: 500, margin: '0 auto', padding: '0 16px' }}>
        
        {/* Info Card */}
        <div style={{
          background: `linear-gradient(135deg, ${C.bgLight}, #fff)`,
          borderRadius: 16,
          padding: 16,
          border: `1px solid ${C.border}`,
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `${C.success}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22
          }}>
            💪
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Workout Tracking Flow</p>
            <p style={{ fontSize: 12, color: C.textMid }}>Streak tracking & gentle reminders</p>
          </div>
        </div>
        
        {/* Toggle Tabs */}
        <div style={{
          display: 'flex',
          background: C.bgLight,
          borderRadius: 12,
          padding: 4,
          marginBottom: 20
        }}>
          <button
            onClick={() => setActiveTab('done')}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              borderRadius: 10,
              background: activeTab === 'done' ? '#fff' : 'transparent',
              color: activeTab === 'done' ? C.success : C.textMid,
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              boxShadow: activeTab === 'done' ? C.shadow : 'none'
            }}
          >
            ✓ If Done
          </button>
          <button
            onClick={() => setActiveTab('notdone')}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              borderRadius: 10,
              background: activeTab === 'notdone' ? '#fff' : 'transparent',
              color: activeTab === 'notdone' ? C.primary : C.textMid,
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              boxShadow: activeTab === 'notdone' ? C.shadow : 'none'
            }}
          >
            ✗ If Not Done
          </button>
        </div>
        
        {/* Chat Preview */}
        <div style={{
          background: '#0b141a',
          borderRadius: 20,
          overflow: 'hidden',
          marginBottom: 24
        }}>
          {/* WhatsApp Header */}
          <div style={{
            background: '#1f2c34',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${C.success}, #16a34a)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: 18 }}>🏋️</span>
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Reliv AI</p>
              <p style={{ fontSize: 11, color: '#8696a0' }}>Workout Coach</p>
            </div>
          </div>
          
          {/* Messages */}
          <div style={{ padding: 16, minHeight: 300 }}>
            {currentFlow.map((msg, i) => {
              if (msg.type === 'divider') {
                return (
                  <div key={i} style={{ 
                    textAlign: 'center', 
                    margin: '16px 0',
                    padding: '6px 12px',
                    background: '#1d282f',
                    borderRadius: 8,
                    display: 'inline-block',
                    width: '100%'
                  }}>
                    <span style={{ fontSize: 11, color: '#8696a0' }}>{msg.text}</span>
                  </div>
                );
              }
              
              const isBot = msg.type === 'bot';
              return (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: isBot ? 'flex-start' : 'flex-end',
                  marginBottom: 8
                }}>
                  <div style={{
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: isBot ? '0 12px 12px 12px' : '12px 0 12px 12px',
                    background: isBot ? '#1f2c34' : '#005c4b',
                    color: '#fff',
                    fontSize: 14,
                    lineHeight: 1.4
                  }}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Streak Info */}
        <div style={{
          background: `${C.success}10`,
          borderRadius: 14,
          padding: 16,
          border: `1px solid ${C.success}30`,
          marginBottom: 20
        }}>
          <p style={{ fontSize: 13, color: C.success, fontWeight: 600 }}>
            🔥 Streaks motivate! We track consecutive days and celebrate milestones.
          </p>
        </div>
        
        {/* Navigation */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => navigate('/wa-meal-flow')}
            style={{
              flex: 1,
              padding: '14px',
              border: `2px solid ${C.border}`,
              borderRadius: 12,
              background: '#fff',
              color: C.text,
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer'
            }}
          >
            🍽️ Meal Flow
          </button>
          <button
            onClick={() => navigate('/wa-day-flow')}
            style={{
              flex: 1,
              padding: '14px',
              border: `2px solid ${C.primary}`,
              borderRadius: 12,
              background: `${C.primary}10`,
              color: C.primary,
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer'
            }}
          >
            📅 Full Day →
          </button>
        </div>
        
      </div>
    </Layout>
  );
}
