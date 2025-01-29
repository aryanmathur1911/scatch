const jwt = require("jsonwebtoken")
const userModel = require("../models/usermodel")
const adminModel = require("../models/adminmodel")


const isAdmin = async (req,res,next) => {
    const admins = await adminModel.find() 
    try{

        
        admins.forEach(element => {
            if(req.body.email === element.email){
                res.render("adminPage.ejs",{element})
            }
            else{
                next()
            }
        });
    }
    catch(error){
        res.send("something went wrong")
    }
}

module.exports = isAdmin