'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MessageCircle, Calendar, Camera, Image, CheckCircle } from 'lucide-react'

const pasos = [
  {
    icon: MessageCircle,
    title: 'Consulta Inicial',
    description: 'Platicamos sobre tu evento, tus expectativas y cómo podemos hacer realidad tu visión.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Calendar,
    title: 'Reserva y Planificación',
    description: 'Confirmamos la fecha, ubicación y todos los detalles importantes de tu evento.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Camera,
    title: 'Sesión Fotográfica',
    description: 'Capturamos cada momento especial con profesionalismo y creatividad artística.',
    color: 'from-rose-500 to-purple-500',
  },
  {
    icon: Image,
    title: 'Edición y Entrega',
    description: 'Procesamos y editamos tus fotos con cuidado artístico y las entregamos en formato digital.',
    color: 'from-purple-500 to-indigo-500',
  },
]

export default function Proceso() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      id="proceso"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Nuestro
            </span>
            <span className="text-white"> Proceso</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
            Un proceso simple y profesional para garantizar resultados excepcionales
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transform -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {pasos.map((paso, index) => {
              const Icon = paso.icon
              return (
                <motion.div
                  key={paso.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-black border-2 border-purple-500 flex items-center justify-center text-white font-bold text-lg z-10">
                    {index + 1}
                  </div>

                  {/* Card */}
                  <div className="relative bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 h-full hover:border-purple-500/50 transition-colors">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${paso.color} flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-3">{paso.title}</h3>
                    <p className="text-white/70 leading-relaxed">{paso.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 sm:mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl shadow-2xl hover:shadow-purple-500/50 transition-shadow flex items-center gap-2 mx-auto"
          >
            <CheckCircle className="w-6 h-6" />
            Iniciar Proceso
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

