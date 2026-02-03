'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Gift } from 'lucide-react'

export default function EasterEgg() {
  const [showEgg, setShowEgg] = useState(false)
  const [sequence, setSequence] = useState([])
  const [showReward, setShowReward] = useState(false)

  useEffect(() => {
    // Easter egg disabled
  }, [sequence])

  return (
    <AnimatePresence>
      {showEgg && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="max-w-sm space-y-4 text-center sm:space-y-6 sm:max-w-none"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Gift size={60} className="mx-auto text-primary sm:w-20 sm:h-20" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-bold gradient-text sm:text-4xl"
            >
              🎉 Easter Egg Found! 🎉
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="px-2 text-base text-gray-300 sm:text-xl"
            >
              You discovered the secret! Type &ldquo;SUNDRAM&rdquo; anywhere on the site.
            </motion.p>
            
            {showReward && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3 sm:space-y-4"
              >
                <div className="px-2 text-base text-accent sm:text-lg">
                  🎁 Special Reward: You&apos;re awesome for exploring!
                </div>
                
                <div className="flex justify-center space-x-2">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 0 }}
                      animate={{ y: [-15, 0] }}
                      transition={{ delay: i * 0.1, repeat: Infinity, duration: 1 }}
                    >
                      <Sparkles className="text-yellow-400" size={16} />
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