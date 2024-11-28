const express=require('express');
const router=express();

const auth=require('../middlewares/authMiddleware');
const { categoryAddValidator,categoryDeleteValidator,categoryUpdateValidator,postCreateValidator,postDeleteValidator,postUpdateValidator }=require('../helpers/adminValidator');
const {createUserValidator} = require('../helpers/validator');
const categoryController=require('../controllers/categoryController');
const postController=require('../controllers/postController');
const userController=require('../controllers/userController');
// category Routes
router.post('/add-category',auth,categoryAddValidator,categoryController.addCategory);
router.get('/get-categories',auth,categoryController.getCategories);
router.post('/delete-category',auth,categoryDeleteValidator,categoryController.deleteCategory);
router.post('/update-category',auth,categoryUpdateValidator,categoryController.updateCategory);

// post Routes
router.post('/create-post',auth,postCreateValidator,postController.createPost);
router.get('/get-posts',auth,postController.getPosts);
router.post('/delete-post',auth,postDeleteValidator,postController.deletePost);
router.post('/update-post',auth,postUpdateValidator,postController.updatePost);

// user routes
router.post('/create-user',auth,createUserValidator,userController.createUser);
module.exports=router; 