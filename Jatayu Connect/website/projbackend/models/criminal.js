const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var criminalSchema = new Schema({
    firstName:{
        type: String,
        required: false,
        maxlength: 32,
        trim: true
    },
    lastName:{
        type: String,
        required: false,
        maxlength: 32,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        required: false,
        unique: true
    },
    address: {
        type:String,
        trim: true,
        required: false,
    },
    motherName:{
        type: String,
        required: false,
        maxlength: 32,
        trim: true
    },
    fatherName:{
        type: String,
        required: false,
        maxlength: 32,
        trim: true
    },
    spouseName:{
        type: String,
        required: false,
        maxlength: 32,
        trim: true
    },
    school:{
        type: String,
        required: false,
        maxlength: 32,
        trim: true
    },
    college:{
        type: String,
        required: false,
        maxlength: 32,
        trim: true
    },
    criminalRecord:{
        type: String,
        required: false,
        trim: true
    },
    birthDatePlace: {
        type:String
    },
    nickName:{
        type: String,
        maxlength: 50,
        trim: true
    },
    contact:{
        type: String,
        trim: true
    },
    criminalImage: {
        type:String
    },
    fingerprintImage: {
        type: String
    },
    ratinaImage:{
        type: String
    },
    motherImage:{
        type:String
    },
    fatherImage:{
        type:String
    },
    spouseImage:{
        type:String
    },
   
    
})

module.exports = mongoose.model("Criminal", criminalSchema)