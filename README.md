# Landing Pages Showcase - Elotes Premium

Showcase de landing pages optimizadas para conversión con múltiples diseños y estilos.

## 🚀 Características

- ✨ **Página Principal**: Explica por qué nuestras landing pages convierten
- 🎨 **4 Diseños Diferentes**: Clásico, Minimalista, Vibrante y Premium
- 📱 Totalmente responsive
- 🎯 Optimizado para conversión
- ⚡ Rendimiento optimizado
- 🔍 SEO optimizado

## 🎨 Diseños Disponibles

1. **Clásico Elegante** (`/disenos/elotes-1`)
   - Diseño sofisticado y atemporal
   - Colores cálidos y profesionales
   - Perfecto para transmitir calidad

2. **Moderno Minimalista** (`/disenos/elotes-2`)
   - Estilo limpio y contemporáneo
   - Enfoque en contenido y usabilidad
   - Diseño monocromático elegante

3. **Vibrante Colorido** (`/disenos/elotes-3`)
   - Diseño lleno de energía y color
   - Ideal para marcas jóvenes y dinámicas
   - Uso de gradientes y colores brillantes

4. **Premium Lujo** (`/disenos/elotes-4`)
   - Estética de alta gama
   - Detalles refinados y exclusivos
   - Paleta negra y dorada

## 🛠️ Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **Lucide React** - Iconos modernos

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 🌐 Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente Next.js
3. El despliegue se realizará automáticamente

O usando Vercel CLI:

```bash
npm i -g vercel
cd elotes
vercel
```

## 📝 Estructura del Proyecto

```
elotes/
├── app/
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Página principal (showcase)
│   ├── diseños/
│   │   ├── page.tsx            # Galería de diseños
│   │   ├── elotes-1/           # Diseño Clásico Elegante
│   │   ├── elotes-2/           # Diseño Moderno Minimalista
│   │   ├── elotes-3/           # Diseño Vibrante Colorido
│   │   └── elotes-4/           # Diseño Premium Lujo
│   └── globals.css             # Estilos globales
├── components/
│   ├── elotes-1/               # Componentes diseño 1
│   ├── elotes-2/               # Componentes diseño 2
│   ├── elotes-3/               # Componentes diseño 3
│   └── elotes-4/               # Componentes diseño 4
└── ...
```

## 🎯 Navegación

- `/` - Página principal explicando el valor
- `/disenos` - Galería de todos los diseños disponibles
- `/disenos/elotes-1` - Diseño Clásico Elegante
- `/disenos/elotes-2` - Diseño Moderno Minimalista
- `/disenos/elotes-3` - Diseño Vibrante Colorido
- `/disenos/elotes-4` - Diseño Premium Lujo

## 🎨 Personalización

Cada diseño tiene su propia carpeta de componentes y puede ser personalizado independientemente. Los colores y estilos están definidos en cada componente usando Tailwind CSS.

## 📧 Contacto

Para más información sobre los diseños o solicitar un diseño personalizado, utiliza los formularios de contacto en cada landing page.
