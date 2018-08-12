const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */

//https://www.udemy.com/the-complete-developers-guide-to-mongodb/learn/v4/t/lecture/6035716?start=0
module.exports = () => {
  const minQuery = 
  Artist.find({}).sort({ age: 1 }).limit(1)
  .then(artists => artists[0].age)

  const maxQuery = 
  Artist.find({}).sort({ age: -1 }).limit(1)
  .then(artists => artists[0].age)

  return Promise.all([
    minQuery,
    maxQuery
  ])
  .then((limits) => {
    return { min: limits[0], max: limits[1] }
  })
}
