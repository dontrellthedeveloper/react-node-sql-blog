const { Users, Posts, Likes} = require("../models");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");


// Post Image Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

// Post Image Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: '10000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')


// Get All Posts
const getAllPosts = async (req, res) => {
    const listOfPosts = await Posts.findAll();
    res.json({
        listOfPosts: listOfPosts,
    });
}

// Get User Post
const getUserPost = async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
}

// Get All User Posts
const getAllUserPosts = async (req, res) => {
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({
        where: { UserId: id },
        include: [Likes],
    });
    res.json(listOfPosts);
}


// Add Post
const addPost = async (req, res) => {
    const post = {
        title: req.body.title,
        postText: req.body.postText,
        image: req.file.path
    }
    // const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post);
    res.json(post);
}

// Delete Post
const deletePost = async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({
        where: {
            id: postId,
        },
    });

    res.json("DELETED SUCCESSFULLY");
}



module.exports = {
    getAllPosts,
    getUserPost,
    getAllUserPosts,
    addPost,
    deletePost,
    upload
}