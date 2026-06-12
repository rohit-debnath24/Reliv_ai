import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DailyWhatsAppPreviewScreen() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0);

    const celebrity = localStorage.getItem('celebrity') || 'virat';
    const celebInfo = {
        virat: { name: 'Virat Kohli', emoji: '🏏' },
        alia: { name: 'Alia Bhatt', emoji: '🧘‍♀️' },
        salman: { name: 'Salman Khan', emoji: '💪' },
        deepika: { name: 'Deepika Padukone', emoji: '✨' },
        hrithik: { name: 'Hrithik Roshan', emoji: '🔥' },
        priyanka: { name: 'Priyanka Chopra', emoji: '🌟' },
    };
    const info = celebInfo[celebrity] || celebInfo.virat;

    const messages = [
        { type: 'incoming', text: `${info.emoji} **${info.name} Style Day!**\n\nToday you'll eat and train like your idol!`, time: '9:00 AM' },
        { type: 'incoming', text: `🍳 **Breakfast - ${info.name} Style**\n\nPower omelette with spinach & avocado toast\n\n📊 Calories: 420\n💪 Protein: 28g`, time: '9:01 AM' },
        { type: 'outgoing', text: 'Making it now! 🙌', time: '9:15 AM' },
        { type: 'incoming', text: '💪 Great! Enjoy your celebrity breakfast!\n\nI\'ll check in at lunch time!', time: '9:16 AM' },
    ];

    useEffect(() => {
        setTimeout(() => setShow(true), 100);
        const interval = setInterval(() => {
            setMessageIndex(prev => {
                if (prev < messages.length) return prev + 1;
                clearInterval(interval);
                return prev;
            });
        }, 700);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0B141A',
            fontFamily: "'Inter', 'Outfit', sans-serif",
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            {/* Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: 28,
                opacity: show ? 1 : 0,
                transition: 'all 0.5s ease',
            }}>
                <h1 style={{ fontSize: 26, fontWeight: 800, color: '#FFF', marginBottom: 8 }}>
                    {info.emoji} Your {info.name} Day Preview
                </h1>
                <p style={{ fontSize: 14, color: '#8696A0' }}>
                    Here's what your WhatsApp messages will look like
                </p>
            </div>

            {/* Chat Mockup */}
            <div style={{
                width: 360,
                background: '#111B21',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                opacity: show ? 1 : 0,
                transform: show ? 'scale(1)' : 'scale(0.95)',
                transition: 'all 0.5s ease 0.2s',
            }}>
                {/* Chat Header */}
                <div style={{
                    background: '#202C33',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                }}>
                    <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 18,
                    }}>
                        {info.emoji}
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 15, fontWeight: 600, color: '#E9EDEF', margin: 0 }}>
                            {info.name} Plan
                        </p>
                        <p style={{ fontSize: 11, color: '#8696A0', margin: 0 }}>Online</p>
                    </div>
                </div>

                {/* Messages */}
                <div style={{
                    background: '#0B141A',
                    minHeight: 320,
                    padding: '14px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                }}>
                    {messages.slice(0, messageIndex).map((msg, i) => (
                        <div
                            key={i}
                            style={{
                                maxWidth: '78%',
                                padding: '8px 12px',
                                borderRadius: msg.type === 'outgoing' ? '10px 10px 4px 10px' : '10px 10px 10px 4px',
                                background: msg.type === 'outgoing' ? '#005C4B' : '#202C33',
                                alignSelf: msg.type === 'outgoing' ? 'flex-end' : 'flex-start',
                                animation: 'fadeIn 0.3s ease',
                            }}
                        >
                            <p style={{
                                fontSize: 13,
                                color: '#E9EDEF',
                                margin: 0,
                                whiteSpace: 'pre-line',
                                lineHeight: 1.4,
                            }}>
                                {msg.text}
                            </p>
                            <p style={{
                                fontSize: 10,
                                color: '#8696A0',
                                margin: '4px 0 0',
                                textAlign: 'right',
                            }}>
                                {msg.time}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div style={{
                    padding: '10px 14px',
                    background: '#202C33',
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center',
                }}>
                    <div style={{
                        flex: 1,
                        background: '#2A3942',
                        borderRadius: 18,
                        padding: '9px 14px',
                        color: '#8696A0',
                        fontSize: 13,
                    }}>
                        Type a message
                    </div>
                </div>
            </div>

            {/* Button */}
            <button
                onClick={() => navigate('/activation')}
                style={{
                    marginTop: 28,
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    border: 'none',
                    borderRadius: 14,
                    padding: '16px 40px',
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#FFF',
                    cursor: 'pointer',
                    boxShadow: '0 8px 30px rgba(37, 211, 102, 0.3)',
                }}
            >
                ✅ Continue to Activation
            </button>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
