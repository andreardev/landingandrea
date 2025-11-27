'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const imagenes = [
  {
    url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80',
    alt: 'Elotes preparados para evento',
    title: 'Preparación Artesanal',
  },
  {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    alt: 'Elotes gourmet en presentación elegante',
    title: 'Presentación Elegante',
  },
  {
    url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    alt: 'Elotes en evento de boda',
    title: 'Eventos Especiales',
  },
  {
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    alt: 'Variedad de elotes gourmet',
    title: 'Variedad Premium',
  },
  {
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    alt: 'Elotes en celebración',
    title: 'Celebraciones Únicas',
  },
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    alt: 'Servicio profesional de elotes',
    title: 'Servicio Profesional',
  },
]

export default function Galeria() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imagenes.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length)
  }

  return (
    <section id="galeria" className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Mobile First */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Nuestra Galería
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Descubre la calidad y elegancia de nuestros servicios
          </p>
        </div>

        {/* Featured Image Carousel - Mobile First */}
        <div className="relative mb-6 sm:mb-8 lg:mb-12 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl">
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <img
              src={imagenes[currentIndex].url}
              alt={imagenes[currentIndex].alt}
              className="w-full h-full object-cover"
              loading={currentIndex === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold mb-2">
                {imagenes[currentIndex].title}
              </h3>
            </div>

            {/* Navigation Buttons - Mobile Optimized */}
            <button
              onClick={prevImage}
              className="touch-target absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white active:bg-white text-gray-900 p-2 sm:p-3 rounded-full shadow-lg transition-all active:scale-90"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextImage}
              className="touch-target absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white active:bg-white text-gray-900 p-2 sm:p-3 rounded-full shadow-lg transition-all active:scale-90"
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </button>

            {/* Dots Indicator - Mobile Friendly */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
              {imagenes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`touch-target h-1.5 sm:h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-6 sm:w-8 bg-white'
                      : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/75 active:bg-white/90'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnail Grid - Mobile First */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
          {imagenes.map((imagen, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`touch-target relative aspect-square rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all ${
                index === currentIndex
                  ? 'ring-2 sm:ring-4 ring-primary-500 scale-105 z-10'
                  : 'hover:scale-105 opacity-75 hover:opacity-100 active:scale-95'
              }`}
              aria-label={`Ver ${imagen.title}`}
            >
              <img
                src={imagen.url}
                alt={imagen.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
