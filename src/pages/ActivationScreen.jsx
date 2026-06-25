import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SparkleBackground from '../components/SparkleBackground';

const CSS = `
.activation-container {
  min-height: 100vh;
  position: relative;
  transition: background 0.4s ease, color 0.4s ease;
  overflow: hidden;
}

/* Dark Mode Variable overrides */
.activation-container.dark-mode {
  --bg-main: #11140F;
  --bg-card: rgba(27, 31, 23, 0.45);
  --bg-card-hover: rgba(35, 41, 30, 0.65);
  --text-main: #F7F4EC;
  --text-muted: #A0A596;
  --text-muted-faint: #4E5446;
  --border-card: rgba(255, 92, 53, 0.15);
  --border-card-hover: rgba(255, 92, 53, 0.45);
  --orange: #FF5C35;
  --orange-light: #FF8566;
  --orange-pale: rgba(255, 92, 53, 0.15);
  --shadow-card: 0 24px 80px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.03);
  --shadow-hover: 0 32px 96px rgba(255, 92, 53, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  --code-bg: rgba(255, 92, 53, 0.05);
  --code-border: rgba(255, 92, 53, 0.35);
  --next-bg: rgba(255, 255, 255, 0.02);
  --next-border: rgba(255, 255, 255, 0.05);
  --btn-cta-shadow: 0 10px 40px rgba(255, 92, 53, 0.35);
  --btn-cta-hover-shadow: 0 16px 56px rgba(255, 92, 53, 0.5);
}

/* Light Mode Variable overrides */
.activation-container.light-mode {
  --bg-main: linear-gradient(180deg, #FFFAF7 0%, #FFF5F0 50%, #FFEEDD 100%);
  --bg-card: #FFFFFF;
  --bg-card-hover: rgba(255, 255, 255, 0.95);
  --text-main: #11140F;
  --text-muted: #75786C;
  --text-muted-faint: #B8BBAE;
  --border-card: rgba(255, 92, 53, 0.12);
  --border-card-hover: rgba(255, 92, 53, 0.35);
  --orange: #FF5C35;
  --orange-light: #FF8566;
  --orange-pale: rgba(255, 92, 53, 0.08);
  --shadow-card: 0 24px 80px rgba(240, 105, 34, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  --shadow-hover: 0 32px 96px rgba(240, 105, 34, 0.18), inset 0 1px 0 rgba(255, 255, 255, 1);
  --code-bg: linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%);
  --code-border: #FFD296;
  --next-bg: #F9FAFB;
  --next-border: #E5E7EB;
  --btn-cta-shadow: 0 10px 40px rgba(255, 92, 53, 0.2);
  --btn-cta-hover-shadow: 0 16px 56px rgba(255, 92, 53, 0.35);
}

.activation-content {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
  z-index: 1;
}

.activation-card {
  max-width: 520px;
  width: 100%;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 32px;
  border: 1px solid var(--border-card);
  padding: 56px 44px;
  box-shadow: var(--shadow-card);
  text-align: center;
  position: relative;
  z-index: 1;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.activation-card:hover {
  border-color: var(--border-card-hover);
  box-shadow: var(--shadow-hover);
}

.success-icon-badge {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 28px;
  box-shadow: 0 16px 40px rgba(34, 197, 94, 0.3);
  animation: floatCheck 2s ease-in-out infinite;
}
@keyframes floatCheck {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.success-h1 {
  font-family: 'Fraunces', serif;
  font-size: 32px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.success-sub {
  font-size: 15.5px;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 32px;
}

/* Access Code Card styling */
.access-code-box {
  background: var(--code-bg);
  border-radius: 20px;
  padding: 24px 32px;
  margin-bottom: 32px;
  border: 2px solid var(--code-border);
  transition: all 0.3s ease;
}

.access-code-label {
  font-size: 12px;
  color: var(--orange);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  margin-bottom: 14px;
}

.access-code-digits {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.access-digit {
  width: 52px;
  height: 64px;
  background: var(--bg-card);
  border: 2px solid var(--orange);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 800;
  color: var(--orange);
  box-shadow: 0 4px 15px rgba(255, 92, 53, 0.1);
  transition: transform 0.2s ease;
}
.activation-card:hover .access-digit {
  transform: translateY(-2px);
}

.access-code-footer {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 16px;
  font-weight: 500;
}

/* What's Next List styling */
.next-steps-panel {
  background: var(--next-bg);
  border: 1px solid var(--next-border);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 32px;
  text-align: left;
}

.next-steps-title {
  font-family: 'Fraunces', serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.next-step-item {
  display: flex;
  align-items: center;
  gap: 14px;
}

.next-step-number {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--orange) 0%, var(--orange-light) 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #FFF;
  flex-shrink: 0;
}

.next-step-text {
  font-size: 14px;
  color: var(--text-main);
  font-weight: 600;
  opacity: 0.95;
}

/* Buttons block */
.buttons-group {
  display: grid;
  gap: 14px;
}

.btn-primary {
  width: 100%;
  border: none;
  border-radius: 16px;
  padding: 18px;
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: #FFF;
  cursor: pointer;
  background: linear-gradient(135deg, var(--orange) 0%, var(--orange-light) 100%);
  box-shadow: var(--btn-cta-shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-primary::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
  pointer-events: none;
}
.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: var(--btn-cta-hover-shadow);
}
.btn-primary:active { transform: scale(0.98); }

.btn-whatsapp {
  width: 100%;
  border: none;
  border-radius: 16px;
  padding: 18px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #FFF;
  cursor: pointer;
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  box-shadow: 0 8px 30px rgba(37, 211, 102, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-whatsapp::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%);
  pointer-events: none;
}
.btn-whatsapp:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 40px rgba(37, 211, 102, 0.4);
}
.btn-whatsapp:active { transform: scale(0.98); }

.btn-secondary {
  width: 100%;
  background: var(--bg-card);
  border: 1.5px solid var(--border-card);
  border-radius: 16px;
  padding: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}
.btn-secondary:hover {
  border-color: var(--border-card-hover);
  color: var(--text-main);
  background: var(--bg-card-hover);
}

/* Confetti */
.confetti-piece {
  position: fixed;
  top: -20px;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  z-index: 0;
  pointer-events: none;
}
@keyframes fall-confetti {
  0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}

@media (max-width: 600px) {
  .activation-card {
    padding: 44px 24px;
  }
}

@media (max-width: 480px) {
  .activation-content {
    padding: 20px 12px;
  }
  .activation-card {
    padding: 24px 16px;
    border-radius: 24px;
  }
  .success-icon-badge {
    width: 72px;
    height: 72px;
    border-radius: 20px;
    margin-bottom: 20px;
  }
  .success-icon-badge svg {
    width: 36px;
    height: 36px;
  }
  .success-h1 {
    font-size: 24px;
    margin-bottom: 8px;
  }
  .success-sub {
    font-size: 13px;
    line-height: 1.5;
    margin-bottom: 24px;
  }
  .access-code-box {
    padding: 16px;
    margin-bottom: 24px;
    border-radius: 16px;
  }
  .access-code-label {
    font-size: 11px;
    margin-bottom: 10px;
  }
  .access-code-digits {
    gap: 8px;
  }
  .access-digit {
    width: 40px;
    height: 52px;
    border-radius: 8px;
    font-size: 20px;
  }
  .access-code-footer {
    font-size: 11.5px;
    margin-top: 12px;
  }
  .next-steps-panel {
    padding: 16px;
    margin-bottom: 24px;
    border-radius: 16px;
  }
  .next-steps-title {
    font-size: 14px;
    margin-bottom: 14px;
  }
  .next-step-item {
    gap: 10px;
  }
  .next-step-number {
    width: 28px;
    height: 28px;
    font-size: 12px;
    border-radius: 8px;
  }
  .next-step-text {
    font-size: 12.5px;
  }
  .buttons-group {
    gap: 10px;
  }
  .btn-primary {
    padding: 14px;
    font-size: 14px;
    border-radius: 12px;
  }
  .btn-whatsapp {
    padding: 14px;
    font-size: 14px;
    border-radius: 12px;
  }
  .btn-secondary {
    padding: 12px;
    font-size: 13.5px;
    border-radius: 12px;
  }
}
`;

