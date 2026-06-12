import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Kiosk Offline Screen — Auto-retries every 5 seconds.
 */
export default function KioskOfflineScreen() {
  const navigate = useNavigate();
  const [retryCount, setRetryCount] = useState(0);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setChecking(true);
      setRetryCount((c) => c + 1);
      // Simulate check — in real app, would ping /api/health
      setTimeout(() => {
        setChecking(false);
        if (navigator.onLine) {
          navigate('/');
        }
      }, 1500);
    }, 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #1F2937 0%, #111827 100%)',
      fontFamily: "'Inter', -apple-system, sans-serif",
      padding: 32,
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: 80,
        marginBottom: 24,
        animation: 'float 3s ease-in-out infinite',
      }}>
        📡
      </div>

      <h1 style={{ fontSize: 32, fontWeight: 900, color: '#FFF', marginBottom: 8 }}>
        Kiosk Offline
      </h1>
      <p style={{ fontSize: 16, color: '#9CA3AF', lineHeight: 1.6, maxWidth: 400, marginBottom: 32 }}>
        We lost connection to the server. Don't worry — we're trying to reconnect automatically.
      </p>

      {/* Retry indicator */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        borderRadius: 16,
        padding: '20px 32px',
        border: '1px solid rgba(255,255,255,0.1)',
        marginBottom: 24,
      }}>
        <div style={{ fontSize: 14, color: checking ? '#FFA500' : '#9CA3AF', fontWeight: 600 }}>
          {checking ? '🔄 Checking connection...' : '⏳ Next retry in 5 seconds'}
        </div>
        <div style={{ fontSize: 12, color: '#6B7280', marginTop: 8 }}>
          Retries: {retryCount}
        </div>
      </div>

      {/* Manual retry */}
      <button
        onClick={() => {
          setChecking(true);
          setTimeout(() => {
            setChecking(false);
            if (navigator.onLine) navigate('/');
          }, 1000);
        }}
        style={{
          background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
          border: 'none',
          borderRadius: 14,
          padding: '16px 40px',
          fontSize: 16,
          fontWeight: 700,
          color: '#FFF',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(240,105,34,0.3)',
        }}
      >
        🔄 Retry Now
      </button>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
