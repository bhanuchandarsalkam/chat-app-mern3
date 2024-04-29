const express=require("express");
const { Sendmessage, Getmessage } = require("../Controllers/Messagecontroller");
const protectRoute = require("../middlewares/protectroute");
const messagerouter=express.Router();
messagerouter.post("/send/:id",protectRoute, Sendmessage);
messagerouter.get("/:id",protectRoute, Getmessage);
module.exports=messagerouter;