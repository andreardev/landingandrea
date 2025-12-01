'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Flower2, Sparkles, Package, Heart, Calendar, Camera } from 'lucide-react'

const servicios = [
  {
    icon: Flower2,
    title: 'Arreglos Florales',
    description: 'Centros de mesa, ramos, coronas y composiciones florales personalizadas para cualquier ocasión.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Sparkles,
    title: 'Decoración de Eventos',
    description: 'Transformamos espacios con decoración floral completa para bodas, quinceañeras y eventos corporativos.',
    color: 'from-emerald-500 to-green-500',
  },
  {
    icon: Package,
    title: 'Entrega a Domicilio',
    description: 'Servicio de entrega rápida y segura de arreglos florales frescos directamente a tu puerta.',
    color: 'from-green-400 to-emerald-400',
  },
  {
    icon: Heart,
    title: 'Bodas y Quinceañeras',
    description: 'Decoración floral completa para tu día especial con diseños únicos y elegantes.',
    color: 'from-emerald-400 to-green-400',
  },
  {
    icon: Calendar,
    title: 'Eventos Corporativos',
    description: 'Decoración profesional para conferencias, inauguraciones y eventos empresariales.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Camera,
    title: 'Asesoría en Diseño',
    description: 'Consultoría personalizada para crear la decoración perfecta según tu visión y presupuesto.',
    color: 'from-emerald-500 to-green-500',
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
      className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-shadow border border-green-50"
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
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Nuestros Servicios
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Soluciones florales completas para hacer de tu evento algo especial
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicios.map((servicio, index) => (
            <ServicioCard key={servicio.title} servicio={servicio} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

