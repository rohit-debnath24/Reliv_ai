import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SparkleBackground from '../components/SparkleBackground';

const CSS = `
.botpurchase-container {
  min-height: 100vh;
  background: transparent;
  font-family: 'Inter', 'Outfit', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
  transition: background 0.4s ease, color 0.4s ease;
}

/* Dark Mode Variable overrides */
.botpurchase-container.dark-mode {
  --bg-card: rgba(27, 31, 23, 0.45);
  --bg-card-hover: rgba(35, 41, 30, 0.65);
  --text-main: #F7F4EC;
  --text-muted: #A0A596;
  --border-card: rgba(255, 255, 255, 0.08);
  --border-card-hover: rgba(255, 255, 255, 0.2);
  --item-bg: rgba(255, 255, 255, 0.03);
  --item-border: rgba(255, 255, 255, 0.06);
  --shadow-card: 0 24px 80px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.03);
  --shadow-hover: 0 32px 96px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

/* Light Mode Variable overrides */
.botpurchase-container.light-mode {
  --bg-card: rgba(255, 255, 255, 0.75);
  --bg-card-hover: rgba(255, 255, 255, 0.95);
  --text-main: #11140F;
  --text-muted: #75786C;
  --border-card: rgba(0, 0, 0, 0.08);
  --border-card-hover: rgba(0, 0, 0, 0.15);
  --item-bg: rgba(0, 0, 0, 0.02);
  --item-border: rgba(0, 0, 0, 0.04);
  --shadow-card: 0 24px 80px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  --shadow-hover: 0 32px 96px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 1);
}

.botpurchase-wrap {
  position: relative;
  z-index: 1;
  max-width: 540px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.botpurchase-btn-back {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  padding: 10px 18px;
  color: var(--text-muted);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.25s ease;
  outline: none;
}
.botpurchase-btn-back:hover {
  border-color: var(--border-card-hover);
  color: var(--text-main);
  transform: translateX(-2px);
}

.botpurchase-card {
  width: 100%;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 28px;
  padding: 36px 32px;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.botpurchase-card:hover {
  border-color: var(--border-card-hover);
  box-shadow: var(--shadow-hover);
}

.botpurchase-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--item-border);
}

.botpurchase-avatar-box {
  width: 76px;
  height: 76px;
  background: linear-gradient(135deg, #F06922 0%, #FF8A4C 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  flex-shrink: 0;
  box-shadow: 0 10px 24px rgba(240, 105, 34, 0.25);
  animation: botFloat 4s ease-in-out infinite;
}

.botpurchase-title {
  font-family: 'Fraunces', serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 4px;
}

.botpurchase-subtitle {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
}

.botpurchase-price-tag {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  font-weight: 800;
  color: #F06922;
}

.botpurchase-section-title {
  font-size: 12px;
  font-weight: 800;
  color: var(--text-main);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 14px;
}

.botpurchase-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 24px;
}

.botpurchase-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: var(--item-bg);
  border: 1px solid var(--item-border);
  border-radius: 12px;
  transition: all 0.2s ease;
}
.botpurchase-item:hover {
  transform: translateY(-1px);
  background: var(--bg-card-hover);
  border-color: var(--border-card-hover);
}

.botpurchase-item-icon-wrapper {
  color: #F06922;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.botpurchase-item-text {
  font-size: 12px;
  color: var(--text-main);
  font-weight: 600;
}

.botpurchase-invoice {
  background: var(--item-bg);
  border: 1.5px solid var(--item-border);
  border-radius: 16px;
  padding: 18px;
  margin-bottom: 24px;
}

.botpurchase-invoice-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 13.5px;
}

.botpurchase-invoice-row:last-child {
  margin-bottom: 0;
}

.botpurchase-invoice-label {
  color: var(--text-muted);
  font-weight: 500;
}

.botpurchase-invoice-value {
  color: var(--text-main);
  font-weight: 700;
}

.botpurchase-invoice-divider {
  border-top: 1px solid var(--item-border);
  margin: 12px 0;
}

.botpurchase-btn-primary {
  width: 100%;
  background: linear-gradient(135deg, #F06922 0%, #E85C25 100%);
  border: none;
  border-radius: 16px;
  padding: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 15.5px;
  font-weight: 700;
  color: #FFF;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(240, 105, 34, 0.25);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.botpurchase-btn-primary::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
  pointer-events: none;
}
.botpurchase-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(240, 105, 34, 0.35);
}
.botpurchase-btn-primary:active {
  transform: scale(0.98);
}

.botpurchase-trust {
  text-align: center;
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 16px;
  font-weight: 500;
}

@media (max-width: 480px) {
  .botpurchase-card {
    padding: 24px 20px;
    border-radius: 24px;
  }
  .botpurchase-header {
    gap: 14px;
    margin-bottom: 20px;
    padding-bottom: 16px;
  }
  .botpurchase-avatar-box {
    width: 64px;
    height: 64px;
    border-radius: 16px;
  }
  .botpurchase-avatar-box svg {
    width: 28px;
    height: 28px;
  }
  .botpurchase-title {
    font-size: 19px;
  }
  .botpurchase-price-tag {
    font-size: 24px;
  }
  .botpurchase-grid {
    grid-template-columns: 1fr;
    gap: 8px;
    margin-bottom: 20px;
  }
  .botpurchase-invoice {
    padding: 14px;
    margin-bottom: 20px;
  }
  .botpurchase-invoice-row {
    font-size: 13px;
  }
  .botpurchase-btn-primary {
    padding: 14px;
    font-size: 14.5px;
    border-radius: 12px;
  }
  .botpurchase-trust {
    font-size: 11px;
  }
}

@keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
@keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px,-20px); } }
@keyframes botFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes bounceIn { 0% { transform: scale(0.3); opacity: 0; } 50% { transform: scale(1.1); opacity: 0.9; } 100% { transform: scale(1); opacity: 1; } }
`;

