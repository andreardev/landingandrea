'use client'

import { useState, useEffect, useRef } from 'react'
import { Sparkles, Camera, ShoppingBag, Heart, Star, Zap, Wand2, X } from 'lucide-react'

interface Prenda {
  id: number
  nombre: string
  precio: string
  imagen: string
  categoria: string
  estilo: string[]
}

export default function EspejoMagicoPage() {
  const [mostrandoEspejo, setMostrandoEspejo] = useState(true)
  const [analizando, setAnalizando] = useState(false)
  const [estiloDetectado, setEstiloDetectado] = useState<string | null>(null)
  const [espejoRoto, setEspejoRoto] = useState(false)
  const [recomendaciones, setRecomendaciones] = useState<Prenda[]>([])
  const [mostrandoRecomendaciones, setMostrandoRecomendaciones] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const estilos = [
    { nombre: 'Clásico Elegante', color: 'from-blue-600 to-indigo-700', icon: '👔' },
    { nombre: 'Casual Moderno', color: 'from-gray-600 to-gray-800', icon: '👕' },
    { nombre: 'Bohemio', color: 'from-purple-600 to-pink-600', icon: '🌸' },
    { nombre: 'Minimalista', color: 'from-black to-gray-700', icon: '⚫' },
    { nombre: 'Vintage', color: 'from-amber-600 to-orange-700', icon: '📻' },
    { nombre: 'Deportivo', color: 'from-green-600 to-teal-700', icon: '🏃' },
  ]

  const prendas: Prenda[] = [
    {
      id: 1,
      nombre: 'Blazer Clásico Premium',
      precio: '$299',
      imagen: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80',
      categoria: 'Abrigos',
      estilo: ['Clásico Elegante', 'Minimalista'],
    },
    {
      id: 2,
      nombre: 'Vestido Bohemio Floral',
      precio: '$189',
      imagen: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80',
      categoria: 'Vestidos',
      estilo: ['Bohemio', 'Casual Moderno'],
    },
    {
      id: 3,
      nombre: 'Jeans Vintage Desgastados',
      precio: '$129',
      imagen: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',
      categoria: 'Pantalones',
      estilo: ['Vintage', 'Casual Moderno'],
    },
    {
      id: 4,
      nombre: 'Camiseta Minimalista',
      precio: '$49',
      imagen: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
      categoria: 'Tops',
      estilo: ['Minimalista', 'Casual Moderno'],
    },
    {
      id: 5,
      nombre: 'Conjunto Deportivo Premium',
      precio: '$159',
      imagen: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&q=80',
      categoria: 'Deportivo',
      estilo: ['Deportivo', 'Casual Moderno'],
    },
    {
      id: 6,
      nombre: 'Chaqueta Vintage Cuero',
      precio: '$399',
      imagen: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
      categoria: 'Abrigos',
      estilo: ['Vintage', 'Clásico Elegante'],
    },
  ]

  const iniciarAnalisis = () => {
    setAnalizando(true)
    setEspejoRoto(false)
    setMostrandoRecomendaciones(false)
    setRecomendaciones([])

    // Simular análisis de estilo
    setTimeout(() => {
      const estiloAleatorio = estilos[Math.floor(Math.random() * estilos.length)]
      setEstiloDetectado(estiloAleatorio.nombre)
      
      // Filtrar prendas según estilo detectado
      const prendasFiltradas = prendas.filter(p => 
        p.estilo.includes(estiloAleatorio.nombre)
      )
      setRecomendaciones(prendasFiltradas.length > 0 ? prendasFiltradas : prendas.slice(0, 3))
      
      setAnalizando(false)
      
      // Efecto de espejo roto
      setTimeout(() => {
        setEspejoRoto(true)
        setTimeout(() => {
          setMostrandoRecomendaciones(true)
        }, 800)
      }, 500)
    }, 3000)
  }

  useEffect(() => {
    // Simular acceso a cámara (solo visual, sin acceso real)
    if (videoRef.current) {
      // Crear un canvas con efecto de espejo
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          // Dibujar efecto de espejo con gradiente
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
          gradient.addColorStop(0, 'rgba(200, 200, 255, 0.3)')
          gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)')
          gradient.addColorStop(1, 'rgba(200, 200, 255, 0.3)')
          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }
      }
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Efectos de fondo mágico */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/20 via-transparent to-slate-900/50"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4">
            <Wand2 size={20} className="text-yellow-300" />
            <span className="text-sm sm:text-base font-medium text-white">El Espejo Mágico</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-shadow-lg">
            Descubre Tu Estilo
          </h1>
          <p className="text-lg sm:text-xl text-purple-200 max-w-2xl mx-auto">
            Nuestro espejo mágico analiza tu estilo y te recomienda las prendas perfectas
          </p>
        </div>

        {/* Espejo Mágico */}
        <div className="relative mb-8 sm:mb-12">
          <div className="relative w-full max-w-2xl">
            {/* Marco del espejo */}
            <div className="relative bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700 p-4 sm:p-6 rounded-3xl shadow-2xl">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-2">
                {/* Espejo con efecto de vidrio */}
                <div className="relative bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 rounded-xl overflow-hidden shadow-inner">
                  {/* Efecto de reflejo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
                  
                  {/* Canvas para efecto de espejo */}
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className="w-full h-64 sm:h-80 md:h-96 object-cover opacity-80"
                  />

                  {/* Overlay de análisis */}
                  {analizando && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white text-lg sm:text-xl font-semibold">Analizando tu estilo...</p>
                        <p className="text-white/70 text-sm sm:text-base mt-2">Detectando preferencias de moda</p>
                      </div>
                    </div>
                  )}

                  {/* Efecto de espejo roto */}
                  {espejoRoto && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Fragmentos de espejo roto */}
                      <div className="absolute top-0 left-0 w-1/3 h-1/3 border-2 border-white/20 transform rotate-12 animate-glass-break"></div>
                      <div className="absolute top-0 right-0 w-1/4 h-1/4 border-2 border-white/20 transform -rotate-12 animate-glass-break animation-delay-100"></div>
                      <div className="absolute bottom-0 left-1/3 w-1/3 h-1/3 border-2 border-white/20 transform rotate-6 animate-glass-break animation-delay-200"></div>
                      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 border-2 border-white/20 transform -rotate-6 animate-glass-break animation-delay-300"></div>
                      <div className="absolute top-1/2 left-1/2 w-1/4 h-1/4 border-2 border-white/20 transform rotate-45 animate-glass-break animation-delay-400"></div>
                    </div>
                  )}

                  {/* Estilo detectado */}
                  {estiloDetectado && !analizando && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 animate-scale-in">
                      <p className="text-white text-sm sm:text-base font-semibold">
                        Estilo detectado: <span className="text-yellow-300">{estiloDetectado}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Botón de análisis */}
            {!analizando && !mostrandoRecomendaciones && (
              <button
                onClick={iniciarAnalisis}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-8 py-4 sm:px-12 sm:py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg sm:text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 animate-fade-in-up"
              >
                <Camera size={24} />
                <span>Analizar Mi Estilo</span>
              </button>
            )}
          </div>
        </div>

        {/* Recomendaciones */}
        {mostrandoRecomendaciones && recomendaciones.length > 0 && (
          <div className="w-full max-w-6xl animate-fade-in-up">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                <Sparkles size={32} className="text-yellow-300" />
                <span>Prendas Perfectas para Ti</span>
              </h2>
              <p className="text-purple-200 text-lg">
                Basado en tu estilo: <span className="text-yellow-300 font-semibold">{estiloDetectado}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {recomendaciones.map((prenda, index) => (
                <div
                  key={prenda.id}
                  className="group bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all hover:scale-105 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-64 sm:h-80 overflow-hidden">
                    <img
                      src={prenda.imagen}
                      alt={prenda.nombre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100">
                      <Heart size={20} className="text-white" />
                    </button>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white">{prenda.nombre}</h3>
                      <span className="text-yellow-300 font-semibold text-lg">{prenda.precio}</span>
                    </div>
                    <p className="text-purple-200 text-sm mb-4">{prenda.categoria}</p>
                    <div className="flex items-center gap-2 mb-4">
                      {prenda.estilo.map((est, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80"
                        >
                          {est}
                        </span>
                      ))}
                    </div>
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-lg">
                      <ShoppingBag size={20} />
                      <span>Agregar al Carrito</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón para reiniciar */}
            <div className="text-center mt-8">
              <button
                onClick={() => {
                  setMostrandoRecomendaciones(false)
                  setEspejoRoto(false)
                  setEstiloDetectado(null)
                  setRecomendaciones([])
                }}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl transition-all flex items-center gap-2 mx-auto"
              >
                <X size={20} />
                <span>Probar de Nuevo</span>
              </button>
            </div>
          </div>
        )}

        {/* Características */}
        {!mostrandoRecomendaciones && (
          <div className="mt-12 sm:mt-16 w-full max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <Zap size={32} className="text-yellow-300 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Análisis Instantáneo</h3>
                <p className="text-purple-200 text-sm">Detección de estilo en segundos</p>
              </div>
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <Star size={32} className="text-yellow-300 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Recomendaciones Personalizadas</h3>
                <p className="text-purple-200 text-sm">Prendas seleccionadas para ti</p>
              </div>
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <Sparkles size={32} className="text-yellow-300 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Experiencia Mágica</h3>
                <p className="text-purple-200 text-sm">Interfaz única e innovadora</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

