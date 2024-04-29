const jwt=require("jsonwebtoken");
require("dotenv").config();
const generatetoken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.secret_key,{
        expiresIn:"15d"
    })
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true, //prevent XSS attacks cross-site scripting attacks
        sameSite:"strict"//CSRF attacks cross-site request forgery attacks
    })
}
module.exports=generatetoken;