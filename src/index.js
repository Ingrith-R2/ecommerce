// Importar dotenv
require('dotenv').config()

// Importación de la variable app
const app = require('./server.js')
// Importación de la función connection
const connection = require('./database.js')
const { isDemo } = require('./demo/mode')

// Conectar a la base de datos solo si hay cadena de conexión.
// Sin ella la aplicación arranca en modo demo con datos de ejemplo.
if (isDemo) {
    console.log('▶ Modo DEMO activo: usando datos de ejemplo (sin base de datos)')
} else {
    connection()
}

// En local se levanta el servidor; en Vercel se exporta la app como handler
if (require.main === module) {
    app.listen(app.get('port'), () => {
        console.log(`Tienda disponible en http://localhost:${app.get('port')}`)
    })
}

module.exports = app
