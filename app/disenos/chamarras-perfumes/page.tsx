'use client'

import { useState, useEffect, useRef } from 'react'
import { Cloud, CloudRain, Snowflake, Sun, Wind, Sparkles, Phone, ShoppingBag, X, Zap } from 'lucide-react'

interface Producto {
  id: number
  nombre: string
  categoria: 'chamarra' | 'perfume'
  precio: string
  descripcion: string
  imagen: string
  clima?: 'sol' | 'lluvia' | 'nieve' | 'viento'
  notas?: string[]
}

interface Particula {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
}

export default function ChamarrasPerfumesPage() {
  const [despertando, setDespertando] = useState(true)
  const [climaActual, setClimaActual] = useState<'sol' | 'lluvia' | 'nieve' | 'viento'>('sol')
  const [perfumeHover, setPerfumeHover] = useState<number | null>(null)
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null)
  const [particulas, setParticulas] = useState<Particula[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const climaCanvasRef = useRef<HTMLCanvasElement>(null)
  const particulasCanvasRef = useRef<HTMLCanvasElement>(null)
  const perfumeCanvasRef = useRef<HTMLCanvasElement>(null)

  const productos: Producto[] = [
    {
      id: 1,
      nombre: 'Chamarra Impermeable Clásica',
      categoria: 'chamarra',
      precio: '$1,299',
      descripcion: 'Chamarra impermeable perfecta para días lluviosos. Material resistente al agua, capucha ajustable y múltiples bolsillos.',
      imagen: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
      clima: 'lluvia',
    },
    {
      id: 2,
      nombre: 'Chamarra Abrigadora Invernal',
      categoria: 'chamarra',
      precio: '$1,599',
      descripcion: 'Chamarra abrigadora con forro polar. Perfecta para climas fríos y nevados. Diseño elegante y funcional.',
      imagen: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
      clima: 'nieve',
    },
    {
      id: 3,
      nombre: 'Chamarra Ligera de Viento',
      categoria: 'chamarra',
      precio: '$899',
      descripcion: 'Chamarra ligera y transpirable. Ideal para días ventosos. Diseño moderno y cómodo.',
      imagen: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
      clima: 'viento',
    },
    {
      id: 4,
      nombre: 'Chamarra Casual Verano',
      categoria: 'chamarra',
      precio: '$699',
      descripcion: 'Chamarra ligera para días soleados. Material fresco y cómodo. Perfecta para cualquier ocasión.',
      imagen: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
      clima: 'sol',
    },
    {
      id: 5,
      nombre: 'Perfume Élégance',
      categoria: 'perfume',
      precio: '$899',
      descripcion: 'Fragancia elegante y sofisticada. Notas de rosa, jazmín y vainilla. Duración de 8-10 horas.',
      imagen: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80',
      notas: ['Rosa', 'Jazmín', 'Vainilla'],
    },
    {
      id: 6,
      nombre: 'Perfume Fresh Breeze',
      categoria: 'perfume',
      precio: '$749',
      descripcion: 'Fragancia fresca y energizante. Notas cítricas y acuáticas. Perfecta para el día a día.',
      imagen: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80',
      notas: ['Limón', 'Menta', 'Agua Marina'],
    },
    {
      id: 7,
      nombre: 'Perfume Midnight',
      categoria: 'perfume',
      precio: '$999',
      descripcion: 'Fragancia intensa y seductora. Notas de sándalo, ámbar y pachulí. Ideal para la noche.',
      imagen: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80',
      notas: ['Sándalo', 'Ámbar', 'Pachulí'],
    },
    {
      id: 8,
      nombre: 'Perfume Floral Dream',
      categoria: 'perfume',
      precio: '$849',
      descripcion: 'Fragancia floral y romántica. Notas de peonía, lirio y almizcle. Duración prolongada.',
      imagen: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80',
      notas: ['Peonía', 'Lirio', 'Almizcle'],
    },
  ]

  // Efecto de despertar
  useEffect(() => {
    const timer = setTimeout(() => {
      setDespertando(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Efectos de clima en canvas
  useEffect(() => {
    if (!climaCanvasRef.current) return

    const canvas = climaCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationFrame: number
    const gotas: Array<{ x: number; y: number; velocidad: number; tamaño: number }> = []
    const copos: Array<{ x: number; y: number; velocidad: number; tamaño: number; rotacion: number }> = []
    const particulasViento: Array<{ x: number; y: number; velocidad: number; tamaño: number }> = []

    // Inicializar elementos según el clima
    if (climaActual === 'lluvia') {
      for (let i = 0; i < 200; i++) {
        gotas.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          velocidad: Math.random() * 5 + 5,
          tamaño: Math.random() * 3 + 2,
        })
      }
    } else if (climaActual === 'nieve') {
      for (let i = 0; i < 150; i++) {
        copos.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          velocidad: Math.random() * 2 + 1,
          tamaño: Math.random() * 4 + 2,
          rotacion: Math.random() * 360,
        })
      }
    } else if (climaActual === 'viento') {
      for (let i = 0; i < 100; i++) {
        particulasViento.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          velocidad: Math.random() * 8 + 3,
          tamaño: Math.random() * 2 + 1,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (climaActual === 'lluvia') {
        ctx.strokeStyle = 'rgba(173, 216, 230, 0.6)'
        ctx.lineWidth = 2
        gotas.forEach((gota) => {
          ctx.beginPath()
          ctx.moveTo(gota.x, gota.y)
          ctx.lineTo(gota.x, gota.y + gota.tamaño * 10)
          ctx.stroke()
          gota.y += gota.velocidad
          if (gota.y > canvas.height) {
            gota.y = 0
            gota.x = Math.random() * canvas.width
          }
        })
      } else if (climaActual === 'nieve') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        copos.forEach((copo) => {
          ctx.save()
          ctx.translate(copo.x, copo.y)
          ctx.rotate((copo.rotacion * Math.PI) / 180)
          ctx.beginPath()
          ctx.arc(0, 0, copo.tamaño, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
          copo.y += copo.velocidad
          copo.x += Math.sin(copo.y * 0.01) * 0.5
          copo.rotacion += 1
          if (copo.y > canvas.height) {
            copo.y = 0
            copo.x = Math.random() * canvas.width
          }
        })
      } else if (climaActual === 'viento') {
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.4)'
        ctx.lineWidth = 1
        particulasViento.forEach((particula) => {
          ctx.beginPath()
          ctx.moveTo(particula.x, particula.y)
          ctx.lineTo(particula.x - particula.velocidad * 2, particula.y)
          ctx.stroke()
          particula.x -= particula.velocidad
          if (particula.x < 0) {
            particula.x = canvas.width
            particula.y = Math.random() * canvas.height
          }
        })
      } else if (climaActual === 'sol') {
        // Efecto de sol brillante
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 300)
        gradient.addColorStop(0, 'rgba(255, 255, 0, 0.1)')
        gradient.addColorStop(1, 'rgba(255, 255, 0, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrame)
    }
  }, [climaActual])

  // Partículas que siguen el mouse
  useEffect(() => {
    if (!particulasCanvasRef.current) return

    const canvas = particulasCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particulasMouse: Particula[] = []

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      for (let i = 0; i < 3; i++) {
        particulasMouse.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 4 + 2,
          color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
          life: 30,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particulasMouse.length - 1; i >= 0; i--) {
        const p = particulasMouse[i]
        p.x += p.vx
        p.y += p.vy
        p.life--
        p.size *= 0.98

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        if (p.life <= 0 || p.size < 0.5) {
          particulasMouse.splice(i, 1)
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Efectos de perfume al hacer hover
  useEffect(() => {
    if (!perfumeCanvasRef.current || perfumeHover === null) return

    const canvas = perfumeCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particulasPerfume: Particula[] = []
    const producto = productos.find((p) => p.id === perfumeHover && p.categoria === 'perfume')

    if (!producto) return

    const colores = ['#ff6b9d', '#c44569', '#f8b500', '#6c5ce7', '#00d2d3']

    const crearParticula = () => {
      const x = mousePos.x + (Math.random() - 0.5) * 200
      const y = mousePos.y + (Math.random() - 0.5) * 200
      particulasPerfume.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5 - 0.5,
        size: Math.random() * 8 + 4,
        color: colores[Math.floor(Math.random() * colores.length)],
        life: 60,
      })
    }

    const interval = setInterval(crearParticula, 50)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particulasPerfume.length - 1; i >= 0; i--) {
        const p = particulasPerfume[i]
        p.x += p.vx
        p.y += p.vy
        p.life--
        p.size *= 0.98

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
        gradient.addColorStop(0, p.color)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()

        if (p.life <= 0 || p.size < 0.5) {
          particulasPerfume.splice(i, 1)
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      clearInterval(interval)
    }
  }, [perfumeHover, mousePos])

  const contactarWhatsApp = (producto?: Producto) => {
    const mensaje = producto
      ? `Hola! Me interesa el producto: ${producto.nombre} - ${producto.precio}`
      : 'Hola! Me interesa conocer más sobre chamarras y perfumes'
    const url = `https://wa.me/528126902979?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  const chamarrasFiltradas = productos.filter(
    (p) => p.categoria === 'chamarra' && p.clima === climaActual
  )
  const perfumes = productos.filter((p) => p.categoria === 'perfume')

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Canvas de efectos de clima */}
      <canvas
        ref={climaCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Canvas de partículas que siguen el mouse */}
      <canvas
        ref={particulasCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-1"
      />

      {/* Canvas de efectos de perfume */}
      <canvas
        ref={perfumeCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-2"
      />

      {/* Efecto de despertar */}
      {despertando && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-bold text-white mb-4 animate-pulse">✨</div>
            <div className="text-2xl text-white/80">Despertando...</div>
          </div>
        </div>
      )}

      <div className={`relative z-10 transition-opacity duration-1000 ${despertando ? 'opacity-0' : 'opacity-100'}`}>
        {/* Header */}
        <section className="text-center py-12 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <Zap size={20} className="text-yellow-300 animate-pulse" />
              <span className="text-white/90 font-medium">Experiencia Sensorial</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white">
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Estilo
              </span>{' '}
              <span className="text-white">que</span>{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Siente
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl text-white/80 mb-8">
              Chamarras y Perfumes que se Adaptan a Ti
            </p>
          </div>
        </section>

        {/* Probador Virtual de Clima */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-2 border-white/20">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center">
                Probador Virtual de Clima
              </h2>
              <p className="text-xl text-white/80 mb-8 text-center">
                Cambia el clima y descubre la chamarra perfecta para cada ocasión
              </p>

              {/* Selector de clima */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { tipo: 'sol' as const, icon: Sun, label: 'Soleado', color: 'from-yellow-500 to-orange-500' },
                  { tipo: 'lluvia' as const, icon: CloudRain, label: 'Lluvioso', color: 'from-blue-500 to-cyan-500' },
                  { tipo: 'nieve' as const, icon: Snowflake, label: 'Nevado', color: 'from-blue-300 to-white' },
                  { tipo: 'viento' as const, icon: Wind, label: 'Ventoso', color: 'from-gray-400 to-gray-600' },
                ].map((clima) => (
                  <button
                    key={clima.tipo}
                    onClick={() => setClimaActual(clima.tipo)}
                    className={`p-6 rounded-2xl transition-all transform hover:scale-110 ${
                      climaActual === clima.tipo
                        ? `bg-gradient-to-r ${clima.color} scale-110 shadow-2xl`
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <clima.icon
                      size={48}
                      className={`mb-2 ${climaActual === clima.tipo ? 'text-white' : 'text-white/60'}`}
                    />
                    <p
                      className={`font-bold ${
                        climaActual === clima.tipo ? 'text-white' : 'text-white/60'
                      }`}
                    >
                      {clima.label}
                    </p>
                  </button>
                ))}
              </div>

              {/* Chamarras filtradas por clima */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {chamarrasFiltradas.map((chamarra) => (
                  <div
                    key={chamarra.id}
                    className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-white/20 hover:border-yellow-300/50 transition-all cursor-pointer transform hover:scale-105"
                    onClick={() => setProductoSeleccionado(chamarra)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={chamarra.imagen}
                        alt={chamarra.nombre}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{chamarra.nombre}</h3>
                      <p className="text-white/70 mb-4">{chamarra.descripcion}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-3xl font-bold text-yellow-300">{chamarra.precio}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            contactarWhatsApp(chamarra)
                          }}
                          className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2"
                        >
                          <Phone size={20} />
                          Pedir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Perfumero Interactivo */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-2 border-white/20">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center">
                Perfumero Mágico
              </h2>
              <p className="text-xl text-white/80 mb-8 text-center">
                Pasa el mouse sobre cada perfume para descubrir su esencia
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {perfumes.map((perfume) => (
                  <div
                    key={perfume.id}
                    onMouseEnter={() => setPerfumeHover(perfume.id)}
                    onMouseLeave={() => setPerfumeHover(null)}
                    className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-white/20 hover:border-pink-300/50 transition-all cursor-pointer transform hover:scale-105 relative"
                    onClick={() => setProductoSeleccionado(perfume)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={perfume.imagen}
                        alt={perfume.nombre}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {perfumeHover === perfume.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles size={64} className="text-pink-300 animate-pulse" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{perfume.nombre}</h3>
                      <p className="text-white/70 mb-4 text-sm">{perfume.descripcion}</p>
                      {perfume.notas && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {perfume.notas.map((nota, idx) => (
                            <span
                              key={idx}
                              className="bg-pink-500/30 text-pink-200 px-2 py-1 rounded-full text-xs"
                            >
                              {nota}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-pink-300">{perfume.precio}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            contactarWhatsApp(perfume)
                          }}
                          className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
                        >
                          <Phone size={18} />
                          Pedir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-2 border-white/20 text-center">
              <ShoppingBag size={64} className="mx-auto mb-6 text-yellow-300" />
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                ¿Listo para Encontrar tu Estilo?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Contáctame y te ayudo a encontrar la chamarra y perfume perfectos para ti
              </p>
              <button
                onClick={() => contactarWhatsApp()}
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-10 py-5 rounded-xl font-bold text-xl shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105 active:scale-95"
              >
                <Phone size={28} />
                <span>Contactar por WhatsApp</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Modal de producto */}
      {productoSeleccionado && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setProductoSeleccionado(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 z-10 transition-all"
              >
                <X size={24} className="text-gray-800" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden">
                  <img
                    src={productoSeleccionado.imagen}
                    alt={productoSeleccionado.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {productoSeleccionado.nombre}
                  </h2>
                  <p className="text-gray-600 mb-4">{productoSeleccionado.descripcion}</p>
                  {productoSeleccionado.notas && (
                    <div className="mb-4">
                      <p className="text-gray-700 font-semibold mb-2">Notas:</p>
                      <div className="flex flex-wrap gap-2">
                        {productoSeleccionado.notas.map((nota, idx) => (
                          <span
                            key={idx}
                            className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm"
                          >
                            {nota}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <p className="text-4xl font-bold text-purple-600 mb-6">
                    {productoSeleccionado.precio}
                  </p>
                  <button
                    onClick={() => {
                      contactarWhatsApp(productoSeleccionado)
                      setProductoSeleccionado(null)
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                  >
                    <Phone size={24} />
                    <span>Contactar para Pedir</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

