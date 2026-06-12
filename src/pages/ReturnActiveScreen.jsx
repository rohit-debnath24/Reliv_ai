import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReturnActiveScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);
  const canvasRef = useRef(null);

  const accessCode = localStorage.getItem('accessCode') || '6241';
  const daysLeft = 5;
  const hasBot = !!localStorage.getItem('botPairingCode');

  const progress = {
    water: { done: 22, target: 28 },
    meals: { done: 18, target: 21 },
    workouts: { done: 3, target: 5 },
  };
  const waterPct = Math.round((progress.water.done / progress.water.target) * 100);
  const mealsPct = Math.round((progress.meals.done / progress.meals.target) * 100);
  const workoutsPct = Math.round((progress.workouts.done / progress.workouts.target) * 100);
  const avgCompliance = Math.round((waterPct + mealsPct + workoutsPct) / 3);

  useEffect(() => { setTimeout(() => setShow(true), 120); setTimeout(() => setAnimate(true), 500); }, []);

  // Particles
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const dots = Array.from({ length: 22 }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: 2 + Math.random() * 3,
      dx: (Math.random() - 0.5) * 0.3, dy: (Math.random() - 0.5) * 0.3,
      opacity: 0.05 + Math.random() * 0.07,
      color: ['#22C55E', '#3B82F6', '#F06922'][Math.floor(Math.random() * 3)],
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

  const handleContinue = () => {
    if (avgCompliance >= 80) navigate('/todays-plan');
    else if (avgCompliance >= 60) navigate('/form-check');
    else if (avgCompliance > 0) navigate('/make-easier');
    else navigate('/why-tracking');
  };

  const AnimatedBar = ({ percent, color, delay = 0 }) => (
    <div style={{ width: '100%', height: 10, background: 'rgba(0,0,0,0.04)', borderRadius: 5, overflow: 'hidden' }}>
      <div style={{
        width: animate ? `${Math.min(percent, 100)}%` : '0%', height: '100%',
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

      <div style={{ position: 'absolute', top: -100, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', animation: 'floatOrb2 10s ease-in-out infinite', pointerEvents: 'none' }} />

      <div style={{
        maxWidth: 560, width: '100%', position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
        borderRadius: 32, padding: '48px 40px',
        boxShadow: '0 24px 80px rgba(34,197,94,0.1), 0 0 0 1px rgba(255,255,255,0.8)',
        textAlign: 'center',
        opacity: show ? 1 : 0, transform: show ? 'scale(1)' : 'scale(0.95)',
        transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Hero */}
        <div style={{
          width: 100, height: 100,
          background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
          borderRadius: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', fontSize: 50,
          boxShadow: '0 16px 50px rgba(34,197,94,0.35)',
          animation: 'bounceIn 0.7s ease',
        }}>✅</div>

        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', marginBottom: 8 }}>Welcome Back! 🎉</h1>
        <p style={{ fontSize: 15, color: '#666', marginBottom: 24, lineHeight: 1.6 }}>Your plan is still active. Keep going!</p>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{
            background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
            borderRadius: 20, padding: '22px', textAlign: 'center',
            border: '1px solid rgba(34,197,94,0.15)',
            boxShadow: '0 6px 24px rgba(34,197,94,0.08)',
          }}>
            <p style={{ fontSize: 38, fontWeight: 800, color: '#22C55E', marginBottom: 4 }}>{daysLeft}</p>
            <p style={{ fontSize: 12, color: '#065F46', fontWeight: 700 }}>Days Left</p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
            borderRadius: 20, padding: '22px', textAlign: 'center',
            border: '1px solid rgba(240,105,34,0.12)',
            boxShadow: '0 6px 24px rgba(240,105,34,0.06)',
          }}>
            <p style={{ fontSize: 38, fontWeight: 800, color: '#F06922', marginBottom: 4 }}>🔥 7</p>
            <p style={{ fontSize: 12, color: '#9A3412', fontWeight: 700 }}>Day Streak</p>
          </div>
        </div>

        {/* Progress Bars */}
        <div style={{
          background: 'rgba(0,0,0,0.02)', borderRadius: 22, padding: '22px 24px',
          marginBottom: 20, textAlign: 'left', border: '1px solid rgba(0,0,0,0.04)',
        }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: '#111', marginBottom: 16 }}>📊 This Week's Progress</h3>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { label: '💧 Water', pct: waterPct, data: progress.water, color: '#3B82F6', delay: 0.1 },
              { label: '🍽️ Meals', pct: mealsPct, data: progress.meals, color: '#22C55E', delay: 0.2 },
              { label: '🏋️ Workouts', pct: workoutsPct, data: progress.workouts, color: '#F06922', delay: 0.3 },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: '#666' }}>{item.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: item.color }}>{item.data.done}/{item.data.target} ({item.pct}%)</span>
                </div>
                <AnimatedBar percent={item.pct} color={item.color} delay={item.delay} />
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 16, padding: '12px 16px',
            background: 'rgba(255,255,255,0.8)', borderRadius: 12,
            textAlign: 'center', border: '1px solid rgba(0,0,0,0.04)',
          }}>
            <span style={{ fontSize: 13, color: '#666' }}>Average: </span>
            <span style={{
              fontSize: 16, fontWeight: 800,
              color: avgCompliance >= 80 ? '#22C55E' : avgCompliance >= 60 ? '#F59E0B' : '#EF4444',
            }}>{avgCompliance}%</span>
          </div>
        </div>

        {/* Bot Status */}
        {hasBot && (
          <div style={{
            background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
            borderRadius: 16, padding: '14px 20px', marginBottom: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            border: '1px solid rgba(129,140,248,0.2)', boxShadow: '0 4px 16px rgba(99,102,241,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>🤖</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#4F46E5' }}>Bot: Online 🟢</span>
            </div>
            <button onClick={() => navigate('/bot-status')} style={{
              background: 'rgba(79,70,229,0.1)', border: '1px solid rgba(79,70,229,0.2)',
              borderRadius: 10, padding: '6px 14px', fontSize: 12, fontWeight: 700,
              color: '#4F46E5', cursor: 'pointer',
            }}>View →</button>
          </div>
        )}

        {/* Access Code */}
        <div style={{
          background: 'rgba(0,0,0,0.02)', borderRadius: 14, padding: '14px 24px',
          marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          border: '1px solid rgba(0,0,0,0.04)',
        }}>
          <span style={{ fontSize: 13, color: '#666' }}>Your Code</span>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#F06922', letterSpacing: 2 }}>{accessCode}</span>
        </div>

        {/* Buttons */}
        <div style={{ display: 'grid', gap: 14 }}>
          <button onClick={handleContinue} style={{
            width: '100%', border: 'none', borderRadius: 18, padding: '20px',
            fontSize: 17, fontWeight: 700, color: '#FFF', cursor: 'pointer',
            background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
            boxShadow: '0 12px 40px rgba(240,105,34,0.35)',
            position: 'relative', overflow: 'hidden',
          }}>
            <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>📋 View Today's Plan</span>
            <div style={{
              position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              animation: 'btnShimmer 2.5s infinite',
            }} />
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <button onClick={() => navigate('/update-settings')} style={{
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,0,0,0.06)', borderRadius: 16, padding: '14px',
              fontSize: 14, fontWeight: 600, color: '#666', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}>⚙️ Settings</button>
            <button onClick={() => navigate('/')} style={{
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,0,0,0.06)', borderRadius: 16, padding: '14px',
              fontSize: 14, fontWeight: 600, color: '#666', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}>🏠 Home</button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
        @keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px,-20px); } }
        @keyframes bounceIn { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes btnShimmer { 0% { left: -100%; } 100% { left: 200%; } }
        @keyframes barShimmer { 0% { left: -100%; } 100% { left: 200%; } }
      `}</style>
    </div>
  );
}
