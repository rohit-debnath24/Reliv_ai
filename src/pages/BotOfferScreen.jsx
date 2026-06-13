import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BotOfferScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => { setTimeout(() => setShow(true), 150); }, []);

  useEffect(() => {
    const i = setInterval(() => setActiveFeature(p => (p + 1) % 8), 3000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: 1.5 + Math.random() * 2.5,
      dx: (Math.random() - 0.5) * 0.4, dy: (Math.random() - 0.5) * 0.4,
      opacity: 0.15 + Math.random() * 0.25,
      color: ['#F06922', '#FF8A4C', '#22C55E', '#3B82F6'][Math.floor(Math.random() * 4)],
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

  const features = [
    { icon: '😊', title: 'OLED Face Display', desc: '6 faces × 3 moods = 18 unique expressions', color: '#F06922' },
    { icon: '📱', title: 'WhatsApp Sync', desc: 'Real-time sync with your reminders', color: '#25D366' },
    { icon: '🔔', title: 'Smart Reminders', desc: 'Sound + LED when it\'s time to act', color: '#3B82F6' },
    { icon: '🎮', title: 'Mini Games', desc: 'Snake, Memory, Reaction Time built-in', color: '#8B5CF6' },
    { icon: '👆', title: 'Touch Sensor', desc: 'Pet your bot! It responds with love', color: '#EC4899' },
    { icon: '🌙', title: 'Smart Sleep', desc: 'Auto sleeps at night, wakes with you', color: '#6366F1' },
    { icon: '⭐', title: 'Progress System', desc: 'Stars, levels, streaks & unlockables', color: '#F59E0B' },
    { icon: '🧠', title: 'Health Quiz', desc: '15 questions to test your knowledge', color: '#14B8A6' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0F0F12 0%, #1A1A2E 40%, #16213E 100%)',
      fontFamily: "'Inter', 'Outfit', sans-serif", position: 'relative', overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(240,105,34,0.15) 0%, transparent 70%)', borderRadius: '50%', animation: 'floatOrb1 20s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', borderRadius: '50%', animation: 'floatOrb2 25s ease-in-out infinite' }} />
      </div>

      <button onClick={() => navigate(-1)} style={{
        position: 'fixed', top: 24, left: 24, zIndex: 50,
        background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '12px 20px',
        color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s',
      }}>← Back</button>

      <div style={{
        position: 'relative', zIndex: 10, maxWidth: 640, margin: '0 auto', padding: '80px 24px 40px',
        display: 'flex', flexDirection: 'column', gap: 28,
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Hero */}
        <div style={{
          background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
          borderRadius: 32, padding: '48px 36px', textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}>
          <div style={{ position: 'absolute', top: 0, left: '-100%', width: '200%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)', animation: 'shimmerSweep 4s ease-in-out infinite' }} />
          <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 28px' }}>
            <div style={{ position: 'absolute', inset: -8, border: '2px solid transparent', borderTopColor: '#F06922', borderRightColor: 'rgba(240,105,34,0.3)', borderRadius: '50%', animation: 'spin 3s linear infinite' }} />
            <div style={{ position: 'absolute', inset: -4, border: '2px solid transparent', borderBottomColor: '#22C55E', borderLeftColor: 'rgba(34,197,94,0.3)', borderRadius: '50%', animation: 'spinReverse 4s linear infinite' }} />
            <div style={{
              width: '100%', height: '100%', background: 'linear-gradient(135deg, #F06922 0%, #FF6B35 50%, #E85C25 100%)',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64,
              boxShadow: '0 16px 60px rgba(240,105,34,0.4), 0 0 0 4px rgba(240,105,34,0.15)', animation: 'botFloat 4s ease-in-out infinite',
            }}>🤖</div>
            <div style={{ position: 'absolute', bottom: 8, right: 8, width: 24, height: 24, background: '#22C55E', borderRadius: '50%', border: '3px solid #1A1A2E', animation: 'onlinePulse 2s ease-in-out infinite' }} />
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(240,105,34,0.15)', borderRadius: 20, padding: '6px 16px', marginBottom: 16, border: '1px solid rgba(240,105,34,0.25)' }}>
            <span style={{ fontSize: 10 }}>🔥</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#FF8A4C', textTransform: 'uppercase', letterSpacing: 1.5 }}>New Product</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: 'var(--white)', marginBottom: 12, letterSpacing: -1, lineHeight: 1.1 }}>
            Meet Your Personal<br />
            <span style={{ background: 'linear-gradient(135deg, #F06922, #FF8A4C, #FFB380)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Health Companion</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 400, margin: '0 auto' }}>
            A cute IoT pet that syncs with your WhatsApp — reminds you to eat, drink water, and exercise in real time.
          </p>
        </div>

        {/* Features */}
        <div style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRadius: 24, padding: '28px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20 }}>What's Inside the Box 📦</h3>
          <div style={{
            background: `${features[activeFeature].color}18`, borderRadius: 20, padding: '24px', marginBottom: 20,
            border: `1px solid ${features[activeFeature].color}33`, transition: 'all 0.5s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: `${features[activeFeature].color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0, boxShadow: `0 8px 24px ${features[activeFeature].color}30` }}>
                {features[activeFeature].icon}
              </div>
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--white)', marginBottom: 4 }}>{features[activeFeature].title}</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{features[activeFeature].desc}</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {features.map((f, i) => (
              <button key={i} onClick={() => setActiveFeature(i)} style={{
                background: i === activeFeature ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
                border: i === activeFeature ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
                borderRadius: 14, padding: '14px 8px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s',
              }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{f.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: i === activeFeature ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)' }}>{f.title.split(' ')[0]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(240,105,34,0.2) 0%, rgba(232,92,37,0.1) 100%)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRadius: 24, padding: '32px', textAlign: 'center',
          border: '1px solid rgba(240,105,34,0.2)', boxShadow: '0 16px 48px rgba(240,105,34,0.15)', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: 'radial-gradient(circle, rgba(240,105,34,0.2), transparent 70%)', borderRadius: '50%' }} />
          <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>One-time purchase</div>
          <div style={{ fontSize: 56, fontWeight: 900, color: 'var(--white)', lineHeight: 1, marginBottom: 8 }}>
            <span style={{ fontSize: 28, verticalAlign: 'top', opacity: 0.7 }}>₹</span>499
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>Free lifetime sync • No subscription ever</p>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <button onClick={() => navigate('/bot-purchase')} onMouseEnter={() => setHovered('buy')} onMouseLeave={() => setHovered(null)} style={{
            width: '100%', position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(135deg, #F06922 0%, #E85C25 50%, #D4521C 100%)',
            border: 'none', borderRadius: 20, padding: '22px', fontSize: 18, fontWeight: 800, color: '#FFF', cursor: 'pointer',
            boxShadow: hovered === 'buy' ? '0 20px 60px rgba(240,105,34,0.5), 0 0 0 2px rgba(240,105,34,0.3)' : '0 12px 40px rgba(240,105,34,0.3)',
            transform: hovered === 'buy' ? 'translateY(-2px) scale(1.01)' : 'translateY(0) scale(1)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <div style={{ position: 'absolute', top: 0, left: '-100%', width: '200%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', animation: 'btnShimmer 3s ease-in-out infinite' }} />
            <span style={{ position: 'relative', zIndex: 1 }}>🤖 Buy Pet Bot — ₹499</span>
          </button>
          <button onClick={() => navigate('/wa-preview')} onMouseEnter={() => setHovered('skip')} onMouseLeave={() => setHovered(null)} style={{
            width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16, padding: '18px', fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
            transform: hovered === 'skip' ? 'translateY(-1px)' : 'translateY(0)', transition: 'all 0.3s',
          }}>Skip for Now →</button>
        </div>
      </div>

      <style>{`
        @keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-30px,20px); } }
        @keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-30px); } }
        @keyframes shimmerSweep { 0% { transform: translateX(-50%); } 100% { transform: translateX(50%); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes spinReverse { to { transform: rotate(-360deg); } }
        @keyframes botFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes onlinePulse { 0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); } 50% { box-shadow: 0 0 0 8px rgba(34,197,94,0); } }
        @keyframes btnShimmer { 0% { transform: translateX(-50%); } 50%,100% { transform: translateX(50%); } }
      `}</style>
    </div>
  );
}
