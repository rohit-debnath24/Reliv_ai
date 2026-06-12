import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function FanQuizDetailsScreen() {
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState(false);

    const celebrity = localStorage.getItem('celebrity') || 'virat';
    const celebInfo = {
        virat: { name: 'Virat Kohli', emoji: '🏏', color: '#1E40AF', style: 'Fitness King' },
        alia: { name: 'Alia Bhatt', emoji: '🧘‍♀️', color: '#DB2777', style: 'Lean & Graceful' },
        salman: { name: 'Salman Khan', emoji: '💪', color: '#16A34A', style: 'Muscle Mode' },
        deepika: { name: 'Deepika Padukone', emoji: '✨', color: '#9333EA', style: 'Tall & Toned' },
        hrithik: { name: 'Hrithik Roshan', emoji: '🔥', color: '#DC2626', style: 'Greek God' },
        priyanka: { name: 'Priyanka Chopra', emoji: '🌟', color: '#F59E0B', style: 'Global Star' },
    };
    const info = celebInfo[celebrity] || celebInfo.virat;

    useEffect(() => {
        setTimeout(() => setShowDetails(true), 100);
    }, []);

    const schedule = [
        { time: '7:00 AM', title: 'Morning Routine', desc: 'Wake up ritual & hydration' },
        { time: '8:00 AM', title: 'Breakfast', desc: `${info.name}-style power breakfast` },
        { time: '10:00 AM', title: 'Snack', desc: 'Energy boost' },
        { time: '1:00 PM', title: 'Lunch', desc: 'Celebrity-approved meal' },
        { time: '4:00 PM', title: 'Snack', desc: 'Pre-workout fuel' },
        { time: '6:00 PM', title: 'Workout', desc: `${info.name}'s training style` },
        { time: '8:00 PM', title: 'Dinner', desc: 'Light & nutritious' },
    ];

    return (
        <Layout
            title={`${info.emoji} ${info.name} Day`}
            subtitle={info.style}
            showBack
            onBack={() => navigate('/fan-quiz-type')}
        >
            <div style={{ maxWidth: 600, margin: '0 auto' }}>
                {/* Hero Card */}
                <div style={{
                    background: `linear-gradient(135deg, ${info.color}08 0%, ${info.color}15 100%)`,
                    borderRadius: 24,
                    padding: '32px',
                    marginBottom: 28,
                    border: `2px solid ${info.color}20`,
                    textAlign: 'center',
                    opacity: showDetails ? 1 : 0,
                    transform: showDetails ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.5s ease',
                }}>
                    <div style={{
                        width: 100,
                        height: 100,
                        background: `linear-gradient(135deg, ${info.color}20 0%, ${info.color}30 100%)`,
                        borderRadius: 28,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 50,
                        margin: '0 auto 20px',
                    }}>
                        {info.emoji}
                    </div>
                    <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111', marginBottom: 8 }}>
                        Live Like {info.name}
                    </h2>
                    <p style={{ fontSize: 14, color: '#666' }}>
                        Experience a full day following their diet and fitness routine
                    </p>
                </div>

                {/* Schedule */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: 24,
                    padding: '32px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                    marginBottom: 28,
                }}>
                    <h3 style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: '#9CA3AF',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: 24,
                    }}>
                        📅 Your Day Schedule
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {schedule.map((item, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 16,
                                    opacity: showDetails ? 1 : 0,
                                    transform: showDetails ? 'translateX(0)' : 'translateX(-10px)',
                                    transition: 'all 0.4s ease',
                                    transitionDelay: `${i * 0.05}s`,
                                }}
                            >
                                <div style={{
                                    width: 70,
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: info.color,
                                    flexShrink: 0,
                                }}>
                                    {item.time}
                                </div>
                                <div style={{
                                    flex: 1,
                                    padding: '14px 18px',
                                    background: '#FAFAFA',
                                    borderRadius: 12,
                                }}>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 2 }}>
                                        {item.title}
                                    </p>
                                    <p style={{ fontSize: 12, color: '#666' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <button
                    onClick={() => navigate('/daily-pay')}
                    style={{
                        width: '100%',
                        background: `linear-gradient(135deg, ${info.color} 0%, ${info.color}DD 100%)`,
                        border: 'none',
                        borderRadius: 16,
                        padding: '20px',
                        fontSize: 18,
                        fontWeight: 700,
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        boxShadow: `0 10px 40px ${info.color}40`,
                    }}
                >
                    Get This Plan
                </button>
            </div>
        </Layout>
    );
}
