# GründerAI Payment Integration - Quick Start

## ⚡ **GET STARTED IN 15 MINUTES**

This is the express guide. For details, see `PAYMENT_SETUP_GUIDE.md`.

---

## 🎯 **PREREQUISITES**

- ✅ Backend running (localhost:8000)
- ✅ Frontend running (localhost:3001)
- ✅ MVP already works (upload → analyze → results)
- ✅ IONOS email ready (info@principal.de)

---

## 📦 **STEP 1: GET PAYPAL CREDENTIALS (5 Min)**

1. Go to: **https://developer.paypal.com/**
2. Login/Signup
3. Dashboard → "Apps & Credentials" → "Sandbox"
4. Click "Create App"
5. Name: "GründerAI Dev"
6. Copy:
   - **Client ID:** AXXxxx...
   - **Secret:** EYYyyy...

---

## 🔧 **STEP 2: BACKEND UPDATE (5 Min)**

### **Install new packages:**

```bash
cd backend
pip install reportlab==4.0.7 sendgrid==6.11.0 email-validator==2.1.0
```

### **Copy 4 new files:**

```bash
# From your downloads:
cp backend-paypal_integration.py backend/paypal_integration.py
cp backend-pdf_generator.py backend/pdf_generator.py
cp backend-email_service.py backend/email_service.py
cp backend-main-updated.py backend/main.py
```

### **Update .env:**

```bash
notepad backend/.env
```

**Add at bottom:**

```env
# PayPal
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=AXXxxx-paste-your-client-id-here
PAYPAL_SECRET=EYYyyy-paste-your-secret-here

# Email
EMAIL_MODE=smtp
SENDER_EMAIL=info@principal.de
SENDER_NAME=PrincipalAI
SMTP_HOST=smtp.ionos.de
SMTP_PORT=587
SMTP_USER=info@principal.de
SMTP_PASSWORD=your-ionos-email-password
```

### **Create reports folder:**

```bash
mkdir backend/reports
```

### **Restart backend:**

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Test:** http://localhost:8000/health

Should show:
```json
{
  "paypal_configured": true
}
```

✅ Backend done!

---

## 🎨 **STEP 3: FRONTEND UPDATE (5 Min)**

### **Create components folder:**

```bash
cd frontend
mkdir app/components
```

### **Copy 3 files:**

```bash
cp frontend-PayPalButton.tsx frontend/app/components/PayPalButton.tsx
cp frontend-results-page-updated.tsx frontend/app/results/page.tsx
mkdir frontend/app/success
cp frontend-success-page.tsx frontend/app/success/page.tsx
```

### **Create .env.local:**

```bash
notepad frontend/.env.local
```

**Add:**

```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AXXxxx-same-client-id-as-backend
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### **Restart frontend:**

```bash
npm run dev
```

✅ Frontend done!

---

## 🧪 **STEP 4: TEST (Quick - 5 Min)**

### **1. Upload & Analyze:**

- Go to: http://localhost:3001/upload
- Upload business plan
- Wait for results

### **2. Open Payment Modal:**

- Click "Report kaufen (€39)"
- Enter test data:
  - Name: "Test User"
  - Email: "test@example.com"

### **3. Check PayPal Button:**

- Should appear after entering email
- If you see PayPal button → ✅ Working!

### **4. Don't pay yet! Just verify button shows.**

---

## ✅ **SUCCESS CHECKLIST**

If you can see:
- [ ] Backend shows `paypal_configured: true`
- [ ] Frontend payment modal opens
- [ ] PayPal button appears
- [ ] No console errors

**→ YOU'RE READY FOR FULL TESTING!**

---

## 🎯 **NEXT: FULL TEST WITH SANDBOX**

Now follow: `TESTING_CHECKLIST.md`

To complete a sandbox payment:
1. You need PayPal sandbox buyer credentials
2. Get them: PayPal Dashboard → "Testing Tools" → "Sandbox Accounts"
3. Use that email/password to pay with fake money

---

## 🚨 **TROUBLESHOOTING QUICK FIXES**

### **Problem: "PayPal button doesn't show"**

**Fix:**
```bash
# Check .env.local has correct client ID
# Restart: npm run dev
# Hard refresh: Ctrl+Shift+R
```

### **Problem: "paypal_configured: false"**

**Fix:**
```bash
# Check backend/.env has PayPal credentials
# No quotes around values!
# Restart backend
```

### **Problem: Backend crashes on payment**

**Fix:**
```bash
# Missing package?
pip install reportlab sendgrid email-validator
```

### **Problem: Import errors**

**Fix:**
```bash
# Make sure all 4 files copied to backend/
ls backend/*.py

# Should see:
# paypal_integration.py
# pdf_generator.py  
# email_service.py
# main.py
```

---

## 📚 **FULL GUIDES**

- **Setup Details:** `PAYMENT_SETUP_GUIDE.md`
- **Testing:** `TESTING_CHECKLIST.md`
- **Deployment:** `DEPLOYMENT_GUIDE.md` (coming)

---

## 💬 **QUESTIONS?**

Common questions answered in full guide.

**You got this! 🚀**

---

## 🎉 **TIMELINE**

- **Quick Setup:** 15 minutes (this guide)
- **Full Testing:** 1 hour (TESTING_CHECKLIST.md)
- **Production Ready:** 1-2 days (PayPal verification)

**Keep going! You're 90% there! 💪**
