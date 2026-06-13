import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReturnExpiredScreen() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => setShow(true), 100);
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #FFFAF7 0%, #FFF5F0 50%, #FFEEDD 100%)',
            fontFamily: "'Inter', 'Outfit', sans-serif",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40,
        }}>
            <div style={{
                maxWidth: 560,
                width: '100%',
                background: 'var(--white)',
                borderRadius: 32,
                padding: '48px 44px',
                boxShadow: '0 24px 80px rgba(240, 105, 34, 0.1)',
                border: '1px solid rgba(240, 105, 34, 0.1)',
                textAlign: 'center',
                opacity: show ? 1 : 0,
                transform: show ? 'scale(1)' : 'scale(0.95)',
                transition: 'all 0.5s ease',
            }}>
                {/* Icon */}
                <div style={{
                    width: 100,
                    height: 100,
                    background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
                    borderRadius: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 28px',
                    fontSize: 50,
                    border: '2px solid #FFD296',
                }}>
                    ⏰
                </div>

                <h1 style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: '#111',
                    marginBottom: 12,
                }}>
                    Plan Expired
                </h1>

                <p style={{
                    fontSize: 16,
                    color: '#666',
                    marginBottom: 32,
                    lineHeight: 1.6,
                }}>
                    Your weekly plan has ended. Renew now to continue your progress!
                </p>

                {/* Progress Card */}
                <div style={{
                    background: 'var(--gray-50)',
                    borderRadius: 18,
                    padding: '24px',
                    marginBottom: 32,
                    textAlign: 'left',
                }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span>📊</span> Your Progress So Far
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                        {[
                            { value: '7', label: 'Days Completed', color: '#22C55E' },
                            { value: '21', label: 'Meals Tracked', color: '#3B82F6' },
                            { value: '85%', label: 'Consistency', color: '#F06922' },
                        ].map((stat, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: 24, fontWeight: 800, color: stat.color }}>{stat.value}</p>
                                <p style={{ fontSize: 11, color: 'var(--gray-400)' }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Renewal Offer */}
                <div style={{
                    background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
                    borderRadius: 18,
                    padding: '24px',
                    marginBottom: 32,
                    border: '2px solid #FFD296',
                }}>
                    <p style={{ fontSize: 13, color: '#F06922', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>
                        🎁 Welcome Back Offer
                    </p>
                    <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>
                        Renew today and get <strong style={{ color: '#F06922' }}>1 extra day FREE</strong>!
                    </p>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'grid', gap: 14 }}>
                    <button
                        onClick={() => navigate('/renew-plan')}
                        style={{
                            width: '100%',
                            background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
                            border: 'none',
                            borderRadius: 16,
                            padding: '20px',
                            fontSize: 17,
                            fontWeight: 700,
                            color: 'var(--white)',
                            cursor: 'pointer',
                            boxShadow: '0 10px 40px rgba(240, 105, 34, 0.35)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 10,
                        }}
                    >
                        🔄 Renew for ₹29/week
                    </button>

                    <button
                        onClick={() => navigate('/change-plan')}
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
                        🔀 Try a Different Plan
                    </button>
                </div>
            </div>
        </div>
    );
}
