import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SparkleBackground from '../components/SparkleBackground';
import { C } from '../utils/constants';

export default function CodeEntryScreen() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

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

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (i, val) => {
    if (val.length > 1) val = val[0];
    const newCode = [...code];
    newCode[i] = val;
    setCode(newCode);
    setError('');

    if (val && i < 3) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    const newCode = [...code];
    for (let i = 0; i < pasted.length; i++) {
      newCode[i] = pasted[i];
    }
    setCode(newCode);
    if (pasted.length === 4) {
      inputRefs.current[3]?.focus();
    }
  };

  const handleSubmit = async () => {
    const accessCode = code.join('');
    if (accessCode.length !== 4) return;

    setLoading(true);
    setError('');

    // Demo codes for testing
    const demoCodes = ['9876', '6241', '1234'];

    setTimeout(() => {
      if (demoCodes.includes(accessCode)) {
        localStorage.setItem('accessCode', accessCode);
        localStorage.setItem('userType', 'returning');
        // Randomly route to different return states for demo
        const routes = ['/return-active', '/return-expired', '/return-daily-again'];
        navigate(routes[Math.floor(Math.random() * routes.length)]);
      } else {
        setError('Code not found');
        setLoading(false);
      }
    }, 800);
  };

  const handleDemoClick = (demoVal) => {
    setError('');
    const newCode = demoVal.split('');
    setCode(newCode);
    
    // Focus the last input cell
    setTimeout(() => {
      inputRefs.current[3]?.focus();
    }, 50);
  };

  const isComplete = code.every(d => d);

  return (
    <>
      <SparkleBackground />
      <Layout
        title="Welcome Back! 👋"
        subtitle="Enter your 4-digit access code to continue"
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
                ? 'linear-gradient(135deg, rgba(240, 105, 34, 0.15) 0%, rgba(240, 105, 34, 0.05) 100%)' 
                : 'linear-gradient(135deg, rgba(240, 105, 34, 0.1) 0%, rgba(240, 105, 34, 0.02) 100%)',
              borderRadius: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 28px',
              border: isDark ? '1px solid rgba(240, 105, 34, 0.25)' : '1px solid rgba(240, 105, 34, 0.15)',
              boxShadow: isDark 
                ? '0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)' 
                : '0 10px 25px rgba(240, 105, 34, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Key Icon SVG */}
            <svg 
              width="36" 
              height="36" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="var(--primary)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(240, 105, 34, 0.3))' }}
            >
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
            </svg>
            
            {/* Decorative shine overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
              transform: 'skewX(-25deg)',
              animation: 'shine-effect 3s infinite ease-in-out'
            }} />
          </div>

          {/* Code Input Boxes */}
          <div
            className="flex justify-center gap-3 sm:gap-4 mb-8"
            onPaste={handlePaste}
          >
            {code.map((d, i) => (
              <input
                key={i}
                ref={(el) => inputRefs.current[i] = el}
                type="tel"
                maxLength="1"
                value={d}
                placeholder="•"
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-[3.2rem] h-[4rem] sm:w-[72px] sm:h-[84px] text-[24px] sm:text-[32px] tracking-widest font-mono"
                style={{
                  background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                  border: `2px solid ${
                    error 
                      ? 'var(--error)' 
                      : d 
                        ? 'var(--primary)' 
                        : isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  }`,
                  borderRadius: 16,
                  fontWeight: '700',
                  color: 'var(--gray-900)',
                  textAlign: 'center',
                  outline: 'none',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: d 
                    ? (isDark ? '0 8px 24px rgba(240, 105, 34, 0.2)' : '0 8px 20px rgba(240, 105, 34, 0.12)')
                    : 'none',
                  caretColor: 'var(--primary)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary)';
                  e.target.style.background = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.9)';
                  e.target.style.boxShadow = isDark
                    ? '0 0 0 4px rgba(240, 105, 34, 0.25), 0 8px 24px rgba(240, 105, 34, 0.2)'
                    : '0 0 0 4px rgba(240, 105, 34, 0.15), 0 8px 20px rgba(240, 105, 34, 0.12)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = error 
                    ? 'var(--error)' 
                    : d 
                      ? 'var(--primary)' 
                      : isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                  e.target.style.background = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)';
                  e.target.style.boxShadow = d 
                    ? (isDark ? '0 8px 24px rgba(240, 105, 34, 0.2)' : '0 8px 20px rgba(240, 105, 34, 0.12)')
                    : 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            ))}
          </div>

          {/* Demo Hint Upgrade */}
          <div style={{
            background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(240, 105, 34, 0.03)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(240, 105, 34, 0.08)',
            borderRadius: 16,
            padding: '12px 16px',
            marginBottom: 28,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'var(--gray-500)',
            }}>
              {/* Info Icon SVG */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Quick Demo Sandbox
            </div>
            <div style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
            }}>
              <span style={{ fontSize: 11, color: 'var(--gray-400)', marginRight: 2 }}>Click to auto-fill:</span>
              {['9876', '6241', '1234'].map((demoCode) => (
                <button
                  key={demoCode}
                  onClick={() => handleDemoClick(demoCode)}
                  style={{
                    background: isDark ? 'rgba(240, 105, 34, 0.1)' : 'rgba(240, 105, 34, 0.05)',
                    border: '1px solid rgba(240, 105, 34, 0.2)',
                    borderRadius: 8,
                    padding: '4px 10px',
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--primary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--white)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isDark ? 'rgba(240, 105, 34, 0.1)' : 'rgba(240, 105, 34, 0.05)';
                    e.currentTarget.style.color = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {demoCode}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message Upgrade */}
          {error && (
            <div 
              style={{
                background: isDark ? 'rgba(239, 68, 68, 0.08)' : 'rgba(239, 68, 68, 0.04)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 16,
                padding: '14px 18px',
                marginBottom: 24,
                display: 'flex',
                alignItems: 'flex-start',
                textAlign: 'left',
                gap: 12,
                animation: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.05)',
              }}
            >
              {/* Alert SVG Icon */}
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="var(--error)" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                style={{ marginTop: 2, flexShrink: 0 }}
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div>
                <p style={{ fontSize: 14, color: 'var(--error)', fontWeight: 700, margin: 0 }}>
                  Verification Failed
                </p>
                <p style={{ fontSize: 12, color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--gray-500)', margin: '3px 0 0' }}>
                  {error === 'Code not found' ? 'The code you entered does not match our records.' : error}
                </p>
              </div>
            </div>
          )}

          {/* Continue Button Upgrade */}
          <button
            onClick={handleSubmit}
            disabled={loading || !isComplete}
            style={{
              width: '100%',
              background: isComplete
                ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)'
                : isDark ? 'rgba(255, 255, 255, 0.05)' : 'var(--gray-200)',
              border: 'none',
              borderRadius: 18,
              padding: '18px 24px',
              fontSize: 16,
              fontWeight: 700,
              color: isComplete ? 'var(--white)' : isDark ? 'rgba(255,255,255,0.2)' : 'var(--gray-400)',
              cursor: isComplete && !loading ? 'pointer' : 'not-allowed',
              boxShadow: isComplete 
                ? (isDark ? '0 10px 30px rgba(240, 105, 34, 0.35)' : 'var(--shadow-glow)') 
                : 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              if (isComplete && !loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = isDark 
                  ? '0 15px 35px rgba(240, 105, 34, 0.45)' 
                  : '0 15px 35px rgba(240, 105, 34, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (isComplete && !loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = isComplete 
                  ? (isDark ? '0 10px 30px rgba(240, 105, 34, 0.35)' : 'var(--shadow-glow)') 
                  : 'none';
              }
            }}
          >
            {loading ? (
              <>
                <span className="spinner-loader" style={{
                  width: 20,
                  height: 20,
                  border: '2.5px solid rgba(255,255,255,0.25)',
                  borderTopColor: 'var(--white)',
                  borderRadius: '50%',
                  animation: 'spin 0.6s linear infinite',
                }} />
                <span>Verifying Access...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>

          {/* Divider Upgrade */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            margin: '28px 0',
            color: isDark ? 'rgba(255,255,255,0.3)' : 'var(--gray-400)',
            fontSize: 13,
            fontWeight: 500,
          }}>
            <div style={{ flex: 1, height: 1, background: isDark ? 'rgba(255,255,255,0.08)' : 'var(--gray-200)' }} />
            <span>or alternative options</span>
            <div style={{ flex: 1, height: 1, background: isDark ? 'rgba(255,255,255,0.08)' : 'var(--gray-200)' }} />
          </div>

          {/* New User Button Upgrade */}
          <button
            onClick={() => navigate('/phone')}
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
            {/* Phone SVG Icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
            Start Fresh with Phone Number
          </button>
        </div>

        {/* Help Text Upgrade */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          marginTop: 24,
          fontSize: 13,
          color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'var(--gray-400)',
        }}>
          {/* Lock SVG Icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Your code is linked securely to your phone number
        </div>
      </div>

      <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shine-effect {
          0% { left: -100%; }
          50%, 100% { left: 200%; }
        }
        input::placeholder {
          color: var(--gray-300);
          opacity: 0.5;
          font-size: 20px;
        }
        .dark input::placeholder {
          color: var(--gray-500);
          opacity: 0.35;
        }
      `}</style>
    </Layout>
    </>
  );
}
