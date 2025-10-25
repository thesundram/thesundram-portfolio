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
          <div className="px-4 space-y-8 text-center sm:space-y-12 relative z-10">
            {/* Enhanced Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
              className="relative mb-6 sm:mb-8"
            >
              <motion.div
                className="relative flex items-center justify-center w-24 h-24 mx-auto sm:w-28 sm:h-28 lg:w-32 lg:h-32"
                whileHover={{ scale: 1.05 }}
              >
                {/* Main Logo */}
                <motion.div
                  className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary via-accent to-primary shadow-2xl"
                  animate={{
                    boxShadow: [
                      "0 0 15px rgba(236, 24, 57, 0.5)",
                      "0 0 30px rgba(236, 24, 57, 0.8), 0 0 45px rgba(243, 156, 18, 0.4)",
                      "0 0 15px rgba(236, 24, 57, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-xl font-bold text-white sm:text-2xl lg:text-3xl orbitron">SP</span>
                </motion.div>
                
                {/* Multiple Rotating Rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-dashed rounded-full sm:border-2 border-primary/40"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute border border-dotted rounded-full inset-1 sm:inset-2 border-accent/30"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute border border-solid rounded-full inset-2 sm:inset-4 border-blue-400/20"
                />
                
                {/* Pulsing Outer Ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute w-28 h-28 border border-primary/20 rounded-full sm:w-32 sm:h-32 lg:w-36 lg:h-36"
                />
              </motion.div>
            </motion.div>

            {/* Enhanced Progress Bar */}
            <div className="w-64 mx-auto space-y-4 sm:w-72 lg:w-80 sm:space-y-6">
              <div className="relative">
                <div className="relative h-2 overflow-hidden bg-gray-800/50 rounded-full border border-white/10 sm:h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  <motion.div
                    animate={{ x: [-60, 280] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 sm:w-20"
                  />
                </div>
                
                {/* Progress Percentage */}
                <motion.div
                  className="absolute -top-6 left-0 text-xs font-bold text-primary sm:-top-8"
                  animate={{ left: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                >
                  {Math.round(progress)}%
                </motion.div>
              </div>
              
              <motion.div
                className="text-center space-y-1 sm:space-y-2"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-base font-semibold text-white sm:text-lg">
                  Loading Portfolio
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ...
                  </motion.span>
                </p>
                <p className="text-xs text-gray-400 sm:text-sm">
                  Preparing amazing experience
                </p>
              </motion.div>
            </div>

            {/* Enhanced Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Floating Particles */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 300 + i * 50,
                    y: typeof window !== 'undefined' ? window.innerHeight : 800,
                    opacity: 0
                  }}
                  animate={{ 
                    y: -100,
                    opacity: [0, 0.8, 0],
                    scale: [0.3, 0.8, 0.3]
                  }}
                  transition={{ 
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent sm:w-2 sm:h-2"
                />
              ))}
              
              {/* Floating Icons */}
              {['⚛️', '🚀', '💻'].map((icon, i) => (
                <motion.div
                  key={icon}
                  initial={{ 
                    x: typeof window !== 'undefined' ? Math.random() * (window.innerWidth - 50) + 25 : 100 + i * 80,
                    y: typeof window !== 'undefined' ? window.innerHeight + 50 : 900,
                    opacity: 0,
                    rotate: 0
                  }}
                  animate={{ 
                    y: -50,
                    opacity: [0, 0.6, 0],
                    rotate: 180,
                    x: typeof window !== 'undefined' ? Math.random() * (window.innerWidth - 50) + 25 : 100 + i * 80
                  }}
                  transition={{ 
                    duration: Math.random() * 4 + 3,
                    repeat: Infinity,
                    delay: i * 0.8
                  }}
                  className="absolute text-lg sm:text-xl lg:text-2xl"
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