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
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: 16,
            padding: '16px 20px',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            opacity: showForm ? 1 : 0,
            transform: showForm ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.4s ease',
          }}>
            <span style={{ fontSize: 22 }}>📱</span>
            <p style={{ fontSize: 13, color: '#fff', margin: 0 }}>
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
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: 20,
                  padding: '28px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
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
                  marginBottom: 20,
                }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    background: 'linear-gradient(135deg, #F06922 0%, #D95319 100%)',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    color: '#FFF',
                    fontWeight: 700,
                  }}>
                    {index + 1}
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>
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
                      background: 'rgba(0, 0, 0, 0.2)',
                      color: '#fff',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 12,
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#F06922'}
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
                      background: 'rgba(240, 105, 34, 0.15)',
                      border: '2px solid rgba(240, 105, 34, 0.3)',
                      borderRadius: 12,
                      padding: '0 16px',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#F06922',
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
                        background: 'rgba(0, 0, 0, 0.2)',
                        color: '#fff',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 12,
                        outline: 'none',
                        letterSpacing: '1px',
                        transition: 'all 0.3s ease',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#F06922'}
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
              background: isValid
                ? 'linear-gradient(135deg, #F06922 0%, #D95319 100%)'
                : 'rgba(255, 255, 255, 0.2)',
              backdropFilter: isValid ? 'none' : 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 16,
              padding: '20px',
              fontSize: 18,
              fontWeight: 700,
              color: isValid ? 'var(--white)' : 'rgba(255, 255, 255, 0.4)',
              cursor: isValid ? 'pointer' : 'not-allowed',
              boxShadow: isValid ? '0 10px 40px rgba(240, 105, 34, 0.35)' : 'none',
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
