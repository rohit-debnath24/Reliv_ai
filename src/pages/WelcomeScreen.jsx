import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/constants";
import PillNav from "./PillNav";
import "./WelcomeScreen.css";
import { gsap } from "gsap";

function CountUpNumber({ targetVal, type, duration = 2.5, startOnMount = false }) {
  const [val, setVal] = useState(0);
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!startOnMount) return;
    
    // Animate on mount
    const valObj = { value: 0 };
    gsap.to(valObj, {
      value: targetVal,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => {
        setVal(valObj.value);
      }
    });
    setHasAnimated(true);
  }, [targetVal, startOnMount, duration]);

  useEffect(() => {
    if (startOnMount || hasAnimated) return;

    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const valObj = { value: 0 };
          gsap.to(valObj, {
            value: targetVal,
            duration: duration,
            ease: "power2.out",
            onUpdate: () => {
              setVal(valObj.value);
            }
          });
          setHasAnimated(true);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [targetVal, startOnMount, hasAnimated, duration]);

  const renderFormatted = () => {
    if (!hasAnimated && !startOnMount) {
      if (type === 'stories') {
        const parts = targetVal.toLocaleString('en-US').split(',');
        return parts.length > 1 
          ? <>{parts[0]}<span>,</span>{parts[1]}<span>+</span></>
          : <>{parts[0]}<span>+</span></>;
      } else if (type === 'rating') {
        return <>{targetVal.toFixed(1)}<span>★</span></>;
      } else if (type === 'workout') {
        return <>{targetVal}<span>min</span></>;
      } else if (type === 'price') {
        return <>₹<span>{targetVal}</span></>;
      } else if (type === 'users') {
        return <>{targetVal}<span>+</span></>;
      }
    }

    if (type === 'stories') {
      const currentVal = Math.floor(val);
      const parts = currentVal.toLocaleString('en-US').split(',');
      return parts.length > 1 
        ? <>{parts[0]}<span>,</span>{parts[1]}<span>+</span></>
        : <>{parts[0]}<span>+</span></>;
    } else if (type === 'rating') {
      const currentVal = val.toFixed(1);
      return <>{currentVal}<span>★</span></>;
    } else if (type === 'workout') {
      const currentVal = Math.floor(val);
      return <>{currentVal}<span>min</span></>;
    } else if (type === 'price') {
      const currentVal = Math.floor(val);
      return <>₹<span>{currentVal}</span></>;
    } else if (type === 'users') {
      const currentVal = Math.floor(val);
      return <>{currentVal}<span>+</span></>;
    }
    return Math.floor(val);
  };

  return (
    <span ref={elementRef} className="num-animate-container">
      {renderFormatted()}
    </span>
  );
}

