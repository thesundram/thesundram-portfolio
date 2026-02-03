'use client'

import { motion } from 'framer-motion'

export default function SectionBackground() {
    return (
        <>
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-gray-100/80 dark:from-gray-900/50 dark:to-black/50 pointer-events-none -z-10"></div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-pulse" />
            </div>

            {/* Floating particles */}
            <motion.div
                className="absolute w-4 h-4 rounded-full top-20 left-20 bg-primary/30 pointer-events-none -z-10"
                animate={{
                    y: [-10, 10, -10],
                    x: [-5, 5, -5],
                    opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
                className="absolute w-3 h-3 rounded-full bottom-32 right-32 bg-accent/40 pointer-events-none -z-10"
                animate={{
                    y: [10, -10, 10],
                    x: [5, -5, 5],
                    opacity: [0.4, 0.9, 0.4]
                }}
                transition={{ duration: 5, repeat: Infinity }}
            />
        </>
    )
}
