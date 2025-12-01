'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Calendar, Camera, Utensils, Music, Flower2, Gift, Users } from 'lucide-react'

const servicios = [
  {
    icon: Calendar,
    title: 'Planificación Completa',
    description: 'Coordinación integral de todos los aspectos de tu boda desde el inicio hasta el día del evento.',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: Camera,
    title: 'Fotografía y Video',
    description: 'Capturamos cada momento especial con profesionales de primer nivel.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Utensils,
    title: 'Catering Premium',
    description: 'Menús personalizados con los mejores chefs y opciones gastronómicas excepcionales.',
    color: 'from-rose-400 to-pink-400',
  },
  {
    icon: Flower2,
    title: 'Decoración Floral',
    description: 'Arreglos florales únicos que transforman tu espacio en un paraíso romántico.',
    color: 'from-pink-400 to-rose-400',
  },
  {
    icon: Music,
    title: 'Entretenimiento',
    description: 'DJs, bandas en vivo y música que mantendrá a tus invitados bailando toda la noche.',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: Gift,
    title: 'Regalos y Favores',
    description: 'Detalles personalizados que tus invitados recordarán para siempre.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Users,
    title: 'Coordinación del Día',
    description: 'Aseguramos que todo fluya perfectamente el día de tu boda sin que tengas que preocuparte.',
    color: 'from-rose-400 to-pink-400',
  },
  {
    icon: Heart,
    title: 'Asesoría Personalizada',
    description: 'Consultoría individual para crear la boda de tus sueños dentro de tu presupuesto.',
    color: 'from-pink-400 to-rose-400',
  },
]

function ServicioCard({ servicio, index }: { servicio: typeof servicios[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const Icon = servicio.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-shadow border border-rose-50"
    >
      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${servicio.color} mb-6`}>
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{servicio.title}</h3>
      <p className="text-gray-600 leading-relaxed">{servicio.description}</p>
    </motion.div>
  )
}

export default function Servicios() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      id="servicios"
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
              Nuestros Servicios
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Todo lo que necesitas para hacer de tu boda un día perfecto
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {servicios.map((servicio, index) => (
            <ServicioCard key={servicio.title} servicio={servicio} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

