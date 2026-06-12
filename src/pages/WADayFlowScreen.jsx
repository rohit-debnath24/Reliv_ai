import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { C } from '../utils/constants';

export default function WADayFlowScreen() {
  const navigate = useNavigate();
  
  const daySchedule = [
    { time: '8:00 AM', icon: '💧', text: '1st glass of water?', type: 'water' },
    { time: '8:30 AM', icon: '🍳', text: 'Breakfast: eggs + parathas?', type: 'meal' },
    { time: '10:00 AM', icon: '💧', text: '2nd glass of water?', type: 'water' },
    { time: '12:30 PM', icon: '🍲', text: 'Lunch: rice + dal + sabzi?', type: 'meal' },
    { time: '3:00 PM', icon: '💧', text: '3rd glass of water?', type: 'water' },
    { time: '5:00 PM', icon: '💪', text: '10 pushups + 10 squats?', type: 'workout' },
    { time: '6:00 PM', icon: '💧', text: '4th glass of water?', type: 'water' },
    { time: '8:00 PM', icon: '🍛', text: 'Dinner: chicken + roti + salad?', type: 'meal' },
  ];
  
  const typeColors = {
    water: '#3B82F6',
    meal: C.primary,
    workout: C.success
  };

  return (
    <Layout title="A Full Day — The Loop" showBack onBack={() => navigate('/wa-preview')}>
      <div style={{ maxWidth: 500, margin: '0 auto', padding: '0 16px' }}>
        
        {/* Header Card */}
        <div style={{
          background: `linear-gradient(135deg, ${C.primary}10, ${C.primaryLight}15)`,
          borderRadius: 16,
          padding: 20,
          border: `1px solid ${C.border}`,
          marginBottom: 24
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 8 }}>
            🧠 The Complete Brain
          </h2>
          <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6 }}>
            1️⃣ Bot generates YOUR plan (meals + water + workout)<br/>
            2️⃣ WhatsApp fires reminders all day<br/>
            3️⃣ You reply YES/NO → we track everything<br/>
            4️⃣ Come back → we know your progress
          </p>
        </div>
        
        {/* Day Timeline */}
        <div style={{
          background: '#fff',
          borderRadius: 20,
          padding: 20,
          border: `1px solid ${C.border}`,
          boxShadow: C.shadow,
          marginBottom: 24
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.textMid, marginBottom: 16 }}>
            📅 YOUR DAY — AUTOMATED
          </h3>
          
          <div style={{ position: 'relative' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              left: 23,
              top: 20,
              bottom: 20,
              width: 2,
              background: C.bgMid,
              borderRadius: 1
            }} />
            
            {daySchedule.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                marginBottom: i < daySchedule.length - 1 ? 16 : 0,
                position: 'relative'
              }}>
                {/* Time */}
                <div style={{
                  width: 48,
                  fontSize: 11,
                  color: C.textMid,
                  fontWeight: 600,
                  paddingTop: 10,
                  textAlign: 'right',
                  flexShrink: 0
                }}>
                  {item.time}
                </div>
                
                {/* Icon Circle */}
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: `${typeColors[item.type]}15`,
                  border: `2px solid ${typeColors[item.type]}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  flexShrink: 0,
                  zIndex: 1
                }}>
                  {item.icon}
                </div>
                
                {/* Message */}
                <div style={{
                  flex: 1,
                  background: C.bgLight,
                  borderRadius: 12,
                  padding: '10px 14px',
                  borderLeft: `3px solid ${typeColors[item.type]}`
                }}>
                  <p style={{ fontSize: 13, color: C.text }}>{item.text}</p>
                  <p style={{ fontSize: 11, color: C.textMid, marginTop: 4 }}>→ YES / NO</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* NO Response Info */}
        <div style={{
          background: `${C.primary}08`,
          borderRadius: 14,
          padding: 16,
          border: `1px solid ${C.primary}20`,
          marginBottom: 20
        }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 }}>
            ❓ What if you say NO?
          </p>
          <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5 }}>
            No problem! We remind you again later the same day. No guilt, no shame — just gentle nudges until you're ready.
          </p>
        </div>
        
        {/* Storage Info */}
        <div style={{
          background: `${C.success}08`,
          borderRadius: 14,
          padding: 16,
          border: `1px solid ${C.success}20`,
          marginBottom: 24
        }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 }}>
            💾 Everything is Stored
          </p>
          <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5 }}>
            Next time you visit the kiosk, we read your history and adjust your plan based on what actually worked!
          </p>
        </div>
        
        {/* Back to Activation */}
        <button
          onClick={() => navigate('/activation')}
          style={{
            width: '100%',
            padding: '16px',
            border: `2px solid ${C.primary}`,
            borderRadius: 14,
            background: `${C.primary}10`,
            color: C.primary,
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            marginBottom: 12
          }}
        >
          ← Back to Activation
        </button>
        
        <button
          onClick={() => navigate('/return-active')}
          style={{
            width: '100%',
            padding: '16px',
            border: 'none',
            borderRadius: 14,
            background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
            color: '#fff',
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: C.shadowPrimary
          }}
        >
          🔄 See: What Kiosk Sees on Return Visit
        </button>
        
      </div>
    </Layout>
  );
}
