'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Building } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

export default function Timeline({ type, items }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-xl font-bold text-white sm:text-2xl mb-4 sm:mb-6">{type}</h3>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent"></div>

        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative pl-8 sm:pl-12 pb-6 sm:pb-8 last:pb-0"
          >
            {/* Timeline Dot */}
            <motion.div
              className="absolute left-1.5 sm:left-2 top-2 w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full border-2 sm:border-4 border-gray-900"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
            />

            {/* Content Card */}
            <motion.div
              whileHover={{ scale: 1.01, x: 3 }}
              whileTap={{ scale: 0.99 }}
              className="relative bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 group overflow-hidden"
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              />
              <div className="flex items-center space-x-2 text-primary text-xs sm:text-sm mb-2">
                <Calendar size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="font-medium">{item.period}</span>
              </div>

              <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h4>

              <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2 text-gray-400 text-xs sm:text-sm mb-3">
                <div className="flex items-center space-x-2">
                  <Building size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">{item.company}</span>
                </div>
                {item.location && (
                  <div className="flex items-center space-x-2 ml-6 sm:ml-0">
                    <span className="hidden sm:inline">•</span>
                    <MapPin size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                )}
              </div>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">{item.description}</p>

              {/* Mobile-friendly progress indicator */}
              <motion.div
                className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden sm:hidden"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: index * 0.1 + 0.7, duration: 0.6 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}