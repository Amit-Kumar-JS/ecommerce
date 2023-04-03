const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const userSchema =new mongoose.Schema({

    name:{
        type:String,
        required:[true,"please enter your name"],
        maxLength:[30,"name cannot exceed 16 characters"],
        minLength:[4,"name cannot be less than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"please enter your email"],
        unique:[true,"this email has already been used"],
        validate:[validator.isEmail,"please enter a vaid email🙂"]
    },
    password:{
        type:String,
        required:[true,"please enter the password"],
        minLength:[8,"password must be atleast 8 characters"],
        select:false,
    },
    avatar:{
        
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            },
        
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10)
})



// JWT token
userSchema.methods.getJWTToken= function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET)
}
userSchema.methods.comparePassword =async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex")
}

module.exports = mongoose.model("User",userSchema);