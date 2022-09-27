const express = require("express");
const router = express.Router();

// Post Controller
const likesController = require('../controllers/likesController')

// User Validation Middleware
const { validateToken } = require("../middlewares/AuthMiddleware");


// Like Post
router.post('/', validateToken, likesController.likePost)




module.exports = router;