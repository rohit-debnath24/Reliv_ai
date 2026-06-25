import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SparkleBackground from '../components/SparkleBackground';

const SVGIcons = {
  muscle: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.4 14.4l5.6-5.6A2.83 2.83 0 0016 4.8l-5.6 5.6M8.5 8.5L3.5 13.5M15.5 15.5l5 5M4.8 16a2.83 2.83 0 004 4l5.6-5.6-9.6-9.6z" />
    </svg>
  ),
  weight: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0017 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 00-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06z" />
      <path d="M10 2c1 .5 2 2 2 5" />
    </svg>
  ),
  skin: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 008.5 14.063l-6.135-1.582a.5.5 0 010-.962L8.5 9.936A2 2 0 009.936 8.5l1.582-6.135a.5.5 0 01.963 0L14.063 8.5A2 2 0 0015.5 9.937l6.135 1.581a.5.5 0 010 .964L15.5 14.063a2 2 0 00-1.437 1.437l-1.582 6.135a.5.5 0 01-.963 0z" />
    </svg>
  ),
  firstaid: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      <path d="M12 10v6M9 13h6" />
    </svg>
  ),
  general: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
      <path d="M3.6 9h3.39L9 12l2-6 2 3h4" />
    </svg>
  ),
  soccer: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 12l3-2 1.5 4.5h-5z" />
      <path d="M12 12L9 8h6z" />
      <path d="M12 12l-4.5 1 2 4z" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0012 0V2z" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  crown: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
  ),
  zap: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
};

