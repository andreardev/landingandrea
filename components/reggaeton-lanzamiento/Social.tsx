'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Instagram, Headphones, Youtube, Twitter, Music2 } from 'lucide-react'

const socialLinks = [
  { icon: Instagram, label: 'Instagram', color: 'from-pink-500 to-purple-500', href: '#' },
  { icon: Headphones, label: 'Spotify', color: 'from-green-400 to-green-600', href: '#' },
  { icon: Youtube, label: 'YouTube', color: 'from-red-500 to-red-700', href: '#' },
  { icon: Twitter, label: 'Twitter', color: 'from-blue-400 to-blue-600', href: '#' },
]

function SocialCard({ social, index }: { social: typeof socialLinks[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const Icon = social.icon

  return (
    <motion.a
      ref={ref}
      href={social.href}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.1, y: -10 }}
      whileTap={{ scale: 0.9 }}
      className="group relative"
    >
      <div className={`bg-gradient-to-br ${social.color} p-6 sm:p-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow`}>
        <Icon className="w-8 h-8 sm:w-12 sm:h-12 text-white mb-4" />
        <h3 className="text-white font-bold text-lg sm:text-xl">{social.label}</h3>
        <p className="text-white/80 text-sm sm:text-base mt-2">Síguenos</p>
      </div>
    </motion.a>
  )
}

export default function Social() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-32 bg-gradient-to-b from-black to-purple-900/20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <Music2 className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              SÍGUENOS
            </span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto">
            Mantente al día con las últimas noticias y contenido exclusivo
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {socialLinks.map((social, index) => (
            <SocialCard key={social.label} social={social} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

