import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WhatsAppPreviewScreen() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0);

    const messages = [
        { type: 'incoming', text: '👋 Welcome to Reliv AI! Your health journey starts now.', time: '10:00 AM' },
        { type: 'incoming', text: '🍳 **Breakfast Time!**\n\nToday\'s recipe: Protein Oats Bowl\n\n• 50g oats\n• 1 banana\n• 1 scoop protein\n• Milk\n\nReply "done" when finished!', time: '10:01 AM' },
        { type: 'outgoing', text: 'done ✅', time: '10:30 AM' },
        { type: 'incoming', text: '🎉 Great job! You\'ve completed your first meal.\n\n🔥 Streak: 1 day!', time: '10:31 AM' },
    ];

    useEffect(() => {
        setTimeout(() => setShow(true), 100);

        // Animate messages appearing
        const interval = setInterval(() => {
            setMessageIndex(prev => {
                if (prev < messages.length) return prev + 1;
                clearInterval(interval);
                return prev;
            });
        }, 800);

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
                marginBottom: 32,
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(-20px)',
                transition: 'all 0.5s ease',
            }}>
                <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--white)', marginBottom: 8 }}>
                    📱 WhatsApp Preview
                </h1>
                <p style={{ fontSize: 14, color: '#8696A0' }}>
                    Here's what your daily messages will look like
                </p>
            </div>

            {/* Phone Mockup Frame */}
            <div style={{
                width: 380,
                background: '#111B21',
                borderRadius: 28,
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
                opacity: show ? 1 : 0,
                transform: show ? 'scale(1)' : 'scale(0.95)',
                transition: 'all 0.5s ease 0.2s',
            }}>
                {/* Chat Header */}
                <div style={{
                    background: '#202C33',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                }}>
                    <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                    }}>
                        🤖
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 16, fontWeight: 600, color: '#E9EDEF', margin: 0 }}>Reliv AI Coach</p>
                        <p style={{ fontSize: 12, color: '#8696A0', margin: 0 }}>Online</p>
                    </div>
                    <div style={{ display: 'flex', gap: 16, color: '#8696A0' }}>
                        <span>📹</span>
                        <span>📞</span>
                        <span>⋮</span>
                    </div>
                </div>

                {/* Chat Messages */}
                <div style={{
                    background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='30' height='30' patternUnits='userSpaceOnUse'%3E%3Crect fill='%23111B21' width='30' height='30'/%3E%3Ccircle fill='%230D1418' cx='15' cy='15' r='2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23grid)' width='100' height='100'/%3E%3C/svg%3E")`,
                    minHeight: 400,
                    padding: '16px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                }}>
                    {messages.slice(0, messageIndex).map((msg, i) => (
                        <div
                            key={i}
                            style={{
                                maxWidth: '80%',
                                padding: '10px 14px',
                                borderRadius: msg.type === 'outgoing' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                                background: msg.type === 'outgoing' ? '#005C4B' : '#202C33',
                                alignSelf: msg.type === 'outgoing' ? 'flex-end' : 'flex-start',
                                animation: 'slideUp 0.3s ease',
                            }}
                        >
                            <p style={{
                                fontSize: 14,
                                color: '#E9EDEF',
                                margin: 0,
                                whiteSpace: 'pre-line',
                                lineHeight: 1.5,
                            }}>
                                {msg.text}
                            </p>
                            <p style={{
                                fontSize: 11,
                                color: '#8696A0',
                                margin: '6px 0 0',
                                textAlign: 'right',
                            }}>
                                {msg.time} {msg.type === 'outgoing' && '✓✓'}
                            </p>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {messageIndex < messages.length && (
                        <div style={{
                            padding: '12px 16px',
                            background: '#202C33',
                            borderRadius: 12,
                            alignSelf: 'flex-start',
                            display: 'flex',
                            gap: 4,
                        }}>
                            {[0, 1, 2].map(i => (
                                <div
                                    key={i}
                                    style={{
                                        width: 8,
                                        height: 8,
                                        background: '#8696A0',
                                        borderRadius: '50%',
                                        animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Input Bar */}
                <div style={{
                    padding: '12px 16px',
                    background: '#202C33',
                    display: 'flex',
                    gap: 12,
                    alignItems: 'center',
                }}>
                    <span style={{ fontSize: 20, color: '#8696A0' }}>😊</span>
                    <div style={{
                        flex: 1,
                        background: '#2A3942',
                        borderRadius: 20,
                        padding: '10px 16px',
                        color: '#8696A0',
                        fontSize: 14,
                    }}>
                        Type a message
                    </div>
                    <span style={{ fontSize: 20, color: '#8696A0' }}>🎤</span>
                </div>
            </div>

            {/* Action Button */}
            <button
                onClick={() => navigate('/')}
                style={{
                    marginTop: 36,
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    border: 'none',
                    borderRadius: 16,
                    padding: '18px 48px',
                    fontSize: 16,
                    fontWeight: 700,
                    color: 'var(--white)',
                    cursor: 'pointer',
                    boxShadow: '0 10px 40px rgba(37, 211, 102, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    opacity: show ? 1 : 0,
                    transform: show ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.5s ease 0.4s',
                }}
            >
                ✅ Got It! Back to Home
            </button>

            <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
        </div>
    );
}
