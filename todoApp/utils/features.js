const jwt = require("jsonwebtoken");

const sendCookie = (user,res,message,statusCode)=>{
    const token = jwt.sign({_id:user._id}, "!@#$qwerty");

    res.status(statusCode).cookie("token",token,{
        httpOnly: true,
        maxAge: 10*60*1000,
    }).json({
        success: true,
        message,
    })
}

module.exports = {
    sendCookie,
}