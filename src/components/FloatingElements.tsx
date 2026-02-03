'use client'

import { motion } from 'framer-motion'

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Shapes */}
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 left-4 w-10 h-10 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-sm sm:top-20 sm:left-10 sm:w-16 sm:h-16"
      />
      
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          x: [0, 8, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-8 w-6 h-6 bg-accent/30 rounded-lg blur-sm sm:top-40 sm:right-20 sm:w-8 sm:h-8"
      />
      
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-24 left-8 w-8 h-8 border-2 border-primary/30 rounded-full sm:bottom-32 sm:left-20 sm:w-12 sm:h-12"
      />
      
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-16 right-12 w-4 h-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full sm:bottom-20 sm:right-32 sm:w-6 sm:h-6"
      />
    </div>
  )
}