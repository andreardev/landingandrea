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
    <section id="galeria" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Nuestra Galería
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre la calidad y elegancia de nuestros servicios
          </p>
        </div>

        {/* Featured Image Carousel */}
        <div className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-[500px] md:h-[600px]">
            <img
              src={imagenes[currentIndex].url}
              alt={imagenes[currentIndex].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl font-display font-bold mb-2">
                {imagenes[currentIndex].title}
              </h3>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {imagenes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {imagenes.map((imagen, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${
                index === currentIndex
                  ? 'ring-4 ring-primary-500 scale-105'
                  : 'hover:scale-105 opacity-75 hover:opacity-100'
              }`}
            >
              <img
                src={imagen.url}
                alt={imagen.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

