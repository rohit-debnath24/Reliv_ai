import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { C, api } from '../utils/constants';

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
    <Layout
      title="Verify Your Number"
      subtitle={`We've sent a 4-digit code to ${phone || 'your phone'}`}
      showBack
      onBack={() => navigate('/phone')}
    >
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        {/* Main Card */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 28,
          padding: '48px 44px',
          boxShadow: '0 20px 60px rgba(240, 105, 34, 0.12)',
          border: '1px solid rgba(240, 105, 34, 0.08)',
          textAlign: 'center',
        }}>
          {/* Icon */}
          <div style={{
            width: 90,
            height: 90,
            background: success
              ? 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)'
              : 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
            borderRadius: 26,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
            border: success ? 'none' : '1px solid rgba(240, 105, 34, 0.15)',
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
            color: '#666666',
            marginBottom: 32,
            lineHeight: 1.6,
          }}>
            Check your WhatsApp for the verification code<br />
            <span style={{
              fontSize: 13,
              color: '#9CA3AF',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginTop: 8,
            }}>
              💡 Use <strong style={{ color: '#F06922', fontWeight: 700 }}>1111</strong> for testing
            </span>
          </p>

          {/* OTP Input Boxes */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              marginBottom: 32,
            }}
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
                  width: 72,
                  height: 88,
                  background: d ? 'linear-gradient(135deg, #FFFAF7 0%, #FFF5F0 100%)' : '#FAFAFA',
                  border: `3px solid ${d ? '#F06922' : error ? '#EF4444' : '#E5E7EB'}`,
                  borderRadius: 20,
                  fontSize: 36,
                  fontWeight: 800,
                  color: '#111111',
                  textAlign: 'center',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: d ? '0 8px 30px rgba(240, 105, 34, 0.15)' : 'none',
                  caretColor: '#F06922',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#F06922';
                  e.target.style.boxShadow = '0 0 0 4px rgba(240, 105, 34, 0.15)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = d ? '#F06922' : '#E5E7EB';
                  e.target.style.boxShadow = d ? '0 8px 30px rgba(240, 105, 34, 0.15)' : 'none';
                  e.target.style.transform = 'scale(1)';
                }}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
              border: '1px solid #EF4444',
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
                <p style={{ fontSize: 14, color: '#DC2626', fontWeight: 600, margin: 0 }}>{error}</p>
                <p style={{ fontSize: 12, color: '#9CA3AF', margin: '4px 0 0' }}>
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
                  ? 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)'
                  : 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)'
                : 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
              border: 'none',
              borderRadius: 16,
              padding: '20px',
              fontSize: 18,
              fontWeight: 700,
              color: isComplete ? '#FFFFFF' : '#9CA3AF',
              cursor: isComplete && !loading ? 'pointer' : 'not-allowed',
              boxShadow: isComplete ? '0 10px 40px rgba(34, 197, 94, 0.35)' : 'none',
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
                  borderTopColor: '#FFFFFF',
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
            <span style={{ fontSize: 14, color: '#9CA3AF' }}>Didn't receive?</span>
            {resendTimer > 0 ? (
              <span style={{ fontSize: 14, color: '#666666', fontWeight: 600 }}>
                Resend in {resendTimer}s
              </span>
            ) : (
              <button
                onClick={() => { setResendTimer(30); }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 14,
                  color: '#F06922',
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
          color: '#9CA3AF',
        }}>
          Wrong number?{' '}
          <span
            onClick={() => navigate('/phone')}
            style={{
              color: '#F06922',
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
  );
}
