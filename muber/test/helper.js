const mongoose = require('mongoose')

before(done => {
  mongoose.connect('mongodb://localhost/muber_test',)
  mongoose.connection
  .once('open', () => done())
  .on('error', err => {
    console.warn('warning', error)
  })
})

// https://www.udemy.com/the-complete-developers-guide-to-mongodb/learn/v4/t/lecture/6166154?start=0
beforeEach(done => {
  const { drivers } = mongoose.connection.collections
  drivers.drop()
  .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
  .then(() => done())
  .catch(() => done())
})