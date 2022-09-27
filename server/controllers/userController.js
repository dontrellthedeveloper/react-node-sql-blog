const { Users, Posts, Likes} = require("../models");
const bcrypt = require("bcryptjs");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const path = require("path");
const multer = require('multer');


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


const getAllUsers = async (req, res) => {
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers);
}


const getUserInfo = async (req, res) => {
    const id = req.params.id;

    const basicInfo = await Users.findByPk(id, {
        attributes: { exclude: ["password"] },
    });
    res.json(basicInfo);
}


const getUserRequestHeaders = async (req, res) => {
    const user = req.user;
    res.json(user);
}


const addUser = async (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
            // image: image
        });
        res.json("SUCCESS");
    });
}


const loginUser = async (req, res) => {
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
}


module.exports = {
    getAllUsers,
    getUserInfo,
    getUserRequestHeaders,
    addUser,
    loginUser,
    upload
}