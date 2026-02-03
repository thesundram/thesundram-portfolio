'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Smartphone, Palette, Search, Database, Cloud, Shield, Bot, ArrowRight, CheckCircle, Star } from 'lucide-react'
import SectionBackground from './SectionBackground'

export default function Services() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [hoveredService, setHoveredService] = useState(null)

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Modern responsive websites with React, Next.js, and cutting-edge technologies.',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.1,
      features: ['React & Next.js', 'Responsive Design', 'SEO Optimized'],
      price: 'Starting $500'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Cross-platform mobile apps using React Native and Flutter for iOS & Android.',
      color: 'from-green-500 to-emerald-500',
      delay: 0.2,
      features: ['React Native', 'Flutter & Dart', 'Cross-platform'],
      price: 'Starting $800'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive user interfaces that provide exceptional user experiences.',
      color: 'from-purple-500 to-pink-500',
      delay: 0.3,
      features: ['Figma Design', 'Prototyping', 'User Research'],
      price: 'Starting $300'
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: 'Scalable APIs and databases with Node.js, MongoDB, and cloud integration.',
      color: 'from-orange-500 to-red-500',
      delay: 0.4,
      features: ['REST APIs', 'Database Design', 'Authentication'],
      price: 'Starting $600'
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Improve your website visibility and ranking on search engines.',
      color: 'from-yellow-500 to-orange-500',
      delay: 0.5,
      features: ['Technical SEO', 'Content Strategy', 'Analytics'],
      price: 'Starting $200'
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Deploy and manage applications on AWS, Vercel, and other cloud platforms.',
      color: 'from-indigo-500 to-purple-500',
      delay: 0.6,
      features: ['AWS Deployment', 'CI/CD Pipeline', 'Monitoring'],
      price: 'Starting $400'
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Secure your applications with best practices and security implementations.',
      color: 'from-red-500 to-pink-500',
      delay: 0.7,
      features: ['Security Audit', 'Data Protection', 'SSL Setup'],
      price: 'Starting $350'
    },
    {
      icon: Bot,
      title: 'AI Integration',
      description: 'Integrate AI and machine learning capabilities into your applications.',
      color: 'from-teal-500 to-blue-500',
      delay: 0.8,
      features: ['ChatBot Integration', 'API Integration', 'Custom AI'],
      price: 'Starting $700'
    }
  ]

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 lg:ml-64 xl:ml-72 relative overflow-hidden">
      {/* Enhanced Background */}
      {/* Enhanced Background */}
      <SectionBackground />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold orbitron gradient-text mb-3 sm:mb-4">What I Do</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full sm:w-20 sm:h-1 md:w-24"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mt-4 sm:mt-6 max-w-3xl mx-auto leading-relaxed">
            I transform ideas into digital reality with cutting-edge technologies and creative solutions
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4 sm:gap-3 sm:mt-6 md:gap-4 md:mt-8">
            <motion.div
              className="flex items-center space-x-1 px-3 py-1.5 bg-primary/20 border border-primary/30 rounded-full sm:space-x-2 sm:px-4 sm:py-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-primary text-xs font-medium sm:text-sm">💡 Custom solutions</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-1 px-3 py-1.5 bg-accent/20 border border-accent/30 rounded-full sm:space-x-2 sm:px-4 sm:py-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-accent text-xs font-medium sm:text-sm">⚡ Fast delivery</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-1 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full sm:space-x-2 sm:px-4 sm:py-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-green-400 text-xs font-medium sm:text-sm">🏆 Quality guaranteed</span>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 md:mb-16">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: service.delay, duration: 0.6 }}
                whileHover={{ y: -15, scale: 1.05, rotateY: 5 }}
                onHoverStart={() => setHoveredService(index)}
                onHoverEnd={() => setHoveredService(null)}
                className="group relative p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-500 overflow-hidden cursor-pointer sm:p-6"
              >
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredService === index ? 0.15 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Floating particles */}
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 bg-primary/60 rounded-full"
                  animate={{
                    scale: hoveredService === index ? [1, 1.5, 1] : 1,
                    opacity: hoveredService === index ? [0.6, 1, 0.6] : 0.3
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center shadow-lg sm:w-14 sm:h-14 md:w-16 md:h-16`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon size={20} className="text-white sm:w-6 sm:h-6 md:w-7 md:h-7" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: hoveredService === index ? 1 : 0, scale: hoveredService === index ? 1 : 0 }}
                      className="flex items-center space-x-1"
                    >
                      <Star size={14} className="text-yellow-400 fill-current sm:w-4 sm:h-4" />
                      <span className="text-xs text-gray-300 sm:text-sm">4.9</span>
                    </motion.div>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors sm:text-xl sm:mb-3">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-3 text-xs sm:text-sm sm:mb-4">
                    {service.description}
                  </p>

                  {/* Service features */}
                  <motion.div
                    className="space-y-1 mb-3 sm:space-y-2 sm:mb-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredService === index ? 1 : 0,
                      height: hoveredService === index ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center space-x-1 text-xs text-gray-300 sm:space-x-2 sm:text-sm"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{
                          x: hoveredService === index ? 0 : -10,
                          opacity: hoveredService === index ? 1 : 0
                        }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <CheckCircle size={12} className="text-green-400 sm:w-[14px] sm:h-[14px]" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <motion.span
                      className="text-primary font-semibold text-xs sm:text-sm"
                      animate={{ scale: hoveredService === index ? 1.05 : 1 }}
                    >
                      {service.price}
                    </motion.span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 bg-primary/20 rounded-full hover:bg-primary/30"
                    >
                      <ArrowRight size={14} className="text-primary sm:w-4 sm:h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10 sm:p-8">
            <motion.h3
              className="text-xl font-bold text-white mb-3 sm:text-2xl sm:mb-4"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ready to Start Your Project?
            </motion.h3>
            <p className="text-sm text-gray-300 mb-4 max-w-2xl mx-auto sm:text-base sm:mb-6">
              Get a free consultation and detailed project estimate. Let&apos;s turn your ideas into reality!
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-4 sm:gap-4 sm:mb-6">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(236, 24, 57, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-accent px-6 py-3 rounded-full text-sm text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 sm:px-8 sm:py-4 sm:text-base"
              >
                <span>Get Free Quote</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                </motion.div>
              </motion.a>

              <motion.a
                href="tel:+917897403349"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 border-2 border-primary/30 px-6 py-3 rounded-full text-sm text-white font-semibold hover:bg-primary/10 transition-all duration-300 sm:px-8 sm:py-4 sm:text-base"
              >
                <span>Call Now</span>
              </motion.a>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400 sm:gap-6 sm:text-sm">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <CheckCircle size={14} className="text-green-400 sm:w-4 sm:h-4" />
                <span>Free consultation</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <CheckCircle size={14} className="text-green-400 sm:w-4 sm:h-4" />
                <span>24-48h response</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <CheckCircle size={14} className="text-green-400 sm:w-4 sm:h-4" />
                <span>Competitive rates</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}