const assert = require('assert')
const User = require('../src/user')

function assertUpdate(operation, done) {
  operation
    .then(() => User.find({ name: 'Alex' }))
    .then((elements) => {
      assert(elements.length && elements[0].name === 'Alex')
      done()
    })
}

describe('Updating users', () => {
  let newUser

  beforeEach((done) => {
    newUser = new User({ 
      name: 'Joe',
      postCount : 0 
    })
    newUser.save()
      .then(() => done())
  })

  it('model instance: set and save',(done) => {
    assertUpdate(newUser.set('name', 'Alex').save(), done)
  })

  it('model instance: update', (done) => {
    assertUpdate(newUser.update({ name: 'Alex' }), done)
  })

  it('class method: update', (done) => {
    assertUpdate(User.update({ name: 'Joe' }, { name: 'Alex'}), done)
  })

  it('class method: findOneAndUpdate', (done) => {
    assertUpdate(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done)
  })

  it('class method: findByIdAndUpdate', (done) => {
    assertUpdate(User.findByIdAndUpdate(newUser._id, { name: 'Alex' }), done)
  })

  it('class method: increment user count by 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: {postCount: 1}})
      .then(() => User.find({ name: 'Joe' }))
      .then((elements) => {
        assert(elements.length && elements[0].postCount === 1)
        done()
      })
  })
})