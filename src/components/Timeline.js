'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Building } from 'lucide-react'

export default function Timeline({ type, items }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-6">{type}</h3>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent"></div>
        
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-12 pb-8 last:pb-0"
          >
            {/* Timeline Dot */}
            <div className="absolute left-2 top-2 w-4 h-4 bg-primary rounded-full border-4 border-gray-900"></div>
            
            {/* Content Card */}
            <motion.div
              whileHover={{ scale: 1.02, x: 5 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center space-x-2 text-primary text-sm mb-2">
                <Calendar size={16} />
                <span>{item.period}</span>
              </div>
              
              <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
              
              <div className="flex items-center space-x-2 text-gray-400 text-sm mb-3">
                <Building size={16} />
                <span>{item.company}</span>
                {item.location && (
                  <>
                    <span>•</span>
                    <MapPin size={16} />
                    <span>{item.location}</span>
                  </>
                )}
              </div>
              
              <p className="text-gray-300 leading-relaxed">{item.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}