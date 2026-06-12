import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function FriendSizeScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const options = [
    { value: 2, label: 'Me + 1 Friend', emoji: '👥', price: '₹49', perPerson: '₹24.50' },
    { value: 3, label: 'Me + 2 Friends', emoji: '👥👤', price: '₹84', perPerson: '₹28' },
    { value: 4, label: 'Me + 3 Friends', emoji: '👥👥', price: '₹112', perPerson: '₹28' },
    { value: 5, label: 'Me + 4 Friends', emoji: '👥👥👤', price: '₹140', perPerson: '₹28' },
  ];

  useEffect(() => {
    setTimeout(() => setShowOptions(true), 100);
  }, []);

  const handleContinue = () => {
    if (!selected) return;
    localStorage.setItem('friendCount', selected);
    navigate('/friend-questions');
  };

  return (
    <Layout
      title="How Many Friends?"
      subtitle="Select your squad size"
      showBack
      onBack={() => navigate('/group-type')}
    >
      <div style={{ maxWidth: 550, margin: '0 auto' }}>
        {/* Squad Icon */}
        <div style={{
          textAlign: 'center',
          marginBottom: 36,
        }}>
          <div style={{
            width: 100,
            height: 100,
            background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
            borderRadius: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            fontSize: 48,
            boxShadow: '0 12px 40px rgba(139, 92, 246, 0.3)',
          }}>
            👥
          </div>
        </div>

        {/* Options */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          marginBottom: 36,
        }}>
          {options.map((opt, i) => (
            <div
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              style={{
                background: selected === opt.value
                  ? 'linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)'
                  : '#FFFFFF',
                borderRadius: 18,
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                cursor: 'pointer',
                border: selected === opt.value
                  ? '3px solid #8B5CF6'
                  : '2px solid #E5E7EB',
                boxShadow: selected === opt.value
                  ? '0 12px 40px rgba(139, 92, 246, 0.15)'
                  : '0 4px 15px rgba(0,0,0,0.04)',
                transform: showOptions
                  ? selected === opt.value ? 'scale(1.02)' : 'scale(1)'
                  : 'translateX(-20px)',
                opacity: showOptions ? 1 : 0,
                transition: 'all 0.4s ease',
                transitionDelay: `${i * 0.06}s`,
              }}
            >
              {/* Radio */}
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                border: selected === opt.value ? 'none' : '2px solid #D1D5DB',
                background: selected === opt.value
                  ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
                  : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}>
                {selected === opt.value && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 17, fontWeight: 700, color: '#111', marginBottom: 4 }}>
                  {opt.label}
                </p>
                <p style={{ fontSize: 13, color: '#8B5CF6', fontWeight: 600 }}>
                  {opt.perPerson} per person
                </p>
              </div>

              {/* Price */}
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: '#8B5CF6' }}>{opt.price}</p>
                <p style={{ fontSize: 12, color: '#9CA3AF' }}>total/week</p>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selected}
          style={{
            width: '100%',
            background: selected
              ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
              : 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
            border: 'none',
            borderRadius: 16,
            padding: '20px',
            fontSize: 18,
            fontWeight: 700,
            color: selected ? '#FFFFFF' : '#9CA3AF',
            cursor: selected ? 'pointer' : 'not-allowed',
            boxShadow: selected ? '0 10px 40px rgba(139, 92, 246, 0.35)' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          Continue
        </button>
      </div>
    </Layout>
  );
}
