'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import { X, Gift, Heart, Send } from 'lucide-react'

interface BirthdayWishProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function BirthdayWish({ isOpen, onClose }: BirthdayWishProps) {
  const [showWish, setShowWish] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [message, setMessage] = useState('')
  const [senderName, setSenderName] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  // BIRTHDAY DATE CONFIGURATION
  // Format: Month (0-11), Day (1-31)
  // February 29th (Leap Day)
  const BIRTHDAY = {
    month: 1, // February
    day: 29   // 29th
  }

  const QUICK_WISHES = [
    "Happiest Birthday, Sundram! 🎂",
    "Have a fantastic year ahead! 🚀",
    "Keep shining & coding! ✨",
    "Wishing you great success! 🏆",
    "Enjoy your special day! 🎉"
  ]

  // Handle external open prop
  useEffect(() => {
    if (isOpen) {
      setShowWish(true)
    }
  }, [isOpen])

  const handleClose = () => {
    setShowWish(false)
    if (onClose) onClose()
  }

  useEffect(() => {
    // Check if today is the birthday (Automatic check)
    const checkBirthday = () => {
      const today = new Date()
      const currentMonth = today.getMonth()
      const currentDay = today.getDate()

      // Handle leap year logic: if it's not a leap year, usually celebrate on Feb 28 or Mar 1
      // For this logic, we strictly check 29th. If simple check:
      const isBirthday = currentMonth === BIRTHDAY.month && currentDay === BIRTHDAY.day

      // Check if we haven't shown the wish today yet
      const lastShown = localStorage.getItem('birthday_shown_year')
      const currentYear = today.getFullYear().toString()

      if (isBirthday && lastShown !== currentYear) {
        setShowWish(true)
        localStorage.setItem('birthday_shown_year', currentYear)
      }
    }

    if (!isOpen) { // Only run auto-check if not manually opened
      checkBirthday()
    }

    // Window resize handler for confetti
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Initial size
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  const handleSendWish = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !senderName.trim()) return

    setIsSending(true)
    try {
      const response = await fetch('/api/send-birthday-wish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: senderName,
          message: message,
          to: 'thesundram29@gmail.com'
        })
      })

      if (response.ok) {
        setEmailSent(true)
        setTimeout(() => {
          setShowWish(false)
        }, 3000)
      }
    } catch (error) {
      console.error('Failed to send wish', error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <AnimatePresence>
      {showWish && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          {/* Confetti */}
          <div className="fixed inset-0 pointer-events-none z-[90]">
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              numberOfPieces={500}
              recycle={true}
              colors={['#ec1839', '#fbbf24', '#3b82f6', '#10b981', '#8b5cf6']}
            />
          </div>

          <motion.div
            initial={{ scale: 0.5, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 100 }}
            className="relative z-[100] w-full max-w-lg bg-gray-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header Image/Gradient */}
            <div className="relative h-48 bg-gradient-to-br from-primary via-orange-500 to-yellow-500 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative z-10 text-9xl"
              >
                🎂
              </motion.div>
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {!emailSent ? (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-500 mb-2 orbitron">
                      Happy Birthday!
                    </h2>
                    <p className="text-gray-300">
                      It&apos;s a special day for Sundram! 🎉
                      <br />Send him a warm wish to make it memorable.
                    </p>
                  </div>

                  <form onSubmit={handleSendWish} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Write a sweet birthday message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none mb-3"
                        required
                      />

                      {/* Quick Wishes Chips */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {QUICK_WISHES.map((wish, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setMessage(wish)}
                            className="px-3 py-1 text-xs text-gray-300 bg-white/5 border border-white/10 rounded-full hover:bg-primary/20 hover:border-primary/30 hover:text-white transition-all duration-200"
                          >
                            {wish}
                          </button>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSending}
                      className="w-full py-4 bg-gradient-to-r from-primary to-orange-500 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-primary/25 transition-all flex items-center justify-center gap-2 group"
                    >
                      {isSending ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                          Send Wishes
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white"
                  >
                    <Gift size={40} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent! 🎁</h3>
                  <p className="text-gray-400">
                    Thanks for making Sundram&apos;s day extra special!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}