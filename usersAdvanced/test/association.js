const mongoose = require('mongoose')
const assert = require('assert')
const User = require('../src/user')
const BlogPost = require('../src/blogPost')
const Comment = require('../src/comment')

describe('Associations', () => {
  let newUser, newBlogPost, newComment

  beforeEach((done) => {
    newUser = new User({ name: 'Joe' })
    newBlogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' })
    newComment = new Comment({ content: 'Congrats on new post' })

    newUser.blogPosts.push(newBlogPost)
    newBlogPost.comments.push(newComment)
    newComment.user = newUser

    // newUser.save(() => {
    //   newBlogPost.save(() => {
    //     newComment.save(() => {
    //       done()
    //     })
    //   })
    // })

    Promise.all([
      newUser.save(),
      newBlogPost.save(),
      newComment.save()
    ])
    .then(() => {
      done()
    })
  }) // eof beforeEach

  it('user and blogPost association', (done) => {
    User.findOne({ name: 'Joe' }).populate('blogPosts')
    .then((user) => {
      assert(user.blogPosts[0].title === 'JS is Great')
      done()
    })
  })

  // this is dificult reminder here:
  // https://www.udemy.com/the-complete-developers-guide-to-mongodb/learn/v4/t/lecture/6035624?start=0
  it('user and blogPost and comment association', (done) => {
    User.findOne({ name: 'Joe' }).populate({
      path: 'blogPosts',
      populate: {
        path: 'comments',
        model: 'comment',
        populate: {
          path: 'user',
          model: 'user'
        }
      }
    })
    .then((user) => {
      assert(
        user.name === 'Joe' &&
        user.blogPosts[0].title === 'JS is Great' &&
        user.blogPosts[0].comments[0].content === 'Congrats on new post' &&
        user.blogPosts[0].comments[0].user.name === 'Joe' 
      )
      done()
    })
  })



})