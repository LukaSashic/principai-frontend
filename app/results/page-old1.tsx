'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, CheckCircle, TrendingUp, ArrowRight, Download, X, Loader2 } from 'lucide-react';
import PayPalButton from '../components/PayPalButton';
import axios from 'axios';

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedResult = localStorage.getItem('analysisResult');
    if (!storedResult) {
      router.push('/upload');
      return;
    }
    setResult(JSON.parse(storedResult));
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  const getRiskColor = (level: string) => {
    const colors = {
      LOW: 'text-green-600 bg-green-50 border-green-200',
      MEDIUM: 'text-amber-600 bg-amber-50 border-amber-200',
      HIGH: 'text-orange-600 bg-orange-50 border-orange-200',
      CRITICAL: 'text-red-600 bg-red-50 border-red-200'
    };
    return colors[level as keyof typeof colors] || colors.MEDIUM;
  };

  const getSeverityIcon = (severity: string) => {
    if (severity === 'CRITICAL') return <AlertTriangle className="w-5 h-5 text-red-500" />;
    if (severity === 'HIGH') return <AlertTriangle className="w-5 h-5 text-orange-500" />;
    return <TrendingUp className="w-5 h-5 text-amber-500" />;
  };

  const handlePaymentSuccess = async (orderId: string) => {
    try {
      setProcessing(true);
      setError('');

      // Capture payment and generate report
      const response = await axios.post('http://localhost:8000/api/capture-payment', {
        order_id: orderId,
        analysis_id: result.analysis_id,
        customer_email: customerEmail,
        customer_name: customerName
      });

      // Store success info
      localStorage.setItem('paymentSuccess', JSON.stringify({
        orderId: orderId,
        downloadUrl: response.data.download_url,
        customerEmail: customerEmail
      }));

      // Redirect to success page
      router.push('/success');

    } catch (err: any) {
      setError(err.response?.data?.detail || 'Payment processing failed');
      setProcessing(false);
    }
  };

  const handlePaymentError = (errorMsg: string) => {
    setError(errorMsg);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analyse-Ergebnis</h1>
          <p className="text-gray-600">Branche: {result.detected_industry || 'Nicht erkannt'}</p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Grant Calibration Score</h2>
              <p className="text-gray-600">Wahrscheinlichkeit der Genehmigung</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-amber-500">{result.score}</div>
              <div className="text-gray-500">/100</div>
            </div>
          </div>

          <div className="mt-6">
            <span className={`inline-block px-4 py-2 rounded-lg font-semibold border ${getRiskColor(result.risk_level)}`}>
              {result.risk_level === 'LOW' && '✓ NIEDRIGES RISIKO'}
              {result.risk_level === 'MEDIUM' && '⚠ MITTLERES RISIKO'}
              {result.risk_level === 'HIGH' && '⚠ HOHES RISIKO'}
              {result.risk_level === 'CRITICAL' && '⊗ KRITISCHES RISIKO'}
            </span>
          </div>

          {/* Revenue Comparison */}
          {result.estimated_revenue && result.benchmark_revenue && (
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-4">Umsatz-Vergleich:</h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Dein Plan</div>
                  <div className="text-xl font-bold text-gray-900">{result.estimated_revenue}</div>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400" />
                <div className="text-right">
                  <div className="text-sm text-gray-600">IHK-Benchmark</div>
                  <div className="text-xl font-bold text-green-600">{result.benchmark_revenue}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Top 3 Issues */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top 3 Critical Issues</h2>

          <div className="space-y-6">
            {(result.issues || []).slice(0, 3).map((issue: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  {getSeverityIcon(issue.severity)}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {index + 1}. {issue.title}
                    </h3>
                    <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold mb-3 ${getRiskColor(issue.severity)}`}>
                      {issue.severity}
                    </span>
                    <p className="text-gray-700 mb-4">{issue.description}</p>

                    {/* Fix Box */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-green-900 mb-2">So korrigierst du es:</div>
                          <p className="text-green-800 text-sm">{issue.fix}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download CTA */}
        <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center gap-4 mb-6">
            <Download className="w-12 h-12" />
            <div>
              <h2 className="text-2xl font-bold">5-seitiger Detailreport</h2>
              <p className="opacity-90">Erhalte den vollständigen Report mit allen Issues, Benchmarks und Copy-Paste Ready Fixes</p>
            </div>
          </div>

          <button
            onClick={() => setShowPaymentModal(true)}
            className="w-full bg-white text-amber-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3 text-lg"
          >
            <Download className="w-6 h-6" />
            Report kaufen (€39)
          </button>

          <div className="mt-4 text-center text-sm opacity-90">
            💳 Sichere Zahlung mit Stripe • 100% Geld-zurück-Garantie
          </div>
        </div>

      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Report kaufen</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
                disabled={processing}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {!processing ? (
                <>
                  {/* Customer Info Form */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Dein Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Max Mustermann"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 bg-white"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      E-Mail für Report-Versand
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="max@beispiel.de"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                      required
                    />
                  </div>

                  {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  {/* PayPal Button */}
                  {customerEmail && customerName ? (
                    <PayPalButton
                      analysisId={result.analysis_id}
                      amount={39.00}
                      currency="EUR"
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  ) : (
                    <div className="p-8 bg-gray-50 rounded-lg text-center text-gray-600">
                      Bitte fülle Name und E-Mail aus
                    </div>
                  )}
                </>
              ) : (
                <div className="py-12 text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-amber-500 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-900">Zahlung wird verarbeitet...</p>
                  <p className="text-gray-600 mt-2">Report wird generiert und per Email versendet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
