import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 safe-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand - Mobile First */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 sm:mb-4">
              Elotes Premium
            </h3>
            <p className="mb-4 sm:mb-6 max-w-md text-sm sm:text-base leading-relaxed">
              Transformamos tus celebraciones con elotes gourmet de la más alta calidad.
              Hacemos que cada evento sea inolvidable.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="#"
                className="touch-target bg-gray-800 hover:bg-gray-700 active:bg-gray-600 p-2.5 sm:p-3 rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="touch-target bg-gray-800 hover:bg-gray-700 active:bg-gray-600 p-2.5 sm:p-3 rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="touch-target bg-gray-800 hover:bg-gray-700 active:bg-gray-600 p-2.5 sm:p-3 rounded-lg transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links - Mobile First */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-sm sm:text-base hover:text-primary-400 transition-colors touch-target inline-block">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-sm sm:text-base hover:text-primary-400 transition-colors touch-target inline-block">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#galeria" className="text-sm sm:text-base hover:text-primary-400 transition-colors touch-target inline-block">
                  Galería
                </a>
              </li>
              <li>
                <a href="#testimonios" className="text-sm sm:text-base hover:text-primary-400 transition-colors touch-target inline-block">
                  Testimonios
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-sm sm:text-base hover:text-primary-400 transition-colors touch-target inline-block">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info - Mobile First */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contacto</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2 sm:gap-3">
                <Phone size={16} className="mt-0.5 sm:mt-1 text-primary-400 flex-shrink-0 sm:w-[18px] sm:h-[18px]" />
                <a href="tel:+521234567890" className="text-sm sm:text-base hover:text-primary-400 transition-colors touch-target break-all">
                  +52 (123) 456-7890
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Mail size={16} className="mt-0.5 sm:mt-1 text-primary-400 flex-shrink-0 sm:w-[18px] sm:h-[18px]" />
                <a href="mailto:contacto@elotespremium.com" className="text-sm sm:text-base hover:text-primary-400 transition-colors touch-target break-all">
                  contacto@elotespremium.com
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin size={16} className="mt-0.5 sm:mt-1 text-primary-400 flex-shrink-0 sm:w-[18px] sm:h-[18px]" />
                <span className="text-sm sm:text-base">Ciudad, Estado</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Mobile First */}
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm">
          <p>
            © {new Date().getFullYear()} Elotes Premium. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
