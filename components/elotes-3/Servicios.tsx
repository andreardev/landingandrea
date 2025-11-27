'use client'

const servicios = [
  { emoji: '💒', title: 'Bodas', color: 'from-pink-400 to-rose-500' },
  { emoji: '👑', title: 'XV Años', color: 'from-purple-400 to-pink-500' },
  { emoji: '🎉', title: 'Fiestas', color: 'from-blue-400 to-cyan-500' },
  { emoji: '⭐', title: 'Premium', color: 'from-yellow-400 to-orange-500' },
  { emoji: '⏰', title: 'Puntual', color: 'from-green-400 to-emerald-500' },
  { emoji: '📍', title: 'Cobertura', color: 'from-indigo-400 to-purple-500' },
]

export default function Servicios() {
  return (
    <section id="servicios" className="py-24 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            🎯 NUESTROS SERVICIOS
          </h2>
          <p className="text-xl text-gray-700 font-bold">
            ¡Hacemos que cada evento sea ESPECIAL!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl hover:scale-105 transition-transform border-4 border-transparent hover:border-pink-400"
            >
              <div className={`text-6xl mb-4 bg-gradient-to-br ${servicio.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto`}>
                {servicio.emoji}
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 text-center">
                {servicio.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

