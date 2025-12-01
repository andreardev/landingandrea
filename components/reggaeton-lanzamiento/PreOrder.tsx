'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Music, Download, Gift, Clock } from 'lucide-react'

const benefits = [
  {
    icon: Download,
    title: 'Descarga Inmediata',
    description: 'Acceso instantáneo al álbum completo en alta calidad',
  },
  {
    icon: Gift,
    title: 'Contenido Exclusivo',
    description: 'Bonus tracks y remixes que no encontrarás en ningún otro lugar',
  },
  {
    icon: Clock,
    title: 'Acceso Anticipado',
    description: 'Escucha el álbum 48 horas antes del lanzamiento oficial',
  },
]

function BenefitCard({ benefit, index }: { benefit: typeof benefits[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const Icon = benefit.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-md border border-purple-500/20 rounded-xl p-6 sm:p-8"
    >
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </div>
      <h3 className="text-white font-bold text-lg sm:text-xl mb-2">{benefit.title}</h3>
      <p className="text-white/70 text-sm sm:text-base">{benefit.description}</p>
    </motion.div>
  )
}

export default function PreOrder() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      id="preorder"
      ref={ref}
      className="relative py-20 sm:py-32 bg-gradient-to-b from-black via-purple-900/30 to-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-purple-500/30">
            <Music className="w-5 h-5 text-purple-400" />
            <span className="text-white/90 font-medium">PRE-ORDER DISPONIBLE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              RESERVA TU COPIA
            </span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            Sé el primero en tener el álbum y obtén beneficios exclusivos
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 sm:p-12 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <div className="relative z-10 text-center">
            <div className="mb-6">
              <span className="text-white/80 text-sm sm:text-base line-through mr-2">
                $19.99
              </span>
              <span className="text-4xl sm:text-5xl font-black text-white">
                $14.99
              </span>
            </div>
            <p className="text-white/90 text-lg sm:text-xl mb-8">
              Precio especial de lanzamiento
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-600 px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl shadow-2xl"
            >
              Pre-Ordenar Ahora
            </motion.button>
            <p className="text-white/70 text-sm sm:text-base mt-4">
              Lanzamiento: 15 de Diciembre, 2024
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

