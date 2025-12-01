'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Clock, Globe, Users } from 'lucide-react'

const stats = [
  {
    icon: Award,
    value: 100,
    suffix: '+',
    label: 'Años de Excelencia',
    description: 'Más de un siglo perfeccionando la relojería',
  },
  {
    icon: Clock,
    value: 0.001,
    suffix: 's',
    label: 'Precisión Diaria',
    description: 'Desviación máxima permitida',
  },
  {
    icon: Globe,
    value: 190,
    suffix: '+',
    label: 'Países',
    description: 'Presencia mundial',
  },
  {
    icon: Users,
    value: 8000,
    suffix: '+',
    label: 'Artesanos',
    description: 'Maestros relojeros dedicados',
  },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const textRef = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const { ref: inViewRef, inView: isInView } = useInView({ threshold: 0.2, triggerOnce: true })

  // Combine refs
  const combinedRef = (node: HTMLSpanElement | null) => {
    if (textRef) {
      (textRef as React.MutableRefObject<HTMLSpanElement | null>).current = node
    }
    if (typeof inViewRef === 'function') {
      inViewRef(node)
    } else if (inViewRef) {
      (inViewRef as React.MutableRefObject<HTMLSpanElement | null>).current = node
    }
  }

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (textRef.current) {
        if (value < 1) {
          textRef.current.textContent = latest.toFixed(3) + suffix
        } else {
          textRef.current.textContent = Math.round(latest).toLocaleString() + suffix
        }
      }
    })
  }, [springValue, suffix, value])

  return <span ref={combinedRef}>0{suffix}</span>
}

export default function Numbers() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      id="numbers"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 bg-black overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              EN NÚMEROS
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="text-center"
              >
                <motion.div
                  className="inline-flex p-4 bg-gold-500/20 rounded-full mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="text-gold-500" size={32} />
                </motion.div>
                <div className="text-5xl sm:text-6xl font-bold text-gold-500 mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{stat.label}</h3>
                <p className="text-gray-400 text-sm">{stat.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

