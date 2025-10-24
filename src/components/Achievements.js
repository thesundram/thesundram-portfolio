'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Star, ExternalLink } from 'lucide-react'

export default function Achievements() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const achievements = [
    {
      icon: '🎓',
      title: 'Full Stack Development Certification',
      issuer: 'LiveWire Training Institute',
      date: '2024',
      description: 'Comprehensive certification in MERN stack development',
      color: 'from-blue-500 to-cyan-500',
      type: 'certification'
    },
    {
      icon: '🏆',
      title: 'Best Intern Award',
      issuer: 'Uttam Infotech Global Ventures',
      date: '2025',
      description: 'Recognized for outstanding performance and dedication',
      color: 'from-yellow-500 to-orange-500',
      type: 'award'
    },
    {
      icon: '⭐',
      title: 'Project Excellence',
      issuer: 'SaiKet Systems',
      date: '2025',
      description: 'Delivered exceptional full-stack solutions',
      color: 'from-purple-500 to-pink-500',
      type: 'achievement'
    },
    {
      icon: '🚀',
      title: 'React Native Specialist',
      issuer: 'RCAS LLP',
      date: '2025',
      description: 'Expertise in cross-platform mobile development',
      color: 'from-green-500 to-emerald-500',
      type: 'recognition'
    },
    {
      icon: '📊',
      title: 'Advanced Excel Certification',
      issuer: 'STP Computer Education',
      date: '2023',
      description: 'Advanced data analysis and management skills',
      color: 'from-indigo-500 to-purple-500',
      type: 'certification'
    },
    {
      icon: '💻',
      title: 'Computer Applications Diploma',
      issuer: 'STP Computer Education',
      date: '2024',
      description: 'Comprehensive computer applications training',
      color: 'from-red-500 to-pink-500',
      type: 'diploma'
    }
  ]

  const stats = [
    { number: '8+', label: 'Certifications', icon: '🏆' },
    { number: '5+', label: 'Awards', icon: '🥇' },
    { number: '3+', label: 'Recognitions', icon: '⭐' },
    { number: '100%', label: 'Success Rate', icon: '🎯' }
  ]

  return (
    <section className="py-20 lg:ml-72 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5"></div>
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold orbitron gradient-text mb-4">Achievements</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto leading-relaxed">
            Certifications, awards, and recognitions that showcase my expertise and dedication
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center group hover:border-primary/30 transition-all duration-300"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold gradient-text mb-1">{stat.number}</div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-r ${achievement.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg text-2xl`}>
                    {achievement.icon}
                  </div>
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      achievement.type === 'certification' ? 'bg-blue-500/20 text-blue-400' :
                      achievement.type === 'award' ? 'bg-yellow-500/20 text-yellow-400' :
                      achievement.type === 'achievement' ? 'bg-purple-500/20 text-purple-400' :
                      achievement.type === 'recognition' ? 'bg-green-500/20 text-green-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {achievement.type}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {achievement.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-primary font-medium">{achievement.issuer}</p>
                    <span className="text-gray-400 text-sm">{achievement.date}</span>
                  </div>
                  
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {achievement.description}
                  </p>
                  
                  {/* Verify button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 text-sm text-primary hover:text-accent transition-colors opacity-0 group-hover:opacity-100 duration-300"
                  >
                    <span>Verify</span>
                    <ExternalLink size={14} />
                  </motion.button>
                </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <div className="p-8 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Achieve More Together?</h3>
            <p className="text-gray-300 mb-6">
              Let&apos;s work together to create something amazing and add more achievements to this list!
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-accent px-8 py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="text-xl">🏆</span>
              <span>Start a Project</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}