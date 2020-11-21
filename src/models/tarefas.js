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

const tarefas = mongoose.model('tasks', tarefaSchema)

module.exports = tarefas