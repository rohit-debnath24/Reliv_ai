import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Silk from './Silk';

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
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <Silk
          speed={5}
          scale={1}
          color="#ff6627"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <Layout
        title="How Many Friends?"
        subtitle="Select your squad size"
        titleColor="#ffffff"
        subtitleColor="rgba(255, 255, 255, 0.9)"
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
              background: 'linear-gradient(135deg, #F06922 0%, #D95319 100%)',
              borderRadius: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              fontSize: 48,
              boxShadow: '0 12px 40px rgba(240, 105, 34, 0.3)',
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
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: 18,
                  padding: '24px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  cursor: 'pointer',
                  border: selected === opt.value
                    ? '3px solid #F06922'
                    : '2px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: selected === opt.value
                    ? '0 12px 40px rgba(240, 105, 34, 0.15)'
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
                  border: selected === opt.value ? 'none' : '2px solid rgba(255, 255, 255, 0.5)',
                  background: selected === opt.value
                    ? 'linear-gradient(135deg, #F06922 0%, #D95319 100%)'
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
                  <p style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                    {opt.label}
                  </p>
                  <p style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                    {opt.perPerson} per person
                  </p>
                </div>

                {/* Price */}
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{opt.price}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.6)' }}>total/week</p>
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
                ? 'linear-gradient(135deg, #F06922 0%, #D95319 100%)'
                : 'rgba(255, 255, 255, 0.2)',
              backdropFilter: selected ? 'none' : 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 16,
              padding: '20px',
              fontSize: 18,
              fontWeight: 700,
              color: selected ? 'var(--white)' : 'rgba(255, 255, 255, 0.4)',
              cursor: selected ? 'pointer' : 'not-allowed',
              boxShadow: selected ? '0 10px 40px rgba(240, 105, 34, 0.35)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            Continue
          </button>
        </div>
      </Layout>
    </>
  );
}
