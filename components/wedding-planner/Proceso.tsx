'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Heart, Sparkles, CheckCircle } from 'lucide-react'

const pasos = [
  {
    numero: '01',
    titulo: 'Consulta Inicial',
    descripcion: 'Conocemos tus sueños, estilo y visión para tu boda perfecta.',
    icon: Heart,
  },
  {
    numero: '02',
    titulo: 'Diseño Personalizado',
    descripcion: 'Creamos un plan detallado y personalizado según tus preferencias y presupuesto.',
    icon: Sparkles,
  },
  {
    numero: '03',
    titulo: 'Coordinación',
    descripcion: 'Gestionamos todos los proveedores y detalles para que todo esté perfecto.',
    icon: Calendar,
  },
  {
    numero: '04',
    titulo: 'El Gran Día',
    descripcion: 'Disfruta de tu boda mientras nosotros nos encargamos de que todo fluya sin problemas.',
    icon: CheckCircle,
  },
]

function PasoCard({ paso, index, isEven }: { paso: typeof pasos[0]; index: number; isEven: boolean }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const Icon = paso.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Content Card */}
      <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
        <motion.div
          whileHover={{ scale: 1.05, y: -10 }}
          className="bg-gradient-to-br from-rose-50 to-pink-50 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-rose-100 shadow-lg"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-3 rounded-lg">
              <Icon className="text-white" size={32} />
            </div>
            <div>
              <div className="text-rose-500 text-2xl font-bold">{paso.numero}</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{paso.titulo}</h3>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">{paso.descripcion}</p>
        </motion.div>
      </div>

      {/* Timeline Dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.3 }}
          className="w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full border-4 border-white shadow-lg"
        />
      </div>

      {/* Spacer */}
      <div className="w-full md:w-5/12" />
    </motion.div>
  )
}

export default function Proceso() {
  const containerRef = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      id="proceso"
      ref={containerRef.ref}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-white via-rose-50/30 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={containerRef.inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Nuestro Proceso
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cómo hacemos realidad tu boda perfecta paso a paso
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-300 via-pink-300 to-rose-300 transform -translate-x-1/2 hidden md:block" />

          <div className="space-y-32">
            {pasos.map((paso, index) => {
              const isEven = index % 2 === 0
              return (
                <PasoCard
                  key={paso.numero}
                  paso={paso}
                  index={index}
                  isEven={isEven}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

