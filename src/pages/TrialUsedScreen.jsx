import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrialUsedScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFFAF7 0%, #FFF5F0 50%, #FFEEDD 100%)',
      fontFamily: "'Inter', 'Outfit', sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
    }}>
      <div style={{
        maxWidth: 560,
        width: '100%',
        background: 'var(--white)',
        borderRadius: 32,
        padding: '48px 44px',
        boxShadow: '0 24px 80px rgba(240, 105, 34, 0.1)',
        border: '1px solid rgba(240, 105, 34, 0.1)',
        textAlign: 'center',
        opacity: show ? 1 : 0,
        transform: show ? 'scale(1)' : 'scale(0.95)',
        transition: 'all 0.5s ease',
      }}>
        {/* Icon */}
        <div style={{
          width: 100,
          height: 100,
          background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
          borderRadius: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 28px',
          fontSize: 50,
          border: '2px solid #F59E0B',
        }}>
          🔒
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', marginBottom: 12 }}>
          Trial Already Used
        </h1>

        <p style={{ fontSize: 16, color: '#666', marginBottom: 28, lineHeight: 1.6 }}>
          This phone number has already used the free trial.
        </p>

        {/* Fair Use Message */}
        <div style={{
          background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
          borderRadius: 18,
          padding: '24px',
          marginBottom: 32,
          border: '1px solid rgba(240, 105, 34, 0.15)',
        }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#F06922', marginBottom: 8 }}>
            One trial per phone 📱
          </p>
          <p style={{ fontSize: 13, color: '#B45309', lineHeight: 1.6 }}>
            Fair for everyone! If you already have a code, tap "Returning User" on the home screen to continue.
          </p>
        </div>

        {/* Options */}
        <div style={{
          background: 'var(--gray-50)',
          borderRadius: 18,
          padding: '24px',
          marginBottom: 32,
          textAlign: 'left',
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 14 }}>
            What you can do:
          </h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { icon: '🔑', text: 'Log in with your code if you already have one' },
              { icon: '📞', text: 'Use a different phone number' },
              { icon: '💬', text: 'Contact support if you\'re facing issues' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#666' }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'grid', gap: 14 }}>
          <button
            onClick={() => navigate('/code')}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
              border: 'none',
              borderRadius: 16,
              padding: '20px',
              fontSize: 17,
              fontWeight: 700,
              color: 'var(--white)',
              cursor: 'pointer',
              boxShadow: '0 10px 40px rgba(240, 105, 34, 0.35)',
            }}
          >
            🔑 Log In with Code
          </button>

          <button
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              background: 'var(--white)',
              border: '2px solid #E5E7EB',
              borderRadius: 14,
              padding: '16px',
              fontSize: 15,
              fontWeight: 600,
              color: '#666',
              cursor: 'pointer',
            }}
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
