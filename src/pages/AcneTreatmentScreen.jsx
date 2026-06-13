import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

/**
 * S36 — Acne Treatment / Skincare Routine
 * Shows morning & night skincare routines and pro tips.
 */
export default function AcneTreatmentScreen() {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('morning');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('acneAnalysis');
    if (data) setAnalysis(JSON.parse(data));
    setTimeout(() => setShowContent(true), 200);
  }, []);

  const typeLabel = {
    active_acne: 'Active Acne',
    blackheads: 'Blackheads',
    whiteheads: 'Whiteheads',
    acne_scars: 'Acne Scars',
    mixed: 'Mixed Types',
  };

  const routines = {
    morning: [
      { step: 1, name: 'Gentle Cleanser', time: '1 min', desc: 'Wash with lukewarm water and a pH-balanced cleanser', icon: '🧼' },
      { step: 2, name: 'Toner (optional)', time: '30 sec', desc: 'Alcohol-free toner to balance skin pH', icon: '💧' },
      { step: 3, name: 'Spot Treatment', time: '1 min', desc: 'Apply benzoyl peroxide (2.5%) to active spots', icon: '💊' },
      { step: 4, name: 'Moisturizer', time: '30 sec', desc: 'Oil-free, non-comedogenic moisturizer', icon: '🧴' },
      { step: 5, name: 'Sunscreen SPF 50', time: '1 min', desc: 'Essential! UV protection prevents scarring', icon: '☀️' },
    ],
    night: [
      { step: 1, name: 'Oil Cleanser', time: '1 min', desc: 'Remove sunscreen and makeup (double cleanse)', icon: '🫧' },
      { step: 2, name: 'Water Cleanser', time: '1 min', desc: 'Second cleanse with gentle face wash', icon: '🧼' },
      { step: 3, name: 'Exfoliant (2x/week)', time: '30 sec', desc: 'Salicylic acid (BHA) or glycolic acid (AHA)', icon: '✨' },
      { step: 4, name: 'Treatment Serum', time: '30 sec', desc: 'Niacinamide or retinol (alternate nights)', icon: '💉' },
      { step: 5, name: 'Night Moisturizer', time: '30 sec', desc: 'Heavier moisturizer to repair overnight', icon: '🌙' },
    ],
  };

  const proTips = [
    { icon: '📱', tip: 'Clean your phone screen daily — bacteria transfers to cheeks' },
    { icon: '🛏️', tip: 'Change pillowcase every 3-4 days' },
    { icon: '🚰', tip: 'Drink 8+ glasses of water daily' },
    { icon: '🍫', tip: 'Reduce sugar and dairy intake for 2 weeks' },
    { icon: '🙌', tip: 'NEVER pop pimples — it causes scarring' },
    { icon: '🧣', tip: 'Don\'t touch your face throughout the day' },
  ];

  const tabs = [
    { id: 'morning', label: '🌅 Morning', color: '#FFA500' },
    { id: 'night', label: '🌙 Night', color: '#6366F1' },
  ];

  return (
    <Layout title="🧴 Your Skincare Plan" subtitle={analysis ? typeLabel[analysis.type] || 'Custom Plan' : 'Personalized Routine'} showBack onBack={() => navigate(-1)}>
      <div style={{
        maxWidth: 640,
        margin: '0 auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        opacity: showContent ? 1 : 0,
        transform: showContent ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.5s ease',
      }}>
        {/* Tab switcher */}
        <div style={{
          display: 'flex',
          gap: 8,
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(12px)',
          borderRadius: 16,
          padding: 6,
          border: '1px solid #E5E7EB',
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: 12,
                border: 'none',
                background: activeTab === tab.id
                  ? `linear-gradient(135deg, ${tab.color} 0%, ${tab.color}dd 100%)`
                  : 'transparent',
                color: activeTab === tab.id ? '#FFF' : '#636E72',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? `0 4px 16px ${tab.color}40` : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Routine steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {routines[activeTab].map((step, idx) => (
            <div
              key={step.step}
              style={{
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                background: 'var(--white)',
                borderRadius: 16,
                padding: '18px 20px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                animation: `fadeSlideIn 0.3s ease ${idx * 0.06}s both`,
              }}
            >
              {/* Step number / icon */}
              <div style={{
                width: 50,
                height: 50,
                background: activeTab === 'morning' ? '#FFF7ED' : '#EEF2FF',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
                flexShrink: 0,
              }}>
                {step.icon}
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: '#2D3436' }}>
                    Step {step.step}: {step.name}
                  </h4>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--gray-400)',
                    background: '#F3F4F6',
                    padding: '3px 8px',
                    borderRadius: 6,
                  }}>
                    ~{step.time}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: '#636E72', lineHeight: 1.4 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Total time */}
        <div style={{
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 600,
          color: '#636E72',
          background: '#F9FAFB',
          padding: '12px',
          borderRadius: 12,
        }}>
          ⏱️ Total routine: ~{activeTab === 'morning' ? '4' : '4.5'} minutes
        </div>

        {/* Pro Tips */}
        <div style={{
          background: 'linear-gradient(135deg, #FFF9F5 0%, #FFEEE5 100%)',
          borderRadius: 20,
          padding: '24px',
          border: '1px solid rgba(240,105,34,0.12)',
        }}>
          <h3 style={{ fontSize: 17, fontWeight: 800, color: '#F06922', marginBottom: 16 }}>
            🔥 Pro Tips
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {proTips.map((tip, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
                fontSize: 13,
                color: '#2D3436',
                lineHeight: 1.5,
                background: 'var(--white)',
                borderRadius: 12,
                padding: '12px',
                border: '1px solid #E5E7EB',
              }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{tip.icon}</span>
                <span>{tip.tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp reminder option */}
        <div style={{
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          borderRadius: 16,
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(37,211,102,0.3)',
          transition: 'transform 0.2s',
        }}
          onClick={() => {
            localStorage.setItem('category', 'acne');
            navigate('/meal-freq');
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <span style={{ fontSize: 32 }}>💬</span>
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: '#FFF', marginBottom: 4 }}>
              Get Daily Reminders on WhatsApp
            </h4>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>
              Morning & night routine alerts + progress tips
            </p>
          </div>
          <span style={{ fontSize: 20, color: '#FFF', marginLeft: 'auto' }}>→</span>
        </div>

        {/* Continue button */}
        <button
          onClick={() => navigate('/meal-freq')}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
            border: 'none',
            borderRadius: 16,
            padding: '18px',
            fontSize: 17,
            fontWeight: 700,
            color: '#FFF',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(240,105,34,0.3)',
          }}
        >
          Continue Setup →
        </button>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </Layout>
  );
}
