const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    user: {
        name: {
            type: String,
            required: true
        },
        phone: { 
            type: String,
            required: true 
        },
        address: {
            type: String,
            required: true
        }
    },
    items: [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true,
                default: 0
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    total: {
        type: Number,
        required: true,
        default: 0
    }
},
    {
        timestamps: true
    });

module.exports = model('Order', orderSchema);
