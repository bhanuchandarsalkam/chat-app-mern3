const usermodel = require("../Models/usermodel");

const Getusersforsidebar=async(req,res)=>{
    try{
      const logginuserId=req.user._id;
      const filteredusers=await usermodel.find({_id:{$ne:logginuserId}}).select("-password")
      return res.send({
        status:200,
        data:filteredusers
      })
    }
    catch(err){
        return res.send({
            status:500,
            message:"internal server error"
        })
    }
}
module.exports={Getusersforsidebar}