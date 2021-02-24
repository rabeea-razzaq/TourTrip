const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const purchase = new Schema({
    fullName:{
        type:String,
        required:true
    },
    ContactNumber:{
        type:String,
        required:true
    },
    Address:{
        type:String,
         required:true
    },
    purchaseDate:{
        type:Date,
        required:true
    },
    package_id:{
        type:Schema.Types.ObjectId,
        ref:'Packages',
        required:true,
        
    },
    User_id:{
        type:Schema.Types.ObjectId,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});
module.exports = mongoose.model('Purchase',purchase);