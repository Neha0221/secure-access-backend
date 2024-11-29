const express=require('express');
const router=express();

const auth=require('../middlewares/authMiddleware');
const { onlyAdminAccess }=require('../middlewares/accessMiddleware');
const permissionController=require('../controllers/admin/permissionController');
const roleController=require('../controllers/admin/roleController');
const userController=require('../controllers/userController')
const { permissionAddValidator, permissionDeleteValidator,permissionUpdateValidator,storeRoleValidator }=require('../helpers/adminValidator');

// permission routes
router.post('/permission', auth, onlyAdminAccess, permissionAddValidator,permissionController.addPermission);
router.get('/permission', auth, onlyAdminAccess, permissionController.getPermissions);
router.delete('/permission', auth, onlyAdminAccess, permissionDeleteValidator, permissionController.deletePermission);
router.put('/permission', auth, onlyAdminAccess, permissionUpdateValidator, permissionController.updatePermission);

// role routes
router.post('/role', auth, onlyAdminAccess, storeRoleValidator,roleController.storeRole);
router.get('/role', auth, onlyAdminAccess, roleController.getRoles);
router.put('/userrole', auth, onlyAdminAccess, userController.updateUserRole);

module.exports=router;