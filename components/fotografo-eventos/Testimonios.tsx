'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote } from 'lucide-react'

const testimonios = [
  {
    nombre: 'María González',
    evento: 'Boda',
    texto: 'Increíble trabajo! Capturaron cada momento de nuestra boda de manera perfecta. Las fotos son absolutamente hermosas y superaron todas nuestras expectativas.',
    rating: 5,
    imagen: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
  },
  {
    nombre: 'Carlos Rodríguez',
    evento: 'XV Años',
    texto: 'Profesionales excepcionales. Hicieron que nuestra hija se sintiera como una princesa y las fotos reflejan toda la magia del día. Altamente recomendados!',
    rating: 5,
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
  },
  {
    nombre: 'Ana Martínez',
    evento: 'Evento Corporativo',
    texto: 'Excelente servicio para nuestro evento corporativo. Las fotos capturaron perfectamente la esencia del evento y fueron entregadas muy rápido.',
    rating: 5,
    imagen: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
  },
  {
    nombre: 'Roberto Sánchez',
    evento: 'Sesión Familiar',
    texto: 'Una experiencia maravillosa. Las fotos familiares quedaron espectaculares y el proceso fue muy cómodo. Definitivamente volveremos a contratarlos.',
    rating: 5,
    imagen: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
  },
]

export default function Testimonios() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      id="testimonios"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 bg-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
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
              Lo Que Dicen
            </span>
            <span className="text-white"> Nuestros Clientes</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mayor recompensa
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonios.map((testimonio, index) => (
            <motion.div
              key={testimonio.nombre}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-purple-500/50 transition-colors"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-purple-500/20">
                <Quote className="w-12 h-12" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonio.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/90 text-lg mb-6 leading-relaxed relative z-10">
                &ldquo;{testimonio.texto}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonio.imagen}
                  alt={testimonio.nombre}
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/50"
                />
                <div>
                  <div className="font-bold text-white">{testimonio.nombre}</div>
                  <div className="text-sm text-white/60">{testimonio.evento}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

