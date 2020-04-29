const mongoose = require('mongoose');

const ProductListItem = mongoose.Schema({
    id : {type:mongoose.Schema.Types.ObjectId,
        ref: 'Products', 
    required: true},
    quantity : {
        type : Number,
        required: true
    }

})
const FavouriteListSchema = mongoose.Schema({
             
    name : {
        type : String,
        required : true
    },
    clientID: {
        type : String,
        required : true
    },
 
    availability : {
        type : Boolean,
        default : true
    },
    products : [ProductListItem],
    date : {
        type : Date,
        default : Date.now
    }


})

module.exports = mongoose.model('FavouritePack' , FavouriteListSchema);