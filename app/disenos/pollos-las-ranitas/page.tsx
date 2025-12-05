'use client'

import { useState, useEffect, useRef } from 'react'
import { Phone, ShoppingCart, Gift, Truck, Sparkles, Zap, Star, CheckCircle2 } from 'lucide-react'

interface Ranita {
  id: number
  x: number
  y: number
  velocidadX: number
  velocidadY: number
  saltando: boolean
  vida: number
  revelada: boolean
}

interface Producto {
  id: number
  nombre: string
  precio: string
  descripcion: string
  imagen: string
  destacado?: boolean
}

export default function PollosLasRanitasPage() {
  const [ranitas, setRanitas] = useState<Ranita[]>([])
  const [ranitasPosiciones, setRanitasPosiciones] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [ranitaSeleccionada, setRanitaSeleccionada] = useState<number | null>(null)
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null)
  const [pedidoRealizado, setPedidoRealizado] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

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

  // Crear ranitas saltando
  useEffect(() => {
    const nuevasRanitas: Ranita[] = []
    for (let i = 0; i < 6; i++) {
      nuevasRanitas.push({
        id: i,
        x: Math.random() * (window.innerWidth || 800) * 0.8 + (window.innerWidth || 800) * 0.1,
        y: (window.innerHeight || 600) - 100,
        velocidadX: (Math.random() - 0.5) * 1.5,
        velocidadY: -Math.random() * 4 - 3,
        saltando: true,
        vida: 400,
        revelada: false,
      })
    }
    setRanitas(nuevasRanitas)
  }, [])

  // Animar ranitas en canvas
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      setRanitas((prevRanitas) => {
        const nuevasRanitas: Ranita[] = []
        prevRanitas.forEach((ranita) => {
          // Física de salto
          if (ranita.saltando) {
            ranita.y += ranita.velocidadY
            ranita.x += ranita.velocidadX
            ranita.velocidadY += 0.15 // Gravedad
            ranita.vida--

            // Rebote en el suelo
            if (ranita.y > canvas.height - 100) {
              ranita.y = canvas.height - 100
              ranita.velocidadY = -Math.random() * 4 - 3
              ranita.velocidadX = (Math.random() - 0.5) * 1.5
            }

            // Rebote en las paredes
            if (ranita.x < 0 || ranita.x > canvas.width) {
              ranita.velocidadX *= -1
            }

            if (ranita.vida > 0) {
              nuevasRanitas.push(ranita)

              // Dibujar ranita más grande y visible
              ctx.save()
              ctx.translate(ranita.x, ranita.y)
              // Sombra
              ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
              ctx.beginPath()
              ctx.ellipse(0, 25, 20, 8, 0, 0, Math.PI * 2)
              ctx.fill()
              // Cuerpo principal
              ctx.fillStyle = '#22c55e'
              ctx.beginPath()
              ctx.arc(0, 0, 30, 0, Math.PI * 2)
              ctx.fill()
              // Borde brillante
              ctx.strokeStyle = '#4ade80'
              ctx.lineWidth = 3
              ctx.stroke()
              // Ojos grandes
              ctx.fillStyle = '#fff'
              ctx.beginPath()
              ctx.arc(-10, -8, 8, 0, Math.PI * 2)
              ctx.arc(10, -8, 8, 0, Math.PI * 2)
              ctx.fill()
              ctx.fillStyle = '#000'
              ctx.beginPath()
              ctx.arc(-10, -8, 5, 0, Math.PI * 2)
              ctx.arc(10, -8, 5, 0, Math.PI * 2)
              ctx.fill()
              // Brillo en los ojos
              ctx.fillStyle = '#fff'
              ctx.beginPath()
              ctx.arc(-8, -10, 2, 0, Math.PI * 2)
              ctx.arc(12, -10, 2, 0, Math.PI * 2)
              ctx.fill()
              // Boca
              ctx.strokeStyle = '#000'
              ctx.lineWidth = 2
              ctx.beginPath()
              ctx.arc(0, 5, 8, 0, Math.PI)
              ctx.stroke()
              ctx.restore()
            } else {
              // Reiniciar ranita
              nuevasRanitas.push({
                ...ranita,
                x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
                y: canvas.height - 100,
                velocidadY: -Math.random() * 4 - 3,
                velocidadX: (Math.random() - 0.5) * 1.5,
                saltando: true,
                vida: 400,
                revelada: false,
              })
            }
          } else {
            // Ranita esperando - hacer que salte automáticamente
            nuevasRanitas.push({
              ...ranita,
              saltando: true,
              velocidadY: -Math.random() * 4 - 3,
            })
          }
        })
        // Actualizar posiciones para los botones clickeables
        setRanitasPosiciones(
          nuevasRanitas.map((r) => ({
            id: r.id,
            x: r.x,
            y: r.y,
          }))
        )

        return nuevasRanitas
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

  const hacerSaltarRanita = (id: number) => {
    setRanitas((prev) =>
      prev.map((r) => (r.id === id ? { ...r, saltando: true, revelada: true } : r))
    )
    setRanitaSeleccionada(id)
    setTimeout(() => setRanitaSeleccionada(null), 2000)
  }

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
      {/* Canvas para ranitas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Elementos clickeables de ranitas */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto z-5">
        {ranitasPosiciones.map((pos) => {
          const ranita = ranitas.find((r) => r.id === pos.id)
          if (!ranita) return null
          return (
            <button
              key={pos.id}
              onClick={() => hacerSaltarRanita(pos.id)}
              className="absolute transition-all duration-100 hover:scale-110 active:scale-95 cursor-pointer group"
              style={{
                left: `${pos.x - 50}px`,
                top: `${pos.y - 50}px`,
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.2)',
                border: '3px solid rgba(74, 222, 128, 0.5)',
                boxShadow: '0 0 20px rgba(74, 222, 128, 0.5)',
              }}
              aria-label="Haz clic en la ranita"
            >
              <span className="absolute inset-0 flex items-center justify-center text-4xl opacity-0 group-hover:opacity-100 transition-opacity">
                🐸
              </span>
            </button>
          )
        })}
      </div>

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
              Haz clic en las ranitas para descubrir nuestras promociones
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

        {/* Instrucción Interactiva */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-green-400/30">
              <Zap size={48} className="mx-auto mb-4 text-yellow-300" />
              <p className="text-xl text-white mb-4">
                ¡Haz clic en las ranitas que saltan para descubrir información especial!
              </p>
              <p className="text-lg text-green-200">
                Cada ranita tiene algo que contarte sobre nuestros deliciosos pollos
              </p>
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

      {/* Notificación de Ranita */}
      {ranitaSeleccionada !== null && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-2xl animate-pulse">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐸</span>
            <span>¡Ribbit! Recuerda: 1 kilo de tortillas gratis con tu pollo</span>
          </div>
        </div>
      )}
    </main>
  )
}

