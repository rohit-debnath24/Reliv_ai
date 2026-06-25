import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,400..600&family=Inter:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300..800;1,9..40,300..800&display=swap');`;

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.create-shoutout-container {
  min-height: 100vh;
  position: relative;
  background: var(--bg-main);
  color: var(--text-main);
  transition: background 0.4s ease, color 0.4s ease;
  font-family: 'DM Sans', sans-serif;
  overflow-x: hidden;
}

/* Dark Mode Variable overrides */
.create-shoutout-container.dark-mode {
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
  --orange-faint: rgba(255, 92, 53, 0.05);
  --mesh-1: radial-gradient(ellipse 800px 600px at 110% -10%, rgba(255, 92, 53, 0.15) 0%, transparent 60%);
  --mesh-2: radial-gradient(ellipse 600px 600px at -10% 100%, rgba(124, 152, 133, 0.12) 0%, transparent 60%);
  --nav-bg: rgba(17, 20, 15, 0.8);
  --shadow-card: 0 12px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03);
  --shadow-hover: 0 24px 64px rgba(255, 92, 53, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  --btn-cta-shadow: 0 10px 40px rgba(255, 92, 53, 0.35);
  --btn-cta-hover-shadow: 0 16px 56px rgba(255, 92, 53, 0.5);
  --input-bg: rgba(255, 255, 255, 0.03);
  --input-border: rgba(255, 92, 53, 0.2);
}

/* Light Mode Variable overrides */
.create-shoutout-container.light-mode {
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
  --orange-faint: rgba(255, 92, 53, 0.03);
  --mesh-1: radial-gradient(ellipse 800px 600px at 110% -10%, rgba(255, 92, 53, 0.08) 0%, transparent 60%);
  --mesh-2: radial-gradient(ellipse 600px 600px at -10% 100%, rgba(124, 152, 133, 0.06) 0%, transparent 60%);
  --nav-bg: rgba(249, 246, 240, 0.85);
  --shadow-card: 0 12px 40px rgba(255, 92, 53, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  --shadow-hover: 0 24px 64px rgba(255, 92, 53, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  --btn-cta-shadow: 0 10px 40px rgba(255, 92, 53, 0.2);
  --btn-cta-hover-shadow: 0 16px 56px rgba(255, 92, 53, 0.35);
  --input-bg: rgba(255, 92, 53, 0.03);
  --input-border: rgba(255, 92, 53, 0.15);
}

.create-shoutout-container .mesh-bg {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background: var(--mesh-1), var(--mesh-2), var(--bg-main);
  transition: background 0.4s ease;
}

.create-shoutout-container .grid-lines {
  position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: .025;
  background-image:
    linear-gradient(var(--orange) 1px, transparent 1px),
    linear-gradient(90deg, var(--orange) 1px, transparent 1px);
  background-size: 60px 60px;
}

.create-shoutout-container .nav {
  position: relative; z-index: 10;
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 40px;
  border-bottom: 1px solid var(--line-main);
  background: var(--nav-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: background 0.4s, border-color 0.4s;
}

.create-shoutout-container .nav-logo {
  font-family: 'Fraunces', serif;
  font-size: 22px; font-weight: 700; letter-spacing: -.5px;
  color: var(--text-main);
}
.create-shoutout-container .nav-logo span { color: var(--orange); }

.create-shoutout-container .nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.create-shoutout-container .theme-toggle {
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
.create-shoutout-container .theme-toggle:hover {
  border-color: var(--orange);
  transform: rotate(40deg) scale(1.05);
  background: var(--bg-card-hover);
}

.create-shoutout-container .nav-back {
  background: none; border: none; cursor: pointer;
  font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600;
  color: var(--text-muted); display: flex; align-items: center; gap: 8px;
  transition: color .2s;
  position: relative;
}
.create-shoutout-container .nav-back span {
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.create-shoutout-container .nav-back:hover {
  color: var(--orange);
}
.create-shoutout-container .nav-back:hover span {
  transform: translateX(-4px);
}

.create-shoutout-container .form-wrap {
  position: relative; z-index: 1;
  max-width: 520px; margin: 0 auto;
  padding: 48px 20px 80px;
  animation: fadeUp .5s ease both;
}
@keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }

.create-shoutout-container .form-card {
  background: var(--bg-card);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 28px;
  border: 1px solid var(--border-card);
  padding: 40px 36px;
  box-shadow: var(--shadow-card);
  position: relative; overflow: hidden;
  transition: all 0.3s ease;
}
.create-shoutout-container .form-card::before {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 5px;
  background: linear-gradient(90deg, var(--orange), var(--orange-light), var(--orange-pale));
}
.create-shoutout-container .form-card:hover {
  border-color: var(--border-card-hover);
  box-shadow: var(--shadow-hover);
}

.create-shoutout-container .form-title {
  font-family: 'Fraunces', serif;
  font-size: 28px; font-weight: 700; color: var(--text-main); margin-bottom: 8px; text-align: center;
}
.create-shoutout-container .form-sub {
  font-size: 15px; color: var(--text-muted); text-align: center; margin-bottom: 32px;
}

.create-shoutout-container .field { margin-bottom: 22px; }
.create-shoutout-container .field-label {
  display: block; font-size: 12px; font-weight: 700;
  color: var(--text-muted); margin-bottom: 8px; letter-spacing: .05em; text-transform: uppercase;
}

.create-shoutout-container .field-input {
  width: 100%;
  border: 1.5px solid var(--input-border);
  border-radius: 14px;
  background: var(--input-bg);
  padding: 14px 18px;
  font-family: 'DM Sans', sans-serif; font-size: 16px; color: var(--text-main);
  outline: none; transition: all .2s ease;
}
.create-shoutout-container .field-input:focus {
  border-color: var(--orange);
  background: var(--bg-card);
  box-shadow: 0 0 0 4px rgba(255, 92, 53, 0.12);
}
.create-shoutout-container .field-input::placeholder { color: var(--text-muted-faint); }
.create-shoutout-container .field-textarea { resize: vertical; min-height: 90px; line-height: 1.5; }

.create-shoutout-container .type-row { display: flex; gap: 10px; flex-wrap: wrap; }
.create-shoutout-container .type-pill {
  flex: 1; min-width: 90px;
  padding: 14px 8px; border-radius: 14px;
  border: 1.5px solid var(--input-border);
  background: var(--input-bg);
  color: var(--text-muted); font-size: 13px; font-weight: 600;
  cursor: pointer; text-align: center;
  transition: all 0.22s cubic-bezier(.34,1.56,.64,1);
  font-family: 'DM Sans', sans-serif;
}
.create-shoutout-container .type-pill:hover {
  border-color: var(--orange-light);
  color: var(--orange);
  background: var(--bg-card-hover);
}
.create-shoutout-container .type-pill.on {
  background: linear-gradient(135deg, var(--orange), var(--orange-light));
  border-color: transparent; color: #fff;
  box-shadow: var(--btn-cta-shadow);
  transform: scale(1.04);
}

.create-shoutout-container .submit-btn {
  width: 100%; margin-top: 10px;
  padding: 18px;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--orange) 0%, var(--orange-light) 100%);
  border: none; color: #fff;
  font-family: 'Inter', sans-serif; font-size: 18px; font-weight: 700;
  cursor: pointer; letter-spacing: .02em;
  box-shadow: var(--btn-cta-shadow);
  transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s, background .25s;
  position: relative; overflow: hidden;
}
.create-shoutout-container .submit-btn::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,.15) 0%, transparent 100%);
  pointer-events: none;
}
.create-shoutout-container .submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--btn-cta-hover-shadow);
}
.create-shoutout-container .submit-btn:active { transform: scale(.98); }

