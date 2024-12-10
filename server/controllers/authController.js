const users = require("../models/userModel");
const creatError = require("../utils/appError");
const bcrypt =require('bcryptjs')
const JWT = require('jsonwebtoken')
const crypto = require('crypto');

// Generate a random string
const secretKey = crypto.randomBytes(64).toString('hex');

// Register User
exports.signup = async (req,res,next) =>{
    try {
        // console.log("req",req.body)
        const user = await users.findOne({email:req.body.email});
        if (user){
            return next (new creatError("User Already Exists",400))
        }
        const hassedPassword = await bcrypt.hash(req.body.password, 12)
        const newUser =  await users.create({
            ...req.body,
            password:hassedPassword
        })
        // JsonWebToken
        const token = JWT.sign({_id:newUser._id}, secretKey,{
            expiresIn:'90d'
        })

        res.status(201).json({
            status:'success',
            message:"User Registered Successfully",
            token,
        })
    } catch (error) {
        next(error)
    }
}




// Login user
exports.login = async (req,res,next) =>{
    try {
        const {email,password}=req.body
        const user = await users.findOne({email});

        if(!user) return next(new creatError("User not found!",404))

        const ifPasswordValid = await bcrypt.compare(password,user.password)

        if(!ifPasswordValid){
            return next(new creatError("Invalid Email or Password",401))
        }


        const token = JWT.sign({_id:user._id}, secretKey,{
            expiresIn:'90d'
        })

        res.status(200).json({
            status:'success',
            message:"Logged in Successfully",
            token,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,

            }
        })
        
    } catch (error) {
        next(error)
        
    }
}