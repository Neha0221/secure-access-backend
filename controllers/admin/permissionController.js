const { validationResult } = require('express-validator');
const Permission=require('../../models/permissionModel');

const addPermission = async(req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                status: false,
                msg:'Errors',
                errors:errors.array()
            });
        } 

        const { permission_name} = req.body;

        const isExists = await Permission.findOne({
            permission_name:{
                $regex:permission_name,
                $options:'i'
            },
            
        });
        if(isExists){
            return res.status(400).json({
                success: false,
                msg: 'Permission Name already exists',
            }); 
        }

        var obj={
            permission_name
        }
 
        if(req.body.default){
            obj.is_default=parseInt(req.body.default);
        }

        const permission=new Permission(obj);
        const newPermission=await permission.save();

        return res.status(200).json({ 
            success:true,
            msg:'Permission added sucessfully',
           data:newPermission
        });
    }

    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}

const getPermissions=async(req,res) =>{
    try{
        const permissions=await Permission.find({});

        return res.status(200).json({
            success: true,
            msg: "Permission fetch successfully",
            data: permissions
        });

    }

    catch(error){
        return res.status(400).json({ 
            success: false,
            msg: error.message
        });
    }
}

const deletePermission=async(req,res) =>{
    try{
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                status: false,
                msg:'Errors',
                errors:errors.array()
            });
        } 

        const { id } = req.body;
        await Permission.findByIdAndDelete({_id : id});
        return res.status(200).json({
            success: true,
            msg:'Permission Deleted Successfully!'
        });


    }

    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}


const updatePermission = async(req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                status: false,
                msg:'Errors',
                errors:errors.array()
            });
        } 

        const { id, permission_name} = req.body;

        const isExists = await Permission.findOne({_id : id });

        if(!isExists){
            return res.status(400).json({
                success: false,
                msg: 'Permission ID Not Found',
            });
        }

        const isNameAssigned = await Permission.findOne({
            _id:{$ne: id},
            permission_name:{
                $regex:permission_name,
                $options:'i'
            } 
         });
        
        if(isNameAssigned){
            return res.status(400).json({
                success: false,
                msg: 'Permission name already assigned to another permission',
            });
        }
        var updatePermission={
            permission_name
        }

        if(req.body.default!=null){
            updatePermission.is_default=parseInt(req.body.default);
        }

        const updatedPermission=await Permission.findByIdAndUpdate({_id : id},
            {$set : updatePermission},
            {new:true}
        );

        return res.status(200).json({ 
            success:true,
            msg:'Permission updated sucessfully',
           data:updatedPermission
        });
    }

    catch(error){
        return res.status(400).json({
            success: false,
            msg: 'Permission ID is not found!'
        });
    }
}


module.exports={
    addPermission,
    getPermissions,
    deletePermission,
    updatePermission
}