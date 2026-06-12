import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function SoloQuestionsScreen() {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [currentQ, setCurrentQ] = useState(0);
    const [showQ, setShowQ] = useState(false);

    const questions = [
        {
            id: 'diet_type',
            question: 'What\'s your preferred diet type?',
            options: [
                { value: 'veg', label: 'Vegetarian', emoji: '🥗' },
                { value: 'nonveg', label: 'Non-Vegetarian', emoji: '🍗' },
                { value: 'eggetarian', label: 'Eggetarian', emoji: '🥚' },
                { value: 'vegan', label: 'Vegan', emoji: '🌱' },
            ],
        },
        {
            id: 'activity',
            question: 'How active are you?',
            options: [
                { value: 'sedentary', label: 'Desk Job / Low Activity', emoji: '💻' },
                { value: 'moderate', label: 'Moderate Activity', emoji: '🚶' },
                { value: 'active', label: 'Very Active', emoji: '🏃' },
                { value: 'athlete', label: 'Athlete Level', emoji: '🏋️' },
            ],
        },
        {
            id: 'cooking',
            question: 'How much time can you spend cooking?',
            options: [
                { value: 'minimal', label: 'Under 15 mins', emoji: '⚡' },
                { value: 'moderate', label: '15-30 mins', emoji: '⏱️' },
                { value: 'plenty', label: '30+ mins', emoji: '👨‍🍳' },
            ],
        },
    ];

    useEffect(() => {
        setTimeout(() => setShowQ(true), 100);
    }, []);

    const handleAnswer = (qId, value) => {
        setAnswers(prev => ({ ...prev, [qId]: value }));

        if (currentQ < questions.length - 1) {
            setShowQ(false);
            setTimeout(() => {
                setCurrentQ(prev => prev + 1);
                setShowQ(true);
            }, 300);
        }
    };

    const handleContinue = () => {
        localStorage.setItem('soloAnswers', JSON.stringify(answers));
        navigate('/category');
    };

    const q = questions[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;
    const allAnswered = Object.keys(answers).length === questions.length;

    return (
        <Layout
            title="Quick Questions"
            subtitle="Help us personalize your plan"
            showBack
            onBack={() => navigate('/weekly-solo-pay')}
        >
            <div style={{ maxWidth: 540, margin: '0 auto' }}>
                {/* Progress */}
                <div style={{ marginBottom: 32 }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                        fontSize: 13,
                        color: '#9CA3AF',
                    }}>
                        <span>Question {currentQ + 1} of {questions.length}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div style={{
                        height: 8,
                        background: '#F5F5F5',
                        borderRadius: 8,
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            width: `${progress}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #F06922 0%, #E85C25 100%)',
                            borderRadius: 8,
                            transition: 'width 0.5s ease',
                        }} />
                    </div>
                </div>

                {/* Question Card */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: 24,
                    padding: '40px 36px',
                    boxShadow: '0 16px 50px rgba(240, 105, 34, 0.1)',
                    border: '1px solid rgba(240, 105, 34, 0.1)',
                    opacity: showQ ? 1 : 0,
                    transform: showQ ? 'translateX(0)' : 'translateX(20px)',
                    transition: 'all 0.3s ease',
                }}>
                    <h2 style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: '#111',
                        marginBottom: 28,
                        textAlign: 'center',
                    }}>
                        {q.question}
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {q.options.map((opt) => {
                            const isSelected = answers[q.id] === opt.value;
                            return (
                                <button
                                    key={opt.value}
                                    onClick={() => handleAnswer(q.id, opt.value)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 16,
                                        padding: '18px 22px',
                                        background: isSelected
                                            ? 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)'
                                            : '#FAFAFA',
                                        border: isSelected ? '2px solid #F06922' : '2px solid transparent',
                                        borderRadius: 14,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <span style={{ fontSize: 26 }}>{opt.emoji}</span>
                                    <span style={{
                                        fontSize: 15,
                                        fontWeight: 600,
                                        color: isSelected ? '#F06922' : '#333',
                                        flex: 1,
                                        textAlign: 'left',
                                    }}>
                                        {opt.label}
                                    </span>
                                    {isSelected && (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F06922" strokeWidth="3">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Continue Button */}
                {allAnswered && (
                    <button
                        onClick={handleContinue}
                        style={{
                            width: '100%',
                            marginTop: 28,
                            background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
                            border: 'none',
                            borderRadius: 16,
                            padding: '20px',
                            fontSize: 18,
                            fontWeight: 700,
                            color: '#FFFFFF',
                            cursor: 'pointer',
                            boxShadow: '0 10px 40px rgba(240, 105, 34, 0.35)',
                            animation: 'fadeIn 0.3s ease',
                        }}
                    >
                        Continue
                    </button>
                )}
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </Layout>
    );
}
