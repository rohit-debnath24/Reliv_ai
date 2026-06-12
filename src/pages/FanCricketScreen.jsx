import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';

export default function FanCricketScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [showCards, setShowCards] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Determine which category based on route
  const path = location.pathname;

  const categoryData = {
    '/fan-cricket': {
      title: 'Pick Your Cricketer',
      color: '#1E40AF',
      players: [
        { id: 'dhoni', name: 'MS Dhoni', subtitle: 'Captain Cool', price: 10, emoji: '🏏', strength: 'Sharp Mind & Leadership' },
        { id: 'kohli', name: 'Virat Kohli', subtitle: 'King Kohli', price: 12, emoji: '💪', strength: 'Speed & Stamina' },
        { id: 'rohit', name: 'Rohit Sharma', subtitle: 'Hitman', price: 9, emoji: '🎯', strength: 'Lean Muscle & Balance' },
      ],
    },
    '/fan-football': {
      title: 'Pick Your Footballer',
      color: '#16A34A',
      players: [
        { id: 'ronaldo', name: 'Cristiano Ronaldo', subtitle: 'CR7', price: 15, emoji: '⚽', strength: 'Speed & Stamina' },
        { id: 'messi', name: 'Lionel Messi', subtitle: 'The GOAT', price: 15, emoji: '🐐', strength: 'Sharp Mind & Agility' },
        { id: 'neymar', name: 'Neymar Jr', subtitle: 'Skill Master', price: 12, emoji: '🌟', strength: 'Flexibility & Skills' },
      ],
    },
    '/fan-singer': {
      title: 'Pick Your Singer',
      color: '#9333EA',
      players: [
        { id: 'arijit', name: 'Arijit Singh', subtitle: 'Voice of Hearts', price: 8, emoji: '🎤', strength: 'Calm & Focus' },
        { id: 'badshah', name: 'Badshah', subtitle: 'Rap King', price: 11, emoji: '🎵', strength: 'Energy & Stamina' },
        { id: 'honeysingh', name: 'Yo Yo Honey Singh', subtitle: 'Party Anthem', price: 10, emoji: '🔥', strength: 'Fitness Transformation' },
      ],
    },
    '/fan-bollywood': {
      title: 'Pick Your Star',
      color: '#DC2626',
      players: [
        { id: 'srk', name: 'Shah Rukh Khan', subtitle: 'King Khan', price: 14, emoji: '👑', strength: 'Discipline & Transformation' },
        { id: 'salman', name: 'Salman Khan', subtitle: 'Bhai', price: 12, emoji: '💪', strength: 'Muscle Building' },
        { id: 'akshay', name: 'Akshay Kumar', subtitle: 'Khiladi', price: 10, emoji: '🎬', strength: 'Martial Arts & Discipline' },
      ],
    },
  };

  const currentCategory = categoryData[path] || categoryData['/fan-cricket'];

  useEffect(() => {
    setTimeout(() => setShowCards(true), 100);
  }, []);

  const handleSelect = (player) => {
    setSelected(player.id);
    setSelectedPlayer(player);
    // Show challenge modal
    setTimeout(() => {
      setShowChallenge(true);
    }, 300);
  };

  const handleAcceptChallenge = () => {
    localStorage.setItem('selectedCelebrity', selectedPlayer.id);
    localStorage.setItem('celebrityName', selectedPlayer.name);
    localStorage.setItem('dailyPrice', selectedPlayer.price);
    localStorage.setItem('heroTraining', 'true');
    setShowChallenge(false);
    navigate('/category');
  };

  const handleDeclineChallenge = () => {
    // Clear hero training and go to regular category
    localStorage.removeItem('selectedCelebrity');
    localStorage.removeItem('celebrityName');
    localStorage.removeItem('heroTraining');
    setShowChallenge(false);
    navigate('/category');
  };

  return (
    <Layout
      title={currentCategory.title}
      subtitle="Pick your favorite!"
      showBack
      onBack={() => navigate('/fan-quiz-type')}
    >
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        {/* Player Cards */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          marginBottom: 32,
        }}>
          {currentCategory.players.map((player, i) => (
            <div
              key={player.id}
              onClick={() => handleSelect(player)}
              onMouseEnter={() => setHovered(player.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: selected === player.id
                  ? `linear-gradient(135deg, ${currentCategory.color}10 0%, ${currentCategory.color}20 100%)`
                  : '#FFFFFF',
                borderRadius: 20,
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                cursor: 'pointer',
                border: selected === player.id
                  ? `3px solid ${currentCategory.color}`
                  : '2px solid #E5E7EB',
                boxShadow: hovered === player.id || selected === player.id
                  ? `0 12px 40px ${currentCategory.color}20`
                  : '0 4px 15px rgba(0,0,0,0.04)',
                transform: showCards
                  ? selected === player.id ? 'scale(1.02)' : 'scale(1)'
                  : 'translateX(-20px)',
                opacity: showCards ? 1 : 0,
                transition: 'all 0.4s ease',
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              {/* Emoji */}
              <div style={{
                width: 70,
                height: 70,
                background: `linear-gradient(135deg, ${currentCategory.color}20 0%, ${currentCategory.color}30 100%)`,
                borderRadius: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                flexShrink: 0,
              }}>
                {player.emoji}
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#111',
                  marginBottom: 4,
                }}>
                  {player.name}
                </h3>
                <p style={{
                  fontSize: 14,
                  color: '#666',
                  marginBottom: 6,
                }}>
                  {player.subtitle}
                </p>
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: currentCategory.color,
                  background: `${currentCategory.color}12`,
                  padding: '4px 10px',
                  borderRadius: 6,
                }}>
                  🎯 {player.strength}
                </span>
              </div>

              {/* Price */}
              <div style={{
                textAlign: 'right',
              }}>
                <p style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: currentCategory.color,
                }}>
                  ₹{player.price}
                </p>
                <p style={{
                  fontSize: 11,
                  color: '#9CA3AF',
                }}>
                  today only
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div style={{
          textAlign: 'center',
          padding: '20px',
          background: `${currentCategory.color}08`,
          borderRadius: 16,
          border: `1px solid ${currentCategory.color}15`,
        }}>
          <p style={{ fontSize: 14, color: '#666' }}>
            🔥 Train like your hero for 1 full day — diet, workout, schedule!
          </p>
        </div>
      </div>

      {/* Challenge Modal */}
      {showChallenge && selectedPlayer && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease',
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: 28,
            padding: '40px',
            maxWidth: 480,
            width: '90%',
            textAlign: 'center',
            animation: 'scaleIn 0.4s ease',
            boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
          }}>
            {/* Hero Icon */}
            <div style={{
              width: 90,
              height: 90,
              background: `linear-gradient(135deg, ${currentCategory.color}20 0%, ${currentCategory.color}35 100%)`,
              borderRadius: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 48,
              margin: '0 auto 24px',
            }}>
              {selectedPlayer.emoji}
            </div>

            {/* Title */}
            <h2 style={{
              fontSize: 26,
              fontWeight: 800,
              color: '#111',
              marginBottom: 8,
            }}>
              You chose {selectedPlayer.name}!
            </h2>

            {/* Subtitle */}
            <p style={{
              fontSize: 15,
              color: currentCategory.color,
              fontWeight: 600,
              marginBottom: 20,
            }}>
              {selectedPlayer.subtitle} Training
            </p>

            {/* Warning Message */}
            <div style={{
              background: '#FEF3C7',
              borderRadius: 16,
              padding: '20px',
              marginBottom: 28,
              border: '1px solid #FCD34D',
            }}>
              <p style={{
                fontSize: 15,
                color: '#92400E',
                lineHeight: 1.6,
              }}>
                ⚠️ <strong>Training like {selectedPlayer.name}</strong> will be <strong>very difficult!</strong>
              </p>
              <p style={{
                fontSize: 14,
                color: '#B45309',
                marginTop: 12,
                lineHeight: 1.5,
              }}>
                But if you follow even <strong>half of it</strong>, you'll see a <strong style={{ color: '#059669' }}>super good transformation!</strong>
              </p>
            </div>

            {/* Accept Button */}
            <button
              onClick={handleAcceptChallenge}
              style={{
                width: '100%',
                background: `linear-gradient(135deg, ${currentCategory.color} 0%, ${currentCategory.color}dd 100%)`,
                border: 'none',
                borderRadius: 16,
                padding: '20px',
                fontSize: 17,
                fontWeight: 700,
                color: '#FFFFFF',
                cursor: 'pointer',
                marginBottom: 14,
                boxShadow: `0 10px 35px ${currentCategory.color}40`,
                transition: 'all 0.3s ease',
              }}
            >
              💪 Yes! I'm Ready for the Challenge
            </button>

            {/* Decline Button */}
            <button
              onClick={handleDeclineChallenge}
              style={{
                width: '100%',
                background: '#F3F4F6',
                border: 'none',
                borderRadius: 16,
                padding: '18px',
                fontSize: 15,
                fontWeight: 600,
                color: '#666',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              No thanks, I'll go with regular plans
            </button>

            {/* Price Tag */}
            <div style={{
              marginTop: 20,
              padding: '12px',
              background: '#F0FDF4',
              borderRadius: 12,
              border: '1px solid #BBF7D0',
            }}>
              <span style={{ fontSize: 14, color: '#16A34A', fontWeight: 600 }}>
                Today's challenge: ₹{selectedPlayer.price} only
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </Layout>
  );
}
