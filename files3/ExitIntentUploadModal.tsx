'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, FileText, X, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function ExitIntentUploadModal() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState<string[]>([]);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Exit intent: Mouse leaves top of page (desktop only)
      if (e.clientY <= 0 && !hasShown && window.innerWidth >= 768) {
        setShowModal(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Bitte nur PDF oder DOCX Dateien hochladen');
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('Datei zu groß (max. 5MB)');
        return;
      }

      setFile(selectedFile);
      setError('');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(droppedFile.type)) {
        setError('Bitte nur PDF oder DOCX Dateien hochladen');
        return;
      }

      if (droppedFile.size > 5 * 1024 * 1024) {
        setError('Datei zu groß (max. 5MB)');
        return;
      }

      setFile(droppedFile);
      setError('');
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    try {
      setAnalyzing(true);
      setError('');
      setProgress(['Dokument wird verarbeitet ✓']);

      const formData = new FormData();
      formData.append('file', file);

      setTimeout(() => setProgress(prev => [...prev, 'BA GZ 04 Kriterien werden geprüft ✓']), 5000);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await axios.post(`${apiUrl}/api/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      localStorage.setItem('analysisResult', JSON.stringify(response.data));
      await new Promise(resolve => setTimeout(resolve, 100));
      router.push('/results');

    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.response?.data?.detail || 'Analyse fehlgeschlagen. Bitte versuche es erneut.');
      setAnalyzing(false);
      setProgress([]);
    }
  };

  if (!showModal) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={() => !analyzing && setShowModal(false)}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        {!analyzing && (
          <button 
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl leading-none z-10"
            aria-label="Schließen"
          >
            ×
          </button>
        )}

        {/* Content */}
        {!analyzing ? (
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-3xl font-bold text-[#2D3436] mb-4">
                Warte!
              </h2>
              <p className="text-xl text-gray-700 mb-2">
                Lade deinen Business Plan <span className="font-bold text-[#2C5530]">kostenlos</span> hoch
              </p>
              <p className="text-gray-600">
                Finde die 3 kritischen Fehler bevor die Arbeitsagentur sie findet
              </p>
            </div>

            {/* Upload Area */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors mb-4 ${
                file ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-amber-400 hover:bg-amber-50'
              }`}
            >
              {file ? (
                <div className="flex flex-col items-center gap-3">
                  <FileText className="w-12 h-12 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-600">{(file.size / 1024).toFixed(0)} KB</p>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="text-sm text-gray-600 hover:text-gray-900 underline"
                  >
                    Andere Datei wählen
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Upload className="w-12 h-12 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-700 mb-2">
                      Datei hier ablegen oder klicken
                    </p>
                    <label className="cursor-pointer">
                      <span className="inline-block bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors font-semibold">
                        Datei auswählen
                      </span>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.docx"
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">PDF oder DOCX (max. 5MB)</p>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Analyze Button */}
            {file && (
              <button
                onClick={handleAnalyze}
                className="w-full bg-gradient-to-r from-[#2C5530] to-[#1E3A21] text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                Kostenlos analysieren
              </button>
            )}

            {/* Alternative Link */}
            {!file && (
              <div className="text-center mt-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    router.push('/upload');
                  }}
                  className="text-sm text-gray-600 hover:text-[#2C5530] hover:underline"
                >
                  Oder zur Upload-Seite →
                </button>
              </div>
            )}

            {/* Trust Info */}
            <div className="bg-[#E8F5E9] rounded-xl p-4 mt-4">
              <p className="text-sm text-gray-700 text-center">
                <span className="font-bold">Nur 11%</span> der Anträge werden bewilligt.
                <br />
                <span className="text-xs text-gray-600">
                  ✓ Verschlüsselt • ✓ Automatische Löschung • ✓ DSGVO-konform
                </span>
              </p>
            </div>
          </div>
        ) : (
          /* Analyzing State */
          <div className="p-8 py-16">
            <div className="flex flex-col items-center gap-6">
              <Loader2 className="w-16 h-16 text-amber-500 animate-spin" />
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Dein Business Plan wird analysiert...
                </h3>
                <p className="text-gray-600">Prüfung auf BA GZ 04 Förderkriterien</p>
              </div>

              {/* Progress Steps */}
              <div className="w-full max-w-md space-y-2">
                {progress.map((step, index) => (
                  <div key={index} className="flex items-center gap-3 text-green-600">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
