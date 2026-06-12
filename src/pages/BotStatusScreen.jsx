import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BotStatusScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const canvasRef = useRef(null);
  const pairingCode = localStorage.getItem('botPairingCode') || 'A3X9K2';
  const config = JSON.parse(localStorage.getItem('botConfig') || '{}');

  useEffect(() => { setTimeout(() => setShow(true), 150); }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: 1 + Math.random() * 2,
      dx: (Math.random() - 0.5) * 0.25, dy: (Math.random() - 0.5) * 0.25,
      opacity: 0.1 + Math.random() * 0.18,
      color: ['#F06922', '#3B82F6', '#8B5CF6'][Math.floor(Math.random() * 3)],
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

  const faceMap = { robot: '🤖', cat: '🐱', dog: '🐶', panda: '🐼', bunny: '🐰', bear: '🐻' };
  const soundMap = { chime: '🔔 Chime', melody: '🎵 Melody', beep: '📟 Beep', voice: '🗣️ Voice' };
  const personalityMap = { cheerful: '😄 Cheerful', calm: '😌 Calm', strict: '😤 Strict' };

  const settings = [
    { label: 'Face', value: `${faceMap[config.face] || '🤖'} ${(config.face || 'Robot').charAt(0).toUpperCase() + (config.face || 'robot').slice(1)}`, color: '#F06922' },
    { label: 'Sound', value: soundMap[config.sound] || '🔔 Chime', color: '#3B82F6' },
    { label: 'Personality', value: personalityMap[config.personality] || '😄 Cheerful', color: '#8B5CF6' },
    { label: 'Sleep', value: `${config.sleepTime || '22:00'} → ${config.wakeTime || '07:00'}`, color: '#EC4899' },
  ];

  const glassCard = {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
    borderRadius: 22, border: '1px solid rgba(255,255,255,0.06)',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0F0F12 0%, #1A1A2E 40%, #16213E 100%)',
      fontFamily: "'Inter', 'Outfit', sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      {/* Gradient orbs */}
      <div style={{ position: 'absolute', top: -80, right: -80, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, left: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,105,34,0.1) 0%, transparent 70%)', animation: 'floatOrb2 10s ease-in-out infinite', pointerEvents: 'none' }} />

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

        {/* Status Card - Hero */}
        <div style={{
          ...glassCard, padding: '36px 28px', textAlign: 'center',
          border: '1px solid rgba(240,105,34,0.15)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative rotating ring */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 130, height: 130, marginTop: -65, marginLeft: -65,
            borderRadius: '50%', border: '1px solid rgba(240,105,34,0.08)',
            animation: 'spin 20s linear infinite', pointerEvents: 'none',
          }} />

          <div style={{
            fontSize: 64, marginBottom: 16,
            animation: 'botFloat 3s ease-in-out infinite',
            filter: 'drop-shadow(0 8px 24px rgba(240,105,34,0.3))',
          }}>
            {faceMap[config.face] || '🤖'}
          </div>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.06)', padding: '8px 20px', borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.08)', marginBottom: 12,
          }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%', background: '#9CA3AF',
              animation: 'offlinePulse 2s infinite',
            }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>Offline — Unpaired</span>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>Last online: Never</p>
        </div>

        {/* Pairing Code */}
        <div style={{
          ...glassCard, padding: '24px', textAlign: 'center',
          border: '1px solid rgba(240,105,34,0.2)',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 14 }}>
            Pairing Code
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
            {pairingCode.split('').map((c, i) => (
              <span key={i} style={{
                width: 44, height: 52,
                background: 'rgba(240,105,34,0.08)', borderRadius: 12,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontWeight: 900, color: '#F06922',
                border: '1px solid rgba(240,105,34,0.2)',
                fontFamily: "'Outfit', monospace",
                boxShadow: '0 4px 16px rgba(240,105,34,0.1)',
              }}>
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Current Settings */}
        <div style={{ ...glassCard, padding: '24px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'rgba(255,255,255,0.9)', marginBottom: 18 }}>⚙️ Current Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {settings.map((s, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.04)',
              }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{s.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/bot-customize')} style={{
            marginTop: 16, width: '100%',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14, padding: '14px', fontSize: 13, fontWeight: 600,
            color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
            backdropFilter: 'blur(20px)', transition: 'all 0.2s',
          }}>✏️ Edit Settings</button>
        </div>

        {/* Warning */}
        <div style={{
          background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)',
          borderRadius: 16, padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'center',
        }}>
          <span style={{ fontSize: 22 }}>⚠️</span>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
            Bot will appear online once paired and powered on. Settings sync automatically.
          </p>
        </div>

        {/* Nav Buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => navigate('/wa-preview')} style={{
            flex: 1, border: 'none', borderRadius: 16, padding: '16px',
            fontSize: 14, fontWeight: 700, color: '#FFF', cursor: 'pointer',
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            boxShadow: '0 8px 30px rgba(37,211,102,0.25)',
          }}>📱 WhatsApp</button>
          <button onClick={() => navigate('/')} style={{
            flex: 1, background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '16px',
            fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
            backdropFilter: 'blur(20px)',
          }}>🏠 Home</button>
        </div>
      </div>

      <style>{`
        @keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
        @keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px,-20px); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes botFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes offlinePulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}
