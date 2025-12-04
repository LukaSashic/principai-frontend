# ⚡ **QUICK START GUIDE - 60 MINUTEN BIS LIVE**

**Von jetzt bis zum Launch in 4 einfachen Schritten!**

---

## 🎯 **DAS ZIEL**

In 60 Minuten:
- ✅ Alle Legal Pages mit echten Daten
- ✅ Landing Page deployed
- ✅ Domain principai.de verbunden
- ✅ HTTPS aktiv
- ✅ **LIVE!** 🚀

---

## ⏱️ **SCHRITT 1: PLATZHALTER AUSFÜLLEN** (15 Min)

### **Was du brauchst:**
- Dein Unternehmensname (oder dein Name als Einzelunternehmer)
- Deine Adresse
- Deine Telefonnummer
- Handelsregister (nur wenn eingetragen)
- USt-ID (nur wenn vorhanden)

### **So geht's am schnellsten:**

**Option A: VS Code Find & Replace (EMPFOHLEN)**

```bash
# 1. Öffne alle .tsx Dateien in VS Code
# 2. CMD+SHIFT+F (Mac) oder CTRL+SHIFT+H (Windows)

# 3. Replace folgende Platzhalter:
[IHR UNTERNEHMENSNAME] → PrincipalAI GmbH
[STRASSE UND HAUSNUMMER] → Hauptstraße 123
[PLZ ORT] → 10115 Berlin
[IHRE TELEFONNUMMER] → +49 30 12345678
```

**Option B: Manuell jede Datei öffnen**

Dateien die Platzhalter haben:
- impressum.tsx
- datenschutz.tsx
- agb.tsx
- widerruf.tsx
- garantie-bedingungen.tsx

**⚠️ WICHTIG:**
- Handelsregister & USt-ID: **NUR ausfüllen wenn vorhanden**, sonst löschen!
- Email-Adressen sind schon drin: info@principai.de, etc.

---

## ⏱️ **SCHRITT 2: INTEGRATION IN NEXT.JS** (20 Min)

### **Setup Project (falls noch nicht geschehen):**

```bash
# Erstelle Next.js Project
npx create-next-app@latest zuschusscheck
cd zuschusscheck

# Installiere Dependencies (falls needed)
npm install
```

### **Integriere die Dateien:**

```bash
# 1. Ordnerstruktur erstellen
mkdir -p app/impressum app/datenschutz app/agb app/widerruf app/garantie-bedingungen

# 2. Landing Page (MAIN)
cp zuschusscheck-landing-page-v2.1-with-b2b-teaser.tsx app/page.tsx

# 3. Legal Pages
cp impressum.tsx app/impressum/page.tsx
cp datenschutz.tsx app/datenschutz/page.tsx
cp agb.tsx app/agb/page.tsx
cp widerruf.tsx app/widerruf/page.tsx
cp garantie-bedingungen.tsx app/garantie-bedingungen/page.tsx

# 4. Tailwind Config
cp tailwind.config.js .
```

### **Test lokal:**

```bash
npm run dev
# → Öffne http://localhost:3000
# → Teste alle Links
```

---

## ⏱️ **SCHRITT 3: DEPLOYMENT** (20 Min)

### **Vercel (Empfohlen - am schnellsten):**

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "ZuschussCheck V2.1 - Launch ready"
git branch -M main
git remote add origin [DEIN-GITHUB-REPO]
git push -u origin main

# 2. Vercel Deployment
# → Gehe zu vercel.com
# → "Import Project"
# → Connect GitHub Repo
# → Auto-detect Next.js
# → Deploy (dauert 2-3 Min)
```

### **Custom Domain verbinden:**

```bash
# In Vercel Dashboard:
# → Settings → Domains
# → Add Domain: principai.de
# → Add www.principai.de

# DNS Settings (bei deinem Domain-Provider):
# A Record:
# Name: @
# Value: 76.76.21.21  (Vercel IP)

