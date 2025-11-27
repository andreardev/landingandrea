'use client'

const servicios = [
  { title: 'Bodas', desc: 'Servicio exclusivo para tu día especial' },
  { title: 'XV Años', desc: 'Celebración de lujo y elegancia' },
  { title: 'Eventos', desc: 'Experiencias gastronómicas premium' },
  { title: 'Calidad', desc: 'Ingredientes selectos y preparación artesanal' },
  { title: 'Puntualidad', desc: 'Servicio impecable y profesional' },
  { title: 'Cobertura', desc: 'Disponible en toda la región' },
]

export default function Servicios() {
  return (
    <section id="servicios" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 text-sm font-bold tracking-widest mb-6">
            SERVICIOS
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight">
            Experiencias Premium
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Servicio de lujo para eventos exclusivos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-yellow-500/20 p-8 hover:border-yellow-500/50 transition-all group"
            >
              <div className="w-16 h-16 bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mb-6 group-hover:bg-yellow-500/20 transition-colors">
                <div className="w-2 h-2 bg-yellow-500"></div>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-3 tracking-wide">
                {servicio.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {servicio.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

