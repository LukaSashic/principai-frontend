'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle, ArrowRight, TrendingDown, TrendingUp, Download, Sparkles } from 'lucide-react';

interface Issue {
  title: string;
  description: string;
  severity: string;
  fix: string;
}

interface AnalysisResult {
  score: number;
  risk_level: string;
  detected_industry?: string;
  estimated_revenue?: string;
  benchmark_revenue?: string;
  top_issues: Issue[];
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

export default function ResultsPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('analysis_result');
    if (stored) {
      const data = JSON.parse(stored);
      setResult(data);
      
      // Animate score counter
      let start = 0;
      const end = data.score;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayScore(end);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-amber-600"
        >
          <Sparkles className="h-12 w-12" />
        </motion.div>
      </div>
    );
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'text-green-600 bg-green-50 border-green-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'HIGH': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'CRITICAL': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    if (score >= 30) return 'text-orange-600';
    return 'text-red-600';
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return <XCircle className="h-6 w-6 text-red-600" />;
      case 'HIGH': return <AlertTriangle className="h-6 w-6 text-orange-600" />;
      case 'MEDIUM': return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
      default: return <CheckCircle className="h-6 w-6 text-green-600" />;
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-100 text-red-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        
        {/* Header - Animated entrance */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Analyse-Ergebnis
          </h1>
          {result.detected_industry && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600"
            >
              Branche: {result.detected_industry}
            </motion.p>
          )}
        </motion.div>

        {/* Score Card - Animated counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Grant Calibration Score
              </h2>
              <p className="text-slate-600">
                Wahrscheinlichkeit der Genehmigung
              </p>
            </div>
            
            {/* Animated Score Circle */}
            <div className="relative">
              <svg className="transform -rotate-90" width="120" height="120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#e2e8f0"
                  strokeWidth="10"
                  fill="none"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke={result.score >= 70 ? '#10b981' : result.score >= 50 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: displayScore / 100 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  strokeDasharray={2 * Math.PI * 50}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.span
                    className={`text-4xl font-bold ${getScoreColor(result.score)}`}
                  >
                    {displayScore}
                  </motion.span>
                  <span className="text-xl text-slate-500">/100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Level Badge - Animated entrance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <div className={`inline-flex items-center px-4 py-2 rounded-lg border font-semibold ${getRiskColor(result.risk_level)}`}>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="mr-2"
              >
                {result.risk_level === 'LOW' && '✓'}
                {result.risk_level === 'MEDIUM' && '⚠'}
                {result.risk_level === 'HIGH' && '⚠️'}
                {result.risk_level === 'CRITICAL' && '🚨'}
              </motion.div>
              {result.risk_level === 'LOW' && 'NIEDRIGES RISIKO'}
              {result.risk_level === 'MEDIUM' && 'MITTLERES RISIKO'}
              {result.risk_level === 'HIGH' && 'HOHES RISIKO'}
              {result.risk_level === 'CRITICAL' && 'KRITISCHES RISIKO'}
            </div>
          </motion.div>

          {/* Revenue Comparison - Animated slide in */}
          {result.estimated_revenue && result.benchmark_revenue && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="p-4 bg-slate-50 rounded-lg"
            >
              <p className="text-sm font-semibold text-slate-700 mb-3">
                Umsatz-Vergleich:
              </p>
              <div className="flex items-center justify-between">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex-1"
                >
                  <div className="flex items-center mb-1">
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    <p className="text-xs text-slate-500">Dein Plan</p>
                  </div>
                  <p className="text-lg font-semibold text-slate-900">
                    {result.estimated_revenue}
                  </p>
                </motion.div>
                
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5 text-slate-400 mx-4" />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 text-right"
                >
                  <div className="flex items-center justify-end mb-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <p className="text-xs text-slate-500">IHK-Benchmark</p>
                  </div>
                  <p className="text-lg font-semibold text-green-600">
                    {result.benchmark_revenue}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Issues Section - Staggered animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.h2
            variants={cardVariants}
            className="text-2xl font-bold text-slate-900"
          >
            Top 3 Critical Issues
          </motion.h2>

          {result.top_issues.map((issue, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.01, y: -2 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500"
            >
              <div className="flex items-start mb-4">
                <motion.div
                  animate={{ 
                    rotate: [0, -10, 10, -10, 0],
                  }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1
                  }}
                >
                  {getSeverityIcon(issue.severity)}
                </motion.div>
                
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900">
                      {index + 1}. {issue.title}
                    </h3>
                  </div>
                  
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`inline-block px-3 py-1 rounded text-xs font-semibold ${getSeverityBadgeColor(issue.severity)}`}
                  >
                    {issue.severity}
                  </motion.span>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-slate-700 mb-4 leading-relaxed"
              >
                {issue.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.01 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4"
              >
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-900 mb-2">
                      So korrigierst du es:
                    </p>
                    <p className="text-sm text-green-800 leading-relaxed">
                      {issue.fix}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Download Report CTA - Animated */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ scale: 1.01 }}
          className="mt-12 bg-amber-50 border-2 border-amber-200 rounded-xl p-8 text-center"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="inline-block mb-4"
          >
            <Download className="h-12 w-12 text-amber-600" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            5-seitiger Detailreport
          </h3>
          <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
            Erhalte den vollständigen Report mit allen Issues, 
            Benchmarks und Copy-Paste Ready Fixes
          </p>
          
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 25px -5px rgba(245, 158, 11, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-lg transition-colors"
          >
            <span className="flex items-center justify-center">
              <Sparkles className="h-5 w-5 mr-2" />
              Report kaufen (€39)
            </span>
          </motion.button>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-sm text-slate-500 mt-4"
          >
            💳 Sichere Zahlung mit Stripe • 100% Geld-zurück-Garantie
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
