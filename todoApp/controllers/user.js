const { User } = require("../models/user.js");
const bcrypt = require("bcrypt");
const { sendCookie} = require("../utils/features.js");

const login = async (req,res,next)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.json({
                success: false,
                message: "User doesn't exists",
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({
                success: false,
                message: "Invalid email or password",
            })
        }

        sendCookie(user,res,`Welcome back, ${user.name}`,200);
    } catch (error) {
        next(error);
    }
}

const registerUser = async (req,res)=>{
    try {
        const {name, email, password} = req.body;
        let user = await User.findOne({email});

        if(user){
            return res.json({
                success: false,
                message: "User already exists",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        sendCookie(user,res,"Registered Successfully",201);
    } catch (error) {
        next(error);
    }
}

const getMyProfile = (req,res)=>{
    res.json({
        success:true,
        user:req.user,
    })
}

const logout = (req,res,next)=>{
    res.cookie("token","",{expires:new Date(Date.now())}).json({
        success:true,
    })
}

module.exports = {
    registerUser,
    login,
    getMyProfile,
    logout,
};
