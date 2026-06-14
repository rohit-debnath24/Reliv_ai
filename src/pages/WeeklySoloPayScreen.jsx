import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Silk from './Silk';

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
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, text: 'Personalized AI meal plans' },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v8H2zM6 8v8M14 8v8"/></svg>, text: 'Custom workout routines' },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>, text: 'Daily WhatsApp reminders' },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>, text: 'Water intake tracking' },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>, text: 'Progress analytics' },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>, text: 'Weekly plan updates' },
  ];

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <Silk speed={5} scale={1} color="#ff6627" noiseIntensity={1.5} rotation={0} />
      </div>
      <Layout
        title="Solo Weekly Plan"
        subtitle="7 days of personalized health coaching"
        titleColor="#ffffff"
        subtitleColor="rgba(255, 255, 255, 0.9)"
        showBack
        onBack={() => navigate('/group-type')}
      >
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div className="main-card-padding" style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 28,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: 28,
          animation: 'slideUpFade 0.6s ease-out forwards',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(12px, 3vw, 20px)',
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
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 'clamp(20px, 5vw, 24px)', fontWeight: 800, color: '#FFF', marginBottom: 4 }}>
                Solo Plan
              </h2>
              <p style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: 'rgba(255, 255, 255, 0.7)' }}>
                Just for you • Valid 7 days
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: 'clamp(28px, 6vw, 36px)',
                fontWeight: 800,
                color: '#FFF',
                lineHeight: 1,
              }}>
                ₹29
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600 }}>
                per week
              </div>
            </div>
          </div>

          {/* Features */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{
              fontSize: 13,
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: 20,
            }}>
              What's Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: '20px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: 16,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    opacity: 0,
                    animation: 'slideUpFade 0.5s ease-out forwards',
                    animationDelay: `${0.3 + (i * 0.1)}s`,
                  }}
                >
                  <span style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{f.icon}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600, lineHeight: 1.4 }}>{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Value Proposition */}
          <div className="flex-col sm:flex-row text-center sm:text-left" style={{
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
            animationDelay: '0.8s',
            opacity: 0,
          }}>
            <span style={{ color: '#10B981', display: 'flex' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </span>
            <div>
              <p style={{ fontSize: 15, fontWeight: 800, color: '#34D399', margin: '0 0 4px 0' }}>
                Only ₹4.14 per day
              </p>
              <p style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontWeight: 500 }}>
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
                Pay ₹29 & Continue
              </>
            )}
          </button>
        </div>

        {/* Trust Section */}
        <div className="flex-col sm:flex-row" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          padding: '20px',
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.05)',
        }}>
          {[
            { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text: 'Secure Payment' },
            { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>, text: 'No Auto-Renewal' },
            { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>, text: '24/7 Support' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                color: 'rgba(255,255,255,0.7)',
                fontWeight: 500,
              }}
            >
              <span style={{ color: '#FFFFFF', display: 'flex' }}>{item.icon}</span>
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
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.1); transform: scale(1); }
          50% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.4); transform: scale(1.05); }
        }
      `}</style>
    </Layout>
    </>
  );
}
