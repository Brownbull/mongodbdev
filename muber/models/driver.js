const mongoose = require('mongoose')
const Schema = mongoose.Schema

// https://www.udemy.com/the-complete-developers-guide-to-mongodb/learn/v4/t/lecture/6166142?start=0s
const pointSchema = new Schema({
  type: { type: String, default: 'Point' },
  coordinates: { type: [Number], index: '2dsphere'}
})

const driverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  },
  geometry: pointSchema
})

const Driver = mongoose.model('driver', driverSchema)

module.exports = Driver