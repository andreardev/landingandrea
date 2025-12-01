'use client'

import { useState, useEffect, useRef } from 'react'
import { Camera, Sparkles, Star, ZoomIn, X, Heart, Share2 } from 'lucide-react'

interface Foto {
  id: number
  url: string
  titulo: string
  categoria: string
  descripcion: string
}

export default function CaleidoscopioMomentosPage() {
  const [rotacion, setRotacion] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [fotoSeleccionada, setFotoSeleccionada] = useState<Foto | null>(null)
  const [autoRotacion, setAutoRotacion] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const fotos: Foto[] = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
      titulo: 'Boda Elegante',
      categoria: 'Bodas',
      descripcion: 'Capturando el amor en su momento más puro',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
      titulo: 'XV Años',
      categoria: 'XV Años',
      descripcion: 'Celebrando quince años de sueños',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
      titulo: 'Evento Corporativo',
      categoria: 'Corporativo',
      descripcion: 'Profesionalismo y elegancia',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80',
      titulo: 'Fiesta de Cumpleaños',
      categoria: 'Cumpleaños',
      descripcion: 'Momentos de alegría y celebración',
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
      titulo: 'Sesión de Retrato',
      categoria: 'Retratos',
      descripcion: 'Capturando tu esencia única',
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
      titulo: 'Concierto en Vivo',
      categoria: 'Eventos',
      descripcion: 'La energía de la música capturada',
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80',
      titulo: 'Graduación',
      categoria: 'Graduaciones',
      descripcion: 'Celebrando logros y nuevos comienzos',
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80',
      titulo: 'Aniversario',
      categoria: 'Aniversarios',
      descripcion: 'Años de amor y compromiso',
    },
  ]

  useEffect(() => {
    if (!autoRotacion) return

    const intervalo = setInterval(() => {
      setRotacion((prev) => prev + 0.5)
    }, 50)

    return () => clearInterval(intervalo)
  }, [autoRotacion])

  const handleRotacionManual = (delta: number) => {
    setAutoRotacion(false)
    setRotacion((prev) => prev + delta)
  }

  const abrirFoto = (foto: Foto) => {
    setFotoSeleccionada(foto)
    setZoom(true)
    setAutoRotacion(false)
  }

  const cerrarZoom = () => {
    setZoom(false)
    setTimeout(() => {
      setFotoSeleccionada(null)
      setAutoRotacion(true)
    }, 300)
  }

  // Crear patrones de caleidoscopio (reflejos simétricos)
  const crearPatrones = () => {
    const patrones = []
    const segmentos = 8 // 8 segmentos simétricos

    for (let i = 0; i < segmentos; i++) {
      const angulo = (360 / segmentos) * i
      patrones.push(angulo)
    }

    return patrones
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 relative overflow-hidden">
      {/* Efectos de luz y reflejos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        
        {/* Reflejos de luz */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-white/20">
            <Camera size={20} className="text-yellow-300" />
            <span className="text-sm sm:text-base font-medium text-white">El Caleidoscopio de Momentos</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-shadow-lg">
            Momentos que Brillan
          </h1>
          <p className="text-lg sm:text-xl text-purple-200 max-w-2xl mx-auto">
            Gira y descubre cada momento capturado en su máxima belleza
          </p>
        </div>

        {/* Caleidoscopio Interactivo */}
        <div className="relative mb-8 sm:mb-12 w-full max-w-4xl">
          <div className="relative aspect-square max-w-2xl mx-auto">
            {/* Contenedor del caleidoscopio */}
            <div
              ref={containerRef}
              className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/30 shadow-2xl"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                boxShadow: '0 0 60px rgba(255,255,255,0.3), inset 0 0 60px rgba(255,255,255,0.1)',
              }}
            >
              {/* Patrones simétricos del caleidoscopio */}
              {crearPatrones().map((anguloBase, index) => (
                <div
                  key={index}
                  className="absolute inset-0 origin-center"
                  style={{
                    transform: `rotate(${anguloBase + rotacion}deg)`,
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(Math.PI / 4)}% ${50 - 50 * Math.sin(Math.PI / 4)}%)`,
                  }}
                >
                  {/* Fotos reflejadas */}
                  {fotos.map((foto, fotoIndex) => {
                    const anguloFoto = (360 / fotos.length) * fotoIndex
                    const radio = 35
                    const x = 50 + radio * Math.cos((anguloFoto * Math.PI) / 180)
                    const y = 50 + radio * Math.sin((anguloFoto * Math.PI) / 180)

                    return (
                      <div
                        key={foto.id}
                        className="absolute cursor-pointer transform transition-all duration-300 hover:scale-110"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: `translate(-50%, -50%) rotate(${-anguloBase - rotacion}deg) scaleX(-1)`,
                          width: '120px',
                          height: '120px',
                        }}
                        onClick={() => abrirFoto(foto)}
                      >
                        <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-white/50 shadow-xl">
                          <img
                            src={foto.url}
                            alt={foto.titulo}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-2 left-2 right-2">
                              <p className="text-white text-xs font-semibold truncate">{foto.titulo}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}

              {/* Centro del caleidoscopio */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-white/20 to-white/5 rounded-full backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
                <Camera size={48} className="text-white/80" />
              </div>

              {/* Controles de rotación */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <button
                  onClick={() => handleRotacionManual(-10)}
                  className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all transform hover:scale-110 active:scale-95 border border-white/20"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => setAutoRotacion(!autoRotacion)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold transition-all border border-white/20"
                >
                  {autoRotacion ? 'Pausar' : 'Girar'}
                </button>
                <button
                  onClick={() => handleRotacionManual(10)}
                  className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all transform hover:scale-110 active:scale-95 border border-white/20"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Instrucciones */}
            <div className="text-center mt-4 text-white/60 text-sm">
              <p>Gira el caleidoscopio o haz click en cualquier foto para ver más</p>
            </div>
          </div>
        </div>

        {/* Modal de zoom mágico */}
        {zoom && fotoSeleccionada && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-opacity"
            onClick={cerrarZoom}
          >
            <div
              className="relative max-w-4xl w-full animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Efectos de luz alrededor */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-indigo-500/50 rounded-3xl blur-2xl animate-pulse"></div>

              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl">
                {/* Imagen con zoom */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={fotoSeleccionada.url}
                    alt={fotoSeleccionada.titulo}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Botón cerrar */}
                  <button
                    onClick={cerrarZoom}
                    className="absolute top-4 right-4 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all transform hover:scale-110"
                  >
                    <X size={24} />
                  </button>

                  {/* Botones de acción */}
                  <div className="absolute bottom-4 right-4 flex gap-3">
                    <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all transform hover:scale-110">
                      <Heart size={24} />
                    </button>
                    <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all transform hover:scale-110">
                      <Share2 size={24} />
                    </button>
                    <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all transform hover:scale-110">
                      <ZoomIn size={24} />
                    </button>
                  </div>
                </div>

                {/* Información */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm font-medium mb-2">
                        {fotoSeleccionada.categoria}
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        {fotoSeleccionada.titulo}
                      </h2>
                    </div>
                    <Star size={32} className="text-yellow-400 fill-yellow-400" />
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed mb-6">
                    {fotoSeleccionada.descripcion}
                  </p>
                  <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2">
                    <Camera size={24} />
                    <span>Contratar Sesión Similar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categorías */}
        <div className="mt-12 w-full max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
            <Sparkles size={32} className="text-yellow-300" />
            <span>Nuestros Servicios</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Bodas', 'XV Años', 'Eventos', 'Retratos'].map((categoria, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 hover:border-white/40 transition-all transform hover:scale-105 cursor-pointer"
                onClick={() => {
                  const foto = fotos.find((f) => f.categoria === categoria)
                  if (foto) abrirFoto(foto)
                }}
              >
                <Camera size={32} className="text-yellow-300 mx-auto mb-3" />
                <h3 className="text-white font-semibold">{categoria}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

