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
    <section className="relative py-12 overflow-hidden sm:py-20 lg:ml-64 xl:ml-72">
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
      
      <div className="container relative z-10 px-4 mx-auto sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <motion.h2 
            className="relative mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl orbitron gradient-text"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 20px rgba(236, 24, 57, 0.8)"
            }}
          >
            GitHub Stats
            <motion.div
              className="absolute w-3 h-3 bg-green-500 rounded-full -top-2 -right-4"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.h2>
          <motion.div 
            className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={inView ? { width: 96 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <p className="max-w-2xl mx-auto mt-6 text-sm text-gray-300 sm:text-base">
            My coding journey and contributions on GitHub
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-12 sm:gap-6 sm:mb-16 md:grid-cols-4">
          {githubStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.08, 
                  y: -8,
                  rotateY: 5,
                  boxShadow: '0 20px 40px rgba(236, 24, 57, 0.2)'
                }}
                className={`p-3 sm:p-6 bg-gradient-to-br ${stat.color} bg-opacity-10 border border-white/10 backdrop-blur-sm rounded-2xl text-center group hover:border-white/20 transition-all duration-300 relative overflow-hidden`}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon size={20} className="mx-auto mb-2 text-white transition-transform group-hover:scale-110 sm:w-8 sm:h-8 sm:mb-3" />
                </motion.div>
                <motion.div 
                  className="mb-1 text-xl font-bold gradient-text sm:text-3xl"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-gray-400 transition-colors group-hover:text-gray-300 sm:text-sm leading-tight">{stat.label}</div>
                
                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-primary/10 to-accent/10 group-hover:opacity-100 rounded-2xl"
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
          <h3 className="mb-4 text-lg font-bold text-center text-white sm:mb-8 sm:text-2xl">Most Used Languages</h3>
          <div className="grid gap-4 md:gap-8 md:grid-cols-2">
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
              whileHover={{ scale: 1.02, y: -3 }}
              className="relative p-3 overflow-hidden border shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border-white/20 group sm:p-6"
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-t-2xl"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
              
              <h4 className="flex items-center mb-3 text-sm font-semibold text-white transition-colors group-hover:text-primary sm:mb-4 sm:text-lg">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Calendar className="mr-2" size={16} />
                </motion.div>
                Recent Activity
              </h4>
              <div className="space-y-2 sm:space-y-4">
                {[
                  { color: 'bg-green-500', text: 'Pushed to thesundram-portfolio', time: '2 hours ago' },
                  { color: 'bg-blue-500', text: 'Created new repository', time: '1 day ago' },
                  { color: 'bg-purple-500', text: 'Starred a repository', time: '3 days ago' },
                  { color: 'bg-orange-500', text: 'Opened pull request', time: '1 week ago' }
                ].map((activity, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center justify-between p-3 transition-colors rounded-lg bg-white/5 hover:bg-white/10 group/item"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.4 + index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div 
                        className={`w-3 h-3 ${activity.color} rounded-full`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      />
                      <span className="text-xs text-gray-300 transition-colors group-hover/item:text-white sm:text-sm">{activity.text}</span>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
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
          className="mt-8 text-center sm:mt-12"
        >
          <motion.a
            href="https://github.com/thesundram"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.08, 
              boxShadow: '0 15px 40px rgba(236, 24, 57, 0.4)',
              y: -5
            }}
            whileTap={{ scale: 0.92 }}
            className="relative inline-flex items-center px-6 py-3 space-x-2 overflow-hidden font-bold text-white transition-all duration-500 rounded-full shadow-2xl bg-gradient-to-r from-primary via-accent to-primary hover:shadow-xl group sm:px-10 sm:py-5 sm:space-x-3"
          >
            <motion.div
              className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-accent via-primary to-accent group-hover:opacity-100"
            />
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Github size={18} className="relative z-10 sm:w-[22px] sm:h-[22px]" />
            </motion.div>
            <span className="relative z-10 text-sm sm:text-lg">View GitHub Profile</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}