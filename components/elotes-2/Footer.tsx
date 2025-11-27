export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">ELOTES</h3>
          <p className="text-gray-400 text-sm mb-4">
            © {new Date().getFullYear()} Elotes Premium. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

