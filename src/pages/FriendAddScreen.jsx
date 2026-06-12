import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { C } from '../utils/constants';

export default function FriendAddScreen() {
  const navigate = useNavigate();
  const [friendSize, setFriendSize] = useState(3);
  const [phones, setPhones] = useState(['']);
  const [focused, setFocused] = useState(null);
  
  useEffect(() => {
    const size = parseInt(localStorage.getItem('friendSize') || '3');
    setFriendSize(size);
    // Create phone slots for friends (excluding self)
    setPhones(Array(size - 1).fill(''));
  }, []);
  
  const pricePerPerson = friendSize === 2 ? 25 : 28;
  const totalPrice = friendSize === 2 ? 49 : friendSize * 28;
  
  const updatePhone = (index, value) => {
    const newPhones = [...phones];
    newPhones[index] = value.replace(/\D/g, '').slice(0, 10);
    setPhones(newPhones);
  };
  
  const allValid = phones.every(p => p.length === 10);
  
  const handleContinue = () => {
    localStorage.setItem('friendPhones', JSON.stringify(phones));
    navigate('/friend-questions');
  };

  return (
    <Layout title="Add Your Squad" showBack onBack={() => navigate('/friend-size')}>
      <div style={{ maxWidth: 500, margin: '0 auto', padding: '0 16px' }}>
        
        {/* Header */}
        <div style={{
          background: '#fff',
          borderRadius: 16,
          padding: 20,
          border: `1px solid ${C.border}`,
          boxShadow: C.shadow,
          marginBottom: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: `${C.success}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24
            }}>
              ✓
            </div>
            <div>
              <p style={{ fontSize: 12, color: C.textMid }}>Member 1 (You)</p>
              <p style={{ fontSize: 16, fontWeight: 600, color: C.success }}>+91 XXXXX XXXXX</p>
            </div>
          </div>
          <div style={{
            background: C.bgLight,
            borderRadius: 10,
            padding: 12,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: 13, color: C.textMid }}>Squad size: {friendSize} people</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.primary }}>₹{totalPrice}/week</span>
          </div>
        </div>
        
        {/* Phone Inputs */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 12 }}>
            Add Friend Numbers
          </h3>
          
          {phones.map((phone, index) => (
            <div key={index} style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 12, color: C.textMid, marginBottom: 6 }}>
                Member {index + 2}
              </label>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{
                  background: C.bgLight,
                  borderRadius: 12,
                  padding: '16px 14px',
                  border: `2px solid ${C.border}`,
                  fontSize: 15,
                  color: C.text,
                  fontWeight: 600
                }}>
                  +91
                </div>
                <input 
                  type="tel" 
                  maxLength="10" 
                  value={phone} 
                  onChange={(e) => updatePhone(index, e.target.value)} 
                  onFocus={() => setFocused(index)}
                  onBlur={() => setFocused(null)}
                  placeholder="Enter 10-digit number" 
                  style={{ 
                    flex: 1, 
                    background: C.bgLight, 
                    border: `2px solid ${focused === index ? C.primary : phone.length === 10 ? C.success : C.border}`, 
                    borderRadius: 12, 
                    padding: '16px', 
                    fontSize: 16, 
                    color: C.text, 
                    outline: 'none',
                    fontWeight: 500,
                    transition: 'border-color 0.2s'
                  }} 
                />
                {phone.length === 10 && (
                  <div style={{
                    width: 52,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `${C.success}15`,
                    borderRadius: 12,
                    color: C.success,
                    fontSize: 20
                  }}>
                    ✓
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Price Summary */}
        <div style={{
          background: C.bgLight,
          borderRadius: 14,
          padding: 16,
          marginBottom: 24
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 14, color: C.textMid }}>{friendSize} members × ₹{pricePerPerson}</span>
            <span style={{ fontSize: 14, color: C.text }}>₹{totalPrice}/week</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, color: C.textMid }}>Per person</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.success }}>₹{pricePerPerson}/week</span>
          </div>
        </div>
        
        {/* Continue Button */}
        <button 
          onClick={handleContinue} 
          disabled={!allValid} 
          style={{ 
            width: '100%', 
            background: allValid 
              ? `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})` 
              : C.bgMid, 
            border: 'none', 
            borderRadius: 14, 
            padding: '18px', 
            fontSize: 17, 
            fontWeight: 700, 
            color: allValid ? '#fff' : C.textMid, 
            cursor: allValid ? 'pointer' : 'not-allowed',
            boxShadow: allValid ? C.shadowPrimary : 'none',
            transition: 'all 0.2s'
          }}
        >
          Send Invites & Continue →
        </button>
        
        <p style={{ fontSize: 12, color: C.textMid, textAlign: 'center', marginTop: 16 }}>
          📱 Each friend will receive OTP to verify
        </p>
        
      </div>
    </Layout>
  );
}
