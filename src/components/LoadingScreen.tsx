'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Cpu, Globe, Rocket, Zap, Shield } from 'lucide-react'

// Define icon type properly
interface FloatingIcon {
  Icon: any;
  id: number;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
  left: string;
  top: string;
}

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentStatus, setCurrentStatus] = useState('Initializing...')
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([])

  const statusMessages = [
    'Initializing Core Systems...',
    'Loading Assets...',
    'Compiling Modules...',
    'Establishing Connection...',
    'Verifying Security Protocols...',
    'Starting Engine...',
    'Ready to Launch 🚀'
  ]

  useEffect(() => {
    // Generate random positions only on client mount
    const icons = [Code, Cpu, Globe, Rocket, Zap, Shield];
    const newIcons = icons.map((Icon, i) => ({
      Icon,
      id: i,
      initialX: Math.random() * 400 - 200,
      initialY: Math.random() * 400 - 200,
      duration: 3 + Math.random() * 2,
      delay: i * 0.5,
      left: `${50 + (Math.random() * 80 - 40)}%`,
      top: `${50 + (Math.random() * 80 - 40)}%`
    }));
    setFloatingIcons(newIcons);

    // Progress Timer
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setLoading(false), 800)
          return 100
        }
        // Non-linear progress for realism
        const increment = Math.random() * 15
        return Math.min(prev + increment, 100)
      })
    }, 200)

    // Status Message Rotator
    const statusTimer = setInterval(() => {
      setProgress(currentP => {
        const index = Math.min(Math.floor((currentP / 100) * statusMessages.length), statusMessages.length - 1)
        setCurrentStatus(statusMessages[index])
        return currentP
      })
    }, 100)

    return () => {
      clearInterval(timer)
      clearInterval(statusTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -50,
            scale: 1.1,
            filter: "blur(10px)"
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Animated Matrix Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(24,24,27,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-scan" style={{ height: '50%' }} />
          </div>

          <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-md p-6">

            {/* Holographic Logo Container */}
            <div className="relative mb-12">
              {/* Spinning Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 -m-8 border border-dashed rounded-full border-gray-700/50"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 -m-4 border border-dotted rounded-full border-primary/30"
              />

              {/* Center Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-24 h-24 flex items-center justify-center bg-black rounded-full border-2 border-primary/50 shadow-[0_0_50px_rgba(236,24,57,0.4)]"
              >
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 font-mono">
                  SP
                </span>

                {/* Pulse Effect */}
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              </motion.div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full space-y-2">
              <div className="flex justify-between text-xs font-mono text-primary/80 mb-1">
                <span>SYSTEM_BOOT_SEQUENCE</span>
                <span>{Math.round(progress)}%</span>
              </div>

              <div className="relative h-2 bg-gray-900 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="absolute inset-0 bg-primary/80"
                />
                <motion.div
                  animate={{ x: [-100, 400] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                />
              </div>

              <div className="h-6 flex items-center justify-center overflow-hidden">
                <motion.p
                  key={currentStatus}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="text-xs font-mono text-gray-400/80"
                >
                  {`> ${currentStatus}`}
                </motion.p>
              </div>
            </div>

            {/* Floating Tech Icons - Rendered only after mount */}
            <div className="absolute inset-0 pointer-events-none">
              {floatingIcons.map(({ Icon, id, initialX, initialY, duration, delay, left, top }) => (
                <motion.div
                  key={id}
                  className="absolute text-primary/20"
                  initial={{ x: initialX, y: initialY, opacity: 0 }}
                  animate={{
                    y: [0, -40, 0],
                    opacity: [0, 0.5, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    delay: delay
                  }}
                  style={{ left, top }}
                >
                  <Icon size={24} />
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}