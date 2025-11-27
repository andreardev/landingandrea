'use client'

import { ArrowDown, Sparkles, Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 gradient-overlay"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles size={18} className="text-yellow-300" />
            <span className="text-sm font-medium">El Sabor que Hace Inolvidable tu Evento</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-balance leading-tight">
            Elotes Premium
            <br />
            <span className="text-primary-300">para Eventos Especiales</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto text-balance">
            Transformamos tus celebraciones con elotes gourmet de la más alta calidad.
            Bodas, XV años, fiestas y eventos corporativos con un toque único y elegante.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contacto"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-2xl hover:shadow-primary-500/50 hover:scale-105 flex items-center gap-2"
            >
              <Calendar size={20} />
              Solicitar Cotización
            </a>
            <a
              href="#servicios"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold transition-all border-2 border-white/30"
            >
              Ver Servicios
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <a href="#servicios" className="inline-block">
              <ArrowDown size={32} className="text-white/70" />
            </a>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}

