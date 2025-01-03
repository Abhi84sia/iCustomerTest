
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    password:{
        type:String,
        required:true
    },
})

  
const users = mongoose.model('user',userSchema)

module.exports =users