'use client'

import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play, Music2, Sparkles } from 'lucide-react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  // Audio waves animation - pre-generate random heights for stability
  const waves = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      maxHeight: 40 + Math.random() * 100,
      duration: 0.5 + Math.random() * 0.5,
    }))
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-black"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      {/* Audio Waves */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex items-center gap-1">
          {waves.map((wave) => (
            <motion.div
              key={wave.id}
              className="w-1 bg-gradient-to-t from-purple-400 via-pink-400 to-cyan-400 rounded-full"
              initial={{ height: 20 }}
              animate={{
                height: [20, wave.maxHeight, 20],
              }}
              transition={{
                duration: wave.duration,
                repeat: Infinity,
                delay: wave.id * 0.05,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 sm:mb-8 border border-purple-500/30"
        >
          <Sparkles className="text-purple-400 w-4 h-4" />
          <span className="text-sm sm:text-base text-white/90 font-medium">
            NUEVO ÁLBUM DISPONIBLE
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            RITMO
          </span>
          <br />
          <span className="text-white">CALIENTE</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 sm:mb-12 max-w-2xl mx-auto"
        >
          El álbum que cambiará el reggaeton para siempre
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
            className="group relative bg-gradient-to-r from-purple-500 to-pink-500 px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl text-white shadow-2xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
              Escuchar Ahora
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-white/10 backdrop-blur-md border-2 border-white/30 px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl text-white hover:bg-white/20 transition-all"
          >
            <span className="flex items-center gap-2">
              <Music2 className="w-5 h-5 sm:w-6 sm:h-6" />
              Ver Tracklist
            </span>
          </motion.button>
        </motion.div>

        {/* Release Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 sm:mt-12 text-white/60 text-sm sm:text-base"
        >
          Disponible desde el 15 de Diciembre, 2024
        </motion.div>
      </motion.div>

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
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
