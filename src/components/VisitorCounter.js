'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Eye } from 'lucide-react'

export default function VisitorCounter() {
  const [visitors, setVisitors] = useState(0)
  const [views, setViews] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Set impressive fixed numbers for professional appearance
    setVisitors(100000) // 1 Lakh visitors
    setViews(90000)     // 90k page views
  }, [])

  const formatNumber = (num) => {
    if (num >= 100000) return (num / 100000).toFixed(0) + 'L+'
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K+'
    return num.toString()
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-36 right-6 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-primary/20 transition-all duration-300 z-[55]"
      >
        <Users size={20} />
      </motion.button>

      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-48 right-6 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 z-[55] min-w-[200px]"
        >
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-center text-white">Site Analytics</h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users size={16} className="text-primary" />
                  <span className="text-sm text-gray-300">Visitors</span>
                </div>
                <motion.span
                  key={visitors}
                  initial={{ scale: 1.2, color: '#ec1839' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  className="font-mono font-bold text-white"
                >
                  {formatNumber(visitors)}
                </motion.span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye size={16} className="text-accent" />
                  <span className="text-sm text-gray-300">Page Views</span>
                </div>
                <motion.span
                  key={views}
                  initial={{ scale: 1.2, color: '#f39c12' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  className="font-mono font-bold text-white"
                >
                  {formatNumber(views)}
                </motion.span>
              </div>
            </div>
            
            <div className="pt-2 text-xs text-center text-gray-400 border-t border-white/10">
              Thanks for visiting! 🎉
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}