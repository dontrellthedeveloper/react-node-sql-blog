const express = require("express");
const router = express.Router();

// Post Controller
const postController = require('../controllers/postController')

// User Validation Middleware
const { validateToken } = require("../middlewares/AuthMiddleware");


// Get All Posts
router.get('/', postController.getAllPosts)
// Get User Post
router.get('/byId/:id', postController.getUserPost)
// Get User Info
router.get('/byuserId/:id', postController.getAllUserPosts)


// Add Post
router.post('/', postController.upload, validateToken, postController.addPost)
// Delete Post
router.post('/:postId', validateToken, postController.deletePost)



module.exports = router;