const NAV_ITEMS = [
  { label: 'How it works', href: '#day' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#proof' }
];

export default function WelcomeScreen() {
  const navigate = useNavigate();

  // App States
  const [stats, setStats] = useState({
    topUsers: [],
    todayUsers: 47,
    successStories: 12847,
  });
  const [shoutouts, setShoutouts] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isHovered, setIsHovered] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    return sessionStorage.getItem("shoutoutDismissed") === "true";
  });
  const cursorDotRef = useRef(null);
  const cursorGlowRef = useRef(null);

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

  // Cycle through shoutouts toast notifications with progress bar & pause-on-hover
  useEffect(() => {
    if (shoutouts.length === 0 || isDismissed) return;

    let tickInterval;
    let transitionTimeout;

    // Initial delay of 3 seconds before showing the first notification
    if (!showNotification && progress === 100 && currentIdx === 0) {
      transitionTimeout = setTimeout(() => {
        setShowNotification(true);
      }, 3000);
      return () => clearTimeout(transitionTimeout);
    }

    if (showNotification && !isHovered) {
      const tickRate = 100; // ms
      const totalTicks = 7000 / tickRate; // 7 seconds total visible time
      const decrement = 100 / totalTicks;

      tickInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev - decrement <= 0) {
            clearInterval(tickInterval);
            setShowNotification(false);
            transitionTimeout = setTimeout(() => {
              setCurrentIdx((idx) => (idx + 1) % shoutouts.length);
              setProgress(100);
              setShowNotification(true);
            }, 500); // 500ms slide-out animation time
            return 0;
          }
          return prev - decrement;
        });
      }, tickRate);
    }

    return () => {
      if (tickInterval) clearInterval(tickInterval);
      if (transitionTimeout) clearTimeout(transitionTimeout);
    };
  }, [showNotification, isHovered, isDismissed, shoutouts.length, currentIdx]);

  useEffect(() => {
    api.call("/stats/today").then(setStats).catch(() => { });
  }, []);

  // Custom Follow Cursor
  useEffect(() => {
    const dot = cursorDotRef.current;
    const glow = cursorGlowRef.current;
    if (!dot || !glow) return;

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(glow, { xPercent: -50, yPercent: -50 });

    const handleMouseMove = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: "power2.out" });
      gsap.to(glow, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target && target.closest && target.closest("button, a, .bcard, .testi, .testimonial-card, .price-card, .pricing-card, .nominee-badge, .theme-toggle, .mobile-only-logo")) {
        gsap.to(glow, { scale: 1.6, background: "rgba(255, 92, 53, 0.12)", borderColor: "var(--coral)", duration: 0.3 });
        gsap.to(dot, { scale: 0.6, opacity: 0.3, duration: 0.3 });
      } else {
        gsap.to(glow, { scale: 1, background: "transparent", borderColor: "rgba(255, 92, 53, 0.3)", duration: 0.3 });
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // 3D Tilt Effect on cards
  useEffect(() => {
    const cards = document.querySelectorAll(".bcard, .price-card, .pricing-card, .testi, .testimonial-card");
    
    const handleMove = (e) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left - box.width / 2;
      const y = e.clientY - box.top - box.height / 2;
      
      const tiltX = (y / (box.height / 2)) * -5;
      const tiltY = (x / (box.width / 2)) * 5;
      
      gsap.to(card, {
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.3
      });
    };
    
    const handleLeave = (e) => {
      const card = e.currentTarget;
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: "power2.out",
        duration: 0.5
      });
    };
    
    cards.forEach(card => {
      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", handleLeave);
    });
    
    return () => {
      cards.forEach(card => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  // Staggered Entrance Animations on load
  useEffect(() => {
    gsap.fromTo(".hero-eyebrow, .hero-gradient-title, .hero .lead, .hero-ctas, .hero-stats", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.15 }
    );
    
    gsap.fromTo(".phone", 
      { opacity: 0, scale: 0.75, rotate: -4 }, 
      { opacity: 1, scale: 0.9, rotate: 5, duration: 1.6, ease: "elastic.out(1, 0.75)", delay: 0.5 }
    );
  }, []);

  // Scroll and GSAP Reveal Observer
  useEffect(() => {
    const nav = document.getElementById('nav');
    const handleScroll = () => {
      if(window.scrollY > 40) { nav?.classList.add('scrolled'); }
      else { nav?.classList.remove('scrolled'); }
    };
    window.addEventListener('scroll', handleScroll);

    const revealEls = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const targets = entry.target.querySelectorAll('h2, p, .bcard, .testi, .price-card, .day-col, .price-checklist li');
          
          if (targets.length > 0) {
            gsap.fromTo(targets,
              { opacity: 0, y: 25 },
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }
            );
          } else {
            gsap.fromTo(entry.target,
              { opacity: 0, y: 25 },
              { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
            );
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    window.dispatchEvent(new Event('themeChange'));
  };

  return (
    <div className={`welcome-landing ${isDark ? 'dark-mode' : 'light-mode'}`}>
      {/* Custom Cursor elements */}
      <div className="custom-cursor-dot" ref={cursorDotRef}></div>
      <div className="custom-cursor-glow" ref={cursorGlowRef}></div>
      {/* Ambient background glow blobs */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>
      
      {/* Floating Award Nominee Badge */}
      <div className="nominee-badge" onClick={() => navigate('/ProductShowcaseBoard')}>
        <div className="nominee-badge-inner">
          <span className="star-icon">★</span>
          <div>
            <div className="nominee-title">Site of the Day</div>
            <div className="nominee-subtitle">Awwwards Nominee</div>
          </div>
          <span className="year-tag">2026</span>
        </div>
      </div>

      {/* Side Popup Toast Notification */}
      {shoutouts.length > 0 && !isDismissed && (
        <div 
          className={`shoutout-toast ${showNotification ? 'visible' : ''}`} 
          onClick={() => navigate('/ProductShowcaseBoard')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button 
            className="close-toast" 
            onClick={(e) => { 
              e.stopPropagation(); 
              setShowNotification(false); 
              setIsDismissed(true); 
              sessionStorage.setItem("shoutoutDismissed", "true");
            }}
            aria-label="Close notification"
          >
            ×
          </button>
          <div className="toast-body">
            <div className="toast-avatar-container">
              <img 
                src={shoutouts[currentIdx]?.image || "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=200&h=200&q=80"} 
                alt={shoutouts[currentIdx]?.name} 
                className="toast-avatar"
              />
              <span className="toast-badge-emoji">
                {shoutouts[currentIdx]?.type === "Birthday" && "🎂"}
                {shoutouts[currentIdx]?.type === "Instagram" && "📸"}
                {shoutouts[currentIdx]?.type === "Product" && "☕"}
                {shoutouts[currentIdx]?.type === "Star" && "⭐"}
                {shoutouts[currentIdx]?.type || "💬"}
              </span>
            </div>
            <div className="toast-content">
              <div className="toast-header-info">
                <span className="toast-name">{shoutouts[currentIdx]?.name}</span>
                <div className="toast-live-badge">
                  <span className="toast-pulse-dot"></span>
                  <span className="toast-live-txt">Live</span>
                </div>
              </div>
              <p className="toast-message">"{shoutouts[currentIdx]?.message}"</p>
              <span className="toast-action-lbl">Click to view board →</span>
            </div>
          </div>
          {/* Toast dynamic progress bar */}
          <div className="toast-progress-bar">
            <div className="toast-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      <header className="nav" id="nav">
        {/* Left Spacer / Mobile Logo */}
        <div className="nav-left">
          <div className="logo mobile-only-logo">Rel<span>i</span>v</div>
        </div>

        {/* Center: PillNav */}
        <div className="nav-center">
          <PillNav
            logo={"/relivlogo.jpeg"}
            logoAlt="Reliv Logo"
            items={NAV_ITEMS}
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
      <div className="marquee" style={{ marginTop: '64px' }}>
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
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-eyebrow"><span className="dot"></span> AI-Powered Personal Health</span>
              <h1 className="hero-gradient-title">Transform your health,<br/>one <span className="coral-glow">WhatsApp</span><br/>message at a time.</h1>
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
              <div className="hero-stat">
                <span className="num" id="hero-stat-users">
                  <CountUpNumber targetVal={stats.todayUsers || 47} type="users" startOnMount={true} duration={2.5} />
                </span>
                <span className="lbl">Users Today</span>
              </div>
              <div className="hero-stat">
                <span className="num" id="hero-stat-rating">
                  <CountUpNumber targetVal={4.9} type="rating" startOnMount={true} duration={2.5} />
                </span>
                <span className="lbl">Avg Rating</span>
              </div>
              <div className="hero-stat">
                <span className="num">HIPAA</span>
                <span className="lbl">Compliant</span>
              </div>
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
                <div className="wa-quick-replies">
                  <button className="wa-qr">Swap breakfast 🔄</button>
                  <button className="wa-qr">Skip workout</button>
                  <button className="wa-qr">Water intake 💧</button>
                </div>
                <div className="wa-progress-row">
                  <div className="wa-progress-label">Daily goal — 68% complete</div>
                  <div className="wa-progress-bar-bg">
                    <div className="wa-progress-bar-fill"></div>
                  </div>
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
            <h2 className="section-gradient-title">Three nudges. Zero apps to open.</h2>
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
            <h2 className="section-gradient-title">Everything a trainer and dietitian do — minus the waitlist.</h2>
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
      {/* ============ PRICING ============ */}
      <section className="pricing" id="pricing">
        <div className="wrap price-shell">
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
          <div className="reveal">
            <span className="eyebrow">Pricing</span>
            <h2 className="section-title">Cheaper than the<br /><em>coffee</em> you'll skip.</h2>
            <p className="section-sub">One transparent price. No hidden tiers, no surprise renewals — cancel from WhatsApp, anytime, in one message.</p>
            <div className="desktop-only-action-ctas">
              <button onClick={() => navigate('/phone')} className="btn-primary" style={{ marginRight: '12px' }}>Start your free trial</button>
              <button onClick={() => navigate('/code')} className="btn-ghost">Returning user? Log in</button>
            </div>
          </div>

          <div className="pricing-card reveal">
            <div className="pricing-badge">One plan. Everything included.</div>
            <div className="pricing-amount">
              <span className="pricing-currency">₹</span>
              <span className="pricing-number">9</span>
              <span className="pricing-per">/ day, billed monthly</span>
            </div>
            <div className="pricing-note">That's ₹270/month for a personal coach, a nutritionist, and a planner.</div>

            <div className="pricing-compare">
              <div className="pricing-row">
                <div className="pricing-row-label"><span>☕</span> Cup of chai</div>
                <div className="pricing-row-val">₹10–15</div>
              </div>
              <div className="pricing-row">
                <div className="pricing-row-label"><span>🛺</span> Short auto ride</div>
                <div className="pricing-row-val">₹30–50</div>
              </div>
              <div className="pricing-row">
                <div className="pricing-row-label"><span>🧃</span> Café cold coffee</div>
                <div className="pricing-row-val">₹120+</div>
              </div>
              <div className="pricing-row highlight">
                <div className="pricing-row-label"><span>⚡</span> Reliv — full day of AI coaching</div>
                <div className="pricing-row-val">₹9</div>
              </div>
            </div>

            <div className="pricing-features">
              <div className="pricing-feature">
                <div className="pricing-check">✓</div>
                Personalized diet & workout plans, updated weekly
              </div>
              <div className="pricing-feature">
                <div className="pricing-check">✓</div>
                Daily WhatsApp coaching — no app to install
              </div>
              <div className="pricing-feature">
                <div className="pricing-check">✓</div>
                Progress tracking & weekly summaries
              </div>
              <div className="pricing-feature">
                <div className="pricing-check">✓</div>
                Bank-grade security, HIPAA-compliant by design
              </div>
            </div>

            <button onClick={() => navigate('/phone')} className="btn-primary-lg" style={{ width: '100%', textAlign: 'center' }}>Start your free trial</button>
          </div>
        </div>
      </section>

      {/* ============ STATS + TESTIMONIALS ============ */}
      <section id="proof">
        <div className="wrap">
          <div className="head reveal">
            <span className="eyebrow">Real People, Real Streaks</span>
            <h2 className="section-title">Trusted by<br /><em>thousands.</em></h2>
          </div>
          {(() => {
            const storiesVal = stats.successStories || 12847;
            return (
              <div className="stats-strip">
                <div className="stat-item reveal">
                  <div className="stat-n">
                    <CountUpNumber targetVal={storiesVal} type="stories" duration={2.8} />
                  </div>
                  <div className="stat-l">SUCCESS STORIES</div>
                </div>
                <div className="stat-item reveal">
                  <div className="stat-n">
                    <CountUpNumber targetVal={4.9} type="rating" duration={2.8} />
                  </div>
                  <div className="stat-l">AVERAGE RATING</div>
                </div>
                <div className="stat-item reveal">
                  <div className="stat-n">
                    <CountUpNumber targetVal={12} type="workout" duration={2.8} />
                  </div>
                  <div className="stat-l">AVG. DAILY WORKOUT</div>
                </div>
                <div className="stat-item reveal">
                  <div className="stat-n">
                    <CountUpNumber targetVal={9} type="price" duration={2.8} />
                  </div>
                  <div className="stat-l">PER DAY, ALL-IN</div>
                </div>
              </div>
            );
          })()}

          <div className="testimonials">
            <div className="testimonial-card reveal">
              <div className="t-stars">★★★★★</div>
              <p className="t-quote">"I stopped overthinking what to eat. Reliv just tells me, and I do it. Six kilos down in two months."</p>
              <div className="t-author">
                <div className="t-avatar">PS</div>
                <div>
                  <div className="t-name">Priya S.</div>
                  <div className="t-loc">Pune</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card reveal">
              <div className="t-stars">★★★★★</div>
              <p className="t-quote">"The WhatsApp reminders are the whole trick. I never opened another fitness app, and I never miss a day."</p>
              <div className="t-author">
                <div className="t-avatar">RK</div>
                <div>
                  <div className="t-name">Rohit K.</div>
                  <div className="t-loc">Bengaluru</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card reveal">
              <div className="t-stars">★★★★★</div>
              <p className="t-quote">"Felt like having a dietitian on call for the price of a cutting chai. Worth every rupee."</p>
              <div className="t-author">
                <div className="t-avatar">AM</div>
                <div>
                  <div className="t-name">Anjali M.</div>
                  <div className="t-loc">Delhi</div>
                </div>
              </div>
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
          <div className="trust-note reveal">
            <span>🔒 Bank-grade security</span>
            <span>🏥 HIPAA compliant</span>
            <span>❌ No credit card needed</span>
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
