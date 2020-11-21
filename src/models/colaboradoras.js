const mongoose = require('mongoose')

const colaboradoraSchema = new mongoose.Schema({
    id : { type : Number},
    name: { type: String },
    email: { type: String },
    password: { type: String }
},{
    
    versionKey: false
})

const colaboradoras = mongoose.model('colaboradoras', colaboradoraSchema)

module.exports = colaboradoras