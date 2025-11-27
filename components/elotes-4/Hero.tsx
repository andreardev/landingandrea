'use client'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block px-6 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 rounded-sm mb-8 font-bold tracking-widest text-sm">
          EXCLUSIVO • PREMIUM • LUXURY
        </div>

        <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 leading-tight tracking-tight">
          <span className="text-white">ELOTES</span>
          <br />
          <span className="text-yellow-500">PREMIUM</span>
        </h1>

        <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
          Experiencia gastronómica de lujo para eventos exclusivos.
          <br />
          Servicio refinado para bodas, XV años y celebraciones de élite.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="#contacto"
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-12 py-5 text-lg font-bold transition-all shadow-2xl shadow-yellow-500/50 hover:scale-105 tracking-wider uppercase"
          >
            Solicitar Cotización
          </a>
          <a
            href="#servicios"
            className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 px-12 py-5 text-lg font-bold transition-all tracking-wider uppercase"
          >
            Explorar Servicios
          </a>
        </div>
      </div>
    </section>
  )
}

