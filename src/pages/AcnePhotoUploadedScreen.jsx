import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

/**
 * S35 — Acne Photo Uploaded / ML Results
 * Displays the AI analysis results after photo upload.
 */
export default function AcnePhotoUploadedScreen() {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [keepPhoto, setKeepPhoto] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('acneAnalysis');
    if (data) {
      setAnalysis(JSON.parse(data));
      setTimeout(() => setShowResults(true), 300);
    } else {
      navigate('/acne-manual');
    }
  }, [navigate]);

  if (!analysis) return null;

  const typeLabels = {
    active_acne: { label: 'Active Acne', icon: '🔴', color: '#EF4444' },
    blackheads:  { label: 'Blackheads',  icon: '⚫', color: '#374151' },
    whiteheads:  { label: 'Whiteheads',  icon: '⚪', color: '#9CA3AF' },
    acne_scars:  { label: 'Acne Scars',  icon: '🟤', color: '#92400E' },
    mixed:       { label: 'Mixed Types',  icon: '🎨', color: '#8B5CF6' },
  };

  const severityMap = {
    mild:     { label: 'Mild',     color: '#22C55E', bar: 25 },
    moderate: { label: 'Moderate', color: '#FFA500', bar: 55 },
    severe:   { label: 'Severe',   color: '#EF4444', bar: 85 },
  };

  const typeInfo = typeLabels[analysis.type] || typeLabels.active_acne;
  const sevInfo = severityMap[analysis.severity] || severityMap.moderate;
  const confidence = Math.round((analysis.confidence || 0.87) * 100);

  return (
    <Layout title="🔬 Analysis Results" subtitle="AI Skin Diagnosis" showBack onBack={() => navigate(-1)}>
      <div style={{
        maxWidth: 640,
        margin: '0 auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        opacity: showResults ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}>
        {/* Hero result card */}
        <div style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF9F5 100%)',
          borderRadius: 20,
          padding: '28px',
          border: `2px solid ${typeInfo.color}30`,
          boxShadow: `0 8px 30px ${typeInfo.color}15`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>{typeInfo.icon}</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: typeInfo.color, marginBottom: 6 }}>
            {typeInfo.label}
          </h2>
          <p style={{ fontSize: 15, color: '#636E72' }}>Detected with {confidence}% confidence</p>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {/* Severity */}
          <div style={{
            background: '#FFF',
            borderRadius: 14,
            padding: '16px',
            textAlign: 'center',
            border: '1px solid #E5E7EB',
          }}>
            <div style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 600, marginBottom: 6 }}>SEVERITY</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: sevInfo.color }}>{sevInfo.label}</div>
            <div style={{ width: '100%', height: 4, background: '#E5E7EB', borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
              <div style={{ width: `${sevInfo.bar}%`, height: '100%', background: sevInfo.color, borderRadius: 2, transition: 'width 1s ease' }} />
            </div>
          </div>

          {/* Location */}
          <div style={{
            background: '#FFF',
            borderRadius: 14,
            padding: '16px',
            textAlign: 'center',
            border: '1px solid #E5E7EB',
          }}>
            <div style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 600, marginBottom: 6 }}>LOCATION</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#2D3436' }}>
              {(analysis.location || ['cheeks']).map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(', ')}
            </div>
          </div>

          {/* Lesion Count */}
          <div style={{
            background: '#FFF',
            borderRadius: 14,
            padding: '16px',
            textAlign: 'center',
            border: '1px solid #E5E7EB',
          }}>
            <div style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 600, marginBottom: 6 }}>LESIONS</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#F06922' }}>
              {analysis.lesionCount || '—'}
            </div>
          </div>
        </div>

        {/* Recommendations card */}
        <div style={{
          background: 'rgba(255,107,53,0.06)',
          border: '1px solid rgba(255,107,53,0.15)',
          borderRadius: 16,
          padding: '24px',
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#F06922', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            💡 Recommendations
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {(analysis.recommendations || []).map((rec, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
                fontSize: 14,
                color: '#2D3436',
                lineHeight: 1.5,
              }}>
                <span style={{ color: '#F06922', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy option */}
        <div style={{
          background: 'rgba(0,184,148,0.06)',
          border: '1px solid rgba(0,184,148,0.2)',
          borderRadius: 16,
          padding: '20px 24px',
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#00B894', marginBottom: 12 }}>
            🔐 Photo Privacy
          </h3>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => setKeepPhoto(true)}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 12,
                border: keepPhoto ? '2px solid #00B894' : '2px solid #E5E7EB',
                background: keepPhoto ? 'rgba(0,184,148,0.1)' : '#FFF',
                fontSize: 14,
                fontWeight: 600,
                color: keepPhoto ? '#00B894' : '#636E72',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              🗂️ Keep Photo
              <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>For progress tracking</div>
            </button>
            <button
              onClick={() => setKeepPhoto(false)}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 12,
                border: !keepPhoto ? '2px solid #EF4444' : '2px solid #E5E7EB',
                background: !keepPhoto ? 'rgba(239,68,68,0.06)' : '#FFF',
                fontSize: 14,
                fontWeight: 600,
                color: !keepPhoto ? '#EF4444' : '#636E72',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              🗑️ Delete Photo
              <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>Remove after analysis</div>
            </button>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => {
            localStorage.setItem('acneKeepPhoto', keepPhoto ? 'yes' : 'no');
            navigate('/acne-treatment');
          }}
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
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Get My Skincare Routine →
        </button>
      </div>
    </Layout>
  );
}
