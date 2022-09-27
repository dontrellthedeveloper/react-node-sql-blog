const express = require("express");
const router = express.Router();

// User Controller
const userController = require('../controllers/userController')

// User Validation Middleware
const { validateToken } = require("../middlewares/AuthMiddleware");


// Get All Users
router.get('/', userController.getAllUsers)
// Get User Post
router.get('/basicinfo/:id', userController.getUserInfo)
// Get User Request Headers
router.get('/auth', validateToken, userController.getUserRequestHeaders)


// Add User
router.post('/', userController.upload, userController.addUser)
// Login User
router.post('/login', userController.loginUser)



module.exports = router;