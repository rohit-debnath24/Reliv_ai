import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { api } from '../utils/constants';

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

export default function CouplePhoneScreen() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(null);

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

  const handleSubmit = async () => {
    if (phone.length !== 10) return setError('Enter valid 10-digit number');
    if (!name.trim()) return setError('Please enter their name');

    setLoading(true);
    setError('');

    localStorage.setItem('partnerPhone', `+91${phone}`);
    localStorage.setItem('partnerName', name);

    setTimeout(() => {
      navigate('/couple-questions');
    }, 600);
  };

  return (
    <>
      <HangingHeartsBackground isDark={isDark} />
      <Layout
        showBack
        onBack={() => navigate('/group-type')}
      >
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        {/* Main Card */}
        <div className="couple-phone-card" style={{
          background: isDark ? 'rgba(20, 10, 15, 0.7)' : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: isDark ? '0 24px 80px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.1)' : '0 24px 80px rgba(236, 72, 153, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.8)',
          border: isDark ? '1px solid rgba(255, 182, 193, 0.1)' : '1px solid rgba(255, 182, 193, 0.5)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle glow behind the card */}
          <div style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(255,105,180,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Icon */}
          <div style={{
            width: 96,
            height: 96,
            background: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 36px',
            fontSize: 48,
            boxShadow: '0 16px 40px rgba(255, 20, 147, 0.4), inset 0 4px 12px rgba(255, 255, 255, 0.4)',
            border: '4px solid #FFF',
            position: 'relative',
            animation: 'pulseHeart 2s infinite',
          }}>
            💑
          </div>

          {/* Title and Subtitle */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{
              fontSize: 32,
              fontWeight: 800,
              color: isDark ? '#FF80AB' : '#C2185B',
              marginBottom: 12,
              letterSpacing: '-0.5px',
            }}>
              Link Your Hearts 💖
            </h2>
            <p style={{
              fontSize: 16,
              color: isDark ? '#FFB6C1' : '#D81B60',
              lineHeight: 1.5,
              fontWeight: 500,
            }}>
              Invite your partner to share this beautiful journey
            </p>
          </div>

          {/* Name Input */}
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: 'block',
              fontSize: 14,
              color: 'var(--gray-600)',
              marginBottom: 10,
              fontWeight: 600,
            }}>
              Partner's Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              placeholder="Enter their name"
              style={{
                width: '100%',
                background: focused === 'name' ? 'var(--cream-100)' : 'var(--gray-50)',
                border: `2px solid ${focused === 'name' ? '#EC4899' : 'var(--gray-200)'}`,
                borderRadius: 14,
                padding: '18px 20px',
                fontSize: 17,
                fontWeight: 500,
                color: 'var(--gray-900)',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxShadow: focused === 'name' ? '0 0 0 4px rgba(236, 72, 153, 0.1)' : 'none',
              }}
            />
          </div>

          {/* Phone Input */}
          <div style={{ marginBottom: 28 }}>
            <label style={{
              display: 'block',
              fontSize: 14,
              color: 'var(--gray-600)',
              marginBottom: 10,
              fontWeight: 600,
            }}>
              Partner's Phone Number
            </label>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
                border: isDark ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid #FBCFE8',
                borderRadius: 14,
                padding: '0 18px',
                display: 'flex',
                alignItems: 'center',
                fontSize: 16,
                fontWeight: 700,
                color: isDark ? '#FFB6C1' : '#EC4899',
                gap: 8,
              }}>
                🇮🇳 +91
              </div>
              <input
                type="tel"
                maxLength="10"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                onFocus={() => setFocused('phone')}
                onBlur={() => setFocused(null)}
                placeholder="10-digit number"
                style={{
                  flex: 1,
                  background: focused === 'phone' ? 'var(--cream-100)' : 'var(--gray-50)',
                  border: `2px solid ${focused === 'phone' ? '#EC4899' : error ? '#EF4444' : 'var(--gray-200)'}`,
                  borderRadius: 14,
                  padding: '18px 20px',
                  fontSize: 17,
                  fontWeight: 600,
                  color: 'var(--gray-900)',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  letterSpacing: '1px',
                  boxShadow: focused === 'phone' ? '0 0 0 4px rgba(236, 72, 153, 0.1)' : 'none',
                }}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: '#FEE2E2',
              border: '1px solid #EF4444',
              borderRadius: 12,
              padding: '14px 18px',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <span>⚠️</span>
              <span style={{ fontSize: 14, color: '#DC2626', fontWeight: 600 }}>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || phone.length !== 10 || !name.trim()}
            style={{
              width: '100%',
              background: phone.length === 10 && name.trim()
                ? 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)'
                : 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
              border: 'none',
              borderRadius: 16,
              padding: '20px',
              fontSize: 18,
              fontWeight: 700,
              color: phone.length === 10 && name.trim() ? 'var(--white)' : 'var(--gray-400)',
              cursor: phone.length === 10 && name.trim() && !loading ? 'pointer' : 'not-allowed',
              boxShadow: phone.length === 10 && name.trim() ? '0 10px 40px rgba(236, 72, 153, 0.35)' : 'none',
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
                  width: 22,
                  height: 22,
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'var(--white)',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                Sending Love... 💕
              </>
            ) : (
              'Send Love Invite 💌'
            )}
          </button>
        </div>

        {/* Note */}
        <p style={{
          textAlign: 'center',
          marginTop: 24,
          fontSize: 13,
          color: 'var(--gray-400)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}>
          <span>📱</span>
          They'll receive WhatsApp reminders too
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
        @keyframes pulseHeart {
          0%, 100% { transform: scale(1); box-shadow: 0 16px 40px rgba(255, 20, 147, 0.4), inset 0 4px 12px rgba(255, 255, 255, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 20px 50px rgba(255, 20, 147, 0.6), inset 0 4px 12px rgba(255, 255, 255, 0.4); }
        }
        .couple-phone-card {
          border-radius: 32px;
          padding: 48px 40px;
        }
        @media (max-width: 640px) {
          .couple-phone-card {
            border-radius: 24px;
            padding: 32px 24px;
          }
        }
      `}</style>
    </Layout>
    </>
  );
}
