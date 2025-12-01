'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, Utensils, Music, Calendar } from 'lucide-react'

const opciones = [
  {
    icon: Users,
    titulo: 'Evento Intimo',
    capacidad: '50-100',
    descripcion: 'Ideal para celebraciones pequeñas y reuniones familiares.',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    icon: Utensils,
    titulo: 'Evento Mediano',
    capacidad: '100-250',
    descripcion: 'Perfecto para bodas, quinceañeras y eventos corporativos.',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    icon: Music,
    titulo: 'Gran Evento',
    capacidad: '250-500',
    descripcion: 'Espacio amplio para celebraciones grandes y eventos masivos.',
    color: 'from-amber-400 to-yellow-400',
  },
]

function OpcionCard({ opcion, index }: { opcion: typeof opciones[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const Icon = opcion.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`bg-gradient-to-br ${opcion.color} rounded-2xl p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl transition-shadow`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
          <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold">{opcion.titulo}</h3>
          <div className="text-3xl sm:text-4xl font-black mt-1">{opcion.capacidad}</div>
          <div className="text-sm sm:text-base opacity-90">Personas</div>
        </div>
      </div>
      <p className="text-white/90 leading-relaxed">{opcion.descripcion}</p>
    </motion.div>
  )
}

export default function Capacidad() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      id="capacidad"
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
            <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Capacidad y Opciones
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Adaptamos nuestros espacios según el tamaño de tu evento
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {opciones.map((opcion, index) => (
            <OpcionCard key={opcion.titulo} opcion={opcion} index={index} />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 sm:mt-16 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 sm:p-8 border border-amber-100"
        >
          <div className="flex items-center gap-4 mb-4">
            <Calendar className="w-8 h-8 text-amber-600" />
            <h3 className="text-2xl font-bold text-gray-900">Disponibilidad</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Nuestro salón está disponible todo el año. Ofrecemos paquetes personalizados para eventos de lunes a domingo. 
            Contáctanos para verificar disponibilidad en la fecha de tu evento y recibir una cotización personalizada.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

