import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function DailyPartnerPayScreen() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const celebrity = localStorage.getItem('celebrity') || 'virat';
    const celebInfo = {
        virat: { name: 'Virat Kohli', emoji: '🏏', price: 26, color: '#1E40AF' },
        alia: { name: 'Alia Bhatt', emoji: '🧘‍♀️', price: 22, color: '#DB2777' },
        salman: { name: 'Salman Khan', emoji: '💪', price: 26, color: '#16A34A' },
        deepika: { name: 'Deepika Padukone', emoji: '✨', price: 22, color: '#9333EA' },
        hrithik: { name: 'Hrithik Roshan', emoji: '🔥', price: 26, color: '#DC2626' },
        priyanka: { name: 'Priyanka Chopra', emoji: '🌟', price: 22, color: '#F59E0B' },
    };
    const info = celebInfo[celebrity] || celebInfo.virat;

    const handlePay = () => {
        setLoading(true);
        setTimeout(() => navigate('/activation'), 1200);
    };

    return (
        <Layout
            title="Daily Partner Plan"
            subtitle={`Both of you, ${info.name} style`}
            showBack
            onBack={() => navigate(-1)}
        >
            <div style={{ maxWidth: 520, margin: '0 auto' }}>
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: 28,
                    padding: '40px 36px',
                    boxShadow: '0 20px 60px rgba(236, 72, 153, 0.1)',
                    border: '2px solid rgba(236, 72, 153, 0.15)',
                    marginBottom: 28,
                }}>
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 20,
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
                        <span style={{ fontSize: 24, color: '#EC4899' }}>+</span>
                        <div style={{
                            width: 70,
                            height: 70,
                            background: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
                            borderRadius: 20,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 36,
                        }}>
                            💑
                        </div>
                    </div>

                    <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 8 }}>
                        {info.name} Style × 2
                    </h2>
                    <p style={{ textAlign: 'center', fontSize: 14, color: '#666', marginBottom: 28 }}>
                        One day celebrity plan for you and your partner
                    </p>

                    {/* Features */}
                    <div style={{
                        background: '#FAFAFA',
                        borderRadius: 16,
                        padding: '20px',
                        marginBottom: 28,
                    }}>
                        {[
                            'Same celebrity-inspired meals',
                            'Separate WhatsApp reminders',
                            'Couple-friendly portions',
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
                        <p style={{ fontSize: 14, color: '#9CA3AF', marginBottom: 8 }}>For both of you</p>
                        <p style={{ fontSize: 48, fontWeight: 800, color: '#EC4899' }}>₹{info.price}</p>
                        <p style={{ fontSize: 13, color: '#666' }}>₹{Math.round(info.price / 2)} per person</p>
                    </div>

                    {/* Pay Button */}
                    <button
                        onClick={handlePay}
                        disabled={loading}
                        style={{
                            width: '100%',
                            background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
                            border: 'none',
                            borderRadius: 16,
                            padding: '22px',
                            fontSize: 18,
                            fontWeight: 700,
                            color: '#FFFFFF',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            boxShadow: '0 10px 40px rgba(236, 72, 153, 0.35)',
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
                                    borderTopColor: '#FFFFFF',
                                    borderRadius: '50%',
                                    animation: 'spin 0.8s linear infinite',
                                }} />
                                Processing...
                            </>
                        ) : (
                            `💳 Pay ₹${info.price}`
                        )}
                    </button>
                </div>

                <p style={{ textAlign: 'center', fontSize: 13, color: '#9CA3AF' }}>
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
