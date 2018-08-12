const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app')

const Driver = mongoose.model('driver')

describe('Driver controller', () => {
  it('POST request to /api/drivers route', (done) => {
    Driver.countDocuments().then((count) => {
      request(app)
      .post('/api/drivers')
      .send({ email: 'test@test.com' })
      .end((err, res) => {
        Driver.countDocuments().then((newCount) => {
          assert(count + 1 === newCount)
          done()
        }) // eof newCount
      }) // eof request(app)
    }) // eof Driver.count()
  }) // eof it

  it('PUT request to /api/drivers/:id route', (done) => {
    const newDriver = new Driver({
      email: 't@t.com',
      driving: false
    })

    newDriver.save().then(() => {
      request(app)
        .put(`/api/drivers/${newDriver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: 't@t.com' })
          .then(driverUpdated => {
            assert(driverUpdated.driving)
            done()
          })
        })
    })
  }) // eof it

  it('DELETE request to /api/drivers/:id route', (done) => {
    const newDriver = new Driver({ email: 'lala@lala.com' })
    newDriver.save().then(() => {
      request(app)
      .delete(`/api/drivers/${newDriver._id}`)
      .end(() => {
        Driver.findOne({ email: 'lala@lala.com' })
        .then(element => {
          assert(!element)
          done()
        })
      })
    })
  }) // eof it

  it('GET request to /api/drivers route', (done) => {
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
    })

    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: { type: 'Point', coordinates: [-80.253, 25.791] }
    })

    Promise.all([
      seattleDriver.save(),
      miamiDriver.save()
    ])
    .then(() => {
      request(app)
      .get('/api/drivers?lng=-80&lat=25')
      .end((err, res) => {
        assert(res.body.length && res.body[0].email === 'miami@test.com')
        done()
      })
    })

  }) // eof it

}) // eof describe