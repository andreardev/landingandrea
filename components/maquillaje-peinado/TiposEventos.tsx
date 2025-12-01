'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Crown, Briefcase, Sparkles } from 'lucide-react'

const tiposEventos = [
  {
    icon: Heart,
    titulo: 'Bodas',
    descripcion: 'Maquillaje y peinado especializado para novias. Te ayudamos a lucir radiante en tu día más especial.',
    imagen: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Crown,
    titulo: 'Quinceañeras',
    descripcion: 'Looks glamorosos y elegantes para celebrar tus quince años con estilo y sofisticación.',
    imagen: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: Briefcase,
    titulo: 'Eventos Corporativos',
    descripcion: 'Maquillaje profesional y discreto para eventos de trabajo y presentaciones importantes.',
    imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80',
    color: 'from-pink-400 to-rose-400',
  },
  {
    icon: Sparkles,
    titulo: 'Eventos Sociales',
    descripcion: 'Peinados y maquillaje para fiestas, celebraciones y cualquier ocasión especial.',
    imagen: 'https://images.unsplash.com/photo-1531746020798-e6953c040e5b?w=600&q=80',
    color: 'from-rose-400 to-pink-400',
  },
]

function EventoCard({ evento, index }: { evento: typeof tiposEventos[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const Icon = evento.icon

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
          src={evento.imagen}
          alt={evento.titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent bg-gradient-to-br ${evento.color} opacity-60`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`p-4 rounded-full bg-gradient-to-br ${evento.color} shadow-xl`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-xl font-bold text-white mb-2">{evento.titulo}</h3>
        <p className="text-white/90 text-sm">{evento.descripcion}</p>
      </div>
    </motion.div>
  )
}

export default function TiposEventos() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      id="eventos"
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
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Tipos de Eventos
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Especialistas en maquillaje y peinado para todo tipo de celebraciones
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {tiposEventos.map((evento, index) => (
            <EventoCard key={evento.titulo} evento={evento} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

