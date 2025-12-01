'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Send, Camera } from 'lucide-react'
import { handleWhatsAppSubmit } from '@/lib/whatsapp'

export default function Contacto() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    evento: '',
    fecha: '',
    mensaje: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleWhatsAppSubmit(formData, 'Fotografía de Eventos')
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        evento: '',
        fecha: '',
        mensaje: '',
      })
    }, 3000)
  }

  return (
    <section
      id="contacto"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Hablemos de
            </span>
            <span className="text-white"> Tu Evento</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
            Estamos aquí para hacer realidad tu visión. Contáctanos para una consulta gratuita
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
            <div className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <motion.a
                  href="tel:+528126902979"
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 text-white/90 hover:text-purple-400 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Teléfono</div>
                    <div className="text-white/60">+52 812 690 2979</div>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:info@fotostudio.com"
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 text-white/90 hover:text-purple-400 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-white/60">info@fotostudio.com</div>
                  </div>
                </motion.a>

                <motion.div
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 text-white/90"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Ubicación</div>
                    <div className="text-white/60">Monterrey, Nuevo León, México</div>
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
            className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Envía un Mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-white/90 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-white/90 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="+52 123 456 7890"
                />
              </div>
              <div>
                <label htmlFor="evento" className="block text-sm font-medium text-white/90 mb-2">
                  Tipo de Evento
                </label>
                <select
                  id="evento"
                  name="evento"
                  value={formData.evento}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="">Selecciona un evento</option>
                  <option value="Boda">Boda</option>
                  <option value="XV Años">XV Años</option>
                  <option value="Evento Corporativo">Evento Corporativo</option>
                  <option value="Sesión Personal">Sesión Personal</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div>
                <label htmlFor="fecha" className="block text-sm font-medium text-white/90 mb-2">
                  Fecha del Evento
                </label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-white/90 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="Cuéntanos sobre tu evento..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitted}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-purple-500/50 transition-shadow flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitted ? (
                  <>
                    <Camera className="w-5 h-5" />
                    Enviado
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar a WhatsApp
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

