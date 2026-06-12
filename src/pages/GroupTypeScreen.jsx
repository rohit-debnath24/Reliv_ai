import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function GroupTypeScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [showCards, setShowCards] = useState(false);

  const plans = [
    {
      id: "solo",
      title: "Solo",
      desc: "Personalized AI coaching just for you",
      price: "₹29",
      period: "/ week",
      dailyPrice: "₹4.14/day",
      tag: null,
      icon: "👤",
      color: "#3B82F6",
      features: ["Personal meal plans", "Daily reminders", "Progress tracking"],
      path: "/weekly-solo-pay",
    },
    {
      id: "partner",
      title: "Me + Partner",
      desc: "Transform together with your loved one",
      price: "₹54",
      period: "/ week",
      dailyPrice: "₹3.86/day each",
      tag: "Most Popular",
      tagColor: "#22C55E",
      icon: "💑",
      color: "#EC4899",
      features: ["Both partners covered", "Individual reminders", "Couple challenges"],
      path: "/couple-phone",
    },
    {
      id: "friends",
      title: "Me + Friends",
      desc: "Compete & motivate your squad",
      price: "from ₹79",
      period: "/ week",
      dailyPrice: "₹2.26/day each (5 friends)",
      tag: "Best Value",
      tagColor: "#8B5CF6",
      icon: "👥",
      color: "#8B5CF6",
      features: ["2-5 friends", "Group leaderboard", "Squad competitions"],
      path: "/friend-size",
    },
    {
      id: "daily",
      title: "Just for Today",
      desc: "Train like your favorite celebrity for 1 day",
      price: "₹7-15",
      period: "/ day",
      dailyPrice: "One-time only",
      tag: "Try First",
      tagColor: "#F06922",
      icon: "⚡",
      color: "#F06922",
      features: ["Pick your idol", "Full day plan", "Zero commitment"],
      path: "/fan-quiz-type",
    },
  ];

  useEffect(() => {
    setTimeout(() => setShowCards(true), 100);
  }, []);

  const handleContinue = () => {
    if (!selected || loading) return;
    setLoading(true);
    localStorage.setItem("groupType", selected);
    setTimeout(() => {
      const plan = plans.find((p) => p.id === selected);
      if (plan) navigate(plan.path);
    }, 600);
  };

  return (
    <Layout
      title="Choose Your Plan"
      subtitle="Select how you want to start your health journey"
      showBack
      onBack={() => navigate("/")}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Plan Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
          marginBottom: 40,
        }}>
          {plans.map((p, index) => (
            <div
              key={p.id}
              onClick={() => !loading && setSelected(p.id)}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: selected === p.id
                  ? `linear-gradient(135deg, ${p.color}08 0%, ${p.color}15 100%)`
                  : '#FFFFFF',
                borderRadius: 24,
                padding: '32px 28px',
                cursor: loading ? 'wait' : 'pointer',
                border: selected === p.id
                  ? `3px solid ${p.color}`
                  : '2px solid #E5E7EB',
                boxShadow: selected === p.id
                  ? `0 20px 60px ${p.color}25`
                  : hovered === p.id
                    ? '0 16px 50px rgba(0,0,0,0.1)'
                    : '0 4px 20px rgba(0,0,0,0.04)',
                transform: showCards
                  ? selected === p.id
                    ? 'scale(1.02)'
                    : hovered === p.id
                      ? 'translateY(-8px)'
                      : 'translateY(0)'
                  : 'translateY(30px)',
                opacity: showCards ? 1 : 0,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: `${index * 0.08}s`,
                position: 'relative',
              }}
            >
              {/* Tag Badge */}
              {p.tag && (
                <div style={{
                  position: 'absolute',
                  top: -12,
                  right: 20,
                  background: p.tagColor,
                  color: '#FFFFFF',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: 20,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  boxShadow: `0 4px 15px ${p.tagColor}40`,
                }}>
                  {p.tag}
                </div>
              )}

              {/* Selection Indicator */}
              {selected === p.id && (
                <div style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  width: 28,
                  height: 28,
                  background: p.color,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 15px ${p.color}40`,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              )}

              {/* Icon */}
              <div style={{
                width: 64,
                height: 64,
                background: `linear-gradient(135deg, ${p.color}15 0%, ${p.color}25 100%)`,
                borderRadius: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                marginBottom: 20,
              }}>
                {p.icon}
              </div>

              {/* Title & Description */}
              <h3 style={{
                fontSize: 22,
                fontWeight: 800,
                color: selected === p.id ? p.color : '#111',
                marginBottom: 8,
              }}>
                {p.title}
              </h3>
              <p style={{
                fontSize: 14,
                color: '#666',
                marginBottom: 20,
                lineHeight: 1.5,
              }}>
                {p.desc}
              </p>

              {/* Pricing */}
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 6,
                marginBottom: 8,
              }}>
                <span style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: p.color,
                }}>
                  {p.price}
                </span>
                <span style={{
                  fontSize: 14,
                  color: '#9CA3AF',
                  fontWeight: 500,
                }}>
                  {p.period}
                </span>
              </div>

              {/* Daily Price Breakdown */}
              <div style={{
                background: `${p.color}10`,
                borderRadius: 10,
                padding: '8px 14px',
                display: 'inline-block',
                marginBottom: 20,
              }}>
                <span style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: p.color,
                }}>
                  💰 {p.dailyPrice}
                </span>
              </div>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {p.features.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      fontSize: 13,
                      color: '#555',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={p.color}>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selected || loading}
          style={{
            width: '100%',
            background: selected
              ? 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)'
              : 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
            border: 'none',
            borderRadius: 18,
            padding: '22px',
            fontSize: 18,
            fontWeight: 700,
            color: selected ? '#FFFFFF' : '#9CA3AF',
            cursor: selected && !loading ? 'pointer' : 'not-allowed',
            boxShadow: selected ? '0 12px 45px rgba(240, 105, 34, 0.35)' : 'none',
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
                width: 22,
                height: 22,
                border: '3px solid rgba(255,255,255,0.3)',
                borderTopColor: '#FFFFFF',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              Loading...
            </>
          ) : (
            <>Continue →</>
          )}
        </button>

        {/* Trust Badges */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          marginTop: 32,
          padding: '20px',
        }}>
          {[
            { icon: '🔒', text: 'Secure Payment' },
            { icon: '🚫', text: 'No Auto-Renewal' },
            { icon: '💬', text: 'WhatsApp Support' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                color: '#666',
                fontWeight: 500,
              }}
            >
              <span>{item.icon}</span>
              {item.text}
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
  );
}
