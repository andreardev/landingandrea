import Navbar from '@/components/fotografo-eventos/Navbar'
import Hero from '@/components/fotografo-eventos/Hero'
import Servicios from '@/components/fotografo-eventos/Servicios'
import Portafolio from '@/components/fotografo-eventos/Portafolio'
import Proceso from '@/components/fotografo-eventos/Proceso'
import Testimonios from '@/components/fotografo-eventos/Testimonios'
import Contacto from '@/components/fotografo-eventos/Contacto'
import Footer from '@/components/fotografo-eventos/Footer'

export const metadata = {
  title: 'Fotografía de Eventos Sociales | FotoStudio',
  description: 'Capturamos tus momentos especiales con profesionalismo y creatividad artística. Bodas, XV años, eventos corporativos y más.',
}

export default function FotografoEventosPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Servicios />
      <Portafolio />
      <Proceso />
      <Testimonios />
      <Contacto />
      <Footer />
    </main>
  )
}

