const express = require("express");
const router = express.Router();
const { Posts, Likes, Users } = require("../models");

const multer = require('multer');
const path = require('path');

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/",
    // validateToken,
    async (req, res) => {
    const listOfPosts = await Posts.findAll({ include: [Likes] });
    // const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
    //     console.log(listOfPosts)
    res.json({ listOfPosts: listOfPosts,
        // likedPosts: likedPosts
    });
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});


router.get("/byuserId/:id", async (req, res) => {
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({
        where: { UserId: id },
        include: [Likes],
    });
    res.json(listOfPosts);
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
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


router.post("/", upload, validateToken, async (req, res) => {


    const post = req.body;
    post.image = req.file.path;
    post.username = req.user.username;
    post.UserId = req.user.id;
    post.userImage = req.user.image;
    // console.log(req.user)

    await Posts.create(post);
    res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({
        where: {
            id: postId,
        },
    });

    res.json("DELETED SUCCESSFULLY");
});





module.exports = router;