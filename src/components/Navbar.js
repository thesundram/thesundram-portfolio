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
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
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
        <div className="p-8">
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
        <div className="flex-1 px-6">
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
        <div className="p-6 space-y-4 border-t border-white/10">
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
            <span className="text-green-400">Available for work</span>
          </motion.div>
          
          {/* Enhanced Social Links */}
          <div className="space-y-3">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-center text-gray-400"
            >
              Connect with me
            </motion.p>
            
            <div className="flex justify-center space-x-2">
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
            <p className="mt-1">Made with ❤️ in Mumbai</p>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-lg border-b border-primary/20' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="flex items-center space-x-2"
          >
            {/* Mobile Logo */}
            <motion.div
              whileHover={{ 
                boxShadow: "0 0 20px rgba(236, 24, 57, 0.5)",
                rotate: 360
              }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center w-10 h-10 rounded-lg shadow-lg bg-gradient-to-br from-primary to-accent"
            >
              <span className="text-sm font-bold text-white orbitron">SP</span>
            </motion.div>
            
            <motion.span
              className="text-xl font-bold uppercase orbitron gradient-text"
              whileHover={{ 
                textShadow: "0 0 10px #ec1839"
              }}
            >
              theSundram
            </motion.span>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 border rounded-lg bg-white/10 backdrop-blur-sm border-white/20"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed left-0 right-0 z-40 border-b top-16 bg-black/95 backdrop-blur-lg border-primary/20 lg:hidden"
          >
            <div className="p-4">
              <ul className="space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.href.substring(1)
                  
                  return (
                    <motion.li
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-primary'
                            : 'hover:bg-white/5 text-gray-300'
                        }`}
                      >
                        <Icon size={18} />
                        <span>{item.name}</span>
                      </button>
                    </motion.li>
                  )
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}