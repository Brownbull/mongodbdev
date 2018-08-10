const assert = require('assert')
const User = require('../src/user')

describe('Virtual types', () => {
  let newUser

  beforeEach((done) => {
    newUser = new User({ 
      name: 'Joe',
      posts: [{ title: 'PostTitle' }]
     })
    newUser.save()
      .then(() => done())
  })

  it('postCountVirtual returns number of posts', (done) =>{
    User.findOne({ name: 'Joe' })
    .then((element) => {
      assert(element.postCount)
      done()
    })
  })

})