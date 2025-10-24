'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, MapPin } from 'lucide-react'

export default function LiveClock() {
  const [time, setTime] = useState(new Date())
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-20 right-6 p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-primary/20 transition-all duration-300 z-50"
      >
        <Clock size={20} />
      </motion.button>

      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-32 right-6 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 z-50 min-w-[250px]"
        >
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
              <MapPin size={14} />
              <span>Mumbai, India</span>
            </div>
            
            <motion.div
              key={time.getSeconds()}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-2xl font-mono font-bold text-primary"
            >
              {formatTime(time)}
            </motion.div>
            
            <div className="text-sm text-gray-300">
              {formatDate(time)}
            </div>
            
            <div className="text-xs text-gray-400">
              IST (UTC+5:30)
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}