const jwt = require("jsonwebtoken")
const userModel = require("../models/usermodel")

const isLoggedIn = async (req,res,next) => {
    if(!req.cookies.token){
        req.flash("error","You need to login first")
        return res.redirect('/')
    }

    try {
    let data = jwt.verify(req.cookies.token,process.env.JWT_KEY)

    // let user = await userModel.findOne({email:decoded.email}).select("-password")

    req.user = data

    next()

    } 
    catch (error) {
        req.flash("error", "Something went wrong")
        res.redirect('/')
    }
}

module.exports = isLoggedIn