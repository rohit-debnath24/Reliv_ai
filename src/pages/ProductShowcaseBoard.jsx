import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Bebas+Neue&family=Dancing+Script:wght@600;700&display=swap');`;

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --orange: #F4610A;
  --orange-mid: #F97316;
  --orange-light: #FB923C;
  --orange-pale: #FED7AA;
  --orange-faint: #FFF7ED;
  --white: #FFFFFF;
  --off-white: #FFFBF7;
  --dark: #1C0D00;
  --grey-500: #8C7B6E;
  --grey-300: #C4B8AC;
  --shadow-lg: 0 24px 64px rgba(244,97,10,0.18);
}
body { font-family: 'DM Sans', sans-serif; background: var(--off-white); color: var(--dark); min-height: 100vh; }
.mesh-bg {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 700px 600px at 110% -10%, rgba(249,115,22,.16) 0%, transparent 60%),
    radial-gradient(ellipse 500px 500px at -10% 100%, rgba(251,146,60,.12) 0%, transparent 60%),
    var(--off-white);
}
.grid-lines {
  position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: .04;
  background-image:
    linear-gradient(var(--orange) 1px, transparent 1px),
    linear-gradient(90deg, var(--orange) 1px, transparent 1px);
  background-size: 60px 60px;
}
.nav {
  position: relative; z-index: 10;
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 40px;
  border-bottom: 1px solid rgba(244,97,10,.08);
  background: rgba(255,255,255,.7);
  backdrop-filter: blur(12px);
}
.nav-logo {
  font-family: 'Playfair Display', serif;
  font-size: 22px; font-weight: 900; letter-spacing: -.5px;
  color: var(--dark);
}
.nav-logo span { color: var(--orange); }
.nav-back {
  background: none; border: none; cursor: pointer;
  font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600;
  color: var(--grey-500); display: flex; align-items: center; gap: 6px;
  transition: color .2s;
}
.nav-back:hover { color: var(--orange); }
.nav-pill {
  background: var(--orange);
  color: #fff;
  font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase;
  padding: 7px 16px; border-radius: 50px;
  box-shadow: 0 4px 16px rgba(244,97,10,.25);
  animation: pulsePill 3s ease-in-out infinite;
}
@keyframes pulsePill {
  0%,100% { box-shadow: 0 0 0 0 rgba(244,97,10,.4); }
  50%     { box-shadow: 0 0 0 8px rgba(244,97,10,0); }
}
.hero {
  position: relative; z-index: 1;
  max-width: 900px; margin: 0 auto;
  padding: 56px 24px 36px;
  text-align: center;
}
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  background: #fff;
  border: 1px solid var(--orange-pale);
  border-radius: 50px;
  padding: 8px 20px;
  font-size: 12px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
  color: var(--orange-mid);
  box-shadow: 0 2px 12px rgba(244,97,10,.08);
  margin-bottom: 28px;
  animation: fadeDown .5s ease both;
}
.live-dot { width: 7px; height: 7px; background: var(--orange); border-radius: 50%; animation: blink 1.2s infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
.hero-h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(36px, 7vw, 64px);
  font-weight: 900; line-height: .95;
  color: var(--dark);
  margin-bottom: 18px;
  animation: fadeUp .6s ease .1s both;
}
.hero-h1 em {
  font-style: italic;
  background: linear-gradient(135deg, var(--orange) 0%, var(--orange-light) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.hero-sub {
  font-size: 17px; font-weight: 300; color: var(--grey-500);
  max-width: 500px; margin: 0 auto 36px; line-height: 1.6;
  animation: fadeUp .6s ease .2s both;
}
@keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
@keyframes fadeDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:none} }
.board-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto 56px;
  padding: 0 24px;
  animation: fadeUp .6s ease .3s both;
}
.card {
  background: #fff;
  border-radius: 24px;
  border: 1.5px solid var(--orange-pale);
  box-shadow: 0 12px 40px rgba(244,97,10,.10);
  overflow: hidden;
  position: relative;
  transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s;
}
.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-lg);
}
.card-ribbon {
  background: linear-gradient(90deg, var(--orange), var(--orange-light));
  color: #fff;
  font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  padding: 8px 0;
  text-align: center;
}
.card-body {
  padding: 28px 24px 24px;
  display: flex; flex-direction: column; align-items: center;
}
.card-avi {
  width: 90px; height: 90px; border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--orange-pale);
  box-shadow: 0 6px 24px rgba(244,97,10,.15);
  margin-bottom: 18px;
}
.card-name {
  font-family: 'Playfair Display', serif;
  font-size: 22px; font-weight: 700; color: var(--dark);
  margin-bottom: 4px;
}
.card-type {
  font-size: 13px; color: var(--orange-mid); font-weight: 600; margin-bottom: 12px;
  display: flex; align-items: center; gap: 6px;
}
.card-msg {
  font-size: 15px; color: var(--grey-500); line-height: 1.55;
  font-style: italic; text-align: center;
  border-left: 3px solid var(--orange-pale);
  padding-left: 14px;
  margin-bottom: 10px;
}
.card-footer {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  font-size: 12px; color: var(--grey-300); margin-top: 8px;
}
.card-footer .ldot { width: 6px; height: 6px; background: var(--orange); border-radius: 50%; animation: blink 1.2s infinite; }
.cta-section {
  max-width: 520px; margin: 0 auto 64px;
  text-align: center;
  animation: fadeUp .6s ease .4s both;
}
.cta-btn {
  display: inline-block;
  background: linear-gradient(135deg, var(--orange), var(--orange-light));
  color: #fff; font-size: 19px; font-weight: 700;
  padding: 20px 52px; border-radius: 20px; border: none;
  box-shadow: 0 10px 40px rgba(244,97,10,.3);
  cursor: pointer; letter-spacing: .02em;
  transition: transform .2s, box-shadow .2s;
  position: relative; overflow: hidden;
}
.cta-btn::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,.18) 0%, transparent 100%);
}
.cta-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 56px rgba(244,97,10,.4); }
.cta-btn:active { transform: scale(.98); }
.cta-sub { color: var(--grey-500); font-size: 13px; margin-top: 12px; }
.footer-note {
  text-align: center; font-size: 12px; color: var(--grey-300);
  margin-bottom: 32px; letter-spacing: .04em;
}
@media(max-width:480px){
  .nav{padding:16px 20px;}
  .hero{padding:36px 16px 24px;}
  .board-grid{grid-template-columns:1fr;padding:0 12px;}
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
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState(DEMO_POSTS);

  useEffect(() => { setTimeout(() => setShow(true), 80); }, []);

  // Load user shoutouts from localStorage
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

  return (
    <>
      <style>{FONTS + CSS}</style>
      <div className="mesh-bg" />
      <div className="grid-lines" />
      <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
        {/* NAV */}
        <nav className="nav">
          <button className="nav-back" onClick={() => navigate(-1)}>← Back</button>
          <div className="nav-logo">Shout<span>House</span></div>
          <div className="nav-pill">🔥 Public Board</div>
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
            <strong style={{ color: "var(--orange)" }}>People really pay for this display.</strong>
          </p>
        </section>

        {/* BOARD GRID */}
        <div className="board-grid">
          {posts.map((p, i) => (
            <div className="card" key={i} style={{ animationDelay: `${0.1 * i}s` }}>
              <div className="card-ribbon">{p.type} Shoutout</div>
              <div className="card-body">
                <img className="card-avi" src={p.image} alt={p.name} />
                <div className="card-name">{p.name}</div>
                <div className="card-type">
                  {p.type === "Birthday" && "🎂"}
                  {p.type === "Instagram" && "📸"}
                  {p.type === "Product" && "☕"}
                  {p.type === "Star" && "⭐"}
                  <span>{p.type}</span>
                </div>
                <div className="card-msg">"{p.message}"</div>
                <div className="card-footer">
                  {p.live && <><span className="ldot" /> Live Now</>}
                  {!p.live && <span style={{ color: "var(--grey-300)" }}>Featured</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="cta-section">
          <button className="cta-btn" onClick={() => navigate("/create-shoutout")}>
            ✨ Create MY Shoutout
          </button>
          <p className="cta-sub">Only ₹100 · Takes 30 seconds · Seen by 500+ people</p>
        </div>

        <div className="footer-note">ShoutHouse · Premium Spotlight Platform</div>
      </div>
    </>
  );
}
