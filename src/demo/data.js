// Datos de ejemplo para la demo (no tocan la base de datos).
// Las imágenes se generan como SVG desde /demo/img/:slug.svg para que la demo
// funcione sin internet y sin Cloudinary.

const categories = [
    { _id: 'cat-facial', name: 'Cuidado Facial', imageUrl: '/demo/img/cat-facial.svg' },
    { _id: 'cat-capilar', name: 'Cuidado Capilar', imageUrl: '/demo/img/cat-capilar.svg' },
    { _id: 'cat-maquillaje', name: 'Maquillaje', imageUrl: '/demo/img/cat-maquillaje.svg' },
    { _id: 'cat-bienestar', name: 'Bienestar', imageUrl: '/demo/img/cat-bienestar.svg' }
]

const products = [
    {
        _id: 'prod-001',
        title: 'Serum Vitamina C',
        description: 'Serum facial concentrado al 15% que ilumina, unifica el tono y reduce manchas. Para todo tipo de piel.',
        category: 'Cuidado Facial',
        price: 24.90,
        user: 'demo',
        image: { public_id: 'demo-001', secure_url: '/demo/img/prod-001.svg' }
    },
    {
        _id: 'prod-002',
        title: 'Crema Hidratante Noche',
        description: 'Hidratación profunda con ácido hialurónico y ceramidas. Repara la barrera cutánea mientras duermes.',
        category: 'Cuidado Facial',
        price: 32.50,
        user: 'demo',
        image: { public_id: 'demo-002', secure_url: '/demo/img/prod-002.svg' }
    },
    {
        _id: 'prod-003',
        title: 'Protector Solar SPF 50',
        description: 'Textura ligera, acabado mate y sin residuo blanco. Protección de amplio espectro UVA/UVB.',
        category: 'Cuidado Facial',
        price: 19.90,
        user: 'demo',
        image: { public_id: 'demo-003', secure_url: '/demo/img/prod-003.svg' }
    },
    {
        _id: 'prod-004',
        title: 'Shampoo Fortificante',
        description: 'Con biotina y keratina. Reduce la caída y aporta cuerpo desde la primera aplicación. 400 ml.',
        category: 'Cuidado Capilar',
        price: 16.75,
        user: 'demo',
        image: { public_id: 'demo-004', secure_url: '/demo/img/prod-004.svg' }
    },
    {
        _id: 'prod-005',
        title: 'Mascarilla Capilar Reparadora',
        description: 'Tratamiento intensivo con aceite de argán para cabello teñido o dañado por el calor. 250 ml.',
        category: 'Cuidado Capilar',
        price: 21.00,
        user: 'demo',
        image: { public_id: 'demo-005', secure_url: '/demo/img/prod-005.svg' }
    },
    {
        _id: 'prod-006',
        title: 'Base Líquida Cobertura Media',
        description: 'Acabado natural de larga duración, 12 horas sin transferencia. Disponible en 8 tonos.',
        category: 'Maquillaje',
        price: 28.40,
        user: 'demo',
        image: { public_id: 'demo-006', secure_url: '/demo/img/prod-006.svg' }
    },
    {
        _id: 'prod-007',
        title: 'Paleta de Sombras Nude',
        description: '12 tonos mate y satinados altamente pigmentados. Fórmula sedosa y fácil de difuminar.',
        category: 'Maquillaje',
        price: 34.90,
        user: 'demo',
        image: { public_id: 'demo-007', secure_url: '/demo/img/prod-007.svg' }
    },
    {
        _id: 'prod-008',
        title: 'Labial Hidratante Mate',
        description: 'Color intenso con manteca de karité. Confort todo el día sin resecar los labios.',
        category: 'Maquillaje',
        price: 12.90,
        user: 'demo',
        image: { public_id: 'demo-008', secure_url: '/demo/img/prod-008.svg' }
    },
    {
        _id: 'prod-009',
        title: 'Colágeno Hidrolizado',
        description: 'Suplemento en polvo sabor frutos rojos con vitamina C y magnesio. 30 porciones.',
        category: 'Bienestar',
        price: 38.00,
        user: 'demo',
        image: { public_id: 'demo-009', secure_url: '/demo/img/prod-009.svg' }
    },
    {
        _id: 'prod-010',
        title: 'Aceite Esencial de Lavanda',
        description: 'Aceite puro para aromaterapia y masaje relajante. Favorece el descanso nocturno. 30 ml.',
        category: 'Bienestar',
        price: 14.50,
        user: 'demo',
        image: { public_id: 'demo-010', secure_url: '/demo/img/prod-010.svg' }
    }
]

module.exports = { categories, products }
