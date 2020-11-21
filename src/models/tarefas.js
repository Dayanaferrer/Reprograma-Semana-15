const mongoose = require('mongoose')

const tarefaSchema = new mongoose.Schema({
    id : { type : Number },
    description: { type: String },
    inclusionDate: { type: String },
    deadline: { type: String },
    completed: { type: Boolean },
    contributorName: { type: String }
},{
    versionKey: false
})

const tarefas = mongoose.model('tarefas', tarefaSchema)

module.exports = tarefas