# CNAME:
# Name: www
# Value: cname.vercel-dns.com
```

**⏰ DNS Propagation:** 5-30 Minuten (manchmal bis zu 2h)

---

## ⏱️ **SCHRITT 4: FINAL CHECKS** (5 Min)

### **Test diese URLs:**

- [ ] https://principai.de → Landing Page lädt
- [ ] https://principai.de/impressum → Zeigt deine echten Daten
- [ ] https://principai.de/datenschutz → Lädt korrekt
- [ ] https://principai.de/agb → Lädt korrekt
- [ ] https://principai.de/widerruf → Lädt korrekt
- [ ] https://principai.de/garantie-bedingungen → Lädt korrekt

### **Test Features:**

- [ ] Exit-Intent Modal erscheint (Mouse oben raus)
- [ ] Warning Bar versteckt sich beim Scrollen
- [ ] Mobile Sticky CTA sichtbar
- [ ] Alle 3 CTAs klickbar
- [ ] Footer-Links funktionieren

### **Test Mobile:**

- [ ] iPhone/Android: Landing Page responsive
- [ ] Sticky CTA sichtbar
- [ ] Alle Buttons tappable (44px height)

---

## 🎉 **DONE! DU BIST LIVE!**

```
✅ Legal Pages: Check!
✅ Landing Page: Check!
✅ Domain: Check!
✅ HTTPS: Check!
✅ Mobile: Check!

🚀 principai.de ist LIVE!
```

---

## 📧 **EMAIL SETUP (Post-Launch, 10 Min)**

Erstelle diese Adressen bei deinem Email-Provider:

```
info@principai.de          → Hauptkontakt
datenschutz@principai.de   → DSGVO-Anfragen
widerruf@principai.de      → Widerrufe
garantie@principai.de      → Garantie-Anfragen
b2b@principai.de           → B2B-Anfragen (NEU!)
```

**Oder einfach:** Alle auf info@ umleiten (am Anfang ok)

---

## 🔥 **OPTIONAL: ANALYTICS SETUP** (10 Min)

Falls du Google Analytics willst:

```bash
# 1. Erstelle GA4 Property auf analytics.google.com
# 2. Kopiere Measurement ID (G-XXXXXXXXXX)

# 3. Füge in app/layout.tsx ein:
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
<script dangerouslySetInnerHTML={{
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `
}} />
```

**⚠️ WICHTIG:** Mit Analytics brauchst du:
- Cookie-Banner (z.B. `react-cookie-consent`)
- Update in Datenschutzerklärung

**→ Für den Launch kannst du das skippen!** (Später hinzufügen)

---

## 🎯 **TIMELINE RECAP**

| Schritt | Zeit | Status |
|---------|------|--------|
| Platzhalter ausfüllen | 15 Min | ⏳ |
| Integration Next.js | 20 Min | ⏳ |
| Vercel Deployment | 20 Min | ⏳ |
| Final Checks | 5 Min | ⏳ |
| **TOTAL** | **60 Min** | ⏳ |

---

## 🚨 **TROUBLESHOOTING**

### **Problem: "Module not found: Can't resolve..."**
```bash
# Lösung: Dependencies installieren
npm install
```

### **Problem: "Port 3000 already in use"**
```bash
# Lösung: Anderen Port
npm run dev -- -p 3001
```

### **Problem: "Domain doesn't connect"**
- Check DNS Settings (A Record korrekt?)
- Wait 30 Min für DNS Propagation
- Vercel Dashboard → Domains → "Refresh"

### **Problem: "HTTPS not working"**
- Vercel aktiviert SSL automatisch
- Dauert 5-10 Minuten nach Domain-Verbindung
- Falls nicht: Vercel Support kontaktieren

---

## 📞 **SUPPORT**

**Stuck? Questions?**
→ Just ask! Ich helfe dir durch jeden Schritt! 😊

---

## ✅ **NEXT ACTIONS NACH LAUNCH**

### **Sofort (kritisch):**
- [ ] Test Payment Flow end-to-end
- [ ] Teste Email-Empfang (Report-Versand)
- [ ] Monitor Backend: https://web-production-88c1a.up.railway.app

### **Diese Woche:**
- [ ] B2B Landing Page erstellen (/b2b)
- [ ] Email-Adressen alle erstellen
- [ ] Erste Test-Analyse durchführen

### **Nächste Woche:**
- [ ] Echte Testimonials sammeln
- [ ] Analytics auswerten
- [ ] B2B Outreach starten (IHK, Gründerzentren)

---

## 🎊 **CONGRATS!**

**Du hast gerade eine production-ready SaaS deployed!**

Von Idee zu Live in Rekordzeit. 

Jetzt: Ersten Kunden gewinnen! 🚀

---

**Need help? Ich bin da! 😊**
