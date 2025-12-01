'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'

const Canvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), { ssr: false })
const OrbitControls = dynamic(() => import('@react-three/drei').then((mod) => mod.OrbitControls), { ssr: false })
const Environment = dynamic(() => import('@react-three/drei').then((mod) => mod.Environment), { ssr: false })
const PerspectiveCamera = dynamic(() => import('@react-three/drei').then((mod) => mod.PerspectiveCamera), { ssr: false })
const MeshDistortMaterial = dynamic(() => import('@react-three/drei').then((mod) => mod.MeshDistortMaterial), { ssr: false })

function WatchModel() {
  const meshRef = useRef<any>(null)

  useEffect(() => {
    if (meshRef.current) {
      const animate = () => {
        if (meshRef.current) {
          meshRef.current.rotation.y += 0.005
        }
        requestAnimationFrame(animate)
      }
      animate()
    }
  }, [])

  return (
    <>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <MeshDistortMaterial
          color="#d4af37"
          attach="material"
          distort={0.3}
          speed={2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <Environment preset="city" />
    </>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* 3D Watch Scene */}
      <motion.div
        style={{ opacity, scale, y }}
        className="absolute inset-0 z-10"
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#d4af37" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4af37" />
          <WatchModel />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </motion.div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gold-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-gold-500/30"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={18} className="text-gold-500" />
            <span className="text-sm font-medium text-gold-500">NUEVO LANZAMIENTO</span>
          </motion.div>

          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <span className="bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
              ROLEX
            </span>
            <br />
            <span className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              MASTERPIECE
            </span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            La perfección en cada segundo. La elegancia en cada detalle.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <motion.a
              href="#cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gold-500 hover:bg-gold-400 text-black px-10 py-4 rounded-sm text-lg font-bold transition-all shadow-2xl shadow-gold-500/50"
            >
              RESERVAR AHORA
            </motion.a>
            <motion.a
              href="#journey"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gold-500 text-gold-500 hover:bg-gold-500/10 px-10 py-4 rounded-sm text-lg font-bold transition-all"
            >
              DESCUBRIR MÁS
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <a href="#journey" className="block">
            <ArrowDown size={32} className="text-gold-500" />
          </a>
        </motion.div>
      </div>

      {/* Floating Particles */}
      {typeof window !== 'undefined' && [...Array(20)].map((_, i) => {
        const initialX = Math.random() * (window.innerWidth || 1920)
        const initialY = Math.random() * (window.innerHeight || 1080)
        const targetY = Math.random() * (window.innerHeight || 1080)
        const duration = Math.random() * 3 + 2
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
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
            }}
          />
        )
      })}
    </section>
  )
}

