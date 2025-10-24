'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Gift } from 'lucide-react'
import toast from 'react-hot-toast'

export default function BirthdayWish({ isOpen, onClose }) {
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const predefinedMessages = [
    '🎉 Happy Birthday Sundram! 🎂 Wishing you an amazing year ahead filled with success, happiness, and endless opportunities! 🌟',
    '🎊 Many happy returns of the day! May this new year of your life bring you prosperity, good health, and all your dreams come true! 🎁',
    '🎈 Happy Birthday to an incredible developer! May your code always compile and your bugs be minimal! Keep shining! ✨',
    '🎂 Warmest birthday wishes! May this special day mark the beginning of another wonderful year in your journey! 🚀'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) {
      toast.error('Please fill all fields')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Send email directly using fetch API
      const response = await fetch('/api/send-birthday-wish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          to: 'thesundram29@gmail.com'
        })
      })

      if (response.ok) {
        toast.success('Birthday wish sent successfully! 🎉')
      } else {
        throw new Error('Failed to send')
      }
    } catch (error) {
      // Fallback to mailto if API fails
      const emailSubject = encodeURIComponent(`🎉 Birthday Wishes from ${name}`)
      const emailBody = encodeURIComponent(`Dear Sundram,\n\n${message}\n\nBest wishes,\n${name}`)
      window.open(`mailto:thesundram29@gmail.com?subject=${emailSubject}&body=${emailBody}`, '_blank')
      toast.success('Opening email client... 📧')
    }
    
    setIsSubmitting(false)
    setMessage('')
    setName('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-full max-w-md p-4 border bg-gradient-to-br from-gray-900 to-black rounded-xl border-primary/30 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center space-x-2">
                <Gift className="text-primary" size={20} />
                <h3 className="text-lg font-bold text-white sm:text-xl">Send Birthday Wish</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 transition-colors rounded-lg hover:bg-white/10"
              >
                <X size={18} className="text-gray-400 sm:w-5 sm:h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block mb-1.5 text-xs font-medium text-gray-300 sm:mb-2 sm:text-sm">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-white placeholder-gray-400 border rounded-lg bg-white/10 border-white/20 focus:border-primary focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-medium text-gray-300 sm:mb-2 sm:text-sm">Birthday Message</label>
                
                {/* Quick Message Options */}
                <div className="grid grid-cols-2 gap-1.5 mb-2 sm:gap-2 sm:mb-3">
                  {predefinedMessages.map((msg, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setMessage(msg)}
                      className="p-1.5 text-xs text-left text-gray-300 transition-all border rounded-lg bg-white/5 border-white/10 hover:border-primary/30 hover:text-white sm:p-2"
                    >
                      Message {index + 1}
                    </motion.button>
                  ))}
                </div>
                
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 text-sm text-white placeholder-gray-400 border rounded-lg resize-none bg-white/10 border-white/20 focus:border-primary focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                  placeholder="🎉 Happy Birthday! Write your wishes here..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center w-full px-4 py-2.5 space-x-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-primary to-accent disabled:opacity-50 sm:px-6 sm:py-3 sm:text-base"
              >
                <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span>{isSubmitting ? 'Sending...' : 'Send Wish 🎂'}</span>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}