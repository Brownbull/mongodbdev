const assert = require('assert')
const User = require('../src/user')

describe('Subdocuments', () => {

  it('model instance: create on save', (done) => {
    const newUser = new User({
      name: 'Joe',
      posts: [{ title: 'Post title' }]
    })
    newUser.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((element) => {
        assert(element.posts[0].title === 'Post title')
        done()
      })
  })

  it('model instance: create after save', (done) => {
    const newUser = new User({
      name: 'Joe',
      posts: []
    })
    newUser.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((elementSaved) => {
        elementSaved.posts.push({ title: 'New Post'})
        return elementSaved.save()
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((elementUpdated) => {
        assert(elementUpdated.posts[0].title === 'New Post')
        done()
      })
  })

  it('model instance: delete after save', (done) => {
    const newUser = new User({
      name: 'Joe',
      posts: [{ title: "New title" }]
    })
    newUser.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((elementSaved) => {
        elementSaved.posts[0].remove()
        return elementSaved.save()
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((elementUpdated) => {
        assert(!elementUpdated.posts.length)
        done()
      })
  })

})