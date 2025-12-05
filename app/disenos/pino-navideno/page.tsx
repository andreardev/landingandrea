'use client'

import { useState, useEffect, useRef } from 'react'
import { Sparkles, Star, Gift, TreePine, Snowflake, Phone, MapPin, Clock } from 'lucide-react'

interface Decoracion {
  id: number
  tipo: 'estrella' | 'bola' | 'luz' | 'regalo'
  x: number
  y: number
  color: string
  brillando?: boolean
}

export default function PinoNavidenoPage() {
  const [decoraciones, setDecoraciones] = useState<Decoracion[]>([])
  const [nivelDecoracion, setNivelDecoracion] = useState(0)
  const [lucesEncendidas, setLucesEncendidas] = useState(false)
  const [regalos, setRegalos] = useState(0)
  const [nieveActiva, setNieveActiva] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  // Colores de decoraciones
  const coloresBolas = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#ffffff']
  const coloresLuces = ['#fbbf24', '#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6']

  // Niveles de decoración
  const niveles = [
    { nombre: 'Árbol Natural', decoraciones: 0 },
    { nombre: 'Con Estrella', decoraciones: 1 },
    { nombre: 'Con Luces', decoraciones: 5 },
    { nombre: 'Con Bolas', decoraciones: 12 },
    { nombre: 'Completamente Decorado', decoraciones: 25 },
  ]

  // Efecto de nieve en canvas
  useEffect(() => {
    if (!canvasRef.current || !nieveActiva) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const copos: Array<{ x: number; y: number; size: number; speed: number; opacity: number }> = []

    // Crear copos de nieve
    for (let i = 0; i < 100; i++) {
      copos.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      copos.forEach((copo) => {
        copo.y += copo.speed
        copo.x += Math.sin(copo.y * 0.01) * 0.5

        if (copo.y > canvas.height) {
          copo.y = 0
          copo.x = Math.random() * canvas.width
        }

        ctx.beginPath()
        ctx.arc(copo.x, copo.y, copo.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${copo.opacity})`
        ctx.fill()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [nieveActiva])

  // Decorar el árbol progresivamente
  const decorarArbol = () => {
    if (nivelDecoracion >= niveles.length - 1) return

    const nuevoNivel = nivelDecoracion + 1
    setNivelDecoracion(nuevoNivel)
    const decoracionesNecesarias = niveles[nuevoNivel].decoraciones

    const nuevasDecoraciones: Decoracion[] = []

    // Agregar estrella en la punta
    if (nuevoNivel >= 1 && !decoraciones.some((d) => d.tipo === 'estrella')) {
      nuevasDecoraciones.push({
        id: Date.now(),
        tipo: 'estrella',
        x: 50,
        y: 5,
        color: '#fbbf24',
        brillando: true,
      })
    }

    // Agregar luces
    if (nuevoNivel >= 2) {
      const lucesExistentes = decoraciones.filter((d) => d.tipo === 'luz').length
      const lucesNecesarias = 5 - lucesExistentes
      for (let i = 0; i < lucesNecesarias; i++) {
        nuevasDecoraciones.push({
          id: Date.now() + i,
          tipo: 'luz',
          x: 20 + Math.random() * 60,
          y: 15 + Math.random() * 50,
          color: coloresLuces[Math.floor(Math.random() * coloresLuces.length)],
          brillando: true,
        })
      }
      setLucesEncendidas(true)
    }

    // Agregar bolas
    if (nuevoNivel >= 3) {
      const bolasExistentes = decoraciones.filter((d) => d.tipo === 'bola').length
      const bolasNecesarias = decoracionesNecesarias - bolasExistentes - 5 // menos las luces
      for (let i = 0; i < bolasNecesarias; i++) {
        nuevasDecoraciones.push({
          id: Date.now() + i + 1000,
          tipo: 'bola',
          x: 25 + Math.random() * 50,
          y: 20 + Math.random() * 60,
          color: coloresBolas[Math.floor(Math.random() * coloresBolas.length)],
        })
      }
    }

    // Agregar regalos
    if (nuevoNivel >= 4) {
      setRegalos(3)
    }

    setDecoraciones([...decoraciones, ...nuevasDecoraciones])
  }

  // Alternar luces
  useEffect(() => {
    if (!lucesEncendidas) return

    const interval = setInterval(() => {
      setDecoraciones((prev) =>
        prev.map((d) =>
          d.tipo === 'luz' ? { ...d, brillando: !d.brillando } : d
        )
      )
    }, 500)

    return () => clearInterval(interval)
  }, [lucesEncendidas])

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Canvas de nieve */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Header */}
        <section className="text-center py-8 sm:py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <Snowflake size={20} className="text-blue-300 animate-spin-slow" />
              <span className="text-white/90 font-medium">Navidad Mágica 2024</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
              <span className="text-green-400">Pinos</span>{' '}
              <span className="text-red-400">Navideños</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/80 mb-8">
              Decora tu hogar con la magia de la Navidad
            </p>
          </div>
        </section>

        {/* Árbol interactivo */}
        <section className="py-8 sm:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-12 border-2 border-white/20">
              {/* Árbol SVG */}
              <div className="relative w-full max-w-md mx-auto mb-8" style={{ aspectRatio: '1/1.5' }}>
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.5))' }}
                >
                  {/* Tronco */}
                  <rect x="45" y="75" width="10" height="15" fill="#8b4513" />

                  {/* Capas del árbol */}
                  <polygon points="50,10 30,40 70,40" fill="#166534" />
                  <polygon points="50,20 25,50 75,50" fill="#15803d" />
                  <polygon points="50,30 20,60 80,60" fill="#16a34a" />
                  <polygon points="50,40 15,70 85,70" fill="#22c55e" />

                  {/* Decoraciones */}
                  {decoraciones.map((decoracion) => {
                    if (decoracion.tipo === 'estrella') {
                      return (
                        <g key={decoracion.id} transform={`translate(${decoracion.x}, ${decoracion.y})`}>
                          <path
                            d="M 0,-5 L 2,-2 L 5,-2 L 2.5,0.5 L 3.5,3.5 L 0,1.5 L -3.5,3.5 L -2.5,0.5 L -5,-2 L -2,-2 Z"
                            fill={decoracion.color}
                            className={decoracion.brillando ? 'animate-pulse' : ''}
                            style={{
                              filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))',
                            }}
                          />
                        </g>
                      )
                    }

                    if (decoracion.tipo === 'luz') {
                      return (
                        <circle
                          key={decoracion.id}
                          cx={decoracion.x}
                          cy={decoracion.y}
                          r="2"
                          fill={decoracion.brillando ? decoracion.color : 'transparent'}
                          className="transition-all duration-300"
                          style={{
                            filter: decoracion.brillando
                              ? `drop-shadow(0 0 6px ${decoracion.color})`
                              : 'none',
                          }}
                        />
                      )
                    }

                    if (decoracion.tipo === 'bola') {
                      return (
                        <g key={decoracion.id}>
                          <circle
                            cx={decoracion.x}
                            cy={decoracion.y}
                            r="3"
                            fill={decoracion.color}
                            style={{
                              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                            }}
                          />
                          <circle
                            cx={decoracion.x}
                            cy={decoracion.y - 0.5}
                            r="1"
                            fill="rgba(255,255,255,0.6)"
                          />
                        </g>
                      )
                    }

                    return null
                  })}
                </svg>

                {/* Regalos debajo del árbol */}
                {regalos > 0 && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
                    {[...Array(regalos)].map((_, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 sm:w-16 sm:h-16 relative animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      >
                        <div
                          className={`w-full h-full ${
                            i === 0
                              ? 'bg-red-500'
                              : i === 1
                              ? 'bg-green-500'
                              : 'bg-blue-500'
                          } rounded-sm`}
                          style={{
                            clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)',
                          }}
                        >
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-white/50"></div>
                          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1 bg-white/50"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Botón de decorar */}
              <div className="text-center">
                <p className="text-white/80 mb-4 text-lg sm:text-xl">
                  Nivel: <span className="font-bold text-green-300">{niveles[nivelDecoracion].nombre}</span>
                </p>
                {nivelDecoracion < niveles.length - 1 ? (
                  <button
                    onClick={decorarArbol}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
                  >
                    <Sparkles size={24} />
                    <span>Decorar Árbol</span>
                  </button>
                ) : (
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg sm:text-xl shadow-2xl inline-flex items-center gap-3">
                    <Star size={24} className="animate-spin-slow" />
                    <span>¡Árbol Completamente Decorado!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Información del negocio */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Productos */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border-2 border-white/20">
                <TreePine size={40} className="text-green-400 mb-4" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Nuestros Pinos
                </h2>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-2">
                    <Star size={20} className="text-yellow-400" />
                    <span>Pinos naturales de 1.5m a 3m</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star size={20} className="text-yellow-400" />
                    <span>Pinos artificiales premium</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star size={20} className="text-yellow-400" />
                    <span>Decoración completa incluida</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star size={20} className="text-yellow-400" />
                    <span>Instalación profesional</span>
                  </li>
                </ul>
              </div>

              {/* Servicios */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border-2 border-white/20">
                <Gift size={40} className="text-red-400 mb-4" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Servicios Adicionales
                </h2>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-2">
                    <Sparkles size={20} className="text-purple-400" />
                    <span>Diseño personalizado de decoración</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles size={20} className="text-purple-400" />
                    <span>Mantenimiento durante la temporada</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles size={20} className="text-purple-400" />
                    <span>Desmontaje y almacenamiento</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles size={20} className="text-purple-400" />
                    <span>Paquetes para empresas</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contacto */}
            <div className="mt-8 sm:mt-12 bg-gradient-to-r from-red-500/20 to-green-500/20 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border-2 border-white/20">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                Contacta con Nosotros
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex items-center gap-3 text-white/90">
                  <Phone size={24} className="text-green-400" />
                  <div>
                    <p className="text-sm text-white/60">Teléfono</p>
                    <p className="font-semibold">+52 123 456 7890</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <MapPin size={24} className="text-red-400" />
                  <div>
                    <p className="text-sm text-white/60">Ubicación</p>
                    <p className="font-semibold">Ciudad, Estado</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <Clock size={24} className="text-yellow-400" />
                  <div>
                    <p className="text-sm text-white/60">Horario</p>
                    <p className="font-semibold">9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <a
                  href="https://wa.me/521234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105 active:scale-95"
                >
                  <Phone size={24} />
                  <span>Contactar por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

