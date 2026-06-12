import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BotCustomizeScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [face, setFace] = useState('robot');
  const [sound, setSound] = useState('chime');
  const [personality, setPersonality] = useState('cheerful');
  const [sleepTime, setSleepTime] = useState('22:00');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [saving, setSaving] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => { setTimeout(() => setShow(true), 150); }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: 1 + Math.random() * 2,
      dx: (Math.random() - 0.5) * 0.3, dy: (Math.random() - 0.5) * 0.3,
      opacity: 0.1 + Math.random() * 0.2,
      color: ['#F06922', '#8B5CF6', '#EC4899', '#3B82F6'][Math.floor(Math.random() * 4)],
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

  const faces = [
    { id: 'robot', icon: '🤖', label: 'Robot', stars: 0, unlocked: true },
    { id: 'cat', icon: '🐱', label: 'Cat', stars: 20, unlocked: false },
    { id: 'dog', icon: '🐶', label: 'Dog', stars: 40, unlocked: false },
    { id: 'panda', icon: '🐼', label: 'Panda', stars: 60, unlocked: false },
    { id: 'bunny', icon: '🐰', label: 'Bunny', stars: 80, unlocked: false },
    { id: 'bear', icon: '🐻', label: 'Bear', stars: 100, unlocked: false },
  ];

  const sounds = [
    { id: 'chime', icon: '🔔', label: 'Chime' },
    { id: 'melody', icon: '🎵', label: 'Melody' },
    { id: 'beep', icon: '📟', label: 'Beep' },
    { id: 'voice', icon: '🗣️', label: 'Voice', soon: true },
  ];

  const personalities = [
    { id: 'cheerful', icon: '😄', label: 'Cheerful', desc: 'Enthusiastic, positive messages', color: '#F59E0B' },
    { id: 'calm', icon: '😌', label: 'Calm', desc: 'Gentle, soothing reminders', color: '#3B82F6' },
    { id: 'strict', icon: '😤', label: 'Strict', desc: 'Firm, no-nonsense pushes', color: '#EF4444' },
  ];

  const builtInFeatures = [
    '🎮 3 Mini Games', '😊 18 Face Expressions', '✨ 12+ Animations', '🧠 Health Quiz',
    '💬 50+ Messages', '📊 Progress Bars', '🔥 Streak Tracker', '🎂 Birthday Mode',
    '🔔 4 Sound Patterns', '💡 RGB LEDs',
  ];

  const handleSave = () => {
    setSaving(true);
    const config = { face, sound, personality, sleepTime, wakeTime };
    localStorage.setItem('botConfig', JSON.stringify(config));
    setTimeout(() => { setSaving(false); navigate('/bot-status'); }, 1500);
  };

  const glassCard = {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
    borderRadius: 22, padding: '24px',
    border: '1px solid rgba(255,255,255,0.06)',
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
      <div style={{ position: 'absolute', top: -100, left: -80, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)', animation: 'floatOrb2 10s ease-in-out infinite', pointerEvents: 'none' }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 640, margin: '0 auto', padding: '40px 24px',
        display: 'flex', flexDirection: 'column', gap: 24,
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate(-1)} style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12, padding: '10px 18px', color: 'rgba(255,255,255,0.6)',
            fontSize: 14, fontWeight: 600, cursor: 'pointer', backdropFilter: 'blur(20px)',
          }}>← Back</button>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, background: 'linear-gradient(135deg, #F06922, #FF8A4C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>🎨 Customize Bot</h1>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Make it yours</p>
          </div>
        </div>

        {/* Face Type */}
        <div style={glassCard}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'rgba(255,255,255,0.9)', marginBottom: 16 }}>😊 Face Type</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {faces.map((f) => (
              <button key={f.id} onClick={() => f.unlocked && setFace(f.id)} disabled={!f.unlocked} style={{
                background: face === f.id ? 'rgba(240,105,34,0.12)' : 'rgba(255,255,255,0.03)',
                border: face === f.id ? '2px solid rgba(240,105,34,0.5)' : '2px solid rgba(255,255,255,0.06)',
                borderRadius: 16, padding: '16px 10px', textAlign: 'center',
                cursor: f.unlocked ? 'pointer' : 'not-allowed',
                opacity: f.unlocked ? 1 : 0.4,
                transition: 'all 0.25s ease', position: 'relative',
              }}>
                <div style={{ fontSize: 32, marginBottom: 6 }}>{f.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: face === f.id ? '#F06922' : 'rgba(255,255,255,0.5)' }}>{f.label}</div>
                {!f.unlocked && (
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>🔒 {f.stars}⭐</div>
                )}
                {face === f.id && (
                  <div style={{
                    position: 'absolute', top: 6, right: 6, width: 20, height: 20,
                    background: '#F06922', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sound Theme */}
        <div style={glassCard}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'rgba(255,255,255,0.9)', marginBottom: 16 }}>🔊 Sound Theme</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {sounds.map((s) => (
              <button key={s.id} onClick={() => !s.soon && setSound(s.id)} disabled={s.soon} style={{
                background: sound === s.id ? 'rgba(240,105,34,0.12)' : 'rgba(255,255,255,0.03)',
                border: sound === s.id ? '2px solid rgba(240,105,34,0.5)' : '2px solid rgba(255,255,255,0.06)',
                borderRadius: 14, padding: '14px 8px', textAlign: 'center',
                cursor: s.soon ? 'not-allowed' : 'pointer', opacity: s.soon ? 0.35 : 1,
                transition: 'all 0.25s ease',
              }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: sound === s.id ? '#F06922' : 'rgba(255,255,255,0.5)' }}>{s.label}</div>
                {s.soon && <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>Soon</div>}
              </button>
            ))}
          </div>
        </div>

        {/* Personality */}
        <div style={glassCard}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'rgba(255,255,255,0.9)', marginBottom: 16 }}>💬 Personality Mode</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {personalities.map((p) => (
              <button key={p.id} onClick={() => setPersonality(p.id)} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '16px 20px', width: '100%', textAlign: 'left',
                background: personality === p.id ? `${p.color}15` : 'rgba(255,255,255,0.03)',
                border: personality === p.id ? `2px solid ${p.color}60` : '2px solid rgba(255,255,255,0.06)',
                borderRadius: 16, cursor: 'pointer', transition: 'all 0.25s ease',
              }}>
                <span style={{ fontSize: 28 }}>{p.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: personality === p.id ? p.color : 'rgba(255,255,255,0.7)' }}>{p.label}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{p.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sleep Schedule */}
        <div style={glassCard}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'rgba(255,255,255,0.9)', marginBottom: 16 }}>🌙 Sleep Schedule</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[{ label: 'Sleep Time', value: sleepTime, set: setSleepTime }, { label: 'Wake Time', value: wakeTime, set: setWakeTime }].map((t, i) => (
              <div key={i}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 8 }}>{t.label}</label>
                <input type="time" value={t.value} onChange={(e) => t.set(e.target.value)} style={{
                  width: '100%', padding: '14px 16px', borderRadius: 14,
                  border: '1px solid rgba(255,255,255,0.1)', fontSize: 15, fontWeight: 600,
                  color: '#F06922', background: 'rgba(255,255,255,0.04)', outline: 'none',
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* Built-in Features */}
        <div style={{
          ...glassCard,
          background: 'rgba(240,105,34,0.04)',
          border: '1px solid rgba(240,105,34,0.12)',
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#F06922', marginBottom: 16 }}>🔧 Built-in Features</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {builtInFeatures.map((f, i) => (
              <div key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{f}</div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button onClick={handleSave} disabled={saving} style={{
          width: '100%', border: 'none', borderRadius: 16, padding: '18px',
          fontSize: 16, fontWeight: 700, color: '#FFF', cursor: saving ? 'not-allowed' : 'pointer',
          background: saving ? 'linear-gradient(135deg, #6B7280, #4B5563)' : 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
          boxShadow: saving ? 'none' : '0 12px 40px rgba(240,105,34,0.35)',
          position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease',
        }}>
          <span style={{ position: 'relative', zIndex: 1 }}>{saving ? '⏳ Syncing Bot...' : '💾 Save & Sync Bot'}</span>
          {!saving && <div style={{
            position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'btnShimmer 2.5s infinite',
          }} />}
        </button>
      </div>

      <style>{`
        @keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
        @keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px,-20px); } }
        @keyframes btnShimmer { 0% { left: -100%; } 100% { left: 200%; } }
      `}</style>
    </div>
  );
}
