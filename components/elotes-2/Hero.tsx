'use client'

import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center bg-white pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium mb-6">
              EVENTOS PREMIUM
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Elotes para
              <br />
              <span className="text-gray-400">Eventos Especiales</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
              Servicio minimalista y profesional. Elotes gourmet preparados con ingredientes frescos para bodas, XV años y celebraciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 text-base font-medium hover:bg-gray-800 transition-all"
              >
                Solicitar Cotización
                <ArrowRight size={20} />
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center px-8 py-4 text-base font-medium text-gray-900 border-2 border-gray-900 hover:bg-gray-50 transition-all"
              >
                Ver Servicios
              </a>
            </div>
          </div>
          <div className="relative h-[600px] bg-gray-100 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80"
              alt="Elotes"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

