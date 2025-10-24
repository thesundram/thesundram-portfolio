'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Globe, Send, Loader, MessageSquare, Clock, CheckCircle, Star, Zap } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [focusedField, setFocusedField] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Me',
      value: 'Click to Call Now',
      link: 'tel:+917897403349',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Mail,
      title: 'Email Me',
      value: 'Click to Email Now',
      link: 'mailto:thesundram29@gmail.com',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Click to Locate Me',
      link: 'http://maps.google.com/?q=Mumbai, India',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Globe,
      title: 'Website',
      value: 'Click to Visit Now',
      link: 'https://thesundram.netlify.app',
      color: 'from-purple-500 to-indigo-500'
    }
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name')
      setIsSubmitting(false)
      return
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email')
      setIsSubmitting(false)
      return
    }
    if (!formData.subject.trim()) {
      toast.error('Please enter a subject')
      setIsSubmitting(false)
      return
    }
    if (!formData.message.trim()) {
      toast.error('Please enter your message')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Message sent successfully! 🚀')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-20 overflow-hidden lg:ml-64 xl:ml-72">
      <Toaster position="top-right" />
      
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-gray-900/50"></div>
      <motion.div 
        className="absolute rounded-full top-20 right-20 w-96 h-96 bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute rounded-full bottom-20 left-20 w-80 h-80 bg-accent/5 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      
      <div className="container relative z-10 px-6 mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold lg:text-5xl orbitron gradient-text">Let&apos;s Work Together</h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent"></div>
          <p className="max-w-3xl mx-auto mt-6 text-xl leading-relaxed text-gray-300">
            Ready to bring your ideas to life? I&apos;m here to help you build amazing digital experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <motion.div 
              className="flex items-center px-4 py-2 space-x-2 border rounded-full bg-green-500/20 border-green-500/30"
              whileHover={{ scale: 1.05 }}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div 
                className="w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-green-400">Available for new projects</span>
            </motion.div>
            <motion.div 
              className="flex items-center px-4 py-2 space-x-2 border rounded-full bg-blue-500/20 border-blue-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <Clock size={14} className="text-blue-400" />
              <span className="text-sm font-medium text-blue-400">
                {currentTime.toLocaleTimeString('en-US', { 
                  timeZone: 'Asia/Kolkata',
                  hour12: true,
                  hour: '2-digit',
                  minute: '2-digit'
                })} IST
              </span>
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Quick Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-6 mb-16 md:grid-cols-2 lg:grid-cols-4"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -8, rotateY: 5 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="relative p-6 overflow-hidden text-center transition-all duration-500 border group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/10 rounded-2xl hover:border-primary/30"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  
                  <motion.div
                    className="absolute w-2 h-2 rounded-full top-2 right-2 bg-primary/60"
                    animate={{
                      scale: hoveredCard === index ? [1, 1.5, 1] : 1,
                      opacity: hoveredCard === index ? [0.6, 1, 0.6] : 0.3
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  
                  <motion.div 
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center shadow-lg relative z-10`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon size={28} className="text-white" />
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-white/20"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: hoveredCard === index ? 1 : 0, 
                        opacity: hoveredCard === index ? 1 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  
                  <h4 className="relative z-10 mb-2 font-bold text-white transition-colors group-hover:text-primary">
                    {info.title}
                  </h4>
                  <p className="relative z-10 text-sm text-gray-400 transition-colors group-hover:text-gray-300">
                    {info.value}
                  </p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: hoveredCard === index ? 1 : 0, 
                      y: hoveredCard === index ? 0 : 10 
                    }}
                    className="absolute transform -translate-x-1/2 bottom-2 left-1/2"
                  >
                    <div className="flex items-center space-x-1 text-xs text-primary">
                      <Zap size={10} />
                      <span>Click to connect</span>
                    </div>
                  </motion.div>
                </motion.a>
              )
            })}
          </motion.div>

          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Left Side - Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">Ready to Start?</h3>
                <p className="text-lg leading-relaxed text-gray-300">
                  I&apos;m passionate about creating digital solutions that make a difference. 
                  Whether you need a website, mobile app, or custom software, I&apos;m here to help.
                </p>
              </div>

              {/* Why Choose Me */}
              <div className="space-y-4">
                <h4 className="mb-4 text-xl font-semibold text-white">Why Work With Me?</h4>
                {[
                  { icon: '⚡', title: 'Fast Delivery', desc: 'Quick turnaround without compromising quality' },
                  { icon: '🎯', title: 'Focused Approach', desc: 'Understanding your needs and delivering exactly what you want' },
                  { icon: '🚀', title: 'Modern Tech', desc: 'Using latest technologies for best performance' },
                  { icon: '💬', title: '24/7 Support', desc: 'Always available for questions and updates' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="flex items-start p-4 space-x-4 transition-all duration-300 border rounded-xl bg-white/5 border-white/10 hover:border-primary/20"
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h5 className="font-semibold text-white">{item.title}</h5>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Response Time */}
              <motion.div 
                className="relative p-6 overflow-hidden border bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30 rounded-2xl"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 rounded-full bg-primary/10 blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center mb-2 space-x-3">
                    <motion.div 
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="font-semibold text-white">Quick Response Guaranteed</span>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap size={16} className="text-yellow-400" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-gray-300">
                    I typically respond within 2-4 hours during business hours
                  </p>
                  <div className="flex items-center mt-3 space-x-4 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <CheckCircle size={12} className="text-green-400" />
                      <span>24/7 Support</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star size={12} className="text-yellow-400" />
                      <span>5.0 Rating</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 border bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/10 rounded-2xl"
            >
              <div className="flex items-center mb-6 space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl">
                  <Send size={20} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Send Message</h3>
              </div>
            
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="grid gap-6 md:grid-cols-2">
                <motion.div
                  className="space-y-2"
                  animate={{ scale: focusedField === 'name' ? 1.02 : 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.label 
                    className="text-sm font-medium text-gray-300"
                    animate={{ color: focusedField === 'name' ? '#ec1839' : '#d1d5db' }}
                  >
                    Name
                  </motion.label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg bg-white/10 border-white/20 focus:border-primary focus:outline-none focus:bg-white/15"
                      placeholder="Your Name"
                      required
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'name' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
                
                <motion.div
                  className="space-y-2"
                  animate={{ scale: focusedField === 'email' ? 1.02 : 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.label 
                    className="text-sm font-medium text-gray-300"
                    animate={{ color: focusedField === 'email' ? '#ec1839' : '#d1d5db' }}
                  >
                    Email
                  </motion.label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg bg-white/10 border-white/20 focus:border-primary focus:outline-none focus:bg-white/15"
                      placeholder="your.email@example.com"
                      required
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'email' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="space-y-2"
                animate={{ scale: focusedField === 'subject' ? 1.02 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.label 
                  className="text-sm font-medium text-gray-300"
                  animate={{ color: focusedField === 'subject' ? '#ec1839' : '#d1d5db' }}
                >
                  Subject
                </motion.label>
                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg bg-white/10 border-white/20 focus:border-primary focus:outline-none focus:bg-white/15"
                    placeholder="Project Discussion"
                    required
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: focusedField === 'subject' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              <motion.div
                className="space-y-2"
                animate={{ scale: focusedField === 'message' ? 1.02 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.label 
                  className="text-sm font-medium text-gray-300"
                  animate={{ color: focusedField === 'message' ? '#ec1839' : '#d1d5db' }}
                >
                  Message
                </motion.label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={6}
                    className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg resize-none bg-white/10 border-white/20 focus:border-primary focus:outline-none focus:bg-white/15"
                    placeholder="Tell me about your project..."
                    required
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: focusedField === 'message' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(236, 24, 57, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="relative flex items-center justify-center w-full px-8 py-4 space-x-2 overflow-hidden font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <motion.div
                  className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-accent to-primary group-hover:opacity-100"
                />
                
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="relative z-10 flex items-center space-x-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader size={20} />
                      </motion.div>
                      <span>Sending Message...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="relative z-10 flex items-center space-x-2"
                    >
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Send size={20} />
                      </motion.div>
                      <span>Send Message 🚀</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              
              <p className="mt-4 text-sm text-center text-gray-400">
                Or reach out directly via email or phone above
              </p>
            </motion.form>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="pt-12 mt-12 text-center border-t border-white/10"
        >
          <p className="text-gray-400" suppressHydrationWarning={true}>
            &copy; {new Date().getFullYear()} Sundram Pandey. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Designed and developed by Sundram Pandey
          </p>
        </motion.div>
      </div>
    </section>
  )
}