import Link from 'next/link'
import { ArrowRight, Zap, Target, TrendingUp, Smartphone, Palette, Users, Award, CheckCircle2 } from 'lucide-react'

export default function Home() {
  const beneficios = [
    {
      icon: Target,
      title: 'Diseño Enfocado en Conversión',
      description: 'Cada elemento está estratégicamente colocado para guiar a tus visitantes hacia la acción que deseas.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      title: 'Optimizado para Resultados',
      description: 'Utilizamos las mejores prácticas de UX/UI y psicología del consumidor para maximizar conversiones.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Smartphone,
      title: '100% Responsive',
      description: 'Perfecto en todos los dispositivos. Más del 60% del tráfico viene de móviles, y nosotros lo optimizamos.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Carga Ultra Rápida',
      description: 'Velocidad de carga optimizada. Cada segundo cuenta cuando se trata de retener visitantes.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Palette,
      title: 'Diseños Modernos y Elegantes',
      description: 'Estética profesional que refleja la calidad de tu negocio y genera confianza instantánea.',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Users,
      title: 'Testado y Probado',
      description: 'Cada diseño está basado en datos reales y patrones que funcionan en la industria.',
      color: 'from-teal-500 to-cyan-500',
    },
  ]

  const estadisticas = [
    { numero: '300%', texto: 'Aumento promedio en conversiones', icon: TrendingUp },
    { numero: '2.3s', texto: 'Tiempo promedio de carga', icon: Zap },
    { numero: '95%', texto: 'Satisfacción de clientes', icon: Users },
    { numero: '50+', texto: 'Landing pages exitosas', icon: Award },
  ]

  const features = [
    'Mobile First Design',
    'Optimización SEO',
    'Analytics Integrado',
    'Formularios Inteligentes',
    'Velocidad Garantizada',
    'Soporte 24/7',
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Mobile First */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden safe-top">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-12 sm:py-16 lg:py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6 animate-fade-in">
            <Award size={16} className="text-yellow-300 sm:w-[18px] sm:h-[18px]" />
            <span className="text-xs sm:text-sm font-medium">Landing Pages que Convierten</span>
          </div>

          {/* Heading - Mobile Optimized */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-4 sm:mb-6 text-balance leading-[1.1] px-2 animate-fade-in-up">
            Landing Pages que
            <br />
            <span className="text-primary-200">Realmente Convierten</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-100 max-w-3xl mx-auto text-balance px-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Diseñamos landing pages estratégicas que transforman visitantes en clientes.
            Cada elemento está pensado para maximizar tus conversiones y hacer crecer tu negocio.
          </p>

          {/* CTA Buttons - Mobile First */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/disenos"
              className="touch-target bg-white hover:bg-gray-50 active:bg-gray-100 text-primary-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all shadow-2xl hover:shadow-white/50 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Ver Diseños</span>
              <ArrowRight size={20} className="sm:w-5 sm:h-5" />
            </Link>
            <a
              href="#por-que"
              className="touch-target bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all border-2 border-white/30 active:scale-95 flex items-center justify-center"
            >
              Saber Más
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#por-que" className="block touch-target">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/50 rounded-full"></div>
            </div>
          </a>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Quick List - Mobile First */}
      <section className="py-8 sm:py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <CheckCircle2 size={20} className="text-primary-600 mb-2 sm:mb-3" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por Qué Section - Mobile First */}
      <section id="por-que" className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              ¿Por Qué Nuestras Landing Pages Convierten?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              No es solo diseño bonito. Es estrategia, psicología y datos trabajando juntos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {beneficios.map((beneficio, index) => {
              const Icon = beneficio.icon
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-100 active:scale-[0.98]"
                >
                  <div className={`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${beneficio.color} mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} className="text-white sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-2 sm:mb-3">
                    {beneficio.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {beneficio.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Estadísticas Section - Mobile First */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 px-4">
              Resultados que Hablan por Sí Solos
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {estadisticas.map((stat, index) => {
              const StatIcon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 mb-3 sm:mb-4">
                    <StatIcon size={24} className="sm:w-7 sm:h-7" />
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-2 text-shadow">
                    {stat.numero}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base lg:text-lg text-primary-100 px-2">
                    {stat.texto}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile First */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white safe-bottom">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
              ¿Listo para Ver los Diseños?
            </h3>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-primary-100">
              Explora nuestras diferentes variantes y encuentra el estilo perfecto para tu negocio
            </p>
            <Link
              href="/disenos"
              className="touch-target inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-50 active:bg-gray-100 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              <span>Ver Todos los Diseños</span>
              <ArrowRight size={20} className="sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
