import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function CategoryScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [showCards, setShowCards] = useState(false);

  // Check if hero training was selected
  const heroTraining = localStorage.getItem('heroTraining') === 'true';
  const celebrityName = localStorage.getItem('celebrityName') || '';
  const selectedCelebrity = localStorage.getItem('selectedCelebrity') || '';

  // Get hero-specific data
  const heroData = {
    'ronaldo': { icon: '⚽', color: '#16A34A', desc: 'CR7 Performance Routine - Speed & Stamina' },
    'messi': { icon: '🐐', color: '#3B82F6', desc: 'The Magician\'s Routine - Agility & Mind' },
    'neymar': { icon: '🌟', color: '#8B5CF6', desc: 'Skill Master Routine - Flexibility' },
    'dhoni': { icon: '🏏', color: '#1E40AF', desc: 'Captain Cool Routine - Leadership & Focus' },
    'kohli': { icon: '💪', color: '#DC2626', desc: 'King Kohli Routine - Fitness & Intensity' },
    'rohit': { icon: '🎯', color: '#0891B2', desc: 'Hitman Routine - Balance & Power' },
    'srk': { icon: '👑', color: '#F59E0B', desc: 'King Khan Transformation - Discipline' },
    'salman': { icon: '💪', color: '#EF4444', desc: 'Bhai Workout - Muscle Building' },
    'akshay': { icon: '🥋', color: '#F97316', desc: 'Khiladi Routine - Martial Arts' },
  };

  const currentHero = heroData[selectedCelebrity] || null;

  // Base categories
  const baseCategories = [
    {
      id: 'muscle',
      title: 'Build Muscle / Abs',
      desc: 'Get stronger and build your dream body',
      icon: '💪',
      color: '#3B82F6',
    },
    {
      id: 'weight-loss',
      title: 'Lose Weight / Diet',
      desc: 'Burn fat and get lean',
      icon: '🥗',
      color: '#22C55E',
    },
    {
      id: 'acne',
      title: 'Clear Acne / Skin',
      desc: 'Get clear, glowing skin',
      icon: '🧴',
      color: '#EC4899',
    },
    {
      id: 'first-aid',
      title: 'First Aid / Quick Help',
      desc: 'Burns, cuts, headaches - instant remedies',
      icon: '🩹',
      color: '#EF4444',
    },
    {
      id: 'general',
      title: 'General Health',
      desc: 'Overall wellness and daily health tips',
      icon: '💊',
      color: '#8B5CF6',
    },
  ];

  // Add hero category at top if hero training selected
  const categories = heroTraining && currentHero ? [
    {
      id: 'hero-training',
      title: `Train with ${celebrityName}`,
      desc: currentHero.desc,
      icon: currentHero.icon,
      color: currentHero.color,
      hero: true,
      isHeroTraining: true,
    },
    ...baseCategories
  ] : baseCategories;

  useEffect(() => {
    setTimeout(() => setShowCards(true), 100);
    // Auto-select hero training if available
    if (heroTraining && currentHero) {
      setSelected('hero-training');
    }
  }, []);

  const handleContinue = () => {
    if (!selected) return;
    localStorage.setItem('category', selected);

    // If hero training selected, go to hero routine screen
    if (selected === 'hero-training') {
      navigate('/hero-routine');
    } else if (selected === 'acne') {
      // Acne/Skin flow → photo QR upload first
      navigate('/acne-photo-qr');
    } else {
      navigate('/meal-freq');
    }
  };

  return (
    <Layout
      title="What are you here for?"
      subtitle="Select your health goal"
      showBack
      onBack={() => navigate(-1)}
    >
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Categories Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
          marginBottom: 40,
        }}>
          {categories.map((c, index) => (
            <div
              key={c.id}
              onClick={() => setSelected(c.id)}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: selected === c.id
                  ? c.isHeroTraining
                    ? `linear-gradient(135deg, ${c.color}15 0%, ${c.color}25 100%)`
                    : 'linear-gradient(135deg, #FFFFFF 0%, #FFF9F5 100%)'
                  : 'var(--white)',
                borderRadius: 20,
                padding: c.isHeroTraining ? '32px 24px' : '28px 24px',
                cursor: 'pointer',
                textAlign: 'center',
                border: selected === c.id
                  ? `3px solid ${c.color}`
                  : c.isHeroTraining
                    ? `2px solid ${c.color}50`
                    : '2px solid #E5E7EB',
                boxShadow: selected === c.id
                  ? `0 16px 50px ${c.color}25`
                  : hovered === c.id
                    ? '0 12px 40px rgba(0,0,0,0.1)'
                    : c.isHeroTraining
                      ? `0 8px 30px ${c.color}15`
                      : '0 4px 20px rgba(0,0,0,0.04)',
                transform: showCards
                  ? selected === c.id
                    ? 'scale(1.03)'
                    : hovered === c.id
                      ? 'translateY(-6px)'
                      : 'translateY(0)'
                  : 'translateY(20px)',
                opacity: showCards ? 1 : 0,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: `${index * 0.05}s`,
                position: 'relative',
                gridColumn: c.hero ? 'span 2' : 'auto',
              }}
            >
              {/* Hero Badge */}
              {c.hero && (
                <div style={{
                  position: 'absolute',
                  top: -12,
                  right: '50%',
                  transform: 'translateX(50%)',
                  background: `linear-gradient(135deg, ${c.color} 0%, ${c.color}dd 100%)`,
                  color: 'var(--white)',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '6px 16px',
                  borderRadius: 20,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  boxShadow: `0 4px 15px ${c.color}50`,
                }}>
                  🔥 Your Challenge
                </div>
              )}

              {/* Selection Indicator */}
              {selected === c.id && (
                <div style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  width: 26,
                  height: 26,
                  background: c.color,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 12px ${c.color}40`,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              )}

              {/* Icon */}
              <div style={{
                width: c.isHeroTraining ? 80 : 70,
                height: c.isHeroTraining ? 80 : 70,
                background: `linear-gradient(135deg, ${c.color}15 0%, ${c.color}25 100%)`,
                borderRadius: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: c.isHeroTraining ? 40 : 34,
              }}>
                {c.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: c.isHeroTraining ? 20 : 17,
                fontWeight: 700,
                color: selected === c.id ? c.color : '#111',
                marginBottom: 6,
              }}>
                {c.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: 13,
                color: '#666',
                lineHeight: 1.4,
              }}>
                {c.desc}
              </p>

              {/* Hero Training Extra Info */}
              {c.isHeroTraining && (
                <div style={{
                  marginTop: 16,
                  padding: '10px 16px',
                  background: '#FEF3C7',
                  borderRadius: 10,
                  border: '1px solid #FCD34D',
                }}>
                  <span style={{ fontSize: 12, color: '#92400E', fontWeight: 600 }}>
                    ⚡ Full day schedule + diet + workout
                  </span>
                </div>
              )}
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
              ? selected === 'hero-training' && currentHero
                ? `linear-gradient(135deg, ${currentHero.color} 0%, ${currentHero.color}dd 100%)`
                : 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)'
              : 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
            border: 'none',
            borderRadius: 16,
            padding: '20px',
            fontSize: 18,
            fontWeight: 700,
            color: selected ? 'var(--white)' : 'var(--gray-400)',
            cursor: selected ? 'pointer' : 'not-allowed',
            boxShadow: selected
              ? selected === 'hero-training' && currentHero
                ? `0 10px 40px ${currentHero.color}40`
                : '0 10px 40px rgba(240, 105, 34, 0.35)'
              : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {selected === 'hero-training' ? `Start ${celebrityName} Challenge →` : 'Continue →'}
        </button>
      </div>
    </Layout>
  );
}
