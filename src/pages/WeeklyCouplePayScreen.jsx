import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import coupleImage from '../assets/couple_transparent.png';

const HeartSVG = ({ width = 100, style = {} }) => (
  <svg viewBox="0 0 32 29.6" width={width} style={{ filter: 'drop-shadow(0 15px 15px rgba(213, 0, 50, 0.3))', ...style }}>
    <defs>
      <radialGradient id="heartGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ff4b72" />
        <stop offset="60%" stopColor="#d50032" />
        <stop offset="100%" stopColor="#8a0020" />
      </radialGradient>
    </defs>
    <path fill="url(#heartGrad)" d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
  </svg>
);

const HangingHeartsBackground = ({ isDark }) => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: isDark ? 'linear-gradient(135deg, #1A0B13 0%, #2D0F1C 50%, #13060E 100%)' : 'linear-gradient(135deg, #FFF0F5 0%, #FFC0CB 50%, #FFB6C1 100%)',
      zIndex: -1,
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isDark ? 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.6) 100%)' : 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(255,182,193,0.3) 100%)',
        pointerEvents: 'none'
      }} />
      <div className="hanging-heart" style={{ left: '10%', height: '35%', animationDelay: '0s' }}><div className="string"></div><HeartSVG width={45} /></div>
      <div className="hanging-heart" style={{ left: '22%', height: '50%', animationDelay: '-2s' }}><div className="string"></div><HeartSVG width={60} /></div>
      <div className="hanging-heart" style={{ left: '34%', height: '25%', animationDelay: '-4s' }}><div className="string"></div><HeartSVG width={40} /></div>
      <div className="hanging-heart" style={{ right: '10%', height: '40%', animationDelay: '-1s' }}><div className="string"></div><HeartSVG width={50} /></div>
      <div className="hanging-heart" style={{ right: '22%', height: '55%', animationDelay: '-3s' }}><div className="string"></div><HeartSVG width={65} /></div>
      <div className="hanging-heart" style={{ right: '34%', height: '30%', animationDelay: '-5s' }}><div className="string"></div><HeartSVG width={45} /></div>
    </div>
  );
};

