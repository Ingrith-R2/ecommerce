const Order = require('../models/Orders');
const {sendOrderConfirmation} = require('../config/nodemailer');
const User = require('../models/User')
const { isDemo } = require('../demo/mode')


// Metodo para procesar la orden y enviar el correo
const processOrder = async (req, res) => {
    try {
        const { user, items, total } = req.body;

        // En modo demo la orden no se guarda ni se envía correo:
        // se registra en consola para poder mostrarla durante la presentación
        if (isDemo) {
            console.log('▶ [DEMO] Pedido recibido:', JSON.stringify({ user, items, total }, null, 2));
            return res.status(200).json({ message: 'Orden procesada (modo demo)' });
        }

        // Crear la orden en la base de datos
        const newOrder = new Order({ user, items, total });
        // Guardar
        await newOrder.save();
        const usersBDD = await User.find().lean();
        const adminEmails = usersBDD.map(user => user.email)
        await sendOrderConfirmation(user, items, adminEmails);

        res.status(200).json({ message: 'Orden procesada y correo enviado' });
    } catch (error) {
        res.status(500).json({ message: `Error procesando la orden ${error}` });
    }
};

module.exports = {
    processOrder
};
