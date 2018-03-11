const assert = require("assert")
const User = require("../src/user")

describe("Updating records", () => {
  let gabe

  beforeEach((done) => {
    gabe = new User({ name: "Gabriel" })
    gabe.save()
      .then(() => done())
  }) // eof beforeEach((done)

  assertName = (operation, done) => {
    operation
      .then(() => User.findOne({ name: "Gabo" }))
      .then((user) => {
        assert(user)
        done()
      })
  }

  it("Instance set and save", (done) => { 
    // console.log(gabe)
    gabe.set("name", "Gabo")
    assertName(gabe.save(), done)
  }) // eof 

  it("A mode instance can update", (done) => { 
    assertName(gabe.update({ name: "Gabo" }), done)
  }) // eof 

  it("A model class can update", (done) => { 
    assertName(User.update({ name: "Gabriel" }, { name: "Gabo" }), done)
  }) // eof 

  it("A model class can update one record", (done) => { 
    assertName(User.findOneAndUpdate({ name: "Gabriel" }, { name: "Gabo" }), done) 
  }) // eof 

  it("A model class can update one record by Id", (done) => { 
    assertName(User.findByIdAndUpdate(gabe._id, { name: "Gabo" }), done) 
  }) // eof 
}) // eof describe("Update a user")