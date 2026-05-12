const bcrypt = require("bcryptjs");
const prisma = require("../lib/prisma");

function registerGet(req, res) {
    res.send("Register Route");
}
async function registerPost(req, res) {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
        },
    });
    res.send("User Created");
}

module.exports = {
    registerGet,
    registerPost,
}