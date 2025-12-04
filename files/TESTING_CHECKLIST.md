# GründerAI Testing Checklist

## 🧪 **COMPLETE TESTING WORKFLOW**

Use this checklist to verify every part of the payment integration works correctly.

---

## ✅ **PHASE 1: BACKEND TESTS**

### **Test 1.1: Health Check**

```bash
curl http://localhost:8000/health
```

**Expected:**
```json
{
  "status": "healthy",
  "anthropic_configured": true,
  "paypal_configured": true
}
```

**Status:** ☐ Pass ☐ Fail

---

### **Test 1.2: Business Plan Analysis**

```bash
# Upload a test PDF
curl -X POST http://localhost:8000/api/analyze \
  -F "file=@test-businessplan.pdf"
```

**Expected:**
- Returns JSON with `score`, `risk_level`, `analysis_id`
- Score between 0-100
- top_issues array with 3 items

**Status:** ☐ Pass ☐ Fail

**Analysis ID:** _________________

---

### **Test 1.3: Payment Creation**

```bash
curl -X POST http://localhost:8000/api/create-payment \
  -H "Content-Type: application/json" \
  -d '{
    "analysis_id": "YOUR_ANALYSIS_ID",
    "amount": 39.00,
    "currency": "EUR"
  }'
```

**Expected:**
- Returns `order_id` and `approval_url`
- approval_url contains `paypal.com/checkoutnow`

**Status:** ☐ Pass ☐ Fail

**Order ID:** _________________

---

### **Test 1.4: PDF Generation (Manual)**

```python
# Test PDF generation separately
from pdf_generator import generate_report_pdf

test_result = {
    "score": 65,
    "risk_level": "MEDIUM",
    "detected_industry": "E-Commerce",
    "estimated_revenue": "€50.000",
    "benchmark_revenue": "€30.000-€50.000",
    "top_issues": [
        {
            "title": "Test Issue 1",
            "description": "This is a test",
            "severity": "HIGH",
            "fix": "Fix it like this"
        }
    ]
}

pdf_path = generate_report_pdf(test_result, "test_report.pdf")
print(f"PDF created: {pdf_path}")
```

**Expected:**
- PDF file created
- 5 pages
- Score circle visible
- Issues formatted correctly

**Status:** ☐ Pass ☐ Fail

---

### **Test 1.5: Email Service (Manual)**

```python
# Test email sending
from email_service import send_email_smtp

result = send_email_smtp(
    to_email="your-test-email@example.com",
    subject="GründerAI Test Email",
    html_content="<h1>Test</h1><p>Email service works!</p>",
    pdf_path="test_report.pdf"
)

print(f"Email sent: {result}")
```

**Expected:**
- Returns `True`
- Email received (check inbox + spam)
- PDF attached

**Status:** ☐ Pass ☐ Fail

---

## ✅ **PHASE 2: FRONTEND TESTS**

### **Test 2.1: Landing Page**

1. Open: http://localhost:3001
2. Check:
   - Page loads
   - "Plan jetzt prüfen" button visible
   - No console errors

**Status:** ☐ Pass ☐ Fail

---

### **Test 2.2: Upload Page**

1. Click "Plan jetzt prüfen" or go to `/upload`
2. Check:
   - Upload zone visible
   - Drag & drop works
   - File selection works

**Status:** ☐ Pass ☐ Fail

---

### **Test 2.3: Analysis Flow**

1. Upload test business plan
2. Click "Plan analysieren"
3. Check:
   - Loading animation shows
   - Progress indicators update
   - Redirects to `/results` after ~15s

**Status:** ☐ Pass ☐ Fail

**Time taken:** ______ seconds

---

### **Test 2.4: Results Page Display**

On results page, verify:
- [ ] Score displays correctly
- [ ] Risk level badge shows
- [ ] Revenue comparison (if available)
- [ ] Top 3 issues listed
- [ ] Each issue has: title, severity, description, fix
- [ ] "Report kaufen" button visible

**Status:** ☐ Pass ☐ Fail