export default function WeeklyCouplePayScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('paymentComplete', 'true');
      localStorage.setItem('planType', 'couple');
      navigate('/category');
    }, 1200);
  };

  return (
    <>
      <HangingHeartsBackground isDark={isDark} />
      <Layout
        title="Couple Weekly Plan"
        subtitle="Transform together for 7 days"
        showBack
        onBack={() => navigate('/couple-questions')}
      >
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
        {/* Pricing Card */}
        <div style={{
          background: isDark ? 'rgba(20, 10, 15, 0.8)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderRadius: 28,
          padding: '40px 36px',
          boxShadow: isDark ? '0 0 60px rgba(255, 128, 171, 0.25), inset 0 0 0 1px rgba(255, 128, 171, 0.35)' : '0 0 60px rgba(236, 72, 153, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 1)',
          border: 'none',
          marginBottom: 28,
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 32,
            paddingBottom: 28,
            borderBottom: isDark ? '1px solid rgba(255, 128, 171, 0.2)' : '1px solid rgba(236, 72, 153, 0.1)',
          }}>
            <div style={{
              width: 72,
              height: 72,
              background: isDark ? 'linear-gradient(135deg, #FF4081 0%, #C51162 100%)' : 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              boxShadow: isDark ? '0 10px 30px rgba(255, 64, 129, 0.4)' : '0 10px 30px rgba(236, 72, 153, 0.3)',
            }}>
              💑
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: isDark ? '#FFF' : '#111', marginBottom: 4 }}>
                Couple Plan
              </h2>
              <p style={{ fontSize: 14, color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#666' }}>
                Both partners • Valid 7 days
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: 36,
                fontWeight: 800,
                color: isDark ? '#FF4081' : '#EC4899',
                lineHeight: 1,
              }}>
                ₹54
              </div>
              <div style={{ fontSize: 13, color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'var(--gray-400)', fontWeight: 600 }}>
                per week
              </div>
            </div>
          </div>

          {/* Partners Info */}
          <div style={{
            background: isDark ? 'rgba(255, 64, 129, 0.08)' : 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
            borderRadius: 24,
            padding: '28px 24px',
            textAlign: 'center',
            border: isDark ? '1px solid rgba(255, 64, 129, 0.25)' : '1px solid rgba(236, 72, 153, 0.15)',
            boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 24px rgba(236, 72, 153, 0.1)',
            marginBottom: 36,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: -50, left: -50, right: -50, bottom: -50,
              background: isDark ? 'radial-gradient(circle at 50% 50%, rgba(255, 64, 129, 0.15) 0%, transparent 60%)' : 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 60%)',
              zIndex: 0,
            }} />
            <img 
              src={coupleImage} 
              alt="Couple" 
              style={{ 
                height: 180, 
                objectFit: 'contain', 
                display: 'block',
                margin: '0 auto',
                position: 'relative', 
                zIndex: 1,
                animation: 'floatAvatar 4s ease-in-out infinite',
                filter: isDark ? 'drop-shadow(0 10px 20px rgba(255, 64, 129, 0.3))' : 'drop-shadow(0 10px 20px rgba(236, 72, 153, 0.2))'
              }} 
            />
            <div style={{ position: 'relative', zIndex: 1, marginTop: 16 }}>
              <p style={{ fontSize: 16, fontWeight: 800, color: isDark ? '#FFF' : '#333', margin: '0 0 6px 0' }}>Transform Together</p>
              <p style={{ fontSize: 13, color: isDark ? '#FF80AB' : '#EC4899', fontWeight: 600, margin: 0 }}>Individual customized plans for both</p>
            </div>
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
                  padding: '16px 18px',
                  background: isDark ? 'rgba(0, 0, 0, 0.4)' : '#FFF',
                  borderRadius: 14,
                  border: isDark ? '1px solid rgba(255, 64, 129, 0.15)' : '1px solid #E5E7EB',
                }}
              >
                <span style={{ fontSize: 22 }}>{f.icon}</span>
                <span style={{ fontSize: 14, color: isDark ? 'rgba(255, 255, 255, 0.95)' : '#333', fontWeight: 600 }}>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Value */}
          <div style={{
            background: isDark ? 'rgba(16, 185, 129, 0.15)' : 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
            borderRadius: 16,
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 32,
            border: isDark ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(34, 197, 94, 0.2)',
          }}>
            <span style={{ fontSize: 26 }}>💰</span>
            <div>
              <p style={{ fontSize: 15, fontWeight: 800, color: isDark ? '#6EE7B7' : '#059669', margin: 0, marginBottom: 4 }}>
                Only ₹27 per person
              </p>
              <p style={{ fontSize: 13, color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#10B981', margin: 0, fontWeight: 500 }}>
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
              background: isDark ? 'linear-gradient(135deg, #FF4081 0%, #C51162 100%)' : 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
              border: 'none',
              borderRadius: 16,
              padding: '22px',
              fontSize: 18,
              fontWeight: 800,
              color: 'var(--white)',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: isDark ? '0 12px 40px rgba(255, 64, 129, 0.4)' : '0 10px 40px rgba(236, 72, 153, 0.35)',
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
          color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--gray-400)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontWeight: 600,
        }}>
          <span>🔒</span> Secure payment via Razorpay
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes heartBeat {
          0% { transform: translate(-50%, -50%) scale(1); }
          15% { transform: translate(-50%, -50%) scale(1.3); }
          30% { transform: translate(-50%, -50%) scale(1); }
          45% { transform: translate(-50%, -50%) scale(1.3); }
          60%, 100% { transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes floatAvatar {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .hanging-heart {
          position: absolute;
          top: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform-origin: top center;
          animation: swing 6s ease-in-out infinite;
        }
        .string {
          width: 1.5px;
          flex-grow: 1;
          background: #d50032;
        }
        @keyframes swing {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
      `}</style>
    </Layout>
    </>
  );
}
