import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

/**
 * S34 — Manual Acne Type Selection
 * When photo upload is skipped, user picks acne type manually.
 */
export default function AcneManualSelectScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const types = [
    {
      id: 'active_acne',
      icon: '🔴',
      title: 'Active Acne',
      desc: 'Red, inflamed pimples and breakouts',
      color: '#EF4444',
      tips: ['Salicylic acid cleanser', 'Benzoyl peroxide treatment', 'Anti-inflammatory serum'],
    },
    {
      id: 'blackheads',
      icon: '⚫',
      title: 'Blackheads',
      desc: 'Open comedones, clogged pores',
      color: '#374151',
      tips: ['BHA exfoliant', 'Clay mask weekly', 'Oil-free moisturizer'],
    },
    {
      id: 'whiteheads',
      icon: '⚪',
      title: 'Whiteheads',
      desc: 'Closed comedones under the surface',
      color: 'var(--gray-400)',
      tips: ['Gentle retinol', 'Non-comedogenic products', 'Chemical exfoliation'],
    },
    {
      id: 'acne_scars',
      icon: '🟤',
      title: 'Acne Scars',
      desc: 'Post-acne marks and dark spots',
      color: '#92400E',
      tips: ['Vitamin C serum', 'Niacinamide treatment', 'SPF 50 sunscreen daily'],
    },
    {
      id: 'mixed',
      icon: '🎨',
      title: 'Mixed Types',
      desc: 'Combination of multiple concerns',
      color: '#8B5CF6',
      tips: ['Multi-step routine', 'Zone-specific treatment', 'Gentle cleanser base'],
    },
  ];

  const handleContinue = () => {
    if (!selected) return;
    const sel = types.find((t) => t.id === selected);
    localStorage.setItem('acneAnalysis', JSON.stringify({
      type: selected,
      severity: 'moderate',
      location: ['face'],
      confidence: 1.0,
      lesionCount: 0,
      source: 'manual',
      recommendations: sel?.tips || [],
    }));
    navigate('/acne-treatment');
  };

  return (
    <Layout title="🧴 Select Skin Concern" subtitle="Pick the one that best matches" showBack onBack={() => navigate(-1)}>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Type cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {types.map((t) => (
            <div
              key={t.id}
              onClick={() => setSelected(t.id)}
              onMouseEnter={() => setHovered(t.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: selected === t.id
                  ? `linear-gradient(135deg, ${t.color}10 0%, ${t.color}18 100%)`
                  : 'var(--white)',
                border: selected === t.id ? `3px solid ${t.color}` : '2px solid #E5E7EB',
                borderRadius: 16,
                padding: '20px 24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transition: 'all 0.3s ease',
                transform: hovered === t.id ? 'translateX(6px)' : 'translateX(0)',
                boxShadow: selected === t.id ? `0 8px 24px ${t.color}20` : '0 2px 8px rgba(0,0,0,0.04)',
                position: 'relative',
              }}
            >
              {/* Icon */}
              <div style={{
                width: 56,
                height: 56,
                background: `${t.color}15`,
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                flexShrink: 0,
              }}>
                {t.icon}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: selected === t.id ? t.color : '#2D3436', marginBottom: 4 }}>
                  {t.title}
                </h3>
                <p style={{ fontSize: 13, color: '#636E72', lineHeight: 1.4 }}>
                  {t.desc}
                </p>
              </div>

              {/* Check */}
              {selected === t.id && (
                <div style={{
                  width: 28,
                  height: 28,
                  background: t.color,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Preview tips if selected */}
        {selected && (
          <div style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(240,105,34,0.15)',
            borderRadius: 16,
            padding: '20px 24px',
            animation: 'fadeSlideUp 0.3s ease',
          }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: '#F06922', marginBottom: 12 }}>
              Quick tips for {types.find(t => t.id === selected)?.title}:
            </h4>
            {types.find(t => t.id === selected)?.tips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 14, color: '#2D3436' }}>
                <span style={{ color: '#F06922' }}>•</span> {tip}
              </div>
            ))}
          </div>
        )}

        {/* Continue */}
        <button
          onClick={handleContinue}
          disabled={!selected}
          style={{
            width: '100%',
            background: selected
              ? 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)'
              : 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
            border: 'none',
            borderRadius: 16,
            padding: '18px',
            fontSize: 17,
            fontWeight: 700,
            color: selected ? '#FFF' : 'var(--gray-400)',
            cursor: selected ? 'pointer' : 'not-allowed',
            boxShadow: selected ? '0 8px 30px rgba(240,105,34,0.3)' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          Get My Skincare Plan →
        </button>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Layout>
  );
}
