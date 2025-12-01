'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Clock, Award, Sparkles, Crown } from 'lucide-react'

const milestones = [
  {
    year: '1905',
    title: 'El Inicio',
    description: 'Hans Wilsdorf funda Rolex con una visión: crear relojes precisos y elegantes.',
    icon: Clock,
  },
  {
    year: '1926',
    title: 'Oyster',
    description: 'Nace el primer reloj hermético del mundo, revolucionando la industria.',
    icon: Award,
  },
  {
    year: '1953',
    title: 'Submariner',
    description: 'El primer reloj de buceo con garantía de 100 metros de profundidad.',
    icon: Sparkles,
  },
  {
    year: '2024',
    title: 'Masterpiece',
    description: 'La culminación de más de un siglo de perfección y excelencia.',
    icon: Crown,
  },
]

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              EL VIAJE
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Más de un siglo perfeccionando cada detalle
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-500 via-gold-400 to-gold-500 transform -translate-x-1/2" />

          <div className="space-y-32">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon
              const isEven = index % 2 === 0
              const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

              return (
                <motion.div
                  key={milestone.year}
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
                      className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl p-8 rounded-2xl border border-gold-500/20 shadow-2xl"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gold-500/20 p-3 rounded-lg">
                          <Icon className="text-gold-500" size={32} />
                        </div>
                        <div>
                          <div className="text-gold-500 text-2xl font-bold">{milestone.year}</div>
                          <h3 className="text-2xl font-bold text-white">{milestone.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{milestone.description}</p>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.3 }}
                      className="w-6 h-6 bg-gold-500 rounded-full border-4 border-black shadow-lg"
                    />
                  </div>

                  {/* Spacer */}
                  <div className="w-full md:w-5/12" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

