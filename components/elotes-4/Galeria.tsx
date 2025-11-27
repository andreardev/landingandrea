'use client'

const imagenes = [
  'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
]

export default function Galeria() {
  return (
    <section id="galeria" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 text-sm font-bold tracking-widest mb-6">
            GALERÍA
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight">
            Nuestro Trabajo
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {imagenes.map((url, index) => (
            <div key={index} className="aspect-square bg-gray-900 border border-yellow-500/20 overflow-hidden hover:border-yellow-500/50 transition-all group">
              <img
                src={url}
                alt={`Imagen ${index + 1}`}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

