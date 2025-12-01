'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Send, Heart } from 'lucide-react'
import { handleWhatsAppSubmit } from '@/lib/whatsapp'

export default function Contacto() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleWhatsAppSubmit(formData, 'Wedding Planner')
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        nombre: '',
        email: '',
        mensaje: '',
      })
    }, 3000)
  }

  return (
    <section
      id="contacto"
      ref={ref}
      className="relative py-20 sm:py-32 bg-gradient-to-br from-rose-50 via-pink-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Hablemos de Tu Boda
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos aquí para hacer realidad tus sueños. Contáctanos para una consulta gratuita
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-rose-50">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <motion.a
                  href="tel:+1234567890"
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 text-gray-700 hover:text-rose-600 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Teléfono</div>
                    <div className="text-gray-600">+1 (234) 567-890</div>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:info@dreamweddings.com"
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 text-gray-700 hover:text-rose-600 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-600">info@dreamweddings.com</div>
                  </div>
                </motion.a>

                <motion.div
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 text-gray-700"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Dirección</div>
                    <div className="text-gray-600">123 Wedding Street, City, Country</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-rose-50"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Envía un Mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={5}
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none"
                  placeholder="Cuéntanos sobre tu boda soñada..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar a WhatsApp
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

