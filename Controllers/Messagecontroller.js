const conversationmodel = require("../Models/conversationmodel");
const messagemodel = require("../Models/messagemodel");

const Sendmessage=async(req,res)=>{
    try{
    const {message}=req.body;
    const {id:receiverId}=req.params;
    const senderId=req.user._id;
    const conversation=await conversationmodel.findOne({
       participants:{$all:[senderId,receiverId]} 
    })
    if(!conversation){
        conversation=await conversationmodel.create({
            participants:[senderId,receiverId]
        })
    }
    const newmessage=new messagemodel({
        senderId,
        receiverId,
        message
    })
    if(newmessage){
        conversation.messages.push(newmessage._id)
    }
    // await conversation.save()
    // await newmessage.save();
    await Promise.all([conversation.save(),newmessage.save()])
    return res.send({
        status:201,
        data:newmessage
    })
    }
    catch(err){
     return res.send({
        status:500,
        message:"internal server error"
     })
    }
}
const Getmessage=async(req,res)=>{
    try{
      const {id:usertochatId}=req.params;
      const senderId=req.user._id;
      const conversation=await conversationmodel.findOne({
        participants:{$all:[senderId,usertochatId]}
      }).populate("messages")
      return res.send({
        status:200,
        data:conversation.messages
      })
    }
    catch(err){
    return res.send({
        status:500,
        message:"internal server error"
    })
    }
}
module.exports={Sendmessage,Getmessage}