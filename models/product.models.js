const mongoose = require('mongoose'); // nhung mongoose


const productSchema = new mongoose.Schema(
    {
        title: String,
        description:String ,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        status:String ,
        position:Number,
        deleted: Boolean

    }
);

const product = mongoose.model('product', productSchema,"products");

module.exports = product;