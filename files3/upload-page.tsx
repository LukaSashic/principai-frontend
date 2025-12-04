'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, FileText, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Bitte nur PDF oder DOCX Dateien hochladen');
        return;
      }

      // Validate file size (5MB)
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    if (!file) return;

    try {
      setAnalyzing(true);
      setError('');
      setProgress(['Dokument wird verarbeitet ✓']);

      const formData = new FormData();
      formData.append('file', file);

      setTimeout(() => setProgress(prev => [...prev, 'BA GZ 04 Kriterien werden geprüft ✓']), 5000);

      const response = await axios.post(`${apiUrl}/api/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Store result in localStorage
      console.log('Analysis result:', response.data);
      localStorage.setItem('analysisResult', JSON.stringify(response.data));

      // Small delay to ensure localStorage is written
      await new Promise(resolve => setTimeout(resolve, 100));

      // Redirect to results
      router.push('/results');

    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.response?.data?.detail || 'Analyse fehlgeschlagen. Bitte versuche es erneut.');
      setAnalyzing(false);
      setProgress([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Business Plan hochladen</h1>
          <p className="text-gray-600">PDF oder DOCX Datei (max. 5MB)</p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          {!analyzing ? (
            <>
              {/* Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                  file ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                }`}
              >
                {file ? (
                  <div className="flex flex-col items-center gap-4">
                    <FileText className="w-16 h-16 text-green-600" />
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
                  <div className="flex flex-col items-center gap-4">
                    <Upload className="w-16 h-16 text-gray-400" />
                    <div>
                      <p className="text-lg font-semibold text-gray-700 mb-2">
                        Datei hier ablegen oder klicken zum Auswählen
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
                    </div>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Analyze Button */}
              {file && (
                <button
                  onClick={handleAnalyze}
                  className="w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-8 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
                >
                  Jetzt analysieren
                </button>
              )}
            </>
          ) : (
            /* Analyzing State */
            <div className="py-12">
              <div className="flex flex-col items-center gap-6">
                <Loader2 className="w-16 h-16 text-amber-500 animate-spin" />
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
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

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Hinweis:</strong> Deine Datei wird verschlüsselt übertragen und nach der Analyse automatisch gelöscht.
          </p>
        </div>
      </div>
    </div>
  );
}
