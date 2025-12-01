'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, Clock, Music } from 'lucide-react'

const tracks = [
  { id: 1, title: 'Intro: Fuego', duration: '1:23', featured: false },
  { id: 2, title: 'Baila Conmigo', duration: '3:45', featured: true },
  { id: 3, title: 'Noche Loca', duration: '3:12', featured: true },
  { id: 4, title: 'Perreo Intenso', duration: '4:01', featured: false },
  { id: 5, title: 'Dime Si Te Gusta', duration: '3:28', featured: true },
  { id: 6, title: 'Interlude: Vibes', duration: '0:58', featured: false },
  { id: 7, title: 'Suelta El Pelo', duration: '3:55', featured: true },
  { id: 8, title: 'Fiesta Sin Fin', duration: '4:12', featured: false },
  { id: 9, title: 'Dale Play', duration: '3:40', featured: true },
  { id: 10, title: 'Outro: Hasta La Luna', duration: '2:15', featured: false },
]

function TrackCard({ track, index }: { track: typeof tracks[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, x: 10 }}
      className={`group relative p-4 sm:p-6 rounded-xl backdrop-blur-md border transition-all ${
        track.featured
          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30'
          : 'bg-white/5 border-white/10'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm sm:text-base">
            {track.id}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-base sm:text-lg mb-1 truncate">
              {track.title}
            </h3>
            {track.featured && (
              <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-purple-300">
                <Music className="w-3 h-3" />
                Featured
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/60 text-sm sm:text-base flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {track.duration}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg group-hover:shadow-purple-500/50 transition-shadow"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Tracklist() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      id="tracklist"
      ref={ref}
      className="relative py-20 sm:py-32 bg-gradient-to-b from-black via-purple-900/20 to-black"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              TRACKLIST
            </span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto">
            10 canciones que te harán bailar sin parar
          </p>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          {tracks.map((track, index) => (
            <TrackCard key={track.id} track={track} index={index} />
          ))}
        </div>

        {/* Total Duration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <p className="text-white/60 text-sm sm:text-base">
            Duración total: <span className="text-purple-400 font-bold">34:09</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