export default function BotPurchaseScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState('info');
  const [show, setShow] = useState(false);

  // Theme state listener
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
    setTimeout(() => setShow(true), 120);
  }, []);

  const included = [
    {
      text: 'ESP32-C3 Pet Bot Device',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
          <circle cx="12" cy="5" r="2"/>
          <path d="M12 7v4M8 15h.01M16 15h.01"/>
        </svg>
      )
    },
    {
      text: '0.96" OLED Display (128×64)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <line x1="6" y1="21" x2="18" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      )
    },
    {
      text: 'Passive Buzzer (4 themes)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      )
    },
    {
      text: 'RGB LED (NeoPixel)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <line x1="9" y1="18" x2="15" y2="18" />
          <line x1="10" y1="22" x2="14" y2="22" />
        </svg>
      )
    },
    {
      text: 'Touch Sensor',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 11V6a2 2 0 0 1 4 0v7a2 2 0 0 1-2 2h-2c-1.1 0-2.07-.4-2.83-1.05L6 11.5l1.5-1.5 2.5 1.5V11a1 1 0 0 1 2 0z"/>
        </svg>
      )
    },
    {
      text: 'USB Cable (1m)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-4a2 2 0 0 0-2 2v8a2 2 0 0 1-2 2H6M6 4v4M10 4v4M12 4h-8v4a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V4z"/>
        </svg>
      )
    },
    {
      text: '3D Printed Enclosure',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="21 8 21 21 3 21 3 8" />
          <rect x="1" y="3" width="22" height="5" />
          <line x1="10" y1="12" x2="14" y2="12" />
        </svg>
      )
    },
    {
      text: 'Quick Setup Guide',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      )
    },
  ];

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let code = '';
      for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
      localStorage.setItem('botPairingCode', code);
      localStorage.setItem('botPurchased', 'true');
      setStep('success');
      setTimeout(() => navigate('/bot-pairing'), 1500);
    }, 2500);
  };

  return (
    <div className={`botpurchase-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <style>{CSS}</style>
      <SparkleBackground isDark={isDark} />

      <div style={{ position: 'absolute', top: -100, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,105,34,0.08) 0%, transparent 70%)', animation: 'floatOrb1 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)', animation: 'floatOrb2 10s ease-in-out infinite', pointerEvents: 'none' }} />

      <div className="botpurchase-wrap" style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Back */}
        {step === 'info' && (
          <button onClick={() => navigate('/bot-offer')} className="botpurchase-btn-back">
            ← Back
          </button>
        )}

        {step === 'info' && (
          <div className="botpurchase-card">
            {/* Header */}
            <div className="botpurchase-header">
              <div className="botpurchase-avatar-box">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
                  <circle cx="12" cy="5" r="2"/>
                  <path d="M12 7v4M8 15h.01M16 15h.01"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <h2 className="botpurchase-title">Reliv Pet Bot</h2>
                <p className="botpurchase-subtitle">IoT Health Companion</p>
              </div>
              <div className="botpurchase-price-tag">₹499</div>
            </div>

            {/* Included spec grid */}
            <div>
              <h3 className="botpurchase-section-title">What's Included</h3>
              <div className="botpurchase-grid">
                {included.map((item, i) => (
                  <div key={i} className="botpurchase-item">
                    <div className="botpurchase-item-icon-wrapper">
                      {item.icon}
                    </div>
                    <span className="botpurchase-item-text">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Invoice invoice summary */}
            <div className="botpurchase-invoice">
              <div className="botpurchase-invoice-row">
                <span className="botpurchase-invoice-label">Reliv Pet Bot Device</span>
                <span className="botpurchase-invoice-value">₹499</span>
              </div>
              <div className="botpurchase-invoice-row">
                <span className="botpurchase-invoice-label">Kiosk Delivery Fee</span>
                <span className="botpurchase-invoice-value" style={{ color: '#22C55E' }}>FREE</span>
              </div>
              <div className="botpurchase-invoice-divider" />
              <div className="botpurchase-invoice-row" style={{ alignItems: 'center', marginBottom: 0 }}>
                <span className="botpurchase-invoice-label" style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>Total Amount</span>
                <span style={{ fontSize: '22px', fontWeight: '800', color: '#F06922' }}>₹499</span>
              </div>
            </div>

            {/* Pay primary button */}
            <button onClick={handlePay} className="botpurchase-btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" ry="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
              Pay ₹499 & Get Pairing Code
            </button>

            {/* Trust footer */}
            <div className="botpurchase-trust">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Razorpay Secured Checkout • Free Kiosk Pickup
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="botpurchase-card" style={{ textAlign: 'center', padding: '60px 40px' }}>
            <div style={{
              width: 80, height: 80, background: 'rgba(240, 105, 34, 0.1)',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px', color: '#F06922', animation: 'botFloat 2s ease-in-out infinite'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" ry="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginBottom: 8 }}>Processing Payment...</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: 28 }}>Please wait while we confirm with your bank</p>
            <div style={{ width: 160, height: 4, background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', borderRadius: 2, margin: '0 auto', overflow: 'hidden' }}>
              <div style={{
                width: '60%', height: '100%', background: '#F06922',
                borderRadius: 2, animation: 'spin 1.5s linear infinite'
              }} />
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="botpurchase-card" style={{ textAlign: 'center', padding: '60px 40px', borderColor: 'rgba(34,197,94,0.3)', boxShadow: '0 0 60px rgba(34,197,94,0.1)' }}>
            <div style={{
              width: 80, height: 80, background: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px', color: '#22C55E', animation: 'bounceIn 0.5s ease'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#22C55E', marginBottom: 8 }}>Payment Confirmed!</h3>
            <p style={{ fontSize: '14.5px', color: 'var(--text-muted)' }}>Redirecting you to the pairing setup...</p>
          </div>
        )}
      </div>
    </div>
  );
}
