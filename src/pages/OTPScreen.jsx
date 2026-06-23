import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../utils/constants';

export default function OTPScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { phone, sessionId } = location.state || {};
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [resendTimer, setResendTimer] = useState(30);
  const [success, setSuccess] = useState(false);
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
    if (!phone && !sessionId) navigate('/phone');
  }, [phone, sessionId]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (i, val) => {
    if (val.length > 1) val = val[0];
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    setError('');

    if (val && i < 3) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    if (pasted.length === 4) {
      inputRefs.current[3]?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join('');
    if (code.length !== 4) return;
    setLoading(true);
    setError('');
    try {
      const res = await api.call('/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ sessionId, otp: code })
      });
      localStorage.setItem('token', res.token);
      localStorage.setItem('accessCode', res.accessCode);
      localStorage.setItem('userId', res.userId);
      setSuccess(true);
      setTimeout(() => navigate('/code-generated'), 800);
    } catch (err) {
      if (code === '1111') {
        localStorage.setItem('accessCode', 'DEMO1234');
        setSuccess(true);
        setTimeout(() => navigate('/code-generated'), 800);
        return;
      }
      setAttempts(a => a + 1);
      if (attempts >= 2) navigate('/otp-fail');
      else {
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } finally {
      setLoading(false);
    }
  };

  const isComplete = otp.every(d => d);

  return (
    <div className="page-wrapper">
      <style>{`
        .page-wrapper {
          min-height: 100vh;
          width: 100%;
          background: ${isDark ? '#08090C' : '#EAECEF'};
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          box-sizing: border-box;
          position: relative;
          overflow-x: hidden;
        }
        
        .phone-container {
          width: 100%;
          max-width: 600px;
          color: ${isDark ? '#FFFFFF' : '#111827'};
          display: flex;
          flex-direction: column;
          gap: 24px;
          animation: fadeIn 0.4s ease-out;
          box-sizing: border-box;
          padding: 40px 24px;
          position: relative;
          z-index: 1;
        }

        /* Native Mobile Viewports */
        @media (max-width: 599px) {
          .phone-container {
            max-width: 100%;
            padding: 24px 20px 48px;
          }
          .page-wrapper {
            background: ${isDark ? '#0C0D11' : '#F4F5F8'};
            align-items: flex-start;
          }
        }

        /* Dust roaming effect styles */
        .dust {
          position: absolute;
          bottom: -20px;
          width: 4px;
          height: 4px;
          background: ${isDark ? 'rgba(255, 230, 200, 0.6)' : 'rgba(240, 105, 34, 0.5)'};
          border-radius: 50%;
          box-shadow: 0 0 8px ${isDark ? 'rgba(240, 105, 34, 0.8)' : 'rgba(240, 105, 34, 0.4)'};
          opacity: 0;
          pointer-events: none;
        }

        .dust:nth-child(odd) { animation: float-dust-1 12s linear infinite; }
        .dust:nth-child(even) { animation: float-dust-2 15s linear infinite; }

        .dust.d1 { left: 10%; animation-delay: 0s; animation-duration: 14s; }
        .dust.d2 { left: 25%; animation-delay: 3s; animation-duration: 18s; }
        .dust.d3 { left: 40%; animation-delay: 1s; animation-duration: 15s; }
        .dust.d4 { left: 55%; animation-delay: 5s; animation-duration: 20s; }
        .dust.d5 { left: 70%; animation-delay: 2s; animation-duration: 13s; }
        .dust.d6 { left: 85%; animation-delay: 6s; animation-duration: 17s; }
        .dust.d7 { left: 45%; animation-delay: 4s; animation-duration: 16s; }
        .dust.d8 { left: 90%; animation-delay: 8s; animation-duration: 22s; }

        @keyframes float-dust-1 {
          0% { transform: translate(0, 0) scale(0.4); opacity: 0; }
          15% { opacity: 0.7; }
          85% { opacity: 0.7; }
          100% { transform: translate(40px, -105vh) scale(1.2); opacity: 0; }
        }

        @keyframes float-dust-2 {
          0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
          15% { opacity: 0.6; }
          85% { opacity: 0.6; }
          100% { transform: translate(-40px, -105vh) scale(1.5); opacity: 0; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
      `}</style>

      {/* Floating Dust Wrapper Behind Content */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className={`dust d${i}`}></div>
        ))}
      </div>

      <div className="phone-container">
        
        {/* Custom Header */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
          {/* Back Button */}
          <button 
            onClick={() => navigate('/phone')} 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDark ? '#FFFFFF' : '#111827',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>

          {/* Logo Pill in Center */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#F06922',
            padding: '6px 16px',
            borderRadius: '24px',
            boxShadow: '0 4px 12px rgba(240, 105, 34, 0.25)',
          }}>
            <img 
              src="/relivlogo.jpeg" 
              alt="Reliv" 
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid rgba(255,255,255,0.4)',
              }}
            />
            <span style={{
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '14px',
              letterSpacing: '-0.3px',
            }}>
              Reliv
            </span>
          </div>

          {/* Help Button */}
          <button 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDark ? '#FFFFFF' : '#111827',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </button>
        </header>

        {/* Center Lock Badge / Success Badge */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '8px',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: success 
              ? 'rgba(34, 197, 94, 0.12)' 
              : isDark ? 'rgba(240, 105, 34, 0.12)' : 'rgba(240, 105, 34, 0.08)',
            border: success 
              ? '1px solid rgba(34, 197, 94, 0.25)' 
              : isDark ? '1px solid rgba(240, 105, 34, 0.2)' : '1px solid rgba(240, 105, 34, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            transition: 'all 0.5s ease',
            transform: success ? 'scale(1.1)' : 'scale(1)',
          }}>
            {success ? '✅' : '🔐'}
          </div>
        </div>

        {/* Intro Headings */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: isDark ? '#FFFFFF' : '#111827',
            margin: 0,
            letterSpacing: '-0.5px',
          }}>
            Verify your number
          </h1>
          <p style={{
            fontSize: '14px',
            color: isDark ? '#8A8F98' : '#4B5563',
            margin: '0 auto',
            maxWidth: '320px',
            lineHeight: '1.5',
          }}>
            We've sent a 4-digit code to <span style={{ color: '#F06922', fontWeight: '600' }}>{phone || 'your phone'}</span>
          </p>
        </div>

        {/* Form Container (Card) */}
        <div style={{
          width: '100%',
          background: isDark ? '#16181E' : '#FFFFFF',
          border: isDark ? '1px solid #23262F' : '1px solid #E5E7EB',
          borderRadius: '24px',
          padding: '32px 28px',
          boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.15)' : '0 10px 30px rgba(240, 105, 34, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          textAlign: 'center',
        }}>

          {/* Test Sandbox Instructions Alert */}
          <div style={{
            border: '1px solid rgba(240, 105, 34, 0.25)',
            background: isDark ? 'rgba(240, 105, 34, 0.04)' : 'rgba(240, 105, 34, 0.02)',
            borderRadius: '16px',
            padding: '14px 16px',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}>
            <h4 style={{
              fontSize: '14px',
              color: '#F06922',
              fontWeight: '700',
              margin: 0,
            }}>
              Check your WhatsApp
            </h4>
            <p style={{
              fontSize: '12px',
              color: isDark ? '#A7AC9D' : '#6B7280',
              margin: 0,
            }}>
              Check your WhatsApp for the verification code.<br />
              <span style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
                <span>💡</span> Use <strong style={{ color: '#F06922', fontWeight: '700', background: isDark ? '#23262F' : '#E5E7EB', padding: '2px 6px', borderRadius: '4px' }}>1111</strong> for testing
              </span>
            </p>
          </div>

          {/* OTP Digit Input Boxes */}
          <div 
            style={{ display: 'flex', justifyContent: 'center', gap: '12px', margin: '8px 0' }}
            onPaste={handlePaste}
          >
            {otp.map((d, i) => (
              <input
                key={i}
                ref={(el) => inputRefs.current[i] = el}
                type="tel"
                maxLength="1"
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                style={{
                  width: '64px',
                  height: '76px',
                  background: isDark ? '#12141A' : '#F3F4F6',
                  border: d 
                    ? '1.5px solid #F06922' 
                    : error ? '1.5px solid #EF4444' : (isDark ? '1px solid #2D313E' : '1px solid #E5E7EB'),
                  borderRadius: '16px',
                  fontSize: '28px',
                  fontWeight: '800',
                  color: isDark ? '#FFFFFF' : '#111827',
                  textAlign: 'center',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: d ? '0 4px 12px rgba(240, 105, 34, 0.15)' : 'none',
                  caretColor: '#F06922',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#F06922';
                  e.target.style.boxShadow = '0 0 0 3px rgba(240, 105, 34, 0.15)';
                  e.target.style.transform = 'scale(1.03)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = d ? '#F06922' : (isDark ? '#2D313E' : '#E5E7EB');
                  e.target.style.boxShadow = d ? '0 4px 12px rgba(240, 105, 34, 0.15)' : 'none';
                  e.target.style.transform = 'scale(1)';
                }}
              />
            ))}
          </div>

          {/* Validation/API Error Message */}
          {error && (
            <div style={{
              background: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              animation: 'shake 0.5s ease',
            }}>
              <span style={{ fontSize: '18px' }}>⚠️</span>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '13px', color: '#EF4444', fontWeight: '600', margin: 0 }}>
                  {error}
                </p>
                <p style={{ fontSize: '11px', color: isDark ? '#A7AC9D' : '#6B7280', margin: '2px 0 0' }}>
                  Attempts remaining: {3 - attempts}
                </p>
              </div>
            </div>
          )}

          {/* Submit/Verify Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !isComplete}
            style={{
              width: '100%',
              background: isComplete 
                ? (success 
                  ? '#22C55E' 
                  : '#F06922')
                : (isDark ? '#12141A' : '#F3F4F6'),
              border: isComplete 
                ? (success 
                  ? '1px solid #22C55E' 
                  : '1px solid #F06922')
                : (isDark ? '1px solid #23262F' : '1px solid #E5E7EB'),
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              cursor: isComplete && !loading ? 'pointer' : 'not-allowed',
              color: isComplete 
                ? '#FFFFFF' 
                : (isDark ? '#4E5361' : '#9CA3AF'),
              transition: 'all 0.2s ease',
              fontWeight: '700',
              fontSize: '15px',
              boxShadow: isComplete 
                ? '0 4px 12px rgba(240, 105, 34, 0.2)' 
                : 'none',
            }}
            onMouseEnter={(e) => {
              if (isComplete && !loading && !success) {
                e.currentTarget.style.background = '#E85C25';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (isComplete && !loading && !success) {
                e.currentTarget.style.background = '#F06922';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  width: '18px',
                  height: '18px',
                  border: '2.5px solid currentColor',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                <span>Verifying...</span>
              </div>
            ) : success ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Verified!</span>
              </div>
            ) : (
              <span>Verify & Continue</span>
            )}
          </button>

          {/* Resend Link Section */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '13px',
          }}>
            <span style={{ color: isDark ? '#8A8F98' : '#6B7280' }}>Didn't receive?</span>
            {resendTimer > 0 ? (
              <span style={{ color: isDark ? '#5C606C' : '#4B5563', fontWeight: '600' }}>
                Resend in {resendTimer}s
              </span>
            ) : (
              <button
                onClick={() => { setResendTimer(30); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#F06922',
                  fontWeight: '700',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                  fontFamily: 'inherit',
                  fontSize: '13px',
                }}
              >
                Resend OTP
              </button>
            )}
          </div>

        </div>

        {/* Change Phone / Wrong Number Footer Links */}
        <p style={{
          textAlign: 'center',
          fontSize: '13px',
          color: isDark ? '#8A8F98' : '#6B7280',
          margin: 0,
        }}>
          Wrong number?{' '}
          <span
            onClick={() => navigate('/phone')}
            style={{
              color: '#F06922',
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Change phone
          </span>
        </p>

        {/* Bottom Security Footer */}
        <div style={{
          textAlign: 'center',
          fontSize: '12px',
          color: isDark ? '#5C606C' : '#9CA3AF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          marginTop: '8px',
        }}>
          <span>🔒</span>
          <span>Your data is encrypted and never shared</span>
        </div>

      </div>
    </div>
  );
}
