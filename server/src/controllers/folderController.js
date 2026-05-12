const prisma = require("../lib/prisma");

async function createFolder(req, res) {
    try {
        const { name } = req.body;
        const folder = await prisma.folder.create({
            data:{
                name,
                userId: req.user.id,
            },
        });
        res.json(folder);
    }catch(error) {
        res.status(500).json({
            error: "Failed to create folder",s
        });
    }
}

module.exports = {
    createFolder,
}