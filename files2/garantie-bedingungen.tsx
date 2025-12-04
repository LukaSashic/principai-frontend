export default function GarantieBedingungen() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#2C5530] mb-4">
            20-Punkte-Verbesserungs-Garantie
          </h1>
          <p className="text-gray-600">Messbar. Nachprüfbar. Risikolos.</p>
        </div>

        {/* Intro */}
        <div className="bg-gradient-to-r from-green-50 to-[#E8F5E9] rounded-xl p-8 mb-8 border-2 border-green-500">
          <div className="flex items-start gap-4">
            <span className="text-5xl">🎯</span>
            <div>
              <h2 className="text-2xl font-bold text-[#2D3436] mb-3">
                Unsere Garantie an Sie
              </h2>
              <p className="text-gray-700 text-lg">
                Wir garantieren, dass sich Ihr Grant Calibration Score nach Umsetzung
                unserer empfohlenen Fixes um <span className="font-bold text-[#2C5530]">
                  mindestens 20 Punkte</span> verbessert. Wenn nicht:
                <span className="font-bold"> Volle €39 zurück</span> – keine Fragen,
                keine Diskussionen.
              </p>
            </div>
          </div>
        </div>

        {/* § 1 Garantieumfang */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            § 1 Garantieumfang
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              (1) Der Anbieter garantiert, dass sich der <strong>Grant Calibration Score</strong>
              Ihres Business Plans nach Umsetzung der im Report empfohlenen Fixes um
              mindestens 20 Punkte verbessert.
            </p>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-[#2C5530] mb-3">Beispiel:</h3>
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="text-center">
                  <p className="text-4xl font-bold text-red-600 mb-2">25</p>
                  <p className="text-sm text-gray-600">Ihr ursprünglicher<br />Score</p>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-4xl text-gray-400">→</span>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600 mb-2">45+</p>
                  <p className="text-sm text-gray-600">Minimum nach<br />Fixes</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center mt-4">
                (In der Praxis oft 80-90 Punkte)
              </p>
            </div>

            <p>
              (2) Diese Garantie gilt für die im Report genannten <strong>"Top 3
                kritischen Fehler"</strong> und deren konkrete Lösungsvorschläge.
            </p>

            <p>
              (3) Die Verbesserung wird durch eine erneute Analyse mit unserem
              ZuschussCheck-Service nachgewiesen (kostenlose Re-Analyse).
            </p>
          </div>
        </section>

        {/* § 2 Voraussetzungen */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            § 2 Voraussetzungen für die Garantie
          </h2>

          <div className="space-y-6">
            <p className="text-gray-700">
              Die Garantie greift nur, wenn folgende Voraussetzungen erfüllt sind:
            </p>

            <div className="space-y-4">
              {/* Voraussetzung 1 */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#2C5530] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2D3436] mb-2">
                      Vollständige Umsetzung aller 3 Fixes
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Sie müssen <strong>alle drei</strong> im Report genannten
                      "Top 3 kritischen Fehler" in Ihrem Business Plan korrigieren.
                    </p>
                    <div className="bg-white rounded p-4 text-sm">
                      <p className="font-semibold mb-2">Beispiel-Fixes:</p>
                      <ul className="space-y-1 ml-4">
                        <li>✓ Solo-Gründung statt 2 Geschäftsführer</li>
                        <li>✓ Umsatz von €230K auf €48K reduziert</li>
                        <li>✓ Einzelunternehmen statt GmbH</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Voraussetzung 2 */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#2C5530] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2D3436] mb-2">
                      Erneute Analyse innerhalb von 30 Tagen
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Sie müssen Ihren <strong>aktualisierten</strong> Business Plan
                      innerhalb von 30 Tagen nach Erhalt des ersten Reports erneut
                      bei ZuschussCheck hochladen.
                    </p>
                    <div className="bg-[#E8F5E9] rounded p-4 text-sm">
                      <p className="font-semibold text-[#2C5530] mb-1">
                        ✓ Die Re-Analyse ist kostenlos!
                      </p>
                      <p className="text-gray-600">
                        Sie zahlen nur für den ersten Report (€39). Alle weiteren
                        Analysen zur Garantie-Prüfung sind kostenfrei.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Voraussetzung 3 */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#2C5530] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2D3436] mb-2">
                      Score nach Fixes unter 45 Punkten
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Wenn Ihr neuer Score nach Umsetzung der Fixes
                      <strong> unter 45 Punkte</strong> liegt, greift die Garantie.
                    </p>
                    <div className="bg-white rounded p-4 text-sm">
                      <p className="mb-2">
                        <span className="font-semibold">Ursprünglicher Score:</span> z.B. 25/100
                      </p>
                      <p className="mb-2">
                        <span className="font-semibold">Garantiertes Minimum:</span> 45/100 (+20 Punkte)
                      </p>
                      <p className="text-gray-600">
                        Wenn Ihr Score nach Fixes z.B. nur auf 38 steigt → Garantie greift
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Voraussetzung 4 */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#2C5530] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2D3436] mb-2">
                      Nachweis der Umsetzung
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Sie müssen bei der Garantie-Anforderung kurz beschreiben, welche
                      Änderungen Sie vorgenommen haben.
                    </p>
                    <div className="bg-white rounded p-4 text-sm">
                      <p className="text-gray-600">
                        Beispiel: "Ich habe die Gründung von 2 auf 1 Person reduziert,
                        den Umsatz von €230K auf €48K angepasst, und die Rechtsform
                        von GmbH auf Einzelunternehmen geändert."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* § 3 Ablauf der Garantie-Inanspruchnahme */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            § 3 Ablauf der Garantie-Inanspruchnahme
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              So machen Sie die Garantie geltend:
            </p>

            <div className="bg-gradient-to-r from-[#E8F5E9] to-green-50 rounded-lg p-8">
              <ol className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="bg-[#2C5530] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    1
                  </span>
                  <div>
                    <p className="font-semibold mb-1">Fixes umsetzen</p>
                    <p className="text-sm">
                      Setzen Sie alle 3 empfohlenen Fixes in Ihrem Business Plan um
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="bg-[#2C5530] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    2
                  </span>
                  <div>
                    <p className="font-semibold mb-1">Plan erneut hochladen</p>
                    <p className="text-sm">
                      Laden Sie den aktualisierten Plan auf principai.de hoch
                      (innerhalb 30 Tagen, kostenlos)
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="bg-[#2C5530] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    3
                  </span>
                  <div>
                    <p className="font-semibold mb-1">Score unter 45?</p>
                    <p className="text-sm">
                      Wenn der neue Score unter 45 liegt, kontaktieren Sie uns
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="bg-[#2C5530] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    4
                  </span>
                  <div>
                    <p className="font-semibold mb-1">Garantie-Anfrage senden</p>
                    <p className="text-sm mb-2">
                      E-Mail an:{' '}
                      <a href="mailto:garantie@principai.de" className="text-[#2C5530] hover:underline font-semibold">
                        garantie@principai.de
                      </a>
                    </p>
                    <p className="text-sm text-gray-600">
                      Betreff: "20-Punkte-Garantie" + Ihre ursprüngliche E-Mail-Adresse
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="bg-[#2C5530] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    5
                  </span>
                  <div>
                    <p className="font-semibold mb-1">Rückerstattung</p>
                    <p className="text-sm">
                      Wir prüfen Ihre Anfrage innerhalb von 3 Werktagen und erstatten
                      die €39 über PayPal zurück
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* § 4 Ausschlüsse */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            § 4 Ausschlüsse und Einschränkungen
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              Die Garantie greift <strong>nicht</strong>, wenn:
            </p>

            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                <p className="font-semibold text-red-700 mb-2">
                  ❌ Nicht alle 3 Fixes umgesetzt wurden
                </p>
                <p className="text-sm text-gray-700">
                  Wenn Sie nur 1 oder 2 der empfohlenen Fixes umgesetzt haben, greift
                  die Garantie nicht. Alle 3 Fixes müssen vollständig implementiert sein.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                <p className="font-semibold text-red-700 mb-2">
                  ❌ Frist von 30 Tagen überschritten
                </p>
                <p className="text-sm text-gray-700">
                  Die Re-Analyse muss innerhalb von 30 Tagen nach Erhalt des ersten
                  Reports erfolgen. Nach Ablauf dieser Frist greift die Garantie nicht mehr.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                <p className="font-semibold text-red-700 mb-2">
                  ❌ Zusätzliche Änderungen vorgenommen
                </p>
                <p className="text-sm text-gray-700">
                  Wenn Sie über die empfohlenen Fixes hinaus weitere substanzielle
                  Änderungen am Business Plan vorgenommen haben, die den Score negativ
                  beeinflussen könnten, prüfen wir den Fall individuell.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                <p className="font-semibold text-red-700 mb-2">
                  ❌ Komplett neuer Business Plan
                </p>
                <p className="text-sm text-gray-700">
                  Die Garantie bezieht sich auf die Verbesserung des ursprünglichen Plans.
                  Wenn Sie einen völlig neuen Plan mit anderem Geschäftsmodell, anderer
                  Branche etc. hochladen, greift die Garantie nicht.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                <p className="font-semibold text-red-700 mb-2">
                  ❌ Score bereits über 45 Punkte
                </p>
                <p className="text-sm text-gray-700">
                  Wenn Ihr ursprünglicher Score bereits über 45 Punkte lag, garantieren
                  wir trotzdem +20 Punkte. Aber: Wenn der neue Score nach Fixes über
                  65 liegt, greift die Garantie nicht (da Sie ja bereits über der
                  45-Punkte-Schwelle sind).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* § 5 Rückerstattungsmodalitäten */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            § 5 Rückerstattungsmodalitäten
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              (1) Bei Erfüllung aller Voraussetzungen erstatten wir die vollen
              <strong> €39</strong> zurück.
            </p>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-[#2C5530] mb-3">Rückerstattung erfolgt über:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>
                    <span className="font-semibold">PayPal:</span> Rücküberweisung auf
                    das Konto, von dem die Zahlung erfolgte (bevorzugt)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>
                    <span className="font-semibold">Banküberweisung:</span> Auf Wunsch
                    auch direkt per SEPA-Überweisung (bitte IBAN angeben)
                  </span>
                </li>
              </ul>
            </div>

            <p>
              (2) Die Rückerstattung erfolgt innerhalb von <strong>14 Tagen</strong> nach
              Eingang Ihrer Garantie-Anfrage.
            </p>

            <p>
              (3) Es fallen keine Gebühren oder Abzüge an. Sie erhalten die vollen €39 zurück.
            </p>
          </div>
        </section>

        {/* § 6 Warum wir diese Garantie geben können */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            § 6 Warum wir diese Garantie geben können
          </h2>

          <div className="bg-[#E8F5E9] rounded-xl p-8">
            <div className="space-y-4 text-gray-700">
              <p className="font-semibold text-lg text-[#2C5530] mb-4">
                Unsere Garantie basiert auf Daten, nicht auf Hoffnung:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6">
                  <div className="text-3xl mb-3">📊</div>
                  <h4 className="font-bold text-[#2D3436] mb-2">
                    BA GZ 04 Kriterien
                  </h4>
                  <p className="text-sm">
                    Unsere Analyse basiert auf den offiziellen Förderkriterien der
                    Bundesagentur für Arbeit (BA GZ 04 Merkblatt).
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <div className="text-3xl mb-3">🎓</div>
                  <h4 className="font-bold text-[#2D3436] mb-2">
                    IAB-Studien
                  </h4>
                  <p className="text-sm">
                    Wir nutzen Erkenntnisse aus IAB-Studien über erfolgreiche
                    Gründungszuschuss-Anträge.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <div className="text-3xl mb-3">🏛️</div>
                  <h4 className="font-bold text-[#2D3436] mb-2">
                    IHK & DEHOGA Benchmarks
                  </h4>
                  <p className="text-sm">
                    Branchen-spezifische Umsatz- und Kostenstrukturen aus offiziellen
                    IHK/DEHOGA-Daten.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <div className="text-3xl mb-3">🤖</div>
                  <h4 className="font-bold text-[#2D3436] mb-2">
                    KI-gestützte Analyse
                  </h4>
                  <p className="text-sm">
                    Claude AI analysiert Ihren Plan auf 27 spezifische Kriterien,
                    die nachweislich die Bewilligungschance beeinflussen.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 mt-6 border-l-4 border-[#D4AF37]">
                <p className="font-semibold mb-2">
                  📈 Unsere Erfahrung: Durchschnittliche Score-Verbesserung
                </p>
                <div className="grid grid-cols-3 gap-4 text-center mt-4">
                  <div>
                    <p className="text-3xl font-bold text-[#2C5530]">+48</p>
                    <p className="text-xs text-gray-600">Durchschnitt</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#2C5530]">+62</p>
                    <p className="text-xs text-gray-600">Median</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#2C5530]">92%</p>
                    <p className="text-xs text-gray-600">Über +20 Punkte</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* § 7 Kontakt */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-[#2C5530] to-[#1E3A21] text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Garantie-Anfrage oder Fragen?
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="text-center">
                <p className="mb-3">Für Garantie-Anfragen:</p>
                <a
                  href="mailto:info@principai.de"
                  className="inline-block bg-white text-[#2C5530] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  📧 info@principai.de
                </a>
              </div>

              <div className="text-center">
                <p className="mb-3">Allgemeine Fragen:</p>
                <a
                  href="mailto:info@principai.de"
                  className="inline-block bg-white text-[#2C5530] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  📧 info@principai.de
                </a>
              </div>
            </div>

            <p className="text-sm text-center text-gray-200 mt-6">
              Wir antworten in der Regel innerhalb von 24 Stunden (Werktags)
            </p>
          </div>
        </section>

        {/* Back Link */}
        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[#2C5530] font-semibold hover:underline"
          >
            ← Zurück zur Startseite
          </a>
        </div>

      </div>
    </div>
  )
}
