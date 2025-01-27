const express = require("express")
const app = express()
const port = 3000

//important packages
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const path = require('path')

//exporting database connection
const db = require("./config/mongoose-connection")

//using middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname,"public")))
app.set('view engine','ejs') 
app.use(cookieParser())

//requiring routers

const ownerRouter = require("./routes/ownerRouter")
const userRouter = require("./routes/userRouter")
const productRouter = require("./routes/productRouter")

//setting api for routers
app.use('/owners',ownerRouter)
app.use('/users',userRouter)
app.use('/products',productRouter)



app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
    
})