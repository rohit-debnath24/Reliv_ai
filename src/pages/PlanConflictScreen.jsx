import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

/**
 * Plan Conflict Screen — User already in a group/plan, can't join another.
 */
export default function PlanConflictScreen() {
  const navigate = useNavigate();
  const existingPlan = localStorage.getItem('planType') || 'weekly';
  const groupType = localStorage.getItem('groupType') || 'solo';

  return (
    <Layout title="⚠️ Plan Conflict" subtitle="You already have an active plan" showBack onBack={() => navigate(-1)}>
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '40px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontSize: 72, marginBottom: 8 }}>⚠️</div>

        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#2D3436' }}>
          You Already Have an Active Plan
        </h2>

        <p style={{ fontSize: 16, color: '#636E72', lineHeight: 1.6, maxWidth: 400, margin: '0 auto' }}>
          You're currently on a <strong>{existingPlan}</strong> plan ({groupType}).
          You can't join a new group until your current plan expires.
        </p>

        {/* Current plan card */}
        <div style={{
          background: '#FFF',
          borderRadius: 16,
          padding: '20px 24px',
          border: '2px solid rgba(240,105,34,0.2)',
          textAlign: 'left',
        }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#F06922', marginBottom: 12 }}>Current Plan:</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 14, color: '#636E72' }}>Type</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#2D3436' }}>{existingPlan.charAt(0).toUpperCase() + existingPlan.slice(1)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, color: '#636E72' }}>Group</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#2D3436' }}>{groupType.charAt(0).toUpperCase() + groupType.slice(1)}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={() => navigate('/return-active')}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
              border: 'none',
              borderRadius: 16,
              padding: '18px',
              fontSize: 17,
              fontWeight: 700,
              color: '#FFF',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(240,105,34,0.3)',
            }}
          >
            📋 View My Current Plan
          </button>

          <button
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              background: 'transparent',
              border: '2px solid #E5E7EB',
              borderRadius: 16,
              padding: '16px',
              fontSize: 15,
              fontWeight: 600,
              color: '#636E72',
              cursor: 'pointer',
            }}
          >
            🏠 Go Home
          </button>
        </div>
      </div>
    </Layout>
  );
}
