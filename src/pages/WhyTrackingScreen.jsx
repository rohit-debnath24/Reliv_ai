import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WhyTrackingScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const canvasRef = useRef(null);

  const chatMessages = [
    { from: 'bot', text: '🏋️ Hey! Did you complete your morning workout?', delay: 0.3 },
    { from: 'user', text: 'YES ✅', delay: 0.7 },
    { from: 'bot', text: '🔥 Awesome! Streak: 1 day! Your bot is doing a happy dance! 🎉', delay: 1.1 },
  ];

  const benefits = [
    { icon: '📈', title: 'See Your Progress', desc: 'Watch your habits improve week by week', color: '#3B82F6' },
    { icon: '🤖', title: 'Bot Reacts to You', desc: 'Your IoT bot celebrates your wins!', color: '#8B5CF6' },
    { icon: '⭐', title: 'Earn Stars', desc: 'Complete tasks → earn stars → unlock rewards', color: '#F59E0B' },
    { icon: '🔥', title: 'Build Streaks', desc: 'Don\'t break the chain! Consistency wins.', color: '#EF4444' },
  ];

  useEffect(() => { setTimeout(() => setShow(true), 120); }, []);

  // Particles
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const dots = Array.from({ length: 20 }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: 2 + Math.random() * 3,
      dx: (Math.random() - 0.5) * 0.25, dy: (Math.random() - 0.5) * 0.25,
      opacity: 0.03 + Math.random() * 0.05,
      color: ['#8B5CF6', '#3B82F6', '#22C55E', '#F59E0B'][Math.floor(Math.random() * 4)],
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

      <div style={{ position: 'absolute', top: -80, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)', animation: 'floatOrb1 9s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', animation: 'floatOrb2 7s ease-in-out infinite', pointerEvents: 'none' }} />

      <div style={{
        maxWidth: 560, width: '100%', position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
        borderRadius: 32, padding: '48px 40px',
        boxShadow: '0 24px 80px rgba(139,92,246,0.08), 0 0 0 1px rgba(255,255,255,0.8)',
        textAlign: 'center',
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Hero */}
        <div style={{
          width: 84, height: 84,
          background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
          borderRadius: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', fontSize: 42,
          border: '2px solid rgba(139,92,246,0.2)',
          boxShadow: '0 10px 36px rgba(139,92,246,0.12)',
          animation: 'bounceIn 0.6s ease',
        }}>💬</div>

        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', marginBottom: 6 }}>Why Track via WhatsApp?</h1>
        <p style={{ fontSize: 15, color: '#666', marginBottom: 28 }}>It takes just 10 seconds to reply!</p>

        {/* WhatsApp Chat Demo */}
        <div style={{
          background: 'linear-gradient(135deg, #ECE5DD 0%, #D4CFC4 100%)',
          borderRadius: 20, padding: '20px', marginBottom: 28, textAlign: 'left',
          border: '1px solid rgba(0,0,0,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🤖</div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#333' }}>FitBot</span>
            <span style={{ fontSize: 11, color: '#888', marginLeft: 'auto' }}>WhatsApp</span>
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                animation: `slideIn 0.4s ease ${msg.delay}s both`,
              }}>
                <div style={{
                  maxWidth: '80%', padding: '10px 14px', borderRadius: 14,
                  background: msg.from === 'user' ? '#DCF8C6' : '#FFF',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  fontSize: 13, color: '#333', lineHeight: 1.4,
                  borderTopLeftRadius: msg.from === 'bot' ? 4 : 14,
                  borderTopRightRadius: msg.from === 'user' ? 4 : 14,
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {benefits.map((b, i) => (
            <div key={i} style={{
              background: `${b.color}06`, border: `1px solid ${b.color}15`,
              borderRadius: 18, padding: '18px 14px', textAlign: 'center',
              animation: `slideIn 0.4s ease ${0.3 + i * 0.1}s both`,
              boxShadow: `0 4px 14px ${b.color}08`,
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{b.icon}</div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 4 }}>{b.title}</p>
              <p style={{ fontSize: 11, color: '#888', lineHeight: 1.3 }}>{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'grid', gap: 12 }}>
          <button onClick={() => navigate('/todays-plan')} style={{
            width: '100%', border: 'none', borderRadius: 18, padding: '18px',
            fontSize: 16, fontWeight: 700, color: '#FFF', cursor: 'pointer',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
            boxShadow: '0 12px 40px rgba(139,92,246,0.3)',
            position: 'relative', overflow: 'hidden',
          }}>
            <span style={{ position: 'relative', zIndex: 1 }}>Got It! Let's Go 🚀</span>
            <div style={{
              position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              animation: 'btnShimmer 2.5s infinite',
            }} />
          </button>
          <button onClick={() => navigate('/')} style={{
            width: '100%', background: 'rgba(0,0,0,0.02)',
            border: '1px solid rgba(0,0,0,0.06)', borderRadius: 16, padding: '14px',
            fontSize: 14, fontWeight: 600, color: '#666', cursor: 'pointer',
          }}>🏠 Home</button>
        </div>
      </div>

      <style>{`
        @keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
        @keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(15px,-20px); } }
        @keyframes bounceIn { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes slideIn { 0% { opacity: 0; transform: translateX(-12px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes btnShimmer { 0% { left: -100%; } 100% { left: 200%; } }
      `}</style>
    </div>
  );
}
