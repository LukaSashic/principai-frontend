'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, AlertTriangle, Shield, Zap, TrendingUp } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        
        {/* Alert Banner - Animated entrance */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded"
        >
          <div className="flex items-center">
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-3" />
            </motion.div>
            <p className="text-sm text-amber-800 font-medium">
              ⚠️ 45% aller Gründungszuschuss-Anträge werden abgelehnt
            </p>
          </div>
        </motion.div>

        {/* Main Headline - Staggered animation */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          className="text-5xl font-bold text-slate-900 mb-6 leading-tight"
        >
          Ein falsches Wort kostet dich{' '}
          <motion.span 
            className="text-red-600"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            €31.500
          </motion.span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-600 mb-8"
        >
          Vermeide den Albtraum: 3 Monate warten → Ablehnung → €0.
          <br />
          Lass deinen Business Plan in 2 Minuten auf die 3 häufigsten 
          Ablehnungsgründe prüfen.
        </motion.p>

        {/* Value Props - Staggered with icons animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 mb-12"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ x: 5 }}
            className="flex items-start cursor-default"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
            >
              <Zap className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
            </motion.div>
            <div>
              <p className="font-semibold text-slate-900">
                KI-Analyse in 120 Sekunden
              </p>
              <p className="text-slate-600">
                Upload → Analyse → Konkrete Fixes
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ x: 5 }}
            className="flex items-start cursor-default"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
            >
              <TrendingUp className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
            </motion.div>
            <div>
              <p className="font-semibold text-slate-900">
                Grant Calibration Score (0-100)
              </p>
              <p className="text-slate-600">
                Sofort sehen wo dein Plan steht
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ x: 5 }}
            className="flex items-start cursor-default"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
            >
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
            </motion.div>
            <div>
              <p className="font-semibold text-slate-900">
                5-seitiger Report mit Copy-Paste Fixes
              </p>
              <p className="text-slate-600">
                Top 3 Issues + direkt nutzbare Korrekturen
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Button - Advanced hover animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.a
            href="/upload"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 25px -5px rgba(245, 158, 11, 0.3), 0 10px 10px -5px rgba(245, 158, 11, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-lg transition-colors duration-200"
          >
            Plan jetzt prüfen (€39)
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            >
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.div>
          </motion.a>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-slate-500 mt-4"
          >
            💳 Zahlung erst nach Analyse. 100% Geld zurück wenn Report unvollständig.
          </motion.p>
        </motion.div>

        {/* Security Statement - Animated entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="mt-12 p-6 bg-green-50 border border-green-200 rounded-lg"
        >
          <div className="flex items-center mb-2">
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 4
              }}
            >
              <Shield className="h-5 w-5 text-green-700 mr-2" />
            </motion.div>
            <p className="text-sm font-semibold text-green-900">
              🔒 100% DATENSCHUTZ GARANTIERT
            </p>
          </div>
          <ul className="text-sm text-green-800 space-y-1">
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              • Server in Deutschland (DSGVO-konform)
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
            >
              • Keine Weitergabe an AI Training Data
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              • Automatische Löschung nach 7 Tagen
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
            >
              • Verschlüsselte Übertragung (SSL)
            </motion.li>
          </ul>
        </motion.div>

        {/* Social Proof - Fade in */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate-500 mb-4">
            Beta-Phase: Erste 50 Analysen zum Einführungspreis
          </p>
          <div className="flex justify-center items-center space-x-8">
            <motion.div
              whileHover={{ scale: 1.1, opacity: 1 }}
              className="text-xs text-slate-400 opacity-40 transition-opacity"
            >
              IHK
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, opacity: 1 }}
              className="text-xs text-slate-400 opacity-40 transition-opacity"
            >
              Arbeitsagentur
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, opacity: 1 }}
              className="text-xs text-slate-400 opacity-40 transition-opacity"
            >
              DEHOGA
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
