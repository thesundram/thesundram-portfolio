'use client'

import { motion } from 'framer-motion'

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Shapes */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-sm"
      />
      
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          x: [0, 10, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-20 w-8 h-8 bg-accent/30 rounded-lg blur-sm"
      />
      
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-32 left-20 w-12 h-12 border-2 border-primary/30 rounded-full"
      />
      
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-20 right-32 w-6 h-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"
      />
    </div>
  )
}