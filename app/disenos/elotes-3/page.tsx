import Hero from '@/components/elotes-3/Hero'
import Servicios from '@/components/elotes-3/Servicios'
import Galeria from '@/components/elotes-3/Galeria'
import Testimonios from '@/components/elotes-3/Testimonios'
import Contacto from '@/components/elotes-3/Contacto'
import Navbar from '@/components/elotes-3/Navbar'
import Footer from '@/components/elotes-3/Footer'

export default function Elotes3Page() {
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

