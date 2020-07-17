const express=require('express');
const routers =express.Router();

const userController=require('../controllers/user_controller');

routers.post('/create-user',userController.create);


module.exports=routers;