import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { C } from '../utils/constants';

export default function ReturnTodayScreen() {
  const navigate = useNavigate();
  const todayPlan = [
    { icon: '💧', title: 'Water', target: '4 glasses', color: '#3B82F6', tip: 'Stay hydrated throughout the day' },
    { icon: '🍽️', title: 'Meals', target: '3 meals tracked', color: '#F59E0B', tip: 'Reply YES/NO to meal reminders' },
    { icon: '💪', title: 'Workout', target: '30 minutes', color: '#EC4899', tip: 'Any physical activity counts!' }
  ];

  return (
    <Layout title="Today's Plan" subtitle="Here's what to focus on today">
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        {/* Today's Goals */}
        <div style={{ background: 'var(--white)', borderRadius: 20, padding: 24, border: '1px solid #FFD296', marginBottom: 20, boxShadow: '0 4px 20px rgba(240, 105, 34, 0.08)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 18 }}>🎯 Today's Goals</h3>
          {todayPlan.map((item, i) => (
            <div key={i} style={{ background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEE5 100%)', borderRadius: 14, padding: '16px 20px', marginBottom: i < 2 ? 12 : 0, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{item.title}</p>
                  <span style={{ fontSize: 14, fontWeight: 600, color: item.color }}>{item.target}</span>
                </div>
                <p style={{ fontSize: 12, color: C.textDim }}>{item.tip}</p>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Info */}
        <div style={{ background: '#ECFDF5', borderRadius: 16, padding: '18px 22px', border: '1px solid #A7F3D0', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#059669' }}>WhatsApp reminders are active!</p>
            <p style={{ fontSize: 12, color: '#10B981' }}>Reply YES/NO to track your progress</p>
          </div>
        </div>

        {/* Done Button */}
        <button onClick={() => navigate('/')} style={{ width: '100%', background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)', border: 'none', borderRadius: 14, padding: '18px', fontSize: 17, fontWeight: 700, color: 'var(--white)', cursor: 'pointer', boxShadow: '0 6px 25px rgba(240, 105, 34, 0.35)' }}>
          Got It! Let's Go! 🚀
        </button>
      </div>
    </Layout>
  );
}
