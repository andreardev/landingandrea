'use client'

import { useState, useEffect, useRef } from 'react'
import { Droplets, MapPin, Phone, Clock, CheckCircle2, Waves, Zap } from 'lucide-react'

interface Zona {
  id: number
  nombre: string
  coordenadas: { x: number; y: number }
  demanda: number
  color: string
}

export default function OlaServicioPage() {
  const [zonaSeleccionada, setZonaSeleccionada] = useState<Zona | null>(null)
  const [aguaFluyendo, setAguaFluyendo] = useState(false)
  const [solicitudEnviada, setSolicitudEnviada] = useState(false)
  const [gotas, setGotas] = useState<Array<{ id: number; x: number; y: number; velocidad: number }>>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  const zonas: Zona[] = [
    { id: 1, nombre: 'Zona Norte', coordenadas: { x: 30, y: 20 }, demanda: 85, color: 'from-blue-400 to-cyan-500' },
    { id: 2, nombre: 'Zona Sur', coordenadas: { x: 70, y: 80 }, demanda: 92, color: 'from-blue-500 to-indigo-600' },
    { id: 3, nombre: 'Zona Centro', coordenadas: { x: 50, y: 50 }, demanda: 78, color: 'from-cyan-400 to-blue-500' },
    { id: 4, nombre: 'Zona Este', coordenadas: { x: 80, y: 40 }, demanda: 88, color: 'from-blue-500 to-teal-500' },
    { id: 5, nombre: 'Zona Oeste', coordenadas: { x: 20, y: 60 }, demanda: 75, color: 'from-cyan-500 to-blue-600' },
  ]

  // Crear ondas de agua en el canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ondas: Array<{ x: number; y: number; radio: number; opacidad: number }> = []
    let frameCount = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Crear nuevas ondas desde el centro
      if (frameCount % 60 === 0) {
        ondas.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          radio: 0,
          opacidad: 0.6,
        })
      }

      // Animar ondas
      ondas.forEach((onda, index) => {
        ctx.beginPath()
        ctx.arc(onda.x, onda.y, onda.radio, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(59, 130, 246, ${onda.opacidad})`
        ctx.lineWidth = 3
        ctx.stroke()

        onda.radio += 2
        onda.opacidad -= 0.01

        if (onda.opacidad <= 0) {
          ondas.splice(index, 1)
        }
      })

      // Dibujar líneas de flujo hacia las zonas activas
      if (aguaFluyendo && zonaSeleccionada) {
        const startX = canvas.width / 2
        const startY = canvas.height / 2
        const endX = (zonaSeleccionada.coordenadas.x / 100) * canvas.width
        const endY = (zonaSeleccionada.coordenadas.y / 100) * canvas.height

        // Línea base más visible
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        
        // Gradiente a lo largo de la línea
        const gradient = ctx.createLinearGradient(startX, startY, endX, endY)
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)')
        gradient.addColorStop(0.5, 'rgba(34, 211, 238, 0.9)')
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.8)')
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = 8
        ctx.lineCap = 'round'
        ctx.shadowBlur = 15
        ctx.shadowColor = 'rgba(34, 211, 238, 0.8)'
        ctx.stroke()
        ctx.shadowBlur = 0

        // Línea brillante interior
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.lineWidth = 4
        ctx.stroke()

        // Múltiples partículas de agua fluyendo (chorro continuo)
        for (let i = 0; i < 20; i++) {
          const offset = (frameCount * 0.02 + i * 0.05) % 1
          const x = startX + (endX - startX) * offset
          const y = startY + (endY - startY) * offset

          // Partícula principal
          ctx.beginPath()
          ctx.arc(x, y, 6, 0, Math.PI * 2)
          const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, 6)
          particleGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
          particleGradient.addColorStop(0.5, 'rgba(34, 211, 238, 0.8)')
          particleGradient.addColorStop(1, 'rgba(59, 130, 246, 0.6)')
          ctx.fillStyle = particleGradient
          ctx.fill()

          // Brillo alrededor
          ctx.beginPath()
          ctx.arc(x, y, 10, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(34, 211, 238, 0.3)'
          ctx.fill()
        }

        // Gotas más pequeñas alrededor de la línea principal
        for (let i = 0; i < 15; i++) {
          const offset = (frameCount * 0.015 + i * 0.07) % 1
          const x = startX + (endX - startX) * offset
          const y = startY + (endY - startY) * offset
          const randomOffset = (Math.sin(frameCount * 0.1 + i) * 8)

          ctx.beginPath()
          ctx.arc(x + randomOffset, y + randomOffset, 3, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(34, 211, 238, 0.7)'
          ctx.fill()
        }

        // Efecto de "salpicadura" en el destino
        const splashRadius = 20 + Math.sin(frameCount * 0.2) * 5
        ctx.beginPath()
        ctx.arc(endX, endY, splashRadius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(34, 211, 238, 0.4)'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(endX, endY, splashRadius * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.fill()
      }

      frameCount++
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [aguaFluyendo, zonaSeleccionada])

  // Generar gotas flotantes
  useEffect(() => {
    const nuevasGotas: Array<{ id: number; x: number; y: number; velocidad: number }> = []
    for (let i = 0; i < 30; i++) {
      nuevasGotas.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        velocidad: 0.5 + Math.random() * 0.5,
      })
    }
    setGotas(nuevasGotas)
  }, [])

  const seleccionarZona = (zona: Zona) => {
    setZonaSeleccionada(zona)
    setAguaFluyendo(true)
    setSolicitudEnviada(false)
  }

  const enviarSolicitud = () => {
    if (zonaSeleccionada) {
      setSolicitudEnviada(true)
      setTimeout(() => {
        setAguaFluyendo(false)
        setZonaSeleccionada(null)
        setTimeout(() => setSolicitudEnviada(false), 3000)
      }, 2000)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 relative overflow-hidden">
      {/* Canvas para efectos de agua */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Gotas flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        {gotas.map((gota) => (
          <div
            key={gota.id}
            className="absolute w-2 h-2 bg-blue-300/40 rounded-full animate-float"
            style={{
              left: `${gota.x}%`,
              top: `${gota.y}%`,
              animationDuration: `${3 + gota.velocidad}s`,
              animationDelay: `${gota.id * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-white/20">
            <Droplets size={20} className="text-cyan-300" />
            <span className="text-sm sm:text-base font-medium text-white">La Ola del Servicio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-shadow-lg">
            Agua Potable
            <br />
            <span className="text-cyan-300">Donde la Necesites</span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Selecciona tu zona y visualiza cómo el agua fluye hacia ti. Servicio rápido y confiable.
          </p>
        </div>

        {/* Mapa Interactivo */}
        <div className="relative w-full max-w-4xl mb-8 sm:mb-12">
          <div className="relative aspect-square bg-gradient-to-br from-blue-800/50 to-cyan-900/50 rounded-3xl p-8 sm:p-12 border-4 border-white/20 backdrop-blur-sm shadow-2xl">
            {/* Punto central (fuente) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                  <Droplets size={32} className="text-white" />
                </div>
              </div>
            </div>

            {/* Zonas interactivas */}
            {zonas.map((zona) => {
              const estaSeleccionada = zonaSeleccionada?.id === zona.id
              return (
                <button
                  key={zona.id}
                  onClick={() => seleccionarZona(zona)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    estaSeleccionada ? 'scale-125 z-30' : 'hover:scale-110 z-10'
                  }`}
                  style={{
                    left: `${zona.coordenadas.x}%`,
                    top: `${zona.coordenadas.y}%`,
                  }}
                >
                  <div
                    className={`relative bg-gradient-to-br ${zona.color} rounded-full p-4 sm:p-6 shadow-xl border-4 ${
                      estaSeleccionada ? 'border-cyan-300 shadow-cyan-300/50' : 'border-white/30'
                    } transition-all`}
                  >
                    {estaSeleccionada && (
                      <div className="absolute -inset-2 bg-cyan-400 rounded-full animate-ping opacity-50"></div>
                    )}
                    <MapPin size={24} className="text-white" />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-blue-900 whitespace-nowrap">
                      {zona.nombre}
                    </div>
                  </div>
                </button>
              )
            })}

            {/* Indicador de flujo */}
            {aguaFluyendo && zonaSeleccionada && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-15 pointer-events-none">
                <div className="flex items-center gap-2 text-white bg-blue-600/80 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-300/50">
                  <Waves size={20} className="text-cyan-300 animate-pulse" />
                  <span className="text-sm font-semibold">Agua fluyendo hacia {zonaSeleccionada.nombre}...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Panel de información */}
        {zonaSeleccionada && (
          <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 shadow-xl animate-fade-in-up">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
              <div className="bg-white/10 rounded-xl p-4 text-center border border-white/20">
                <MapPin size={24} className="text-cyan-300 mx-auto mb-2" />
                <p className="text-white font-semibold text-lg">{zonaSeleccionada.nombre}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center border border-white/20">
                <Clock size={24} className="text-cyan-300 mx-auto mb-2" />
                <p className="text-white font-semibold text-lg">30-45 min</p>
                <p className="text-blue-200 text-sm">Tiempo estimado</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center border border-white/20">
                <Zap size={24} className="text-cyan-300 mx-auto mb-2" />
                <p className="text-white font-semibold text-lg">{zonaSeleccionada.demanda}%</p>
                <p className="text-blue-200 text-sm">Demanda actual</p>
              </div>
            </div>

            {!solicitudEnviada ? (
              <button
                onClick={enviarSolicitud}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <Phone size={24} />
                <span>Solicitar Servicio de Agua</span>
              </button>
            ) : (
              <div className="bg-green-500/20 border-2 border-green-400 rounded-xl p-6 text-center animate-fade-in">
                <CheckCircle2 size={48} className="text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">¡Solicitud Enviada!</h3>
                <p className="text-green-100">
                  Nuestro equipo se pondrá en contacto contigo en breve. El agua está en camino.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Servicios */}
        <div className="mt-12 w-full max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
            <Droplets size={32} className="text-cyan-300" />
            <span>Nuestros Servicios</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Droplets, titulo: 'Agua Potable', descripcion: 'Suministro garantizado de agua limpia y segura' },
              { icon: Clock, titulo: 'Servicio 24/7', descripcion: 'Disponible cuando lo necesites, día y noche' },
              { icon: Zap, titulo: 'Entrega Rápida', descripcion: 'Llegamos a tu zona en menos de 45 minutos' },
            ].map((servicio, index) => {
              const Icon = servicio.icon
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 hover:border-cyan-300/50 transition-all"
                >
                  <Icon size={32} className="text-cyan-300 mx-auto mb-3" />
                  <h3 className="text-white font-semibold text-lg mb-2">{servicio.titulo}</h3>
                  <p className="text-blue-200 text-sm">{servicio.descripcion}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

