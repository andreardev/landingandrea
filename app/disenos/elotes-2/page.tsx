import Hero from '@/components/elotes-2/Hero'
import Servicios from '@/components/elotes-2/Servicios'
import Galeria from '@/components/elotes-2/Galeria'
import Testimonios from '@/components/elotes-2/Testimonios'
import Contacto from '@/components/elotes-2/Contacto'
import Navbar from '@/components/elotes-2/Navbar'
import Footer from '@/components/elotes-2/Footer'

export default function Elotes2Page() {
  return (
    <main className="min-h-screen bg-white">
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

