import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FanQuizScreen() {
    const navigate = useNavigate();
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [showQ, setShowQ] = useState(false);

    const celebrity = localStorage.getItem('celebrity') || 'virat';
    const celebInfo = {
        virat: { name: 'Virat Kohli', emoji: '🏏', color: '#1E40AF' },
        alia: { name: 'Alia Bhatt', emoji: '🧘‍♀️', color: '#DB2777' },
        salman: { name: 'Salman Khan', emoji: '💪', color: '#16A34A' },
        deepika: { name: 'Deepika Padukone', emoji: '✨', color: '#9333EA' },
        hrithik: { name: 'Hrithik Roshan', emoji: '🔥', color: '#DC2626' },
        priyanka: { name: 'Priyanka Chopra', emoji: '🌟', color: '#F59E0B' },
    };
    const info = celebInfo[celebrity] || celebInfo.virat;

    const questions = [
        {
            question: `What time does ${info.name} typically wake up?`,
            options: ['5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM'],
            correct: 0,
        },
        {
            question: `What's ${info.name}'s favorite protein source?`,
            options: ['Chicken', 'Fish', 'Eggs', 'All of the above'],
            correct: 3,
        },
        {
            question: `How many hours does ${info.name} train daily?`,
            options: ['1-2 hours', '2-3 hours', '3-4 hours', '4+ hours'],
            correct: 1,
        },
    ];

    useEffect(() => {
        setTimeout(() => setShowQ(true), 100);
    }, []);

    const handleAnswer = (index) => {
        if (selected !== null) return;
        setSelected(index);

        if (index === questions[currentQ].correct) {
            setScore(prev => prev + 1);
        }

        setTimeout(() => {
            if (currentQ < questions.length - 1) {
                setShowQ(false);
                setTimeout(() => {
                    setCurrentQ(prev => prev + 1);
                    setSelected(null);
                    setShowQ(true);
                }, 300);
            } else {
                localStorage.setItem('quizScore', score + (index === questions[currentQ].correct ? 1 : 0));
                navigate('/fan-quiz-result');
            }
        }, 1000);
    };

    const q = questions[currentQ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #FFFAF7 0%, #FFF5F0 100%)',
            fontFamily: "'Inter', 'Outfit', sans-serif",
            padding: 40,
        }}>
            <div style={{ maxWidth: 560, margin: '0 auto' }}>
                {/* Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: 32,
                }}>
                    <span style={{ fontSize: 48 }}>{info.emoji}</span>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111', marginTop: 12 }}>
                        {info.name} Fan Quiz
                    </h1>
                    <p style={{ fontSize: 14, color: '#666' }}>
                        Question {currentQ + 1} of {questions.length}
                    </p>
                </div>

                {/* Progress */}
                <div style={{
                    height: 8,
                    background: 'var(--gray-200)',
                    borderRadius: 8,
                    marginBottom: 32,
                    overflow: 'hidden',
                }}>
                    <div style={{
                        width: `${((currentQ + 1) / questions.length) * 100}%`,
                        height: '100%',
                        background: info.color,
                        borderRadius: 8,
                        transition: 'width 0.5s ease',
                    }} />
                </div>

                {/* Question Card */}
                <div style={{
                    background: 'var(--white)',
                    borderRadius: 24,
                    padding: '40px 36px',
                    boxShadow: '0 16px 50px rgba(0,0,0,0.08)',
                    opacity: showQ ? 1 : 0,
                    transform: showQ ? 'translateX(0)' : 'translateX(30px)',
                    transition: 'all 0.3s ease',
                }}>
                    <h2 style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: '#111',
                        marginBottom: 28,
                        textAlign: 'center',
                        lineHeight: 1.4,
                    }}>
                        {q.question}
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {q.options.map((opt, i) => {
                            const isCorrect = i === q.correct;
                            const isWrong = selected === i && !isCorrect;
                            const showCorrect = selected !== null && isCorrect;

                            return (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(i)}
                                    disabled={selected !== null}
                                    style={{
                                        padding: '18px 22px',
                                        background: showCorrect
                                            ? '#ECFDF5'
                                            : isWrong
                                                ? '#FEE2E2'
                                                : selected === i
                                                    ? '#F5F5F5'
                                                    : 'var(--gray-50)',
                                        border: showCorrect
                                            ? '2px solid #22C55E'
                                            : isWrong
                                                ? '2px solid #EF4444'
                                                : '2px solid transparent',
                                        borderRadius: 14,
                                        cursor: selected !== null ? 'default' : 'pointer',
                                        fontSize: 15,
                                        fontWeight: 600,
                                        color: showCorrect ? '#22C55E' : isWrong ? '#EF4444' : '#333',
                                        textAlign: 'left',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {opt}
                                    {showCorrect && <span>✅</span>}
                                    {isWrong && <span>❌</span>}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Score */}
                <div style={{
                    textAlign: 'center',
                    marginTop: 24,
                    fontSize: 14,
                    color: 'var(--gray-400)',
                }}>
                    Score: {score}/{currentQ + (selected !== null ? 1 : 0)}
                </div>
            </div>
        </div>
    );
}
