'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Send, Calendar } from 'lucide-react'
import { handleWhatsAppSubmit } from '@/lib/whatsapp'

export default function Contacto() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    evento: '',
    fecha: '',
    mensaje: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleWhatsAppSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      id="contacto"
      ref={ref}
      className="relative py-20 sm:py-32 bg-gradient-to-br from-pink-50 via-rose-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Agenda Tu Cita
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Contáctanos para reservar tu cita y recibir una consulta personalizada
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
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-pink-50">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <motion.a
                  href="tel:+1234567890"
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 text-gray-700 hover:text-pink-600 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Teléfono</div>
                    <div className="text-gray-600">+1 (234) 567-890</div>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:info@bellezaelegante.com"
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 text-gray-700 hover:text-pink-600 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-600">info@bellezaelegante.com</div>
                  </div>
                </motion.a>

                <motion.div
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 text-gray-700"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Dirección</div>
                    <div className="text-gray-600">123 Beauty Street, City, Country</div>
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
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-pink-50"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Solicita tu Cita</h3>
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="evento" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Evento
                </label>
                <select
                  id="evento"
                  name="evento"
                  value={formData.evento}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                >
                  <option value="">Selecciona un evento</option>
                  <option value="Boda">Boda</option>
                  <option value="Quinceañera">Quinceañera</option>
                  <option value="Evento Social">Evento Social</option>
                  <option value="Evento Corporativo">Evento Corporativo</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div>
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha del Evento
                </label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                  placeholder="Cuéntanos sobre tu evento y qué estilo buscas..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
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

