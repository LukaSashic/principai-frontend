# GründerAI Payment Integration - Complete Setup Guide

## 🎯 **OVERVIEW**

This guide walks you through setting up the complete payment system with PayPal, PDF generation, and email delivery.

**Timeline:** 2-3 hours
**Prerequisites:** Backend + Frontend MVP already running

---

## 📋 **PART 1: PAYPAL SETUP (30 Min)**

### **Step 1: PayPal Developer Account**

1. Go to: https://developer.paypal.com/
2. Click "Log in to Dashboard"
3. Sign up or login with your PayPal account
4. You're now in the PayPal Developer Dashboard

### **Step 2: Create Sandbox App**

1. In Dashboard, click "Apps & Credentials"
2. Make sure you're on "Sandbox" tab (not Live)
3. Click "Create App"
4. App Name: "GründerAI Development"
5. Click "Create App"

### **Step 3: Get Sandbox Credentials**

You'll see:
```
Client ID: AXXxxxxxxxxxxxxxxxxxxxx
Secret: EYYyyyyyyyyyyyyyyyyyyy
```

**Copy both!** You need these for `.env` file.

### **Step 4: Test Accounts**

PayPal automatically creates test accounts:
- **Buyer Account:** For testing purchases (has fake money)
- **Seller Account:** Your business (receives fake money)

