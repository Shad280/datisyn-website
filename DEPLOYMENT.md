# Datisyn Website - Deployment Guide

## 🚀 What's Been Added

### New Components
1. **Contact Form** (`src/components/ContactForm.tsx`)
   - Server-side email using nodemailer
   - Beautiful animated form with validation
   - Success/error states

2. **About Timeline** (`src/components/AboutTimeline.tsx`)
   - Animated milestone timeline
   - Icons for each phase
   - Scroll-triggered animations

3. **Enhanced Footer** (`src/components/Footer.tsx`)
   - Social media links (GitHub, Twitter, LinkedIn, Email)
   - Navigation links
   - Modern gradient design

4. **API Route** (`src/app/api/contact/route.ts`)
   - Server-side email handler
   - SMTP integration with nodemailer

### Updated Components
- **Navbar**: Added "About" link
- **Home Page**: Integrated all new sections

## 📧 Setting Up Email (Contact Form)

### Option 1: SendGrid (Recommended)
1. Sign up at https://sendgrid.com (free tier: 100 emails/day)
2. Create an API key
3. Use these settings:
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=apikey
   SMTP_PASS=your_sendgrid_api_key
   SMTP_FROM=hello@datisyn.com
   CONTACT_RECEIVER=demo@datisyn.com
   ```

### Option 2: Gmail (Quick Testing)
1. Enable 2FA on your Gmail account
2. Create an App Password: https://myaccount.google.com/apppasswords
3. Use these settings:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your.email@gmail.com
   SMTP_PASS=your_app_password
   CONTACT_RECEIVER=your.email@gmail.com
   SMTP_FROM=your.email@gmail.com
   ```

## 🚂 Railway Deployment

### Step 1: Prepare Your Code
```bash
# Make sure everything is committed and pushed
git add .
git commit -m "Prepare for Railway deployment with enhanced contact form and optimizations"
git push origin main
```

### Step 2: Deploy to Railway
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will automatically detect Next.js and deploy using the `railway.json` config

### Step 3: Add Environment Variables
1. In Railway dashboard, click on your project
2. Go to "Variables" tab
3. Add these variables (see `.env.local.example` for details):
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=apikey
   SMTP_PASS=your_sendgrid_api_key
   SMTP_FROM=hello@datisyn.com
   CONTACT_RECEIVER=demo@datisyn.com
   ```
4. Railway will automatically redeploy

### Step 4: Custom Domain (Optional)
1. In Railway, go to "Settings" > "Domains"
2. Click "Custom Domain"
3. Add your domain (e.g., `datisyn.com`)
4. Update your DNS records as shown
5. SSL certificate is automatic!

### Railway Configuration
The project includes `railway.json` with optimized settings:
- **Health Check**: `/api/health` endpoint for monitoring
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Auto-restart**: On failure with max 10 retries

### Production Optimizations
- **Security Headers**: X-Frame-Options, CSP, and other security headers
- **Image Optimization**: WebP/AVIF support with responsive sizing
- **Package Optimization**: Tree-shaking for React Three Fiber and Framer Motion
- **Compression**: Gzip compression enabled
- **Health Monitoring**: `/api/health` endpoint for Railway monitoring

## 🧪 Local Development

### 1. Install Dependencies
```bash
cd datisyn-website
npm install
```

### 2. Create .env.local
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your SMTP credentials.

### 3. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000

### 4. Test Contact Form
1. Fill out the form
2. Click "Request Demo"
3. Check the `CONTACT_RECEIVER` email inbox

## 🏗️ Production Build

```bash
# Build for production
npm run build

# Test production build locally
npm start
```

## 📁 Project Structure

```
datisyn-website/
├── railway.json                 # Railway deployment configuration
├── next.config.ts              # Next.js configuration with optimizations
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/
│   │   │   │   └── route.ts     # Email API endpoint
│   │   │   └── health/
│   │   │       └── route.ts     # Health check endpoint
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Main homepage
│   │   └── globals.css
│   └── components/
│       ├── Hero.tsx
│       ├── ThreeEye.tsx         # 3D visualization
│       ├── HowItWorks.tsx
│       ├── OurSolution.tsx
│       ├── AboutDatisyn.tsx     # NEW: Why we built Datisyn section
│       ├── AboutTimeline.tsx    # Company journey timeline
│       ├── ContactForm.tsx      # Enhanced demo form
│       ├── Footer.tsx           # Enhanced footer
│       ├── Navbar.tsx           # Updated navigation
│       └── BackgroundFX.tsx
├── .env.local.example          # Environment variables template
└── package.json
```

## ✅ Testing Checklist

- [ ] Hero animation loads and rotates
- [ ] 3D nodes are clickable with modal popups
- [ ] "How It Works" section displays correctly
- [ ] "Our Solution" cards animate on scroll
- [ ] About timeline animates on scroll
- [ ] Contact form submits successfully
- [ ] Email arrives at CONTACT_RECEIVER
- [ ] Footer social links work
- [ ] Navbar highlights active section
- [ ] All sections scroll smoothly
- [ ] Mobile responsive design works

## 🎨 Customization

### Update Social Links
Edit `src/components/Footer.tsx`:
```tsx
<a href="https://github.com/your-org">...</a>
<a href="https://twitter.com/your-handle">...</a>
<a href="https://linkedin.com/company/your-company">...</a>
```

### Update Timeline
Edit `src/components/AboutTimeline.tsx` - modify the `milestones` array

### Update Email Recipients
Change `CONTACT_RECEIVER` in environment variables

## 🐛 Troubleshooting

### Contact Form Not Sending
- Check Railway logs for errors
- Verify SMTP credentials are correct
- Test SMTP connection with a tool like Mailtrap
- Ensure `SMTP_PORT` is a number (587 or 465)

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Environment Variables Not Working
- In Railway, variables are **case-sensitive**
- Restart the deployment after adding variables
- Check Railway logs for missing variable errors

## 📊 Analytics (Optional)

Add to `src/app/layout.tsx` for tracking:

```tsx
// Google Analytics
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />

// Or Plausible (privacy-friendly)
<Script data-domain="datisyn.com" src="https://plausible.io/js/script.js" />
```

## 🔒 Security Notes

- Never commit `.env.local` to git (it's in `.gitignore`)
- Use environment variables for all secrets
- Railway encrypts environment variables
- SMTP passwords should be app-specific (not your main password)

## 🎉 You're Done!

Your Datisyn website now has:
- ✅ Interactive 3D data orchestration visualization
- ✅ Working contact form with email delivery
- ✅ Animated timeline showing company journey
- ✅ Professional footer with social links
- ✅ Production-ready for Railway deployment

Visit your site and test everything! 🚀
