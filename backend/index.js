const express= require('express');
const cors=require('cors');
require('./db/config');
const user=require("./db/user");
const app=express();
app.use(cors());
app.use(express.json());
app.post("/login",async (req,resp)=>{
    let User = new user(req. body);
    let result=await User.save();
    // result=result.toObject();
    // delete result.password;
resp.send(result);
});

app.listen(5000);