const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const app = express()

mongoose.Promise = global.Promise
// setup environments TEST and others
// https://www.udemy.com/the-complete-developers-guide-to-mongodb/learn/v4/t/lecture/6166128?start=0
if(process.env.NODE_ENV !== 'test'){
  mongoose.connect("mongodb://localhost/muber")
}

app.use(bodyParser.json())
routes(app)

// https://www.udemy.com/the-complete-developers-guide-to-mongodb/learn/v4/t/lecture/6166130?start=0
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message })
})

module.exports = app
