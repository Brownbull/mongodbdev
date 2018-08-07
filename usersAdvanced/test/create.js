const assert = require('assert')
const User = require('../src/user')

describe('Creating user records', () => {
  it('saves joe user', (done) => {
    const newUser = new User({ name: 'Joe' })
    newUser.save()
    .then(() => {
      // Has been the user saved successfully?
      assert(!newUser.isNew)
      done()
    })
  }) // eof it 'saves a user'
}) // eof describe 'Creating user records'