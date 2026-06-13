import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReturnDailyAgainScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const lastCeleb = localStorage.getItem('celebrity') || 'virat';
  const celebEmojis = {
    virat: '🏏', alia: '🧘‍♀️', salman: '💪',
    deepika: '✨', hrithik: '🔥', priyanka: '🌟'
  };

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
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
    }}>
      <div style={{
        maxWidth: 560,
        width: '100%',
        background: 'var(--white)',
        borderRadius: 32,
        padding: '48px 44px',
        boxShadow: '0 24px 80px rgba(240, 105, 34, 0.1)',
        border: '1px solid rgba(240, 105, 34, 0.1)',
        textAlign: 'center',
        opacity: show ? 1 : 0,
        transform: show ? 'scale(1)' : 'scale(0.95)',
        transition: 'all 0.5s ease',
      }}>
        {/* Icon */}
        <div style={{
          width: 100,
          height: 100,
          background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
          borderRadius: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 28px',
          fontSize: 50,
          boxShadow: '0 12px 40px rgba(245, 158, 11, 0.3)',
        }}>
          ⚡
        </div>

        <h1 style={{
          fontSize: 28,
          fontWeight: 800,
          color: '#111',
          marginBottom: 12,
        }}>
          Ready for Another Day?
        </h1>

        <p style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 32,
          lineHeight: 1.6,
        }}>
          Your last celebrity plan was a hit! Try again or explore a new idol.
        </p>

        {/* Last Plan */}
        <div style={{
          background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
          borderRadius: 18,
          padding: '20px 24px',
          marginBottom: 28,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          border: '1px solid #FCD34D',
        }}>
          <span style={{ fontSize: 36 }}>{celebEmojis[lastCeleb]}</span>
          <div style={{ textAlign: 'left', flex: 1 }}>
            <p style={{ fontSize: 12, color: '#92400E', fontWeight: 600, marginBottom: 2 }}>Last Choice</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#78350F', textTransform: 'capitalize' }}>{lastCeleb} Style</p>
          </div>
          <span style={{
            background: '#22C55E',
            color: '#FFF',
            fontSize: 11,
            fontWeight: 700,
            padding: '5px 12px',
            borderRadius: 20,
          }}>✓ Completed</span>
        </div>

        {/* Options */}
        <div style={{ display: 'grid', gap: 14 }}>
          <button
            onClick={() => {
              localStorage.setItem('planType', 'daily');
              navigate('/daily-pay');
            }}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
              border: 'none',
              borderRadius: 16,
              padding: '20px',
              fontSize: 17,
              fontWeight: 700,
              color: 'var(--white)',
              cursor: 'pointer',
              boxShadow: '0 10px 40px rgba(245, 158, 11, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            🔄 Repeat Same Plan
          </button>

          <button
            onClick={() => navigate('/fan-quiz-type')}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              border: 'none',
              borderRadius: 16,
              padding: '20px',
              fontSize: 17,
              fontWeight: 700,
              color: 'var(--white)',
              cursor: 'pointer',
              boxShadow: '0 10px 40px rgba(139, 92, 246, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            ✨ Try New Celebrity
          </button>

          <button
            onClick={() => navigate('/group-type')}
            style={{
              width: '100%',
              background: 'var(--white)',
              border: '2px solid #E5E7EB',
              borderRadius: 14,
              padding: '16px',
              fontSize: 15,
              fontWeight: 600,
              color: '#666',
              cursor: 'pointer',
            }}
          >
            📅 Switch to Weekly Plan
          </button>
        </div>
      </div>
    </div>
  );
}
