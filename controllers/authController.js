const userModel = require("../models/usermodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const  generateToken  = require("../utils/generateToken.js")
const cookieParser = require("cookie-parser")


const registerUser = async (req, res) => {
    let { fullname, email, password, isAdmin } = req.body

    let user = await userModel.findOne({ email })

    if (user) { return res.status(400).send("user already exists") }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) { return res.send(err) }
            else {
                try {

                    let createdUser = await userModel.create({
                        fullname,
                        email,
                        password: hash,
                        isAdmin
                    })

                    let token = generateToken(user)
                    res.cookie("token", token)

                    // res.status(201).send("user created successfully")
                    res.redirect("/")
                }
                catch (err) {
                    res.send(err)
                }
            }
        })
    })

}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    

    try {
        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403).send("Email or password incorrect");
        }
        

        // Compare the input password with the hashed password
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).send("Error comparing passwords");
            }

            
            if (result) {
                // Generate a token
                const token = generateToken(user);
                res.cookie("token", token);
                if(user.isAdmin){
                    return res.render("adminPage.ejs", { admin: user });
                }

                return res.redirect("/shop");
            } else {
                return res.status(403).send("Email or password incorrect");
            }
        });
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
};

const logout = (req,res) => {
    res.cookie("token","" )
    res.redirect('/')
}
module.exports = {
    registerUser,
    loginUser,
    logout
};