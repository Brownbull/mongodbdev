const Driver = require('../models/driver')

module.exports = {
  gretting(req, res) {
    res.send({hi: 'there'})
  },

  // https://www.udemy.com/the-complete-developers-guide-to-mongodb/learn/v4/t/lecture/6166146?start=0
  index(req, res, next) {
    const { lng, lat } = req.query

    Driver.aggregate([{
      $geoNear: {
        near: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
        distanceField: 'dist.calculated',
        maxDistance: 200000,
        spherical: true
      }
    }])
    .then((elements) => res.send(elements))
    .catch(next)
  },

  create(req, res, next) {
    const driverProps = req.body

    Driver.create(driverProps)
    .then((driver) => res.send(driver))
    .catch(next)
  },

  // https://www.udemy.com/the-complete-developers-guide-to-mongodb/learn/v4/t/lecture/6166132?start=0
  update(req, res, next) {
    const driverId = req.params.id
    const driverProps = req.body

    Driver.findByIdAndUpdate({ _id: driverId}, driverProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then(element => res.send(element))
      .catch(next)
  },

  // https://www.udemy.com/the-complete-developers-guide-to-mongodb/learn/v4/t/lecture/6166136?start=0
  delete(req, res, next) {
    const driverId = req.params.id

    Driver.findByIdAndRemove({ _id: driverId })
      .then((element) => res.status(204).send(element))
      .catch(next)
  }

  
}