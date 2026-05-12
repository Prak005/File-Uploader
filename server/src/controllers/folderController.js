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
            error: "Failed to create folder",
        });
    }
}

async function getFolders(req, res) {
    try {
        const folders = await prisma.folder.findMany({
            where:{
                userId: req.user.id,
            },
            orderBy:{
                createdAt:"desc",
            },
        });
        res.json(folders);
    }catch(error) {
        res.status(500).json({
            error: "Failed to fetch folders",
        });
    }
}

module.exports = {
    createFolder,
    getFolders,
}