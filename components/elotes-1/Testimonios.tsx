'use client'

import { Star, Quote } from 'lucide-react'

const testimonios = [
  {
    nombre: 'María González',
    evento: 'Boda',
    calificacion: 5,
    texto: 'Los elotes fueron el hit de nuestra boda. Todos los invitados quedaron encantados. Servicio impecable y sabor excepcional. ¡Altamente recomendados!',
    imagen: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
  },
  {
    nombre: 'Carlos Ramírez',
    evento: 'XV Años',
    calificacion: 5,
    texto: 'Para la fiesta de XV de mi hija contratamos Elotes Premium y superó todas nuestras expectativas. Presentación elegante y sabor increíble.',
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
  },
  {
    nombre: 'Ana Martínez',
    evento: 'Evento Corporativo',
    calificacion: 5,
    texto: 'Contratamos sus servicios para un evento corporativo y fue un éxito total. Profesionales, puntuales y con productos de primera calidad.',
    imagen: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
  },
  {
    nombre: 'Roberto Sánchez',
    evento: 'Fiesta de Cumpleaños',
    calificacion: 5,
    texto: 'Excelente servicio desde el primer contacto hasta la entrega. Los elotes estaban deliciosos y la presentación fue impecable. Definitivamente los volveremos a contratar.',
    imagen: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
  },
]

export default function Testimonios() {
  return (
    <section id="testimonios" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Mobile First */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Lo que Dicen Nuestros Clientes
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Miles de eventos exitosos y clientes satisfechos
          </p>
        </div>

        {/* Testimonials Grid - Mobile First */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {testimonios.map((testimonio, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 relative active:scale-[0.98]"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-primary-200">
                <Quote size={40} className="sm:w-12 sm:h-12" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                {[...Array(testimonio.calificacion)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400 sm:w-5 sm:h-5"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed relative z-10">
                "{testimonio.texto}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={testimonio.imagen}
                  alt={testimonio.nombre}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 sm:ring-4 ring-primary-100"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                    {testimonio.nombre}
                  </h4>
                  <p className="text-sm sm:text-base text-primary-600 font-medium">
                    {testimonio.evento}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section - Mobile First */}
        <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary-600 mb-1 sm:mb-2">
              500+
            </div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Eventos Realizados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary-600 mb-1 sm:mb-2">
              98%
            </div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Clientes Satisfechos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary-600 mb-1 sm:mb-2">
              5★
            </div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Calificación Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary-600 mb-1 sm:mb-2">
              10+
            </div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Años de Experiencia</div>
          </div>
        </div>
      </div>
    </section>
  )
}
