import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, X, Zap, Heart, Star, TrendingUp, Award, Clock, Wifi, Sparkles, Sun, Moon, Gamepad2, MessageCircle, Calendar, Gift } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// FITBOT + RELIV PET BOT — COMPLETE PRODUCTION SYSTEM
// Glassmorphic Orange/White Theme | Animated Dots Background
// Real-Time WhatsApp Sync | Hardcoded + Customizable Features
// ═══════════════════════════════════════════════════════════════

const COLORS = {
  primary: '#FF6B35',
  primaryDark: '#E85A2A',
  primaryLight: '#FF8C61',
  white: '#FFFFFF',
  cream: '#FFF8F0',
  glass: 'rgba(255, 255, 255, 0.15)',
  glassDark: 'rgba(255, 107, 53, 0.1)',
  text: '#2D3436',
  textLight: '#636E72',
  success: '#00B894',
  warning: '#FDCB6E',
  danger: '#D63031',
};

// ═══════════════════════════════════════════════════════════════
// ANIMATED DOT BACKGROUND COMPONENT
// ═══════════════════════════════════════════════════════════════

const AnimatedDots = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      overflow: 'hidden',
      background: `radial-gradient(circle at 20% 30%, ${COLORS.primaryLight}15 0%, transparent 50%),
                   radial-gradient(circle at 80% 70%, ${COLORS.primary}10 0%, transparent 50%),
                   linear-gradient(135deg, ${COLORS.cream} 0%, ${COLORS.white} 100%)`
    }}>
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 6 + 2 + 'px',
            height: Math.random() * 6 + 2 + 'px',
            borderRadius: '50%',
            background: COLORS.primary,
            opacity: Math.random() * 0.3 + 0.1,
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
            animationDelay: Math.random() * 5 + 's'
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(20px, -20px); }
          50% { transform: translate(-20px, 20px); }
          75% { transform: translate(20px, 20px); }
        }
      `}</style>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

const FitBotKiosk = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [userData, setUserData] = useState({
    phone: '',
    code: '',
    email: '',
    referralCode: '',
    referralCredits: 0,
    
    // Plan
    planType: '',
    groupSize: 0,
    partnerPhone: '',
    celebrity: '',
    dailyPrice: 0,
    category: '',
    mealFreq: 3,
    mealTimes: {},
    
    // Subscription
    subscriptionStatus: 'none',
    subscriptionEnd: null,
    daysRemaining: 0,
    subscriptionType: 'weekly', // 'weekly' or 'monthly'
    
    // Progress
    progress: {
      water: { done: 0, target: 0 },
      meals: { done: 0, target: 0 },
      workouts: { done: 0, target: 0 },
    },
    streak: 0,
    stars: 0,
    
    // Pet Bot
    hasBot: false,
    botPairingCode: '',
    botFace: 'default',
    botSound: 'chime',
    botPersonality: 'cheerful',
    botSleepTime: '22:00',
    botWakeTime: '07:00',
    botIsOnline: false,
    botLastSeen: null,
    
    // Bot Stats
    botStars: 0,
    botLevel: 1,
    unlockedFaces: ['default', 'cat', 'dog'],
    unlockedGames: ['snake'],
    familyMessages: [],
    
    // Payment
    amountToPay: 0,
  });

  const [history, setHistory] = useState(['welcome']);
  const [botSyncStatus, setBotSyncStatus] = useState('disconnected');

  // ═══════════════════════════════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════════════════════════════
  
  const navigate = (screen) => {
    setCurrentScreen(screen);
    setHistory([...history, screen]);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentScreen(newHistory[newHistory.length - 1]);
    }
  };

  const updateData = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  // ═══════════════════════════════════════════════════════════════
  // SIMULATED MQTT/WEBSOCKET FOR BOT SYNC
  // ═══════════════════════════════════════════════════════════════
  
  useEffect(() => {
    if (userData.hasBot && userData.botPairingCode) {
      // Simulate WebSocket connection for real-time updates
      const ws = new WebSocket('wss://api.fitbot.com/ws');
      
      ws.onopen = () => {
        setBotSyncStatus('connected');
        console.log('🔗 Connected to bot sync server');
      };
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('📡 Bot update:', data);
        
        if (data.type === 'bot_status') {
          updateData({
            botIsOnline: data.online,
            botLastSeen: data.lastSeen
          });
        }
        
        if (data.type === 'bot_mood') {
          // Bot mood changed (happy/sad based on WhatsApp response)
          console.log('😊 Bot mood:', data.mood);
        }
      };
      
      return () => ws.close();
    }
  }, [userData.hasBot, userData.botPairingCode]);

  // ═══════════════════════════════════════════════════════════════
  // GLASSMORPHIC COMPONENTS
  // ═══════════════════════════════════════════════════════════════

  const GlassCard = ({ children, style, onClick, className = '' }) => (
    <div
      onClick={onClick}
      className={className}
      style={{
        background: COLORS.glass,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `2px solid ${COLORS.white}40`,
        borderRadius: '24px',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        ...style
      }}
    >
      {children}
    </div>
  );

  const Button = ({ children, primary, secondary, large, disabled, onClick, style, icon }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        padding: large ? '20px 32px' : '16px 24px',
        fontSize: large ? '20px' : '18px',
        fontWeight: 700,
        borderRadius: '16px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: primary 
          ? `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`
          : secondary
          ? COLORS.white
          : COLORS.glass,
        color: primary ? COLORS.white : secondary ? COLORS.primary : COLORS.text,
        boxShadow: primary 
          ? '0 8px 24px rgba(255, 107, 53, 0.3)'
          : secondary
          ? '0 4px 16px rgba(0, 0, 0, 0.1)'
          : 'none',
        opacity: disabled ? 0.5 : 1,
        transform: 'scale(1)',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        backdropFilter: 'blur(10px)',
        ...style
      }}
      onMouseEnter={(e) => !disabled && (e.target.style.transform = 'scale(1.02)')}
      onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
    >
      {icon && <span style={{ fontSize: '24px' }}>{icon}</span>}
      {children}
    </button>
  );

  const ScreenContainer = ({ title, subtitle, children, showBack = true }) => (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      zIndex: 1
    }}>
      {/* Header */}
      <div style={{
        background: COLORS.glass,
        backdropFilter: 'blur(20px)',
        padding: '24px',
        borderBottom: `2px solid ${COLORS.white}40`,
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        {showBack && (
          <button
            onClick={goBack}
            style={{
              background: COLORS.white,
              border: 'none',
              borderRadius: '12px',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            <ArrowLeft size={24} color={COLORS.primary} />
          </button>
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 900, 
            color: COLORS.text,
            margin: 0,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ 
              fontSize: '16px', 
              color: COLORS.textLight,
              margin: '4px 0 0 0'
            }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: '32px',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%'
      }}>
        {children}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // SCREEN DEFINITIONS
  // ═══════════════════════════════════════════════════════════════

  const screens = {
    // ────────────────────────────────────────────────────────────
    // WELCOME SCREEN
    // ────────────────────────────────────────────────────────────
    welcome: {
      render: () => (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ 
              fontSize: '120px', 
              marginBottom: '24px',
              filter: 'drop-shadow(0 8px 16px rgba(255, 107, 53, 0.3))',
              animation: 'bounce 2s ease-in-out infinite'
            }}>
              🏥
            </div>
            <h1 style={{
              fontSize: '64px',
              fontWeight: 900,
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px',
              textShadow: '0 4px 8px rgba(255, 107, 53, 0.2)'
            }}>
              FitBot Kiosk
            </h1>
            <p style={{ 
              fontSize: '24px', 
              color: COLORS.textLight,
              fontWeight: 600
            }}>
              Your AI Health Companion + Pet Bot
            </p>
          </div>

          {/* Stats Card */}
          <GlassCard style={{ marginBottom: '48px', maxWidth: '600px', width: '100%' }}>
            <h3 style={{ 
              color: COLORS.primary,
              fontSize: '14px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '24px'
            }}>
              🏆 Today's Champions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { name: 'Rahul K.', days: 23, emoji: '🔥' },
                { name: 'Priya S.', days: 19, emoji: '⭐' },
                { name: 'Amit P.', days: 15, emoji: '💪' }
              ].map((user, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  background: COLORS.white,
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                }}>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: COLORS.text }}>
                    {i + 1}. {user.name}
                  </span>
                  <span style={{ fontSize: '18px', fontWeight: 600, color: COLORS.primary }}>
                    {user.days} days {user.emoji}
                  </span>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: `${COLORS.primary}10`,
              borderRadius: '12px',
              textAlign: 'center',
              color: COLORS.textLight,
              fontSize: '16px',
              fontWeight: 600
            }}>
              📊 47 students used this today
            </div>
          </GlassCard>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '600px' }}>
            <Button onClick={() => navigate('phone')} primary large icon="👤">
              New User — FREE Trial
            </Button>
            <Button onClick={() => navigate('code_entry')} secondary large icon="🔄">
              Returning User
            </Button>
          </div>

          <style>{`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }
          `}</style>
        </div>
      )
    },

    // ────────────────────────────────────────────────────────────
    // BOT OFFER SCREEN (After Plan Activation)
    // ────────────────────────────────────────────────────────────
    bot_offer: {
      render: () => (
        <ScreenContainer title="🎉 Plan Activated!" subtitle="Your wellness journey starts now">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Success Card */}
            <GlassCard>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '80px', marginBottom: '16px' }}>✅</div>
                <h2 style={{ fontSize: '32px', fontWeight: 900, color: COLORS.success, marginBottom: '8px' }}>
                  Plan is LIVE!
                </h2>
                <div style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
                  borderRadius: '16px',
                  marginTop: '16px'
                }}>
                  <p style={{ fontSize: '14px', color: COLORS.white, opacity: 0.9, margin: 0 }}>
                    Your Access Code
                  </p>
                  <div style={{ fontSize: '48px', fontWeight: 900, color: COLORS.white, letterSpacing: '8px' }}>
                    {userData.code || '9876'}
                  </div>
                </div>
                <p style={{ marginTop: '16px', color: COLORS.textLight }}>
                  📱 Daily WhatsApp reminders starting tomorrow
                </p>
              </div>
            </GlassCard>

            {/* Pet Bot Offer */}
            <GlassCard style={{ 
              background: `linear-gradient(135deg, ${COLORS.glassDark} 0%, ${COLORS.glass} 100%)`,
              border: `3px solid ${COLORS.primary}40`
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🐾</div>
                <h2 style={{ 
                  fontSize: '36px', 
                  fontWeight: 900, 
                  color: COLORS.primary,
                  marginBottom: '16px'
                }}>
                  WANT A PET BOT FOR REMINDERS?
                </h2>
                <p style={{ fontSize: '18px', color: COLORS.text, marginBottom: '32px', lineHeight: 1.6 }}>
                  Get a physical companion that lives in your room!
                </p>

                {/* Features */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  marginBottom: '32px',
                  textAlign: 'left'
                }}>
                  {[
                    { icon: '✨', text: 'Shows emotions (happy when you comply!)' },
                    { icon: '🔔', text: 'Reminds you at YOUR times' },
                    { icon: '💕', text: 'Motivates with cute reactions' },
                    { icon: '🎵', text: 'Plays sounds & music' },
                    { icon: '🏠', text: 'Works ANYWHERE with WiFi' },
                    { icon: '🎮', text: '3 built-in mini games!' }
                  ].map((feature, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '12px',
                      background: COLORS.white,
                      borderRadius: '12px',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '24px' }}>{feature.icon}</span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: COLORS.text }}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div style={{
                  padding: '24px',
                  background: COLORS.white,
                  borderRadius: '16px',
                  marginBottom: '24px'
                }}>
                  <p style={{ fontSize: '16px', color: COLORS.textLight, margin: 0 }}>
                    One-time price
                  </p>
                  <div style={{ 
                    fontSize: '56px', 
                    fontWeight: 900, 
                    color: COLORS.primary,
                    marginTop: '8px'
                  }}>
                    ₹499
                  </div>
                  <p style={{ fontSize: '14px', color: COLORS.textLight, marginTop: '8px' }}>
                    Free shipping | Works with your plan
                  </p>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Button 
                    onClick={() => navigate('bot_payment')} 
                    primary 
                    large
                    icon="💳"
                  >
                    Buy Pet Bot ₹499
                  </Button>
                  <Button 
                    onClick={() => navigate('whatsapp_preview')} 
                    secondary
                    icon="⏭️"
                  >
                    Skip - WhatsApp Only
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>
        </ScreenContainer>
      )
    },

    // ────────────────────────────────────────────────────────────
    // BOT PAYMENT SCREEN
    // ────────────────────────────────────────────────────────────
    bot_payment: {
      render: () => (
        <ScreenContainer title="💳 Purchase Pet Bot" subtitle="One-time payment">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Product Card */}
            <GlassCard>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <div style={{ fontSize: '80px' }}>🤖</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '24px', fontWeight: 900, color: COLORS.text, marginBottom: '8px' }}>
                    Reliv Pet Bot Companion
                  </h3>
                  <div style={{ fontSize: '14px', color: COLORS.textLight, lineHeight: 1.6 }}>
                    • ESP32-C3 powered AI companion<br />
                    • OLED display with 6 face types<br />
                    • Buzzer + RGB LED + Touch sensor<br />
                    • Works anywhere with WiFi<br />
                    • 3 built-in games + customizable
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* What's Included */}
            <GlassCard style={{ background: `${COLORS.primary}10` }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: COLORS.primary, marginBottom: '16px' }}>
                📦 What's Included
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  '✅ Pet Bot device (pre-configured)',
                  '✅ USB-C cable + power adapter',
                  '✅ Quick setup guide',
                  '✅ Lifetime firmware updates',
                  '✅ Free shipping to your home'
                ].map((item, i) => (
                  <div key={i} style={{ 
                    fontSize: '16px', 
                    fontWeight: 600,
                    color: COLORS.text,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Hardcoded Features Info */}
            <GlassCard style={{ border: `2px solid ${COLORS.success}` }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
                <Sparkles size={32} color={COLORS.success} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: COLORS.success, marginBottom: '8px' }}>
                    Pre-Loaded Features (Cannot Change)
                  </h3>
                  <p style={{ fontSize: '14px', color: COLORS.textLight, lineHeight: 1.6 }}>
                    Your bot comes with 3 mini-games, 6 face types, expression animations, 
                    health quiz, and motivational messages built-in. These features work on 
                    ALL bots and cannot be modified.
                  </p>
                  <div style={{ 
                    marginTop: '12px',
                    padding: '12px',
                    background: `${COLORS.success}10`,
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: COLORS.text,
                    fontWeight: 600
                  }}>
                    🎨 You CAN customize: Reminder times, active face, sound theme, sleep schedule
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Price */}
            <GlassCard>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '18px', color: COLORS.textLight, marginBottom: '8px' }}>
                  Total Amount
                </p>
                <div style={{ 
                  fontSize: '64px', 
                  fontWeight: 900,
                  background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '8px'
                }}>
                  ₹499
                </div>
                <p style={{ fontSize: '14px', color: COLORS.textLight }}>
                  One-time purchase | No monthly fees
                </p>
              </div>
            </GlassCard>

            {/* Payment Button */}
            <Button 
              onClick={() => {
                // Simulate payment success
                updateData({ 
                  hasBot: true,
                  botPairingCode: 'A3X9K2',
                  unlockedFaces: ['default', 'cat', 'dog'],
                  unlockedGames: ['snake']
                });
                navigate('bot_pairing_code');
              }} 
              primary 
              large
              icon="💳"
            >
              Pay ₹499 & Get Bot
            </Button>
          </div>
        </ScreenContainer>
      )
    },

    // ────────────────────────────────────────────────────────────
    // BOT PAIRING CODE SCREEN
    // ────────────────────────────────────────────────────────────
    bot_pairing_code: {
      render: () => (
        <ScreenContainer title="✅ Bot Purchased!" subtitle="Setup instructions" showBack={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Success Animation */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '120px',
                animation: 'bounce 1s ease-in-out infinite'
              }}>
                🎉
              </div>
            </div>

            {/* Pairing Code */}
            <GlassCard style={{ 
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '16px', color: COLORS.white, opacity: 0.9, marginBottom: '8px' }}>
                Your Pairing Code
              </p>
              <div style={{
                fontSize: '72px',
                fontWeight: 900,
                color: COLORS.white,
                letterSpacing: '12px',
                fontFamily: 'monospace',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
              }}>
                {userData.botPairingCode}
              </div>
              <p style={{ fontSize: '14px', color: COLORS.white, opacity: 0.9, marginTop: '16px' }}>
                Save this! You'll need it to pair your bot
              </p>
            </GlassCard>

            {/* Setup Instructions */}
            <GlassCard>
              <h3 style={{ fontSize: '24px', fontWeight: 900, color: COLORS.primary, marginBottom: '24px' }}>
                📦 Setup Instructions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { num: '1', text: 'Take bot home (ships in 2-3 days)', icon: '🚚' },
                  { num: '2', text: 'Power on via USB cable', icon: '🔌' },
                  { num: '3', text: 'Connect to your WiFi (bot will guide you)', icon: '📡' },
                  { num: '4', text: 'Open Serial Monitor or bot app', icon: '📱' },
                  { num: '5', text: `Type: PAIR ${userData.botPairingCode}`, icon: '⌨️' },
                  { num: '6', text: 'Bot syncs in 5 seconds! 🎊', icon: '✅' }
                ].map((step, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'start',
                    padding: '16px',
                    background: i === 5 ? `${COLORS.success}15` : COLORS.white,
                    borderRadius: '12px',
                    border: i === 5 ? `2px solid ${COLORS.success}` : 'none'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: i === 5 
                        ? COLORS.success 
                        : `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 900,
                      color: COLORS.white,
                      flexShrink: 0
                    }}>
                      {step.num}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: COLORS.text, marginBottom: '4px' }}>
                        {step.icon} {step.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* WhatsApp Notification */}
            <GlassCard style={{ background: `${COLORS.success}10`, border: `2px solid ${COLORS.success}` }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <MessageCircle size={32} color={COLORS.success} />
                <div>
                  <p style={{ fontSize: '16px', fontWeight: 700, color: COLORS.text, marginBottom: '4px' }}>
                    📱 Pairing code sent to WhatsApp
                  </p>
                  <p style={{ fontSize: '14px', color: COLORS.textLight }}>
                    Check +91-{userData.phone} for your pairing instructions
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button 
                onClick={() => navigate('bot_customize')} 
                primary 
                large
                icon="🎨"
              >
                Customize Bot Now
              </Button>
              <Button 
                onClick={() => navigate('welcome')} 
                secondary
                icon="🏠"
              >
                Finish Setup
              </Button>
            </div>
          </div>
        </ScreenContainer>
      )
    },

    // ────────────────────────────────────────────────────────────
    // BOT CUSTOMIZATION SCREEN
    // ────────────────────────────────────────────────────────────
    bot_customize: {
      render: () => (
        <ScreenContainer title="🎨 Customize Your Pet Bot" subtitle="Choose your bot's personality">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Sync Status */}
            <GlassCard style={{ 
              background: botSyncStatus === 'connected' ? `${COLORS.success}15` : `${COLORS.warning}15`,
              border: `2px solid ${botSyncStatus === 'connected' ? COLORS.success : COLORS.warning}`
            }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Wifi size={24} color={botSyncStatus === 'connected' ? COLORS.success : COLORS.warning} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '16px', fontWeight: 700, color: COLORS.text, marginBottom: '4px' }}>
                    {botSyncStatus === 'connected' ? '✅ Bot Connected' : '⏳ Waiting for Bot...'}
                  </p>
                  <p style={{ fontSize: '14px', color: COLORS.textLight }}>
                    {botSyncStatus === 'connected' 
                      ? 'Changes will sync in real-time' 
                      : 'Power on your bot and pair it first'}
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Face Selection */}
            <GlassCard>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: COLORS.primary, marginBottom: '16px' }}>
                🐾 Choose Bot Face
              </h3>
              <p style={{ fontSize: '14px', color: COLORS.textLight, marginBottom: '20px' }}>
                Your bot has 6 face types built-in. Select which one to show:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {[
                  { id: 'default', emoji: '🤖', name: 'Robot', locked: false },
                  { id: 'cat', emoji: '🐱', name: 'Cat', locked: false },
                  { id: 'dog', emoji: '🐶', name: 'Dog', locked: false },
                  { id: 'panda', emoji: '🐼', name: 'Panda', locked: !userData.unlockedFaces.includes('panda') },
                  { id: 'bunny', emoji: '🐰', name: 'Bunny', locked: !userData.unlockedFaces.includes('bunny') },
                  { id: 'bear', emoji: '🐻', name: 'Bear', locked: !userData.unlockedFaces.includes('bear') }
                ].map((face) => (
                  <button
                    key={face.id}
                    onClick={() => !face.locked && updateData({ botFace: face.id })}
                    disabled={face.locked}
                    style={{
                      padding: '20px',
                      borderRadius: '16px',
                      border: userData.botFace === face.id 
                        ? `3px solid ${COLORS.primary}`
                        : `2px solid ${COLORS.white}40`,
                      background: userData.botFace === face.id 
                        ? `${COLORS.primary}20`
                        : COLORS.white,
                      cursor: face.locked ? 'not-allowed' : 'pointer',
                      opacity: face.locked ? 0.5 : 1,
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                  >
                    <div style={{ fontSize: '48px', marginBottom: '8px' }}>
                      {face.locked ? '🔒' : face.emoji}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: COLORS.text }}>
                      {face.name}
                    </div>
                    {face.locked && (
                      <div style={{ fontSize: '11px', color: COLORS.textLight, marginTop: '4px' }}>
                        Unlock at 100 ⭐
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* Sound Theme */}
            <GlassCard>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: COLORS.primary, marginBottom: '16px' }}>
                🎵 Sound Theme
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { id: 'chime', icon: '🎵', name: 'Chime', desc: 'Soft & gentle' },
                  { id: 'melody', icon: '🎶', name: 'Melody', desc: 'Musical notes' },
                  { id: 'beep', icon: '📢', name: 'Beep', desc: 'Simple alerts' },
                  { id: 'voice', icon: '🗣️', name: 'Voice', desc: 'Spoken words' }
                ].map((sound) => (
                  <button
                    key={sound.id}
                    onClick={() => updateData({ botSound: sound.id })}
                    style={{
                      padding: '20px',
                      borderRadius: '16px',
                      border: userData.botSound === sound.id 
                        ? `3px solid ${COLORS.primary}`
                        : `2px solid ${COLORS.white}40`,
                      background: userData.botSound === sound.id 
                        ? `${COLORS.primary}20`
                        : COLORS.white,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>{sound.icon}</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: COLORS.text, marginBottom: '4px' }}>
                      {sound.name}
                    </div>
                    <div style={{ fontSize: '13px', color: COLORS.textLight }}>
                      {sound.desc}
                    </div>
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* Personality */}
            <GlassCard>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: COLORS.primary, marginBottom: '16px' }}>
                💫 Bot Personality
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { id: 'cheerful', name: 'Cheerful & Energetic', desc: 'Always excited to motivate you!' },
                  { id: 'calm', name: 'Calm & Supportive', desc: 'Gentle encouragement and patience' },
                  { id: 'strict', name: 'Strict & Disciplined', desc: 'Pushes you to hit every goal' }
                ].map((personality) => (
                  <button
                    key={personality.id}
                    onClick={() => updateData({ botPersonality: personality.id })}
                    style={{
                      padding: '20px',
                      borderRadius: '16px',
                      border: userData.botPersonality === personality.id 
                        ? `3px solid ${COLORS.primary}`
                        : `2px solid ${COLORS.white}40`,
                      background: userData.botPersonality === personality.id 
                        ? `${COLORS.primary}20`
                        : COLORS.white,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ fontSize: '16px', fontWeight: 700, color: COLORS.text, marginBottom: '4px' }}>
                      {personality.name}
                    </div>
                    <div style={{ fontSize: '14px', color: COLORS.textLight }}>
                      {personality.desc}
                    </div>
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* Sleep Schedule */}
            <GlassCard>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: COLORS.primary, marginBottom: '16px' }}>
                🌙 Sleep Schedule
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: COLORS.text, marginBottom: '8px', display: 'block' }}>
                    Sleep Time
                  </label>
                  <input
                    type="time"
                    value={userData.botSleepTime}
                    onChange={(e) => updateData({ botSleepTime: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '12px',
                      border: `2px solid ${COLORS.white}40`,
                      background: COLORS.white,
                      fontSize: '18px',
                      fontWeight: 600,
                      color: COLORS.text
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: COLORS.text, marginBottom: '8px', display: 'block' }}>
                    Wake Time
                  </label>
                  <input
                    type="time"
                    value={userData.botWakeTime}
                    onChange={(e) => updateData({ botWakeTime: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '12px',
                      border: `2px solid ${COLORS.white}40`,
                      background: COLORS.white,
                      fontSize: '18px',
                      fontWeight: 600,
                      color: COLORS.text
                    }}
                  />
                </div>
              </div>
              <div style={{ 
                marginTop: '16px',
                padding: '12px',
                background: `${COLORS.warning}15`,
                borderRadius: '8px',
                fontSize: '13px',
                color: COLORS.textLight
              }}>
                💤 Bot will sleep during this time (no reminders)
              </div>
            </GlassCard>

            {/* Hardcoded Features Info */}
            <GlassCard style={{ background: `${COLORS.primary}10` }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                <Sparkles size={24} color={COLORS.primary} />
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: COLORS.primary, marginBottom: '8px' }}>
                    Built-in Features (All Bots)
                  </h3>
                  <p style={{ fontSize: '14px', color: COLORS.text, lineHeight: 1.6, marginBottom: '12px' }}>
                    These features are hardcoded and work on every bot:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px', fontWeight: 600 }}>
                    <div>🎮 3 Mini Games</div>
                    <div>😊 12+ Expressions</div>
                    <div>🧠 Health Quiz</div>
                    <div>💬 Motivational Messages</div>
                    <div>🎯 Progress Bars</div>
                    <div>🏆 Streak Tracker</div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Save Button */}
            <Button 
              onClick={() => {
                // Simulate MQTT sync
                setBotSyncStatus('connected');
                alert('✅ Settings synced to bot!');
                navigate('bot_status');
              }} 
              primary 
              large
              icon="💾"
            >
              Save & Sync to Bot
            </Button>
          </div>
        </ScreenContainer>
      )
    },

    // ────────────────────────────────────────────────────────────
    // BOT STATUS (Return Visit)
    // ────────────────────────────────────────────────────────────
    bot_status: {
      render: () => (
        <ScreenContainer title="🤖 Your Pet Bot Status" subtitle="Real-time updates">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Online Status */}
            <GlassCard style={{ 
              background: userData.botIsOnline ? `${COLORS.success}15` : `${COLORS.danger}15`,
              border: `2px solid ${userData.botIsOnline ? COLORS.success : COLORS.danger}`
            }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: userData.botIsOnline 
                    ? `linear-gradient(135deg, ${COLORS.success} 0%, #00D68F 100%)`
                    : `linear-gradient(135deg, ${COLORS.danger} 0%, #FF6B6B 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  animation: userData.botIsOnline ? 'pulse 2s ease-in-out infinite' : 'none'
                }}>
                  {userData.botIsOnline ? '✅' : '💤'}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '20px', fontWeight: 900, color: COLORS.text, marginBottom: '4px' }}>
                    {userData.botIsOnline ? 'Bot is ONLINE' : 'Bot is Offline'}
                  </p>
                  <p style={{ fontSize: '14px', color: COLORS.textLight }}>
                    {userData.botIsOnline 
                      ? 'Syncing in real-time' 
                      : userData.botLastSeen 
                      ? `Last seen: ${new Date(userData.botLastSeen).toLocaleString()}`
                      : 'Power on your bot to connect'}
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Current Settings */}
            <GlassCard>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: COLORS.primary, marginBottom: '16px' }}>
                ⚙️ Current Settings
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ padding: '16px', background: COLORS.white, borderRadius: '12px' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                    {userData.botFace === 'default' ? '🤖' :
                     userData.botFace === 'cat' ? '🐱' :
                     userData.botFace === 'dog' ? '🐶' :
                     userData.botFace === 'panda' ? '🐼' :
                     userData.botFace === 'bunny' ? '🐰' : '🐻'}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: COLORS.text }}>
                    Face: {userData.botFace}
                  </div>
                </div>
                <div style={{ padding: '16px', background: COLORS.white, borderRadius: '12px' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎵</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: COLORS.text }}>
                    Sound: {userData.botSound}
                  </div>
                </div>
                <div style={{ padding: '16px', background: COLORS.white, borderRadius: '12px' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>💫</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: COLORS.text }}>
                    Personality: {userData.botPersonality}
                  </div>
                </div>
                <div style={{ padding: '16px', background: COLORS.white, borderRadius: '12px' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>🌙</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: COLORS.text }}>
                    Sleep: {userData.botSleepTime} - {userData.botWakeTime}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Bot Stats */}
            <GlassCard>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: COLORS.primary, marginBottom: '16px' }}>
                📊 Bot Stats
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div style={{ textAlign: 'center', padding: '16px', background: COLORS.white, borderRadius: '12px' }}>
                  <div style={{ fontSize: '32px', fontWeight: 900, color: COLORS.primary }}>
                    {userData.botStars}
                  </div>
                  <div style={{ fontSize: '13px', color: COLORS.textLight, marginTop: '4px' }}>
                    Stars Earned
                  </div>
                </div>
                <div style={{ textAlign: 'center', padding: '16px', background: COLORS.white, borderRadius: '12px' }}>
                  <div style={{ fontSize: '32px', fontWeight: 900, color: COLORS.success }}>
                    {userData.botLevel}
                  </div>
                  <div style={{ fontSize: '13px', color: COLORS.textLight, marginTop: '4px' }}>
                    Bot Level
                  </div>
                </div>
                <div style={{ textAlign: 'center', padding: '16px', background: COLORS.white, borderRadius: '12px' }}>
                  <div style={{ fontSize: '32px', fontWeight: 900, color: COLORS.warning }}>
                    {userData.streak}
                  </div>
                  <div style={{ fontSize: '13px', color: COLORS.textLight, marginTop: '4px' }}>
                    Day Streak 🔥
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Unlocked Features */}
            <GlassCard>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: COLORS.primary, marginBottom: '16px' }}>
                🔓 Unlocked Features
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '12px', background: COLORS.white, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>Faces</span>
                  <span style={{ fontSize: '14px', color: COLORS.primary, fontWeight: 700 }}>
                    {userData.unlockedFaces.length}/6 unlocked
                  </span>
                </div>
                <div style={{ padding: '12px', background: COLORS.white, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>Mini Games</span>
                  <span style={{ fontSize: '14px', color: COLORS.primary, fontWeight: 700 }}>
                    {userData.unlockedGames.length}/3 unlocked
                  </span>
                </div>
              </div>
            </GlassCard>

            {/* Subscription Status */}
            <GlassCard style={{ 
              background: userData.subscriptionStatus === 'active' 
                ? `${COLORS.success}15` 
                : `${COLORS.danger}15`,
              border: `2px solid ${userData.subscriptionStatus === 'active' ? COLORS.success : COLORS.danger}`
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>
                  {userData.subscriptionStatus === 'active' ? '✅' : '⚠️'}
                </div>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: 900,
                  color: userData.subscriptionStatus === 'active' ? COLORS.success : COLORS.danger,
                  marginBottom: '8px'
                }}>
                  {userData.subscriptionStatus === 'active' 
                    ? `${userData.subscriptionType === 'weekly' ? 'Weekly' : 'Monthly'} Plan Active`
                    : 'Subscription Ended'}
                </h3>
                <p style={{ fontSize: '16px', color: COLORS.textLight, marginBottom: '16px' }}>
                  {userData.subscriptionStatus === 'active' 
                    ? `${userData.daysRemaining} days remaining`
                    : 'Visit Reliv Kiosk to renew'}
                </p>
                {userData.subscriptionStatus !== 'active' && (
                  <div style={{ 
                    padding: '12px',
                    background: COLORS.white,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: COLORS.text
                  }}>
                    🤖 Bot will show "Subscription Ended" message<br />
                    All reminders are paused until renewal
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button 
                onClick={() => navigate('bot_customize')} 
                primary
                icon="🎨"
              >
                Customize Bot
              </Button>
              <Button 
                onClick={() => navigate('bot_games')} 
                secondary
                icon="🎮"
              >
                Play Mini Games
              </Button>
              <Button 
                onClick={() => navigate('welcome')} 
                secondary
                icon="🏠"
              >
                Back to Home
              </Button>
            </div>

            <style>{`
              @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.05); opacity: 0.9; }
              }
            `}</style>
          </div>
        </ScreenContainer>
      )
    },

    // ────────────────────────────────────────────────────────────
    // BOT GAMES MENU
    // ────────────────────────────────────────────────────────────
    bot_games: {
      render: () => (
        <ScreenContainer title="🎮 Mini Games" subtitle="Play on your pet bot">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <GlassCard style={{ background: `${COLORS.primary}10` }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Gamepad2 size={32} color={COLORS.primary} />
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: COLORS.primary, marginBottom: '4px' }}>
                    Hardcoded Games
                  </h3>
                  <p style={{ fontSize: '14px', color: COLORS.text }}>
                    These 3 games are built into ALL bots (cannot be changed)
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Game Cards */}
            {[
              { 
                id: 'snake', 
                name: 'Snake Game', 
                icon: '🐍', 
                desc: 'Classic snake - eat food, grow longer',
                unlocked: userData.unlockedGames.includes('snake'),
                stars: 0
              },
              { 
                id: 'memory', 
                name: 'Memory Match', 
                icon: '🧠', 
                desc: 'Match pairs of emojis',
                unlocked: userData.unlockedGames.includes('memory'),
                stars: 50
              },
              { 
                id: 'reaction', 
                name: 'Reaction Time', 
                icon: '⚡', 
                desc: 'Test your reflexes',
                unlocked: userData.unlockedGames.includes('reaction'),
                stars: 100
              }
            ].map((game) => (
              <GlassCard 
                key={game.id}
                style={{
                  opacity: game.unlocked ? 1 : 0.6,
                  border: game.unlocked ? `2px solid ${COLORS.primary}40` : `2px solid ${COLORS.white}40`
                }}
              >
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <div style={{ 
                    fontSize: '64px',
                    filter: game.unlocked ? 'none' : 'grayscale(1)'
                  }}>
                    {game.unlocked ? game.icon : '🔒'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 900, color: COLORS.text, marginBottom: '8px' }}>
                      {game.name}
                    </h3>
                    <p style={{ fontSize: '14px', color: COLORS.textLight, marginBottom: '12px' }}>
                      {game.desc}
                    </p>
                    {!game.unlocked && (
                      <div style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        background: `${COLORS.warning}20`,
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: COLORS.warning
                      }}>
                        🔒 Unlock at {game.stars} ⭐
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}

            <GlassCard style={{ textAlign: 'center' }}>
              <Gamepad2 size={48} color={COLORS.primary} style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: COLORS.text, marginBottom: '8px' }}>
                Play on Your Bot!
              </h3>
              <p style={{ fontSize: '14px', color: COLORS.textLight, lineHeight: 1.6 }}>
                Use the touch sensor on your bot to navigate menus and play games. 
                High scores are saved and shown here!
              </p>
            </GlassCard>

            <Button onClick={() => navigate('bot_status')} secondary>
              ← Back to Bot Status
            </Button>
          </div>
        </ScreenContainer>
      )
    },

    // ────────────────────────────────────────────────────────────
    // WHATSAPP PREVIEW (Updated with Bot Integration)
    // ────────────────────────────────────────────────────────────
    whatsapp_preview: {
      render: () => (
        <ScreenContainer title="📱 How Reminders Work" subtitle="WhatsApp + Bot sync">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Explanation */}
            <GlassCard style={{ background: `${COLORS.primary}10` }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: COLORS.primary, marginBottom: '12px' }}>
                🔄 Real-Time Sync System
              </h3>
              <p style={{ fontSize: '14px', color: COLORS.text, lineHeight: 1.6 }}>
                When you reply to WhatsApp reminders, your pet bot reacts instantly:
              </p>
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '12px', background: COLORS.white, borderRadius: '8px', fontSize: '14px', fontWeight: 600 }}>
                  ✅ Reply "YES" → Bot goes HAPPY 😊 + Green LED + Happy sound
                </div>
                <div style={{ padding: '12px', background: COLORS.white, borderRadius: '8px', fontSize: '14px', fontWeight: 600 }}>
                  ❌ Reply "NO" → Bot goes SAD 😢 + Red LED + Sad sound
                </div>
              </div>
            </GlassCard>

            {/* WhatsApp Demo */}
            <GlassCard>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: COLORS.text, marginBottom: '16px' }}>
                💬 WhatsApp Message Flow
              </h3>
              <div style={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                borderRadius: '16px',
                padding: '24px',
                color: COLORS.white
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Bot message */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '16px',
                    borderRadius: '12px 12px 12px 0',
                    maxWidth: '80%'
                  }}>
                    <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>FitBot</div>
                    <div style={{ fontSize: '16px', fontWeight: 600 }}>
                      💧 Time for your 1st glass of water!<br />
                      Reply YES or NO
                    </div>
                  </div>

                  {/* User message */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.3)',
                    padding: '16px',
                    borderRadius: '12px 12px 0 12px',
                    maxWidth: '60%',
                    alignSelf: 'flex-end'
                  }}>
                    <div style={{ fontSize: '18px', fontWeight: 700 }}>YES</div>
                  </div>

                  {/* Bot response */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '16px',
                    borderRadius: '12px 12px 12px 0',
                    maxWidth: '80%'
                  }}>
                    <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>FitBot</div>
                    <div style={{ fontSize: '16px', fontWeight: 600 }}>
                      ✅ Awesome! Stay hydrated! 💪<br />
                      Next reminder at 11 AM
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Bot Reaction Simulation */}
            {userData.hasBot && (
              <GlassCard style={{ border: `2px solid ${COLORS.success}` }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: COLORS.success, marginBottom: '16px' }}>
                  🤖 Your Bot Reacted!
                </h3>
                <div style={{ 
                  padding: '24px',
                  background: `${COLORS.success}10`,
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '80px', marginBottom: '16px' }}>
                    {userData.botFace === 'cat' ? '🐱' : '🤖'}😊
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: COLORS.text, marginBottom: '8px' }}>
                    Bot went HAPPY!
                  </div>
                  <div style={{ fontSize: '14px', color: COLORS.textLight }}>
                    🎵 {userData.botSound === 'melody' ? 'Melody played' : 'Chime played'}<br />
                    💚 Green LED flashed<br />
                    ⭐ +5 stars earned
                  </div>
                </div>
              </GlassCard>
            )}

            {/* Info Box */}
            <GlassCard>
              <div style={{ fontSize: '14px', color: COLORS.text, lineHeight: 1.6 }}>
                <p style={{ marginBottom: '12px', fontWeight: 700 }}>📝 How It Works:</p>
                <ol style={{ paddingLeft: '20px', margin: 0 }}>
                  <li style={{ marginBottom: '8px' }}>Reminder triggers at your set time</li>
                  <li style={{ marginBottom: '8px' }}>WhatsApp message sent + Bot displays reminder</li>
                  <li style={{ marginBottom: '8px' }}>You reply YES/NO on WhatsApp</li>
                  <li style={{ marginBottom: '8px' }}>Backend receives reply via Twilio webhook</li>
                  <li style={{ marginBottom: '8px' }}>Backend publishes mood update via MQTT</li>
                  <li style={{ marginBottom: '8px' }}>Bot receives update in &lt;200ms</li>
                  <li style={{ marginBottom: '8px' }}>Bot changes face, plays sound, flashes LED!</li>
                </ol>
              </div>
            </GlassCard>

            <Button onClick={() => navigate('welcome')} primary large>
              Got It! Start My Journey →
            </Button>
          </div>
        </ScreenContainer>
      )
    },
  };

  // ═══════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════

  return (
    <div style={{ 
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <AnimatedDots />
      {screens[currentScreen]?.render()}
    </div>
  );
};

export default FitBotKiosk;
