'use client'

const testimonios = [
  {
    nombre: 'María González',
    evento: 'Boda',
    texto: 'Servicio excepcional de lujo. Cada detalle fue perfecto y nuestros invitados quedaron impresionados.',
  },
  {
    nombre: 'Carlos Ramírez',
    evento: 'XV Años',
    texto: 'Experiencia premium que superó todas nuestras expectativas. Elegancia y calidad incomparables.',
  },
]

export default function Testimonios() {
  return (
    <section id="testimonios" className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 text-sm font-bold tracking-widest mb-6">
            TESTIMONIOS
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight">
            Clientes Exclusivos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonios.map((testimonio, index) => (
            <div key={index} className="bg-gray-900 border border-yellow-500/20 p-8 hover:border-yellow-500/50 transition-all">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed font-light">
                "{testimonio.texto}"
              </p>
              <div>
                <h4 className="font-bold text-white text-xl mb-1">{testimonio.nombre}</h4>
                <p className="text-yellow-500 text-sm font-medium">{testimonio.evento}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

