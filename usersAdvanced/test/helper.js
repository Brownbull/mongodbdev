const mongoose = require('mongoose')
mongoose.Promise = global.Promise // maybe not needed

before((done) => { // executed just one time before all tests
  mongoose.connect('mongodb://localhost/users_test')
  mongoose.connection
    .once('open', () => { console.log('Connection OK') })
    .on('error', (error) => { console.warn('Warning', error) })
    done()
})

beforeEach((done) => { // done tells mocha when to proceed with next test
  const { users, comments, blogposts } = mongoose.connection.collections
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done()
      })
    })
  })
})

  