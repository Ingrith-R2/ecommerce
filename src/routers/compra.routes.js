const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();

const { isDemo } = require('../demo/mode');

// Ruta para manejar la compra
router.post('/compra', async (req, res) => {
    const { title, quantity } = req.body;

    if (!title || !quantity) {
        res.status(400).send('Faltan datos requeridos: título y cantidad');
        return;
    }

    // En modo demo no se persiste nada: se confirma la compra igualmente
    if (isDemo) {
        res.send(`Gracias por tu compra de ${quantity} unidad(es) de ${title}`);
        return;
    }

    try {
        await mongoose.connection.collection('purchases').insertOne({ title, quantity });
        res.send(`Gracias por tu compra de ${quantity} unidad(es) de ${title}`);
    } catch (error) {
        console.error('Error al guardar la compra:', error);
        res.status(500).send('Error al guardar la compra');
    }
});

module.exports = router;
