const assert = require("assert")
const User = require("../src/user")

describe("Reading users out of the database", () => {
  let gabe

  beforeEach((done) => {
    gabe = new User({name: "Gabriel"})
    gabe.save()
      .then(() => done())
  })

  it("Find all users with name of Gabriel", (done) => {
    User.find({ name: "Gabriel" })
      .then((users) => {
        // console.log(users)
        assert(users[0]._id.toString() === gabe._id.toString())
        done() // proceed with next test    
      }) // eof .then((users
  }) // eof it("Find all users 

  it("Find a user with a particular id", (done) => {
    User.findOne({ _id: gabe._id })
      .then((user) => {
        assert(user.name === "Gabriel")
        done()
      })
  }) // eof it("Find a user with a part
}) // eof describe("Creating records