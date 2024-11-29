const express=require('express');
const router=express();

const auth=require('../middlewares/authMiddleware');
const { moderatorAccess }=require('../middlewares/accessMiddleware');
const { categoryAddValidator,categoryDeleteValidator,categoryUpdateValidator,postCreateValidator,postDeleteValidator,postUpdateValidator }=require('../helpers/adminValidator');
const {createUserValidator} = require('../helpers/validator');
const categoryController=require('../controllers/categoryController');
const postController=require('../controllers/postController');
const userController=require('../controllers/userController');
// category Routes
router.post('/category',auth,categoryAddValidator,categoryController.addCategory);
router.get('/category',auth,categoryController.getCategories);
router.delete('/category',auth,categoryDeleteValidator,categoryController.deleteCategory);
router.put('/category',auth,categoryUpdateValidator,categoryController.updateCategory);

// post Routes
router.post('/post',auth,postCreateValidator,postController.createPost);
router.get('/post',auth,postController.getPosts);
router.delete('/post',auth,postDeleteValidator,postController.deletePost);
router.put('/post',auth,postUpdateValidator,postController.updatePost);

// user routes
router.post('/user',auth,createUserValidator,userController.createUser);
router.get('/users',auth,moderatorAccess,userController.getUsers);
module.exports=router; 