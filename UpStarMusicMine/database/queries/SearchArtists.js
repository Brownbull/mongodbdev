const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */

// https://www.udemy.com/the-complete-developers-guide-to-mongodb/learn/v4/t/lecture/6035724?start=0
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  const queryCriteria = buildQuery(criteria)

  const searchQuery = 
    Artist.find(queryCriteria)
  .sort({ [sortProperty]: 1 }).skip(offset).limit(limit)

  return Promise.all([
    searchQuery,
    Artist.count(queryCriteria)
  ])
  .then((results) => {
    return {
      all: results[0],
      count: results[1],
      offset,
      limit
    }
  })
}


// https://www.udemy.com/the-complete-developers-guide-to-mongodb/learn/v4/t/lecture/6035730?start=0
const buildQuery = (criteria) => {
  const query = {}

  if (criteria.name) {
    query.$text = {
      $search: criteria.name
    }
  }
  
  if (criteria.age) {
    query.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max
    }
  }

  if (criteria.yearsActive) {
    query.yearsActive = {
      $gte: criteria.yearsActive.min,
      $lte: criteria.yearsActive.max
    }
  }

  return query
}

// create index on mongo
// on prompt type
// mongo
// show dbs
// use upstar_music
// db.artists.createIndex({name: "text"})
