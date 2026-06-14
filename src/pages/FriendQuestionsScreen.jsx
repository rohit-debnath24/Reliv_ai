import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Silk from './Silk';

export default function FriendQuestionsScreen() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([{ name: '', phone: '' }]);
  const [showForm, setShowForm] = useState(false);

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
      <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <Silk
          speed={5}
          scale={1}
          color="#ff6627"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <Layout
        title="Add Your Squad"
        subtitle={`Enter details for ${friendCount} friend${friendCount > 1 ? 's' : ''}`}
        titleColor="#ffffff"
        subtitleColor="rgba(255, 255, 255, 0.9)"
        showBack
        onBack={() => navigate('/friend-size')}
      >
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          {/* Info */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: 16,
            padding: '16px 20px',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            opacity: showForm ? 1 : 0,
            transform: showForm ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.4s ease',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', margin: 0, fontWeight: 500, lineHeight: 1.5 }}>
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
                  background: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: 20,
                  padding: '28px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
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
                    background: 'var(--white)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    color: 'var(--primary)',
                    fontWeight: 800,
                    boxShadow: 'var(--shadow-glow)'
                  }}>
                    {index + 1}
                  </div>
                  <span style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>
                    Friend {index + 1}
                  </span>
                </div>

                {/* Name Input */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600, marginBottom: 8, display: 'block' }}>
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
                      background: 'rgba(0, 0, 0, 0.5)',
                      color: '#fff',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
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
                  <label style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600, marginBottom: 8, display: 'block' }}>
                    Phone Number
                  </label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 12,
                      padding: '0 16px',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.8)',
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
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
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
              background: isValid ? 'var(--white)' : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: isValid ? 'none' : 'blur(10px)',
              border: isValid ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 16,
              padding: '20px',
              fontSize: 18,
              fontWeight: 800,
              color: isValid ? 'var(--primary)' : 'rgba(255, 255, 255, 0.4)',
              cursor: isValid ? 'pointer' : 'not-allowed',
              boxShadow: isValid ? '0 12px 40px rgba(255, 255, 255, 0.2)' : 'none',
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
