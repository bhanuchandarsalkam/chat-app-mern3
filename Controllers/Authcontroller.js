const usermodel = require("../Models/usermodel");
const bcrypt=require("bcryptjs");
const generatetoken = require("../utils/generatetoken");
const jwt=require("jsonwebtoken")
require("dotenv").config()
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
    // try{
    // const {username,password}=req.body;
    // // if(!token){
    // //     return res.send({
    // //         status:400,
    // //         message:"token is not there"
    // //     })
    // // }
    // const user=await usermodel.findOne({username})
    // // console.log(user)
    // const ispassword=await bcrypt.compare(password,user.password)
    // if(!user||!ispassword){
    //     return res.send("invalid credentials")
    // }
    // console.log("ok")
    // console.log(user)
    // const payload = {
    //     User: user.username
    // }
    // const options={
    //     expiresIn: '1h'
    // }
    // jwt.sign(payload, process.env.secret_key,options, (err, token) => {
    //     if (err) {
    //         console.error('Failed to generate token:', err);
    //     } else {
    //         console.log('Generated token:', token);
    //         return res.send({
    //             status:200,
    //             message:"login successfully",
    //             user:user,
    //             token:token
    //         })
    //     }
    // });

    // // req.session.isAuth=true;
    // //     req.session.user={
    // //         userId:user._id,
    // //         username:user.username
    // //     }
    // // return res.send({
    // //     status:200,
    // //     message:"login successfully",
    // //     data:user
    // })
// }
// catch(err){
//    return res.send({
//     status:500,
//     message:"database error",
//     error:err
//    })
// }
try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid username or password" });
    }

    generatetoken(user._id, res);

    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
    });
} catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
}
}
const logout=(req,res)=>{
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
module.exports={signup,login,logout};