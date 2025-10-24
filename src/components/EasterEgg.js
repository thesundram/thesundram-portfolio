'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Gift } from 'lucide-react'

export default function EasterEgg() {
  const [showEgg, setShowEgg] = useState(false)
  const [sequence, setSequence] = useState([])
  const [showReward, setShowReward] = useState(false)

  useEffect(() => {
    const secretCode = ['s', 'u', 'n', 'd', 'r', 'a', 'm']
    
    const handleKeyPress = (e) => {
      if (!e.key) return
      const newSequence = [...sequence, e.key.toLowerCase()].slice(-7)
      setSequence(newSequence)
      
      if (newSequence.join('') === secretCode.join('')) {
        setShowEgg(true)
        setTimeout(() => setShowReward(true), 1000)
        setTimeout(() => {
          setShowEgg(false)
          setShowReward(false)
          setSequence([])
        }, 5000)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [sequence])

  return (
    <AnimatePresence>
      {showEgg && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="text-center space-y-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Gift size={80} className="text-primary mx-auto" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-bold gradient-text"
            >
              🎉 Easter Egg Found! 🎉
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xl text-gray-300"
            >
              You discovered the secret! Type &ldquo;SUNDRAM&rdquo; anywhere on the site.
            </motion.p>
            
            {showReward && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="text-lg text-accent">
                  🎁 Special Reward: You&apos;re awesome for exploring!
                </div>
                
                <div className="flex justify-center space-x-2">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 0 }}
                      animate={{ y: [-20, 0] }}
                      transition={{ delay: i * 0.1, repeat: Infinity, duration: 1 }}
                    >
                      <Sparkles className="text-yellow-400" size={20} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}