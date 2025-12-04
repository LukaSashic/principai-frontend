'use client';

import { useState, useEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

// ============================================
// REVIEW MODE CONFIGURATION
// ============================================
const REVIEW_SECRET = 'JUERGEN2024';

interface AnalysisResult {
  analysis_id?: string;
  session_id?: string;
  score: number;
  potential_score: number;
  risk_level: string;
  business_name: string;
  detected_industry: string;
  positive_aspects: string[];
  personalized_summary?: string;
  top_issues: {
    title: string;
    severity: string;
    time_minutes: number;
    impact_points: number;
  }[];
  criteria_fulfilled_count: number;
  criteria_total_count: number;
  total_fixes_count: number;
}

interface PageProps {
  params: Promise<{ sessionId: string }>;
}

export default function ResultsPage({ params }: PageProps) {
  const { sessionId } = use(params);
  const searchParams = useSearchParams();
  const reviewCode = searchParams.get('review');
  const isReviewMode = reviewCode === REVIEW_SECRET;
  
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);  // Separate error for download
  const [pageError, setPageError] = useState<string | null>(null);  // Error that shows error page

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    if (sessionId && sessionId !== 'undefined') {
      loadAnalysis();
    } else {
      setPageError('Keine Session-ID gefunden');
      setLoading(false);
    }
  }, [sessionId]);

  const loadAnalysis = async () => {
    try {
      // First try to load from localStorage (faster, works offline)
      const storedResult = localStorage.getItem('analysisResult');
      const storedId = localStorage.getItem('lastAnalysisId');
      
      if (storedResult && storedId === sessionId) {
        console.log('Loading from localStorage');
        const data = JSON.parse(storedResult);
        setAnalysis(data);
        setLoading(false);
        return;
      }

      // If not in localStorage, try API
      console.log('Trying API...');
      const response = await fetch(`${API_URL}/api/analysis/${sessionId}`);
      
      if (response.ok) {
        const data = await response.json();
        setAnalysis(data);
      } else if (storedResult) {
        // API failed but we have localStorage data (maybe different ID)
        console.log('API failed, using localStorage anyway');
        const data = JSON.parse(storedResult);
        setAnalysis(data);
      } else {
        throw new Error('Analyse nicht gefunden');
      }
    } catch (err) {
      // Final fallback: try localStorage even if ID doesn't match
      const storedResult = localStorage.getItem('analysisResult');
      if (storedResult) {
        console.log('Using localStorage as final fallback');
        const data = JSON.parse(storedResult);
        setAnalysis(data);
      } else {
        setPageError('Analyse konnte nicht geladen werden');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    setDownloading(true);
    setDownloadError(null);
    
    try {
      // Get the analysis data from localStorage
      const storedResult = localStorage.getItem('analysisResult');
      if (!storedResult) {
        throw new Error('Keine Analysedaten gefunden');
      }

      // Send the full analysis data to generate PDF
      const response = await fetch(`${API_URL}/api/report/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: storedResult,
      });
      
      if (!response.ok) {
        // Try alternative endpoint
        const altResponse = await fetch(`${API_URL}/api/report/${sessionId}/download`);
        if (!altResponse.ok) {
          throw new Error('PDF-Generierung fehlgeschlagen');
        }
        const blob = await altResponse.blob();
        downloadBlob(blob);
        return;
      }
      
      const blob = await response.blob();
      downloadBlob(blob);
      
    } catch (err: any) {
      console.error('Download error:', err);
      setDownloadError(err.message || 'Download fehlgeschlagen. Backend-Endpoint nicht verfügbar.');
    } finally {
      setDownloading(false);
    }
  };

  const downloadBlob = (blob: Blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ZuschussCheck_Report_${analysis?.business_name || sessionId}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const getRiskColor = (risk: string) => {
    const colors: Record<string, string> = {
      'NIEDRIG': 'bg-emerald-500',
      'MITTEL': 'bg-amber-500',
      'HOCH': 'bg-orange-500',
      'KRITISCH': 'bg-red-500',
    };
    return colors[risk?.toUpperCase()] || 'bg-amber-500';
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      'KRITISCH': 'bg-red-500 text-white',
      'HOCH': 'bg-orange-500 text-white',
      'MITTEL': 'bg-blue-500 text-white',
    };
    return colors[severity?.toUpperCase()] || 'bg-gray-500 text-white';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Analyse wird geladen...</p>
        </div>
      </div>
    );
  }

  if (pageError || !analysis) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Fehler</h1>
          <p className="text-gray-600 mb-4">{pageError || 'Analyse nicht gefunden'}</p>
          <p className="text-sm text-gray-400 mb-4">ID: {sessionId || 'keine'}</p>
          <a href="/upload" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Neue Analyse starten
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Review Mode Banner */}
      {isReviewMode && (
        <div className="bg-purple-600 text-white py-2 px-4 text-center text-sm">
          🧪 <strong>Review-Modus aktiv</strong> - Report kann ohne Bezahlung heruntergeladen werden
        </div>
      )}
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Dein Analyse-Ergebnis
          </h1>
          <p className="text-slate-600">
            {analysis.business_name} | {analysis.detected_industry}
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-slate-800">{analysis.score}</div>
              <div className="text-slate-500 text-sm">/100 Punkte</div>
            </div>
            <div className="text-4xl text-slate-300">→</div>
            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-500">{analysis.potential_score}+</div>
              <div className="text-slate-500 text-sm">nach Optimierung</div>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <span className={`${getRiskColor(analysis.risk_level)} text-white px-6 py-2 rounded-full font-semibold`}>
              {analysis.risk_level?.toUpperCase()} RISIKO
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-slate-800">{analysis.total_fixes_count || 0}</div>
              <div className="text-sm text-slate-500">Kopiervorlagen</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-500">+{(analysis.potential_score || 0) - (analysis.score || 0)}</div>
              <div className="text-sm text-slate-500">Punkte möglich</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-slate-800">{analysis.criteria_fulfilled_count || 0}/{analysis.criteria_total_count || 27}</div>
              <div className="text-sm text-slate-500">Kriterien erfüllt</div>
            </div>
          </div>
        </motion.div>

        {/* Positive Aspects */}
        {analysis.positive_aspects?.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-6"
          >
            <h3 className="font-semibold text-emerald-800 mb-3">✓ Was bereits gut ist</h3>
            <ul className="space-y-2">
              {analysis.positive_aspects.slice(0, 5).map((aspect, idx) => (
                <li key={idx} className="flex items-start gap-2 text-emerald-700">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span className="text-sm">{aspect}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Personalized Summary */}
        {analysis.personalized_summary && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6"
          >
            <h3 className="font-semibold text-blue-800 mb-3">📋 Zusammenfassung</h3>
            <p className="text-blue-700 text-sm leading-relaxed">{analysis.personalized_summary}</p>
          </motion.div>
        )}

        {/* Top 3 Issues */}
        {analysis.top_issues?.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6"
          >
            <h3 className="font-semibold text-slate-800 mb-4">Die 3 wichtigsten Kritikpunkte</h3>
            <div className="space-y-3">
              {analysis.top_issues.slice(0, 3).map((issue, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <span className={`${getSeverityColor(issue.severity)} px-2 py-1 rounded text-xs font-medium`}>
                    {issue.severity}
                  </span>
                  <span className="flex-1 text-slate-700 text-sm">{issue.title}</span>
                  <span className="text-xs text-slate-400">⏱ {issue.time_minutes}min</span>
                  <span className="text-xs text-emerald-500 font-medium">+{issue.impact_points} Pkt</span>
                </div>
              ))}
            </div>

            {!isReviewMode && (
              <div className="mt-4 p-4 bg-slate-100 rounded-lg text-center">
                <p className="text-slate-600 text-sm">
                  🔒 Detaillierte Lösungen und Kopiervorlagen im vollständigen Report
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center"
        >
          {isReviewMode ? (
            <>
              <div className="inline-block bg-purple-500 text-white text-xs px-3 py-1 rounded-full mb-4">
                🧪 Review-Modus
              </div>
              <h3 className="text-2xl font-bold mb-2">Report herunterladen</h3>
              <p className="text-blue-100 mb-6">Kostenloser Download für Review-Zwecke</p>
              
              {/* Download Error Toast */}
              {downloadError && (
                <div className="bg-red-500 text-white px-4 py-3 rounded-lg mb-4 text-sm">
                  ⚠️ {downloadError}
                </div>
              )}
              
              <button
                onClick={handleDownloadReport}
                disabled={downloading}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
              >
                {downloading ? 'Wird erstellt...' : '📥 Report herunterladen (PDF)'}
              </button>
              
              <p className="text-blue-200 text-xs mt-4">
                Backend-Endpoint: /api/report/generate
              </p>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold mb-2">Vollständiger Report</h3>
              <p className="text-blue-100 mb-4">
                {analysis.total_fixes_count || 0} Copy-Paste Vorlagen • 27-Kriterien-Checkliste
              </p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-3xl font-bold">€39</span>
                <span className="text-blue-200 line-through">€79</span>
                <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded">-50%</span>
              </div>
              <button className="w-full max-w-md bg-yellow-400 text-slate-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-300 transition-colors">
                💳 Jetzt kaufen mit PayPal
              </button>
              <p className="text-blue-200 text-xs mt-4">
                Sofortiger Download • 14 Tage Geld-zurück-Garantie
              </p>
            </>
          )}
        </motion.div>

        <div className="text-center mt-8 text-slate-400 text-sm">
          <p>ZuschussCheck by PrincipalAI | www.principal.de</p>
        </div>
      </div>
    </div>
  );
}