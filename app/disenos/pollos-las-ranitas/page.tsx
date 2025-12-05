'use client'

import { useState, useEffect, useRef } from 'react'
import { Phone, ShoppingCart, Gift, Truck, Sparkles, Zap, Star, CheckCircle2, Hand } from 'lucide-react'

interface Producto {
  id: number
  nombre: string
  precio: string
  descripcion: string
  imagen: string
  destacado?: boolean
}

export default function PollosLasRanitasPage() {
  const [porcentajeRascado, setPorcentajeRascado] = useState(0)
  const [promocionRevelada, setPromocionRevelada] = useState(false)
  const [rascando, setRascando] = useState(false)
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null)
  const [pedidoRealizado, setPedidoRealizado] = useState(false)
  const scratchCanvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const productos: Producto[] = [
    {
      id: 1,
      nombre: 'Pollo Entero',
      precio: '$180',
      descripcion: 'Pollo entero asado, jugoso y delicioso. Perfecto para compartir en familia.',
      imagen: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&q=80',
      destacado: true,
    },
    {
      id: 2,
      nombre: 'Medio Pollo',
      precio: '$95',
      descripcion: 'Medio pollo asado con nuestra receta especial. Ideal para 2 personas.',
      imagen: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&q=80',
    },
    {
      id: 3,
      nombre: 'Cuarto de Pollo',
      precio: '$50',
      descripcion: 'Cuarto de pollo asado. Perfecto para una persona.',
      imagen: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&q=80',
    },
    {
      id: 4,
      nombre: 'Pollo Deshebrado',
      precio: '$120',
      descripcion: 'Pollo deshebrado listo para tacos, tostadas o lo que prefieras.',
      imagen: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&q=80',
    },
    {
      id: 5,
      nombre: 'Pollo con Papas',
      precio: '$200',
      descripcion: 'Pollo entero acompañado de papas fritas crujientes. ¡Delicioso!',
      imagen: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&q=80',
      destacado: true,
    },
  ]

  // Sistema de raspa y gana
  useEffect(() => {
    if (!scratchCanvasRef.current || !containerRef.current) return

    const canvas = scratchCanvasRef.current
    const container = containerRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = container.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Dibujar capa de rascar (gris con patrón)
    const drawScratchLayer = () => {
      ctx.fillStyle = '#6b7280'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Patrón de texto
      ctx.fillStyle = '#9ca3af'
      ctx.font = 'bold 24px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      for (let y = 0; y < canvas.height; y += 40) {
        for (let x = 0; x < canvas.width; x += 200) {
          ctx.fillText('🐸 RASPA AQUÍ 🐸', x + 100, y + 20)
        }
      }

      // Patrón de líneas
      ctx.strokeStyle = '#4b5563'
      ctx.lineWidth = 2
      for (let i = 0; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }
      for (let i = 0; i < canvas.height; i += 30) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }
    }

    drawScratchLayer()

    let isDrawing = false
    const pixelsRascados = new Set<string>()

    const getPixelKey = (x: number, y: number) => `${Math.floor(x)},${Math.floor(y)}`

    const rascar = (x: number, y: number) => {
      const rect = canvas.getBoundingClientRect()
      const canvasX = x - rect.left
      const canvasY = y - rect.top

      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(canvasX, canvasY, 30, 0, Math.PI * 2)
      ctx.fill()

      // Contar píxeles rascados
      for (let dx = -30; dx <= 30; dx++) {
        for (let dy = -30; dy <= 30; dy++) {
          if (dx * dx + dy * dy <= 30 * 30) {
            const px = Math.floor(canvasX + dx)
            const py = Math.floor(canvasY + dy)
            if (px >= 0 && px < canvas.width && py >= 0 && py < canvas.height) {
              pixelsRascados.add(getPixelKey(px, py))
            }
          }
        }
      }

      const totalPixels = canvas.width * canvas.height
      const porcentaje = (pixelsRascados.size / totalPixels) * 100
      setPorcentajeRascado(Math.min(100, porcentaje))

      if (porcentaje > 30 && !promocionRevelada) {
        setPromocionRevelada(true)
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      isDrawing = true
      setRascando(true)
      rascar(e.clientX, e.clientY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDrawing) {
        rascar(e.clientX, e.clientY)
      }
    }

    const handleMouseUp = () => {
      isDrawing = false
      setRascando(false)
    }

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      isDrawing = true
      setRascando(true)
      const touch = e.touches[0]
      rascar(touch.clientX, touch.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (isDrawing && e.touches[0]) {
        const touch = e.touches[0]
        rascar(touch.clientX, touch.clientY)
      }
    }

    const handleTouchEnd = () => {
      isDrawing = false
      setRascando(false)
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mouseleave', handleMouseUp)
    canvas.addEventListener('touchstart', handleTouchStart)
    canvas.addEventListener('touchmove', handleTouchMove)
    canvas.addEventListener('touchend', handleTouchEnd)

    const handleResize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      drawScratchLayer()
      pixelsRascados.clear()
      setPorcentajeRascado(0)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mouseleave', handleMouseUp)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('resize', handleResize)
    }
  }, [promocionRevelada])

  const contactarWhatsApp = (producto?: Producto) => {
    const mensaje = producto
      ? `Hola! Me interesa pedir: ${producto.nombre} - ${producto.precio}`
      : 'Hola! Me interesa hacer un pedido en Pollos Las Ranitas'
    const url = `https://wa.me/524433646336?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  const realizarPedido = () => {
    setPedidoRealizado(true)
    setTimeout(() => {
      contactarWhatsApp()
      setPedidoRealizado(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-green-800 relative overflow-hidden">

      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-green-300 rounded-full animate-pulse"
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
            <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <Sparkles size={20} className="text-green-300 animate-pulse" />
              <span className="text-green-100 font-medium">Pollos Las Ranitas</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white">
              <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-green-400 bg-clip-text text-transparent">
                Pollo
              </span>{' '}
              <span className="text-white">Fresco</span>{' '}
              <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                Delicioso
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl text-green-100 mb-8">
              ¡Raspa y descubre tu promoción especial!
            </p>
          </div>
        </section>

        {/* Promoción Destacada */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-yellow-500/30 to-amber-500/30 backdrop-blur-xl rounded-3xl p-8 border-2 border-yellow-400/50 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Gift size={48} className="text-yellow-300 animate-bounce" />
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                  🎉 Promoción Especial 🎉
                </h2>
                <p className="text-2xl sm:text-3xl text-white mb-2">
                  Al comprar tu pollo, recibe
                </p>
                <p className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-4">
                  1 Kilo de Tortillas GRATIS
                </p>
                <p className="text-xl text-white/90 mb-2">
                  ✨ Hechas a mano
                </p>
                <p className="text-xl text-white/90">
                  🚚 Servicio a domicilio SIN COSTO EXTRA
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sistema Raspa y Gana */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-green-400/30 text-center mb-6">
              <Hand size={48} className="mx-auto mb-4 text-yellow-300 animate-pulse" />
              <p className="text-xl text-white mb-2">
                🎁 ¡Raspa con tu mouse o dedo para revelar tu promoción!
              </p>
              <p className="text-lg text-green-200">
                {porcentajeRascado < 30
                  ? `Rascado: ${Math.round(porcentajeRascado)}% - ¡Sigue raspando!`
                  : '¡Promoción revelada!'}
              </p>
            </div>

            <div
              ref={containerRef}
              className="relative bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-2xl overflow-hidden border-2 border-yellow-400/50"
              style={{ minHeight: '300px' }}
            >
              {/* Contenido de la promoción (debajo de la capa de rascar) */}
              <div className="absolute inset-0 flex items-center justify-center p-8 z-0">
                <div className="text-center">
                  <Gift size={64} className="mx-auto mb-4 text-yellow-300 animate-bounce" />
                  <h3 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                    🎉 ¡FELICIDADES! 🎉
                  </h3>
                  <p className="text-2xl sm:text-3xl text-white mb-2">
                    Has ganado:
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-4">
                    1 Kilo de Tortillas GRATIS
                  </p>
                  <p className="text-xl text-white/90 mb-2">
                    ✨ Hechas a mano
                  </p>
                  <p className="text-xl text-white/90">
                    🚚 Con tu compra de pollo
                  </p>
                </div>
              </div>

              {/* Canvas de rascar */}
              <canvas
                ref={scratchCanvasRef}
                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-10"
                style={{ touchAction: 'none' }}
              />
            </div>
          </div>
        </section>

        {/* Productos */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center">
              Nuestros Productos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productos.map((producto) => (
                <div
                  key={producto.id}
                  className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-white/20 hover:border-green-300/50 transition-all cursor-pointer transform hover:scale-105 relative"
                  onClick={() => setProductoSeleccionado(producto)}
                >
                  {producto.destacado && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold z-10">
                      ⭐ Destacado
                    </div>
                  )}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{producto.nombre}</h3>
                    <p className="text-white/70 mb-4">{producto.descripcion}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-3xl font-bold text-green-300">{producto.precio}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          contactarWhatsApp(producto)
                        }}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2"
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
        </section>

        {/* Información de Contacto y Servicio */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/20">
                <Phone size={48} className="text-green-300 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Teléfono</h3>
                <a
                  href="tel:4433646336"
                  className="text-3xl font-bold text-green-300 hover:text-green-200 transition-colors"
                >
                  443 364 6336
                </a>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/20">
                <Truck size={48} className="text-green-300 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Servicio a Domicilio</h3>
                <p className="text-xl text-green-300 font-bold">SIN COSTO EXTRA</p>
                <p className="text-white/80 mt-2">Llevamos tu pedido hasta tu casa</p>
              </div>
            </div>

            {/* Botón de Pedido Principal */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-8 border-2 border-green-400/30 text-center">
              <ShoppingCart size={64} className="mx-auto mb-6 text-green-300" />
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                ¿Listo para tu Pedido?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Haz tu pedido ahora y recibe 1 kilo de tortillas gratis
              </p>
              <button
                onClick={realizarPedido}
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-10 py-5 rounded-xl font-bold text-xl shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105 active:scale-95"
              >
                {pedidoRealizado ? (
                  <>
                    <CheckCircle2 size={28} />
                    <span>Abriendo WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <Phone size={28} />
                    <span>Hacer Pedido por WhatsApp</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Modal de Producto */}
      {productoSeleccionado && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setProductoSeleccionado(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 z-10 transition-all"
              >
                <span className="text-gray-800 text-2xl">×</span>
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
                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-4">
                    <p className="text-lg font-semibold text-yellow-900 mb-1">
                      🎁 Incluye: 1 Kilo de Tortillas GRATIS
                    </p>
                    <p className="text-sm text-yellow-700">Hechas a mano</p>
                  </div>
                  <p className="text-4xl font-bold text-green-600 mb-6">
                    {productoSeleccionado.precio}
                  </p>
                  <button
                    onClick={() => {
                      contactarWhatsApp(productoSeleccionado)
                      setProductoSeleccionado(null)
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                  >
                    <Phone size={24} />
                    <span>Pedir por WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notificación de Promoción Revelada */}
      {promocionRevelada && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-2xl animate-pulse">
          <div className="flex items-center gap-3">
            <Gift size={32} />
            <span>¡Promoción revelada! 1 kilo de tortillas gratis con tu pollo</span>
          </div>
        </div>
      )}
    </main>
  )
}

