const colaboradoras = require('../models/colaboradoras')
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const getAll = (req, res) => {
  colaboradoras.find(function(err, colaboradoras) {
    if(err) {
      res.status(500).send({ message: err.message })
    }
    res.status(200).send(colaboradoras)
  })
}

if (!authHeader) {
  return res.status(401).send("Não foi encontrado nenhum Header")
}

const token = authHeader.split(' ')[1];

jwt.verify(token, SECRET, function(erro) {
  if (erro) {
    return res.status(403).send('Nope');
  }
  
  colaboradoras.find(function(err, colaboradoras){
    if(err) { 
      return res.status(500).send({ message: err.message })
    }
      return res.status(200).send(colaboradoras);
  })
})

const postConlaboradora = (req, res) => {
  const passwordHash = bcrypt.hashSync(req.body.password, 10)
  req.body.password = passwordHash
  const colaboradora = new colaboradoras(req.body)

  colaboradora.save(function(err) {
    if (err) {
      res.status(500).send({ message: err.message })
    }
    res.status(201).send(colaboradora)
  })
}

const login = (req, res) => {
  colaboradoras.findOne({ email: req.body.email }, function(error, colaboradora) {
    if (!colaboradora) {
      return res.status(404).send(`Não existe colaboradora com o email ${req.body.email}`)
    }
    const passwordValida = bcrypt.compareSync(req.body.password, colaboradora.password)

    if (!passwordValida) {
      return res.status(403).send('Password tá errado viu, bê')
    }

    const token = jwt.sign({ email: req.body.email }, SECRET)
    return res.status(200).send(token)
  })
}


module.exports = {
  getAll,
  postConlaboradora,
  login
}