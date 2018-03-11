const assert = require("assert")
const User = require("../src/user")

describe("Creating records", () => {
  it("saves a user", (done) => {
    // assert(1 + 1 === 3)
    const gabe = new User({
      name: "Gabriel"
    })
    gabe.save()
      .then(() => {
        assert(!gabe.isNew)
        done() // proceed with next test
      })

  }) // eof it("saves a user"
}) // eof describe("Creating records