require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests',
});
app.use('/api/', limiter);

// ═══════════════════════════════════════════════════════════════════
// IN-MEMORY DATA STORE (Replace with database in production)
// ═══════════════════════════════════════════════════════════════════
const users = new Map();
const otpSessions = new Map();
const subscriptions = new Map();
const stats = { todayUsers: 47, successStories: 12, topUsers: [] };

// ═══════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();
const generateAccessCode = () => Math.floor(1000 + Math.random() * 9000).toString();
const generateToken = (userId) => Buffer.from(JSON.stringify({ userId, exp: Date.now() + 30 * 24 * 60 * 60 * 1000 })).toString('base64');

// ═══════════════════════════════════════════════════════════════════
// AUTH ROUTES
// ═══════════════════════════════════════════════════════════════════
app.post('/api/auth/send-otp', (req, res) => {
  try {
    const { phone, referralCode } = req.body;
    
    if (!/^\+91\d{10}$/.test(phone)) {
      return res.status(400).json({ error: 'Invalid phone format' });
    }

    // Check if user exists
    const existingUser = Array.from(users.values()).find(u => u.phone === phone);
    const alreadyUsedTrial = existingUser && existingUser.hasUsedTrial;

    // Generate OTP
    const otp = process.env.NODE_ENV === 'development' ? '1111' : generateOTP();
    const sessionId = `sess_${Date.now()}`;

    otpSessions.set(sessionId, {
      phone,
      otp,
      attempts: 0,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    console.log(`📱 OTP for ${phone}: ${otp}`);

    res.json({
      success: true,
      sessionId,
      alreadyUsedTrial,
      message: 'OTP sent to WhatsApp',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

app.post('/api/auth/verify-otp', (req, res) => {
  try {
    const { sessionId, otp } = req.body;
    
    const session = otpSessions.get(sessionId);
    if (!session) return res.status(400).json({ error: 'Invalid session' });
    if (Date.now() > session.expiresAt) return res.status(400).json({ error: 'OTP expired' });
    if (session.attempts >= 3) return res.status(429).json({ error: 'Too many attempts' });

    if (session.otp !== otp) {
      session.attempts++;
      return res.status(400).json({ error: 'Invalid OTP', attemptsLeft: 3 - session.attempts });
    }

    // Create or get user
    let user = Array.from(users.values()).find(u => u.phone === session.phone);
    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      const userId = `user_${Date.now()}`;
      const accessCode = generateAccessCode();
      
      user = {
        id: userId,
        phone: session.phone,
        accessCode,
        hasUsedTrial: false,
        createdAt: new Date(),
      };
      
      users.set(userId, user);
    }

    const token = generateToken(user.id);
    otpSessions.delete(sessionId);

    res.json({
      success: true,
      userId: user.id,
      accessCode: user.accessCode,
      isNewUser,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

app.post('/api/auth/verify-code', (req, res) => {
  try {
    const { accessCode } = req.body;
    
    const user = Array.from(users.values()).find(u => u.accessCode === accessCode);
    if (!user) return res.status(404).json({ error: 'Code not found' });

    // Check subscription
    const userSubs = Array.from(subscriptions.values()).filter(s => s.userId === user.id);
    const activeSub = userSubs.find(s => s.status === 'active' && new Date(s.endDate) > new Date());

    const token = generateToken(user.id);

    res.json({
      success: true,
      userId: user.id,
      subscriptionActive: !!activeSub,
      subscriptionExpired: userSubs.length > 0 && !activeSub,
      subscriptionEnd: activeSub?.endDate,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify code' });
  }
});

// ═══════════════════════════════════════════════════════════════════
// STATS ROUTES
// ═══════════════════════════════════════════════════════════════════
app.get('/api/stats/today', (req, res) => {
  res.json({
    todayUsers: stats.todayUsers,
    successStories: stats.successStories,
    topUsers: [
      { name: 'Rahul', streak: 23 },
      { name: 'Priya', streak: 19 },
      { name: 'Amit', streak: 15 },
    ],
  });
});

// ═══════════════════════════════════════════════════════════════════
// SUBSCRIPTION ROUTES
// ═══════════════════════════════════════════════════════════════════
app.post('/api/subscription/create', (req, res) => {
  try {
    const { userId, groupType, amount } = req.body;
    
    const user = users.get(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const subscriptionId = `sub_${Date.now()}`;
    const startDate = new Date();
    const endDate = new Date(startDate);
    
    if (groupType === 'daily') {
      endDate.setHours(23, 59, 59, 999);
    } else {
      endDate.setDate(endDate.getDate() + 7);
    }

    const subscription = {
      id: subscriptionId,
      userId,
      groupType,
      amount,
      status: 'active',
      startDate,
      endDate,
      createdAt: new Date(),
    };

    subscriptions.set(subscriptionId, subscription);
    user.hasUsedTrial = true;

    res.json({
      success: true,
      subscription,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

// ═══════════════════════════════════════════════════════════════════
// HEALTH CHECK
// ═══════════════════════════════════════════════════════════════════
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 FitBot API running on port ${PORT}`);
  console.log(`📱 Development Mode: Use OTP 1111 for testing`);
});

module.exports = app;
