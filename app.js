const express = require("express")
const app = express()
const port = 3000



//important packages
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const path = require('path')
const expressSession = require("express-session")
const flash = require("connect-flash")
const dotenv = require('dotenv')
dotenv.config()

//exporting database connection
const db = require("./config/mongoose-connection.js")

//using middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname,"public")))
app.set('view engine','ejs') 
app.use(cookieParser())

app.use(
    expressSession({
        resave : false,
        saveUninitialized : false,
        secret : process.env.SESSION_SECRET,
        cookie: { secure: false }
    })
)

app.use(flash())


//requiring routers

const ownerRouter = require("./routes/ownerRouter")
const userRouter = require("./routes/userRouter")
const productRouter = require("./routes/productRouter")
const indexRouter = require("./routes/index")

//setting api for routers
app.use('/',indexRouter)
app.use('/owners',ownerRouter)
app.use('/users',userRouter)
app.use('/products',productRouter)



app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
    
})