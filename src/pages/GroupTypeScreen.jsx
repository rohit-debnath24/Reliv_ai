import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GroupTypeScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCards, setShowCards] = useState(false);

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

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new Event('themeChange'));
    if (newTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  const plans = [
    {
      id: "solo",
      title: "Solo",
      desc: "Personalized AI coaching just for you",
      price: "₹29",
      period: "/ week",
      dailyPrice: "₹4.14 / day",
      tag: null,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      features: ["Personal meal plans", "Daily reminders", "Progress tracking"],
      path: "/weekly-solo-pay",
    },
    {
      id: "partner",
      title: "Me + Partner",
      desc: "Transform together with your loved one",
      price: "₹54",
      period: "/ week",
      dailyPrice: "₹3.86 / day each",
      tag: "Most Popular",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      features: ["Both partners covered", "Individual reminders", "Couple challenges"],
      path: "/couple-phone",
    },
    {
      id: "friends",
      title: "Me + Friends",
      desc: "Compete & motivate your squad",
      price: "from ₹79",
      period: "/ week",
      dailyPrice: "₹2.26 / day (5 friends)",
      tag: "Best Value",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20v-2a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v2"></path>
          <circle cx="8" cy="9" r="4"></circle>
          <path d="M24 20v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 5.13a4 4 0 0 1 0 7.75"></path>
          <path d="M20 12v-2a4 4 0 0 0-4-4h-2"></path>
        </svg>
      ),
      features: ["2-5 friends", "Group leaderboard", "Squad competitions"],
      path: "/friend-size",
    },
    {
      id: "daily",
      title: "Just for today",
      desc: "Train like your favourite celebrity for 1 day",
      price: "₹7-15",
      period: "/ day",
      dailyPrice: "One-time only",
      tag: "Try First",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      ),
      features: ["Pick your idol", "Full day plan", "Zero commitment"],
      path: "/fan-quiz-type",
    },
  ];

  useEffect(() => {
    setTimeout(() => setShowCards(true), 100);
  }, []);

  const handleContinue = () => {
    if (!selected || loading) return;
    setLoading(true);
    localStorage.setItem("groupType", selected);
    setTimeout(() => {
      const plan = plans.find((p) => p.id === selected);
      if (plan) navigate(plan.path);
    }, 600);
  };

  return (
    <div className="page-wrapper">
      <style>{`
        .page-wrapper {
          min-height: 100vh;
          width: 100%;
          background: ${isDark ? '#030406' : '#EAECEF'}; /* Increased dark contrast background */
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
          max-width: 850px; /* Wider for 2x2 layout on desktop */
          color: ${isDark ? '#FFFFFF' : '#111827'};
          display: flex;
          flex-direction: column;
          gap: 28px;
          animation: fadeIn 0.4s ease-out;
          box-sizing: border-box;
          padding: 40px 24px;
          position: relative;
          z-index: 1;
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          width: 100%;
        }

        .plan-card {
          width: 100%;
          background: ${isDark ? '#16181E' : '#FFFFFF'};
          border-radius: 24px;
          padding: 24px;
          cursor: pointer;
          border: 1px solid ${isDark ? '#23262F' : '#E5E7EB'};
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-sizing: border-box;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .plan-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .plan-card.selected {
          border: 2px solid #F06922;
          box-shadow: ${isDark ? '0 8px 30px rgba(240, 105, 34, 0.18)' : '0 8px 30px rgba(240, 105, 34, 0.12)'};
        }

        .plan-card:hover {
          transform: translateY(-4px);
          border-color: #F06922;
          box-shadow: ${isDark ? '0 12px 30px rgba(0,0,0,0.4)' : '0 12px 30px rgba(0,0,0,0.08)'};
        }

        .plan-card.selected:hover {
          transform: translateY(-4px);
          box-shadow: ${isDark ? '0 12px 35px rgba(240, 105, 34, 0.25)' : '0 12px 35px rgba(240, 105, 34, 0.18)'};
        }

        .continue-btn {
          width: 100%;
          max-width: 450px;
          margin: 16px auto 0;
          border-radius: 16px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          font-weight: 700;
          font-size: 15px;
          outline: none;
          border: 1px solid transparent;
        }

        .continue-btn.disabled {
          background: ${isDark ? '#12141A' : '#F3F4F6'};
          border-color: ${isDark ? '#23262F' : '#E5E7EB'};
          color: ${isDark ? '#4E5361' : '#9CA3AF'};
          cursor: not-allowed;
        }

        .continue-btn.active {
          background: #F06922;
          border-color: #F06922;
          color: #FFFFFF;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(240, 105, 34, 0.25);
        }

        .continue-btn.active:hover {
          background: #E85C25;
          border-color: #E85C25;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(240, 105, 34, 0.35);
        }

        .continue-btn.active:active {
          transform: translateY(0);
        }

        @media (max-width: 850px) {
          .phone-container {
            max-width: 600px;
          }
        }

        /* Native Mobile Viewports */
        @media (max-width: 767px) {
          .plans-grid {
            grid-template-columns: 1fr;
          }
          .phone-container {
            max-width: 480px;
          }
        }

        @media (max-width: 599px) {
          .phone-container {
            max-width: 100%;
            padding: 24px 20px 48px;
          }
          .page-wrapper {
            background: ${isDark ? '#030406' : '#F4F5F8'};
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
      `}</style>

      {/* Floating Dust Wrapper Behind Content */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className={`dust d${i}`}></div>
        ))}
      </div>

      <div className="phone-container">
        
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

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
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
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
        </header>

        {/* Intro Headings */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: isDark ? '#FFFFFF' : '#111827',
            margin: 0,
            letterSpacing: '-0.5px',
          }}>
            Choose your plan
          </h1>
          <p style={{
            fontSize: '14px',
            color: isDark ? '#8A8F98' : '#4B5563',
            margin: '0 auto',
            maxWidth: '320px',
            lineHeight: '1.5',
          }}>
            Select how you want to start your health journey
          </p>
        </div>

        {/* Stack of Plan Cards */}
        <div className="plans-grid">
          {plans.map((p, index) => {
            const isSelected = selected === p.id;
            
            // Get Tag colors
            let tagBg = '#F06922'; // Default orange
            if (p.tag === 'Best Value') tagBg = '#22C55E';
            if (p.tag === 'Try First') tagBg = '#B45309';

            return (
              <div
                key={p.id}
                onClick={() => !loading && setSelected(p.id)}
                className={`plan-card ${showCards ? 'visible' : ''} ${isSelected ? 'selected' : ''}`}
                style={{
                  cursor: loading ? 'wait' : 'pointer',
                  transitionDelay: `${index * 0.06}s`,
                }}
              >
                {/* Tag Badge */}
                {p.tag && (
                  <div style={{
                    position: 'absolute',
                    top: -12,
                    right: 24,
                    background: tagBg,
                    color: '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}>
                    {p.tag}
                  </div>
                )}

                {/* Top Row: Icon, Title & Subtitle */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    background: isDark ? 'rgba(240, 105, 34, 0.12)' : 'rgba(240, 105, 34, 0.08)',
                    color: '#F06922',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {p.icon}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '800',
                      color: isDark ? '#FFFFFF' : '#111827',
                      margin: 0,
                    }}>
                      {p.title}
                    </h3>
                    <p style={{
                      fontSize: '13px',
                      color: isDark ? '#8A8F98' : '#6B7280',
                      margin: '2px 0 0',
                    }}>
                      {p.desc}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: isDark ? '#23262F' : '#E5E7EB', width: '100%' }} />

                {/* Pricing & breakdown */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{
                      fontSize: '28px',
                      fontWeight: '800',
                      color: isDark ? '#FFFFFF' : '#111827',
                    }}>
                      {p.price}
                    </span>
                    <span style={{
                      fontSize: '13px',
                      color: isDark ? '#5C606C' : '#9CA3AF',
                      fontWeight: '600',
                    }}>
                      {p.period}
                    </span>
                  </div>

                  {/* Daily breakdown badge */}
                  <div style={{
                    background: isDark ? '#12141A' : '#F3F4F6',
                    border: isDark ? '1px solid #23262F' : '1px solid #E5E7EB',
                    borderRadius: '8px',
                    padding: '4px 10px',
                  }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: isDark ? '#8A8F98' : '#4B5563',
                    }}>
                      {p.dailyPrice}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: isDark ? '#23262F' : '#E5E7EB', width: '100%' }} />

                {/* Features Checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
                  {p.features.map((f, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '13px',
                        color: isDark ? '#8A8F98' : '#4B5563',
                        fontWeight: '500',
                      }}
                    >
                      <svg 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="#F06922" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        style={{ flexShrink: 0 }}
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selected || loading}
          className={`continue-btn ${selected ? 'active' : 'disabled'}`}
        >
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                width: '18px',
                height: '18px',
                border: '2.5px solid currentColor',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              <span>Loading...</span>
            </div>
          ) : (
            <span>Continue →</span>
          )}
        </button>

        {/* Trust Badges */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          marginTop: '8px',
          padding: '12px',
          flexWrap: 'wrap',
        }}>
          {[
            { 
              icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>, 
              text: 'Secure Payment' 
            },
            { 
              icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>, 
              text: 'No Auto-Renewal' 
            },
            { 
              icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>, 
              text: 'WhatsApp Support' 
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: isDark ? '#5C606C' : '#9CA3AF',
                fontWeight: 500,
              }}
            >
              <span style={{ color: '#F06922', display: 'flex' }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
