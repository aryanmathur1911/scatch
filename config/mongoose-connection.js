const mongoose = require('mongoose')

const dbgr = require('debug')("development:mongoose") //creating a debugger

const config = require('config')



//after above line run the commnad - "$env:DEBUG="development:*" ,it means  "development:" wale saare namespace ke messages show karna
mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(() => {
    dbgr("connected successfully to db")
})
.catch((err) => {
    dbgr(err)
})

module.exports = mongoose.connection //authority of the connection