import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SparkleBackground from '../components/SparkleBackground';

export default function WeeklySoloPayScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Theme State
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true; // default to dark
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const saved = localStorage.getItem("theme");
      setIsDark(saved ? saved === "dark" : true);
    };
    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

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
      <SparkleBackground />
      <Layout
        title="Solo Weekly Plan"
        subtitle="7 days of personalized health coaching"
        showBack
        onBack={() => navigate('/group-type')}
      >
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div className="checkout-card">
          {/* Header */}
          <div className="checkout-header-row" style={{
            borderBottom: `1px solid ${isDark ? '#23262F' : '#E5E7EB'}`,
          }}>
            <div className="checkout-header-icon" style={{
              background: isDark ? 'rgba(240, 105, 34, 0.12)' : 'rgba(240, 105, 34, 0.08)',
              border: `1px solid ${isDark ? 'rgba(240, 105, 34, 0.2)' : 'rgba(240, 105, 34, 0.15)'}`,
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <h2 className="checkout-header-title" style={{ color: isDark ? '#FFFFFF' : '#111827' }}>
                Solo Plan
              </h2>
              <p className="checkout-header-sub" style={{ color: isDark ? '#8A8F98' : '#6B7280' }}>
                Just for you • Valid 7 days
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="checkout-header-price" style={{
                color: isDark ? '#FFFFFF' : '#111827',
              }}>
                ₹29
              </div>
              <div className="checkout-header-price-sub" style={{ color: isDark ? '#8A8F98' : '#6B7280' }}>
                per week
              </div>
            </div>
          </div>

          {/* Features */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{
              fontSize: 13,
              fontWeight: 700,
              color: isDark ? '#8A8F98' : '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: 20,
            }}>
              What's Included
            </h3>
            <div className="features-scroll-box">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="feature-item"
                  style={{
                    animationDelay: `${0.3 + (i * 0.05)}s`,
                  }}
                >
                  <span style={{ color: '#F06922', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {f.icon}
                  </span>
                  <span style={{ fontSize: 13, color: isDark ? '#E5E7EB' : '#4B5563', fontWeight: 600, lineHeight: 1.3 }}>
                    {f.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Value Proposition */}
          <div className="value-prop-box flex-col sm:flex-row text-center sm:text-left">
            <span style={{ color: '#F06922', display: 'flex' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </span>
            <div>
              <p style={{ fontSize: 15, fontWeight: 800, color: isDark ? '#FF8A4C' : '#E85C25', margin: '0 0 4px 0' }}>
                Only ₹4.14 per day
              </p>
              <p style={{ fontSize: 13, color: isDark ? '#8A8F98' : '#4B5563', margin: 0, fontWeight: 500 }}>
                Less than a cup of chai!
              </p>
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePay}
            disabled={loading}
            className="pay-btn"
          >
            {loading ? (
              <>
                <span style={{
                  width: 24,
                  height: 24,
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff',
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
        <div className="trust-box flex-col sm:flex-row">
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
                fontWeight: 500,
              }}
            >
              <span style={{ color: '#F06922', display: 'flex' }}>{item.icon}</span>
              <span style={{ color: isDark ? '#8A8F98' : '#6B7280' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .checkout-card {
          background: ${isDark ? '#16181E' : '#FFFFFF'};
          border-radius: 24px;
          border: 1px solid ${isDark ? '#23262F' : '#E5E7EB'};
          box-shadow: ${isDark ? '0 8px 30px rgba(0, 0, 0, 0.3)' : '0 8px 30px rgba(0, 0, 0, 0.05)'};
          padding: 32px;
          margin-bottom: 28px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: slideUpFade 0.6s ease-out forwards;
          color: ${isDark ? '#FFFFFF' : '#111827'};
        }
        .checkout-card:hover {
          transform: translateY(-2px);
          box-shadow: ${isDark ? '0 12px 40px rgba(0, 0, 0, 0.4)' : '0 12px 40px rgba(0, 0, 0, 0.08)'};
        }

        .checkout-header-row {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
          padding-bottom: 28px;
        }
        .checkout-header-icon {
          width: 72px;
          height: 72px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #F06922;
          animation: pulseGlow 3s ease-in-out infinite;
          flex-shrink: 0;
        }
        .checkout-header-title {
          font-size: 24px;
          font-weight: 800;
          margin-top: 0;
          margin-bottom: 4px;
        }
        .checkout-header-sub {
          font-size: 14px;
          margin: 0;
        }
        .checkout-header-price {
          font-size: 36px;
          font-weight: 800;
          line-height: 1;
        }
        .checkout-header-price-sub {
          font-size: 13px;
          font-weight: 600;
        }

        .features-scroll-box {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        @media (max-width: 639px) {
          .features-scroll-box {
            grid-template-columns: 1fr;
            max-height: 180px;
            overflow-y: auto;
            padding-right: 6px;
            scrollbar-width: thin;
            scrollbar-color: #F06922 transparent;
          }
          .features-scroll-box::-webkit-scrollbar {
            width: 4px;
          }
          .features-scroll-box::-webkit-scrollbar-track {
            background: transparent;
          }
          .features-scroll-box::-webkit-scrollbar-thumb {
            background-color: #F06922;
            border-radius: 10px;
          }
        }

        .feature-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: ${isDark ? '#12141A' : '#F9FAFB'};
          border-radius: 12px;
          border: 1px solid ${isDark ? '#23262F' : '#E5E7EB'};
          opacity: 0;
          animation: slideUpFade 0.5s ease-out forwards;
          transition: all 0.2s ease;
        }
        .feature-item:hover {
          transform: translateY(-1px);
          border-color: #F06922;
        }

        .value-prop-box {
          background: ${isDark ? 'rgba(240, 105, 34, 0.08)' : 'var(--cream-200)'};
          border-radius: 16px;
          padding: 18px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
          border: 1px solid ${isDark ? 'rgba(240, 105, 34, 0.2)' : 'var(--cream-400)'};
          animation: slideUpFade 0.5s ease-out forwards;
          animation-delay: 0.8s;
          opacity: 0;
        }

        .pay-btn {
          width: 100%;
          padding: 20px;
          font-size: 18px;
          font-weight: 700;
          border-radius: 16px;
          background: #F06922;
          color: #FFFFFF;
          border: 1px solid #F06922;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          outline: none;
          box-shadow: 0 4px 16px rgba(240, 105, 34, 0.25);
        }
        .pay-btn:not(:disabled):hover {
          background: #E85C25;
          border-color: #E85C25;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(240, 105, 34, 0.35);
        }
        .pay-btn:not(:disabled):active {
          transform: translateY(0);
        }

        .trust-box {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding: 20px;
          border-radius: 16px;
          background: ${isDark ? '#16181E' : '#FFFFFF'};
          border: 1px solid ${isDark ? '#23262F' : '#E5E7EB'};
          box-shadow: ${isDark ? '0 4px 20px rgba(0, 0, 0, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.03)'};
          animation: slideUpFade 0.6s ease-out forwards;
          animation-delay: 0.9s;
          opacity: 0;
        }

        @media (max-width: 599px) {
          .checkout-card {
            padding: 24px 20px;
          }
          .trust-box {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
            padding: 16px 20px;
          }
        }

        @media (max-width: 480px) {
          .checkout-card {
            padding: 20px 16px;
            margin-bottom: 20px;
          }
          .checkout-header-row {
            gap: 12px;
            margin-bottom: 20px;
            padding-bottom: 16px;
          }
          .checkout-header-icon {
            width: 52px;
            height: 52px;
            border-radius: 14px;
          }
          .checkout-header-icon svg {
            width: 24px;
            height: 24px;
          }
          .checkout-header-title {
            font-size: 18px;
          }
          .checkout-header-sub {
            font-size: 12px;
          }
          .checkout-header-price {
            font-size: 26px;
          }
          .checkout-header-price-sub {
            font-size: 11px;
          }
          .feature-item {
            padding: 8px 12px;
          }
          .feature-item span {
            font-size: 12.5px !important;
          }
          .feature-item svg {
            width: 16px;
            height: 16px;
          }
          .value-prop-box {
            padding: 12px 14px;
            gap: 12px;
            margin-bottom: 24px;
          }
          .value-prop-box p {
            font-size: 12px !important;
          }
          .value-prop-box p:first-of-type {
            font-size: 13.5px !important;
          }
          .pay-btn {
            padding: 14px 20px;
            font-size: 15px;
            border-radius: 12px;
          }
          .trust-box {
            flex-direction: row !important;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px 16px !important;
            padding: 12px 14px;
          }
          .trust-box > div {
            font-size: 11px !important;
            gap: 4px !important;
          }
          .trust-box svg {
            width: 14px;
            height: 14px;
          }
        }

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
