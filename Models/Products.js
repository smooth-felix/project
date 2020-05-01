const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String
    },
    pricePerUnit:{
        type: Number,
        required: true
    },
    minOrder:{
        type: Number,
        required: true
    },
    category:{
        type : String,
        required: true
    },
    availability:{
        type : Boolean,
        required: true
    }
   


})

module.exports = mongoose.model('Products', ProductSchema)