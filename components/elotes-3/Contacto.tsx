'use client'

import { useState } from 'react'
import { handleWhatsAppSubmit } from '@/lib/whatsapp'

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleWhatsAppSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contacto" className="py-24 bg-gradient-to-br from-blue-500 to-purple-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            📞 CONTACTO
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-yellow-400">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-black text-gray-900 mb-2">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 border-4 border-pink-400 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-black text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-4 border-pink-400 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-black text-gray-900 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              required
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-4 py-3 border-4 border-pink-400 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm font-black text-gray-900 mb-2">
              Mensaje
            </label>
            <textarea
              name="mensaje"
              rows={6}
              value={formData.mensaje}
              onChange={handleChange}
              className="w-full px-4 py-3 border-4 border-pink-400 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-5 rounded-xl font-black text-xl hover:from-pink-600 hover:to-purple-600 transition-all shadow-2xl"
          >
            🚀 ENVIAR A WHATSAPP
          </button>
        </form>
      </div>
    </section>
  )
}

