import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SparkleBackground from '../components/SparkleBackground';

export default function ReturnDailyAgainScreen() {
  const navigate = useNavigate();

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

  const lastCeleb = localStorage.getItem('celebrity') || 'virat';
  const celebEmojis = {
    virat: '🏏', alia: '🧘‍♀️', salman: '💪',
    deepika: '✨', hrithik: '🔥', priyanka: '🌟'
  };

  return (
    <>
      <SparkleBackground />
      <Layout
        title="Ready for Another Day? ⚡"
        subtitle="Your last celebrity plan was a hit! Try again or explore a new routine."
        showBack
        onBack={() => navigate('/')}
      >
      <div className="w-full px-4 sm:px-0 animate-[fadeInUp_0.5s_ease-out]" style={{ maxWidth: 600, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Main Card */}
        <div 
          className="main-card-padding backdrop-blur-xl"
          style={{
            background: isDark 
              ? 'linear-gradient(135deg, rgba(27, 31, 23, 0.75) 0%, rgba(22, 26, 19, 0.75) 100%)' 
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.65) 100%)',
            borderRadius: 32,
            boxShadow: isDark
              ? '0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
              : '0 20px 50px rgba(240, 105, 34, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(240, 105, 34, 0.1)',
            textAlign: 'center',
            transition: 'all 0.4s ease',
          }}
        >
          {/* Icon Container */}
          <div 
            style={{
              width: 80,
              height: 80,
              background: isDark 
                ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(249, 115, 22, 0.1) 100%)' 
                : 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(249, 115, 22, 0.05) 100%)',
              borderRadius: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 28px',
              border: isDark ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(245, 158, 11, 0.2)',
              boxShadow: isDark 
                ? '0 12px 35px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)' 
                : '0 12px 30px rgba(245, 158, 11, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Lightning Bolt SVG */}
            <svg 
              width="34" 
              height="34" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              style={{ 
                filter: 'drop-shadow(0 2px 10px rgba(245, 158, 11, 0.45))',
                color: '#F59E0B'
              }}
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            
            {/* Decorative shine */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transform: 'skewX(-25deg)',
              animation: 'shine-effect 3.5s infinite ease-in-out'
            }} />
          </div>

          <h2 style={{
            fontSize: 26,
            fontWeight: 800,
            color: 'var(--gray-900)',
            marginBottom: 10,
            letterSpacing: '-0.5px'
          }}>
            Welcome Back to Reliv!
          </h2>

          <p style={{
            fontSize: 15,
            color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--gray-500)',
            marginBottom: 32,
            lineHeight: 1.6,
          }}>
            Your customized fitness routine is ready. Choose an option below to proceed.
          </p>

          {/* Last Plan Upgrade */}
          <div style={{
            background: isDark 
              ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.05) 100%)' 
              : 'linear-gradient(135deg, rgba(254, 243, 199, 0.6) 0%, rgba(253, 230, 138, 0.4) 100%)',
            borderRadius: 20,
            padding: '16px 20px',
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            border: isDark ? '1px solid rgba(245, 158, 11, 0.25)' : '1px solid rgba(245, 158, 11, 0.35)',
            boxShadow: isDark 
              ? '0 4px 20px rgba(0,0,0,0.15)' 
              : '0 4px 15px rgba(245, 158, 11, 0.04)',
          }}>
            <div style={{ 
              fontSize: 28,
              width: 52,
              height: 52,
              background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              {celebEmojis[lastCeleb]}
            </div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <p style={{ 
                fontSize: 11, 
                color: isDark ? 'rgba(245, 158, 11, 0.9)' : '#92400E', 
                fontWeight: 700, 
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                margin: 0
              }}>Last Choice</p>
              <p style={{ 
                fontSize: 16, 
                fontWeight: 800, 
                color: isDark ? '#FFF' : '#78350F', 
                textTransform: 'capitalize',
                margin: '2px 0 0'
              }}>{lastCeleb} Routine</p>
            </div>
            <span style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#FFF',
              fontSize: 11,
              fontWeight: 700,
              padding: '6px 12px',
              borderRadius: 20,
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Completed
            </span>
          </div>

          {/* Options */}
          <div style={{ display: 'grid', gap: 16 }}>
            {/* Repeat Same Plan */}
            <button
              onClick={() => {
                localStorage.setItem('planType', 'daily');
                navigate('/daily-pay');
              }}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                border: 'none',
                borderRadius: 18,
                padding: '18px 24px',
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--white)',
                cursor: 'pointer',
                boxShadow: isDark ? '0 10px 30px rgba(240, 105, 34, 0.35)' : 'var(--shadow-glow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = isDark 
                  ? '0 15px 35px rgba(240, 105, 34, 0.45)' 
                  : '0 15px 35px rgba(240, 105, 34, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = isDark ? '0 10px 30px rgba(240, 105, 34, 0.35)' : 'var(--shadow-glow)';
              }}
            >
              {/* Sync/Repeat SVG Icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin-slow 8s linear infinite' }}>
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              Repeat Same Plan
            </button>

            {/* Try New Celebrity */}
            <button
              onClick={() => navigate('/fan-quiz-type')}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                border: 'none',
                borderRadius: 18,
                padding: '18px 24px',
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--white)',
                cursor: 'pointer',
                boxShadow: isDark ? '0 10px 30px rgba(139, 92, 246, 0.25)' : '0 10px 30px rgba(139, 92, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = isDark 
                  ? '0 15px 35px rgba(139, 92, 246, 0.35)' 
                  : '0 15px 35px rgba(139, 92, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = isDark ? '0 10px 30px rgba(139, 92, 246, 0.25)' : '0 10px 30px rgba(139, 92, 246, 0.15)';
              }}
            >
              {/* Star SVG Icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Try New Celebrity
            </button>

            {/* Switch to Weekly Plan */}
            <button
              onClick={() => navigate('/group-type')}
              style={{
                width: '100%',
                background: 'transparent',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid var(--gray-300)',
                borderRadius: 16,
                padding: '16px 20px',
                fontSize: 15,
                fontWeight: 600,
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'var(--gray-700)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)';
                e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.3)' : 'var(--gray-400)';
                e.currentTarget.style.color = isDark ? '#FFFFFF' : 'var(--gray-900)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.15)' : '1px solid var(--gray-300)';
                e.currentTarget.style.color = isDark ? 'rgba(255, 255, 255, 0.8)' : 'var(--gray-700)';
              }}
            >
              {/* Calendar SVG Icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Switch to Weekly Plan
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shine-effect {
          0% { left: -100%; }
          50%, 100% { left: 200%; }
        }
      `}</style>
    </Layout>
    </>
  );
}
