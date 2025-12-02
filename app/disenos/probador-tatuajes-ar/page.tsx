'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Camera, Download, Share2, Calendar, Sparkles, 
  RotateCw, Move, ZoomIn, ZoomOut, X, Heart,
  Palette, Wand2, Star, ArrowRight
} from 'lucide-react'

interface Tatuaje {
  id: number
  nombre: string
  imagen: string
  categoria: string
  precio: string
  artista: string
}

export default function ProbadorTatuajesARPage() {
  const [camaraActiva, setCamaraActiva] = useState(false)
  const [tatuajeSeleccionado, setTatuajeSeleccionado] = useState<Tatuaje | null>(null)
  const [posicion, setPosicion] = useState({ x: 50, y: 50 })
  const [escala, setEscala] = useState(100)
  const [rotacion, setRotacion] = useState(0)
  const [mostrandoGalería, setMostrandoGalería] = useState(false)
  const [errorCamara, setErrorCamara] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const tatuajes: Tatuaje[] = [
    {
      id: 1,
      nombre: 'Dragón Tribal',
      imagen: 'https://images.unsplash.com/photo-1605647540924-852290d6d5ee?w=400&q=80',
      categoria: 'Tribal',
      precio: '$500',
      artista: 'María García',
    },
    {
      id: 2,
      nombre: 'Rosa Realista',
      imagen: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&q=80',
      categoria: 'Realista',
      precio: '$450',
      artista: 'Carlos López',
    },
    {
      id: 3,
      nombre: 'Geométrico Mandala',
      imagen: 'https://images.unsplash.com/photo-1605647540924-852290d6d5ee?w=400&q=80',
      categoria: 'Geométrico',
      precio: '$350',
      artista: 'Ana Martínez',
    },
    {
      id: 4,
      nombre: 'Ancla Náutica',
      imagen: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&q=80',
      categoria: 'Tradicional',
      precio: '$300',
      artista: 'Luis Rodríguez',
    },
    {
      id: 5,
      nombre: 'Fénix Renacido',
      imagen: 'https://images.unsplash.com/photo-1605647540924-852290d6d5ee?w=400&q=80',
      categoria: 'Realista',
      precio: '$600',
      artista: 'María García',
    },
    {
      id: 6,
      nombre: 'Geometría Sagrada',
      imagen: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&q=80',
      categoria: 'Geométrico',
      precio: '$400',
      artista: 'Carlos López',
    },
    {
      id: 7,
      nombre: 'Águila Americana',
      imagen: 'https://images.unsplash.com/photo-1605647540924-852290d6d5ee?w=400&q=80',
      categoria: 'Tradicional',
      precio: '$550',
      artista: 'Ana Martínez',
    },
    {
      id: 8,
      nombre: 'Lobo Aullando',
      imagen: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&q=80',
      categoria: 'Realista',
      precio: '$480',
      artista: 'Luis Rodríguez',
    },
  ]

  // Activar cámara
  const activarCamara = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setCamaraActiva(true)
        setErrorCamara(null)
      }
    } catch (error) {
      setErrorCamara('No se pudo acceder a la cámara. Por favor, permite el acceso.')
      console.error('Error al acceder a la cámara:', error)
    }
  }

  // Detener cámara
  const detenerCamara = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setCamaraActiva(false)
  }

  // Capturar foto
  const capturarFoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      if (ctx) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0)
        
        // Dibujar tatuaje sobre la imagen
        if (tatuajeSeleccionado) {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.onload = () => {
            const x = (posicion.x / 100) * canvas.width - (img.width * escala / 200)
            const y = (posicion.y / 100) * canvas.height - (img.height * escala / 200)
            
            ctx.save()
            ctx.translate(x + img.width * escala / 200, y + img.height * escala / 200)
            ctx.rotate((rotacion * Math.PI) / 180)
            ctx.scale(escala / 100, escala / 100)
            ctx.drawImage(img, -img.width / 2, -img.height / 2)
            ctx.restore()
            
            // Descargar imagen
            canvas.toBlob((blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `tatuaje-${tatuajeSeleccionado.nombre}.png`
                a.click()
                URL.revokeObjectURL(url)
              }
            })
          }
          img.src = tatuajeSeleccionado.imagen
        }
      }
    }
  }

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      detenerCamara()
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20 relative">
        <div className="max-w-6xl mx-auto text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-purple-500/30">
            <Wand2 size={18} className="text-purple-300" />
            <span className="text-sm font-semibold">Realidad Aumentada</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Probador Virtual
            </span>
            <br />
            <span className="text-white">de Tatuajes AR</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Visualiza cómo se verá tu tatuaje en tu piel antes de hacerlo. 
            Prueba diseños, ajusta tamaño y posición en tiempo real.
          </p>

          {!camaraActiva && (
            <button
              onClick={activarCamara}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
            >
              <Camera size={24} />
              <span>Activar Cámara AR</span>
            </button>
          )}

          {errorCamara && (
            <div className="mt-4 bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-300 max-w-md mx-auto">
              {errorCamara}
            </div>
          )}
        </div>

        {/* Vista de Cámara AR */}
        {camaraActiva && (
          <div className="max-w-4xl mx-auto w-full">
            <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-6 border-2 border-purple-500/30 shadow-2xl">
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-6">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay del tatuaje */}
                {tatuajeSeleccionado && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: `${posicion.x}%`,
                      top: `${posicion.y}%`,
                      transform: `translate(-50%, -50%) rotate(${rotacion}deg) scale(${escala / 100})`,
                      transformOrigin: 'center center',
                    }}
                  >
                    <img
                      src={tatuajeSeleccionado.imagen}
                      alt={tatuajeSeleccionado.nombre}
                      className="max-w-xs opacity-90 drop-shadow-2xl"
                      style={{
                        filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.8))',
                      }}
                    />
                  </div>
                )}

                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Controles */}
              {tatuajeSeleccionado && (
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h3 className="text-lg font-bold mb-4 text-center text-purple-300">
                      {tatuajeSeleccionado.nombre}
                    </h3>
                    <div className="text-sm text-center text-purple-400 mb-4">
                      Por {tatuajeSeleccionado.artista} • {tatuajeSeleccionado.precio}
                    </div>
                    
                    {/* Control de posición */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                        <Move size={16} className="text-purple-400" />
                        <span>Posición</span>
                      </label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 w-8">X:</span>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={posicion.x}
                            onChange={(e) => setPosicion({ ...posicion, x: parseInt(e.target.value) })}
                            className="flex-1"
                          />
                          <span className="text-xs text-gray-400 w-12">{posicion.x}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 w-8">Y:</span>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={posicion.y}
                            onChange={(e) => setPosicion({ ...posicion, y: parseInt(e.target.value) })}
                            className="flex-1"
                          />
                          <span className="text-xs text-gray-400 w-12">{posicion.y}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Control de escala */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                        <ZoomIn size={16} className="text-purple-400" />
                        <span>Tamaño: {escala}%</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <ZoomOut size={20} className="text-purple-400" />
                        <input
                          type="range"
                          min="50"
                          max="200"
                          value={escala}
                          onChange={(e) => setEscala(parseInt(e.target.value))}
                          className="flex-1"
                        />
                        <ZoomIn size={20} className="text-purple-400" />
                      </div>
                    </div>

                    {/* Control de rotación */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                        <RotateCw size={16} className="text-purple-400" />
                        <span>Rotación: {rotacion}°</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <RotateCw size={20} className="text-purple-400" />
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={rotacion}
                          onChange={(e) => setRotacion(parseInt(e.target.value))}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={capturarFoto}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <Download size={20} />
                      <span>Guardar Foto</span>
                    </button>
                    <button
                      onClick={() => setTatuajeSeleccionado(null)}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <X size={20} />
                      <span>Quitar Tatuaje</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Selector de tatuajes cuando la cámara está activa */}
              {camaraActiva && !tatuajeSeleccionado && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-4 text-center">Selecciona un diseño</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-64 overflow-y-auto">
                    {tatuajes.map((tatuaje) => (
                      <button
                        key={tatuaje.id}
                        onClick={() => setTatuajeSeleccionado(tatuaje)}
                        className="group bg-white/5 hover:bg-white/10 rounded-xl p-2 border-2 border-white/10 hover:border-purple-500/50 transition-all"
                      >
                        <div className="aspect-square bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-lg overflow-hidden mb-2">
                          <img
                            src={tatuaje.imagen}
                            alt={tatuaje.nombre}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <div className="text-xs font-semibold text-center">{tatuaje.nombre}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Botón para cerrar cámara */}
              <button
                onClick={detenerCamara}
                className="mt-4 w-full bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                Cerrar Cámara
              </button>
            </div>
          </div>
        )}

        {/* Galería de Tatuajes */}
        {!camaraActiva && (
          <div className="max-w-6xl mx-auto w-full mt-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Galería de Diseños</h2>
              <p className="text-purple-200">Selecciona un diseño para probarlo en AR</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tatuajes.map((tatuaje) => (
                <div
                  key={tatuaje.id}
                  onClick={() => {
                    setTatuajeSeleccionado(tatuaje)
                    activarCamara()
                  }}
                  className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/10 hover:border-purple-500/50 transition-all cursor-pointer hover:transform hover:scale-105"
                >
                  <div className="aspect-square bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl mb-4 overflow-hidden">
                    <img
                      src={tatuaje.imagen}
                      alt={tatuaje.nombre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{tatuaje.nombre}</h3>
                  <div className="flex items-center justify-between text-sm text-purple-300 mb-1">
                    <span>{tatuaje.categoria}</span>
                    <span className="font-semibold">{tatuaje.precio}</span>
                  </div>
                  <div className="text-xs text-purple-400">Por {tatuaje.artista}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Sección de Agendar Cita */}
      {!camaraActiva && (
        <section className="max-w-4xl mx-auto px-4 py-20">
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-purple-500/30 text-center">
            <Calendar size={48} className="mx-auto mb-6 text-purple-400" />
            <h2 className="text-4xl font-bold mb-4">¿Listo para hacerlo realidad?</h2>
            <p className="text-xl text-purple-200 mb-8">
              Agenda una cita con nuestros artistas profesionales
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-10 py-5 rounded-xl font-bold text-xl shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105">
              Agendar Cita
            </button>
          </div>
        </section>
      )}
    </main>
  )
}

