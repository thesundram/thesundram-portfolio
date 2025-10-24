'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, User, Briefcase, Mail, Settings, Linkedin, Github, Instagram } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Services', href: '#services', icon: Settings },
  { name: 'Portfolio', href: '#portfolio', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1))
      let currentSection = null
      let minDistance = Infinity
      
      sections.forEach(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const sectionTop = rect.top
          
          // Check if section is prominently visible
          if (sectionTop <= 150 && rect.bottom >= 150) {
            const distance = Math.abs(sectionTop)
            if (distance < minDistance) {
              minDistance = distance
              currentSection = section
            }
          }
        }
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href) => {
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
        className="fixed top-0 left-0 z-50 flex-col hidden w-64 h-full border-r xl:w-72 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-lg border-primary/20 lg:flex"
      >
        {/* Enhanced Logo */}
        <div className="p-4">
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
                className="relative z-10 flex items-center justify-center w-12 h-12 mx-auto mb-3 shadow-2xl bg-gradient-to-br from-primary to-accent rounded-xl"
              >
                <span className="text-lg font-bold text-white orbitron">SP</span>
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
              className="mb-2 text-lg font-bold orbitron gradient-text"
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
              className="mb-3 text-xs tracking-widest text-gray-400 uppercase"
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
          <ul className="space-y-2">
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
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary'
                        : 'hover:bg-white/5 text-gray-300 hover:text-white'
                    }`}
                  >
                    {/* Hover effect background */}
                    <motion.div
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 -z-10"
                    />
                    <Icon 
                      size={20} 
                      className={`transition-all duration-300 ${
                        isActive ? 'text-primary' : 'group-hover:text-primary'
                      }`} 
                    />
                    <span className="font-medium">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="w-2 h-2 ml-auto rounded-full bg-primary"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    
                    {/* Ripple effect */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0.5 }}
                      whileHover={{ scale: 1, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 bg-primary/20 rounded-xl"
                    />
                  </motion.button>
                </motion.li>
              )
            })}
          </ul>
        </div>

        {/* Enhanced Footer */}
        <div className="p-3 space-y-3 border-t border-white/10">
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
                { icon: Instagram, href: 'https://www.instagram.com/the.sun29/', label: 'Instagram', color: 'hover:bg-pink-500/20 hover:border-pink-500/30' }
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
                    <Icon size={18} className="text-gray-300" />
                  </motion.a>
                )
              })}
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-xs text-center text-gray-500">
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
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-500 ${
          scrolled 
            ? 'bg-gradient-to-r from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl border-b border-primary/30 shadow-2xl' 
            : 'bg-gradient-to-r from-transparent via-black/20 to-transparent backdrop-blur-sm'
        }`}
      >
        {/* Animated top border */}
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-accent to-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
        
        <div className="flex items-center justify-between p-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            {/* Enhanced Mobile Logo */}
            <motion.div
              whileHover={{ 
                boxShadow: "0 0 30px rgba(236, 24, 57, 0.6)",
                rotate: 360
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="relative flex items-center justify-center w-12 h-12 overflow-hidden shadow-2xl rounded-xl bg-gradient-to-br from-primary via-accent to-primary"
            >
              {/* Animated background */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 blur-sm"
              />
              <span className="relative z-10 text-lg font-bold text-white orbitron">SP</span>
            </motion.div>
            
            <div className="flex flex-col">
              <motion.span
                className="text-lg font-bold leading-none uppercase orbitron gradient-text"
                whileHover={{ 
                  textShadow: "0 0 15px #ec1839"
                }}
              >
                theSundram
              </motion.span>
              <motion.span 
                className="text-xs tracking-wider text-gray-400 uppercase"
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
            className={`relative p-3 rounded-xl border transition-all duration-300 overflow-hidden ${
              isOpen 
                ? 'bg-primary/20 border-primary/50 text-primary' 
                : 'bg-white/10 border-white/20 text-white hover:bg-primary/10 hover:border-primary/30'
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
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>
      </motion.header>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed left-0 right-0 z-40 border-b shadow-2xl top-16 bg-gradient-to-b from-black/98 via-gray-900/98 to-black/98 backdrop-blur-2xl border-primary/30 lg:hidden"
          >
            {/* Menu background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
            </div>
            
            <div className="relative z-10 p-6">
              {/* Menu header */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 text-center"
              >
                <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Navigation</h3>
                <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-2 rounded-full"></div>
              </motion.div>
              
              <ul className="space-y-3">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.href.substring(1)
                  
                  return (
                    <motion.li
                      key={item.name}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -30, opacity: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <motion.button
                        onClick={() => {
                          console.log('Mobile menu clicked:', item.href)
                          scrollToSection(item.href)
                        }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                          isActive
                            ? 'bg-gradient-to-r from-primary/25 to-accent/25 border border-primary/40 text-primary shadow-lg'
                            : 'hover:bg-white/10 text-gray-300 hover:text-white border border-transparent hover:border-white/20'
                        }`}
                      >
                        {/* Active indicator line */}
                        {isActive && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="absolute top-0 bottom-0 left-0 w-1 rounded-r-full bg-gradient-to-b from-primary to-accent"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        
                        {/* Hover background */}
                        <motion.div
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 -z-10"
                        />
                        
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`p-2 rounded-lg ${
                            isActive 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-white/10 text-gray-400 group-hover:text-primary group-hover:bg-primary/10'
                          }`}
                        >
                          <Icon size={20} />
                        </motion.div>
                        
                        <div className="flex-1 text-left">
                          <span className="text-base font-medium">{item.name}</span>
                          {isActive && (
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              className="h-0.5 bg-gradient-to-r from-primary to-accent rounded-full mt-1"
                            />
                          )}
                        </div>
                        
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="w-2 h-2 rounded-full bg-primary"
                          />
                        )}
                      </motion.button>
                    </motion.li>
                  )
                })}
              </ul>
              
              {/* Mobile menu footer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-4 mt-6 text-center border-t border-white/10"
              >
                <div className="flex items-center justify-center space-x-1 text-xs text-gray-400">
                  <motion.div 
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span>Available for hire </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}