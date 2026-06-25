import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SparkleBackground from '../components/SparkleBackground';

const CSS = `
.wapreview-container {
  min-height: 80vh;
  background: transparent;
  font-family: 'Inter', 'Outfit', sans-serif;
  padding: 20px 0;
  position: relative;
  transition: background 0.4s ease, color 0.4s ease;
}

/* Dark Mode Variable overrides */
.wapreview-container.dark-mode {
  --bg-card: rgba(27, 31, 23, 0.45);
  --border-card: rgba(255, 255, 255, 0.08);
  --border-card-hover: rgba(255, 255, 255, 0.2);
  --text-main: #F7F4EC;
  --text-muted: #A0A596;
  --tab-bg: rgba(255, 255, 255, 0.03);
  --tab-border: rgba(255, 255, 255, 0.06);
  --info-bg: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.03) 100%);
  --info-border: rgba(16, 185, 129, 0.25);
  --info-title: #10B981;
  --info-text: #34D399;
  --shadow-card: 0 24px 80px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

/* Light Mode Variable overrides */
.wapreview-container.light-mode {
  --bg-card: rgba(255, 255, 255, 0.75);
  --border-card: rgba(0, 0, 0, 0.08);
  --border-card-hover: rgba(0, 0, 0, 0.15);
  --text-main: #11140F;
  --text-muted: #75786C;
  --tab-bg: #FFFFFF;
  --tab-border: rgba(0, 0, 0, 0.08);
  --info-bg: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
  --info-border: #A7F3D0;
  --info-title: #059669;
  --info-text: #10B981;
  --shadow-card: 0 24px 80px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.wapreview-card {
  width: 100%;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 28px;
  padding: 36px 32px;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.wapreview-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.wapreview-tab-btn {
  flex: 1;
  background: var(--tab-bg);
  border: 1px solid var(--tab-border);
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
  gap: 8px;
}
.wapreview-tab-btn:hover {
  background: var(--bg-card-hover);
  color: var(--text-main);
  border-color: var(--border-card-hover);
}
.wapreview-tab-btn.active {
  background: var(--active-color-bg);
  border-color: var(--active-color);
  color: var(--active-color);
  box-shadow: 0 4px 12px var(--active-color-shadow);
}

.wapreview-chat-container {
  background: #0B141A;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.wapreview-chat-header {
  background: #1F2C33;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #2A3942;
}

.wapreview-chat-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #2A3942;
}

.wapreview-chat-title {
  font-size: 15px;
  font-weight: 600;
  color: #FFF;
  margin: 0 0 2px 0;
}

.wapreview-chat-status {
  font-size: 12px;
  color: #8696A0;
  margin: 0;
}

.wapreview-chat-messages {
  padding: 20px;
  min-height: 340px;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a2e35' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") #0B141A;
}

.wapreview-chat-divider {
  text-align: center;
  margin: 18px 0;
}

.wapreview-chat-divider-text {
  font-size: 11px;
  color: #8696A0;
  background: #1F2C33;
  padding: 4px 12px;
  border-radius: 6px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.wapreview-chat-message-row {
  display: flex;
  margin-bottom: 10px;
}

.wapreview-chat-bubble {
  border-radius: 12px;
  padding: 10px 14px;
  max-width: 85%;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.wapreview-chat-text {
  font-size: 13.5px;
  color: #E9EDEF;
  white-space: pre-line;
  line-height: 1.5;
  margin: 0;
}

.wapreview-info-card {
  background: var(--info-bg);
  border: 1px solid var(--info-border);
  border-radius: 18px;
  padding: 18px 20px;
  margin-top: 24px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.wapreview-info-icon-wrapper {
  color: var(--info-title);
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.wapreview-info-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--info-title);
  margin-bottom: 4px;
}

.wapreview-info-desc {
  font-size: 12px;
  color: var(--info-text);
  margin: 0;
  font-weight: 550;
}

.wapreview-btn-primary {
  width: 100%;
  background: linear-gradient(135deg, #F06922 0%, #E85C25 100%);
  border: none;
  border-radius: 16px;
  padding: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 15.5px;
  font-weight: 700;
  color: #FFF;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(240, 105, 34, 0.25);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.wapreview-btn-primary::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
  pointer-events: none;
}
.wapreview-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(240, 105, 34, 0.35);
}
.wapreview-btn-primary:active {
  transform: scale(0.98);
}

@media (max-width: 480px) {
  .wapreview-card {
    padding: 24px 16px;
    border-radius: 24px;
  }
  .wapreview-tab-btn {
    padding: 12px 8px;
    font-size: 12.5px;
    border-radius: 12px;
  }
  .wapreview-tab-btn svg {
    width: 14px;
    height: 14px;
  }
  .wapreview-chat-header {
    padding: 12px 14px;
    gap: 10px;
  }
  .wapreview-chat-avatar {
    width: 36px;
    height: 36px;
  }
  .wapreview-chat-title {
    font-size: 14px;
  }
  .wapreview-chat-status {
    font-size: 11.5px;
  }
  .wapreview-chat-messages {
    padding: 14px;
    min-height: 300px;
  }
  .wapreview-chat-text {
    font-size: 12.5px;
  }
  .wapreview-info-card {
    padding: 14px 16px;
    margin-top: 20px;
    margin-bottom: 20px;
    gap: 12px;
  }
  .wapreview-info-title {
    font-size: 13px;
  }
  .wapreview-info-desc {
    font-size: 11.5px;
  }
  .wapreview-btn-primary {
    padding: 14px;
    font-size: 14.5px;
    border-radius: 12px;
  }
}
`;

