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
      setMostrandoFormulario(false)
      calcularTiempoRestante()
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

        {/* Reloj de Arena */}
        <div className="relative mb-8 sm:mb-12 w-full max-w-md">
          <div className="relative">
            {/* Estructura del reloj de arena */}
            <div className="relative bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-amber-300">
              {/* Parte superior del reloj */}
              <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 rounded-t-full border-4 border-amber-700 shadow-inner">
                  {/* Arena en la parte superior */}
                  <div 
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-b from-amber-500 to-amber-700 rounded-b-full transition-all duration-1000 ${
                      arenaFluyendo ? 'h-full' : 'h-0'
                    }`}
                    style={{
                      transition: arenaFluyendo ? `height ${tiempoRestante.dias * 24 * 60 * 60 + tiempoRestante.horas * 60 * 60 + tiempoRestante.minutos * 60 + tiempoRestante.segundos}s linear` : 'height 0s'
                    }}
                  ></div>
                </div>
              </div>

              {/* Cuello del reloj */}
              <div className="relative mx-auto w-4 h-8 sm:h-12 bg-gradient-to-b from-amber-700 to-amber-600 rounded-full">
                {/* Arena fluyendo */}
                {arenaFluyendo && (
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-amber-500 rounded-full animate-arena-fall"
                        style={{
                          left: '50%',
                          animationDelay: `${i * 0.3}s`,
                          animationDuration: '2s'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Parte inferior del reloj */}
              <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 rounded-b-full border-4 border-amber-700 shadow-inner">
                  {/* Arena acumulada en la parte inferior */}
                  <div 
                    className={`absolute top-0 left-0 right-0 bg-gradient-to-t from-amber-500 to-amber-700 rounded-t-full transition-all duration-1000 ${
                      arenaFluyendo ? 'h-0' : 'h-full'
                    }`}
                  ></div>
                </div>
              </div>

              {/* Base del reloj */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full shadow-xl"></div>
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

