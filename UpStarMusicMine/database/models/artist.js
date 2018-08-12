// Todo: Create Artist Model
const mongoose = require('mongoose')
const albumSchema = require('./album')
const Schema = mongoose.Schema

const artistSchema = new Schema({
  name: String,
  age: Number,
  yearsActive: Number,
  image: String,
  genre: String,
  website: String,
  netWorth: Number,
  labelName: String, 
  retired: Boolean,
  albums: [albumSchema]
})

// artistSchema.virtual('netWorthVirtual').get(function () {
//   let amnt = 0
//   this.albums.foreach((album) => {
//     amnt += album.revenue
//     return amnt
//   })
// })

// MIDDLEWARE
// refernce : https://www.udemy.com/the-complete-developers-guide-to-mongodb/learn/v4/t/lecture/6035636?start=0
// artistSchema.pre('remove', function (next) {
//   // this === newUser
//   const Album = mongoose.model('album')

//   Album.remove({ _id: { $in: this.albums } })  // GREAT WAY to remove in bulk!!!!!!!!!!!!!!!!!!!!!!
//     .then(() => next())
// })

const Artist = mongoose.model('artist', artistSchema)

module.exports = Artist
