import Hero from '@/components/maquillaje-peinado/Hero'
import Servicios from '@/components/maquillaje-peinado/Servicios'
import Portafolio from '@/components/maquillaje-peinado/Portafolio'
import TiposEventos from '@/components/maquillaje-peinado/TiposEventos'
import Testimonios from '@/components/maquillaje-peinado/Testimonios'
import Contacto from '@/components/maquillaje-peinado/Contacto'
import Navbar from '@/components/maquillaje-peinado/Navbar'
import Footer from '@/components/maquillaje-peinado/Footer'

export default function MaquillajePeinadoPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Servicios />
      <Portafolio />
      <TiposEventos />
      <Testimonios />
      <Contacto />
      <Footer />
    </main>
  )
}

