const express = require("express")
const router = express.Router()
const userModel = require("../models/usermodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {registerUser,loginUser, logout } = require("../controllers/authController")
const isLoggedIn = require("../middlewares/isLoggedIn")
const cookieParser = require("cookie-parser")

router.use(cookieParser())




router.get('/',(req,res) => {
    res.send("this is users router")
})

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get("/logout",logout)


module.exports = router