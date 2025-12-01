'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Sparkles } from 'lucide-react'

const trabajos = [
  { id: 1, src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80', alt: 'Maquillaje de novia', categoria: 'Boda' },
  { id: 2, src: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80', alt: 'Peinado elegante', categoria: 'Quinceañera' },
  { id: 3, src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80', alt: 'Look natural', categoria: 'Evento Social' },
  { id: 4, src: 'https://images.unsplash.com/photo-1531746020798-e6953c040e5b?w=800&q=80', alt: 'Maquillaje glamour', categoria: 'Boda' },
  { id: 5, src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80', alt: 'Peinado recogido', categoria: 'Quinceañera' },
  { id: 6, src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80', alt: 'Maquillaje de día', categoria: 'Evento Social' },
]

function TrabajoCard({ trabajo, index }: { trabajo: typeof trabajos[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
    >
      <img
        src={trabajo.src}
        alt={trabajo.alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center justify-between text-white">
          <div>
            <div className="font-semibold text-lg mb-1">{trabajo.alt}</div>
            <div className="text-sm text-white/80">{trabajo.categoria}</div>
          </div>
          <Sparkles className="w-5 h-5 text-pink-300" />
        </div>
      </div>
      {/* Badge */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-600 to-rose-600 px-3 py-1 rounded-full text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
        {trabajo.categoria}
      </div>
    </motion.div>
  )
}

export default function Portafolio() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      id="portafolio"
      ref={ref}
      className="relative py-20 sm:py-32 bg-gradient-to-b from-white via-pink-50/30 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Nuestro Portafolio
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Algunos de nuestros trabajos más destacados en maquillaje y peinado
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {trabajos.map((trabajo, index) => (
            <TrabajoCard key={trabajo.id} trabajo={trabajo} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

