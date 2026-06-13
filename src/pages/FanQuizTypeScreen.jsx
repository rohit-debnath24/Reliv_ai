import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function FanQuizTypeScreen() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [showCards, setShowCards] = useState(false);

  const categories = [
    {
      id: 'cricket',
      title: 'Cricket',
      emoji: '🏏',
      desc: 'Dhoni, Sachin, Kohli',
      color: '#1E40AF',
      route: '/fan-cricket',
    },
    {
      id: 'football',
      title: 'Football',
      emoji: '⚽',
      desc: 'Ronaldo, Messi, Neymar',
      color: '#16A34A',
      route: '/fan-football',
    },
    {
      id: 'singer',
      title: 'Singer',
      emoji: '🎤',
      desc: 'Arijit, Badshah, Honey Singh',
      color: '#9333EA',
      route: '/fan-singer',
    },
    {
      id: 'bollywood',
      title: 'Bollywood',
      emoji: '🎬',
      desc: 'SRK, Salman, Akshay',
      color: '#DC2626',
      route: '/fan-bollywood',
    },
  ];

  useEffect(() => {
    setTimeout(() => setShowCards(true), 100);
  }, []);

  const handleSelect = (category) => {
    localStorage.setItem('fanCategory', category.id);
    navigate(category.route);
  };

  return (
    <Layout
      title="Who's Your Fav?"
      subtitle="Quick question!"
      showBack
      onBack={() => navigate('/group-type')}
    >
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        {/* Category Grid - 2x2 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
          marginBottom: 32,
        }}>
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat)}
              onMouseEnter={() => setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: 'var(--white)',
                borderRadius: 24,
                padding: '36px 24px',
                textAlign: 'center',
                cursor: 'pointer',
                border: `3px solid ${hovered === cat.id ? cat.color : 'transparent'}`,
                boxShadow: hovered === cat.id
                  ? `0 16px 50px ${cat.color}25`
                  : '0 8px 30px rgba(0,0,0,0.06)',
                transform: showCards
                  ? hovered === cat.id ? 'scale(1.03)' : 'scale(1)'
                  : 'translateY(20px)',
                opacity: showCards ? 1 : 0,
                transition: 'all 0.4s ease',
                transitionDelay: `${i * 0.08}s`,
              }}
            >
              {/* Emoji */}
              <div style={{
                width: 80,
                height: 80,
                background: `linear-gradient(135deg, ${cat.color}15 0%, ${cat.color}25 100%)`,
                borderRadius: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: 42,
              }}>
                {cat.emoji}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: 20,
                fontWeight: 700,
                color: '#111',
                marginBottom: 8,
              }}>
                {cat.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: 13,
                color: '#666',
              }}>
                {cat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Info */}
        <div style={{
          textAlign: 'center',
          padding: '20px',
          background: '#FFF9F5',
          borderRadius: 16,
          border: '1px solid rgba(240, 105, 34, 0.1)',
        }}>
          <p style={{ fontSize: 14, color: '#666' }}>
            🎯 Pick your favorite category and follow their fitness routine for a day!
          </p>
        </div>
      </div>
    </Layout>
  );
}
