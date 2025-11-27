'use client'

const testimonios = [
  {
    nombre: 'María González',
    evento: 'Boda',
    texto: 'Servicio impecable y sabor excepcional. Altamente recomendados.',
  },
  {
    nombre: 'Carlos Ramírez',
    evento: 'XV Años',
    texto: 'Superó todas nuestras expectativas. Presentación elegante.',
  },
]

export default function Testimonios() {
  return (
    <section id="testimonios" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Testimonios
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonios.map((testimonio, index) => (
            <div key={index} className="bg-white p-8 border-l-4 border-gray-900">
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                &ldquo;{testimonio.texto}&rdquo;
              </p>
              <div>
                <h4 className="font-bold text-gray-900">{testimonio.nombre}</h4>
                <p className="text-gray-600 text-sm">{testimonio.evento}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

