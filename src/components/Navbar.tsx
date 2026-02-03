'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, User, Briefcase, Mail, Settings, Linkedin, Github, Instagram, Facebook, FileText, Download } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Services', href: '#services', icon: Settings },
  { name: 'Portfolio', href: '#portfolio', icon: Briefcase },
  { name: 'Blog', href: '#blog', icon: FileText },
  { name: 'Contact', href: '#contact', icon: Mail },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Scroll state for header styling
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)

    // Intersection Observer for active section
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Active when section is in the middle 20% of viewport
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // "home" section often has id="home" but sometimes Hero components might use different logic.
          // Based on navItems, we expect IDs: home, about, services, portfolio, blog, contact
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // observe all sections
    navItems.forEach(item => {
      const sectionId = item.href.substring(1)
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (href: string) => {
    console.log('Scrolling to:', href)

    // Close mobile menu first
    setIsOpen(false)

    // Wait a bit for menu to close, then scroll
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        console.log('Element found:', element)
        // Immediately set active section on click
        const sectionId = href.substring(1)
        setActiveSection(sectionId)

        // Scroll with offset for mobile header
        const yOffset = -80
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

        window.scrollTo({ top: y, behavior: 'smooth' })
      } else {
        console.log('Element not found for:', href)
        console.log('Available elements with IDs:',
          Array.from(document.querySelectorAll('[id]')).map(el => '#' + el.id)
        )
      }
    }, 100)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 z-50 flex-col hidden w-64 h-full border-r xl:w-72 bg-white/50 dark:bg-black/40 backdrop-blur-xl border-black/5 dark:border-white/5 lg:flex"
      >
        {/* Enhanced Logo */}
        <div className="p-6">
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative text-center"
          >
            {/* Logo Container */}
            <div className="relative inline-block">
              {/* Animated Background */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-xl"
              />

              {/* Main Logo */}
              <motion.div
                whileHover={{
                  textShadow: "0 0 20px #ec1839, 0 0 40px #ec1839",
                  scale: 1.1
                }}
                className="relative z-10 flex items-center justify-center w-16 h-16 mx-auto mb-3 shadow-2xl bg-gradient-to-br from-primary to-accent rounded-xl"
              >
                <span className="text-2xl font-bold text-white orbitron">SP</span>
              </motion.div>

              {/* Orbiting dots */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-20 h-20 mx-auto"
              >
                <div className="absolute top-0 w-2 h-2 transform -translate-x-1/2 rounded-full left-1/2 bg-primary"></div>
                <div className="absolute bottom-0 w-2 h-2 transform -translate-x-1/2 rounded-full left-1/2 bg-accent"></div>
              </motion.div>
            </div>

            {/* Name */}
            <motion.h1
              className="mb-2 text-2xl font-bold orbitron gradient-text"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 10px #ec1839"
              }}
            >
              Sundram Pandey
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 text-sm tracking-widest text-gray-500 dark:text-gray-400 uppercase"
            >
              Software Engineer
            </motion.p>

            {/* Animated underline */}
            <motion.div
              animate={{
                width: ["30px", "50px", "30px"],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="h-0.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"
            />
          </motion.div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4">
          <ul className="space-y-4">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeSection === item.href.substring(1)

              return (
                <motion.li
                  key={item.name}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.button
                    onClick={() => scrollToSection(item.href)}
                    whileHover={{ x: 8, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
                    animate={isActive ? {
                      boxShadow: "0 0 20px rgba(236, 24, 57, 0.2)",
                    } : {}}
                    className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${isActive
                      ? 'text-white font-bold'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                      }`}
                  >
                    {/* Active Background with "Magnetic" feel */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBackground"
                        className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    {/* Hover effect background (inactive) */}
                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 -z-10"
                        layoutId="hoverNavBackground"
                      />
                    )}

                    <Icon
                      size={20}
                      className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                    />
                    <span className="relative z-10 font-medium tracking-wide">{item.name}</span>

                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute right-4 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ zIndex: 10 }}
                      />
                    )}
                  </motion.button>
                </motion.li>
              )
            })}
          </ul>
        </div>

        {/* Enhanced Footer */}
        <div className="p-3 space-y-3 border-t border-gray-200 dark:border-white/10">
          {/* Status Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-2 text-xs"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
            <motion.span
              className="font-medium text-green-400"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Available for work
            </motion.span>
          </motion.div>

          {/* Enhanced Social Links */}
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-3">
              {[
                { icon: Linkedin, href: 'http://linkedin.com/in/thesundram', label: 'LinkedIn', color: 'hover:bg-blue-500/20 hover:border-blue-500/30' },
                { icon: Github, href: 'http://github.com/thesundram', label: 'GitHub', color: 'hover:bg-gray-500/20 hover:border-gray-500/30' },
                { icon: Mail, href: 'mailto:thesundram29@gmail.com', label: 'Email', color: 'hover:bg-red-500/20 hover:border-red-500/30' },
                { icon: Instagram, href: 'https://www.instagram.com/the.sun29/', label: 'Instagram', color: 'hover:bg-pink-500/20 hover:border-pink-500/30' },
                { icon: Facebook, href: 'https://www.facebook.com/thesundram29', label: 'Facebook', color: 'hover:bg-blue-600/20 hover:border-blue-600/30' }
              ].map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.3,
                      y: -3,
                      rotate: 10
                    }}
                    whileTap={{ scale: 0.8 }}
                    className={`w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 transition-all duration-300 ${social.color}`}
                    title={social.label}
                  >
                    <Icon size={18} className="text-gray-500 dark:text-gray-300" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-xs text-center text-gray-500 dark:text-gray-500">
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              suppressHydrationWarning={true}
            >
              &copy; {new Date().getFullYear()} Sundram Pandey
            </motion.p>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-500 ${scrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-primary/20 shadow-lg'
          : 'bg-transparent backdrop-blur-sm'
          }`}
      >
        {/* Animated top border */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        />

        <div className="flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 sm:space-x-3"
          >
            {/* Enhanced Mobile Logo */}
            <motion.div
              whileHover={{
                boxShadow: "0 0 30px rgba(236, 24, 57, 0.6)",
                rotate: 360
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="relative flex items-center justify-center w-10 h-10 overflow-hidden shadow-2xl rounded-xl bg-gradient-to-br from-primary via-accent to-primary sm:w-12 sm:h-12"
            >
              {/* Animated background */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 blur-sm"
              />
              <span className="relative z-10 text-base font-bold text-white orbitron sm:text-lg">SP</span>
            </motion.div>

            <div className="flex flex-col">
              <motion.span
                className="text-base font-bold leading-none uppercase orbitron gradient-text sm:text-lg"
                whileHover={{
                  textShadow: "0 0 15px #ec1839"
                }}
              >
                theSundram
              </motion.span>
              <motion.span
                className="text-xs tracking-wider text-gray-500 dark:text-gray-400 uppercase"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Developer
              </motion.span>
            </div>
          </motion.div>

          {/* Enhanced Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`relative p-2 rounded-xl border transition-all duration-300 overflow-hidden sm:p-3 ${isOpen
              ? 'bg-primary/10 border-primary/50 text-primary'
              : 'bg-white/50 dark:bg-white/10 border-gray-200 dark:border-white/20 text-gray-800 dark:text-white hover:bg-primary/10 hover:border-primary/30'
              }`}
          >
            {/* Button background animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isOpen ? 1 : 0,
                opacity: isOpen ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              {isOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
            </motion.div>
          </motion.button>
        </div>
      </motion.header>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-2xl lg:hidden pt-24"
          >
            {/* Menu background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-center"
              >
                <h3 className="text-sm font-semibold tracking-wider text-gray-400 dark:text-gray-500 uppercase">Menu</h3>
                <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-2 rounded-full"></div>
              </motion.div>

              <ul className="space-y-4">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.href.substring(1)

                  return (
                    <motion.li
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <motion.button
                        onClick={() => {
                          console.log('Mobile menu clicked:', item.href)
                          scrollToSection(item.href)
                        }}
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                          ? 'bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/10'
                          : 'bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-primary dark:hover:text-white border border-gray-100 dark:border-white/5'
                          }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="absolute left-0 w-1 h-full bg-gradient-to-b from-primary to-accent rounded-r-full"
                          />
                        )}

                        <Icon size={22} className={`transition-colors ${isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400 group-hover:text-primary'}`} />
                        <span className="text-lg font-medium">{item.name}</span>

                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(236,24,57,0.6)]" />
                          </motion.div>
                        )}
                      </motion.button>
                    </motion.li>
                  )
                })}
              </ul>

              {/* Mobile Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto pt-8 pb-4 text-center"
              >
                <div className="flex justify-center space-x-6 mb-6">
                  {[Linkedin, Github, Instagram, Mail].map((Icon, i) => (
                    <div key={i} className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-gray-600 dark:text-gray-400">
                      <Icon size={20} />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-400 dark:text-gray-600">
                  © {new Date().getFullYear()} Sundram Pandey
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}