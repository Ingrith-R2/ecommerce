// Importación de express
const express = require('express')
// Importar path
const path = require('path');
// Importar handlebars
const { engine } = require('express-handlebars')
// Importar methodOverride
const methodOverride = require('method-override');
// Importar passport
const passport = require('passport');
// Importar session
const session = require('express-session');
// Importar fileUpload
const fileUpload = require('express-fileupload')

// Inicializaciones
const app = express()
require('./config/passport')

// Configuraciones 
app.set('port', process.env.port || 5000)
app.set('views', path.join(__dirname, 'views'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Establecer el directorio de las vistas
app.set('views', path.join(__dirname, 'views'))
// Configuraciones para el motor de plantilla
// 1 archivo master (master page)
// 2 establecer el directorio layouts
// 3 establecer el directorio partials
// 4 extensión de las páginas .hbs
app.engine('.hbs', engine({
    defaultLayout: 'main', // 1
    layoutsDir: path.join(app.get('views'), 'layouts'), // 2
    partialsDir: path.join(app.get('views'), 'partials'), // 3
    extname: '.hbs', // 4
    helpers:{
        eq: (a,b)=> a === b,
        // Formatear un precio como moneda: 24.9 -> $24.90
        money: (value)=> `$${Number(value || 0).toFixed(2)}`
    }
}))
// Establecer el motor de plantillas y su extensión
app.set('view engine', '.hbs')

// Configuraciones de fileUpload
app.use(fileUpload({
    // Establecer archivo temporales
    useTempFiles: true,
    // Especificar el directorio
    tempFileDir: '/tmp/'
}));



// Middlewares 
app.use(express.urlencoded({ extended: false })) // FORMULARIOS - VISTAS
app.use(methodOverride('_method'))
// Establecer la sesión del usuario
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// Inicialización
app.use(passport.initialize())
// Mantener la sesión del usuario
app.use(passport.session())

// Variables globales
const { isDemo } = require('./demo/mode')
app.use((req, res, next) => {
    res.locals.user = req.user?.name || null
    // Permite que las vistas adapten los formularios en modo demo
    res.locals.isDemo = isDemo
    next()
})

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

// Rutas
app.use(require('./routers/demo.routes'))
app.use(require('./routers/index.routes'))
app.use(require('./routers/portafolio.routes'))
app.use(require('./routers/user.routes'))
app.use(require('./routers/compra.routes'))
app.use(require('./routers/cart.routes'))
app.use(require('./routers/categorie.routes'))

// Exportar la variable app
module.exports = app