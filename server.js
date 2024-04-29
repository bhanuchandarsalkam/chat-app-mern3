const express=require("express");
const router = require("./Route/authroutes");
const app=express();
const session=require("express-session")
const mongodbsession=require("connect-mongodb-session")(session)
const db=require("./db.js");
const cookieparser=require("cookie-parser")
const messagerouter = require("./Route/messageroutes.js");
const userrouter = require("./Route/userroutes.js");
require("dotenv").config();
const PORT=process.env.PORT;
const store=new mongodbsession({
    uri:process.env.MONGO_URI,
    collection:"sessions"
})
app.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false,
    store:store
}))
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("server is running")
})
app.use(cookieparser())
app.use("/auth", router)
app.use("/message",messagerouter);
app.use("/user",userrouter);
app.listen(PORT,()=>{
    console.log(`server is running on the port:${PORT}`)
})