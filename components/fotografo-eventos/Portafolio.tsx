'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const galeria = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    category: 'Bodas',
    title: 'Boda Elegante',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80',
    category: 'XV Años',
    title: 'Quinceañera Moderna',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
    category: 'Corporativo',
    title: 'Evento Empresarial',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80',
    category: 'Retratos',
    title: 'Sesión Familiar',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
    category: 'Videografía',
    title: 'Video Cinematográfico',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80',
    category: 'Bodas',
    title: 'Ceremonia Íntima',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80',
    category: 'XV Años',
    title: 'Fiesta de Quince',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80',
    category: 'Retratos',
    title: 'Sesión Artística',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1478146894901-bb0f8a0b8b8e?w=1200&q=80',
    category: 'Bodas',
    title: 'Recepción Elegante',
  },
]

export default function Portafolio() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (id: number) => {
    setSelectedImage(id)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return
    const currentIndex = galeria.findIndex((img) => img.id === selectedImage)
    if (direction === 'prev') {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : galeria.length - 1
      setSelectedImage(galeria[prevIndex].id)
    } else {
      const nextIndex = currentIndex < galeria.length - 1 ? currentIndex + 1 : 0
      setSelectedImage(galeria[nextIndex].id)
    }
  }

  return (
    <section
      id="portafolio"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 bg-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Portafolio
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
            Explora nuestra galería de trabajos y descubre la calidad de nuestro trabajo
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {galeria.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => openLightbox(item.id)}
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                <div className="text-purple-400 text-sm font-semibold mb-1">{item.category}</div>
                <div className="text-white text-lg font-bold">{item.title}</div>
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
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl max-h-[90vh] w-full"
            >
              <img
                src={galeria.find((img) => img.id === selectedImage)?.src}
                alt={galeria.find((img) => img.id === selectedImage)?.title}
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage('prev')
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage('next')
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

