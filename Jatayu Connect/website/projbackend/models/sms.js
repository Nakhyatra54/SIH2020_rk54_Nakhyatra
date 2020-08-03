const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var smsSchema = new Schema({
    asp:{
        type: String,
        trim: true
    },
    dsp: {
        type:String,
        trim: true,
    },
    pi:{
        type:String,
        trim: true
    }
   
    
})

module.exports = mongoose.model("SMS", smsSchema)