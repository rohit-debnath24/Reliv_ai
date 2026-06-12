import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FormCheckScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);
  const canvasRef = useRef(null);

  const progress = {
    water: { done: 22, target: 28, percent: 79 },
    meals: { done: 18, target: 21, percent: 86 },
    workouts: { done: 3, target: 5, percent: 60 },
  };
  const avgCompliance = Math.round((progress.water.percent + progress.meals.percent + progress.workouts.percent) / 3);

  useEffect(() => { setTimeout(() => setShow(true), 120); setTimeout(() => setAnimate(true), 500); }, []);

  // Particles
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const dots = Array.from({ length: 18 }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: 2 + Math.random() * 3,
      dx: (Math.random() - 0.5) * 0.3, dy: (Math.random() - 0.5) * 0.3,
      opacity: 0.05 + Math.random() * 0.07,
      color: ['#F06922', '#22C55E', '#3B82F6'][Math.floor(Math.random() * 3)],
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

  const AnimatedBar = ({ percent, color, delay = 0 }) => (
    <div style={{ width: '100%', height: 10, background: 'rgba(0,0,0,0.04)', borderRadius: 5, overflow: 'hidden' }}>
      <div style={{
        width: animate ? `${percent}%` : '0%', height: '100%',
        background: `linear-gradient(90deg, ${color}, ${color}CC)`,
        borderRadius: 5, transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          animation: 'barShimmer 2s infinite 1.5s',
        }} />
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFFAF7 0%, #FFF5F0 50%, #FFEEDD 100%)',
      fontFamily: "'Inter', 'Outfit', sans-serif",
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 40, position: 'relative', overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', top: -100, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,105,34,0.06) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />

      <div style={{
        maxWidth: 560, width: '100%', position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
        borderRadius: 32, padding: '48px 40px',
        boxShadow: '0 24px 80px rgba(240,105,34,0.08), 0 0 0 1px rgba(255,255,255,0.8)',
        textAlign: 'center',
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Icon */}
        <div style={{
          width: 84, height: 84,
          background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
          borderRadius: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', fontSize: 42,
          border: '2px solid rgba(240,105,34,0.15)',
          boxShadow: '0 10px 36px rgba(240,105,34,0.12)',
          animation: 'bounceIn 0.6s ease',
        }}>💪</div>

        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', marginBottom: 8 }}>Good Start! Keep Pushing!</h1>
        <p style={{ fontSize: 15, color: '#666', marginBottom: 6 }}>
          Average compliance: <strong style={{ color: '#F06922', fontSize: 18 }}>{avgCompliance}%</strong>
        </p>
        <p style={{ fontSize: 14, color: '#22C55E', fontWeight: 700, marginBottom: 28 }}>You're SO close to 80%! 🔥</p>

        {/* What's Working */}
        <div style={{
          background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
          borderRadius: 20, padding: '22px 24px', marginBottom: 16, textAlign: 'left',
          border: '1px solid rgba(34,197,94,0.15)', boxShadow: '0 4px 20px rgba(34,197,94,0.06)',
        }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: '#065F46', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
            ✅ What's Working
          </h3>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#065F46' }}>🍽️ Meals — {progress.meals.percent}%</span>
                <span style={{ fontSize: 12, color: '#047857', fontWeight: 600 }}>{progress.meals.done}/{progress.meals.target}</span>
              </div>
              <AnimatedBar percent={progress.meals.percent} color="#22C55E" delay={0.1} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#065F46' }}>💧 Water — {progress.water.percent}%</span>
                <span style={{ fontSize: 12, color: '#047857', fontWeight: 600 }}>{progress.water.done}/{progress.water.target}</span>
              </div>
              <AnimatedBar percent={progress.water.percent} color="#22C55E" delay={0.2} />
            </div>
          </div>
        </div>

        {/* What Needs Work */}
        <div style={{
          background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
          borderRadius: 20, padding: '22px 24px', marginBottom: 32, textAlign: 'left',
          border: '1px solid rgba(240,105,34,0.12)', boxShadow: '0 4px 20px rgba(240,105,34,0.06)',
        }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: '#9A3412', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
            ⚠️ What Needs Work
          </h3>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#9A3412' }}>🏋️ Workouts — {progress.workouts.percent}%</span>
              <span style={{ fontSize: 12, color: '#B45309', fontWeight: 600 }}>{progress.workouts.done}/{progress.workouts.target}</span>
            </div>
            <AnimatedBar percent={progress.workouts.percent} color="#F06922" delay={0.3} />
            <p style={{ fontSize: 12, color: '#B45309', marginTop: 10, lineHeight: 1.5 }}>
              Missing {progress.workouts.target - progress.workouts.done} workouts this week. Just {Math.ceil((0.8 * (progress.water.target + progress.meals.target + progress.workouts.target) - progress.water.done - progress.meals.done - progress.workouts.done))} more actions = 80%!
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'grid', gap: 12 }}>
          <button onClick={() => navigate('/todays-plan')} style={{
            width: '100%', border: 'none', borderRadius: 18, padding: '18px',
            fontSize: 16, fontWeight: 700, color: '#FFF', cursor: 'pointer',
            background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
            boxShadow: '0 12px 40px rgba(240,105,34,0.3)',
            position: 'relative', overflow: 'hidden',
          }}>
            <span style={{ position: 'relative', zIndex: 1 }}>💪 I'll Push Harder</span>
            <div style={{
              position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              animation: 'btnShimmer 2.5s infinite',
            }} />
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <button onClick={() => navigate('/make-easier')} style={{
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,0,0,0.06)', borderRadius: 16, padding: '14px',
              fontSize: 14, fontWeight: 600, color: '#666', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}>🔧 Make Easier</button>
            <button onClick={() => navigate('/todays-plan')} style={{
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,0,0,0.06)', borderRadius: 16, padding: '14px',
              fontSize: 14, fontWeight: 600, color: '#666', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}>📋 Today's Plan</button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
        @keyframes bounceIn { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes btnShimmer { 0% { left: -100%; } 100% { left: 200%; } }
        @keyframes barShimmer { 0% { left: -100%; } 100% { left: 200%; } }
      `}</style>
    </div>
  );
}
