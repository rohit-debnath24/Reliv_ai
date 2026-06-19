import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SparkleBackground from '../components/SparkleBackground';

export default function FriendQuestionsScreen() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([{ name: '', phone: '' }]);
  const [showForm, setShowForm] = useState(false);

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

  const friendCount = parseInt(localStorage.getItem('friendCount') || '2') - 1; // Excluding self

  useEffect(() => {
    // Initialize friend slots
    const initialFriends = [];
    for (let i = 0; i < friendCount; i++) {
      initialFriends.push({ name: '', phone: '' });
    }
    setFriends(initialFriends);
    setTimeout(() => setShowForm(true), 100);
  }, [friendCount]);

  const updateFriend = (index, field, value) => {
    const updated = [...friends];
    updated[index][field] = field === 'phone' ? value.replace(/\D/g, '') : value;
    setFriends(updated);
  };

  const handleContinue = () => {
    localStorage.setItem('friendsList', JSON.stringify(friends));
    navigate('/weekly-friends-pay');
  };

  const isValid = friends.every(f => f.name.trim() && f.phone.length === 10);

  return (
    <>
      <SparkleBackground />
      <Layout
        title="Add Your Squad"
        subtitle={`Enter details for ${friendCount} friend${friendCount > 1 ? 's' : ''}`}
        showBack
        onBack={() => navigate('/friend-size')}
      >
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{
            background: isDark ? 'rgba(20, 10, 15, 0.8)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            borderRadius: 16,
            padding: '16px 20px',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            border: 'none',
            opacity: showForm ? 1 : 0,
            transform: showForm ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.4s ease',
            boxShadow: isDark ? '0 0 40px rgba(240, 105, 34, 0.25), inset 0 0 0 1px rgba(240, 105, 34, 0.35)' : '0 0 40px rgba(240, 105, 34, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 1)',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(240, 105, 34, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? '#FFF' : 'var(--primary)'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <p style={{ fontSize: 13, color: isDark ? 'rgba(255,255,255,0.9)' : 'var(--gray-800)', margin: 0, fontWeight: 600, lineHeight: 1.5 }}>
              Each friend will get their own personalized plan and WhatsApp reminders.
            </p>
          </div>

          {/* Friend Cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            marginBottom: 32,
          }}>
            {friends.map((friend, index) => (
              <div
                key={index}
                style={{
                  background: isDark ? 'rgba(20, 10, 15, 0.8)' : 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  borderRadius: 20,
                  padding: '28px',
                  border: 'none',
                  boxShadow: isDark ? '0 0 50px rgba(240, 105, 34, 0.2), inset 0 0 0 1px rgba(240, 105, 34, 0.3)' : '0 0 50px rgba(240, 105, 34, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 1)',
                  opacity: showForm ? 1 : 0,
                  transform: showForm ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.4s ease',
                  transitionDelay: `${index * 0.1}s`,
                }}
              >
                {/* Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 24,
                }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    background: isDark ? 'var(--white)' : 'var(--primary)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    color: isDark ? 'var(--primary)' : '#FFF',
                    fontWeight: 800,
                    boxShadow: 'var(--shadow-glow)'
                  }}>
                    {index + 1}
                  </div>
                  <span style={{ fontSize: 17, fontWeight: 700, color: isDark ? '#fff' : 'var(--gray-900)' }}>
                    Friend {index + 1}
                  </span>
                </div>

                {/* Name Input */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'var(--gray-600)', fontWeight: 600, marginBottom: 8, display: 'block' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={friend.name}
                    onChange={(e) => updateFriend(index, 'name', e.target.value)}
                    placeholder="Enter name"
                    style={{
                      width: '100%',
                      padding: '16px 18px',
                      fontSize: 15,
                      fontWeight: 500,
                      background: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                      color: isDark ? '#fff' : 'var(--gray-900)',
                      border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(240, 105, 34, 0.2)',
                      borderRadius: 12,
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--white)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label style={{ fontSize: 13, color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'var(--gray-600)', fontWeight: 600, marginBottom: 8, display: 'block' }}>
                    Phone Number
                  </label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{
                      background: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                      border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(240, 105, 34, 0.2)',
                      borderRadius: 12,
                      padding: '0 16px',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: 14,
                      fontWeight: 600,
                      color: isDark ? 'rgba(255,255,255,0.8)' : 'var(--primary)',
                    }}>
                      🇮🇳 +91
                    </div>
                    <input
                      type="tel"
                      maxLength="10"
                      value={friend.phone}
                      onChange={(e) => updateFriend(index, 'phone', e.target.value)}
                      placeholder="10-digit number"
                      style={{
                        flex: 1,
                        padding: '16px 18px',
                        fontSize: 15,
                        fontWeight: 500,
                        background: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                        color: isDark ? '#fff' : 'var(--gray-900)',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(240, 105, 34, 0.2)',
                        borderRadius: 12,
                        outline: 'none',
                        letterSpacing: '1px',
                        transition: 'all 0.3s ease',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--white)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!isValid}
            style={{
              width: '100%',
              background: isValid ? 'var(--primary)' : (isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.8)'),
              backdropFilter: isValid ? 'none' : 'blur(10px)',
              border: isValid ? 'none' : (isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(240, 105, 34, 0.2)'),
              borderRadius: 16,
              padding: '20px',
              fontSize: 18,
              fontWeight: 800,
              color: isValid ? '#FFF' : (isDark ? 'rgba(255, 255, 255, 0.4)' : 'var(--gray-400)'),
              cursor: isValid ? 'pointer' : 'not-allowed',
              boxShadow: isValid ? 'var(--shadow-glow)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            Continue to Payment
          </button>
        </div>
      </Layout>
    </>
  );
}
