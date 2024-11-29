const { validationResult } = require('express-validator');
const User=require('../models/userModel');
const bcrypt = require('bcrypt');
const randomstring=require('randomstring');
const createUser = async(req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                status: false,
                msg:'Errors',
                errors:errors.array()
            });
        } 

        const {name,email}=req.body;

        const isExists=await User.findOne({
            email
        })

        if(isExists){
            return res.status(400).json({
                success: false,
                msg:'Email already Exist'
            });
        }

        const password = randomstring.generate(6);
        const hashPassword = await bcrypt.hash(password, 10);

        var obj={
            name,
            email,
            password:hashPassword
        }

        if(req.body.role && req.body.role==1){
            return res.status(400).json({
                success: false,
                msg:"You cannot create admin user"
            });
        }

        else if(req.body.role){
            obj.role=req.body.role;
        }
        
        const user = new User(obj);
        const userData=await user.save();
        
        return res.status(200).json({
            success: true,
            msg:"User created Successfully",
            data:userData
        });
    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}


const updateUserRole = async(req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                status: false,
                msg:'Errors',
                errors:errors.array()
            });
        } 

        const {id,role}=req.body;

        const isExists=await User.findOne({
            _id:id
        })

        if(!isExists){
            return res.status(400).json({
                success: false,
                msg:'User does not exist'
            });
        }

        const updatedRole=await User.findByIdAndUpdate({_id:id},{
            $set: {role:role}
        }, {new : true});

        
        return res.status(200).json({
            success: true,
            msg:"Updated role Successfully",
            data:updatedRole
        });
    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}

const getUsers = async(req,res)=>{
    try{
        
        const users = await User.find({}, { password: 0 });

        return res.status(200).json({
            success: true,
            msg: 'Users Fetched Successfully',
            data: users
        });
        
    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}

module.exports={
    createUser,
    updateUserRole,
    getUsers
}