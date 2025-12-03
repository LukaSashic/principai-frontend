export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#2C5530] mb-4">Datenschutzerklärung</h1>
          <p className="text-gray-600">Stand: Dezember 2024</p>
        </div>

        {/* Intro */}
        <div className="bg-[#E8F5E9] rounded-xl p-6 mb-8">
          <p className="text-gray-700">
            Wir freuen uns über Ihr Interesse an unserem Service. Der Schutz Ihrer
            personenbezogenen Daten ist uns ein wichtiges Anliegen. Nachfolgend
            informieren wir Sie ausführlich über den Umgang mit Ihren Daten.
          </p>
        </div>

        {/* 1. Verantwortlicher */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            1. Verantwortlicher
          </h2>

          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <div className="space-y-2 text-gray-700">
              <p className="font-semibold">Sasa Lukic</p>
              <p>Hauptstraße 92</p>
              <p>12159 Berlin</p>
              <p className="mt-4">
                <span className="font-semibold">E-Mail:</span>{' '}
                <a href="mailto:info@principai.de" className="text-[#2C5530] hover:underline">
                  info@principai.de
                </a>
              </p>
              <p>
                <span className="font-semibold">Telefon:</span> +49 175 279 88 17
              </p>
            </div>
          </div>
        </section>

        {/* 2. Arten der verarbeiteten Daten */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            2. Arten der verarbeiteten Daten
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>Wir verarbeiten folgende Kategorien von Daten:</p>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-[#2C5530] mb-3">2.1 Bei Nutzung unseres Services</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>E-Mail-Adresse (für Versand des Analyse-Reports)</li>
                <li>Hochgeladene Business Plan PDF-Datei</li>
                <li>IP-Adresse und technische Zugriffsdaten</li>
                <li>Zeitstempel des Uploads</li>
                <li>Grant Calibration Score und Analyse-Ergebnisse</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-[#2C5530] mb-3">2.2 Bei Zahlung (PayPal)</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>PayPal-Transaktions-ID</li>
                <li>Zahlungsstatus</li>
                <li>Zeitpunkt der Zahlung</li>
                <li>Betrag (€39)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                ℹ️ Zahlungsdaten (Kreditkartennummern, Kontodaten) werden ausschließlich
                von PayPal verarbeitet, nicht von uns.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Zwecke und Rechtsgrundlagen */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            3. Zwecke der Verarbeitung und Rechtsgrundlagen
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-[#2C5530] mb-3">
                3.1 Bereitstellung des ZuschussCheck-Services
              </h3>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold">Zweck:</span> Analyse Ihres Business Plans
                auf BA GZ 04-Konformität und Erstellung des Grant Calibration Reports.
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. b DSGVO
                (Vertragserfüllung)
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-[#2C5530] mb-3">3.2 Zahlungsabwicklung</h3>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold">Zweck:</span> Abwicklung der Zahlung für den
                detaillierten Report (€39).
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. b DSGVO
                (Vertragserfüllung)
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-[#2C5530] mb-3">3.3 Website-Betrieb und Sicherheit</h3>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold">Zweck:</span> Gewährleistung der technischen
                Funktionsfähigkeit und Sicherheit unserer Website.
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. f DSGVO
                (berechtigtes Interesse)
              </p>
            </div>
          </div>
        </section>

        {/* 4. Speicherdauer */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            4. Speicherdauer
          </h2>

          <div className="bg-[#E8F5E9] rounded-lg p-6">
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <p className="font-semibold">Hochgeladene Business Pläne:</p>
                  <p className="text-sm">Automatische Löschung nach 7 Tagen</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <p className="font-semibold">Analyse-Ergebnisse & Reports:</p>
                  <p className="text-sm">Automatische Löschung nach 30 Tagen</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <p className="font-semibold">E-Mail-Adressen:</p>
                  <p className="text-sm">
                    Löschung nach 30 Tagen, es sei denn Sie nutzen den Service erneut
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <p className="font-semibold">Zahlungsdaten (Transaktions-IDs):</p>
                  <p className="text-sm">
                    Aufbewahrung für 10 Jahre (steuerliche Aufbewahrungspflicht gemäß §147 AO)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Empfänger von Daten */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            5. Empfänger von Daten
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-[#2C5530] mb-3">5.1 Hosting-Anbieter</h3>
              <p className="text-gray-700 mb-3">
                Unsere Website und Backend werden gehostet bei:
              </p>
              <div className="text-gray-700">
                <p className="font-semibold">Railway (Backend)</p>
                <p className="text-sm text-gray-600 mb-3">
                  Server-Standort: [REGION PRÜFEN - z.B. "Frankfurt, Deutschland" oder "EU"]
                </p>

                <p className="font-semibold">[IONOS / Vercel] (Frontend)</p>
                <p className="text-sm text-gray-600">
                  Server-Standort: [REGION EINTRAGEN]
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-[#2C5530] mb-3">5.2 Zahlungsdienstleister</h3>
              <p className="text-gray-700 mb-3">
                Für die Zahlungsabwicklung nutzen wir:
              </p>
              <div className="text-gray-700">
                <p className="font-semibold">PayPal (Europe) S.à r.l. et Cie, S.C.A.</p>
                <p className="text-sm">22-24 Boulevard Royal, L-2449 Luxembourg</p>
                <p className="text-sm text-gray-600 mt-2">
                  Datenschutzerklärung:{' '}
                  <a
                    href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2C5530] hover:underline"
                  >
                    PayPal Privacy Policy
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-[#2C5530] mb-3">5.3 KI-Analyse-Service</h3>
              <p className="text-gray-700 mb-3">
                Für die Analyse Ihrer Business Pläne nutzen wir:
              </p>
              <div className="text-gray-700">
                <p className="font-semibold">Anthropic PBC (Claude API)</p>
                <p className="text-sm text-gray-600 mt-2">
                  ⚠️ <span className="font-semibold">WICHTIG:</span> Ihre Business Plan Daten
                  werden NICHT für KI-Training verwendet. Anthropic verpflichtet sich vertraglich,
                  keine API-Daten für Model-Training zu nutzen.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Datenschutzerklärung:{' '}
                  <a
                    href="https://www.anthropic.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2C5530] hover:underline"
                  >
                    Anthropic Privacy Policy
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-[#FFF8E1] border-l-4 border-[#D4AF37] rounded-lg p-6">
              <p className="text-gray-700">
                <span className="font-semibold">Keine Weitergabe an Dritte:</span> Wir geben
                Ihre personenbezogenen Daten nicht an unbeteiligte Dritte weiter. Eine Übermittlung
                an Strafverfolgungsbehörden erfolgt nur, wenn wir hierzu gesetzlich verpflichtet sind.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Cookies & Tracking */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            6. Cookies und Tracking
          </h2>

          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Unsere Website verwendet derzeit <span className="font-semibold">keine Cookies</span>
              für Marketing oder Tracking-Zwecke.
            </p>

            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-semibold text-[#2C5530] mb-2">
                  Technisch notwendige Cookies (falls verwendet):
                </p>
                <p className="text-sm">
                  Falls wir technisch notwendige Cookies einsetzen (z.B. für Session-Management),
                  ist die Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
                </p>
              </div>

              <div>
                <p className="font-semibold text-[#2C5530] mb-2">Google Analytics (optional):</p>
                <p className="text-sm text-gray-600">
                  ⚠️ Falls Sie Google Analytics aktivieren möchten, fügen Sie hier die entsprechende
                  Datenschutzerklärung hinzu und implementieren Sie ein Cookie-Banner mit Opt-in.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Ihre Rechte */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            7. Ihre Rechte als betroffene Person
          </h2>

          <div className="space-y-4">
            <p className="text-gray-700">
              Sie haben nach der DSGVO folgende Rechte:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#E8F5E9] rounded-lg p-4">
                <p className="font-bold text-[#2C5530] mb-2">📋 Recht auf Auskunft</p>
                <p className="text-sm text-gray-700">
                  Art. 15 DSGVO - Auskunft über Ihre gespeicherten Daten
                </p>
              </div>

              <div className="bg-[#E8F5E9] rounded-lg p-4">
                <p className="font-bold text-[#2C5530] mb-2">✏️ Recht auf Berichtigung</p>
                <p className="text-sm text-gray-700">
                  Art. 16 DSGVO - Korrektur falscher Daten
                </p>
              </div>

              <div className="bg-[#E8F5E9] rounded-lg p-4">
                <p className="font-bold text-[#2C5530] mb-2">🗑️ Recht auf Löschung</p>
                <p className="text-sm text-gray-700">
                  Art. 17 DSGVO - Löschung Ihrer Daten ("Recht auf Vergessenwerden")
                </p>
              </div>

              <div className="bg-[#E8F5E9] rounded-lg p-4">
                <p className="font-bold text-[#2C5530] mb-2">⛔ Recht auf Einschränkung</p>
                <p className="text-sm text-gray-700">
                  Art. 18 DSGVO - Einschränkung der Verarbeitung
                </p>
              </div>

              <div className="bg-[#E8F5E9] rounded-lg p-4">
                <p className="font-bold text-[#2C5530] mb-2">📤 Recht auf Datenübertragbarkeit</p>
                <p className="text-sm text-gray-700">
                  Art. 20 DSGVO - Erhalt Ihrer Daten in strukturiertem Format
                </p>
              </div>

              <div className="bg-[#E8F5E9] rounded-lg p-4">
                <p className="font-bold text-[#2C5530] mb-2">🚫 Widerspruchsrecht</p>
                <p className="text-sm text-gray-700">
                  Art. 21 DSGVO - Widerspruch gegen Datenverarbeitung
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mt-6">
              <h3 className="font-bold text-[#2C5530] mb-3">So üben Sie Ihre Rechte aus:</h3>
              <p className="text-gray-700 mb-3">
                Kontaktieren Sie uns einfach per E-Mail:
              </p>
              <a
                href="mailto:datenschutz@principai.de"
                className="inline-flex items-center gap-2 bg-[#2C5530] text-white px-6 py-3 rounded-lg hover:bg-[#1E3A21] transition-colors"
              >
                📧 datenschutz@principai.de
              </a>
              <p className="text-sm text-gray-600 mt-3">
                Wir werden Ihre Anfrage innerhalb von 30 Tagen beantworten.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Beschwerderecht */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            8. Beschwerderecht bei der Aufsichtsbehörde
          </h2>

          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über unsere
              Verarbeitung personenbezogener Daten zu beschweren.
            </p>

            <div className="text-gray-700">
              <p className="font-semibold mb-2">Zuständige Aufsichtsbehörde in Deutschland:</p>
              <p>Die Bundesbeauftragte für den Datenschutz und die Informationsfreiheit (BfDI)</p>
              <p className="text-sm mt-2">Graurheindorfer Str. 153, 53117 Bonn</p>
              <p className="text-sm">
                Website:{' '}
                <a
                  href="https://www.bfdi.bund.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2C5530] hover:underline"
                >
                  www.bfdi.bund.de
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* 9. SSL/TLS Verschlüsselung */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            9. SSL/TLS-Verschlüsselung
          </h2>

          <div className="bg-[#E8F5E9] rounded-lg p-6">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🔒</span>
              <div className="text-gray-700">
                <p className="mb-3">
                  Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
                  vertraulicher Inhalte eine SSL/TLS-Verschlüsselung.
                </p>
                <p className="text-sm">
                  Sie erkennen eine verschlüsselte Verbindung am Schloss-Symbol in der
                  Adresszeile Ihres Browsers und daran, dass die Adresszeile von "http://"
                  auf "https://" wechselt.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Änderungen */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            10. Änderungen dieser Datenschutzerklärung
          </h2>

          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700">
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen,
              damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um
              Änderungen unserer Leistungen umzusetzen. Die jeweils aktuelle
              Datenschutzerklärung finden Sie auf dieser Seite.
            </p>
            <p className="text-sm text-gray-600 mt-3">
              Stand dieser Datenschutzerklärung: Dezember 2024
            </p>
          </div>
        </section>

        {/* Back Link */}
        <div className="mt-12 text-center">
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
