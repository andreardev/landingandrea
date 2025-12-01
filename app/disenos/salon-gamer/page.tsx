'use client'

import { useState, useEffect, useRef } from 'react'
import { Gamepad2, Trophy, Users, Pizza, Music, Zap, Star, Play, Pause } from 'lucide-react'

interface BloqueTetris {
  id: number
  x: number
  y: number
  tipo: number
  color: string
  velocidad: number
}

interface PuntoPacman {
  id: number
  x: number
  y: number
  comido: boolean
}

export default function SalonGamerPage() {
  const [bloques, setBloques] = useState<BloqueTetris[]>([])
  const [puntos, setPuntos] = useState<PuntoPacman[]>([])
  const [puntuacion, setPuntuacion] = useState(0)
  const [pacmanPos, setPacmanPos] = useState({ x: 1, y: 1 })
  const [direccion, setDireccion] = useState<'up' | 'down' | 'left' | 'right'>('right')
  const [juegoActivo, setJuegoActivo] = useState(false)
  const [mostrandoInfo, setMostrandoInfo] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  const tiposBloques = [
    { color: '#FF0000', forma: [[1, 1], [1, 1]] }, // O
    { color: '#00FF00', forma: [[1, 1, 1, 1]] }, // I
    { color: '#0000FF', forma: [[1, 1, 1], [0, 1, 0]] }, // T
    { color: '#FFFF00', forma: [[1, 1, 0], [0, 1, 1]] }, // S
    { color: '#FF00FF', forma: [[0, 1, 1], [1, 1, 0]] }, // Z
  ]

  const servicios = [
    {
      id: 'consolas',
      titulo: 'Consolas de Última Generación',
      descripcion: 'PS5, Xbox Series X, Nintendo Switch y más. Más de 20 consolas disponibles.',
      icon: Gamepad2,
      color: 'from-blue-500 to-cyan-500',
      puntos: 100,
    },
    {
      id: 'torneos',
      titulo: 'Torneos y Competencias',
      descripcion: 'Organizamos torneos semanales con premios. ¡Demuestra tus habilidades!',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      puntos: 200,
    },
    {
      id: 'comida',
      titulo: 'Comida Gamer',
      descripcion: 'Pizzas, hamburguesas, snacks y bebidas. Todo para mantenerte energizado.',
      icon: Pizza,
      color: 'from-red-500 to-pink-500',
      puntos: 50,
    },
    {
      id: 'musica',
      titulo: 'Música y Ambiente',
      descripcion: 'Sistema de sonido profesional y ambiente gaming perfecto.',
      icon: Music,
      color: 'from-purple-500 to-indigo-500',
      puntos: 75,
    },
  ]

  useEffect(() => {
    // Inicializar puntos del laberinto
    const nuevosPuntos: PuntoPacman[] = []
    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 20; x++) {
        if (Math.random() > 0.3) {
          nuevosPuntos.push({
            id: y * 20 + x,
            x: x * 30 + 15,
            y: y * 30 + 15,
            comido: false,
          })
        }
      }
    }
    setPuntos(nuevosPuntos)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Inicializar canvas
    canvas.width = 600
    canvas.height = 450

    const dibujar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dibujar laberinto estilo Pac-Man
      ctx.strokeStyle = '#4169E1'
      ctx.lineWidth = 2
      ctx.beginPath()
      
      // Líneas horizontales
      for (let y = 0; y < 16; y++) {
        ctx.moveTo(0, y * 30)
        ctx.lineTo(canvas.width, y * 30)
      }
      
      // Líneas verticales
      for (let x = 0; x < 21; x++) {
        ctx.moveTo(x * 30, 0)
        ctx.lineTo(x * 30, canvas.height)
      }
      
      ctx.stroke()

      // Dibujar puntos
      puntos.forEach((punto) => {
        if (!punto.comido) {
          ctx.fillStyle = '#FFD700'
          ctx.beginPath()
          ctx.arc(punto.x, punto.y, 3, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Dibujar Pac-Man
      if (juegoActivo) {
        ctx.fillStyle = '#FFD700'
        ctx.beginPath()
        const pacmanX = pacmanPos.x * 30 + 15
        const pacmanY = pacmanPos.y * 30 + 15
        const tiempo = Date.now() * 0.005
        const anguloApertura = Math.sin(tiempo) * 0.5 + 0.3
        let startAngle = 0
        let endAngle = Math.PI * 2

        switch (direccion) {
          case 'right':
            startAngle = anguloApertura
            endAngle = Math.PI * 2 - anguloApertura
            break
          case 'left':
            startAngle = Math.PI + anguloApertura
            endAngle = Math.PI - anguloApertura
            break
          case 'up':
            startAngle = Math.PI / 2 + anguloApertura
            endAngle = Math.PI / 2 - anguloApertura
            break
          case 'down':
            startAngle = -Math.PI / 2 + anguloApertura
            endAngle = -Math.PI / 2 - anguloApertura
            break
        }

        ctx.arc(pacmanX, pacmanY, 12, startAngle, endAngle)
        ctx.lineTo(pacmanX, pacmanY)
        ctx.fill()
      }

      // Dibujar bloques de Tetris
      bloques.forEach((bloque) => {
        ctx.fillStyle = bloque.color
        ctx.fillRect(bloque.x, bloque.y, 30, 30)
        ctx.strokeStyle = '#000'
        ctx.lineWidth = 2
        ctx.strokeRect(bloque.x, bloque.y, 30, 30)
      })

      if (juegoActivo) {
        animationFrameRef.current = requestAnimationFrame(dibujar)
      }
    }

    if (juegoActivo) {
      dibujar()
    } else {
      // Dibujar frame estático
      dibujar()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [juegoActivo, bloques, puntos, pacmanPos, direccion])

  useEffect(() => {
    if (!juegoActivo) return

    // Mover Pac-Man automáticamente
    const intervalo = setInterval(() => {
      setPacmanPos((prev) => {
        let nuevoX = prev.x
        let nuevoY = prev.y

        switch (direccion) {
          case 'right':
            nuevoX = Math.min(prev.x + 1, 19)
            break
          case 'left':
            nuevoX = Math.max(prev.x - 1, 0)
            break
          case 'down':
            nuevoY = Math.min(prev.y + 1, 14)
            break
          case 'up':
            nuevoY = Math.max(prev.y - 1, 0)
            break
        }

        // Verificar si come un punto
        const puntoIndex = puntos.findIndex(
          (p) => !p.comido && Math.abs(p.x - (nuevoX * 30 + 15)) < 20 && Math.abs(p.y - (nuevoY * 30 + 15)) < 20
        )

        if (puntoIndex !== -1) {
          setPuntos((prev) => {
            const nuevos = [...prev]
            nuevos[puntoIndex].comido = true
            return nuevos
          })
          setPuntuacion((prev) => prev + 10)
        }

        return { x: nuevoX, y: nuevoY }
      })
    }, 200)

    return () => clearInterval(intervalo)
  }, [juegoActivo, direccion, puntos])

  useEffect(() => {
    if (!juegoActivo) {
      setBloques([])
      return
    }

    // Generar bloques de Tetris
    const intervalo = setInterval(() => {
      if (bloques.length < 8) {
        const tipo = Math.floor(Math.random() * tiposBloques.length)
        setBloques((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.floor(Math.random() * 19) * 30,
            y: -30,
            tipo,
            color: tiposBloques[tipo].color,
            velocidad: 1 + Math.random() * 2,
          },
        ])
      }
    }, 2000)

    // Mover bloques hacia abajo
    const moverBloques = setInterval(() => {
      setBloques((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y + b.velocidad }))
          .filter((b) => b.y < 450)
      )
    }, 50)

    return () => {
      clearInterval(intervalo)
      clearInterval(moverBloques)
    }
  }, [juegoActivo, bloques.length, tiposBloques])

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!juegoActivo) return

    switch (e.key) {
      case 'ArrowUp':
        setDireccion('up')
        break
      case 'ArrowDown':
        setDireccion('down')
        break
      case 'ArrowLeft':
        setDireccion('left')
        break
      case 'ArrowRight':
        setDireccion('right')
        break
    }
  }

  useEffect(() => {
    if (juegoActivo) {
      window.addEventListener('keydown', handleKeyPress)
      return () => window.removeEventListener('keydown', handleKeyPress)
    }
  }, [juegoActivo])

  // Verificar si se comió un servicio
  useEffect(() => {
    if (!juegoActivo) return
    
    const puntosComidos = puntos.filter((p) => p.comido).length
    if (puntosComidos > 0 && puntosComidos % 20 === 0 && puntosComidos % 40 !== 0) {
      const servicioIndex = Math.floor((puntosComidos / 20 - 1) % servicios.length)
      const servicio = servicios[servicioIndex]
      if (servicio) {
        setMostrandoInfo(servicio.id)
        setPuntuacion((prev) => prev + servicio.puntos)
        setTimeout(() => setMostrandoInfo(null), 3000)
      }
    }
  }, [puntos, juegoActivo, servicios])

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-white/20">
            <Gamepad2 size={20} className="text-yellow-400" />
            <span className="text-sm sm:text-base font-medium text-white">Salón de Fiestas Gamer</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-shadow-lg">
            TETRIS {'+'} PAC-MAN
          </h1>
          <p className="text-lg sm:text-xl text-purple-200 max-w-2xl mx-auto">
            La experiencia gaming definitiva combinada en un solo lugar
          </p>
        </div>

        {/* Área de juego combinado */}
        <div className="relative mb-8 sm:mb-12 w-full max-w-4xl">
          <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border-2 border-purple-500/50 shadow-2xl">
            {/* Canvas para el juego */}
            <canvas
              ref={canvasRef}
              width={600}
              height={450}
              className="w-full h-auto rounded-lg bg-black"
            />

            {/* Overlay de controles */}
            <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setJuegoActivo(!juegoActivo)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  {juegoActivo ? <Pause size={20} /> : <Play size={20} />}
                  <span>{juegoActivo ? 'Pausar' : 'Jugar'}</span>
                </button>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <div className="text-white/60 text-xs">Puntuación</div>
                  <div className="text-yellow-400 text-2xl font-bold font-mono">{puntuacion}</div>
                </div>
              </div>
              <div className="text-white/60 text-sm">
                Usa las flechas del teclado para mover a Pac-Man
              </div>
            </div>
          </div>
        </div>

        {/* Información del servicio descubierto */}
        {mostrandoInfo && (
          <div className="w-full max-w-2xl mb-8 animate-scale-in">
            {(() => {
              const servicio = servicios.find((s) => s.id === mostrandoInfo)
              if (!servicio) return null
              const Icon = servicio.icon
              return (
                <div className={`bg-gradient-to-br ${servicio.color} rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-white/20`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Icon size={32} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white">{servicio.titulo}</h2>
                      <div className="text-white/80 text-sm">+{servicio.puntos} puntos</div>
                    </div>
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed">{servicio.descripcion}</p>
                </div>
              )
            })()}
          </div>
        )}

        {/* Servicios */}
        <div className="w-full max-w-6xl mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
            <Star size={32} className="text-yellow-400" />
            <span>Nuestros Servicios</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicios.map((servicio, index) => {
              const Icon = servicio.icon
              return (
                <div
                  key={servicio.id}
                  className={`bg-gradient-to-br ${servicio.color} rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105 animate-scale-in border-2 border-white/20`}
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 w-16 h-16 flex items-center justify-center mb-4">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{servicio.titulo}</h3>
                  <p className="text-white/90 text-sm">{servicio.descripcion}</p>
                  <div className="mt-4 text-yellow-300 font-bold">+{servicio.puntos} pts</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <button className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl font-semibold rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto">
            <Zap size={28} />
            <span>Reservar Mi Fiesta Gamer</span>
          </button>
        </div>
      </div>
    </main>
  )
}

