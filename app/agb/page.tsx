export default function AGB() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#2C5530] mb-4">
            Allgemeine Geschäftsbedingungen (AGB)
          </h1>
          <p className="text-gray-600">Stand: Dezember 2024</p>
        </div>

        {/* Intro */}
        <div className="bg-[#E8F5E9] rounded-xl p-6 mb-8">
          <p className="text-gray-700">
            Diese Allgemeinen Geschäftsbedingungen regeln die Nutzung des
            ZuschussCheck-Services zur Analyse von Businessplänen für den
            Gründungszuschuss der Bundesagentur für Arbeit.
          </p>
        </div>

        {/* § 1 Geltungsbereich */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            § 1 Geltungsbereich
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              (1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend "AGB") gelten für
              alle Verträge zwischen
            </p>

            <div className="bg-gray-50 rounded-lg p-6">
              <p className="font-semibold mb-2">Sasa Lukic</p>
              <p>Hauptstraße 92</p>
              <p>12159 Berlin</p>
              <p className="mt-2">
                E-Mail: <a href="mailto:info@principai.de" className="text-[#2C5530] hover:underline">
                  info@principai.de
                </a>
              </p>
              <p className="text-sm text-gray-600 mt-3">(nachfolgend "Anbieter")</p>
            </div>

            <p>
              und dem Nutzer (nachfolgend "Kunde") über die Nutzung des
              ZuschussCheck-Services auf der Website principai.de.
            </p>

            <p>
              (2) Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn,
              der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
            </p>
          </div>
        </section>

        {/* § 2 Vertragsgegenstand & Leistungsbeschreibung */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            § 2 Vertragsgegenstand und Leistungsbeschreibung
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              (1) Der Anbieter stellt über die Website principai.de den Service
              "ZuschussCheck" zur Verfügung. Dieser umfasst:
            </p>

            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#2C5530] font-bold">•</span>
                  <span>
                    <span className="font-semibold">Upload:</span> Hochladen eines Business Plans
                    als PDF-Datei (max. 10 MB)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2C5530] font-bold">•</span>
                  <span>
                    <span className="font-semibold">Analyse:</span> Automatisierte Prüfung des
                    Business Plans auf Übereinstimmung mit den BA GZ 04 Förderkriterien der
                    Bundesagentur für Arbeit
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2C5530] font-bold">•</span>
                  <span>
                    <span className="font-semibold">Grant Calibration Score:</span> Bewertung
                    des Plans auf einer Skala von 0-100 mit Risk Level (CRITICAL/MEDIUM/LOW)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2C5530] font-bold">•</span>
                  <span>
                    <span className="font-semibold">Detaillierter Report:</span> 5-seitiges
                    PDF-Dokument mit:
                    <ul className="ml-6 mt-2 space-y-1 text-sm">
                      <li>- Top 3 kritische Fehler</li>
                      <li>- Konkrete Verbesserungsvorschläge</li>
                      <li>- Copy-Paste-fertige Formulierungen</li>
                      <li>- Benchmarks aus IHK/DEHOGA-Daten</li>
                    </ul>
                  </span>
                </li>
              </ul>
            </div>

            <p>
              (2) Der Service wird ausschließlich online über die Website principai.de
              bereitgestellt. Die Analyse erfolgt automatisiert mittels KI-gestützter
              Technologie (Claude API von Anthropic).
            </p>

            <p>
              (3) Die durchschnittliche Bearbeitungszeit beträgt ca. 2 Minuten. Der Report
              wird per E-Mail an die vom Kunden angegebene E-Mail-Adresse versandt.
            </p>
          </div>
        </section>

        {/* § 3 Vertragsschluss */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            § 3 Vertragsschluss
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              (1) Der Vertrag kommt durch folgende Schritte zustande:
            </p>

            <div className="bg-gray-50 rounded-lg p-6">
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-[#2C5530]">1.</span>
                  <span>
                    Der Kunde lädt seinen Business Plan als PDF-Datei hoch
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-[#2C5530]">2.</span>
                  <span>
                    Der Kunde erhält kostenlos eine Vorschau mit dem Grant Calibration Score
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-[#2C5530]">3.</span>
                  <span>
                    Der Kunde gibt seine E-Mail-Adresse ein und klickt auf "Jetzt für €39 kaufen"
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-[#2C5530]">4.</span>
                  <span>
                    Der Kunde wird zu PayPal weitergeleitet und schließt dort den Zahlungsvorgang ab
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-[#2C5530]">5.</span>
                  <span>
                    Nach erfolgreicher Zahlung wird der detaillierte Report per E-Mail versandt
                  </span>
                </li>
              </ol>
            </div>

            <p>
              (2) Mit Abschluss des Zahlungsvorgangs bei PayPal gibt der Kunde ein
              verbindliches Angebot zum Abschluss eines Vertrages ab. Der Vertrag kommt
              mit dem Versand des Reports per E-Mail zustande.
            </p>

            <p>
              (3) Der Vertragstext (diese AGB) wird nicht gespeichert. Der Kunde kann die
              AGB jederzeit auf der Website principai.de/agb einsehen und ausdrucken.
            </p>
          </div>
        </section>

        {/* § 4 Preise und Zahlung */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            § 4 Preise und Zahlung
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              (1) Alle angegebenen Preise sind Endpreise inklusive der gesetzlichen
              Mehrwertsteuer.
            </p>

            <div className="bg-[#E8F5E9] rounded-lg p-6">
              <p className="font-bold text-xl text-[#2C5530] mb-2">
                Aktueller Preis: €39,00 (einmalig)
              </p>
              <p className="text-sm">
                Dieser Preis gilt für eine einmalige Analyse eines Business Plans inkl.
                detailliertem 5-Seiten-Report.
              </p>
            </div>

            <p>
              (2) Die Zahlung erfolgt ausschließlich über PayPal. Der Kunde wird nach
              Eingabe seiner E-Mail-Adresse zu PayPal weitergeleitet.
            </p>

            <p>
              (3) Der Kunde kann mit folgenden Zahlungsmethoden über PayPal bezahlen:
            </p>
            <ul className="list-disc list-inside ml-6 space-y-1">
              <li>PayPal-Guthaben</li>
              <li>Kreditkarte (über PayPal)</li>
              <li>Lastschrift (über PayPal)</li>
              <li>Weitere von PayPal angebotene Zahlungsmethoden</li>
            </ul>

            <p>
              (4) Die Leistung wird erst nach vollständigem Zahlungseingang erbracht
              (Versand des detaillierten Reports).
            </p>
          </div>
        </section>

        {/* § 5 Widerrufsrecht */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            § 5 Widerrufsrecht
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              (1) Verbrauchern steht grundsätzlich ein Widerrufsrecht gemäß den
              gesetzlichen Bestimmungen zu.
            </p>

            <div className="bg-[#FFF8E1] border-l-4 border-[#D4AF37] rounded-lg p-6">
              <p className="font-semibold mb-3">Wichtiger Hinweis zum Widerrufsrecht:</p>
              <p className="mb-3">
                Das Widerrufsrecht erlischt bei Verträgen zur Lieferung von digitalen
                Inhalten, die nicht auf einem körperlichen Datenträger geliefert werden,
                wenn der Unternehmer mit der Ausführung des Vertrags begonnen hat, nachdem
                der Verbraucher
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  ausdrücklich zugestimmt hat, dass der Unternehmer mit der Ausführung
                  des Vertrags vor Ablauf der Widerrufsfrist beginnt, und
                </li>
                <li>
                  seine Kenntnis davon bestätigt hat, dass er durch seine Zustimmung mit
                  Beginn der Ausführung des Vertrags sein Widerrufsrecht verliert.
                </li>
              </ul>
            </div>

            <p>
              (2) Mit Klick auf "Jetzt für €39 kaufen" stimmt der Kunde ausdrücklich zu,
              dass der Anbieter mit der Ausführung des Vertrags (Versand des Reports)
              unmittelbar nach Zahlungseingang beginnt und bestätigt, dass er dadurch sein
              Widerrufsrecht verliert.
            </p>

            <p>
              (3) Die vollständige Widerrufsbelehrung finden Sie unter:{' '}
              <a href="/widerruf" className="text-[#2C5530] hover:underline font-semibold">
                principai.de/widerruf
              </a>
            </p>
          </div>
        </section>

        {/* § 6 Gewährleistung und Haftung */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            § 6 Gewährleistung und Haftung
          </h2>

          <div className="space-y-4 text-gray-700">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-[#2C5530] mb-3">
                6.1 20-Punkte-Verbesserungs-Garantie
              </h3>
              <p className="mb-3">
                Der Anbieter garantiert, dass sich der Grant Calibration Score nach
                Umsetzung der empfohlenen Fixes um mindestens 20 Punkte verbessert.
              </p>
              <p className="mb-3">
                <span className="font-semibold">Voraussetzungen:</span>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-sm mb-3">
                <li>Kunde setzt alle 3 empfohlenen Fixes um</li>
                <li>Kunde lädt den aktualisierten Plan innerhalb von 30 Tagen erneut hoch</li>
                <li>Score nach Fixes beträgt weniger als 45 Punkte</li>
              </ul>
              <p className="text-sm">
                Bei Nicht-Erfüllung: Volle Rückerstattung der €39 innerhalb von 14 Tagen.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Details:{' '}
                <a href="/garantie-bedingungen" className="text-[#2C5530] hover:underline">
                  principai.de/garantie-bedingungen
                </a>
              </p>
            </div>

            <div className="bg-[#FFF8E1] border-l-4 border-[#D4AF37] rounded-lg p-6">
              <h3 className="font-bold text-[#2D3436] mb-3">6.2 Haftungsausschluss</h3>

              <p className="mb-3">
                <span className="font-semibold">WICHTIG:</span> Der ZuschussCheck-Service
                stellt <span className="font-semibold">keine steuerliche, rechtliche oder
                  wirtschaftliche Beratung</span> dar.
              </p>

              <div className="space-y-3 text-sm">
                <p>
                  ❌ Wir analysieren Business Pläne ausschließlich auf formale
                  Übereinstimmung mit den BA GZ 04 Förderkriterien.
                </p>
                <p>
                  ❌ Wir geben keine Garantie oder Zusicherung über die tatsächliche
                  Bewilligung des Gründungszuschusses durch die Arbeitsagentur.
                </p>
                <p>
                  ❌ Die finale Bewilligungsentscheidung liegt ausschließlich bei der
                  zuständigen Arbeitsagentur.
                </p>
                <p>
                  ❌ Es besteht kein Rechtsanspruch auf den Gründungszuschuss
                  (Ermessensleistung gemäß §93 SGB III).
                </p>
              </div>
            </div>

            <p>
              (3) Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit,
              für die Verletzung von Leben, Körper und Gesundheit sowie nach den
              Vorschriften des Produkthaftungsgesetzes.
            </p>

            <p>
              (4) Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist
              die Haftung der Höhe nach auf den vertragstypischen, vorhersehbaren Schaden
              begrenzt. Im Übrigen ist die Haftung ausgeschlossen.
            </p>
          </div>
        </section>

        {/* § 7 Nutzungsrechte und Urheberrecht */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            § 7 Nutzungsrechte und Urheberrecht
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              (1) Alle Inhalte der Website principai.de (Texte, Grafiken, Logos, Bilder,
              Software) sowie der generierte Report sind urheberrechtlich geschützt.
            </p>

            <p>
              (2) Der Kunde erhält mit Kauf des Reports ein einfaches, nicht übertragbares
              Nutzungsrecht für den generierten Report. Der Report darf ausschließlich für
              die eigene Antragstellung beim Gründungszuschuss verwendet werden.
            </p>

            <p>
              (3) Der hochgeladene Business Plan bleibt Eigentum des Kunden. Der Anbieter
              nutzt den Plan ausschließlich zur Durchführung der Analyse und löscht ihn
              nach 7 Tagen automatisch (siehe Datenschutzerklärung).
            </p>

            <p>
              (4) Eine Weitergabe, Vervielfältigung oder gewerbliche Nutzung des Reports
              ist ohne ausdrückliche schriftliche Zustimmung des Anbieters untersagt.
            </p>
          </div>
        </section>

        {/* § 8 Datenschutz */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            § 8 Datenschutz
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              Die Verarbeitung personenbezogener Daten erfolgt gemäß den Bestimmungen der
              Datenschutz-Grundverordnung (DSGVO) und des Bundesdatenschutzgesetzes (BDSG).
            </p>

            <div className="bg-[#E8F5E9] rounded-lg p-6">
              <p className="font-semibold mb-2">Wichtige Datenschutz-Highlights:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Automatische Löschung der Business Pläne nach 7 Tagen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Keine Weitergabe an KI-Training-Daten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Server in Deutschland (DSGVO-konform)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>SSL/TLS-Verschlüsselung</span>
                </li>
              </ul>
              <p className="text-sm mt-4">
                Vollständige Informationen:{' '}
                <a href="/datenschutz" className="text-[#2C5530] hover:underline font-semibold">
                  principai.de/datenschutz
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* § 9 Schlussbestimmungen */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 border-b-2 border-[#2C5530] pb-2">
            § 9 Schlussbestimmungen
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
              UN-Kaufrechts.
            </p>

            <p>
              (2) Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder
              öffentlich-rechtliches Sondervermögen, ist ausschließlicher Gerichtsstand
              für alle Streitigkeiten aus Vertragsverhältnissen zwischen dem Kunden und
              dem Anbieter der Sitz des Anbieters.
            </p>

            <p>
              (3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden,
              bleibt die Wirksamkeit der übrigen Bestimmungen hiervon unberührt.
            </p>

            <p>
              (4) Änderungen und Ergänzungen dieser AGB bedürfen zu ihrer Wirksamkeit der
              Textform.
            </p>
          </div>
        </section>

        {/* Contact Box */}
        <div className="bg-gradient-to-r from-[#2C5530] to-[#1E3A21] text-white rounded-2xl p-8 text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Fragen zu den AGB?</h3>
          <p className="mb-6">
            Bei Fragen oder Unklarheiten kontaktieren Sie uns gerne:
          </p>
          <a
            href="mailto:info@principai.de"
            className="inline-block bg-white text-[#2C5530] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            📧 info@principai.de
          </a>
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
