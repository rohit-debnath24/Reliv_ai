import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function CodeFailScreen() {
  const navigate = useNavigate();

  return (
    <Layout showBack onBack={() => navigate('/code')}>
      <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
        {/* Main Card */}
        <div style={{
          background: 'var(--white)',
          borderRadius: 28,
          padding: '56px 48px',
          boxShadow: '0 20px 60px rgba(240, 105, 34, 0.1)',
          border: '1px solid rgba(240, 105, 34, 0.08)',
        }}>
          {/* Icon */}
          <div style={{
            width: 100,
            height: 100,
            background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
            borderRadius: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
            border: '2px solid #FFD296',
          }}>
            <span style={{ fontSize: 50 }}>🤔</span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 28,
            fontWeight: 800,
            color: 'var(--gray-900)',
            marginBottom: 12,
            letterSpacing: '-0.5px',
          }}>
            Code Not Found
          </h1>

          {/* Message */}
          <p style={{
            fontSize: 16,
            color: 'var(--gray-600)',
            lineHeight: 1.7,
            marginBottom: 36,
            maxWidth: 360,
            margin: '0 auto 36px',
          }}>
            We couldn't find that code. It might be a typo or the code may have expired.
          </p>

          {/* Tips Card */}
          <div style={{
            background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
            borderRadius: 16,
            padding: '20px 24px',
            marginBottom: 32,
            border: '1px solid #FFD296',
            textAlign: 'left',
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#F06922', marginBottom: 12 }}>
              💡 Quick Tips
            </h3>
            <ul style={{
              margin: 0,
              paddingLeft: 20,
              fontSize: 14,
              color: 'var(--gray-600)',
              lineHeight: 1.8,
            }}>
              <li>Double-check for typos (1 vs l, 0 vs O)</li>
              <li>Codes are 4 digits only</li>
              <li>Try demo codes: <strong style={{ color: '#F06922' }}>9876</strong> or <strong style={{ color: '#F06922' }}>6241</strong></li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'grid', gap: 14 }}>
            <button
              onClick={() => navigate('/code')}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
                border: 'none',
                borderRadius: 14,
                padding: '18px',
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--white)',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(240, 105, 34, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              🔄 Try Again
            </button>

            <button
              onClick={() => navigate('/phone')}
              style={{
                width: '100%',
                background: 'var(--white)',
                border: '2px solid #E5E7EB',
                borderRadius: 14,
                padding: '16px',
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--gray-600)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              📱 Start Fresh with Phone
            </button>
          </div>
        </div>

        {/* Help Text */}
        <p style={{
          marginTop: 28,
          fontSize: 13,
          color: 'var(--gray-400)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}>
          <span>💬</span>
          Lost your code? Contact support
        </p>
      </div>
    </Layout>
  );
}
