'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
  {
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80',
    title: 'Elegancia Atemporal',
    description: 'Diseño clásico que trasciende las modas',
  },
  {
    url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=80',
    title: 'Precisión Suiza',
    description: 'Movimiento automático de alta precisión',
  },
  {
    url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=80',
    title: 'Artesanía Excepcional',
    description: 'Cada detalle cuidadosamente elaborado',
  },
  {
    url: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=80',
    title: 'Lujo Redefinido',
    description: 'La perfección en cada milímetro',
  },
]

export default function Experience() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length)
    }
  }

  return (
    <section
      id="experience"
      className="relative py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-black via-gray-900 to-black"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              EXPERIENCIA
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Descubre la perfección en cada detalle
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-square overflow-hidden rounded-xl">
                <motion.img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                  <p className="text-gray-300 text-sm">{image.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="relative">
                <img
                  src={images[selectedImage].url}
                  alt={images[selectedImage].title}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-white font-bold text-2xl mb-2">
                    {images[selectedImage].title}
                  </h3>
                  <p className="text-gray-300">{images[selectedImage].description}</p>
                </div>
              </div>

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-3 rounded-full text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-3 rounded-full text-white transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

