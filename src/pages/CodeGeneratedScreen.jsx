import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Silk from './Silk';

export default function CodeGeneratedScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const canvasRef = useRef(null);

  const accessCode = localStorage.getItem('accessCode') || '6241';
  const referralCode = localStorage.getItem('referralCode');
  const referralBonus = referralCode ? 5 : 0;

  useEffect(() => { setTimeout(() => setShow(true), 120); }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(timer); navigate('/group-type'); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  // Confetti particles
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const confetti = Array.from({ length: 40 }, () => ({
      x: Math.random() * W, y: -10 - Math.random() * 200,
      w: 4 + Math.random() * 6, h: 8 + Math.random() * 8,
      dy: 0.8 + Math.random() * 1.5, dx: (Math.random() - 0.5) * 0.8,
      rot: Math.random() * 360, drot: (Math.random() - 0.5) * 4,
      color: ['#F06922', '#22C55E', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B'][Math.floor(Math.random() * 6)],
      opacity: 0.6 + Math.random() * 0.4,
    }));
    let id;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      confetti.forEach(c => {
        ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(c.rot * Math.PI / 180);
        ctx.globalAlpha = c.opacity; ctx.fillStyle = c.color;
        ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        ctx.restore();
        c.y += c.dy; c.x += c.dx; c.rot += c.drot;
        if (c.y > H + 20) { c.y = -10; c.x = Math.random() * W; }
      });
      ctx.globalAlpha = 1; id = requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'transparent',
      fontFamily: "'Inter', 'Outfit', sans-serif",
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 40, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
        <Silk speed={5} scale={1} color="#ff6627" noiseIntensity={1.5} rotation={0} />
      </div>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }} />

      {/* Gradient orbs */}
      <div style={{ position: 'absolute', top: -100, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,105,34,0.08) 0%, transparent 70%)', animation: 'floatOrb2 10s ease-in-out infinite', pointerEvents: 'none' }} />

      <div style={{
        maxWidth: 560, width: '100%', position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
        borderRadius: 32, padding: '52px 44px',
        boxShadow: '0 24px 80px rgba(34,197,94,0.12), 0 0 0 1px rgba(255,255,255,0.8)',
        textAlign: 'center',
        opacity: show ? 1 : 0, transform: show ? 'scale(1)' : 'scale(0.93)',
        transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Success Icon */}
        <div style={{
          width: 100, height: 100,
          background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
          borderRadius: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px', fontSize: 50,
          boxShadow: '0 16px 50px rgba(34,197,94,0.35)',
          animation: 'bounceIn 0.7s ease',
        }}>🎉</div>

        <h1 style={{ fontSize: 30, fontWeight: 800, color: '#111', marginBottom: 8 }}>Account Created!</h1>
        <p style={{ fontSize: 15, color: '#666', marginBottom: 36, lineHeight: 1.6 }}>
          Save this code — you'll need it to log back in
        </p>

        {/* Code Display */}
        <div style={{
          background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
          borderRadius: 22, padding: '30px 32px', marginBottom: 24,
          border: '2px solid rgba(240,105,34,0.15)',
          boxShadow: '0 8px 32px rgba(240,105,34,0.1)',
        }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: '#F06922', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 18 }}>
            Your Access Code
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            {accessCode.split('').map((digit, i) => (
              <div key={i} style={{
                width: 64, height: 76,
                background: 'var(--white)', borderRadius: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 34, fontWeight: 900, color: '#F06922',
                boxShadow: '0 6px 24px rgba(240,105,34,0.15)',
                border: '2px solid rgba(240,105,34,0.12)',
                fontFamily: "'Outfit', monospace",
                animation: `popIn 0.4s ease ${i * 0.1}s both`,
              }}>
                {digit}
              </div>
            ))}
          </div>
        </div>

        {/* Referral Bonus */}
        {referralBonus > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
            borderRadius: 16, padding: '16px 24px', marginBottom: 20,
            border: '1px solid rgba(34,197,94,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            boxShadow: '0 4px 16px rgba(34,197,94,0.1)',
          }}>
            <span style={{ fontSize: 20 }}>🎁</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#16A34A' }}>₹{referralBonus} Bonus Applied!</span>
          </div>
        )}

        {/* WhatsApp Sent */}
        <div style={{
          background: 'rgba(0,0,0,0.02)', borderRadius: 14, padding: '14px 24px', marginBottom: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          border: '1px solid rgba(0,0,0,0.04)',
        }}>
          <span style={{ fontSize: 16 }}>📱</span>
          <span style={{ fontSize: 13, color: '#666' }}>Code sent to your WhatsApp</span>
        </div>

        {/* Continue */}
        <button onClick={() => navigate('/group-type')} style={{
          width: '100%', border: 'none', borderRadius: 18, padding: '20px',
          fontSize: 17, fontWeight: 700, color: '#FFF', cursor: 'pointer',
          background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
          boxShadow: '0 12px 40px rgba(240,105,34,0.35)',
          position: 'relative', overflow: 'hidden',
        }}>
          <span style={{ position: 'relative', zIndex: 1 }}>Continue →</span>
          <div style={{
            position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'btnShimmer 2.5s infinite',
          }} />
        </button>

        {/* Countdown */}
        <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(240,105,34,0.08)', border: '2px solid rgba(240,105,34,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 800, color: '#F06922',
          }}>{countdown}</div>
          <span style={{ fontSize: 13, color: 'var(--gray-400)' }}>Auto-continuing...</span>
        </div>
      </div>

      <style>{`
        @keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
        @keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px,-20px); } }
        @keyframes bounceIn { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.2); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes popIn { 0% { transform: scale(0) rotate(-10deg); opacity: 0; } 100% { transform: scale(1) rotate(0); opacity: 1; } }
        @keyframes btnShimmer { 0% { left: -100%; } 100% { left: 200%; } }
      `}</style>
    </div>
  );
}
