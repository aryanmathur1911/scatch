const express = require("express")
const router = express.Router()

router.get('/',(req,res) => {
    res.send("this is products router")
})

module.exports = router