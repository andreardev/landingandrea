import Hero from '@/components/rolex-lanzamiento/Hero'
import Journey from '@/components/rolex-lanzamiento/Journey'
import Innovation from '@/components/rolex-lanzamiento/Innovation'
import Experience from '@/components/rolex-lanzamiento/Experience'
import Numbers from '@/components/rolex-lanzamiento/Numbers'
import Vision from '@/components/rolex-lanzamiento/Vision'
import CallToAction from '@/components/rolex-lanzamiento/CallToAction'
import Navbar from '@/components/rolex-lanzamiento/Navbar'
import Footer from '@/components/rolex-lanzamiento/Footer'
import SmoothScroll from '@/components/rolex-lanzamiento/SmoothScroll'

export default function RolexLanzamientoPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <SmoothScroll>
        <Navbar />
        <Hero />
        <Journey />
        <Innovation />
        <Experience />
        <Numbers />
        <Vision />
        <CallToAction />
        <Footer />
      </SmoothScroll>
    </main>
  )
}

