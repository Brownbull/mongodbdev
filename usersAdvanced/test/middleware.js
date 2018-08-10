const mongoose = require('mongoose')
const assert = require('assert')
const User = require('../src/user')
const BlogPost = require('../src/blogPost')

describe('Middleware', () => {
  let newUser, newBlogPost

  beforeEach((done) => {
    newUser = new User({ name: 'Joe' })
    newBlogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' })

    newUser.blogPosts.push(newBlogPost)

    Promise.all([
      newUser.save(),
      newBlogPost.save(),
    ])
      .then(() => {
        done()
      })
  }) // eof beforeEach

  it('pre: delete user then comments', (done) => {
    newUser.remove()
    .then(() => BlogPost.countDocuments())
    .then((count) => {
      assert(!count)
      done()
    })
  })

})