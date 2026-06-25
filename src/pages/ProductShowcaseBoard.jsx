import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,400..600&family=Inter:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300..800;1,9..40,300..800&display=swap');`;

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.shouthouse-container {
  min-height: 100vh;
  position: relative;
  background: var(--bg-main);
  color: var(--text-main);
  transition: background 0.4s ease, color 0.4s ease;
  font-family: 'DM Sans', sans-serif;
  overflow-x: hidden;
}

/* Dark Mode Variable overrides */
.shouthouse-container.dark-mode {
  --bg-main: #11140F;
  --bg-card: rgba(27, 31, 23, 0.45);
  --bg-card-hover: rgba(35, 41, 30, 0.65);
  --text-main: #F7F4EC;
  --text-muted: #A0A596;
  --text-muted-faint: #4E5446;
  --grey-300: rgba(247, 244, 236, 0.35);
  --line-main: rgba(255, 255, 255, 0.08);
  --border-card: rgba(255, 92, 53, 0.15);
  --border-card-hover: rgba(255, 92, 53, 0.45);
  --orange: #FF5C35;
  --orange-light: #FF8566;
  --orange-pale: rgba(255, 92, 53, 0.15);
  --mesh-1: radial-gradient(ellipse 800px 600px at 110% -10%, rgba(255, 92, 53, 0.15) 0%, transparent 60%);
  --mesh-2: radial-gradient(ellipse 600px 600px at -10% 100%, rgba(124, 152, 133, 0.12) 0%, transparent 60%);
  --nav-bg: rgba(17, 20, 15, 0.8);
  --shadow-card: 0 12px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03);
  --shadow-hover: 0 24px 64px rgba(255, 92, 53, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  --btn-cta-shadow: 0 10px 40px rgba(255, 92, 53, 0.35);
  --btn-cta-hover-shadow: 0 16px 56px rgba(255, 92, 53, 0.5);
}

/* Light Mode Variable overrides */
.shouthouse-container.light-mode {
  --bg-main: #F9F6F0;
  --bg-card: rgba(255, 255, 255, 0.65);
  --bg-card-hover: rgba(255, 255, 255, 0.85);
  --text-main: #11140F;
  --text-muted: #75786C;
  --text-muted-faint: #B8BBAE;
  --grey-300: rgba(17, 20, 15, 0.25);
  --line-main: rgba(0, 0, 0, 0.06);
  --border-card: rgba(255, 92, 53, 0.12);
  --border-card-hover: rgba(255, 92, 53, 0.35);
  --orange: #FF5C35;
  --orange-light: #FF8566;
  --orange-pale: rgba(255, 92, 53, 0.08);
  --mesh-1: radial-gradient(ellipse 800px 600px at 110% -10%, rgba(255, 92, 53, 0.08) 0%, transparent 60%);
  --mesh-2: radial-gradient(ellipse 600px 600px at -10% 100%, rgba(124, 152, 133, 0.06) 0%, transparent 60%);
  --nav-bg: rgba(249, 246, 240, 0.85);
  --shadow-card: 0 12px 40px rgba(255, 92, 53, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  --shadow-hover: 0 24px 64px rgba(255, 92, 53, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  --btn-cta-shadow: 0 10px 40px rgba(255, 92, 53, 0.2);
  --btn-cta-hover-shadow: 0 16px 56px rgba(255, 92, 53, 0.35);
}

.shouthouse-container .mesh-bg {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background: var(--mesh-1), var(--mesh-2), var(--bg-main);
  transition: background 0.4s ease;
}

.shouthouse-container .spotlight-beam {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(ellipse at center, rgba(255, 92, 53, 0.08) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transition: opacity 0.4s ease;
}
.shouthouse-container.light-mode .spotlight-beam {
  background: radial-gradient(ellipse at center, rgba(255, 92, 53, 0.04) 0%, transparent 70%);
}

.shouthouse-container .grid-lines {
  position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: .025;
  background-image:
    linear-gradient(var(--orange) 1px, transparent 1px),
    linear-gradient(90deg, var(--orange) 1px, transparent 1px);
  background-size: 60px 60px;
}

.shouthouse-container .nav {
  position: relative; z-index: 10;
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 40px;
  border-bottom: 1px solid var(--line-main);
  background: var(--nav-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: background 0.4s, border-color 0.4s;
}

.shouthouse-container .nav-logo {
  font-family: 'Fraunces', serif;
  font-size: 22px; font-weight: 700; letter-spacing: -.5px;
  color: var(--text-main);
  transition: color 0.4s;
}
.shouthouse-container .nav-logo span { color: var(--orange); }

.shouthouse-container .nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.shouthouse-container .theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--line-main);
  background: var(--bg-card);
  color: var(--text-main);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-card);
}
.shouthouse-container .theme-toggle:hover {
  border-color: var(--orange);
  transform: rotate(40deg) scale(1.05);
  background: var(--bg-card-hover);
}

.shouthouse-container .nav-back {
  background: none; border: none; cursor: pointer;
  font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600;
  color: var(--text-muted); display: flex; align-items: center; gap: 8px;
  transition: color .2s;
  position: relative;
}
.shouthouse-container .nav-back span {
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.shouthouse-container .nav-back:hover {
  color: var(--orange);
}
.shouthouse-container .nav-back:hover span {
  transform: translateX(-4px);
}

.shouthouse-container .nav-pill {
  background: var(--orange-pale);
  border: 1px solid rgba(255, 92, 53, 0.25);
  color: var(--orange);
  font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase;
  padding: 8px 16px; border-radius: 50px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  animation: glowPulse 2s infinite ease-in-out;
}
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 0 rgba(255, 92, 53, 0); }
  50% { box-shadow: 0 0 10px rgba(255, 92, 53, 0.15); }
}

