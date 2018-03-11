const mongoose = require("mongoose")

mongoose.Promise = global.Promise  // ES6 Promises

// Executed 1 time before all tests suite
before ((done) => {
  mongoose.connect("mongodb://localhost/users_test")
  mongoose.connection
    .once("open", () => {
      // console.log("Connected")
      done()
    })
    .on("error", (error) => {
      console.warn("Warning", error)
    })
})

// Executed each time before every test
beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next test
    done()
  })
})

