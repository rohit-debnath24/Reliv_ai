import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function OTPFailScreen() {
  const navigate = useNavigate();

  return (
    <Layout showBack onBack={() => navigate('/phone')}>
      <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
        {/* Main Card */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 28,
          padding: '56px 48px',
          boxShadow: '0 20px 60px rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.15)',
        }}>
          {/* Error Icon */}
          <div style={{
            width: 100,
            height: 100,
            background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
            borderRadius: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
            border: '2px solid rgba(239, 68, 68, 0.2)',
            animation: 'pulse 2s ease-in-out infinite',
          }}>
            <span style={{ fontSize: 50 }}>😔</span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 28,
            fontWeight: 800,
            color: '#111111',
            marginBottom: 12,
            letterSpacing: '-0.5px',
          }}>
            Too Many Attempts
          </h1>

          {/* Message */}
          <p style={{
            fontSize: 16,
            color: '#666666',
            lineHeight: 1.7,
            marginBottom: 36,
            maxWidth: 360,
            margin: '0 auto 36px',
          }}>
            OTP verification failed 3 times. Don't worry, you can try again in 10 minutes or use a different number.
          </p>

          {/* Timer Card */}
          <div style={{
            background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
            borderRadius: 16,
            padding: '20px 28px',
            marginBottom: 32,
            border: '1px solid #FFD296',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
          }}>
            <span style={{ fontSize: 28 }}>⏳</span>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: 14, color: '#666', margin: 0 }}>Cooldown period</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: '#F06922', margin: 0 }}>10 minutes</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'grid', gap: 14 }}>
            <button
              onClick={() => navigate('/phone')}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
                border: 'none',
                borderRadius: 14,
                padding: '18px',
                fontSize: 16,
                fontWeight: 700,
                color: '#FFFFFF',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(240, 105, 34, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              📱 Try Different Number
            </button>

            <button
              onClick={() => navigate('/')}
              style={{
                width: '100%',
                background: '#FFFFFF',
                border: '2px solid #E5E7EB',
                borderRadius: 14,
                padding: '16px',
                fontSize: 15,
                fontWeight: 600,
                color: '#666666',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              🏠 Back to Home
            </button>
          </div>
        </div>

        {/* Help Text */}
        <p style={{
          marginTop: 28,
          fontSize: 13,
          color: '#9CA3AF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}>
          <span>💬</span>
          Need help? Contact our support team
        </p>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </Layout>
  );
}
