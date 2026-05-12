const prisma = require("../lib/prisma");
const fs = require("fs");

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
        if(fs.existsSync(file.path)){
            fs.unlinkSync(file.path);
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

module.exports = {
    createFolder,
    getFolders,
    getFolder,
    uploadFile,
    deleteFile,
}