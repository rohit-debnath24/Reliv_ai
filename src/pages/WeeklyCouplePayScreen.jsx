import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function WeeklyCouplePayScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('paymentComplete', 'true');
      localStorage.setItem('planType', 'couple');
      navigate('/category');
    }, 1200);
  };

  return (
    <Layout
      title="Couple Weekly Plan"
      subtitle="Transform together for 7 days"
      showBack
      onBack={() => navigate('/couple-questions')}
    >
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        {/* Pricing Card */}
        <div style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF0F7 100%)',
          borderRadius: 28,
          padding: '40px 36px',
          boxShadow: '0 20px 60px rgba(236, 72, 153, 0.12)',
          border: '2px solid rgba(236, 72, 153, 0.15)',
          marginBottom: 28,
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 32,
            paddingBottom: 28,
            borderBottom: '1px solid rgba(236, 72, 153, 0.1)',
          }}>
            <div style={{
              width: 72,
              height: 72,
              background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3)',
            }}>
              💑
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111', marginBottom: 4 }}>
                Couple Plan
              </h2>
              <p style={{ fontSize: 14, color: '#666' }}>
                Both partners • Valid 7 days
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: 36,
                fontWeight: 800,
                color: '#EC4899',
                lineHeight: 1,
              }}>
                ₹54
              </div>
              <div style={{ fontSize: 13, color: 'var(--gray-400)', fontWeight: 500 }}>
                per week
              </div>
            </div>
          </div>

          {/* Partners Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            marginBottom: 28,
          }}>
            {['Partner 1', 'Partner 2'].map((p, i) => (
              <div
                key={i}
                style={{
                  background: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
                  borderRadius: 14,
                  padding: '16px 20px',
                  textAlign: 'center',
                  border: '1px solid rgba(236, 72, 153, 0.15)',
                }}
              >
                <span style={{ fontSize: 28 }}>{i === 0 ? '👤' : '👤'}</span>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#333', marginTop: 8 }}>{p}</p>
                <p style={{ fontSize: 12, color: '#EC4899' }}>Individual reminders</p>
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
              { icon: '💕', text: 'Both partners get personalized plans' },
              { icon: '📱', text: 'Individual WhatsApp reminders' },
              { icon: '🏆', text: 'Couple challenges & competitions' },
              { icon: '📊', text: 'Shared progress dashboard' },
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
                Only ₹27 per person
              </p>
              <p style={{ fontSize: 12, color: '#10B981', margin: 0 }}>
                Save ₹4 compared to 2 solo plans!
              </p>
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePay}
            disabled={loading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
              border: 'none',
              borderRadius: 16,
              padding: '22px',
              fontSize: 18,
              fontWeight: 700,
              color: 'var(--white)',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 10px 40px rgba(236, 72, 153, 0.35)',
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
                  borderTopColor: 'var(--white)',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                Processing...
              </>
            ) : (
              <>
                💳 Pay ₹54 & Continue
              </>
            )}
          </button>
        </div>

        {/* Trust */}
        <div style={{
          textAlign: 'center',
          fontSize: 13,
          color: 'var(--gray-400)',
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
