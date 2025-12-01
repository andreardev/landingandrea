'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart } from 'lucide-react'

const imagenes = [
  { id: 1, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', alt: 'Boda elegante' },
  { id: 2, src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80', alt: 'Decoración floral' },
  { id: 3, src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', alt: 'Ceremonia romántica' },
  { id: 4, src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80', alt: 'Recepción elegante' },
  { id: 5, src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80', alt: 'Detalles decorativos' },
  { id: 6, src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a66d?w=800&q=80', alt: 'Mesa de postres' },
]

function ImagenCard({ imagen, index }: { imagen: typeof imagenes[0]; index: number }) {
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
        src={imagen.src}
        alt={imagen.alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center gap-2 text-white">
          <Heart className="w-5 h-5 fill-white" />
          <span className="font-semibold">{imagen.alt}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Galeria() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      id="galeria"
      ref={ref}
      className="relative py-20 sm:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Nuestra Galería
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Momentos especiales de bodas que hemos planificado con amor
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {imagenes.map((imagen, index) => (
            <ImagenCard key={imagen.id} imagen={imagen} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

