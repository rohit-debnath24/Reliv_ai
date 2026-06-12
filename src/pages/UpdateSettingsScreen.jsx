import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateSettingsScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const canvasRef = useRef(null);

  const stored = JSON.parse(localStorage.getItem('mealTimes') || '{}');
  const [breakfast, setBreakfast] = useState(stored.breakfast || '08:00');
  const [lunch, setLunch] = useState(stored.lunch || '13:00');
  const [dinner, setDinner] = useState(stored.dinner || '20:00');
  const [workoutTime, setWorkoutTime] = useState(localStorage.getItem('workoutTime') || '07:00');

  const [waterReminder, setWaterReminder] = useState(true);
  const [mealReminder, setMealReminder] = useState(true);
  const [workoutReminder, setWorkoutReminder] = useState(true);
  const [facewashReminder, setFacewashReminder] = useState(false);

  const hasBot = !!localStorage.getItem('botPairingCode');
  const category = localStorage.getItem('category') || '';

  useEffect(() => {
    if (category === 'acne') setFacewashReminder(true);
    setTimeout(() => setShow(true), 120);
  }, []);

  // Particles
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const dots = Array.from({ length: 18 }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: 2 + Math.random() * 3,
      dx: (Math.random() - 0.5) * 0.25, dy: (Math.random() - 0.5) * 0.25,
      opacity: 0.03 + Math.random() * 0.05,
      color: ['#F06922', '#3B82F6', '#22C55E'][Math.floor(Math.random() * 3)],
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

  const handleSave = () => {
    setSaving(true);
    localStorage.setItem('mealTimes', JSON.stringify({ breakfast, lunch, dinner }));
    localStorage.setItem('workoutTime', workoutTime);
    setTimeout(() => navigate('/return-active'), 1200);
  };

  const TimeInput = ({ label, icon, value, onChange, delay, color }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 18px', borderRadius: 16,
      background: `${color}06`, border: `1px solid ${color}12`,
      animation: `slideIn 0.4s ease ${delay}s both`,
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 14,
        background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, border: `1px solid ${color}20`,
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{label}</p>
      </div>
      <input type="time" value={value} onChange={e => onChange(e.target.value)} style={{
        border: `1px solid ${color}20`, borderRadius: 12, padding: '8px 12px',
        fontSize: 14, fontWeight: 600, color: '#333', background: 'rgba(255,255,255,0.8)',
        outline: 'none', cursor: 'pointer',
      }} />
    </div>
  );

  const Toggle = ({ label, icon, checked, onChange, delay, color }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 18px', borderRadius: 16,
      background: checked ? `${color}06` : 'rgba(0,0,0,0.015)',
      border: `1px solid ${checked ? `${color}15` : 'rgba(0,0,0,0.04)'}`,
      animation: `slideIn 0.4s ease ${delay}s both`,
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 14,
        background: checked ? `${color}12` : 'rgba(0,0,0,0.04)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, transition: 'all 0.3s ease',
      }}>{icon}</div>
      <p style={{ flex: 1, fontSize: 13, fontWeight: 700, color: '#111' }}>{label}</p>
      <div onClick={() => onChange(!checked)} style={{
        width: 52, height: 28, borderRadius: 14, position: 'relative', cursor: 'pointer',
        background: checked ? `linear-gradient(135deg, ${color}, ${color}CC)` : '#DDD',
        transition: 'all 0.3s ease',
        boxShadow: checked ? `0 4px 12px ${color}30` : 'none',
      }}>
        <div style={{
          position: 'absolute', top: 3, left: checked ? 27 : 3,
          width: 22, height: 22, borderRadius: '50%', background: '#FFF',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
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

      <div style={{ position: 'absolute', top: -80, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,105,34,0.06) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)', animation: 'floatOrb2 7s ease-in-out infinite', pointerEvents: 'none' }} />

      <div style={{
        maxWidth: 560, width: '100%', position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
        borderRadius: 32, padding: '44px 36px',
        boxShadow: '0 24px 80px rgba(240,105,34,0.08), 0 0 0 1px rgba(255,255,255,0.8)',
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <button onClick={() => navigate(-1)} style={{
            width: 40, height: 40, borderRadius: 14, border: '1px solid rgba(0,0,0,0.06)',
            background: 'rgba(0,0,0,0.02)', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>←</button>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111' }}>Settings</h1>
            <p style={{ fontSize: 13, color: '#888' }}>Customize your reminders</p>
          </div>
          <div style={{
            marginLeft: 'auto', width: 48, height: 48, borderRadius: 16,
            background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
            border: '2px solid rgba(240,105,34,0.15)',
            animation: 'bounceIn 0.6s ease',
          }}>⚙️</div>
        </div>

        {/* Time Inputs */}
        <div style={{ marginBottom: 8 }}>
          <h3 style={{ fontSize: 12, fontWeight: 800, color: '#888', marginBottom: 14, letterSpacing: 1 }}>⏰ SCHEDULE</h3>
          <div style={{ display: 'grid', gap: 10 }}>
            <TimeInput label="Breakfast" icon="🌅" value={breakfast} onChange={setBreakfast} delay={0.1} color="#F59E0B" />
            <TimeInput label="Lunch" icon="☀️" value={lunch} onChange={setLunch} delay={0.15} color="#22C55E" />
            <TimeInput label="Dinner" icon="🌙" value={dinner} onChange={setDinner} delay={0.2} color="#8B5CF6" />
            <TimeInput label="Workout" icon="💪" value={workoutTime} onChange={setWorkoutTime} delay={0.25} color="#F06922" />
          </div>
        </div>

        {/* Reminder Toggles */}
        <div style={{ marginTop: 24, marginBottom: 8 }}>
          <h3 style={{ fontSize: 12, fontWeight: 800, color: '#888', marginBottom: 14, letterSpacing: 1 }}>🔔 REMINDERS</h3>
          <div style={{ display: 'grid', gap: 10 }}>
            <Toggle label="Water Reminders" icon="💧" checked={waterReminder} onChange={setWaterReminder} delay={0.3} color="#3B82F6" />
            <Toggle label="Meal Reminders" icon="🍽️" checked={mealReminder} onChange={setMealReminder} delay={0.35} color="#22C55E" />
            <Toggle label="Workout Reminders" icon="🏋️" checked={workoutReminder} onChange={setWorkoutReminder} delay={0.4} color="#F06922" />
            {(category === 'acne' || facewashReminder) && (
              <Toggle label="Facewash Reminders" icon="🧴" checked={facewashReminder} onChange={setFacewashReminder} delay={0.45} color="#EC4899" />
            )}
          </div>
        </div>

        {/* Bot Settings */}
        {hasBot && (
          <div style={{
            marginTop: 24, background: 'linear-gradient(135deg, rgba(139,92,246,0.04) 0%, rgba(139,92,246,0.08) 100%)',
            borderRadius: 18, padding: '16px 20px', border: '1px solid rgba(139,92,246,0.12)',
            display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
            animation: 'slideIn 0.4s ease 0.5s both',
          }} onClick={() => navigate('/bot-customize')}>
            <div style={{ fontSize: 26 }}>🤖</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>Bot Settings</p>
              <p style={{ fontSize: 12, color: '#8B5CF6' }}>Face, sounds & personality</p>
            </div>
            <span style={{ fontSize: 18, color: '#8B5CF6' }}>→</span>
          </div>
        )}

        {/* Save Button */}
        <button onClick={handleSave} disabled={saving} style={{
          width: '100%', marginTop: 28, border: 'none', borderRadius: 18, padding: '18px',
          fontSize: 16, fontWeight: 700, color: '#FFF', cursor: saving ? 'default' : 'pointer',
          background: saving
            ? 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)'
            : 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
          boxShadow: saving
            ? '0 12px 40px rgba(34,197,94,0.3)'
            : '0 12px 40px rgba(240,105,34,0.3)',
          position: 'relative', overflow: 'hidden',
          transition: 'all 0.5s ease',
        }}>
          <span style={{ position: 'relative', zIndex: 1 }}>
            {saving ? '✅ Saved! Redirecting...' : '💾 Save Settings'}
          </span>
          {!saving && <div style={{
            position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'btnShimmer 2.5s infinite',
          }} />}
        </button>
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
