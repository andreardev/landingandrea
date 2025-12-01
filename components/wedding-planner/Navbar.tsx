'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart, Phone, Mail } from 'lucide-react'

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
    { href: '#servicios', label: 'Servicios' },
    { href: '#proceso', label: 'Proceso' },
    { href: '#galeria', label: 'Galería' },
    { href: '#testimonios', label: 'Testimonios' },
    { href: '#contacto', label: 'Contacto' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-rose-100'
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
              <Heart className="text-rose-500 w-6 h-6 sm:w-8 sm:h-8 fill-rose-500" />
              <motion.div
                className="absolute inset-0 bg-rose-500 rounded-full blur-xl opacity-30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-lg sm:text-xl font-display font-bold text-gray-900">
              Dream Weddings
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-rose-500 transition-colors font-medium text-sm"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {link.label}
              </motion.a>
            ))}
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
              <motion.a
                href="tel:+1234567890"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-700 hover:text-rose-500 transition-colors"
              >
                <Phone size={18} />
              </motion.a>
              <motion.a
                href="mailto:info@dreamweddings.com"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-700 hover:text-rose-500 transition-colors"
              >
                <Mail size={18} />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow"
              >
                Consulta Gratis
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 p-2"
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
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-rose-100"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-rose-500 transition-colors font-medium py-2"
                  whileTap={{ x: 10 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-rose-100">
                <a href="tel:+1234567890" className="text-gray-700 hover:text-rose-500">
                  <Phone size={24} />
                </a>
                <a href="mailto:info@dreamweddings.com" className="text-gray-700 hover:text-rose-500">
                  <Mail size={24} />
                </a>
              </div>
              <button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                Consulta Gratis
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

