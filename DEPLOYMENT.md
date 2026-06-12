# 🚀 FitBot Deployment Guide

## Production Deployment - Complete Checklist

---

## 📋 Pre-Deployment Checklist

### 1. Code Preparation
- [ ] All dependencies installed locally
- [ ] Application tested thoroughly
- [ ] Environment variables configured
- [ ] Build process tested (`npm run build`)
- [ ] No console errors or warnings
- [ ] All API endpoints responding

### 2. Accounts Setup
- [ ] GitHub account (for code hosting)
- [ ] Vercel/Netlify account (for frontend)
- [ ] Railway/Render account (for backend)
- [ ] Domain name (optional but recommended)

---

## 🎨 Frontend Deployment (Vercel - Recommended)

### Option 1: Vercel (Easiest - 5 minutes)

**Step 1:** Push to GitHub
```bash
cd fitbot-complete
git init
git add .
git commit -m "Initial commit"
gh repo create fitbot-app --public --source=. --remote=origin
git push -u origin main
```

**Step 2:** Deploy to Vercel
1. Visit https://vercel.com
2. Click "New Project"
3. Import your GitHub repo
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-url.com/api`
6. Click "Deploy"

**Done!** Your frontend is live at: `https://your-app.vercel.app`

### Option 2: Netlify

1. Visit https://netlify.com
2. Drag & drop `frontend/dist` folder after running `npm run build`
3. Configure environment variables in Site settings
4. Done!

---

## ⚙️ Backend Deployment (Railway - Recommended)

### Option 1: Railway (Easiest - 5 minutes)

**Step 1:** Install Railway CLI
```bash
npm install -g @railway/cli
```

**Step 2:** Deploy
```bash
cd backend
railway login
railway init
railway up
```

**Step 3:** Add Environment Variables
```bash
railway variables set NODE_ENV=production
railway variables set PORT=3000
railway variables set FRONTEND_URL=https://your-vercel-app.vercel.app
```

**Done!** Your API is live at: `https://your-app.railway.app`

### Option 2: Render

1. Visit https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repo
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add environment variables
6. Deploy!

### Option 3: Heroku

```bash
heroku create fitbot-api
git subtree push --prefix backend heroku main
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-app.vercel.app
```

---

## 🔗 Connect Frontend & Backend

### Update Frontend Environment
In Vercel dashboard:
1. Go to Settings → Environment Variables
2. Update `VITE_API_URL` to your backend URL
3. Redeploy: Deployments → Click ⋯ → Redeploy

### Update Backend CORS
In Railway/Render dashboard:
1. Add environment variable:
   - `FRONTEND_URL` = `https://your-app.vercel.app`
2. Backend will automatically restart

### Test Connection
1. Visit your frontend URL
2. Try signing up with test phone number
3. Check browser console for any CORS errors
4. If working → You're live! 🎉

---

## 🗄️ Add Database (PostgreSQL)

### Railway PostgreSQL (Easiest)

1. In Railway dashboard → Add new → Database → PostgreSQL
2. Note the connection string
3. Install Prisma in your backend:
```bash
npm install @prisma/client prisma
```

4. Create `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id String @id @default(uuid())
  phone String @unique
  accessCode String @unique
  createdAt DateTime @default(now())
}
```

5. Set environment variable:
```bash
railway variables set DATABASE_URL="your-postgres-url"
```

6. Run migrations:
```bash
npx prisma migrate deploy
```

---

## 💳 Add Payment Gateway (Razorpay)

### Setup Razorpay

1. Sign up at https://razorpay.com
2. Get API keys from Dashboard
3. Add to backend environment:
```bash
railway variables set RAZORPAY_KEY_ID="rzp_live_xxx"
railway variables set RAZORPAY_KEY_SECRET="xxx"
```

4. Install Razorpay SDK:
```bash
npm install razorpay
```

