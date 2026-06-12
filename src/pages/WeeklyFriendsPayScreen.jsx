import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function WeeklyFriendsPayScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const friendCount = parseInt(localStorage.getItem('friendCount') || '3');

  const pricing = {
    2: { total: 49, perPerson: 24.50 },
    3: { total: 84, perPerson: 28 },
    4: { total: 112, perPerson: 28 },
    5: { total: 140, perPerson: 28 },
  };

  const { total, perPerson } = pricing[friendCount] || pricing[3];

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('paymentComplete', 'true');
      localStorage.setItem('planType', 'friends');
      navigate('/category');
    }, 1200);
  };

  return (
    <Layout
      title="Friends Weekly Plan"
      subtitle={`Your squad of ${friendCount} is ready to transform!`}
      showBack
      onBack={() => navigate('/friend-questions')}
    >
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        {/* Pricing Card */}
        <div style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)',
          borderRadius: 28,
          padding: '40px 36px',
          boxShadow: '0 20px 60px rgba(139, 92, 246, 0.12)',
          border: '2px solid rgba(139, 92, 246, 0.15)',
          marginBottom: 28,
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 32,
            paddingBottom: 28,
            borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
          }}>
            <div style={{
              width: 72,
              height: 72,
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
            }}>
              👥
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111', marginBottom: 4 }}>
                Squad of {friendCount}
              </h2>
              <p style={{ fontSize: 14, color: '#666' }}>
                All members covered • Valid 7 days
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: 36,
                fontWeight: 800,
                color: '#8B5CF6',
                lineHeight: 1,
              }}>
                ₹{total}
              </div>
              <div style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>
                per week
              </div>
            </div>
          </div>

          {/* Squad Members */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 28,
            flexWrap: 'wrap',
          }}>
            {[...Array(friendCount)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: 56,
                  height: 56,
                  background: i === 0
                    ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
                    : 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  border: i === 0 ? 'none' : '2px solid rgba(139, 92, 246, 0.2)',
                }}
              >
                {i === 0 ? '⭐' : '👤'}
              </div>
            ))}
          </div>

          {/* Features */}
          <div style={{
            display: 'grid',
            gap: 12,
            marginBottom: 28,
          }}>
            {[
              { icon: '🏆', text: 'Group leaderboard & competitions' },
              { icon: '📱', text: 'Individual WhatsApp reminders' },
              { icon: '🎯', text: 'Squad challenges with rewards' },
              { icon: '📊', text: 'Compare progress with friends' },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 18px',
                  background: '#FFF',
                  borderRadius: 12,
                  border: '1px solid #E5E7EB',
                }}
              >
                <span style={{ fontSize: 20 }}>{f.icon}</span>
                <span style={{ fontSize: 14, color: '#333', fontWeight: 500 }}>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Value */}
          <div style={{
            background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
            borderRadius: 16,
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 28,
            border: '1px solid rgba(34, 197, 94, 0.2)',
          }}>
            <span style={{ fontSize: 24 }}>💰</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#059669', margin: 0 }}>
                Only ₹{perPerson.toFixed(0)} per person
              </p>
              <p style={{ fontSize: 12, color: '#10B981', margin: 0 }}>
                Split equally among {friendCount} friends!
              </p>
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePay}
            disabled={loading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              border: 'none',
              borderRadius: 16,
              padding: '22px',
              fontSize: 18,
              fontWeight: 700,
              color: '#FFFFFF',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 10px 40px rgba(139, 92, 246, 0.35)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: 24,
                  height: 24,
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#FFFFFF',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                Processing...
              </>
            ) : (
              <>
                💳 Pay ₹{total} & Continue
              </>
            )}
          </button>
        </div>

        {/* Trust */}
        <div style={{
          textAlign: 'center',
          fontSize: 13,
          color: '#9CA3AF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}>
          <span>🔒</span> Secure payment via Razorpay
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
  );
}
