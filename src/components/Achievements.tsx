'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Star, ExternalLink, ThumbsUp, GraduationCap, Trophy, Rocket, BarChart2, Code, Medal, Target } from 'lucide-react'
import SectionBackground from './SectionBackground'

export default function Achievements() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const achievements = [
    {
      icon: <GraduationCap size={32} />,
      title: 'Full Stack Development Certification',
      issuer: 'LiveWire Training Institute',
      date: '2024',
      description: 'Comprehensive certification in MERN stack development',
      color: 'from-blue-500 to-cyan-500',
      type: 'certification'
    },
    {
      icon: <Trophy size={32} />,
      title: 'Best Intern Award',
      issuer: 'Uttam Infotech Global Ventures',
      date: '2025',
      description: 'Recognized for outstanding performance and dedication',
      color: 'from-yellow-500 to-orange-500',
      type: 'award'
    },
    {
      icon: <Star size={32} />,
      title: 'Project Excellence',
      issuer: 'SaiKet Systems',
      date: '2025',
      description: 'Delivered exceptional full-stack solutions',
      color: 'from-purple-500 to-pink-500',
      type: 'achievement'
    },
    {
      icon: <Rocket size={32} />,
      title: 'React Native Specialist',
      issuer: 'RCAS LLP',
      date: '2025',
      description: 'Expertise in cross-platform mobile development',
      color: 'from-green-500 to-emerald-500',
      type: 'recognition'
    },
    {
      icon: <BarChart2 size={32} />,
      title: 'Advanced Excel Certification',
      issuer: 'STP Computer Education',
      date: '2023',
      description: 'Advanced data analysis and management skills',
      color: 'from-indigo-500 to-purple-500',
      type: 'certification'
    },
    {
      icon: <Code size={32} />,
      title: 'Computer Applications Diploma',
      issuer: 'STP Computer Education',
      date: '2024',
      description: 'Comprehensive computer applications training',
      color: 'from-red-500 to-pink-500',
      type: 'diploma'
    }
  ]

  const stats = [
    { number: '8+', label: 'Certifications', icon: <Trophy size={28} /> },
    { number: '5+', label: 'Awards', icon: <Medal size={28} /> },
    { number: '3+', label: 'Recognitions', icon: <Star size={28} /> },
    { number: '100%', label: 'Success Rate', icon: <Target size={28} /> }
  ]

  return (
    <section id="achievements" className="py-20 overflow-hidden lg:ml-72 relative">
      <SectionBackground />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold orbitron gradient-text mb-3 sm:mb-4">Achievements</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full sm:w-20 sm:h-1 md:w-24"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mt-4 sm:mt-6 max-w-3xl mx-auto leading-relaxed">
            Certifications, awards, and recognitions that showcase my expertise and dedication
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 sm:gap-4 sm:mb-12 md:gap-6 md:mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center group hover:border-primary/30 transition-all duration-300 sm:p-6"
            >
              <div className="text-2xl mb-1 sm:text-3xl sm:mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold gradient-text mb-1 sm:text-3xl">{stat.number}</div>
              <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors sm:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden sm:p-6"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg text-xl sm:w-14 sm:h-14 sm:text-2xl`}>
                    {achievement.icon}
                  </div>
                  <span className={`px-2 py-0.5 text-xs rounded-full sm:px-3 sm:py-1 ${achievement.type === 'certification' ? 'bg-blue-500/20 text-blue-400' :
                    achievement.type === 'award' ? 'bg-yellow-500/20 text-yellow-400' :
                      achievement.type === 'achievement' ? 'bg-purple-500/20 text-purple-400' :
                        achievement.type === 'recognition' ? 'bg-green-500/20 text-green-400' :
                          'bg-gray-500/20 text-gray-400'
                    }`}>
                    {achievement.type}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors sm:text-xl">
                  {achievement.title}
                </h3>

                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <p className="text-sm text-primary font-medium sm:text-base">{achievement.issuer}</p>
                  <span className="text-gray-400 text-xs sm:text-sm">{achievement.date}</span>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mb-3 sm:text-base sm:mb-4">
                  {achievement.description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1 text-xs text-primary hover:text-accent transition-colors opacity-0 group-hover:opacity-100 duration-300 sm:space-x-2 sm:text-sm"
                >
                  <span>Verify</span>
                  <ExternalLink size={12} className="sm:w-[14px] sm:h-[14px]" />
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
          className="text-center mt-8 sm:mt-12 md:mt-16"
        >
          <div className="p-6 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-2xl max-w-2xl mx-auto sm:p-8">
            <h3 className="text-xl font-bold text-white mb-3 sm:text-2xl sm:mb-4">Ready to Achieve More Together?</h3>
            <p className="text-sm text-gray-300 mb-4 sm:text-base sm:mb-6">
              Let&apos;s work together to create something amazing and add more achievements to this list!
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-accent px-6 py-3 rounded-full text-sm text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 sm:px-8 sm:py-4 sm:text-base"
            >
              <span className="text-lg sm:text-xl"><Trophy size={20} /></span>
              <span>Start a Project</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}