/* ============ PREVIEW CARD (MATCHING BOARD) ============ */
.create-shoutout-container .preview-card {
  margin-top: 36px;
  background: var(--bg-card);
  border-radius: 24px;
  border: 1.5px dashed var(--border-card-hover);
  padding: 32px 24px 24px;
  text-align: center;
  box-shadow: var(--shadow-card);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}
.create-shoutout-container .preview-label {
  font-size: 11px; font-weight: 700; color: var(--orange); text-transform: uppercase; letter-spacing: .1em; margin-bottom: 18px;
}
.create-shoutout-container .preview-badge {
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
}

.create-shoutout-container .preview-avi-container {
  position: relative;
  margin-bottom: 16px;
  display: inline-block;
}
.create-shoutout-container .preview-avi {
  width: 86px; height: 86px; border-radius: 50%;
  object-fit: cover;
  border: 3.5px solid var(--border-card);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  display: block;
}

.create-shoutout-container .preview-name {
  font-family: 'Fraunces', serif;
  font-size: 21px; font-weight: 700; color: var(--text-main);
  margin-bottom: 6px;
}

.create-shoutout-container .preview-type {
  font-size: 12px; color: var(--text-muted); font-weight: 700; margin-bottom: 16px;
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--line-main);
  padding: 4px 12px;
  border-radius: 50px;
  text-transform: uppercase;
}

