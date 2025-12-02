'use client'

import { useState, useEffect, useRef } from 'react'
import { Heart, Calendar, MapPin, Clock, Mail, Users, Camera, Sparkles, Gift } from 'lucide-react'

export default function InvitacionBodaPage() {
  const [cartaAbierta, setCartaAbierta] = useState(false)
  const [seccionActual, setSeccionActual] = useState<'inicio' | 'historia' | 'fecha' | 'ubicacion' | 'rsvp'>('inicio')
  const [confeti, setConfeti] = useState<Array<{ id: number; x: number; y: number; color: string; velocidad: number }>>([])
  const [corazones, setCorazones] = useState<Array<{ id: number; x: number; y: number; tamaño: number }>>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const confetiRef = useRef<HTMLCanvasElement>(null)

  const pareja = {
    novio: 'Carlos',
    novia: 'María',
    fecha: '15 de Junio, 2024',
    hora: '5:00 PM',
    lugar: 'Hacienda San Miguel',
    direccion: 'Carretera a la Presa Km 12, San Miguel de Allende',
    ciudad: 'Guanajuato, México',
  }

  const tiempoRestante = {
    dias: 45,
    horas: 12,
    minutos: 30,
  }

  // Generar confeti
  useEffect(() => {
    const nuevosConfeti: Array<{ id: number; x: number; y: number; color: string; velocidad: number }> = []
    const colores = ['#FF6B9D', '#C44569', '#F8B500', '#FFC312', '#FF9FF3', '#54A0FF']
    for (let i = 0; i < 100; i++) {
      nuevosConfeti.push({
        id: i,
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
        y: -Math.random() * 500,
        color: colores[Math.floor(Math.random() * colores.length)],
        velocidad: 2 + Math.random() * 3,
      })
    }
    setConfeti(nuevosConfeti)
  }, [])

  // Generar corazones flotantes
  useEffect(() => {
    const nuevosCorazones: Array<{ id: number; x: number; y: number; tamaño: number }> = []
    for (let i = 0; i < 20; i++) {
      nuevosCorazones.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        tamaño: 20 + Math.random() * 30,
      })
    }
    setCorazones(nuevosCorazones)
  }, [])

  // Animar confeti
  useEffect(() => {
    const canvas = confetiRef.current
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

      confeti.forEach((particula) => {
        particula.y += particula.velocidad
        particula.x += Math.sin(particula.y * 0.01) * 0.5

        if (particula.y > canvas.height) {
          particula.y = -10
          particula.x = Math.random() * canvas.width
        }

        ctx.fillStyle = particula.color
        ctx.fillRect(particula.x, particula.y, 8, 8)
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
  }, [confeti])

  const abrirCarta = () => {
    setCartaAbierta(true)
    setTimeout(() => {
      setSeccionActual('historia')
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 relative overflow-hidden">
      {/* Canvas para confeti */}
      <canvas
        ref={confetiRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Corazones flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        {corazones.map((corazon) => (
          <div
            key={corazon.id}
            className="absolute text-pink-300/30 animate-float"
            style={{
              left: `${corazon.x}%`,
              top: `${corazon.y}%`,
              fontSize: `${corazon.tamaño}px`,
              animationDuration: `${4 + Math.random() * 3}s`,
              animationDelay: `${corazon.id * 0.2}s`,
            }}
          >
            <Heart size={corazon.tamaño} className="fill-current" />
          </div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20">
        {/* Fase 1: Carta Cerrada */}
        {!cartaAbierta && (
          <div className="w-full max-w-2xl animate-fade-in">
            <div
              className="relative cursor-pointer transform transition-all duration-1000 hover:scale-105"
              onClick={abrirCarta}
            >
              {/* Sobre de carta */}
              <div className="bg-gradient-to-br from-rose-200 to-pink-300 rounded-2xl p-8 sm:p-12 shadow-2xl border-4 border-rose-400">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-white/80 rounded-full mb-6 shadow-lg">
                    <Heart size={48} className="text-rose-500 fill-rose-500" />
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-rose-800 mb-4">
                    {pareja.novio} & {pareja.novia}
                  </h1>
                  <p className="text-xl sm:text-2xl text-rose-700 mb-6">
                    Tienes una invitación especial
                  </p>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border-2 border-rose-400/50">
                    <p className="text-rose-800 font-semibold text-lg mb-2">Haz click para abrir</p>
                    <div className="flex items-center justify-center gap-2 text-rose-600">
                      <Sparkles size={20} />
                      <span className="text-sm">Descubre nuestra historia</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sello de cera */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-rose-600 to-pink-700 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                <Heart size={24} className="text-white fill-white" />
              </div>
            </div>
          </div>
        )}

        {/* Fase 2: Carta Abierta - Contenido */}
        {cartaAbierta && (
          <div className="w-full max-w-5xl animate-fade-in-up">
            {/* Header con nombres */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-rose-300">
                <Heart size={20} className="text-rose-500 fill-rose-500" />
                <span className="text-sm sm:text-base font-medium text-rose-700">Nos Casamos</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-rose-800 mb-4">
                {pareja.novio} & {pareja.novia}
              </h1>
              <p className="text-xl sm:text-2xl text-rose-600">
                Queremos compartir este día especial contigo
              </p>
            </div>

            {/* Navegación por secciones */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { id: 'historia', label: 'Nuestra Historia', icon: Heart },
                { id: 'fecha', label: 'Fecha', icon: Calendar },
                { id: 'ubicacion', label: 'Ubicación', icon: MapPin },
                { id: 'rsvp', label: 'RSVP', icon: Mail },
              ].map((seccion) => {
                const Icon = seccion.icon
                return (
                  <button
                    key={seccion.id}
                    onClick={() => setSeccionActual(seccion.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                      seccionActual === seccion.id
                        ? 'bg-rose-500 text-white shadow-lg scale-105'
                        : 'bg-white/80 text-rose-700 hover:bg-rose-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{seccion.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Sección: Nuestra Historia */}
            {seccionActual === 'historia' && (
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-rose-200 animate-fade-in">
                <div className="text-center mb-8">
                  <h2 className="text-4xl sm:text-5xl font-bold text-rose-800 mb-4 flex items-center justify-center gap-3">
                    <Heart size={40} className="text-rose-500 fill-rose-500" />
                    <span>Nuestra Historia</span>
                  </h2>
                </div>
                <div className="max-w-3xl mx-auto space-y-6 text-rose-700 text-lg leading-relaxed">
                  <p className="text-xl font-semibold text-rose-800">
                    Todo comenzó un día de primavera...
                  </p>
                  <p>
                    Nos conocimos en una cafetería del centro, donde el tiempo parecía detenerse. 
                    Desde ese momento, supimos que algo especial había comenzado.
                  </p>
                  <p>
                    A lo largo de estos años, hemos compartido risas, sueños y aventuras. 
                    Hemos crecido juntos, aprendido el uno del otro y construido un amor que 
                    queremos celebrar contigo.
                  </p>
                  <p className="text-xl font-semibold text-rose-800 mt-8">
                    Ahora, queremos dar el siguiente paso y comenzar nuestra vida juntos como esposos.
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t-2 border-rose-200">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-rose-600">{pareja.novio}</div>
                      <div className="text-rose-500">&</div>
                      <div className="text-4xl font-bold text-rose-600">{pareja.novia}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sección: Fecha */}
            {seccionActual === 'fecha' && (
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-rose-200 animate-fade-in">
                <div className="text-center mb-8">
                  <h2 className="text-4xl sm:text-5xl font-bold text-rose-800 mb-4 flex items-center justify-center gap-3">
                    <Calendar size={40} className="text-rose-500" />
                    <span>Fecha Especial</span>
                  </h2>
                </div>
                <div className="max-w-3xl mx-auto">
                  {/* Cuenta regresiva */}
                  <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8">
                    {[
                      { valor: tiempoRestante.dias, label: 'Días', icon: Calendar },
                      { valor: tiempoRestante.horas, label: 'Horas', icon: Clock },
                      { valor: tiempoRestante.minutos, label: 'Minutos', icon: Clock },
                    ].map((item, index) => {
                      const Icon = item.icon
                      return (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl p-6 text-center text-white shadow-lg"
                        >
                          <Icon size={32} className="mx-auto mb-3 opacity-80" />
                          <div className="text-4xl sm:text-5xl font-bold mb-2">{item.valor}</div>
                          <div className="text-sm sm:text-base font-semibold">{item.label}</div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Información de la fecha */}
                  <div className="bg-rose-50 rounded-2xl p-6 sm:p-8 border-2 border-rose-200">
                    <div className="space-y-4 text-rose-800">
                      <div className="flex items-center gap-3 text-2xl font-bold">
                        <Calendar size={28} className="text-rose-500" />
                        <span>{pareja.fecha}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xl">
                        <Clock size={24} className="text-rose-500" />
                        <span>{pareja.hora}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xl">
                        <MapPin size={24} className="text-rose-500" />
                        <span>{pareja.lugar}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sección: Ubicación */}
            {seccionActual === 'ubicacion' && (
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-rose-200 animate-fade-in">
                <div className="text-center mb-8">
                  <h2 className="text-4xl sm:text-5xl font-bold text-rose-800 mb-4 flex items-center justify-center gap-3">
                    <MapPin size={40} className="text-rose-500" />
                    <span>Ubicación</span>
                  </h2>
                </div>
                <div className="max-w-3xl mx-auto">
                  <div className="bg-rose-50 rounded-2xl p-6 sm:p-8 border-2 border-rose-200 mb-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-rose-800 mb-4">{pareja.lugar}</h3>
                    <div className="space-y-3 text-rose-700">
                      <p className="text-lg">{pareja.direccion}</p>
                      <p className="text-lg font-semibold">{pareja.ciudad}</p>
                    </div>
                  </div>

                  {/* Mapa placeholder */}
                  <div className="bg-gradient-to-br from-rose-200 to-pink-300 rounded-2xl h-64 sm:h-96 flex items-center justify-center border-2 border-rose-300">
                    <div className="text-center text-rose-700">
                      <MapPin size={64} className="mx-auto mb-4 opacity-50" />
                      <p className="text-xl font-semibold">Mapa Interactivo</p>
                      <p className="text-sm mt-2">Haz click para ver en Google Maps</p>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pareja.direccion + ', ' + pareja.ciudad)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                    >
                      <MapPin size={24} />
                      <span>Abrir en Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Sección: RSVP */}
            {seccionActual === 'rsvp' && (
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-rose-200 animate-fade-in">
                <div className="text-center mb-8">
                  <h2 className="text-4xl sm:text-5xl font-bold text-rose-800 mb-4 flex items-center justify-center gap-3">
                    <Mail size={40} className="text-rose-500" />
                    <span>Confirma tu Asistencia</span>
                  </h2>
                  <p className="text-lg text-rose-600">
                    Por favor, confirma tu asistencia antes del 1 de Junio
                  </p>
                </div>
                <div className="max-w-2xl mx-auto">
                  <form className="space-y-6">
                    <div>
                      <label className="block text-rose-700 font-semibold mb-2">Nombre Completo</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none text-rose-800"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-rose-700 font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none text-rose-800"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-rose-700 font-semibold mb-2">¿Asistirás?</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="asistencia" value="si" className="text-rose-500" />
                          <span className="text-rose-700">Sí, asistiré</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="asistencia" value="no" className="text-rose-500" />
                          <span className="text-rose-700">No podré asistir</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-rose-700 font-semibold mb-2">Número de acompañantes</label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none text-rose-800"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-rose-700 font-semibold mb-2">Mensaje (opcional)</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none text-rose-800"
                        placeholder="Déjanos un mensaje..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                    >
                      <Mail size={24} />
                      <span>Enviar Confirmación</span>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

