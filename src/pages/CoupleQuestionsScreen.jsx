import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function CoupleQuestionsScreen() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [showQ, setShowQ] = useState(false);

  const partnerName = localStorage.getItem('partnerName') || 'Partner';

  const questions = [
    {
      id: 'cook_together',
      question: 'Do you cook meals together?',
      options: [
        { value: 'yes', label: 'Yes, often!', emoji: '👨‍🍳' },
        { value: 'sometimes', label: 'Sometimes', emoji: '🍳' },
        { value: 'no', label: 'Rarely', emoji: '🍕' },
      ],
    },
    {
      id: 'workout_together',
      question: 'Do you workout together?',
      options: [
        { value: 'yes', label: 'Yes, we do!', emoji: '💪' },
        { value: 'sometimes', label: 'Occasionally', emoji: '🚶' },
        { value: 'no', label: 'Separately', emoji: '👤' },
      ],
    },
    {
      id: 'diet_similar',
      question: 'Are your dietary preferences similar?',
      options: [
        { value: 'same', label: 'Very similar', emoji: '🥗' },
        { value: 'different', label: 'Quite different', emoji: '🍔' },
        { value: 'mixed', label: 'Some overlap', emoji: '🍽️' },
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
    localStorage.setItem('coupleAnswers', JSON.stringify(answers));
    navigate('/weekly-couple-pay');
  };

  const q = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;
  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <Layout
      title={`About You & ${partnerName}`}
      subtitle="Quick questions to personalize your plan"
      showBack
      onBack={() => navigate('/couple-phone')}
    >
      <div style={{ maxWidth: 540, margin: '0 auto' }}>
        {/* Progress */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 10,
            fontSize: 13,
            color: 'var(--gray-400)',
          }}>
            <span>Question {currentQ + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
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
              background: 'linear-gradient(90deg, #EC4899 0%, #DB2777 100%)',
              borderRadius: 8,
              transition: 'width 0.5s ease',
            }} />
          </div>
        </div>

        {/* Question Card */}
        <div style={{
          background: 'var(--white)',
          borderRadius: 24,
          padding: '40px 36px',
          boxShadow: '0 16px 50px rgba(236, 72, 153, 0.1)',
          border: '1px solid rgba(236, 72, 153, 0.1)',
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
                    padding: '20px 24px',
                    background: isSelected
                      ? 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)'
                      : 'var(--gray-50)',
                    border: isSelected ? '2px solid #EC4899' : '2px solid transparent',
                    borderRadius: 16,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span style={{ fontSize: 28 }}>{opt.emoji}</span>
                  <span style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: isSelected ? '#EC4899' : '#333',
                  }}>
                    {opt.label}
                  </span>
                  {isSelected && (
                    <div style={{ marginLeft: 'auto' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
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
              background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
              border: 'none',
              borderRadius: 16,
              padding: '20px',
              fontSize: 18,
              fontWeight: 700,
              color: 'var(--white)',
              cursor: 'pointer',
              boxShadow: '0 10px 40px rgba(236, 72, 153, 0.35)',
              animation: 'fadeIn 0.3s ease',
            }}
          >
            Continue to Payment
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
