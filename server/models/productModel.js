
const mongoose = require('mongoose')


const productSchema = mongoose.Schema({}, { strict: false });

  
const products = mongoose.model('products',productSchema)

module.exports =products