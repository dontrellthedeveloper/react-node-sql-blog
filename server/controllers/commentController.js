const { Comments } = require("../models");


const getPostComments = async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.json(comments);
}

const addComment = async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    const userId = req.user.id
    // const userImage = req.user.image
    comment.username = username;
    comment.userId = userId
    // comment.userImage = userImage
    await Comments.create(comment);
    res.json(comment);
}

const deleteComment = async (req, res) => {
    const commentId = req.params.commentId;

    await Comments.destroy({
        where: {
            id: commentId,
        },
    });

    res.json("DELETED SUCCESSFULLY");
}

module.exports = {
    getPostComments,
    addComment,
    deleteComment
}