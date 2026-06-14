import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Silk from './Silk';

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
        title="Friends Weekly Plan"
        subtitle={`Your squad of ${friendCount} is ready to transform!`}
        titleColor="#ffffff"
        subtitleColor="rgba(255, 255, 255, 0.9)"
        showBack
        onBack={() => navigate('/friend-questions')}
      >
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        {/* Pricing Card */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 28,
          padding: '40px 36px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: 28,
          animation: 'slideUpFade 0.6s ease-out forwards',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 32,
            paddingBottom: 28,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <div style={{
              width: 72,
              height: 72,
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              animation: 'pulseGlow 3s ease-in-out infinite',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#FFF', marginBottom: 4 }}>
                Squad of {friendCount}
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.7)' }}>
                All members covered • Valid 7 days
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: 36,
                fontWeight: 800,
                color: '#FFF',
                lineHeight: 1,
              }}>
                ₹{total}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600 }}>
                total per week
              </div>
            </div>
          </div>

          {/* Squad Members */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 32,
            flexWrap: 'wrap',
          }}>
            {[...Array(friendCount)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: 56,
                  height: 56,
                  background: i === 0 ? 'var(--white)' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: i === 0 ? 'var(--primary)' : 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  animation: 'float 3s ease-in-out infinite',
                  animationDelay: `${i * 0.2}s`,
                  boxShadow: i === 0 ? 'var(--shadow-glow)' : 'none',
                }}
              >
                {i === 0 ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                )}
              </div>
            ))}
          </div>

          {/* Features */}
          <div style={{
            display: 'grid',
            gap: 12,
            marginBottom: 32,
          }}>
            {[
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>, text: 'Group leaderboard & competitions' },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>, text: 'Individual WhatsApp reminders' },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>, text: 'Squad challenges with rewards' },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>, text: 'Compare progress with friends' },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '16px 20px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: 16,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  opacity: 0,
                  animation: 'slideUpFade 0.5s ease-out forwards',
                  animationDelay: `${0.3 + (i * 0.1)}s`,
                }}
              >
                <span style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 24 }}>{f.icon}</span>
                <span style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Value */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 16,
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 32,
            border: '1px solid rgba(16, 185, 129, 0.2)',
            animation: 'slideUpFade 0.5s ease-out forwards',
            animationDelay: '0.7s',
            opacity: 0,
          }}>
            <span style={{ color: '#10B981', display: 'flex' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </span>
            <div>
              <p style={{ fontSize: 15, fontWeight: 800, color: '#34D399', margin: '0 0 4px 0' }}>
                Only ₹{perPerson.toFixed(0)} per person
              </p>
              <p style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontWeight: 500 }}>
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
              background: 'var(--white)',
              border: 'none',
              borderRadius: 16,
              padding: '22px',
              fontSize: 18,
              fontWeight: 800,
              color: 'var(--primary)',
              cursor: loading ? 'wait' : 'pointer',
              boxShadow: '0 12px 40px rgba(255, 255, 255, 0.2)',
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
                  border: '3px solid rgba(240,105,34,0.3)',
                  borderTopColor: 'var(--primary)',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                Processing...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                Pay ₹{total} & Continue
              </>
            )}
          </button>
        </div>

        {/* Trust */}
        <div style={{
          textAlign: 'center',
          fontSize: 13,
          color: 'rgba(255,255,255,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Secure payment via Razorpay
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.1); transform: scale(1); }
          50% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.4); transform: scale(1.05); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </Layout>
    </>
  );
}
