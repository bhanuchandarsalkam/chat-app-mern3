const usermodel = require("../Models/usermodel");
const bcrypt=require("bcryptjs");
const generatetoken = require("../utils/generatetoken");
const signup=async(req,res)=>{
   try{
 const {fullname,username,password,confirmpassword,gender,profilepic}=req.body;
 if(password!==confirmpassword){
    return res.send("password doesnot matches")
 }
    const user=await usermodel.findOne({username})
    if(user){
        return res.send({
            status:400,
            message:"username already exists"
        })
    }
    const hashedpassword=await bcrypt.hash(password,10);
    const boyprofilepic=`https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlprofilepic=`https://avatar.iran.liara.run/public/girl?username=${username}`
    const newuser= await new usermodel({
        fullname,
        username,
        password:hashedpassword,
        gender,
        profilepic:gender==="male"?boyprofilepic:girlprofilepic
    })
    console.log(newuser)
    await generatetoken(newuser._id,res)
        const userdb=await newuser.save();
        return res.send({
            status:201,
            message:"user registered successfully",
            data:userdb
        })
}
   catch(err){
    console.log(err)
    return res.send({
        status:500,
        message:"database error",
        error:err
    })
   }
}
const login=async(req,res)=>{
    try{
    const {username,password}=req.body;
    const user=await usermodel.findOne({username})
    const ispassword=await bcrypt.compare(password,user.password)
    if(!user||!ispassword){
        return res.send("invalid credentials")
    }
    req.session.isAuth=true;
        req.session.user={
            userId:user._id,
            username:user.username
        }
    return res.send({
        status:200,
        message:"login successfully",
        data:user
    })
}
catch(err){
   return res.send({
    status:500,
    message:"database error",
    error:err
   })
}
}
const logout=(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.send({
                status:401,
                message:"logout unsuccessfull"
            })
        }
        else{
            return res.send({
                status:200,
                message:"logout successfull"
            })
        }
    })
}
module.exports={signup,login,logout};