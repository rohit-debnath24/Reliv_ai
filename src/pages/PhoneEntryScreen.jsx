import { useState } from 'react';
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
    <Layout title="Let's Get Started" subtitle="Enter your phone number to begin your health transformation" showBack onBack={() => navigate('/')}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        {/* Main Card */}
        <div style={{
          background: 'var(--white)',
          borderRadius: 28,
          padding: '48px 44px',
          boxShadow: '0 20px 60px rgba(240, 105, 34, 0.12)',
          border: '1px solid rgba(240, 105, 34, 0.08)',
        }}>
          {/* Icon Header */}
          <div style={{
            width: 80,
            height: 80,
            background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
            border: '1px solid rgba(240, 105, 34, 0.15)',
            fontSize: 40,
          }}>
            📱
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
            <div style={{
              display: 'flex',
              gap: 12,
              alignItems: 'stretch',
            }}>
              {/* Country Code */}
              <div style={{
                background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
                border: '2px solid #FFD296',
                borderRadius: 14,
                padding: '0 20px',
                display: 'flex',
                alignItems: 'center',
                fontSize: 17,
                fontWeight: 700,
                color: '#F06922',
                gap: 8,
              }}>
                <span style={{ fontSize: 20 }}>🇮🇳</span>
                +91
              </div>

              {/* Phone Input */}
              <input
                type="tel"
                maxLength="10"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                onFocus={() => setFocused('phone')}
                onBlur={() => setFocused(null)}
                placeholder="Enter 10-digit number"
                style={{
                  flex: 1,
                  background: focused === 'phone' ? 'var(--cream-100)' : 'var(--gray-50)',
                  border: `2px solid ${focused === 'phone' ? '#F06922' : error ? '#EF4444' : 'var(--gray-200)'}`,
                  borderRadius: 14,
                  padding: '18px 20px',
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--gray-900)',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  letterSpacing: '1px',
                  boxShadow: focused === 'phone' ? '0 0 0 4px rgba(240, 105, 34, 0.1)' : 'none',
                }}
              />
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
              <span style={{ fontSize: 16 }}>🎁</span>
              Referral Code
              <span style={{
                background: 'var(--gray-200)',
                color: 'var(--gray-400)',
                fontSize: 11,
                fontWeight: 600,
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
                background: focused === 'referral' ? 'var(--cream-100)' : 'var(--gray-50)',
                border: `2px solid ${focused === 'referral' ? '#F06922' : 'var(--gray-200)'}`,
                borderRadius: 14,
                padding: '18px 20px',
                fontSize: 16,
                fontWeight: 500,
                color: 'var(--gray-900)',
                outline: 'none',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                boxShadow: focused === 'referral' ? '0 0 0 4px rgba(240, 105, 34, 0.1)' : 'none',
              }}
            />
            <p style={{
              fontSize: 13,
              color: 'var(--gray-400)',
              marginTop: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <span>💡</span>
              Invite 3 friends → Get FREE fitness plan worth ₹49
            </p>
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
              gap: 12,
              animation: 'shake 0.5s ease',
            }}>
              <span style={{ fontSize: 20 }}>⚠️</span>
              <p style={{ fontSize: 14, color: '#DC2626', fontWeight: 600, margin: 0 }}>{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || phone.length !== 10}
            style={{
              width: '100%',
              background: phone.length === 10
                ? 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)'
                : 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
              border: 'none',
              borderRadius: 16,
              padding: '20px',
              fontSize: 18,
              fontWeight: 700,
              color: phone.length === 10 ? 'var(--white)' : 'var(--gray-400)',
              cursor: phone.length === 10 && !loading ? 'pointer' : 'not-allowed',
              boxShadow: phone.length === 10 ? '0 10px 40px rgba(240, 105, 34, 0.35)' : 'none',
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
                Send OTP
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Security Note */}
        <div style={{
          textAlign: 'center',
          marginTop: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          color: 'var(--gray-400)',
          fontSize: 13,
        }}>
          <span style={{ fontSize: 16 }}>🔒</span>
          <span>Your data is encrypted and never shared</span>
        </div>
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
