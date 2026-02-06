'use client'

import { useState, useEffect, ReactNode } from 'react'
import Confetti from 'react-confetti'
import { toast } from 'sonner'

interface EasterEggProps {
  children: ReactNode
}

export default function EasterEgg({ children }: EasterEggProps) {
  const [clickCount, setClickCount] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateSize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }
      updateSize()
      window.addEventListener('resize', updateSize)
      return () => window.removeEventListener('resize', updateSize)
    }
  }, [])

  useEffect(() => {
    if (clickCount === 5) {
      setShowConfetti(true)
      toast.success('🎉 You found the Easter Egg! Party Time! 🥳')
      setTimeout(() => {
        setShowConfetti(false)
        setClickCount(0)
      }, 5000)
    }
  }, [clickCount])

  return (
    <>
      {showConfetti && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>
          <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />
        </div>
      )}
      <div onClick={() => setClickCount(prev => prev + 1)} className="inline-block cursor-pointer select-none">
        {children}
      </div>
    </>
  )
}