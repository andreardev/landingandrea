'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Crown, Briefcase, Cake, Music, Users } from 'lucide-react'

const tiposEventos = [
  {
    icon: Heart,
    titulo: 'Bodas',
    descripcion: 'Decoración floral romántica y elegante para hacer de tu boda un día inolvidable.',
    imagen: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: Crown,
    titulo: 'Quinceañeras',
    descripcion: 'Arreglos florales sofisticados que complementan la elegancia de tu celebración.',
    imagen: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Briefcase,
    titulo: 'Eventos Corporativos',
    descripcion: 'Decoración profesional para conferencias, inauguraciones y eventos empresariales.',
    imagen: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Cake,
    titulo: 'Celebraciones',
    descripcion: 'Cumpleaños, aniversarios y eventos especiales con decoración floral única.',
    imagen: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Music,
    titulo: 'Fiestas Temáticas',
    descripcion: 'Decoración creativa y original para fiestas con temáticas específicas.',
    imagen: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Users,
    titulo: 'Eventos Sociales',
    descripcion: 'Decoración floral para cualquier tipo de evento social y celebración.',
    imagen: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a66d?w=600&q=80',
    color: 'from-green-500 to-emerald-500',
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
      transition={{ delay: index * 0.1 }}
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
      className="relative py-20 sm:py-32 bg-gradient-to-b from-white via-green-50/30 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Tipos de Eventos
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Especialistas en decoración floral para todo tipo de celebraciones
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {tiposEventos.map((evento, index) => (
            <EventoCard key={evento.titulo} evento={evento} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

