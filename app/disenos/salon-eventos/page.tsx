import Hero from '@/components/salon-eventos/Hero'
import Servicios from '@/components/salon-eventos/Servicios'
import Instalaciones from '@/components/salon-eventos/Instalaciones'
import Capacidad from '@/components/salon-eventos/Capacidad'
import Galeria from '@/components/salon-eventos/Galeria'
import Testimonios from '@/components/salon-eventos/Testimonios'
import Contacto from '@/components/salon-eventos/Contacto'
import Navbar from '@/components/salon-eventos/Navbar'
import Footer from '@/components/salon-eventos/Footer'

export default function SalonEventosPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Servicios />
      <Instalaciones />
      <Capacidad />
      <Galeria />
      <Testimonios />
      <Contacto />
      <Footer />
    </main>
  )
}

