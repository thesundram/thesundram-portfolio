'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Smartphone, Palette, Search, Database, Cloud, Shield, Bot } from 'lucide-react'

export default function Services() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Modern responsive websites with React, Next.js, and cutting-edge technologies.',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.1
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Cross-platform mobile apps using React Native and Flutter for iOS & Android.',
      color: 'from-green-500 to-emerald-500',
      delay: 0.2
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive user interfaces that provide exceptional user experiences.',
      color: 'from-purple-500 to-pink-500',
      delay: 0.3
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: 'Scalable APIs and databases with Node.js, MongoDB, and cloud integration.',
      color: 'from-orange-500 to-red-500',
      delay: 0.4
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Improve your website visibility and ranking on search engines.',
      color: 'from-yellow-500 to-orange-500',
      delay: 0.5
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Deploy and manage applications on AWS, Vercel, and other cloud platforms.',
      color: 'from-indigo-500 to-purple-500',
      delay: 0.6
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Secure your applications with best practices and security implementations.',
      color: 'from-red-500 to-pink-500',
      delay: 0.7
    },
    {
      icon: Bot,
      title: 'AI Integration',
      description: 'Integrate AI and machine learning capabilities into your applications.',
      color: 'from-teal-500 to-blue-500',
      delay: 0.8
    }
  ]

  return (
    <section id="services" className="py-20 lg:ml-64 xl:ml-72 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-gray-900/50"></div>
      <motion.div 
        className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold orbitron gradient-text mb-4">What I Do</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto leading-relaxed">
            I transform ideas into digital reality with cutting-edge technologies and creative solutions
          </p>
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full">
              <span className="text-primary text-sm font-medium">💡 Custom solutions for every project</span>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: service.delay, duration: 0.6 }}
                whileHover={{ y: -15, scale: 1.05, rotateY: 5 }}
                className="group relative p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  {/* Service features */}
                  <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>Fast delivery</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>24/7 support</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(236, 24, 57, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-accent px-8 py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span>Let&apos;s Discuss Your Project</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.a>
          <p className="text-gray-400 text-sm mt-4">Free consultation • Quick response • Competitive rates</p>
        </motion.div>
      </div>
    </section>
  )
}