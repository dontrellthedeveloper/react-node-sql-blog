const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const {validateToken} = require('../middlewares/AuthMiddleware')

const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });
        res.json("SUCCESS");
    });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) res.json({ error: "User Doesn't Exist" });

    bcrypt.compare(password, user.password).then(async (match) => {
        if (!match) res.json({ error: "Wrong Username And Password Combination" });

        const accessToken = sign(
            { username: user.username, id: user.id },
            "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2MzI2MjUzNCwiaWF0IjoxNjYzMjYyNTM0fQ.RoUmWEBdT36pV7Kk7OWnGj-Z_BFkElNlsJt_gVMehdE\n"
        );
        res.json(accessToken);
    });
});

router.get('/auth', (req, res) => {
    res.json(req.user);
})

module.exports = router;