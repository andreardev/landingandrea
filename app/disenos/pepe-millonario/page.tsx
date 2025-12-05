'use client'

import { useState, useEffect, useRef } from 'react'
import { DollarSign, TrendingUp, Sparkles, Phone, Crown, Gem, Coins, Zap, Trophy, Star } from 'lucide-react'

interface Billete {
  id: number
  x: number
  y: number
  rotacion: number
  velocidadX: number
  velocidadY: number
  valor: number
  vida: number
}

interface Diamante {
  id: number
  x: number
  y: number
  rotacion: number
  velocidadY: number
  brillo: number
}

interface NivelRiqueza {
  nombre: string
  dineroNecesario: number
  icono: typeof Crown
  color: string
  descripcion: string
}

export default function PepeMillonarioPage() {
  const [dineroGenerado, setDineroGenerado] = useState(0)
  const [billetes, setBilletes] = useState<Billete[]>([])
  const [diamantes, setDiamantes] = useState<Diamante[]>([])
  const [nivelActual, setNivelActual] = useState(0)
  const [maquinaActiva, setMaquinaActiva] = useState(false)
  const [mostrandoInfo, setMostrandoInfo] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  const nivelesRiqueza: NivelRiqueza[] = [
    {
      nombre: 'Iniciante',
      dineroNecesario: 0,
      icono: Coins,
      color: 'from-gray-400 to-gray-600',
      descripcion: 'Comienza tu viaje hacia la riqueza',
    },
    {
      nombre: 'Ahorrador',
      dineroNecesario: 1000,
      icono: DollarSign,
      color: 'from-green-400 to-green-600',
      descripcion: '¡Bien hecho! Estás ahorrando',
    },
    {
      nombre: 'Inversionista',
      dineroNecesario: 5000,
      icono: TrendingUp,
      color: 'from-blue-400 to-blue-600',
      descripcion: 'Tus inversiones están creciendo',
    },
    {
      nombre: 'Millionario',
      dineroNecesario: 10000,
      icono: Crown,
      color: 'from-yellow-400 to-yellow-600',
      descripcion: '¡Felicidades! Has alcanzado el millón',
    },
    {
      nombre: 'Magnate',
      dineroNecesario: 50000,
      icono: Gem,
      color: 'from-purple-400 to-purple-600',
      descripcion: 'Eres un verdadero magnate',
    },
    {
      nombre: 'Leyenda',
      dineroNecesario: 100000,
      icono: Trophy,
      color: 'from-pink-400 to-pink-600',
      descripcion: '¡Leyenda de la riqueza!',
    },
  ]

  // Generar billete
  const generarBillete = (x: number, y: number) => {
    const valor = Math.random() > 0.7 ? 100 : Math.random() > 0.4 ? 50 : 20
    const nuevoBillete: Billete = {
      id: Date.now() + Math.random(),
      x,
      y,
      rotacion: Math.random() * 360,
      velocidadX: (Math.random() - 0.5) * 2,
      velocidadY: Math.random() * 2 + 1,
      valor,
      vida: 200,
    }
    setBilletes((prev) => [...prev, nuevoBillete])
    setDineroGenerado((prev) => prev + valor)
  }

  // Generar diamante
  const generarDiamante = () => {
    const nuevoDiamante: Diamante = {
      id: Date.now() + Math.random(),
      x: Math.random() * (window.innerWidth || 800),
      y: -20,
      rotacion: 0,
      velocidadY: Math.random() * 1 + 0.5,
      brillo: Math.random(),
    }
    setDiamantes((prev) => [...prev, nuevoDiamante])
  }

  // Animar billetes y diamantes en canvas
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dibujar billetes
      setBilletes((prevBilletes) => {
        const nuevosBilletes: Billete[] = []
        prevBilletes.forEach((billete) => {
          billete.y += billete.velocidadY
          billete.x += billete.velocidadX
          billete.rotacion += 2
          billete.vida--
          billete.velocidadY += 0.1 // Gravedad

          if (billete.y < canvas.height && billete.vida > 0) {
            nuevosBilletes.push(billete)

            // Dibujar billete
            ctx.save()
            ctx.translate(billete.x, billete.y)
            ctx.rotate((billete.rotacion * Math.PI) / 180)
            ctx.fillStyle = billete.valor === 100 ? '#d4af37' : billete.valor === 50 ? '#c0c0c0' : '#90ee90'
            ctx.fillRect(-30, -15, 60, 30)
            ctx.fillStyle = '#000'
            ctx.font = 'bold 12px Arial'
            ctx.textAlign = 'center'
            ctx.fillText(`$${billete.valor}`, 0, 5)
            ctx.restore()
          }
        })
        return nuevosBilletes
      })

      // Dibujar diamantes
      setDiamantes((prevDiamantes) => {
        const nuevosDiamantes: Diamante[] = []
        prevDiamantes.forEach((diamante) => {
          diamante.y += diamante.velocidadY
          diamante.rotacion += 3
          diamante.brillo = (diamante.brillo + 0.05) % 1

          if (diamante.y < canvas.height) {
            nuevosDiamantes.push(diamante)

            // Dibujar diamante
            ctx.save()
            ctx.translate(diamante.x, diamante.y)
            ctx.rotate((diamante.rotacion * Math.PI) / 180)
            const alpha = 0.5 + Math.sin(diamante.brillo * Math.PI * 2) * 0.5
            ctx.fillStyle = `rgba(138, 43, 226, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(0, -15)
            ctx.lineTo(10, 0)
            ctx.lineTo(0, 15)
            ctx.lineTo(-10, 0)
            ctx.closePath()
            ctx.fill()
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
            ctx.lineWidth = 2
            ctx.stroke()
            ctx.restore()
          }
        })
        return nuevosDiamantes
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
  }, [])

  // Verificar nivel actual
  useEffect(() => {
    const nuevoNivel = nivelesRiqueza.findIndex(
      (nivel, index) =>
        dineroGenerado >= nivel.dineroNecesario &&
        (index === nivelesRiqueza.length - 1 || dineroGenerado < nivelesRiqueza[index + 1].dineroNecesario)
    )
    if (nuevoNivel !== -1 && nuevoNivel !== nivelActual) {
      setNivelActual(nuevoNivel)
      if (nuevoNivel > 0) {
        setMostrandoInfo(true)
        setTimeout(() => setMostrandoInfo(false), 3000)
      }
    }
  }, [dineroGenerado, nivelActual, nivelesRiqueza])

  // Generar diamantes periódicamente
  useEffect(() => {
    if (!maquinaActiva) return

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        generarDiamante()
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [maquinaActiva])

  const activarMaquina = () => {
    setMaquinaActiva(true)
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        generarBillete(
          (window.innerWidth || 800) / 2 + (Math.random() - 0.5) * 200,
          -20
        )
      }, i * 100)
    }
  }

  const generarDineroClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    generarBillete(x, y)
    if (Math.random() > 0.8) {
      generarDiamante()
    }
  }

  const contactarWhatsApp = () => {
    const mensaje = `Hola Pepe Millonario! Me interesa conocer más sobre cómo generar riqueza.`
    const url = `https://wa.me/528126902979?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  const nivel = nivelesRiqueza[nivelActual]
  const IconoNivel = nivel.icono
  const siguienteNivel = nivelesRiqueza[nivelActual + 1]
  const progreso = siguienteNivel
    ? ((dineroGenerado - nivel.dineroNecesario) / (siguienteNivel.dineroNecesario - nivel.dineroNecesario)) * 100
    : 100

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-900 via-amber-900 to-yellow-800 relative overflow-hidden">
      {/* Canvas para billetes y diamantes */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Efectos de fondo dorado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/20 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <section className="text-center py-12 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <Crown size={20} className="text-yellow-300 animate-pulse" />
              <span className="text-yellow-100 font-medium">Pepe Millonario</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white">
              <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                Genera
              </span>{' '}
              <span className="text-white">Tu</span>{' '}
              <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                Fortuna
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl text-yellow-100 mb-8">
              La Máquina de Dinero que Transforma Sueños en Realidad
            </p>
          </div>
        </section>

        {/* Contador de Dinero y Nivel */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur-xl rounded-3xl p-8 border-2 border-yellow-400/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contador de Dinero */}
                <div className="text-center">
                  <DollarSign size={48} className="mx-auto mb-4 text-yellow-300" />
                  <p className="text-yellow-200 text-lg mb-2">Dinero Generado</p>
                  <p className="text-5xl sm:text-6xl font-bold text-yellow-300">
                    ${dineroGenerado.toLocaleString()}
                  </p>
                </div>

                {/* Nivel Actual */}
                <div className="text-center">
                  <IconoNivel size={48} className={`mx-auto mb-4 text-yellow-300`} />
                  <p className="text-yellow-200 text-lg mb-2">Nivel de Riqueza</p>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${nivel.color} bg-clip-text text-transparent`}>
                    {nivel.nombre}
                  </p>
                  {siguienteNivel && (
                    <div className="mt-4">
                      <div className="bg-yellow-900/50 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${siguienteNivel.color} transition-all duration-500`}
                          style={{ width: `${Math.min(100, Math.max(0, progreso))}%` }}
                        />
                      </div>
                      <p className="text-yellow-200 text-sm mt-2">
                        ${(siguienteNivel.dineroNecesario - dineroGenerado).toLocaleString()} para{' '}
                        {siguienteNivel.nombre}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Máquina de Dinero Interactiva */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-yellow-600/30 to-amber-600/30 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-2 border-yellow-400/50">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center">
                Máquina de Dinero Interactiva
              </h2>
              <p className="text-xl text-yellow-100 mb-8 text-center">
                Haz clic en cualquier parte para generar dinero. ¡Cada clic genera billetes!
              </p>

              {/* Área interactiva */}
              <div
                onClick={generarDineroClick}
                className="relative bg-gradient-to-br from-yellow-800/50 to-amber-800/50 rounded-2xl p-12 min-h-[400px] sm:min-h-[500px] flex items-center justify-center cursor-pointer border-2 border-yellow-400/30 hover:border-yellow-300/50 transition-all group"
              >
                <div className="text-center">
                  <Zap
                    size={80}
                    className="mx-auto mb-4 text-yellow-300 group-hover:scale-110 transition-transform"
                  />
                  <p className="text-2xl font-bold text-yellow-200 mb-2">Haz Clic Aquí</p>
                  <p className="text-yellow-300/80">Genera billetes y diamantes</p>
                </div>

                {/* Botón de activación automática */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    activarMaquina()
                  }}
                  className="absolute bottom-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105"
                >
                  <Sparkles size={24} className="inline mr-2" />
                  Activar Máquina
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Información de Niveles */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center">
              Niveles de Riqueza
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {nivelesRiqueza.map((nivelItem, index) => {
                const IconoItem = nivelItem.icono
                const alcanzado = dineroGenerado >= nivelItem.dineroNecesario
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${nivelItem.color} rounded-2xl p-6 border-2 ${
                      alcanzado ? 'border-yellow-300 shadow-2xl scale-105' : 'border-white/20'
                    } transition-all`}
                  >
                    <IconoItem
                      size={48}
                      className={`mb-4 ${alcanzado ? 'text-yellow-300' : 'text-white/60'}`}
                    />
                    <h3 className="text-2xl font-bold text-white mb-2">{nivelItem.nombre}</h3>
                    <p className="text-white/80 mb-4">{nivelItem.descripcion}</p>
                    <p className="text-xl font-bold text-white">
                      ${nivelItem.dineroNecesario.toLocaleString()}
                    </p>
                    {alcanzado && (
                      <div className="mt-4 flex items-center gap-2 text-yellow-300">
                        <Star size={20} className="fill-yellow-300" />
                        <span className="font-semibold">¡Alcanzado!</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-2 border-yellow-400/30 text-center">
              <Crown size={64} className="mx-auto mb-6 text-yellow-300" />
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                ¿Listo para Generar tu Fortuna?
              </h2>
              <p className="text-xl text-yellow-100 mb-8">
                Contáctame y descubre cómo Pepe Millonario puede ayudarte a alcanzar tus metas financieras
              </p>
              <button
                onClick={contactarWhatsApp}
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-10 py-5 rounded-xl font-bold text-xl shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105 active:scale-95"
              >
                <Phone size={28} />
                <span>Contactar por WhatsApp</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Notificación de nuevo nivel */}
      {mostrandoInfo && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-2xl animate-pulse">
          <div className="flex items-center gap-3">
            <Trophy size={32} />
            <span>¡Nuevo Nivel Alcanzado: {nivel.nombre}!</span>
          </div>
        </div>
      )}
    </main>
  )
}

