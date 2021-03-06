const { JsonWebTokenError } = require('jsonwebtoken');

const tarefas = require('../models/tarefas')
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken')

const getAll = (req, res) => {
  const authHeader = req.get('Authorization')

  if (!authHeader) {
    return res.status(401).send('Kd os header véi?')
  }

  const token = authHeader.split(' ')[1]
  console.log(token)

  jwt.verify(token, SECRET, function(erro) {
    if (erro) {
      return res.status(403).send('Acesso negado: Token inválido!')
    }

    tarefas.find(function(err, tarefas){
      if(err) {
        res.status(500).send({ message: err.message })
      }
      res.status(200).send(tarefas)
    })
  })
}

const getById = (req, res) => {
  const id = req.params.id
  tarefas.find({ id }, function(err, tarefas){
    if(err) {
      res.status(500).send({ message: err.message })
    }

    res.status(200).send(tarefas)
  })
}

const delTarefa = (req, res) => {
  const id = req.params.id

   tarefas.find({ id }, function(err, tarefa){
    if(tarefa.length > 0){
      tarefas.deleteMany({ id }, function(err){
        if(err) {
          res.status(500).send({
            message: err.message,
            status: "FAIL"
           })
        }
        res.status(200).send({
          message: 'Tarefa removida com sucesso!',
          status: "SUCCESS"
        })
      })
    }else{
      res.status(200).send({
        message: 'Não há tafera para ser removida.',
        status: "EMPTY"
      })
    }
  })
}
const postTarefa = (req, res) => {
  console.log(req.body)

  let tarefa = new tarefas(req.body)

  tarefa.save(function(err){
    if(err) {
      res.status(500).send({ message: err.message })
    }
    res.status(201).send(tarefa.toJSON())
  })

}


const delTarefaConcluida = (req, res) => {
   try {
    tarefas.deleteMany({ concluido: true }, function (err) {
        if (!err) {
            res.status(200).send({ message: 'Tarefas |concluidas| removidas com sucesso', status: "SUCCESS" })
        }
    })
  } catch (err) {
    console.log(err)
    return res.status(424).send({ message: err.message })
  }
}

const delTarefaConcluida = (req, res) => {
   try {
    tarefas.deleteMany({ concluido: true }, function (err) {
        if (!err) {
            return res.status(200).send({ message: 'Tarefas concluidas removidas com sucesso', status: "SUCCESS" })
        }
    })
  } catch (err) {
    console.log(err)
    return res.status(424).send({ message: err.message })
  }
}

const putTarefa = (req, res) => {
  const id = req.params.id

  tarefas.find({ id }, function(err, tarefa){
    if(tarefa.length> 0){
      tarefas.updateMany({ id }, { $set : req.body }, function (err) {
        if (err) {
          res.status(500).send({ message: err.message })
        }
        res.status(200).send({ message: "Registro alterado com sucesso"})
      })
    }else {
      res.status(200).send({ message: "Não há registros para serem atualizados com o ID solicitado."})
    }
  })

}


module.exports = {
  getAll,
  getById,
  postTarefa,
  delTarefa,
  delTarefaConcluida,
  putTarefa
}