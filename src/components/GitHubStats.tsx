'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Star, GitFork, Users, Calendar, Code, ExternalLink } from 'lucide-react'
import SectionBackground from './SectionBackground'

export default function GitHubStats() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [stats, setStats] = useState({
    repos: '35+',
    stars: '1.2k+',
    followers: '500+',
    contributions: '2.5k+'
  })
  const [events, setEvents] = useState([
    { action: 'Committed to', repo: 'thesundram-portfolio', time: 'Loading...', bg: 'bg-green-600/20 text-green-600 dark:text-green-400 border-green-600/30' },
    { action: 'Opened Issue in', repo: 'nextjs-starter', time: 'Loading...', bg: 'bg-orange-600/20 text-orange-600 dark:text-orange-400 border-orange-600/30' },
    { action: 'Starred', repo: 'shadcn/ui', time: 'Loading...', bg: 'bg-yellow-600/20 text-yellow-600 dark:text-yellow-400 border-yellow-600/30' },
  ])

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const userResponse = await fetch('https://api.github.com/users/thesundram')
        if (userResponse.ok) {
          const userData = await userResponse.json()
          setStats(prev => ({
            ...prev,
            repos: `${userData.public_repos}+`,
            followers: `${userData.followers}+`
          }))
        }

        const eventsResponse = await fetch('https://api.github.com/users/thesundram/events/public?per_page=3')
        if (eventsResponse.ok) {
          const eventsData = await eventsResponse.json()
          const formattedEvents = eventsData.map((event: any) => {
            let action = 'Activity in'
            if (event.type === 'PushEvent') action = 'Pushed to'
            if (event.type === 'CreateEvent') action = 'Created'
            if (event.type === 'WatchEvent') action = 'Starred'
            if (event.type === 'IssueCommentEvent') action = 'Commented on'

            const time = new Date(event.created_at).toLocaleDateString(undefined, {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            })

            let bg = 'bg-blue-600/20 text-blue-600 dark:text-blue-400 border-blue-600/30'
            if (action === 'Pushed to') bg = 'bg-green-600/20 text-green-600 dark:text-green-400 border-green-600/30'
            if (action === 'Starred') bg = 'bg-yellow-600/20 text-yellow-600 dark:text-yellow-400 border-yellow-600/30'

            return {
              action,
              repo: event.repo.name.split('/')[1],
              time,
              bg
            }
          })
          setEvents(formattedEvents)
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
      }
    }

    fetchGitHubData()
  }, [])

  const githubStats = [
    { icon: Github, label: 'Repositories', value: stats.repos, color: 'from-blue-500 to-indigo-600' },
    { icon: Star, label: 'Total Stars', value: stats.stars, color: 'from-amber-400 to-orange-500' },
    { icon: Users, label: 'Followers', value: stats.followers, color: 'from-emerald-400 to-teal-500' },
    { icon: GitFork, label: 'Contributions', value: stats.contributions, color: 'from-purple-500 to-pink-500' }
  ]

  const languages = [
    { name: 'JavaScript', percentage: 40, color: 'bg-[#f7df1e]' }, // JS Yellow
    { name: 'TypeScript', percentage: 30, color: 'bg-[#3178c6]' }, // TS Blue
    { name: 'Python', percentage: 15, color: 'bg-[#3776ab]' },     // Python Blue
    { name: 'Dart', percentage: 10, color: 'bg-[#0175c2]' },       // Dart Blue
    { name: 'HTML/CSS', percentage: 5, color: 'bg-[#e34f26]' }     // HTML Orange
  ]

  return (
    <section id="github-stats" className="relative py-20 overflow-hidden lg:ml-72">
      {/* Dynamic Background */}
      {/* Dynamic Background */}
      <SectionBackground />

      <div className="container relative z-10 px-4 mx-auto sm:px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center mb-3 space-x-3">
            <Github className="text-gray-900 dark:text-white" size={32} />
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl orbitron gradient-text">
              GitHub <span className="text-gray-900 dark:text-white">Activity</span>
            </h2>
          </div>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent" />
          <p className="max-w-2xl mx-auto mt-6 text-gray-600 dark:text-gray-400">
            Open source contributions, coding streaks, and project statistics.
          </p>
        </motion.div>

        {/* 3D Glass Cards Grid */}
        <div className="grid grid-cols-2 gap-4 mb-16 lg:grid-cols-4 sm:gap-6">
          {githubStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group perspective-1000"
              >
                <div className={`p-6 text-center border shadow-xl dark:shadow-2xl bg-white dark:bg-white/[0.05] backdrop-blur-xl rounded-2xl border-gray-200 dark:border-white/20 overflow-hidden relative z-10 h-full flex flex-col items-center justify-center`}>

                  {/* Glowing Background on Hover */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${stat.color}`} />

                  {/* Icon */}
                  <div className={`p-4 mb-4 rounded-full bg-gradient-to-br ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} className="text-white" />
                  </div>

                  {/* Value */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">
                    {stat.value}
                  </h3>

                  {/* Label */}
                  <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Languages & Activity Graph */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* Language Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="p-8 border shadow-xl dark:shadow-2xl bg-white dark:bg-black/40 backdrop-blur-md rounded-3xl border-gray-200 dark:border-white/10"
          >
            <h3 className="flex items-center mb-6 text-xl font-bold text-gray-900 dark:text-white">
              <Code className="mr-2 text-primary" /> Most Used Languages
            </h3>
            <div className="space-y-5">
              {languages.map((lang, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-600 dark:text-gray-300">{lang.name}</span>
                    <span className="text-gray-500 dark:text-gray-400">{lang.percentage}%</span>
                  </div>
                  <div className="h-2 overflow-hidden bg-gray-200 dark:bg-gray-800 rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${lang.percentage}%` } : {}}
                      transition={{ delay: 0.6 + index * 0.1, duration: 1 }}
                      className={`h-full ${lang.color} shadow-[0_0_10px_currentColor]`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* GitHub Activity Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="relative overflow-hidden border shadow-xl dark:shadow-2xl bg-white dark:bg-white/[0.05] rounded-3xl border-gray-200 dark:border-white/20 group"
          >
            {/* Decorative Header */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600" />

            <div className="p-8">
              <h3 className="flex items-center mb-6 text-xl font-bold text-gray-900 dark:text-white">
                <Calendar className="mr-2 text-accent" /> Recent Activity
              </h3>

              <div className="space-y-4">
                {events.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                    className="flex items-center justify-between p-3 transition-colors rounded-xl bg-gray-50 dark:bg-white/5"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.action} <span className="font-bold text-gray-900 dark:text-white">{item.repo}</span></span>
                      <span className="text-xs text-gray-500 dark:text-gray-500">{item.time}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${item.bg.split(' ')[0].replace('/20', '').replace('-600', '-500')}`} />
                  </motion.div>
                ))}
              </div>

              {/* View Profile Button */}
              <motion.a
                href="https://github.com/thesundram"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-4 mt-8 text-sm font-bold text-gray-900 dark:text-white transition-all rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 hover:scale-105"
                whileTap={{ scale: 0.98 }}
              >
                View Full Profile <ExternalLink size={16} className="ml-2" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}