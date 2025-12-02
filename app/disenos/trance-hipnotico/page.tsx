'use client'

import { useState, useEffect, useRef } from 'react'
import { Eye, Calendar, MapPin, Clock, Sparkles, Circle } from 'lucide-react'

interface Evento {
  id: number
  fecha: string
  hora: string
  lugar: string
  direccion: string
  ciudad: string
  precioIndividual: string
  precioPareja: string
  disponible: boolean
  lugaresDisponibles: number
}

export default function TranceHipnoticoPage() {
  const [tranceActivado, setTranceActivado] = useState(false)
  const [eventosRevelados, setEventosRevelados] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [particulas, setParticulas] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const espiralRef = useRef<HTMLDivElement>(null)

  const eventos: Evento[] = [
    {
      id: 1,
      fecha: 'Domingo 14 de Diciembre, 2025',
      hora: 'Jornada de 3 horas',
      lugar: 'Salón Dos Tierras',
      direccion: 'Carretera Xoconostle Km 2 Dolores Hidalgo, antes del Hospital General',
      ciudad: 'Dolores Hidalgo, Guanajuato',
      precioIndividual: 'MX $300',
      precioPareja: 'MX $500',
      disponible: true,
      lugaresDisponibles: 70,
    },
  ]

  const hipnoterapeuta = {
    nombre: 'MH Lic Tonatiuh Cavazos Gallegos',
    titulo: 'Master Hipnoterapeuta Clínico',
    paises: 'México | España | Colombia',
    whatsapp: '418 158 3827',
  }

  // Crear partículas que siguen el mouse
  useEffect(() => {
    const nuevasParticulas: Array<{ id: number; x: number; y: number; vx: number; vy: number }> = []
    const width = typeof window !== 'undefined' ? window.innerWidth : 1920
    const height = typeof window !== 'undefined' ? window.innerHeight : 1080
    for (let i = 0; i < 50; i++) {
      nuevasParticulas.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      })
    }
    setParticulas(nuevasParticulas)
  }, [])

  // Seguir el mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Animar partículas en canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof window === 'undefined') return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    let animationFrameId: number

    const animate = () => {
      if (!canvas || !ctx) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dibujar partículas que se mueven hacia el mouse
      particulas.forEach((particula) => {
        const dx = mousePos.x - particula.x
        const dy = mousePos.y - particula.y
        const distancia = Math.sqrt(dx * dx + dy * dy)

        if (distancia > 0) {
          particula.vx += (dx / distancia) * 0.01
          particula.vy += (dy / distancia) * 0.01
        }

        particula.x += particula.vx
        particula.y += particula.vy

        // Fricción
        particula.vx *= 0.95
        particula.vy *= 0.95

        // Dibujar partícula
        ctx.beginPath()
        ctx.arc(particula.x, particula.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = tranceActivado
          ? `rgba(147, 51, 234, ${0.6 + Math.sin(Date.now() * 0.01 + particula.id) * 0.3})`
          : 'rgba(99, 102, 241, 0.4)'
        ctx.fill()
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
  }, [particulas, mousePos, tranceActivado])

  const activarTrance = () => {
    setTranceActivado(true)
    setTimeout(() => {
      setEventosRevelados(true)
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Canvas para partículas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-white/20">
            <Circle size={20} className="text-purple-300" />
            <span className="text-sm sm:text-base font-medium text-white">Experiencia Hipnótica</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-shadow-lg">
            Descubre el Poder de La Hipnosis en Familia
          </h1>
          <p className="text-lg sm:text-xl text-purple-200 max-w-3xl mx-auto">
            Una jornada de 3 horas donde aprenderás a aplicar hipnosis en casa para reducir el estrés, mejorar el sueño y controlar emociones, seguridad, procrastinación, memoria y más. Ideal para padres e hijos que buscan bienestar integral.
          </p>
        </div>

        {/* Espiral Hipnótica Central */}
        {!eventosRevelados && (
          <div className="relative w-full max-w-2xl mb-8 sm:mb-12">
            <div
              ref={espiralRef}
              className="relative aspect-square mx-auto cursor-pointer"
              onClick={activarTrance}
            >
              {/* Espiral girando */}
              <div
                className={`absolute inset-0 rounded-full border-8 border-transparent ${
                  tranceActivado
                    ? 'border-purple-400 border-t-purple-600 border-r-indigo-500 border-b-pink-500 border-l-purple-400'
                    : 'border-indigo-400 border-t-indigo-600'
                } transition-all duration-1000`}
                style={{
                  animation: tranceActivado ? 'spin-slow 3s linear infinite' : 'spin-slow 5s linear infinite',
                  boxShadow: tranceActivado
                    ? '0 0 60px rgba(147, 51, 234, 0.8), inset 0 0 60px rgba(147, 51, 234, 0.3)'
                    : '0 0 40px rgba(99, 102, 241, 0.5)',
                }}
              >
                {/* Espiral interior */}
                <div
                  className="absolute inset-8 rounded-full border-4 border-transparent border-t-purple-500 border-r-indigo-400"
                  style={{
                    animation: tranceActivado ? 'spin-reverse 2s linear infinite' : 'spin-reverse 4s linear infinite',
                  }}
                />
                <div
                  className="absolute inset-16 rounded-full border-2 border-transparent border-t-pink-400 border-l-purple-400"
                  style={{
                    animation: tranceActivado ? 'spin-slow 1.5s linear infinite' : 'spin-slow 3s linear infinite',
                  }}
                />
              </div>

              {/* Ojos que siguen el mouse */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Ojo izquierdo */}
                  <div
                    className="absolute -left-16 w-12 h-12 sm:w-16 sm:h-16"
                    style={{
                      transform: typeof window !== 'undefined' 
                        ? `translate(${(mousePos.x - window.innerWidth / 2) * 0.02}px, ${(mousePos.y - window.innerHeight / 2) * 0.02}px)`
                        : 'translate(0, 0)',
                      transition: 'transform 0.1s ease-out',
                    }}
                  >
                    <Eye size={64} className="text-white drop-shadow-lg" />
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-900 rounded-full"
                      style={{
                        transform: typeof window !== 'undefined'
                          ? `translate(${(mousePos.x - window.innerWidth / 2) * 0.03}px, ${(mousePos.y - window.innerHeight / 2) * 0.03}px)`
                          : 'translate(0, 0)',
                        transition: 'transform 0.1s ease-out',
                      }}
                    />
                  </div>

                  {/* Ojo derecho */}
                  <div
                    className="absolute -right-16 w-12 h-12 sm:w-16 sm:h-16"
                    style={{
                      transform: typeof window !== 'undefined'
                        ? `translate(${(mousePos.x - window.innerWidth / 2) * 0.02}px, ${(mousePos.y - window.innerHeight / 2) * 0.02}px)`
                        : 'translate(0, 0)',
                      transition: 'transform 0.1s ease-out',
                    }}
                  >
                    <Eye size={64} className="text-white drop-shadow-lg" />
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-900 rounded-full"
                      style={{
                        transform: typeof window !== 'undefined'
                          ? `translate(${(mousePos.x - window.innerWidth / 2) * 0.03}px, ${(mousePos.y - window.innerHeight / 2) * 0.03}px)`
                          : 'translate(0, 0)',
                        transition: 'transform 0.1s ease-out',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Instrucciones */}
              {!tranceActivado && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white/80 text-sm sm:text-base animate-pulse">
                  <p>Haz click en la espiral para entrar en trance...</p>
                </div>
              )}

              {/* Mensaje durante trance */}
              {tranceActivado && !eventosRevelados && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white animate-fade-in">
                    <div className="inline-block w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-xl sm:text-2xl font-semibold">Entrando en trance...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Eventos Revelados */}
        {eventosRevelados && (
          <div className="w-full max-w-6xl animate-fade-in-up">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-purple-400/30">
                <Sparkles size={20} className="text-purple-300" />
                <span className="text-sm sm:text-base font-medium text-white">Próximas Fechas</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Taller Hipnosis Grupal
              </h2>
              <p className="text-lg sm:text-xl text-purple-200">
                El trance ha revelado la información del evento
              </p>
            </div>

            {/* Información del Evento */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
              {/* Evento Principal */}
              {eventos.map((evento, index) => (
                <div
                  key={evento.id}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 hover:border-purple-400/50 transition-all transform hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar size={24} className="text-purple-300" />
                      <span className="text-purple-300 text-lg font-semibold">{evento.fecha}</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">{evento.lugar}</h3>
                    <div className="space-y-3 text-gray-300 mb-6">
                      <div className="flex items-start gap-2">
                        <MapPin size={20} className="text-purple-300 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-white mb-1">Dirección:</p>
                          <p>{evento.direccion}</p>
                          <p className="text-purple-300">{evento.ciudad}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={20} className="text-purple-300" />
                        <span className="font-semibold">{evento.hora}</span>
                      </div>
                    </div>

                    {/* Precios */}
                    <div className="bg-purple-500/20 rounded-xl p-4 mb-6 border border-purple-400/30">
                      <p className="text-white font-semibold mb-3 text-lg">Inversión:</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Por persona:</span>
                          <span className="text-2xl font-bold text-purple-300">{evento.precioIndividual}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">En pareja:</span>
                          <span className="text-2xl font-bold text-purple-300">{evento.precioPareja}</span>
                        </div>
                      </div>
                      <p className="text-purple-200 text-sm mt-3">Ven con tu hijo o hija</p>
                      <p className="text-yellow-300 font-semibold mt-2">Sólo {evento.lugaresDisponibles} lugares disponibles</p>
                    </div>

                    {evento.disponible && (
                      <a
                        href={`https://wa.me/52${hipnoterapeuta.whatsapp.replace(/\s/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                      >
                        <span>Reservar al WhatsApp</span>
                        <span className="text-xl font-bold">{hipnoterapeuta.whatsapp}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {/* Información del Hipnoterapeuta */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 hover:border-purple-400/50 transition-all animate-fade-in-up">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Eye size={64} className="text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{hipnoterapeuta.nombre}</h3>
                  <p className="text-purple-300 font-semibold mb-4">{hipnoterapeuta.titulo}</p>
                  <p className="text-gray-300">{hipnoterapeuta.paises}</p>
                </div>

                <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-400/30">
                  <p className="text-white font-semibold mb-2">Contacto:</p>
                  <a
                    href={`https://wa.me/52${hipnoterapeuta.whatsapp.replace(/\s/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
                  >
                    <span>WhatsApp: {hipnoterapeuta.whatsapp}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Final */}
            <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-md rounded-2xl p-8 sm:p-12 border-2 border-purple-400/30 text-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                ¿Listo para Transformar tu Vida?
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Reserva tu lugar ahora y prepárate para una experiencia transformadora de bienestar integral para toda la familia
              </p>
              <a
                href={`https://wa.me/52${hipnoterapeuta.whatsapp.replace(/\s/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95"
              >
                <span>Reservar al WhatsApp: {hipnoterapeuta.whatsapp}</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Estilos inline para animaciones */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </main>
  )
}

