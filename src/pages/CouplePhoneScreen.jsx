import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { api } from '../utils/constants';

export default function CouplePhoneScreen() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(null);

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
    <Layout
      title="Add Your Partner"
      subtitle="Enter your partner's details"
      showBack
      onBack={() => navigate('/group-type')}
    >
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        {/* Main Card */}
        <div style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF0F7 100%)',
          borderRadius: 28,
          padding: '44px 40px',
          boxShadow: '0 20px 60px rgba(236, 72, 153, 0.12)',
          border: '1px solid rgba(236, 72, 153, 0.15)',
        }}>
          {/* Icon */}
          <div style={{
            width: 88,
            height: 88,
            background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
            fontSize: 44,
            boxShadow: '0 12px 40px rgba(236, 72, 153, 0.3)',
          }}>
            💑
          </div>

          {/* Name Input */}
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: 'block',
              fontSize: 14,
              color: '#666666',
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
                background: focused === 'name' ? '#FFFAF7' : '#FAFAFA',
                border: `2px solid ${focused === 'name' ? '#EC4899' : '#E5E7EB'}`,
                borderRadius: 14,
                padding: '18px 20px',
                fontSize: 17,
                fontWeight: 500,
                color: '#111111',
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
              color: '#666666',
              marginBottom: 10,
              fontWeight: 600,
            }}>
              Partner's Phone Number
            </label>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{
                background: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
                border: '2px solid #FBCFE8',
                borderRadius: 14,
                padding: '0 18px',
                display: 'flex',
                alignItems: 'center',
                fontSize: 16,
                fontWeight: 700,
                color: '#EC4899',
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
                  background: focused === 'phone' ? '#FFFAF7' : '#FAFAFA',
                  border: `2px solid ${focused === 'phone' ? '#EC4899' : error ? '#EF4444' : '#E5E7EB'}`,
                  borderRadius: 14,
                  padding: '18px 20px',
                  fontSize: 17,
                  fontWeight: 600,
                  color: '#111111',
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
              color: phone.length === 10 && name.trim() ? '#FFFFFF' : '#9CA3AF',
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
                  borderTopColor: '#FFFFFF',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                Adding Partner...
              </>
            ) : (
              'Continue'
            )}
          </button>
        </div>

        {/* Note */}
        <p style={{
          textAlign: 'center',
          marginTop: 24,
          fontSize: 13,
          color: '#9CA3AF',
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
      `}</style>
    </Layout>
  );
}
