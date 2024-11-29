const onlyAdminAccess=async(req,res,next)=>{
    try{
        if(req.user.role!=1){
            return res.status(400).json({
                success : false,
                msg : 'You have not permission to access this route',
            });  
        }
    }
    catch(error){
        return res.status(400).json({
            success : false,
            msg : 'Something went wrong',
        });       
    }

    return next();
}

const moderatorAccess=async(req,res,next)=>{
    try{
        if(req.user.role!=1 && req.user.role!=2){
            return res.status(400).json({
                success : false,
                msg : 'You have not permission to access this route',
            });  
        }
    }
    catch(error){
        return res.status(400).json({
            success : false,
            msg : 'Something went wrong',
        });       
    }

    return next();
}

module.exports={
    onlyAdminAccess,
    moderatorAccess
}