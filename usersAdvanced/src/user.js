const mongoose = require('mongoose')
const postSchema = require('./post')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must at least 3 characters long.'
    },
    required: [true, 'Name is required.']
  },
  likes: {
    type: Number
  },
  posts: [postSchema],
  blogPosts : [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
})

userSchema.virtual('postCount').get(function() {
  return this.posts.length
})

const User = mongoose.model('user', userSchema)

module.exports = User