'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote } from 'lucide-react'

const testimonios = [
  {
    nombre: 'María González',
    evento: 'Boda',
    texto: 'La decoración floral superó todas nuestras expectativas. Cada detalle fue perfecto y las flores se mantuvieron frescas durante todo el evento.',
    imagen: 'https://images.unsplash.com/photo-1492562080023-4713a95c72a9?w=200&q=80',
    rating: 5,
  },
  {
    nombre: 'Ana Martínez',
    evento: 'Quinceañera',
    texto: 'El equipo fue increíble y muy profesional. La decoración fue exactamente lo que soñamos y todos nuestros invitados quedaron impresionados.',
    imagen: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    rating: 5,
  },
  {
    nombre: 'Carlos Rodríguez',
    evento: 'Evento Corporativo',
    texto: 'Excelente servicio y decoración profesional. El evento fue un éxito gracias a la calidad de los arreglos florales y la atención al detalle.',
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 5,
  },
]

function TestimonioCard({ testimonio, index }: { testimonio: typeof testimonios[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-shadow border border-green-50"
    >
      <Quote className="w-8 h-8 text-green-300 mb-4" />
      <p className="text-gray-700 mb-6 leading-relaxed italic">
        &ldquo;{testimonio.texto}&rdquo;
      </p>
      <div className="flex items-center gap-4">
        <img
          src={testimonio.imagen}
          alt={testimonio.nombre}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-bold text-gray-900">{testimonio.nombre}</div>
          <div className="text-sm text-gray-500 mb-1">{testimonio.evento}</div>
          <div className="flex items-center gap-1">
            {[...Array(testimonio.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonios() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      id="testimonios"
      ref={ref}
      className="relative py-20 sm:py-32 bg-gradient-to-b from-green-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Lo Que Dicen Nuestros Clientes
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Testimonios de clientes satisfechos que confiaron en nosotros para sus eventos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonios.map((testimonio, index) => (
            <TestimonioCard key={testimonio.nombre} testimonio={testimonio} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

