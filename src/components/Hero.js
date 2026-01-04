'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Eye, Mail, Github, Linkedin, Instagram, ArrowDown, Sparkles, Code, Zap, Star, Facebook } from 'lucide-react'

export default function Hero() {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)


  useEffect(() => {
    const roles = [
      'SOFTWARE ENGINEER',
      'SOFTWARE DEVELOPER',
      'FULL STACK DEVELOPER',
      'WEB DEVELOPER',
      'APP DEVELOPER',
      'UI/UX DESIGNER'
    ]
    
    const handleTyping = () => {
      const i = loopNum % roles.length
      const fullText = roles[i]

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      )

      setTypingSpeed(isDeleting ? 30 : 150)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      {/* Interactive Mouse Follower */}
      <motion.div
        className="fixed z-50 w-6 h-6 rounded-full pointer-events-none bg-primary/30 blur-sm"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute rounded-full top-20 left-20 w-72 h-72 bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute rounded-full bottom-20 right-20 w-96 h-96 bg-accent/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />

        {/* Geometric Shapes */}
        <motion.div
          className="absolute w-32 h-32 rotate-45 border top-1/4 left-1/4 border-primary/20"
          animate={{ rotate: [45, 405] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-24 h-24 border-2 rounded-full bottom-1/4 right-1/4 border-accent/20"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Tech Icons Floating */}
        <motion.div
          className="absolute text-2xl top-32 right-32"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 360]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Code className="text-primary/40" size={32} />
        </motion.div>
        <motion.div
          className="absolute text-2xl bottom-32 left-32"
          animate={{
            y: [10, -10, 10],
            x: [-5, 5, -5]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Zap className="text-accent/40" size={28} />
        </motion.div>
        <motion.div
          className="absolute text-xl top-64 left-64"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Star className="text-blue-400/40" size={24} />
        </motion.div>
      </div>

      <div className="container relative z-10 px-4 py-8 mx-auto sm:px-6 sm:py-16">
        <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-2">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
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
                className="flex items-center space-x-2 text-sm text-gray-300 sm:text-base lg:text-lg"
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
                  className="relative inline-block text-white uppercase "
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
                  <h2 className="text-base font-semibold text-white sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
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
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.8 }}
                        transition={{ 
                          duration: 0.4, 
                          ease: "easeOut",
                          type: "spring",
                          stiffness: 200
                        }}
                        className="inline-block"
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
                className="max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg"
              >
                Passionate about building <span className="font-semibold text-primary">fast, scalable, and user-focused</span> web & mobile applications. 
                With <span className="font-semibold text-accent">2+ years of experience</span>, I turn ideas into seamless digital experiences 
                through <span className="font-semibold text-primary">clean code</span> and <span className="font-semibold text-accent">modern technologies</span>.
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
              <span className="text-xs text-gray-400 sm:text-sm">Follow me:</span>
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
                      className={`p-2 bg-white/10 backdrop-blur-sm rounded-full text-gray-400 transition-all duration-300 hover:bg-white/20 sm:p-3 ${social.color}`}
                    >
                      <Icon size={16} className="sm:w-5 sm:h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>


          </motion.div>

          {/* Enhanced Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-72 flex items-center justify-center sm:h-80 md:h-96 lg:h-[500px] xl:h-[550px]"
          >
            {/* Enhanced Profile Image */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.5, type: "spring", stiffness: 100 }}
              className="relative cursor-pointer group"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="relative w-56 h-56 overflow-hidden rounded-full shadow-2xl sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 xl:w-[420px] xl:h-[420px]"
                whileHover={{
                  boxShadow: '0 25px 50px rgba(236, 24, 57, 0.4), 0 0 0 1px rgba(236, 24, 57, 0.3)'
                }}
              >
                <motion.img
                  src="/images/hero.png"
                  alt="Sundram Pandey"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 background-blend-mode:multiply group-hover:background-blend-normal background-color:bg-gray-800"
                  whileHover={{ filter: 'brightness(1.1) contrast(1.1)' }}
                />
                {/* Enhanced overlay gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-accent/30"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 border-4 border-transparent rounded-full"
                  animate={{
                    borderColor: [
                      'rgba(236, 24, 57, 0.5)',
                      'rgba(243, 156, 18, 0.5)',
                      'rgba(236, 24, 57, 0.5)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>

              {/* Enhanced Multiple Animated Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed rounded-full border-primary/40"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute border-2 border-dotted rounded-full inset-4 border-accent/30"
              />
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute border border-solid rounded-full inset-8 border-blue-400/20"
              />

              {/* Enhanced Sparkle effects */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6"
              >
                <Sparkles size={20} className="text-primary drop-shadow-lg sm:w-7 sm:h-7" />
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.8, 0.3],
                  rotate: [360, 180, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4"
              >
                <Star size={16} className="text-accent drop-shadow-lg sm:w-5 sm:h-5" />
              </motion.div>
            </motion.div>

            {/* Enhanced Floating Elements */}
            <motion.div
              animate={{
                y: [-15, 15, -15],
                x: [-5, 5, -5],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute w-24 h-24 rounded-full opacity-25 top-8 right-8 bg-gradient-to-r from-primary via-accent to-primary blur-2xl"
            />
            <motion.div
              animate={{
                y: [15, -15, 15],
                x: [5, -5, 5],
                rotate: [360, 180, 0],
                scale: [1.2, 1, 1.2]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute w-20 h-20 rounded-full opacity-25 bottom-8 left-8 bg-gradient-to-r from-accent via-primary to-accent blur-2xl"
            />
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute w-12 h-12 rounded-full top-1/2 right-4 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl"
            />
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

            {/* Enhanced arrow container */}
            <div className="relative p-2 sm:p-3">
              {/* Background circle */}
              <motion.div
                className="absolute inset-0 border rounded-full bg-white/5 backdrop-blur-sm border-white/10"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Main arrow */}
              <motion.div
                animate={{
                  y: [0, 6, 0],
                  opacity: [1, 0.6, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative z-10 transition-all duration-300 group-hover:text-primary group-hover:drop-shadow-lg"
              >
                <ArrowDown size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </motion.div>

              {/* Mobile-friendly animated trail */}
              <motion.div
                animate={{
                  height: [0, 20, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent rounded-full sm:top-9 lg:top-10"
              />

              {/* Multiple pulsing dots for mobile */}
              <motion.div
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 transform -translate-x-1/2 rounded-full top-7 left-1/2 bg-primary sm:top-8 lg:top-9"
              />
              
              <motion.div
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.7, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.3 }}
                className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 transform -translate-x-1/2 rounded-full top-9 left-1/2 bg-accent sm:top-10 lg:top-11"
              />
            </div>

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