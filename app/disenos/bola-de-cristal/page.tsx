'use client'

import { useState } from 'react'
import { Sparkles, Wand2, Star } from 'lucide-react'

export default function MagicBallPage() {
  const [pregunta, setPregunta] = useState('')
  const [respuesta, setRespuesta] = useState('')
  const [mostrandoRespuesta, setMostrandoRespuesta] = useState(false)
  const [agitando, setAgitando] = useState(false)
  const [historial, setHistorial] = useState<Array<{ pregunta: string; respuesta: string }>>([])

  const respuestas = [
    // Respuestas positivas
    'Sí, definitivamente',
    'Sí, sin duda',
    'Sí, es muy probable',
    'Sí, confía en ello',
    'Sí, el universo está de tu lado',
    
    // Respuestas negativas
    'No, no es el momento',
    'No, mejor espera',
    'No, no es la mejor opción',
    'No, reconsidera tu decisión',
    'No, el destino dice que no',
    
    // Respuestas reflexivas
    'La respuesta está dentro de ti',
    'El tiempo lo dirá',
    'Depende de tus acciones',
    'Quizás, pero primero reflexiona',
    'No puedo predecirlo, solo tú puedes decidir',
    'La vida te sorprenderá',
    'Sigue tu intuición',
    'Las señales apuntan a que debes pensar más',
    'Todo llegará en el momento perfecto',
    'Confía en el proceso',
    'A veces la mejor respuesta es la que no esperas',
    'El camino se revelará cuando estés listo',
    'La sabiduría viene de la experiencia',
    'Tu corazón ya conoce la respuesta',
    'El cambio está en tus manos',
    'Observa las señales a tu alrededor',
    'La paciencia traerá claridad',
    'Cada pregunta tiene múltiples respuestas',
    'El futuro es flexible, moldeable por ti',
    'La verdad se encuentra en la acción, no en la predicción',
  ]

  const hacerPregunta = () => {
    if (!pregunta.trim()) {
      return
    }

    setAgitando(true)
    setMostrandoRespuesta(false)
    setRespuesta('')

    // Simular agitación de la bola
    setTimeout(() => {
      const respuestaAleatoria = respuestas[Math.floor(Math.random() * respuestas.length)]
      setRespuesta(respuestaAleatoria)
      setAgitando(false)
      setMostrandoRespuesta(true)
      
      // Guardar en historial
      setHistorial(prev => [{ pregunta, respuesta: respuestaAleatoria }, ...prev].slice(0, 5))
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !agitando) {
      hacerPregunta()
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4">
            <Wand2 size={20} className="text-yellow-300" />
            <span className="text-sm sm:text-base font-medium text-white">Bola Mágica de la Fortuna</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-shadow-lg">
            Haz tu Pregunta
          </h1>
          <p className="text-lg sm:text-xl text-purple-200 max-w-2xl mx-auto">
            Formula una pregunta y deja que la magia te guíe hacia la respuesta
          </p>
        </div>

        {/* Bola de la fortuna */}
        <div className="relative mb-8 sm:mb-12">
          <div
            className={`relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 ${
              agitando ? 'animate-shake' : ''
            } transition-transform duration-300`}
          >
            {/* Bola exterior con efecto 3D */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl">
              {/* Reflejo superior */}
              <div className="absolute top-8 left-12 w-24 h-24 sm:top-12 sm:left-16 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-white/30 to-transparent blur-sm"></div>
              
              {/* Ventana circular (donde aparece la respuesta) */}
              <div className="absolute inset-8 sm:inset-10 md:inset-12 rounded-full bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center shadow-inner">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/50 to-transparent"></div>
                
                {/* Respuesta o triángulo 8 */}
                {agitando ? (
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-4 border-white/20 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/10 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ) : mostrandoRespuesta ? (
                  <div className="px-4 sm:px-6 text-center">
                    <p className="text-white text-sm sm:text-base md:text-lg font-semibold leading-tight animate-scale-in">
                      {respuesta}
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white/10 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">8</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Input de pregunta */}
        <div className="w-full max-w-2xl mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative">
            <input
              type="text"
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu pregunta aquí..."
              disabled={agitando}
              className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white placeholder-white/60 text-lg sm:text-xl focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" size={24} />
          </div>
        </div>

        {/* Botón de pregunta */}
        <button
          onClick={hacerPregunta}
          disabled={!pregunta.trim() || agitando}
          className="px-8 py-4 sm:px-12 sm:py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg sm:text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 animate-fade-in-up flex items-center gap-2"
          style={{ animationDelay: '0.3s' }}
        >
          {agitando ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Consultando...</span>
            </>
          ) : (
            <>
              <Wand2 size={24} />
              <span>Hacer Pregunta</span>
            </>
          )}
        </button>

        {/* Historial de preguntas */}
        {historial.length > 0 && (
          <div className="mt-12 sm:mt-16 w-full max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
              <Star size={24} className="text-yellow-300" />
              <span>Historial Reciente</span>
            </h3>
            <div className="space-y-3">
              {historial.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-5 animate-scale-in"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <p className="text-white/80 text-sm sm:text-base mb-2">
                    <span className="font-semibold text-purple-200">P:</span> {item.pregunta}
                  </p>
                  <p className="text-white text-base sm:text-lg">
                    <span className="font-semibold text-yellow-300">R:</span> {item.respuesta}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instrucciones */}
        <div className="mt-8 sm:mt-12 text-center text-white/60 text-sm sm:text-base max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <p>💫 Formula tu pregunta con claridad y presiona el botón para recibir tu respuesta mágica</p>
        </div>
      </div>
    </main>
  )
}

