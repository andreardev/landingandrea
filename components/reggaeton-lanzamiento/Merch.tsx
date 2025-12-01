'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ShoppingBag, Sparkles } from 'lucide-react'

const merchItems = [
  {
    id: 1,
    name: 'Hoodie Oficial',
    price: '$49.99',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80',
    featured: true,
  },
  {
    id: 2,
    name: 'T-Shirt Limited',
    price: '$29.99',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    featured: false,
  },
  {
    id: 3,
    name: 'Vinilo Exclusivo',
    price: '$34.99',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
    featured: true,
  },
  {
    id: 4,
    name: 'Poster Firmado',
    price: '$19.99',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&q=80',
    featured: false,
  },
]

function MerchCard({ item, index }: { item: typeof merchItems[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative"
    >
      <div className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-500/20">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <motion.img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          {item.featured && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-white" />
              <span className="text-xs font-bold text-white">LIMITED</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <h3 className="text-white font-bold text-lg sm:text-xl mb-2">{item.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-purple-400 font-bold text-xl">{item.price}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 sm:px-6 py-2 rounded-full text-white font-semibold flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Comprar</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Merch() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      id="merch"
      ref={ref}
      className="relative py-20 sm:py-32 bg-gradient-to-b from-black via-cyan-900/20 to-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              MERCHANDISING
            </span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto">
            Lleva el ritmo contigo con nuestra colección exclusiva
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {merchItems.map((item, index) => (
            <MerchCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

