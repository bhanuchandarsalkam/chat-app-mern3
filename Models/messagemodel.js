const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const messageschema=new Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})
module.exports=mongoose.model("message",messageschema);