.shouthouse-container .hero {
  position: relative; z-index: 1;
  max-width: 900px; margin: 0 auto;
  padding: 64px 24px 44px;
  text-align: center;
}

.shouthouse-container .hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 50px;
  padding: 8px 20px;
  font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
  color: var(--orange);
  box-shadow: var(--shadow-card);
  margin-bottom: 28px;
  animation: fadeDown .5s ease both;
  transition: background 0.3s, border-color 0.3s;
}

.shouthouse-container .live-dot {
  width: 7px; height: 7px;
  background: var(--orange);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--orange);
  animation: blink 1.2s infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }

.shouthouse-container .hero-h1 {
  font-family: 'Fraunces', serif;
  font-size: clamp(38px, 8vw, 62px);
  font-weight: 700; line-height: 1.05;
  color: var(--text-main);
  margin-bottom: 20px;
  animation: fadeUp .6s ease .1s both;
  transition: color 0.3s;
}
.shouthouse-container .hero-h1 em {
  font-style: italic;
  font-weight: 400;
  color: var(--orange);
  background: linear-gradient(120deg, var(--orange), var(--orange-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.shouthouse-container .hero-sub {
  font-size: 16px; color: var(--text-muted);
  max-width: 500px; margin: 0 auto 36px; line-height: 1.6;
  animation: fadeUp .6s ease .2s both;
  transition: color 0.3s;
}

@keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
@keyframes fadeDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:none} }

/* ============ CATEGORY FILTER BAR ============ */
.shouthouse-container .filter-bar {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 0 auto 40px;
  padding: 0 24px;
  max-width: 1000px;
  flex-wrap: wrap;
  position: relative;
  z-index: 5;
  animation: fadeUp .6s ease .25s both;
}

.shouthouse-container .filter-pill {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: var(--text-muted);
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: var(--shadow-card);
}

.shouthouse-container .filter-pill:hover {
  border-color: var(--orange-light);
  color: var(--text-main);
  transform: translateY(-2px);
  background: var(--bg-card-hover);
}

.shouthouse-container .filter-pill.active {
  background: var(--orange);
  border-color: transparent;
  color: #FFFFFF;
  box-shadow: var(--btn-cta-shadow);
  transform: scale(1.05) translateY(-2px);
}

@media (max-width: 600px) {
  .shouthouse-container .filter-bar {
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 4px 20px 16px;
    margin-bottom: 24px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .shouthouse-container .filter-bar::-webkit-scrollbar {
    display: none;
  }
  .shouthouse-container .filter-pill {
    flex-shrink: 0;
  }
}

/* ============ BOARD GRID & CARDS ============ */
.shouthouse-container .board-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 28px;
  max-width: 1000px;
  margin: 0 auto 56px;
  padding: 0 24px;
  animation: fadeUp .6s ease .3s both;
}

.shouthouse-container .card {
  background: var(--bg-card);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 24px;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s, border-color .3s, background .3s;
}

.shouthouse-container .card::after {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: linear-gradient(
    45deg,
    transparent 45%,
    rgba(255, 255, 255, 0.08) 48%,
    rgba(255, 255, 255, 0.25) 50%,
    rgba(255, 255, 255, 0.08) 52%,
    transparent 55%
  );
  transform: rotate(-45deg) translate(-70%, -70%);
  transition: transform 0.6s ease;
  pointer-events: none;
  z-index: 2;
}
.shouthouse-container.light-mode .card::after {
  background: linear-gradient(
    45deg,
    transparent 45%,
    rgba(255, 255, 255, 0.18) 48%,
    rgba(255, 255, 255, 0.45) 50%,
    rgba(255, 255, 255, 0.18) 52%,
    transparent 55%
  );
}
.shouthouse-container .card:hover::after {
  transform: rotate(-45deg) translate(70%, 70%);
}

.shouthouse-container .card:hover {
  transform: translateY(-8px) scale(1.025);
  box-shadow: var(--shadow-hover);
  border-color: var(--border-card-hover);
  background: var(--bg-card-hover);
}

.shouthouse-container .card.is-live {
  border-color: rgba(255, 92, 53, 0.35);
  box-shadow: 0 0 20px rgba(255, 92, 53, 0.1), var(--shadow-card);
}
.shouthouse-container .card.is-live:hover {
  border-color: rgba(255, 92, 53, 0.7);
  box-shadow: 0 0 30px rgba(255, 92, 53, 0.2), var(--shadow-hover);
}

.shouthouse-container .card-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: var(--orange-pale);
  border: 1px solid rgba(255, 92, 53, 0.25);
  color: var(--orange);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 50px;
  z-index: 3;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.shouthouse-container .card-body {
  padding: 32px 24px 24px;
  display: flex; flex-direction: column; align-items: center;
  flex-grow: 1;
}

.shouthouse-container .card-avi-container {
  position: relative;
  margin-bottom: 16px;
}
.shouthouse-container .card-avi {
  width: 86px; height: 86px; border-radius: 50%;
  object-fit: cover;
  border: 3.5px solid var(--border-card);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  transition: all 0.3s ease;
  display: block;
}
.shouthouse-container .card:hover .card-avi {
  border-color: var(--orange);
  transform: scale(1.04);
}

.shouthouse-container .card-name {
  font-family: 'Fraunces', serif;
  font-size: 21px; font-weight: 700; color: var(--text-main);
  margin-bottom: 6px;
  transition: color 0.3s;
  text-align: center;
}

.shouthouse-container .card-type {
  font-size: 12px; color: var(--text-muted); font-weight: 700; margin-bottom: 16px;
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--line-main);
  padding: 4px 12px;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.shouthouse-container .card-msg {
  font-size: 15px; color: var(--text-main); line-height: 1.6;
  font-style: italic; text-align: center;
  position: relative;
  padding: 14px 18px;
  margin-bottom: 18px;
  background: rgba(255, 92, 53, 0.03);
  border-radius: 14px;
  border-left: 3px solid var(--orange);
  width: 100%;
  transition: all 0.3s ease;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shouthouse-container.dark-mode .card-msg {
  background: rgba(255, 92, 53, 0.04);
}
.shouthouse-container .card:hover .card-msg {
  background: rgba(255, 92, 53, 0.06);
}

.shouthouse-container .card-footer {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  font-size: 12px; color: var(--text-muted); margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid var(--line-main);
  width: 100%;
}
.shouthouse-container .card-footer .ldot {
  width: 7px; height: 7px;
  background: #22C55E;
  border-radius: 50%;
  box-shadow: 0 0 8px #22C55E;
  animation: blink 1.2s infinite;
}

/* ============ PREMIUM CTA BANNER ============ */
.shouthouse-container .cta-card {
  max-width: 680px;
  margin: 0 auto 64px;
  padding: 44px 36px;
  background: linear-gradient(135deg, var(--bg-card) 0%, rgba(255, 92, 53, 0.03) 100%);
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
  border-radius: 28px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  text-align: center;
  position: relative;
  overflow: hidden;
  z-index: 5;
  animation: fadeUp .6s ease .4s both;
  transition: all 0.3s ease;
}
.shouthouse-container.dark-mode .cta-card {
  background: linear-gradient(135deg, var(--bg-card) 0%, rgba(255, 92, 53, 0.05) 100%);
}
.shouthouse-container .cta-card::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 100% 100%, rgba(255, 92, 53, 0.08) 0%, transparent 50%);
  pointer-events: none;
}
.shouthouse-container .cta-card:hover {
  border-color: var(--border-card-hover);
  box-shadow: var(--shadow-hover);
}

