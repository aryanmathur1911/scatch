const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/scatch")
.then(() => {
    console.log("connected successfully to db")
})
.catch((err) => {
    console.log(err)
})

module.exports = mongoose.connection //authority of the connection