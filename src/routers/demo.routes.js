// Rutas exclusivas del modo demo: generan las imágenes de productos y
// categorías como SVG, para no depender de Cloudinary ni de internet.
const { Router } = require('express')
const store = require('../demo/store')

const router = Router()

// Paleta suave, coherente con una tienda de belleza
const palettes = [
    ['#f7d6e0', '#c98da8'],
    ['#e0d9f7', '#9d8ec9'],
    ['#d6eef7', '#8dbac9'],
    ['#f7ead6', '#c9a98d'],
    ['#dcf7d6', '#93c98d']
]

// Escapar texto para incrustarlo en el SVG sin romper el marcado
const escape = (text) => String(text).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
}[char]))

// Partir el título en líneas para que quepa en la imagen
const wrap = (text, maxChars) => {
    const lines = []
    let line = ''
    for (const word of String(text).split(' ')) {
        if ((line + ' ' + word).trim().length > maxChars && line) {
            lines.push(line.trim())
            line = word
        } else {
            line = (line + ' ' + word).trim()
        }
    }
    if (line) lines.push(line)
    return lines.slice(0, 3)
}

const buildSvg = (label, seed) => {
    const [light, dark] = palettes[seed % palettes.length]
    const lines = wrap(label, 18)
    // Centrar verticalmente el bloque de texto
    const startY = 300 - ((lines.length - 1) * 26)
    const text = lines.map((line, i) =>
        `<text x="400" y="${startY + i * 52}" text-anchor="middle" font-family="Montserrat, Segoe UI, sans-serif" font-size="42" font-weight="700" fill="#ffffff">${escape(line)}</text>`
    ).join('')

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img" aria-label="${escape(label)}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${light}"/>
      <stop offset="100%" stop-color="${dark}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <circle cx="660" cy="140" r="90" fill="#ffffff" opacity="0.18"/>
  <circle cx="130" cy="480" r="130" fill="#ffffff" opacity="0.12"/>
  ${text}
  <text x="400" y="540" text-anchor="middle" font-family="Lato, Segoe UI, sans-serif" font-size="20" letter-spacing="4" fill="#ffffff" opacity="0.75">IMAGEN DEMO</text>
</svg>`
}

router.get('/demo/img/:slug.svg', (req, res) => {
    const { slug } = req.params
    const products = store.getProducts()
    const categories = store.getCategories()
    const product = products.find(p => p._id === slug)
    const category = categories.find(c => c._id === slug)
    const item = product || category

    if (!item) return res.status(404).send('Imagen no encontrada')

    // El índice da un color estable a cada producto
    const seed = product
        ? products.indexOf(product)
        : categories.indexOf(category)

    res.type('image/svg+xml')
    res.send(buildSvg(product ? product.title : category.name, seed))
})

module.exports = router
