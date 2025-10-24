'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black"
        >
          <div className="space-y-12 text-center relative z-10">
            {/* Enhanced Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
              className="relative mb-8"
            >
              <motion.div
                className="relative flex items-center justify-center w-32 h-32 mx-auto"
                whileHover={{ scale: 1.1 }}
              >
                {/* Main Logo */}
                <motion.div
                  className="relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary via-accent to-primary shadow-2xl"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(236, 24, 57, 0.5)",
                      "0 0 40px rgba(236, 24, 57, 0.8), 0 0 60px rgba(243, 156, 18, 0.4)",
                      "0 0 20px rgba(236, 24, 57, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-3xl font-bold text-white orbitron">SP</span>
                </motion.div>
                
                {/* Multiple Rotating Rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed rounded-full border-primary/40"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute border border-dotted rounded-full inset-2 border-accent/30"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute border border-solid rounded-full inset-4 border-blue-400/20"
                />
                
                {/* Pulsing Outer Ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute w-36 h-36 border border-primary/20 rounded-full"
                />
              </motion.div>
            </motion.div>

            {/* Enhanced Progress Bar */}
            <div className="w-80 mx-auto space-y-6">
              <div className="relative">
                <div className="relative h-3 overflow-hidden bg-gray-800/50 rounded-full border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  <motion.div
                    animate={{ x: [-100, 400] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  />
                </div>
                
                {/* Progress Percentage */}
                <motion.div
                  className="absolute -top-8 left-0 text-xs font-bold text-primary"
                  animate={{ left: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                >
                  {Math.round(progress)}%
                </motion.div>
              </div>
              
              <motion.div
                className="text-center space-y-2"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-lg font-semibold text-white">
                  Loading Portfolio
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ...
                  </motion.span>
                </p>
                <p className="text-sm text-gray-400">
                  Preparing amazing experience for you
                </p>
              </motion.div>
            </div>

            {/* Enhanced Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Floating Particles */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 600,
                    y: typeof window !== 'undefined' ? window.innerHeight : 800,
                    opacity: 0
                  }}
                  animate={{ 
                    y: -100,
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: Math.random() * 4 + 3,
                    repeat: Infinity,
                    delay: Math.random() * 3
                  }}
                  className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                />
              ))}
              
              {/* Floating Icons */}
              {['⚛️', '🚀', '💻', '⚡', '🎯'].map((icon, i) => (
                <motion.div
                  key={icon}
                  initial={{ 
                    x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 300 + i * 100,
                    y: typeof window !== 'undefined' ? window.innerHeight + 100 : 900,
                    opacity: 0,
                    rotate: 0
                  }}
                  animate={{ 
                    y: -100,
                    opacity: [0, 0.7, 0],
                    rotate: 360,
                    x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 300 + i * 100
                  }}
                  transition={{ 
                    duration: Math.random() * 5 + 4,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                  className="absolute text-2xl"
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}