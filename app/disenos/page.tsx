import Link from 'next/link'
import { ArrowRight, Eye, Palette, Home, Sparkles } from 'lucide-react'

const diseños = [
  {
    id: 'elotes-1',
    nombre: 'Clásico Elegante',
    descripcion: 'Diseño sofisticado y atemporal, perfecto para transmitir calidad y profesionalismo.',
    caracteristicas: ['Elegante', 'Profesional', 'Clásico'],
    color: 'from-blue-500 to-indigo-600',
    imagen: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80',
    preview: '/disenos/elotes-1',
  },
  {
    id: 'elotes-2',
    nombre: 'Moderno Minimalista',
    descripcion: 'Estilo limpio y contemporáneo que prioriza el contenido y la usabilidad.',
    caracteristicas: ['Minimalista', 'Moderno', 'Limpio'],
    color: 'from-gray-700 to-gray-900',
    imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    preview: '/disenos/elotes-2',
  },
  {
    id: 'elotes-3',
    nombre: 'Vibrante Colorido',
    descripcion: 'Diseño lleno de energía y color, ideal para marcas jóvenes y dinámicas.',
    caracteristicas: ['Vibrante', 'Colorido', 'Energético'],
    color: 'from-pink-500 to-purple-600',
    imagen: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    preview: '/disenos/elotes-3',
  },
  {
    id: 'elotes-4',
    nombre: 'Premium Lujo',
    descripcion: 'Estética de alta gama con detalles refinados para marcas exclusivas.',
    caracteristicas: ['Premium', 'Lujo', 'Exclusivo'],
    color: 'from-amber-600 to-yellow-700',
    imagen: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    preview: '/disenos/elotes-4',
  },
  {
    id: 'rolex-lanzamiento',
    nombre: 'Rolex Lanzamiento',
    descripcion: 'Landing page épica con efectos 3D, animaciones avanzadas y experiencia inmersiva para lanzamiento de producto premium.',
    caracteristicas: ['3D', 'Animaciones', 'Premium', 'Inmersivo'],
    color: 'from-gold-500 to-yellow-600',
    imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    preview: '/disenos/rolex-lanzamiento',
  },
  {
    id: 'reggaeton-lanzamiento',
    nombre: 'Reggaeton Lanzamiento',
    descripcion: 'Landing page vibrante y energética para el lanzamiento de un disco de reggaeton con animaciones musicales, tracklist interactivo y merchandising.',
    caracteristicas: ['Vibrante', 'Musical', 'Animado', 'Moderno'],
    color: 'from-purple-500 to-pink-600',
    imagen: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    preview: '/disenos/reggaeton-lanzamiento',
  },
  {
    id: 'wedding-planner',
    nombre: 'Wedding Planner',
    descripcion: 'Landing page elegante y romántica para planificadores de bodas con diseño sofisticado, galería de eventos y proceso de trabajo detallado.',
    caracteristicas: ['Elegante', 'Romántico', 'Profesional', 'Sofisticado'],
    color: 'from-rose-500 to-pink-600',
    imagen: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    preview: '/disenos/wedding-planner',
  },
  {
    id: 'floreria-eventos',
    nombre: 'Floristería Eventos',
    descripcion: 'Landing page elegante y natural para floristería especializada en decoración de eventos sociales con galería de trabajos y tipos de eventos.',
    caracteristicas: ['Natural', 'Elegante', 'Floral', 'Profesional'],
    color: 'from-green-500 to-emerald-600',
    imagen: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    preview: '/disenos/floreria-eventos',
  },
  {
    id: 'salon-eventos',
    nombre: 'Salón de Eventos',
    descripcion: 'Landing page elegante y profesional para salón de eventos con información de instalaciones, capacidad, servicios incluidos y galería.',
    caracteristicas: ['Elegante', 'Profesional', 'Premium', 'Completo'],
    color: 'from-amber-500 to-yellow-600',
    imagen: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
    preview: '/disenos/salon-eventos',
  },
  {
    id: 'maquillaje-peinado',
    nombre: 'Maquillaje y Peinado',
    descripcion: 'Landing page elegante y sofisticada para negocio de maquillaje y peinado profesional con portafolio, servicios y tipos de eventos.',
    caracteristicas: ['Elegante', 'Belleza', 'Profesional', 'Sofisticado'],
    color: 'from-pink-500 to-rose-600',
    imagen: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
    preview: '/disenos/maquillaje-peinado',
  },
  {
    id: 'fotografo-eventos',
    nombre: 'Fotógrafo de Eventos',
    descripcion: 'Landing page moderna y espectacular para fotógrafo de eventos sociales con galería interactiva, portafolio visual, servicios y proceso de trabajo.',
    caracteristicas: ['Moderno', 'Visual', 'Interactivo', 'Espectacular'],
    color: 'from-purple-500 to-pink-600',
    imagen: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    preview: '/disenos/fotografo-eventos',
  },
  {
    id: 'bola-de-cristal',
    nombre: 'Bola de Cristal',
    descripcion: 'Landing page interactiva y mágica de bola de la fortuna donde los usuarios pueden hacer preguntas y recibir respuestas aleatorias que invitan a reflexionar.',
    caracteristicas: ['Interactivo', 'Mágico', 'Divertido', 'Reflexivo'],
    color: 'from-indigo-500 to-purple-600',
    imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
    preview: '/disenos/bola-de-cristal',
  },
  {
    id: 'espejo-magico',
    nombre: 'El Espejo Mágico',
    descripcion: 'Landing page disruptiva para tienda de moda con espejo mágico que analiza el estilo del usuario y recomienda prendas personalizadas. Incluye efectos de espejo roto y recomendaciones en tiempo real.',
    caracteristicas: ['Interactivo', 'AR Simulado', 'Personalizado', 'Innovador'],
    color: 'from-purple-500 to-pink-600',
    imagen: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    preview: '/disenos/espejo-magico',
  },
  {
    id: 'reloj-arena-amor',
    nombre: 'El Reloj de Arena del Amor',
    descripcion: 'Landing page romántica y elegante para eventos y bodas con reloj de arena animado que cuenta hacia el evento, partículas doradas formando corazones y efectos visuales románticos.',
    caracteristicas: ['Romántico', 'Elegante', 'Interactivo', 'Animado'],
    color: 'from-rose-500 to-pink-600',
    imagen: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    preview: '/disenos/reloj-arena-amor',
  },
  {
    id: 'laberinto-mente',
    nombre: 'El Laberinto de la Mente',
    descripcion: 'Landing page interactiva para psicólogo/terapia con navegación tipo laberinto 3D donde cada decisión revela información sobre servicios. Incluye efectos de profundidad y experiencia inmersiva.',
    caracteristicas: ['Interactivo', '3D', 'Inmersivo', 'Gamificado'],
    color: 'from-purple-500 to-indigo-600',
    imagen: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    preview: '/disenos/laberinto-mente',
  },
  {
    id: 'jardin-serenidad',
    nombre: 'El Jardín de la Serenidad',
    descripcion: 'Landing page relajante para spa/belleza con parallax de plantas que crecen al hacer scroll, efectos de agua animados, elementos naturales interactivos y ambiente sereno.',
    caracteristicas: ['Relajante', 'Parallax', 'Natural', 'Interactivo'],
    color: 'from-green-500 to-emerald-600',
    imagen: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    preview: '/disenos/jardin-serenidad',
  },
  {
    id: 'matriz-codigo',
    nombre: 'La Matriz del Código',
    descripcion: 'Landing page disruptiva para tecnología/software con lluvia de código tipo Matrix, terminal interactiva donde el usuario puede "hackear" para revelar información y efectos de terminal realistas.',
    caracteristicas: ['Interactivo', 'Matrix', 'Terminal', 'Gamificado'],
    color: 'from-green-500 to-emerald-600',
    imagen: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    preview: '/disenos/matriz-codigo',
  },
  {
    id: 'salon-gamer',
    nombre: 'Salón de Fiestas Gamer',
    descripcion: 'Landing page única que combina Tetris y Pac-Man para un salón de fiestas gamer. Juego interactivo donde el usuario controla a Pac-Man mientras bloques de Tetris caen, revelando información sobre servicios.',
    caracteristicas: ['Gaming', 'Interactivo', 'Tetris', 'Pac-Man'],
    color: 'from-purple-500 to-pink-600',
    imagen: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80',
    preview: '/disenos/salon-gamer',
  },
  {
    id: 'chef-virtual',
    nombre: 'El Chef Virtual',
    descripcion: 'Landing page interactiva tipo juego para restaurante donde el usuario "cocina" eligiendo ingredientes. Al final muestra el plato recomendado con descuento especial. Incluye animaciones de ingredientes flotando.',
    caracteristicas: ['Interactivo', 'Gamificado', 'Personalizado', 'Divertido'],
    color: 'from-orange-500 to-red-600',
    imagen: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
    preview: '/disenos/chef-virtual',
  },
  {
    id: 'caleidoscopio-momentos',
    nombre: 'El Caleidoscopio de Momentos',
    descripcion: 'Landing page única para fotografía con galería tipo caleidoscopio que gira mostrando diferentes momentos. Incluye efectos de luz y reflejos, interactividad con zoom mágico y patrones simétricos.',
    caracteristicas: ['Interactivo', 'Visual', 'Caleidoscopio', 'Galería'],
    color: 'from-purple-500 to-pink-600',
    imagen: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&q=80',
    preview: '/disenos/caleidoscopio-momentos',
  },
  {
    id: 'ola-servicio',
    nombre: 'La Ola del Servicio',
    descripcion: 'Landing page disruptiva para negocio de pipas de agua potable con mapa interactivo donde el usuario selecciona su zona y visualiza el flujo de agua hacia ella. Incluye efectos de ondas animadas, gotas flotantes y sistema de solicitud de servicio.',
    caracteristicas: ['Interactivo', 'Mapa', 'Efectos Agua', 'Visualización'],
    color: 'from-blue-500 to-cyan-600',
    imagen: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    preview: '/disenos/ola-servicio',
  },
  {
    id: 'espejo-barberia',
    nombre: 'El Espejo de la Barbería',
    descripcion: 'Landing page disruptiva para barbería que comienza como un espejo simple. Al activar la cámara, el usuario se ve reflejado, toma una foto y el espejo se rompe revelando información de la barbería y botón para agendar cita. Experiencia interactiva única.',
    caracteristicas: ['Interactivo', 'Cámara', 'Efectos', 'Gamificado'],
    color: 'from-gray-700 to-amber-600',
    imagen: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80',
    preview: '/disenos/espejo-barberia',
  },
  {
    id: 'trance-hipnotico',
    nombre: 'Trance Hipnótico',
    descripcion: 'Landing page disruptiva para hipnotizador con experiencia interactiva única. Espiral hipnótica girando en el centro, ojos que siguen el cursor del mouse, partículas que reaccionan al movimiento. Al hacer click en la espiral, el usuario "entra en trance" y se revelan las próximas fechas de eventos.',
    caracteristicas: ['Interactivo', 'Hipnótico', 'Visual', 'Gamificado'],
    color: 'from-purple-500 to-indigo-600',
    imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
    preview: '/disenos/trance-hipnotico',
  },
  {
    id: 'invitacion-boda',
    nombre: 'Invitación Web de Boda',
    descripcion: 'Invitación web disruptiva e interactiva para boda con efecto de carta que se desdobla. Incluye confeti animado, corazones flotantes, navegación por secciones (historia, fecha, ubicación, RSVP), cuenta regresiva animada, formulario de confirmación y diseño elegante y romántico.',
    caracteristicas: ['Interactivo', 'Romántico', 'Carta', 'RSVP'],
    color: 'from-rose-400 to-pink-500',
    imagen: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    preview: '/disenos/invitacion-boda',
  },
  {
    id: 'curso-landing-ia',
    nombre: 'Curso Landing Page con IA',
    descripcion: 'Landing page disruptiva para curso en línea sobre cómo crear landing pages usando Cursor, GitHub y Vercel. Incluye navegación interactiva por 9 pasos, barra de progreso sticky, partículas animadas, timer de 60 minutos, código de ejemplo copiable, diseño moderno con gradientes púrpura/rosa y experiencia inmersiva.',
    caracteristicas: ['Interactivo', 'Curso', 'Progreso', 'Animado'],
    color: 'from-purple-600 to-pink-600',
    imagen: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    preview: '/disenos/curso-landing-ia',
  },
  {
    id: 'gta-vi-lanzamiento',
    nombre: 'GTA VI - Lanzamiento',
    descripcion: 'Landing page disruptiva para el lanzamiento de GTA VI con estética urbana y cyberpunk. Incluye cuenta regresiva en tiempo real, 100 partículas de neón animadas, modal de trailer, sección de características épicas, mapa interactivo de Vice City, protagonistas del juego, opciones de pre-orden con 3 ediciones, diseño oscuro con gradientes neón (cyan, pink, yellow) y efectos visuales tipo poster de película.',
    caracteristicas: ['Interactivo', 'Gaming', 'Neón', 'Cuenta Regresiva'],
    color: 'from-cyan-500 to-pink-500',
    imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    preview: '/disenos/gta-vi-lanzamiento',
  },
]

