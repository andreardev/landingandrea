export default function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-500/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-display font-bold text-yellow-500 mb-4 tracking-wider">
            ELOTES PREMIUM
          </h3>
          <p className="text-gray-400 text-sm tracking-wide">
            © {new Date().getFullYear()} Elotes Premium. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

