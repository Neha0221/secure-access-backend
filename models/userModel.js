const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:Number,
        default:0
        // 0 -> Normal User, 1 -> Admin, 2 -> Moderator 
    }
}); 

module.exports=mongoose.model('User',userSchema);