.shouthouse-container .cta-title {
  font-family: 'Fraunces', serif;
  font-size: 28px; font-weight: 700; color: var(--text-main);
  margin-bottom: 12px;
}
.shouthouse-container .cta-desc {
  font-size: 15px; color: var(--text-muted);
  max-width: 480px; margin: 0 auto 24px;
  line-height: 1.5;
}

.shouthouse-container .cta-features {
  display: flex; justify-content: center; gap: 24px;
  margin-bottom: 28px; flex-wrap: wrap;
}
.shouthouse-container .cta-feature-item {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; color: var(--text-muted);
  font-weight: 600;
}
.shouthouse-container .cta-feature-item svg {
  color: var(--orange);
  flex-shrink: 0;
}

.shouthouse-container .cta-btn {
  display: inline-block;
  background: var(--orange);
  color: #fff; font-size: 18px; font-weight: 700;
  padding: 16px 44px; border-radius: 999px; border: none;
  box-shadow: var(--btn-cta-shadow);
  cursor: pointer; letter-spacing: .02em;
  transition: transform .2s, box-shadow .2s, background .2s;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
}
.shouthouse-container .cta-btn::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
  pointer-events: none;
}
.shouthouse-container .cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--btn-cta-hover-shadow);
  background: var(--orange-light);
}
.shouthouse-container .cta-btn:active { transform: scale(.98); }

