'use client'

import { motion } from 'framer-motion'
import { Sparkles, Instagram, Facebook, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative py-12 sm:py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8">
          {/* Brand */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" />
              <span className="text-xl sm:text-2xl font-display font-bold">Belleza Elegante</span>
            </motion.div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Maquillaje y peinado profesional para eventos sociales. Te ayudamos a lucir radiante en tus momentos más especiales.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#servicios" className="hover:text-pink-400 transition-colors">Servicios</a>
              </li>
              <li>
                <a href="#portafolio" className="hover:text-pink-400 transition-colors">Portafolio</a>
              </li>
              <li>
                <a href="#eventos" className="hover:text-pink-400 transition-colors">Tipos de Eventos</a>
              </li>
              <li>
                <a href="#testimonios" className="hover:text-pink-400 transition-colors">Testimonios</a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-pink-400 transition-colors">Contacto</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+1234567890" className="hover:text-pink-400 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@bellezaelegante.com" className="hover:text-pink-400 transition-colors">
                  info@bellezaelegante.com
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-6">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 Belleza Elegante. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

