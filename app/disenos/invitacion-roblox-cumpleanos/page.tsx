'use client'

import { useState, useEffect, useRef } from 'react'
import { Calendar, MapPin, Clock, Gift, Users, Sparkles, PartyPopper, Cake } from 'lucide-react'

interface RobloxCharacter {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  life: number
}

export default function InvitacionRobloxCumpleanosPage() {
  const [edadSeleccionada, setEdadSeleccionada] = useState<7 | 65 | null>(null)
  const [personajes, setPersonajes] = useState<RobloxCharacter[]>([])
  const [particulas, setParticulas] = useState<Particle[]>([])
  const [juegoActivo, setJuegoActivo] = useState(false)
  const [puntos, setPuntos] = useState(0)
  const [mostrarInfo, setMostrarInfo] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particulasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  const coloresRoblox = ['#1E88E5', '#43A047', '#E53935', '#FB8C00', '#8E24AA', '#FDD835']
  const nombreCumpleanero = edadSeleccionada === 7 ? 'Alex' : 'Abuelo Pepe'
  const fecha = '15 de Diciembre, 2024'
  const hora = edadSeleccionada === 7 ? '2:00 PM' : '6:00 PM'
  const lugar = edadSeleccionada === 7 ? 'Casa de Alex' : 'Salón de Eventos'
  const direccion = edadSeleccionada === 7 ? 'Calle Roblox 123, Ciudad' : 'Av. Principal 456, Ciudad'
  const tema = edadSeleccionada === 7 ? 'Fiesta Roblox' : 'Roblox para Adultos'

  // Generar personajes Roblox
  useEffect(() => {
    if (!edadSeleccionada || !juegoActivo) {
      setPersonajes([])
      return
    }

    // Esperar un momento para que el canvas esté listo
    const timer = setTimeout(() => {
      const nuevosPersonajes: RobloxCharacter[] = []
      const cantidad = edadSeleccionada === 7 ? 20 : 15

      for (let i = 0; i < cantidad; i++) {
        nuevosPersonajes.push({
          id: Date.now() + i,
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
          y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          color: coloresRoblox[Math.floor(Math.random() * coloresRoblox.length)],
          size: 60 + Math.random() * 60, // Personajes más grandes (60-120px)
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 8,
        })
      }
      setPersonajes(nuevosPersonajes)
    }, 100)

    return () => clearTimeout(timer)
  }, [edadSeleccionada, juegoActivo])

  // Animación de personajes
  useEffect(() => {
    if (!juegoActivo || !canvasRef.current) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Forzar repintado después de redimensionar
      if (personajes.length > 0) {
        setPersonajes((prev) => [...prev])
      }
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let animationId: number

    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Actualizar y dibujar personajes
      setPersonajes((prev) =>
        prev.map((p) => {
          let newX = p.x + p.vx
          let newY = p.y + p.vy
          let newVx = p.vx
          let newVy = p.vy

          // Rebotes en los bordes
          if (newX <= p.size / 2 || newX >= canvas.width - p.size / 2) {
            newVx = -newVx * 0.9 // Reducir velocidad ligeramente
            newX = Math.max(p.size / 2, Math.min(canvas.width - p.size / 2, newX))
          }
          if (newY <= p.size / 2 || newY >= canvas.height - p.size / 2) {
            newVy = -newVy * 0.9
            newY = Math.max(p.size / 2, Math.min(canvas.height - p.size / 2, newY))
          }

          const newRotation = p.rotation + p.rotationSpeed

          // Dibujar personaje estilo Roblox (bloque cuadrado con cara)
          ctx.save()
          ctx.translate(newX, newY)
          ctx.rotate((newRotation * Math.PI) / 180)

          // Borde exterior para mejor visibilidad
          ctx.strokeStyle = '#FFFFFF'
          ctx.lineWidth = 4
          ctx.strokeRect(-p.size / 2 - 2, -p.size / 2 - 2, p.size + 4, p.size + 4)

          // Sombra para efecto 3D (antes del cuerpo)
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
          ctx.fillRect(-p.size / 2 + 3, p.size / 2 - 3, p.size, 8)

          // Cuerpo (bloque principal) con gradiente
          const gradient = ctx.createLinearGradient(-p.size / 2, -p.size / 2, p.size / 2, p.size / 2)
          gradient.addColorStop(0, p.color)
          gradient.addColorStop(1, p.color + 'CC')
          ctx.fillStyle = gradient
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)

          // Borde interno
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
          ctx.lineWidth = 2
          ctx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size)

          // Ojos más grandes y visibles
          ctx.fillStyle = '#FFFFFF'
          const eyeSize = p.size * 0.2
          const eyeY = -p.size * 0.15
          ctx.fillRect(-p.size * 0.3, eyeY, eyeSize, eyeSize)
          ctx.fillRect(p.size * 0.3 - eyeSize, eyeY, eyeSize, eyeSize)

          // Pupilas
          ctx.fillStyle = '#000000'
          const pupilSize = eyeSize * 0.6
          ctx.fillRect(-p.size * 0.3 + eyeSize * 0.2, eyeY + eyeSize * 0.2, pupilSize, pupilSize)
          ctx.fillRect(p.size * 0.3 - eyeSize + eyeSize * 0.2, eyeY + eyeSize * 0.2, pupilSize, pupilSize)

          // Sonrisa más visible
          ctx.strokeStyle = '#000000'
          ctx.lineWidth = Math.max(3, p.size * 0.05)
          ctx.beginPath()
          ctx.arc(0, p.size * 0.15, p.size * 0.25, 0, Math.PI)
          ctx.stroke()

          ctx.restore()

          return {
            ...p,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            rotation: newRotation,
          }
        })
      )

      animationId = requestAnimationFrame(animate)
      animationFrameRef.current = animationId
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [juegoActivo, personajes])

  // Animación de partículas
  useEffect(() => {
    if (!particulasRef.current) return

    const canvas = particulasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      setParticulas((prev) =>
        prev
          .map((p) => {
            ctx.save()
            ctx.globalAlpha = p.life / 100
            ctx.fillStyle = p.color
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()

            return {
              ...p,
              x: p.x + p.vx,
              y: p.y + p.vy,
              life: p.life - 1,
            }
          })
          .filter((p) => p.life > 0)
      )

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [particulas])

  // Generar partículas al hacer clic
  const generarParticulas = (x: number, y: number) => {
    const nuevasParticulas: Particle[] = []
    for (let i = 0; i < 20; i++) {
      nuevasParticulas.push({
        id: Date.now() + i,
        x,
        y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        color: coloresRoblox[Math.floor(Math.random() * coloresRoblox.length)],
        size: 3 + Math.random() * 5,
        life: 100,
      })
    }
    setParticulas((prev) => [...prev, ...nuevasParticulas])
  }

  // Manejar clic en personajes
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const personajeClickeado = personajes.find((p) => {
      const dx = x - p.x
      const dy = y - p.y
      return Math.sqrt(dx * dx + dy * dy) < p.size
    })

    if (personajeClickeado) {
      setPuntos((prev) => prev + 10)
      generarParticulas(x, y)
      setPersonajes((prev) => prev.filter((p) => p.id !== personajeClickeado.id))
    }
  }

  // Generar nuevos personajes cuando se eliminan
  useEffect(() => {
    if (!juegoActivo || !edadSeleccionada) return

    const minPersonajes = edadSeleccionada === 7 ? 15 : 12
    if (personajes.length < minPersonajes) {
      const timer = setTimeout(() => {
        const nuevoPersonaje: RobloxCharacter = {
          id: Date.now() + Math.random(),
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
          y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          color: coloresRoblox[Math.floor(Math.random() * coloresRoblox.length)],
          size: 60 + Math.random() * 60,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 8,
        }
        setPersonajes((prev) => [...prev, nuevoPersonaje])
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [personajes.length, juegoActivo, edadSeleccionada])

  if (!edadSeleccionada) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-4 border-white/30 text-center max-w-2xl">
          <div className="mb-8">
            <div className="text-6xl sm:text-8xl mb-4">🎮</div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
              ¡Invitación Roblox!
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8">
              Selecciona la edad del cumpleañero
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button
              onClick={() => setEdadSeleccionada(7)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-2xl font-bold py-8 px-6 rounded-2xl transform hover:scale-105 transition-all shadow-2xl border-4 border-white/30"
            >
              <div className="text-5xl mb-2">🎂</div>
              <div>7 Años</div>
              <div className="text-lg mt-2 opacity-90">Fiesta Roblox</div>
            </button>

            <button
              onClick={() => setEdadSeleccionada(65)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-2xl font-bold py-8 px-6 rounded-2xl transform hover:scale-105 transition-all shadow-2xl border-4 border-white/30"
            >
              <div className="text-5xl mb-2">🎉</div>
              <div>65+ Años</div>
              <div className="text-lg mt-2 opacity-90">Roblox para Adultos</div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Canvas de partículas de fondo */}
      <canvas
        ref={particulasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Canvas de personajes Roblox */}
      {juegoActivo && (
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="absolute inset-0 z-10 cursor-pointer"
          style={{ 
            width: '100%', 
            height: '100%',
            minHeight: '100vh',
            display: 'block'
          }}
        />
      )}

      {/* Contenido principal */}
      <div className="relative z-20">
        {/* Header */}
        <header className="text-center py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-6xl sm:text-8xl mb-4 animate-bounce">🎮</div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-2">
              ¡Cumpleaños Roblox!
            </h1>
            <p className="text-2xl sm:text-3xl text-white/90 mb-4">
              {nombreCumpleanero} cumple {edadSeleccionada} años
            </p>
            {juegoActivo && (
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 inline-block border-2 border-white/30">
                <p className="text-xl text-white font-bold">
                  Puntos: {puntos} 🎯
                </p>
                <p className="text-sm text-white/90 mt-1">
                  ¡Haz clic en los personajes para ganar puntos!
                </p>
              </div>
            )}
          </div>
        </header>

        {/* Botones de acción */}
        <div className="text-center mb-8 px-4">
          <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
            {!juegoActivo ? (
              <button
                onClick={() => setJuegoActivo(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xl font-bold py-4 px-8 rounded-2xl transform hover:scale-105 transition-all shadow-2xl border-4 border-white/30"
              >
                🎮 Jugar Mini-Juego Roblox
              </button>
            ) : (
              <button
                onClick={() => {
                  setJuegoActivo(false)
                  setPuntos(0)
                  setPersonajes([])
                }}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-xl font-bold py-4 px-8 rounded-2xl transform hover:scale-105 transition-all shadow-2xl border-4 border-white/30"
              >
                ⏸️ Pausar Juego
              </button>
            )}

            <button
              onClick={() => setMostrarInfo(!mostrarInfo)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-xl font-bold py-4 px-8 rounded-2xl transform hover:scale-105 transition-all shadow-2xl border-4 border-white/30"
            >
              {mostrarInfo ? '👁️ Ocultar' : '📋 Ver'} Información
            </button>

            <button
              onClick={() => setEdadSeleccionada(null)}
              className="bg-white/20 hover:bg-white/30 text-white text-xl font-bold py-4 px-8 rounded-2xl transform hover:scale-105 transition-all shadow-2xl border-2 border-white/30"
            >
              🔄 Cambiar Edad
            </button>
          </div>
        </div>

        {/* Información del evento */}
        {mostrarInfo && (
          <section className="max-w-4xl mx-auto px-4 mb-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-4 border-white/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/20 rounded-2xl p-6 border-2 border-white/30">
                  <Calendar className="w-8 h-8 text-yellow-300 mb-2" />
                  <h3 className="text-2xl font-bold text-white mb-2">Fecha</h3>
                  <p className="text-xl text-white/90">{fecha}</p>
                </div>

                <div className="bg-white/20 rounded-2xl p-6 border-2 border-white/30">
                  <Clock className="w-8 h-8 text-yellow-300 mb-2" />
                  <h3 className="text-2xl font-bold text-white mb-2">Hora</h3>
                  <p className="text-xl text-white/90">{hora}</p>
                </div>

                <div className="bg-white/20 rounded-2xl p-6 border-2 border-white/30">
                  <MapPin className="w-8 h-8 text-yellow-300 mb-2" />
                  <h3 className="text-2xl font-bold text-white mb-2">Lugar</h3>
                  <p className="text-xl text-white/90">{lugar}</p>
                  <p className="text-lg text-white/70 mt-1">{direccion}</p>
                </div>

                <div className="bg-white/20 rounded-2xl p-6 border-2 border-white/30">
                  <Gift className="w-8 h-8 text-yellow-300 mb-2" />
                  <h3 className="text-2xl font-bold text-white mb-2">Tema</h3>
                  <p className="text-xl text-white/90">{tema}</p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-2xl text-white mb-4">
                  ¡Esperamos verte en esta fiesta épica! 🎉
                </p>
                <div className="flex flex-wrap gap-4 justify-center text-4xl">
                  <span className="animate-bounce">🎮</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>🎂</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🎈</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🎁</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Instrucciones del juego */}
        {juegoActivo && !mostrarInfo && (
          <section className="max-w-2xl mx-auto px-4 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/30 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                🎯 Instrucciones del Juego
              </h3>
              <p className="text-lg text-white/90 mb-2">
                Haz clic en los personajes Roblox que aparecen en pantalla para ganar puntos.
                ¡Mientras más personajes captures, más puntos obtienes!
              </p>
              {personajes.length === 0 && (
                <p className="text-yellow-300 font-bold text-xl mt-4 animate-pulse">
                  ⏳ Cargando personajes...
                </p>
              )}
              {personajes.length > 0 && (
                <p className="text-green-300 font-semibold mt-2">
                  ✨ {personajes.length} personajes en pantalla
                </p>
              )}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center py-8 px-4">
          <p className="text-white/80 text-lg">
            Creado con ❤️ para una fiesta inolvidable
          </p>
        </footer>
      </div>
    </div>
  )
}

