export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl font-black mb-4">🌽 ELOTES PREMIUM</h3>
        <p className="text-white/90 font-bold">
          © {new Date().getFullYear()} Elotes Premium. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