export default function CategoryScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [showCards, setShowCards] = useState(false);

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

  // Check if hero training was selected
  const heroTraining = localStorage.getItem('heroTraining') === 'true';
  const celebrityName = localStorage.getItem('celebrityName') || '';
  const selectedCelebrity = localStorage.getItem('selectedCelebrity') || '';

  // Get hero-specific data
  const heroData = {
    'ronaldo': { icon: SVGIcons.soccer, color: '#16A34A', desc: 'CR7 Performance Routine - Speed & Stamina' },
    'messi': { icon: SVGIcons.trophy, color: '#3B82F6', desc: 'The Magician\'s Routine - Agility & Mind' },
    'neymar': { icon: SVGIcons.star, color: '#8B5CF6', desc: 'Skill Master Routine - Flexibility' },
    'dhoni': { icon: SVGIcons.shield, color: '#1E40AF', desc: 'Captain Cool Routine - Leadership & Focus' },
    'kohli': { icon: SVGIcons.muscle, color: '#DC2626', desc: 'King Kohli Routine - Fitness & Intensity' },
    'rohit': { icon: SVGIcons.target, color: '#0891B2', desc: 'Hitman Routine - Balance & Power' },
    'srk': { icon: SVGIcons.crown, color: '#F59E0B', desc: 'King Khan Transformation - Discipline' },
    'salman': { icon: SVGIcons.muscle, color: '#EF4444', desc: 'Bhai Workout - Muscle Building' },
    'akshay': { icon: SVGIcons.zap, color: '#F97316', desc: 'Khiladi Routine - Martial Arts' },
  };

  const currentHero = heroData[selectedCelebrity] || null;

  // Base categories
  const baseCategories = [
    {
      id: 'muscle',
      title: 'Build Muscle / Abs',
      desc: 'Get stronger and build your dream body',
      icon: SVGIcons.muscle,
      color: '#3B82F6',
    },
    {
      id: 'weight-loss',
      title: 'Lose Weight / Diet',
      desc: 'Burn fat and get lean',
      icon: SVGIcons.weight,
      color: '#22C55E',
    },
    {
      id: 'acne',
      title: 'Clear Acne / Skin',
      desc: 'Get clear, glowing skin',
      icon: SVGIcons.skin,
      color: '#EC4899',
    },
    {
      id: 'first-aid',
      title: 'First Aid / Quick Help',
      desc: 'Burns, cuts, headaches - instant remedies',
      icon: SVGIcons.firstaid,
      color: '#EF4444',
    },
    {
      id: 'general',
      title: 'General Health',
      desc: 'Overall wellness and daily health tips',
      icon: SVGIcons.general,
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
    <>
      <SparkleBackground />
      <Layout
        title="What are you here for?"
        subtitle="Select your health goal"
        showBack
        onBack={() => navigate(-1)}
      >
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Categories Grid */}
        <div className="category-grid" style={{
          marginBottom: 40,
        }}>
          {categories.map((c, index) => (
            <div
              key={c.id}
              onClick={() => setSelected(c.id)}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              className="category-card"
              style={{
                background: isDark 
                  ? (selected === c.id 
                      ? (c.isHeroTraining ? `rgba(20, 10, 15, 0.9)` : 'rgba(20, 10, 15, 0.9)')
                      : 'rgba(0, 0, 0, 0.6)')
                  : (selected === c.id 
                      ? (c.isHeroTraining ? `linear-gradient(135deg, ${c.color}15 0%, ${c.color}25 100%)` : 'rgba(255, 255, 255, 0.95)')
                      : 'rgba(255, 255, 255, 0.6)'),
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                borderRadius: 20,
                padding: c.isHeroTraining ? '32px 24px' : '28px 24px',
                cursor: 'pointer',
                textAlign: 'center',
                border: selected === c.id
                  ? `3px solid ${c.color}`
                  : c.isHeroTraining
                    ? `2px solid ${c.color}50`
                    : (isDark ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid rgba(240, 105, 34, 0.1)'),
                boxShadow: selected === c.id
                  ? (isDark ? `0 0 40px ${c.color}40, inset 0 0 0 1px ${c.color}50` : `0 0 40px ${c.color}30, inset 0 0 0 1px ${c.color}`)
                  : hovered === c.id
                    ? (isDark ? '0 12px 40px rgba(0,0,0,0.6)' : '0 12px 40px rgba(240, 105, 34, 0.15)')
                    : c.isHeroTraining
                      ? `0 8px 30px ${c.color}15`
                      : (isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(240, 105, 34, 0.05)'),
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
                <div className="category-card-badge" style={{
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
              <div className="category-card-icon-box" style={{
                width: c.isHeroTraining ? 80 : 70,
                height: c.isHeroTraining ? 80 : 70,
                background: isDark ? `rgba(255, 255, 255, 0.05)` : `linear-gradient(135deg, ${c.color}15 0%, ${c.color}25 100%)`,
                borderRadius: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: c.color,
                boxShadow: isDark ? `0 4px 15px ${c.color}30` : 'none',
                border: isDark ? `1px solid ${c.color}40` : 'none',
              }}>
                <div style={{ transform: c.isHeroTraining ? 'scale(1.2)' : 'scale(1.1)' }}>
                  {c.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="category-card-title" style={{
                fontSize: c.isHeroTraining ? 20 : 17,
                fontWeight: 700,
                color: selected === c.id ? c.color : (isDark ? '#FFF' : '#111'),
                marginBottom: 6,
              }}>
                {c.title}
              </h3>

              {/* Description */}
              <p className="category-card-desc" style={{
                fontSize: 13,
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#666',
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
        {(() => {
          const activeCat = categories.find(c => c.id === selected);
          const activeColor = activeCat ? activeCat.color : '#F06922';
          
          return (
            <button
              onClick={handleContinue}
              disabled={!selected}
              className="category-btn"
              style={{
                width: '100%',
                background: selected
                  ? `linear-gradient(135deg, ${activeColor} 0%, ${activeColor}dd 100%)`
                  : (isDark ? 'rgba(255, 255, 255, 0.05)' : 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)'),
                border: selected ? 'none' : (isDark ? '1px solid rgba(255,255,255,0.1)' : 'none'),
                borderRadius: 16,
                padding: '20px',
                fontSize: 18,
                fontWeight: 800,
                color: selected 
                  ? '#FFF'
                  : (isDark ? 'rgba(255,255,255,0.3)' : 'var(--gray-400)'),
                cursor: selected ? 'pointer' : 'not-allowed',
                boxShadow: selected
                  ? (isDark ? `0 12px 40px ${activeColor}50` : `0 10px 30px ${activeColor}40`)
                  : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {selected === 'hero-training' ? `Start ${celebrityName} Challenge →` : 'Continue →'}
            </button>
          );
        })()}
      </div>

      <style>{`
        .category-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        @media (max-width: 600px) {
          .category-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .category-card {
            padding: 18px 20px !important;
          }
          .category-card-icon-box {
            width: 56px !important;
            height: 56px !important;
            border-radius: 16px !important;
            margin-bottom: 12px !important;
          }
          .category-card-icon-box svg {
            width: 24px !important;
            height: 24px !important;
          }
          .category-card-title {
            font-size: 16px !important;
            margin-bottom: 4px !important;
          }
          .category-card-desc {
            font-size: 12.5px !important;
          }
          .category-card-badge {
            padding: 4px 12px !important;
            font-size: 10px !important;
          }
          .category-btn {
            padding: 15px !important;
            font-size: 15px !important;
            border-radius: 12px !important;
          }
        }
      `}</style>
    </Layout>
    </>
  );
}
