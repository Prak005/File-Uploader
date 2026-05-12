const bcrypt = require("bcryptjs");
const prisma = require("../lib/prisma");

function registerGet(req, res) {
    res.send("Register Route");
}
async function registerPost(req, res) {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        await prisma.user.create({
            data:{
                username,
                password: hashedPassword,
            },
        });
        res.send("User Created");
    } catch (error) {
        console.log(error);
        res.status(400).send("User already exists");
    }
}

function me(req, res) {
    res.json({
        id: req.user.id,
        username: req.user.username,
    });
}

function logout(req, res, next) {
    req.logout((error) => {
        if(error) {
            return next(error);
        }
        res.send("Logged out");
    });
}

module.exports = {
    registerGet,
    registerPost,
    me,
    logout,
};