import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RenewPlanScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [useSameSettings, setUseSameSettings] = useState(true);
  const canvasRef = useRef(null);

  const planType = localStorage.getItem('planType') || 'solo';
  const category = localStorage.getItem('category') || 'fitness';
  const mealTimes = JSON.parse(localStorage.getItem('mealTimes') || '{"breakfast":"08:00","lunch":"13:00","dinner":"20:00"}');

  const planPrices = { solo: 29, couple: 54, friends: 49, daily: 7 };
  const price = planPrices[planType] || 29;

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

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => navigate('/todays-plan'), 2000);
    }, 2500);
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

      <div style={{ position: 'absolute', top: -100, left: -80, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,105,34,0.06) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />

      <div style={{
        maxWidth: 560, width: '100%', position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
        borderRadius: 32, padding: '48px 40px',
        boxShadow: '0 24px 80px rgba(240,105,34,0.08), 0 0 0 1px rgba(255,255,255,0.8)',
        textAlign: 'center',
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {success ? (
          <>
            <div style={{
              width: 88, height: 88,
              background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
              borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px', fontSize: 44,
              boxShadow: '0 16px 50px rgba(34,197,94,0.35)',
              animation: 'bounceIn 0.6s ease',
            }}>🎉</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', marginBottom: 8 }}>Plan Renewed!</h1>
            <p style={{ fontSize: 15, color: '#22C55E', fontWeight: 700, marginBottom: 12 }}>Your bot is celebrating! 🤖🎊</p>
            <p style={{ fontSize: 14, color: '#666' }}>Redirecting to your plan...</p>
          </>
        ) : (
          <>
            {/* Icon */}
            <div style={{
              width: 84, height: 84,
              background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
              borderRadius: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px', fontSize: 42,
              border: '2px solid rgba(240,105,34,0.15)',
              boxShadow: '0 10px 36px rgba(240,105,34,0.1)',
              animation: 'bounceIn 0.6s ease',
            }}>🔄</div>

            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', marginBottom: 8 }}>
              Renew {planType.charAt(0).toUpperCase() + planType.slice(1)} Weekly
            </h1>
            <div style={{
              display: 'inline-flex', alignItems: 'baseline', gap: 4,
              marginBottom: 28,
            }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: '#F06922' }}>₹{price}</span>
              <span style={{ fontSize: 14, color: 'var(--gray-400)' }}>for 7 days</span>
            </div>

            {/* Previous Settings */}
            <div style={{
              background: 'rgba(0,0,0,0.02)', borderRadius: 20, padding: '22px 24px',
              marginBottom: 20, textAlign: 'left', border: '1px solid rgba(0,0,0,0.04)',
            }}>
              <h3 style={{ fontSize: 13, fontWeight: 800, color: '#111', marginBottom: 16 }}>📋 Previous Settings</h3>
              <div style={{ display: 'grid', gap: 10 }}>
                {[
                  { label: 'Category', value: category.charAt(0).toUpperCase() + category.slice(1) },
                  { label: 'Breakfast', value: mealTimes.breakfast },
                  { label: 'Lunch', value: mealTimes.lunch },
                  { label: 'Dinner', value: mealTimes.dinner },
                  ...(category === 'acne' ? [{ label: 'Facewash', value: '7:00 AM, 9:00 PM' }] : []),
                ].map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 14px', background: 'rgba(255,255,255,0.8)', borderRadius: 10,
                    border: '1px solid rgba(0,0,0,0.03)',
                  }}>
                    <span style={{ fontSize: 13, color: '#666' }}>{s.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Toggle */}
            <div style={{ display: 'grid', gap: 10, marginBottom: 28 }}>
              {[
                { label: 'Use same settings ✅', value: true },
                { label: 'Change settings', value: false },
              ].map((opt) => (
                <button key={String(opt.value)} onClick={() => {
                  setUseSameSettings(opt.value);
                  if (!opt.value) navigate('/update-settings');
                }} style={{
                  width: '100%', textAlign: 'left',
                  background: useSameSettings === opt.value ? 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)' : 'rgba(0,0,0,0.02)',
                  border: useSameSettings === opt.value ? '2px solid rgba(240,105,34,0.3)' : '2px solid transparent',
                  borderRadius: 16, padding: '16px 20px',
                  fontSize: 14, fontWeight: 600,
                  color: useSameSettings === opt.value ? '#F06922' : '#666',
                  cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: useSameSettings === opt.value ? '0 4px 16px rgba(240,105,34,0.08)' : 'none',
                }}>
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Pay */}
            <button onClick={handlePay} disabled={processing} style={{
              width: '100%', border: 'none', borderRadius: 18, padding: '20px',
              fontSize: 17, fontWeight: 700, color: '#FFF',
              cursor: processing ? 'not-allowed' : 'pointer',
              background: processing ? '#D1D5DB' : 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
              boxShadow: processing ? 'none' : '0 12px 40px rgba(240,105,34,0.35)',
              position: 'relative', overflow: 'hidden', transition: 'all 0.3s',
            }}>
              <span style={{ position: 'relative', zIndex: 1 }}>{processing ? '⏳ Processing...' : `Pay ₹${price}`}</span>
              {!processing && <div style={{
                position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                animation: 'btnShimmer 2.5s infinite',
              }} />}
            </button>

            <button onClick={() => navigate(-1)} style={{
              width: '100%', background: 'transparent', border: 'none',
              padding: '14px', fontSize: 14, fontWeight: 600, color: 'var(--gray-400)',
              cursor: 'pointer', marginTop: 8,
            }}>← Back</button>
          </>
        )}
      </div>

      <style>{`
        @keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
        @keyframes bounceIn { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes btnShimmer { 0% { left: -100%; } 100% { left: 200%; } }
      `}</style>
    </div>
  );
}
