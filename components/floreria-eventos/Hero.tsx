'use client'

import { motion } from 'framer-motion'
import { Flower2, Sparkles, ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-white"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Floating Flowers */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 4) * 25}%`,
          }}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 15, -15, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          <Flower2 className="w-10 h-10 sm:w-12 sm:h-12 text-green-400" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full mb-6 sm:mb-8 border border-green-200 shadow-sm"
        >
          <Sparkles className="text-green-600 w-4 h-4" />
          <span className="text-sm sm:text-base text-gray-700 font-medium">
            Decoración Floral para Eventos
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-4 sm:mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 bg-clip-text text-transparent">
            Belleza Natural
          </span>
          <br />
          <span className="text-gray-900">Para Tus Eventos</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Transformamos tus espacios con arreglos florales únicos y decoración elegante para hacer de cada evento una experiencia inolvidable
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-gradient-to-r from-green-600 to-emerald-600 px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl text-white shadow-2xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Flower2 className="w-5 h-5 sm:w-6 sm:h-6" />
              Cotizar Ahora
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-white border-2 border-green-300 px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl text-green-600 hover:bg-green-50 transition-all shadow-lg"
          >
            Ver Galería
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
        >
          {[
            { number: '1000+', label: 'Eventos' },
            { number: '20+', label: 'Años' },
            { number: '99%', label: 'Satisfacción' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs font-medium">Descubre más</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}

