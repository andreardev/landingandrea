import Hero from '@/components/elotes-1/Hero'
import Servicios from '@/components/elotes-1/Servicios'
import Galeria from '@/components/elotes-1/Galeria'
import Testimonios from '@/components/elotes-1/Testimonios'
import Contacto from '@/components/elotes-1/Contacto'
import Navbar from '@/components/elotes-1/Navbar'
import Footer from '@/components/elotes-1/Footer'

export default function Elotes1Page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Servicios />
      <Galeria />
      <Testimonios />
      <Contacto />
      <Footer />
    </main>
  )
}

