const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    email:String,
    phone:String,
    password:String
});
module.exports=mongoose.model("logins",userSchema);