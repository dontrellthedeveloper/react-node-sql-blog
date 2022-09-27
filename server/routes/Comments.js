const express = require("express");
const router = express.Router();

// User Controller
const commentController = require('../controllers/commentController')

// User Validation Middleware
const { validateToken } = require("../middlewares/AuthMiddleware");


// Get Post Comments
router.get('/:postId', commentController.getPostComments)


// Add Comment
router.post('/', validateToken, commentController.addComment)
// Delete Comment
router.post('/:commentId', commentController.deleteComment)



module.exports = router;
