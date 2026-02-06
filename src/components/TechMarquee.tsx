'use client'

import { motion } from 'framer-motion'
import {
    Code2, Database, Globe, Layout, Server, Smartphone, Cloud,
    Terminal, Zap, Layers, Box, GitBranch, FileCode, Flame
} from 'lucide-react'

const techs = [
    { name: 'React', icon: Code2, color: 'text-blue-500 dark:text-blue-400' },
    { name: 'Next.js', icon: Globe, color: 'text-gray-800 dark:text-white' },
    { name: 'TypeScript', icon: FileCode, color: 'text-blue-600 dark:text-blue-500' },
    { name: 'Node.js', icon: Server, color: 'text-green-600 dark:text-green-500' },
    { name: 'Tailwind', icon: Layout, color: 'text-cyan-500 dark:text-cyan-400' },
    { name: 'MongoDB', icon: Database, color: 'text-green-500 dark:text-green-400' },
    { name: 'Flutter', icon: Smartphone, color: 'text-blue-400 dark:text-blue-300' },
    { name: 'Python', icon: Terminal, color: 'text-yellow-500 dark:text-yellow-400' },
    { name: 'Docker', icon: Box, color: 'text-blue-700 dark:text-blue-600' },
    { name: 'AWS', icon: Cloud, color: 'text-orange-500 dark:text-orange-400' },
    { name: 'GraphQL', icon: Zap, color: 'text-pink-600 dark:text-pink-500' },
    { name: 'Redux', icon: Layers, color: 'text-purple-600 dark:text-purple-500' },
    { name: 'Firebase', icon: Flame, color: 'text-amber-500 dark:text-yellow-500' },
    { name: 'Git', icon: GitBranch, color: 'text-red-600 dark:text-red-500' },
]

// Duplicate for continuous loop
const marqueeTechs = [...techs, ...techs, ...techs]

export default function TechMarquee() {
    return (
        <div className="relative py-8 sm:py-10 overflow-hidden bg-gray-50/50 dark:bg-white/5 backdrop-blur-sm lg:ml-72 border-y border-gray-200 dark:border-white/5">
            {/* Gradient Masks */}
            <div className="absolute top-0 left-0 z-10 w-20 h-full bg-gradient-to-r from-gray-50 dark:from-[#0a0a0a] to-transparent pointer-events-none lg:w-32" />
            <div className="absolute top-0 right-0 z-10 w-20 h-full bg-gradient-to-l from-gray-50 dark:from-[#0a0a0a] to-transparent pointer-events-none lg:w-32" />

            <div className="flex overflow-hidden">
                <motion.div
                    className="flex space-x-8 sm:space-x-12 whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear",
                    }}
                >
                    {marqueeTechs.map((tech, index) => {
                        const Icon = tech.icon
                        return (
                            <div
                                key={index}
                                className="flex items-center space-x-2 group cursor-default"
                            >
                                <div className={`p-2 rounded-lg bg-white shadow-sm dark:bg-white/5 dark:shadow-none group-hover:bg-gray-100 dark:group-hover:bg-white/10 transition-colors ${tech.color} ring-1 ring-gray-100 dark:ring-transparent`}>
                                    <Icon size={20} className="sm:w-6 sm:h-6" />
                                </div>
                                <span className="text-base sm:text-lg font-bold text-gray-600 dark:text-gray-500 group-hover:text-primary transition-colors duration-300">
                                    {tech.name}
                                </span>
                            </div>
                        )
                    })}
                </motion.div>
            </div>
        </div>
    )
}
