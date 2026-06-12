import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

/**
 * S32 — Acne Photo QR Upload Screen
 * Shows a QR code for the user to scan on their phone,
 * open camera, take acne photo, and upload it back to the kiosk.
 * Polls for upload status. 2-minute timeout.
 */
export default function AcnePhotoQRScreen() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('waiting'); // waiting | uploading | analyzing | complete
  const [timeLeft, setTimeLeft] = useState(120);
  const [showSkip, setShowSkip] = useState(false);
  const sessionId = useRef(`upload_${localStorage.getItem('userCode') || '0000'}_${Date.now()}`);
  const pollRef = useRef(null);

  const uploadUrl = `${window.location.origin}/acne-upload?session=${sessionId.current}`;

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (status === 'waiting') navigate('/acne-timeout');
          return 0;
        }
        if (prev <= 60) setShowSkip(true);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate, status]);

  // Simulated poll (frontend-only demo)
  useEffect(() => {
    // In production, this would poll /api/check-acne-upload/:sessionId
    // For frontend-only demo, we simulate after 8 seconds if user doesn't navigate away
    return () => {
      if (pollRef.current) clearTimeout(pollRef.current);
    };
  }, []);

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const statusConfig = {
    waiting:   { icon: '⏳', text: 'Waiting for photo...', color: '#FF6B35' },
    uploading: { icon: '📤', text: 'Photo uploading...', color: '#FF6B35' },
    analyzing: { icon: '🔬', text: 'Analyzing with AI...', color: '#FF6B35' },
    complete:  { icon: '✅', text: 'Analysis complete!', color: '#00B894' },
  };

  const cur = statusConfig[status];

  /* Demo: simulate receiving a photo */
  const simulateUpload = () => {
    setStatus('uploading');
    setTimeout(() => setStatus('analyzing'), 1500);
    setTimeout(() => {
      setStatus('complete');
      // Save demo analysis
      localStorage.setItem('acneAnalysis', JSON.stringify({
        type: 'active_acne',
        severity: 'moderate',
        location: ['cheeks', 'forehead'],
        confidence: 0.87,
        lesionCount: 28,
        recommendations: [
          'Wash face twice daily with gentle cleanser',
          'Use salicylic acid cleanser (2%)',
          'Apply benzoyl peroxide spot treatment (2.5-5%)',
          'Avoid touching face throughout the day',
          'Change pillowcase every 3-4 days',
          'Drink 8 glasses of water daily',
          '💡 Cheek acne: Clean phone screen daily, avoid sleeping on dirty pillows',
        ],
      }));
      setTimeout(() => navigate('/acne-uploaded'), 800);
    }, 4000);
  };

  return (
    <Layout title="📸 Upload Acne Photo" subtitle="AI will analyze your skin" showBack onBack={() => navigate(-1)}>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 28, textAlign: 'center' }}>
        {/* Phone icon */}
        <div style={{ fontSize: 64 }}>📱</div>

        <p style={{ fontSize: 18, fontWeight: 600, color: '#2D3436' }}>
          Scan this QR code with your phone:
        </p>

        {/* QR placeholder (glassmorphic card) */}
        <div style={{
          margin: '0 auto',
          width: 272,
          height: 272,
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '3px solid #FF6B35',
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(255,107,53,0.2)',
          flexDirection: 'column',
          gap: 12,
          padding: 16,
        }}>
          {/* Simple QR visual pattern */}
          <div style={{
            width: 200,
            height: 200,
            background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='white'/%3E%3Crect x='10' y='10' width='60' height='60' fill='%23F06922' rx='4'/%3E%3Crect x='18' y='18' width='44' height='44' fill='white' rx='2'/%3E%3Crect x='26' y='26' width='28' height='28' fill='%23F06922' rx='2'/%3E%3Crect x='130' y='10' width='60' height='60' fill='%23F06922' rx='4'/%3E%3Crect x='138' y='18' width='44' height='44' fill='white' rx='2'/%3E%3Crect x='146' y='26' width='28' height='28' fill='%23F06922' rx='2'/%3E%3Crect x='10' y='130' width='60' height='60' fill='%23F06922' rx='4'/%3E%3Crect x='18' y='138' width='44' height='44' fill='white' rx='2'/%3E%3Crect x='26' y='146' width='28' height='28' fill='%23F06922' rx='2'/%3E%3Crect x='80' y='80' width='40' height='40' fill='%23F06922' rx='3'/%3E%3Crect x='88' y='88' width='24' height='24' fill='white' rx='2'/%3E%3Crect x='80' y='10' width='10' height='10' fill='%23F06922'/%3E%3Crect x='95' y='25' width='10' height='10' fill='%23F06922'/%3E%3Crect x='80' y='40' width='10' height='10' fill='%23F06922'/%3E%3Crect x='100' y='55' width='10' height='10' fill='%23F06922'/%3E%3Crect x='10' y='95' width='10' height='10' fill='%23F06922'/%3E%3Crect x='30' y='80' width='10' height='10' fill='%23F06922'/%3E%3Crect x='50' y='100' width='10' height='10' fill='%23F06922'/%3E%3Crect x='130' y='80' width='10' height='10' fill='%23F06922'/%3E%3Crect x='150' y='100' width='10' height='10' fill='%23F06922'/%3E%3Crect x='170' y='80' width='10' height='10' fill='%23F06922'/%3E%3Crect x='130' y='140' width='10' height='10' fill='%23F06922'/%3E%3Crect x='150' y='155' width='10' height='10' fill='%23F06922'/%3E%3Crect x='170' y='140' width='10' height='10' fill='%23F06922'/%3E%3Crect x='140' y='170' width='10' height='10' fill='%23F06922'/%3E%3Crect x='160' y='180' width='10' height='10' fill='%23F06922'/%3E%3Crect x='180' y='165' width='10' height='10' fill='%23F06922'/%3E%3Crect x='80' y='130' width='10' height='10' fill='%23F06922'/%3E%3Crect x='100' y='145' width='10' height='10' fill='%23F06922'/%3E%3Crect x='110' y='165' width='10' height='10' fill='%23F06922'/%3E%3C/svg%3E") center/contain no-repeat`,
            borderRadius: 8,
          }} />
          <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500 }}>
            {uploadUrl.slice(0, 40)}...
          </span>
        </div>

        {/* Instructions card */}
        <div style={{
          background: 'rgba(255,107,53,0.08)',
          backdropFilter: 'blur(12px)',
          borderRadius: 16,
          padding: '20px 24px',
          textAlign: 'left',
          border: '1px solid rgba(255,107,53,0.15)',
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#FF6B35', marginBottom: 14 }}>How it works:</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: '#2D3436', lineHeight: 1.6 }}>
            <div>1️⃣ Scan QR → Camera opens on your phone</div>
            <div>2️⃣ Take photo → Auto uploads to kiosk</div>
            <div>3️⃣ AI analyzes → Shows diagnosis in 10 seconds</div>
          </div>
        </div>

        {/* Privacy card */}
        <div style={{
          background: 'rgba(0,184,148,0.08)',
          border: '2px solid rgba(0,184,148,0.3)',
          borderRadius: 16,
          padding: '16px 20px',
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: 24 }}>🔐</span>
          <div style={{ textAlign: 'left', flex: 1 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: '#00B894', marginBottom: 6 }}>Privacy Guaranteed</h3>
            <p style={{ fontSize: 13, color: '#2D3436', lineHeight: 1.5 }}>
              Only YOU can access this photo with code <strong>{localStorage.getItem('userCode') || '9876'}</strong>.
              Photo encrypted and stored securely.
            </p>
          </div>
        </div>

        {/* Status card */}
        <div style={{
          background: status === 'complete' ? 'rgba(0,184,148,0.1)' : 'rgba(253,203,110,0.12)',
          borderRadius: 16,
          padding: '18px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#2D3436' }}>Status:</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: cur.color }}>
            {cur.icon} {cur.text}
          </div>
          {status === 'analyzing' && (
            <div style={{ width: '100%', height: 4, background: '#E0E0E0', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                width: '100%', height: '100%', background: '#FF6B35',
                animation: 'loadingSlide 1.5s ease-in-out infinite',
              }} />
            </div>
          )}
        </div>

        {/* Timer */}
        {status === 'waiting' && (
          <p style={{ fontSize: 16, fontWeight: 600, color: timeLeft < 30 ? '#D63031' : '#636E72' }}>
            Time remaining: {formatTime(timeLeft)}
          </p>
        )}

        {/* Demo button (simulate upload) */}
        <button
          onClick={simulateUpload}
          className="btn btn-primary btn-lg"
          style={{ width: '100%' }}
        >
          🎬 Demo: Simulate Photo Upload
        </button>

        {/* Skip button */}
        {showSkip && status === 'waiting' && (
          <button
            onClick={() => navigate('/acne-manual')}
            className="btn btn-ghost"
            style={{ width: '100%' }}
          >
            Skip Photo Analysis →
          </button>
        )}
      </div>

      <style>{`
        @keyframes loadingSlide {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </Layout>
  );
}
