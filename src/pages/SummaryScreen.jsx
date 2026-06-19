import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SparkleBackground from '../components/SparkleBackground';

export default function SummaryScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showItems, setShowItems] = useState(false);

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

  const planType = localStorage.getItem('planType') || 'solo';
  const category = localStorage.getItem('category') || 'weight-loss';
  const mealTimes = JSON.parse(localStorage.getItem('mealTimes') || '{"breakfast":"08:00","lunch":"13:00","dinner":"20:00"}');

  const planInfo = {
    solo: { name: 'Solo Plan', price: '₹29', icon: '👤', color: '#F06922' },
    couple: { name: 'Couple Plan', price: '₹54', icon: '💑', color: '#EC4899' },
    friends: { name: 'Friends Plan', price: '₹84', icon: '👥', color: '#8B5CF6' },
    daily: { name: 'Daily Plan', price: '₹15', icon: '⚡', color: '#F59E0B' },
  };

  const categoryNames = {
    'muscle': '💪 Build Muscle / Abs',
    'weight-loss': '🥗 Lose Weight / Diet',
    'acne': '🧴 Clear Acne / Skin',
    'first-aid': '🩹 First Aid / Quick Help',
    'general': '💊 General Health',
  };

  const plan = planInfo[planType] || planInfo.solo;

  useEffect(() => {
    setTimeout(() => setShowItems(true), 100);
  }, []);

  const handleActivate = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/activation');
    }, 1500);
  };

  const formatTime = (time) => {
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  return (
    <>
      <SparkleBackground isDark={isDark} />
      <Layout
        title="Plan Summary"
        subtitle="Review your personalized health plan"
        showBack
        onBack={() => navigate('/meal-time')}
      >
        <div style={{ maxWidth: 580, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Main Card */}
        <div style={{
          background: isDark ? 'rgba(20, 10, 15, 0.8)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderRadius: 28,
          padding: '36px 32px',
          boxShadow: isDark ? `0 0 60px ${plan.color}25, inset 0 0 0 1px ${plan.color}35` : `0 20px 60px ${plan.color}15, inset 0 0 0 1px rgba(255, 255, 255, 1)`,
          border: 'none',
          marginBottom: 28,
        }}>
          {/* Plan Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            paddingBottom: 24,
            marginBottom: 24,
            borderBottom: isDark ? `1px solid ${plan.color}30` : '1px solid #F5F5F5',
            opacity: showItems ? 1 : 0,
            transform: showItems ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.4s ease',
          }}>
            <div style={{
              width: 64,
              height: 64,
              background: isDark ? `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}80 100%)` : `linear-gradient(135deg, ${plan.color}15 0%, ${plan.color}25 100%)`,
              borderRadius: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
              boxShadow: isDark ? `0 8px 20px ${plan.color}40` : 'none',
            }}>
              {plan.icon}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: isDark ? '#FFF' : '#111', marginBottom: 4 }}>
                {plan.name}
              </h2>
              <p style={{ fontSize: 14, color: isDark ? 'rgba(255,255,255,0.6)' : '#666' }}>7 days • Starting today</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 28, fontWeight: 800, color: plan.color }}>{plan.price}</p>
              <p style={{ fontSize: 12, color: isDark ? 'rgba(255,255,255,0.4)' : 'var(--gray-400)' }}>per week</p>
            </div>
          </div>

          {/* Details */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            marginBottom: 28,
          }}>
            {[
              { label: 'Focus Area', value: categoryNames[category] || category, delay: 0.1 },
              { label: 'Breakfast Reminder', value: formatTime(mealTimes.breakfast), delay: 0.15 },
              { label: 'Lunch Reminder', value: formatTime(mealTimes.lunch), delay: 0.2 },
              { label: 'Dinner Reminder', value: formatTime(mealTimes.dinner), delay: 0.25 },
            ].map((item, i) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'var(--gray-50)',
                  borderRadius: 14,
                  border: isDark ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  opacity: showItems ? 1 : 0,
                  transform: showItems ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 0.4s ease',
                  transitionDelay: `${item.delay}s`,
                }}
              >
                <span style={{ fontSize: 14, color: isDark ? 'rgba(255,255,255,0.6)' : '#666', fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontSize: 15, color: isDark ? '#FFF' : '#111', fontWeight: 700 }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* What's Included */}
          <div style={{
            background: isDark ? 'rgba(16, 185, 129, 0.15)' : 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
            borderRadius: 16,
            padding: '20px 24px',
            marginBottom: 28,
            border: isDark ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(34, 197, 94, 0.2)',
            opacity: showItems ? 1 : 0,
            transform: showItems ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.4s ease 0.3s',
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: isDark ? '#34D399' : '#059669', marginBottom: 14 }}>
              ✅ What's Included
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {['Daily meal plans', 'WhatsApp reminders', 'Progress tracking', 'AI coaching'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: isDark ? '#34D399' : '#22C55E', fontSize: 12 }}>✓</span>
                  <span style={{ fontSize: 13, color: isDark ? 'rgba(255,255,255,0.85)' : '#065F46', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activate Button */}
          <button
            onClick={handleActivate}
            disabled={loading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
              border: 'none',
              borderRadius: 16,
              padding: '22px',
              fontSize: 18,
              fontWeight: 700,
              color: 'var(--white)',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: isDark ? '0 12px 40px rgba(34, 197, 94, 0.4)' : '0 10px 40px rgba(34, 197, 94, 0.35)',
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
                  width: 24,
                  height: 24,
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'var(--white)',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                Activating Your Plan...
              </>
            ) : (
              <>
                ✨ Activate My Plan
              </>
            )}
          </button>
        </div>

        {/* Trust Badges */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          opacity: showItems ? 1 : 0,
          transform: showItems ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.4s ease 0.4s',
        }}>
          {[
            { icon: '🔒', text: 'Secure' },
            { icon: '📱', text: 'WhatsApp' },
            { icon: '❤️', text: '50K+ Users' },
          ].map((badge, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13,
                color: 'var(--gray-400)',
                fontWeight: 500,
              }}
            >
              <span>{badge.icon}</span>
              {badge.text}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
    </>
  );
}