To see them:
1. Dashboard → "Testing Tools" → "Sandbox Accounts"
2. Note the buyer email (you'll use this for testing)

**Sandbox Buyer Login:**
- Email: (from dashboard)
- Password: Click "..." → "Show password"

---

## 🔧 **PART 2: BACKEND SETUP (30 Min)**

### **Step 1: Install New Dependencies**

```bash
cd backend

# If using existing venv:
pip install reportlab==4.0.7 sendgrid==6.11.0 email-validator==2.1.0

# Or reinstall everything:
pip install -r requirements-updated.txt
```

### **Step 2: Copy New Files**

Replace/add these files in `backend/`:

```
backend/
├── paypal_integration.py      (NEW)
├── pdf_generator.py            (NEW)
├── email_service.py            (NEW)
├── main.py                     (REPLACE with main-updated.py)
├── requirements.txt            (REPLACE with requirements-updated.txt)
└── .env                        (UPDATE)
```

**Copy commands:**
```bash
# From your downloads folder:
cp backend-paypal_integration.py backend/paypal_integration.py
cp backend-pdf_generator.py backend/pdf_generator.py
cp backend-email_service.py backend/email_service.py
cp backend-main-updated.py backend/main.py
cp backend-requirements-updated.txt backend/requirements.txt
```

### **Step 3: Update .env File**

```bash
notepad backend/.env
```

**Add these lines:**

```env
# PayPal Sandbox
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=AXXxxxxxxxxxxxxxxxxxxxx
PAYPAL_SECRET=EYYyyyyyyyyyyyyyyyyyyy

# Email (IONOS SMTP)
EMAIL_MODE=smtp
SENDER_EMAIL=info@principal.de
SENDER_NAME=PrincipalAI - GründerAI
SMTP_HOST=smtp.ionos.de
SMTP_PORT=587
SMTP_USER=info@principal.de
SMTP_PASSWORD=your-ionos-email-password
```

**Get IONOS Email Password:**
1. Login to IONOS Control Panel
2. Email → Your email account
3. Set/reset password if needed

### **Step 4: Create Reports Directory**

```bash
mkdir backend/reports
```

### **Step 5: Test Backend**

```bash
# Start backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# In another terminal, test health:
curl http://localhost:8000/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "anthropic_configured": true,
  "paypal_configured": true,
  "timestamp": "2025-12-02T..."
}
```

✅ If `paypal_configured: true` → Backend ready!

---

## 🎨 **PART 3: FRONTEND SETUP (30 Min)**

### **Step 1: Install Dependencies**

```bash
cd frontend

# PayPal is loaded via CDN, no install needed!
# But verify these are installed:
npm list axios lucide-react framer-motion
```

### **Step 2: Create Components Folder**

```bash
mkdir frontend/app/components
```

### **Step 3: Copy New Files**

```
frontend/
├── app/
│   ├── components/
│   │   └── PayPalButton.tsx        (NEW)
│   ├── results/
│   │   └── page.tsx                (REPLACE)
│   └── success/
│       └── page.tsx                (NEW)
└── .env.local                      (CREATE)
```

**Copy commands:**
```bash
cp frontend-PayPalButton.tsx frontend/app/components/PayPalButton.tsx
cp frontend-results-page-updated.tsx frontend/app/results/page.tsx
cp frontend-success-page.tsx frontend/app/success/page.tsx
```

### **Step 4: Create .env.local**

```bash
notepad frontend/.env.local
```

**Add:**
```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AXXxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Use the SAME Client ID from PayPal Dashboard!**

### **Step 5: Create Success Route**

```bash
mkdir frontend/app/success
```

Then copy `frontend-success-page.tsx` to `frontend/app/success/page.tsx`

### **Step 6: Test Frontend**

```bash
npm run dev
```

Open: http://localhost:3001

✅ Frontend should load without errors

---

## 🧪 **PART 4: END-TO-END TESTING (1 Hour)**

### **Test 1: Upload & Analysis (Should still work)**

1. Go to: http://localhost:3001/upload
2. Upload a business plan PDF
3. Click "Plan analysieren"
4. Wait for results

✅ Results page shows with score and issues

### **Test 2: Payment Modal**

On results page:
1. Click "Report kaufen (€39)"
2. Modal opens

✅ See name/email inputs and PayPal area

### **Test 3: PayPal Sandbox Payment**

1. Enter test info:
   - Name: "Test User"
   - Email: "test@example.com"
2. PayPal button should appear
3. Click PayPal button
4. PayPal popup opens

**In PayPal Popup:**
- You'll see PayPal sandbox login
- Use your sandbox BUYER account (from PayPal dashboard)
- Login with test credentials
- Review order (€39.00 EUR)
- Click "Pay Now"

✅ Payment should complete

### **Test 4: Success Flow**

After payment:
1. Should redirect to `/success`
2. See "Zahlung erfolgreich!" message
3. Download button appears

✅ Success page loads

### **Test 5: PDF Download**

1. Click "Report herunterladen (PDF)"
2. PDF should download
3. Open PDF
4. Verify:
   - Score circle on page 1
   - Top 3 issues with fixes
   - 5 pages total

✅ PDF looks professional

### **Test 6: Email Delivery**

Check the email you entered:
1. Should receive 2 emails:
   - Payment confirmation
   - Report with PDF attachment

✅ Emails received (check spam!)

**If emails DON'T arrive:**
- Check backend terminal for errors
- Verify SMTP credentials in `.env`
- Test SMTP separately (see troubleshooting)

---

## 🐛 **TROUBLESHOOTING**

### **Problem: PayPal button doesn't show**

**Check:**
```bash
# Frontend console (F12)
# Look for error: "Failed to load PayPal SDK"
```

**Fix:**
1. Verify `.env.local` has correct `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
2. Restart frontend: `npm run dev`
3. Hard refresh browser: Ctrl+Shift+R

### **Problem: "Payment creation failed"**

**Check backend terminal for error message**

**Common causes:**
- PayPal credentials wrong in backend `.env`
- Backend not running
- CORS issue

**Fix:**
```bash
# Verify credentials:
curl http://localhost:8000/health

# Should show:
# "paypal_configured": true
```

### **Problem: PDF generation fails**

**Error:** "Module 'reportlab' not found"

**Fix:**
```bash
pip install reportlab==4.0.7
```

### **Problem: Email not sending**

**Test SMTP separately:**

```python
# test_email.py
import os
from email_service import send_email_smtp

result = send_email_smtp(
    to_email="your-email@example.com",
    subject="Test Email",
    html_content="<h1>Test</h1><p>If you see this, SMTP works!</p>"
)

print(f"Email sent: {result}")
```

**Run:**
```bash
python test_email.py
```

**If fails:**
- Check SMTP password in `.env`
- Verify IONOS email account is active
- Try different SMTP port (465 instead of 587)

### **Problem: "Analysis not found"**

This means the analysis_id was lost.

**Cause:** Browser refreshed or localStorage cleared

**Fix:** Upload and analyze again

**Production solution:** Use a database instead of in-memory storage

---

## 🚀 **PART 5: GO LIVE (When Ready)**

### **Step 1: Create PayPal Business Account**

1. Go to: https://www.paypal.com/de/business
2. Create business account with `info@principal.de`
3. Complete verification (1-2 days)

### **Step 2: Create Live App**

In PayPal Developer Dashboard:
1. Switch to "Live" tab (top)
2. Create new app
3. Get LIVE credentials

### **Step 3: Update Production .env**

```env
# Change to live mode
PAYPAL_MODE=live

# Use LIVE credentials
PAYPAL_CLIENT_ID=live-client-id-here
PAYPAL_SECRET=live-secret-here
```

### **Step 4: Update Frontend .env**

```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=live-client-id-here
```

### **Step 5: Test with Real Money (Small Amount)**

Before launch:
1. Test with €1.00 payment (change amount temporarily)
2. Verify everything works
3. Refund yourself via PayPal
4. Then change back to €39.00

---

## ✅ **SUCCESS CHECKLIST**

Before launching to real customers:

### **Backend:**
- [ ] All dependencies installed (`reportlab`, etc.)
- [ ] `.env` file complete with PayPal + SMTP
- [ ] `/health` endpoint shows all configured
- [ ] Can analyze a business plan
- [ ] Can create PayPal order
- [ ] Can capture payment
- [ ] PDF generates successfully
- [ ] Emails send successfully

### **Frontend:**
- [ ] PayPal button loads
- [ ] Payment modal opens
- [ ] Can complete sandbox payment
- [ ] Redirects to success page
- [ ] Download works
- [ ] No console errors

### **Integration:**
- [ ] Full flow works end-to-end
- [ ] PDF has correct data from analysis
- [ ] Email has PDF attachment
- [ ] Success page shows correct info

### **Production Ready:**
- [ ] PayPal Business Account verified
- [ ] Live credentials configured
- [ ] Tested with real €1 payment
- [ ] Email uses professional sender
- [ ] Domain configured (principal.de)

---

## 💰 **COSTS OVERVIEW**

**Development (Sandbox):**
- PayPal: FREE (test money)
- IONOS Email: €1/month
- Anthropic API: ~€0.05 per analysis
- **Total: ~€1/month**

**Production:**
- PayPal fees: 2.49% + €0.35 per transaction
  - On €39: You get €37.63 (€1.37 fee)
- IONOS Email: €1/month
- Anthropic API: ~€0.05 per analysis
- **Cost per sale: ~€1.42**
- **Profit per sale: €37.58**

---

## 🎯 **NEXT STEPS**

1. ✅ Complete this setup (2-3 hours)
2. ✅ Test thoroughly with sandbox
3. ✅ Show 3 friends for feedback
4. ✅ Wait for PayPal Business verification (1-2 days)
5. ✅ Switch to live mode
6. ✅ Deploy to production (Vercel + Railway)
7. 🚀 **LAUNCH!**

---

**Questions? Issues?**

Check the files:
- `TESTING_CHECKLIST.md` - Detailed testing steps
- `DEPLOYMENT_GUIDE.md` - Production deployment

**You're almost there! 🎉**
