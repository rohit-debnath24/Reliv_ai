import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/constants';

export default function PhoneEntryScreen() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [referral, setReferral] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(null);
  const [showSetup, setShowSetup] = useState(false);
  const [hasConfirmedSetup, setHasConfirmedSetup] = useState(false);

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

  const handleSubmit = async () => {
    if (phone.length !== 10) return setError('Enter valid 10-digit number');
    setLoading(true);
    setError('');
    try {
      const res = await api.call('/auth/send-otp', {
        method: 'POST',
        body: JSON.stringify({ phone: `+91${phone}`, referralCode: referral })
      });
      if (res.alreadyUsedTrial) navigate('/returning-pay', { state: { phone: `+91${phone}` } });
      else navigate('/otp', { state: { phone: `+91${phone}`, sessionId: res.sessionId } });
    } catch (err) {
      navigate('/otp', { state: { phone: `+91${phone}`, sessionId: 'demo' } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <style>{`
        .page-wrapper {
          min-height: 100vh;
          width: 100%;
          background: ${isDark ? '#0C0D11' : '#F4F5F8'};
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
        input::placeholder {
          color: ${isDark ? '#4E5361' : '#9CA3AF'} !important;
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
            onClick={() => navigate('/')} 
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

        {/* Center Phone Icon Badge */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '8px',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: isDark ? 'rgba(240, 105, 34, 0.12)' : 'rgba(240, 105, 34, 0.08)',
            border: isDark ? '1px solid rgba(240, 105, 34, 0.2)' : '1px solid rgba(240, 105, 34, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F06922" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
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
            Let's get started
          </h1>
          <p style={{
            fontSize: '14px',
            color: isDark ? '#8A8F98' : '#4B5563',
            margin: '0 auto',
            maxWidth: '300px',
            lineHeight: '1.5',
          }}>
            Enter your number to begin your health transformation
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
        }}>

          {/* WhatsApp Accordion Banner */}
          <div style={{
            border: '1px solid rgba(34, 197, 94, 0.15)',
            background: isDark ? 'rgba(34, 197, 94, 0.04)' : 'rgba(34, 197, 94, 0.02)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}>
            <div 
              onClick={() => setShowSetup(!showSetup)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 16px',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#22C55E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{
                  fontSize: '14px',
                  color: isDark ? '#4ADE80' : '#15803D',
                  fontWeight: '700',
                  margin: 0,
                }}>
                  First time? Set up WhatsApp
                </h4>
                <p style={{
                  fontSize: '11px',
                  color: isDark ? '#7C9885' : '#6B7280',
                  margin: '2px 0 0',
                }}>
                  Required once to receive your OTP
                </p>
              </div>
              <span style={{
                color: isDark ? '#4ADE80' : '#15803D',
                fontSize: '12px',
                transition: 'transform 0.3s ease',
                transform: showSetup ? 'rotate(180deg)' : 'rotate(0deg)',
              }}>
                ▼
              </span>
            </div>

            {/* Accordion Expandable Content */}
            <div style={{
              maxHeight: showSetup ? '300px' : '0px',
              overflow: 'hidden',
              transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              borderTop: showSetup ? (isDark ? '1px solid rgba(34, 197, 94, 0.1)' : '1px solid rgba(34, 197, 94, 0.05)') : 'none',
            }}>
              <div style={{
                padding: '16px',
                fontSize: '13px',
                color: isDark ? '#A7AC9D' : '#4B5563',
                lineHeight: '1.6',
                background: isDark ? 'rgba(34, 197, 94, 0.01)' : 'rgba(34, 197, 94, 0.01)',
              }}>
                1. Save our official number <strong>+1 (415) 523-8886</strong> to your contacts.<br />
                2. Send the message <strong>"join observe-ear"</strong> to activate the sandbox.<br />
                3. Once you receive a confirmation reply, you can request an OTP below!
              </div>
            </div>
          </div>

          {/* Phone Input Box */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{
              fontSize: '11px',
              fontWeight: '700',
              color: isDark ? '#8A8F98' : '#6B7280',
              letterSpacing: '0.8px',
            }}>
              PHONE NUMBER
            </label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'stretch' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isDark ? '#12141A' : '#F3F4F6',
                border: isDark ? '1px solid #2D313E' : '1px solid #E5E7EB',
                borderRadius: '12px',
                padding: '0 16px',
                color: '#F06922',
                fontWeight: '700',
                fontSize: '15px',
              }}>
                +91
              </div>
              <div style={{
                flex: 1,
                background: isDark ? '#12141A' : '#F3F4F6',
                border: focused === 'phone' ? '1px solid #F06922' : error ? '1px solid #EF4444' : (isDark ? '1px solid #2D313E' : '1px solid #E5E7EB'),
                borderRadius: '12px',
                transition: 'border-color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
              }}>
                <input
                  type="tel"
                  maxLength="10"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  onFocus={() => setFocused('phone')}
                  onBlur={() => setFocused(null)}
                  placeholder="Enter 10-digit number"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: isDark ? '#FFFFFF' : '#111827',
                    fontSize: '15px',
                    fontWeight: '600',
                    letterSpacing: phone.length > 0 ? '1px' : 'normal',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Referral Code Box */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{
                fontSize: '11px',
                fontWeight: '700',
                color: isDark ? '#8A8F98' : '#6B7280',
                letterSpacing: '0.8px',
              }}>
                REFERRAL CODE
              </label>
              <span style={{
                fontSize: '9px',
                fontWeight: '700',
                background: isDark ? '#23262F' : '#E5E7EB',
                color: isDark ? '#8A8F98' : '#4B5563',
                padding: '2px 8px',
                borderRadius: '20px',
              }}>
                optional
              </span>
            </div>
            <div style={{
              background: isDark ? '#12141A' : '#F3F4F6',
              border: focused === 'referral' ? '1px solid #F06922' : (isDark ? '1px solid #2D313E' : '1px solid #E5E7EB'),
              borderRadius: '12px',
              transition: 'border-color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
            }}>
              <input
                type="text"
                maxLength="6"
                value={referral}
                onChange={(e) => setReferral(e.target.value.toUpperCase())}
                onFocus={() => setFocused('referral')}
                onBlur={() => setFocused(null)}
                placeholder="Enter code for bonus"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: isDark ? '#FFFFFF' : '#111827',
                  fontSize: '15px',
                  fontWeight: '500',
                }}
              />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: '#F06922',
              fontWeight: '500',
              marginTop: '2px',
            }}>
              <span>🎁</span>
              <span>Invite 3 friends → FREE fitness plan worth ₹49</span>
            </div>
          </div>

          {/* Setup Completion Checkbox */}
          <div
            onClick={() => setHasConfirmedSetup(!hasConfirmedSetup)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 16px',
              borderRadius: '14px',
              background: hasConfirmedSetup ? (isDark ? 'rgba(34, 197, 94, 0.05)' : 'rgba(34, 197, 94, 0.02)') : (isDark ? '#12141A' : '#F3F4F6'),
              border: hasConfirmedSetup ? '1px solid rgba(34, 197, 94, 0.25)' : (isDark ? '1px solid #2D313E' : '1px solid #E5E7EB'),
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '6px',
              border: hasConfirmedSetup ? 'none' : (isDark ? '1px solid #4E5361' : '1px solid #CBD5E1'),
              background: hasConfirmedSetup ? '#22C55E' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {hasConfirmedSetup && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
            <span style={{
              fontSize: '13px',
              fontWeight: '500',
              color: hasConfirmedSetup ? (isDark ? '#4ADE80' : '#15803D') : (isDark ? '#8A8F98' : '#4B5563'),
              lineHeight: 1.4,
            }}>
              I have completed WhatsApp setup
            </span>
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
              gap: '10px',
            }}>
              <span style={{ fontSize: '18px' }}>⚠️</span>
              <p style={{ fontSize: '13px', color: '#EF4444', fontWeight: '600', margin: 0 }}>
                {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || phone.length !== 10 || !hasConfirmedSetup}
            style={{
              width: '100%',
              background: (phone.length === 10 && hasConfirmedSetup) 
                ? (isDark ? '#1C1F26' : '#FFFFFF') 
                : (isDark ? '#12141A' : '#F3F4F6'),
              border: (phone.length === 10 && hasConfirmedSetup) 
                ? (isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #CBD5E1') 
                : (isDark ? '1px solid #23262F' : '1px solid #E5E7EB'),
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: (phone.length === 10 && hasConfirmedSetup && !loading) ? 'pointer' : 'not-allowed',
              color: (phone.length === 10 && hasConfirmedSetup) 
                ? (isDark ? '#FFFFFF' : '#111827') 
                : (isDark ? '#4E5361' : '#9CA3AF'),
              transition: 'all 0.2s ease',
              fontWeight: '700',
              fontSize: '15px',
              boxShadow: (phone.length === 10 && hasConfirmedSetup) 
                ? (isDark ? '0 4px 12px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.05)') 
                : 'none',
            }}
            onMouseEnter={(e) => {
              if (phone.length === 10 && hasConfirmedSetup && !loading) {
                e.currentTarget.style.background = isDark ? '#2A2D36' : '#F9FAFB';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (phone.length === 10 && hasConfirmedSetup && !loading) {
                e.currentTarget.style.background = isDark ? '#1C1F26' : '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', justifyContent: 'center' }}>
                <span style={{
                  width: '18px',
                  height: '18px',
                  border: '2.5px solid currentColor',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                <span>Sending OTP...</span>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    style={{ 
                      color: (phone.length === 10 && hasConfirmedSetup) ? '#22C55E' : 'currentColor',
                      transition: 'color 0.2s ease'
                    }}
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  <span>Send OTP via WhatsApp</span>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </>
            )}
          </button>

        </div>

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
