'use client'

const testimonios = [
  {
    nombre: 'María González',
    evento: 'Boda',
    texto: '¡Los elotes fueron el HIT de nuestra boda! Todos quedaron encantados. ¡SÚPER recomendados!',
  },
  {
    nombre: 'Carlos Ramírez',
    evento: 'XV Años',
    texto: '¡Increíble! Superó todas nuestras expectativas. ¡El mejor servicio!',
  },
]

export default function Testimonios() {
  return (
    <section id="testimonios" className="py-24 bg-gradient-to-br from-yellow-400 to-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            ⭐ TESTIMONIOS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonios.map((testimonio, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-pink-400">
              <div className="text-4xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-800 mb-6 text-lg font-bold leading-relaxed">
                "{testimonio.texto}"
              </p>
              <div>
                <h4 className="font-black text-gray-900 text-xl">{testimonio.nombre}</h4>
                <p className="text-pink-600 font-bold">{testimonio.evento}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

