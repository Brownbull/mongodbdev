const Artist = require('../models/artist');

/**
 * Sets a group of Artists as not retired
 * @param {array} _ids - An array of the _id's of of artists to update
 * @return {promise} A promise that resolves after the update
 */
//https://www.udemy.com/the-complete-developers-guide-to-mongodb/learn/v4/t/lecture/6035744?start=0
module.exports = (_ids) => {
  return Artist.update(
    { _id: { $in: _ids } }, 
    { retired: false }),
    { multi: true }
};
