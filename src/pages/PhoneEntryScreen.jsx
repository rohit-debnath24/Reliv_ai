import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { C, api } from '../utils/constants';

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
    <>
      <div className={isDark ? 'dark-mode' : 'light-mode'} style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: -1, 
        overflow: 'hidden', 
        background: isDark ? '#11140F' : '#F9F6F0',
        transition: 'background 0.4s ease'
      }}>
        {/* Left Spotlight */}
        <div className="spotlight-lamp left">
          <div className="lamp-wire"></div>
          <div className="lamp-head"></div>
          <div className="lamp-cone">
            <div className="lamp-beam"></div>
            <div className="lamp-dust-wrapper">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className={`dust d${i}`}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Spotlight */}
        <div className="spotlight-lamp right">
          <div className="lamp-wire"></div>
          <div className="lamp-head"></div>
          <div className="lamp-cone">
            <div className="lamp-beam"></div>
            <div className="lamp-dust-wrapper">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className={`dust d${i}`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Layout 
        title="Let's Get Started" 
        subtitle="Enter your phone number to begin your health transformation" 
        titleColor={isDark ? "#ffffff" : "#11140F"}
        subtitleColor={isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(17, 20, 15, 0.7)"}
        showBack 
        onBack={() => navigate('/')}
      >
        <div className="w-full px-4 sm:px-0" style={{ maxWidth: 600, margin: '0 auto' }}>
        {/* Main Card */}
        <div 
          className="main-card-padding"
          style={{
            background: 'var(--white)',
            borderRadius: 32,
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--gray-200)',
        }}>
            {/* Icon Header */}
            <div style={{
              width: 80,
              height: 80,
              background: 'var(--cream-200)',
              borderRadius: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 28px',
              border: '1px solid var(--cream-400)',
              color: 'var(--primary)',
              fontSize: 40,
            }}>
              📱
            </div>

            {/* WhatsApp Setup Accordion */}
            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--gray-200)',
              borderRadius: 16,
              marginBottom: 24,
              overflow: 'hidden',
            }}>
              <div
                onClick={() => setShowSetup(!showSetup)}
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  userSelect: 'none',
                  background: showSetup ? 'var(--gray-50)' : 'transparent',
                  borderBottom: showSetup ? '1px solid var(--gray-200)' : 'none',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'var(--cream-200)',
                  color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, border: '1px solid var(--cream-400)'
                }}>
                  💬
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 15, color: 'var(--gray-900)', fontWeight: 700, display: 'block' }}>
                    First time? Setup WhatsApp first
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--gray-500)', display: 'block', marginTop: 2 }}>
                    Required one-time step to receive OTP
                  </span>
                </div>
                <span style={{
                  fontSize: 14,
                  color: 'var(--gray-400)',
                  transition: 'transform 0.3s ease',
                  transform: showSetup ? 'rotate(180deg)' : 'rotate(0deg)',
                }}>▼</span>
              </div>

              <div style={{
                maxHeight: showSetup ? 400 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.4s ease',
              }}>
                <div style={{ padding: '20px' }}>
                  <p style={{ color: 'var(--gray-700)', fontSize: 14, margin: '0 0 16px', lineHeight: 1.6 }}>
                    1. Save our official number <strong>+1 (415) 523-8886</strong> to your contacts.<br />
                    2. Send the message <strong>"join observe-ear"</strong> to activate the sandbox.<br />
                    3. Once you receive a confirmation reply, you can request an OTP below!
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Input Section */}
            <div style={{ marginBottom: 28 }}>
              <label style={{
                display: 'block',
                fontSize: 14,
                color: 'var(--gray-600)',
                marginBottom: 12,
                fontWeight: 600,
                letterSpacing: '0.3px',
              }}>
                Phone Number
              </label>
              <div 
                className="flex items-stretch gap-3"
              >
                {/* Country Code Block */}
                <div 
                  className="px-4 sm:px-5 flex items-center gap-2"
                  style={{
                    background: 'var(--cream-200)',
                    border: '1px solid var(--cream-400)',
                    borderRadius: 14,
                    color: 'var(--primary)',
                    fontWeight: 700,
                    fontSize: 16,
                  }}>
                  +91
                </div>

                {/* Phone Input Box */}
                <div style={{
                  flex: 1,
                  background: focused === 'phone' ? 'var(--white)' : 'var(--gray-50)',
                  border: `1px solid ${focused === 'phone' ? 'var(--primary)' : error ? 'var(--error)' : 'var(--gray-200)'}`,
                  borderRadius: 14,
                  transition: 'all 0.3s ease',
                  boxShadow: focused === 'phone' ? '0 0 0 1px var(--primary)' : 'none',
                  display: 'flex',
                }}>
                  <input
                    type="tel"
                    maxLength="10"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    onFocus={() => setFocused('phone')}
                    onBlur={() => setFocused(null)}
                    placeholder="Enter 10-digit number"
                    className="flex-1 w-full text-[16px] sm:text-[18px]"
                    style={{
                      padding: '18px 24px',
                      background: 'transparent',
                      border: 'none',
                      fontWeight: 600,
                      color: 'var(--gray-900)',
                      outline: 'none',
                      letterSpacing: '1px',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Referral Code Section */}
            <div style={{ marginBottom: 32 }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                color: 'var(--gray-600)',
                marginBottom: 12,
                fontWeight: 600,
              }}>
                Referral Code
                <span style={{
                  color: 'var(--gray-400)',
                  fontSize: 11,
                  fontWeight: 600,
                  background: 'var(--gray-100)',
                  padding: '3px 10px',
                  borderRadius: 20,
                }}>
                  OPTIONAL
                </span>
              </label>
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
                  background: focused === 'referral' ? 'var(--white)' : 'var(--gray-50)',
                  border: `1px solid ${focused === 'referral' ? 'var(--primary)' : 'var(--gray-200)'}`,
                  borderRadius: 14,
                  padding: '18px 20px',
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'var(--gray-900)',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  letterSpacing: '1px',
                  boxShadow: focused === 'referral' ? '0 0 0 1px var(--primary)' : 'none',
                }}
              />
              <p style={{
                fontSize: 13,
                color: 'var(--gray-500)',
                marginTop: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                <span>💡</span>
                Invite 3 friends & → Get FREE fitness plan worth ₹49
              </p>
            </div>

            {/* Confirmation Checkbox */}
            <div
              onClick={() => setHasConfirmedSetup(!hasConfirmedSetup)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '16px 20px',
                marginBottom: 24,
                background: hasConfirmedSetup ? 'rgba(34, 197, 94, 0.05)' : 'var(--gray-50)',
                border: hasConfirmedSetup ? '1px solid var(--success)' : '1px solid var(--gray-200)',
                borderRadius: 14,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                userSelect: 'none',
              }}
            >
              <div style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                border: hasConfirmedSetup ? 'none' : '1px solid var(--gray-300)',
                background: hasConfirmedSetup ? 'var(--success)' : 'var(--white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {hasConfirmedSetup && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
              <span style={{
                fontSize: 14,
                fontWeight: 500,
                color: hasConfirmedSetup ? 'var(--success-light)' : 'var(--gray-700)',
                lineHeight: 1.4,
              }}>
                I have completed WhatsApp setup
              </span>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.5)',
                borderRadius: 14,
                padding: '16px 20px',
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                animation: 'shake 0.5s ease',
              }}>
                <span style={{ fontSize: 20 }}>⚠️</span>
                <p style={{ fontSize: 14, color: '#FCA5A5', fontWeight: 600, margin: 0 }}>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || phone.length !== 10 || !hasConfirmedSetup}
              style={{
                width: '100%',
                background: (phone.length === 10 && hasConfirmedSetup) ? 'var(--primary)' : 'var(--gray-200)',
                border: 'none',
                borderRadius: 16,
                padding: '18px 20px',
                fontSize: 18,
                fontWeight: 700,
                color: (phone.length === 10 && hasConfirmedSetup) ? 'var(--white)' : 'var(--gray-400)',
                cursor: (phone.length === 10 && hasConfirmedSetup && !loading) ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                transform: loading ? 'scale(0.98)' : 'scale(1)',
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
                  Sending OTP...
                </>
              ) : (
                <>
                  Send OTP via WhatsApp →
                </>
              )}
            </button>
          </div>
          
          {/* Bottom Security Text */}
          <p style={{
            textAlign: 'center',
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            color: 'var(--gray-400)',
            fontSize: 13,
          }}>
            <span style={{ fontSize: 16 }}>🔒</span>
            <span>Your data is encrypted and never shared</span>
          </p>
        </div>

        {/* Animation Keyframes */}
        <style>{`
        .spotlight-lamp {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 0;
          pointer-events: none;
          transform-origin: top center;
        }

        /* Mobile: Centered, pointing straight down */
        .spotlight-lamp.left {
          left: 50%;
          top: -10%;
          transform: translateX(-50%) rotate(0deg);
        }

        /* Mobile: Hide second lamp */
        .spotlight-lamp.right {
          display: none;
        }

        /* Desktop: Dual angled lamps */
        @media (min-width: 640px) {
          .spotlight-lamp.left {
            left: 5%;
            top: -20px;
            transform: rotate(-25deg); /* Overrides mobile transform */
          }
          .spotlight-lamp.right {
            display: flex;
            right: 5%;
            top: -20px;
            transform: rotate(25deg);
          }
        }

        .lamp-wire {
          width: 2px;
          height: 80px;
          background: rgba(255,255,255,0.12);
        }

        .light-mode .lamp-wire {
          background: rgba(17,20,15,0.12);
        }

        .lamp-head {
          width: 32px;
          height: 16px;
          background: #F06922;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          position: relative;
          box-shadow: 0 -2px 10px rgba(240,105,34,0.5);
          z-index: 2;
        }

        .lamp-cone {
          position: relative;
          width: 450px;
          height: 650px;
          margin-top: -2px;
        }

        .lamp-beam, 
        .lamp-dust-wrapper {
          position: absolute;
          inset: 0;
          clip-path: polygon(45% 0, 55% 0, 100% 100%, 0% 100%);
        }

        .lamp-beam {
          background: linear-gradient(to bottom, rgba(240, 105, 34, 0.22) 0%, rgba(240, 105, 34, 0) 100%);
          filter: blur(14px);
          animation: lamp-flicker 4s infinite alternate ease-in-out;
        }

        @keyframes lamp-flicker {
          0% { opacity: 0.5; filter: blur(10px); }
          100% { opacity: 1; filter: blur(16px); }
        }

        .dust {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(255, 230, 200, 0.9);
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(240, 105, 34, 0.8);
          opacity: 0;
          pointer-events: none;
        }

        .light-mode .dust {
          background: rgba(240, 105, 34, 0.8);
          box-shadow: 0 0 6px rgba(240, 105, 34, 0.4);
        }

        .dust:nth-child(odd) { animation: float-dust-1 8s linear infinite; }
        .dust:nth-child(even) { animation: float-dust-2 9s linear infinite; }

        .dust.d1 { left: 30%; bottom: 0; animation-delay: 0s; animation-duration: 8s; }
        .dust.d2 { left: 50%; bottom: 0; animation-delay: 2s; animation-duration: 11s; }
        .dust.d3 { left: 70%; bottom: 0; animation-delay: 4s; animation-duration: 9s; }
        .dust.d4 { left: 40%; bottom: 0; animation-delay: 1s; animation-duration: 10s; }
        .dust.d5 { left: 60%; bottom: 0; animation-delay: 3s; animation-duration: 7s; }
        .dust.d6 { left: 20%; bottom: 0; animation-delay: 5s; animation-duration: 12s; }
        .dust.d7 { left: 80%; bottom: 0; animation-delay: 1.5s; animation-duration: 8.5s; }
        .dust.d8 { left: 45%; bottom: 0; animation-delay: 3.5s; animation-duration: 9.5s; }

        @keyframes float-dust-1 {
          0% { transform: translate(0, 0) scale(0.4); opacity: 0; }
          15% { opacity: 0.8; }
          85% { opacity: 0.8; }
          100% { transform: translate(25px, -650px) scale(1.2); opacity: 0; }
        }

        @keyframes float-dust-2 {
          0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
          15% { opacity: 0.7; }
          85% { opacity: 0.7; }
          100% { transform: translate(-25px, -650px) scale(1.5); opacity: 0; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      </Layout>
    </>
  );
}
