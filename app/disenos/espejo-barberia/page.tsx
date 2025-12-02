'use client'

import { useState, useEffect, useRef } from 'react'
import { Camera, Scissors, Calendar, MapPin, Phone, Clock, X, Sparkles } from 'lucide-react'

export default function EspejoBarberiaPage() {
  const [fase, setFase] = useState<'espejo' | 'camara' | 'rompiendo' | 'informacion'>('espejo')
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [fotoTomada, setFotoTomada] = useState<string | null>(null)
  const [grietas, setGrietas] = useState<Array<{ id: number; x: number; y: number; angulo: number; longitud: number }>>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fotoCanvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Activar cámara cuando se pasa a fase 'camara'
  useEffect(() => {
    if (fase === 'camara') {
      // Verificar si el navegador soporta getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('getUserMedia no está soportado en este navegador')
        alert('Tu navegador no soporta el acceso a la cámara. Por favor, usa un navegador moderno.')
        setFase('informacion')
        return
      }

      navigator.mediaDevices
        .getUserMedia({ 
          video: { 
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        })
        .then((mediaStream) => {
          streamRef.current = mediaStream
          setStream(mediaStream)
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream
            // Asegurarse de que el video se reproduzca
            videoRef.current.play().catch((error) => {
              console.error('Error al reproducir el video:', error)
            })
          }
        })
        .catch((error) => {
          console.error('Error al acceder a la cámara:', error)
          alert('No se pudo acceder a la cámara. Por favor, verifica los permisos de tu navegador.')
          // Si no hay cámara, ir directamente a información
          setFase('informacion')
        })
    } else {
      // Detener stream cuando no está en fase camara
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
        setStream(null)
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }

    return () => {
      // Cleanup: detener stream al desmontar o cambiar de fase
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
    }
  }, [fase])

  // Generar grietas cuando se rompe el espejo
  useEffect(() => {
    if (fase === 'rompiendo') {
      const nuevasGrietas: Array<{ id: number; x: number; y: number; angulo: number; longitud: number }> = []
      for (let i = 0; i < 25; i++) {
        nuevasGrietas.push({
          id: i,
          x: 50 + (Math.random() - 0.5) * 20, // Centro con variación
          y: 50 + (Math.random() - 0.5) * 20,
          angulo: Math.random() * Math.PI * 2,
          longitud: 10 + Math.random() * 30,
        })
      }
      setGrietas(nuevasGrietas)

      // Después de 1.5 segundos, mostrar información
      setTimeout(() => {
        setFase('informacion')
      }, 1500)
    }
  }, [fase])

  const activarCamara = () => {
    setFase('camara')
  }

  const tomarFoto = () => {
    if (videoRef.current && fotoCanvasRef.current && stream) {
      const video = videoRef.current
      const canvas = fotoCanvasRef.current
      const ctx = canvas.getContext('2d')

      if (ctx && video.videoWidth > 0 && video.videoHeight > 0) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        const fotoData = canvas.toDataURL('image/png')
        setFotoTomada(fotoData)

        // Detener la cámara
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop())
          streamRef.current = null
        }
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
          setStream(null)
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null
        }

        // Romper el espejo
        setFase('rompiendo')
      } else {
        console.error('El video no está listo para capturar')
        alert('Espera un momento mientras la cámara se activa...')
      }
    }
  }

  const reiniciar = () => {
    setFase('espejo')
    setFotoTomada(null)
    setGrietas([])
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20">
        {/* Fase 1: Solo Espejo */}
        {fase === 'espejo' && (
          <div className="w-full max-w-4xl animate-fade-in">
            <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-700 to-gray-900 rounded-3xl overflow-hidden border-8 border-gray-600 shadow-2xl">
              {/* Marco del espejo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-white/10 rounded-full mb-6 backdrop-blur-sm border-4 border-white/20">
                    <Camera size={48} className="text-white/60" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Mírate en el Espejo</h2>
                  <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">
                    Activa tu cámara para ver tu reflejo y descubrir cómo podemos mejorar tu estilo
                  </p>
                  <button
                    onClick={activarCamara}
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
                  >
                    <Camera size={24} />
                    <span>Activar Cámara</span>
                  </button>
                </div>
              </div>

              {/* Efecto de reflejo del espejo */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10"></div>
            </div>
          </div>
        )}

        {/* Fase 2: Cámara Activa */}
        {fase === 'camara' && (
          <div className="w-full max-w-4xl animate-fade-in">
            <div className="relative aspect-[4/5] bg-black rounded-3xl overflow-hidden border-8 border-gray-600 shadow-2xl">
              {/* Video de la cámara */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
                style={{ transform: 'scaleX(-1)' }}
              />

              {/* Indicador de carga mientras se activa la cámara */}
              {!stream && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                  <div className="text-center text-white">
                    <div className="inline-block w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-lg font-semibold">Activando cámara...</p>
                  </div>
                </div>
              )}

              {/* Overlay con instrucciones */}
              {stream && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 flex flex-col items-center justify-end pb-8">
                  <div className="text-center text-white">
                    <p className="text-xl font-semibold mb-4">Sonríe y prepárate...</p>
                    <button
                      onClick={tomarFoto}
                      disabled={!stream}
                      className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 active:scale-95 flex items-center gap-3 mx-auto"
                    >
                      <Camera size={24} />
                      <span>Tomar Foto</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Efecto de espejo (reflejo) */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
              </div>
            </div>
          </div>
        )}

        {/* Fase 3: Espejo Roto */}
        {fase === 'rompiendo' && fotoTomada && (
          <div className="w-full max-w-4xl animate-fade-in">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-8 border-gray-600 shadow-2xl">
              {/* Foto tomada */}
              <img
                src={fotoTomada}
                alt="Foto tomada"
                className="w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }}
              />

              {/* Grietas del espejo */}
              <div className="absolute inset-0 pointer-events-none">
                {grietas.map((grieta) => (
                  <div
                    key={grieta.id}
                    className="absolute"
                    style={{
                      left: `${grieta.x}%`,
                      top: `${grieta.y}%`,
                      width: `${grieta.longitud}%`,
                      height: '2px',
                      background: 'rgba(255, 255, 255, 0.8)',
                      transform: `rotate(${grieta.angulo}rad)`,
                      transformOrigin: '0 50%',
                      boxShadow: '0 0 4px rgba(255, 255, 255, 0.6)',
                      animation: 'crack-appear 0.3s ease-out',
                    }}
                  />
                ))}

                {/* Fragmentos de espejo (efecto de brillo) */}
                {grietas.slice(0, 10).map((grieta) => (
                  <div
                    key={`fragment-${grieta.id}`}
                    className="absolute w-4 h-4 bg-white/40 rounded-full"
                    style={{
                      left: `${grieta.x + Math.random() * 10}%`,
                      top: `${grieta.y + Math.random() * 10}%`,
                      animation: 'sparkle 1s ease-out',
                    }}
                  />
                ))}
              </div>

              {/* Efecto de flash */}
              <div className="absolute inset-0 bg-white animate-flash"></div>
            </div>
          </div>
        )}

        {/* Fase 4: Información de la Barbería */}
        {fase === 'informacion' && (
          <div className="w-full max-w-6xl animate-fade-in-up">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-amber-500/30">
                <Scissors size={20} className="text-amber-400" />
                <span className="text-sm sm:text-base font-medium text-white">Barbería Premium</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                Estilo que Define
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                Transformamos tu look con cortes modernos y atención profesional
              </p>
            </div>

            {/* Grid de información */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
              {/* Servicios */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Scissors size={28} className="text-amber-400" />
                  <span>Nuestros Servicios</span>
                </h2>
                <ul className="space-y-4">
                  {[
                    'Corte de Cabello Clásico',
                    'Corte Moderno y Estilizado',
                    'Barba y Bigote',
                    'Afeitado Tradicional',
                    'Tratamientos Capilares',
                    'Lavado y Peinado',
                  ].map((servicio, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-200">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <span>{servicio}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Información de contacto */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <MapPin size={28} className="text-amber-400" />
                  <span>Información</span>
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-gray-200">
                    <MapPin size={20} className="text-amber-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Ubicación</p>
                      <p>Av. Principal 123, Centro</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-gray-200">
                    <Phone size={20} className="text-amber-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Teléfono</p>
                      <p>+52 123 456 7890</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-gray-200">
                    <Clock size={20} className="text-amber-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Horarios</p>
                      <p>Lun - Sáb: 9:00 AM - 8:00 PM</p>
                      <p>Dom: 10:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Principal */}
            <div className="bg-gradient-to-r from-amber-600/20 to-amber-700/20 backdrop-blur-md rounded-2xl p-8 sm:p-12 border-2 border-amber-500/30 text-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                ¿Listo para tu Nuevo Look?
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Agenda tu cita ahora y recibe un 20% de descuento en tu primer corte
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
                  <Calendar size={24} />
                  <span>Agendar Cita</span>
                </button>
                <button
                  onClick={reiniciar}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 transition-all flex items-center justify-center gap-3"
                >
                  <X size={24} />
                  <span>Volver al Espejo</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Canvas oculto para capturar foto */}
        <canvas ref={fotoCanvasRef} className="hidden" />
      </div>

      {/* Estilos inline para animaciones */}
      <style jsx>{`
        @keyframes crack-appear {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes sparkle {
          0% {
            opacity: 1;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0);
          }
        }

        @keyframes flash {
          0% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
          }
        }

        .animate-flash {
          animation: flash 0.3s ease-out;
        }
      `}</style>
    </main>
  )
}

