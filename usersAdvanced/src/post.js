const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  title : {
    type: String
  },
  content : {
    type: String
  }
})

module.exports = postSchema