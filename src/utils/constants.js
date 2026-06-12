// Shared constants and utilities for Reliv AI

export const C = {
  // Primary Orange Theme
  primary: '#F06922',
  primaryDark: '#E85C25',
  primaryDeep: '#D45513',
  accent: '#FFA500',
  accentLight: '#FF7A00',
  
  // Cream/Warm Backgrounds
  bg: '#FFFCF8',
  bgLight: '#FFF5F0',
  bgWarm: '#FFEEE5',
  bgCard: '#FFE8DC',
  bgGradient: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEE5 50%, #FFE8DC 100%)',
  
  // Cards & Surfaces
  card: '#FFFFFF',
  cardHover: '#FFF9F5',
  
  // Status Colors
  green: '#22C55E',
  greenLight: '#10B981',
  blue: '#38BDF8',
  pink: '#EC4899',
  purple: '#A78BFA',
  yellow: '#FBBF24',
  red: '#EF4444',
  
  // Text Colors
  text: '#111111',
  textDark: '#1F2937',
  textMid: '#666666',
  textDim: '#9CA3AF',
  textLight: '#FFFFFF',
  
  // Borders
  border: '#FFD296',
  borderLight: '#E5E7EB',
  borderGold: '#FFD296',
  
  // WhatsApp
  wa: '#25D366',
  waBg: '#064e3b',
  
  // Shadows
  shadow: '0 4px 20px rgba(240, 105, 34, 0.15)',
  shadowHover: '0 8px 30px rgba(240, 105, 34, 0.25)',
};

export const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = {
  async call(endpoint, options = {}) {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      return data;
    } catch (err) {
      console.error('API Error:', err);
      throw err;
    }
  },
};
