'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar menú móvil al hacer scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      const handleScroll = () => setIsMobileMenuOpen(false)
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#galeria', label: 'Galería' },
    { href: '#testimonios', label: 'Testimonios' },
    { href: '#contacto', label: 'Contacto' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-top ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Mobile First */}
          <div className="flex-shrink-0">
            <a 
              href="#inicio" 
              className="text-lg sm:text-xl md:text-2xl font-display font-bold text-primary-600 hover:text-primary-700 transition-colors"
            >
              Elotes Premium
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm lg:text-base text-gray-700 hover:text-primary-600 transition-colors font-medium touch-target"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="touch-target bg-primary-600 text-white px-4 lg:px-6 py-2 rounded-full hover:bg-primary-700 active:bg-primary-800 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95 text-sm lg:text-base"
            >
              <Phone size={16} className="lg:w-[18px] lg:h-[18px]" />
              <span className="hidden lg:inline">Contactar</span>
              <span className="lg:hidden">Contacto</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="touch-target md:hidden text-gray-700 hover:text-primary-600 transition-colors p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu - Improved */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Menu */}
          <div className="md:hidden bg-white border-t shadow-xl fixed top-16 left-0 right-0 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto safe-bottom">
            <div className="px-4 pt-4 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="touch-target block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors font-medium active:bg-primary-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                className="touch-target block mt-4 mx-4 bg-primary-600 text-white px-6 py-3 rounded-full text-center hover:bg-primary-700 active:bg-primary-800 transition-all font-semibold active:scale-95"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone size={18} className="inline mr-2" />
                Contactar
              </a>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
