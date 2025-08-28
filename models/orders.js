const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

orderId: {type:Number},
product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required:true},
quantity:{type:Number, default:1}



})

module.exports = mongoose.model('Orders',orderSchema);