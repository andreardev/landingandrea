'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Play, Calendar, MapPin, Star, ShoppingCart, 
  Users, Car, Plane, Gamepad2, Sparkles,
  ChevronRight, Clock, Award, Zap, Globe
} from 'lucide-react'

export default function GTAVILanzamientoPage() {
  const [cuentaRegresiva, setCuentaRegresiva] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  })
  const [particulas, setParticulas] = useState<Array<{ id: number; x: number; y: number; velocidad: number; color: string }>>([])
  const [mostrarTrailer, setMostrarTrailer] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Fecha de lanzamiento (ejemplo: 1 año desde ahora)
  const fechaLanzamiento = new Date()
  fechaLanzamiento.setFullYear(fechaLanzamiento.getFullYear() + 1)
  fechaLanzamiento.setMonth(9) // Octubre
  fechaLanzamiento.setDate(15)

  // Calcular cuenta regresiva
  useEffect(() => {
    const calcularTiempo = () => {
      const ahora = new Date()
      const diferencia = fechaLanzamiento.getTime() - ahora.getTime()

      if (diferencia > 0) {
        setCuentaRegresiva({
          dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
          horas: Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutos: Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60)),
          segundos: Math.floor((diferencia % (1000 * 60)) / 1000),
        })
      }
    }

    calcularTiempo()
    const interval = setInterval(calcularTiempo, 1000)

    return () => clearInterval(interval)
  }, [])

  // Generar partículas de neón
  useEffect(() => {
    const nuevasParticulas: Array<{ id: number; x: number; y: number; velocidad: number; color: string }> = []
    const colores = ['#00ff88', '#ff0080', '#00d4ff', '#ffaa00', '#ff0066']
    
    for (let i = 0; i < 100; i++) {
      nuevasParticulas.push({
        id: i,
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
        velocidad: 0.5 + Math.random() * 2,
        color: colores[Math.floor(Math.random() * colores.length)],
      })
    }
    setParticulas(nuevasParticulas)
  }, [])

  // Animar partículas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof window === 'undefined') return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particulas.forEach((particula) => {
        particula.y += particula.velocidad
        particula.x += Math.sin(particula.y * 0.01) * 0.3

        if (particula.y > canvas.height) {
          particula.y = -10
          particula.x = Math.random() * canvas.width
        }

        ctx.shadowBlur = 20
        ctx.shadowColor = particula.color
        ctx.fillStyle = particula.color
        ctx.beginPath()
        ctx.arc(particula.x, particula.y, 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [particulas])

  const caracteristicas = [
    {
      icono: Globe,
      titulo: 'Mundo Abierto Masivo',
      descripcion: 'Explora Vice City y Leonida en el mapa más grande de la serie',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icono: Users,
      titulo: 'Historia Épica',
      descripcion: 'Sigue las vidas entrelazadas de tres protagonistas únicos',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icono: Car,
      titulo: 'Vehiculos Realistas',
      descripcion: 'Cientos de vehículos con física mejorada y detalles increíbles',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icono: Plane,
      titulo: 'Aviación Completa',
      descripcion: 'Vuela aviones, helicópteros y más en el cielo de Vice City',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icono: Gamepad2,
      titulo: 'Gameplay Mejorado',
      descripcion: 'Mecánicas de juego revolucionarias y combate fluido',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icono: Zap,
      titulo: 'Gráficos Next-Gen',
      descripcion: 'Motor gráfico de nueva generación con ray tracing',
      color: 'from-red-500 to-pink-500',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white relative overflow-hidden">
      {/* Canvas para partículas de neón */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Overlay con gradiente oscuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none" style={{ zIndex: 2 }} />

      {/* Patrón de ciudad en el fondo */}
      <div className="absolute inset-0 opacity-10" style={{ zIndex: 1 }}>
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='100' fill='%23000'/%3E%3Crect x='10' y='80' width='20' height='20' fill='%23fff' opacity='0.1'/%3E%3Crect x='40' y='60' width='15' height='40' fill='%23fff' opacity='0.1'/%3E%3Crect x='70' y='50' width='20' height='50' fill='%23fff' opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }} />
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20 relative">
          <div className="max-w-6xl mx-auto text-center animate-fade-in">
            {/* Logo/Título Principal */}
            <div className="mb-8">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
                  GTA VI
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-300 mb-2">
                GRAND THEFT AUTO VI
              </p>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400">
                Vice City & Leonida
              </p>
            </div>

            {/* Cuenta Regresiva */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-cyan-500/30">
                <Clock size={20} className="text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-300">Lanzamiento</span>
              </div>
              <div className="grid grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
                {[
                  { valor: cuentaRegresiva.dias, label: 'Días', color: 'from-cyan-500 to-blue-500' },
                  { valor: cuentaRegresiva.horas, label: 'Horas', color: 'from-pink-500 to-rose-500' },
                  { valor: cuentaRegresiva.minutos, label: 'Min', color: 'from-yellow-500 to-orange-500' },
                  { valor: cuentaRegresiva.segundos, label: 'Seg', color: 'from-green-500 to-emerald-500' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${item.color} rounded-xl p-4 sm:p-6 text-center shadow-2xl border-2 border-white/20`}
                  >
                    <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 text-white">
                      {String(item.valor).padStart(2, '0')}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-white/90 uppercase tracking-wider">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button
                onClick={() => setMostrarTrailer(true)}
                className="group relative bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden w-full sm:w-auto justify-center"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Play size={24} className="relative z-10" />
                <span className="relative z-10">Ver Trailer</span>
              </button>
              <button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-pink-500/50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 w-full sm:w-auto justify-center">
                <ShoppingCart size={24} />
                <span>Pre-ordenar Ahora</span>
              </button>
            </div>

            {/* Plataformas */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
              <span className="font-semibold">Disponible en:</span>
              <span className="px-3 py-1 bg-white/10 rounded-lg">PlayStation 5</span>
              <span className="px-3 py-1 bg-white/10 rounded-lg">Xbox Series X|S</span>
              <span className="px-3 py-1 bg-white/10 rounded-lg">PC</span>
            </div>
          </div>
        </section>

        {/* Sección de Características */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              Características Épicas
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              El juego más ambicioso de la historia de Rockstar Games
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caracteristicas.map((caracteristica, index) => {
              const Icono = caracteristica.icono
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/10 hover:border-cyan-500/50 transition-all hover:transform hover:scale-105"
                >
                  <div className={`bg-gradient-to-br ${caracteristica.color} rounded-xl p-4 w-fit mb-4 shadow-lg`}>
                    <Icono size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{caracteristica.titulo}</h3>
                  <p className="text-gray-400">{caracteristica.descripcion}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Sección de Mapa */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="bg-gradient-to-br from-black/60 to-slate-900/60 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-2 border-cyan-500/30">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full mb-4">
                <MapPin size={32} className="text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-black mb-4 text-white">
                Explora Vice City & Leonida
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                El mapa más grande y detallado jamás creado en un juego de Grand Theft Auto
              </p>
            </div>

            {/* Placeholder para mapa */}
            <div className="bg-gradient-to-br from-cyan-900/30 to-pink-900/30 rounded-2xl h-64 sm:h-96 flex items-center justify-center border-2 border-cyan-500/20 mb-6">
              <div className="text-center text-gray-400">
                <MapPin size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-xl font-semibold">Mapa Interactivo</p>
                <p className="text-sm mt-2">Vice City y sus alrededores</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { titulo: 'Vice City', descripcion: 'La ciudad principal inspirada en Miami' },
                { titulo: 'Leonida', descripcion: 'El estado completo con múltiples ciudades' },
                { titulo: 'Islas', descripcion: 'Explora islas paradisíacas y áreas rurales' },
              ].map((ubicacion, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-xl p-4 border border-white/10"
                >
                  <h4 className="text-xl font-bold mb-2 text-cyan-400">{ubicacion.titulo}</h4>
                  <p className="text-gray-400 text-sm">{ubicacion.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de Personajes */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
              Protagonistas
            </h2>
            <p className="text-xl text-gray-400">
              Tres historias entrelazadas en un mundo criminal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { nombre: 'Lucia', descripcion: 'Una joven ambiciosa buscando su oportunidad', color: 'from-pink-500 to-rose-500' },
              { nombre: 'Jason', descripcion: 'Un veterano del crimen con un pasado oscuro', color: 'from-blue-500 to-cyan-500' },
              { nombre: 'Mystery', descripcion: 'Un tercer protagonista por revelar', color: 'from-yellow-500 to-orange-500' },
            ].map((personaje, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/10 hover:border-pink-500/50 transition-all hover:transform hover:scale-105"
              >
                <div className={`bg-gradient-to-br ${personaje.color} rounded-xl h-64 mb-4 flex items-center justify-center shadow-xl`}>
                  <Users size={64} className="text-white opacity-50" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">{personaje.nombre}</h3>
                <p className="text-gray-400">{personaje.descripcion}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de Pre-orden */}
        <section className="max-w-5xl mx-auto px-4 py-20">
          <div className="bg-gradient-to-br from-cyan-600/20 via-pink-600/20 to-yellow-600/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-cyan-500/30 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mb-6">
                <Award size={40} className="text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-black mb-4 text-white">
                Pre-ordenar Ahora
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Obtén contenido exclusivo y accesos anticipados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { titulo: 'Edición Estándar', precio: '$69.99', beneficios: ['Juego completo', 'Acceso al día 1'] },
                { titulo: 'Edición Deluxe', precio: '$89.99', beneficios: ['Todo lo anterior', 'Contenido exclusivo', 'Pack de vehículos'] },
                { titulo: 'Edición Ultimate', precio: '$119.99', beneficios: ['Todo lo anterior', 'Pase de temporada', 'Acceso anticipado'] },
              ].map((edicion, index) => (
                <div
                  key={index}
                  className="bg-black/40 rounded-xl p-6 border-2 border-white/10 hover:border-cyan-500/50 transition-all"
                >
                  <h3 className="text-xl font-bold mb-2 text-white">{edicion.titulo}</h3>
                  <div className="text-3xl font-black mb-4 text-cyan-400">{edicion.precio}</div>
                  <ul className="space-y-2 mb-4">
                    {edicion.beneficios.map((beneficio, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span>{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-bold transition-all">
                    Pre-ordenar
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white px-10 py-5 rounded-xl font-bold text-xl shadow-2xl hover:shadow-pink-500/50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto">
                <ShoppingCart size={28} />
                <span>Ver Todas las Ediciones</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Modal de Trailer (placeholder) */}
      {mostrarTrailer && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setMostrarTrailer(false)}
        >
          <div className="bg-black rounded-xl p-8 max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-white">Trailer Oficial</h3>
              <button
                onClick={() => setMostrarTrailer(false)}
                className="text-white hover:text-gray-400 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="bg-gradient-to-br from-cyan-900/30 to-pink-900/30 rounded-xl h-64 sm:h-96 flex items-center justify-center border-2 border-cyan-500/20">
              <div className="text-center text-gray-400">
                <Play size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-xl font-semibold">Trailer Oficial de GTA VI</p>
                <p className="text-sm mt-2">Próximamente</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