---

### **Test 2.5: Payment Modal**

1. Click "Report kaufen (€39)"
2. Check:
   - Modal opens
   - Name input field
   - Email input field
   - PayPal button area
   - Close button (X) works

**Status:** ☐ Pass ☐ Fail

---

### **Test 2.6: PayPal Button Loading**

1. Enter name and email
2. Wait for PayPal button
3. Check:
   - "PayPal wird geladen..." shows first
   - PayPal button appears within 5s
   - Button shows "PayPal" logo
   - Button is clickable

**Status:** ☐ Pass ☐ Fail

**Load time:** ______ seconds

---

## ✅ **PHASE 3: PAYMENT FLOW TESTS**

### **Test 3.1: PayPal Sandbox Payment**

**Preparation:**
- Have PayPal sandbox buyer credentials ready
- Email: (from PayPal dashboard)
- Password: (from PayPal dashboard)

**Steps:**
1. Click PayPal button
2. PayPal popup opens
3. Login with sandbox BUYER account
4. Review order:
   - Amount: €39.00 EUR
   - Description: "GründerAI Business Plan Report"
5. Click "Pay Now"
6. Payment processes
7. Popup closes

**Check each:**
- [ ] PayPal popup opens
- [ ] Can login with test account
- [ ] Order shows €39.00 EUR
- [ ] Payment completes
- [ ] Popup closes automatically
- [ ] Frontend shows "Processing..."

**Status:** ☐ Pass ☐ Fail

---

### **Test 3.2: Backend Payment Capture**

**Check backend terminal for:**
```
INFO: POST /api/capture-payment
```

**Should NOT see:**
- Error messages
- Python exceptions
- "Payment capture failed"

**Status:** ☐ Pass ☐ Fail

---

### **Test 3.3: Success Page**

After payment:
1. Check redirect to `/success`
2. Verify:
   - [ ] "Zahlung erfolgreich!" message
   - [ ] Green checkmark icon
   - [ ] Customer email displays correctly
   - [ ] Transaction ID shows
   - [ ] "Report herunterladen" button visible
   - [ ] "Zurück zur Startseite" button visible

**Status:** ☐ Pass ☐ Fail

---

### **Test 3.4: PDF Download**

1. Click "Report herunterladen (PDF)"
2. Check:
   - [ ] Download starts immediately
   - [ ] File name: `gruenderai_report_[ID].pdf`
   - [ ] File opens in PDF viewer
   - [ ] Page 1: Score circle visible
   - [ ] Page 2-4: Top 3 issues with fixes
   - [ ] Page 5: Next steps and resources
   - [ ] Total: 5 pages
   - [ ] Content matches analysis result

**Status:** ☐ Pass ☐ Fail

**PDF Quality:**
- [ ] Professional layout
- [ ] Readable fonts
- [ ] Colors correct
- [ ] No cut-off text
- [ ] Images/graphics render correctly

---

### **Test 3.5: Email Delivery**

**Check test email inbox:**

**Email 1: Payment Confirmation**
- [ ] Received within 1 minute
- [ ] Subject: "Zahlungsbestätigung - GründerAI Report"
- [ ] Shows amount €39.00
- [ ] Shows transaction ID
- [ ] Professional formatting

**Email 2: Report Delivery**
- [ ] Received within 2 minutes
- [ ] Subject: "Ihr GründerAI Report - Score: XX/100"
- [ ] PDF attached (check attachment!)
- [ ] Email content professional
- [ ] Links work (if any)

**Status:** ☐ Pass ☐ Fail

**If not received:**
- [ ] Checked spam folder
- [ ] Checked backend logs for errors
- [ ] Verified SMTP credentials

---

## ✅ **PHASE 4: EDGE CASES & ERROR HANDLING**

### **Test 4.1: Invalid File Upload**

1. Try to upload .txt file
2. Try to upload 10MB file

**Expected:**
- Error message shows
- Upload blocked
- No crash

**Status:** ☐ Pass ☐ Fail

---

### **Test 4.2: Payment Already Completed**

