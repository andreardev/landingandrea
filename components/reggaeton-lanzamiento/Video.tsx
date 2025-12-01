'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, Youtube } from 'lucide-react'

export default function Video() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section
      id="video"
      ref={ref}
      className="relative py-20 sm:py-32 bg-gradient-to-b from-black via-pink-900/20 to-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-radial from-pink-500/20 to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              VIDEO OFICIAL
            </span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto">
            Mira el video de &ldquo;Baila Conmigo&rdquo;, el primer single del álbum
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-500/30"
        >
          {/* Placeholder Video */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-black flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="group relative"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                <Play className="w-10 h-10 sm:w-12 sm:h-12 text-white ml-1" fill="currentColor" />
              </div>
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-50"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </div>

          {/* Video Overlay Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 sm:p-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Baila Conmigo
                </h3>
                <p className="text-white/70 text-sm sm:text-base">
                  Video oficial • 3.5M visualizaciones
                </p>
              </div>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
                Ver en YouTube
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Additional Videos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {['Noche Loca', 'Dime Si Te Gusta'].map((title, index) => (
            <motion.div
              key={title}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/20 cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-12 h-12 text-white/80" fill="currentColor" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h4 className="text-white font-semibold">{title}</h4>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

