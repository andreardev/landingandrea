'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Sparkles, Scissors, Palette, Heart, Clock, Gift } from 'lucide-react'

const servicios = [
  {
    icon: Palette,
    title: 'Maquillaje Profesional',
    description: 'Maquillaje de larga duración para bodas, quinceañeras y eventos especiales. Técnicas profesionales que realzan tu belleza natural.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Scissors,
    title: 'Peinado Elegante',
    description: 'Peinados sofisticados y modernos adaptados a tu estilo y tipo de evento. Desde recogidos clásicos hasta estilos contemporáneos.',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: Sparkles,
    title: 'Paquete Completo',
    description: 'Servicio integral de maquillaje y peinado con prueba previa incluida para asegurar el look perfecto.',
    color: 'from-pink-400 to-rose-400',
  },
  {
    icon: Heart,
    title: 'Maquillaje de Novia',
    description: 'Maquillaje especializado para novias con productos de alta calidad que duran todo el día y se ven perfectos en fotos.',
    color: 'from-rose-400 to-pink-400',
  },
  {
    icon: Clock,
    title: 'Servicio a Domicilio',
    description: 'Nos desplazamos hasta tu ubicación para mayor comodidad. Servicio disponible para ti y tu cortejo.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Gift,
    title: 'Prueba de Maquillaje',
    description: 'Sesión de prueba previa para definir el look perfecto y asegurar que te sientas cómoda y radiante.',
    color: 'from-rose-500 to-pink-500',
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
      className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-shadow border border-pink-50"
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
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Nuestros Servicios
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Servicios profesionales de maquillaje y peinado para hacerte lucir radiante
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

