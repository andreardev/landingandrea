'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Code, Rocket, Zap, CheckCircle2, ArrowRight, Play, 
  Terminal, Github, Globe, Sparkles, Timer, Star,
  ChevronDown, ChevronUp, Copy, ExternalLink
} from 'lucide-react'

export default function CursoLandingIAPage() {
  const [pasoActual, setPasoActual] = useState(0)
  const [codigoVisible, setCodigoVisible] = useState(false)
  const [particulas, setParticulas] = useState<Array<{ id: number; x: number; y: number; velocidad: number }>>([])
  const [tiempoRestante, setTiempoRestante] = useState(60)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const pasos = [
    {
      numero: 1,
      titulo: 'Instalar Cursor',
      descripcion: 'Descarga e instala Cursor, la herramienta que revoluciona el desarrollo con IA',
      detalles: [
        'Visita la página oficial de Cursor',
        'Descarga la versión correspondiente a tu sistema operativo',
        'Instálalo y ábrelo por primera vez',
      ],
      icono: Terminal,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      numero: 2,
      titulo: 'Identificar el chat de la IA',
      descripcion: 'Encuentra el panel lateral con el chat de inteligencia artificial',
      detalles: [
        'Dentro de Cursor encontrarás un panel lateral',
        'Ahí es donde trabajaremos con la IA',
        'El chat está listo para recibir tus instrucciones',
      ],
      icono: Code,
      color: 'from-purple-500 to-pink-500',
    },
    {
      numero: 3,
      titulo: 'Crear tu landing page con IA',
      descripcion: 'Pide a la IA que genere tu landing page completa y profesional',
      detalles: [
        'Escribe: "Crea una landing page profesional para desplegar en Vercel"',
        'Describe tu negocio, producto o servicio',
        'Espera a que Cursor genere el código completo',
        'Revisa los archivos generados',
      ],
      icono: Sparkles,
      color: 'from-yellow-500 to-orange-500',
      codigo: `"Crea una landing page profesional 
para desplegar en Vercel. 
Quiero que sea una idea disruptiva 
sobre mi negocio, que es: 
[describe tu negocio, producto o servicio]. 
Genera el proyecto completo 
listo para publicar."`,
    },
    {
      numero: 4,
      titulo: 'Crear tu cuenta en GitHub',
      descripcion: 'Regístrate en GitHub para alojar tu proyecto',
      detalles: [
        'Entra a github.com',
        'Crea tu cuenta (usa tu correo Gmail)',
        'No necesitas configuraciones avanzadas',
        'Solo crea tu perfil básico',
      ],
      icono: Github,
      color: 'from-gray-700 to-gray-900',
    },
    {
      numero: 5,
      titulo: 'Subir el proyecto a GitHub',
      descripcion: 'Usa Cursor para subir tu proyecto automáticamente',
      detalles: [
        'Vuelve a Cursor y dile a la IA',
        '"Sube este proyecto a mi cuenta de GitHub"',
        'Cursor realizará las configuraciones necesarias',
        'Tu landing page estará en un repositorio',
      ],
      icono: ArrowRight,
      color: 'from-green-500 to-emerald-500',
    },
    {
      numero: 6,
      titulo: 'Crear cuenta en Vercel',
      descripcion: 'Regístrate en Vercel para desplegar tu sitio',
      detalles: [
        'Visita vercel.com',
        'Crea tu cuenta con tu usuario de GitHub',
        'Esto permite sincronización automática',
      ],
      icono: Rocket,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      numero: 7,
      titulo: 'Importar y desplegar',
      descripcion: 'Conecta tu repositorio y despliega en segundos',
      detalles: [
        'Dentro de Vercel, haz clic en New Project',
        'Selecciona el repositorio que subiste',
        'Haz clic en Deploy',
        'En unos segundos estará desplegado',
      ],
      icono: Zap,
      color: 'from-pink-500 to-rose-500',
    },
    {
      numero: 8,
      titulo: 'Ver tu sitio publicado',
      descripcion: 'Tu landing page ya está en línea y funcionando',
      detalles: [
        'Vercel te mostrará una URL pública',
        'Tu landing page estará funcionando',
        'Si hay errores, pide a Cursor que los corrija',
        'Haz un nuevo deploy después de corregir',
      ],
      icono: Globe,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      numero: 9,
      titulo: 'Comprar y conectar dominio',
      descripcion: 'Personaliza tu sitio con tu propio dominio',
      detalles: [
        'En Vercel ve al menú de Domains',
        'Busca el dominio que te interese comprar',
        'Finaliza la compra',
        'Vincula el dominio con tu proyecto',
        'En minutos estará disponible con tu dominio',
      ],
      icono: Star,
      color: 'from-amber-500 to-yellow-500',
    },
  ]

  // Generar partículas
  useEffect(() => {
    const nuevasParticulas: Array<{ id: number; x: number; y: number; velocidad: number }> = []
    for (let i = 0; i < 50; i++) {
      nuevasParticulas.push({
        id: i,
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
        velocidad: 0.5 + Math.random() * 1.5,
      })
    }
    setParticulas(nuevasParticulas)
  }, [])

  // Animar partículas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof window === 'undefined') return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particulas.forEach((particula) => {
        particula.y += particula.velocidad
        if (particula.y > canvas.height) {
          particula.y = -10
          particula.x = Math.random() * canvas.width
        }

        ctx.fillStyle = 'rgba(99, 102, 241, 0.3)'
        ctx.beginPath()
        ctx.arc(particula.x, particula.y, 3, 0, Math.PI * 2)
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
  }, [particulas])

  // Timer de 60 minutos
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const siguientePaso = () => {
    if (pasoActual < pasos.length - 1) {
      setPasoActual(pasoActual + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const anteriorPaso = () => {
    if (pasoActual > 0) {
      setPasoActual(pasoActual - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const copiarCodigo = () => {
    if (pasos[pasoActual].codigo) {
      navigator.clipboard.writeText(pasos[pasoActual].codigo || '')
      alert('¡Código copiado al portapapeles!')
    }
  }

  const paso = pasos[pasoActual]
  const Icono = paso.icono
  const progreso = ((pasoActual + 1) / pasos.length) * 100

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Canvas para partículas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 pointer-events-none" style={{ zIndex: 2 }} />

      <div className="relative z-10 min-h-screen">
        {/* Header Hero */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20 relative">
          <div className="max-w-5xl mx-auto text-center animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-purple-500/30">
              <Zap size={18} className="text-yellow-400" />
              <span className="text-sm font-semibold">Curso en Línea</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Crea tu Landing Page
              <br />
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">en 60 Minutos</span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-purple-200 mb-8 max-w-3xl mx-auto">
              Sin experiencia en programación. Usa IA para generar, desplegar y publicar tu sitio profesional.
            </p>

            {/* Timer destacado */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl border-2 border-purple-400/50">
                <div className="flex items-center gap-3">
                  <Timer size={32} className="text-yellow-300" />
                  <div>
                    <div className="text-sm text-purple-200">Tiempo estimado</div>
                    <div className="text-3xl font-bold">{tiempoRestante} minutos</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Principal */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Play size={24} className="relative z-10" />
                <span className="relative z-10">Comenzar Ahora</span>
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center gap-3">
                <Star size={24} />
                <span>Ver Contenido</span>
              </button>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown size={32} className="text-purple-300" />
            </div>
          </div>
        </section>

        {/* Barra de progreso */}
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/30">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-purple-300">
                Paso {pasoActual + 1} de {pasos.length}
              </div>
              <div className="text-sm font-semibold text-purple-300">
                {Math.round(progreso)}% Completado
              </div>
            </div>
            <div className="w-full bg-purple-900/50 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 shadow-lg shadow-purple-500/50"
                style={{ width: `${progreso}%` }}
              />
            </div>
          </div>
        </div>

        {/* Contenido del paso actual */}
        <section className="max-w-5xl mx-auto px-4 py-12 sm:py-20">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-2 border-purple-500/30 shadow-2xl">
            {/* Header del paso */}
            <div className="flex items-start gap-6 mb-8">
              <div className={`bg-gradient-to-br ${paso.color} rounded-2xl p-6 shadow-xl flex-shrink-0`}>
                <Icono size={48} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="text-purple-300 text-sm font-semibold mb-2">
                  Paso {paso.numero}
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
                  {paso.titulo}
                </h2>
                <p className="text-xl text-purple-200">
                  {paso.descripcion}
                </p>
              </div>
            </div>

            {/* Lista de detalles */}
            <div className="space-y-4 mb-8">
              {paso.detalles.map((detalle, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white/5 rounded-xl p-4 border border-purple-500/20 hover:bg-white/10 transition-all"
                >
                  <CheckCircle2 size={24} className="text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-lg text-purple-100 flex-1">{detalle}</p>
                </div>
              ))}
            </div>

            {/* Código de ejemplo (si existe) */}
            {paso.codigo && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-purple-200 flex items-center gap-2">
                    <Code size={24} />
                    <span>Comando para Cursor</span>
                  </h3>
                  <button
                    onClick={copiarCodigo}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-all text-sm"
                  >
                    <Copy size={18} />
                    <span>Copiar</span>
                  </button>
                </div>
                <div className="bg-slate-900 rounded-xl p-6 border-2 border-purple-500/30 overflow-x-auto">
                  <pre className="text-green-400 font-mono text-sm sm:text-base whitespace-pre-wrap">
                    {paso.codigo}
                  </pre>
                </div>
              </div>
            )}

            {/* Navegación entre pasos */}
            <div className="flex items-center justify-between pt-8 border-t border-purple-500/30">
              <button
                onClick={anteriorPaso}
                disabled={pasoActual === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  pasoActual === 0
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <ChevronUp size={20} />
                <span>Anterior</span>
              </button>

              <div className="flex gap-2">
                {pasos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setPasoActual(index)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === pasoActual
                        ? 'bg-purple-500 w-8'
                        : 'bg-purple-500/30 hover:bg-purple-500/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={siguientePaso}
                disabled={pasoActual === pasos.length - 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  pasoActual === pasos.length - 1
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white'
                }`}
              >
                <span>Siguiente</span>
                <ChevronDown size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Sección de beneficios */}
        <section className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            ¿Por qué este curso?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icono: Zap,
                titulo: '60 Minutos',
                descripcion: 'De cero a publicado en menos de una hora',
                color: 'from-yellow-500 to-orange-500',
              },
              {
                icono: Code,
                titulo: 'Sin Programar',
                descripcion: 'La IA hace todo el trabajo técnico por ti',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icono: Rocket,
                titulo: 'Resultado Profesional',
                descripcion: 'Landing pages de calidad empresarial',
                color: 'from-purple-500 to-pink-500',
              },
            ].map((beneficio, index) => {
              const IconoBeneficio = beneficio.icono
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border-2 border-purple-500/30 hover:border-purple-500/50 transition-all"
                >
                  <div className={`bg-gradient-to-br ${beneficio.color} rounded-xl p-4 w-fit mb-4`}>
                    <IconoBeneficio size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{beneficio.titulo}</h3>
                  <p className="text-purple-200">{beneficio.descripcion}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA Final */}
        <section className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-purple-500/30">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
              ¿Listo para crear tu landing page?
            </h2>
            <p className="text-xl text-purple-200 mb-8">
              Comienza ahora y en 60 minutos tendrás tu sitio publicado
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-10 py-5 rounded-xl font-bold text-xl shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto">
              <Rocket size={28} />
              <span>Comenzar Ahora</span>
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

