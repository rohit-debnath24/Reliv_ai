import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/constants";
import PillNav from "./PillNav";
import "./WelcomeScreen.css";

export default function WelcomeScreen() {
  const navigate = useNavigate();

  // App States
  const [stats, setStats] = useState({
    topUsers: [],
    todayUsers: 47,
    successStories: 12847,
  });
  const [inactive, setInactive] = useState(false);
  const [shoutouts, setShoutouts] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const timerRef = useRef();
  const cycleRef = useRef();

  // Theme State
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true; // default to dark
  });

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
    resetInactivity();
    const events = ["mousemove", "mousedown", "keydown", "touchstart"];
    const handler = resetInactivity;
    events.forEach(e => window.addEventListener(e, handler));
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(e => window.removeEventListener(e, handler));
    };
  }, []);

  // Scroll and Reveal Observer
  useEffect(() => {
    const nav = document.getElementById('nav');
    const handleScroll = () => {
      if(window.scrollY > 40) { nav?.classList.add('scrolled'); }
      else { nav?.classList.remove('scrolled'); }
    };
    window.addEventListener('scroll', handleScroll);

    const revealEls = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, {threshold: 0.15});
    revealEls.forEach(el => obs.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      obs.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    window.dispatchEvent(new Event('themeChange'));
  };

  return (
    <div className={`welcome-landing ${isDark ? 'dark-mode' : 'light-mode'}`} onMouseMove={resetInactivity} onKeyDown={resetInactivity} onClick={resetInactivity} onTouchStart={resetInactivity}>
      {/* Attract/advertisement overlay after inactivity */}
      {inactive && shoutouts.length > 0 && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(5,5,5,0.97)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.4s',
          }}
          onClick={resetInactivity}
        >
          <div style={{
            background: 'linear-gradient(135deg,#F4610A,#FB923C)',
            borderRadius: 32,
            boxShadow: '0 24px 80px rgba(244,97,10,0.3)',
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
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 26, fontWeight: 900, color: '#fff', marginBottom: 6, textAlign: 'center', letterSpacing: '0' }}>
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
              onClick={(e) => { e.stopPropagation(); setInactive(false); navigate('/ProductShowcaseBoard'); }}
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

      <header className="nav" id="nav">
        {/* Left Spacer / Mobile Logo */}
        <div className="nav-left">
          <img src="/relivlogo.jpeg" alt="Reliv Logo" className="mobile-only-logo" />
        </div>

        {/* Center: PillNav */}
        <div className="nav-center">
          <PillNav
            logo={"/relivlogo.jpeg"}
            logoAlt="Reliv Logo"
            items={[
              { label: 'How it works', href: '#day' },
              { label: 'Features', href: '#features' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Reviews', href: '#proof' }
            ]}
            activeHref="#"
            ease="power2.easeOut"
            baseColor={isDark ? "#ffffff" : "#000000"}
            pillColor={isDark ? "#120F17" : "#ffffff"}
            hoveredPillTextColor={isDark ? "#120F17" : "#ffffff"}
            pillTextColor={isDark ? "#ffffff" : "#000000"}
            initialLoadAnimation={true}
          />
        </div>

        {/* Right Menu */}
        <div className="nav-right-menu">
          <div className="nav-right-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? "☀️" : "🌙"}
            </button>
            <button onClick={() => navigate('/code')} className="nav-cta">Login with code</button>
          </div>
        </div>
      </header>

      {/* ============ MARQUEE ============ */}
      <div className="marquee" style={{ marginTop: '80px' }}>
        <div className="marquee-track" id="marquee" style={{ animation: 'scrollx 38s linear infinite' }}>
          <div className="marquee-item"><span className="strong">{stats.successStories}+</span> success stories <span className="sep">◆</span></div>
          <div className="marquee-item"><span className="strong">4.9★</span> average rating <span className="sep">◆</span></div>
          <div className="marquee-item"><span className="strong">HIPAA</span> compliant <span className="sep">◆</span></div>
          <div className="marquee-item"><span className="strong">Bank-grade</span> security <span className="sep">◆</span></div>
          <div className="marquee-item"><span className="strong">Endorsed</span> by experts <span className="sep">◆</span></div>
          <div className="marquee-item"><span className="strong">₹9/day</span> — all inclusive <span className="sep">◆</span></div>
          {/* Duplicated for seamless loop */}
          <div className="marquee-item"><span className="strong">{stats.successStories}+</span> success stories <span className="sep">◆</span></div>
          <div className="marquee-item"><span className="strong">4.9★</span> average rating <span className="sep">◆</span></div>
          <div className="marquee-item"><span className="strong">HIPAA</span> compliant <span className="sep">◆</span></div>
          <div className="marquee-item"><span className="strong">Bank-grade</span> security <span className="sep">◆</span></div>
          <div className="marquee-item"><span className="strong">Endorsed</span> by experts <span className="sep">◆</span></div>
          <div className="marquee-item"><span className="strong">₹9/day</span> — all inclusive <span className="sep">◆</span></div>
        </div>
      </div>

      {/* ============ HERO ============ */}
      <section className="hero" style={{ paddingTop: '80px' }}>
        <div className="wrap hero-grid">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-eyebrow"><span className="dot"></span> AI-Powered Personal Health</span>
              <h1>Transform your health,<br/>one <span style={{color: 'var(--coral)'}}>WhatsApp</span><br/>message at a time.</h1>
              <p className="lead">
                Reliv's AI coach builds your diet plan, your workout routine, and your daily reminders —
                then sends them straight to the app you already check 40 times a day. All for <strong>less than your daily chai</strong>,
                at <span className="price">₹9/day</span>.
              </p>
            </div>
            <div className="hero-ctas">
              <button onClick={() => navigate('/phone')} className="btn-primary">Start your free trial</button>
              <button onClick={() => navigate('/ProductShowcaseBoard')} className="btn-ghost">Public shoutout board</button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><span className="num">{stats.todayUsers}+</span><span className="lbl">Users Today</span></div>
              <div className="hero-stat"><span className="num">4.9</span><span className="lbl">Average rating</span></div>
              <div className="hero-stat"><span className="num">HIPAA</span><span className="lbl">Compliant by design</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="phone">
              <div className="phone-screen">
                <div className="chat-head">
                  <div className="chat-avatar">R</div>
                  <div className="chat-head-info">
                    <div className="name">Reliv AI Coach</div>
                    <div className="status">online</div>
                  </div>
                </div>
                <div className="chat-body">
                  <div className="bubble in">Good morning Aarav ☀️ Here's today's plan based on your goal — lose 4kg by August.<span className="time">7:02 AM</span></div>
                  <div className="bubble in"><strong>Breakfast:</strong> Moong dal chilla + curd, 320 kcal. Want the recipe?<span className="time">7:02 AM</span></div>
                  <div className="bubble out">Yes please 🙏<span className="time">7:05 AM</span></div>
                  <div className="bubble in"><strong>Workout:</strong> 25-min lower body session at 6 PM. I'll check in after 💪<span className="time">5:55 PM</span></div>
                  <div className="typing"><span></span><span></span><span></span></div>
                  <div className="bubble in">You're 3 days into your streak 🔥 Log dinner when you're ready.<span className="time">9:10 PM</span></div>
                </div>
              </div>
            </div>
            <div className="float-card streak" style={{ top: '10%', right: '-15%', padding: '12px 20px', gap: '10px', transform: 'rotate(-2deg)' }}>
              <span style={{ color: '#22C55E', fontSize: '10px' }}>🟢</span>
              <div className="ftitle" style={{ fontSize: '0.85rem' }}>Synced with WhatsApp</div>
            </div>
            <div className="float-card progress" style={{ left: '-15%', bottom: '12%', padding: '12px 20px', gap: '10px', transform: 'rotate(2deg)' }}>
              <span style={{fontSize: "1.2rem"}}>🔥</span>
              <div className="ftitle" style={{ fontSize: '0.85rem' }}>12-day streak</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DAY TIMELINE ============ */}
      <section id="day">
        <div className="wrap">
          <div className="head reveal">
            <span className="tag">A typical day</span>
            <h2>Three nudges. Zero apps to open.</h2>
            <p>No dashboards to check, no logging marathons. Reliv reaches you exactly when it matters — and quietly rebuilds tomorrow's plan around how today went.</p>
          </div>
          <div className="day-rail reveal">
            <div className="day-line"></div>
            <div className="day-line active-line"></div>
            <div className="day-grid">
              <div className="day-col">
                <div className="day-node"></div>
                <div className="day-content">
                  <span className="day-time">07:00 — Morning</span>
                  <h3>Your day, planned</h3>
                  <p>A custom breakfast and macro target lands before you've poured your coffee.</p>
                  <div className="day-quote"><span className="who">Reliv AI Coach</span>"Breakfast: Moong dal chilla + curd — 320 kcal. Tap for the recipe."</div>
                </div>
              </div>
              <div className="day-col">
                <div className="day-node"></div>
                <div className="day-content">
                  <span className="day-time">13:00 — Midday</span>
                  <h3>A gentle check-in</h3>
                  <p>Reliv asks how lunch went and rebalances the rest of your day if you went off-script.</p>
                  <div className="day-quote"><span className="who">Reliv AI Coach</span>"Lunch logged ✅ Dinner's been adjusted — lighter on carbs tonight."</div>
                </div>
              </div>
              <div className="day-col">
                <div className="day-node"></div>
                <div className="day-content">
                  <span className="day-time">18:00 — Evening</span>
                  <h3>Move, then unwind</h3>
                  <p>A short, doable workout reminder — followed by tomorrow's preview nudge.</p>
                  <div className="day-quote"><span className="who">Reliv AI Coach</span>"25-min lower body session ready. I'll check in after 💪"</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES (BENTO) ============ */}
      <section id="features">
        <div className="wrap">
          <div className="head reveal">
            <span className="tag">What's inside</span>
            <h2>Everything a trainer and dietitian do — minus the waitlist.</h2>
            <p>Four systems, one quiet daily habit.</p>
          </div>
          <div className="bento">
            <div className="bcard large reveal">
              <span className="b-tag">01 · Nutrition</span>
              <h3>Personalized diet plans</h3>
              <p>Built around your goals, preferences, and what's actually in your kitchen — recalculated weekly as your weight and habits shift.</p>
              <div className="mini-chat">
                <div className="mini-bubble"><b>Reliv:</b> Tonight's dinner — palak paneer (light), 1 roti, cucumber salad. 410 kcal.</div>
                <div className="mini-bubble alt">Swap paneer for tofu?</div>
                <div className="mini-bubble"><b>Reliv:</b> Done ✅ Updated to 365 kcal — protein target still on track.</div>
              </div>
            </div>
            <div className="bcard reveal">
              <div className="b-icon coral">📲</div>
              <h3>WhatsApp reminders</h3>
              <p>Meals, workouts, water, and sleep — delivered where you already live, no extra app required.</p>
            </div>
            <div className="bcard reveal">
              <div className="b-icon sage">🏋️</div>
              <h3>Adaptive workouts</h3>
              <p>Routines that scale with your equipment, time, and energy — from 10-minute resets to full sessions.</p>
            </div>
            <div className="bcard wide reveal">
              <div className="b-icon gold">📈</div>
              <h3>Progress tracking that actually adapts</h3>
              <p>Streaks, weight trends, and weekly summaries your AI coach uses to fine-tune tomorrow's plan — visible at a glance.</p>
              <div className="spark">
                <div style={{height: "30%"}}></div>
                <div style={{height: "45%"}}></div>
                <div style={{height: "38%"}}></div>
                <div style={{height: "60%"}}></div>
                <div style={{height: "52%"}}></div>
                <div style={{height: "82%"}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section className="pricing" id="pricing">
        <div className="lamp-container">
          <div className="lamp-wire"></div>
          <div className="lamp-head"></div>
          <div className="lamp-cone">
            <div className="lamp-beam"></div>
            <div className="lamp-dust-wrapper">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className={`dust d${i}`}></div>
              ))}
            </div>
          </div>
        </div>
        <div className="wrap price-shell">
          <div className="reveal">
            <span className="tag">Pricing</span>
            <h2>Cheaper than the coffee you'll skip.</h2>
            <p className="lede">One transparent price. No hidden tiers, no surprise renewals — cancel from WhatsApp, anytime, in one message.</p>
            <ul className="price-checklist">
              <li><span className="tick">✓</span> Personalized diet & workout plans, updated weekly</li>
              <li><span className="tick">✓</span> Daily WhatsApp coaching — no app to install</li>
              <li><span className="tick">✓</span> Progress tracking & weekly summaries</li>
              <li><span className="tick">✓</span> Bank-grade security, HIPAA-compliant by design</li>
            </ul>
            <div className="hero-ctas">
              <button onClick={() => navigate('/phone')} className="btn-primary">Start your free trial</button>
              <button onClick={() => navigate('/code')} className="btn-ghost">Returning user? Log in</button>
            </div>
          </div>
          <div className="price-card reveal">
            <div className="price-tag-row">
              <span className="price-amount">₹9</span>
              <span className="price-period">/ day, billed monthly</span>
            </div>
            <div className="price-note">That's ₹270/month for a coach, a nutritionist, and a planner.</div>
            <div className="compare">
              <div className="crow"><span className="item">☕ Cup of chai</span><span className="amt">₹10–15</span></div>
              <div className="crow"><span className="item">🚗 Short auto ride</span><span className="amt">₹30–50</span></div>
              <div className="crow"><span className="item">🥤 Café cold coffee</span><span className="amt">₹120+</span></div>
              <div className="crow hi"><span className="item">🤖 Reliv — full day of AI coaching</span><span className="amt">₹9</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS + TESTIMONIALS ============ */}
      <section id="proof">
        <div className="wrap">
          <div className="head reveal">
            <span className="tag">Trusted by thousands</span>
            <h2>Real people, real streaks.</h2>
          </div>
          <div className="stat-row">
            <div className="stat reveal"><span className="num">{stats.successStories}+</span><span className="lbl">SUCCESS STORIES</span></div>
            <div className="stat reveal"><span className="num">4.9★</span><span className="lbl">AVERAGE RATING</span></div>
            <div className="stat reveal"><span className="num">12min</span><span className="lbl">AVG. DAILY WORKOUT</span></div>
            <div className="stat reveal"><span className="num">₹9</span><span className="lbl">PER DAY, ALL-IN</span></div>
          </div>
          <div className="testi-grid">
            <div className="testi reveal">
              <span className="quote-mark">"</span>
              <div className="stars">★★★★★</div>
              <p>I stopped overthinking what to eat. Reliv just tells me, and I do it. Six kilos down in two months.</p>
              <div className="who"><div className="av">PS</div> Priya S., Pune</div>
            </div>
            <div className="testi reveal">
              <span className="quote-mark">"</span>
              <div className="stars">★★★★★</div>
              <p>The WhatsApp reminders are the whole trick. I never open another fitness app, and I never miss a day.</p>
              <div className="who"><div className="av">RK</div> Rohit K., Bengaluru</div>
            </div>
            <div className="testi reveal">
              <span className="quote-mark">"</span>
              <div className="stars">★★★★★</div>
              <p>Felt like having a dietitian on call for the price of a cutting chai. Worth every rupee.</p>
              <div className="who"><div className="av">AM</div> Anjali M., Delhi</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="final">
        <div className="wrap final-inner">
          <h2 className="reveal">Your AI coach is <em>one message</em> away.</h2>
          <p className="reveal">Start your free trial today — no credit card, no app download, just WhatsApp.</p>
          <div className="hero-ctas reveal">
            <button onClick={() => navigate('/phone')} className="btn-primary">Start your free trial</button>
            <button onClick={() => navigate('/code')} className="btn-ghost">Returning user? Log in</button>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="foot-inner">
            <div>
              <div className="foot-brand">Re<span>liv</span></div>
              <p style={{fontSize: "0.88rem", maxWidth: "260px"}}>AI-powered personal health, delivered on WhatsApp — for ₹9/day.</p>
            </div>
            <div className="foot-cols">
              <div className="foot-col">
                <h4>Product</h4>
                <a href="#day">How it works</a>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
              </div>
              <div className="foot-col">
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Careers</a>
                <a href="#">Contact</a>
              </div>
              <div className="foot-col">
                <h4>Legal</h4>
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">Security</a>
              </div>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Reliv. All rights reserved.</span>
            <span>Bank-grade security · HIPAA compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
