import './globals.css'

export const metadata = {
  metadataBase: new URL('https://thesundram.netlify.app'),
  title: 'Sundram Pandey | Software Engineer | Portfolio Website | Full Stack Developer |Software Developer | Mumbai, India',
  description: 'Software Engineer | Full Stack Developer with expertise in React, Next.js, Node.js, React Native, Flutter, and MongoDB. Skilled in building scalable web and mobile applications.',
  keywords: 'Sundram Pandey, Software Engineer, Full Stack Developer, Software Developer, React, React Native, Flutter, MongoDB,mobile development, web development, Mysql, HTML, CSS, JavaScript, Next.js, Node.js, Express.js, Bootstrap, GitHub, LinkedIn, Twitter, Instagram, Mumbai, India',
  author: 'Sundram Pandey',
  openGraph: {
    title: 'Sundram Pandey - Software Engineer Portfolio',
    description: 'Full Stack Developer specializing in modern web and mobile development',
    url: 'https://thesundram.netlify.app',
    siteName: 'Sundram Pandey Portfolio',
    images: [{ url: '/images/hero.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sundram Pandey - Software Engineer',
    description: 'Full Stack Developer specializing in React, Next.js, and mobile development',
    images: ['/images/hero.jpg'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </head>
      <body className="antialiased transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}