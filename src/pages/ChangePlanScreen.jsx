import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChangePlanScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const canvasRef = useRef(null);

  const currentPlan = localStorage.getItem('planType') || 'solo';

  const plans = [
    { id: 'solo', label: 'Solo', price: '₹29/week', desc: 'Personal plan with daily tracking', icon: '🧘', path: '/weekly-solo-pay', color: '#3B82F6', gradient: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)' },
    { id: 'couple', label: 'Couple', price: '₹54/week', desc: 'Track together with your partner', icon: '💑', path: '/couple-phone', color: '#EC4899', gradient: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)' },
    { id: 'friends', label: 'Friends', price: '₹49+/week', desc: 'Group wellness with friends', icon: '👥', path: '/friend-size', color: '#8B5CF6', gradient: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)' },
    { id: 'daily', label: 'Daily', price: '₹7-13/day', desc: 'Day-by-day with fan quiz', icon: '⚡', path: '/fan-quiz-type', color: '#F59E0B', gradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)' },
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
      color: ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B'][Math.floor(Math.random() * 4)],
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

  const handleSelect = (plan) => {
    setSelected(plan.id);
    localStorage.setItem('planType', plan.id);
    setTimeout(() => navigate(plan.path), 400);
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

      <div style={{ position: 'absolute', top: -100, left: -80, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />

      <div style={{
        maxWidth: 560, width: '100%', position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
        borderRadius: 32, padding: '48px 40px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.8)',
        textAlign: 'center',
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Icon */}
        <div style={{
          width: 84, height: 84,
          background: 'linear-gradient(135deg, #EEF2FF 0%, #C7D2FE 100%)',
          borderRadius: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', fontSize: 42,
          border: '2px solid rgba(129,140,248,0.2)',
          boxShadow: '0 10px 36px rgba(99,102,241,0.12)',
          animation: 'bounceIn 0.6s ease',
        }}>🔀</div>

        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', marginBottom: 8 }}>Choose New Plan</h1>
        <p style={{ fontSize: 15, color: '#666', marginBottom: 28 }}>
          Current: <strong style={{ color: '#F06922' }}>{currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}</strong>
        </p>

        {/* Plans */}
        <div style={{ display: 'grid', gap: 14, marginBottom: 28 }}>
          {plans.map((plan, i) => (
            <button key={plan.id} onClick={() => handleSelect(plan)}
              disabled={plan.id === currentPlan}
              style={{
                width: '100%',
                background: selected === plan.id ? plan.gradient : plan.id === currentPlan ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.8)',
                border: selected === plan.id ? `2px solid ${plan.color}50` : plan.id === currentPlan ? '2px solid rgba(0,0,0,0.04)' : '2px solid rgba(0,0,0,0.05)',
                borderRadius: 20, padding: '20px 24px',
                cursor: plan.id === currentPlan ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left',
                transition: 'all 0.25s ease',
                opacity: plan.id === currentPlan ? 0.45 : 1,
                boxShadow: selected === plan.id ? `0 6px 24px ${plan.color}18` : '0 2px 8px rgba(0,0,0,0.02)',
                animation: `slideIn 0.4s ease ${i * 0.08}s both`,
              }}>
              <div style={{
                width: 52, height: 52,
                background: `${plan.color}12`, borderRadius: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, border: `1px solid ${plan.color}20`,
              }}>{plan.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#111' }}>
                  {plan.label} {plan.id === currentPlan ? '(Current)' : ''}
                </p>
                <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>{plan.desc}</p>
              </div>
              <span style={{
                fontSize: 14, fontWeight: 800, color: plan.color,
                background: `${plan.color}10`, padding: '6px 12px', borderRadius: 10,
                border: `1px solid ${plan.color}15`,
              }}>{plan.price}</span>
            </button>
          ))}
        </div>

        <button onClick={() => navigate(-1)} style={{
          width: '100%', background: 'rgba(0,0,0,0.02)',
          border: '1px solid rgba(0,0,0,0.06)', borderRadius: 16, padding: '16px',
          fontSize: 15, fontWeight: 600, color: '#666', cursor: 'pointer',
        }}>← Back</button>
      </div>

      <style>{`
        @keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
        @keyframes bounceIn { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes slideIn { 0% { opacity: 0; transform: translateY(12px); } 100% { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
