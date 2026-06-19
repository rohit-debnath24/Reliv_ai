import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const HeartSVG = ({ width = 100, style = {} }) => (
  <svg viewBox="0 0 32 29.6" width={width} style={{ filter: 'drop-shadow(0 15px 15px rgba(213, 0, 50, 0.3))', ...style }}>
    <defs>
      <radialGradient id="heartGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ff4b72" />
        <stop offset="60%" stopColor="#d50032" />
        <stop offset="100%" stopColor="#8a0020" />
      </radialGradient>
    </defs>
    <path fill="url(#heartGrad)" d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
  </svg>
);

const HangingHeartsBackground = ({ isDark }) => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: isDark ? 'linear-gradient(135deg, #1A0B13 0%, #2D0F1C 50%, #13060E 100%)' : 'linear-gradient(135deg, #FFF0F5 0%, #FFC0CB 50%, #FFB6C1 100%)',
      zIndex: -1,
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isDark ? 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.6) 100%)' : 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(255,182,193,0.3) 100%)',
        pointerEvents: 'none'
      }} />

      {/* Hanging hearts left */}
      <div className="hanging-heart" style={{ left: '10%', height: '35%', animationDelay: '0s' }}>
        <div className="string"></div>
        <HeartSVG width={45} />
      </div>
      <div className="hanging-heart" style={{ left: '22%', height: '50%', animationDelay: '-2s' }}>
        <div className="string"></div>
        <HeartSVG width={60} />
      </div>
      <div className="hanging-heart" style={{ left: '34%', height: '25%', animationDelay: '-4s' }}>
        <div className="string"></div>
        <HeartSVG width={40} />
      </div>

      {/* Hanging hearts right */}
      <div className="hanging-heart" style={{ right: '10%', height: '40%', animationDelay: '-1s' }}>
        <div className="string"></div>
        <HeartSVG width={50} />
      </div>
      <div className="hanging-heart" style={{ right: '22%', height: '55%', animationDelay: '-3s' }}>
        <div className="string"></div>
        <HeartSVG width={65} />
      </div>
      <div className="hanging-heart" style={{ right: '34%', height: '30%', animationDelay: '-5s' }}>
        <div className="string"></div>
        <HeartSVG width={45} />
      </div>
    </div>
  );
};

