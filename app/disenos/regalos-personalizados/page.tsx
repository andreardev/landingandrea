'use client'

import { useState, useEffect, useRef } from 'react'
import { Puzzle, Image, Camera, Gift, Heart, Phone, Sparkles, ChevronLeft, ChevronRight, X } from 'lucide-react'

interface Producto {
  id: number
  nombre: string
  categoria: 'rompecabezas' | 'cuadros' | 'polaroids' | 'otros'
  precio: string
  descripcion: string
  imagen: string
  tamaño?: string
}

interface PiezaRompecabezas {
  id: number
  x: number
  y: number
  rotacion: number
  colocada: boolean
  imagen: string
}

export default function RegalosPersonalizadosPage() {
  const [piezasColocadas, setPiezasColocadas] = useState(0)
  const [rompecabezasCompleto, setRompecabezasCompleto] = useState(false)
  const [polaroidActual, setPolaroidActual] = useState(0)
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null)
  const [piezas, setPiezas] = useState<PiezaRompecabezas[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particulas, setParticulas] = useState<Array<{ id: number; x: number; y: number; size: number; velocidad: number }>>([])

  const productos: Producto[] = [
    {
      id: 1,
      nombre: 'Rompecabezas Personalizado 500 Piezas',
      categoria: 'rompecabezas',
      precio: '$299',
      descripcion: 'Rompecabezas personalizado con tu foto favorita. Tamaño 40x30cm. Incluye caja de almacenamiento.',
      imagen: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&q=80',
      tamaño: '40x30cm',
    },
    {
      id: 2,
      nombre: 'Rompecabezas Personalizado 1000 Piezas',
      categoria: 'rompecabezas',
      precio: '$449',
      descripcion: 'Rompecabezas personalizado de alta calidad con tu imagen. Tamaño 50x40cm. Perfecto para regalar.',
      imagen: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&q=80',
      tamaño: '50x40cm',
    },
    {
      id: 3,
      nombre: 'Cuadro Canvas Personalizado',
      categoria: 'cuadros',
      precio: '$399',
      descripcion: 'Cuadro en canvas de alta calidad con tu foto. Disponible en varios tamaños. Perfecto para decorar.',
      imagen: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
      tamaño: '30x40cm, 40x50cm, 50x70cm',
    },
    {
      id: 4,
      nombre: 'Cuadro con Marco de Madera',
      categoria: 'cuadros',
      precio: '$549',
      descripcion: 'Cuadro personalizado con marco de madera elegante. Impresión de alta calidad. Listo para colgar.',
      imagen: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
      tamaño: '40x50cm, 50x70cm',
    },
    {
      id: 5,
      nombre: 'Pack de Fotos Polaroid',
      categoria: 'polaroids',
      precio: '$199',
      descripcion: 'Pack de 20 fotos estilo Polaroid personalizadas. Tamaño 10.8x8.8cm. Incluye caja de almacenamiento.',
      imagen: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80',
      tamaño: '10.8x8.8cm',
    },
    {
      id: 6,
      nombre: 'Álbum de Fotos Polaroid',
      categoria: 'polaroids',
      precio: '$349',
      descripcion: 'Álbum personalizado con 30 fotos Polaroid. Diseño vintage. Perfecto para recuerdos especiales.',
      imagen: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80',
      tamaño: '30 fotos',
    },
    {
      id: 7,
      nombre: 'Set de Regalo Personalizado',
      categoria: 'otros',
      precio: '$799',
      descripcion: 'Set completo: Rompecabezas + Cuadro + Fotos Polaroid. El regalo perfecto para ocasiones especiales.',
      imagen: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&q=80',
      tamaño: 'Set completo',
    },
  ]

  const polaroids = [
    { id: 1, imagen: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&q=80', texto: 'Momentos Especiales' },
    { id: 2, imagen: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80', texto: 'Recuerdos Únicos' },
    { id: 3, imagen: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&q=80', texto: 'Aventuras' },
    { id: 4, imagen: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&q=80', texto: 'Felicidad' },
    { id: 5, imagen: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&q=80', texto: 'Amor' },
  ]

  // Inicializar piezas del rompecabezas
  useEffect(() => {
    const nuevasPiezas: PiezaRompecabezas[] = []
    const filas = 4
    const columnas = 4
    const totalPiezas = filas * columnas

    for (let i = 0; i < totalPiezas; i++) {
      nuevasPiezas.push({
        id: i,
        x: Math.random() * (window.innerWidth - 100) + 50,
        y: Math.random() * 200 + 100,
        rotacion: Math.random() * 360,
        colocada: false,
        imagen: `https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&q=80`,
      })
    }
    setPiezas(nuevasPiezas)
  }, [])

  // Crear partículas
  useEffect(() => {
    const nuevasParticulas: Array<{ id: number; x: number; y: number; size: number; velocidad: number }> = []
    for (let i = 0; i < 40; i++) {
      nuevasParticulas.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        velocidad: Math.random() * 1 + 0.3,
      })
    }
    setParticulas(nuevasParticulas)
  }, [])

  // Animar partículas
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
        particula.x += Math.sin(particula.y * 0.01) * 0.5

        if (particula.y > canvas.height) {
          particula.y = 0
          particula.x = Math.random() * canvas.width
        }

        ctx.beginPath()
        ctx.arc(particula.x, particula.y, particula.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`
        ctx.fill()
        ctx.shadowBlur = 8
        ctx.shadowColor = 'rgba(255, 255, 255, 0.6)'
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

  const colocarPieza = (id: number) => {
    if (piezas.find((p) => p.id === id)?.colocada) return

    setPiezas((prev) =>
      prev.map((pieza) => (pieza.id === id ? { ...pieza, colocada: true } : pieza))
    )
    setPiezasColocadas((prev) => {
      const nuevas = prev + 1
      if (nuevas === piezas.length) {
        setRompecabezasCompleto(true)
      }
      return nuevas
    })
  }

  const reiniciarRompecabezas = () => {
    setPiezasColocadas(0)
    setRompecabezasCompleto(false)
    setPiezas((prev) =>
      prev.map((pieza) => ({
        ...pieza,
        colocada: false,
        x: Math.random() * (window.innerWidth - 100) + 50,
        y: Math.random() * 200 + 100,
        rotacion: Math.random() * 360,
      }))
    )
  }

  const siguientePolaroid = () => {
    setPolaroidActual((prev) => (prev + 1) % polaroids.length)
  }

  const anteriorPolaroid = () => {
    setPolaroidActual((prev) => (prev - 1 + polaroids.length) % polaroids.length)
  }

  const contactarWhatsApp = (producto?: Producto) => {
    const mensaje = producto
      ? `Hola! Me interesa el producto: ${producto.nombre} - ${producto.precio}`
      : 'Hola! Me interesa conocer más sobre los regalos personalizados'
    const url = `https://wa.me/528126902979?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  const productosPorCategoria = (categoria: string) => {
    return productos.filter((p) => p.categoria === categoria)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 relative overflow-hidden">
      {/* Canvas de partículas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20"
      />

      <div className="relative z-10">
        {/* Header */}
        <section className="text-center py-8 sm:py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <Gift size={20} className="text-yellow-300 animate-pulse" />
              <span className="text-white/90 font-medium">Regalos Personalizados</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
              <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                Momentos
              </span>{' '}
              <span className="text-white">Hechos</span>{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Eternos
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/80 mb-8">
              Rompecabezas, cuadros y fotos Polaroid personalizados con tus mejores recuerdos
            </p>
          </div>
        </section>

        {/* Rompecabezas Interactivo */}
        <section className="py-8 sm:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-12 border-2 border-white/20">
              <div className="text-center mb-8">
                <Puzzle size={48} className="mx-auto mb-4 text-yellow-300" />
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Arma tu Rompecabezas Personalizado
                </h2>
                <p className="text-white/80 text-lg mb-6">
                  Haz clic en las piezas para colocarlas en su lugar
                </p>
                <div className="text-2xl font-bold text-yellow-300 mb-4">
                  {piezasColocadas} / {piezas.length} piezas colocadas
                </div>
                {rompecabezasCompleto && (
                  <div className="bg-gradient-to-r from-yellow-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-xl mb-4 inline-block animate-pulse">
                    ¡Rompecabezas Completo! 🎉
                  </div>
                )}
                {rompecabezasCompleto && (
                  <button
                    onClick={reiniciarRompecabezas}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-3 rounded-xl font-semibold transition-all"
                  >
                    Reiniciar
                  </button>
                )}
              </div>

              {/* Área del rompecabezas */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 min-h-[400px] sm:min-h-[500px]">
                {/* Imagen de fondo (rompecabezas completo) */}
                <div className="absolute inset-8 opacity-20">
                  <img
                    src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&q=80"
                    alt="Rompecabezas completo"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                {/* Piezas del rompecabezas */}
                <div className="relative z-10">
                  {piezas.map((pieza) => (
                    <button
                      key={pieza.id}
                      onClick={() => colocarPieza(pieza.id)}
                      disabled={pieza.colocada}
                      className={`absolute transition-all duration-500 ${
                        pieza.colocada
                          ? 'opacity-0 pointer-events-none'
                          : 'opacity-100 hover:scale-110 cursor-pointer'
                      }`}
                      style={{
                        left: `${pieza.x}px`,
                        top: `${pieza.y}px`,
                        transform: `rotate(${pieza.rotacion}deg)`,
                      }}
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-lg shadow-lg border-2 border-white/50 flex items-center justify-center">
                        <Puzzle size={24} className="text-white" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Galería Polaroid */}
        <section className="py-8 sm:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-12 border-2 border-white/20">
              <div className="text-center mb-8">
                <Camera size={48} className="mx-auto mb-4 text-pink-300" />
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Galería Polaroid
                </h2>
                <p className="text-white/80 text-lg">
                  Hojee nuestras fotos estilo Polaroid personalizadas
                </p>
              </div>

              <div className="relative">
                <div className="flex items-center justify-center min-h-[400px] sm:min-h-[500px]">
                  {polaroids.map((polaroid, index) => (
                    <div
                      key={polaroid.id}
                      className={`absolute transition-all duration-500 ${
                        index === polaroidActual
                          ? 'opacity-100 scale-100 z-10'
                          : index === (polaroidActual + 1) % polaroids.length ||
                            index === (polaroidActual - 1 + polaroids.length) % polaroids.length
                          ? 'opacity-50 scale-90 z-5'
                          : 'opacity-0 scale-75 z-0'
                      }`}
                      style={{
                        transform: `translateX(${(index - polaroidActual) * 50}px) rotate(${
                          (index - polaroidActual) * 5
                        }deg)`,
                      }}
                    >
                      <div className="bg-white p-4 rounded-lg shadow-2xl w-64 sm:w-80">
                        <div className="aspect-[4/3] bg-gray-200 rounded mb-4 overflow-hidden">
                          <img
                            src={polaroid.imagen}
                            alt={polaroid.texto}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-center text-gray-800 font-semibold">{polaroid.texto}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={anteriorPolaroid}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-3 rounded-full transition-all z-20"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={siguientePolaroid}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-3 rounded-full transition-all z-20"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Productos por Categoría */}
        <section className="py-8 sm:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Rompecabezas */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Puzzle size={32} className="text-yellow-300" />
                Rompecabezas Personalizados
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productosPorCategoria('rompecabezas').map((producto) => (
                  <div
                    key={producto.id}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border-2 border-white/20 hover:border-yellow-300/50 transition-all cursor-pointer"
                    onClick={() => setProductoSeleccionado(producto)}
                  >
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-xl font-bold text-white mb-2">{producto.nombre}</h4>
                      <p className="text-white/70 mb-4">{producto.descripcion}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-yellow-300">{producto.precio}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            contactarWhatsApp(producto)
                          }}
                          className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                        >
                          <Phone size={18} className="inline mr-2" />
                          Pedir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cuadros */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Image size={32} className="text-pink-300" />
                Cuadros Personalizados
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productosPorCategoria('cuadros').map((producto) => (
                  <div
                    key={producto.id}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border-2 border-white/20 hover:border-pink-300/50 transition-all cursor-pointer"
                    onClick={() => setProductoSeleccionado(producto)}
                  >
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-xl font-bold text-white mb-2">{producto.nombre}</h4>
                      <p className="text-white/70 mb-4">{producto.descripcion}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-pink-300">{producto.precio}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            contactarWhatsApp(producto)
                          }}
                          className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                        >
                          <Phone size={18} className="inline mr-2" />
                          Pedir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Polaroids */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Camera size={32} className="text-purple-300" />
                Fotos Polaroid
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productosPorCategoria('polaroids').map((producto) => (
                  <div
                    key={producto.id}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border-2 border-white/20 hover:border-purple-300/50 transition-all cursor-pointer"
                    onClick={() => setProductoSeleccionado(producto)}
                  >
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-xl font-bold text-white mb-2">{producto.nombre}</h4>
                      <p className="text-white/70 mb-4">{producto.descripcion}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-purple-300">{producto.precio}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            contactarWhatsApp(producto)
                          }}
                          className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                        >
                          <Phone size={18} className="inline mr-2" />
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
              <Heart size={48} className="mx-auto mb-4 text-pink-300" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                ¿Listo para crear tu regalo personalizado?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Contáctame y te ayudo a crear el regalo perfecto con tus mejores recuerdos
              </p>
              <button
                onClick={() => contactarWhatsApp()}
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105 active:scale-95"
              >
                <Phone size={24} />
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
                  {productoSeleccionado.tamaño && (
                    <p className="text-gray-500 mb-4">
                      <strong>Tamaño:</strong> {productoSeleccionado.tamaño}
                    </p>
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

