const Portfolio = require('../models/Portfolio')
const Category = require('../models/Category')
const { isDemo } = require('../demo/mode')
const store = require('../demo/store')


// Método para listar todos los productos
const renderIndex = async (req, res) => {
    try {
        // En modo demo se usan los datos de ejemplo en lugar de la base de datos
        const portfolios = isDemo ? store.getProducts() : await Portfolio.find().lean();
        const categories = isDemo ? store.getCategories() : await Category.find().lean();

        // Agrupando los productos por categoría
        const portfoliosByCategory = categories.map(category => ({
            ...category,
            portfolios: portfolios.filter(portfolio => portfolio.category === category.name)
        }));
        // Renderizar
        res.render('index', { portfoliosByCategory });
    } catch (err) {
        console.error('Error al obtener los datos:', err);
        res.status(500).send('Error al obtener los datos');
    }
};

// Exportación de la función
module.exports = {
    renderIndex
}