export default function CoupleQuestionsScreen() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [showQ, setShowQ] = useState(false);

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
    setTimeout(() => setShowQ(true), 800);
  }, []);

  const handleAnswer = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));

    if (currentQ < questions.length - 1) {
      setShowQ(false);
      setTimeout(() => {
        setCurrentQ(prev => prev + 1);
        setShowQ(true);
      }, 800);
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
    <>
      <HangingHeartsBackground isDark={isDark} />
      <Layout
        showBack
        onBack={() => navigate('/couple-phone')}
      >
        <div className="couple-questions-container" style={{ maxWidth: 600, margin: '0 auto' }}>
          
          {/* Glassmorphic Title Container */}
          <div className="title-glass-card" style={{
            background: isDark ? 'rgba(20, 10, 15, 0.7)' : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            marginBottom: 32,
            textAlign: 'center',
            boxShadow: isDark ? '0 8px 30px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.1)' : '0 8px 30px rgba(213, 0, 50, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.9)',
          }}>
            <h1 style={{
              fontSize: 28,
              fontWeight: 800,
              color: isDark ? '#FF80AB' : '#d50032',
              marginBottom: 8,
              letterSpacing: '-0.5px',
            }}>
              About You & {partnerName}
            </h1>
            <p style={{
              fontSize: 15,
              color: isDark ? '#FFB6C1' : '#8a0020',
              fontWeight: 500,
            }}>
              Let's craft the perfect journey for both of you
            </p>
          </div>

        {/* Progress Card */}
        <div className="progress-glass-card" style={{
          background: isDark ? 'rgba(20, 10, 15, 0.7)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          marginBottom: 32,
          boxShadow: isDark ? '0 8px 30px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.1)' : '0 8px 30px rgba(213, 0, 50, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.9)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 10,
            fontSize: 13,
            color: isDark ? '#FFB6C1' : '#8a0020',
            fontWeight: 700,
            letterSpacing: '0.5px',
          }}>
            <span>Question {currentQ + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div style={{
            height: 10,
            background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(213, 0, 50, 0.1)',
            borderRadius: 10,
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: isDark ? '#FF80AB' : '#d50032',
              borderRadius: 10,
              transition: 'width 0.5s ease',
            }} />
          </div>
        </div>

        {/* Question Card */}
        <div className="question-glass-card" style={{
          background: isDark ? 'rgba(20, 10, 15, 0.8)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          boxShadow: isDark ? '0 0 60px rgba(255, 128, 171, 0.3), inset 0 0 0 1px rgba(255, 128, 171, 0.4)' : '0 16px 50px rgba(213, 0, 50, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 1)',
          opacity: showQ ? 1 : 0,
          transform: showQ ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          <h2 style={{
            fontSize: 24,
            fontWeight: 800,
            color: isDark ? '#FF80AB' : '#d50032',
            marginBottom: 32,
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
                    backgroundColor: isSelected ? (isDark ? 'rgba(255, 128, 171, 0.15)' : '#FFF0F2') : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF'),
                    border: isSelected ? (isDark ? '2px solid #FF80AB' : '2px solid #d50032') : '2px solid transparent',
                    borderRadius: 16,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: isDark ? 'none' : '0 4px 10px rgba(0,0,0,0.03)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.1)' : '#FDFDFD';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF';
                  }}
                >
                  <span style={{ fontSize: 28, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>{opt.emoji}</span>
                  <span style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: isSelected ? (isDark ? '#FF80AB' : '#d50032') : (isDark ? '#E6E1D2' : '#333'),
                  }}>
                    {opt.label}
                  </span>
                  {isSelected && (
                    <div style={{ marginLeft: 'auto' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#FF80AB' : '#d50032'} strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
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
              background: 'linear-gradient(135deg, #ff4b72 0%, #d50032 100%)',
              border: 'none',
              borderRadius: 16,
              padding: '20px',
              fontSize: 18,
              fontWeight: 800,
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(213, 0, 50, 0.4)',
              animation: 'fadeIn 0.5s ease',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Start Our Journey ❤️
          </button>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .hanging-heart {
          position: absolute;
          top: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform-origin: top center;
          animation: swing 6s ease-in-out infinite alternate;
        }
        .hanging-heart .string {
          width: 1px;
          background: #d50032;
          flex-grow: 1;
        }
        @keyframes swing {
          0% { transform: rotate(-3deg); }
          100% { transform: rotate(3deg); }
        }

        /* Responsive Glass Cards */
        .title-glass-card {
          border-radius: 24px;
          padding: 24px;
        }
        .progress-glass-card {
          border-radius: 24px;
          padding: 20px 24px;
        }
        .question-glass-card {
          border-radius: 24px;
          padding: 40px 36px;
        }
        
        @media (max-width: 640px) {
          .title-glass-card {
            border-radius: 20px;
            padding: 16px 20px;
            margin-bottom: 24px !important;
          }
          .title-glass-card h1 {
            font-size: 24px !important;
          }
          .title-glass-card p {
            font-size: 14px !important;
          }
          .progress-glass-card {
            border-radius: 20px;
            padding: 16px 20px;
            margin-bottom: 24px !important;
          }
          .question-glass-card {
            border-radius: 20px;
            padding: 28px 24px;
          }
          .question-glass-card h2 {
            font-size: 20px !important;
            margin-bottom: 24px !important;
          }
          .question-glass-card button {
            padding: 16px 20px !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </Layout>
    </>
  );
}
