import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { C } from '../utils/constants';

export default function WeeklySoloPayScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('paymentComplete', 'true');
      localStorage.setItem('planType', 'solo');
      navigate('/category');
    }, 1200);
  };

  const features = [
    { icon: '🎯', text: 'Personalized AI meal plans' },
    { icon: '💪', text: 'Custom workout routines' },
    { icon: '📱', text: 'Daily WhatsApp reminders' },
    { icon: '💧', text: 'Water intake tracking' },
    { icon: '📊', text: 'Progress analytics' },
    { icon: '🔄', text: 'Weekly plan updates' },
  ];

  return (
    <Layout
      title="Solo Weekly Plan"
      subtitle="7 days of personalized health coaching"
      showBack
      onBack={() => navigate('/group-type')}
    >
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        {/* Pricing Card */}
        <div style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF9F5 100%)',
          borderRadius: 28,
          padding: '40px 36px',
          boxShadow: '0 20px 60px rgba(240, 105, 34, 0.12)',
          border: '2px solid rgba(240, 105, 34, 0.15)',
          marginBottom: 28,
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 32,
            paddingBottom: 28,
            borderBottom: '1px solid rgba(240, 105, 34, 0.1)',
          }}>
            <div style={{
              width: 72,
              height: 72,
              background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              boxShadow: '0 10px 30px rgba(240, 105, 34, 0.3)',
            }}>
              👤
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111', marginBottom: 4 }}>
                Solo Plan
              </h2>
              <p style={{ fontSize: 14, color: '#666' }}>
                Just for you • Valid 7 days
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: 36,
                fontWeight: 800,
                color: '#F06922',
                lineHeight: 1,
              }}>
                ₹29
              </div>
              <div style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>
                per week
              </div>
            </div>
          </div>

          {/* Features */}
          <div style={{ marginBottom: 28 }}>
            <h3 style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#9CA3AF',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: 20,
            }}>
              What's Included
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 16,
            }}>
              {features.map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 16px',
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
          </div>

          {/* Value Proposition */}
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
                Only ₹4.14 per day
              </p>
              <p style={{ fontSize: 12, color: '#10B981', margin: 0 }}>
                Less than a cup of chai!
              </p>
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePay}
            disabled={loading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
              border: 'none',
              borderRadius: 16,
              padding: '22px',
              fontSize: 18,
              fontWeight: 700,
              color: '#FFFFFF',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 10px 40px rgba(240, 105, 34, 0.35)',
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
                💳 Pay ₹29 & Continue
              </>
            )}
          </button>
        </div>

        {/* Trust Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.6)',
          borderRadius: 16,
        }}>
          {[
            { icon: '🔒', text: 'Secure Payment' },
            { icon: '🚫', text: 'No Auto-Renewal' },
            { icon: '💬', text: '24/7 Support' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                color: '#666',
                fontWeight: 500,
              }}
            >
              <span>{item.icon}</span>
              {item.text}
            </div>
          ))}
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
