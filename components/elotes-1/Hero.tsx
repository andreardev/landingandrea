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
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
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

      {/* Content - Mobile First */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-12 sm:py-16 lg:py-20">
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6">
            <Sparkles size={16} className="text-yellow-300 sm:w-[18px] sm:h-[18px]" />
            <span className="text-xs sm:text-sm font-medium">El Sabor que Hace Inolvidable tu Evento</span>
          </div>

          {/* Heading - Mobile Optimized */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-display font-bold mb-4 sm:mb-6 text-balance leading-[1.1] px-2">
            Elotes Premium
            <br />
            <span className="text-primary-200">para Eventos Especiales</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-100 max-w-3xl mx-auto text-balance px-4">
            Transformamos tus celebraciones con elotes gourmet de la más alta calidad.
            Bodas, XV años, fiestas y eventos corporativos con un toque único y elegante.
          </p>

          {/* CTA Buttons - Mobile First */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4">
            <a
              href="#contacto"
              className="touch-target bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all shadow-2xl hover:shadow-primary-500/50 active:scale-95 flex items-center justify-center gap-2"
            >
              <Calendar size={18} className="sm:w-5 sm:h-5" />
              <span>Solicitar Cotización</span>
            </a>
            <a
              href="#servicios"
              className="touch-target bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all border-2 border-white/30 active:scale-95 flex items-center justify-center"
            >
              Ver Servicios
            </a>
          </div>

          {/* Scroll indicator - Mobile Friendly */}
          <div className="mt-12 sm:mt-16 animate-bounce">
            <a href="#servicios" className="inline-block touch-target">
              <ArrowDown size={28} className="text-white/70 sm:w-8 sm:h-8" />
            </a>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}
