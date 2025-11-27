'use client'

import { Heart, Sparkles, Users, Award, Clock, MapPin } from 'lucide-react'

const servicios = [
  { icon: Heart, title: 'Bodas', description: 'Servicio elegante para tu día especial.' },
  { icon: Sparkles, title: 'XV Años', description: 'Celebra con estilo y sabor único.' },
  { icon: Users, title: 'Eventos', description: 'Adaptable a cualquier celebración.' },
  { icon: Award, title: 'Calidad', description: 'Ingredientes frescos y premium.' },
  { icon: Clock, title: 'Puntualidad', description: 'Servicio profesional garantizado.' },
  { icon: MapPin, title: 'Cobertura', description: 'Llegamos donde lo necesites.' },
]

export default function Servicios() {
  return (
    <section id="servicios" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Servicios
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Soluciones minimalistas para eventos especiales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((servicio, index) => {
            const Icon = servicio.icon
            return (
              <div
                key={index}
                className="bg-white p-8 border border-gray-200 hover:border-gray-900 transition-all group"
              >
                <div className="w-12 h-12 bg-gray-900 flex items-center justify-center mb-6 group-hover:bg-gray-800 transition-colors">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {servicio.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {servicio.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

