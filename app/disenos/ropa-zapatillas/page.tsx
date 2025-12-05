'use client'

import { useState, useEffect, useRef } from 'react'
import { Shirt, Briefcase, Activity, Crown, Sparkles, Phone, ShoppingBag, X, Zap, Footprints } from 'lucide-react'

interface Producto {
  id: number
  nombre: string
  categoria: 'ropa' | 'zapatilla'
  precio: string
  descripcion: string
  imagen: string
  estilo?: 'casual' | 'formal' | 'deportivo' | 'elegante'
  talla?: string[]
  color?: string[]
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

export default function RopaZapatillasPage() {
  const [despertando, setDespertando] = useState(true)
  const [estiloActual, setEstiloActual] = useState<'casual' | 'formal' | 'deportivo' | 'elegante'>('casual')
  const [zapatillaHover, setZapatillaHover] = useState<number | null>(null)
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null)
  const [particulas, setParticulas] = useState<Particula[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const estiloCanvasRef = useRef<HTMLCanvasElement>(null)
  const particulasCanvasRef = useRef<HTMLCanvasElement>(null)
  const zapatillaCanvasRef = useRef<HTMLCanvasElement>(null)

  const productos: Producto[] = [
    {
      id: 1,
      nombre: 'Camisa Casual Premium',
      categoria: 'ropa',
      precio: '$599',
      descripcion: 'Camisa de algodón 100% premium. Corte moderno y cómodo. Perfecta para el día a día con estilo relajado.',
      imagen: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
      estilo: 'casual',
      talla: ['S', 'M', 'L', 'XL'],
      color: ['Blanco', 'Azul', 'Negro', 'Gris'],
    },
    {
      id: 2,
      nombre: 'Traje Formal Clásico',
      categoria: 'ropa',
      precio: '$2,499',
      descripcion: 'Traje elegante de corte clásico. Tela de alta calidad, perfecto para ocasiones formales y profesionales.',
      imagen: 'https://images.unsplash.com/photo-1594938291221-94f18e0e43b1?w=600&q=80',
      estilo: 'formal',
      talla: ['S', 'M', 'L', 'XL'],
      color: ['Negro', 'Azul Marino', 'Gris'],
    },
    {
      id: 3,
      nombre: 'Conjunto Deportivo',
      categoria: 'ropa',
      precio: '$899',
      descripcion: 'Conjunto deportivo de alta tecnología. Material transpirable y cómodo. Ideal para entrenamiento y actividades físicas.',
      imagen: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80',
      estilo: 'deportivo',
      talla: ['S', 'M', 'L', 'XL'],
      color: ['Negro', 'Gris', 'Azul', 'Rojo'],
    },
    {
      id: 4,
      nombre: 'Vestido Elegante',
      categoria: 'ropa',
      precio: '$1,299',
      descripcion: 'Vestido elegante de diseño sofisticado. Perfecto para eventos especiales y ocasiones formales.',
      imagen: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
      estilo: 'elegante',
      talla: ['S', 'M', 'L', 'XL'],
      color: ['Negro', 'Rojo', 'Azul', 'Blanco'],
    },
    {
      id: 5,
      nombre: 'Zapatillas Running Pro',
      categoria: 'zapatilla',
      precio: '$1,499',
      descripcion: 'Zapatillas profesionales para running. Tecnología de amortiguación avanzada. Perfectas para corredores.',
      imagen: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
      talla: ['38', '39', '40', '41', '42', '43', '44'],
      color: ['Negro', 'Blanco', 'Azul', 'Rojo'],
    },
    {
      id: 6,
      nombre: 'Zapatillas Casual Urban',
      categoria: 'zapatilla',
      precio: '$899',
      descripcion: 'Zapatillas casuales con estilo urbano. Cómodas y versátiles. Perfectas para el día a día.',
      imagen: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
      talla: ['38', '39', '40', '41', '42', '43', '44'],
      color: ['Blanco', 'Negro', 'Gris', 'Beige'],
    },
    {
      id: 7,
      nombre: 'Zapatillas Deportivas Elite',
      categoria: 'zapatilla',
      precio: '$1,799',
      descripcion: 'Zapatillas deportivas de élite. Máximo rendimiento y comodidad. Tecnología de última generación.',
      imagen: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
      talla: ['38', '39', '40', '41', '42', '43', '44'],
      color: ['Negro', 'Blanco', 'Rojo', 'Azul'],
    },
    {
      id: 8,
      nombre: 'Zapatillas Elegantes Premium',
      categoria: 'zapatilla',
      precio: '$1,299',
      descripcion: 'Zapatillas elegantes de diseño premium. Perfectas para combinar con looks formales y casuales.',
      imagen: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
      talla: ['38', '39', '40', '41', '42', '43', '44'],
      color: ['Negro', 'Marrón', 'Beige', 'Blanco'],
    },
  ]

  // Efecto de despertar
  useEffect(() => {
    const timer = setTimeout(() => {
      setDespertando(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Efectos visuales según el estilo en canvas
  useEffect(() => {
    if (!estiloCanvasRef.current) return

    const canvas = estiloCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationFrame: number
    const particulas: Particula[] = []

    // Inicializar partículas según el estilo
    const coloresPorEstilo = {
      casual: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3'],
      formal: ['#2c3e50', '#34495e', '#7f8c8d', '#95a5a6'],
      deportivo: ['#e74c3c', '#3498db', '#f39c12', '#1abc9c'],
      elegante: ['#9b59b6', '#e91e63', '#ff9800', '#00bcd4'],
    }

    const colores = coloresPorEstilo[estiloActual]

    for (let i = 0; i < 100; i++) {
      particulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 4 + 2,
        color: colores[Math.floor(Math.random() * colores.length)],
        life: Math.random() * 100 + 50,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particulas.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.life--
        p.size *= 0.998

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
        gradient.addColorStop(0, p.color)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()

        if (p.life <= 0 || p.size < 0.5) {
          p.x = Math.random() * canvas.width
          p.y = Math.random() * canvas.height
          p.life = Math.random() * 100 + 50
          p.size = Math.random() * 4 + 2
          p.color = colores[Math.floor(Math.random() * colores.length)]
        }
      })

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
  }, [estiloActual])

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

  // Efectos de zapatilla al hacer hover
  useEffect(() => {
    if (!zapatillaCanvasRef.current || zapatillaHover === null) return

    const canvas = zapatillaCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particulasZapatilla: Particula[] = []
    const producto = productos.find((p) => p.id === zapatillaHover && p.categoria === 'zapatilla')

    if (!producto) return

    const colores = ['#ff6b9d', '#4ecdc4', '#ffe66d', '#95e1d3', '#ff9800', '#9b59b6']

    const crearParticula = () => {
      const x = mousePos.x + (Math.random() - 0.5) * 200
      const y = mousePos.y + (Math.random() - 0.5) * 200
      particulasZapatilla.push({
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

      for (let i = particulasZapatilla.length - 1; i >= 0; i--) {
        const p = particulasZapatilla[i]
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
          particulasZapatilla.splice(i, 1)
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      clearInterval(interval)
    }
  }, [zapatillaHover, mousePos, productos])

  const contactarWhatsApp = (producto?: Producto) => {
    const mensaje = producto
      ? `Hola! Me interesa el producto: ${producto.nombre} - ${producto.precio}`
      : 'Hola! Me interesa conocer más sobre ropa y zapatillas'
    const url = `https://wa.me/528126902979?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  const ropaFiltrada = productos.filter(
    (p) => p.categoria === 'ropa' && p.estilo === estiloActual
  )
  const zapatillas = productos.filter((p) => p.categoria === 'zapatilla')

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Canvas de efectos de estilo */}
      <canvas
        ref={estiloCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Canvas de partículas que siguen el mouse */}
      <canvas
        ref={particulasCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-1"
      />

      {/* Canvas de efectos de zapatilla */}
      <canvas
        ref={zapatillaCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-2"
      />

      {/* Efecto de despertar */}
      {despertando && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-bold text-white mb-4 animate-pulse">✨</div>
            <div className="text-2xl text-white/80">Despertando tu Estilo...</div>
          </div>
        </div>
      )}

      <div className={`relative z-10 transition-opacity duration-1000 ${despertando ? 'opacity-0' : 'opacity-100'}`}>
        {/* Header */}
        <section className="text-center py-12 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <Zap size={20} className="text-yellow-300 animate-pulse" />
              <span className="text-white/90 font-medium">Moda y Estilo</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white">
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Estilo
              </span>{' '}
              <span className="text-white">que</span>{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Define
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl text-white/80 mb-8">
              Ropa y Zapatillas que Expresan tu Personalidad
            </p>
          </div>
        </section>

        {/* Probador Virtual de Estilos */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-2 border-white/20">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center">
                Probador Virtual de Estilos
              </h2>
              <p className="text-xl text-white/80 mb-8 text-center">
                Selecciona tu estilo y descubre la ropa perfecta para cada ocasión
              </p>

              {/* Selector de estilos */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { tipo: 'casual' as const, icon: Shirt, label: 'Casual', color: 'from-pink-500 to-red-500' },
                  { tipo: 'formal' as const, icon: Briefcase, label: 'Formal', color: 'from-gray-600 to-gray-800' },
                  { tipo: 'deportivo' as const, icon: Activity, label: 'Deportivo', color: 'from-blue-500 to-cyan-500' },
                  { tipo: 'elegante' as const, icon: Crown, label: 'Elegante', color: 'from-purple-500 to-pink-500' },
                ].map((estilo) => (
                  <button
                    key={estilo.tipo}
                    onClick={() => setEstiloActual(estilo.tipo)}
                    className={`p-6 rounded-2xl transition-all transform hover:scale-110 ${
                      estiloActual === estilo.tipo
                        ? `bg-gradient-to-r ${estilo.color} scale-110 shadow-2xl`
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <estilo.icon
                      size={48}
                      className={`mb-2 ${estiloActual === estilo.tipo ? 'text-white' : 'text-white/60'}`}
                    />
                    <p
                      className={`font-bold ${
                        estiloActual === estilo.tipo ? 'text-white' : 'text-white/60'
                      }`}
                    >
                      {estilo.label}
                    </p>
                  </button>
                ))}
              </div>

              {/* Ropa filtrada por estilo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ropaFiltrada.map((prenda) => (
                  <div
                    key={prenda.id}
                    className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-white/20 hover:border-yellow-300/50 transition-all cursor-pointer transform hover:scale-105"
                    onClick={() => setProductoSeleccionado(prenda)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={prenda.imagen}
                        alt={prenda.nombre}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{prenda.nombre}</h3>
                      <p className="text-white/70 mb-4">{prenda.descripcion}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-3xl font-bold text-yellow-300">{prenda.precio}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            contactarWhatsApp(prenda)
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

        {/* Galería Interactiva de Zapatillas */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-2 border-white/20">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center">
                Galería Mágica de Zapatillas
              </h2>
              <p className="text-xl text-white/80 mb-8 text-center">
                Pasa el mouse sobre cada zapatilla para descubrir su energía
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {zapatillas.map((zapatilla) => (
                  <div
                    key={zapatilla.id}
                    onMouseEnter={() => setZapatillaHover(zapatilla.id)}
                    onMouseLeave={() => setZapatillaHover(null)}
                    className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-white/20 hover:border-pink-300/50 transition-all cursor-pointer transform hover:scale-105 relative"
                    onClick={() => setProductoSeleccionado(zapatilla)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={zapatilla.imagen}
                        alt={zapatilla.nombre}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {zapatillaHover === zapatilla.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Footprints size={64} className="text-pink-300 animate-pulse" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{zapatilla.nombre}</h3>
                      <p className="text-white/70 mb-4 text-sm">{zapatilla.descripcion}</p>
                      {zapatilla.color && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {zapatilla.color.map((color, idx) => (
                            <span
                              key={idx}
                              className="bg-pink-500/30 text-pink-200 px-2 py-1 rounded-full text-xs"
                            >
                              {color}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-pink-300">{zapatilla.precio}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            contactarWhatsApp(zapatilla)
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
                ¿Listo para Encontrar tu Estilo Perfecto?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Contáctame y te ayudo a encontrar la ropa y zapatillas perfectas para ti
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
                  {productoSeleccionado.talla && (
                    <div className="mb-4">
                      <p className="text-gray-700 font-semibold mb-2">Tallas disponibles:</p>
                      <div className="flex flex-wrap gap-2">
                        {productoSeleccionado.talla.map((talla, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {talla}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {productoSeleccionado.color && (
                    <div className="mb-4">
                      <p className="text-gray-700 font-semibold mb-2">Colores disponibles:</p>
                      <div className="flex flex-wrap gap-2">
                        {productoSeleccionado.color.map((color, idx) => (
                          <span
                            key={idx}
                            className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm"
                          >
                            {color}
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

