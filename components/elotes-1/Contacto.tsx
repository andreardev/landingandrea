'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react'

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    evento: '',
    fecha: '',
    invitados: '',
    mensaje: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleWhatsAppSubmit(formData)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        evento: '',
        fecha: '',
        invitados: '',
        mensaje: '',
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contacto" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-primary-50 safe-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Mobile First */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Contáctanos
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Estamos aquí para hacer de tu evento algo especial. Solicita tu cotización gratuita.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact Info - Mobile First */}
          <div>
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-4 sm:mb-6">
                Información de Contacto
              </h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-primary-100 p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                    <Phone className="text-primary-600 sm:w-6 sm:h-6" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Teléfono</h4>
                    <a href="tel:+521234567890" className="text-sm sm:text-base text-primary-600 hover:text-primary-700 transition-colors touch-target inline-block">
                      +52 (123) 456-7890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-primary-100 p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                    <Mail className="text-primary-600 sm:w-6 sm:h-6" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Email</h4>
                    <a href="mailto:contacto@elotespremium.com" className="text-sm sm:text-base text-primary-600 hover:text-primary-700 transition-colors touch-target inline-block break-all">
                      contacto@elotespremium.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-primary-100 p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                    <MapPin className="text-primary-600 sm:w-6 sm:h-6" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Ubicación</h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      Servimos en toda la ciudad y áreas metropolitanas
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Horarios de Atención</h4>
                <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-600">
                  <p>Lunes - Viernes: 9:00 AM - 8:00 PM</p>
                  <p>Sábados: 8:00 AM - 9:00 PM</p>
                  <p>Domingos: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Mobile First */}
          <div>
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-4 sm:mb-6">
                Solicita tu Cotización
              </h3>

              {isSubmitted ? (
                <div className="text-center py-8 sm:py-12">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4 sm:w-16 sm:h-16" />
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    ¡Gracias por contactarnos!
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600">
                    Nos pondremos en contacto contigo muy pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        required
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="+52 (123) 456-7890"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="evento" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                        Tipo de Evento *
                      </label>
                      <select
                        id="evento"
                        name="evento"
                        required
                        value={formData.evento}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                      >
                        <option value="">Selecciona...</option>
                        <option value="boda">Boda</option>
                        <option value="xv-anos">XV Años</option>
                        <option value="cumpleanos">Cumpleaños</option>
                        <option value="corporativo">Evento Corporativo</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                        Fecha del Evento *
                      </label>
                      <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        required
                        value={formData.fecha}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="invitados" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Número Aproximado de Invitados *
                    </label>
                    <input
                      type="number"
                      id="invitados"
                      name="invitados"
                      required
                      min="1"
                      value={formData.invitados}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Ej: 100"
                    />
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Mensaje Adicional
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={4}
                      value={formData.mensaje}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                      placeholder="Cuéntanos más sobre tu evento..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="touch-target w-full bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send size={18} className="sm:w-5 sm:h-5" />
                    <span>Enviar a WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
