export default function Impressum() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#2C5530] mb-4">Impressum</h1>
          <p className="text-gray-600">Angaben gemäß § 5 TMG</p>
        </div>

        {/* Company Info */}
        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-6">Anbieter</h2>

          <div className="space-y-4 text-gray-700">
            <div>
              <p className="font-semibold text-[#2C5530] mb-1">Firmenname:</p>
              <p>Sasa Lukic</p>
              <p className="text-sm text-gray-500 mt-1">
                (z.B. "PrincipalAI GmbH" oder "Max Mustermann")
              </p>
            </div>

            <div>
              <p className="font-semibold text-[#2C5530] mb-1">Anschrift:</p>
              <p>Hauptstraße 92</p>
              <p>12159 Berlin</p>
              <p>Deutschland</p>
            </div>

            <div>
              <p className="font-semibold text-[#2C5530] mb-1">Vertreten durch:</p>
              <p>Sasa Lukic</p>
              <p className="text-sm text-gray-500 mt-1">
                (Geschäftsführer / Inhaber)
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-6">Kontakt</h2>

          <div className="space-y-3 text-gray-700">
            <div className="flex items-center gap-3">
              <span className="text-[#2C5530] font-semibold w-24">E-Mail:</span>
              <a href="mailto:info@principai.de" className="hover:text-[#2C5530] hover:underline">
                info@principai.de
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#2C5530] font-semibold w-24">Telefon:</span>
              <p>+49 175 279 88 17</p>
              <p className="text-sm text-gray-500 ml-2">
                (z.B. "+49 30 12345678")
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#2C5530] font-semibold w-24">Website:</span>
              <a href="https://principai.de" className="hover:text-[#2C5530] hover:underline">
                principai.de
              </a>
            </div>
          </div>
        </div>


        {/* Content Responsibility */}
        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-6">
            Verantwortlich für den Inhalt
          </h2>

          <div className="text-gray-700">
            <p className="mb-2">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
            </p>
            <p className="font-semibold">Sasa Lukic</p>
            <p>Hauptstraße 92</p>
            <p>12159 Berlin</p>
          </div>
        </div>

        {/* Dispute Resolution */}
        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-6">
            EU-Streitschlichtung
          </h2>

          <div className="text-gray-700 space-y-4">
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            </p>
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2C5530] hover:underline block"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            <p className="text-sm text-gray-600">
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </div>
        </div>

        {/* Consumer Dispute Resolution */}
        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-6">
            Verbraucherstreitbeilegung / Universalschlichtungsstelle
          </h2>

          <div className="text-gray-700">
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
              vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-[#FFF8E1] border-l-4 border-[#D4AF37] rounded-lg p-6">
          <h3 className="text-lg font-bold text-[#2D3436] mb-3">
            Haftungsausschluss
          </h3>

          <div className="text-sm text-gray-700 space-y-3">
            <div>
              <p className="font-semibold mb-1">Haftung für Inhalte</p>
              <p>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind
                wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach
                den allgemeinen Gesetzen verantwortlich.
              </p>
            </div>

            <div>
              <p className="font-semibold mb-1">Haftung für Links</p>
              <p>
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
                Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
                Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
                Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
                verantwortlich.
              </p>
            </div>

            <div>
              <p className="font-semibold mb-1">Urheberrecht</p>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
                Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
                Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
                jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </div>
        </div>

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
