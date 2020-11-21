const colaboradoras = require('../models/colaboradoras')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const postConlaboradora = (req, res) => {
  const passwordHash = bcrypt.hashSync(req.body.password, 10)
  req.body.password = passwordHash
  const colaboradora = new colaboradoras(req.body)

  colaboradora.save(function(err) {
    if (err) {
      res.status(500).send({ message: err.message })
    }
    res.status(201).send(colaboradora.toJSON())
  })
}

const getAll = (req, res) => {
  colaboradoras.find(function(err, colaboradoras) {
    if(err) {
      res.status(500).send({ message: err.message })
    }
    res.status(200).send(colaboradoras)
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
  postConlaboradora,
  getAll,
  login
}