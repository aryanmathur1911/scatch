const express = require("express")
const router = express.Router()
const ownerModel = require("../models/ownerModel")



if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        let owners = await ownerModel.find()
        if (owners.length > 0) { return res.status(503).send("you don't have permission to create owner") }


        let { fullname, email, password, contact } = req.body

        let createdOwner = await ownerModel.create({
            fullname,

            email,

            password,

            contact,
        })


        res.status(201).send(createdOwner)

    })
}

router.get('/admin', (req, res) => {
    let success = req.flash("success")
    res.render("createproducts.ejs",{success})
})



module.exports = router