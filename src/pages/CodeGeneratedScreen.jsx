import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CodeGeneratedScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const canvasRef = useRef(null);

  const accessCode = localStorage.getItem('accessCode') || '6241';
  const referralCode = localStorage.getItem('referralCode');
  const referralBonus = referralCode ? 5 : 0;

  // Theme State
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true; // default to dark
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const saved = localStorage.getItem("theme");
      setIsDark(saved ? saved === "dark" : true);
    };
    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  useEffect(() => { setTimeout(() => setShow(true), 120); }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(timer); navigate('/group-type'); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  // Confetti particles animation helper
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const confetti = Array.from({ length: 40 }, () => ({
      x: Math.random() * W, y: -10 - Math.random() * 200,
      w: 4 + Math.random() * 6, h: 8 + Math.random() * 8,
      dy: 0.8 + Math.random() * 1.5, dx: (Math.random() - 0.5) * 0.8,
      rot: Math.random() * 360, drot: (Math.random() - 0.5) * 4,
      color: ['#F06922', '#22C55E', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B'][Math.floor(Math.random() * 6)],
      opacity: 0.6 + Math.random() * 0.4,
    }));
    let id;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      confetti.forEach(c => {
        ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(c.rot * Math.PI / 180);
        ctx.globalAlpha = c.opacity; ctx.fillStyle = c.color;
        ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        ctx.restore();
        c.y += c.dy; c.x += c.dx; c.rot += c.drot;
        if (c.y > H + 20) { c.y = -10; c.x = Math.random() * W; }
      });
      ctx.globalAlpha = 1; id = requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="page-wrapper">
      <style>{`
        .page-wrapper {
          min-height: 100vh;
          width: 100%;
          background: ${isDark ? '#08090C' : '#EAECEF'};
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          box-sizing: border-box;
          position: relative;
          overflow-x: hidden;
        }
        
        .phone-container {
          width: 100%;
          max-width: 600px;
          color: ${isDark ? '#FFFFFF' : '#111827'};
          display: flex;
          flex-direction: column;
          gap: 24px;
          animation: fadeIn 0.4s ease-out;
          box-sizing: border-box;
          padding: 40px 24px;
          position: relative;
          z-index: 1;
        }

        /* Native Mobile Viewports */
        @media (max-width: 599px) {
          .phone-container {
            max-width: 100%;
            padding: 24px 20px 48px;
          }
          .page-wrapper {
            background: ${isDark ? '#0C0D11' : '#F4F5F8'};
            align-items: flex-start;
          }
        }

        /* Dust roaming effect styles */
        .dust {
          position: absolute;
          bottom: -20px;
          width: 4px;
          height: 4px;
          background: ${isDark ? 'rgba(255, 230, 200, 0.6)' : 'rgba(240, 105, 34, 0.5)'};
          border-radius: 50%;
          box-shadow: 0 0 8px ${isDark ? 'rgba(240, 105, 34, 0.8)' : 'rgba(240, 105, 34, 0.4)'};
          opacity: 0;
          pointer-events: none;
        }

        .dust:nth-child(odd) { animation: float-dust-1 12s linear infinite; }
        .dust:nth-child(even) { animation: float-dust-2 15s linear infinite; }

        .dust.d1 { left: 10%; animation-delay: 0s; animation-duration: 14s; }
        .dust.d2 { left: 25%; animation-delay: 3s; animation-duration: 18s; }
        .dust.d3 { left: 40%; animation-delay: 1s; animation-duration: 15s; }
        .dust.d4 { left: 55%; animation-delay: 5s; animation-duration: 20s; }
        .dust.d5 { left: 70%; animation-delay: 2s; animation-duration: 13s; }
        .dust.d6 { left: 85%; animation-delay: 6s; animation-duration: 17s; }
        .dust.d7 { left: 45%; animation-delay: 4s; animation-duration: 16s; }
        .dust.d8 { left: 90%; animation-delay: 8s; animation-duration: 22s; }

        @keyframes float-dust-1 {
          0% { transform: translate(0, 0) scale(0.4); opacity: 0; }
          15% { opacity: 0.7; }
          85% { opacity: 0.7; }
          100% { transform: translate(40px, -105vh) scale(1.2); opacity: 0; }
        }

        @keyframes float-dust-2 {
          0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
          15% { opacity: 0.6; }
          85% { opacity: 0.6; }
          100% { transform: translate(-40px, -105vh) scale(1.5); opacity: 0; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes popIn {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        @keyframes btnShimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}</style>

      {/* Confetti canvas overlay */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }} />

      {/* Floating Dust Wrapper Behind Content */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className={`dust d${i}`}></div>
        ))}
      </div>

      <div className="phone-container" style={{ opacity: show ? 1 : 0, transform: show ? 'scale(1)' : 'scale(0.95)', transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        
        {/* Custom Header */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
          {/* Back Button */}
          <button 
            onClick={() => navigate('/phone')} 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDark ? '#FFFFFF' : '#111827',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>

          {/* Logo Pill in Center */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#F06922',
            padding: '6px 16px',
            borderRadius: '24px',
            boxShadow: '0 4px 12px rgba(240, 105, 34, 0.25)',
          }}>
            <img 
              src="/relivlogo.jpeg" 
              alt="Reliv" 
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid rgba(255,255,255,0.4)',
              }}
            />
            <span style={{
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '14px',
              letterSpacing: '-0.3px',
            }}>
              Reliv
            </span>
          </div>

          {/* Help Button */}
          <button 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDark ? '#FFFFFF' : '#111827',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </button>
        </header>

        {/* Center Success Badge */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '8px',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            boxShadow: '0 8px 24px rgba(34,197,94,0.3)',
            animation: 'bounceIn 0.7s ease',
          }}>
            🎉
          </div>
        </div>

        {/* Intro Headings */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: isDark ? '#FFFFFF' : '#111827',
            margin: 0,
            letterSpacing: '-0.5px',
          }}>
            Account Created!
          </h1>
          <p style={{
            fontSize: '14px',
            color: isDark ? '#8A8F98' : '#4B5563',
            margin: '0 auto',
            maxWidth: '320px',
            lineHeight: '1.5',
          }}>
            Save this code — you'll need it to log back in
          </p>
        </div>

        {/* Form Container (Card) */}
        <div style={{
          width: '100%',
          background: isDark ? '#16181E' : '#FFFFFF',
          border: isDark ? '1px solid #23262F' : '1px solid #E5E7EB',
          borderRadius: '24px',
          padding: '32px 28px',
          boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.15)' : '0 10px 30px rgba(240, 105, 34, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          textAlign: 'center',
        }}>

          {/* Access Code Box */}
          <div style={{
            background: isDark ? '#12141A' : 'var(--cream-200)',
            borderRadius: '22px', 
            padding: '24px 20px',
            border: isDark ? '1px solid #2D313E' : '2px solid var(--cream-400)',
            boxShadow: isDark ? 'none' : 'var(--shadow-sm)',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <p style={{ 
              fontSize: '11px', 
              fontWeight: '800', 
              color: '#F06922', 
              textTransform: 'uppercase', 
              letterSpacing: '3px', 
              marginBottom: '16px' 
            }}>
              Your Access Code
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              {accessCode.split('').map((digit, i) => (
                <div 
                  key={i} 
                  style={{
                    flex: 1,
                    maxWidth: '56px',
                    aspectRatio: '56/68',
                    background: isDark ? '#1C1F26' : '#FFFFFF',
                    border: isDark ? '1px solid #2D313E' : '2px solid var(--gray-200)',
                    borderRadius: '14px',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '28px', 
                    fontWeight: '900', 
                    color: '#F06922',
                    fontFamily: "'Outfit', monospace",
                    boxShadow: isDark ? 'none' : 'var(--shadow-xs)',
                    animation: `popIn 0.4s ease ${i * 0.1}s both`,
                  }}
                >
                  {digit}
                </div>
              ))}
            </div>
          </div>

          {/* Referral Bonus Alert */}
          {referralBonus > 0 && (
            <div style={{
              background: isDark ? 'rgba(34, 197, 94, 0.05)' : 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
              borderRadius: '16px', 
              padding: '14px 20px',
              border: '1px solid rgba(34,197,94,0.2)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '10px',
              boxShadow: isDark ? 'none' : '0 4px 16px rgba(34,197,94,0.1)',
            }}>
              <span style={{ fontSize: '18px' }}>🎁</span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#16A34A' }}>
                ₹{referralBonus} Bonus Applied!
              </span>
            </div>
          )}

          {/* WhatsApp Sent Banner */}
          <div style={{
            background: isDark ? '#12141A' : 'var(--gray-50)', 
            borderRadius: '14px', 
            padding: '12px 20px',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '10px',
            border: isDark ? '1px solid #2D313E' : '1px solid var(--gray-200)',
          }}>
            <span style={{ fontSize: '16px' }}>📱</span>
            <span style={{ fontSize: '13px', color: isDark ? '#8A8F98' : 'var(--gray-600)' }}>
              Code sent to your WhatsApp
            </span>
          </div>

          {/* Continue Button */}
          <button 
            onClick={() => navigate('/group-type')} 
            style={{
              width: '100%', 
              border: 'none', 
              borderRadius: '16px', 
              padding: '16px 20px',
              fontSize: '15px', 
              fontWeight: '700', 
              color: '#FFF', 
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
              boxShadow: '0 4px 16px rgba(240,105,34,0.3)',
              position: 'relative', 
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E85C25';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>Continue →</span>
            <div style={{
              position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              animation: 'btnShimmer 2.5s infinite',
            }} />
          </button>

          {/* Countdown auto-continue */}
          <div style={{ display: 'flex', alignItems: 'center', justifycontent: 'center', gap: '8px', alignSelf: 'center' }}>
            <div style={{
              width: '32px', 
              height: '32px', 
              borderRadius: '50%',
              background: isDark ? '#1C1F26' : 'var(--cream-200)', 
              border: isDark ? '1px solid #2D313E' : '2px solid var(--cream-400)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '14px', 
              fontWeight: '800', 
              color: '#F06922',
            }}>
              {countdown}
            </div>
            <span style={{ fontSize: '13px', color: isDark ? '#8A8F98' : 'var(--gray-400)' }}>
              Auto-continuing...
            </span>
          </div>

        </div>

        {/* Bottom Security Footer */}
        <div style={{
          textAlign: 'center',
          fontSize: '12px',
          color: isDark ? '#5C606C' : '#9CA3AF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          marginTop: '8px',
        }}>
          <span>🔒</span>
          <span>Your data is encrypted and never shared</span>
        </div>

      </div>
    </div>
  );
}
