'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2])
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section
      id="vision"
      ref={containerRef}
      className="relative py-24 sm:py-32 lg:py-40 min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        </div>
      </motion.div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8"
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            animate={inView ? { opacity: 1, clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
              LA VISIÓN
            </span>
          </motion.h2>

          <motion.p
            className="text-2xl sm:text-3xl md:text-4xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            No solo un reloj. Una declaración de excelencia, una herencia de perfección,
            un símbolo de logros extraordinarios.
          </motion.p>

          <motion.p
            className="text-xl text-gold-500 font-light max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Cada segundo cuenta. Cada detalle importa. Cada momento es una oportunidad
            para demostrar quién eres.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

