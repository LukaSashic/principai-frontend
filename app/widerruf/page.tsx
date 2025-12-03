export default function Widerruf() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#2C5530] mb-4">Widerrufsbelehrung</h1>
          <p className="text-gray-600">Ihr Recht zum Widerruf gemäß § 355 BGB</p>
        </div>

        {/* Widerrufsrecht */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            Widerrufsrecht
          </h2>

          <div className="bg-gray-50 rounded-xl p-8 space-y-4 text-gray-700">
            <p>
              Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen
              Vertrag zu widerrufen.
            </p>

            <p>
              Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
            </p>

            <p>
              Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
            </p>

            <div className="bg-white rounded-lg p-6 border-2 border-[#2C5530]">
              <p className="font-semibold mb-2">Sasa Lukic</p>
              <p>Hauptstraße 92</p>
              <p>12159 Berlin</p>
              <p className="mt-3">
                E-Mail:{' '}
                <a href="mailto:widerruf@principai.de" className="text-[#2C5530] hover:underline">
                  widerruf@principai.de
                </a>
              </p>
              <p>
                Telefon: +49 175 279 88 17
              </p>
            </div>

            <p>
              mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter
              Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen,
              informieren.
            </p>

            <p>
              Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das
              jedoch nicht vorgeschrieben ist.
            </p>

            <div className="bg-[#E8F5E9] rounded-lg p-6">
              <p className="font-semibold text-[#2C5530] mb-2">Widerrufsfrist:</p>
              <p>
                Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung
                über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
              </p>
            </div>
          </div>
        </section>

        {/* Folgen des Widerrufs */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            Folgen des Widerrufs
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir
              von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der
              zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der
              Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt
              haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag
              zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags
              bei uns eingegangen ist.
            </p>

            <div className="bg-gray-50 rounded-lg p-6">
              <p className="font-semibold mb-3">Rückzahlungsmodalitäten:</p>
              <p>
                Für die Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
                ursprünglichen Transaktion eingesetzt haben (PayPal), es sei denn, mit
                Ihnen wurde ausdrücklich etwas anderes vereinbart.
              </p>
              <p className="mt-3">
                In keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
              </p>
            </div>
          </div>
        </section>

        {/* Vorzeitiges Erlöschen */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            Vorzeitiges Erlöschen des Widerrufsrechts
          </h2>

          <div className="bg-[#FFF8E1] border-l-4 border-[#D4AF37] rounded-lg p-8">
            <h3 className="font-bold text-[#2D3436] mb-4 text-xl">
              ⚠️ WICHTIG: Besonderheit bei digitalen Inhalten
            </h3>

            <div className="space-y-4 text-gray-700">
              <p className="font-semibold">
                Das Widerrufsrecht erlischt vorzeitig bei Verträgen zur Lieferung von
                digitalen Inhalten, die nicht auf einem körperlichen Datenträger geliefert
                werden, wenn:
              </p>

              <div className="bg-white rounded-lg p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">1️⃣</span>
                  <p>
                    Der Anbieter mit der Ausführung des Vertrags begonnen hat, <strong>nachdem</strong>
                    Sie ausdrücklich zugestimmt haben, dass der Anbieter mit der Ausführung
                    des Vertrags vor Ablauf der Widerrufsfrist beginnt, <strong>und</strong>
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">2️⃣</span>
                  <p>
                    Sie Ihre Kenntnis davon bestätigt haben, dass Sie durch Ihre Zustimmung
                    mit Beginn der Ausführung des Vertrags Ihr Widerrufsrecht verlieren.
                  </p>
                </div>
              </div>

              <div className="bg-[#E8F5E9] rounded-lg p-6 mt-6">
                <p className="font-semibold text-[#2C5530] mb-3">
                  Für den ZuschussCheck-Service bedeutet das:
                </p>
                <p className="mb-3">
                  Mit Klick auf <strong>"Jetzt für €39 kaufen"</strong> stimmen Sie
                  ausdrücklich zu, dass:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>
                      wir unmittelbar nach Zahlungseingang mit der Leistungserbringung
                      (Versand des detaillierten Reports per E-Mail) beginnen, und
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>
                      Sie dadurch Ihr Widerrufsrecht verlieren, sobald wir den Report
                      vollständig per E-Mail zugestellt haben.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mt-6">
                <p className="font-semibold text-red-700 mb-2">
                  ⚠️ Kein Widerrufsrecht nach Report-Versand
                </p>
                <p className="text-sm text-gray-700">
                  Sobald Sie den detaillierten 5-Seiten-Report per E-Mail erhalten haben,
                  erlischt Ihr Widerrufsrecht. Sie können den Kauf dann nicht mehr
                  widerrufen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Muster-Widerrufsformular */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            Muster-Widerrufsformular
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses
              Formular aus und senden Sie es zurück.
            </p>

            <div className="bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-300">
              <p className="text-sm text-gray-600 mb-6">
                (Dieses Formular können Sie auch per E-Mail an widerruf@principai.de senden)
              </p>

              <div className="space-y-6">
                <div>
                  <p className="font-semibold mb-2">An:</p>
                  <div className="bg-white p-4 rounded">
                    <p className="font-semibold">Sasa Lukic</p>
                    <p>Hauptstraße 92</p>
                    <p>12159 Berlin</p>
                    <p className="mt-2">E-Mail: widerruf@principai.de</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p>
                    Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen
                    Vertrag über den Kauf der folgenden Waren (*) / die Erbringung der
                    folgenden Dienstleistung (*)
                  </p>

                  <div className="bg-white p-4 rounded">
                    <p className="text-gray-600">
                      ZuschussCheck-Analyse (Grant Calibration Report)
                    </p>
                  </div>

                  <div>
                    <p>Bestellt am (*) / erhalten am (*):</p>
                    <div className="bg-white p-4 rounded mt-2">
                      <p className="text-gray-400">_______________________</p>
                    </div>
                  </div>

                  <div>
                    <p>Name des/der Verbraucher(s):</p>
                    <div className="bg-white p-4 rounded mt-2">
                      <p className="text-gray-400">_______________________</p>
                    </div>
                  </div>

                  <div>
                    <p>Anschrift des/der Verbraucher(s):</p>
                    <div className="bg-white p-4 rounded mt-2">
                      <p className="text-gray-400">_______________________</p>
                      <p className="text-gray-400">_______________________</p>
                    </div>
                  </div>

                  <div>
                    <p>E-Mail-Adresse (für Rückerstattung):</p>
                    <div className="bg-white p-4 rounded mt-2">
                      <p className="text-gray-400">_______________________</p>
                    </div>
                  </div>

                  <div>
                    <p>Datum:</p>
                    <div className="bg-white p-4 rounded mt-2">
                      <p className="text-gray-400">_______________________</p>
                    </div>
                  </div>

                  <div>
                    <p>Unterschrift (nur bei Mitteilung auf Papier):</p>
                    <div className="bg-white p-4 rounded mt-2 h-16">
                      <p className="text-gray-400">_______________________</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 italic">
                  (*) Unzutreffendes streichen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Alternative: Garantie statt Widerruf */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-green-50 to-[#E8F5E9] rounded-2xl p-8 border-2 border-green-500">
            <h3 className="text-2xl font-bold text-[#2D3436] mb-4">
              💡 Alternative: 20-Punkte-Verbesserungs-Garantie
            </h3>

            <p className="text-gray-700 mb-4">
              Anstelle des Widerrufsrechts bieten wir Ihnen unsere
              <strong> 20-Punkte-Verbesserungs-Garantie</strong>:
            </p>

            <div className="bg-white rounded-lg p-6 mb-4">
              <p className="text-gray-700 mb-3">
                Wenn sich Ihr Grant Calibration Score nach Umsetzung unserer Fixes nicht
                um mindestens 20 Punkte verbessert, erhalten Sie Ihr Geld zurück –
                <strong> auch nach Erhalt des Reports!</strong>
              </p>

              <div className="space-y-2 text-sm text-gray-600">
                <p>✓ Setzen Sie alle 3 empfohlenen Fixes um</p>
                <p>✓ Laden Sie den Plan erneut hoch (kostenlos)</p>
                <p>✓ Score unter 45? → Volle €39 zurück</p>
              </div>
            </div>

            <a
              href="/garantie-bedingungen"
              className="inline-block bg-[#2C5530] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1E3A21] transition-colors"
            >
              Garantiebedingungen lesen →
            </a>
          </div>
        </section>

        {/* Contact Box */}
        <div className="bg-gradient-to-r from-[#2C5530] to-[#1E3A21] text-white rounded-2xl p-8 text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Fragen zum Widerrufsrecht?</h3>
          <p className="mb-6">
            Wir helfen Ihnen gerne weiter:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:widerruf@principai.de"
              className="bg-white text-[#2C5530] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              📧 widerruf@principai.de
            </a>
            <a
              href="mailto:info@principai.de"
              className="bg-white text-[#2C5530] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              📧 info@principai.de
            </a>
          </div>
        </div>

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
