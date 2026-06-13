import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MakeEasierScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const canvasRef = useRef(null);

  const progress = {
    water: { done: 15, target: 28, percent: 54 },
    meals: { done: 12, target: 21, percent: 57 },
    workouts: { done: 2, target: 5, percent: 40 },
  };
  const avgCompliance = Math.round((progress.water.percent + progress.meals.percent + progress.workouts.percent) / 3);

  const suggestions = [
    { icon: '💧', label: 'Water', current: '5/day', suggested: '3/day', color: '#3B82F6' },
    { icon: '🍽️', label: 'Meals', current: '3/day', suggested: '2/day', color: '#22C55E' },
    { icon: '🏋️', label: 'Workouts', current: '5/week', suggested: '3/week', color: '#F06922' },
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
      opacity: 0.04 + Math.random() * 0.06,
      color: ['#F59E0B', '#22C55E', '#3B82F6'][Math.floor(Math.random() * 3)],
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

  const handleAccept = () => {
    setAccepted(true);
    localStorage.setItem('easierPlan', 'true');
    setTimeout(() => navigate('/todays-plan'), 1500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFFAF7 0%, #FFF5F0 50%, #FFEEDD 100%)',
      fontFamily: "'Inter', 'Outfit', sans-serif",
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 40, position: 'relative', overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', top: -100, right: -80, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />

      <div style={{
        maxWidth: 560, width: '100%', position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
        borderRadius: 32, padding: '48px 40px',
        boxShadow: '0 24px 80px rgba(245,158,11,0.08), 0 0 0 1px rgba(255,255,255,0.8)',
        textAlign: 'center',
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Icon */}
        <div style={{
          width: 84, height: 84,
          background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
          borderRadius: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', fontSize: 42,
          border: '2px solid rgba(245,158,11,0.2)',
          boxShadow: '0 10px 36px rgba(245,158,11,0.12)',
          animation: 'bounceIn 0.6s ease',
        }}>🔧</div>

        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', marginBottom: 8 }}>Let's Adjust Your Plan</h1>
        <p style={{ fontSize: 15, color: '#666', marginBottom: 6 }}>
          Current compliance: <strong style={{ color: '#EF4444', fontSize: 18 }}>{avgCompliance}%</strong>
        </p>
        <p style={{ fontSize: 14, color: '#F59E0B', fontWeight: 700, marginBottom: 28 }}>Small wins build habits! 🌱</p>

        {/* Current Progress */}
        <div style={{
          background: 'rgba(0,0,0,0.02)', borderRadius: 20, padding: '22px 24px',
          marginBottom: 20, textAlign: 'left', border: '1px solid rgba(0,0,0,0.04)',
        }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: '#111', marginBottom: 16 }}>📊 Current Progress</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {Object.entries(progress).map(([key, data]) => (
              <div key={key} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 14px', background: 'rgba(255,255,255,0.8)',
                borderRadius: 12, border: '1px solid rgba(0,0,0,0.03)',
              }}>
                <span style={{ fontSize: 13, color: '#666' }}>
                  {key === 'water' ? '💧' : key === 'meals' ? '🍽️' : '🏋️'} {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                <span style={{
                  fontSize: 13, fontWeight: 700,
                  color: data.percent >= 60 ? '#22C55E' : '#EF4444',
                }}>
                  {data.done}/{data.target} ({data.percent}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Suggestions */}
        <div style={{
          background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
          borderRadius: 20, padding: '22px 24px', marginBottom: 28,
          textAlign: 'left', border: '1px solid rgba(240,105,34,0.1)',
          boxShadow: '0 4px 20px rgba(240,105,34,0.05)',
        }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: '#9A3412', marginBottom: 16 }}>✨ Suggested Changes</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {suggestions.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: 'rgba(255,255,255,0.9)', borderRadius: 14, padding: '14px 16px',
                border: '1px solid rgba(0,0,0,0.04)',
                animation: `slideIn 0.4s ease ${i * 0.1}s both`,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: `${s.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, border: `1px solid ${s.color}20`,
                }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{s.label}</p>
                </div>
                <span style={{ fontSize: 12, color: 'var(--gray-400)', textDecoration: 'line-through' }}>{s.current}</span>
                <span style={{
                  fontSize: 14, fontWeight: 800, color: s.color,
                  background: `${s.color}10`, padding: '4px 10px', borderRadius: 8,
                }}>→ {s.suggested}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Success */}
        {accepted && (
          <div style={{
            background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
            borderRadius: 16, padding: '18px', marginBottom: 20,
            border: '1px solid rgba(34,197,94,0.2)',
            boxShadow: '0 4px 16px rgba(34,197,94,0.08)',
            animation: 'bounceIn 0.5s ease',
          }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#16A34A' }}>✅ Plan Updated! Redirecting...</p>
          </div>
        )}

        {/* Buttons */}
        {!accepted && (
          <div style={{ display: 'grid', gap: 12 }}>
            <button onClick={handleAccept} style={{
              width: '100%', border: 'none', borderRadius: 18, padding: '18px',
              fontSize: 16, fontWeight: 700, color: '#FFF', cursor: 'pointer',
              background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
              boxShadow: '0 12px 40px rgba(240,105,34,0.3)',
              position: 'relative', overflow: 'hidden',
            }}>
              <span style={{ position: 'relative', zIndex: 1 }}>✅ Accept Easier Plan</span>
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
            }}>Keep Current Plan</button>
          </div>
        )}
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
