import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentFailedScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const canvasRef = useRef(null);

  const lastPayRoute = localStorage.getItem('lastPayRoute') || '/group-type';

  const reasons = [
    { icon: '📶', text: 'Weak internet connection' },
    { icon: '🏦', text: 'Bank server timeout' },
    { icon: '💳', text: 'Insufficient funds' },
    { icon: '🔒', text: 'UPI / Card verification failed' },
  ];

  useEffect(() => { setTimeout(() => setShow(true), 120); }, []);

  // Particles
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const dots = Array.from({ length: 16 }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: 2 + Math.random() * 3,
      dx: (Math.random() - 0.5) * 0.3, dy: (Math.random() - 0.5) * 0.3,
      opacity: 0.03 + Math.random() * 0.05,
      color: ['#EF4444', '#F59E0B', '#F87171'][Math.floor(Math.random() * 3)],
    }));
    let id;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      dots.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = p.opacity; ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
      });
      ctx.globalAlpha = 1; id = requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFFAF7 0%, #FFF5F0 50%, #FFEEDD 100%)',
      fontFamily: "'Inter', 'Outfit', sans-serif",
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 40, position: 'relative', overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', top: -80, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />

      <div style={{
        maxWidth: 520, width: '100%', position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
        borderRadius: 32, padding: '48px 40px',
        boxShadow: '0 24px 80px rgba(239,68,68,0.08), 0 0 0 1px rgba(255,255,255,0.8)',
        textAlign: 'center',
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Error Icon */}
        <div style={{
          width: 90, height: 90,
          background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
          borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', fontSize: 48,
          border: '2px solid rgba(239,68,68,0.15)',
          boxShadow: '0 10px 36px rgba(239,68,68,0.12)',
          animation: 'bounceIn 0.6s ease',
        }}>❌</div>

        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', marginBottom: 8 }}>Payment Failed</h1>
        <p style={{ fontSize: 15, color: '#666', marginBottom: 6 }}>Don't worry — your money is safe.</p>

        {/* Reassurance */}
        <div style={{
          background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
          borderRadius: 16, padding: '14px 20px', marginBottom: 28,
          border: '1px solid rgba(34,197,94,0.15)',
          animation: 'slideIn 0.4s ease 0.2s both',
        }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#16A34A' }}>✅ No amount was deducted from your account</p>
        </div>

        {/* Reasons */}
        <div style={{
          background: 'rgba(0,0,0,0.02)', borderRadius: 20, padding: '22px 24px',
          marginBottom: 32, textAlign: 'left', border: '1px solid rgba(0,0,0,0.04)',
        }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: '#111', marginBottom: 16 }}>Common reasons:</h3>
          <div style={{ display: 'grid', gap: 10 }}>
            {reasons.map((r, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px', background: 'rgba(255,255,255,0.8)',
                borderRadius: 14, border: '1px solid rgba(0,0,0,0.03)',
                animation: `slideIn 0.4s ease ${0.3 + i * 0.08}s both`,
              }}>
                <span style={{ fontSize: 22 }}>{r.icon}</span>
                <span style={{ fontSize: 14, color: '#555', fontWeight: 500 }}>{r.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'grid', gap: 12 }}>
          <button onClick={() => navigate(lastPayRoute)} style={{
            width: '100%', border: 'none', borderRadius: 18, padding: '18px',
            fontSize: 16, fontWeight: 700, color: '#FFF', cursor: 'pointer',
            background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
            boxShadow: '0 12px 40px rgba(240,105,34,0.3)',
            position: 'relative', overflow: 'hidden',
          }}>
            <span style={{ position: 'relative', zIndex: 1 }}>🔄 Try Again</span>
            <div style={{
              position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              animation: 'btnShimmer 2.5s infinite',
            }} />
          </button>
          <button onClick={() => navigate('/group-type')} style={{
            width: '100%', background: 'rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: '14px',
            fontSize: 14, fontWeight: 600, color: '#444', cursor: 'pointer',
          }}>Choose Different Plan</button>
          <button onClick={() => navigate('/')} style={{
            width: '100%', background: 'transparent',
            border: 'none', borderRadius: 14, padding: '12px',
            fontSize: 13, fontWeight: 600, color: '#999', cursor: 'pointer',
          }}>🏠 Go Home</button>
        </div>
      </div>

      <style>{`
        @keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
        @keyframes bounceIn { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes slideIn { 0% { opacity: 0; transform: translateX(-12px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes btnShimmer { 0% { left: -100%; } 100% { left: 200%; } }
      `}</style>
    </div>
  );
}
