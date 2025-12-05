'use client'

import { useState, useEffect, useRef } from 'react'
import { Sparkles, Star, ShoppingBag, Heart, Phone, Instagram, Sparkle, ChevronLeft, ChevronRight, X } from 'lucide-react'

interface Producto {
  id: number
  nombre: string
  categoria: string
  precio: string
  precioAnterior?: string
  descuento?: number
  imagen: string
  descripcion: string
  destacado?: boolean
}

interface PaginaCatalogo {
  id: number
  titulo: string
  productos: Producto[]
  colorFondo: string
}

export default function CatalogoTerramarPage() {
  const [paginaActual, setPaginaActual] = useState(0)
  const [volteando, setVolteando] = useState(false)
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null)
  const [particulas, setParticulas] = useState<Array<{ id: number; x: number; y: number; size: number; velocidad: number }>>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const productos: Producto[] = [
    {
      id: 1,
      nombre: 'Crema Facial Hidratante',
      categoria: 'Cuidado Facial',
      precio: '$299',
      precioAnterior: '$399',
      descuento: 25,
      imagen: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80',
      descripcion: 'Hidratación profunda para todo tipo de piel. Con ácido hialurónico y vitamina E.',
      destacado: true,
    },
    {
      id: 2,
      nombre: 'Máscara de Pestañas Volumizadora',
      categoria: 'Maquillaje',
      precio: '$189',
      imagen: 'https://images.unsplash.com/photo-1631210867855-9e103f3b4a70?w=400&q=80',
      descripcion: 'Pestañas más largas y voluminosas en un solo paso. Resistente al agua.',
    },
    {
      id: 3,
      nombre: 'Labial Mate Líquido',
      categoria: 'Maquillaje',
      precio: '$249',
      precioAnterior: '$299',
      descuento: 17,
      imagen: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80',
      descripcion: 'Color intenso y duradero. Disponible en 12 tonos vibrantes.',
      destacado: true,
    },
    {
      id: 4,
      nombre: 'Serum Anti-Edad',
      categoria: 'Cuidado Facial',
      precio: '$599',
      precioAnterior: '$799',
      descuento: 25,
      imagen: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
      descripcion: 'Reduce arrugas y líneas de expresión. Con retinol y péptidos.',
    },
    {
      id: 5,
      nombre: 'Paleta de Sombras',
      categoria: 'Maquillaje',
      precio: '$349',
      imagen: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80',
      descripcion: '12 sombras altamente pigmentadas. Perfecta para looks día y noche.',
    },
    {
      id: 6,
      nombre: 'Exfoliante Corporal',
      categoria: 'Cuidado Corporal',
      precio: '$229',
      imagen: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80',
      descripcion: 'Piel suave y radiante. Con azúcar y aceites naturales.',
    },
    {
      id: 7,
      nombre: 'Perfume Floral',
      categoria: 'Fragancias',
      precio: '$449',
      precioAnterior: '$549',
      descuento: 18,
      imagen: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80',
      descripcion: 'Fragancia elegante y duradera. Notas de rosa, jazmín y vainilla.',
      destacado: true,
    },
    {
      id: 8,
      nombre: 'Base de Maquillaje',
      categoria: 'Maquillaje',
      precio: '$279',
      imagen: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
      descripcion: 'Cobertura media a completa. Fórmula ligera y de larga duración.',
    },
    {
      id: 9,
      nombre: 'Mascarilla Facial Purificante',
      categoria: 'Cuidado Facial',
      precio: '$199',
      imagen: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&q=80',
      descripcion: 'Limpia y purifica los poros. Con arcilla y carbón activado.',
    },
    {
      id: 10,
      nombre: 'Brillo Labial',
      categoria: 'Maquillaje',
      precio: '$159',
      imagen: 'https://images.unsplash.com/photo-1631210867855-9e103f3b4a70?w=400&q=80',
      descripcion: 'Brillo intenso y efecto espejo. Hidratante y de larga duración.',
    },
    {
      id: 11,
      nombre: 'Crema Corporal Nutritiva',
      categoria: 'Cuidado Corporal',
      precio: '$249',
      imagen: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80',
      descripcion: 'Nutrición profunda para todo el cuerpo. Con manteca de karité.',
    },
    {
      id: 12,
      nombre: 'Kit de Regalo Premium',
      categoria: 'Sets',
      precio: '$899',
      precioAnterior: '$1299',
      descuento: 31,
      imagen: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80',
      descripcion: 'Set completo con 8 productos esenciales. Perfecto para regalar.',
      destacado: true,
    },
  ]

  // Organizar productos en páginas del catálogo
  const paginasCatalogo: PaginaCatalogo[] = [
    {
      id: 1,
      titulo: 'Productos Destacados',
      productos: productos.filter((p) => p.destacado),
      colorFondo: 'from-pink-500 to-rose-600',
    },
    {
      id: 2,
      titulo: 'Maquillaje',
      productos: productos.filter((p) => p.categoria === 'Maquillaje'),
      colorFondo: 'from-purple-500 to-pink-600',
    },
    {
      id: 3,
      titulo: 'Cuidado Facial',
      productos: productos.filter((p) => p.categoria === 'Cuidado Facial'),
      colorFondo: 'from-blue-500 to-cyan-600',
    },
    {
      id: 4,
      titulo: 'Cuidado Corporal y Más',
      productos: productos.filter((p) => p.categoria === 'Cuidado Corporal' || p.categoria === 'Fragancias' || p.categoria === 'Sets'),
      colorFondo: 'from-amber-500 to-orange-600',
    },
  ]

  // Crear partículas brillantes
  useEffect(() => {
    const nuevasParticulas: Array<{ id: number; x: number; y: number; size: number; velocidad: number }> = []
    for (let i = 0; i < 30; i++) {
      nuevasParticulas.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
        velocidad: Math.random() * 2 + 0.5,
      })
    }
    setParticulas(nuevasParticulas)
  }, [])

  // Animar partículas en canvas
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particulas.forEach((particula) => {
        particula.y += particula.velocidad
        particula.x += Math.sin(particula.y * 0.01) * 0.3

        if (particula.y > canvas.height) {
          particula.y = 0
          particula.x = Math.random() * canvas.width
        }

        ctx.beginPath()
        ctx.arc(particula.x, particula.y, particula.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`
        ctx.fill()
        ctx.shadowBlur = 10
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [particulas])

  const siguientePagina = () => {
    if (volteando || paginaActual >= paginasCatalogo.length - 1) return
    setVolteando(true)
    setTimeout(() => {
      setPaginaActual(paginaActual + 1)
      setVolteando(false)
    }, 300)
  }

  const anteriorPagina = () => {
    if (volteando || paginaActual <= 0) return
    setVolteando(true)
    setTimeout(() => {
      setPaginaActual(paginaActual - 1)
      setVolteando(false)
    }, 300)
  }

  const pagina = paginasCatalogo[paginaActual]

  const contactarWhatsApp = (producto?: Producto) => {
    const mensaje = producto
      ? `Hola! Me interesa el producto: ${producto.nombre} - ${producto.precio}`
      : 'Hola! Me interesa conocer más sobre los productos Terramar'
    const url = `https://wa.me/528126902979?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Canvas de partículas brillantes */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30"
      />

      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Header */}
        <section className="text-center py-8 sm:py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <Sparkle size={20} className="text-yellow-300 animate-pulse" />
              <span className="text-white/90 font-medium">Catálogo Terramar</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
              <span className="bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
                Belleza
              </span>{' '}
              <span className="text-white">que Transforma</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/80 mb-8">
              Descubre los mejores productos de belleza y cuidado personal
            </p>
            <div className="flex items-center justify-center gap-4 text-white/70">
              <div className="flex items-center gap-2">
                <Star size={20} className="text-yellow-300 fill-yellow-300" />
                <span>Productos Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={20} className="text-pink-300 fill-pink-300" />
                <span>100% Originales</span>
              </div>
            </div>
          </div>
        </section>

        {/* Catálogo tipo revista */}
        <section className="py-8 sm:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Página del catálogo */}
              <div
                className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
                  volteando ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                }`}
                style={{
                  transform: volteando ? 'rotateY(90deg)' : 'rotateY(0deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Encabezado de página */}
                <div className={`bg-gradient-to-r ${pagina.colorFondo} p-6 sm:p-8 text-white`}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl sm:text-4xl font-bold">{pagina.titulo}</h2>
                    <div className="text-right">
                      <p className="text-sm opacity-80">Página</p>
                      <p className="text-2xl font-bold">
                        {paginaActual + 1} / {paginasCatalogo.length}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Grid de productos */}
                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pagina.productos.map((producto) => (
                      <div
                        key={producto.id}
                        className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                        onClick={() => setProductoSeleccionado(producto)}
                      >
                        {/* Imagen del producto */}
                        <div className="relative h-48 sm:h-56 overflow-hidden">
                          {producto.descuento && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                              -{producto.descuento}%
                            </div>
                          )}
                          {producto.destacado && (
                            <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold z-10 flex items-center gap-1">
                              <Star size={12} className="fill-yellow-900" />
                              Destacado
                            </div>
                          )}
                          <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        {/* Información del producto */}
                        <div className="p-4">
                          <p className="text-xs text-gray-500 mb-1">{producto.categoria}</p>
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                            {producto.nombre}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {producto.descripcion}
                          </p>
                          <div className="flex items-center justify-between">
                            <div>
                              {producto.precioAnterior && (
                                <p className="text-xs text-gray-400 line-through">
                                  {producto.precioAnterior}
                                </p>
                              )}
                              <p className="text-xl font-bold text-pink-600">{producto.precio}</p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                contactarWhatsApp(producto)
                              }}
                              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                            >
                              <ShoppingBag size={18} />
                              <span className="hidden sm:inline">Comprar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botones de navegación */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={anteriorPagina}
                  disabled={paginaActual === 0 || volteando}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ChevronLeft size={24} />
                  <span className="hidden sm:inline">Anterior</span>
                </button>

                <div className="flex gap-2">
                  {paginasCatalogo.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (!volteando) {
                          setVolteando(true)
                          setTimeout(() => {
                            setPaginaActual(index)
                            setVolteando(false)
                          }, 300)
                        }
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === paginaActual
                          ? 'bg-white w-8'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Ir a página ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={siguientePagina}
                  disabled={paginaActual === paginasCatalogo.length - 1 || volteando}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <span className="hidden sm:inline">Siguiente</span>
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Información de contacto */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-2 border-white/20">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
                ¿Tienes dudas o quieres un pedido personalizado?
              </h2>
              <p className="text-xl text-white/80 mb-8 text-center">
                Contáctame directamente y te ayudo a encontrar los productos perfectos para ti
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/528126902979"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105 active:scale-95"
                >
                  <Phone size={24} />
                  <span>Contactar por WhatsApp</span>
                </a>
                <a
                  href="https://instagram.com/terramar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-pink-500/50 transition-all transform hover:scale-105 active:scale-95"
                >
                  <Instagram size={24} />
                  <span>Seguir en Instagram</span>
                </a>
              </div>
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
                  {productoSeleccionado.descuento && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold z-10">
                      -{productoSeleccionado.descuento}%
                    </div>
                  )}
                  <img
                    src={productoSeleccionado.imagen}
                    alt={productoSeleccionado.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">{productoSeleccionado.categoria}</p>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {productoSeleccionado.nombre}
                  </h2>
                  <p className="text-gray-600 mb-6">{productoSeleccionado.descripcion}</p>
                  <div className="mb-6">
                    {productoSeleccionado.precioAnterior && (
                      <p className="text-lg text-gray-400 line-through mb-1">
                        {productoSeleccionado.precioAnterior}
                      </p>
                    )}
                    <p className="text-4xl font-bold text-pink-600 mb-6">
                      {productoSeleccionado.precio}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      contactarWhatsApp(productoSeleccionado)
                      setProductoSeleccionado(null)
                    }}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-pink-500/50 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                  >
                    <ShoppingBag size={24} />
                    <span>Comprar Ahora</span>
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

