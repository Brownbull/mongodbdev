const assert = require('assert')
const request = require('supertest')
const app = require('../app')


describe('App Testing...', () => {
  it('GET request to /api route', (done) => {
    request(app)
    .get('/api')
    .end((err, res) => {
      assert(res.body.hi === 'there')
      done()
    })
  })
})