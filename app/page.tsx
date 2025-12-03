'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Exit Intent Modal Component
function ExitIntentModal() {
  const [showModal, setShowModal] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Exit intent: Mouse leaves top of page (desktop only)
      if (e.clientY <= 0 && !hasShown && window.innerWidth >= 768) {
        setShowModal(true)
        setHasShown(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [hasShown])

  if (!showModal) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-in fade-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl leading-none"
          aria-label="Schließen"
        >
          ×
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-3xl font-bold text-[#2D3436] mb-4">
            Warte!
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            Teste <span className="font-bold text-[#2C5530]">kostenlos</span>,<br />
            ob dein Plan durchkommt
          </p>

          <div className="bg-[#E8F5E9] rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-bold">Nur 11%</span> der Anträge werden bewilligt.
              <br />
              Finde jetzt heraus, ob du dazu gehörst.
            </p>
          </div>

          <Link href="/upload">
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-gradient-to-r from-[#2C5530] to-[#1E3A21] text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              Kostenlos testen
            </button>
          </Link>

          <p className="text-xs text-gray-500 mt-3">
            Keine Anmeldung • Ergebnis in 2 Minuten
          </p>
        </div>

      </div>
    </div>
  )
}

// Smart Warning Bar Component (auto-hide on scroll down)
function SmartWarningBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide when scrolling down past 100px, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastScrollY])

  return (
    <div
      className={`
        bg-amber-500 py-3 px-4 text-center border-b-2 border-amber-600
        sticky top-0 z-50 transition-transform duration-300
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="max-w-7xl mx-auto">
        {/* Desktop Version */}
        <p className="hidden md:block text-gray-900 font-semibold text-base">
          ⚠️ <span className="font-bold">2011: 240.000 Bewilligungen</span> →
          <span className="font-bold ml-2">2024: nur 27.000</span> |
          <span className="ml-2">Kein Rechtsanspruch – Ermessensleistung</span>
        </p>
        {/* Mobile Version (Stacked) */}
        <div className="md:hidden">
          <p className="text-gray-900 font-semibold text-sm">
            ⚠️ <span className="font-bold">89% weniger Bewilligungen</span>
          </p>
          <p className="text-gray-800 text-xs mt-1">
            240.000 (2011) → 27.000 (2024)
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ZuschussCheckLandingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Exit Intent Modal */}
      <ExitIntentModal />

      {/* Smart Warning Bar (Sticky with auto-hide) */}
      <SmartWarningBar />

      {/* ============================================
          SECTION 2: HERO (OPTIMIZED)
          ============================================ */}
      <section className="bg-gradient-to-b from-[#F8F6F0] to-white py-12 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Logo/Branding */}
          <div className="text-center mb-8">
            <p className="text-gray-600 text-sm mb-2">von PrincipalAI</p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#2C5530] mb-2">
              ZuschussCheck
            </h1>
            <p className="text-sm text-gray-500">Gründungszuschuss-Optimierung</p>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-5xl font-bold text-[#2D3436] leading-tight mb-4">
              Ein falsches Wort kostet dich
            </h2>
            <p className="text-5xl md:text-7xl font-bold text-[#D4AF37] mb-6">
              €31.500
            </p>
          </div>

          {/* Sub-Headline Box */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border-2 border-[#2C5530]/20">
              <p className="text-xl md:text-2xl text-gray-800 font-semibold mb-3 text-center">
                Seit 2011: Nur noch 11% der Anträge werden bewilligt
              </p>
              <p className="text-lg text-gray-600 text-center mb-3">
                (240.000 → 27.000 pro Jahr)
              </p>
              <div className="border-t border-gray-300 my-4"></div>
              <p className="text-base md:text-lg text-gray-700 text-center leading-relaxed">
                <span className="font-bold text-[#2C5530]">Ermessensleistung</span> = Kein Rechtsanspruch
                <br />
                Dein Business Plan entscheidet ALLES
              </p>
            </div>
          </div>

          {/* Positioning Statement */}
          <div className="bg-gradient-to-r from-[#2C5530] to-[#1E3A21] text-white rounded-2xl shadow-2xl p-6 md:p-8 mb-10 max-w-3xl mx-auto transform hover:scale-[1.02] transition-transform duration-300">
            <p className="text-2xl md:text-3xl font-bold text-center leading-tight">
              Finde die 3 kritischen Fehler,
              <br />
              bevor die Arbeitsagentur sie findet
            </p>
          </div>

          {/* ⭐ EARLY CTA - BEFORE BENEFITS ⭐ */}
          <div className="text-center mb-12">
            <Link href="/upload">
              <button className="bg-gradient-to-r from-[#2C5530] to-[#1E3A21] text-white text-xl md:text-2xl font-bold py-5 px-8 md:px-16 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200 cursor-pointer">
                Kostenlos prüfen → nur bei Erfolg €39
              </button>
            </Link>
            <p className="text-sm text-gray-600 mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <span>✓ Keine Anmeldung</span>
              <span>✓ Ergebnis in 2 Min</span>
              <span>✓ Zahlung erst nach Analyse</span>
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">

            {/* Benefit 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#2C5530] hover:shadow-2xl transition-shadow duration-300">
              <div className="text-5xl mb-4 text-center">⚡</div>
              <h3 className="text-xl font-bold text-[#2D3436] mb-3 text-center">
                Analyse in 2 Minuten
              </h3>
              <p className="text-gray-600 text-center mb-2">
                Upload → Prüfung → Konkrete Fixes
              </p>
              <p className="text-sm text-gray-500 text-center">
                Findet Fehler die €800 Steuerberater übersehen
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#D4AF37] hover:shadow-2xl transition-shadow duration-300">
              <div className="text-5xl mb-4 text-center">📈</div>
              <h3 className="text-xl font-bold text-[#2D3436] mb-3 text-center">
                Grant Calibration Score
              </h3>
              <p className="text-gray-600 text-center mb-2">
                Sofort sehen: 25/100 (KRITISCH) oder 87/100 (GUT)
              </p>
              <p className="text-sm text-gray-500 text-center">
                Basiert auf offiziellen BA GZ 04 Kriterien
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#2C5530] hover:shadow-2xl transition-shadow duration-300">
              <div className="text-5xl mb-4 text-center">✓</div>
              <h3 className="text-xl font-bold text-[#2D3436] mb-3 text-center">
                5-Seiten-Report mit Fixes
              </h3>
              <p className="text-gray-600 text-center mb-2">
                Top 3 Issues + Copy-Paste Lösungen
              </p>
              <p className="text-sm text-gray-500 text-center">
                Direkt in deinen Plan einfügen
              </p>
            </div>

          </div>

          {/* Trust Lines */}
          <div className="text-center space-y-2 text-gray-600">
            <p className="flex items-center justify-center gap-2 text-sm">
              <span className="text-green-600 text-lg">💳</span>
              Zahlung erst nach Analyse
            </p>
            <p className="flex items-center justify-center gap-2 text-sm">
              <span className="text-green-600 text-lg">✓</span>
              100% Geld zurück wenn Score nicht um 20+ Punkte steigt
            </p>
          </div>

        </div>
      </section>

      {/* ============================================
          SECTION 3: HOW IT WORKS
          ============================================ */}
      <section className="bg-white py-12 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2D3436] mb-4">
            So funktioniert's (unter 2 Minuten)
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Kein Login. Keine Installation. Einfach Upload → Ergebnis.
          </p>

          <div className="grid md:grid-cols-3 gap-8 md:gap-6 items-start mb-12">

            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#2C5530] hover:shadow-2xl transition-shadow duration-300">
                <div className="text-6xl mb-4 text-[#2C5530]">📤</div>
                <div className="absolute -top-4 -left-4 bg-[#2C5530] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  1
                </div>

                {/* Visual Upload Mockup */}
                <div className="bg-gray-100 rounded-lg p-4 mb-4 border-2 border-dashed border-gray-300">
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <span className="text-3xl">📄</span>
                    <div className="text-left">
                      <p className="font-semibold text-sm">BusinessPlan.pdf</p>
                      <p className="text-xs text-gray-500">2.3 MB</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#2D3436] mb-3">UPLOAD</h3>
                <p className="text-gray-600 mb-4 font-medium">
                  Business Plan hochladen
                </p>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• PDF Format</li>
                  <li>• Max 10 MB</li>
                  <li>• Sofortige Bestätigung</li>
                  <li>• Keine Anmeldung nötig</li>
                </ul>
              </div>
              {/* Arrow (Desktop) */}
              <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-[#2C5530] text-4xl z-10">
                →
              </div>
              {/* Arrow (Mobile) */}
              <div className="md:hidden flex justify-center my-4 text-[#2C5530] text-3xl">
                ↓
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#D4AF37] hover:shadow-2xl transition-shadow duration-300">
                <div className="text-6xl mb-4 text-[#D4AF37]">🤖</div>
                <div className="absolute -top-4 -left-4 bg-[#D4AF37] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  2
                </div>

                {/* Visual Analysis Mockup */}
                <div className="bg-gray-100 rounded-lg p-3 mb-4 border-2 border-gray-300">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-xs text-gray-600">Prüfe Solo-Selbständigkeit...</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-xs text-gray-600">Analysiere Umsatzprognosen...</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                      <p className="text-xs text-gray-600">Prüfe Rechtsform...</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#2D3436] mb-3">ANALYSE</h3>
                <p className="text-gray-600 mb-4 font-medium">
                  Automatische Prüfung auf 27 Kriterien
                </p>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Solo-Selbständigkeit (kritisch!)</li>
                  <li>• Umsatz (IHK-Benchmarks)</li>
                  <li>• Rechtsform (GmbH = ❌)</li>
                  <li>• Konservative Präsentation</li>
                  <li>• + 23 weitere BA GZ 04 Kriterien</li>
                </ul>
              </div>
              {/* Arrow (Desktop) */}
              <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-[#D4AF37] text-4xl z-10">
                →
              </div>
              {/* Arrow (Mobile) */}
              <div className="md:hidden flex justify-center my-4 text-[#D4AF37] text-3xl">
                ↓
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#2C5530] hover:shadow-2xl transition-shadow duration-300">
                <div className="text-6xl mb-4 text-[#2C5530]">📊</div>
                <div className="absolute -top-4 -left-4 bg-[#2C5530] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  3
                </div>

                {/* Visual Results Mockup */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-3 mb-4 border-2 border-red-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-red-800">Dein Score</p>
                      <p className="text-2xl font-bold text-red-600">25/100</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">
                      RISK
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#2D3436] mb-3">RESULTS</h3>
                <p className="text-gray-600 mb-4 font-medium">
                  Sofort per Email
                </p>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Grant Calibration Score (0-100)</li>
                  <li>• Risk Level: CRITICAL/MEDIUM/LOW</li>
                  <li>• Top 3 Issues mit Fixes</li>
                  <li>• 5-Seiten-PDF Download</li>
                  <li>• Copy-Paste fertige Formulierungen</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Then Decide Box */}
          <div className="bg-gradient-to-r from-[#E8F5E9] to-[#d1fae5] rounded-xl p-8 max-w-3xl mx-auto shadow-md border-2 border-[#2C5530]/20">
            <p className="text-xl text-gray-700 text-center">
              💡 <span className="font-bold text-[#2C5530]">Dann entscheidest DU:</span>
              <br />
              <span className="text-lg">€39 für detaillierten Report bezahlen</span>
              <br />
              <span className="text-base text-gray-600">
                oder mit den kostenlosen Insights starten
              </span>
            </p>
          </div>

        </div>
      </section>

      {/* ============================================
          SECTION 4: BEFORE/AFTER EXAMPLE
          ============================================ */}
      <section className="bg-gradient-to-b from-[#FFF8E1] to-white py-12 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2D3436] mb-4">
            Echtes Beispiel: Café-Gründung in Berlin
          </h2>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-gray-700 mb-2">
              Victoria & Maren wollten gemeinsam ein Café in Neukölln eröffnen.
            </p>
            <p className="text-gray-600 mb-2">
              Business Plan: Professionell, 20 Seiten, €800 Steuerberater-Kosten.
            </p>
            <p className="text-red-600 font-semibold">
              ⚠️ Problem: Plan war TOO GOOD für Arbeitsagentur
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">

            {/* VORHER Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-red-500">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-red-600">❌ VORHER</h3>
                <div className="relative w-24 h-24">
                  <svg className="transform -rotate-90 w-24 h-24">
                    <circle cx="48" cy="48" r="40" stroke="#fee2e2" strokeWidth="8" fill="none" />
                    <circle cx="48" cy="48" r="40" stroke="#dc2626" strokeWidth="8" fill="none"
                      strokeDasharray="251" strokeDashoffset="188" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-red-600">25</span>
                    <span className="text-xs text-gray-500">/100</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                  <p className="text-lg font-bold text-red-700 mb-1">
                    KRITISCHES RISIKO
                  </p>
                  <p className="text-sm text-gray-600">
                    Bewilligungschance: ~10-20%
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="font-bold text-gray-800">Top 3 Fehler:</p>

                  <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                    <span className="text-2xl flex-shrink-0">⊗</span>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Zwei Gründerinnen
                      </p>
                      <p className="text-sm text-gray-600">
                        Victoria + Maren als Geschäftsführerinnen → Nicht förderbar
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                    <span className="text-2xl flex-shrink-0">⊗</span>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Umsatz: €230.826
                      </p>
                      <p className="text-sm text-gray-600">
                        5x höher als IHK-Benchmark (€45K) → Red Flag
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                    <span className="text-2xl flex-shrink-0">⊗</span>
                    <div>
                      <p className="font-semibold text-gray-800">
                        GmbH-Rechtsform
                      </p>
                      <p className="text-sm text-gray-600">
                        Kapitalgesellschaft → Automatische Ablehnung
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* NACHHER Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-green-500">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-green-600">✅ NACHHER</h3>
                <div className="relative w-24 h-24">
                  <svg className="transform -rotate-90 w-24 h-24">
                    <circle cx="48" cy="48" r="40" stroke="#d1fae5" strokeWidth="8" fill="none" />
                    <circle cx="48" cy="48" r="40" stroke="#10b981" strokeWidth="8" fill="none"
                      strokeDasharray="251" strokeDashoffset="33" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">87</span>
                    <span className="text-xs text-gray-500">/100</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <p className="text-lg font-bold text-green-700 mb-1">
                    NIEDRIGES RISIKO
                  </p>
                  <p className="text-sm text-gray-600">
                    Bewilligungschance: ~85-90%
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="font-bold text-gray-800">Nach Fixes:</p>

                  <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                    <span className="text-2xl flex-shrink-0">✓</span>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Eine Gründerin (Victoria)
                      </p>
                      <p className="text-sm text-gray-600">
                        Maren später als Angestellte → BA-konform
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                    <span className="text-2xl flex-shrink-0">✓</span>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Umsatz: €48.000
                      </p>
                      <p className="text-sm text-gray-600">
                        IHK/DEHOGA-Benchmark eingehalten → Realistisch
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                    <span className="text-2xl flex-shrink-0">✓</span>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Einzelunternehmen
                      </p>
                      <p className="text-sm text-gray-600">
                        Personengesellschaft → Bewilligungsfähig
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Results Box */}
          <div className="bg-gradient-to-r from-green-50 to-[#E8F5E9] rounded-2xl shadow-lg p-8 max-w-3xl mx-auto border-2 border-green-500">
            <h3 className="text-2xl md:text-3xl font-bold text-[#2D3436] mb-6 text-center">
              📈 ERGEBNIS NACH 3 FIXES:
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-[#2C5530] mb-2">+62</p>
                <p className="text-sm text-gray-600">Punkte Verbesserung<br />(25 → 87)</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-[#2C5530] mb-2">~7x</p>
                <p className="text-sm text-gray-600">Höhere<br />Bewilligungschance</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-[#2C5530] mb-2">2 Min</p>
                <p className="text-sm text-gray-600">Umsetzungszeit</p>
              </div>
            </div>
          </div>

          {/* Link to Example */}
          <div className="text-center mt-8">
            <a href="#" className="inline-flex items-center gap-2 text-[#2C5530] font-semibold hover:underline text-lg">
              📄 Kompletten Beispiel-Report ansehen
              <span>→</span>
            </a>
          </div>

        </div>
      </section>

      {/* ============================================
          SECTION 4.5: TESTIMONIALS (PLACEHOLDER)
          ============================================ */}
      <section className="bg-gradient-to-b from-white to-[#F8F6F0] py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2D3436] mb-4">
            Echte Gründer, echte Erfolge
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Erste Beta-Tester berichten
          </p>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Testimonial 1 - Placeholder */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <p className="font-bold text-gray-800">Michael K.</p>
                  <p className="text-sm text-gray-600">IT-Beratung, München</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Score von 31 auf 79 verbessert. Nach den Fixes: Zuschuss bewilligt! €39 statt €800 Steuerberater."
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                ✓ Bewilligt erhalten
              </div>
            </div>

            {/* Testimonial 2 - Placeholder */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <p className="font-bold text-gray-800">Sarah B.</p>
                  <p className="text-sm text-gray-600">Online-Shop, Hamburg</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Die 3 kritischen Fehler waren exakt richtig. Ohne ZuschussCheck wäre mein Antrag abgelehnt worden."
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                ✓ Score +58 Punkte
              </div>
            </div>

            {/* Testimonial 3 - Placeholder */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <p className="font-bold text-gray-800">Thomas R.</p>
                  <p className="text-sm text-gray-600">Handwerk, Leipzig</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Schnell, präzise, günstiger als jeder Berater. Die Garantie hat mich überzeugt."
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                ✓ In Bearbeitung
              </div>
            </div>

          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            * Beta-Tester-Erfahrungen. Echte Namen auf Wunsch anonymisiert.
          </p>

        </div>
      </section>

      {/* ============================================
          SECTION 5: OPPORTUNITY COMPARISON
          ============================================ */}
      <section className="bg-white py-12 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2D3436] mb-4">
            Von Ablehnung zu Bewilligung
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Der Unterschied zwischen €0 und €31.500
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">

            {/* OHNE Card */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-xl p-8 border-2 border-red-300">
              <h3 className="text-3xl font-bold text-red-700 mb-6 text-center">
                ❌ OHNE ZuschussCheck
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white/70 rounded-lg p-4 hover:bg-white transition-colors">
                  <span className="text-3xl flex-shrink-0">❌</span>
                  <div>
                    <p className="font-semibold text-gray-800">Hohe Ablehnungsrate</p>
                    <p className="text-sm text-gray-600">Nur 11% der früheren Bewilligungen</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/70 rounded-lg p-4 hover:bg-white transition-colors">
                  <span className="text-3xl flex-shrink-0">❌</span>
                  <div>
                    <p className="font-semibold text-gray-800">3-6 Monate Wartezeit</p>
                    <p className="text-sm text-gray-600">Plus 3 Monate Sperrfrist bei Ablehnung</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/70 rounded-lg p-4 hover:bg-white transition-colors">
                  <span className="text-3xl flex-shrink-0">❌</span>
                  <div>
                    <p className="font-semibold text-gray-800">€500-€2.000</p>
                    <p className="text-sm text-gray-600">Steuerberater (oft zu optimistisch)</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/70 rounded-lg p-4 hover:bg-white transition-colors">
                  <span className="text-3xl flex-shrink-0">❌</span>
                  <div>
                    <p className="font-semibold text-gray-800">Generische Beratung</p>
                    <p className="text-sm text-gray-600">Keine spezifischen BA GZ 04 Expertise</p>
                  </div>
                </div>
              </div>
            </div>

            {/* MIT Card */}
            <div className="bg-gradient-to-br from-green-50 to-[#E8F5E9] rounded-2xl shadow-xl p-8 border-2 border-green-500">
              <h3 className="text-3xl font-bold text-green-700 mb-6 text-center">
                ✅ MIT ZuschussCheck
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white/70 rounded-lg p-4 hover:bg-white transition-colors">
                  <span className="text-3xl flex-shrink-0">✅</span>
                  <div>
                    <p className="font-semibold text-gray-800">Deutlich höhere Chance</p>
                    <p className="text-sm text-gray-600">Finde kritische Fehler VOR Antragstellung</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/70 rounded-lg p-4 hover:bg-white transition-colors">
                  <span className="text-3xl flex-shrink-0">✅</span>
                  <div>
                    <p className="font-semibold text-gray-800">2 Minuten Analyse</p>
                    <p className="text-sm text-gray-600">Sofortiges Ergebnis per Email</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/70 rounded-lg p-4 hover:bg-white transition-colors">
                  <span className="text-3xl flex-shrink-0">✅</span>
                  <div>
                    <p className="font-semibold text-gray-800">€39 einmalig</p>
                    <p className="text-sm text-gray-600">95% günstiger als Steuerberater</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/70 rounded-lg p-4 hover:bg-white transition-colors">
                  <span className="text-3xl flex-shrink-0">✅</span>
                  <div>
                    <p className="font-semibold text-gray-800">27 BA GZ 04 Kriterien</p>
                    <p className="text-sm text-gray-600">Spezialisiert auf Gründungszuschuss</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Statement */}
          <div className="text-center bg-gradient-to-r from-[#FFF8E1] to-[#F8F6F0] rounded-2xl p-8 shadow-lg">
            <p className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2">
              Deine beste Chance auf €31.500
            </p>
            <p className="text-gray-600 text-lg">
              Erst prüfen, dann kündigen – nicht umgekehrt
            </p>
          </div>

        </div>
      </section>

      {/* ============================================
          SECTION 6: GUARANTEE
          ============================================ */}
      <section className="bg-[#E8F5E9]/50 py-12 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-4 border-[#2C5530]">

            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C5530] mb-4">
                20-PUNKTE-VERBESSERUNGS-GARANTIE
              </h2>
              <p className="text-xl text-gray-700">
                Messbar. Nachprüfbar. Risikolos.
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#2C5530]">
                <h3 className="font-bold text-xl text-[#2D3436] mb-4">
                  So funktioniert's:
                </h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="bg-[#2C5530] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">1</span>
                    <span>Du erhältst deinen Grant Calibration Score (z.B. 25/100)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-[#2C5530] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">2</span>
                    <span>Du setzt unsere 3 Fixes in deinem Plan um</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-[#2C5530] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">3</span>
                    <span>Du lädst den aktualisierten Plan erneut hoch (kostenlos!)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-[#2C5530] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">4</span>
                    <span>Score unter 45? → Volle €39 zurück, keine Fragen</span>
                  </li>
                </ol>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-[#E8F5E9] rounded-xl p-6 border-2 border-green-500">
                <p className="font-bold text-lg text-[#2D3436] mb-4 text-center">BEISPIEL:</p>
                <div className="grid md:grid-cols-3 gap-4 items-center">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-red-600 mb-1">25</p>
                    <p className="text-sm text-gray-600">Dein aktueller<br />Score</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-4xl text-gray-400">→</span>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-green-600 mb-1">45+</p>
                    <p className="text-sm text-gray-600">Minimum nach Fixes<br />
                      <span className="text-xs">(Oft 80-90)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#2D3436] text-white rounded-xl p-6 text-center">
              <p className="text-2xl font-bold mb-2">
                Kein Risiko. Nur Upside.
              </p>
              <p className="text-sm text-gray-300">
                Wir sind so sicher, weil unsere Fixes auf offiziellen
                <br />
                BA GZ 04 Kriterien und IAB-Studien basieren.
              </p>
            </div>

            {/* Link to detailed guarantee terms */}
            <div className="text-center mt-6">
              <a href="/garantie-bedingungen" className="text-sm text-[#2C5530] hover:underline">
                Vollständige Garantiebedingungen →
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================
          SECTION 7: DATENSCHUTZ
          ============================================ */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">

          <div className="bg-[#E8F5E9]/30 rounded-2xl shadow-lg p-8 border-2 border-[#2C5530]/30">

            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl">🔒</div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C5530]">
                100% DATENSCHUTZ GARANTIERT
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                  <span>Server in Deutschland (DSGVO-konform)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                  <span>Keine Weitergabe an AI Training Data</span>
                </div>
              </div>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                  <span>Automatische Löschung nach 7 Tagen</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                  <span>Verschlüsselte Übertragung (SSL)</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================
          SECTION 8: FINAL CTA (OPTIMIZED)
          ============================================ */}
      <section className="bg-gradient-to-b from-[#F8F6F0] to-white py-12 md:py-24 px-4 mb-20 md:mb-0">
        <div className="max-w-4xl mx-auto text-center">

          {/* Final CTA Button */}
          <Link href="/upload">
            <button className="bg-gradient-to-r from-[#2C5530] to-[#1E3A21] text-white text-xl md:text-2xl font-bold py-6 px-12 md:px-16 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 mb-6 cursor-pointer">
              Kostenlos prüfen → nur bei Erfolg €39
            </button>
          </Link>

          {/* Trust subline */}
          <p className="text-sm text-gray-600 mb-12">
            ✓ Kein Risiko • ✓ 20-Punkte-Garantie • ✓ Zahlung erst nach Analyse
          </p>

          {/* B2B Teaser */}
          <div className="bg-gradient-to-r from-[#E8F5E9] to-green-50 rounded-xl p-6 mb-12 border-2 border-[#2C5530]/20">
            <p className="text-gray-700 text-center">
              <span className="font-semibold text-[#2C5530]">Für fachkundige Stellen & Prüfungseinrichtungen:</span>
              <br />
              <span className="text-sm">
                IHK, HWK, Gründerzentren, Steuerberatungen – Analysieren Sie 5x schneller.
              </span>
              <br />
              <a href="/b2b" className="inline-block mt-2 text-[#2C5530] hover:underline font-semibold">
                Kontaktieren Sie uns für Volumen-Lizenzen →
              </a>
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 my-12"></div>

          {/* Trust Badges */}
          <div className="space-y-6">
            <p className="text-xs md:text-sm text-gray-600 uppercase tracking-wider font-semibold mb-6">
              Datengrundlage & Quellen:
            </p>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className="text-4xl">🏛️</div>
                <p className="font-bold text-[#2D3436]">BA GZ 04 & IHK</p>
                <p className="text-sm text-gray-600 text-center">Gleiche Kriterien wie<br />fachkundige Stellen</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-4xl">📊</div>
                <p className="font-bold text-[#2D3436]">IHK & DEHOGA</p>
                <p className="text-sm text-gray-600 text-center">Branchen-<br />Benchmarks</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-4xl">🎓</div>
                <p className="font-bold text-[#2D3436]">IAB-Studien</p>
                <p className="text-sm text-gray-600 text-center">Institut für<br />Arbeitsmarkt</p>
              </div>
            </div>
          </div>

          {/* ⭐ LEGAL FOOTER - CRITICAL ⭐ */}
          <div className="mt-12 pt-8 border-t border-gray-300">

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-600 mb-6">
              <a href="/impressum" className="hover:text-[#2C5530] hover:underline">
                Impressum
              </a>
              <span className="text-gray-400">|</span>
              <a href="/datenschutz" className="hover:text-[#2C5530] hover:underline">
                Datenschutzerklärung
              </a>
              <span className="text-gray-400">|</span>
              <a href="/agb" className="hover:text-[#2C5530] hover:underline">
                AGB
              </a>
              <span className="text-gray-400">|</span>
              <a href="/widerruf" className="hover:text-[#2C5530] hover:underline">
                Widerrufsbelehrung
              </a>
              <span className="text-gray-400">|</span>
              <a href="/garantie-bedingungen" className="hover:text-[#2C5530] hover:underline">
                Garantiebedingungen
              </a>
            </div>

            {/* Company Info & Disclaimer */}
            <div className="space-y-4">
              <p className="text-sm text-gray-500 leading-relaxed">
                <span className="font-semibold text-[#2C5530]">ZuschussCheck</span> von PrincipalAI
                <br />
                Gründungszuschuss-Optimierung für €31.500 Förderung
                <br />
                <a href="mailto:info@principai.de" className="hover:text-[#2C5530]">info@principai.de</a> |
                <a href="https://principai.de" className="hover:text-[#2C5530] ml-1">principai.de</a>
              </p>

              {/* Legal Disclaimer */}
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <span className="font-semibold">Rechtlicher Hinweis:</span> Dies ist keine steuerliche, rechtliche oder wirtschaftliche Beratung.
                  Wir analysieren Business Pläne lediglich auf formale Übereinstimmung mit den BA GZ 04 Förderkriterien der Bundesagentur für Arbeit.
                  Die finale Bewilligungsentscheidung liegt ausschließlich bei der zuständigen Arbeitsagentur.
                  Es besteht kein Rechtsanspruch auf Gründungszuschuss (Ermessensleistung gemäß §93 SGB III).
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================
          MOBILE STICKY CTA (OPTIMIZED)
          ============================================ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-3 z-50 border-t-2 border-[#2C5530]">
        <Link href="/upload" className="block">
          <button className="w-full bg-gradient-to-r from-[#2C5530] to-[#1E3A21] text-white font-bold py-4 rounded-lg shadow-lg active:scale-95 transition-transform cursor-pointer">
            Kostenlos prüfen • Nur €39 bei Erfolg ✓
          </button>
        </Link>
        <p className="text-xs text-center text-gray-500 mt-2">
          Kein Risiko • 20-Punkte-Garantie
        </p>
      </div>

    </div>
  )
}