const asyncHandler = require("express-async-handler");
const User = require("../models/employeeModel");
var jwt = require('jsonwebtoken');


const generateToken = require("../components/generateToken");
const express = require("express");
const JWT_SECRET=process.env.JWT_SECRET
const app = express();

app.use(express.json());
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash the password before saving
    // const hashedPassword = await User.hashPassword(password);

    const user = await User.create({
        name,
        email,
        password,
    });
    console.log("HI")
    if (user) {
        const data={
            user:{
              id: user._id
            }
          }
        const token= jwt.sign(data,JWT_SECRET)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token, // Ensure you have this function implemented
        });
        // res.json({token})
        // console.log("Hello");
    } else {
        res.status(400);
        throw new Error("Failed to create the user");
    }
};

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id), // Ensure you have this function implemented
        });
    } else {
        res.status(400);
        throw new Error("Invalid email or password");
    }
});

module.exports = { registerUser, authUser };
