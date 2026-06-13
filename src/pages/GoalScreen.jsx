import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function GoalScreen() {
    const navigate = useNavigate();
    const [goals, setGoals] = useState([]);
    const [showOptions, setShowOptions] = useState(false);

    const category = localStorage.getItem('category') || 'weight-loss';

    const goalOptions = {
        'weight-loss': [
            { id: 'lose-5kg', title: 'Lose 5kg', desc: 'Achievable in 4-6 weeks', icon: '📉' },
            { id: 'lose-10kg', title: 'Lose 10kg', desc: 'Steady 2-3 month journey', icon: '🔥' },
            { id: 'lose-15kg', title: 'Lose 15kg+', desc: 'Long-term transformation', icon: '💪' },
        ],
        'muscle-gain': [
            { id: 'tone', title: 'Get Toned', desc: 'Build lean muscle', icon: '💪' },
            { id: 'bulk', title: 'Bulk Up', desc: 'Serious mass gain', icon: '🏋️' },
            { id: 'strength', title: 'Get Stronger', desc: 'Focus on power', icon: '⚡' },
        ],
        'healthy-eating': [
            { id: 'balanced', title: 'Balanced Diet', desc: 'All-round nutrition', icon: '🥗' },
            { id: 'cleanse', title: '7-Day Cleanse', desc: 'Reset your body', icon: '🧹' },
            { id: 'maintain', title: 'Maintain Weight', desc: 'Stay where you are', icon: '⚖️' },
        ],
        default: [
            { id: 'general', title: 'General Wellness', desc: 'Feel better overall', icon: '✨' },
            { id: 'energy', title: 'More Energy', desc: 'Stay active all day', icon: '⚡' },
            { id: 'sleep', title: 'Better Sleep', desc: 'Rest & recover', icon: '😴' },
        ],
    };

    const options = goalOptions[category] || goalOptions.default;

    useEffect(() => {
        setTimeout(() => setShowOptions(true), 100);
    }, []);

    const toggleGoal = (id) => {
        setGoals(prev =>
            prev.includes(id)
                ? prev.filter(g => g !== id)
                : [...prev, id]
        );
    };

    const handleContinue = () => {
        if (goals.length === 0) return;
        localStorage.setItem('goals', JSON.stringify(goals));
        navigate('/meal-time');
    };

    return (
        <Layout
            title="Set Your Target"
            subtitle="What do you want to achieve?"
            showBack
            onBack={() => navigate('/category')}
        >
            <div style={{ maxWidth: 580, margin: '0 auto' }}>
                {/* Header Info */}
                <div style={{
                    background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
                    borderRadius: 16,
                    padding: '18px 24px',
                    marginBottom: 32,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    border: '1px solid #FFD296',
                }}>
                    <span style={{ fontSize: 24 }}>💡</span>
                    <p style={{ fontSize: 14, color: '#666', margin: 0, lineHeight: 1.5 }}>
                        Select one or more goals. We'll create a plan that addresses all of them.
                    </p>
                </div>

                {/* Goal Options */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    marginBottom: 40,
                }}>
                    {options.map((opt, i) => {
                        const isSelected = goals.includes(opt.id);
                        return (
                            <div
                                key={opt.id}
                                onClick={() => toggleGoal(opt.id)}
                                style={{
                                    background: isSelected
                                        ? 'linear-gradient(135deg, #FFFFFF 0%, #FFF9F5 100%)'
                                        : 'var(--white)',
                                    borderRadius: 18,
                                    padding: '26px 28px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 20,
                                    cursor: 'pointer',
                                    border: isSelected
                                        ? '3px solid #F06922'
                                        : '2px solid #E5E7EB',
                                    boxShadow: isSelected
                                        ? '0 12px 40px rgba(240, 105, 34, 0.15)'
                                        : '0 4px 15px rgba(0,0,0,0.04)',
                                    transform: showOptions
                                        ? isSelected ? 'scale(1.02)' : 'scale(1)'
                                        : 'translateX(-20px)',
                                    opacity: showOptions ? 1 : 0,
                                    transition: 'all 0.4s ease',
                                    transitionDelay: `${i * 0.08}s`,
                                }}
                            >
                                {/* Checkbox */}
                                <div style={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: 8,
                                    border: isSelected ? 'none' : '2px solid #D1D5DB',
                                    background: isSelected
                                        ? 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)'
                                        : 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                    flexShrink: 0,
                                }}>
                                    {isSelected && (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                    )}
                                </div>

                                {/* Icon */}
                                <div style={{
                                    width: 56,
                                    height: 56,
                                    background: isSelected
                                        ? 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)'
                                        : '#F5F5F5',
                                    borderRadius: 16,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 28,
                                    transition: 'all 0.3s ease',
                                    flexShrink: 0,
                                }}>
                                    {opt.icon}
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1 }}>
                                    <p style={{
                                        fontSize: 18,
                                        fontWeight: 700,
                                        color: '#111',
                                        marginBottom: 4,
                                    }}>
                                        {opt.title}
                                    </p>
                                    <p style={{ fontSize: 14, color: '#666' }}>{opt.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Continue Button */}
                <button
                    onClick={handleContinue}
                    disabled={goals.length === 0}
                    style={{
                        width: '100%',
                        background: goals.length > 0
                            ? 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)'
                            : 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
                        border: 'none',
                        borderRadius: 16,
                        padding: '20px',
                        fontSize: 18,
                        fontWeight: 700,
                        color: goals.length > 0 ? 'var(--white)' : 'var(--gray-400)',
                        cursor: goals.length > 0 ? 'pointer' : 'not-allowed',
                        boxShadow: goals.length > 0 ? '0 10px 40px rgba(240, 105, 34, 0.35)' : 'none',
                        transition: 'all 0.3s ease',
                    }}
                >
                    Continue {goals.length > 0 && `(${goals.length} selected)`}
                </button>
            </div>
        </Layout>
    );
}