export default function WAPreviewScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('water');

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

  const tabs = [
    {
      id: 'water',
      label: 'Water',
      color: '#3B82F6',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        </svg>
      )
    },
    {
      id: 'meal',
      label: 'Meals',
      color: '#F59E0B',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
        </svg>
      )
    },
    {
      id: 'workout',
      label: 'Workout',
      color: '#EC4899',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 1 1 0 8h-1M2 8h16v8H2zM6 8v8M14 8v8"/>
        </svg>
      )
    }
  ];

  const conversations = {
    water: [
      { type: 'bot', text: 'Good Morning! Time for your 1st glass of water. Ready?' },
      { type: 'user', text: 'YES' },
      { type: 'bot', text: 'Great start! 1/4 glasses done.\n\nNext reminder: 10:00 AM' },
      { type: 'divider', text: '── 10:00 AM ──' },
      { type: 'bot', text: '2nd glass time! Staying hydrated?' },
      { type: 'user', text: 'NO' },
      { type: 'bot', text: 'No worries! I\'ll remind you again in 30 minutes' },
    ],
    meal: [
      { type: 'bot', text: 'Good morning! Breakfast time!\n\nYour meal: Eggs (2) + Parathas (2) + Milk\n~650 calories\n\nHad this?' },
      { type: 'user', text: 'YES' },
      { type: 'bot', text: 'Logged! You\'re on track! \n\nNext: Lunch at 1:00 PM' },
      { type: 'divider', text: '── 1:00 PM ──' },
      { type: 'bot', text: 'Lunch time!\n\nYour meal: Rice + Dal + Sabzi\n~750 calories\n\nDid you eat this?' },
    ],
    workout: [
      { type: 'bot', text: 'Workout Time!\n\nToday\'s exercise: 10 Pushups\nTakes just 5 minutes!\n\nDone / Not done?' },
      { type: 'user', text: 'Done' },
      { type: 'bot', text: 'Amazing! Streak: 3 days! \n\nNext: 10 Squats. Ready?' },
      { type: 'user', text: 'Done' },
      { type: 'bot', text: 'CRUSHED IT! Both exercises done!\n\nYou\'re 15% stronger than yesterday!' },
    ]
  };

  return (
    <Layout title="WhatsApp Preview" subtitle="Here's how Reliv AI will chat with you" showBack onBack={() => navigate(-1)}>
      <div className={`wapreview-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
        <style>{CSS}</style>
        <SparkleBackground isDark={isDark} />

        <div style={{ maxWidth: 520, width: '100%', margin: '0 auto', zIndex: 1 }}>
          {/* Main Card */}
          <div className="wapreview-card">
            {/* Tab Buttons */}
            <div className="wapreview-tabs">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`wapreview-tab-btn ${tab === t.id ? 'active' : ''}`}
                  style={{
                    '--active-color': t.color,
                    '--active-color-bg': `${t.color}15`,
                    '--active-color-shadow': `${t.color}10`,
                  }}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            {/* WhatsApp Chat Preview */}
            <div className="wapreview-chat-container">
              {/* WhatsApp Header */}
              <div className="wapreview-chat-header">
                <img src="/relivlogo.jpeg" alt="Reliv AI" className="wapreview-chat-avatar" />
                <div>
                  <h4 className="wapreview-chat-title">Reliv AI</h4>
                  <p className="wapreview-chat-status">online</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="wapreview-chat-messages">
                {conversations[tab].map((msg, i) => {
                  if (msg.type === 'divider') {
                    return (
                      <div key={i} className="wapreview-chat-divider">
                        <span className="wapreview-chat-divider-text">{msg.text}</span>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={i}
                      className="wapreview-chat-message-row"
                      style={{
                        justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      <div
                        className="wapreview-chat-bubble"
                        style={{
                          background: msg.type === 'user' ? '#005C4B' : '#1F2C33',
                          borderRadius: msg.type === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                        }}
                      >
                        <p className="wapreview-chat-text" style={{
                          fontWeight: msg.type === 'user' ? 600 : 400
                        }}>
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Info Banner */}
            <div className="wapreview-info-card">
              <div className="wapreview-info-icon-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <div>
                <h4 className="wapreview-info-title">Personalized just for you!</h4>
                <p className="wapreview-info-desc">All messages are derived from your specific meals, sleep targets, and goals</p>
              </div>
            </div>

            {/* Got It Button */}
            <button
              onClick={() => navigate('/')}
              className="wapreview-btn-primary"
            >
              Got It! Start My Journey
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
