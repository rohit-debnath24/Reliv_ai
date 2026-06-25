
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BotPurchaseScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState('info');
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);



  useEffect(() => { setTimeout(() => setShow(true), 150); }, []);

  const included = [
    { icon: '🤖', text: 'ESP32-C3 Pet Bot Device' },
    { icon: '📟', text: '0.96" OLED Display (128×64)' },
    { icon: '🔔', text: 'Passive Buzzer (4 themes)' },
    { icon: '💡', text: 'RGB LED (NeoPixel)' },
    { icon: '👆', text: 'Touch Sensor' },
    { icon: '🔌', text: 'USB Cable (1m)' },
    { icon: '📦', text: '3D Printed Enclosure' },
    { icon: '📄', text: 'Quick Setup Guide' },
  ];

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let code = '';
      for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
      localStorage.setItem('botPairingCode', code);
      localStorage.setItem('botPurchased', 'true');
      setStep('success');
      setTimeout(() => navigate('/bot-pairing'), 1500);
    }, 2500);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0F0F12 0%, #1A1A2E 40%, #16213E 100%)',
        fontFamily: "'Inter', 'Outfit', sans-serif", position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(240,105,34,0.12) 0%, transparent 70%)', borderRadius: '50%', animation: 'floatO1 20s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)', borderRadius: '50%', animation: 'floatO2 25s ease-in-out infinite' }} />
      </div>

      <button onClick={() => navigate('/bot-offer')} style={{
        position: 'fixed', top: 24, left: 24, zIndex: 50,
        background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '12px 20px',
        color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
      }}>← Back</button>



      <div style={{
        position: 'relative', zIndex: 10, maxWidth: 580, margin: '0 auto', padding: '80px 24px 40px',
        display: 'flex', flexDirection: 'column', gap: 24,
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(25px)',
        transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {step === 'info' && (<>
          <div style={{
            background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
            borderRadius: 28, padding: '32px', border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
            display: 'flex', gap: 24, alignItems: 'center',
          }}>
            <div style={{
              width: 100, height: 100, background: 'linear-gradient(135deg, #F06922 0%, #FF6B35 100%)',
              borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 50, flexShrink: 0,
              boxShadow: '0 16px 48px rgba(240,105,34,0.35)', animation: 'botFloat 4s ease-in-out infinite',
            }}>🤖</div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--white)', marginBottom: 6 }}>Reliv Pet Bot</h2>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>IoT Health Companion</p>
              <div style={{ fontSize: 36, fontWeight: 900 }}>
                <span style={{ background: 'linear-gradient(135deg, #F06922, #FF8A4C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>₹499</span>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)',
            borderRadius: 24, padding: '28px', border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20 }}>What's Included</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {included.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                  background: 'rgba(255,255,255,0.04)', borderRadius: 14,
                  border: '1px solid rgba(255,255,255,0.04)',
                }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)',
            borderRadius: 20, padding: '24px 28px', border: '1px solid rgba(255,255,255,0.06)',
          }}>
            {[
              { l: 'Reliv Pet Bot × 1', r: '₹499', c: 'rgba(255,255,255,0.8)' },
              { l: 'Delivery', r: 'Pickup at Kiosk', c: '#22C55E' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>{row.l}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: row.c }}>{row.r}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--white)' }}>Total</span>
              <span style={{ fontSize: 24, fontWeight: 900, background: 'linear-gradient(135deg, #F06922, #FF8A4C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>₹499</span>
            </div>
          </div>

          <button onClick={handlePay} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
            width: '100%', position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(135deg, #F06922 0%, #E85C25 50%, #D4521C 100%)',
            border: 'none', borderRadius: 20, padding: '22px', fontSize: 18, fontWeight: 800, color: '#FFF', cursor: 'pointer',
            boxShadow: hovered ? '0 20px 60px rgba(240,105,34,0.5)' : '0 12px 40px rgba(240,105,34,0.3)',
            transform: hovered ? 'translateY(-2px)' : 'translateY(0)', transition: 'all 0.3s',
          }}>
            <div style={{ position: 'absolute', top: 0, left: '-100%', width: '200%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', animation: 'btnShimmer 3s ease-in-out infinite' }} />
            <span style={{ position: 'relative', zIndex: 1 }}>💳 Pay ₹499</span>
          </button>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>🔒 Secured by Razorpay • 100% safe</p>
        </>)}

        {step === 'processing' && (
          <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(40px)', borderRadius: 32, padding: '80px 40px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: 72, marginBottom: 28, animation: 'botFloat 1.5s ease-in-out infinite' }}>💳</div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: 'var(--white)', marginBottom: 10 }}>Processing Payment...</h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)' }}>Please wait while we confirm</p>
            <div style={{ width: 200, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, margin: '28px auto 0', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #F06922, #FF8A4C)', borderRadius: 2, animation: 'loadSlide 1.5s ease-in-out infinite' }} />
            </div>
          </div>
        )}

        {step === 'success' && (
          <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(40px)', borderRadius: 32, padding: '80px 40px', textAlign: 'center', border: '1px solid rgba(34,197,94,0.15)', boxShadow: '0 0 80px rgba(34,197,94,0.1)' }}>
            <div style={{ fontSize: 80, marginBottom: 28, animation: 'bounceIn 0.5s ease' }}>✅</div>
            <h3 style={{ fontSize: 28, fontWeight: 800, color: '#22C55E', marginBottom: 10 }}>Payment Successful!</h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)' }}>Generating your pairing code...</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes floatO1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-30px,20px); } }
        @keyframes floatO2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-30px); } }
        @keyframes botFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes btnShimmer { 0% { transform: translateX(-50%); } 50%,100% { transform: translateX(50%); } }
        @keyframes loadSlide { 0% { transform: translateX(-100%); } 50% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        @keyframes bounceIn { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
      `}</style>
    </div>
  );
}
