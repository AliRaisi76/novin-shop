const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The product must have a title!'],
        maxLength: 50
    },
    description: {
        type: String,
        required: [true, 'A product must have a description!'],
        maxLength: 500
    },
    quantity: {
        type: Number,
        required: [true, 'Please add how much of this product is in stock!']
    }
});

module.exports = mongoose.Model('Product', productSchema)