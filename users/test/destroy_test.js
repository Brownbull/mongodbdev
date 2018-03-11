const assert = require("assert")
const User = require("../src/user")

describe("Deleting a user", () => {
  let gabe

  beforeEach((done) => {
    gabe = new User({ name: "Gabriel" })
    gabe.save()
      .then(() => done())
  }) // eof beforeEach((done)

  it("Model instance remove", (done) => { 
    gabe.remove()
      .then(() => User.findOne({ name: "Gabriel" }))
      .then((user) => {
        assert(user === null)
        done()
      })
  }) // eof it("Model instance remove"

  it("Class method remove", (done) => {
    User.remove({ name:"Gabriel" })
      .then(() => User.findOne({ name: "Gabriel" }))
      .then((user) => {
        assert(user === null)
        done()
      })
  }) // eof it("Class method remove

  it("Class method findOneAndRemove", (done) => { 
    User.findOneAndRemove({ name: "Gabriel" })
      .then(() => User.findOne({ name: "Gabriel" }))
      .then((user) => {
        assert(user === null)
        done()
      })
  }) // eof it("Class method findOneAndRemove

  it("Class method findByIdAndRemove", (done) => { 
    User.findOneAndRemove(gabe._id)
      .then(() => User.findOne({ name: "Gabriel" }))
      .then((user) => {
        assert(user === null)
        done()
      })
  }) // eof it("Class method findByIdAndRemove

}); // eof describe("Reading users out of