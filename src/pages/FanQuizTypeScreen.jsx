import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FanQuizTypeScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

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
    
    // Set body background to match selected theme initially
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, [isDark]);

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

  const categories = [
    {
      id: 'cricket',
      title: 'Cricket',
      emoji: '🏏',
      desc: 'Dhoni · Sachin · Kohli',
      color: '#FF6B2C',
      route: '/fan-cricket',
    },
    {
      id: 'football',
      title: 'Football',
      emoji: '⚽',
      desc: 'Ronaldo · Messi · Neymar',
      color: '#16A34A',
      route: '/fan-football',
    },
    {
      id: 'singer',
      title: 'Singer',
      emoji: '🎤',
      desc: 'Arijit · Badshah · Honey Singh',
      color: '#9333EA',
      route: '/fan-singer',
    },
    {
      id: 'bollywood',
      title: 'Bollywood',
      emoji: '🎬',
      desc: 'SRK · Salman · Akshay',
      color: '#DC2626',
      route: '/fan-bollywood',
    },
  ];

  const handleSelect = (catId) => {
    setSelected(catId);
  };

  const handleContinue = () => {
    if (!selected) return;
    const cat = categories.find((c) => c.id === selected);
    if (cat) {
      localStorage.setItem('fanCategory', cat.id);
      navigate(cat.route);
    }
  };

  const selectedCategory = categories.find((c) => c.id === selected);

  return (
    <div className="page-wrapper-fan">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .page-wrapper-fan {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text-primary);
          transition: background 0.25s, color 0.25s;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        :root {
          --accent: #FF6B2C;
          --accent-subtle: rgba(255,107,44,0.10);
          --accent-glow: rgba(255,107,44,0.18);
        }

        body.dark {
          --bg: #0E0E10;
          --surface: #18181B;
          --surface-2: #222226;
          --border: rgba(255,255,255,0.06);
          --border-hover: rgba(255,107,44,0.5);
          --text-primary: #F4F4F5;
          --text-secondary: #71717A;
          --text-hint: #3F3F46;
          --card-selected-bg: rgba(255,107,44,0.08);
          --shadow: 0 2px 8px rgba(0,0,0,0.5);
          --shadow-hover: 0 8px 32px rgba(0,0,0,0.4);
          --tip-bg: #18181B;
          --tip-border: rgba(255,255,255,0.06);
        }

        body:not(.dark) {
          --bg: #F7F6F3;
          --surface: #FFFFFF;
          --surface-2: #F0EEE9;
          --border: rgba(0,0,0,0.07);
          --border-hover: rgba(255,107,44,0.6);
          --text-primary: #18181B;
          --text-secondary: #71717A;
          --text-hint: #C4C4C8;
          --card-selected-bg: rgba(255,107,44,0.06);
          --shadow: 0 1px 4px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05);
          --shadow-hover: 0 8px 32px rgba(0,0,0,0.10);
          --tip-bg: #FFFFFF;
          --tip-border: rgba(0,0,0,0.07);
        }

        /* Force body background to match selected theme */
        body {
          background: var(--bg) !important;
          color: var(--text-primary) !important;
          transition: background 0.25s, color 0.25s;
        }

        nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          border-bottom: 1px solid var(--border);
          background: var(--bg);
          position: sticky;
          top: 0;
          z-index: 10;
          backdrop-filter: blur(12px);
        }

        .nav-btn {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--surface);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .nav-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-subtle); }

        .nav-logo {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 15px;
          background: var(--accent);
          color: white;
          padding: 5px 14px;
          border-radius: 8px;
        }

        .nav-right { display: flex; gap: 8px; }

        .page {
          max-width: 420px;
          margin: 0 auto;
          width: 100%;
          padding: 28px 18px 32px;
          flex: 1;
          display: flex;
          flex-direction: column;
          z-index: 1;
        }

        .header {
          text-align: center;
          margin-bottom: 28px;
        }

        .eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 8px;
        }

        .title {
          font-family: 'Fraunces', serif;
          font-size: 34px;
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .title em {
          font-style: italic;
          color: var(--accent);
        }

        .subtitle {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }

        .card {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: 22px 16px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow);
          text-align: center;
          -webkit-tap-highlight-color: transparent;
        }

        .card:hover {
          border-color: var(--border-hover);
          box-shadow: var(--shadow-hover);
          transform: translateY(-2px) scale(1.01);
        }

        .card.selected {
          border-color: var(--accent);
          background: var(--card-selected-bg);
          box-shadow: 0 0 0 4px var(--accent-glow), var(--shadow-hover);
        }

        .card.selected .card-check {
          opacity: 1;
          transform: scale(1);
        }

        .card-check {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 20px; height: 20px;
          background: var(--accent);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transform: scale(0.5);
          transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
        }

        .icon-bubble {
          width: 72px; height: 72px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 34px;
          flex-shrink: 0;
          transition: transform 0.2s;
        }

        .card:hover .icon-bubble { transform: scale(1.08) rotate(-3deg); }
        .card.selected .icon-bubble { transform: scale(1.1); }

        .bubble-cricket   { background: linear-gradient(135deg, #1E3A5F 0%, #0D2137 100%); }
        .bubble-football  { background: linear-gradient(135deg, #1A4731 0%, #0D2B1C 100%); }
        .bubble-singer    { background: linear-gradient(135deg, #2D1B4E 0%, #180D2B 100%); }
        .bubble-bollywood { background: linear-gradient(135deg, #4A1A1A 0%, #280D0D 100%); }

        .card-name {
          font-family: 'Fraunces', serif;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .card-names {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.5;
          font-family: 'IBM Plex Mono', monospace;
        }

        .tip-banner {
          background: var(--tip-bg);
          border: 1px solid var(--tip-border);
          border-radius: 16px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: var(--shadow);
        }

        .tip-icon { font-size: 18px; flex-shrink: 0; }

        .tip-text {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .tip-text strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .cta-wrap {
          margin-top: 14px;
          display: none;
          animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }

        .cta-wrap.visible { display: block; }

        .cta-btn {
          width: 100%;
          padding: 15px 24px;
          border-radius: 14px;
          background: var(--accent);
          color: white;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: opacity 0.15s, transform 0.1s;
          letter-spacing: -0.01em;
        }
        .cta-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .cta-btn:active { transform: translateY(0); }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Dust animation styles */
        .dust {
          position: absolute;
          bottom: -20px;
          width: 4px;
          height: 4px;
          background: ${isDark ? 'rgba(255, 230, 200, 0.5)' : 'rgba(240, 105, 34, 0.4)'};
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
      `}</style>

      {/* Floating Dust Wrapper Behind Content */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className={`dust d${i}`}></div>
        ))}
      </div>

      <nav>
        <button className="nav-btn" onClick={() => navigate('/group-type')}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <img 
            src="/relivlogo.jpeg" 
            alt="Reliv" 
            style={{ 
              width: '16px', 
              height: '16px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: '1px solid rgba(255,255,255,0.4)'
            }} 
          />
          Reliv
        </div>
        <div className="nav-right">
          <button className="nav-btn" onClick={toggleTheme} title="Toggle theme">
            {isDark ? (
              <svg id="sunIcon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg id="moonIcon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            )}
          </button>
          <button className="nav-btn" title="Help">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </button>
        </div>
      </nav>

      <div className="page">
        <div className="header">
          <div className="eyebrow">⚡ Quick question</div>
          <h1 className="title">Who's your<br/><em>fav?</em></h1>
          <p className="subtitle">Pick a category — we'll build your plan around them.</p>
        </div>

        <div className="grid">
          {categories.map((cat) => {
            const isSelected = selected === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className={`card ${isSelected ? 'selected' : ''}`}
                data-id={cat.id}
              >
                <div className="card-check">
                  <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className={`icon-bubble bubble-${cat.id}`}>
                  {cat.emoji}
                </div>
                <div>
                  <div className="card-name">{cat.title}</div>
                  <div className="card-names">{cat.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="tip-banner">
          <span className="tip-icon">🎯</span>
          <span className="tip-text"><strong>Why this matters:</strong> Pick your fav category and follow their real fitness routine for a day!</span>
        </div>

        <div className={`cta-wrap ${selected ? 'visible' : ''}`}>
          <button className="cta-btn" onClick={handleContinue}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
            Build My {selectedCategory ? selectedCategory.title : ''} Plan
          </button>
        </div>
      </div>
    </div>
  );
}
