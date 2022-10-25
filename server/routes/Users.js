const express = require("express");
const router = express.Router();
const { Users, Posts, Likes} = require("../models");
const bcrypt = require("bcryptjs");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const path = require("path");

const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/Images')
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


router.post("/", upload ,async (req, res) => {
    const { username, password } = req.body;
    // const user = req.body;
    // const username = req.body.username;
    // const password = req.body.password;
    // const image = req.file.path;
    // user.image = req.file.path;
    // console.log(user)
    // console.log(image)
    // console.log(user)

    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
            // image: image
        });
        res.json("SUCCESS");
    });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
        res.json({ error: "User Doesn't Exist" });
    }else {
        bcrypt.compare(password, user.password).then(async (match) => {
            if (!match) res.json({ error: "Wrong Username And Password Combination" });

            const accessToken = sign(
                { username: user.username, id: user.id },
                "importantsecret"
            );
            res.json({ token: accessToken, username: username, id: user.id });
        });
    }

    // if (!user) res.json({ error: "User Doesn't Exist" });
    //
    // bcrypt.compare(password, user.password).then(async (match) => {
    //     if (!match) res.json({ error: "Wrong Username And Password Combination" });
    //
    //     const accessToken = sign(
    //         { username: user.username, id: user.id },
    //         "importantsecret"
    //     );
    //     res.json({ token: accessToken, username: username, id: user.id });
    // });
});

router.get("/auth", validateToken, (req, res) => {
    const user = req.user;
    res.json(user);
    // console.log(user)
});


router.get("/",
    // validateToken,
    async (req, res) => {
        const listOfUsers = await Users.findAll();
        // console.log(listOfUsers)
        // const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
        // res.json({ listOfUsers: listOfUsers});
        res.json(listOfUsers);
    });



router.get("/basicinfo/:id", async (req, res) => {
    const id = req.params.id;

    const basicInfo = await Users.findByPk(id, {
        attributes: { exclude: ["password"] },
    });

    res.json(basicInfo);
});

module.exports = router;

























// const express = require("express");
// const router = express.Router();
//
// // User Controller
// const userController = require('../controllers/userController')
//
// // User Validation Middleware
// const { validateToken } = require("../middlewares/AuthMiddleware");
//
//
// // Get All Users
// router.get('/', userController.getAllUsers)
// // Get User Post
// router.get('/basicinfo/:id', userController.getUserInfo)
// // Get User Request Headers
// router.get('/auth', validateToken, userController.getUserRequestHeaders)
//
//
// // Add User
// router.post('/', userController.upload, userController.addUser)
// // Login User
// router.post('/login', userController.loginUser)
//
//
//
// module.exports = router;