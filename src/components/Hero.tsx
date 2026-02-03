'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion'
import { Eye, Mail, Github, Linkedin, Instagram, ArrowDown, Sparkles, Code, Zap, Star, Facebook } from 'lucide-react'
import SectionBackground from './SectionBackground'

export default function Hero() {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)


  // 3D Tilt Effect State
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    const xPosition = clientX - left
    const yPosition = clientY - top
    const xPct = xPosition / width - 0.5
    const yPct = yPosition / height - 0.5
    mouseX.set(xPct)
    mouseY.set(yPct)
  }

  const resetTilt = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  useEffect(() => {
    // Advanced Typing Logic
    const roles = [
      'SOFTWARE ENGINEER',
      'SOFTWARE DEVELOPER',
      'FULL STACK DEVELOPER',
      'WEB DEVELOPER',
      'APP DEVELOPER',
      'INDUSTRIAL AUTOMATION'
    ]

    let timer: NodeJS.Timeout
    const handleTyping = () => {
      const i = loopNum % roles.length
      const fullText = roles[i]

      // Typing speed variation
      let speed = isDeleting ? 40 : 100

      if (!isDeleting && text === fullText) {
        // Pause at end of word
        speed = 2000
        timer = setTimeout(() => setIsDeleting(true), speed)
      } else if (isDeleting && text === '') {
        // Pause before next word
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
        speed = 500
        timer = setTimeout(handleTyping, speed)
      } else {
        setText(isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
        )
        timer = setTimeout(handleTyping, speed)
      }
    }

    timer = setTimeout(handleTyping, 100)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum])

  const socialLinks = [
    { icon: Linkedin, href: 'http://linkedin.com/in/thesundram', color: 'hover:text-blue-500' },
    { icon: Github, href: 'http://github.com/thesundram', color: 'hover:text-gray-400' },
    { icon: Mail, href: 'mailto:thesundram29@gmail.com', color: 'hover:text-red-500' },
    { icon: Instagram, href: 'https://www.instagram.com/the.sun29/', color: 'hover:text-pink-500' },
    { icon: Facebook, href: 'https://www.facebook.com/thesundram29', color: 'hover:text-blue-600' },
  ]

  return (
    <motion.section
      ref={heroRef}
      id="home"
      className="relative flex items-center justify-center min-h-screen pt-20 overflow-hidden sm:pt-24 lg:pt-0 lg:ml-64 xl:ml-72"
    >
      {/* Enhanced Animated Background */}
      <SectionBackground />

      {/* Interactive Mouse Follower */}
      <motion.div
        className="fixed z-50 w-6 h-6 rounded-full pointer-events-none bg-primary/30 blur-sm"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      <div className="container relative z-10 px-4 py-8 mx-auto sm:px-6 sm:py-16">
        <div className="grid items-center gap-8 lg:gap-16 lg:grid-cols-2">

          {/* Left Content - Glassmorphism Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="p-6 transition-all duration-300 border shadow-2xl space-y-8 sm:p-10 rounded-3xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border-white/20 dark:border-white/10 hover:border-primary/20 hover:bg-white/60 dark:hover:bg-white/10"
          >
            {/* Enhanced Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3 sm:space-y-4"
            >
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-300 sm:text-base lg:text-lg"
              >
                <span className="w-6 h-0.5 bg-gradient-to-r from-primary to-accent sm:w-8 lg:w-12"></span>
                <span>Hi, I am</span>
              </motion.p>

              <motion.h1
                className="relative text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl orbitron"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
              >
                <motion.span
                  className="relative inline-block uppercase gradient-text"
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                    textShadow: "0 0 20px rgba(236, 24, 57, 0.8)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Sundram
                  <motion.div
                    className="absolute w-2 h-2 rounded-full sm:w-3 sm:h-3 -top-1 -right-1 sm:-top-2 sm:-right-2 bg-primary"
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </motion.span>
                <br />
                <motion.span
                  className="relative inline-block text-gray-800 uppercase dark:text-white"
                  whileHover={{
                    scale: 1.05,
                    rotate: -2,
                    textShadow: "0 0 20px rgba(255, 255, 255, 0.8)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Pandey
                  <motion.div
                    className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 bg-accent"
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 2 }}
                  />
                </motion.span>
              </motion.h1>

              {/* Animated underline */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ delay: 1, duration: 0.8 }}
                className="h-0.5 rounded-full bg-gradient-to-r from-primary via-accent to-primary sm:h-1 sm:w-[150px] lg:w-[200px]"
              />
            </motion.div>

            {/* Enhanced Typing Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="relative">
                <div className="min-h-[2.5rem] flex flex-wrap items-center gap-2 sm:min-h-[3rem] lg:min-h-[4rem] sm:gap-3">
                  <h2 className="text-base font-semibold text-gray-800 dark:text-white sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                    I&apos;m a
                  </h2>
                  <motion.div
                    className="relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <motion.span
                      className="relative text-lg font-bold tracking-wide uppercase text-primary sm:text-xl md:text-2xl lg:text-3xl"
                    >
                      <motion.span
                        key={text}
                        className="inline-block font-mono text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
                      >
                        {text}
                      </motion.span>
                      <motion.span
                        className="ml-2 typing-cursor text-accent"
                        animate={{
                          opacity: [1, 0.3, 1],
                          scale: [1, 0.8, 1]
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        |
                      </motion.span>
                    </motion.span>
                  </motion.div>
                </div>

                {/* Enhanced floating tech icons */}
                <div className="absolute top-0 hidden -right-20 lg:block">
                  <motion.div
                    animate={{
                      y: [-5, 5, -5],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-3xl cursor-pointer opacity-40 hover:opacity-80"
                    whileHover={{ scale: 1.5 }}
                  >
                    ⚛️
                  </motion.div>
                </div>
                <div className="absolute hidden -right-32 top-8 lg:block">
                  <motion.div
                    animate={{
                      y: [5, -5, 5],
                      x: [-2, 2, -2]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-2xl cursor-pointer opacity-40 hover:opacity-80"
                    whileHover={{ scale: 1.3, rotate: 45 }}
                  >
                    🚀
                  </motion.div>
                </div>
                <div className="absolute hidden -right-16 top-16 lg:block">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="text-xl cursor-pointer"
                    whileHover={{ scale: 1.4 }}
                  >
                    💻
                  </motion.div>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base md:text-lg"
              >
                Crafting high-performance digital experiences with precision and creativity. I bridge the gap between <span className="font-semibold text-primary">complex backend architecture</span> and <span className="font-semibold text-accent">intuitive frontend design</span>, turning ambitious ideas into <span className="font-semibold text-primary">seamless, scalable reality</span>.
              </motion.p>
            </motion.div>

            {/* Enhanced Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              <motion.a
                href="/cv"
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0 15px 40px rgba(236, 24, 57, 0.5)',
                  y: -8
                }}
                whileTap={{ scale: 0.92 }}
                className="relative flex items-center px-4 py-2 space-x-2 overflow-hidden text-sm font-semibold text-white transition-all duration-500 rounded-full group bg-gradient-to-r from-primary via-accent to-primary bg-size-200 hover:bg-pos-100 sm:px-6 sm:py-3 sm:text-base"
              >
                <motion.div
                  className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-accent via-primary to-accent group-hover:opacity-100"
                  animate={{
                    background: [
                      'linear-gradient(45deg, #ec1839, #f39c12)',
                      'linear-gradient(45deg, #f39c12, #ec1839)',
                      'linear-gradient(45deg, #ec1839, #f39c12)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Eye size={18} className="relative z-10 sm:w-[22px] sm:h-[22px]" />
                </motion.div>
                <span className="relative z-10">View CV</span>
                <motion.div
                  className="absolute top-0 left-0 w-full h-full rounded-full bg-white/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  boxShadow: '0 15px 40px rgba(236, 24, 57, 0.3)'
                }}
                whileTap={{ scale: 0.92 }}
                className="relative flex items-center px-4 py-2 space-x-2 overflow-hidden text-sm font-semibold transition-all duration-500 border-2 rounded-full group border-primary text-primary hover:text-white sm:px-6 sm:py-3 sm:text-base"
              >
                <motion.div
                  className="absolute inset-0 transition-transform duration-500 origin-left transform scale-x-0 bg-gradient-to-r from-primary to-accent group-hover:scale-x-100"
                />
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail size={18} className="relative z-10 sm:w-[22px] sm:h-[22px]" />
                </motion.div>
                <span className="relative z-10">Contact Me</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="flex items-center space-x-4 sm:space-x-6"
            >
              <span className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">Follow me:</span>
              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 bg-black/5 dark:bg-white/10 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-400 transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/20 sm:p-3 ${social.color}`}
                    >
                      <Icon size={16} className="sm:w-5 sm:h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>


          </motion.div>

          {/* Enhanced Right Content - 3D Card Effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center h-full min-h-[400px]"
          >
            <motion.div
              className="relative w-64 h-64 sm:w-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] perspective-1000 cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
              style={{ rotateX, rotateY }}
            >
              {/* Rotating Border Ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-70 blur-sm animate-spin-slow" />

              <motion.div
                className="relative z-10 w-full h-full overflow-hidden border-[6px] rounded-full shadow-2xl border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-900"
                style={{ rotateX, rotateY }}
              >
                <img
                  src="/images/hero.png"
                  alt="Sundram Pandey"
                  className="object-cover w-full h-full transform scale-105"
                />

                {/* No overlay for maximum clarity in both modes */}
              </motion.div>

              {/* Floating Tech Badges with Parallax */}
              <motion.div
                style={{ x: useTransform(mouseX, [-0.5, 0.5], [20, -20]), y: useTransform(mouseY, [-0.5, 0.5], [20, -20]) }}
                className="absolute p-4 border shadow-2xl -top-6 -right-6 rounded-3xl bg-white/90 dark:bg-black/80 border-gray-200 dark:border-white/10 backdrop-blur-xl"
              >
                <Code className="text-primary w-8 h-8 drop-shadow-[0_0_10px_rgba(236,24,57,0.5)]" />
              </motion.div>

              <motion.div
                style={{ x: useTransform(mouseX, [-0.5, 0.5], [-20, 20]), y: useTransform(mouseY, [-0.5, 0.5], [-20, 20]) }}
                className="absolute p-4 border shadow-2xl -bottom-6 -left-6 rounded-3xl bg-white/90 dark:bg-black/80 border-gray-200 dark:border-white/10 backdrop-blur-xl"
              >
                <Zap className="text-accent w-8 h-8 drop-shadow-[0_0_10px_rgba(243,156,18,0.5)]" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="absolute transform -translate-x-1/2 bottom-4 left-[40%] sm:bottom-8 lg:bottom-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center space-y-2 text-gray-400 cursor-pointer group sm:space-y-3 lg:space-y-4"
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Mobile-optimized text */}
            <motion.span
              className="text-xs font-medium transition-all duration-300 group-hover:text-primary group-hover:font-semibold sm:text-sm lg:text-base"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.02, 1]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <span className="block sm:hidden">Scroll</span>
              <span className="hidden sm:block">Explore More</span>
            </motion.span>

            {/* Enhanced Explore More Button */}
            <motion.button
              onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05, y: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center space-y-2 group"
            >
              <div className="relative flex items-center justify-center w-12 h-20 border-2 rounded-full border-gray-400/50 dark:border-gray-500/50 bg-black/5 dark:bg-white/5 backdrop-blur-sm group-hover:border-primary/50 transition-colors duration-300">
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-3 rounded-full bg-gradient-to-b from-primary to-accent shadow-[0_0_10px_rgba(236,24,57,0.6)]"
                />
              </div>
              <span className="text-xs font-bold tracking-widest text-gray-500 uppercase transition-colors duration-300 group-hover:text-primary animate-pulse">
                Explore
              </span>
            </motion.button>

            {/* Mobile swipe hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 3 }}
              className="block text-xs text-gray-500 sm:hidden"
            >
              Swipe up
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}