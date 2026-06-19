import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SparkleBackground from '../components/SparkleBackground';

export default function FriendSizeScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

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

  const options = [
    { value: 2, label: 'Me + 1 Friend', emoji: '👥', price: '₹49', perPerson: '₹24.50' },
    { value: 3, label: 'Me + 2 Friends', emoji: '👥👤', price: '₹84', perPerson: '₹28' },
    { value: 4, label: 'Me + 3 Friends', emoji: '👥👥', price: '₹112', perPerson: '₹28' },
    { value: 5, label: 'Me + 4 Friends', emoji: '👥👥👤', price: '₹140', perPerson: '₹28' },
  ];

  useEffect(() => {
    setTimeout(() => setShowOptions(true), 100);
  }, []);

  const handleContinue = () => {
    if (!selected) return;
    localStorage.setItem('friendCount', selected);
    navigate('/friend-questions');
  };

  return (
    <>
      <SparkleBackground />
      <Layout
        title="How Many Friends?"
        subtitle="Select your squad size"
        showBack
        onBack={() => navigate('/group-type')}
      >
        <div style={{ maxWidth: 550, margin: '0 auto' }}>
          {/* Animated Squad Icon */}
          <div style={{
            position: 'relative',
            width: 140,
            height: 120,
            margin: '0 auto 36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Glowing background orb */}
            <div style={{
              position: 'absolute',
              width: 90, height: 90,
              background: 'rgba(255, 255, 255, 0.35)',
              borderRadius: '50%',
              filter: 'blur(24px)',
              animation: 'pulseGlow 3s ease-in-out infinite'
            }} />
            
            {/* Left Friend */}
            <div style={{
              position: 'absolute',
              left: 10, top: 35,
              width: 48, height: 48,
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '2px solid rgba(255,255,255,0.4)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFF',
              animation: 'floatLeft 4s ease-in-out infinite',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>

            {/* Right Friend */}
            <div style={{
              position: 'absolute',
              right: 10, top: 35,
              width: 48, height: 48,
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '2px solid rgba(255,255,255,0.4)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFF',
              animation: 'floatRight 4.5s ease-in-out infinite',
              animationDelay: '0.5s',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>

            {/* Center Main User */}
            <div style={{
              position: 'absolute',
              zIndex: 2,
              width: 68, height: 68,
              background: '#FFFFFF',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#F06922',
              boxShadow: '0 16px 50px rgba(0,0,0,0.4), 0 0 0 4px rgba(255,255,255,0.2)',
              animation: 'floatCenter 3s ease-in-out infinite'
            }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
          </div>

          {/* Options */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            marginBottom: 36,
          }}>
            {options.map((opt, i) => (
              <div
                key={opt.value}
                onClick={() => setSelected(opt.value)}
                style={{
                  background: isDark
                    ? (selected === opt.value ? 'rgba(20, 10, 15, 0.8)' : 'rgba(0, 0, 0, 0.6)')
                    : (selected === opt.value ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.6)'),
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  borderRadius: 18,
                  padding: '24px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  cursor: 'pointer',
                  border: selected === opt.value
                    ? '2px solid var(--primary)'
                    : (isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(240, 105, 34, 0.1)'),
                  boxShadow: selected === opt.value
                    ? (isDark ? '0 0 40px rgba(240, 105, 34, 0.3), inset 0 0 0 1px rgba(240, 105, 34, 0.4)' : '0 0 40px rgba(240, 105, 34, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 1)')
                    : (isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(240, 105, 34, 0.05)'),
                  transform: showOptions
                    ? selected === opt.value ? 'scale(1.02)' : 'scale(1)'
                    : 'translateX(-20px)',
                  opacity: showOptions ? 1 : 0,
                  transition: 'all 0.4s ease',
                  transitionDelay: `${i * 0.06}s`,
                }}
              >
                {/* Radio */}
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  border: selected === opt.value ? 'none' : (isDark ? '2px solid rgba(255, 255, 255, 0.5)' : '2px solid rgba(0, 0, 0, 0.2)'),
                  background: selected === opt.value
                    ? 'linear-gradient(135deg, #F06922 0%, #D95319 100%)'
                    : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}>
                  {selected === opt.value && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 17, fontWeight: 700, color: isDark ? '#fff' : '#111', marginBottom: 4 }}>
                    {opt.label}
                  </p>
                  <p style={{ fontSize: 13, color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)', fontWeight: 600 }}>
                    {opt.perPerson} per person
                  </p>
                </div>

                {/* Price */}
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 22, fontWeight: 800, color: isDark ? '#fff' : '#111' }}>{opt.price}</p>
                  <p style={{ fontSize: 12, color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)' }}>total/week</p>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selected}
            style={{
              width: '100%',
              background: selected
                ? 'linear-gradient(135deg, #F06922 0%, #D95319 100%)'
                : (isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.05)'),
              backdropFilter: selected ? 'none' : 'blur(10px)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
              borderRadius: 16,
              padding: '20px',
              fontSize: 18,
              fontWeight: 700,
              color: selected ? 'var(--white)' : (isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)'),
              cursor: selected ? 'pointer' : 'not-allowed',
              boxShadow: selected ? '0 10px 40px rgba(240, 105, 34, 0.35)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            Continue
          </button>
        </div>
      </Layout>
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 0.8; }
        }
        @keyframes floatCenter {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatLeft {
          0%, 100% { transform: translate(0, 0) rotate(-5deg); }
          50% { transform: translate(-4px, -6px) rotate(-10deg); }
        }
        @keyframes floatRight {
          0%, 100% { transform: translate(0, 0) rotate(5deg); }
          50% { transform: translate(4px, -6px) rotate(10deg); }
        }
      `}</style>
    </>
  );
}
