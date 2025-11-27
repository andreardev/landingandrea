import Hero from '@/components/elotes-4/Hero'
import Servicios from '@/components/elotes-4/Servicios'
import Galeria from '@/components/elotes-4/Galeria'
import Testimonios from '@/components/elotes-4/Testimonios'
import Contacto from '@/components/elotes-4/Contacto'
import Navbar from '@/components/elotes-4/Navbar'
import Footer from '@/components/elotes-4/Footer'

export default function Elotes4Page() {
  return (
    <main className="min-h-screen bg-black">
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

