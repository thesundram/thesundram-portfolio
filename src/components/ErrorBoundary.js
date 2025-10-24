'use client'

import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
          <div className="text-center max-w-sm sm:max-w-none">
            <h2 className="text-xl font-bold mb-3 sm:text-2xl sm:mb-4">Something went wrong!</h2>
            <p className="text-sm text-gray-400 mb-4 sm:text-base sm:mb-6">We apologize for the inconvenience. Please try reloading the page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary rounded-lg hover:bg-primary/80 transition-colors text-sm sm:px-6 sm:py-3 sm:text-base"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary