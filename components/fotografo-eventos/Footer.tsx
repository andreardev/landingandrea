'use client'

import { motion } from 'framer-motion'
import { Camera, Instagram, Facebook, Youtube, Mail } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Mail, href: '#', label: 'Email' },
  ]

  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
              >
                <Camera className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                FotoStudio
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Capturando momentos inolvidables con pasión y profesionalismo. Transformamos tus eventos en recuerdos eternos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {[
                { href: '#inicio', label: 'Inicio' },
                { href: '#servicios', label: 'Servicios' },
                { href: '#portafolio', label: 'Portafolio' },
                { href: '#proceso', label: 'Proceso' },
                { href: '#testimonios', label: 'Testimonios' },
                { href: '#contacto', label: 'Contacto' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-bold mb-4">Síguenos</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center text-white/60 hover:text-purple-400 hover:border-purple-500/50 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} FotoStudio. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-white/60 hover:text-purple-400 transition-colors">
                Privacidad
              </Link>
              <Link href="#" className="text-white/60 hover:text-purple-400 transition-colors">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

