const express=require("express");
const protectRoute = require("../middlewares/protectroute");
const { Getusersforsidebar } = require("../Controllers/Usercontroller");
const userrouter=express.Router();
userrouter.get("/",Getusersforsidebar)
module.exports=userrouter;