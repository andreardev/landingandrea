'use client'

import { useState, useEffect, useRef } from 'react'
import { Code, Terminal, Zap, Shield, Database, Cloud, Lock, Cpu, CheckCircle2, X } from 'lucide-react'

interface Comando {
  comando: string
  descripcion: string
  servicio: string
  titulo: string
  detalles: string
  icon: any
  color: string
}

export default function MatrizCodigoPage() {
  const [inputComando, setInputComando] = useState('')
  const [historial, setHistorial] = useState<string[]>([])
  const [mostrandoInfo, setMostrandoInfo] = useState(false)
  const [servicioActual, setServicioActual] = useState<Comando | null>(null)
  const [hackeando, setHackeando] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const comandos: Comando[] = [
    {
      comando: 'ls services',
      descripcion: 'Listar servicios disponibles',
      servicio: 'Desarrollo Web',
      titulo: 'Desarrollo Web',
      detalles: 'Creamos aplicaciones web modernas y escalables usando las últimas tecnologías. React, Next.js, Node.js y más.',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      comando: 'cat security.txt',
      descripcion: 'Ver información de seguridad',
      servicio: 'Seguridad Informática',
      titulo: 'Seguridad Informática',
      detalles: 'Protege tu negocio con nuestras soluciones de seguridad avanzadas. Auditorías, pentesting y protección 24/7.',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
    },
    {
      comando: 'mysql -u admin -p',
      descripcion: 'Acceder a base de datos',
      servicio: 'Bases de Datos',
      titulo: 'Bases de Datos',
      detalles: 'Optimización y gestión de bases de datos. MySQL, PostgreSQL, MongoDB. Alto rendimiento y escalabilidad.',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
    },
    {
      comando: 'aws deploy',
      descripcion: 'Desplegar en la nube',
      servicio: 'Cloud Computing',
      titulo: 'Cloud Computing',
      detalles: 'Infraestructura en la nube escalable. AWS, Azure, Google Cloud. Optimización de costos y rendimiento.',
      icon: Cloud,
      color: 'from-purple-500 to-pink-500',
    },
    {
      comando: 'encrypt --file',
      descripcion: 'Encriptar archivos',
      servicio: 'Criptografía',
      titulo: 'Criptografía y Encriptación',
      detalles: 'Protección de datos con encriptación de nivel empresarial. SSL/TLS, AES-256, y más.',
      icon: Lock,
      color: 'from-indigo-500 to-blue-500',
    },
    {
      comando: 'docker run',
      descripcion: 'Ejecutar contenedores',
      servicio: 'DevOps',
      titulo: 'DevOps y CI/CD',
      detalles: 'Automatización de despliegues y pipelines. Docker, Kubernetes, Jenkins. Desarrollo ágil y eficiente.',
      icon: Cpu,
      color: 'from-amber-500 to-yellow-500',
    },
  ]

  const comandosAyuda = [
    'help - Mostrar ayuda',
    'clear - Limpiar terminal',
    'ls services - Listar servicios',
    'cat security.txt - Ver seguridad',
    'mysql -u admin -p - Bases de datos',
    'aws deploy - Cloud computing',
    'encrypt --file - Criptografía',
    'docker run - DevOps',
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00ff41'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx.fillText(text, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const procesarComando = (comando: string) => {
    const comandoLimpio = comando.trim().toLowerCase()

    if (comandoLimpio === 'help') {
      setHistorial(prev => [...prev, '> ' + comando, ...comandosAyuda.map(c => '  ' + c)])
      return
    }

    if (comandoLimpio === 'clear') {
      setHistorial([])
      return
    }

    const comandoEncontrado = comandos.find(c => 
      comandoLimpio.includes(c.comando.toLowerCase())
    )

    if (comandoEncontrado) {
      setHackeando(true)
      setHistorial(prev => [...prev, '> ' + comando, 'Hacking...', 'Accessing system...'])

      setTimeout(() => {
        setServicioActual(comandoEncontrado)
        setMostrandoInfo(true)
        setHackeando(false)
        setHistorial(prev => [...prev, '✓ Access granted', '> '])
      }, 2000)
    } else {
      setHistorial(prev => [...prev, '> ' + comando, 'Error: Command not found', 'Type "help" for available commands', '> '])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !hackeando) {
      if (inputComando.trim()) {
        procesarComando(inputComando)
        setInputComando('')
      }
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [historial])

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Lluvia de código Matrix */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-20"
        style={{ zIndex: 1 }}
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-green-900/10 to-black" style={{ zIndex: 2 }}></div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-green-500/30">
            <Terminal size={20} className="text-green-400" />
            <span className="text-sm sm:text-base font-medium text-green-400 font-mono">La Matriz del Código</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-green-400 mb-4 font-mono">
            {'>'} HACK THE SYSTEM
          </h1>
          <p className="text-lg sm:text-xl text-green-300 max-w-2xl mx-auto font-mono">
            Escribe comandos para descubrir nuestros servicios
          </p>
        </div>

        {/* Terminal */}
        <div className="flex-1 max-w-4xl mx-auto w-full mb-8">
          <div className="bg-black/90 backdrop-blur-sm rounded-lg border-2 border-green-500/50 shadow-[0_0_30px_rgba(0,255,65,0.3)]">
            {/* Barra de título */}
            <div className="bg-green-900/50 px-4 py-2 flex items-center gap-2 border-b border-green-500/30">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-green-400 text-sm font-mono ml-4">terminal@matrix:~</span>
            </div>

            {/* Contenido del terminal */}
            <div
              ref={terminalRef}
              className="p-4 h-96 overflow-y-auto font-mono text-sm"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#00ff41 transparent',
              }}
            >
              <div className="text-green-400 mb-4">
                <div className="mb-2">Welcome to THE MATRIX</div>
                <div className="mb-2">Type commands to explore our services</div>
                <div className="mb-4">Type "help" for available commands</div>
              </div>

              {historial.map((line, index) => (
                <div
                  key={index}
                  className={`mb-1 ${
                    line.startsWith('Error') 
                      ? 'text-red-400' 
                      : line.startsWith('✓') || line.startsWith('Hacking') || line.startsWith('Accessing')
                      ? 'text-green-400'
                      : line.startsWith('>')
                      ? 'text-green-300'
                      : 'text-green-500'
                  }`}
                >
                  {line}
                </div>
              ))}

              {/* Input */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-green-400">{'>'}</span>
                <input
                  type="text"
                  value={inputComando}
                  onChange={(e) => setInputComando(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={hackeando}
                  className="flex-1 bg-transparent text-green-400 outline-none font-mono"
                  placeholder={hackeando ? 'Hacking...' : 'Type command here'}
                  autoFocus
                />
                {hackeando && (
                  <span className="text-green-400 animate-pulse">█</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Información del servicio hackeado */}
        {mostrandoInfo && servicioActual && (
          <div className="max-w-2xl mx-auto w-full mb-8 animate-scale-in">
            <div className={`bg-gradient-to-br ${servicioActual.color} rounded-lg p-6 sm:p-8 shadow-2xl border-2 border-green-500/50`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    {(() => {
                      const Icon = servicioActual.icon
                      return <Icon size={32} className="text-white" />
                    })()}
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono">{servicioActual.titulo}</h2>
                    <p className="text-white/80 text-sm font-mono">Access Level: ADMIN</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMostrandoInfo(false)
                    setServicioActual(null)
                    setHistorial(prev => [...prev, '> '])
                  }}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>
              <div className="bg-black/30 rounded-lg p-4 mb-4">
                <p className="text-white/90 leading-relaxed font-mono text-sm sm:text-base">{servicioActual.detalles}</p>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm font-mono">
                <CheckCircle2 size={16} className="text-green-300" />
                <span>Service Status: ACTIVE</span>
              </div>
            </div>
          </div>
        )}

        {/* Servicios descubiertos */}
        {historial.some(h => h.includes('Access granted')) && (
          <div className="max-w-4xl mx-auto w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl sm:text-3xl font-bold text-green-400 mb-6 text-center font-mono">
              {'>'} SERVICES DISCOVERED
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {comandos.map((cmd, index) => {
                const Icon = cmd.icon
                const descubierto = historial.some(h => h.includes(cmd.comando))
                return (
                  <div
                    key={index}
                    className={`bg-black/60 backdrop-blur-sm rounded-lg p-4 border-2 ${
                      descubierto ? 'border-green-500/50' : 'border-gray-700/50'
                    } transition-all`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon size={24} className={descubierto ? 'text-green-400' : 'text-gray-500'} />
                      <span className={`font-mono text-sm ${descubierto ? 'text-green-400' : 'text-gray-500'}`}>
                        {descubierto ? cmd.servicio : 'LOCKED'}
                      </span>
                    </div>
                    {descubierto && (
                      <p className="text-green-300 text-xs font-mono">{cmd.descripcion}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Instrucciones */}
        <div className="mt-8 text-center text-green-400/60 text-sm sm:text-base max-w-xl mx-auto font-mono animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <p>{'>'} Try commands like: ls services, cat security.txt, aws deploy</p>
        </div>
      </div>
    </main>
  )
}

