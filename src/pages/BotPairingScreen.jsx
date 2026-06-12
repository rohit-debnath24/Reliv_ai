import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BotPairingScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const canvasRef = useRef(null);
  const pairingCode = localStorage.getItem('botPairingCode') || 'A3X9K2';

  useEffect(() => { setTimeout(() => setShow(true), 150); }, []);

  // Stagger step reveals
  useEffect(() => {
    if (!show) return;
    const timers = steps.map((_, i) => setTimeout(() => setActiveStep(i), 600 + i * 200));
    return () => timers.forEach(clearTimeout);
  }, [show]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: 1.5 + Math.random() * 2,
      dx: (Math.random() - 0.5) * 0.3, dy: (Math.random() - 0.5) * 0.3,
      opacity: 0.12 + Math.random() * 0.2,
      color: ['#F06922', '#22C55E', '#3B82F6', '#8B5CF6'][Math.floor(Math.random() * 4)],
    }));
    let id;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
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

  const steps = [
    { num: 1, icon: '📦', text: 'Take bot home (pick up at counter)', color: '#F06922' },
    { num: 2, icon: '🔌', text: 'Power on with USB cable', color: '#3B82F6' },
    { num: 3, icon: '📟', text: 'Wait for "READY!" on OLED screen', color: '#8B5CF6' },
    { num: 4, icon: '💻', text: 'Open Serial Monitor (115200 baud)', color: '#EC4899' },
    { num: 5, icon: '⌨️', text: `Type: PAIR ${pairingCode}`, color: '#22C55E' },
    { num: 6, icon: '✨', text: 'Bot syncs in seconds — done!', color: '#F59E0B' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0F0F12 0%, #1A1A2E 40%, #16213E 100%)',
      fontFamily: "'Inter', 'Outfit', sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      {/* Gradient orbs */}
      <div style={{ position: 'absolute', top: -80, right: -80, width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, left: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,105,34,0.12) 0%, transparent 70%)', animation: 'floatOrb2 10s ease-in-out infinite', pointerEvents: 'none' }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 560, margin: '0 auto', padding: '40px 24px',
        display: 'flex', flexDirection: 'column', gap: 24,
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Back */}
        <button onClick={() => navigate(-1)} style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 12, padding: '10px 18px', color: 'rgba(255,255,255,0.6)',
          fontSize: 14, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start',
          backdropFilter: 'blur(20px)',
        }}>← Back</button>

        {/* Success badge */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 88, height: 88, margin: '0 auto 20px',
            background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))',
            borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 44, border: '2px solid rgba(34,197,94,0.3)',
            boxShadow: '0 12px 40px rgba(34,197,94,0.2)',
            animation: 'bounceIn 0.6s ease',
          }}>🎉</div>
          <h1 style={{
            fontSize: 26, fontWeight: 800, marginBottom: 6,
            background: 'linear-gradient(135deg, #22C55E, #4ADE80)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Bot Purchased!</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Use this code to pair your bot at home</p>
        </div>

        {/* Pairing code card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
          borderRadius: 24, padding: '32px 24px',
          border: '1px solid rgba(240,105,34,0.2)',
          boxShadow: '0 16px 60px rgba(240,105,34,0.15)',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative ring */}
          <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', border: '2px solid rgba(240,105,34,0.1)', pointerEvents: 'none' }} />
          
          <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 16 }}>
            Your Pairing Code
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            {pairingCode.split('').map((char, i) => (
              <div key={i} style={{
                width: 52, height: 64,
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, fontWeight: 900, color: '#F06922',
                border: '1px solid rgba(240,105,34,0.25)',
                boxShadow: '0 4px 20px rgba(240,105,34,0.15)',
                fontFamily: "'Outfit', monospace",
                animation: `popIn 0.35s ease ${i * 0.08}s both`,
              }}>
                {char}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <span style={{ fontSize: 14 }}>📱</span> Code also sent to your WhatsApp
          </div>
        </div>

        {/* Setup Steps */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
          borderRadius: 22, padding: '28px 24px',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'rgba(255,255,255,0.9)', marginBottom: 20 }}>
            📋 6-Step Setup Guide
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {steps.map((s, i) => (
              <div key={s.num} style={{
                display: 'flex', gap: 14, alignItems: 'center',
                opacity: i <= activeStep ? 1 : 0.3,
                transform: i <= activeStep ? 'translateX(0)' : 'translateX(-12px)',
                transition: `all 0.4s ease ${i * 0.1}s`,
              }}>
                <div style={{
                  width: 44, height: 44,
                  background: `${s.color}18`,
                  borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0,
                  border: `1px solid ${s.color}30`,
                  boxShadow: `0 4px 16px ${s.color}15`,
                }}>
                  {s.icon}
                </div>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: s.color, textTransform: 'uppercase', letterSpacing: 1 }}>Step {s.num}</span>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div style={{
          background: 'rgba(34,197,94,0.06)',
          border: '1px solid rgba(34,197,94,0.15)',
          borderRadius: 16, padding: '16px 20px',
          display: 'flex', gap: 12, alignItems: 'center',
        }}>
          <span style={{ fontSize: 22 }}>💡</span>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
            <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Tip:</strong> Bot auto-connects to WiFi. If not, type{' '}
            <code style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 8px', borderRadius: 6, fontSize: 11, color: '#F06922' }}>WIFI yourSSID yourPassword</code> in Serial Monitor.
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => navigate('/bot-customize')}
          style={{
            width: '100%', border: 'none', borderRadius: 16, padding: '18px',
            fontSize: 16, fontWeight: 700, color: '#FFF', cursor: 'pointer',
            background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
            boxShadow: '0 12px 40px rgba(240,105,34,0.35)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>Continue to Customize →</span>
          <div style={{
            position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'btnShimmer 2.5s infinite',
          }} />
        </button>
      </div>

      <style>{`
        @keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
        @keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px,-20px); } }
        @keyframes bounceIn { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes popIn { 0% { transform: scale(0) rotate(-10deg); opacity: 0; } 100% { transform: scale(1) rotate(0); opacity: 1; } }
        @keyframes btnShimmer { 0% { left: -100%; } 100% { left: 200%; } }
      `}</style>
    </div>
  );
}
