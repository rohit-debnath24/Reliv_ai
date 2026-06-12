import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ActivationScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const accessCode = localStorage.getItem('accessCode') || '6241';

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
        color: ['#F06922', '#22C55E', '#3B82F6', '#EC4899', '#FFD296'][Math.floor(Math.random() * 5)],
      });
    }
    setConfetti(newConfetti);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFFAF7 0%, #FFF5F0 50%, #FFEEDD 100%)',
      fontFamily: "'Inter', 'Outfit', sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          style={{
            position: 'fixed',
            top: -20,
            left: `${c.left}%`,
            width: 10,
            height: 10,
            background: c.color,
            borderRadius: 2,
            animation: `fall ${c.duration}s ease-in ${c.delay}s infinite`,
            zIndex: 0,
          }}
        />
      ))}

      {/* Main Content */}
      <div style={{
        maxWidth: 560,
        width: '100%',
        background: '#FFFFFF',
        borderRadius: 32,
        padding: '56px 48px',
        boxShadow: '0 24px 80px rgba(240, 105, 34, 0.15)',
        border: '1px solid rgba(240, 105, 34, 0.1)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        opacity: show ? 1 : 0,
        transform: show ? 'scale(1)' : 'scale(0.95)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Success Icon */}
        <div style={{
          width: 120,
          height: 120,
          background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
          borderRadius: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 32px',
          boxShadow: '0 16px 50px rgba(34, 197, 94, 0.35)',
          animation: 'pulse 2s ease-in-out infinite',
        }}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 32,
          fontWeight: 800,
          color: '#111111',
          marginBottom: 12,
          letterSpacing: '-1px',
        }}>
          🎉 You're All Set!
        </h1>

        <p style={{
          fontSize: 17,
          color: '#666666',
          lineHeight: 1.6,
          marginBottom: 36,
        }}>
          Your personalized health plan is now active. Check WhatsApp for your first message!
        </p>

        {/* Access Code Card */}
        <div style={{
          background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
          borderRadius: 20,
          padding: '28px 32px',
          marginBottom: 32,
          border: '2px solid #FFD296',
        }}>
          <p style={{
            fontSize: 13,
            color: '#9CA3AF',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: 600,
            marginBottom: 14,
          }}>
            🔑 Your Access Code
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
          }}>
            {accessCode.toString().split('').map((d, i) => (
              <div
                key={i}
                style={{
                  width: 56,
                  height: 68,
                  background: '#FFFFFF',
                  border: '2px solid #F06922',
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  fontWeight: 800,
                  color: '#F06922',
                  boxShadow: '0 4px 15px rgba(240, 105, 34, 0.15)',
                }}
              >
                {d}
              </div>
            ))}
          </div>
          <p style={{
            fontSize: 13,
            color: '#666',
            marginTop: 16,
          }}>
            Save this code for future logins
          </p>
        </div>

        {/* What's Next */}
        <div style={{
          background: '#FAFAFA',
          borderRadius: 16,
          padding: '24px',
          marginBottom: 32,
          textAlign: 'left',
        }}>
          <h3 style={{
            fontSize: 15,
            fontWeight: 700,
            color: '#111',
            marginBottom: 18,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span>📋</span> What's Next?
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { step: '1', text: 'Open WhatsApp & check your messages', icon: '📱' },
              { step: '2', text: 'Send "Hi" to start your first day', icon: '👋' },
              { step: '3', text: 'Get your personalized meal plan!', icon: '🍽️' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <div style={{
                  width: 32,
                  height: 32,
                  background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#FFF',
                }}>
                  {item.step}
                </div>
                <span style={{ fontSize: 14, color: '#333', fontWeight: 500 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gap: 14 }}>
          <button
            onClick={() => navigate('/bot-offer')}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
              border: 'none',
              borderRadius: 16,
              padding: '20px',
              fontSize: 17,
              fontWeight: 700,
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 10px 40px rgba(240, 105, 34, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            🤖 Get Your Pet Bot — ₹499
          </button>

          <button
            onClick={() => navigate('/wa-preview')}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              border: 'none',
              borderRadius: 16,
              padding: '18px',
              fontSize: 16,
              fontWeight: 700,
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(37, 211, 102, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Skip — Open WhatsApp
          </button>

          <button
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              background: '#FFFFFF',
              border: '2px solid #E5E7EB',
              borderRadius: 14,
              padding: '16px',
              fontSize: 15,
              fontWeight: 600,
              color: '#666666',
              cursor: 'pointer',
            }}
          >
            🏠 Back to Home
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
