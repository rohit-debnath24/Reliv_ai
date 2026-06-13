import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

/**
 * S33 — Acne Photo Timeout
 * Shown when 2-minute QR timer expires without photo upload.
 */
export default function AcneTimeoutScreen() {
  const navigate = useNavigate();

  return (
    <Layout title="⏰ Time's Up" subtitle="No photo received" showBack onBack={() => navigate('/acne-photo-qr')}>
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '40px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Icon */}
        <div style={{ fontSize: 80 }}>⏰</div>

        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#2D3436' }}>
          Photo Upload Timed Out
        </h2>

        <p style={{ fontSize: 16, color: '#636E72', lineHeight: 1.6, maxWidth: 400, margin: '0 auto' }}>
          We didn't receive a photo within 2 minutes. That's okay — you can try again or manually select your skin concern.
        </p>

        {/* Option cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
          {/* Try again */}
          <button
            onClick={() => navigate('/acne-photo-qr')}
            style={{
              background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
              color: '#FFF',
              border: 'none',
              borderRadius: 16,
              padding: '20px 24px',
              fontSize: 17,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              boxShadow: '0 8px 30px rgba(240,105,34,0.3)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            📸 Try Photo Again
          </button>

          {/* Manual select */}
          <button
            onClick={() => navigate('/acne-manual')}
            style={{
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: '#F06922',
              border: '2px solid #F06922',
              borderRadius: 16,
              padding: '20px 24px',
              fontSize: 17,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--cream-200)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            🖐️ Skip Photo — Select Manually
          </button>

          {/* Continue without */}
          <button
            onClick={() => navigate('/meal-freq')}
            className="btn btn-ghost"
            style={{ fontSize: 14 }}
          >
            Continue Without Skin Analysis →
          </button>
        </div>
      </div>
    </Layout>
  );
}
