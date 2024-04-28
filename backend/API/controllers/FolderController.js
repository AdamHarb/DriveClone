const Folder = require('../models/Folder');
const File = require('../models/File');
const mongoose = require("mongoose");

//When user logs in to website display his folders (This should be used with getFilesByUserId to get everything)
exports.getFoldersByUserId = async (req, res) => {
    try{
        const parent_id = req.params.folderId;
        const query = { user_id: req.user._id };
        if (parent_id) {
            query.parent_id = parent_id;
        }
        const folders = await Folder.find(query);
        return {
            "status": 200,
            "data": folders
        }
    }
    catch  (err){
        res.status(500).json({message: "Internal server error"});
    }
}

exports.getRootFoldersByUserId = async (req, res) => {
    try{
        const query = { user_id: req.user._id, parent_id: null};
        const folders = await Folder.find(query);
        return {
            "status": 200,
            "data": folders
        }
    }
    catch  (err){
        res.status(500).json({message: "Internal server error"});
    }
}

//This only creates the folder name and object which needs to be filled using another api.
exports.createFolder = async (req, res) => {
    let user_id;
    try {
        user_id = req.user._id;
        const {folder_name, parent_id} = req.body;

        if (!folder_name) {
            return res.status(400).json({message: "Missing required field: folder_name"});
        }

        const folder = new Folder({
            user_id,
            folder_name,
            parent_id
        });

        await folder.save();
        console.log(folder);
        res.status(201).json({message: "Folder created successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Internal server error"});
    }
};

exports.deleteFolder = async (req, res) => {
    try {
        const folder_id = req.params.folderId;
        const user_id = req.user._id;
        console.log(user_id, folder_id);
        const files = await File.deleteMany({user_id: user_id, parent_id: folder_id});
        const folders = await Folder.deleteMany({user_id: user_id, _id: folder_id});

        if (folders.deletedCount === 0) {
            return res.status(404).json({message: "Folder not found"});
        }
        res.status(200).json({message: "Folder deleted successfully"});
    }
    catch (err) {
        console.error(err);
        res.status(500).json({message: "Internal server error"});
    }
}



