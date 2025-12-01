import Hero from '@/components/reggaeton-lanzamiento/Hero'
import Tracklist from '@/components/reggaeton-lanzamiento/Tracklist'
import Video from '@/components/reggaeton-lanzamiento/Video'
import Merch from '@/components/reggaeton-lanzamiento/Merch'
import PreOrder from '@/components/reggaeton-lanzamiento/PreOrder'
import Social from '@/components/reggaeton-lanzamiento/Social'
import Navbar from '@/components/reggaeton-lanzamiento/Navbar'
import Footer from '@/components/reggaeton-lanzamiento/Footer'

export default function ReggaetonLanzamientoPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <Hero />
      <Tracklist />
      <Video />
      <Merch />
      <PreOrder />
      <Social />
      <Footer />
    </main>
  )
}

