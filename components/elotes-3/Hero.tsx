'use client'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 pt-20"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="inline-block px-4 py-2 bg-yellow-400 text-gray-900 rounded-full mb-6 font-bold">
          🎉 ¡FIESTA Y SABOR! 🎉
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
          ELOTES
          <br />
          <span className="text-yellow-300">PREMIUM</span>
        </h1>

        <p className="text-2xl md:text-3xl mb-8 font-bold max-w-3xl mx-auto">
          ¡Hacemos que tu evento sea INCREÍBLE! 🌈
          <br />
          Bodas, XV años, fiestas y más con el mejor sabor
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#contacto"
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-10 py-5 rounded-full text-xl font-black transition-all shadow-2xl hover:scale-110 transform"
          >
            🎊 ¡QUIERO COTIZACIÓN!
          </a>
          <a
            href="#servicios"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-10 py-5 rounded-full text-xl font-bold transition-all border-4 border-white"
          >
            Ver Servicios
          </a>
        </div>
      </div>
    </section>
  )
}

