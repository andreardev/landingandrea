'use client'

import { Heart, Users, Sparkles, Award, Clock, MapPin } from 'lucide-react'

const servicios = [
  {
    icon: Heart,
    title: 'Bodas',
    description: 'Haz que tu día especial sea aún más memorable con nuestros elotes gourmet. Servicio elegante y profesional para tu boda.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Sparkles,
    title: 'XV Años',
    description: 'Celebra esta ocasión única con un toque especial. Elotes premium que complementan perfectamente tu fiesta de XV años.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Users,
    title: 'Fiestas y Eventos',
    description: 'Desde cumpleaños hasta celebraciones corporativas. Servicio adaptable a cualquier tipo de evento social.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Award,
    title: 'Calidad Premium',
    description: 'Ingredientes frescos y de la más alta calidad. Cada elote es preparado con dedicación y atención al detalle.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Clock,
    title: 'Servicio Puntual',
    description: 'Llegamos a tiempo y listos para servir. Nuestro equipo profesional garantiza un servicio impecable.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: MapPin,
    title: 'Cobertura Amplia',
    description: 'Servimos en toda la ciudad y áreas metropolitanas. Llevamos el sabor hasta donde lo necesites.',
    color: 'from-indigo-500 to-purple-500',
  },
]

export default function Servicios() {
  return (
    <section id="servicios" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Especializados en hacer de tu evento una experiencia única e inolvidable
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio, index) => {
            const Icon = servicio.icon
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${servicio.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                  {servicio.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {servicio.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
              ¿Listo para hacer tu evento inolvidable?
            </h3>
            <p className="text-xl mb-8 text-primary-100">
              Contáctanos hoy y recibe una cotización personalizada
            </p>
            <a
              href="#contacto"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Solicitar Cotización Gratuita
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

