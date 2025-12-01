'use client'

import { useState, useEffect, useRef } from 'react'
import { Heart, Calendar, Clock, Sparkles, Gift, Camera, Music, Users, Star } from 'lucide-react'

export default function RelojArenaAmorPage() {
  const [fechaEvento, setFechaEvento] = useState<string>('')
  const [tiempoRestante, setTiempoRestante] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0
  })
  const [arenaFluyendo, setArenaFluyendo] = useState(true)
  const [mostrandoFormulario, setMostrandoFormulario] = useState(true)
  const [tiempoInicial, setTiempoInicial] = useState<number>(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  interface Particula {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
    life: number
    maxLife: number
  }

  const particulas = useRef<Particula[]>([])

  useEffect(() => {
    if (!mostrandoFormulario && fechaEvento) {
      const interval = setInterval(() => {
        calcularTiempoRestante()
      }, 1000)
      calcularTiempoRestante()
      return () => clearInterval(interval)
    }
  }, [fechaEvento, mostrandoFormulario])

  useEffect(() => {
    if (!mostrandoFormulario && canvasRef.current) {
      iniciarParticulas()
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        dibujarParticulas(ctx, canvas)
        animationFrameRef.current = requestAnimationFrame(animate)
      }
      animate()

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }
  }, [mostrandoFormulario])

  const calcularTiempoRestante = () => {
    if (!fechaEvento) return

    const ahora = new Date().getTime()
    const evento = new Date(fechaEvento).getTime()
    const diferencia = evento - ahora

    if (diferencia > 0) {
      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))
      const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60))
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000)

      setTiempoRestante({ dias, horas, minutos, segundos })
    } else {
      setTiempoRestante({ dias: 0, horas: 0, minutos: 0, segundos: 0 })
      setArenaFluyendo(false)
    }
  }

  const calcularPorcentajeArena = (): number => {
    if (!fechaEvento || mostrandoFormulario || tiempoInicial === 0) return 0

    const ahora = new Date().getTime()
    const evento = new Date(fechaEvento).getTime()
    const diferencia = evento - ahora

    if (diferencia <= 0) return 1

    // Calcular porcentaje basado en el tiempo transcurrido desde el inicio
    const tiempoTranscurrido = tiempoInicial - diferencia
    const porcentaje = tiempoTranscurrido / tiempoInicial

    // Retornar porcentaje entre 0 y 1
    return Math.max(0, Math.min(1, porcentaje))
  }

  const iniciarParticulas = () => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const nuevasParticulas: Particula[] = []

    for (let i = 0; i < 50; i++) {
      nuevasParticulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.5 + 0.5,
        life: 0,
        maxLife: Math.random() * 200 + 100
      })
    }
    particulas.current = nuevasParticulas
  }

  const dibujarParticulas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    particulas.current.forEach((particula, index) => {
      particula.life++
      particula.x += particula.vx
      particula.y += particula.vy
      particula.opacity = Math.sin((particula.life / particula.maxLife) * Math.PI)

      if (particula.life > particula.maxLife) {
        particula.x = Math.random() * canvas.width
        particula.y = Math.random() * canvas.height
        particula.life = 0
        particula.maxLife = Math.random() * 200 + 100
      }

      // Dibujar corazón
      ctx.save()
      ctx.globalAlpha = particula.opacity
      ctx.fillStyle = '#FFD700'
      ctx.strokeStyle = '#FFA500'
      ctx.lineWidth = 1

      const x = particula.x
      const y = particula.y
      const size = particula.size

      // Forma de corazón
      ctx.beginPath()
      ctx.moveTo(x, y + size * 0.3)
      ctx.bezierCurveTo(x, y, x - size * 0.5, y, x - size * 0.5, y + size * 0.3)
      ctx.bezierCurveTo(x - size * 0.5, y + size * 0.7, x, y + size * 0.9, x, y + size)
      ctx.bezierCurveTo(x, y + size * 0.9, x + size * 0.5, y + size * 0.7, x + size * 0.5, y + size * 0.3)
      ctx.bezierCurveTo(x + size * 0.5, y, x, y, x, y + size * 0.3)
      ctx.fill()
      ctx.stroke()
      ctx.restore()
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (fechaEvento) {
      const ahora = new Date().getTime()
      const evento = new Date(fechaEvento).getTime()
      const diferencia = evento - ahora
      
      if (diferencia > 0) {
        setTiempoInicial(diferencia)
        setMostrandoFormulario(false)
        calcularTiempoRestante()
      }
    }
  }

  const servicios = [
    {
      icon: Camera,
      titulo: 'Fotografía Profesional',
      descripcion: 'Capturamos cada momento especial de tu día perfecto',
    },
    {
      icon: Music,
      titulo: 'Música y Entretenimiento',
      descripcion: 'DJ profesional y ambiente musical inolvidable',
    },
    {
      icon: Gift,
      titulo: 'Decoración Elegante',
      descripcion: 'Transformamos tu espacio en un sueño romántico',
    },
    {
      icon: Users,
      titulo: 'Coordinación Completa',
      descripcion: 'Nos encargamos de cada detalle para que disfrutes',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 relative overflow-hidden">
      {/* Partículas de fondo */}
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Efectos de luz románticos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        <div className="absolute top-20 left-20 w-96 h-96 bg-rose-200/30 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-200/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full mb-4 shadow-lg">
            <Heart size={20} className="text-rose-500 fill-rose-500" />
            <span className="text-sm sm:text-base font-medium text-rose-700">El Reloj de Arena del Amor</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-rose-900 mb-4 text-shadow-lg">
            Cuenta los Momentos
          </h1>
          <p className="text-lg sm:text-xl text-rose-700 max-w-2xl mx-auto">
            Cada grano de arena acerca tu día perfecto
          </p>
        </div>

        {/* Reloj de Arena Mejorado */}
        <div className="relative mb-8 sm:mb-12 w-full max-w-lg">
          <div className="relative">
            {/* Contenedor principal con efecto 3D */}
            <div className="relative" style={{ perspective: '1000px' }}>
              <div className="relative transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
                {/* Estructura del reloj de arena - Diseño Premium */}
                <div className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 rounded-[3rem] p-10 sm:p-16 shadow-[0_20px_60px_rgba(217,119,6,0.3)] border-4 border-amber-200">
                  {/* Reflejo de luz superior */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-white/40 rounded-full blur-sm"></div>
                  
                  {/* Parte superior del reloj - Más elegante */}
                  <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 mb-2">
                    {/* Contenedor superior con sombra 3D */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 rounded-t-[2rem] shadow-[inset_0_-10px_30px_rgba(0,0,0,0.3),0_10px_20px_rgba(0,0,0,0.2)] border-4 border-amber-800/50">
                      {/* Reflejo interno superior */}
                      <div className="absolute top-2 left-1/4 w-1/2 h-8 bg-white/20 rounded-full blur-sm"></div>
                      
                      {/* Arena en la parte superior - Cálculo dinámico */}
                      {mostrandoFormulario ? (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 rounded-b-[2rem] h-full"></div>
                      ) : (
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 rounded-b-[2rem] transition-all duration-1000 ease-linear"
                          style={{
                            height: arenaFluyendo 
                              ? `${Math.max(0, Math.min(100, (1 - calcularPorcentajeArena()) * 100))}%`
                              : '0%'
                          }}
                        >
                          {/* Textura de arena */}
                          <div className="absolute inset-0 opacity-30" style={{
                            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)',
                            backgroundSize: '8px 8px'
                          }}></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cuello del reloj - Más delgado y elegante */}
                  <div className="relative mx-auto w-3 h-10 sm:w-4 sm:h-14 mb-2">
                    {/* Cuello con efecto de vidrio */}
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-800 via-amber-700 to-amber-600 rounded-full shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                      {/* Reflejo de luz en el cuello */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/60 rounded-full blur-sm"></div>
                    </div>
                    
                    {/* Arena fluyendo - Muchas más partículas */}
                    {arenaFluyendo && !mostrandoFormulario && (
                      <div className="absolute inset-0 overflow-visible pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full animate-arena-fall shadow-sm"
                            style={{
                              left: `${50 + (Math.random() - 0.5) * 20}%`,
                              top: '-10px',
                              animationDelay: `${i * 0.15}s`,
                              animationDuration: `${1.5 + Math.random() * 0.5}s`,
                              opacity: 0.8 + Math.random() * 0.2
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Parte inferior del reloj - Más elegante */}
                  <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48">
                    {/* Contenedor inferior con sombra 3D */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 rounded-b-[2rem] shadow-[inset_0_10px_30px_rgba(0,0,0,0.3),0_-10px_20px_rgba(0,0,0,0.2)] border-4 border-amber-800/50">
                      {/* Reflejo interno inferior */}
                      <div className="absolute bottom-2 left-1/4 w-1/2 h-8 bg-white/20 rounded-full blur-sm"></div>
                      
                      {/* Arena acumulada en la parte inferior - Cálculo dinámico */}
                      {mostrandoFormulario ? (
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-t from-amber-500 via-amber-600 to-amber-700 rounded-t-[2rem] h-0"></div>
                      ) : (
                        <div 
                          className="absolute top-0 left-0 right-0 bg-gradient-to-t from-amber-500 via-amber-600 to-amber-700 rounded-t-[2rem] transition-all duration-1000 ease-linear"
                          style={{
                            height: arenaFluyendo 
                              ? `${Math.max(0, Math.min(100, calcularPorcentajeArena() * 100))}%`
                              : '100%'
                          }}
                        >
                          {/* Textura de arena acumulada */}
                          <div className="absolute inset-0 opacity-30" style={{
                            backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)',
                            backgroundSize: '8px 8px'
                          }}></div>
                          
                          {/* Efecto de montículo de arena */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-amber-400/50 rounded-full blur-sm"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Base del reloj - Más elegante */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-56 h-10 sm:w-64 sm:h-12 bg-gradient-to-br from-amber-800 via-amber-900 to-amber-950 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.4)] border-2 border-amber-700/50">
                    {/* Reflejo en la base */}
                    <div className="absolute top-1 left-1/4 w-1/2 h-1 bg-white/20 rounded-full blur-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contador de tiempo */}
            {!mostrandoFormulario && (
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md animate-scale-in">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border-2 border-rose-200">
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-3xl sm:text-4xl font-bold text-rose-600 mb-1">
                        {String(tiempoRestante.dias).padStart(2, '0')}
                      </div>
                      <div className="text-xs sm:text-sm text-rose-500 font-medium">Días</div>
                    </div>
                    <div>
                      <div className="text-3xl sm:text-4xl font-bold text-rose-600 mb-1">
                        {String(tiempoRestante.horas).padStart(2, '0')}
                      </div>
                      <div className="text-xs sm:text-sm text-rose-500 font-medium">Horas</div>
                    </div>
                    <div>
                      <div className="text-3xl sm:text-4xl font-bold text-rose-600 mb-1">
                        {String(tiempoRestante.minutos).padStart(2, '0')}
                      </div>
                      <div className="text-xs sm:text-sm text-rose-500 font-medium">Min</div>
                    </div>
                    <div>
                      <div className="text-3xl sm:text-4xl font-bold text-rose-600 mb-1">
                        {String(tiempoRestante.segundos).padStart(2, '0')}
                      </div>
                      <div className="text-xs sm:text-sm text-rose-500 font-medium">Seg</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Formulario de fecha */}
        {mostrandoFormulario && (
          <div className="w-full max-w-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-rose-200">
              <div className="mb-6">
                <label htmlFor="fecha" className="block text-rose-700 font-semibold mb-2 text-center">
                  <Calendar className="inline-block mr-2" size={20} />
                  Selecciona la fecha de tu evento
                </label>
                <input
                  type="datetime-local"
                  id="fecha"
                  value={fechaEvento}
                  onChange={(e) => setFechaEvento(e.target.value)}
                  required
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-200 text-rose-700 font-medium"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Clock size={24} />
                <span>Iniciar Cuenta Regresiva</span>
              </button>
            </form>
          </div>
        )}

        {/* Servicios */}
        {!mostrandoFormulario && (
          <div className="mt-20 sm:mt-32 w-full max-w-6xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-rose-900 mb-4 flex items-center justify-center gap-2">
                <Sparkles size={32} className="text-amber-500" />
                <span>Hacemos Tu Día Perfecto</span>
              </h2>
              <p className="text-rose-700 text-lg">
                Servicios completos para tu evento especial
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {servicios.map((servicio, index) => {
                const Icon = servicio.icon
                return (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-rose-100 animate-scale-in"
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    <div className="inline-flex p-4 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl mb-4">
                      <Icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-rose-900 mb-2">{servicio.titulo}</h3>
                    <p className="text-rose-600 text-sm">{servicio.descripcion}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        {!mostrandoFormulario && (
          <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto">
              <Heart size={24} className="fill-white" />
              <span>Reservar Mi Evento</span>
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

