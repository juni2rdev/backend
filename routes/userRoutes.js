const express = require('express');
const routes = express.Router();

const authMiddleware = require('./../middlewares/authMiddleware');
const adminMiddleware = require('./../middlewares/adminMiddleware')
const userController = require('./../controllers/userController');

routes.post('/create', userController.createUser);
routes.post('/login', userController.loginUser);
routes.get('/getData', authMiddleware, userController.getUserData);
routes.get('/getAllDatas',adminMiddleware, userController.getAllUserDatas);
routes.delete('/delete', authMiddleware, userController.deleteUser);


module.exports = routes; 