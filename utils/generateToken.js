const jwt = require("jsonwebtoken")


const generateToken = (user) => {
    return  jwt.sign({email : user.email , user_id : user.user_id} , process.env.JWT_key)
}

module.exports = generateToken