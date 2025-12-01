'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield, Zap, Droplet, Gem } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Resistencia Total',
    description: 'Caja Oyster garantizada hasta 300 metros de profundidad. Protección absoluta.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Zap,
    title: 'Precisión Certificada',
    description: 'Movimiento automático certificado por COSC. Precisión de cronómetro suizo.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Droplet,
    title: 'Impermeable',
    description: 'Sistema de corona Triplock. Hermeticidad garantizada en cualquier condición.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Gem,
    title: 'Materiales Premium',
    description: 'Oro 18k, acero inoxidable 904L y cerámica. Solo los mejores materiales.',
    color: 'from-gold-500 to-yellow-600',
  },
]

export default function Innovation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section
      id="innovation"
      ref={containerRef}
      className="relative py-24 sm:py-32 lg:py-40 bg-black overflow-hidden"
    >
      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              INNOVACIÓN
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tecnología de vanguardia en cada componente
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

            return (
              <motion.div
                key={feature.title}
                ref={ref}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  z: 50,
                }}
                style={{ perspective: 1000 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl p-8 rounded-2xl border border-gold-500/20 h-full shadow-2xl">
                  <motion.div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="text-white" size={32} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 rounded-2xl blur-2xl -z-10`}
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

