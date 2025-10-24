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
    <section className="relative py-20 overflow-hidden lg:ml-64 xl:ml-72">
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
          <motion.h2 
            className="relative mb-4 text-4xl font-bold lg:text-5xl orbitron gradient-text"
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
          <p className="max-w-2xl mx-auto mt-6 text-gray-300">
            My coding journey and contributions on GitHub
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-16 sm:gap-6 md:grid-cols-4">
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
                className={`p-4 sm:p-6 bg-gradient-to-br ${stat.color} bg-opacity-10 border border-white/10 backdrop-blur-sm rounded-2xl text-center group hover:border-white/20 transition-all duration-300 relative overflow-hidden`}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon size={24} className="mx-auto mb-3 text-white transition-transform group-hover:scale-110 sm:w-8 sm:h-8" />
                </motion.div>
                <motion.div 
                  className="mb-1 text-2xl font-bold gradient-text sm:text-3xl"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-gray-400 transition-colors group-hover:text-gray-300 sm:text-sm">{stat.label}</div>
                
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
          <h3 className="mb-6 text-xl font-bold text-center text-white sm:mb-8 sm:text-2xl">Most Used Languages</h3>
          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            <div className="space-y-4">
              {languages.map((lang, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">{lang.name}</span>
                    <span className="font-semibold text-primary">{lang.percentage}%</span>
                  </div>
                  <div className="h-3 overflow-hidden bg-gray-700 rounded-full">
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
              className="relative p-4 overflow-hidden border shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border-white/20 group sm:p-6"
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-t-2xl"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
              
              <h4 className="flex items-center mb-4 text-base font-semibold text-white transition-colors group-hover:text-primary sm:text-lg">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Calendar className="mr-2" size={20} />
                </motion.div>
                Recent Activity
              </h4>
              <div className="space-y-4">
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
          className="mt-12 text-center"
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
            className="relative inline-flex items-center px-10 py-5 space-x-3 overflow-hidden font-bold text-white transition-all duration-500 rounded-full shadow-2xl bg-gradient-to-r from-primary via-accent to-primary hover:shadow-xl group"
          >
            <motion.div
              className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-accent via-primary to-accent group-hover:opacity-100"
            />
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Github size={22} className="relative z-10" />
            </motion.div>
            <span className="relative z-10 text-lg">View GitHub Profile</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}