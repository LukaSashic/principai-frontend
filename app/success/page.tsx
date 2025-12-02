'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Download, Mail, Home } from 'lucide-react';

export default function SuccessPage() {
  const router = useRouter();
  const [paymentInfo, setPaymentInfo] = useState<any>(null);

  useEffect(() => {
    const storedInfo = localStorage.getItem('paymentSuccess');
    if (!storedInfo) {
      router.push('/');
      return;
    }
    setPaymentInfo(JSON.parse(storedInfo));
  }, [router]);

  const handleDownload = () => {
    if (paymentInfo?.downloadUrl) {
      window.location.href = `http://localhost:8000${paymentInfo.downloadUrl}`;
    }
  };

  if (!paymentInfo) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-6">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
            Zahlung erfolgreich! 🎉
          </h1>

          <p className="text-lg text-gray-600 text-center mb-8">
            Dein Report wurde erfolgreich generiert und ist jetzt verfügbar.
          </p>

          {/* Info Boxes */}
          <div className="space-y-4 mb-8">
            
            {/* Email Sent */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-4">
              <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-blue-900 mb-1">
                  Report per Email versendet
                </div>
                <div className="text-blue-700 text-sm">
                  Wir haben deinen vollständigen 5-Seiten Report an <strong>{paymentInfo.customerEmail}</strong> gesendet. 
                  Check auch deinen Spam-Ordner!
                </div>
              </div>
            </div>

            {/* Download Available */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-4">
              <Download className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-green-900 mb-1">
                  Sofort-Download verfügbar
                </div>
                <div className="text-green-700 text-sm">
                  Du kannst deinen Report auch direkt hier herunterladen. Der Link bleibt 7 Tage aktiv.
                </div>
              </div>
            </div>

            {/* Transaction ID */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-1">Transaktions-ID:</div>
              <div className="font-mono text-sm text-gray-900">{paymentInfo.orderId}</div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-8 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-3 text-lg shadow-lg"
            >
              <Download className="w-6 h-6" />
              Report herunterladen (PDF)
            </button>

            {/* Home Button */}
            <button
              onClick={() => router.push('/')}
              className="w-full bg-gray-100 text-gray-700 font-semibold py-4 px-8 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-3"
            >
              <Home className="w-5 h-5" />
              Zurück zur Startseite
            </button>

          </div>

          {/* What's Included */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">📄 Was ist im Report enthalten:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Executive Summary</strong> - Grant Calibration Score & Risiko-Bewertung</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Top 3 Critical Issues</strong> - Detaillierte Problembeschreibungen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>IHK-Benchmarks</strong> - Branchenspezifische Vergleichszahlen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Step-by-Step Fixes</strong> - Konkrete Lösungen für jedes Problem</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Next Steps</strong> - Dein Weg zur Gründungszuschuss-Genehmigung</span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Fragen oder Probleme?
            </p>
            <a
              href="mailto:support@principal.de"
              className="text-amber-600 font-semibold hover:text-amber-700"
            >
              support@principal.de
            </a>
          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>🔒 Deine Daten sind sicher und werden nach 7 Tagen automatisch gelöscht</p>
        </div>

      </div>
    </div>
  );
}
