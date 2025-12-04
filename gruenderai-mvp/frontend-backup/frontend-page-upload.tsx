'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, AlertCircle, Loader2, CheckCircle2, Sparkles } from 'lucide-react';

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): string | null => {
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!validTypes.includes(file.type)) {
      return 'Nur PDF und DOCX Dateien erlaubt';
    }

    if (file.size > 5 * 1024 * 1024) {
      return 'Datei zu groß. Maximum 5MB';
    }

    return null;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const error = validateFile(droppedFile);
      
      if (error) {
        setError(error);
      } else {
        setFile(droppedFile);
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const error = validateFile(selectedFile);
      
      if (error) {
        setError(error);
      } else {
        setFile(selectedFile);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);
    setProgress(0);

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Analyse fehlgeschlagen');
      }

      const result = await response.json();
      
      localStorage.setItem('analysis_result', JSON.stringify(result));
      
      // Small delay to show completion
      setTimeout(() => {
        router.push('/results');
      }, 500);

    } catch (err) {
      clearInterval(progressInterval);
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
      setProgress(0);
    } finally {
      setTimeout(() => {
        setUploading(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        
        {/* Header - Animated entrance */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Business Plan hochladen
          </h1>
          <p className="text-lg text-slate-600">
            PDF oder DOCX Datei (max. 5MB)
          </p>
        </motion.div>

        {/* Upload Zone - Enhanced animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
            dragActive
              ? 'border-amber-500 bg-amber-50 scale-105'
              : 'border-slate-300 bg-white hover:border-slate-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <AnimatePresence mode="wait">
            {file ? (
              <motion.div
                key="file-selected"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, -5, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                >
                  <FileText className="h-16 w-16 text-amber-600 mx-auto" />
                </motion.div>
                <p className="text-lg font-semibold text-slate-900">
                  {file.name}
                </p>
                <p className="text-sm text-slate-500">
                  {(file.size / 1024).toFixed(0)} KB
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFile(null)}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Andere Datei wählen
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="no-file"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Upload className="h-16 w-16 text-slate-400 mx-auto" />
                </motion.div>
                <p className="text-lg text-slate-600">
                  Datei hier ablegen oder klicken zum Auswählen
                </p>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.docx"
                  className="hidden"
                  id="file-upload"
                />
                <motion.label
                  htmlFor="file-upload"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgb(226, 232, 240)' }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-6 py-3 bg-slate-100 text-slate-700 rounded-lg cursor-pointer transition-colors"
                >
                  Datei auswählen
                </motion.label>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Error Message - Animated */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center"
            >
              <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Button - Enhanced */}
        <AnimatePresence>
          {file && !uploading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8"
            >
              <motion.button
                onClick={handleUpload}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 20px 25px -5px rgba(245, 158, 11, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-lg transition-colors"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Plan analysieren (€39)
              </motion.button>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-slate-500 text-center mt-4"
              >
                💳 Zahlung erfolgt nach der Analyse
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State - Gradient Animation + Progressive Status */}
        <AnimatePresence>
          {uploading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-8"
            >
              {/* Animated gradient background */}
              <motion.div
                animate={{
                  background: [
                    'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
                    'linear-gradient(90deg, #d97706 0%, #b45309 100%)',
                    'linear-gradient(90deg, #b45309 0%, #f59e0b 100%)',
                  ],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Loader2 className="h-8 w-8 text-white flex-shrink-0" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-bold text-white text-lg mb-3"
                    >
                      Claude analysiert deinen Plan...
                    </motion.p>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-amber-700 rounded-full h-2 mb-4 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-white rounded-full"
                      />
                    </div>

                    {/* Progressive status messages */}
                    <div className="space-y-2">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-300" />
                        <p className="text-sm text-amber-50">
                          Text extrahiert ✓
                        </p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: progress >= 30 ? 1 : 0.3, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center space-x-2"
                      >
                        {progress >= 30 ? (
                          <CheckCircle2 className="h-4 w-4 text-green-300" />
                        ) : (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Loader2 className="h-4 w-4 text-amber-100" />
                          </motion.div>
                        )}
                        <p className="text-sm text-amber-50">
                          {progress >= 30 ? 'KI-Analyse abgeschlossen ✓' : 'KI-Analyse läuft...'}
                        </p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: progress >= 60 ? 1 : 0.3, x: 0 }}
                        transition={{ delay: 0.9 }}
                        className="flex items-center space-x-2"
                      >
                        {progress >= 90 ? (
                          <CheckCircle2 className="h-4 w-4 text-green-300" />
                        ) : (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Loader2 className="h-4 w-4 text-amber-100" />
                          </motion.div>
                        )}
                        <p className="text-sm text-amber-50">
                          {progress >= 90 ? 'Report generiert ✓' : 'Report wird generiert...'}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
