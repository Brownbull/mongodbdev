const assert = require('assert')
const User = require('../src/user')

describe('Validate users', () => {

  it('schema: requires name', (done) => {
    const newUser = new User({ name: undefined })
    const validateResult = newUser.validateSync()
    // newUser.validate((validationResult)=>{})
    const { message } = validateResult.errors.name
    assert(message === 'Name is required.')
    done()
  })

  it('schema: requires name longer than 2 characters', (done) => {
    const newUser = new User({ name: 'Al' })
    const validateResult = newUser.validateSync()
    // newUser.validate((validationResult)=>{})
    const { message } = validateResult.errors.name
    assert(message === 'Name must at least 3 characters long.')
    done()
  })

  it('schema: disallows save of invalid name', (done) => {
    const newUser = new User({ name: 'Al'})

    newUser.save()
    .catch((validateResult) => {
      const { message } = validateResult.errors.name
      assert(message === 'Name must at least 3 characters long.')
      done()
    })
  })

})