'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Star, GitFork, Users, Calendar } from 'lucide-react'

export default function GitHubStats() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const githubStats = [
    { icon: Github, label: 'Repositories', value: '35+', color: 'from-gray-600 to-gray-800' },
    { icon: Star, label: 'Total Stars', value: '1000+', color: 'from-yellow-500 to-orange-500' },
    { icon: Users, label: 'Followers', value: '500+', color: 'from-blue-500 to-cyan-500' },
    { icon: GitFork, label: 'Following', value: '30+', color: 'from-green-500 to-emerald-500' }
  ]

  const languages = [
    { name: 'JavaScript', percentage: 45, color: 'bg-yellow-500' },
    { name: 'TypeScript', percentage: 25, color: 'bg-blue-500' },
    { name: 'Python', percentage: 15, color: 'bg-green-500' },
    { name: 'Dart', percentage: 10, color: 'bg-cyan-500' },
    { name: 'Others', percentage: 5, color: 'bg-gray-500' }
  ]

  return (
    <section className="relative py-8 overflow-hidden sm:py-16 lg:py-20 lg:ml-64 xl:ml-72">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-gray-900/50"></div>
      <motion.div 
        className="absolute rounded-full top-10 right-5 w-48 h-48 sm:top-20 sm:right-20 sm:w-96 sm:h-96 bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute rounded-full bottom-10 left-5 w-40 h-40 sm:bottom-20 sm:left-20 sm:w-80 sm:h-80 bg-accent/5 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      
      <div className="container relative z-10 px-3 mx-auto sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-8 text-center sm:mb-12 lg:mb-16"
        >
          <motion.h2 
            className="relative mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl lg:text-4xl xl:text-5xl orbitron gradient-text"
            whileHover={{
              scale: 1.02,
              textShadow: "0 0 20px rgba(236, 24, 57, 0.8)"
            }}
          >
            GitHub Stats
            <motion.div
              className="absolute w-2 h-2 bg-green-500 rounded-full -top-1 -right-3 sm:w-3 sm:h-3 sm:-top-2 sm:-right-4"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.h2>
          <motion.div 
            className="w-16 h-1 mx-auto rounded-full sm:w-24 bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={inView ? { width: '4rem' } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <p className="max-w-2xl mx-auto mt-4 text-xs text-gray-300 sm:mt-6 sm:text-sm lg:text-base">
            My coding journey and contributions on GitHub
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-2 mb-8 sm:gap-4 sm:mb-12 lg:mb-16 lg:grid-cols-4">
          {githubStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -4,
                  boxShadow: '0 10px 25px rgba(236, 24, 57, 0.2)'
                }}
                whileTap={{ scale: 0.98 }}
                className={`p-3 sm:p-4 lg:p-6 bg-gradient-to-br ${stat.color} bg-opacity-10 border border-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl text-center group hover:border-white/20 transition-all duration-300 relative overflow-hidden`}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon size={18} className="mx-auto mb-2 text-white transition-transform group-hover:scale-110 sm:w-6 sm:h-6 lg:w-8 lg:h-8 sm:mb-3" />
                </motion.div>
                <motion.div 
                  className="mb-1 text-lg font-bold gradient-text sm:text-xl lg:text-2xl xl:text-3xl"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-gray-400 transition-colors group-hover:text-gray-300 sm:text-sm leading-tight">{stat.label}</div>
                
                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-primary/10 to-accent/10 group-hover:opacity-100 rounded-xl sm:rounded-2xl"
                />
              </motion.div>
            )
          })}
        </div>

        {/* Language Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="mb-4 text-lg font-bold text-center text-white sm:mb-6 lg:mb-8 sm:text-xl lg:text-2xl">Most Used Languages</h3>
          <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-2">
            <div className="space-y-3 sm:space-y-4">
              {languages.map((lang, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="space-y-1.5 sm:space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white sm:text-base">{lang.name}</span>
                    <span className="text-sm font-semibold text-primary sm:text-base">{lang.percentage}%</span>
                  </div>
                  <div className="h-2 overflow-hidden bg-gray-700 rounded-full sm:h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${lang.percentage}%` } : {}}
                      transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: "easeOut" }}
                      className={`h-full ${lang.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Enhanced GitHub Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className="relative p-3 mt-4 overflow-hidden border shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl border-white/20 group sm:p-4 lg:p-6 lg:mt-0"
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-t-xl sm:rounded-t-2xl"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
              
              <h4 className="flex items-center mb-3 text-sm font-semibold text-white transition-colors group-hover:text-primary sm:mb-4 sm:text-base lg:text-lg">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Calendar className="mr-2" size={14} />
                </motion.div>
                Recent Activity
              </h4>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { color: 'bg-green-500', text: 'Pushed to portfolio', time: '2h' },
                  { color: 'bg-blue-500', text: 'Created repository', time: '1d' },
                  { color: 'bg-purple-500', text: 'Starred repo', time: '3d' },
                  { color: 'bg-orange-500', text: 'Opened PR', time: '1w' }
                ].map((activity, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center justify-between p-2 transition-colors rounded-lg bg-white/5 hover:bg-white/10 group/item sm:p-3"
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.4 + index * 0.1 }}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <motion.div 
                        className={`w-2 h-2 sm:w-3 sm:h-3 ${activity.color} rounded-full flex-shrink-0`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      />
                      <span className="text-xs text-gray-300 transition-colors group-hover/item:text-white sm:text-sm truncate">{activity.text}</span>
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* GitHub Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-6 text-center sm:mt-8 lg:mt-12"
        >
          <motion.a
            href="https://github.com/thesundram"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 10px 30px rgba(236, 24, 57, 0.4)',
              y: -3
            }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center px-5 py-3 space-x-2 overflow-hidden font-bold text-white transition-all duration-500 rounded-full shadow-2xl bg-gradient-to-r from-primary via-accent to-primary hover:shadow-xl group sm:px-8 sm:py-4 lg:px-10 lg:py-5 sm:space-x-3"
          >
            <motion.div
              className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-accent via-primary to-accent group-hover:opacity-100"
            />
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Github size={16} className="relative z-10 sm:w-5 sm:h-5 lg:w-[22px] lg:h-[22px]" />
            </motion.div>
            <span className="relative z-10 text-sm sm:text-base lg:text-lg">View GitHub Profile</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}