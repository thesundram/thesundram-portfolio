'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Download, Mail, Github, Linkedin, Instagram, ArrowDown, Sparkles, Code, Zap, Star } from 'lucide-react'

export default function Hero() {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const roles = [
    'SOFTWARE ENGINEER',
    'SOFTWARE DEVELOPER',
    'FULL STACK DEVELOPER',
    'WEB DEVELOPER',
    'APP DEVELOPER',
    'UI/UX DESIGNER',
    'PROBLEM SOLVER',
    'TECH ENTHUSIAST'
  ]

  useEffect(() => {
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
  }, [text, isDeleting, loopNum, typingSpeed, roles])

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
  ]

  return (
    <motion.section
      ref={heroRef}
      id="home"
      className="relative flex items-center justify-center min-h-screen overflow-hidden lg:ml-64 xl:ml-72"
      style={{ y, opacity }}
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

      <div className="container relative z-10 px-6 py-16 mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Enhanced Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-2 text-lg text-gray-300"
              >
                <span className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent"></span>
                <span>Hi, I am</span>
              </motion.p>

              <motion.h1
                className="relative text-5xl font-bold lg:text-7xl orbitron"
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
                    className="absolute w-3 h-3 rounded-full -top-2 -right-2 bg-primary"
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
                    className="absolute w-2 h-2 rounded-full -bottom-2 -left-2 bg-accent"
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
                animate={{ width: "200px" }}
                transition={{ delay: 1, duration: 0.8 }}
                className="h-1 rounded-full bg-gradient-to-r from-primary via-accent to-primary"
              />
            </motion.div>

            {/* Enhanced Typing Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-6"
            >
              <div className="relative">
                <h2 className="text-2xl font-semibold lg:text-3xl">
                  I'm a{' '}
                  <motion.span
                    className="relative inline-block text-primary glow-text"
                    animate={{
                      textShadow: [
                        "0 0 10px #ec1839",
                        "0 0 20px #ec1839, 0 0 30px #ec1839",
                        "0 0 40px #ec1839, 0 0 50px #ec1839",
                        "0 0 20px #ec1839, 0 0 30px #ec1839",
                        "0 0 10px #ec1839"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <motion.span
                      key={text}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {text}
                    </motion.span>
                    <motion.span
                      className="typing-cursor"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      ||
                    </motion.span>
                  </motion.span>
                </h2>

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
                className="max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg"
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
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="/cv"
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0 15px 40px rgba(236, 24, 57, 0.5)',
                  y: -8
                }}
                whileTap={{ scale: 0.92 }}
                className="relative flex items-center px-6 py-3 space-x-2 overflow-hidden font-semibold text-white transition-all duration-500 rounded-full group bg-gradient-to-r from-primary via-accent to-primary bg-size-200 hover:bg-pos-100"
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
                  <Download size={22} className="relative z-10" />
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
                className="relative flex items-center px-6 py-3 space-x-2 overflow-hidden font-semibold transition-all duration-500 border-2 rounded-full group border-primary text-primary hover:text-white"
              >
                <motion.div
                  className="absolute inset-0 transition-transform duration-500 origin-left transform scale-x-0 bg-gradient-to-r from-primary to-accent group-hover:scale-x-100"
                />
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail size={22} className="relative z-10" />
                </motion.div>
                <span className="relative z-10">Contact Me</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="flex items-center space-x-6"
            >
              <span className="text-sm text-gray-400">Follow me:</span>
              <div className="flex space-x-4">
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
                      className={`p-3 bg-white/10 backdrop-blur-sm rounded-full text-gray-400 transition-all duration-300 hover:bg-white/20 ${social.color}`}
                    >
                      <Icon size={20} />
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
            className="relative h-96 lg:h-[500px] flex items-center justify-center"
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
                className="relative w-64 h-64 overflow-hidden rounded-full shadow-2xl lg:w-80 lg:h-80"
                whileHover={{
                  boxShadow: '0 25px 50px rgba(236, 24, 57, 0.4), 0 0 0 1px rgba(236, 24, 57, 0.3)'
                }}
              >
                <motion.img
                  src="/images/hero.jpg"
                  alt="Sundram Pandey"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
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
                className="absolute -top-6 -right-6"
              >
                <Sparkles size={28} className="text-primary drop-shadow-lg" />
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.8, 0.3],
                  rotate: [360, 180, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4"
              >
                <Star size={20} className="text-accent drop-shadow-lg" />
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
          className="absolute transform -translate-x-1/2 bottom-8 left-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center space-y-4 text-gray-400 cursor-pointer group"
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
          >
            <motion.span
              className="text-sm font-medium transition-all duration-300 group-hover:text-primary group-hover:font-semibold"
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Explore More
            </motion.span>

            <div className="relative">
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  opacity: [1, 0.4, 1],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="transition-all duration-300 group-hover:text-primary group-hover:drop-shadow-lg"
              >
                <ArrowDown size={24} />
              </motion.div>

              {/* Enhanced animated line */}
              <motion.div
                animate={{
                  height: [0, 25, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
                className="absolute top-7 left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent rounded-full"
              />

              {/* Pulsing dot */}
              <motion.div
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
                className="absolute w-2 h-2 transform -translate-x-1/2 rounded-full top-8 left-1/2 bg-primary"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}