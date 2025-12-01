'use client'

import { useState, useEffect, useRef } from 'react'
import { Flower2, Leaf, Droplets, Sparkles, Heart, Star, Wind, Sun, Moon } from 'lucide-react'

export default function JardinSerenidadPage() {
  const [scrollY, setScrollY] = useState(0)
  const [plantaAltura, setPlantaAltura] = useState(0)
  const [aguaNivel, setAguaNivel] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrollY(scrollPosition)
      
      // Calcular altura de plantas basada en scroll
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const porcentajeScroll = Math.min(scrollPosition / maxScroll, 1)
      setPlantaAltura(porcentajeScroll * 100)
      
      // Efecto de agua basado en scroll
      setAguaNivel(Math.sin(scrollPosition / 100) * 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dibujar ondas de agua
      const time = Date.now() * 0.001
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'
      ctx.lineWidth = 2

      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 + 
            Math.sin((x / 50) + time + i * 2) * (10 + aguaNivel) +
            Math.cos((x / 30) + time * 1.5 + i) * 5
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }

      requestAnimationFrame(animate)
    }

    animate()
  }, [aguaNivel])

  const servicios = [
    {
      icon: Flower2,
      titulo: 'Tratamientos Faciales',
      descripcion: 'Renueva y revitaliza tu piel con nuestros tratamientos faciales personalizados',
      color: 'from-pink-400 to-rose-400',
    },
    {
      icon: Droplets,
      titulo: 'Hidratación Profunda',
      descripcion: 'Hidratación intensiva para una piel radiante y saludable',
      color: 'from-blue-400 to-cyan-400',
    },
    {
      icon: Sparkles,
      titulo: 'Masajes Relajantes',
      descripcion: 'Libera tensiones y encuentra la paz interior con nuestros masajes',
      color: 'from-purple-400 to-pink-400',
    },
    {
      icon: Leaf,
      titulo: 'Tratamientos Naturales',
      descripcion: 'Productos 100% naturales para el cuidado de tu cuerpo',
      color: 'from-green-400 to-emerald-400',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-green-50 to-blue-50 relative overflow-hidden">
      {/* Canvas para efectos de agua */}
      <canvas
        ref={canvasRef}
        width={1920}
        height={400}
        className="absolute bottom-0 left-0 w-full h-64 pointer-events-none opacity-60"
        style={{ zIndex: 1 }}
      />

      {/* Elementos naturales flotantes */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          >
            <Leaf
              size={20 + Math.random() * 15}
              className="text-green-400/30"
              style={{
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Contenido principal */}
      <div ref={containerRef} className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
          {/* Fondo con parallax */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-sky-200 via-green-100 to-blue-100"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />

          {/* Plantas que crecen con scroll */}
          <div className="absolute bottom-0 left-0 right-0 h-96 overflow-hidden">
            {/* Planta izquierda */}
            <div
              className="absolute bottom-0 left-10 w-32 h-full origin-bottom transition-all duration-1000"
              style={{
                transform: `scaleY(${plantaAltura / 100})`,
                opacity: plantaAltura / 100,
              }}
            >
              <svg viewBox="0 0 100 200" className="w-full h-full">
                <path
                  d="M 50 200 Q 30 150 40 100 Q 50 50 60 100 Q 70 150 50 200"
                  fill="rgba(34, 197, 94, 0.6)"
                  stroke="rgba(22, 163, 74, 0.8)"
                  strokeWidth="2"
                />
                <path
                  d="M 50 200 Q 20 120 35 80 Q 50 40 65 80 Q 80 120 50 200"
                  fill="rgba(34, 197, 94, 0.5)"
                  stroke="rgba(22, 163, 74, 0.7)"
                  strokeWidth="2"
                />
                <ellipse cx="50" cy="40" rx="15" ry="20" fill="rgba(34, 197, 94, 0.7)" />
              </svg>
            </div>

            {/* Planta derecha */}
            <div
              className="absolute bottom-0 right-10 w-32 h-full origin-bottom transition-all duration-1000"
              style={{
                transform: `scaleY(${plantaAltura / 100})`,
                opacity: plantaAltura / 100,
              }}
            >
              <svg viewBox="0 0 100 200" className="w-full h-full">
                <path
                  d="M 50 200 Q 70 150 60 100 Q 50 50 40 100 Q 30 150 50 200"
                  fill="rgba(34, 197, 94, 0.6)"
                  stroke="rgba(22, 163, 74, 0.8)"
                  strokeWidth="2"
                />
                <path
                  d="M 50 200 Q 80 120 65 80 Q 50 40 35 80 Q 20 120 50 200"
                  fill="rgba(34, 197, 94, 0.5)"
                  stroke="rgba(22, 163, 74, 0.7)"
                  strokeWidth="2"
                />
                <ellipse cx="50" cy="40" rx="15" ry="20" fill="rgba(34, 197, 94, 0.7)" />
              </svg>
            </div>

            {/* Planta central */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-full origin-bottom transition-all duration-1000"
              style={{
                transform: `scaleY(${plantaAltura / 100})`,
                opacity: plantaAltura / 100,
              }}
            >
              <svg viewBox="0 0 100 200" className="w-full h-full">
                <path
                  d="M 50 200 Q 25 140 35 90 Q 50 40 65 90 Q 75 140 50 200"
                  fill="rgba(34, 197, 94, 0.7)"
                  stroke="rgba(22, 163, 74, 0.9)"
                  strokeWidth="2"
                />
                <path
                  d="M 50 200 Q 15 100 30 60 Q 50 20 70 60 Q 85 100 50 200"
                  fill="rgba(34, 197, 94, 0.6)"
                  stroke="rgba(22, 163, 74, 0.8)"
                  strokeWidth="2"
                />
                <ellipse cx="50" cy="20" rx="20" ry="25" fill="rgba(34, 197, 94, 0.8)" />
                <circle cx="45" cy="15" r="3" fill="rgba(251, 191, 36, 0.8)" />
                <circle cx="55" cy="15" r="3" fill="rgba(251, 191, 36, 0.8)" />
              </svg>
            </div>
          </div>

          {/* Contenido del hero */}
          <div className="relative z-20 text-center max-w-4xl mx-auto animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full mb-6 shadow-lg">
              <Flower2 size={20} className="text-green-500" />
              <span className="text-sm sm:text-base font-medium text-green-700">El Jardín de la Serenidad</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-green-800 mb-6 text-shadow-lg">
              Encuentra Tu Paz Interior
            </h1>
            <p className="text-xl sm:text-2xl text-green-700 mb-8 max-w-2xl mx-auto">
              Un oasis de tranquilidad donde la naturaleza y el bienestar se encuentran
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto">
              <Heart size={24} className="fill-white" />
              <span>Reservar Mi Experiencia</span>
            </button>
          </div>
        </section>

        {/* Sección de Servicios */}
        <section className="py-20 sm:py-32 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl sm:text-5xl font-bold text-green-800 mb-4 flex items-center justify-center gap-3">
                <Sparkles size={40} className="text-green-500" />
                <span>Nuestros Tratamientos</span>
              </h2>
              <p className="text-xl text-green-700 max-w-2xl mx-auto">
                Descubre nuestra gama de servicios diseñados para tu bienestar
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {servicios.map((servicio, index) => {
                const Icon = servicio.icon
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${servicio.color} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105 animate-scale-in border-2 border-white/30`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 text-center">{servicio.titulo}</h3>
                    <p className="text-white/90 text-center">{servicio.descripcion}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Sección de Experiencia */}
        <section className="py-20 sm:py-32 px-4 relative bg-gradient-to-b from-white/50 to-transparent">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-green-200">
              <Wind size={48} className="text-green-500 mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">
                Una Experiencia Única
              </h2>
              <p className="text-lg text-green-700 mb-8 leading-relaxed">
                Sumérgete en un ambiente de paz y serenidad. Nuestro jardín te invita a desconectar del mundo exterior y reconectar contigo mismo. Cada detalle está diseñado para tu relajación y bienestar.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 text-green-700">
                  <Sun size={24} className="text-yellow-500" />
                  <span>Ambiente Natural</span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <Droplets size={24} className="text-blue-500" />
                  <span>Efectos Relajantes</span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <Moon size={24} className="text-indigo-500" />
                  <span>Tranquilidad Total</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 sm:py-32 px-4 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-12 sm:p-16 shadow-2xl">
              <Star size={48} className="text-yellow-300 mx-auto mb-6" />
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                ¿Listo para Tu Transformación?
              </h2>
              <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
                Reserva tu cita y comienza tu viaje hacia el bienestar y la serenidad
              </p>
              <button className="px-10 py-5 bg-white text-green-600 text-xl font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95">
                Reservar Ahora
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

