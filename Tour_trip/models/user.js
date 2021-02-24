const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    firstName:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    lastName:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    email:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    password:{
        type:mongoose.SchemaTypes.String,
        required:true
    }

});

module.exports = mongoose.model('User',user);