.shouthouse-container .footer-note {
  text-align: center; font-size: 12px; color: var(--text-muted);
  margin-bottom: 32px; letter-spacing: .04em;
  opacity: 0.8;
}

@media(max-width:600px){
  .shouthouse-container .nav{padding:16px 20px;}
  .shouthouse-container .hero{padding:44px 16px 24px;}
  .shouthouse-container .board-grid{grid-template-columns:1fr;padding:0 16px;gap:20px;}
  .shouthouse-container .cta-card{margin: 0 16px 48px; padding: 32px 20px;}
  .shouthouse-container .cta-features{flex-direction: column; align-items: center; gap: 12px;}
}
`;

const DEMO_POSTS = [
  {
    name: "Priya Sharma",
    message: "My birthday shoutout was seen by 500+ people! The card looked so premium. 🎂",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=200&h=200&q=80",
    type: "Birthday",
    live: true,
  },
  {
    name: "Raj Mehta",
    message: "Got 50+ new followers from my IG card! Worth every rupee. 📸",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=200&h=200&q=80",
    type: "Instagram",
    live: true,
  },
  {
    name: "Sara Khan",
    message: "Promoted my new café here — best decision ever! ☕",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=200&h=200&q=80",
    type: "Product",
    live: false,
  },
  {
    name: "Arjun Desai",
    message: "Celebrated my milestone with a Star Shoutout. Epic moment! ⭐",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&w=200&h=200&q=80",
    type: "Star",
    live: true,
  },
];

export default function ProductShowcaseBoard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [activeFilter, setActiveFilter] = useState("all");

  // Sync state with localStorage theme settings
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true; // default to dark
  });

  // Sync theme changes from global events
  useEffect(() => {
    const handleThemeChange = () => {
      const saved = localStorage.getItem("theme");
      setIsDark(saved === "dark");
    };
    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    window.dispatchEvent(new Event('themeChange'));
  };

  // Load user shoutouts from localStorage (unified key userShoutouts)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("userShoutouts") || "[]");
      if (saved.length > 0) {
        // Merge user shoutouts with demo posts, user shoutouts first
        setPosts([...saved.map(s => ({ ...s, live: true })), ...DEMO_POSTS]);
      }
    } catch (e) {
      console.error("Error loading shoutouts:", e);
    }
  }, []);

  // Filter posts dynamically
  const filteredPosts = posts.filter(p => {
    if (activeFilter === "all") return true;
    return p.type.toLowerCase() === activeFilter;
  });

  return (
    <div className={`shouthouse-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <style>{FONTS + CSS}</style>
      <div className="mesh-bg" />
      <div className="spotlight-beam" />
      <div className="grid-lines" />
      <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
        {/* NAV */}
        <nav className="nav">
          <button className="nav-back" onClick={() => navigate(-1)}>
            <span>←</span> Back
          </button>
          <div className="nav-logo">Shout<span>House</span></div>
          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? "☀️" : "🌙"}
            </button>
            <div className="nav-pill">🔥 Public Board</div>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-eyebrow">
            <span className="live-dot" /> Live Shoutouts & Products
          </div>
          <h1 className="hero-h1">
            Your Moment,<br /><em>Their Screen.</em>
          </h1>
          <p className="hero-sub">
            See real shoutouts, birthdays, and product stories from our community.<br />
            <strong style={{ color: "var(--orange)", fontWeight: "600" }}>People really pay for this display.</strong>
          </p>
        </section>

        {/* CATEGORY FILTER BAR */}
        <div className="filter-bar">
          {[
            { id: "all", label: "All Shoutouts", emoji: "✨" },
            { id: "birthday", label: "Birthdays", emoji: "🎂" },
            { id: "instagram", label: "Socials", emoji: "📸" },
            { id: "product", label: "Products", emoji: "☕" },
            { id: "star", label: "Stars", emoji: "⭐" }
          ].map(f => (
            <button
              key={f.id}
              className={`filter-pill ${activeFilter === f.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.id)}
            >
              <span>{f.emoji}</span> {f.label}
            </button>
          ))}
        </div>

        {/* BOARD GRID */}
        <div className="board-grid">
          {filteredPosts.map((p, i) => (
            <div className={`card ${p.live ? 'is-live' : ''}`} key={i} style={{ animationDelay: `${0.05 * i}s` }}>
              <div className="card-badge">{p.type}</div>
              <div className="card-body">
                <div className="card-avi-container">
                  <img
                    className="card-avi"
                    src={p.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&w=200&h=200&q=80"}
                    alt={p.name}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&w=200&h=200&q=80";
                    }}
                  />
                </div>
                <div className="card-name">{p.name}</div>
                <div className="card-type">
                  {p.type.toLowerCase() === "birthday" && "🎂"}
                  {p.type.toLowerCase() === "instagram" && "📸"}
                  {p.type.toLowerCase() === "product" && "☕"}
                  {p.type.toLowerCase() === "star" && "⭐"}
                  <span>{p.type}</span>
                </div>
                <div className="card-msg">"{p.message}"</div>
                <div className="card-footer">
                  {p.live && <><span className="ldot" /> Live Now</>}
                  {!p.live && <span style={{ color: "var(--text-muted-faint)" }}>Featured</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA CARD */}
        <div className="cta-card">
          <h2 className="cta-title">Create Your Shoutout ✨</h2>
          <p className="cta-desc">
            Spotlight your message, IG profile, new product, or custom greetings on our live board instantly.
          </p>
          <div className="cta-features">
            <div className="cta-feature-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Instant Spotlight</span>
            </div>
            <div className="cta-feature-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Seen by 500+ people</span>
            </div>
            <div className="cta-feature-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Only ₹100</span>
            </div>
          </div>
          <button className="cta-btn" onClick={() => navigate("/create-shoutout")}>
            ✨ Create My Shoutout
          </button>
        </div>

        <div className="footer-note">ShoutHouse · Premium Spotlight Platform</div>
      </div>
    </div>
  );
}
