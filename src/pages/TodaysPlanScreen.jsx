import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TodaysPlanScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const canvasRef = useRef(null);

  const accessCode = localStorage.getItem('accessCode') || '6241';
  const category = localStorage.getItem('category') || 'fitness';

  const tasks = [
    { icon: '💧', label: 'Water', done: 0, target: 5, unit: 'glasses', nextTime: '11:00 AM', color: '#3B82F6', bg: '#EFF6FF' },
    { icon: '🍽️', label: 'Meals', done: 0, target: 3, unit: 'meals', nextTime: '1:00 PM', color: '#22C55E', bg: '#F0FDF4' },
    { icon: '🏋️', label: 'Workout', done: 0, target: 1, unit: 'session', nextTime: '6:00 PM', color: '#F06922', bg: '#FFF7ED' },
  ];
  if (category === 'acne') {
    tasks.push({ icon: '🧴', label: 'Facewash', done: 0, target: 2, unit: 'times', nextTime: '7:00 AM', color: '#8B5CF6', bg: '#F5F3FF' });
  }

  const nextReminder = tasks.reduce((earliest, t) => (!earliest ? t : t.nextTime < earliest.nextTime ? t : earliest), null);

  useEffect(() => { setTimeout(() => setShow(true), 120); }, []);

  // Floating particles
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: 2 + Math.random() * 3,
      dx: (Math.random() - 0.5) * 0.3, dy: (Math.random() - 0.5) * 0.3,
      opacity: 0.06 + Math.random() * 0.08,
      color: ['#22C55E', '#3B82F6', '#F06922'][Math.floor(Math.random() * 3)],
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFFAF7 0%, #FFF5F0 50%, #FFEEDD 100%)',
      fontFamily: "'Inter', 'Outfit', sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      {/* Decorative orbs */}
      <div style={{ position: 'absolute', top: -100, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,105,34,0.06) 0%, transparent 70%)', animation: 'floatOrb2 10s ease-in-out infinite', pointerEvents: 'none' }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 560, width: '100%', margin: '0 auto', padding: '48px 28px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28,
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Hero badge */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 88, height: 88,
            background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
            borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px', fontSize: 44,
            boxShadow: '0 16px 50px rgba(34,197,94,0.3)',
            animation: 'bounceIn 0.6s ease',
          }}>✅</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', marginBottom: 6 }}>Doing Great! 🔥</h1>
          <p style={{ fontSize: 15, color: '#666', lineHeight: 1.5 }}>Your compliance is above 80%. Keep it up!</p>
        </div>

        {/* Task cards */}
        <div style={{
          width: '100%',
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 24, padding: '28px 24px',
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.04)',
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: '#111', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>📋</span> Today's Tasks
          </h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {tasks.map((task, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: task.bg, borderRadius: 18, padding: '16px 20px',
                border: `1px solid ${task.color}15`,
                boxShadow: `0 4px 16px ${task.color}08`,
                animation: `slideIn 0.4s ease ${i * 0.08}s both`,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 16,
                  background: `${task.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0,
                }}>
                  {task.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>{task.label}</p>
                  <p style={{ fontSize: 12, color: '#9CA3AF' }}>{task.done}/{task.target} {task.unit} today</p>
                </div>
                <div style={{
                  background: task.done >= task.target ? '#ECFDF5' : `${task.color}12`,
                  borderRadius: 10, padding: '6px 12px',
                  fontSize: 12, fontWeight: 700,
                  color: task.done >= task.target ? '#16A34A' : task.color,
                  border: `1px solid ${task.done >= task.target ? '#22C55E' : task.color}20`,
                }}>
                  {task.done >= task.target ? '✓ Done' : `${task.done}/${task.target}`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Reminder */}
        {nextReminder && (
          <div style={{
            width: '100%',
            background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
            borderRadius: 18, padding: '18px 22px',
            display: 'flex', alignItems: 'center', gap: 14,
            border: '1px solid rgba(34,197,94,0.15)',
            boxShadow: '0 6px 24px rgba(34,197,94,0.1)',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20,
            }}>⏰</div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#065F46' }}>Next: {nextReminder.nextTime}</p>
              <p style={{ fontSize: 12, color: '#047857' }}>{nextReminder.icon} {nextReminder.label}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ width: '100%', display: 'grid', gap: 12 }}>
          <button onClick={() => navigate('/wa-preview')} style={{
            width: '100%', border: 'none', borderRadius: 18, padding: '18px',
            fontSize: 16, fontWeight: 700, color: '#FFF', cursor: 'pointer',
            background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
            boxShadow: '0 12px 40px rgba(34,197,94,0.3)',
            position: 'relative', overflow: 'hidden',
          }}>
            <span style={{ position: 'relative', zIndex: 1 }}>✅ Continue Current Plan</span>
            <div style={{
              position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              animation: 'btnShimmer 2.5s infinite',
            }} />
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <button onClick={() => navigate('/update-settings')} style={{
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,0,0,0.06)', borderRadius: 16, padding: '15px',
              fontSize: 14, fontWeight: 600, color: '#666', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            }}>⚙️ Settings</button>
            <button onClick={() => navigate('/bot-status')} style={{
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,0,0,0.06)', borderRadius: 16, padding: '15px',
              fontSize: 14, fontWeight: 600, color: '#666', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            }}>🤖 Bot Status</button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
        @keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px,-20px); } }
        @keyframes bounceIn { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes slideIn { 0% { opacity: 0; transform: translateX(-12px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes btnShimmer { 0% { left: -100%; } 100% { left: 200%; } }
      `}</style>
    </div>
  );
}