export default function DiseñosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header - Mobile First */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-12 sm:py-16 lg:py-20 safe-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 sm:mb-8 transition-colors touch-target text-sm sm:text-base"
          >
            <Home size={18} className="sm:w-5 sm:h-5" />
            <span>Volver al inicio</span>
          </Link>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6">
              <Sparkles size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="text-xs sm:text-sm font-medium">Landing Pages Disruptivas</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-3 sm:mb-4 px-4">
              Experiencias que Rompen el Molde
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-primary-100 max-w-3xl mx-auto px-4">
              Olvídate de las landing pages aburridas. Aquí encontrarás experiencias interactivas, gamificadas e innovadoras que capturan la atención y convierten visitantes en clientes. Cada diseño es único, disruptivo y diseñado para generar resultados extraordinarios.
            </p>
          </div>
        </div>
      </section>

      {/* Diseños Grid - Mobile First */}
      <section className="py-8 sm:py-12 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {diseños.map((diseño, index) => (
              <div
                key={diseño.id}
                className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 active:scale-[0.98]"
              >
                {/* Preview Image */}
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${diseño.color} opacity-90 transition-opacity group-hover:opacity-95`}></div>
                  <img
                    src={diseño.imagen}
                    alt={diseño.nombre}
                    className="w-full h-full object-cover mix-blend-overlay transition-transform group-hover:scale-105"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                      <Sparkles size={32} className="mx-auto mb-2 sm:mb-3 opacity-80" />
                      <h3 className="text-2xl sm:text-3xl font-display font-bold">{diseño.nombre}</h3>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                    {diseño.descripcion}
                  </p>
                  
                  {/* Características */}
                  <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
                    {diseño.caracteristicas.map((caracteristica, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs sm:text-sm font-medium"
                      >
                        {caracteristica}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={diseño.preview}
                    className="touch-target inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all w-full group-hover:shadow-lg active:scale-95"
                  >
                    <Eye size={18} className="sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Ver Diseño Completo</span>
                    <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile First */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white safe-bottom">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-3 sm:mb-4">
            ¿Listo para tu Landing Page Disruptiva?
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
            Podemos crear una experiencia única e interactiva específicamente diseñada para tu negocio. Rompamos el molde juntos.
          </p>
          <a
            href="#contacto"
            className="touch-target inline-block bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            Solicitar Diseño Personalizado
          </a>
        </div>
      </section>
    </main>
  )
}
