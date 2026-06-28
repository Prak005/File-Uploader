const prisma = require("../lib/prisma");

async function createFolder(req, res) {
    try {
        const { name } = req.body;
        const trimmedName = name?.trim();
        if(!trimmedName){
            return res.status(400).json({
                message: "Folder name required",
            });
        }
        const folder = await prisma.folder.create({
            data:{
                name: trimmedName,
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

async function getFolder(req, res) {
    try {
        const folder = await prisma.folder.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.id,
            },
            include: {
                files: true,
            },
        });
        if(!folder){
            return res.status(400).json({
                error: "Folder Not Found",
            });
        }
        res.json(folder);
    }catch(error) {
        res.status(500).json({
            error: "Failed to fetch folder",
        });
    }
}

async function uploadFile(req, res) {
    try{
        const folder = await prisma.folder.findFirst({
            where:{
                id: req.params.id,
                userId: req.user.id,
            },
        });
        if(!folder){
            return res.status(404).json({
                error:"Folder not found",
            });
        }
        const file = await prisma.file.create({
            data:{
                name: req.file.originalname,
                path: req.file.path,
                folderId: folder.id,
            },
        });
        res.json(file);
    }catch(error){
        res.status(500).json({
            error:"Failed to upload file",
        });
    }
}

async function deleteFile(req, res) {
    try{
        const file = await prisma.file.findFirst({
            where: {
                id: req.params.id,
                folder: {
                    userId: req.user.id,
                },
            },
        });
        if(!file) {
            return res.status(404).json({
                error: "File not found",
            });
        }
        await prisma.file.delete({
            where:{
                id: file.id,
            },
        });
        res.json({
            message: "File deleted",
        });
    } catch(error) {
        res.status(500).json({
            error: "Failed to delete file",
        });
    }
}

async function deleteFolder(req, res) {
    try{
        const folder = await prisma.folder.findFirst({
            where:{
                id: req.params.id,
                userId: req.user.id,
            },
            include: {
                files: true,
            },
        });
        if(!folder){
            return res.status(404).json({
                error:"Folder not found",
            });
        }
        await prisma.folder.delete({
            where:{
                id: folder.id,
            },
        });
        res.json({
            message:"Folder Deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:"Failed to delete folder",
        });
    }
}

module.exports = {
    createFolder,
    getFolders,
    getFolder,
    uploadFile,
    deleteFile,
    deleteFolder,
}