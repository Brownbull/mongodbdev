const assert = require('assert')
const User = require('../src/user')

describe('Reading users', (done) => {
  let newUser, newUser2, newUser3, newUser4, newUser5

  beforeEach((done) => {
    newUser = new User ({name : 'Joe'})
    newUser2 = new User ({name : 'Maria'})
    newUser3 = new User ({name : 'Jose'})
    newUser4 = new User ({name : 'Lauren'})
    newUser5 = new User ({name : 'Claudia'})

    Promise.all([
      newUser.save(),
      newUser2.save(),
      newUser3.save(),
      newUser4.save(),
      newUser5.save()
    ])
    .then(() => done())
  })

  // SKIP and LIMIT operators
  // https://www.udemy.com/the-complete-developers-guide-to-mongodb/learn/v4/t/lecture/6035654?start=0
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

  it('finds then skip and limit the result', (done) => {
    User.find({}).sort({ name: 1 }).skip(1).limit(2) // sort by name ascending 
    .then((users) => {
      assert(users.length === 2 && users[0].name === 'Joe' && users[1].name === 'Jose')
      done()
    })
  })

})