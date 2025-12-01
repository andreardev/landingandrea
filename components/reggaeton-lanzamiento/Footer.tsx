'use client'

import { motion } from 'framer-motion'
import { Music, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative py-12 sm:py-16 bg-black border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <Music className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ARTISTA
            </span>
          </motion.div>
          
          <p className="text-white/60 text-sm sm:text-base mb-6">
            &copy; 2024 Artista. Todos los derechos reservados.
          </p>
          
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <span>Hecho con</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            </motion.div>
            <span>para la música</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

