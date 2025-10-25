'use client'

import { useEffect, useRef } from 'react'

export default function PerformanceMonitor() {
  const metricsRef = useRef({})

  useEffect(() => {
    if (typeof window === 'undefined' || !('performance' in window)) return

    const isMobile = window.innerWidth < 768
    const isLowEnd = navigator.hardwareConcurrency <= 4
    
    // Mobile-optimized performance monitoring
    const trackMetric = (name, value) => {
      metricsRef.current[name] = value
      if (process.env.NODE_ENV === 'development') {
        console.log(`📱 ${name}: ${value}${name.includes('Time') ? 'ms' : ''}`)
      }
    }

    // Core Web Vitals with mobile focus
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        switch (entry.entryType) {
          case 'largest-contentful-paint':
            trackMetric('LCP', Math.round(entry.startTime))
            break
          case 'first-input':
            trackMetric('FID', Math.round(entry.processingStart - entry.startTime))
            break
          case 'layout-shift':
            if (!entry.hadRecentInput) {
              trackMetric('CLS', entry.value.toFixed(4))
            }
            break
        }
      })
    })

    // Observe mobile-critical metrics
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
    } catch (e) {
      // Fallback for older browsers
      observer.observe({ entryTypes: ['navigation'] })
    }

    // Mobile-specific monitoring
    if (isMobile) {
      // Battery API monitoring
      if ('getBattery' in navigator) {
        navigator.getBattery().then((battery) => {
          trackMetric('Battery', `${Math.round(battery.level * 100)}%`)
        })
      }

      // Memory monitoring for mobile
      if ('memory' in performance) {
        const memory = performance.memory
        trackMetric('Memory Usage', `${Math.round(memory.usedJSHeapSize / 1048576)}MB`)
      }

      // Network monitoring
      if ('connection' in navigator) {
        const connection = navigator.connection
        trackMetric('Connection', connection.effectiveType)
      }
    }

    // Reduced frequency monitoring for mobile performance
    const monitoringInterval = setInterval(() => {
      if (isMobile && isLowEnd) return // Skip on low-end mobile
      
      // FPS monitoring (less frequent on mobile)
      let lastTime = performance.now()
      let frameCount = 0
      
      const measureFPS = () => {
        frameCount++
        const currentTime = performance.now()
        
        if (currentTime - lastTime >= (isMobile ? 2000 : 1000)) {
          const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
          trackMetric('FPS', fps)
          frameCount = 0
          lastTime = currentTime
        }
        
        if (!document.hidden) {
          requestAnimationFrame(measureFPS)
        }
      }
      
      measureFPS()
    }, isMobile ? 5000 : 3000)

    // Page visibility optimization
    const handleVisibilityChange = () => {
      if (document.hidden) {
        observer.disconnect()
      } else if (!document.hidden && isMobile) {
        // Resume monitoring when page becomes visible
        try {
          observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
        } catch (e) {
          observer.observe({ entryTypes: ['navigation'] })
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      observer.disconnect()
      clearInterval(monitoringInterval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return null
}