import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { C, api } from '../utils/constants';
import Silk from './Silk';

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
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <Silk
          speed={5}
          scale={1}
          color="#ff6627"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <Layout
        title="Verify Your Number"
        subtitle={`We've sent a 4-digit code to ${phone || 'your phone'}`}
        titleColor="#ffffff"
        subtitleColor="rgba(255, 255, 255, 0.9)"
        showBack
        onBack={() => navigate('/phone')}
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
            textAlign: 'center',
        }}>
          {/* Icon */}
          <div style={{
            width: 90,
            height: 90,
            background: success
              ? 'var(--success)'
              : 'var(--cream-200)',
            borderRadius: 26,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
            border: success ? 'none' : '1px solid var(--cream-400)',
            fontSize: 44,
            transition: 'all 0.5s ease',
            transform: success ? 'scale(1.1)' : 'scale(1)',
            boxShadow: success ? '0 12px 40px rgba(34, 197, 94, 0.3)' : 'none',
          }}>
            {success ? '✓' : '🔐'}
          </div>

          {/* Instruction */}
          <p style={{
            fontSize: 15,
            color: 'var(--gray-600)',
            marginBottom: 32,
            lineHeight: 1.6,
          }}>
            Check your WhatsApp for the verification code<br />
            <span style={{
              fontSize: 13,
              color: 'var(--gray-500)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginTop: 8,
            }}>
              💡 Use <strong style={{ color: 'var(--primary)', fontWeight: 700 }}>1111</strong> for testing
            </span>
          </p>

          {/* OTP Input Boxes */}
          <div
            className="flex justify-center gap-3 sm:gap-4 mb-8"
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
                className="w-[3.5rem] h-[4rem] sm:w-[72px] sm:h-[88px] text-[28px] sm:text-[36px]"
                style={{
                  background: d ? 'var(--white)' : 'var(--gray-50)',
                  border: `2px solid ${d ? 'var(--primary)' : error ? 'var(--error)' : 'var(--gray-200)'}`,
                  borderRadius: 20,
                  fontWeight: 800,
                  color: 'var(--gray-900)',
                  textAlign: 'center',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: d ? '0 8px 30px rgba(240, 105, 34, 0.15)' : 'none',
                  caretColor: 'var(--primary)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary)';
                  e.target.style.boxShadow = '0 0 0 4px rgba(240, 105, 34, 0.15)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = d ? 'var(--primary)' : 'var(--gray-200)';
                  e.target.style.boxShadow = d ? '0 8px 30px rgba(240, 105, 34, 0.15)' : 'none';
                  e.target.style.transform = 'scale(1)';
                }}
              />
            ))}
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
              justifyContent: 'center',
              gap: 10,
              animation: 'shake 0.5s ease',
            }}>
              <span style={{ fontSize: 18 }}>⚠️</span>
              <div>
                <p style={{ fontSize: 14, color: '#FCA5A5', fontWeight: 600, margin: 0 }}>{error}</p>
                <p style={{ fontSize: 12, color: 'var(--gray-400)', margin: '4px 0 0' }}>
                  Attempts remaining: {3 - attempts}
                </p>
              </div>
            </div>
          )}

          {/* Verify Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !isComplete}
            style={{
              width: '100%',
              background: isComplete
                ? success
                  ? 'var(--success)'
                  : 'var(--primary)'
                : 'var(--gray-200)',
              border: 'none',
              borderRadius: 16,
              padding: '20px',
              fontSize: 18,
              fontWeight: 700,
              color: isComplete ? 'var(--white)' : 'var(--gray-400)',
              cursor: isComplete && !loading ? 'pointer' : 'not-allowed',
              boxShadow: isComplete ? 'var(--shadow-glow)' : 'none',
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
                Verifying...
              </>
            ) : success ? (
              <>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Verified!
              </>
            ) : (
              'Verify & Continue'
            )}
          </button>

          {/* Resend Link */}
          <div style={{
            marginTop: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}>
            <span style={{ fontSize: 14, color: 'var(--gray-400)' }}>Didn't receive?</span>
            {resendTimer > 0 ? (
              <span style={{ fontSize: 14, color: 'var(--gray-600)', fontWeight: 600 }}>
                Resend in {resendTimer}s
              </span>
            ) : (
              <button
                onClick={() => { setResendTimer(30); }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 14,
                  color: 'var(--primary)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>

        {/* Phone Change Link */}
        <p style={{
          textAlign: 'center',
          marginTop: 24,
          fontSize: 13,
          color: 'var(--gray-400)',
        }}>
          Wrong number?{' '}
          <span
            onClick={() => navigate('/phone')}
            style={{
              color: 'var(--primary)',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Change phone
          </span>
        </p>
      </div>

      {/* Animation Keyframes */}
      <style>{`
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
