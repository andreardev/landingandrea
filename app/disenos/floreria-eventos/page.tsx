import Hero from '@/components/floreria-eventos/Hero'
import Servicios from '@/components/floreria-eventos/Servicios'
import TiposEventos from '@/components/floreria-eventos/TiposEventos'
import Galeria from '@/components/floreria-eventos/Galeria'
import Testimonios from '@/components/floreria-eventos/Testimonios'
import Contacto from '@/components/floreria-eventos/Contacto'
import Navbar from '@/components/floreria-eventos/Navbar'
import Footer from '@/components/floreria-eventos/Footer'

export default function FloreriaEventosPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Servicios />
      <TiposEventos />
      <Galeria />
      <Testimonios />
      <Contacto />
      <Footer />
    </main>
  )
}