5. Add payment route in `server.js`:
```javascript
const Razorpay = require('razorpay');
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

app.post('/api/payment/create-order', async (req, res) => {
  const { amount } = req.body;
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: 'INR'
  });
  res.json({ orderId: order.id });
});
```

---

## 📱 Add WhatsApp Integration (Twilio)

### Setup Twilio

1. Sign up at https://www.twilio.com
2. Get WhatsApp sandbox or apply for production
3. Add credentials to backend:
```bash
railway variables set TWILIO_ACCOUNT_SID="ACxxx"
railway variables set TWILIO_AUTH_TOKEN="xxx"
railway variables set TWILIO_WHATSAPP_NUMBER="+14155238886"
```

4. Install Twilio SDK:
```bash
npm install twilio
```

5. Add WhatsApp service in `server.js`:
```javascript
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendWhatsAppOTP(phone, otp) {
  await client.messages.create({
    from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
    to: `whatsapp:${phone}`,
    body: `Your FitBot OTP is: ${otp}`
  });
}
```

---

## 🔐 Security Hardening

### Add JWT Authentication
```bash
npm install jsonwebtoken bcryptjs
```

### Add Rate Limiting (Already included)
✅ Already configured in server.js

### Add Input Validation
```bash
npm install joi
```

### Add HTTPS
- Vercel/Netlify: Automatic SSL ✅
- Railway/Render: Automatic SSL ✅

### Add Monitoring
```bash
npm install @sentry/node
```

Configure Sentry for error tracking.

---

## 📊 Add Analytics

### Google Analytics

1. Create GA4 property
2. Add to `frontend/index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🌐 Custom Domain Setup

### For Vercel (Frontend)
1. Go to Project Settings → Domains
2. Add your domain (e.g., `fitbot.app`)
3. Update DNS records at your registrar:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

### For Railway (Backend)
1. Go to Project Settings → Domains
2. Add custom domain (e.g., `api.fitbot.app`)
3. Update DNS:
   - Type: CNAME, Name: api, Value: your-app.railway.app

---

## ✅ Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] Backend API responds
- [ ] Authentication works (OTP)
- [ ] Payment flow works
- [ ] WhatsApp messages send
- [ ] Database saves data
- [ ] Error monitoring active
- [ ] Analytics tracking
- [ ] Mobile responsive check
- [ ] Cross-browser testing
- [ ] Load testing completed
- [ ] Backup system configured

---

## 🐛 Troubleshooting

### Frontend not connecting to backend
- Check CORS settings in backend
- Verify `FRONTEND_URL` environment variable
- Check API URL in frontend environment

### Database connection errors
- Verify `DATABASE_URL` format
- Check firewall rules
- Ensure migrations are run

### Payment not working
- Check Razorpay keys (test vs live)
- Verify webhook URL
- Check HTTPS requirement

---

## 📈 Monitoring & Maintenance

### Daily Checks
- Error rates (via Sentry)
- API response times
- User signups
- Payment success rate

### Weekly Tasks
- Review logs
- Check disk usage
- Update dependencies
- Backup database

### Monthly Tasks
- Security updates
- Performance optimization
- Cost analysis
- Feature planning

---

## 💰 Cost Estimate (Starting)

- **Vercel (Frontend):** Free (Hobby plan)
- **Railway (Backend):** $5-10/month
- **PostgreSQL:** Included with Railway
- **Domain:** $10-15/year
- **Twilio:** Pay-as-you-go (~$0.005 per message)
- **Razorpay:** 2% transaction fee

**Total:** ~$15-20/month to start

---

## 🎯 Success Metrics

Track these KPIs:
- Daily Active Users (DAU)
- Signup Conversion Rate
- Payment Success Rate
- WhatsApp Delivery Rate
- Average Session Time
- User Retention (7-day, 30-day)

---

## 🚀 Go Live!

Once everything is configured:
1. Do final testing
2. Announce launch
3. Monitor closely for first 24 hours
4. Collect user feedback
5. Iterate and improve

**You're ready to launch! 🎉**