1. Try to pay for same analysis twice
2. Click "Report kaufen" after already paying

**Expected:**
- Error message: "Already paid"
- OR download button instead of pay button

**Status:** ☐ Pass ☐ Fail

---

### **Test 4.3: Cancel Payment**

1. Start payment flow
2. Close PayPal popup without paying

**Expected:**
- Modal still open
- Can try again
- No crash

**Status:** ☐ Pass ☐ Fail

---

### **Test 4.4: Network Error**

1. Stop backend server
2. Try to click "Plan analysieren"

**Expected:**
- Error message shows
- Frontend doesn't crash
- User can retry

**Status:** ☐ Pass ☐ Fail

---

### **Test 4.5: Missing Environment Variables**

```bash
# Remove PayPal credentials temporarily
# Restart backend
curl http://localhost:8000/health
```

**Expected:**
```json
{
  "paypal_configured": false
}
```

**Status:** ☐ Pass ☐ Fail

---

## ✅ **PHASE 5: PERFORMANCE TESTS**

### **Test 5.1: Analysis Speed**

Upload 5 different business plans and measure:

| Plan # | File Size | Analysis Time |
|--------|-----------|---------------|
| 1      |           |               |
| 2      |           |               |
| 3      |           |               |
| 4      |           |               |
| 5      |           |               |

**Target:** < 20 seconds per analysis

**Status:** ☐ Pass ☐ Fail

---

### **Test 5.2: PDF Generation Speed**

Time from payment to PDF ready:

**Target:** < 10 seconds

**Measured:** ______ seconds

**Status:** ☐ Pass ☐ Fail

---

### **Test 5.3: Email Delivery Speed**

Time from payment to email received:

**Target:** < 2 minutes

**Measured:** ______ seconds

**Status:** ☐ Pass ☐ Fail

---

## ✅ **PHASE 6: CROSS-BROWSER TESTS**

Test complete flow in:
- [ ] Chrome (Desktop)
- [ ] Firefox (Desktop)
- [ ] Safari (Mac)
- [ ] Chrome (Mobile)
- [ ] Safari (iOS)

**Issues found:** _________________________

---

## ✅ **PHASE 7: USER ACCEPTANCE**

### **Test 7.1: Real User Test**

Ask 3 people to use the system:

**User 1:**
- Completed flow: ☐ Yes ☐ No
- Found it intuitive: ☐ Yes ☐ No
- Feedback: _________________________

**User 2:**
- Completed flow: ☐ Yes ☐ No
- Found it intuitive: ☐ Yes ☐ No
- Feedback: _________________________

**User 3:**
- Completed flow: ☐ Yes ☐ No
- Found it intuitive: ☐ Yes ☐ No
- Feedback: _________________________

---

## 🎯 **FINAL CHECKLIST**

Before going live, ALL must be ✅:

### **Core Functionality:**
- [ ] Upload works
- [ ] Analysis works
- [ ] Payment works
- [ ] PDF generates correctly
- [ ] Email delivers
- [ ] Download works

### **User Experience:**
- [ ] No confusing errors
- [ ] Loading states clear
- [ ] Success feedback obvious
- [ ] Mobile-friendly
- [ ] Fast enough (< 20s analysis)

### **Quality:**
- [ ] PDF looks professional
- [ ] Emails not in spam
- [ ] No console errors
- [ ] No backend crashes
- [ ] Tested by 3+ people

### **Production Ready:**
- [ ] PayPal Business Account verified
- [ ] Live credentials configured
- [ ] Tested with real €1 payment
- [ ] All .env variables set
- [ ] Domain configured

---

## 🚀 **LAUNCH DECISION**

**Total Tests:** ______ / ______

**Pass Rate:** ______ %

**Ready to Launch:** ☐ YES ☐ NO

**If NO, blockers:**
_________________________________
_________________________________
_________________________________

**Target Launch Date:** __________

---

**Keep this checklist!** 

Use it again after:
- Code updates
- Production deployment
- Adding new features

**You're doing great! 💪**
