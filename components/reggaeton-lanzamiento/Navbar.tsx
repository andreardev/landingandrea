'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Music, Instagram, Spotify, Youtube } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#tracklist', label: 'Tracklist' },
    { href: '#video', label: 'Video' },
    { href: '#merch', label: 'Merch' },
    { href: '#preorder', label: 'Pre-Order' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-purple-500/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <Music className="text-purple-500 w-6 h-6 sm:w-8 sm:h-8" />
              <motion.div
                className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-50"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              ARTISTA
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-purple-400 transition-colors font-medium"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {link.label}
              </motion.a>
            ))}
            <div className="flex items-center gap-4 ml-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/80 hover:text-pink-500 transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/80 hover:text-green-400 transition-colors"
              >
                <Spotify size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/80 hover:text-red-500 transition-colors"
              >
                <Youtube size={20} />
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-purple-500/20"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white/80 hover:text-purple-400 transition-colors font-medium py-2"
                  whileTap={{ x: 10 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-purple-500/20">
                <a href="#" className="text-white/80 hover:text-pink-500">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-white/80 hover:text-green-400">
                  <Spotify size={24} />
                </a>
                <a href="#" className="text-white/80 hover:text-red-500">
                  <Youtube size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

