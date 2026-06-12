import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { C, api } from "../utils/constants";

const relivAvatar = "/avatar-removebg-preview.png";

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    topUsers: [],
    todayUsers: 47,
    successStories: 12847,
  });
  const [show, setShow] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);
  // Inactivity attract screen state
  const [inactive, setInactive] = useState(false);
  const [shoutouts, setShoutouts] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const timerRef = useRef();
  const cycleRef = useRef();

  // Load shoutouts from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("userShoutouts") || "[]");
      const defaultShoutouts = [
        { name: "Priya Sharma", message: "My birthday shoutout was amazing! 🎂", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=200&h=200&q=80", type: "Birthday" },
        { name: "Raj Mehta", message: "Got 50+ new followers from my IG card! 📸", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=200&h=200&q=80", type: "Instagram" },
        { name: "Sara Khan", message: "Promoted my new café here — best decision! ☕", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=200&h=200&q=80", type: "Product" },
      ];
      setShoutouts(saved.length > 0 ? [...saved, ...defaultShoutouts] : defaultShoutouts);
    } catch (e) {
      console.error("Error loading shoutouts:", e);
    }
  }, []);

  // Cycle through shoutouts every 4 seconds when inactive
  useEffect(() => {
    if (inactive && shoutouts.length > 1) {
      cycleRef.current = setInterval(() => {
        setCurrentIdx(prev => (prev + 1) % shoutouts.length);
      }, 4000);
    }
    return () => { if (cycleRef.current) clearInterval(cycleRef.current); };
  }, [inactive, shoutouts.length]);

  // Reset inactivity timer on any interaction
  const resetInactivity = () => {
    setInactive(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setInactive(true), 16000);
  };

  useEffect(() => {
    api.call("/stats/today").then(setStats).catch(() => { });
    setTimeout(() => setShow(true), 100);
    resetInactivity();
    const events = ["mousemove", "mousedown", "keydown", "touchstart"];
    const handler = resetInactivity;
    events.forEach(e => window.addEventListener(e, handler));
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(e => window.removeEventListener(e, handler));
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #FFFDFB 0%, #FFF8F3 25%, #FFF0E8 50%, #FFE8DB 100%)',
        fontFamily: "'Inter', 'Outfit', sans-serif",
        overflow: 'hidden',
        position: 'relative',
      }}
      onMouseMove={resetInactivity}
      onKeyDown={resetInactivity}
      onClick={resetInactivity}
      onTouchStart={resetInactivity}
    >
      {/* Attract/advertisement overlay after inactivity */}
      {inactive && shoutouts.length > 0 && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(255,255,255,0.97)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.4s',
          }}
          onClick={resetInactivity}
        >
          <div style={{
            background: 'linear-gradient(135deg,#F4610A,#FB923C)',
            borderRadius: 32,
            boxShadow: '0 24px 80px rgba(244,97,10,0.18)',
            padding: 48,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            maxWidth: 420,
            transition: 'all 0.4s ease',
          }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={shoutouts[currentIdx]?.image || "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=200&h=200&q=80"} 
                alt="Shoutout" 
                style={{ 
                  width: 120, height: 120, borderRadius: '50%', marginBottom: 16, 
                  border: '4px solid #fff', boxShadow: '0 4px 24px #F97316',
                  objectFit: 'cover', transition: 'opacity 0.3s',
                }} 
              />
              <span style={{
                position: 'absolute', bottom: 12, right: -8,
                background: '#fff', color: '#F4610A', fontWeight: 700,
                fontSize: 11, padding: '4px 10px', borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}>
                {shoutouts[currentIdx]?.type === "Birthday" && "🎂"}
                {shoutouts[currentIdx]?.type === "Instagram" && "📸"}
                {shoutouts[currentIdx]?.type === "Product" && "☕"}
                {shoutouts[currentIdx]?.type === "Star" && "⭐"}
                {shoutouts[currentIdx]?.type || "Shoutout"}
              </span>
            </div>
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 26, fontWeight: 900, color: '#fff', marginBottom: 6, textAlign: 'center' }}>
              {shoutouts[currentIdx]?.name || "Your Name Here"}
            </h2>
            <p style={{ color: '#FED7AA', fontSize: 16, fontWeight: 500, textAlign: 'center', marginBottom: 18, fontStyle: 'italic', maxWidth: 300 }}>
              "{shoutouts[currentIdx]?.message || "Your message here..."}"
            </p>
            <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
              {shoutouts.map((_, i) => (
                <div key={i} style={{
                  width: i === currentIdx ? 20 : 8, height: 8, borderRadius: 4,
                  background: i === currentIdx ? '#fff' : 'rgba(255,255,255,0.4)',
                  transition: 'all 0.3s',
                }} />
              ))}
            </div>
            <button
              onClick={() => { setInactive(false); navigate('/ProductShowcaseBoard'); }}
              style={{
                background: 'linear-gradient(135deg,#F97316,#F4610A)',
                color: '#fff', fontWeight: 700, fontSize: 18,
                padding: '18px 44px', borderRadius: 18, border: 'none',
                boxShadow: '0 8px 32px rgba(244,97,10,.18)', cursor: 'pointer', marginTop: 10,
              }}
            >
              🚀 See Public Board
            </button>
            <p style={{ color: '#fff', fontSize: 13, marginTop: 10, opacity: 0.8 }}>Tap anywhere to return</p>
          </div>
        </div>
      )}
      {/* Animated Mesh Gradient Background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {/* Soft Gradient Orbs */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(240, 105, 34, 0.08) 0%, rgba(255, 200, 150, 0.04) 40%, transparent 70%)',
          borderRadius: '50%',
          animation: 'floatOrb1 20s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-15%',
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(255, 180, 120, 0.06) 0%, rgba(240, 105, 34, 0.03) 40%, transparent 70%)',
          borderRadius: '50%',
          animation: 'floatOrb2 25s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(255, 220, 180, 0.1) 0%, transparent 60%)',
          borderRadius: '50%',
          animation: 'floatOrb3 18s ease-in-out infinite',
        }} />
        
        {/* Subtle Grid Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(240, 105, 34, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(240, 105, 34, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.5,
        }} />

        {/* Silk Wave Bottom */}
        <svg style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '40%',
          opacity: 0.4,
        }} viewBox="0 0 1440 400" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F06922" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#FF8C4B" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#F06922" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFB380" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#F06922" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#FFB380" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path fill="url(#waveGrad1)" style={{ animation: 'silkWave1 8s ease-in-out infinite' }}>
            <animate attributeName="d" dur="8s" repeatCount="indefinite" values="
              M0,200 C360,280 720,120 1080,200 S1440,280 1440,200 L1440,400 L0,400 Z;
              M0,200 C360,120 720,280 1080,200 S1440,120 1440,200 L1440,400 L0,400 Z;
              M0,200 C360,280 720,120 1080,200 S1440,280 1440,200 L1440,400 L0,400 Z
            " />
          </path>
          <path fill="url(#waveGrad2)" style={{ animation: 'silkWave2 10s ease-in-out infinite' }}>
            <animate attributeName="d" dur="10s" repeatCount="indefinite" values="
              M0,250 C360,180 720,320 1080,250 S1440,180 1440,250 L1440,400 L0,400 Z;
              M0,250 C360,320 720,180 1080,250 S1440,320 1440,250 L1440,400 L0,400 Z;
              M0,250 C360,180 720,320 1080,250 S1440,180 1440,250 L1440,400 L0,400 Z
            " />
          </path>
        </svg>
      </div>

      {/* Header - Clean & Minimal */}
      <header style={{
        position: 'relative',
        zIndex: 10,
        padding: '28px 60px',
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            <div style={{ position: 'relative' }}>
              {/* Logo Glow */}
              <div style={{
                position: 'absolute',
                inset: -6,
                background: 'linear-gradient(135deg, #F06922, #FF8C4B)',
                borderRadius: 20,
                opacity: 0.2,
                filter: 'blur(12px)',
                animation: 'logoGlow 3s ease-in-out infinite',
              }} />
              <img
                src="/relivlogo.jpeg"
                alt="Reliv AI"
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 16,
                  border: '2px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 8px 32px rgba(240, 105, 34, 0.2)',
                  position: 'relative',
                  zIndex: 1,
                }}
              />
            </div>
            <div>
              <h1 style={{
                fontSize: 34,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #1a1a1a 0%, #F06922 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-1px',
                margin: 0,
              }}>
                Reliv AI
              </h1>
              <p style={{
                fontSize: 11,
                color: '#888',
                margin: 0,
                letterSpacing: '2px',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}>
                Your AI Health Coach
              </p>
            </div>
          </div>
          
          {/* Login Button - Premium Glass */}
          <button
            onClick={() => navigate('/code')}
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(240, 105, 34, 0.15)',
              borderRadius: 14,
              padding: '14px 28px',
              fontSize: 14,
              fontWeight: 600,
              color: '#333',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 24px rgba(240, 105, 34, 0.08)',
              opacity: show ? 1 : 0,
              transform: show ? 'translateY(0)' : 'translateY(-20px)',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.95)';
              e.target.style.borderColor = 'rgba(240, 105, 34, 0.3)';
              e.target.style.boxShadow = '0 8px 40px rgba(240, 105, 34, 0.15)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.7)';
              e.target.style.borderColor = 'rgba(240, 105, 34, 0.15)';
              e.target.style.boxShadow = '0 4px 24px rgba(240, 105, 34, 0.08)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🔑 Login with Code
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: '40px 60px 80px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 100,
        alignItems: 'center',
        minHeight: 'calc(100vh - 150px)',
        position: 'relative',
        zIndex: 5,
      }}>
        {/* Left Content */}
        <div style={{
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          {/* Premium Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '14px 26px',
            borderRadius: 50,
            marginBottom: 36,
            border: '1px solid rgba(240, 105, 34, 0.12)',
            boxShadow: '0 8px 40px rgba(240, 105, 34, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Shimmer Effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
              animation: 'shimmerSweep 3s ease-in-out infinite',
            }} />
            <span style={{ fontSize: 20 }}>🏥</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#333' }}>
              AI-Powered Personal Health
            </span>
            <span style={{
              background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
              color: '#FFFFFF',
              fontSize: 10,
              fontWeight: 700,
              padding: '6px 14px',
              borderRadius: 20,
              boxShadow: '0 4px 16px rgba(34, 197, 94, 0.3)',
            }}>
              NEW
            </span>
          </div>

          {/* Main Heading */}
          <h1 style={{
            fontSize: 68,
            fontWeight: 800,
            color: '#1a1a1a',
            lineHeight: 1.05,
            letterSpacing: '-3px',
            marginBottom: 28,
          }}>
            Transform Your
            <br />
            Health with{' '}
            <span style={{
              position: 'relative',
              display: 'inline-block',
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #F06922 0%, #FF6B35 50%, #E85C25 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                AI
              </span>
              {/* Underline Glow */}
              <div style={{
                position: 'absolute',
                bottom: 2,
                left: 0,
                width: '100%',
                height: 6,
                background: 'linear-gradient(90deg, #F06922, #FF8C4B, #F06922)',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(240, 105, 34, 0.4)',
              }} />
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 20,
            color: '#666',
            lineHeight: 1.8,
            marginBottom: 44,
            maxWidth: 520,
            fontWeight: 400,
          }}>
            Personalized diet plans, workout routines, and daily WhatsApp reminders —
            all powered by AI for just{' '}
            <span style={{
              color: '#F06922',
              fontWeight: 800,
              position: 'relative',
            }}>
              ₹9/day
              <span style={{
                position: 'absolute',
                bottom: -2,
                left: 0,
                width: '100%',
                height: 2,
                background: '#F06922',
                borderRadius: 1,
              }} />
            </span>
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 56 }}>
            {/* Primary CTA */}
            <button
              onClick={() => navigate("/phone")}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
                border: 'none',
                borderRadius: 20,
                padding: '24px 48px',
                fontSize: 18,
                fontWeight: 700,
                color: '#FFFFFF',
                cursor: 'pointer',
                boxShadow: '0 16px 48px rgba(240, 105, 34, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 24px 64px rgba(240, 105, 34, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.1) inset';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(240, 105, 34, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1) inset';
              }}
            >
              {/* Wave Shine Effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent)',
                animation: 'waveShine 2.5s ease-in-out infinite',
              }} />
              <span style={{ position: 'relative', zIndex: 1 }}>Start Free Trial</span>
              <svg style={{ position: 'relative', zIndex: 1 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => navigate('/code')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '2px solid rgba(240, 105, 34, 0.15)',
                borderRadius: 20,
                padding: '22px 40px',
                fontSize: 16,
                fontWeight: 600,
                color: '#444',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#FFFFFF';
                e.target.style.borderColor = '#F06922';
                e.target.style.color = '#F06922';
                e.target.style.boxShadow = '0 12px 40px rgba(240, 105, 34, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                e.target.style.borderColor = 'rgba(240, 105, 34, 0.15)';
                e.target.style.color = '#444';
                e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.04)';
              }}
            >
              🔄 Returning User
            </button>

            {/* Public Board CTA */}
            <button
              onClick={() => navigate('/ProductShowcaseBoard')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)',
                border: '2px solid #F4610A',
                borderRadius: 20,
                padding: '18px 32px',
                fontSize: 15,
                fontWeight: 700,
                color: '#F4610A',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 24px rgba(244,97,10,0.10)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #F4610A, #FB923C)';
                e.target.style.color = '#fff';
                e.target.style.boxShadow = '0 12px 40px rgba(244,97,10,0.25)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)';
                e.target.style.color = '#F4610A';
                e.target.style.boxShadow = '0 6px 24px rgba(244,97,10,0.10)';
              }}
            >
              🎉 Public Shoutout Board
            </button>
          </div>

          {/* Trust Badges */}
          <div style={{
            display: 'flex',
            gap: 32,
            paddingTop: 32,
            borderTop: '1px solid rgba(240, 105, 34, 0.1)',
          }}>
            {[
              { icon: '🔒', text: 'Bank-Grade Security' },
              { icon: '✅', text: '50,000+ Users' },
              { icon: '⭐', text: '4.9/5 Rating' },
            ].map((badge, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(10px)',
                transition: `all 0.6s ease ${0.5 + i * 0.15}s`,
              }}>
                <span style={{ fontSize: 22 }}>{badge.icon}</span>
                <span style={{ fontSize: 14, color: '#666', fontWeight: 500 }}>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Premium Glass Card */}
        <div style={{
          position: 'relative',
          opacity: show ? 1 : 0,
          transform: show ? 'translateX(0)' : 'translateX(60px)',
          transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
        }}>
          {/* Main Premium Card */}
          <div style={{
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            borderRadius: 40,
            padding: 48,
            border: '1px solid rgba(255, 255, 255, 0.9)',
            boxShadow: `
              0 40px 100px rgba(240, 105, 34, 0.12),
              0 20px 60px rgba(0, 0, 0, 0.05),
              inset 0 1px 1px rgba(255, 255, 255, 1),
              inset 0 -1px 1px rgba(240, 105, 34, 0.05)
            `,
            overflow: 'hidden',
            zIndex: 2,
          }}>
            {/* Light Reflection Top */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, transparent 100%)',
              pointerEvents: 'none',
            }} />
            
            {/* Shimmer Sweep */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
              animation: 'shimmerSweep 4s ease-in-out infinite',
              pointerEvents: 'none',
            }} />

            {/* Avatar Section */}
            <div style={{
              textAlign: 'center',
              marginBottom: 36,
              position: 'relative',
              zIndex: 1,
            }}>
              <div
                style={{
                  position: 'relative',
                  display: 'inline-block',
                }}
                onMouseEnter={() => setAvatarHover(true)}
                onMouseLeave={() => setAvatarHover(false)}
              >
                {/* Avatar Glow Ring */}
                <div style={{
                  position: 'absolute',
                  inset: -14,
                  background: 'conic-gradient(from 0deg, #F06922, #FF8C4B, #FFB380, #FF8C4B, #F06922)',
                  borderRadius: '50%',
                  animation: 'rotateGlow 6s linear infinite',
                  opacity: 0.3,
                  filter: 'blur(16px)',
                }} />
                <div style={{
                  position: 'absolute',
                  inset: -4,
                  background: 'linear-gradient(135deg, #F06922, #FF8C4B)',
                  borderRadius: '50%',
                  padding: 3,
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: '#FFF',
                    borderRadius: '50%',
                  }} />
                </div>
                <img
                  src={relivAvatar}
                  alt="Reliv AI Assistant"
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '4px solid #FFFFFF',
                    boxShadow: '0 20px 50px rgba(240, 105, 34, 0.25)',
                    transform: avatarHover ? 'scale(1.06)' : 'scale(1)',
                    transition: 'transform 0.4s ease',
                    position: 'relative',
                    zIndex: 1,
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div style="width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, #F06922 0%, #FF8C4B 100%); display: flex; align-items: center; justify-content: center; font-size: 52px; box-shadow: 0 20px 50px rgba(240, 105, 34, 0.25);">🧑‍⚕️</div>';
                  }}
                />
              </div>

              {/* Speech Bubble */}
              <div style={{
                background: 'linear-gradient(135deg, #FFF9F5 0%, #FFF3EC 100%)',
                padding: '16px 28px',
                borderRadius: 28,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                marginTop: 24,
                border: '1px solid rgba(240, 105, 34, 0.1)',
                boxShadow: '0 8px 32px rgba(240, 105, 34, 0.08)',
              }}>
                <span style={{ fontSize: 24, animation: 'wave 2.5s ease-in-out infinite', display: 'inline-block' }}>👋</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#333' }}>
                  Hi! I'm your AI Health Coach
                </span>
              </div>
            </div>

            {/* Champions Leaderboard */}
            <div style={{ marginBottom: 32, position: 'relative', zIndex: 1 }}>
              <h3 style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#F06922',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}>
                <span>🏆</span> Today's Champions
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 14,
              }}>
                {[
                  { name: 'Rahul', streak: '23 days', medal: '🥇', bg: 'linear-gradient(135deg, #FFFBF0 0%, #FFF4DC 100%)', border: '#FFE4A8', glow: 'rgba(255, 200, 100, 0.4)' },
                  { name: 'Priya', streak: '19 days', medal: '🥈', bg: 'linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 100%)', border: '#E8E8E8', glow: 'rgba(200, 200, 200, 0.3)' },
                  { name: 'Amit', streak: '15 days', medal: '🥉', bg: 'linear-gradient(135deg, #FFF8F4 0%, #FFEDE4 100%)', border: '#FFDCC8', glow: 'rgba(255, 180, 140, 0.3)' },
                ].map((user, i) => (
                  <div
                    key={i}
                    style={{
                      background: user.bg,
                      border: `2px solid ${user.border}`,
                      borderRadius: 20,
                      padding: '20px 16px',
                      textAlign: 'center',
                      opacity: show ? 1 : 0,
                      transform: show ? 'scale(1)' : 'scale(0.8)',
                      transition: `all 0.6s ease ${0.6 + i * 0.1}s`,
                      boxShadow: i === 0 ? `0 8px 32px ${user.glow}` : '0 4px 16px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <div style={{ fontSize: 34, marginBottom: 8 }}>{user.medal}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>{user.name}</div>
                    <div style={{
                      fontSize: 12,
                      color: i === 0 ? '#F06922' : '#666',
                      fontWeight: 600,
                      marginTop: 4,
                    }}>
                      {user.streak} 🔥
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Row */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 48,
              paddingTop: 28,
              borderTop: '1px solid rgba(240, 105, 34, 0.1)',
              position: 'relative',
              zIndex: 1,
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 32,
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>{stats.todayUsers}</div>
                <div style={{ fontSize: 12, color: '#888', fontWeight: 500, marginTop: 4 }}>Users Today</div>
              </div>
              <div style={{ width: 1, background: 'rgba(240, 105, 34, 0.1)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 32,
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>{stats.successStories.toLocaleString()}+</div>
                <div style={{ fontSize: 12, color: '#888', fontWeight: 500, marginTop: 4 }}>Success Stories</div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div style={{
            position: 'absolute',
            top: -20,
            right: -30,
            background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
            color: '#FFFFFF',
            padding: '14px 24px',
            borderRadius: 18,
            fontSize: 14,
            fontWeight: 700,
            boxShadow: '0 12px 40px rgba(34, 197, 94, 0.35)',
            transform: show ? 'rotate(6deg) scale(1)' : 'rotate(6deg) scale(0)',
            transition: 'transform 0.6s ease 0.7s',
            zIndex: 3,
          }}>
            ✨ Free Trial Available!
          </div>

          <div style={{
            position: 'absolute',
            bottom: 50,
            left: -45,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            padding: '16px 24px',
            borderRadius: 18,
            fontSize: 14,
            fontWeight: 600,
            color: '#333',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            transform: show ? 'rotate(-4deg) scale(1)' : 'rotate(-4deg) scale(0)',
            transition: 'transform 0.6s ease 0.8s',
            zIndex: 3,
          }}>
            <span style={{ fontSize: 22 }}>💪</span>
            Lost 5kg in 2 weeks!
          </div>

          {/* Decorative Elements */}
          <div style={{
            position: 'absolute',
            top: '25%',
            right: -50,
            fontSize: 28,
            animation: 'float 3s ease-in-out infinite',
            opacity: show ? 0.8 : 0,
            transition: 'opacity 0.5s ease 1s',
          }}>✨</div>
          <div style={{
            position: 'absolute',
            bottom: '30%',
            left: -35,
            fontSize: 24,
            animation: 'float 4s ease-in-out infinite 1s',
            opacity: show ? 0.6 : 0,
            transition: 'opacity 0.5s ease 1.2s',
          }}>💫</div>
          <div style={{
            position: 'absolute',
            top: '60%',
            right: -40,
            fontSize: 20,
            animation: 'float 3.5s ease-in-out infinite 0.5s',
            opacity: show ? 0.5 : 0,
            transition: 'opacity 0.5s ease 1.4s',
          }}>🌟</div>
        </div>
      </main>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.05); }
          66% { transform: translate(30px, -40px) scale(0.95); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -30px) scale(1.08); }
          66% { transform: translate(-30px, 40px) scale(0.92); }
        }
        @keyframes floatOrb3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(40px, 30px); }
        }
        @keyframes logoGlow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.1); }
        }
        @keyframes shimmerSweep {
          0% { left: -100%; }
          50%, 100% { left: 100%; }
        }
        @keyframes waveShine {
          0% { left: -100%; }
          50%, 100% { left: 100%; }
        }
        @keyframes rotateGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes silkWave1 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(2%); }
        }
        @keyframes silkWave2 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-2%); }
        }
        
        /* Responsive */
        @media (max-width: 1024px) {
          main {
            grid-template-columns: 1fr !important;
            padding: 40px 24px !important;
            gap: 50px !important;
          }
        }
      `}</style>
    </div>
  );
}
