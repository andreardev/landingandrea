'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, CheckCircle, Mail, Phone, User } from 'lucide-react'

export default function CallToAction() {
  const [showForm, setShowForm] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
  })
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setShowForm(false)
      setFormData({ nombre: '', email: '', telefono: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      id="cta"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Animated Particles */}
      {typeof window !== 'undefined' && [...Array(30)].map((_, i) => {
        const initialX = Math.random() * (window.innerWidth || 1920)
        const initialY = Math.random() * (window.innerHeight || 1080)
        const targetY = Math.random() * (window.innerHeight || 1080)
        const duration = Math.random() * 4 + 3
        const delay = Math.random() * 2
        
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-500 rounded-full"
            initial={{
              x: initialX,
              y: initialY,
              opacity: 0,
            }}
            animate={{
              y: targetY,
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
            }}
          />
        )
      })}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6"
            animate={inView ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              RESERVA EL TUYO
            </span>
          </motion.h2>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Sé uno de los primeros en poseer esta obra maestra. Edición limitada disponible.
          </p>

          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(212, 175, 55, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="bg-gold-500 hover:bg-gold-400 text-black px-12 py-6 rounded-sm text-xl font-bold transition-all shadow-2xl shadow-gold-500/50 relative overflow-hidden group"
          >
            <span className="relative z-10">RESERVAR AHORA</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => !isSubmitted && setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-gold-500/30 rounded-2xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle className="text-gold-500 mx-auto mb-4" size={64} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">¡Reserva Confirmada!</h3>
                    <p className="text-gray-400">Nos pondremos en contacto contigo pronto.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white">Reserva tu Rolex</h3>
                      <button
                        onClick={() => setShowForm(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Nombre Completo
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            name="nombre"
                            required
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-gold-500 focus:outline-none transition-colors"
                            placeholder="Tu nombre"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-gold-500 focus:outline-none transition-colors"
                            placeholder="tu@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Teléfono
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="tel"
                            name="telefono"
                            required
                            value={formData.telefono}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-gold-500 focus:outline-none transition-colors"
                            placeholder="+52 (123) 456-7890"
                          />
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gold-500 hover:bg-gold-400 text-black py-3 rounded-lg font-bold transition-all mt-6"
                      >
                        CONFIRMAR RESERVA
                      </motion.button>
                    </form>
                  </>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

