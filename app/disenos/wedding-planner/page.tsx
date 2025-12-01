import Hero from '@/components/wedding-planner/Hero'
import Servicios from '@/components/wedding-planner/Servicios'
import Proceso from '@/components/wedding-planner/Proceso'
import Galeria from '@/components/wedding-planner/Galeria'
import Testimonios from '@/components/wedding-planner/Testimonios'
import Contacto from '@/components/wedding-planner/Contacto'
import Navbar from '@/components/wedding-planner/Navbar'
import Footer from '@/components/wedding-planner/Footer'

export default function WeddingPlannerPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Servicios />
      <Proceso />
      <Galeria />
      <Testimonios />
      <Contacto />
      <Footer />
    </main>
  )
}

