'use client'

import { useState } from 'react'

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulario enviado:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contacto" className="py-24 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 text-sm font-bold tracking-widest mb-6">
            CONTACTO
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight">
            Solicite su Cotización
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 border border-yellow-500/20 p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 tracking-wide">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black border border-yellow-500/20 text-white focus:border-yellow-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 tracking-wide">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black border border-yellow-500/20 text-white focus:border-yellow-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-bold text-gray-300 mb-2 tracking-wide">
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              required
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black border border-yellow-500/20 text-white focus:border-yellow-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm font-bold text-gray-300 mb-2 tracking-wide">
              Mensaje
            </label>
            <textarea
              name="mensaje"
              rows={6}
              value={formData.mensaje}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black border border-yellow-500/20 text-white focus:border-yellow-500 focus:outline-none transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-8 bg-yellow-500 text-black px-8 py-5 font-bold hover:bg-yellow-400 transition-all tracking-wider uppercase shadow-lg shadow-yellow-500/50"
          >
            Enviar Solicitud
          </button>
        </form>
      </div>
    </section>
  )
}

