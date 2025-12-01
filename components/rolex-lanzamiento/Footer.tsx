import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gold-500/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-gold-500 mb-4 tracking-wider">ROLEX</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Más de un siglo perfeccionando la relojería. Cada reloj es una obra maestra,
              cada segundo una promesa de excelencia.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Productos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-gold-500 transition-colors">Relojes</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Colecciones</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Ediciones Limitadas</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Información</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-gold-500 transition-colors">Sobre Rolex</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Garantía</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold-500/20 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Rolex. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

