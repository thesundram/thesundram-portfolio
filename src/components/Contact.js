'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Globe, Send, Loader } from 'lucide-react'
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
        className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
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
            Ready to bring your ideas to life? I'm here to help you build amazing digital experiences.
          </p>
          <div className="flex justify-center mt-8">
            <div className="flex items-center px-4 py-2 space-x-2 border rounded-full bg-green-500/20 border-green-500/30">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-400">Available for new projects</span>
            </div>
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
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 text-center transition-all duration-300 border group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/10 rounded-2xl hover:border-primary/30"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <h4 className="mb-2 font-bold text-white transition-colors group-hover:text-primary">
                    {info.title}
                  </h4>
                  <p className="text-sm text-gray-400 transition-colors group-hover:text-gray-300">
                    {info.value}
                  </p>
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

              {/* Response Time */}
              <div className="p-6 border bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30 rounded-2xl">
                <div className="flex items-center mb-2 space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-white">Quick Response Guaranteed</span>
                </div>
                <p className="text-sm text-gray-300">
                  I typically respond within 2-4 hours during business hours
                </p>
              </div>
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
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-white placeholder-gray-400 transition-colors border rounded-lg bg-white/10 border-white/20 focus:border-primary focus:outline-none"
                    placeholder="Your Name"
                    required
                  />
                </motion.div>
                
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-white placeholder-gray-400 transition-colors border rounded-lg bg-white/10 border-white/20 focus:border-primary focus:outline-none"
                    placeholder="your.email@example.com"
                    required
                  />
                </motion.div>
              </div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-300">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-white placeholder-gray-400 transition-colors border rounded-lg bg-white/10 border-white/20 focus:border-primary focus:outline-none"
                  placeholder="Project Discussion"
                  required
                />
              </motion.div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-300">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 text-white placeholder-gray-400 transition-colors border rounded-lg resize-none bg-white/10 border-white/20 focus:border-primary focus:outline-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center w-full px-8 py-4 space-x-2 font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message 🚀</span>
                  </>
                )}
              </motion.button>
              
              <p className="mt-4 text-sm text-center text-gray-400">
                Or reach out directly via email or phone above
              </p>
            </form>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="pt-8 mt-16 text-center border-t border-white/10"
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