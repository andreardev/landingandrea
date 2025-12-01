'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Camera, Video, Image, Sparkles, Heart, Users } from 'lucide-react'

const servicios = [
  {
    icon: Heart,
    title: 'Bodas',
    description: 'Capturamos cada momento especial de tu día perfecto con elegancia y sensibilidad artística.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: Users,
    title: 'XV Años',
    description: 'Documentamos la celebración de tus quince años con un estilo moderno y sofisticado.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Sparkles,
    title: 'Eventos Corporativos',
    description: 'Fotografía profesional para conferencias, lanzamientos y eventos empresariales.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Camera,
    title: 'Sesiones Personales',
    description: 'Retratos profesionales y sesiones familiares en locaciones únicas.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Video,
    title: 'Videografía',
    description: 'Producción de videos cinematográficos para tus eventos más importantes.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Image,
    title: 'Edición Profesional',
    description: 'Post-producción y retoque digital de alta calidad para cada imagen.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80',
    color: 'from-green-500 to-emerald-500',
  },
]

export default function Servicios() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      id="servicios"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20"
          >
            <Sparkles className="text-purple-400 w-4 h-4" />
            <span className="text-sm text-white/90 font-medium">Nuestros Servicios</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Servicios
            </span>
            <span className="text-white"> Profesionales</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios fotográficos para hacer realidad tu visión
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicios.map((servicio, index) => {
            const Icon = servicio.icon
            return (
              <motion.div
                key={servicio.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-white/10"
              >
                {/* Image Background */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={servicio.image}
                    alt={servicio.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent bg-gradient-to-r ${servicio.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-14 h-14 rounded-full bg-gradient-to-r ${servicio.color} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">{servicio.title}</h3>
                  <p className="text-white/70 leading-relaxed">{servicio.description}</p>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${servicio.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

