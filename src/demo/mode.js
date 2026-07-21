// Modo demo: se activa automáticamente cuando no hay una cadena de conexión
// a MongoDB. Permite levantar la tienda con datos de ejemplo, sin base de datos
// ni servicios externos (Cloudinary / Mailtrap).
const isDemo = !process.env.MONGODB_URI

module.exports = { isDemo }
