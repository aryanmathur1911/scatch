const mongoose = require("mongoose");
const adminModel = require("./models/adminmodel");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const db = require("./config/mongoose-connection.js");
dotenv.config();

const createAdmin = async () => {
    try {
        const username = "Bruce Wayn";
        const email = "batman@email.com";
        const password = "batman";

        const salt = await bcrypt.genSalt(10);
        const user = await adminModel.findOne({ email });

        if (user) {
            console.log("Already existing admin");
        } else {
            const hash = await bcrypt.hash(password, salt);
            const createdAdmin = await adminModel.create({
                username: username,
                email: email,
                password: hash 
            });
            console.log(createdAdmin);
        }
    } catch (err) {
        console.log(err.message);
    } finally {
        mongoose.connection.close();
    }
};

mongoose.connection.once('open', () => {
    console.log('Database connected successfully');
    createAdmin();
});

mongoose.connection.on('error', (err) => {
    console.error('Database connection error:', err);
});