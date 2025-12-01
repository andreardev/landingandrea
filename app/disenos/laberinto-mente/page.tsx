'use client'

import { useState, useEffect, useRef } from 'react'
import { Brain, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Sparkles, Heart, Users, BookOpen, Shield, Lightbulb, X } from 'lucide-react'

interface PuntoDecision {
  id: number
  x: number
  y: number
  servicio: string
  titulo: string
  descripcion: string
  icon: any
  color: string
}

export default function LaberintoMentePage() {
  const [posicion, setPosicion] = useState({ x: 0, y: 0 })
  const [mostrandoInfo, setMostrandoInfo] = useState(false)
  const [servicioActual, setServicioActual] = useState<PuntoDecision | null>(null)
  const [historial, setHistorial] = useState<number[]>([])
  const [profundidad, setProfundidad] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  const puntosDecision: PuntoDecision[] = [
    {
      id: 1,
      x: 1,
      y: 0,
      servicio: 'Terapia Individual',
      titulo: 'Terapia Individual',
      descripcion: 'Espacio seguro y confidencial para explorar tus pensamientos y emociones. Sesiones personalizadas adaptadas a tus necesidades.',
      icon: Heart,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      x: 2,
      y: 0,
      servicio: 'Terapia de Pareja',
      titulo: 'Terapia de Pareja',
      descripcion: 'Fortalece tu relación y mejora la comunicación. Trabajamos juntos para construir una conexión más profunda y saludable.',
      icon: Users,
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 3,
      x: 0,
      y: 1,
      servicio: 'Terapia Familiar',
      titulo: 'Terapia Familiar',
      descripcion: 'Mejora las dinámicas familiares y resuelve conflictos. Creamos un ambiente de comprensión y apoyo mutuo.',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 4,
      x: 1,
      y: 1,
      servicio: 'Terapia Cognitivo-Conductual',
      titulo: 'Terapia Cognitivo-Conductual',
      descripcion: 'Identifica y modifica patrones de pensamiento negativos. Técnicas basadas en evidencia para el cambio positivo.',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      id: 5,
      x: 2,
      y: 1,
      servicio: 'Terapia de Ansiedad',
      titulo: 'Manejo de Ansiedad',
      descripcion: 'Aprende técnicas efectivas para controlar la ansiedad y el estrés. Recupera tu tranquilidad y bienestar.',
      icon: Shield,
      color: 'from-orange-500 to-amber-500',
    },
    {
      id: 6,
      x: 0,
      y: 2,
      servicio: 'Coaching Personal',
      titulo: 'Coaching Personal',
      descripcion: 'Desarrolla tu potencial y alcanza tus objetivos. Te guiamos en tu camino hacia el crecimiento personal.',
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 7,
      x: 1,
      y: 2,
      servicio: 'Terapia de Duelo',
      titulo: 'Terapia de Duelo',
      descripcion: 'Proceso de sanación y aceptación. Te acompañamos en momentos difíciles con compasión y profesionalismo.',
      icon: Heart,
      color: 'from-gray-500 to-slate-500',
    },
    {
      id: 8,
      x: 2,
      y: 2,
      servicio: 'Talleres y Grupos',
      titulo: 'Talleres y Grupos',
      descripcion: 'Espacios de crecimiento en comunidad. Aprende y comparte experiencias con otros en un ambiente seguro.',
      icon: BookOpen,
      color: 'from-teal-500 to-cyan-500',
    },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dibujarLaberinto = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Configuración
      const cellSize = 120
      const offsetX = canvas.width / 2 - (2 * cellSize)
      const offsetY = canvas.height / 2 - (1.5 * cellSize)

      // Dibujar laberinto 3D
      puntosDecision.forEach((punto) => {
        const x = offsetX + punto.x * cellSize
        const y = offsetY + punto.y * cellSize
        const z = profundidad

        // Calcular perspectiva 3D
        const scale = 1 - z * 0.1
        const screenX = x + z * 20
        const screenY = y - z * 20

        // Si es el punto actual, destacarlo
        const esActual = punto.x === posicion.x && punto.y === posicion.y

        // Dibujar celda del laberinto
        ctx.save()
        ctx.translate(screenX, screenY)
        ctx.scale(scale, scale)

        // Sombra
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
        ctx.fillRect(-cellSize/2 + 5, -cellSize/2 + 5, cellSize, cellSize)

        // Celda con efecto 3D
        const gradient = ctx.createLinearGradient(-cellSize/2, -cellSize/2, cellSize/2, cellSize/2)
        if (esActual) {
          gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)')
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0.3)')
        } else {
          gradient.addColorStop(0, 'rgba(100, 100, 100, 0.1)')
          gradient.addColorStop(1, 'rgba(150, 150, 150, 0.1)')
        }
        ctx.fillStyle = gradient
        ctx.fillRect(-cellSize/2, -cellSize/2, cellSize, cellSize)

        // Borde
        ctx.strokeStyle = esActual ? 'rgba(139, 92, 246, 0.8)' : 'rgba(200, 200, 200, 0.3)'
        ctx.lineWidth = esActual ? 3 : 1
        ctx.strokeRect(-cellSize/2, -cellSize/2, cellSize, cellSize)

        // Icono del servicio
        if (esActual) {
          ctx.fillStyle = 'rgba(139, 92, 246, 0.5)'
          ctx.beginPath()
          ctx.arc(0, 0, 20, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      })

      // Dibujar caminos entre puntos
      ctx.strokeStyle = 'rgba(150, 150, 150, 0.2)'
      ctx.lineWidth = 2
      ctx.beginPath()
      
      // Conexiones horizontales
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 2; x++) {
          const x1 = offsetX + x * cellSize
          const y1 = offsetY + y * cellSize
          const x2 = offsetX + (x + 1) * cellSize
          const y2 = offsetY + y * cellSize
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
        }
      }
      
      // Conexiones verticales
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 2; y++) {
          const x1 = offsetX + x * cellSize
          const y1 = offsetY + y * cellSize
          const x2 = offsetX + x * cellSize
          const y2 = offsetY + (y + 1) * cellSize
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
        }
      }
      
      ctx.stroke()

      // Dibujar posición actual
      const actualX = offsetX + posicion.x * cellSize
      const actualY = offsetY + posicion.y * cellSize
      ctx.fillStyle = 'rgba(139, 92, 246, 0.6)'
      ctx.beginPath()
      ctx.arc(actualX, actualY, 15, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.lineWidth = 2
      ctx.stroke()
    }

    const animate = () => {
      dibujarLaberinto()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [posicion, profundidad])

  useEffect(() => {
    // Verificar si hay un servicio en la posición actual
    const punto = puntosDecision.find(p => p.x === posicion.x && p.y === posicion.y)
    if (punto && !historial.includes(punto.id)) {
      setServicioActual(punto)
      setMostrandoInfo(true)
      setHistorial(prev => [...prev, punto.id])
      setProfundidad(prev => Math.min(prev + 0.1, 0.5))
    }
  }, [posicion, historial])

  const mover = (direccion: 'up' | 'down' | 'left' | 'right') => {
    setMostrandoInfo(false)
    const nuevaPosicion = { ...posicion }

    switch (direccion) {
      case 'up':
        if (nuevaPosicion.y > 0) nuevaPosicion.y--
        break
      case 'down':
        if (nuevaPosicion.y < 2) nuevaPosicion.y++
        break
      case 'left':
        if (nuevaPosicion.x > 0) nuevaPosicion.x--
        break
      case 'right':
        if (nuevaPosicion.x < 2) nuevaPosicion.x++
        break
    }

    setPosicion(nuevaPosicion)
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        mover('up')
        break
      case 'ArrowDown':
        mover('down')
        break
      case 'ArrowLeft':
        mover('left')
        break
      case 'ArrowRight':
        mover('right')
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Efectos de profundidad */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/30 via-transparent to-slate-900/50"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4">
            <Brain size={20} className="text-purple-300" />
            <span className="text-sm sm:text-base font-medium text-white">El Laberinto de la Mente</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-shadow-lg">
            Explora Tu Camino
          </h1>
          <p className="text-lg sm:text-xl text-purple-200 max-w-2xl mx-auto">
            Cada decisión te acerca a descubrir los servicios que necesitas
          </p>
        </div>

        {/* Laberinto 3D */}
        <div className="relative mb-8 sm:mb-12 w-full max-w-4xl">
          <div className="relative bg-black/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full h-auto rounded-xl"
            />
          </div>

          {/* Controles de navegación */}
          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <button
                onClick={() => mover('up')}
                className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl transition-all transform hover:scale-110 active:scale-95 border border-white/20"
              >
                <ArrowUp size={24} />
              </button>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => mover('left')}
                className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl transition-all transform hover:scale-110 active:scale-95 border border-white/20"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="w-16 h-16 flex items-center justify-center bg-purple-500/20 rounded-full border-2 border-purple-400">
                <Brain size={32} className="text-purple-300" />
              </div>
              <button
                onClick={() => mover('right')}
                className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl transition-all transform hover:scale-110 active:scale-95 border border-white/20"
              >
                <ArrowRight size={24} />
              </button>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => mover('down')}
                className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl transition-all transform hover:scale-110 active:scale-95 border border-white/20"
              >
                <ArrowDown size={24} />
              </button>
            </div>
            <p className="text-white/60 text-sm mt-2">Usa las flechas del teclado o los botones</p>
          </div>
        </div>

        {/* Información del servicio descubierto */}
        {mostrandoInfo && servicioActual && (
          <div className="w-full max-w-2xl animate-scale-in">
            <div className={`bg-gradient-to-br ${servicioActual.color} rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-white/20`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    {(() => {
                      const Icon = servicioActual.icon
                      return <Icon size={32} className="text-white" />
                    })()}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">{servicioActual.titulo}</h2>
                </div>
                <button
                  onClick={() => setMostrandoInfo(false)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>
              <p className="text-white/90 text-lg leading-relaxed mb-6">{servicioActual.descripcion}</p>
              <button className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-xl transition-all transform hover:scale-105">
                Más Información
              </button>
            </div>
          </div>
        )}

        {/* Servicios descubiertos */}
        {historial.length > 0 && (
          <div className="mt-12 w-full max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
              <Sparkles size={28} className="text-purple-300" />
              <span>Servicios Descubiertos</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {historial.map((id) => {
                const servicio = puntosDecision.find(p => p.id === id)
                if (!servicio) return null
                const Icon = servicio.icon
                return (
                  <div
                    key={id}
                    className={`bg-gradient-to-br ${servicio.color} rounded-xl p-4 shadow-lg border border-white/20 animate-scale-in`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon size={24} className="text-white" />
                      <h4 className="text-white font-semibold">{servicio.titulo}</h4>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Instrucciones */}
        <div className="mt-8 text-center text-white/60 text-sm sm:text-base max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <p>💡 Navega por el laberinto usando las flechas. Cada decisión te revelará un servicio diferente.</p>
        </div>
      </div>
    </main>
  )
}

