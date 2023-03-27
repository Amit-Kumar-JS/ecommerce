const User = require("../models/userModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const errorHandler = require("../utils/errorHandler");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");

exports.registerUser =catchAsyncErrors( async(req,res,next)=>{
const {name ,email,password} = req.body;

const user = await User.create({name,email,password,avatar:{public_id:"this is a sample id",url:"profilepicurl"}})

sendToken(user,201,res);

})

// login

exports.logonUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}= req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter email and password", 400))
    }

    const user =await User.findOne({email}).select("+password");
    if(!user){
        res.status(500).json({
            success:false,
            message:"Please register first",
        })
    
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        res.status(500).json({
            success:false,
            message:"incorrect email or password",
        })
    
    }


    sendToken(user,200,res);

})