const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    const userId = req.user.id
    // const userImage = req.user.image
    comment.username = username;
    comment.userId = userId
    // comment.userImage = userImage
    await Comments.create(comment);
    res.json(comment);
});

router.delete("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId;

    await Comments.destroy({
        where: {
            id: commentId,
        },
    });

    res.json("DELETED SUCCESSFULLY");
});

module.exports = router;























//
// const express = require("express");
// const router = express.Router();
//
// // User Controller
// const commentController = require('../controllers/commentController')
//
// // User Validation Middleware
// const { validateToken } = require("../middlewares/AuthMiddleware");
//
//
// // Get Post Comments
// router.get('/:postId', commentController.getPostComments)
//
//
// // Add Comment
// router.post('/', validateToken, commentController.addComment)
// // Delete Comment
// router.post('/:commentId', commentController.deleteComment)
//
//
//
// module.exports = router;
