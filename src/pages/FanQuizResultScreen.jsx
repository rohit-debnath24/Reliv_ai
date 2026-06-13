import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FanQuizResultScreen() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [confetti, setConfetti] = useState([]);

    const score = parseInt(localStorage.getItem('quizScore') || '2');
    const totalQuestions = 3;
    const percentage = Math.round((score / totalQuestions) * 100);

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

    const resultMessages = {
        high: { title: 'True Fan! 🌟', desc: `You really know ${info.name}!` },
        medium: { title: 'Nice Try! 👍', desc: 'Pretty good knowledge!' },
        low: { title: 'Keep Learning! 📚', desc: 'Time to follow them more closely!' },
    };

    const result = percentage >= 80 ? resultMessages.high : percentage >= 50 ? resultMessages.medium : resultMessages.low;

    useEffect(() => {
        setTimeout(() => setShow(true), 100);

        if (percentage >= 50) {
            const newConfetti = [];
            for (let i = 0; i < 40; i++) {
                newConfetti.push({
                    id: i,
                    left: Math.random() * 100,
                    delay: Math.random() * 1.5,
                    duration: 2.5 + Math.random() * 2,
                    color: ['#F06922', '#22C55E', '#3B82F6', '#EC4899', info.color][Math.floor(Math.random() * 5)],
                });
            }
            setConfetti(newConfetti);
        }
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #FFFAF7 0%, #FFF5F0 100%)',
            fontFamily: "'Inter', 'Outfit', sans-serif",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40,
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Confetti */}
            {confetti.map((c) => (
                <div
                    key={c.id}
                    style={{
                        position: 'fixed',
                        top: -20,
                        left: `${c.left}%`,
                        width: 10,
                        height: 10,
                        background: c.color,
                        borderRadius: 2,
                        animation: `fall ${c.duration}s ease-in ${c.delay}s infinite`,
                        zIndex: 0,
                    }}
                />
            ))}

            <div style={{
                maxWidth: 520,
                width: '100%',
                background: 'var(--white)',
                borderRadius: 32,
                padding: '48px 44px',
                boxShadow: '0 24px 80px rgba(0,0,0,0.1)',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
                opacity: show ? 1 : 0,
                transform: show ? 'scale(1)' : 'scale(0.95)',
                transition: 'all 0.5s ease',
            }}>
                {/* Celebrity Icon */}
                <div style={{
                    width: 100,
                    height: 100,
                    background: `linear-gradient(135deg, ${info.color}20 0%, ${info.color}30 100%)`,
                    borderRadius: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    fontSize: 50,
                }}>
                    {info.emoji}
                </div>

                {/* Score Circle */}
                <div style={{
                    width: 140,
                    height: 140,
                    borderRadius: '50%',
                    background: `conic-gradient(${info.color} ${percentage}%, #E5E7EB ${percentage}%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 28px',
                    padding: 8,
                }}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'var(--white)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}>
                        <span style={{ fontSize: 36, fontWeight: 800, color: info.color }}>
                            {score}/{totalQuestions}
                        </span>
                        <span style={{ fontSize: 13, color: '#666' }}>Score</span>
                    </div>
                </div>

                {/* Result Message */}
                <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', marginBottom: 8 }}>
                    {result.title}
                </h1>
                <p style={{ fontSize: 16, color: '#666', marginBottom: 36 }}>
                    {result.desc}
                </p>

                {/* Actions */}
                <div style={{ display: 'grid', gap: 14 }}>
                    <button
                        onClick={() => navigate('/daily-pay')}
                        style={{
                            width: '100%',
                            background: `linear-gradient(135deg, ${info.color} 0%, ${info.color}DD 100%)`,
                            border: 'none',
                            borderRadius: 16,
                            padding: '20px',
                            fontSize: 17,
                            fontWeight: 700,
                            color: 'var(--white)',
                            cursor: 'pointer',
                            boxShadow: `0 10px 40px ${info.color}40`,
                        }}
                    >
                        🎯 Get {info.name} Plan
                    </button>

                    <button
                        onClick={() => navigate('/fan-quiz-type')}
                        style={{
                            width: '100%',
                            background: 'var(--white)',
                            border: '2px solid #E5E7EB',
                            borderRadius: 14,
                            padding: '16px',
                            fontSize: 15,
                            fontWeight: 600,
                            color: '#666',
                            cursor: 'pointer',
                        }}
                    >
                        Try Another Celebrity
                    </button>
                </div>
            </div>

            <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
        </div>
    );
}
