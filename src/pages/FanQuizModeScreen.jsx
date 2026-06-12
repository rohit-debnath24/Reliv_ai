import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function FanQuizModeScreen() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);
    const [hovered, setHovered] = useState(null);
    const [showCards, setShowCards] = useState(false);

    const modes = [
        {
            id: 'easy',
            title: 'Easy Mode',
            desc: 'Relaxed version with flexible timing',
            icon: '😊',
            color: '#22C55E',
            price: '₹7',
        },
        {
            id: 'standard',
            title: 'Standard Mode',
            desc: 'Balanced celebrity-style routine',
            icon: '💪',
            color: '#3B82F6',
            price: '₹12',
            popular: true,
        },
        {
            id: 'extreme',
            title: 'Extreme Mode',
            desc: 'Full celebrity workout + diet',
            icon: '🔥',
            color: '#EF4444',
            price: '₹15',
        },
    ];

    useEffect(() => {
        setTimeout(() => setShowCards(true), 100);
    }, []);

    const handleContinue = () => {
        if (!selected) return;
        localStorage.setItem('fanQuizMode', selected);
        navigate('/daily-pay');
    };

    return (
        <Layout
            title="Choose Difficulty"
            subtitle="How intense do you want today?"
            showBack
            onBack={() => navigate('/fan-quiz-type')}
        >
            <div style={{ maxWidth: 550, margin: '0 auto' }}>
                {/* Mode Cards */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 18,
                    marginBottom: 36,
                }}>
                    {modes.map((mode, i) => (
                        <div
                            key={mode.id}
                            onClick={() => setSelected(mode.id)}
                            onMouseEnter={() => setHovered(mode.id)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                background: selected === mode.id
                                    ? 'linear-gradient(135deg, #FFFFFF 0%, #FFF9F5 100%)'
                                    : '#FFFFFF',
                                borderRadius: 20,
                                padding: '28px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 20,
                                cursor: 'pointer',
                                border: selected === mode.id
                                    ? `3px solid ${mode.color}`
                                    : '2px solid #E5E7EB',
                                boxShadow: selected === mode.id
                                    ? `0 12px 40px ${mode.color}20`
                                    : hovered === mode.id
                                        ? '0 8px 30px rgba(0,0,0,0.08)'
                                        : '0 4px 15px rgba(0,0,0,0.04)',
                                transform: showCards
                                    ? selected === mode.id ? 'scale(1.02)' : 'scale(1)'
                                    : 'translateX(-20px)',
                                opacity: showCards ? 1 : 0,
                                transition: 'all 0.4s ease',
                                transitionDelay: `${i * 0.08}s`,
                                position: 'relative',
                            }}
                        >
                            {/* Popular Badge */}
                            {mode.popular && (
                                <div style={{
                                    position: 'absolute',
                                    top: -10,
                                    right: 20,
                                    background: mode.color,
                                    color: '#FFF',
                                    fontSize: 10,
                                    fontWeight: 700,
                                    padding: '5px 12px',
                                    borderRadius: 20,
                                    textTransform: 'uppercase',
                                }}>
                                    Popular
                                </div>
                            )}

                            {/* Icon */}
                            <div style={{
                                width: 64,
                                height: 64,
                                background: `linear-gradient(135deg, ${mode.color}15 0%, ${mode.color}25 100%)`,
                                borderRadius: 18,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 32,
                                flexShrink: 0,
                            }}>
                                {mode.icon}
                            </div>

                            {/* Content */}
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 4 }}>
                                    {mode.title}
                                </h3>
                                <p style={{ fontSize: 14, color: '#666' }}>{mode.desc}</p>
                            </div>

                            {/* Price */}
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: 24, fontWeight: 800, color: mode.color }}>{mode.price}</p>
                            </div>

                            {/* Selection Indicator */}
                            {selected === mode.id && (
                                <div style={{
                                    position: 'absolute',
                                    top: 28,
                                    left: 28,
                                    width: 24,
                                    height: 24,
                                    background: mode.color,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

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
                        padding: '20px',
                        fontSize: 18,
                        fontWeight: 700,
                        color: selected ? '#FFFFFF' : '#9CA3AF',
                        cursor: selected ? 'pointer' : 'not-allowed',
                        boxShadow: selected ? '0 10px 40px rgba(240, 105, 34, 0.35)' : 'none',
                        transition: 'all 0.3s ease',
                    }}
                >
                    Continue
                </button>
            </div>
        </Layout>
    );
}
