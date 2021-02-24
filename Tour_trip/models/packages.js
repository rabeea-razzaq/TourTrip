const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Packages = new Schema({
    Title:{
        type: mongoose.SchemaTypes.String,
        required:true
    },
    imageUrl:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    price:{
        type: mongoose.SchemaTypes.Number,
        required:true
    },
    description:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    destination:{
        type:mongoose.SchemaTypes.Array,
        required:true
    }
});

module.exports = mongoose.model('Packages',Packages);