const express = require("express")
const isLoggedIn = require("../middlewares/isLoggedIn")
const productModel = require("../models/productmodel")
const userModel = require("../models/usermodel")
const route = express.Router()
const mongoose = require("mongoose")

route.get('/',(req,res) => {
    let error = req.flash("error")
    res.render("index.ejs",{error, loggedIn : false})
})

route.get('/shop',isLoggedIn, async (req,res) => {
    let products = await productModel.find()
    let success = req.flash("success")
    res.render("shop.ejs", {user : req.user, products, success})
})

route.get('/cart',isLoggedIn, async (req,res) => {
    let user = await userModel.findOne({email:req.user.email}).populate("cart")
    res.render("cart.ejs",{user})
})

route.get('/addtocart/:productid',isLoggedIn, async (req,res) => {
    let user = await userModel.findOne({email : req.user.email})
    user.cart.push(req.params.productid)
    
    await user.save()
    req.flash("success","Added to cart")
    res.redirect('/shop')
})

module.exports = route