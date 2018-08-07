const assert = require('assert')
const User = require('../src/user')

function assertDelete(operation, done) {
  operation
    .then(() => User.findOne({ name: 'Joe'}))
    .then((element) => {
      assert(!element)
      done()
    })
}

describe('Deleting users', () => {
  let newUser

  beforeEach((done) => {
    newUser = new User({ name: 'Joe' })
    newUser.save()
      .then(() => done())
  })

  it('model instance remove', (done) => {
    assertDelete(newUser.remove(), done)
  })

  it('class method remove', (done) => {
    assertDelete(User.remove({ name: 'Joe' }), done)
  })

  it('class method findOneAndRemove', (done) => {
    assertDelete(User.findOneAndRemove({ name: 'Joe' }), done)
  })

  it('class method findByIdAndRemove', (done) => {
    assertDelete(User.findByIdAndRemove(newUser._id), done)
  })
})