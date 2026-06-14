import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

import Silk from './Silk';

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
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
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
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
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
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20v-2a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v2"></path>
          <circle cx="8" cy="9" r="4"></circle>
          <path d="M24 20v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 5.13a4 4 0 0 1 0 7.75"></path>
          <path d="M20 12v-2a4 4 0 0 0-4-4h-2"></path>
        </svg>
      ),
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
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      ),
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
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
        <Silk
          speed={5}
          scale={1}
          color="#ff6627"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <Layout
        title="Choose Your Plan"
        subtitle="Select how you want to start your health journey"
        titleColor="#ffffff"
        subtitleColor="rgba(255, 255, 255, 0.9)"
        showBack
        onBack={() => navigate("/")}
      >
      <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Plan Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          marginBottom: 48,
        }}>
          {plans.map((p, index) => (
            <div
              key={p.id}
              onClick={() => !loading && setSelected(p.id)}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: selected === p.id ? 'var(--white)' : 'var(--gray-50)',
                borderRadius: 28,
                padding: '36px 32px',
                cursor: loading ? 'wait' : 'pointer',
                border: selected === p.id
                  ? '2px solid var(--primary)'
                  : '1px solid var(--gray-200)',
                boxShadow: selected === p.id
                  ? 'var(--shadow-glow)'
                  : hovered === p.id
                    ? 'var(--shadow-lg)'
                    : 'var(--shadow-md)',
                transform: showCards
                  ? selected === p.id
                    ? 'translateY(-4px)'
                    : hovered === p.id
                      ? 'translateY(-6px)'
                      : 'translateY(0)'
                  : 'translateY(30px)',
                opacity: showCards ? 1 : 0,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${index * 0.08}s`,
                position: 'relative',
              }}
            >
              {/* Tag Badge */}
              {p.tag && (
                <div style={{
                  position: 'absolute',
                  top: -14,
                  right: 24,
                  background: 'var(--primary)',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: 20,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  {p.tag}
                </div>
              )}

              {/* Selection Indicator */}
              {selected === p.id && (
                <div style={{
                  position: 'absolute',
                  top: 24,
                  right: 24,
                  width: 28,
                  height: 28,
                  background: 'var(--primary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              )}

              {/* Icon */}
              <div style={{
                width: 56,
                height: 56,
                background: selected === p.id ? 'var(--primary)' : 'var(--cream-200)',
                color: selected === p.id ? '#FFF' : 'var(--primary)',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                border: selected === p.id ? 'none' : '1px solid var(--cream-400)',
                transition: 'all 0.3s ease',
              }}>
                {p.icon}
              </div>

              {/* Title & Description */}
              <h3 style={{
                fontSize: 22,
                fontWeight: 800,
                color: 'var(--gray-900)',
                marginBottom: 10,
              }}>
                {p.title}
              </h3>
              <p style={{
                fontSize: 14,
                color: 'var(--gray-500)',
                marginBottom: 24,
                lineHeight: 1.6,
              }}>
                {p.desc}
              </p>

              {/* Pricing */}
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 6,
                marginBottom: 12,
              }}>
                <span style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: 'var(--gray-900)',
                }}>
                  {p.price}
                </span>
                <span style={{
                  fontSize: 14,
                  color: 'var(--gray-400)',
                  fontWeight: 600,
                }}>
                  {p.period}
                </span>
              </div>

              {/* Daily Price Breakdown */}
              <div style={{
                background: 'var(--gray-100)',
                border: '1px solid var(--gray-200)',
                borderRadius: 8,
                padding: '6px 12px',
                display: 'inline-block',
                marginBottom: 24,
              }}>
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--gray-600)',
                }}>
                  {p.dailyPrice}
                </span>
              </div>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {p.features.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      fontSize: 14,
                      color: 'var(--gray-600)',
                      fontWeight: 500,
                    }}
                  >
                    <div style={{
                      width: 20, height: 20,
                      borderRadius: '50%',
                      background: 'var(--cream-200)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--primary)',
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
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
              ? 'var(--primary)'
              : 'var(--gray-200)',
            border: 'none',
            borderRadius: 18,
            padding: '22px',
            fontSize: 18,
            fontWeight: 700,
            color: selected ? '#FFF' : 'var(--gray-400)',
            cursor: selected && !loading ? 'pointer' : 'not-allowed',
            boxShadow: selected ? 'var(--shadow-glow)' : 'none',
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
                borderTopColor: 'var(--white)',
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
            { 
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>, 
              text: 'Secure Payment' 
            },
            { 
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>, 
              text: 'No Auto-Renewal' 
            },
            { 
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>, 
              text: 'WhatsApp Support' 
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                color: 'var(--gray-500)',
                fontWeight: 500,
              }}
            >
              <span style={{ color: 'var(--gray-400)', display: 'flex' }}>{item.icon}</span>
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
    </>
  );
}
