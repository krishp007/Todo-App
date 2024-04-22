const { User } = require("../models/user");
const jwt = require("jsonwebtoken")

const isAuthenticated = async (req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.json({
            success: false,
            message: "Login first",
        })
    }

    const decodedData = jwt.verify(token,"!@#$qwerty");

    req.user = await User.findById(decodedData._id);
    next();
}

module.exports = {
    isAuthenticated,
}