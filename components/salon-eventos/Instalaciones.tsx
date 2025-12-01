'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Building2, Users, Sparkles, Coffee } from 'lucide-react'

const instalaciones = [
  {
    icon: Building2,
    titulo: 'Salón Principal',
    descripcion: 'Amplio salón de 500m² con techos altos, iluminación natural y decoración elegante.',
    imagen: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80',
  },
  {
    icon: Users,
    titulo: 'Área de Recepción',
    descripcion: 'Espacio acogedor para recibir a tus invitados con bar y área de descanso.',
    imagen: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
  },
  {
    icon: Sparkles,
    titulo: 'Terraza Exterior',
    descripcion: 'Hermosa terraza al aire libre perfecta para cócteles y eventos al atardecer.',
    imagen: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
  },
  {
    icon: Coffee,
    titulo: 'Salas Privadas',
    descripcion: 'Espacios íntimos para reuniones pequeñas o áreas de preparación.',
    imagen: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a66d?w=600&q=80',
  },
]

function InstalacionCard({ instalacion, index }: { instalacion: typeof instalaciones[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const Icon = instalacion.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={instalacion.imagen}
          alt={instalacion.titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute top-4 right-4 p-3 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600 shadow-xl">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-xl font-bold text-white mb-2">{instalacion.titulo}</h3>
        <p className="text-white/90 text-sm">{instalacion.descripcion}</p>
      </div>
    </motion.div>
  )
}

export default function Instalaciones() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      id="instalaciones"
      ref={ref}
      className="relative py-20 sm:py-32 bg-gradient-to-b from-white via-amber-50/30 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Nuestras Instalaciones
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Espacios versátiles y elegantes diseñados para todo tipo de eventos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {instalaciones.map((instalacion, index) => (
            <InstalacionCard key={instalacion.titulo} instalacion={instalacion} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

