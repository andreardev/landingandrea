'use client'

import { useState, useEffect, useRef } from 'react'
import { ChefHat, Utensils, Sparkles, Star, Gift, CheckCircle2, X } from 'lucide-react'

interface Ingrediente {
  id: string
  nombre: string
  icon: string
  categoria: string
  color: string
}

interface Plato {
  nombre: string
  descripcion: string
  precio: string
  precioDescuento: string
  descuento: number
  imagen: string
  ingredientes: string[]
}

export default function ChefVirtualPage() {
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState<string[]>([])
  const [mostrandoPlato, setMostrandoPlato] = useState(false)
  const [platoRecomendado, setPlatoRecomendado] = useState<Plato | null>(null)
  const [cocinando, setCocinando] = useState(false)
  const [ingredientesFlotantes, setIngredientesFlotantes] = useState<Array<{ id: number; x: number; y: number; icon: string; velocidad: number }>>([])

  const ingredientes: Ingrediente[] = [
    { id: 'tomate', nombre: 'Tomate', icon: '🍅', categoria: 'Vegetales', color: 'from-red-500 to-pink-500' },
    { id: 'cebolla', nombre: 'Cebolla', icon: '🧅', categoria: 'Vegetales', color: 'from-yellow-500 to-amber-500' },
    { id: 'ajo', nombre: 'Ajo', icon: '🧄', categoria: 'Vegetales', color: 'from-white to-gray-200' },
    { id: 'pimiento', nombre: 'Pimiento', icon: '🫑', categoria: 'Vegetales', color: 'from-green-500 to-emerald-500' },
    { id: 'pollo', nombre: 'Pollo', icon: '🍗', categoria: 'Proteínas', color: 'from-amber-500 to-orange-500' },
    { id: 'res', nombre: 'Res', icon: '🥩', categoria: 'Proteínas', color: 'from-red-600 to-red-800' },
    { id: 'pescado', nombre: 'Pescado', icon: '🐟', categoria: 'Proteínas', color: 'from-blue-500 to-cyan-500' },
    { id: 'queso', nombre: 'Queso', icon: '🧀', categoria: 'Lácteos', color: 'from-yellow-400 to-yellow-600' },
    { id: 'pasta', nombre: 'Pasta', icon: '🍝', categoria: 'Carbohidratos', color: 'from-amber-300 to-yellow-400' },
    { id: 'arroz', nombre: 'Arroz', icon: '🍚', categoria: 'Carbohidratos', color: 'from-white to-gray-100' },
    { id: 'hierbas', nombre: 'Hierbas', icon: '🌿', categoria: 'Especias', color: 'from-green-400 to-green-600' },
    { id: 'limon', nombre: 'Limón', icon: '🍋', categoria: 'Frutas', color: 'from-yellow-300 to-yellow-500' },
  ]

  const platos: Plato[] = [
    {
      nombre: 'Pasta Carbonara Premium',
      descripcion: 'Pasta cremosa con tocino, queso parmesano y hierbas frescas. Un clásico italiano perfeccionado.',
      precio: '$450',
      precioDescuento: '$360',
      descuento: 20,
      imagen: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80',
      ingredientes: ['pasta', 'queso', 'hierbas', 'ajo'],
    },
    {
      nombre: 'Pollo a la Parrilla con Vegetales',
      descripcion: 'Pechuga de pollo marinada, asada a la parrilla, acompañada de vegetales frescos al vapor.',
      precio: '$380',
      precioDescuento: '$304',
      descuento: 20,
      imagen: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80',
      ingredientes: ['pollo', 'pimiento', 'cebolla', 'tomate'],
    },
    {
      nombre: 'Salmón con Limón y Hierbas',
      descripcion: 'Filete de salmón fresco con salsa de limón, hierbas aromáticas y guarnición de vegetales.',
      precio: '$520',
      precioDescuento: '$416',
      descuento: 20,
      imagen: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80',
      ingredientes: ['pescado', 'limon', 'hierbas', 'pimiento'],
    },
    {
      nombre: 'Risotto de Hongos y Queso',
      descripcion: 'Arroz cremoso estilo italiano con hongos frescos, queso parmesano y hierbas finas.',
      precio: '$420',
      precioDescuento: '$336',
      descuento: 20,
      imagen: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80',
      ingredientes: ['arroz', 'queso', 'hierbas', 'ajo'],
    },
    {
      nombre: 'Tacos de Res con Salsa Especial',
      descripcion: 'Tacos de res premium con cebolla caramelizada, tomate fresco y nuestra salsa secreta.',
      precio: '$350',
      precioDescuento: '$280',
      descuento: 20,
      imagen: 'https://images.unsplash.com/photo-1565299585323-38174c3a5a0a?w=400&q=80',
      ingredientes: ['res', 'cebolla', 'tomate', 'limon'],
    },
  ]

  useEffect(() => {
    // Crear ingredientes flotantes
    const nuevosFlotantes: Array<{ id: number; x: number; y: number; icon: string; velocidad: number }> = []
    for (let i = 0; i < 20; i++) {
      const ingrediente = ingredientes[Math.floor(Math.random() * ingredientes.length)]
      nuevosFlotantes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        icon: ingrediente.icon,
        velocidad: 0.5 + Math.random() * 0.5,
      })
    }
    setIngredientesFlotantes(nuevosFlotantes)

    // Animar ingredientes flotantes
    const intervalo = setInterval(() => {
      setIngredientesFlotantes((prev) =>
        prev.map((ing) => ({
          ...ing,
          y: ing.y >= 100 ? -10 : ing.y + ing.velocidad * 0.1,
          x: ing.x + Math.sin(ing.y * 0.1) * 0.05,
        }))
      )
    }, 50)

    return () => clearInterval(intervalo)
  }, [])

  const toggleIngrediente = (id: string) => {
    if (cocinando || mostrandoPlato) return

    setIngredientesSeleccionados((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id)
      } else if (prev.length < 4) {
        return [...prev, id]
      }
      return prev
    })
  }

  const cocinar = () => {
    if (ingredientesSeleccionados.length === 0) return

    setCocinando(true)
    setMostrandoPlato(false)

    // Simular tiempo de cocción
    setTimeout(() => {
      // Encontrar el plato que mejor coincida con los ingredientes
      const platoEncontrado = platos.reduce((mejor, plato) => {
        const coincidencias = plato.ingredientes.filter((ing) =>
          ingredientesSeleccionados.includes(ing)
        ).length
        const mejorCoincidencias = mejor.ingredientes.filter((ing) =>
          ingredientesSeleccionados.includes(ing)
        ).length

        return coincidencias > mejorCoincidencias ? plato : mejor
      }, platos[0])

      setPlatoRecomendado(platoEncontrado)
      setCocinando(false)
      setMostrandoPlato(true)
    }, 3000)
  }

  const reiniciar = () => {
    setIngredientesSeleccionados([])
    setMostrandoPlato(false)
    setPlatoRecomendado(null)
    setCocinando(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 relative overflow-hidden">
      {/* Ingredientes flotantes de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {ingredientesFlotantes.map((ing) => (
          <div
            key={ing.id}
            className="absolute text-4xl animate-float"
            style={{
              left: `${ing.x}%`,
              top: `${ing.y}%`,
              animationDelay: `${ing.id * 0.2}s`,
              animationDuration: `${3 + ing.velocidad * 2}s`,
              transform: `rotate(${ing.id * 20}deg)`,
            }}
          >
            {ing.icon}
          </div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full mb-4 shadow-lg border border-orange-200">
            <ChefHat size={20} className="text-orange-500" />
            <span className="text-sm sm:text-base font-medium text-orange-700">El Chef Virtual</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-orange-900 mb-4 text-shadow-lg">
            Crea Tu Plato Perfecto
          </h1>
          <p className="text-lg sm:text-xl text-orange-700 max-w-2xl mx-auto">
            Elige tus ingredientes favoritos y descubre tu plato ideal con descuento especial
          </p>
        </div>

        {/* Área de cocina */}
        {!mostrandoPlato && (
          <div className="w-full max-w-6xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Ingredientes disponibles */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-orange-200 mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-orange-900 mb-6 flex items-center gap-2">
                <Utensils size={28} className="text-orange-500" />
                <span>Selecciona hasta 4 ingredientes</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {ingredientes.map((ingrediente) => {
                  const seleccionado = ingredientesSeleccionados.includes(ingrediente.id)
                  return (
                    <button
                      key={ingrediente.id}
                      onClick={() => toggleIngrediente(ingrediente.id)}
                      disabled={cocinando || (!seleccionado && ingredientesSeleccionados.length >= 4)}
                      className={`p-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 border-2 ${
                        seleccionado
                          ? `${ingrediente.color} border-orange-500 shadow-lg`
                          : 'bg-white border-gray-200 hover:border-orange-300'
                      } ${cocinando || (!seleccionado && ingredientesSeleccionados.length >= 4) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="text-5xl mb-2">{ingrediente.icon}</div>
                      <div className={`text-sm font-semibold ${seleccionado ? 'text-white' : 'text-gray-700'}`}>
                        {ingrediente.nombre}
                      </div>
                      {seleccionado && (
                        <CheckCircle2 size={20} className="text-white mx-auto mt-2" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Ingredientes seleccionados */}
            {ingredientesSeleccionados.length > 0 && (
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 shadow-xl mb-6 animate-scale-in">
                <h3 className="text-xl font-bold text-white mb-4">Tu Selección:</h3>
                <div className="flex flex-wrap gap-3">
                  {ingredientesSeleccionados.map((id) => {
                    const ingrediente = ingredientes.find((i) => i.id === id)
                    return (
                      <div
                        key={id}
                        className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2"
                      >
                        <span className="text-2xl">{ingrediente?.icon}</span>
                        <span className="text-white font-semibold">{ingrediente?.nombre}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Botón de cocinar */}
            <div className="text-center">
              <button
                onClick={cocinar}
                disabled={ingredientesSeleccionados.length === 0 || cocinando}
                className="px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xl font-semibold rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 mx-auto"
              >
                {cocinando ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Cocinando...</span>
                  </>
                ) : (
                  <>
                    <ChefHat size={28} />
                    <span>Cocinar Mi Plato</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Plato recomendado */}
        {mostrandoPlato && platoRecomendado && (
          <div className="w-full max-w-4xl animate-scale-in">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-orange-200">
              {/* Badge de descuento */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-xl transform rotate-12">
                <div className="flex items-center gap-2">
                  <Gift size={24} />
                  <span className="text-2xl font-bold">{platoRecomendado.descuento}% OFF</span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Imagen del plato */}
                <div className="relative lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={platoRecomendado.imagen}
                      alt={platoRecomendado.nombre}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </div>

                {/* Información del plato */}
                <div className="lg:w-1/2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-orange-900 mb-2">
                        {platoRecomendado.nombre}
                      </h2>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-gray-500 line-through text-xl">
                          {platoRecomendado.precio}
                        </span>
                        <span className="text-3xl font-bold text-green-600">
                          {platoRecomendado.precioDescuento}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={reiniciar}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
                    >
                      <X size={24} className="text-gray-600" />
                    </button>
                  </div>

                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    {platoRecomendado.descripcion}
                  </p>

                  {/* Ingredientes del plato */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-orange-900 mb-3">Ingredientes incluidos:</h3>
                    <div className="flex flex-wrap gap-2">
                      {platoRecomendado.ingredientes.map((id) => {
                        const ingrediente = ingredientes.find((i) => i.id === id)
                        return (
                          <div
                            key={id}
                            className="bg-orange-100 px-3 py-2 rounded-lg flex items-center gap-2"
                          >
                            <span className="text-xl">{ingrediente?.icon}</span>
                            <span className="text-orange-900 font-medium">{ingrediente?.nombre}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Botón de reserva */}
                  <button className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                    <Star size={24} className="fill-white" />
                    <span>Reservar Este Plato</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Botón para cocinar otro plato */}
            <div className="text-center mt-6">
              <button
                onClick={reiniciar}
                className="px-6 py-3 bg-white/80 hover:bg-white backdrop-blur-sm text-orange-700 font-semibold rounded-xl transition-all border-2 border-orange-200 hover:border-orange-300"
              >
                Cocinar Otro Plato
              </button>
            </div>
          </div>
        )}

        {/* Servicios */}
        {!mostrandoPlato && (
          <div className="mt-16 w-full max-w-6xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-orange-900 mb-8 text-center flex items-center justify-center gap-2">
              <Sparkles size={32} className="text-orange-500" />
              <span>Nuestros Servicios</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-2 border-orange-100">
                <ChefHat size={32} className="text-orange-500 mb-3" />
                <h3 className="text-xl font-bold text-orange-900 mb-2">Chef Profesional</h3>
                <p className="text-gray-600">Cocina gourmet con ingredientes frescos y de calidad</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-2 border-orange-100">
                <Utensils size={32} className="text-orange-500 mb-3" />
                <h3 className="text-xl font-bold text-orange-900 mb-2">Menú Personalizado</h3>
                <p className="text-gray-600">Crea tu plato ideal con nuestros ingredientes premium</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-2 border-orange-100">
                <Gift size={32} className="text-orange-500 mb-3" />
                <h3 className="text-xl font-bold text-orange-900 mb-2">Descuentos Especiales</h3>
                <p className="text-gray-600">Obtén descuentos exclusivos al crear tu plato personalizado</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

