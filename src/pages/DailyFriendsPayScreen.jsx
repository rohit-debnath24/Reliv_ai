import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function DailyFriendsPayScreen() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const friendCount = parseInt(localStorage.getItem('friendCount') || '3');
    const celebrity = localStorage.getItem('celebrity') || 'virat';
    const celebInfo = {
        virat: { name: 'Virat Kohli', emoji: '🏏', basePrice: 15, color: '#1E40AF' },
        alia: { name: 'Alia Bhatt', emoji: '🧘‍♀️', basePrice: 12, color: '#DB2777' },
        salman: { name: 'Salman Khan', emoji: '💪', basePrice: 15, color: '#16A34A' },
        deepika: { name: 'Deepika Padukone', emoji: '✨', basePrice: 12, color: '#9333EA' },
        hrithik: { name: 'Hrithik Roshan', emoji: '🔥', basePrice: 15, color: '#DC2626' },
        priyanka: { name: 'Priyanka Chopra', emoji: '🌟', basePrice: 12, color: '#F59E0B' },
    };
    const info = celebInfo[celebrity] || celebInfo.virat;
    const totalPrice = info.basePrice * friendCount;
    const perPerson = Math.round(totalPrice / friendCount);

    const handlePay = () => {
        setLoading(true);
        setTimeout(() => navigate('/activation'), 1200);
    };

    return (
        <Layout
            title="Daily Squad Plan"
            subtitle={`${friendCount} friends, ${info.name} style`}
            showBack
            onBack={() => navigate(-1)}
        >
            <div style={{ maxWidth: 520, margin: '0 auto' }}>
                <div style={{
                    background: 'var(--white)',
                    borderRadius: 28,
                    padding: '40px 36px',
                    boxShadow: '0 20px 60px rgba(139, 92, 246, 0.1)',
                    border: '2px solid rgba(139, 92, 246, 0.15)',
                    marginBottom: 28,
                }}>
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 16,
                        marginBottom: 32,
                    }}>
                        <div style={{
                            width: 70,
                            height: 70,
                            background: `linear-gradient(135deg, ${info.color}20 0%, ${info.color}30 100%)`,
                            borderRadius: 20,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 36,
                        }}>
                            {info.emoji}
                        </div>
                        <span style={{ fontSize: 24, color: '#8B5CF6' }}>×</span>
                        <div style={{
                            width: 70,
                            height: 70,
                            background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
                            borderRadius: 20,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 28,
                            fontWeight: 800,
                            color: '#8B5CF6',
                        }}>
                            {friendCount}
                        </div>
                    </div>

                    <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 8 }}>
                        {info.name} Style × {friendCount}
                    </h2>
                    <p style={{ textAlign: 'center', fontSize: 14, color: '#666', marginBottom: 28 }}>
                        One day celebrity plan for you and your squad
                    </p>

                    {/* Features */}
                    <div style={{
                        background: 'var(--gray-50)',
                        borderRadius: 16,
                        padding: '20px',
                        marginBottom: 28,
                    }}>
                        {[
                            'Celebrity-inspired meals for everyone',
                            'Individual WhatsApp reminders',
                            'Group accountability',
                            'Compete with friends!',
                        ].map((f, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
                                <span style={{ color: '#22C55E' }}>✓</span>
                                <span style={{ fontSize: 14, color: '#333' }}>{f}</span>
                            </div>
                        ))}
                    </div>

                    {/* Price */}
                    <div style={{
                        textAlign: 'center',
                        marginBottom: 28,
                    }}>
                        <p style={{ fontSize: 14, color: 'var(--gray-400)', marginBottom: 8 }}>For {friendCount} friends</p>
                        <p style={{ fontSize: 48, fontWeight: 800, color: '#8B5CF6' }}>₹{totalPrice}</p>
                        <p style={{ fontSize: 13, color: '#666' }}>₹{perPerson} per person</p>
                    </div>

                    {/* Pay Button */}
                    <button
                        onClick={handlePay}
                        disabled={loading}
                        style={{
                            width: '100%',
                            background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                            border: 'none',
                            borderRadius: 16,
                            padding: '22px',
                            fontSize: 18,
                            fontWeight: 700,
                            color: 'var(--white)',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            boxShadow: '0 10px 40px rgba(139, 92, 246, 0.35)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 12,
                        }}
                    >
                        {loading ? (
                            <>
                                <span style={{
                                    width: 24,
                                    height: 24,
                                    border: '3px solid rgba(255,255,255,0.3)',
                                    borderTopColor: 'var(--white)',
                                    borderRadius: '50%',
                                    animation: 'spin 0.8s linear infinite',
                                }} />
                                Processing...
                            </>
                        ) : (
                            `💳 Pay ₹${totalPrice}`
                        )}
                    </button>
                </div>

                <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--gray-400)' }}>
                    🔒 Secure payment • Valid for 24 hours
                </p>
            </div>

            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </Layout>
    );
}
