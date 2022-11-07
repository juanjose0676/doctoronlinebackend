const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    
    documento: {type: Number,required: true, unique:true },
    nombre: {type: String, maxLength: 40,required: true, unique:true },
    apellidos: {type: String, maxLength: 40,required: true, unique:true },
    especialidad: [{type: String, require: true}],
    login: {type: String,maxLength: 20, required: true, unique:true },
    password:{type: String,maxLength: 20, required: true, unique:true },
     
});

module.exports = mongoose.model("doctor", doctorShema);