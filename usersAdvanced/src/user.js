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

// MIDDLEWARE
// refernce : https://www.udemy.com/the-complete-developers-guide-to-mongodb/learn/v4/t/lecture/6035636?start=0
userSchema.pre('remove', function(next){
  // this === newUser
  const BlogPost = mongoose.model('blogPost')

  BlogPost.remove({ _id: { $in: this.blogPosts } })  // GREAT WAY to remove in bulk!!!!!!!!!!!!!!!!!!!!!!
  .then(() => next())
})

const User = mongoose.model('user', userSchema)

module.exports = User