export default function ActivationScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const accessCode = localStorage.getItem('accessCode') || '6241';

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const saved = localStorage.getItem("theme");
      setIsDark(saved ? saved === "dark" : true);
    };
    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);

    // Generate confetti
    const newConfetti = [];
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        color: ['#FF5C35', '#22C55E', '#3B82F6', '#EC4899', '#FFEEDD'][Math.floor(Math.random() * 5)],
      });
    }
    setConfetti(newConfetti);
  }, []);

  return (
    <div className={`activation-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <style>{CSS}</style>
      <SparkleBackground isDark={isDark} />

      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti-piece"
          style={{
            left: `${c.left}%`,
            background: c.color,
            animation: `fall-confetti ${c.duration}s ease-in ${c.delay}s infinite`,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="activation-content">
        <div className="activation-card" style={{
          opacity: show ? 1 : 0,
          transform: show ? 'scale(1)' : 'scale(0.95)',
        }}>
          {/* Success Icon */}
          <div className="success-icon-badge">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          {/* Title */}
          <h1 className="success-h1">
            🎉 You're All Set!
          </h1>

          <p className="success-sub">
            Your personalized health plan is now active. Check WhatsApp for your first message!
          </p>

          {/* Access Code Card */}
          <div className="access-code-box">
            <p className="access-code-label">
              🔑 Your Access Code
            </p>
            <div className="access-code-digits">
              {accessCode.toString().split('').map((d, i) => (
                <div key={i} className="access-digit">
                  {d}
                </div>
              ))}
            </div>
            <p className="access-code-footer">
              Save this code for future logins
            </p>
          </div>

          {/* What's Next */}
          <div className="next-steps-panel">
            <h3 className="next-steps-title">
              <span>📋</span> What's Next?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { step: '1', text: 'Open WhatsApp & check your messages', icon: '📱' },
                { step: '2', text: 'Send "Hi" to start your first day', icon: '👋' },
                { step: '3', text: 'Get your personalized meal plan!', icon: '🍽️' },
              ].map((item, i) => (
                <div key={i} className="next-step-item">
                  <div className="next-step-number">
                    {item.step}
                  </div>
                  <span className="next-step-text">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="buttons-group">
            <button
              onClick={() => navigate('/bot-offer')}
              className="btn-primary"
              type="button"
            >
              🤖 Get Your Pet Bot — ₹499
            </button>

            <button
              onClick={() => navigate('/wa-preview')}
              className="btn-whatsapp"
              type="button"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 6 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Skip — Open WhatsApp
            </button>

            <button
              onClick={() => navigate('/')}
              className="btn-secondary"
              type="button"
            >
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
