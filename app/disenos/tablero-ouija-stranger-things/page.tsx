'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { MessageSquare, Sparkles, Zap, Eye, Ghost } from 'lucide-react'

interface Letter {
  char: string
  x: number
  y: number
  isLit: boolean
  glowIntensity: number
}

interface Light {
  id: number
  x: number
  y: number
  color: string
  intensity: number
  flicker: number
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
}

export default function TableroOuijaStrangerThingsPage() {
  const [letras, setLetras] = useState<Letter[]>([])
  const [luces, setLuces] = useState<Light[]>([])
  const [particulas, setParticulas] = useState<Particle[]>([])
  const [mensaje, setMensaje] = useState<string>('')
  const [mensajeRevelado, setMensajeRevelado] = useState<string>('')
  const [mostrarMensaje, setMostrarMensaje] = useState(false)
  const [tableroActivo, setTableroActivo] = useState(false)
  const [planchette, setPlanchette] = useState({ x: 50, y: 50 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particulasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  const alfabeto = useMemo(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), [])
  const coloresLuces = useMemo(() => ['#ff0000', '#ff0080', '#ffaa00', '#ffff00', '#00ff00', '#00ffff', '#0080ff', '#8000ff'], [])
  const mensajesMisteriosos = useMemo(() => [
    'HELLO',
    'YES',
    'NO',
    'GOODBYE',
    'FRIEND',
    'HELP',
    'DANGER',
    'RUN',
    'TRUST',
    'BELIEVE',
  ], [])

  // Inicializar letras del alfabeto
  useEffect(() => {
    const nuevasLetras: Letter[] = []
    const letrasPorFila = [8, 9, 9] // A, B, C, D, E, F, G, H | I, J, K, L, M, N, O, P, Q | R, S, T, U, V, W, X, Y, Z
    let indice = 0

    letrasPorFila.forEach((cantidad, fila) => {
      const anchoTotal = cantidad * 12
      const inicioX = (100 - anchoTotal) / 2 // Centrar cada fila
      
      for (let i = 0; i < cantidad; i++) {
        nuevasLetras.push({
          char: alfabeto[indice],
          x: inicioX + (i * 12),
          y: 20 + (fila * 15),
          isLit: false,
          glowIntensity: 0,
        })
        indice++
      }
    })

    setLetras(nuevasLetras)
  }, [alfabeto])

  // Inicializar luces navideñas
  useEffect(() => {
    const nuevasLuces: Light[] = []
    for (let i = 0; i < 30; i++) {
      nuevasLuces.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 80,
        color: coloresLuces[Math.floor(Math.random() * coloresLuces.length)],
        intensity: 0.3 + Math.random() * 0.7,
        flicker: Math.random() * Math.PI * 2,
      })
    }
    setLuces(nuevasLuces)
  }, [coloresLuces])

  // Animar luces parpadeantes
  useEffect(() => {
    const interval = setInterval(() => {
      setLuces((prev) =>
        prev.map((luz) => ({
          ...luz,
          intensity: 0.3 + Math.sin(Date.now() * 0.003 + luz.flicker) * 0.4,
          flicker: luz.flicker + 0.1,
        }))
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Animar partículas
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
            ctx.shadowBlur = 10
            ctx.shadowColor = p.color
            ctx.beginPath()
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
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

  // Generar partículas al iluminar letras
  const generarParticulas = (x: number, y: number, color: string) => {
    const nuevasParticulas: Particle[] = []
    for (let i = 0; i < 15; i++) {
      nuevasParticulas.push({
        id: Date.now() + i,
        x: (x / 100) * (typeof window !== 'undefined' ? window.innerWidth : 1920),
        y: (y / 100) * (typeof window !== 'undefined' ? window.innerHeight : 1080),
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        life: 60 + Math.random() * 40,
        color,
      })
    }
    setParticulas((prev) => [...prev, ...nuevasParticulas])
  }

  // Iluminar letra al hacer clic
  const iluminarLetra = (letra: Letter) => {
    if (!tableroActivo) return

    setLetras((prev) =>
      prev.map((l) => {
        if (l.char === letra.char) {
          generarParticulas(l.x, l.y, '#ff0080')
          return {
            ...l,
            isLit: true,
            glowIntensity: 1,
          }
        }
        return {
          ...l,
          glowIntensity: Math.max(0, l.glowIntensity - 0.1),
        }
      })
    )

    setMensaje((prev) => prev + letra.char)
  }

  // Revelar mensaje misterioso
  const revelarMensaje = () => {
    if (!tableroActivo) {
      setTableroActivo(true)
    }

    // Limpiar primero
    setMensaje('')
    setMostrarMensaje(false)
    setLetras((prev) =>
      prev.map((l) => ({
        ...l,
        isLit: false,
        glowIntensity: 0,
      }))
    )

    const mensajeAleatorio = mensajesMisteriosos[Math.floor(Math.random() * mensajesMisteriosos.length)]
    setMensajeRevelado(mensajeAleatorio)
    
    // Iluminar letras del mensaje automáticamente en secuencia
    mensajeAleatorio.split('').forEach((char, index) => {
      setTimeout(() => {
        const letraEncontrada = letras.find((l) => l.char === char)
        if (letraEncontrada) {
          setLetras((prev) =>
            prev.map((l) => {
              if (l.char === char) {
                generarParticulas(l.x, l.y, '#ff0080')
                return {
                  ...l,
                  isLit: true,
                  glowIntensity: 1,
                }
              }
              return l
            })
          )
        }
      }, index * 300)
    })

    // Mostrar mensaje después de un breve delay
    setTimeout(() => {
      setMostrarMensaje(true)
    }, mensajeAleatorio.length * 300 + 500)
  }

  // Mover planchette (tablero Ouija)
  const moverPlanchette = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tableroActivo) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setPlanchette({ x, y })

    // Detectar si está sobre una letra
    letras.forEach((letra) => {
      const distancia = Math.sqrt(
        Math.pow(x - letra.x, 2) + Math.pow(y - letra.y, 2)
      )
      if (distancia < 5 && !letra.isLit) {
        iluminarLetra(letra)
      }
    })
  }

  // Limpiar mensaje
  const limpiarMensaje = () => {
    setMensaje('')
    setMensajeRevelado('')
    setMostrarMensaje(false)
    setLetras((prev) =>
      prev.map((l) => ({
        ...l,
        isLit: false,
        glowIntensity: 0,
      }))
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Canvas de partículas */}
      <canvas
        ref={particulasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Fondo con textura de pared */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(139, 69, 19, 0.1) 10px,
              rgba(139, 69, 19, 0.1) 20px
            )`,
          }}
        />
      </div>

      {/* Luces navideñas */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        {luces.map((luz) => (
          <div
            key={luz.id}
            className="absolute rounded-full"
            style={{
              left: `${luz.x}%`,
              top: `${luz.y}%`,
              width: '8px',
              height: '8px',
              backgroundColor: luz.color,
              boxShadow: `0 0 ${20 * luz.intensity}px ${luz.intensity}px ${luz.color}`,
              opacity: luz.intensity,
              transition: 'opacity 0.1s',
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Ghost className="w-12 h-12 text-red-500 animate-pulse" />
            <h1 className="text-4xl sm:text-6xl font-bold text-white">
              TABLERO OUJA
            </h1>
            <Ghost className="w-12 h-12 text-red-500 animate-pulse" />
          </div>
          <p className="text-xl sm:text-2xl text-gray-300 mb-4">
            Conecta con el más allá
          </p>
          {!tableroActivo && (
            <button
              onClick={revelarMensaje}
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white text-lg font-bold py-3 px-8 rounded-lg transform hover:scale-105 transition-all shadow-2xl border-2 border-red-400"
            >
              <Sparkles className="w-5 h-5 inline mr-2" />
              Activar Tablero
            </button>
          )}
        </header>

        {/* Tablero Ouija */}
        <div className="w-full max-w-4xl mb-8">
          <div
            className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 rounded-3xl p-8 sm:p-12 border-4 border-amber-700 shadow-2xl"
            onMouseMove={moverPlanchette}
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(139, 69, 19, 0.3), transparent)`,
            }}
          >
            {/* Letras del alfabeto */}
            <div className="relative" style={{ minHeight: '400px' }}>
              {letras.map((letra) => (
                <button
                  key={letra.char}
                  onClick={() => iluminarLetra(letra)}
                  className={`absolute text-4xl sm:text-5xl font-bold transition-all duration-300 cursor-pointer ${
                    letra.isLit
                      ? 'text-red-400 scale-110'
                      : 'text-amber-200 hover:text-amber-100'
                  }`}
                  style={{
                    left: `${letra.x}%`,
                    top: `${letra.y}%`,
                    transform: `translate(-50%, -50%) scale(${1 + letra.glowIntensity * 0.2})`,
                    textShadow: letra.isLit
                      ? `0 0 ${20 * letra.glowIntensity}px #ff0080, 0 0 ${40 * letra.glowIntensity}px #ff0080`
                      : 'none',
                    filter: letra.isLit ? 'brightness(1.5)' : 'brightness(1)',
                  }}
                >
                  {letra.char}
                </button>
              ))}

              {/* Planchette (indicador del tablero Ouija) */}
              {tableroActivo && (
                <div
                  className="absolute w-16 h-16 bg-white/20 rounded-lg border-2 border-white/40 pointer-events-none transition-all duration-100"
                  style={{
                    left: `${planchette.x}%`,
                    top: `${planchette.y}%`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                  }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full" />
                </div>
              )}
            </div>

            {/* Palabras del tablero */}
            <div className="mt-8 flex justify-between items-center text-amber-200 text-xl sm:text-2xl font-bold">
              <span>YES</span>
              <span>NO</span>
              <span>GOODBYE</span>
            </div>
          </div>
        </div>

        {/* Mensaje revelado */}
        {mostrarMensaje && mensajeRevelado && (
          <div className="w-full max-w-4xl mb-8">
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border-4 border-red-500 shadow-2xl">
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-red-400 mb-4 flex items-center justify-center gap-2">
                  <Eye className="w-6 h-6" />
                  Mensaje del Más Allá
                </h3>
                <p className="text-4xl sm:text-6xl font-bold text-white mb-4 tracking-wider">
                  {mensajeRevelado}
                </p>
                <div className="flex gap-2 justify-center text-2xl">
                  {mensajeRevelado.split('').map((char, i) => (
                    <span
                      key={i}
                      className="text-red-400 animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mensaje actual */}
        {tableroActivo && mensaje && (
          <div className="w-full max-w-4xl mb-8">
            <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border-2 border-amber-600">
              <p className="text-2xl sm:text-3xl font-bold text-amber-300 text-center tracking-wider">
                {mensaje}
              </p>
            </div>
          </div>
        )}

        {/* Controles */}
        {tableroActivo && (
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={limpiarMensaje}
              className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white text-lg font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all shadow-xl border-2 border-gray-500"
            >
              <Zap className="w-5 h-5 inline mr-2" />
              Limpiar
            </button>
            <button
              onClick={revelarMensaje}
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white text-lg font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all shadow-xl border-2 border-red-400"
            >
              <MessageSquare className="w-5 h-5 inline mr-2" />
              Nuevo Mensaje
            </button>
          </div>
        )}

        {/* Instrucciones */}
        {tableroActivo && (
          <div className="mt-8 w-full max-w-2xl">
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border-2 border-amber-700">
              <h3 className="text-xl font-bold text-amber-300 mb-3 text-center">
                📜 Instrucciones
              </h3>
              <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                <li>• Mueve el mouse sobre el tablero para mover la planchette</li>
                <li>• Haz clic en las letras o pasa sobre ellas para iluminarlas</li>
                <li>• Las letras iluminadas forman tu mensaje</li>
                <li>• Presiona &quot;Nuevo Mensaje&quot; para recibir un mensaje misterioso</li>
              </ul>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            ⚠️ Usa con precaución. El tablero Ouija es solo una experiencia interactiva.
          </p>
        </footer>
      </div>
    </div>
  )
}

