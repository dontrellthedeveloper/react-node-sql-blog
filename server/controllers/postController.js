const express = require("express");
const { Posts, Likes } = require("../models");
const multer = require("multer");
const path = require("path");

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


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

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




module.exports = {
    addPost,
    upload

}