.create-shoutout-container .preview-msg {
  font-size: 15px; color: var(--text-main); line-height: 1.6;
  font-style: italic; text-align: center;
  position: relative;
  padding: 14px 18px;
  margin-bottom: 18px;
  background: rgba(255, 92, 53, 0.03);
  border-radius: 14px;
  border-left: 3px solid var(--orange);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.create-shoutout-container.dark-mode .preview-msg {
  background: rgba(255, 92, 53, 0.04);
}

/* ============ SUCCESS CARD ============ */
.create-shoutout-container .success-card {
  background: var(--bg-card);
  border-radius: 28px;
  border: 1px solid var(--border-card);
  padding: 48px 36px;
  text-align: center;
  box-shadow: var(--shadow-card);
  animation: fadeUp .5s ease both;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  position: relative;
  overflow: hidden;
}
.create-shoutout-container .success-card::before {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 5px;
  background: #22C55E;
}
.create-shoutout-container .success-icon { font-size: 64px; margin-bottom: 18px; }
.create-shoutout-container .success-title { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 700; color: var(--text-main); margin-bottom: 10px; }
.create-shoutout-container .success-sub { font-size: 15px; color: var(--text-muted); margin-bottom: 28px; line-height: 1.5; }
.create-shoutout-container .success-btn {
  background: #22C55E; color: #fff; font-weight: 700; font-size: 16px;
  padding: 16px 36px; border-radius: 14px; border: none;
  cursor: pointer; box-shadow: 0 10px 30px rgba(34,197,94,.25);
  transition: all .2s;
  font-family: 'Inter', sans-serif;
}
.create-shoutout-container .success-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 40px rgba(34,197,94,.45);
  background: #16A34A;
}

@media(max-width:600px){
  .create-shoutout-container .nav{padding:16px 20px;}
  .create-shoutout-container .form-card{padding:28px 20px;}
  .create-shoutout-container .success-card{padding:36px 20px;}
}
`;

const TYPES = [
  { id: "birthday", label: "🎂 Birthday", emoji: "🎂" },
  { id: "instagram", label: "📸 Instagram", emoji: "📸" },
  { id: "product", label: "☕ Product", emoji: "☕" },
  { id: "star", label: "⭐ Star", emoji: "⭐" },
];

export default function CreateShoutoutScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", message: "", type: "birthday", image: "" });
  const [submitted, setSubmitted] = useState(false);

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

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    // Save to localStorage under key userShoutouts (matching showcase board)
    const existing = JSON.parse(localStorage.getItem("userShoutouts") || "[]");
    const newEntry = {
      ...form,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      live: true,
    };
    existing.unshift(newEntry);
    localStorage.setItem("userShoutouts", JSON.stringify(existing));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`create-shoutout-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
        <style>{FONTS + CSS}</style>
        <div className="mesh-bg" />
        <div className="grid-lines" />
        <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
          <nav className="nav">
            <button className="nav-back" onClick={() => navigate("/")}>
              <span>←</span> Home
            </button>
            <div className="nav-logo">Shout<span>House</span></div>
            <div className="nav-actions">
              <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                {isDark ? "☀️" : "🌙"}
              </button>
            </div>
          </nav>
          <div className="form-wrap">
            <div className="success-card">
              <div className="success-icon">🎉</div>
              <h2 className="success-title">Shoutout Created!</h2>
              <p className="success-sub">Your shoutout is now live and will appear on screens during idle time.</p>
              <button className="success-btn" onClick={() => navigate("/ProductShowcaseBoard")}>
                View Public Board
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const typeObj = TYPES.find((t) => t.id === form.type);

  return (
    <div className={`create-shoutout-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <style>{FONTS + CSS}</style>
      <div className="mesh-bg" />
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
          </div>
        </nav>

        {/* FORM */}
        <div className="form-wrap">
          <div className="form-card">
            <h2 className="form-title">Create Your Shoutout ✨</h2>
            <p className="form-sub">Your message will appear on screens during idle time.</p>

            <div className="field">
              <label className="field-label">Your Name *</label>
              <input className="field-input" placeholder="e.g. Priya Sharma" value={form.name} onChange={upd("name")} />
            </div>

            <div className="field">
              <label className="field-label">Shoutout Type</label>
              <div className="type-row">
                {TYPES.map((t) => (
                  <button
                    key={t.id}
                    className={`type-pill${form.type === t.id ? " on" : ""}`}
                    onClick={() => setForm((f) => ({ ...f, type: t.id }))}
                    type="button"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label className="field-label">Message (optional)</label>
              <textarea
                className="field-input field-textarea"
                placeholder="e.g. Happy Birthday! 🎉 or Check out my new product!"
                value={form.message}
                onChange={upd("message")}
              />
            </div>

            <div className="field">
              <label className="field-label">Image URL (optional)</label>
              <input
                className="field-input"
                placeholder="https://example.com/photo.jpg"
                value={form.image}
                onChange={upd("image")}
              />
            </div>

            <button className="submit-btn" onClick={handleSubmit}>
              🚀 Publish Shoutout
            </button>

            {/* Live Preview Card */}
            {form.name && (
              <div className="preview-card">
                <div className="preview-label">Live Preview</div>
                <div className="preview-badge">{typeObj?.label.replace(/^[^ ]+ /, "")}</div>
                <div className="preview-avi-container">
                  <img
                    className="preview-avi"
                    src={form.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&w=200&h=200&q=80"}
                    alt="preview"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&w=200&h=200&q=80";
                    }}
                  />
                </div>
                <div className="preview-name">{form.name}</div>
                <div className="preview-type">
                  {typeObj?.emoji} <span>{typeObj?.label.replace(/^[^ ]+ /, "")}</span>
                </div>
                {form.message && <div className="preview-msg">"{form.message}"</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
