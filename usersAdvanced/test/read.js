const assert = require('assert')
const User = require('../src/user')

describe('Reading users', (done) => {
  let newUser

  beforeEach((done) => {
    newUser = new User ({name : 'Joe'})
    newUser.save()
    .then(() => done())
  })

  it('finds joe users by name', (done) => {
    User.find({name: 'Joe'})
    .then((elements) => {
      assert(elements[0]._id.toString() === newUser._id.toString())
      done()
    })
  })

  it('finds joe users by _id', (done) => {
    User.findOne({ _id: newUser._id })
      .then((element) => {
        assert(element.name === 'Joe')
        done()
      })
  })
})