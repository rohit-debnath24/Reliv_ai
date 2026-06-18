import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SparkleBackground from '../components/SparkleBackground';
import { C } from '../utils/constants';

export default function CodeEntryScreen() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

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

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (i, val) => {
    if (val.length > 1) val = val[0];
    const newCode = [...code];
    newCode[i] = val;
    setCode(newCode);
    setError('');

    if (val && i < 3) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    const newCode = [...code];
    for (let i = 0; i < pasted.length; i++) {
      newCode[i] = pasted[i];
    }
    setCode(newCode);
    if (pasted.length === 4) {
      inputRefs.current[3]?.focus();
    }
  };

  const handleSubmit = async () => {
    const accessCode = code.join('');
    if (accessCode.length !== 4) return;

    setLoading(true);
    setError('');

    // Demo codes for testing
    const demoCodes = ['9876', '6241', '1234'];

    setTimeout(() => {
      if (demoCodes.includes(accessCode)) {
        localStorage.setItem('accessCode', accessCode);
        localStorage.setItem('userType', 'returning');
        // Randomly route to different return states for demo
        const routes = ['/return-active', '/return-expired', '/return-daily-again'];
        navigate(routes[Math.floor(Math.random() * routes.length)]);
      } else {
        setError('Code not found');
        setLoading(false);
      }
    }, 800);
  };

  const isComplete = code.every(d => d);

  return (
    <>
      <SparkleBackground />
      <Layout
        title="Welcome Back! 👋"
        subtitle="Enter your 4-digit access code to continue"
        showBack
        onBack={() => navigate('/')}
      >
      <div className="w-full px-4 sm:px-0" style={{ maxWidth: 600, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Main Card */}
        <div 
          className="main-card-padding"
          style={{
            background: 'var(--white)',
            borderRadius: 32,
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--gray-200)',
            textAlign: 'center',
          }}
        >
          {/* Icon */}
          <div style={{
            width: 90,
            height: 90,
            background: 'var(--cream-200)',
            borderRadius: 26,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
            border: '1px solid var(--cream-400)',
            fontSize: 44,
          }}>
            🔑
          </div>

          {/* Code Input Boxes */}
          <div
            className="flex justify-center gap-3 sm:gap-4 mb-8"
            onPaste={handlePaste}
          >
            {code.map((d, i) => (
              <input
                key={i}
                ref={(el) => inputRefs.current[i] = el}
                type="tel"
                maxLength="1"
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-[3.5rem] h-[4rem] sm:w-[72px] sm:h-[88px] text-[28px] sm:text-[36px]"
                style={{
                  background: d ? 'var(--white)' : 'var(--gray-50)',
                  border: `2px solid ${d ? 'var(--primary)' : error ? 'var(--error)' : 'var(--gray-200)'}`,
                  borderRadius: 20,
                  fontWeight: 800,
                  color: 'var(--gray-900)',
                  textAlign: 'center',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: d ? '0 8px 30px rgba(240, 105, 34, 0.15)' : 'none',
                  caretColor: 'var(--primary)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary)';
                  e.target.style.boxShadow = '0 0 0 4px rgba(240, 105, 34, 0.15)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = d ? 'var(--primary)' : 'var(--gray-200)';
                  e.target.style.boxShadow = d ? '0 8px 30px rgba(240, 105, 34, 0.15)' : 'none';
                  e.target.style.transform = 'scale(1)';
                }}
              />
            ))}
          </div>

          {/* Demo Hint */}
          <p style={{
            fontSize: 13,
            color: 'var(--gray-400)',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}>
            <span>💡</span>
            Demo codes: <strong style={{ color: 'var(--primary)' }}>9876</strong> or <strong style={{ color: 'var(--primary)' }}>6241</strong>
          </p>

          {/* Error Message */}
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              borderRadius: 14,
              padding: '16px 20px',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              animation: 'shake 0.5s ease',
            }}>
              <span style={{ fontSize: 18 }}>⚠️</span>
              <div>
                <p style={{ fontSize: 14, color: '#FCA5A5', fontWeight: 600, margin: 0 }}>{error}</p>
                <p style={{ fontSize: 12, color: 'var(--gray-400)', margin: '4px 0 0' }}>
                  Check your code or try a new number
                </p>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !isComplete}
            style={{
              width: '100%',
              background: isComplete
                ? 'var(--primary)'
                : 'var(--gray-200)',
              border: 'none',
              borderRadius: 16,
              padding: '20px',
              fontSize: 18,
              fontWeight: 700,
              color: isComplete ? 'var(--white)' : 'var(--gray-400)',
              cursor: isComplete && !loading ? 'pointer' : 'not-allowed',
              boxShadow: isComplete ? 'var(--shadow-glow)' : 'none',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: 22,
                  height: 22,
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'var(--white)',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                Checking...
              </>
            ) : (
              'Continue'
            )}
          </button>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            margin: '28px 0',
            color: 'var(--gray-400)',
            fontSize: 13,
          }}>
            <div style={{ flex: 1, height: 1, background: 'var(--gray-200)' }} />
            <span>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--gray-200)' }} />
          </div>

          {/* New User Button */}
          <button
            onClick={() => navigate('/phone')}
            style={{
              width: '100%',
              background: 'var(--white)',
              border: '2px solid var(--gray-200)',
              borderRadius: 14,
              padding: '16px',
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--gray-600)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            📱 Start Fresh with Phone Number
          </button>
        </div>

        {/* Help Text */}
        <p style={{
          textAlign: 'center',
          marginTop: 24,
          fontSize: 13,
          color: 'var(--gray-400)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}>
          <span>🔒</span>
          Your code is linked to your phone number
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
    </>
  );
}
