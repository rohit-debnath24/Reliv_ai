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
.form-wrap {
  position: relative; z-index: 1;
  max-width: 520px; margin: 0 auto;
  padding: 48px 20px 80px;
  animation: fadeUp .5s ease both;
}
@keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
.form-card {
  background: #fff;
  border-radius: 28px;
  border: 1px solid rgba(244,97,10,.1);
  padding: 40px 36px;
  box-shadow: var(--shadow-lg);
  position: relative; overflow: hidden;
}
.form-card::before {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 5px;
  background: linear-gradient(90deg, var(--orange), var(--orange-light), var(--orange-pale));
}
.form-title {
  font-family: 'Playfair Display', serif;
  font-size: 28px; font-weight: 900; color: var(--dark); margin-bottom: 8px; text-align: center;
}
.form-sub {
  font-size: 15px; color: var(--grey-500); text-align: center; margin-bottom: 32px;
}
.field { margin-bottom: 22px; }
.field-label {
  display: block; font-size: 13px; font-weight: 600;
  color: var(--grey-500); margin-bottom: 8px; letter-spacing: .02em; text-transform: uppercase;
}
.field-input {
  width: 100%;
  border: 1.5px solid var(--orange-pale);
  border-radius: 14px;
  background: var(--orange-faint);
  padding: 14px 18px;
  font-family: 'DM Sans', sans-serif; font-size: 16px; color: var(--dark);
  outline: none; transition: all .2s;
}
.field-input:focus { border-color: var(--orange); background: #fff; box-shadow: 0 0 0 4px rgba(244,97,10,.08); }
.field-input::placeholder { color: var(--grey-300); }
.field-textarea { resize: vertical; min-height: 90px; line-height: 1.5; }
.type-row { display: flex; gap: 10px; flex-wrap: wrap; }
.type-pill {
  flex: 1; min-width: 90px;
  padding: 14px 8px; border-radius: 14px;
  border: 1.5px solid var(--orange-pale); background: var(--orange-faint);
  color: var(--grey-500); font-size: 14px; font-weight: 600;
  cursor: pointer; text-align: center;
  transition: all .22s cubic-bezier(.34,1.56,.64,1);
  font-family: 'DM Sans', sans-serif;
}
.type-pill:hover { border-color: var(--orange-light); color: var(--orange); background: #fff; }
.type-pill.on {
  background: linear-gradient(135deg, var(--orange), var(--orange-light));
  border-color: transparent; color: #fff;
  box-shadow: 0 4px 16px rgba(244,97,10,.35);
  transform: scale(1.04);
}
.submit-btn {
  width: 100%; margin-top: 10px;
  padding: 18px;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--orange) 0%, var(--orange-light) 100%);
  border: none; color: #fff;
  font-family: 'DM Sans', sans-serif; font-size: 18px; font-weight: 700;
  cursor: pointer; letter-spacing: .02em;
  box-shadow: 0 10px 40px rgba(244,97,10,.35);
  transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s;
  position: relative; overflow: hidden;
}
.submit-btn::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,.18) 0%, transparent 100%);
}
.submit-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 56px rgba(244,97,10,.45); }
.submit-btn:active { transform: scale(.98); }
.preview-card {
  margin-top: 32px;
  background: linear-gradient(135deg, var(--orange-faint), #fff);
  border-radius: 20px;
  border: 1.5px solid var(--orange-pale);
  padding: 24px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(244,97,10,.10);
}
.preview-label {
  font-size: 12px; font-weight: 700; color: var(--orange); text-transform: uppercase; letter-spacing: .1em; margin-bottom: 12px;
}
.preview-name {
  font-family: 'Playfair Display', serif;
  font-size: 26px; font-weight: 900; color: var(--dark); margin-bottom: 6px;
}
.preview-type {
  font-size: 14px; color: var(--orange-mid); font-weight: 600; margin-bottom: 10px;
}
.preview-msg {
  font-size: 15px; color: var(--grey-500); font-style: italic;
}
.success-card {
  background: linear-gradient(135deg, #22C55E, #16A34A);
  border-radius: 20px;
  padding: 48px 32px;
  text-align: center;
  color: #fff;
  box-shadow: 0 16px 56px rgba(34,197,94,.25);
  animation: fadeUp .5s ease both;
}
.success-icon { font-size: 64px; margin-bottom: 18px; }
.success-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; margin-bottom: 10px; }
.success-sub { font-size: 15px; opacity: .9; margin-bottom: 24px; }
.success-btn {
  background: #fff; color: #22C55E; font-weight: 700; font-size: 16px;
  padding: 14px 36px; border-radius: 14px; border: none;
  cursor: pointer; box-shadow: 0 4px 16px rgba(0,0,0,.10);
  transition: transform .2s;
}
.success-btn:hover { transform: scale(1.04); }
@media(max-width:480px){
  .nav{padding:16px 20px;}
  .form-card{padding:28px 20px;}
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

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    // Save to localStorage (would be backend in production)
    const existing = JSON.parse(localStorage.getItem("shoutouts") || "[]");
    const newEntry = {
      ...form,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      live: true,
    };
    existing.unshift(newEntry);
    localStorage.setItem("shoutouts", JSON.stringify(existing));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <style>{FONTS + CSS}</style>
        <div className="mesh-bg" />
        <div className="grid-lines" />
        <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
          <nav className="nav">
            <button className="nav-back" onClick={() => navigate("/")}>← Home</button>
            <div className="nav-logo">Shout<span>House</span></div>
            <div />
          </nav>
          <div className="form-wrap">
            <div className="success-card">
              <div className="success-icon">🎉</div>
              <div className="success-title">Shoutout Created!</div>
              <div className="success-sub">Your shoutout is now live and will appear on screens during idle time.</div>
              <button className="success-btn" onClick={() => navigate("/ProductShowcaseBoard")}>
                View Public Board
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const typeObj = TYPES.find((t) => t.id === form.type);

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
          <div />
        </nav>

        {/* FORM */}
        <div className="form-wrap">
          <div className="form-card">
            <div className="form-title">Create Your Shoutout ✨</div>
            <div className="form-sub">Your message will appear on screens during idle time.</div>

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

            {/* Live Preview */}
            {form.name && (
              <div className="preview-card">
                <div className="preview-label">Live Preview</div>
                {form.image && (
                  <img
                    src={form.image}
                    alt="preview"
                    style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", marginBottom: 12, border: "3px solid #F4610A" }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
                <div className="preview-name">{form.name}</div>
                <div className="preview-type">{typeObj?.emoji} {typeObj?.label.replace(/^[^ ]+ /, "")} Shoutout</div>
                {form.message && <div className="preview-msg">"{form.message}"</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
