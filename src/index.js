// Importar dotenv 
require('dotenv').config()

// Importación de la variable app
const app = require('./server.js')
// Importación de la función connection
const connection = require('./database.js')



// Invocar la función 
connection()



// Iniciar el servidor en el puerto 
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

module.exports = app;
/*app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})*/